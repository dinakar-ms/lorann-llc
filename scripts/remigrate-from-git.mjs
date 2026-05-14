// Re-migrates all inner page content by reading original files from git history.
// The original page files were deleted from disk but exist in HEAD.
//
// Run: node scripts/remigrate-from-git.mjs
//
// This script reads each original page.tsx via `git show HEAD:app/...`,
// extracts ALL structured fields, and patches the corresponding Sanity documents.

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// ─── Env ─────────────────────────────────────────────────
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

function _key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

// ─── Read file from git ─────────────────────────────────
function readFromGit(relPath) {
  try {
    return execSync(`git show HEAD:${relPath}`, {
      cwd: projectRoot,
      encoding: "utf8",
      maxBuffer: 1024 * 1024,
    });
  } catch {
    return null;
  }
}

// ─── Find all inner pages from git ──────────────────────
function findInnerPages() {
  // Get list of all deleted page files
  const output = execSync(
    `git diff HEAD --name-only --diff-filter=D`,
    { cwd: projectRoot, encoding: "utf8" }
  );

  const results = [];
  for (const line of output.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed.endsWith("/page.tsx")) continue;
    if (!trimmed.startsWith("app/")) continue;
    // Extract slug from path like app/about/company-overview/page.tsx -> about/company-overview
    const slug = trimmed.replace(/^app\//, "").replace(/\/page\.tsx$/, "");
    // Skip top-level section pages that have their own route files
    if (!slug.includes("/") && ["about", "solutions", "data-assets", "insights", "industries", "why-lorann", "how-it-works", "resources", "signal-exchange", "contact"].includes(slug)) continue;
    results.push({ slug, gitPath: trimmed });
  }
  return results;
}

// ─── HTML entity + JSX unescaping ───────────────────────
function unesc(s) {
  if (!s) return s;
  return s
    .replace(/&rsquo;/g, "’")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&quot;/g, '"')
    .replace(/\\u2019/g, "’")
    .replace(/\{" "\}/g, " ")
    .replace(/\{"\s*"\}/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Strip JSX/HTML tags
function stripTags(s) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

// ─── Detect template type ───────────────────────────────
function detectTemplateType(src) {
  if (src.includes("LeafPage")) return "leaf";
  if (src.includes("HubPage")) return "hub";
  return "custom";
}

// ─── Extract hero from SubPageHero ──────────────────────
function extractSubPageHero(src) {
  const result = {};

  // Find the SubPageHero block.
  // Can't use simple /<SubPageHero(.*?)\/>/s because </> inside title matches first.
  // Instead, find the component start and then scan for the self-closing /> on its own line.
  const startIdx = src.indexOf("<SubPageHero");
  if (startIdx === -1) return result;

  // Find the closing /> that's on its own line (not inside a JSX fragment like </>)
  let depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < src.length - 1; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") depth--;
    else if (depth === 0 && src[i] === "/" && src[i + 1] === ">") {
      // This is a /> outside of any {} expression - it's the component close
      endIdx = i;
      break;
    }
  }
  if (endIdx === -1) return result;

  const h = src.substring(startIdx + "<SubPageHero".length, endIdx);

  // Kicker
  const kickerM = h.match(/kicker="([^"]*)"/);
  if (kickerM) result.kicker = unesc(kickerM[1]);

  // Title: title={<> plain <span className="text-gradient">accent</span></>}
  const titleM = h.match(/title=\{[\s\n]*<>[\s\n]*([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>[\s\S]*?<\/>/);
  if (titleM) {
    result.titlePlain = unesc(stripTags(titleM[1]));
    result.titleAccent = unesc(stripTags(titleM[2]));
  }

  // Description - handle multi-line and special chars
  // Pattern 1: description="..."
  const descM = h.match(/description="((?:[^"\\]|\\.)*)"/s);
  if (descM) result.heroDescription = unesc(descM[1]);
  // Pattern 2: description={_page?.x || "..."}
  if (!result.heroDescription) {
    const descFM = h.match(/description=\{_page\?\.[\w.]+ \|\| "((?:[^"\\]|\\.)*)"\}/s);
    if (descFM) result.heroDescription = unesc(descFM[1]);
  }

  // Primary CTA
  const primaryM = h.match(/primaryCta=\{\{\s*label:\s*"([^"]*)"[\s,]*href:\s*"([^"]*)"\s*\}\}/);
  if (primaryM) result.primaryCta = { _type: "ctaLink", label: primaryM[1], href: primaryM[2] };

  // Secondary CTA
  const secondaryM = h.match(/secondaryCta=\{\{\s*label:\s*"([^"]*)"[\s,]*href:\s*"([^"]*)"\s*\}\}/);
  if (secondaryM) result.secondaryCta = { _type: "ctaLink", label: secondaryM[1], href: secondaryM[2] };

  return result;
}

