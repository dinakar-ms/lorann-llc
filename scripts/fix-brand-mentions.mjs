#!/usr/bin/env node
/**
 * Fix Lorann brand mention consistency across ALL pages:
 *   1. REMOVE "Lorann" from all heading/title fields
 *   2. Ensure exactly 3–4 natural mentions in body content
 *
 * Patches both published and draft documents.
 *
 * Run:  node scripts/fix-brand-mentions.mjs
 */
import { createClient } from "next-sanity";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

/* ─── Helpers ────────────────────────────────────────────── */

/** Remove Lorann (and variants) from a heading string */
function cleanHeading(str) {
  if (!str) return str;
  let cleaned = str
    .replace(/Lorann LLC['']s\s*/gi, "")
    .replace(/Lorann LLC\s*/gi, "")
    .replace(/Lorann['']s\s*/gi, "")
    .replace(/Lorann\s*/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  // Capitalize first letter if needed
  if (cleaned && cleaned[0] !== cleaned[0].toUpperCase()) {
    cleaned = cleaned[0].toUpperCase() + cleaned.slice(1);
  }
  return cleaned;
}

/** Count Lorann mentions in a string */
function countInStr(str) {
  if (!str) return 0;
  return (str.match(/Lorann/gi) || []).length;
}

/** Extract all text from a portable text value */
function extractAllText(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map(extractAllText).join(" ");
  if (val._type === "block" && val.children)
    return val.children.map((c) => c.text || "").join("");
  if (typeof val === "object") return Object.values(val).map(extractAllText).join(" ");
  return "";
}

/** Remove one Lorann mention from a portable text block array — returns true if removed */
function removeOneLorannFromBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return false;
  for (const block of blocks) {
    if (block._type === "block" && block.children) {
      for (const child of block.children) {
        if (child.text && /Lorann/i.test(child.text)) {
          // Try to replace patterns naturally
          const replacements = [
            // "Lorann LLC's" → "Our"
            [/Lorann LLC['']s\b/i, "Our"],
            // "Lorann's" → "Our"
            [/Lorann['']s\b/i, "Our"],
            // "Lorann LLC" → "our team" or "we"
            [/Lorann LLC\b/i, "our team"],
            // "at Lorann" → "here"
            [/at Lorann\b/i, "here"],
            // "with Lorann" → "with us"
            [/with Lorann\b/i, "with us"],
            // "from Lorann" → "from our team"
            [/from Lorann\b/i, "from our team"],
            // "by Lorann" → "by our team"
            [/by Lorann\b/i, "by our team"],
            // "to Lorann" → "to our team"
            [/to Lorann\b/i, "to our team"],
            // "Lorann data" → "our data"
            [/Lorann data\b/i, "our data"],
            // "Lorann provides" → "We provide"
            [/Lorann provides\b/i, "We provide"],
            // "Lorann offers" → "We offer"
            [/Lorann offers\b/i, "We offer"],
            // "Lorann delivers" → "We deliver"
            [/Lorann delivers\b/i, "We deliver"],
            // "Lorann ensures" → "We ensure"
            [/Lorann ensures\b/i, "We ensure"],
            // "Lorann's" (generic) → "Our"
            [/Lorann's\b/i, "Our"],
            // Last resort: "Lorann" → "our team"
            [/Lorann\b/i, "our team"],
          ];
          for (const [pattern, replacement] of replacements) {
            if (pattern.test(child.text)) {
              child.text = child.text.replace(pattern, replacement);
              // Fix double capitals: "Our Our" etc
              child.text = child.text.replace(/\bOur our\b/g, "Our");
              child.text = child.text.replace(/\bour team team\b/g, "our team");
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

/** Remove one Lorann mention from a plain string — returns [newStr, didRemove] */
function removeOneLorannFromString(str) {
  if (!str || !/Lorann/i.test(str)) return [str, false];
  const replacements = [
    [/Lorann LLC['']s\b/i, "Our"],
    [/Lorann['']s\b/i, "Our"],
    [/Lorann LLC\b/i, "our team"],
    [/at Lorann\b/i, "here"],
    [/with Lorann\b/i, "with us"],
    [/from Lorann\b/i, "from our team"],
    [/by Lorann\b/i, "by our team"],
    [/Lorann data\b/i, "our data"],
    [/Lorann provides\b/i, "We provide"],
    [/Lorann offers\b/i, "We offer"],
    [/Lorann delivers\b/i, "We deliver"],
    [/Lorann's\b/i, "Our"],
    [/Lorann\b/i, "our team"],
  ];
  for (const [pattern, replacement] of replacements) {
    if (pattern.test(str)) {
      return [str.replace(pattern, replacement), true];
    }
  }
  return [str, false];
}

/** Add one Lorann mention into a portable text block array — returns true if added */
function addOneLorannToBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) return false;
  for (const block of blocks) {
    if (block._type === "block" && block.children) {
      for (const child of block.children) {
        if (child.text && child.text.length > 40) {
          // Replace generic pronouns with Lorann
          const additions = [
            [/\bOur team\b/, "Lorann"],
            [/\bour team\b/, "Lorann"],
            [/\bOur verified\b/, "Lorann's verified"],
            [/\bour verified\b/, "Lorann's verified"],
            [/\bOur data\b/, "Lorann's data"],
            [/\bour data\b/, "Lorann's data"],
            [/\bOur platform\b/, "Lorann's platform"],
            [/\bour platform\b/, "Lorann's platform"],
            [/\bWe provide\b/, "Lorann provides"],
            [/\bwe provide\b/, "Lorann provides"],
            [/\bWe offer\b/, "Lorann offers"],
            [/\bwe offer\b/, "Lorann offers"],
            [/\bWe deliver\b/, "Lorann delivers"],
          ];
          for (const [pattern, replacement] of additions) {
            if (pattern.test(child.text)) {
              child.text = child.text.replace(pattern, replacement);
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

/** Add one Lorann mention into a plain string — returns [newStr, didAdd] */
function addOneLorannToString(str) {
  if (!str || str.length < 30) return [str, false];
  const additions = [
    [/\bOur team\b/, "Lorann"],
    [/\bour team\b/, "Lorann"],
    [/\bOur verified\b/, "Lorann's verified"],
    [/\bour verified\b/, "Lorann's verified"],
    [/\bOur data\b/, "Lorann's data"],
    [/\bour data\b/, "Lorann's data"],
    [/\bWe provide\b/, "Lorann provides"],
    [/\bWe offer\b/, "Lorann offers"],
  ];
  for (const [pattern, replacement] of additions) {
    if (pattern.test(str)) {
      return [str.replace(pattern, replacement), true];
    }
  }
  return [str, false];
}

/* ─── Content fields map ─────────────────────────────────── */
// These are the body-content fields that should collectively have 3-4 Lorann mentions
// Format: { field, type: "blocks"|"string"|"stringArray"|"proseArray"|"attrArray"|"useCaseArray"|"faqArray"|"gridArray" }

function getContentFields(page) {
  const fields = [];
  if (page.heroDescription) fields.push({ path: "heroDescription", val: page.heroDescription, type: "blocks" });
  if (page.introParagraphs) {
    page.introParagraphs.forEach((p, i) => {
      fields.push({ path: `introParagraphs[${i}]`, val: p, type: typeof p === "string" ? "string" : "blocks" });
    });
  }
  if (page.complianceBody) fields.push({ path: "complianceBody", val: page.complianceBody, type: "blocks" });
  if (page.complianceHeadline) fields.push({ path: "complianceHeadline", val: page.complianceHeadline, type: "string" });
  if (page.proseSections) {
    page.proseSections.forEach((ps, pi) => {
      if (ps.paragraphs) {
        ps.paragraphs.forEach((p, i) => {
          fields.push({ path: `proseSections[${pi}].paragraphs[${i}]`, val: p, type: typeof p === "string" ? "string" : "blocks" });
        });
      }
      if (ps.highlights) {
        ps.highlights.forEach((h, i) => {
          fields.push({ path: `proseSections[${pi}].highlights[${i}].text`, val: h.text, type: "string" });
        });
      }
    });
  }
  if (page.attributes) {
    page.attributes.forEach((a, i) => {
      if (a.desc) fields.push({ path: `attributes[${i}].desc`, val: a.desc, type: Array.isArray(a.desc) ? "blocks" : "string" });
    });
  }
  if (page.useCases) {
    page.useCases.forEach((u, i) => {
      if (u.desc) fields.push({ path: `useCases[${i}].desc`, val: u.desc, type: Array.isArray(u.desc) ? "blocks" : "string" });
    });
  }
  if (page.faqItems) {
    page.faqItems.forEach((f, i) => {
      if (f.question) fields.push({ path: `faqItems[${i}].question`, val: f.question, type: "string" });
      if (f.answer) fields.push({ path: `faqItems[${i}].answer`, val: f.answer, type: Array.isArray(f.answer) ? "blocks" : "string" });
    });
  }
  if (page.featureGridSections) {
    page.featureGridSections.forEach((fg, fi) => {
      if (fg.description) fields.push({ path: `featureGridSections[${fi}].description`, val: fg.description, type: typeof fg.description === "string" ? "string" : "blocks" });
      if (fg.features) {
        fg.features.forEach((f, i) => {
          if (f.desc) fields.push({ path: `featureGridSections[${fi}].features[${i}].desc`, val: f.desc, type: Array.isArray(f.desc) ? "blocks" : "string" });
        });
      }
    });
  }
  return fields;
}

function countAllContentMentions(fields) {
  let total = 0;
  for (const f of fields) {
    if (f.type === "blocks") total += countInStr(extractAllText(f.val));
    else if (f.type === "string") total += countInStr(f.val);
  }
  return total;
}

/* ─── Main ───────────────────────────────────────────────── */

async function main() {
  const pages = await client.fetch(
    `*[_type == "page"]{
      _id, h1, "slug": slug.current,
      titlePlain, titleAccent,
      introHeadlinePlain, introHeadlineAccent, introParagraphs,
      proseSections, attributes, useCases,
      heroDescription, complianceBody, complianceHeadline,
      featureGridSections, faqItems
    }`
  );

  console.log(`Found ${pages.length} documents to process\n`);

  let patchedCount = 0;
  let headingsCleaned = 0;
  let contentAdjusted = 0;

  for (const page of pages) {
    const patch = {};
    let changed = false;

    // ── Step 1: Clean headings ──
    const headingFields = [
      ["titlePlain", page.titlePlain],
      ["titleAccent", page.titleAccent],
      ["introHeadlinePlain", page.introHeadlinePlain],
      ["introHeadlineAccent", page.introHeadlineAccent],
    ];

    for (const [field, val] of headingFields) {
      if (val && /Lorann/i.test(val)) {
        const cleaned = cleanHeading(val);
        if (cleaned !== val) {
          patch[field] = cleaned;
          changed = true;
          headingsCleaned++;
        }
      }
    }

    // Clean prose section headings
    if (page.proseSections) {
      let proseChanged = false;
      const newProse = page.proseSections.map((ps) => {
        let s = { ...ps };
        if (s.titlePlain && /Lorann/i.test(s.titlePlain)) {
          s.titlePlain = cleanHeading(s.titlePlain);
          proseChanged = true;
          headingsCleaned++;
        }
        if (s.titleAccent && /Lorann/i.test(s.titleAccent)) {
          s.titleAccent = cleanHeading(s.titleAccent);
          proseChanged = true;
          headingsCleaned++;
        }
        return s;
      });
      if (proseChanged) {
        patch.proseSections = newProse;
        changed = true;
      }
    }

    // Clean feature grid section headings
    if (page.featureGridSections) {
      let gridChanged = false;
      const newGrid = page.featureGridSections.map((fg) => {
        let g = { ...fg };
        if (g.titlePlain && /Lorann/i.test(g.titlePlain)) {
          g.titlePlain = cleanHeading(g.titlePlain);
          gridChanged = true;
          headingsCleaned++;
        }
        if (g.titleAccent && /Lorann/i.test(g.titleAccent)) {
          g.titleAccent = cleanHeading(g.titleAccent);
          gridChanged = true;
          headingsCleaned++;
        }
        return g;
      });
      if (gridChanged) {
        patch.featureGridSections = newGrid;
        changed = true;
      }
    }

    // ── Step 2: Adjust content mentions to 3-4 ──
    // We need to work on a mutable deep copy
    const mutablePage = JSON.parse(JSON.stringify({
      heroDescription: patch.heroDescription || page.heroDescription,
      introParagraphs: patch.introParagraphs || page.introParagraphs,
      complianceBody: patch.complianceBody || page.complianceBody,
      complianceHeadline: patch.complianceHeadline || page.complianceHeadline,
      proseSections: patch.proseSections || page.proseSections,
      attributes: patch.attributes || page.attributes,
      useCases: patch.useCases || page.useCases,
      faqItems: patch.faqItems || page.faqItems,
      featureGridSections: patch.featureGridSections || page.featureGridSections,
    }));

    const fields = getContentFields(mutablePage);
    let currentCount = countAllContentMentions(fields);

    // Remove excess mentions (target: 4 max)
    let iterations = 0;
    while (currentCount > 4 && iterations < 30) {
      iterations++;
      let removed = false;
      // Remove from fields that have the most mentions, starting from the end
      for (let fi = fields.length - 1; fi >= 0; fi--) {
        const f = fields[fi];
        const fieldCount = f.type === "blocks" ? countInStr(extractAllText(f.val)) : countInStr(f.val);
        if (fieldCount === 0) continue;

        if (f.type === "blocks") {
          removed = removeOneLorannFromBlocks(f.val);
        } else if (f.type === "string") {
          const [newStr, did] = removeOneLorannFromString(f.val);
          if (did) { f.val = newStr; removed = true; }
        }
        if (removed) break;
      }
      if (!removed) break;
      currentCount = countAllContentMentions(fields);
    }

    // Add mentions if too few (target: 3 min)
    iterations = 0;
    while (currentCount < 3 && iterations < 10) {
      iterations++;
      let added = false;
      // Prefer adding to intro paragraphs, then prose, then hero
      for (const f of fields) {
        if (f.type === "blocks") {
          added = addOneLorannToBlocks(f.val);
        } else if (f.type === "string") {
          const [newStr, did] = addOneLorannToString(f.val);
          if (did) { f.val = newStr; added = true; }
        }
        if (added) break;
      }
      if (!added) break;
      currentCount = countAllContentMentions(fields);
    }

    // Write back mutated values to patch
    const finalCount = countAllContentMentions(fields);
    if (finalCount !== countAllContentMentions(getContentFields({
      heroDescription: page.heroDescription,
      introParagraphs: page.introParagraphs,
      complianceBody: page.complianceBody,
      complianceHeadline: page.complianceHeadline,
      proseSections: page.proseSections,
      attributes: page.attributes,
      useCases: page.useCases,
      faqItems: page.faqItems,
      featureGridSections: page.featureGridSections,
    }))) {
      // Content was modified - write back all mutable fields
      if (mutablePage.heroDescription) patch.heroDescription = mutablePage.heroDescription;
      if (mutablePage.introParagraphs) patch.introParagraphs = mutablePage.introParagraphs;
      if (mutablePage.complianceBody) patch.complianceBody = mutablePage.complianceBody;
      if (mutablePage.complianceHeadline) patch.complianceHeadline = mutablePage.complianceHeadline;
      if (mutablePage.proseSections) patch.proseSections = mutablePage.proseSections;
      if (mutablePage.attributes) patch.attributes = mutablePage.attributes;
      if (mutablePage.useCases) patch.useCases = mutablePage.useCases;
      if (mutablePage.faqItems) patch.faqItems = mutablePage.faqItems;
      if (mutablePage.featureGridSections) patch.featureGridSections = mutablePage.featureGridSections;
      changed = true;
      contentAdjusted++;
    }

    // ── Step 3: Patch document ──
    if (!changed) continue;

    try {
      await client.patch(page._id).set(patch).commit();
      patchedCount++;

      const origCount = countAllContentMentions(getContentFields(page));
      const isDraft = page._id.startsWith("drafts.");
      if (!isDraft) {
        console.log(`  ✓ ${page.slug || page._id} — mentions: ${origCount} → ${finalCount}`);
      }
    } catch (err) {
      console.error(`  ✗ ${page._id}: ${err.message}`);
    }
  }

  console.log(`\n✅ Done.`);
  console.log(`   Documents patched: ${patchedCount}`);
  console.log(`   Headings cleaned: ${headingsCleaned}`);
  console.log(`   Content adjusted: ${contentAdjusted}`);
}

main().catch(console.error);
