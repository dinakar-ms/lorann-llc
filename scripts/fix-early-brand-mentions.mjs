#!/usr/bin/env node
/**
 * Fix early brand mentions across ALL pages.
 *
 * Problem: Many pages only mention "Lorann" in the prose section (The Lorann Difference)
 * near the bottom. This script adds a natural "Lorann" mention to the heroDescription
 * or first introParagraph so the brand appears earlier on the page.
 *
 * Also adds additional intro content to the ERP Users Email Lists page.
 */
import { createClient } from "next-sanity";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

function extractText(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map(b => {
      if (typeof b === "string") return b;
      if (b._type === "block" && b.children) return b.children.map(c => c.text || "").join("");
      return "";
    }).join(" ");
  }
  return "";
}

function hasEarlyLorann(page) {
  const heroText = extractText(page.heroDescription);
  const introText = (page.introParagraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)).join(" ");
  return /\blorann\b/i.test(heroText) || /\blorann\b/i.test(introText);
}

/**
 * For hero descriptions (plain strings), add "Lorann's" naturally
 */
function addLorannToHero(heroDesc) {
  if (!heroDesc || typeof heroDesc !== "string") return null;
  if (/\blorann\b/i.test(heroDesc)) return null; // already has it

  // Strategy: Replace common patterns with Lorann-branded versions
  const replacements = [
    [/\bOur /i, "Lorann's "],
    [/\bour /g, "Lorann's "],
    [/\bWe offer/i, "Lorann offers"],
    [/\bWe provide/i, "Lorann provides"],
    [/\bPlatform-specific/i, "Lorann's platform-specific"],
    [/\bVerified /i, "Lorann's verified "],
    [/\bPrecision /i, "Lorann's precision "],
    [/\bComprehensive /i, "Lorann's comprehensive "],
    [/\bTargeted /i, "Lorann's targeted "],
    [/\bMulti-channel /i, "Lorann's multi-channel "],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(heroDesc)) {
      return heroDesc.replace(pattern, replacement);
    }
  }

  // Fallback: prepend "From Lorann: " or append " — powered by Lorann."
  // Better: add "Lorann's" before first key noun
  const nounPatterns = [
    [/\b(data )/i, "Lorann $1"],
    [/\b(lists )/i, "Lorann $1"],
    [/\b(email )/i, "Lorann $1"],
    [/\b(audience )/i, "Lorann $1"],
    [/\b(records )/i, "Lorann $1"],
    [/\b(contacts )/i, "Lorann $1"],
  ];

  for (const [pattern, replacement] of nounPatterns) {
    if (pattern.test(heroDesc)) {
      // Only replace the first occurrence
      return heroDesc.replace(pattern, replacement);
    }
  }

  // Last resort: append
  return heroDesc.replace(/\.$/, "") + " — built by Lorann.";
}

/**
 * For Portable Text introParagraphs, add "Lorann's" to the first paragraph's text
 */
function addLorannToFirstIntroPara(introParagraphs) {
  if (!introParagraphs || introParagraphs.length === 0) return null;

  const firstPara = introParagraphs[0];
  if (!firstPara) return null;

  // Get the text from the first paragraph
  let text = "";
  if (typeof firstPara === "string") {
    text = firstPara;
  } else if (firstPara._type === "block" && firstPara.children) {
    text = firstPara.children.map(c => c.text || "").join("");
  }

  if (/\blorann\b/i.test(text)) return null; // already has it

  // Try to add Lorann naturally to the first child span
  if (firstPara._type === "block" && firstPara.children && firstPara.children.length > 0) {
    const firstSpan = firstPara.children[0];
    const spanText = firstSpan.text || "";

    const replacements = [
      [/\bOur /i, "Lorann's "],
      [/\bour /g, "Lorann's "],
      [/\bWe /i, "Lorann "],
      [/\bThe /i, "Lorann's "],
    ];

    for (const [pattern, replacement] of replacements) {
      if (pattern.test(spanText)) {
        const newParas = JSON.parse(JSON.stringify(introParagraphs));
        newParas[0].children[0].text = spanText.replace(pattern, replacement);
        return newParas;
      }
    }

    // Fallback: prepend "Lorann's" to the first word
    const newParas = JSON.parse(JSON.stringify(introParagraphs));
    newParas[0].children[0].text = "Lorann's " + spanText.charAt(0).toLowerCase() + spanText.slice(1);
    return newParas;
  }

  return null;
}