// ─── Extract inline hero (why-lorann pages) ─────────────
function extractInlineHero(src) {
  const result = {};

  // Find the hero section
  const heroM = src.match(/<section[^>]*radial-hero[^>]*>([\s\S]*?)<\/section>/);
  if (!heroM) return result;
  const h = heroM[1];

  // Kicker - inside <span> after animate-pulse-dot
  const kickerM = h.match(/animate-pulse-dot[^/]*\/>\s*([\s\S]*?)\s*<\/span>/);
  if (kickerM) result.kicker = unesc(stripTags(kickerM[1]));

  // Title from h1
  const h1M = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (h1M) {
    const gradM = h1M[1].match(/([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>/);
    if (gradM) {
      result.titlePlain = unesc(stripTags(gradM[1]));
      result.titleAccent = unesc(stripTags(gradM[2]));
    }
  }

  // Description from <p> with text-lg
  const descM = h.match(/<p[^>]*text-lg[^>]*>([\s\S]*?)<\/p>/);
  if (descM) result.heroDescription = unesc(stripTags(descM[1]));

  // Primary CTA - bg-gradient button
  const primaryM = h.match(/<Link\s+href="([^"]*)"[^>]*bg-gradient[^>]*>([\s\S]*?)<\/Link>/);
  if (primaryM) {
    const label = unesc(stripTags(primaryM[2]));
    result.primaryCta = { _type: "ctaLink", label, href: primaryM[1] };
  }

  // Secondary CTA - bg-white border button
  const secondaryM = h.match(/<Link\s+href="([^"]*)"[^>]*bg-white\s+border[^>]*>([\s\S]*?)<\/Link>/);
  if (secondaryM) {
    const label = unesc(stripTags(secondaryM[1]));
    // Wait, the href is in a different position. Let me re-check.
  }
  // Alternative secondary pattern
  const sec2M = h.match(/<Link\s+href="([^"]*)"[\s\S]*?bg-white[\s\S]*?border[\s\S]*?>([\s\S]*?)<\/Link>/);
  if (sec2M) {
    const label = unesc(stripTags(sec2M[2]));
    if (label && label !== result.primaryCta?.label) {
      result.secondaryCta = { _type: "ctaLink", label, href: sec2M[1] };
    }
  }

  return result;
}

