/**
 * Removes the orphaned `introContent` field from all page documents.
 * This field was removed from the schema but remained in existing documents,
 * causing "Unknown field found" warnings in Sanity Studio.
 *
 * Usage:
 *   node scripts/remove-intro-content-field.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/remove-intro-content-field.mjs
 */

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

const DRY_RUN = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || "development";
const token     = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

async function run() {
  console.log(`\nRemoving orphaned introContent field from page documents`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  // Find all published pages that have the introContent field
  const published = await client.fetch(
    `*[_type == "page" && defined(introContent) && !(_id match "drafts.*")] { _id, "slug": slug.current }`
  );

  // Find all draft pages that have the introContent field
  const drafts = await client.fetch(
    `*[_type == "page" && defined(introContent) && _id match "drafts.*"] { _id, "slug": slug.current }`
  );

  console.log(`Found ${published.length} published + ${drafts.length} draft documents with introContent\n`);

  const all = [...published, ...drafts];

  if (all.length === 0) {
    console.log("Nothing to clean up.\n");
    return;
  }

  for (const doc of all) {
    const label = doc._id.startsWith("drafts.") ? "[draft]" : "[published]";
    console.log(`  ${label} ${doc.slug || doc._id}`);

    if (!DRY_RUN) {
      await client.patch(doc._id).unset(["introContent"]).commit();
      console.log(`    ✓ introContent removed`);
    }
  }

  if (DRY_RUN) {
    console.log(`\n[dry-run — no changes made]`);
  } else {
    console.log(`\n✓ Done — introContent removed from ${all.length} documents.\n`);
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
