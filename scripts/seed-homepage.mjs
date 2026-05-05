// Seeds the Homepage singleton with the original page content.
// Run: node scripts/seed-homepage.mjs

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

await client.createOrReplace({
  _id: "homepage",
  _type: "homepage",
  heroBadgeLabel: "Live",
  heroBadgeText: "95M+ verified contacts · real-time intent signals",
  heroLine1: "List smarter.",
  heroLine2Start: "Target",
  heroLine2Highlight: "sharper.",
  heroLine3Start: "Grow",
  heroLine3Highlight: "faster.",
  heroDescription:
    "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets — engineered to drive measurable marketing outcomes.",
  heroPrimaryCta: { label: "Get Started Free", href: "/contact" },
  heroSecondaryCta: { label: "Watch Demo", href: "/how-it-works" },
  metaTitle: "Lorann — List Smarter · Data-Driven Audience Intelligence",
  metaDescription:
    "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets. Powered by Signal eXchange™.",
  focusKeyphrase: "audience intelligence",
  noIndex: false,
});

console.log("Seeded Homepage singleton.");
