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

const pages = await client.fetch(
  `*[_type == "page" && slug.current match "data-assets/b2b-database/healthcare*"] | order(slug.current)
   { "slug": slug.current, h1, "attrCount": count(attributes) }`
);

for (const p of pages) {
  console.log(`${p.slug} | ${p.h1} | attrs:${p.attrCount ?? 0}`);
}
