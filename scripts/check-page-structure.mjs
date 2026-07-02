import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
env.split("\n").forEach(l => { const m = l.match(/^([^#=]+)=(.*)/); if(m) process.env[m[1].trim()] = m[2].trim(); });

const client = createClient({
  projectId: "a694bsry", dataset: "production",
  apiVersion: "2024-10-01", token: process.env.SANITY_API_READ_TOKEN, useCdn: false,
});

// Check one of the 16 pages to see full structure
const page = await client.fetch(
  `*[_type == "page" && slug.current == "data-assets/b2b-database/other-industry/banking-finance-email-lists" && !(_id in path("drafts.**"))][0]`
);
console.log("Page exists:", !!page);
if (page) {
  console.log("Top-level keys:", Object.keys(page));
  console.log(JSON.stringify(page, null, 2).slice(0, 3000));
} else {
  console.log("\nPage NOT found in Sanity. Checking what pages DO exist under other-industry...");
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "data-assets/b2b-database/other-industry*" && !(_id in path("drafts.**"))]{slug, _id}`
  );
  console.log("Other-industry pages in Sanity:", pages.map(p => p.slug.current));
}

// Also check a working page (healthcare) to understand hero image field names
console.log("\n--- Working page structure (physicians-doctors) ---");
const workingPage = await client.fetch(
  `*[_type == "page" && slug.current == "data-assets/b2b-database/healthcare/physicians-advanced-practice/physicians-doctors" && !(_id in path("drafts.**"))][0]{
    "keys": keys(@),
    "heroKeys": keys(heroSection)
  }`
);
console.log("Working page keys:", workingPage);
