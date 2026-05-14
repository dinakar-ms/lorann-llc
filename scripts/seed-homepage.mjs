// Seeds the Homepage singleton with the full page content for every
// section. Idempotent — uses `setIfMissing`, so re-running will not
// overwrite fields you've already edited in Studio. Only empty fields
// get filled. This is what makes every string clickable in Sanity
// Presentation: empty fields render hardcoded fallbacks (not stega-
// encoded, so not editable in the overlay); seeded fields ARE encoded.
//
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

const HOMEPAGE = {
  // ---------- Hero ----------
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

  // ---------- Stats Strip + Trust Band ----------
  statsStrip: [
    { iconName: "Users", num: "95M+", label: "Verified Contacts" },
    { iconName: "CheckCircle", num: "98%", label: "Accuracy Rate" },
    { iconName: "Briefcase", num: "500+", label: "Industries" },
    { iconName: "TrendingUp", num: "10K+", label: "Campaigns" },
  ],
  trustHeading: "Trusted by leading organizations worldwide",
  trustBrands: [
    "MICROSOFT", "IBM", "ORACLE", "SALESFORCE", "CISCO",
    "ADOBE", "ACCENTURE", "INTEL", "SNOWFLAKE", "WORKDAY",
  ],

  // ---------- Value Props ----------
  valueKicker: "Why Lorann",
  valueTitleStart: "The data advantage that drives",
  valueTitleHighlight: "real performance",
  valueDescription:
    "Tap or hover any card to explore. Purpose-built for teams that need more than a list — they need audiences that perform.",
  valueCards: [
    {
      iconName: "ShieldCheck",
      title: "Verified, high-accuracy data",
      desc: "Every record is continuously verified, deduplicated, and refreshed — so campaigns reach live contacts.",
      backTitle: "What's inside",
      backList: [
        "Monthly phone verification",
        "Real-time email validation",
        "Automated deduplication",
        "Bounce + hard-fail removal",
      ],
      link: "/why-lorann/verified-data",
      accent: "linear-gradient(135deg, #1D45D9, #2F5DEC)",
      accentBg: "linear-gradient(135deg, #13256E, #162D8C)",
    },
    {
      iconName: "Target",
      title: "Precision targeting at scale",
      desc: "Segment by industry, role, intent, geography, and behavior across B2B, healthcare, and consumer datasets.",
      backTitle: "Segmentation powers",
      backList: [
        "Firmographic filters",
        "Technographic signals",
        "Intent & Behavioral data",
        "Marketing Analytics Modeling",
      ],
      link: "/why-lorann/precision-targeting",
      accent: "linear-gradient(135deg, #00A7EF, #22BFFF)",
      accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
    },
    {
      iconName: "Zap",
      title: "Built for activation",
      desc: "Audiences deploy directly into CRM, email, Programmatic, and omnichannel workflows — no reformatting, no friction.",
      backTitle: "Native integrations",
      backList: [
        "Salesforce, HubSpot, Marketo",
        "LinkedIn, Meta, Google Ads",
        "Direct mail workflows",
        "Custom CSV / API delivery",
      ],
      link: "/solutions/data-activation",
      accent: "linear-gradient(135deg, #1736B3, #00A7EF)",
      accentBg: "linear-gradient(135deg, #162D8C, #008AC7)",
    },
    {
      iconName: "Activity",
      title: "Signal intelligence",
      desc: "Signal eXchange™ layers first-party lead data with intent signals — producing audiences that convert at higher rates.",
      backTitle: "Signal eXchange™ power",
      backList: [
        "First-party lead data layer",
        "Real-time intent signals",
        "Continuous profile refresh",
        "Higher-converting audiences",
      ],
      link: "/solutions/signal-exchange",
      accent: "linear-gradient(135deg, #2F5DEC, #00A7EF)",
      accentBg: "linear-gradient(135deg, #1736B3, #0C4A6E)",
    },
    {
      iconName: "GitMerge",
      title: "Flexible delivery",
      desc: "We work with your existing platforms and stack — delivering data in formats aligned to your campaign workflows.",
      backTitle: "Delivery options",
      backList: [
        "CSV, Excel, JSON, XML",
        "REST API integration",
        "SFTP / secure transfer",
        "Scheduled refresh cycles",
      ],
      link: "/why-lorann/flexible-delivery",
      accent: "linear-gradient(135deg, #162D8C, #1D45D9)",
      accentBg: "linear-gradient(135deg, #13256E, #1736B3)",
    },
    {
      iconName: "Lock",
      title: "Privacy-first compliance",
      desc: "GDPR, CCPA, and CAN-SPAM compliant across all datasets. Strong governance from source to delivery.",
      backTitle: "Compliance framework",
      backList: [
        "GDPR / UK-GDPR",
        "CCPA / CPRA",
        "CAN-SPAM Act",
        "HIPAA-conscious practices",
      ],
      link: "/why-lorann/privacy-compliance",
      accent: "linear-gradient(135deg, #008AC7, #22BFFF)",
      accentBg: "linear-gradient(135deg, #0C4A6E, #008AC7)",
    },
  ],

  // ---------- Signal eXchange ----------
  signalKicker: "Proprietary Intelligence",
  signalTitle:
    "Meet Signal eXchange™—\nwhere lead data meets\nlive intent.",
  signalDescription:
    "The industry's first continuously evolving dataset that fuses first-party lead data with real-time intent signals — delivering audiences that don't just reach the right people, they reach ready buyers.",
  signalFeatures: [
    "First-party + intent fusion",
    "Continuously refreshed",
    "Higher conversion rates",
    "Ready for every channel",
  ],
  signalCta: {
    label: "Request Demo",
    href: "mailto:info@lorannllc.com?subject=Signal%20eXchange%20Demo",
  },

  // ---------- How It Works ----------
  howKicker: "The Process",
  howTitleStart: "A simple,",
  howTitleHighlight: "four-step",
  howTitleEnd: "path from data to results",
  howDescription:
    "Structured delivery that gets your audiences live, performing, and improving — fast.",
  howSteps: [
    {
      iconName: "Crosshair",
      title: "Define",
      desc: "We align on your target audience, campaign goals, and KPIs — establishing clear benchmarks.",
    },
    {
      iconName: "Database",
      title: "Build",
      desc: "We construct and refine audience segments using high-quality sources and Signal eXchange™ enrichment.",
    },
    {
      iconName: "GitMerge",
      title: "Activate",
      desc: "Audiences deploy across CRM, email, Programmatic platforms, and lead programs — ensuring full marketing coverage.",
    },
    {
      iconName: "TrendingUp",
      title: "Optimize",
      desc: "Continuous monitoring, data refresh, and optimization cycles ensure your audiences improve over time.",
    },
  ],

  // ---------- Stats / Numbers ----------
  numbersKicker: "The Numbers",
  numbersTitleStart: "Built for",
  numbersTitleHighlight: "real performance",
  numbersDescription:
    "Every metric reflects data quality, process rigor, and a commitment to client outcomes.",
  numbersStats: [
    { iconName: "Users", count: 95, suffix: "M+", label: "Verified B2B & B2C Contacts", offset: 40 },
    { iconName: "CheckCircle", count: 98, suffix: "%", label: "Data Accuracy Rate", offset: 10 },
    { iconName: "Briefcase", count: 500, suffix: "+", label: "Industries & Verticals", offset: 120 },
    { iconName: "TrendingUp", count: 10, suffix: "K+", label: "Campaigns Powered", offset: 80 },
  ],

  // ---------- Solutions ----------
  solutionsKicker: "Solutions",
  solutionsTitleStart: "Flexible solutions for",
  solutionsTitleHighlight: "every campaign",
  solutionsDescription:
    "Focused services that adapt to your marketing stack and operational workflow.",
  solutionsRows: [
    {
      id: "audience-targeting",
      kicker: "Core Service",
      title: "Precision",
      titleAccent: "audience targeting",
      desc: "Leverage high-quality B2B, healthcare, and consumer data to build precise audiences based on industry, role, behavior, and intent signals — with Marketing Analytics Modeling for scale.",
      feats: [
        "Custom audience segmentation",
        "Firmographic, technographic, behavioral filters",
        "B2B, healthcare & consumer datasets",
        "Marketing Analytics Modeling",
      ],
      cta: "Learn More",
      ctaHref: "/solutions/audience-targeting",
      vizVariant: "A",
      reverse: false,
    },
    {
      id: "data-enrichment",
      kicker: "Enhancement",
      title: "Data",
      titleAccent: "enrichment",
      desc: "Enhance existing datasets with firmographic, technographic, and intent signals — then apply predictive modeling to prioritize the prospects most likely to convert.",
      feats: [
        "Firmographic & technographic append",
        "Real-time intent signal integration",
        "Predictive lead scoring models",
        "CRM-ready delivery formats",
      ],
      cta: "Learn More",
      ctaHref: "/solutions/data-enrichment",
      vizVariant: "B",
      reverse: true,
    },
  ],

  // ---------- Industries ----------
  industriesKicker: "Verticals",
  industriesTitleStart: "Deep expertise across",
  industriesTitleHighlight: "every industry",
  industriesDescription:
    "Vertical knowledge where data precision, targeting accuracy, and performance matter most.",
  industriesItems: [
    { id: "healthcare", iconName: "Heart", title: "Healthcare", desc: "Physicians, hospitals, and allied health with HIPAA-conscious practices.", href: "/industries/healthcare" },
    { id: "financial", iconName: "BarChart3", title: "Financial", desc: "Banks, credit unions, wealth management, and insurance with intent signals.", href: "/industries/financial" },
    { id: "b2b", iconName: "Building2", title: "B2B", desc: "Decision-makers, department heads, and procurement teams everywhere.", href: "/industries/b2b" },
    { id: "insurance", iconName: "Shield", title: "Insurance", desc: "Auto, life, health, and property buyers from high-intent lead programs.", href: "/industries/insurance" },
    { id: "automotive", iconName: "Car", title: "Automotive", desc: "In-market buyers, dealerships, fleet operators, and aftermarket networks.", href: "/industries/automotive" },
  ],

  // ---------- Final CTA ----------
  finalCtaKicker: "Let's Build Together",
  finalCtaTitleStart: "Build the right audience\nfor your",
  finalCtaTitleHighlight: "business.",
  finalCtaDescription:
    "Tell us your goals — we'll develop a data strategy aligned to your targeting, activation, and performance needs.",
  finalCtaPrimary: { label: "Get Started", href: "/contact" },
  finalCtaSecondary: {
    label: "Talk to an Expert",
    href: "mailto:info@lorannllc.com?subject=Talk%20to%20an%20Expert",
  },
  finalCtaTrust: ["No long-term contracts", "GDPR & CCPA compliant", "Free consultation"],

  // ---------- SEO ----------
  metaTitle: "Lorann — List Smarter · Data-Driven Audience Intelligence",
  metaDescription:
    "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets. Powered by Signal eXchange™.",
  focusKeyphrase: "audience intelligence",
  noIndex: false,
};

// Idempotent seed:
// 1. Make sure both published and draft docs exist.
// 2. Patch with `setIfMissing` so any field already edited in Studio is preserved.
for (const id of ["homepage", "drafts.homepage"]) {
  await client.createIfNotExists({ _id: id, _type: "homepage" });
  await client.patch(id).setIfMissing(HOMEPAGE).commit();
}

console.log(
  "Seeded Homepage singleton (published + draft, existing fields preserved)."
);
