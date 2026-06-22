// Creates the `why-lorann` page document in Sanity so the hub page
// is editable in the Studio instead of being hardcoded in Next.js.
// Run: node scripts/seed-why-lorann.mjs

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Load .env.local if present
const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;

if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

function block(text, key) {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: key + "s", text, marks: [] }],
    markDefs: [],
  };
}

// richText fields must be arrays of blocks, not plain strings
function rt(text, key) {
  return [block(text, key)];
}

function featureItem(key, icon, title, desc, href) {
  // desc is richText (array of blocks)
  const item = { _type: "featureItem", _key: key, icon, title, desc: rt(desc, key + "-desc") };
  if (href) item.href = href;
  return item;
}

const doc = {
  _id: "page-why-lorann",
  _type: "page",

  // Core
  h1: "Why Lorann",
  slug: { _type: "slug", current: "why-lorann" },
  templateType: "hub",

  // Hero
  kicker: "The Lorann Difference",
  titlePlain: "Data you can",
  titleAccent: "trust and act on.",
  heroDescription: rt(
    "Every record we deliver is verified, targeted, and compliance-ready — so your campaigns reach real decision-makers, not dead ends.",
    "hero-desc"
  ),
  primaryCta: { label: "Request a Sample", href: "/contact" },
  secondaryCta: { label: "View Data Assets", href: "/data-assets" },

  // Intro
  introKicker: "Built for performance",
  introHeadlinePlain: "Why marketers choose",
  introHeadlineAccent: "Lorann over the rest.",
  introParagraphs: [
    block(
      "Most data vendors recycle stale lists. Lorann runs weekly hygiene cycles against USPS NCOA, opt-out databases, NPI registries, and professional license boards — so every record you receive reflects the current state of your market.",
      "intro-p1"
    ),
    block(
      "From healthcare to financial services to technology, our databases are built segment-first, not scraped-and-sold. That means tighter targeting, higher deliverability, and better ROI on every campaign you run.",
      "intro-p2"
    ),
  ],

  // Hub — children section
  childrenSectionKicker: "What sets us apart",
  childrenSectionTitlePlain: "Four reasons clients",
  childrenSectionTitleAccent: "come back.",
  childrenSectionDescription: rt(
    "Each pillar of the Lorann advantage — click to learn more.",
    "children-desc"
  ),
  childrenSectionColumns: 2,
  childrenItems: [
    featureItem(
      "child-1",
      "BadgeCheck",
      "Verified Data",
      "NPI-verified records cross-referenced against CMS NPPES, USPS NCOA-processed, and SMTP-validated — delivering bounce rates under 2%.",
      "/why-lorann/verified-data"
    ),
    featureItem(
      "child-2",
      "Target",
      "Precision Targeting",
      "Filter by specialty, credential, geography, practice size, and more. Reach exactly the professionals your campaign needs.",
      "/why-lorann/precision-targeting"
    ),
    featureItem(
      "child-3",
      "ShieldCheck",
      "Privacy Compliance",
      "HIPAA-safe professional data only, CAN-SPAM validated email, CCPA opt-out suppression, and DNC-scrubbed phone numbers built in.",
      "/why-lorann/privacy-compliance"
    ),
    featureItem(
      "child-4",
      "Truck",
      "Flexible Delivery",
      "CSV, Excel, CRM-ready integrations with Salesforce, HubSpot, Veeva and more. Same-day to 48-hour turnaround on every order.",
      "/why-lorann/flexible-delivery"
    ),
  ],

  // Hub — attributes / stats section
  hubAttributesSectionKicker: "By the numbers",
  hubAttributesSectionTitlePlain: "Quality at",
  hubAttributesSectionTitleAccent: "scale.",
  hubAttributesSectionColumns: 4,
  hubAttributesItems: [
    featureItem(
      "attr-1",
      "BadgeCheck",
      "850,000+ Physicians",
      "NPI-verified against the CMS NPPES registry for healthcare lists.",
      null
    ),
    featureItem(
      "attr-2",
      "ShieldCheck",
      "Weekly Hygiene",
      "NCOA, opt-out, and license board checks run every week.",
      null
    ),
    featureItem(
      "attr-3",
      "Target",
      "< 2% Bounce Rate",
      "SMTP-validated email addresses with engagement indicators.",
      null
    ),
    featureItem(
      "attr-4",
      "Truck",
      "Same-Day Delivery",
      "Most standard lists are ready to use within hours of ordering.",
      null
    ),
  ],

  // SEO
  metaTitle: "Why Lorann | Verified B2B Data You Can Trust",
  metaDescription:
    "Discover why thousands of marketers choose Lorann — precision-targeted, compliance-first B2B contact data with guaranteed deliverability.",
  canonicalUrl: "https://www.lorannllc.com/why-lorann",
  ogTitle: "Why Lorann | Verified B2B Data You Can Trust",
  ogDescription:
    "Discover why thousands of marketers choose Lorann — precision-targeted, compliance-first B2B contact data with guaranteed deliverability.",
  noIndex: false,
};

async function run() {
  console.log(`Upserting why-lorann page in project=${projectId} dataset=${dataset}…`);
  const result = await client.createOrReplace(doc);
  console.log("Done:", result._id);
  console.log(
    "\nNext step: delete app/why-lorann/page.tsx so the catch-all handles this route."
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
