// Migrates all inner page content from hardcoded JSX files into Sanity
// structured fields (templateType, hero props, intro, stats, attributes, etc.)
//
// Run: node scripts/migrate-inner-pages.mjs

import { createClient } from "@sanity/client";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const appDir = join(projectRoot, "app");

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

// ─── Find all inner pages ────────────────────────────────
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

// ─── Regex helpers ───────────────────────────────────────
function unesc(s) {
  return s
    .replace(/&rsquo;/g, "’")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/\\u2019/g, "’")
    .replace(/\{" "\}/g, " ")
    .replace(/\\"/g, '"');
}

function extractStringProp(src, name) {
  // Match: name="value" or name={'value'} or name={_page?.x || "value"}
  const rxDirect = new RegExp(`${name}="([^"]*)"`, "s");
  const rxFallback = new RegExp(`${name}=\\{_page\\?\\.[\\w.]+ \\|\\| "([^"]*)"\\}`, "s");
  const rxExpr = new RegExp(`${name}=\\{"([^"]*)"\\}`, "s");
  const m = src.match(rxFallback) || src.match(rxDirect) || src.match(rxExpr);
  return m ? unesc(m[1]) : null;
}

function extractTitleParts(src) {
  // Pattern: title={<> plain text <span className="text-gradient">accent text</span></>}
  const m = src.match(/title=\{[\s\n]*<>[\s\n]*([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>[\s\S]*?<\/>/);
  if (m) {
    let plain = m[1].replace(/\{" "\}/g, " ").replace(/[\n\r]+/g, " ").trim();
    let accent = m[2].replace(/\{" "\}/g, " ").replace(/[\n\r]+/g, " ").trim();
    return { titlePlain: unesc(plain), titleAccent: unesc(accent) };
  }
  return null;
}

function extractCta(src, name) {
  const rx = new RegExp(`${name}=\\{\\{\\s*label:\\s*"([^"]*)"\\s*,\\s*href:\\s*"([^"]*)"\\s*\\}\\}`, "s");
  const m = src.match(rx);
  if (m) return { _type: "ctaLink", label: m[1], href: m[2] };
  return null;
}

function extractArrayVar(src, varName) {
  const rx = new RegExp(`const ${varName}[^=]*=\\s*\\[([\\s\\S]*?)\\];`, "m");
  const m = src.match(rx);
  return m ? m[1] : null;
}

function parseObjectArray(raw) {
  const results = [];
  const objRx = /\{([\s\S]*?)\}(?=\s*[,\]])/g;
  let m;
  while ((m = objRx.exec(raw)) !== null) {
    const body = m[1];
    const obj = {};

    // Extract Icon: Name
    const iconM = body.match(/Icon:\s*(\w+)/);
    if (iconM) obj.icon = iconM[1];
    const iconLower = body.match(/icon:\s*(\w+)/);
    if (iconLower) obj.icon = iconLower[1];

    // Extract string fields
    for (const field of ["title", "desc", "body", "label", "value", "href", "badge",
      "industry", "client", "challenge", "approach", "outcome",
      "name", "bio", "initials", "photo", "objectPosition", "linkedin", "email"]) {
      const fm = body.match(new RegExp(`${field}:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
      if (fm) obj[field] = unesc(fm[1]);
    }

    // Extract title field (may be multi-line or have special chars)
    if (!obj.title) {
      const titleM = body.match(/title:\s*"((?:[^"\\\\]|\\\\.)*)"/s);
      if (titleM) obj.title = unesc(titleM[1]);
    }

    if (Object.keys(obj).length > 0) results.push(obj);
  }
  return results;
}

function extractIntroParagraphs(src) {
  // Match paragraphs: [ "...", "..." ] inside intro or inline <p> tags in intro section
  const introMatch = src.match(/paragraphs:\s*\[([\s\S]*?)\]\s*[,}]/);
  if (introMatch) {
    const raw = introMatch[1];
    const paras = [];
    const strRx = /"((?:[^"\\]|\\.)*)"/g;
    let m;
    while ((m = strRx.exec(raw)) !== null) {
      paras.push(unesc(m[1]));
    }
    return paras;
  }

  // For inline intro sections (custom pages), extract from <p> tags
  const introSectionM = src.match(/<section[^>]*py-20[^>]*bg-white[^>]*>[\s\S]*?<div[^>]*text-slate-700[^>]*space-y-4[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
  if (introSectionM) {
    const pBlock = introSectionM[1];
    const paras = [];
    const pRx = /<p>([\s\S]*?)<\/p>/g;
    let pm;
    while ((pm = pRx.exec(pBlock)) !== null) {
      let text = pm[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      paras.push(unesc(text));
    }
    if (paras.length > 0) return paras;
  }

  return [];
}

function extractIntroHeadline(src) {
  // Look for the intro section's headline with gradient
  const introSection = src.match(/<section[^>]*py-20[^>]*bg-white[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/);
  if (introSection) {
    const h2 = introSection[1];
    const gradientM = h2.match(/([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>/);
    if (gradientM) {
      const plain = gradientM[1].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      const accent = gradientM[2].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      return { headlinePlain: unesc(plain), headlineAccent: unesc(accent) };
    }
  }
  return null;
}

function extractIntroKicker(src) {
  // Look for kicker in the intro section (not the hero)
  const introSection = src.match(/<section[^>]*py-20[^>]*bg-white[^>]*>[\s\S]*?<div[^>]*font-mono[^>]*text-blue-700[^>]*>([\s\S]*?)<\/div>/);
  if (introSection) {
    const kicker = introSection[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return unesc(kicker);
  }
  return null;
}

// ─── Parse FeatureCardGrid sections from custom pages ────
function extractFeatureGridSections(src) {
  const sections = [];
  // Find all <section> blocks that contain SectionHeader + FeatureCardGrid
  const sectionRx = /<section[^>]*>([\s\S]*?)<\/section>/g;
  let sm;
  while ((sm = sectionRx.exec(src)) !== null) {
    const block = sm[1];
    if (!block.includes("SectionHeader") && !block.includes("FeatureCardGrid")) continue;

    const section = { _key: _key() };

    // Extract SectionHeader props
    const kickerM = block.match(/SectionHeader[\s\S]*?kicker="([^"]*)"/);
    if (kickerM) section.kicker = kickerM[1];

    // Title with gradient
    const titleM = block.match(/SectionHeader[\s\S]*?title=\{[\s\n]*<>[\s\n]*([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>[\s\S]*?<\/>/);
    if (titleM) {
      section.titlePlain = unesc(titleM[1].replace(/\{" "\}/g, " ").replace(/[\n\r]+/g, " ").trim());
      section.titleAccent = unesc(titleM[2].replace(/\{" "\}/g, " ").replace(/[\n\r]+/g, " ").trim());
    }

    // Description
    const descM = block.match(/SectionHeader[\s\S]*?description="([^"]*)"/);
    if (descM) section.description = unesc(descM[1]);

    // FeatureCardGrid props
    const colsM = block.match(/FeatureCardGrid[\s\S]*?columns=\{(\d)\}/);
    if (colsM) section.columns = parseInt(colsM[1]);

    const styleM = block.match(/FeatureCardGrid[\s\S]*?style="(\w+)"/);
    if (styleM) section.style = styleM[1];

    // Features array (inline)
    const featuresM = block.match(/features=\{\[([\s\S]*?)\]\}/);
    if (featuresM) {
      section.features = parseObjectArray(featuresM[1]).map(f => ({
        ...f, _type: "featureItem", _key: _key()
      }));
    }

    if (section.kicker || section.features) sections.push(section);
  }
  return sections;
}

// Extract CTA banner from custom pages
function extractCtaBanner(src) {
  // Match the blue banner section
  const bannerM = src.match(/<section[^>]*>([\s\S]*?)<\/section>/g);
  if (!bannerM) return null;

  for (const block of bannerM) {
    if (!block.includes("linear-gradient(135deg, #03061A")) continue;
    if (block.includes("SectionHeader") || block.includes("FeatureCardGrid")) continue;

    const result = { _type: "ctaBanner" };

    // Icon
    const iconM = block.match(/<(\w+)\s+className="w-14 h-14/);
    if (iconM) {
      // Icon component name is in a variable reference like <Activity ...> or <card.icon ...>
      const iconNameM = block.match(/<([A-Z]\w+)\s+className="w-14/);
      if (iconNameM) result.icon = iconNameM[1];
    }

    // Kicker
    const kickerM = block.match(/text-cyan-300[^>]*mb-3[^>]*>\s*([\s\S]*?)\s*<\/div>/);
    if (kickerM) result.kicker = unesc(kickerM[1].replace(/<[^>]+>/g, "").trim());

    // Title (h3)
    const h3M = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
    if (h3M) result.title = unesc(h3M[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

    // Body
    const bodyM = block.match(/text-white\/75[^>]*>([\s\S]*?)<\/p>/);
    if (bodyM) result.body = unesc(bodyM[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

    // CTA link
    const ctaM = block.match(/href="([^"]*)"[^>]*>\s*([\s\S]*?)\s*<(?:ArrowRight|LucideIcons)/);
    if (ctaM) {
      result.ctaHref = ctaM[1];
      result.ctaLabel = unesc(ctaM[2].replace(/<[^>]+>/g, "").trim());
    }

    if (result.title) return result;
  }
  return null;
}

// ─── Detect template type ────────────────────────────────
function detectTemplateType(src) {
  if (src.includes("LeafPage")) return "leaf";
  if (src.includes("HubPage")) return "hub";
  return "custom";
}

// ─── Parse a LeafPage ────────────────────────────────────
function parseLeafPage(src, slug) {
  const data = { templateType: "leaf" };

  // Kicker
  data.kicker = extractStringProp(src, "kicker");

  // Title
  const titleM = src.match(/titlePlain=\{_page\?\.\w+ \|\| "([^"]*)"\}/);
  if (titleM) data.titlePlain = unesc(titleM[1]);
  else {
    const titleD = src.match(/titlePlain="([^"]*)"/);
    if (titleD) data.titlePlain = unesc(titleD[1]);
  }

  const accentM = src.match(/titleAccent=\{"([^"]*)"\}/);
  if (accentM) data.titleAccent = unesc(accentM[1]);
  else {
    const accentD = src.match(/titleAccent="([^"]*)"/);
    if (accentD) data.titleAccent = unesc(accentD[1]);
  }

  // Description
  data.heroDescription = extractStringProp(src, "description");

  // Stats
  const statsRaw = extractArrayVar(src, "STATS");
  if (statsRaw) {
    data.stats = parseObjectArray(statsRaw).map(s => ({
      _type: "stat", _key: _key(), label: s.label, value: s.value
    }));
  }

  // Intro
  const introKickerM = src.match(/intro=\{\{[\s\S]*?kicker:\s*"([^"]*)"/);
  if (introKickerM) data.introKicker = unesc(introKickerM[1]);

  const introHPM = src.match(/headlinePlain:\s*"([^"]*)"/);
  if (introHPM) data.introHeadlinePlain = unesc(introHPM[1]);

  const introHAM = src.match(/headlineAccent:\s*"([^"]*)"/);
  if (introHAM) data.introHeadlineAccent = unesc(introHAM[1]);

  data.introParagraphs = extractIntroParagraphs(src);

  // Attributes
  const attrsRaw = extractArrayVar(src, "ATTRIBUTES");
  if (attrsRaw) {
    data.attributes = parseObjectArray(attrsRaw).map(a => ({
      _type: "featureItem", _key: _key(), icon: a.icon || a.Icon, title: a.title, desc: a.desc
    }));
  }

  // Use cases
  const useCasesRaw = extractArrayVar(src, "USE_CASES");
  if (useCasesRaw) {
    data.useCases = parseObjectArray(useCasesRaw).map(u => ({
      _key: _key(), title: u.title, desc: u.desc
    }));
  }

  // Compliance
  const compHeadM = src.match(/compliance=\{\{[\s\S]*?headline:\s*"((?:[^"\\]|\\.)*)"/);
  if (compHeadM) data.complianceHeadline = unesc(compHeadM[1]);

  const compBodyM = src.match(/compliance=\{\{[\s\S]*?body:\s*"((?:[^"\\]|\\.)*)"/);
  if (compBodyM) data.complianceBody = unesc(compBodyM[1]);

  // Back link
  data.backLink = extractCta(src, "backLink");

  // Primary/secondary CTA (leaf pages have fixed CTAs in the template)
  // but some have custom secondaryCta via backLink

  return data;
}

// ─── Parse a HubPage ─────────────────────────────────────
function parseHubPage(src, slug) {
  const data = { templateType: "hub" };

  data.kicker = extractStringProp(src, "kicker");

  // Title
  const titleM = src.match(/titlePlain=\{_page\?\.\w+ \|\| "([^"]*)"\}/);
  if (titleM) data.titlePlain = unesc(titleM[1]);
  else {
    const titleD = src.match(/titlePlain="([^"]*)"/);
    if (titleD) data.titlePlain = unesc(titleD[1]);
  }

  const accentM = src.match(/titleAccent=\{"([^"]*)"\}/);
  if (accentM) data.titleAccent = unesc(accentM[1]);
  else {
    const accentD = src.match(/titleAccent="([^"]*)"/);
    if (accentD) data.titleAccent = unesc(accentD[1]);
  }

  data.heroDescription = extractStringProp(src, "description");

  // CTAs
  data.primaryCta = extractCta(src, "primaryCta");
  data.secondaryCta = extractCta(src, "secondaryCta");

  // Intro
  const introKickerM = src.match(/intro=\{\{[\s\S]*?kicker:\s*"([^"]*)"/);
  if (introKickerM) data.introKicker = unesc(introKickerM[1]);

  const introHPM = src.match(/headlinePlain:\s*"([^"]*)"/);
  if (introHPM) data.introHeadlinePlain = unesc(introHPM[1]);

  const introHAM = src.match(/headlineAccent:\s*"([^"]*)"/);
  if (introHAM) data.introHeadlineAccent = unesc(introHAM[1]);

  data.introParagraphs = extractIntroParagraphs(src);

  // Children section
  const csKickerM = src.match(/childrenSection=\{\{[\s\S]*?kicker:\s*"([^"]*)"/);
  if (csKickerM) data.childrenSectionKicker = unesc(csKickerM[1]);

  // Children section title — look inside childrenSection={{ ... }}
  const csBlock = src.match(/childrenSection=\{\{([\s\S]*?)\}\}\s*(?:\/>|attributesSection|$)/);
  if (csBlock) {
    const cs = csBlock[1];
    const csTitlePM = cs.match(/titlePlain:\s*"([^"]*)"/);
    if (csTitlePM) data.childrenSectionTitlePlain = unesc(csTitlePM[1]);
    const csTitleAM = cs.match(/titleAccent:\s*"([^"]*)"/);
    if (csTitleAM) data.childrenSectionTitleAccent = unesc(csTitleAM[1]);
    const csDescM = cs.match(/description:\s*"([^"]*)"/);
    if (csDescM) data.childrenSectionDescription = unesc(csDescM[1]);
    const csColsM = cs.match(/columns:\s*(\d)/);
    if (csColsM) data.childrenSectionColumns = parseInt(csColsM[1]);

    // Items
    const itemsM = cs.match(/items:\s*\[([\s\S]*)\]/);
    if (itemsM) {
      data.childrenItems = parseObjectArray(itemsM[1]).map(item => ({
        _type: "featureItem", _key: _key(),
        icon: item.icon || item.Icon,
        title: item.title,
        desc: item.desc,
        href: item.href,
        badge: item.badge,
      }));
    }
  }

  // Attributes section (optional)
  const asBlock = src.match(/attributesSection=\{\{([\s\S]*?)\}\}\s*\/>/);
  if (asBlock) {
    const as = asBlock[1];
    const asKickerM = as.match(/kicker:\s*"([^"]*)"/);
    if (asKickerM) data.hubAttributesSectionKicker = unesc(asKickerM[1]);
    const asTitlePM = as.match(/titlePlain:\s*"([^"]*)"/);
    if (asTitlePM) data.hubAttributesSectionTitlePlain = unesc(asTitlePM[1]);
    const asTitleAM = as.match(/titleAccent:\s*"([^"]*)"/);
    if (asTitleAM) data.hubAttributesSectionTitleAccent = unesc(asTitleAM[1]);
    const asDescM = as.match(/description:\s*"([^"]*)"/);
    if (asDescM) data.hubAttributesSectionDescription = unesc(asDescM[1]);
    const asColsM = as.match(/columns:\s*(\d)/);
    if (asColsM) data.hubAttributesSectionColumns = parseInt(asColsM[1]);

    const asItemsM = as.match(/items:\s*\[([\s\S]*)\]/);
    if (asItemsM) {
      data.hubAttributesItems = parseObjectArray(asItemsM[1]).map(item => ({
        _type: "featureItem", _key: _key(),
        icon: item.icon || item.Icon,
        title: item.title,
        desc: item.desc,
      }));
    }
  }

  return data;
}

// ─── Parse a custom page ─────────────────────────────────
function parseCustomPage(src, slug) {
  const data = { templateType: "custom" };

  // Hero from SubPageHero component
  const heroBlock = src.match(/<SubPageHero([\s\S]*?)\/>/);
  if (heroBlock) {
    const h = heroBlock[1];
    data.kicker = extractStringProp(h, "kicker");
    const tp = extractTitleParts(h);
    if (tp) {
      data.titlePlain = tp.titlePlain;
      data.titleAccent = tp.titleAccent;
    }

    // Description
    const descFallback = h.match(/description=\{_page\?\.\w+ \|\| "([^"]*)"\}/s);
    const descDirect = h.match(/description="([^"]*)"/s);
    if (descFallback) data.heroDescription = unesc(descFallback[1]);
    else if (descDirect) data.heroDescription = unesc(descDirect[1]);

    // CTAs
    data.primaryCta = extractCta(h, "primaryCta");
    data.secondaryCta = extractCta(h, "secondaryCta");
  }

  // Custom hero (why-lorann pages don't use SubPageHero)
  if (!heroBlock) {
    // Extract from inline hero section
    const heroSection = src.match(/<section[^>]*radial-hero[^>]*>([\s\S]*?)<\/section>/);
    if (heroSection) {
      const h = heroSection[1];
      // Kicker
      const kickerM = h.match(/animate-pulse-dot[^>]*\/>\s*([\w\s]+)\s*<\/span>/);
      if (kickerM) data.kicker = kickerM[1].trim();

      // Title
      const h1M = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
      if (h1M) {
        const gradM = h1M[1].match(/([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>/);
        if (gradM) {
          data.titlePlain = unesc(gradM[1].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
          data.titleAccent = unesc(gradM[2].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
        }
      }

      // Description
      const descM = h.match(/<p[^>]*text-lg[^>]*>([\s\S]*?)<\/p>/);
      if (descM) data.heroDescription = unesc(descM[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

      // CTAs
      const primaryM = h.match(/href="([^"]*)"[^>]*bg-gradient[^>]*>\s*([\s\S]*?)\s*<(?:ArrowRight|\/a)/);
      if (primaryM) {
        data.primaryCta = { _type: "ctaLink", label: primaryM[2].replace(/<[^>]+>/g, "").trim(), href: primaryM[1] };
      }
      const secondaryM = h.match(/href="([^"]*)"[^>]*bg-white\s+border[^>]*>\s*([\s\S]*?)\s*<\/(?:Link|a)/);
      if (secondaryM) {
        data.secondaryCta = { _type: "ctaLink", label: unesc(secondaryM[2].replace(/<[^>]+>/g, "").trim()), href: secondaryM[1] };
      }
    }
  }

  // Intro section
  data.introKicker = extractIntroKicker(src);
  const introHL = extractIntroHeadline(src);
  if (introHL) {
    data.introHeadlinePlain = introHL.headlinePlain;
    data.introHeadlineAccent = introHL.headlineAccent;
  }
  data.introParagraphs = extractIntroParagraphs(src);

  // Feature grid sections
  data.featureGridSections = extractFeatureGridSections(src);

  // Also check for inline card grids (why-lorann pages use .map() on inline arrays)
  if (data.featureGridSections.length === 0) {
    const inlineGridM = src.match(/\{\[([\s\S]*?)\]\.map\(\(card\)/);
    if (inlineGridM) {
      const items = parseObjectArray(inlineGridM[1]);
      if (items.length > 0) {
        // Find the section header above
        const gridSectionM = src.match(/<section[^>]*radial-stats[^>]*>([\s\S]*?)\{?\[/);
        let kicker = "", titlePlain = "", titleAccent = "";
        if (gridSectionM) {
          const gs = gridSectionM[1];
          const kickerM = gs.match(/animate-pulse-dot[^>]*\/>\s*([\s\S]*?)\s*<\/span>/);
          if (kickerM) kicker = kickerM[1].replace(/<[^>]+>/g, "").trim();
          const h2M = gs.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
          if (h2M) {
            const gradM = h2M[1].match(/([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>/);
            if (gradM) {
              titlePlain = unesc(gradM[1].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
              titleAccent = unesc(gradM[2].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
            }
          }
        }
        data.featureGridSections = [{
          _key: _key(),
          kicker, titlePlain, titleAccent,
          columns: items.length <= 4 ? items.length : 3,
          style: "card",
          features: items.map(i => ({
            _type: "featureItem", _key: _key(),
            icon: i.icon || i.Icon, title: i.title, desc: i.desc || i.body,
          })),
        }];
      }
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
    // Need more specific parsing for case studies with nested metrics
    const cases = [];
    const caseRx = /\{\s*industry:\s*"((?:[^"\\]|\\.)*)"\s*,\s*client:\s*"((?:[^"\\]|\\.)*)"\s*,\s*title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*challenge:\s*"((?:[^"\\]|\\.)*)"\s*,\s*approach:\s*"((?:[^"\\]|\\.)*)"\s*,\s*outcome:\s*"((?:[^"\\]|\\.)*)"\s*,\s*metrics:\s*\[([\s\S]*?)\]\s*,?\s*\}/g;
    let cm;
    while ((cm = caseRx.exec(casesRaw)) !== null) {
      const metrics = parseObjectArray(cm[7]).map(met => ({
        _type: "stat", _key: _key(), label: met.label, value: met.value,
      }));
      cases.push({
        _type: "caseStudy", _key: _key(),
        industry: unesc(cm[1]), client: unesc(cm[2]), title: unesc(cm[3]),
        challenge: unesc(cm[4]), approach: unesc(cm[5]), outcome: unesc(cm[6]),
        metrics,
      });
    }
    if (cases.length > 0) data.caseStudies = cases;
  }

  // Newsletter
  if (src.includes("NewsletterForm")) {
    const nlH2M = src.match(/<h2[^>]*>\s*([\s\S]*?)<span className="text-gradient">([\s\S]*?)<\/span>/);
    if (nlH2M) {
      data.newsletterHeadlinePlain = unesc(nlH2M[1].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
      data.newsletterHeadlineAccent = unesc(nlH2M[2].replace(/\{" "\}/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
    }

    const nlBodyM = src.match(/<p[^>]*text-slate-600[^>]*text-\[17px\][^>]*>([\s\S]*?)<\/p>/);
    if (nlBodyM) data.newsletterBody = unesc(nlBodyM[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

    const bulletsM = src.match(/\{\[\s*([\s\S]*?)\]\.map/);
    if (bulletsM) {
      const bullets = [];
      const strRx = /"((?:[^"\\]|\\.)*)"/g;
      let bm;
      while ((bm = strRx.exec(bulletsM[1])) !== null) {
        bullets.push(unesc(bm[1]));
      }
      data.newsletterBullets = bullets;
    }
  }

  return data;
}

// ─── Main ────────────────────────────────────────────────
const pages = findInnerPages();
console.log(`Found ${pages.length} inner pages to migrate.\n`);

let migrated = 0;
let skipped = 0;
let errors = 0;

for (const { slug, filePath } of pages) {
  try {
    const src = readFileSync(filePath, "utf8");
    const type = detectTemplateType(src);

    let data;
    if (type === "leaf") data = parseLeafPage(src, slug);
    else if (type === "hub") data = parseHubPage(src, slug);
    else data = parseCustomPage(src, slug);

    // Clean up undefined/null values
    const patch = {};
    for (const [k, v] of Object.entries(data)) {
      if (v !== null && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)) {
        patch[k] = v;
      }
    }

    // Find the published document
    const doc = await client.fetch(
      `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]{_id}`,
      { slug }
    );

    if (!doc) {
      console.log(`  ✗ No Sanity doc: ${slug}`);
      skipped++;
      continue;
    }

    // Patch published document
    await client.patch(doc._id).set(patch).commit();

    // Patch draft document
    const draftId = `drafts.${doc._id}`;
    const draftDoc = await client.fetch(
      `*[_id == $id][0]{_id}`,
      { id: draftId }
    );
    if (draftDoc) {
      await client.patch(draftId).set(patch).commit();
    }

    console.log(`  ✓ [${type}] ${slug} (${Object.keys(patch).length} fields)`);
    migrated++;
  } catch (err) {
    console.error(`  ✗ ${slug}: ${err.message}`);
    errors++;
  }
}

console.log(`\nDone. Migrated: ${migrated} | Skipped: ${skipped} | Errors: ${errors}`);
