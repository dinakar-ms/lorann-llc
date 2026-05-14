// Checks which page documents in Sanity have content vs empty.
// Run: node scripts/check-page-content.mjs

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

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const pages = await client.fetch(`*[_type == "page" && !(_id match "drafts.*")]{
  _id, h1, "slug": slug.current,
  "hasContent": defined(content) && length(content) > 0,
  "contentLength": length(content),
  metaTitle, metaDescription
} | order(slug asc)`);

let empty = 0;
let filled = 0;
for (const p of pages) {
  const status = p.hasContent ? "✓ HAS CONTENT" : "✗ EMPTY";
  if (!p.hasContent) empty++;
  else filled++;
  console.log(`${status} | ${p.slug} | h1: "${p.h1}" | blocks: ${p.contentLength || 0}`);
}

console.log(`\nTotal: ${pages.length} | With content: ${filled} | Empty: ${empty}`);
