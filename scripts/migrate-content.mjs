// Migrates text content from hardcoded inner-page JSX files into Sanity
// `page` documents as portable-text blocks.
//
// Safe to re-run — uses `patch(...).set(...)` which overwrites the content
// field each time (idempotent for the same input).
//
// Run: node scripts/migrate-content.mjs

import { createClient } from "@sanity/client";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

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

// ─── Portable Text helpers ───────────────────────────────────────
function key() { return randomUUID().slice(0, 12); }

function block(style, text, markDefs = []) {
  const children = Array.isArray(text)
    ? text
    : [{ _type: "span", _key: key(), text: String(text), marks: [] }];
  return { _type: "block", _key: key(), style, markDefs, children };
}

function h2(text) { return block("h2", text); }
function h3(text) { return block("h3", text); }
function normal(text) { return block("normal", text); }

function boldAndNormal(boldText, normalText) {
  return block("normal", [
    { _type: "span", _key: key(), text: boldText, marks: ["strong"] },
    { _type: "span", _key: key(), text: " — " + normalText, marks: [] },
  ]);
}

function bulletItem(text) {
  return { ...block("normal", text), listItem: "bullet", level: 1 };
}

// ─── JSX text extraction helpers ─────────────────────────────────
function clean(s) {
  if (!s) return "";
  return s
    .replace(/\\u2019/g, "’")
    .replace(/\\u2014/g, "—")
    .replace(/\\u2026/g, "…")
    .replace(/&rsquo;/g, "’")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/\{" "\}/g, " ")
    .replace(/<span[^>]*>/g, "")
    .replace(/<\/span>/g, "")
    .replace(/<br\s*\/?>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetadata(src) {
  const titleM = src.match(/title:\s*["'`]([^"'`]+)["'`]/);
  const descM = src.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/s) ||
                src.match(/description:\s*["'`]([^"'`]+)["'`]/);
  return {
    metaTitle: titleM ? clean(titleM[1]) : "",
    metaDescription: descM ? clean(descM[1]) : "",
  };
}

function extractLeafPage(src) {
  const blocks = [];
  const meta = extractMetadata(src);

  // Title
  const titlePlain = src.match(/titlePlain:\s*["'`]([^"'`]+)["'`]/);
  const titleAccent = src.match(/titleAccent:\s*["'`]([^"'`]+)["'`]/);
  const h1Text = clean((titlePlain?.[1] || "") + " " + (titleAccent?.[1] || ""));
  if (h1Text) blocks.push(normal(h1Text));

  // Description
  const descM = src.match(/description=\{?["'`]([^"'`]+)["'`]\}?/s) ||
                src.match(/description:\s*["'`]([^"'`]+)["'`]/s);
  // Try the LeafPage description prop
  const leafDesc = src.match(/description=["'`]([^"'`]+)["'`]/) ||
                   src.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/s);

  // Stats
  const statsMatch = src.match(/(?:const\s+STATS|stats)\s*=?\s*\[([^\]]+)\]/s);
  if (statsMatch) {
    blocks.push(h2("Key Statistics"));
    const statItems = [...statsMatch[1].matchAll(/label:\s*["'`]([^"'`]+)["'`]\s*,\s*value:\s*["'`]([^"'`]+)["'`]/g)];
    for (const s of statItems) {
      blocks.push(boldAndNormal(clean(s[1]), clean(s[2])));
    }
  }

  // Intro section
  const introKicker = src.match(/intro:\s*\{[^}]*kicker:\s*["'`]([^"'`]+)["'`]/s);
  const introHeadPlain = src.match(/headlinePlain:\s*["'`]([^"'`]+)["'`]/);
  const introHeadAccent = src.match(/headlineAccent:\s*["'`]([^"'`]+)["'`]/);
  if (introHeadPlain || introHeadAccent) {
    blocks.push(h2(clean((introHeadPlain?.[1] || "") + " " + (introHeadAccent?.[1] || ""))));
  }

  // Intro paragraphs
  const paragraphsMatch = src.match(/paragraphs:\s*\[([\s\S]*?)\]\s*[,}]/);
  if (paragraphsMatch) {
    const paras = [...paragraphsMatch[1].matchAll(/["'`]([\s\S]*?)["'`]/g)];
    for (const p of paras) {
      blocks.push(normal(clean(p[1])));
    }
  }

  // Attributes
  const attrSection = src.match(/(?:const\s+ATTRIBUTES|attributes)\s*=?\s*\[([\s\S]*?)\];/);
  if (attrSection) {
    blocks.push(h2("Data Attributes"));
    const attrs = [...attrSection[1].matchAll(/title:\s*["'`]([^"'`]+)["'`][\s\S]*?desc:\s*["'`]([^"'`]+)["'`]/g)];
    for (const a of attrs) {
      blocks.push(boldAndNormal(clean(a[1]), clean(a[2])));
    }
  }

  // Use Cases
  const useCaseSection = src.match(/(?:const\s+USE_CASES|useCases)\s*=?\s*\[([\s\S]*?)\];/);
  if (useCaseSection) {
    blocks.push(h2("Use Cases"));
    const cases = [...useCaseSection[1].matchAll(/title:\s*["'`]([^"'`]+)["'`][\s\S]*?desc:\s*["'`]([^"'`]+)["'`]/g)];
    for (const c of cases) {
      blocks.push(boldAndNormal(clean(c[1]), clean(c[2])));
    }
  }

  // Compliance
  const compHeadline = src.match(/compliance:\s*\{[^}]*headline:\s*["'`]([^"'`]+)["'`]/s);
  const compBody = src.match(/compliance:\s*\{[^}]*body:\s*["'`]([^"'`]+)["'`]/s);
  if (compHeadline || compBody) {
    blocks.push(h2(clean(compHeadline?.[1] || "Compliance")));
    if (compBody) blocks.push(normal(clean(compBody[1])));
  }

  return { blocks, h1: h1Text || meta.metaTitle, ...meta };
}

function extractHubPage(src) {
  const blocks = [];
  const meta = extractMetadata(src);

  // Title
  const titlePlain = src.match(/titlePlain:\s*["'`]([^"'`]+)["'`]/);
  const titleAccent = src.match(/titleAccent:\s*["'`]([^"'`]+)["'`]/);
  const h1Text = clean((titlePlain?.[1] || "") + " " + (titleAccent?.[1] || ""));

  // Description
  const descProp = src.match(/(?<![a-z])description[:=]\s*["'`]([^"'`]+)["'`]/);
  if (descProp) blocks.push(normal(clean(descProp[1])));

  // Intro
  const introHeadPlain = src.match(/headlinePlain:\s*["'`]([^"'`]+)["'`]/);
  const introHeadAccent = src.match(/headlineAccent:\s*["'`]([^"'`]+)["'`]/);
  if (introHeadPlain || introHeadAccent) {
    blocks.push(h2(clean((introHeadPlain?.[1] || "") + " " + (introHeadAccent?.[1] || ""))));
  }

  const paragraphsMatch = src.match(/paragraphs:\s*\[([\s\S]*?)\]\s*[,}]/);
  if (paragraphsMatch) {
    const paras = [...paragraphsMatch[1].matchAll(/["'`]([\s\S]*?)["'`]/g)];
    for (const p of paras) {
      blocks.push(normal(clean(p[1])));
    }
  }

  // Children section items
  const childrenMatch = src.match(/items:\s*\[([\s\S]*?)\]\s*[,}]\s*[,}]/);
  if (childrenMatch) {
    blocks.push(h2("Categories"));
    const items = [...childrenMatch[1].matchAll(/title:\s*["'`]([^"'`]+)["'`][\s\S]*?desc:\s*["'`]([^"'`]+)["'`]/g)];
    for (const item of items) {
      blocks.push(boldAndNormal(clean(item[1]), clean(item[2])));
    }
  }

  // Attributes section
  const attrMatch = src.match(/attributesSection:\s*\{([\s\S]*?)\}\s*[,}]\s*\)/);
  if (attrMatch) {
    const attrItems = [...attrMatch[1].matchAll(/title:\s*["'`]([^"'`]+)["'`][\s\S]*?desc:\s*["'`]([^"'`]+)["'`]/g)];
    if (attrItems.length > 0) {
      blocks.push(h2("What You Get"));
      for (const a of attrItems) {
        blocks.push(boldAndNormal(clean(a[1]), clean(a[2])));
      }
    }
  }

  return { blocks, h1: h1Text || meta.metaTitle, ...meta };
}

function extractSubPageHero(src) {
  const blocks = [];
  const meta = extractMetadata(src);

  // Extract hero description
  const heroDesc = src.match(/description=["'`]([^"'`]+)["'`]/);
  if (heroDesc) blocks.push(normal(clean(heroDesc[1])));

  // Extract all h2 headings from JSX
  const h2Matches = [...src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  for (const m of h2Matches) {
    const text = clean(m[1]);
    if (text) blocks.push(h2(text));
  }

  // Extract paragraphs from <p> tags inside sections (not kicker/description)
  const pMatches = [...src.matchAll(/<p(?:\s[^>]*)?>[\s\n]*([\s\S]*?)<\/p>/g)];
  for (const m of pMatches) {
    const text = clean(m[1]);
    if (text && text.length > 30) {
      blocks.push(normal(text));
    }
  }

  // Extract SectionHeader titles
  const sectionHeaders = [...src.matchAll(/SectionHeader[\s\S]*?kicker=["'`]([^"'`]+)["'`][\s\S]*?title=\{[\s\S]*?\}/g)];

  // Extract feature cards
  const featureMatches = [...src.matchAll(/\{\s*(?:Icon:\s*\w+\s*,\s*)?title:\s*["'`]([^"'`]+)["'`]\s*,\s*desc:\s*["'`]([^"'`]+)["'`]/g)];
  if (featureMatches.length > 0) {
    for (const f of featureMatches) {
      blocks.push(boldAndNormal(clean(f[1]), clean(f[2])));
    }
  }

  return { blocks, ...meta };
}

function extractCustomPage(src) {
  const blocks = [];
  const meta = extractMetadata(src);

  // Hero description
  const heroDesc = src.match(/description=["'`]([^"'`]+)["'`]/) ||
                   src.match(/description:\s*["'`]([^"'`]+)["'`]/);
  if (heroDesc) blocks.push(normal(clean(heroDesc[1])));

  // All h2 headings
  const h2Matches = [...src.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)];
  for (const m of h2Matches) {
    const text = clean(m[1]);
    if (text) blocks.push(h2(text));
  }

  // All h3 headings
  const h3Matches = [...src.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)];
  for (const m of h3Matches) {
    const text = clean(m[1]);
    if (text && text.length > 5) blocks.push(h3(text));
  }

  // All paragraphs (longer than 30 chars to skip kickers)
  const pMatches = [...src.matchAll(/<p(?:\s[^>]*)?>[\s\n]*([\s\S]*?)<\/p>/g)];
  for (const m of pMatches) {
    const text = clean(m[1]);
    if (text && text.length > 30) {
      blocks.push(normal(text));
    }
  }

  // Feature cards / data objects with title+desc
  const featureMatches = [...src.matchAll(/\{\s*(?:Icon:\s*\w+\s*,\s*)?title:\s*["'`]([^"'`]+)["'`]\s*,\s*desc:\s*["'`]([^"'`]+)["'`]/g)];
  if (featureMatches.length > 0) {
    for (const f of featureMatches) {
      blocks.push(boldAndNormal(clean(f[1]), clean(f[2])));
    }
  }

  // Case study data (for case-studies page)
  const caseMatches = [...src.matchAll(/title:\s*["'`]([^"'`]+)["'`][\s\S]*?challenge:\s*["'`]([^"'`]+)["'`][\s\S]*?approach:\s*["'`]([^"'`]+)["'`][\s\S]*?outcome:\s*["'`]([^"'`]+)["'`]/g)];
  if (caseMatches.length > 0) {
    blocks.push(h2("Case Studies"));
    for (const c of caseMatches) {
      blocks.push(h3(clean(c[1])));
      blocks.push(boldAndNormal("Challenge", clean(c[2])));
      blocks.push(boldAndNormal("Approach", clean(c[3])));
      blocks.push(boldAndNormal("Outcome", clean(c[4])));
    }
  }

  // Team data (for meet-the-team page)
  const teamMatches = [...src.matchAll(/name:\s*["'`]([^"'`]+)["'`][\s\S]*?title:\s*["'`]([^"'`]+)["'`][\s\S]*?bio:\s*["'`]([^"'`]+)["'`]/g)];
  if (teamMatches.length > 0) {
    blocks.push(h2("Our Team"));
    for (const t of teamMatches) {
      blocks.push(h3(clean(t[1])));
      blocks.push(boldAndNormal(clean(t[2]), clean(t[3])));
    }
  }

  // Bullet list items (for newsletter page)
  const liMatches = [...src.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)];
  if (liMatches.length > 0) {
    for (const li of liMatches) {
      blocks.push(bulletItem(clean(li[1])));
    }
  }

  return { blocks, ...meta };
}

// ─── Extract content from a page file ────────────────────────────
function extractContent(filePath) {
  const src = readFileSync(filePath, "utf8");

  if (src.includes("LeafPage")) {
    return extractLeafPage(src);
  }
  if (src.includes("HubPage")) {
    return extractHubPage(src);
  }
  if (src.includes("SubPageHero") && src.includes("FeatureCardGrid")) {
    return extractSubPageHero(src);
  }
  return extractCustomPage(src);
}

// ─── Walk directories for inner page files ───────────────────────
function findInnerPages(appDir) {
  const results = [];

  // Sections with dedicated sub-pages
  const sections = ["about", "solutions", "why-lorann", "industries"];
  for (const sec of sections) {
    const secPath = join(appDir, sec);
    if (!existsSync(secPath)) continue;
    for (const entry of readdirSync(secPath)) {
      const pagePath = join(secPath, entry, "page.tsx");
      if (statSync(join(secPath, entry)).isDirectory() && existsSync(pagePath)) {
        const slug = `${sec}/${entry}`;
        results.push({ slug, filePath: pagePath });
      }
    }
  }

  // Data assets — recursively find all page.tsx under subdirs
  function walkDataAssets(dir, slugPrefix) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (!statSync(fullPath).isDirectory()) continue;
      const slug = slugPrefix ? `${slugPrefix}/${entry}` : entry;
      const pagePath = join(fullPath, "page.tsx");
      if (existsSync(pagePath)) {
        results.push({ slug: `data-assets/${slug}`, filePath: pagePath });
      }
      walkDataAssets(fullPath, slug);
    }
  }
  walkDataAssets(join(appDir, "data-assets"), "");

  // Insights sub-pages (except industry-trends which is CMS-driven)
  const insightsPath = join(appDir, "insights");
  if (existsSync(insightsPath)) {
    for (const entry of readdirSync(insightsPath)) {
      if (entry === "industry-trends") continue;
      const pagePath = join(insightsPath, entry, "page.tsx");
      if (statSync(join(insightsPath, entry)).isDirectory() && existsSync(pagePath)) {
        results.push({ slug: `insights/${entry}`, filePath: pagePath });
      }
    }
  }

  return results;
}

// ─── Main ────────────────────────────────────────────────────────
const appDir = join(projectRoot, "app");
const pages = findInnerPages(appDir);
console.log(`Found ${pages.length} inner pages to migrate.\n`);

let updated = 0;
let skipped = 0;
let errors = 0;

for (const { slug, filePath } of pages) {
  try {
    const { blocks, h1: extractedH1, metaTitle, metaDescription } = extractContent(filePath);

    if (blocks.length === 0) {
      console.log(`  ⚠ No content extracted: ${slug}`);
      skipped++;
      continue;
    }

    // Find the published document (exclude drafts)
    const doc = await client.fetch(
      `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]{ _id }`,
      { slug }
    );

    if (!doc) {
      console.log(`  ✗ No Sanity doc found: ${slug}`);
      skipped++;
      continue;
    }

    // Build patch data
    const patchData = { content: blocks };
    if (metaTitle) patchData.metaTitle = metaTitle;
    if (metaDescription) patchData.metaDescription = metaDescription;

    // Patch published doc
    await client.patch(doc._id).set(patchData).commit();

    // Patch draft doc too
    const draftId = `drafts.${doc._id}`;
    try {
      await client.patch(draftId).set(patchData).commit();
    } catch {
      // draft may not exist
    }

    console.log(`  ✓ ${slug} — ${blocks.length} blocks, meta updated`);
    updated++;
  } catch (err) {
    console.error(`  ✗ Error on ${slug}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone. Updated: ${updated} | Skipped: ${skipped} | Errors: ${errors}`);
