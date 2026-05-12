// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// AUTO-DISCOVERING SITEMAP
// Scans every page.tsx / page.mdx inside the app/ folder at build time.
// You NEVER need to add URLs manually — just create a new page file and it
// will appear in /sitemap.xml automatically on the next build/deploy.
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const BASE_URL = "https://lorann-llc.vercel.app"; // ← your production domain

// Segments to exclude from the sitemap
const EXCLUDED_SEGMENTS = new Set([
  "studio",   // Sanity studio
  "api",      // API routes
  "_next",    // Next internals
]);

// File names that indicate a routable page
const PAGE_FILES = new Set(["page.tsx", "page.ts", "page.jsx", "page.js", "page.mdx"]);

// Priority rules: the fewer segments, the higher the priority
function getPriority(segments: string[]): number {
  const depth = segments.length;
  if (depth === 0) return 1.0;  // home
  if (depth === 1) return 0.9;  // /solutions, /data-assets, /contact …
  if (depth === 2) return 0.8;  // /solutions/audience-targeting …
  if (depth === 3) return 0.7;  // /data-assets/b2b-database/healthcare …
  if (depth === 4) return 0.6;  // /data-assets/b2b-database/healthcare/doctors-email-list …
  return 0.5;                   // deeper pages
}

// Change-frequency rules
function getChangeFreq(
  segments: string[]
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  const top = segments[0] ?? "";
  if (top === "insights" || top === "data-assets") return "weekly";
  if (segments.length <= 1) return "weekly";
  return "monthly";
}

// Recursively walk the app/ directory and collect all routable paths
function collectRoutes(dir: string, segments: string[] = []): string[][] {
  const routes: string[][] = [];
  let entries: fs.Dirent[];

  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return routes;
  }

  const hasPage = entries.some(
    (e) => e.isFile() && PAGE_FILES.has(e.name)
  );

  if (hasPage) {
    routes.push(segments);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const name = entry.name;

    // Skip hidden folders, Next.js internals, and excluded segments
    if (name.startsWith("_") || name.startsWith(".")) continue;
    if (EXCLUDED_SEGMENTS.has(name)) continue;

    // Skip dynamic-segment folders like [slug] — add those separately
    // via generateStaticParams if needed
    if (name.startsWith("(") || name.startsWith("[")) continue;

    const child = collectRoutes(path.join(dir, name), [...segments, name]);
    routes.push(...child);
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // __dirname inside app/ points to .next/server/app at runtime,
  // so we resolve relative to the project root using process.cwd()
  const appDir = path.join(process.cwd(), "app");

  const routes = collectRoutes(appDir);

  return routes.map((segments) => ({
    url: segments.length === 0 ? BASE_URL : `${BASE_URL}/${segments.join("/")}`,
    lastModified: new Date(),
    changeFrequency: getChangeFreq(segments),
    priority: getPriority(segments),
  }));
}