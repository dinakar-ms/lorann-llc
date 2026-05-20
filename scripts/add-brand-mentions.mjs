/**
 * Migration: Add Lorann brand mentions (2–3 per page) to hero descriptions
 * and intro paragraphs across key content pages that currently lack them.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/add-brand-mentions.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {}

const writeToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!writeToken) {
  console.error("No token found. Set SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: writeToken,
  useCdn: false,
});

// Pages within the "page" document type
const PAGE_UPDATES = {
  "solutions": {
    heroDescription: "Lorann delivers data-driven audience solutions — from targeting and enrichment to activation and performance optimization. Whether you need precision-built audiences, enriched CRM data, or activation-ready files, Lorann has the solution.",
    introParagraphs: [
      "Every Lorann solution is built around one principle: data should drive performance, not just fill a database. Our solutions connect audience strategy to campaign execution across every channel your team uses.",
      "From audience construction through Signal eXchange™ to multi-channel data activation, Lorann provides the tools and expertise that performance-driven marketing teams need to reduce cost per lead and maximize ROI.",
    ],
  },
  "data-assets": {
    heroDescription: "Lorann's data assets span B2B, B2C, and healthcare audiences — each segment verified, enriched, and ready for multi-channel activation. Explore our database categories and find the audience data your campaigns need.",
    introParagraphs: [
      "Lorann maintains three core data universes — B2B, B2C, and Signal eXchange™ — each built for the segmentation depth and deliverability standards that modern marketers require.",
      "Whether you need to reach healthcare providers, technology buyers, or in-market consumers, Lorann's data assets give your team verified, compliance-ready records that activate across every channel.",
    ],
  },
};

// Singleton pages — these use their own document types
const SINGLETON_UPDATES = {
  aboutPage: {
    heroDescription: "Lorann is a data-driven audience solutions company serving marketers, agencies, and sales teams across B2B, consumer, and healthcare verticals. Learn about the team, approach, and data philosophy behind Lorann's audience platform.",
  },
  solutionsPage: {
    heroDescription: "Lorann delivers end-to-end audience data solutions — from precision targeting and data enrichment to multi-channel activation and cost-per-lead optimization.",
  },
  insightsPage: {
    heroDescription: "Industry analysis, case studies, and data-driven perspectives from Lorann's audience strategy team. Stay ahead of trends in targeting, activation, and performance marketing.",
  },
};

async function patchPage(slug, patch) {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id }`,
    { slug }
  );
  if (!page) { console.log(`  ⏭  "${slug}" not found.`); return; }
  const publishedId = page._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;
  try { await client.patch(publishedId).set(patch).commit(); console.log(`  ✅  ${slug} — published`); } catch (e) { console.error(`  ❌  ${slug} — ${e.message}`); }
  try {
    const draft = await client.fetch(`*[_id == $id][0]{ _id }`, { id: draftId });
    if (draft) { await client.patch(draftId).set(patch).commit(); console.log(`  ✅  ${slug} — draft`); }
  } catch {}
}

async function patchSingleton(type, patch) {
  const doc = await client.fetch(
    `*[_type == $type && !(_id in path("drafts.**"))][0]{ _id }`,
    { type }
  );
  if (!doc) { console.log(`  ⏭  ${type} not found.`); return; }
  const publishedId = doc._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;
  try { await client.patch(publishedId).set(patch).commit(); console.log(`  ✅  ${type} — published`); } catch (e) { console.error(`  ❌  ${type} — ${e.message}`); }
  try {
    const draft = await client.fetch(`*[_id == $id][0]{ _id }`, { id: draftId });
    if (draft) { await client.patch(draftId).set(patch).commit(); console.log(`  ✅  ${type} — draft`); }
  } catch {}
}

async function run() {
  console.log("🔧  Adding Lorann brand mentions to remaining pages…\n");

  console.log("── Page documents ──");
  for (const [slug, patch] of Object.entries(PAGE_UPDATES)) {
    await patchPage(slug, patch);
  }

  console.log("\n── Singleton pages ──");
  for (const [type, patch] of Object.entries(SINGLETON_UPDATES)) {
    await patchSingleton(type, patch);
  }

  console.log("\n🏁  Done!\n");
}

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