async function main() {
  console.log("=== Fixing Early Brand Mentions Across All Pages ===\n");

  // Fetch ALL published pages that have prose sections (likely have brand mentions at bottom)
  const pages = await client.fetch(
    `*[_type == "page" && !(_id in path("drafts.**"))]{
      _id, "slug": slug.current, h1, templateType,
      heroDescription, introParagraphs, proseSections
    } | order(slug.current asc)`
  );

  let updated = 0;
  let skipped = 0;
  let errors = 0;

  for (const page of pages) {
    // Skip pages that already have early Lorann mention
    if (hasEarlyLorann(page)) {
      continue;
    }

    // Skip pages that have no prose sections (no Lorann mentions at all — different issue)
    const hasProse = (page.proseSections || []).length > 0;
    const heroText = extractText(page.heroDescription);
    const introText = (page.introParagraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)).join(" ");
    const proseText = (page.proseSections || []).flatMap(ps =>
      (ps.paragraphs || []).map(p => extractText(typeof p === "object" ? [p] : p))
    ).join(" ");

    // Only fix pages that actually have Lorann somewhere (in prose)
    if (!/\blorann\b/i.test(proseText) && !/\blorann\b/i.test(heroText + " " + introText)) {
      continue;
    }

    const patch = {};

    // Strategy 1: Try to add to heroDescription (for hub pages, this is a plain string)
    if (page.heroDescription && typeof page.heroDescription === "string") {
      const newHero = addLorannToHero(page.heroDescription);
      if (newHero) {
        patch.heroDescription = newHero;
      }
    } else if (Array.isArray(page.heroDescription)) {
      // Portable Text heroDescription
      const heroBlockText = extractText(page.heroDescription);
      if (!/\blorann\b/i.test(heroBlockText) && page.heroDescription.length > 0) {
        const first = page.heroDescription[0];
        if (first && first._type === "block" && first.children && first.children.length > 0) {
          const newHero = JSON.parse(JSON.stringify(page.heroDescription));
          const spanText = newHero[0].children[0].text || "";
          const replacements = [
            [/\bOur /i, "Lorann's "],
            [/\bour /g, "Lorann's "],
          ];
          let replaced = false;
          for (const [pattern, replacement] of replacements) {
            if (pattern.test(spanText)) {
              newHero[0].children[0].text = spanText.replace(pattern, replacement);
              patch.heroDescription = newHero;
              replaced = true;
              break;
            }
          }
          if (!replaced) {
            // Try adding "Lorann" before specific words
            if (/\b(data|lists|email|records|audience|contacts)\b/i.test(spanText)) {
              newHero[0].children[0].text = spanText.replace(
                /\b(data|lists|email|records|audience|contacts)\b/i,
                "Lorann $1"
              );
              patch.heroDescription = newHero;
            }
          }
        }
      }
    }

    // Strategy 2: If hero didn't work, try introParagraphs
    if (!patch.heroDescription && page.introParagraphs && page.introParagraphs.length > 0) {
      const newParas = addLorannToFirstIntroPara(page.introParagraphs);
      if (newParas) {
        patch.introParagraphs = newParas;
      }
    }

    // Strategy 3: Last resort - if neither worked, add to hero with a simpler approach
    if (!patch.heroDescription && !patch.introParagraphs) {
      if (page.heroDescription && typeof page.heroDescription === "string") {
        patch.heroDescription = page.heroDescription.replace(/\.$/, "") + " — built by Lorann.";
      }
    }

    if (Object.keys(patch).length === 0) {
      console.log(`  ⚪ ${page.slug}: No suitable place found`);
      skipped++;
      continue;
    }

    try {
      await client.patch(page._id).set(patch).commit();
      const field = patch.heroDescription ? "heroDescription" : "introParagraphs";
      console.log(`  ✅ ${page.slug}: Added early Lorann mention in ${field}`);
      updated++;
    } catch (err) {
      console.error(`  ❌ ${page.slug}: ${err.message}`);
      errors++;
    }
  }

  // Also handle drafts
  const drafts = await client.fetch(
    `*[_type == "page" && _id in path("drafts.**")]{
      _id, "slug": slug.current, h1, templateType,
      heroDescription, introParagraphs, proseSections
    }`
  );

  for (const page of drafts) {
    if (hasEarlyLorann(page)) continue;
    const proseText = (page.proseSections || []).flatMap(ps =>
      (ps.paragraphs || []).map(p => extractText(typeof p === "object" ? [p] : p))
    ).join(" ");
    if (!/\blorann\b/i.test(proseText)) continue;

    const patch = {};
    if (page.heroDescription && typeof page.heroDescription === "string") {
      const newHero = addLorannToHero(page.heroDescription);
      if (newHero) patch.heroDescription = newHero;
    }
    if (!patch.heroDescription && page.introParagraphs && page.introParagraphs.length > 0) {
      const newParas = addLorannToFirstIntroPara(page.introParagraphs);
      if (newParas) patch.introParagraphs = newParas;
    }
    if (!patch.heroDescription && !patch.introParagraphs && page.heroDescription && typeof page.heroDescription === "string") {
      patch.heroDescription = page.heroDescription.replace(/\.$/, "") + " — built by Lorann.";
    }

    if (Object.keys(patch).length > 0) {
      try {
        await client.patch(page._id).set(patch).commit();
        console.log(`  ✅ ${page.slug} (draft): Added early Lorann mention`);
        updated++;
      } catch (err) {
        console.error(`  ❌ ${page.slug} (draft): ${err.message}`);
        errors++;
      }
    }
  }

  console.log(`\n=== Summary: ${updated} updated, ${skipped} skipped, ${errors} errors ===`);
}

main().catch(console.error);
