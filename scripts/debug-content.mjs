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

const slug = "data-assets/b2b-database/other-industry/banking-finance-email-lists";
const docs = await client.fetch(
  `*[_type == "page" && slug.current == $slug]{_id, h1, "slug": slug.current, content, metaTitle, metaDescription}`,
  { slug }
);

for (const doc of docs) {
  console.log(`\nDoc: ${doc._id}`);
  console.log(`  h1: ${doc.h1}`);
  console.log(`  metaTitle: ${doc.metaTitle}`);
  console.log(`  metaDescription: ${doc.metaDescription}`);
  console.log(`  content type: ${typeof doc.content}`);
  console.log(`  content length: ${Array.isArray(doc.content) ? doc.content.length : "N/A"}`);
  if (Array.isArray(doc.content) && doc.content.length > 0) {
    console.log(`  first block:`, JSON.stringify(doc.content[0], null, 2));
  }
}
