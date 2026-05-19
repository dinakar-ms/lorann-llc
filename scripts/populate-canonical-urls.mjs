/**
 * One-time migration: populate canonicalUrl for every Sanity document that
 * maps to a front-end route.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/populate-canonical-urls.mjs
 *
 * Get a write token from:
 *   https://www.sanity.io/manage/project/a694bsry → API → Tokens → Add token (Editor role)
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local if present (no dotenv dependency needed)
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // .env.local not found — rely on existing env vars
}

const SITE_ORIGIN = "https://www.lorannllc.com";

const writeToken =
  process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!writeToken) {
  console.error(
    "❌  No token found. Set SANITY_WRITE_TOKEN or SANITY_API_READ_TOKEN.\n" +
    "   Get a write token from: https://www.sanity.io/manage/project/a694bsry → API → Tokens"
  );
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: writeToken,
  useCdn: false,
});

// ── Fixed-route singleton pages ─────────────────────────────
const SINGLETONS = [
  { type: "homepage", id: "homepage", route: "/" },
  { type: "aboutPage", id: "aboutPage", route: "/about" },
  { type: "solutionsPage", id: "solutionsPage", route: "/solutions" },
  { type: "industriesPage", id: "industriesPage", route: "/industries" },
  { type: "howItWorksPage", id: "howItWorksPage", route: "/how-it-works" },
  { type: "signalExchangePage", id: "signalExchangePage", route: "/signal-exchange" },
  { type: "resourcesPage", id: "resourcesPage", route: "/resources" },
  { type: "insightsPage", id: "insightsPage", route: "/insights" },
  { type: "dataAssetsPage", id: "dataAssetsPage", route: "/data-assets" },
  { type: "contactPage", id: "contactPage", route: "/contact" },
  { type: "industryTrendsPage", id: "industryTrendsPage", route: "/insights/industry-trends" },
];

async function run() {
  console.log("🔗  Populating canonical URLs in Sanity…\n");

  let patchCount = 0;
  let skipCount = 0;

  // Helper: patch both published AND draft versions of a document
  async function patchBoth(docId, canonical, label) {
    const draftId = docId.startsWith("drafts.") ? docId : `drafts.${docId}`;
    const publishedId = docId.replace(/^drafts\./, "");

    let patched = false;

    // Patch published version
    const pub = await client.fetch(`*[_id == $id][0]{ _id, canonicalUrl }`, { id: publishedId });
    if (pub && pub.canonicalUrl !== canonical) {
      await client.patch(publishedId).set({ canonicalUrl: canonical }).commit();
      patched = true;
    }

    // Patch draft version (if it exists)
    const draft = await client.fetch(`*[_id == $id][0]{ _id, canonicalUrl }`, { id: draftId });
    if (draft && draft.canonicalUrl !== canonical) {
      await client.patch(draftId).set({ canonicalUrl: canonical }).commit();
      patched = true;
    }

    if (patched) {
      console.log(`  ✅  ${label} → ${canonical}`);
      patchCount++;
    } else {
      console.log(`  ✓  ${label} — already set`);
      skipCount++;
    }
  }

  // ── 1. Singleton pages with fixed routes ──────────────────
  for (const { type, id, route } of SINGLETONS) {
    const canonical = `${SITE_ORIGIN}${route}`;
    await patchBoth(id, canonical, type);
  }

  // ── 2. Dynamic "page" documents (slug-based) ─────────────
  const pages = await client.fetch(
    `*[_type == "page" && !(_id in path("drafts.**"))]{ _id, "slug": slug.current, canonicalUrl }`
  );

  console.log(`\n  📄  Found ${pages.length} "page" documents\n`);

  for (const page of pages) {
    if (!page.slug) {
      console.log(`  ⏭  ${page._id} — no slug, skipping`);
      skipCount++;
      continue;
    }

    const canonical = `${SITE_ORIGIN}/${page.slug}`;
    await patchBoth(page._id, canonical, page.slug);
  }

  console.log(`\n🏁  Done — ${patchCount} updated, ${skipCount} skipped.\n`);
}

run().catch((err) => {
  console.error("❌  Migration failed:", err.message);
  process.exit(1);
});