// ─── Extract intro section ──────────────────────────────
function extractIntro(src) {
  const result = {};

  // The intro section is the FIRST bg-white section after the hero
  // It has the two-column layout with kicker, headline, and paragraphs

  // Find all bg-white sections
  const sections = [];
  const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = sectionRx.exec(src)) !== null) {
    sections.push({ content: sm[1], full: sm[0], index: sm.index });
  }

  // Find the intro section - it's a bg-white section with the two-column grid layout
  // containing font-mono kicker, h2, and paragraphs
  for (const sec of sections) {
    const { content } = sec;
    // Skip if it contains SectionHeader or FeatureCardGrid (those are feature grid sections)
    if (content.includes("SectionHeader") || content.includes("FeatureCardGrid")) continue;
    // Skip if it's not a bg-white or first section
    if (!sec.full.includes("bg-white") && !sec.full.includes("py-20")) continue;
    // Check for the two-column intro pattern
    if (!content.includes("text-slate-700") || !content.includes("space-y-4")) continue;

    // Extract kicker
    const kickerM = content.match(/font-mono[^>]*text-blue-700[^>]*>([\s\S]*?)<\/div>/);
    if (kickerM) {
      result.introKicker = unesc(stripTags(kickerM[1]));
    }

    // Extract headline from h2
    const h2M = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (h2M) {
      const gradM = h2M[1].match(/([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>/);
      if (gradM) {
        result.introHeadlinePlain = unesc(stripTags(gradM[1]));
        result.introHeadlineAccent = unesc(stripTags(gradM[2]));
      }
    }

    // Extract paragraphs from the space-y-4 div
    const paraBlockM = content.match(/text-slate-700[^>]*space-y-4[^>]*>([\s\S]*?)<\/div>/);
    if (paraBlockM) {
      const paras = [];
      const pRx = /<p[^>]*>([\s\S]*?)<\/p>/g;
      let pm;
      while ((pm = pRx.exec(paraBlockM[1])) !== null) {
        paras.push(unesc(stripTags(pm[1])));
      }
      if (paras.length > 0) result.introParagraphs = paras;
    }

    break; // Only extract from first matching section
  }

  return result;
}

// ─── Parse object array from JSX ────────────────────────
function parseObjectArray(raw) {
  const results = [];
  // Use a more robust approach - match balanced braces
  const items = splitObjectArray(raw);

  for (const body of items) {
    const obj = {};

    // Extract Icon: Name (capitalized)
    const iconM = body.match(/Icon:\s*([A-Z]\w+)/);
    if (iconM) obj.icon = iconM[1];

    // icon: name (lowercase - for inline .map arrays)
    const iconLower = body.match(/icon:\s*([A-Z]\w+)/);
    if (iconLower && !obj.icon) obj.icon = iconLower[1];

    // Extract all string fields
    const fields = [
      "title", "desc", "body", "label", "value", "href", "badge",
      "industry", "client", "challenge", "approach", "outcome",
      "name", "bio", "initials", "photo", "objectPosition", "linkedin", "email"
    ];

    for (const field of fields) {
      // Match field: "value" or field: 'value'
      // Handle escaped quotes and multi-line
      const fm = body.match(new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
      if (fm) {
        obj[field] = unesc(fm[1]);
        continue;
      }
      // Single quotes
      const fmSQ = body.match(new RegExp(`${field}:\\s*'((?:[^'\\\\]|\\\\.)*)'`, "s"));
      if (fmSQ) obj[field] = unesc(fmSQ[1]);
    }

    // Handle desc that might use backticks (template literals)
    if (!obj.desc) {
      const descBT = body.match(/desc:\s*`((?:[^`\\]|\\.)*)`/s);
      if (descBT) obj.desc = unesc(descBT[1]);
    }

    if (Object.keys(obj).length > 0) results.push(obj);
  }

  return results;
}

// Split a raw string containing [{...}, {...}] into individual object bodies
function splitObjectArray(raw) {
  const items = [];
  let depth = 0;
  let start = -1;

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === "{") {
      if (depth === 0) start = i + 1;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start >= 0) {
        items.push(raw.substring(start, i));
        start = -1;
      }
    }
  }

  return items;
}

// ─── Extract const array variable ───────────────────────
function extractArrayVar(src, varName) {
  // Match: const VARNAME = [...];  or const VARNAME: Type[] = [...];
  const rx = new RegExp(`const\\s+${varName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`, "m");
  const m = src.match(rx);
  return m ? m[1] : null;
}

// ─── Extract feature grid sections from SectionHeader+FeatureCardGrid ──
function extractFeatureGridSections(src) {
  const sections = [];

  // Find all <section> blocks
  const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = sectionRx.exec(src)) !== null) {
    const block = sm[1];

    // Must contain either SectionHeader or FeatureCardGrid
    const hasSH = block.includes("SectionHeader");
    const hasFCG = block.includes("FeatureCardGrid");
    if (!hasSH && !hasFCG) continue;

    const section = { _key: _key() };

    // Extract SectionHeader props
    if (hasSH) {
      // Kicker
      const kickerM = block.match(/SectionHeader[\s\S]*?kicker="([^"]*)"/);
      if (kickerM) section.kicker = unesc(kickerM[1]);
      // Alternative: kicker={`...`}
      if (!section.kicker) {
        const kickerBT = block.match(/SectionHeader[\s\S]*?kicker=\{`([^`]*)`\}/);
        if (kickerBT) section.kicker = unesc(kickerBT[1]);
      }

      // Title with gradient
      const titleM = block.match(/SectionHeader[\s\S]*?title=\{[\s\n]*<>[\s\n]*([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>[\s\S]*?<\/>/);
      if (titleM) {
        section.titlePlain = unesc(stripTags(titleM[1]));
        section.titleAccent = unesc(stripTags(titleM[2]));
      }

      // Description
      const descM = block.match(/SectionHeader[\s\S]*?description="((?:[^"\\]|\\.)*)"/s);
      if (descM) section.description = unesc(descM[1]);
    }

    // Extract FeatureCardGrid props
    if (hasFCG) {
      // Columns
      const colsM = block.match(/FeatureCardGrid[\s\S]*?columns=\{(\d)\}/);
      if (colsM) section.columns = parseInt(colsM[1]);

      // Style
      const styleM = block.match(/FeatureCardGrid[\s\S]*?style="(\w+)"/);
      if (styleM) section.style = styleM[1];

      // Features array (inline)
      const featuresM = block.match(/features=\{\[([\s\S]*?)\]\}/);
      if (featuresM) {
        section.features = parseObjectArray(featuresM[1]).map(f => ({
          _type: "featureItem", _key: _key(),
          icon: f.icon, title: f.title, desc: f.desc || f.body,
          href: f.href, badge: f.badge,
        }));
      }
    }

    if (section.features && section.features.length > 0) {
      sections.push(section);
    }
  }

  return sections;
}

// ─── Extract inline card grid (why-lorann pages with .map) ──
function extractInlineCardGridSections(src) {
  const sections = [];

  // Pattern: {[{...}, {...}].map((card) => ...)}
  // These are inside <section> blocks
  const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = sectionRx.exec(src)) !== null) {
    const block = sm[1];
    if (!block.includes(".map(")) continue;
    if (block.includes("SectionHeader") || block.includes("FeatureCardGrid")) continue;

    // Find the inline array
    const arrayM = block.match(/\{\s*\[([\s\S]*?)\]\.map\(/);
    if (!arrayM) continue;

    const items = parseObjectArray(arrayM[1]);
    if (items.length === 0) continue;

    const section = { _key: _key() };

    // Extract the section header (inline h2 with kicker)
    const kickerM = block.match(/animate-pulse-dot[^/]*\/>\s*([\s\S]*?)\s*<\/span>/);
    if (kickerM) section.kicker = unesc(stripTags(kickerM[1]));

    const h2M = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (h2M) {
      const gradM = h2M[1].match(/([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>/);
      if (gradM) {
        section.titlePlain = unesc(stripTags(gradM[1]));
        section.titleAccent = unesc(stripTags(gradM[2]));
      }
    }

    section.columns = items.length <= 4 ? items.length : 3;
    section.style = "card";
    section.features = items.map(i => ({
      _type: "featureItem", _key: _key(),
      icon: i.icon, title: i.title, desc: i.desc || i.body,
    }));

    sections.push(section);
  }

  return sections;
}

// ─── Extract CTA banner ────────────────────────────────
function extractCtaBanner(src) {
  // Find sections with the dark gradient background (CTA banners)
  const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = sectionRx.exec(src)) !== null) {
    const block = sm[1];
    if (!block.includes("linear-gradient(135deg, #03061A")) continue;
    // Skip feature grid sections
    if (block.includes("SectionHeader") || block.includes("FeatureCardGrid")) continue;
    // Skip the final CTA section
    if (block.includes("final-bg") || block.includes("contact-cta") || block.includes("grid-drift-bg")) continue;

    const result = { _type: "ctaBanner" };

    // Icon - look for Lucide component name
    const iconM = block.match(/<([A-Z]\w+)\s+className="w-14\s+h-14/);
    if (iconM) result.icon = iconM[1];

    // Kicker
    const kickerM = block.match(/text-cyan-300[^>]*mb-3[^>]*>\s*([\s\S]*?)\s*<\/div>/);
    if (kickerM) result.kicker = unesc(stripTags(kickerM[1]));

    // Title (h3)
    const h3M = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
    if (h3M) result.title = unesc(stripTags(h3M[1]));

    // Body
    const bodyM = block.match(/text-white\/75[^>]*>([\s\S]*?)<\/p>/);
    if (bodyM) result.body = unesc(stripTags(bodyM[1]));

    if (result.title) return result;
  }
  return null;
}

// ─── Parse a LeafPage ───────────────────────────────────
function parseLeafPage(src) {
  const data = { templateType: "leaf" };

  // Kicker
  const kickerM = src.match(/kicker="([^"]*)"/);
  if (kickerM) data.kicker = unesc(kickerM[1]);

  // Title
  const titlePM = src.match(/titlePlain="([^"]*)"/);
  if (titlePM) data.titlePlain = unesc(titlePM[1]);
  // Fallback pattern
  if (!data.titlePlain) {
    const titleFM = src.match(/titlePlain=\{_page\?\.[\w.]+ \|\| "([^"]*)"\}/);
    if (titleFM) data.titlePlain = unesc(titleFM[1]);
  }

  const titleAM = src.match(/titleAccent="([^"]*)"/);
  if (titleAM) data.titleAccent = unesc(titleAM[1]);
  if (!data.titleAccent) {
    const accentFM = src.match(/titleAccent=\{"([^"]*)"\}/);
    if (accentFM) data.titleAccent = unesc(accentFM[1]);
  }

  // Description
  const descM = src.match(/description="((?:[^"\\]|\\.)*)"/s);
  if (descM) data.heroDescription = unesc(descM[1]);
  if (!data.heroDescription) {
    const descFM = src.match(/description=\{_page\?\.[\w.]+ \|\| "((?:[^"\\]|\\.)*)"\}/s);
    if (descFM) data.heroDescription = unesc(descFM[1]);
  }

  // Stats
  const statsRaw = extractArrayVar(src, "STATS");
  if (statsRaw) {
    data.stats = parseObjectArray(statsRaw).map(s => ({
      _type: "stat", _key: _key(), label: s.label, value: s.value
    }));
  }

  // Intro - from inline intro={{ ... }} prop
  const introBlockM = src.match(/intro=\{\{([\s\S]*?)\}\}\s*(?:attributes|useCases|compliance|backLink|\/?>)/);
  if (introBlockM) {
    const ib = introBlockM[1];
    const iKickerM = ib.match(/kicker:\s*"([^"]*)"/);
    if (iKickerM) data.introKicker = unesc(iKickerM[1]);

    const iHPM = ib.match(/headlinePlain:\s*"((?:[^"\\]|\\.)*)"/s);
    if (iHPM) data.introHeadlinePlain = unesc(iHPM[1]);

    const iHAM = ib.match(/headlineAccent:\s*"((?:[^"\\]|\\.)*)"/s);
    if (iHAM) data.introHeadlineAccent = unesc(iHAM[1]);

    // Paragraphs array
    const parasM = ib.match(/paragraphs:\s*\[([\s\S]*?)\]/);
    if (parasM) {
      const paras = [];
      const strRx = /"((?:[^"\\]|\\.)*)"/gs;
      let pm;
      while ((pm = strRx.exec(parasM[1])) !== null) {
        paras.push(unesc(pm[1]));
      }
      data.introParagraphs = paras;
    }
  }

  // Attributes
  const attrsRaw = extractArrayVar(src, "ATTRIBUTES");
  if (attrsRaw) {
    data.attributes = parseObjectArray(attrsRaw).map(a => ({
      _type: "featureItem", _key: _key(),
      icon: a.icon, title: a.title, desc: a.desc,
    }));
  }

  // Use cases
  const useCasesRaw = extractArrayVar(src, "USE_CASES");
  if (useCasesRaw) {
    data.useCases = parseObjectArray(useCasesRaw).map(u => ({
      _key: _key(), title: u.title, desc: u.desc,
    }));
  }

  // Compliance
  const compBlockM = src.match(/compliance=\{\{([\s\S]*?)\}\}/);
  if (compBlockM) {
    const cb = compBlockM[1];
    const chM = cb.match(/headline:\s*"((?:[^"\\]|\\.)*)"/s);
    if (chM) data.complianceHeadline = unesc(chM[1]);
    const cbM = cb.match(/body:\s*"((?:[^"\\]|\\.)*)"/s);
    if (cbM) data.complianceBody = unesc(cbM[1]);
  }

  // Back link
  const blM = src.match(/backLink=\{\{\s*label:\s*"([^"]*)"[\s,]*href:\s*"([^"]*)"\s*\}\}/);
  if (blM) data.backLink = { _type: "ctaLink", label: blM[1], href: blM[2] };

  return data;
}

