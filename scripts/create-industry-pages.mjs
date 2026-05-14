// Creates Sanity page documents for the 5 industry inner pages
// that don't exist yet, then migrates their content.
//
// Run: node scripts/create-industry-pages.mjs

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

const INDUSTRY_PAGES = [
  { slug: "industries/automotive", h1: "Automotive", metaTitle: "Automotive Industry · Lorann LLC" },
  { slug: "industries/b2b", h1: "B2B", metaTitle: "B2B Industry · Lorann LLC" },
  { slug: "industries/financial", h1: "Financial Services", metaTitle: "Financial Services · Lorann LLC" },
  { slug: "industries/healthcare", h1: "Healthcare", metaTitle: "Healthcare Industry · Lorann LLC" },
  { slug: "industries/insurance", h1: "Insurance", metaTitle: "Insurance Industry · Lorann LLC" },
];

for (const page of INDUSTRY_PAGES) {
  const id = `page-${page.slug.replace(/\//g, "-")}`;

  // Create published
  await client.createIfNotExists({
    _id: id,
    _type: "page",
    h1: page.h1,
    slug: { _type: "slug", current: page.slug },
    metaTitle: page.metaTitle,
  });

  // Create draft
  await client.createIfNotExists({
    _id: `drafts.${id}`,
    _type: "page",
    h1: page.h1,
    slug: { _type: "slug", current: page.slug },
    metaTitle: page.metaTitle,
  });

  console.log(`✓ Created: ${page.slug}`);
}

console.log("\nDone. Now run: node scripts/migrate-content.mjs  to fill content.");
