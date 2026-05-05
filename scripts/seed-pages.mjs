// Seeds a Sanity `page` document for every existing site route.
// Extracts title/description from each static page's `metadata` export when present,
// otherwise derives them from the route path.
// Run: node scripts/seed-pages.mjs

import { createClient } from "@sanity/client";
import { readdirSync, statSync, existsSync, readFileSync } from "node:fs";
import { join, relative, sep, dirname } from "node:path";
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN.");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

// Pages already migrated to dedicated singletons — skip them.
const SKIP_ROUTES = new Set(["/", "/insights/industry-trends"]);

const appDir = join(projectRoot, "app");
const SKIP_TOP = new Set(["api", "studio", "p"]);

function findPages(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith("(") || entry.startsWith("_")) continue;
    if (entry.startsWith("[")) continue; // dynamic segments
    const full = join(dir, entry);
    const rel = relative(appDir, full);
    if (SKIP_TOP.has(rel.split(sep)[0])) continue;
    if (statSync(full).isDirectory()) findPages(full, acc);
    else if (entry === "page.tsx") {
      const route = relative(appDir, dir).split(sep).join("/");
      const r = route === "" ? "/" : "/" + route;
      acc.push({ route: r, file: full });
    }
  }
  return acc;
}

// Best-effort extraction of `metadata.title` and `metadata.description` from a page.tsx file.
function extractMetadata(filePath) {
  try {
    const src = readFileSync(filePath, "utf8");
    const m = src.match(
      /export\s+const\s+metadata\s*[:=][^=]*=\s*\{([\s\S]*?)\n\};/m
    );
    if (!m) return {};
    const body = m[1];
    const titleMatch = body.match(/title\s*:\s*"([^"]+)"/);
    const descMatch = body.match(/description\s*:\s*\n?\s*"([^"]+)"/);
    return {
      title: titleMatch?.[1],
      description: descMatch?.[1],
    };
  } catch {
    return {};
  }
}

const routes = findPages(appDir)
  .filter((r) => !SKIP_ROUTES.has(r.route))
  .sort((a, b) => a.route.localeCompare(b.route));
console.log(`Found ${routes.length} routes`);

function humanize(seg) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function routeToH1(route) {
  const parts = route.split("/").filter(Boolean);
  return humanize(parts[parts.length - 1]);
}
function routeToBreadcrumb(route) {
  return route.split("/").filter(Boolean).map(humanize).join(" / ");
}
function routeToSlug(route) {
  return route.replace(/^\//, "");
}

const docs = routes.map(({ route, file }) => {
  const slug = routeToSlug(route);
  const h1 = routeToH1(route);
  const breadcrumb = routeToBreadcrumb(route);
  const docId = `page-${slug.replace(/\//g, "-")}`;
  const meta = extractMetadata(file);
  return {
    _id: docId,
    _type: "page",
    h1,
    slug: { _type: "slug", current: slug },
    metaTitle: meta.title || `${h1} | Lorann`,
    metaDescription: meta.description || `${breadcrumb} — Lorann LLC.`,
    focusKeyphrase: h1.toLowerCase(),
    noIndex: false,
    originalRoute: route,
  };
});

const tx = client.transaction();
for (const doc of docs) tx.createOrReplace(doc);

console.log("Committing transaction...");
const res = await tx.commit();
console.log(`Created/replaced ${res.results.length} page documents.`);
