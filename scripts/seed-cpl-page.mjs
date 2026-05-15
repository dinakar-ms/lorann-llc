/**
 * Seed the Cost Per Lead solutions page into Sanity as a leaf template.
 * Run:  node scripts/seed-cpl-page.mjs
 */

import { readFileSync } from "fs";
import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

const env = readFileSync(".env.local", "utf8");
const get = (key) => {
  const m = env.match(new RegExp(`${key}=(.+)`));
  return m ? m[1].trim() : "";
};

const client = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2024-01-01",
  token: get("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

function richText(str) {
  if (!str || typeof str !== "string") return null;
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: str, marks: [] }],
    },
  ];
}

const PAGE = {
  _id: "page-solutions-cost-per-lead",
  _type: "page",
  h1: "Cost Per Lead",
  slug: { _type: "slug", current: "solutions/cost-per-lead" },
  templateType: "leaf",
  kicker: "Solutions",
  titlePlain: "Cost Per",
  titleAccent: "Lead",
  heroDescription: richText(
    "Reduce your Cost Per Lead by up to 60% with precision-targeted, verified audience data. Stop wasting budget on unqualified prospects — reach decision-makers who are ready to engage."
  ),

  stats: [
    { _key: key(), label: "Average CPL Reduction", value: "40–60%" },
    { _key: key(), label: "Contact Accuracy Rate", value: "95%+" },
    { _key: key(), label: "Channels Supported", value: "12+" },
    { _key: key(), label: "Industry Verticals", value: "25+" },
  ],

  introKicker: "Why CPL Matters",
  introHeadlinePlain: "Every dollar wasted on bad data",
  introHeadlineAccent: "inflates your cost per lead.",
  introParagraphs: [
    "Cost Per Lead (CPL) is the single most important efficiency metric in demand generation. It measures how much you spend to acquire each qualified lead — and it directly determines whether your campaigns are profitable or burning budget.",
    "Most B2B marketers pay $40–$120 per lead depending on channel and vertical. The difference between a $45 CPL and a $110 CPL isn't just budget — it's the quality of data powering your targeting, the precision of your audience segments, and whether your contact records are verified and deliverable.",
    "Lorann LLC's verified audience datasets, enrichment services, and Signal eXchange™ intent data consistently help clients cut CPL by 40–60% by eliminating waste at the source — before a single dollar is spent on media.",
  ],

  attributes: [
    {
      _key: key(),
      _type: "featureItem",
      icon: "Target",
      title: "Precision Audience Targeting",
      desc: richText(
        "Build laser-focused audiences using firmographic, demographic, and technographic filters. Target by job title, industry, company size, revenue, technology stack, and more — so every impression reaches a qualified prospect."
      ),
    },
    {
      _key: key(),
      _type: "featureItem",
      icon: "BadgeCheck",
      title: "Verified & Deliverable Contacts",
      desc: richText(
        "Every contact in our database is verified for accuracy and deliverability. Eliminate bounced emails, disconnected phones, and outdated records that inflate your CPL with zero return."
      ),
    },
    {
      _key: key(),
      _type: "featureItem",
      icon: "TrendingDown",
      title: "Lower CPL Across Every Channel",
      desc: richText(
        "Whether you run paid search, LinkedIn ads, email campaigns, or programmatic display — better data means higher match rates, stronger relevance scores, and dramatically lower cost per qualified lead."
      ),
    },
    {
      _key: key(),
      _type: "featureItem",
      icon: "Sparkles",
      title: "Intent-Powered Lead Scoring",
      desc: richText(
        "Layer Signal eXchange™ intent signals onto your audience data to prioritize prospects actively researching solutions like yours. Focus spend on high-intent buyers and watch your CPL drop."
      ),
    },
    {
      _key: key(),
      _type: "featureItem",
      icon: "RefreshCw",
      title: "Data Enrichment & Append",
      desc: richText(
        "Fill the gaps in your existing CRM records with 50+ enrichment attributes — from direct dials to technology installs. Higher match rates on ad platforms mean lower CPL and better audience utilization."
      ),
    },
    {
      _key: key(),
      _type: "featureItem",
      icon: "Ban",
      title: "Suppression & Deduplication",
      desc: richText(
        "Automatically suppress existing customers, competitors, and disqualified contacts from your campaigns. Stop paying to acquire leads you already have — or leads that will never convert."
      ),
    },
  ],

  useCases: [
    {
      _key: key(),
      _type: "useCaseItem",
      title: "Email Campaign CPL Optimization",
      desc: richText(
        "A B2B SaaS company reduced email CPL from $85 to $32 by switching to Lorann's verified email lists with firmographic targeting. Bounce rates dropped from 18% to under 3%, and reply rates doubled."
      ),
    },
    {
      _key: key(),
      _type: "useCaseItem",
      title: "LinkedIn Ads CPL Reduction",
      desc: richText(
        "A financial services firm used Lorann's enriched audience segments as matched audiences on LinkedIn. CPL dropped from $120 to $52 — a 57% reduction — while lead quality scores increased by 40%."
      ),
    },
    {
      _key: key(),
      _type: "useCaseItem",
      title: "Programmatic Display Efficiency",
      desc: richText(
        "A healthcare technology company layered Lorann's intent data onto programmatic campaigns. Click-through rates improved 3.2x and cost per qualified lead fell from $95 to $41 within 60 days."
      ),
    },
    {
      _key: key(),
      _type: "useCaseItem",
      title: "Multi-Channel ABM Campaigns",
      desc: richText(
        "An enterprise software company used Lorann's B2B database to build account-based target lists across email, display, and direct mail. Blended CPL across all channels decreased by 48% compared to previous vendor data."
      ),
    },
  ],

  complianceHeadline: "Lower CPL without cutting corners on compliance.",
  complianceBody: richText(
    "Every lead generated through Lorann data is backed by CCPA, GDPR, and CAN-SPAM compliance. Our datasets are ethically sourced, regularly verified, and fully documented — so you can scale lead generation without regulatory risk."
  ),

  backLink: { _type: "cta", label: "← Back to Solutions", href: "/solutions" },

  metaTitle: "Cost Per Lead (CPL) Optimization | Lorann LLC",
  metaDescription:
    "Reduce your Cost Per Lead by 40–60% with Lorann's verified audience data, precision targeting, and intent signals. Lower CPL across email, paid search, LinkedIn, and programmatic channels.",
  focusKeyphrase: "cost per lead",
};

async function seed() {
  // Create published
  await client.createOrReplace(PAGE);
  console.log(`  CREATED ${PAGE._id} (published)`);

  // Create draft
  const draft = { ...PAGE, _id: `drafts.${PAGE._id}` };
  await client.createOrReplace(draft);
  console.log(`  CREATED drafts.${PAGE._id} (draft)`);

  console.log("\n✅ Cost Per Lead page seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
