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

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
const client = createClient({ projectId: "a694bsry", dataset, apiVersion: "2024-10-01", token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false });

const slugs = [
  "data-assets/b2b-database/healthcare/dental-vision/dentists",
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/nurse-practitioners",
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/medical-assistants",
  "data-assets/b2b-database/healthcare/nursing-professionals/registered-nurses",
  "data-assets/b2b-database/healthcare/nursing-professionals/licensed-practical-nurses",
];

const pages = await client.fetch(
  `*[_type == "page" && slug.current in $slugs] { "slug": slug.current, "cards": healthcareFeaturesSection.cards[]{ title, desc } }`,
  { slugs }
);

for (const page of pages) {
  console.log(`\n=== ${page.slug} ===`);
  for (const card of (page.cards || [])) {
    console.log(`  TITLE: ${card.title}`);
    console.log(`  DESC:  ${card.desc?.slice(0, 120)}...`);
  }
}
