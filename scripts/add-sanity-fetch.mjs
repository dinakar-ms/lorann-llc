// Modifies all inner page files to:
// 1. Import sanityFetch and groq
// 2. Convert to async function
// 3. Add sanityFetch call for the page document
// 4. Pass fetched data to metadata and template props where possible
//
// Run: node scripts/add-sanity-fetch.mjs

import { existsSync, readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const appDir = join(projectRoot, "app");

function findInnerPages() {
  const results = [];

  const sections = ["about", "solutions", "why-lorann", "industries"];
  for (const sec of sections) {
    const secPath = join(appDir, sec);
    if (!existsSync(secPath)) continue;
    for (const entry of readdirSync(secPath)) {
      const pagePath = join(secPath, entry, "page.tsx");
      if (statSync(join(secPath, entry)).isDirectory() && existsSync(pagePath)) {
        results.push({ slug: `${sec}/${entry}`, filePath: pagePath });
      }
    }
  }

  function walkDir(dir, slugPrefix) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry);
      if (!statSync(fullPath).isDirectory()) continue;
      const slug = slugPrefix ? `${slugPrefix}/${entry}` : entry;
      const pagePath = join(fullPath, "page.tsx");
      if (existsSync(pagePath)) {
        results.push({ slug: `data-assets/${slug}`, filePath: pagePath });
      }
      walkDir(fullPath, slug);
    }
  }
  walkDir(join(appDir, "data-assets"), "");

  const insightsPath = join(appDir, "insights");
  if (existsSync(insightsPath)) {
    for (const entry of readdirSync(insightsPath)) {
      if (entry === "industry-trends") continue;
      const pagePath = join(insightsPath, entry, "page.tsx");
      if (existsSync(join(insightsPath, entry)) && statSync(join(insightsPath, entry)).isDirectory() && existsSync(pagePath)) {
        results.push({ slug: `insights/${entry}`, filePath: pagePath });
      }
    }
  }

  return results;
}

function transformPage(src, slug) {
  // Calculate relative depth for import path
  const depth = slug.split("/").length + 1; // +1 for app/ directory
  const prefix = "../".repeat(depth);

  // Already transformed?
  if (src.includes("sanityFetch")) return null;

  let result = src;

  // 1. Add imports at the top (after existing imports)
  const sanityImports = `import { groq } from "next-sanity";\nimport { sanityFetch } from "${prefix}sanity/lib/fetch";\n`;

  // Find last import line
  const lines = result.split("\n");
  let lastImportIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("import ") || lines[i].match(/^} from /)) {
      lastImportIdx = i;
    }
  }
  if (lastImportIdx >= 0) {
    lines.splice(lastImportIdx + 1, 0, sanityImports);
    result = lines.join("\n");
  }

  // 2. Add the query and type
  const queryBlock = `
const PAGE_QUERY = groq\`*[_type == "page" && slug.current == "${slug}"][0]{
  _id, h1, "slug": slug.current, metaTitle, metaDescription, content
}\`;
`;

  // Insert before the first export
  const exportIdx = result.indexOf("\nexport ");
  if (exportIdx >= 0) {
    result = result.slice(0, exportIdx) + queryBlock + result.slice(exportIdx);
  }

  // 3. Replace static metadata with generateMetadata
  const staticMetaMatch = result.match(/export const metadata:\s*Metadata\s*=\s*\{([\s\S]*?)\};/);
  if (staticMetaMatch) {
    const metaBlock = staticMetaMatch[0];
    // Extract title and description from the static metadata
    const titleM = metaBlock.match(/title:\s*["'`]([^"'`]+)["'`]/);
    const descM = metaBlock.match(/description:\s*\n?\s*["'`]([^"'`]+)["'`]/s) ||
                  metaBlock.match(/description:\s*["'`]([^"'`]+)["'`]/);
    const defaultTitle = titleM ? titleM[1] : "Lorann LLC";
    const defaultDesc = descM ? descM[1] : "";

    const genMeta = `export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<any>({ query: PAGE_QUERY, tags: ["page:${slug}"] });
  return {
    title: page?.metaTitle || "${defaultTitle.replace(/"/g, '\\"')}",
    description: page?.metaDescription || "${defaultDesc.replace(/"/g, '\\"')}",
  };
}`;
    result = result.replace(metaBlock, genMeta);
  }

  // 4. Convert default function to async and add fetch
  // Match: export default function XYZ() {
  const funcMatch = result.match(/export default function (\w+)\(\)\s*\{/);
  if (funcMatch) {
    const funcName = funcMatch[1];
    const fetchLine = `  const _page = await sanityFetch<any>({ query: PAGE_QUERY, tags: ["page:${slug}"] });\n`;
    result = result.replace(
      `export default function ${funcName}() {`,
      `export default async function ${funcName}() {\n${fetchLine}`
    );
  }

  // 5. For LeafPage: replace titlePlain/titleAccent/description with fetched values
  if (result.includes("LeafPage")) {
    // Replace titlePlain prop
    result = result.replace(
      /titlePlain=["'`]([^"'`]+)["'`]/,
      (match, val) => `titlePlain={_page?.h1 || "${val.replace(/"/g, '\\"')}"}`
    );
    // Clear titleAccent since h1 has the full title
    result = result.replace(
      /titleAccent=["'`]([^"'`]+)["'`]/,
      (match, val) => `titleAccent={"${val.replace(/"/g, '\\"')}"}`
    );
    // Replace description
    result = result.replace(
      /description=["'`]([\s\S]*?)["'`]\n/,
      (match, val) => `description={_page?.metaDescription || "${val.replace(/"/g, '\\"').replace(/\n/g, " ")}"}\n`
    );
  }

  // 6. For HubPage: same pattern
  if (result.includes("HubPage")) {
    result = result.replace(
      /titlePlain=["'`]([^"'`]+)["'`]/,
      (match, val) => `titlePlain={_page?.h1 || "${val.replace(/"/g, '\\"')}"}`
    );
    result = result.replace(
      /titleAccent=["'`]([^"'`]+)["'`]/,
      (match, val) => `titleAccent={"${val.replace(/"/g, '\\"')}"}`
    );
  }

  // 7. For SubPageHero pages (about, solutions, etc.)
  if (result.includes("SubPageHero") && !result.includes("LeafPage") && !result.includes("HubPage")) {
    // Replace the hero description prop with fetched value
    const heroDescMatch = result.match(/(<SubPageHero[\s\S]*?)description=["'`]([^"'`]+)["'`]/);
    if (heroDescMatch) {
      const val = heroDescMatch[2];
      result = result.replace(
        heroDescMatch[0],
        `${heroDescMatch[1]}description={_page?.metaDescription || "${val.replace(/"/g, '\\"')}"}`
      );
    }
  }

  return result;
}

// ─── Main ────────────────────────────────────────────────────────
const pages = findInnerPages();
console.log(`Found ${pages.length} inner pages to transform.\n`);

let modified = 0;
let skipped = 0;

for (const { slug, filePath } of pages) {
  try {
    const src = readFileSync(filePath, "utf8");
    const transformed = transformPage(src, slug);
    if (transformed === null) {
      console.log(`  - Already transformed: ${slug}`);
      skipped++;
      continue;
    }
    writeFileSync(filePath, transformed, "utf8");
    console.log(`  ✓ ${slug}`);
    modified++;
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
  }
}

console.log(`\nDone. Modified: ${modified} | Skipped: ${skipped}`);
