/**
 * Directly fetches and patches ALL draft page documents to remove introContent.
 * Previous scripts only checked published docs via GROQ — this script explicitly
 * iterates draft IDs as well.
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
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

async function run() {
  console.log(`\nProject: ${projectId} | Dataset: ${dataset}\n`);

  // 1. Get all published page IDs
  const publishedDocs = await client.fetch(
    `*[_type == "page"] { _id, "slug": slug.current }`
  );
  console.log(`Published pages found: ${publishedDocs.length}`);

  // 2. Also get draft documents directly via the Sanity API
  //    by querying for IDs that start with "drafts."
  const draftDocs = await client.fetch(
    `*[_id in path("drafts.**") && _type == "page"] { _id, "slug": slug.current }`
  );
  console.log(`Draft pages found: ${draftDocs.length}\n`);

  const allDocs = [...publishedDocs, ...draftDocs];
  let fixed = 0;

  for (const { _id, slug } of allDocs) {
    // Directly fetch the full raw document to inspect every field
    const doc = await client.getDocument(_id);
    if (!doc) continue;

    const hasField = Object.prototype.hasOwnProperty.call(doc, "introContent");
    const label = _id.startsWith("drafts.") ? "[draft]" : "[published]";

    if (hasField) {
      console.log(`  ${label} ${slug || _id} — introContent FOUND, removing...`);
      await client.patch(_id).unset(["introContent"]).commit();
      console.log(`    ✓ removed`);
      fixed++;
    }
  }

  if (fixed === 0) {
    console.log("No documents had introContent field.");
    console.log("\nSince the Sanity backend has no trace of this field, the");
    console.log("warning is stored only in your browser's local Studio cache.");
    console.log("\nFix: In the Sanity Studio right panel, scroll to the yellow");
    console.log('"Unknown field found" box and click the red "Remove field" button,');
    console.log("then click Publish.");
  } else {
    console.log(`\n✓ Done — removed introContent from ${fixed} documents.\n`);
  }
}

run().catch((err) => { console.error(err); process.exit(1); });
