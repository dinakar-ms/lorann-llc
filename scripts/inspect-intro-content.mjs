/**
 * Directly fetches known document IDs from Studio screenshots and checks
 * for introContent. Also does a raw HTTP fetch bypassing the JS client.
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

const client = createClient({ projectId, dataset, apiVersion: "2021-06-07", token, useCdn: false });

// IDs seen in Studio screenshots
const knownIds = [
  "P4n5H6Le0izBS9IEByevXu",   // Nurse Practitioners
  "P4n5H6Le0izBS9IEByevg5",   // Medical Assistants (approx)
  "XCp4eNJ6YVZskS4ztz1IdR",   // Physicians & Doctors
];

console.log(`\nProject: ${projectId} | Dataset: ${dataset}\n`);

for (const id of knownIds) {
  for (const docId of [id, `drafts.${id}`]) {
    const doc = await client.getDocument(docId);
    if (!doc) { console.log(`  ${docId}: NOT FOUND`); continue; }

    const slug = doc.slug?.current || "(no slug)";
    const hasIntro = "introContent" in doc;
    const fieldCount = Object.keys(doc).length;
    console.log(`  ${docId}`);
    console.log(`    slug: ${slug}`);
    console.log(`    fields: ${fieldCount}`);
    console.log(`    introContent: ${hasIntro ? "YES — value:" : "NOT FOUND"}`);
    if (hasIntro) {
      console.log("   ", JSON.stringify(doc.introContent).slice(0, 200));
    }
    console.log();
  }
}

// Also use GROQ with explicit draft inclusion via _id filter
console.log("--- GROQ with explicit drafts.** filter ---");
const draftsWithField = await client.fetch(
  `*[defined(introContent) && _id match "drafts.**"] | order(_id) { _id, "slug": slug.current }`
);
console.log(`drafts with introContent (match drafts.**): ${draftsWithField.length}`);
draftsWithField.forEach(d => console.log(" ", d._id, d.slug));

const publishedWithField = await client.fetch(
  `*[defined(introContent) && !(_id match "drafts.**")] | order(_id) { _id, "slug": slug.current }`
);
console.log(`published with introContent: ${publishedWithField.length}`);
publishedWithField.forEach(d => console.log(" ", d._id, d.slug));
