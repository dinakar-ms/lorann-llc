// Creates draft versions for all `page` type documents that only
// have published versions. Required for Presentation click-to-edit.
//
// Run: node scripts/seed-page-drafts.mjs

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

const pages = await client.fetch('*[_type == "page" && !(_id match "drafts.*")]{...}');
console.log(`Found ${pages.length} published page documents`);

let created = 0;
for (const page of pages) {
  const draftId = `drafts.${page._id}`;
  const draft = await client.fetch('*[_id == $id][0]', { id: draftId });
  if (!draft) {
    const { _rev, _updatedAt, _createdAt, ...rest } = page;
    await client.createIfNotExists({ ...rest, _id: draftId });
    console.log(`  ✓ Created draft for: ${page.h1} (${page.slug?.current})`);
    created++;
  } else {
    console.log(`  - Draft exists: ${page.h1}`);
  }
}

console.log(`\nDone. Created ${created} new draft documents.`);
