// Seeds the Industry Trends singleton with the original page content.
// Run: node scripts/seed-industry-trends.mjs

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

const POSTS = [
  {
    title: "Why first-party lead data outperforms third-party files in 2026.",
    excerpt:
      "The intent signal layer matters more than the list size. A look at how Signal eXchange™ is built, and why continuous refresh beats quarterly batch updates.",
    category: "Data Strategy",
    readingTime: "7 min read",
    date: "Apr 2026",
    slug: "#",
  },
  {
    title: "Data activation is the new bottleneck — not data sourcing.",
    excerpt:
      "Marketing teams have more data than ever, and less of it is making it into production. Why integration, not acquisition, is the unlock.",
    category: "Activation",
    readingTime: "6 min read",
    date: "Apr 2026",
    slug: "#",
  },
  {
    title: "Three patterns we see in healthcare audience campaigns.",
    excerpt:
      "Provider-to-patient journeys, specialty-specific targeting, and compliance as a design constraint (not an afterthought).",
    category: "Healthcare",
    readingTime: "5 min read",
    date: "Mar 2026",
    slug: "#",
  },
  {
    title: "The case against generic consumer data.",
    excerpt:
      "Demographics alone don't predict behavior. Why intent and lifecycle overlays transform the same audience into a very different result.",
    category: "Consumer",
    readingTime: "4 min read",
    date: "Mar 2026",
    slug: "#",
  },
  {
    title: "How we think about ABM data quality.",
    excerpt:
      "Role mapping, technographic overlays, and the verification cadence that keeps account lists alive past their quarterly — written up as a working playbook.",
    category: "B2B",
    readingTime: "8 min read",
    date: "Feb 2026",
    slug: "#",
  },
  {
    title: "Auto and insurance: when intent data changes the ROI math.",
    excerpt:
      "Case observations from running Signal eXchange™ across live campaigns — the segments that converted, and the ones that didn't.",
    category: "Insurance",
    readingTime: "6 min read",
    date: "Feb 2026",
    slug: "#",
  },
];

const [featured, ...rest] = POSTS;

const doc = {
  _id: "industryTrendsPage",
  _type: "industryTrendsPage",
  kicker: "Insights",
  titleStart: "Perspectives on data, audience strategy,",
  titleHighlight: "and performance marketing.",
  description:
    "Articles, commentary, strategic POV, and market observations from the Lorann team.",
  primaryCta: { label: "Subscribe for Updates", href: "/insights/newsletter" },
  secondaryCta: { label: "See Case Studies", href: "/insights/case-studies" },
  featuredPost: { ...featured, _type: "object" },
  sectionKicker: "Latest",
  sectionTitleStart: "Recent commentary",
  sectionTitleHighlight: "and POV.",
  sectionDescription:
    "Short reads and long reads — grouped by the channels and industries they touch.",
  posts: rest.map((p, i) => ({ _key: `post-${i}`, ...p })),
  metaTitle: "Industry Trends · Lorann LLC",
  metaDescription:
    "Perspectives on data, audience strategy, and performance-driven marketing — articles, commentary, and strategic POV.",
  focusKeyphrase: "industry trends",
  noIndex: false,
};

await client.createOrReplace(doc);
console.log("Seeded Industry Trends singleton.");
