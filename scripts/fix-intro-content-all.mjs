/**
 * Uses perspective: 'raw' to query ALL documents including every draft,
 * then unsets introContent wherever it exists.
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || "production";
const token     = process.env.SANITY_API_WRITE_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN");

const client = createClient({ projectId, dataset, apiVersion: "2021-06-07", token, useCdn: false });

async function run() {
  console.log(`\nProject: ${projectId} | Dataset: ${dataset}\n`);

  // perspective: 'raw' returns ALL documents including draft versions
  const docs = await client.fetch(
    `*[_type == "page" && defined(introContent)] { _id, "slug": slug.current }`,
    {},
    { perspective: "raw" }
  );

  console.log(`Documents with introContent (raw perspective): ${docs.length}`);

  if (docs.length === 0) {
    console.log("\nNone found via perspective:raw either.");
    console.log("The field is ONLY in your browser's IndexedDB cache.");
    console.log("\n>>> FIX: In Chrome, go to F12 → Application → Storage → Clear site data for localhost:3000\n");
    return;
  }

  for (const doc of docs) {
    const label = doc._id.startsWith("drafts.") ? "[draft]" : "[published]";
    const slug = doc.slug || doc._id;
    console.log(`  ${label} ${slug} — removing introContent...`);
    await client.patch(doc._id).unset(["introContent"]).commit();
    console.log(`    ✓ done`);
  }

  console.log(`\n✓ Removed introContent from ${docs.length} documents.\n`);
  console.log("Reload the Sanity Studio — warnings should be gone.\n");
}

run().catch((err) => { console.error(err); process.exit(1); });
