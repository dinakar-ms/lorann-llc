/**
 * Forcibly unsets the orphaned `introContent` field from ALL healthcare page
 * documents (published + drafts) by fetching every document ID and running
 * an unconditional unset patch. Safe to run even if the field doesn't exist.
 *
 * Usage:
 *   node scripts/fix-intro-content-field.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/fix-intro-content-field.mjs
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
  console.log(`\nFixing introContent on all page documents`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  // Fetch ALL page document IDs (published and drafts)
  const allIds = await client.fetch(
    `*[_type == "page"] | order(_id) { _id }`
  );
  console.log(`Total page documents: ${allIds.length}`);

  let cleaned = 0;
  let skipped = 0;

  for (const { _id } of allIds) {
    // Directly fetch the full raw document (bypasses GROQ projection)
    const doc = await client.getDocument(_id);
    if (!doc) { skipped++; continue; }

    if (!Object.prototype.hasOwnProperty.call(doc, "introContent")) {
      skipped++;
      continue;
    }

    const label = _id.startsWith("drafts.") ? "[draft]" : "[published]";
    const slug = doc.slug?.current || _id;
    console.log(`  ${label} ${slug} — has introContent, removing...`);

    if (!DRY_RUN) {
      await client.patch(_id).unset(["introContent"]).commit();
      console.log(`    ✓ removed`);
    }
    cleaned++;
  }

  if (DRY_RUN) {
    console.log(`\n[dry-run] Would remove introContent from ${cleaned} documents (${skipped} skipped — field absent)\n`);
  } else {
    console.log(`\n✓ Done — introContent removed from ${cleaned} documents (${skipped} already clean)\n`);
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
