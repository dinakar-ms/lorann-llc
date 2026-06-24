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
  "data-assets/b2b-database/healthcare/behavioral-mental-health/psychologists",
  "data-assets/b2b-database/healthcare/behavioral-mental-health/psychiatrists",
  "data-assets/b2b-database/healthcare/behavioral-mental-health/mental-health-counselors",
  "data-assets/b2b-database/healthcare/behavioral-mental-health/social-workers",
  "data-assets/b2b-database/healthcare/behavioral-mental-health/marriage-family-therapists",
  "data-assets/b2b-database/healthcare/dental-vision/dentists",
  "data-assets/b2b-database/healthcare/dental-vision/dental-hygienists",
  "data-assets/b2b-database/healthcare/dental-vision/optometrists",
  "data-assets/b2b-database/healthcare/dental-vision/opticians",
  "data-assets/b2b-database/healthcare/pharmacy-practice-management/pharmacists",
  "data-assets/b2b-database/healthcare/pharmacy-practice-management/physician-practice-managers",
  "data-assets/b2b-database/healthcare/specialty-other/chiropractors",
  "data-assets/b2b-database/healthcare/specialty-other/veterinarians",
  "data-assets/b2b-database/healthcare/specialty-other/allied-healthcare-professionals",
];

const pages = await client.fetch(
  `*[_type == "page" && slug.current in $slugs]
   { "slug": slug.current, h1, "attrs": attributes[]{ icon, title, "descText": desc[0].children[0].text } }`,
  { slugs }
);

const sorted = slugs.map(s => pages.find(p => p.slug === s)).filter(Boolean);
for (const p of sorted) {
  console.log(`\n=== ${p.h1} ===`);
  for (const a of (p.attrs || [])) {
    console.log(`  [${a.icon}] "${a.title}"`);
    console.log(`         ${a.descText?.slice(0, 110)}...`);
  }
}
