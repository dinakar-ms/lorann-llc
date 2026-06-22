// Auto-generates and patches schemaMarkup (JSON-LD) for:
//   - homepage document
//   - all page documents
// Run: node scripts/populate-jsonld.mjs
// Run against production: NEXT_PUBLIC_SANITY_DATASET=production node scripts/populate-jsonld.mjs

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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

// ── Homepage JSON-LD ─────────────────────────────────────────────────────────

function buildHomepageJsonLd(doc) {
  const description =
    doc.metaDescription ||
    "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets. Powered by Signal eXchange™.";
  const name = doc.metaTitle || "Lorann — List Smarter · Data-Driven Audience Intelligence";

  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lorann LLC",
      "url": "https://www.lorannllc.com",
      "description": description,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "url": "https://www.lorannllc.com/contact",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": name,
      "url": "https://www.lorannllc.com",
      "description": description,
    },
  ], null, 2);
}

// ── Page document JSON-LD ────────────────────────────────────────────────────

function ptToText(blocks) {
  if (!blocks) return "";
  if (typeof blocks === "string") return blocks;
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b) => {
      if (b._type !== "block" || !b.children) return "";
      return b.children.map((c) => c.text || "").join("");
    })
    .join(" ")
    .trim();
}

function buildPageJsonLd(page) {
  const schemas = [];
  const url = `https://www.lorannllc.com/${page.slug}`;

  schemas.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": page.h1,
    "description": page.metaDescription || undefined,
    "keywords": page.focusKeyphrase || undefined,
    "mainEntityOfPage": page.canonicalUrl || url,
    "publisher": {
      "@type": "Organization",
      "name": "Lorann LLC",
      "url": "https://www.lorannllc.com",
    },
  });

  if (page.faqItems && page.faqItems.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqItems.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": { "@type": "Answer", "text": ptToText(faq.answer) },
      })),
    });
  }

  const slugParts = page.slug.split("/");
  const breadcrumbs = [{ name: "Home", url: "https://www.lorannllc.com/" }];
  for (let i = 0; i < slugParts.length; i++) {
    const segUrl = `https://www.lorannllc.com/${slugParts.slice(0, i + 1).join("/")}`;
    const name = i === slugParts.length - 1
      ? page.h1
      : slugParts[i].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    breadcrumbs.push({ name, url: segUrl });
  }
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": b.name,
      "item": b.url,
    })),
  });

  return JSON.stringify(schemas, null, 2);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\nPopulating JSON-LD in project=${projectId} dataset=${dataset}\n`);

  // 1. Homepage
  const homepage = await client.fetch(`*[_type == "homepage" && _id == "homepage"][0]`);
  if (homepage) {
    const jsonLd = buildHomepageJsonLd(homepage);
    await client.patch("homepage").set({ schemaMarkup: jsonLd }).commit();
    console.log("✓ homepage");
  } else {
    console.log("⚠ homepage document not found — skipping");
  }

  // 2. All page documents
  const pages = await client.fetch(
    `*[_type == "page"]{ _id, h1, "slug": slug.current, metaTitle, metaDescription, focusKeyphrase, canonicalUrl, faqItems }`
  );
  console.log(`  Found ${pages.length} page documents`);

  let done = 0;
  for (const page of pages) {
    if (!page.slug) { console.log(`  ⚠ skipping ${page._id} — no slug`); continue; }
    const jsonLd = buildPageJsonLd(page);
    await client.patch(page._id).set({ schemaMarkup: jsonLd }).commit();
    console.log(`  ✓ /${page.slug}`);
    done++;
  }

  console.log(`\nDone — patched homepage + ${done} pages.\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
