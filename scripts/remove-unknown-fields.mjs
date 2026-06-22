// Finds and removes orphaned fields that are not defined in the page schema.
// Currently targets: healthcareComplianceSection, healthcareFeaturesSection
// Run: node scripts/remove-unknown-fields.mjs
// Run against production: NEXT_PUBLIC_SANITY_DATASET=production node scripts/remove-unknown-fields.mjs

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

// Fields that exist in documents but are NOT in the page schema
const ORPHANED_FIELDS = ["healthcareComplianceSection", "healthcareFeaturesSection"];

async function run() {
  console.log(`\nRemoving orphaned fields from project=${projectId} dataset=${dataset}`);
  console.log(`Fields to remove: ${ORPHANED_FIELDS.join(", ")}\n`);

  // Build GROQ filter — pages where ANY of the orphaned fields are defined
  const filter = ORPHANED_FIELDS.map(f => `defined(${f})`).join(" || ");
  const query = `*[_type == "page" && (${filter})]{_id, "slug": slug.current}`;

  const pages = await client.fetch(query);
  console.log(`Found ${pages.length} page(s) with orphaned fields.\n`);

  if (pages.length === 0) {
    console.log("Nothing to remove.");
    return;
  }

  let done = 0;
  for (const page of pages) {
    const patch = client.patch(page._id);
    patch.unset(ORPHANED_FIELDS);
    await patch.commit();
    console.log(`  ✓ /${page.slug || page._id}`);
    done++;
  }

  console.log(`\nDone — removed orphaned fields from ${done} page(s).\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