// ─── Parse a HubPage ────────────────────────────────────
function parseHubPage(src) {
  const data = { templateType: "hub" };

  // Kicker
  const kickerM = src.match(/kicker="([^"]*)"/);
  if (kickerM) data.kicker = unesc(kickerM[1]);

  // Title
  const titlePM = src.match(/titlePlain="([^"]*)"/);
  if (titlePM) data.titlePlain = unesc(titlePM[1]);
  if (!data.titlePlain) {
    const titleFM = src.match(/titlePlain=\{_page\?\.[\w.]+ \|\| "([^"]*)"\}/);
    if (titleFM) data.titlePlain = unesc(titleFM[1]);
  }

  const titleAM = src.match(/titleAccent="([^"]*)"/);
  if (titleAM) data.titleAccent = unesc(titleAM[1]);
  if (!data.titleAccent) {
    const accentFM = src.match(/titleAccent=\{"([^"]*)"\}/);
    if (accentFM) data.titleAccent = unesc(accentFM[1]);
  }

  // Description
  const descM = src.match(/description="((?:[^"\\]|\\.)*)"/s);
  if (descM) data.heroDescription = unesc(descM[1]);
  if (!data.heroDescription) {
    const descFM = src.match(/description=\{_page\?\.[\w.]+ \|\| "((?:[^"\\]|\\.)*)"\}/s);
    if (descFM) data.heroDescription = unesc(descFM[1]);
  }

  // CTAs
  const primaryM = src.match(/primaryCta=\{\{\s*label:\s*"([^"]*)"[\s,]*href:\s*"([^"]*)"\s*\}\}/);
  if (primaryM) data.primaryCta = { _type: "ctaLink", label: primaryM[1], href: primaryM[2] };

  const secondaryM = src.match(/secondaryCta=\{\{\s*label:\s*"([^"]*)"[\s,]*href:\s*"([^"]*)"\s*\}\}/);
  if (secondaryM) data.secondaryCta = { _type: "ctaLink", label: secondaryM[1], href: secondaryM[2] };

  // Intro - from intro={{ ... }} prop
  const introBlockM = src.match(/intro=\{\{([\s\S]*?)\}\}\s*(?:childrenSection|attributesSection|\/?>)/);
  if (introBlockM) {
    const ib = introBlockM[1];
    const iKickerM = ib.match(/kicker:\s*"([^"]*)"/);
    if (iKickerM) data.introKicker = unesc(iKickerM[1]);

    const iHPM = ib.match(/headlinePlain:\s*"((?:[^"\\]|\\.)*)"/s);
    if (iHPM) data.introHeadlinePlain = unesc(iHPM[1]);

    const iHAM = ib.match(/headlineAccent:\s*"((?:[^"\\]|\\.)*)"/s);
    if (iHAM) data.introHeadlineAccent = unesc(iHAM[1]);

    const parasM = ib.match(/paragraphs:\s*\[([\s\S]*?)\]/);
    if (parasM) {
      const paras = [];
      const strRx = /"((?:[^"\\]|\\.)*)"/gs;
      let pm;
      while ((pm = strRx.exec(parasM[1])) !== null) {
        paras.push(unesc(pm[1]));
      }
      data.introParagraphs = paras;
    }
  }

  // Children section - match the full childrenSection={{ ... }} including nested items
  const csFullM = src.match(/childrenSection=\{\{([\s\S]*?)\}\}\s*(?:attributesSection|\/?>)/);
  if (csFullM) {
    const cs = csFullM[1];

    const csKickerM = cs.match(/kicker:\s*"([^"]*)"/);
    if (csKickerM) data.childrenSectionKicker = unesc(csKickerM[1]);

    const csTitlePM = cs.match(/titlePlain:\s*"([^"]*)"/);
    if (csTitlePM) data.childrenSectionTitlePlain = unesc(csTitlePM[1]);

    const csTitleAM = cs.match(/titleAccent:\s*"([^"]*)"/);
    if (csTitleAM) data.childrenSectionTitleAccent = unesc(csTitleAM[1]);

    const csDescM = cs.match(/description:\s*"((?:[^"\\]|\\.)*)"/s);
    if (csDescM) data.childrenSectionDescription = unesc(csDescM[1]);

    const csColsM = cs.match(/columns:\s*(\d)/);
    if (csColsM) data.childrenSectionColumns = parseInt(csColsM[1]);

    // Items array
    const itemsM = cs.match(/items:\s*\[([\s\S]*)\]/);
    if (itemsM) {
      data.childrenItems = parseObjectArray(itemsM[1]).map(item => ({
        _type: "featureItem", _key: _key(),
        icon: item.icon, title: item.title, desc: item.desc,
        href: item.href, badge: item.badge,
      }));
    }
  }

  // Attributes section (optional)
  const asFullM = src.match(/attributesSection=\{\{([\s\S]*?)\}\}\s*\/>/);
  if (asFullM) {
    const as = asFullM[1];

    const asKickerM = as.match(/kicker:\s*"([^"]*)"/);
    if (asKickerM) data.hubAttributesSectionKicker = unesc(asKickerM[1]);

    const asTitlePM = as.match(/titlePlain:\s*"([^"]*)"/);
    if (asTitlePM) data.hubAttributesSectionTitlePlain = unesc(asTitlePM[1]);

    const asTitleAM = as.match(/titleAccent:\s*"([^"]*)"/);
    if (asTitleAM) data.hubAttributesSectionTitleAccent = unesc(asTitleAM[1]);

    const asDescM = as.match(/description:\s*"((?:[^"\\]|\\.)*)"/s);
    if (asDescM) data.hubAttributesSectionDescription = unesc(asDescM[1]);

    const asColsM = as.match(/columns:\s*(\d)/);
    if (asColsM) data.hubAttributesSectionColumns = parseInt(asColsM[1]);

    const asItemsM = as.match(/items:\s*\[([\s\S]*)\]/);
    if (asItemsM) {
      data.hubAttributesItems = parseObjectArray(asItemsM[1]).map(item => ({
        _type: "featureItem", _key: _key(),
        icon: item.icon, title: item.title, desc: item.desc,
      }));
    }
  }

  return data;
}

