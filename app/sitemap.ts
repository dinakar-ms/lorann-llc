// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// FULL SITEMAP — combines:
//   1. Static app/ routes (contact, data-assets, how-it-works, etc.)
//   2. All CMS pages from Sanity (the [...slug] dynamic routes)
//   3. Industry trends articles
//   4. All new Healthcare sub-pages
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";
import { createClient } from "@sanity/client";

const BASE_URL = "https://www.lorannllc.com";

const sanity = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Priority by URL depth
function getPriority(urlPath: string): number {
  const depth = urlPath.split("/").filter(Boolean).length;
  if (depth === 0) return 1.0;
  if (depth === 1) return 0.9;
  if (depth === 2) return 0.8;
  if (depth === 3) return 0.7;
  if (depth === 4) return 0.6;
  return 0.5;
}

// Change frequency by path
function getChangeFreq(
  urlPath: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (urlPath === "" || urlPath === "/") return "weekly";
  if (urlPath.includes("insights") || urlPath.includes("industry-trends")) return "weekly";
  if (urlPath.includes("data-assets")) return "weekly";
  if (urlPath.split("/").filter(Boolean).length <= 1) return "weekly";
  return "monthly";
}

function entry(
  urlPath: string,
  lastMod?: string | Date
): MetadataRoute.Sitemap[number] {
  const fullUrl = urlPath === "" ? BASE_URL : `${BASE_URL}/${urlPath.replace(/^\//, "")}`;
  return {
    url: fullUrl,
    lastModified: lastMod ? new Date(lastMod) : new Date(),
    changeFrequency: getChangeFreq(urlPath),
    priority: getPriority(urlPath),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── 1. Static/singleton routes ──────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    entry(""),                            // homepage
    entry("contact"),
    entry("data-assets"),
    entry("how-it-works"),
    entry("industries"),
    entry("insights"),
    entry("insights/industry-trends"),
    entry("resources"),
    entry("signal-exchange"),
    entry("solutions"),
    entry("solutions/audience-targeting"),
    entry("solutions/cost-per-lead"),
    entry("solutions/data-activation"),
    entry("solutions/data-enrichment"),
    entry("solutions/signal-exchange"),
    entry("about"),
    entry("about/company-overview"),
    entry("about/our-approach"),
    entry("about/meet-the-team"),
    entry("about/industries-served"),
  ];

  // ── 2. All Sanity `page` documents (CMS-managed routes) ─────────
  let cmsPages: MetadataRoute.Sitemap = [];
  try {
    const pages = await sanity.fetch<
      { slug: string; _updatedAt: string; noIndex: boolean | null }[]
    >(
      `*[_type == "page" && defined(slug.current) && !(_id match "drafts.*")]{
        "slug": slug.current,
        _updatedAt,
        noIndex
      }`
    );

    cmsPages = pages
      .filter((p) => !p.noIndex && p.slug)
      .map((p) => entry(p.slug, p._updatedAt));
  } catch (e) {
    console.error("[sitemap] Failed to fetch CMS pages:", e);
  }

  // ── 3. Industry Trends articles ──────────────────────────────────
  let trendPages: MetadataRoute.Sitemap = [];
  try {
    const trends = await sanity.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "industryTrend" && defined(slug.current) && !(_id match "drafts.*")]{
        "slug": "insights/industry-trends/" + slug.current,
        _updatedAt
      }`
    );
    trendPages = trends.map((t) => entry(t.slug, t._updatedAt));
  } catch {
    // silently skip if collection doesn't exist
  }

  // ── 4. Data card detail pages ─────────────────────────────────────
  let dataCardPages: MetadataRoute.Sitemap = [];
  try {
    const cards = await sanity.fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "dataCard" && defined(slug.current) && !(_id match "drafts.*")]{
        "slug": "data-assets/data-cards/" + slug.current,
        _updatedAt
      }`
    );
    dataCardPages = cards.map((c) => entry(c.slug, c._updatedAt));
  } catch {
    // silently skip if collection doesn't exist
  }

  // ── Deduplicate by URL ───────────────────────────────────────────
  const seen = new Set<string>();
  const all = [
    ...staticRoutes,
    ...cmsPages,
    ...trendPages,
    ...dataCardPages,
  ].filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  // ── Sort: homepage first, then by priority desc, then alphabetically
  all.sort((a, b) => {
    if (a.url === BASE_URL) return -1;
    if (b.url === BASE_URL) return 1;
    const pa = (a.priority as number) ?? 0;
    const pb = (b.priority as number) ?? 0;
    if (pb !== pa) return pb - pa;
    return a.url.localeCompare(b.url);
  });

  return all;
}
