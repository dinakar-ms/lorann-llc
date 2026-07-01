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

const client = createClient({ projectId: "a694bsry", dataset: "production", apiVersion: "2024-10-01", useCdn: false });

const slugs = [
  "data-assets/b2b-database/healthcare/nursing-professionals/certified-nursing-assistants",
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-medical-officers",
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-nursing-officers",
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-of-staff",
  "data-assets/b2b-database/healthcare/health-therapy/occupational-therapists",
  "data-assets/b2b-database/healthcare/health-therapy/speech-language-therapists",
  "data-assets/b2b-database/healthcare/health-therapy/massage-therapists",
  "data-assets/b2b-database/healthcare/health-therapy/emts-paramedics",
  "data-assets/b2b-database/healthcare/health-therapy/radiologic-technicians",
  "data-assets/b2b-database/healthcare/health-therapy/dieticians-nutritionists",
];

const pages = await client.fetch(
  `*[_type == "page" && slug.current in $slugs]
   { "slug": slug.current, h1, "attrs": attributes[]{ _key, icon, title, "descText": desc[0].children[0].text } }`,
  { slugs }
);

const sorted = slugs.map(s => pages.find(p => p.slug === s)).filter(Boolean);

for (const p of sorted) {
  console.log(`\n=== ${p.h1} ===`);
  console.log(`    slug: ${p.slug}`);
  for (const a of (p.attrs || [])) {
    console.log(`  [${a.icon}] "${a.title}"`);
    console.log(`         ${a.descText?.slice(0, 100)}...`);
  }
}