// ─── Parse a custom page ────────────────────────────────
function parseCustomPage(src) {
  const data = { templateType: "custom" };

  // Try SubPageHero first
  const hero = extractSubPageHero(src);
  if (hero.kicker || hero.titlePlain) {
    Object.assign(data, hero);
  } else {
    // Try inline hero (why-lorann pages)
    const inlineHero = extractInlineHero(src);
    Object.assign(data, inlineHero);
  }

  // Intro section
  const intro = extractIntro(src);
  Object.assign(data, intro);

  // Feature grid sections (SectionHeader + FeatureCardGrid)
  data.featureGridSections = extractFeatureGridSections(src);

  // Also check for inline card grid (why-lorann pages use .map)
  if (data.featureGridSections.length === 0) {
    data.featureGridSections = extractInlineCardGridSections(src);
  } else {
    // Merge any inline grids too
    const inlineGrids = extractInlineCardGridSections(src);
    if (inlineGrids.length > 0) {
      data.featureGridSections = [...data.featureGridSections, ...inlineGrids];
    }
  }

  // CTA banner
  data.ctaBannerData = extractCtaBanner(src);

  // Team members
  const teamRaw = extractArrayVar(src, "TEAM");
  if (teamRaw) {
    data.teamMembers = parseObjectArray(teamRaw).map(m => ({
      _type: "teamMember", _key: _key(),
      name: m.name, title: m.title, bio: m.bio,
      initials: m.initials, photo: m.photo,
      objectPosition: m.objectPosition,
      linkedin: m.linkedin, email: m.email,
    }));
  }

  // Case studies
  const casesRaw = extractArrayVar(src, "CASES");
  if (casesRaw) {
    const cases = [];
    // Parse case study objects which have nested metrics arrays
    const caseItems = splitObjectArray(casesRaw);
    for (const body of caseItems) {
      const cs = {};
      for (const field of ["industry", "client", "title", "challenge", "approach", "outcome"]) {
        const fm = body.match(new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
        if (fm) cs[field] = unesc(fm[1]);
      }

      // Extract nested metrics array
      const metricsM = body.match(/metrics:\s*\[([\s\S]*?)\]/);
      if (metricsM) {
        cs.metrics = parseObjectArray(metricsM[1]).map(met => ({
          _type: "stat", _key: _key(), label: met.label, value: met.value,
        }));
      }

      if (cs.title) {
        cases.push({ _type: "caseStudy", _key: _key(), ...cs });
      }
    }
    if (cases.length > 0) data.caseStudies = cases;
  }

  // Newsletter content
  if (src.includes("NewsletterForm")) {
    // Newsletter headline
    const nlSection = src.match(/What you[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/);
    if (nlSection) {
      const gradM = nlSection[1].match(/([\s\S]*?)<span\s+className="text-gradient">([\s\S]*?)<\/span>/);
      if (gradM) {
        data.newsletterHeadlinePlain = unesc(stripTags(gradM[1]));
        data.newsletterHeadlineAccent = unesc(stripTags(gradM[2]));
      }
    }

    // Newsletter body paragraph
    const nlBodyM = src.match(/<p[^>]*text-slate-600[^>]*text-\[17px\][^>]*>([\s\S]*?)<\/p>/);
    if (nlBodyM) data.newsletterBody = unesc(stripTags(nlBodyM[1]));

    // Newsletter bullets
    const bulletsM = src.match(/\{\s*\[([\s\S]*?)\]\.map\(/);
    if (bulletsM) {
      const bullets = [];
      const strRx = /"((?:[^"\\]|\\.)*)"/g;
      let bm;
      while ((bm = strRx.exec(bulletsM[1])) !== null) {
        bullets.push(unesc(bm[1]));
      }
      if (bullets.length > 0) data.newsletterBullets = bullets;
    }
  }

  // Mission/Vision cards (company-overview page)
  // These are inline 2-column cards with icons, not using SectionHeader/FeatureCardGrid
  if (src.includes("Our mission") && src.includes("Where we")) {
    const missionCards = [];
    // Find all card blocks with icon + h3 + p inside a 2-col grid section
    const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
    let secM;
    while ((secM = sectionRx.exec(src)) !== null) {
      const block = secM[1];
      if (!block.includes("md:grid-cols-2")) continue;
      if (block.includes("SectionHeader") || block.includes("FeatureCardGrid")) continue;

      // Extract each card
      const cardRx = /<div[^>]*reveal[^>]*>([\s\S]*?)(?=<div[^>]*reveal|<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/g;
      let cm;
      while ((cm = cardRx.exec(block)) !== null) {
        const card = cm[1];
        const iconM = card.match(/<([A-Z]\w+)\s+className="w-5\s+h-5/);
        const h3M = card.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
        const pM = card.match(/<p[^>]*text-slate-600[^>]*>([\s\S]*?)<\/p>/);
        if (h3M && pM) {
          missionCards.push({
            _type: "featureItem", _key: _key(),
            icon: iconM ? iconM[1] : undefined,
            title: unesc(stripTags(h3M[1])),
            desc: unesc(stripTags(pM[1])),
          });
        }
      }

      if (missionCards.length > 0) {
        data.featureGridSections.push({
          _key: _key(),
          columns: 2,
          style: "card",
          features: missionCards,
        });
        break;
      }
    }
  }

  // "Don't see yours?" callout (industries-served page)
  if (src.includes("Don") && src.includes("see yours")) {
    // Extract this as a ctaBanner
    const sectionRx2 = /<section[^>]*>([\s\S]*?)<\/section>/g;
    let secM2;
    while ((secM2 = sectionRx2.exec(src)) !== null) {
      const block = secM2[1];
      if (!block.includes("see yours")) continue;
      const result = { _type: "ctaBanner" };
      const kickerM = block.match(/font-mono[^>]*text-blue-700[^>]*>\s*([\s\S]*?)\s*<\/div>/);
      if (kickerM) result.kicker = unesc(stripTags(kickerM[1]));
      const h3M = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
      if (h3M) result.title = unesc(stripTags(h3M[1]));
      const pM = block.match(/<p[^>]*text-slate-600[^>]*>([\s\S]*?)<\/p>/);
      if (pM) result.body = unesc(stripTags(pM[1]));
      const ctaM = block.match(/href="([^"]*)"[^>]*>\s*([\s\S]*?)\s*<(?:ArrowRight|\/Link)/);
      if (ctaM) {
        result.ctaLabel = unesc(stripTags(ctaM[2]));
        result.ctaHref = ctaM[1];
      }
      if (result.title) {
        data.ctaBannerData = result;
        break;
      }
    }
  }

  return data;
}

// ─── Main ───────────────────────────────────────────────
const pages = findInnerPages();
console.log(`Found ${pages.length} inner pages to re-migrate.\n`);

let migrated = 0;
let skipped = 0;
let errors = 0;

for (const { slug, gitPath } of pages) {
  try {
    const src = readFromGit(gitPath);
    if (!src) {
      console.log(`  ⊘ Cannot read from git: ${gitPath}`);
      skipped++;
      continue;
    }

    const type = detectTemplateType(src);

    let data;
    if (type === "leaf") data = parseLeafPage(src);
    else if (type === "hub") data = parseHubPage(src);
    else data = parseCustomPage(src);

    // Clean up undefined/null/empty values
    const patch = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== null && v !== undefined && v !== "") {
        if (Array.isArray(v) && v.length === 0) continue;
        patch[k] = v;
      }
    }

    // Find the published document
    const doc = await client.fetch(
      `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]{_id}`,
      { slug }
    );

    if (!doc) {
      console.log(`  ✗ No Sanity doc found for slug: ${slug}`);
      skipped++;
      continue;
    }

    // Patch published document
    await client.patch(doc._id).set(patch).commit();

    // Patch draft document if it exists
    const draftId = `drafts.${doc._id}`;
    const draftDoc = await client.fetch(`*[_id == $id][0]{_id}`, { id: draftId });
    if (draftDoc) {
      await client.patch(draftId).set(patch).commit();
    }

    const fieldCount = Object.keys(patch).length;
    const details = [];
    if (patch.heroDescription) details.push("hero✓");
    if (patch.primaryCta) details.push("cta1✓");
    if (patch.secondaryCta) details.push("cta2✓");
    if (patch.introKicker) details.push("intro✓");
    if (patch.featureGridSections?.length) details.push(`grids:${patch.featureGridSections.length}`);
    if (patch.ctaBannerData) details.push("banner✓");
    if (patch.teamMembers?.length) details.push(`team:${patch.teamMembers.length}`);
    if (patch.caseStudies?.length) details.push(`cases:${patch.caseStudies.length}`);
    if (patch.childrenItems?.length) details.push(`children:${patch.childrenItems.length}`);
    if (patch.stats?.length) details.push(`stats:${patch.stats.length}`);
    if (patch.attributes?.length) details.push(`attrs:${patch.attributes.length}`);
    if (patch.useCases?.length) details.push(`uses:${patch.useCases.length}`);
    if (patch.newsletterBullets?.length) details.push("newsletter✓");

    console.log(`  ✓ [${type}] ${slug} (${fieldCount} fields) [${details.join(", ")}]`);
    migrated++;
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone. Migrated: ${migrated} | Skipped: ${skipped} | Errors: ${errors}`);
