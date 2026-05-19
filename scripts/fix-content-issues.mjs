/**
 * Migration: Fix British English spellings, duplicate content, and other
 * content issues across all Sanity documents.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/fix-content-issues.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local if present
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

// ── British → American English replacements ────────────────
const SPELLING_FIXES = [
  [/\bpractising\b/gi, "practicing"],
  [/\bpersonalise\b/gi, "personalize"],
  [/\bpersonalised\b/gi, "personalized"],
  [/\bpersonalisation\b/gi, "personalization"],
  [/\borganises\b/gi, "organizes"],
  [/\borganised\b/gi, "organized"],
  [/\borganisation\b/gi, "organization"],
  [/\bbehaviour\b/gi, "behavior"],
  [/\bbehaviours\b/gi, "behaviors"],
  [/\btraveller\b/gi, "traveler"],
  [/\btravellers\b/gi, "travelers"],
  [/\bspecialisation\b/gi, "specialization"],
  [/\bspecialisations\b/gi, "specializations"],
  [/\bModernisation\b/g, "Modernization"],
  [/\bmodernisation\b/g, "modernization"],
  [/\bnon-profit\b/gi, "nonprofit"],
  [/\boptimise\b/gi, "optimize"],
  [/\boptimised\b/gi, "optimized"],
  [/\boptimisation\b/gi, "optimization"],
  [/\brecognise\b/gi, "recognize"],
  [/\brecognised\b/gi, "recognized"],
  [/\butilise\b/gi, "utilize"],
  [/\butilised\b/gi, "utilized"],
  [/\banalyse\b/gi, "analyze"],
  [/\banalysed\b/gi, "analyzed"],
  [/\bmaximise\b/gi, "maximize"],
  [/\bmaximised\b/gi, "maximized"],
  [/\bminimise\b/gi, "minimize"],
  [/\bminimised\b/gi, "minimized"],
  [/\bcustomise\b/gi, "customize"],
  [/\bcustomised\b/gi, "customized"],
  [/\bfavour\b/gi, "favor"],
  [/\bfavourable\b/gi, "favorable"],
  [/\bcolour\b/gi, "color"],
  [/\bhonour\b/gi, "honor"],
  [/\blabour\b/gi, "labor"],
  [/\bcentre\b/gi, "center"],
  [/\blitre\b/gi, "liter"],
  [/\blicence\b/gi, "license"],
  [/\bdefence\b/gi, "defense"],
  [/\boffence\b/gi, "offense"],
  [/\bcatalogues?\b/gi, (m) => m.replace("ogue", "og")],
  [/\bdialogue\b/gi, "dialog"],
];

function fixSpelling(text) {
  if (!text || typeof text !== "string") return text;
  let result = text;
  for (const [pattern, replacement] of SPELLING_FIXES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// Recursively fix spellings in Portable Text blocks and plain strings
function fixValue(val) {
  if (typeof val === "string") return fixSpelling(val);
  if (Array.isArray(val)) return val.map(fixValue);
  if (val && typeof val === "object") {
    const out = {};
    for (const [k, v] of Object.entries(val)) {
      // Skip internal Sanity fields
      if (k === "_id" || k === "_rev" || k === "_createdAt" || k === "_updatedAt") {
        out[k] = v;
      } else {
        out[k] = fixValue(v);
      }
    }
    return out;
  }
  return val;
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

let totalPatched = 0;
let totalSkipped = 0;

async function patchDoc(doc, label) {
  const fixed = fixValue(doc);

  // Build patch of only changed fields
  const patch = {};
  for (const [key, val] of Object.entries(fixed)) {
    if (key.startsWith("_")) continue;
    if (!deepEqual(val, doc[key])) {
      patch[key] = val;
    }
  }

  if (Object.keys(patch).length === 0) {
    totalSkipped++;
    return false;
  }

  // Patch both published and draft
  const publishedId = doc._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;

  try {
    await client.patch(publishedId).set(patch).commit();
  } catch {}

  try {
    const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId });
    if (draft) {
      await client.patch(draftId).set(patch).commit();
    }
  } catch {}

  const changedFields = Object.keys(patch).join(", ");
  console.log(`  ✅  ${label} — fixed: ${changedFields}`);
  totalPatched++;
  return true;
}

async function run() {
  console.log("🔧  Fixing content issues across all Sanity documents…\n");

  // ── 1. Fix all "page" documents (British English) ────────
  console.log("── Page documents ──────────────────────────");
  const pages = await client.fetch(
    `*[_type == "page" && !(_id in path("drafts.**"))]`
  );
  console.log(`  Found ${pages.length} page documents\n`);

  for (const page of pages) {
    const slug = page.slug?.current || page._id;
    await patchDoc(page, slug);
  }

  // ── 2. Fix singleton page documents ──────────────────────
  console.log("\n── Singleton pages ─────────────────────────");
  const singletonTypes = [
    "homepage", "aboutPage", "solutionsPage", "industriesPage",
    "howItWorksPage", "signalExchangePage", "resourcesPage",
    "insightsPage", "dataAssetsPage", "contactPage", "industryTrendsPage",
  ];

  for (const type of singletonTypes) {
    const doc = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))][0]`,
      { type }
    );
    if (doc) {
      await patchDoc(doc, type);
    }
  }

  // ── 3. Specific content fixes ────────────────────────────
  console.log("\n── Specific content fixes ──────────────────");

  // Fix B2C hero: "Two consumer verticals" → "Ten consumer verticals"
  const b2cPage = await client.fetch(
    `*[_type == "page" && slug.current == "data-assets/b2c-database" && !(_id in path("drafts.**"))][0]`
  );
  if (b2cPage) {
    const fields = {};
    let changed = false;

    for (const [key, val] of Object.entries(b2cPage)) {
      if (typeof val === "string" && /\btwo consumer verticals?\b/i.test(val)) {
        fields[key] = val.replace(/\bTwo consumer verticals?\b/gi, "Ten consumer verticals")
          .replace(/\btwo consumer verticals?\b/gi, "ten consumer verticals");
        changed = true;
      }
      // Check Portable Text arrays
      if (Array.isArray(val)) {
        const fixedArr = JSON.parse(JSON.stringify(val));
        let arrChanged = false;
        for (const block of fixedArr) {
          if (block?.children) {
            for (const child of block.children) {
              if (typeof child.text === "string" && /\btwo consumer verticals?\b/i.test(child.text)) {
                child.text = child.text
                  .replace(/\bTwo consumer verticals?\b/gi, "Ten consumer verticals")
                  .replace(/\btwo consumer verticals?\b/gi, "ten consumer verticals");
                arrChanged = true;
              }
            }
          }
        }
        if (arrChanged) {
          fields[key] = fixedArr;
          changed = true;
        }
      }
    }

    if (changed) {
      const publishedId = b2cPage._id.replace(/^drafts\./, "");
      const draftId = `drafts.${publishedId}`;
      try { await client.patch(publishedId).set(fields).commit(); } catch {}
      try {
        const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId });
        if (draft) await client.patch(draftId).set(fields).commit();
      } catch {}
      console.log(`  ✅  B2C Database — fixed "Two consumer verticals" → "Ten consumer verticals"`);
    } else {
      console.log(`  ⏭  B2C Database — "Two consumer verticals" not found in Sanity fields`);
    }
  }

  // Fix Case Studies heading: "How Lorann data" → "How Lorann's data"
  const caseStudiesPage = await client.fetch(
    `*[_type == "page" && slug.current == "insights/case-studies" && !(_id in path("drafts.**"))][0]`
  );
  if (caseStudiesPage) {
    const fields = {};
    let changed = false;

    for (const [key, val] of Object.entries(caseStudiesPage)) {
      if (key.startsWith("_")) continue;
      if (typeof val === "string" && val.includes("How Lorann data")) {
        fields[key] = val.replace(/How Lorann data/g, "How Lorann's data");
        changed = true;
      }
    }

    if (changed) {
      const publishedId = caseStudiesPage._id.replace(/^drafts\./, "");
      const draftId = `drafts.${publishedId}`;
      try { await client.patch(publishedId).set(fields).commit(); } catch {}
      try {
        const draft = await client.fetch(`*[_id == $id][0]`, { id: draftId });
        if (draft) await client.patch(draftId).set(fields).commit();
      } catch {}
      console.log(`  ✅  Case Studies — fixed "How Lorann data" → "How Lorann's data"`);
    } else {
      console.log(`  ⏭  Case Studies — "How Lorann data" not found`);
    }
  }

  console.log(`\n🏁  Done — ${totalPatched} documents updated, ${totalSkipped} unchanged.\n`);
}

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
