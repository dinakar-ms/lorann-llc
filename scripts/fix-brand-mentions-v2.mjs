#!/usr/bin/env node
/**
 * Second pass: fix remaining pages with 5+ Lorann mentions.
 *
 * Strategy:
 *  - Skip "Lorann" inside emails (privacy@lorannllc.com) and URLs — these are structural
 *  - Only count/fix mentions in actual prose content fields
 *  - Directly mutate the deep Sanity doc and re-patch
 *
 * Run:  node scripts/fix-brand-mentions-v2.mjs
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

/* ─── Count "Lorann" excluding emails/URLs ───────────────── */

function countContentLorann(text) {
  if (!text) return 0;
  // Remove emails and URLs first so they don't count
  const cleaned = text
    .replace(/[\w.-]+@lorannllc\.com/gi, "")
    .replace(/https?:\/\/[^\s]+/gi, "")
    .replace(/www\.lorannllc\.com[^\s]*/gi, "");
  return (cleaned.match(/\bLorann\b/gi) || []).length;
}

/** Extract text from portable text or string */
function toText(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map(toText).join(" ");
  if (val._type === "block" && val.children)
    return val.children.map((c) => c.text || "").join("");
  return "";
}

/** Remove one Lorann from a span's text, return true if done */
function removeFromSpan(span) {
  if (!span.text) return false;
  // Skip if only in email/URL context
  const cleanedText = span.text
    .replace(/[\w.-]+@lorannllc\.com/gi, "EMAILSKIP")
    .replace(/https?:\/\/[^\s]+/gi, "URLSKIP")
    .replace(/www\.lorannllc\.com[^\s]*/gi, "URLSKIP");
  if (!/\bLorann\b/i.test(cleanedText)) return false;

  // Now replace in the actual text — try natural replacements
  const replacements = [
    [/\bLorann LLC's\b/i, "Our"],
    [/\bLorann's\b/i, "Our"],
    [/\bat Lorann LLC\b/i, "here"],
    [/\bat Lorann\b/i, "here"],
    [/\bLorann LLC\b/i, "our team"],
    [/\bwith Lorann\b/i, "with us"],
    [/\bfrom Lorann\b/i, "from us"],
    [/\bby Lorann\b/i, "by our team"],
    [/\bto Lorann\b/i, "to us"],
    [/\bLorann data\b/i, "our data"],
    [/\bLorann provides\b/i, "We provide"],
    [/\bLorann offers\b/i, "We offer"],
    [/\bLorann delivers\b/i, "We deliver"],
    [/\bLorann ensures\b/i, "We ensure"],
    [/\bLorann maintains\b/i, "We maintain"],
    [/\bLorann works\b/i, "Our team works"],
    [/\bThe Lorann Difference\b/i, "The Difference"],
    [/\bA dedicated Lorann\b/i, "A dedicated"],
    [/\bdedicated Lorann\b/i, "dedicated"],
    [/\bLorann file\b/i, "our file"],
    [/\bLorann\b/i, "our team"],
  ];

  for (const [pattern, replacement] of replacements) {
    // Ensure we're not replacing inside an email or URL
    if (pattern.test(span.text)) {
      // Check position — make sure it's not inside an email/url
      const match = span.text.match(pattern);
      if (match) {
        const idx = match.index;
        const before = span.text.slice(Math.max(0, idx - 30), idx);
        // Skip if preceded by @ or :// or www.
        if (/@$/.test(before) || /:\/\/$/.test(before) || /www\.$/.test(before)) continue;
        // Skip if the matched text includes @
        if (match[0].includes("@")) continue;

        span.text = span.text.replace(pattern, replacement);
        // Fix double spaces
        span.text = span.text.replace(/\s{2,}/g, " ");
        return true;
      }
    }
  }
  return false;
}

/** Recursively collect all span refs from a content value */
function collectSpans(val, result = []) {
  if (!val) return result;
  if (Array.isArray(val)) { val.forEach(v => collectSpans(v, result)); return result; }
  if (val._type === "span" && typeof val.text === "string") { result.push(val); return result; }
  if (val._type === "block" && val.children) { val.children.forEach(c => collectSpans(c, result)); return result; }
  if (typeof val === "object") { Object.values(val).forEach(v => collectSpans(v, result)); return result; }
  return result;
}

/** Count content mentions across a full page object (excluding emails/URLs) */
function countPageContentMentions(page) {
  const textParts = [];

  // Content fields only (no headings, no meta)
  const contentFields = [
    page.heroDescription,
    page.complianceBody,
  ];
  if (page.introParagraphs) contentFields.push(...page.introParagraphs);
  if (page.proseSections) {
    for (const ps of page.proseSections) {
      if (ps.paragraphs) contentFields.push(...ps.paragraphs);
      if (ps.highlights) ps.highlights.forEach(h => { if (h.text) textParts.push(h.text); });
    }
  }
  if (page.attributes) page.attributes.forEach(a => { if (a.desc) contentFields.push(a.desc); });
  if (page.useCases) page.useCases.forEach(u => { if (u.desc) contentFields.push(u.desc); });
  if (page.faqItems) {
    page.faqItems.forEach(f => {
      if (f.question) textParts.push(f.question);
      if (f.answer) contentFields.push(f.answer);
    });
  }
  if (page.featureGridSections) {
    page.featureGridSections.forEach(fg => {
      if (fg.description) contentFields.push(fg.description);
      if (fg.features) fg.features.forEach(f => { if (f.desc) contentFields.push(f.desc); });
    });
  }

  for (const cf of contentFields) {
    textParts.push(toText(cf));
  }

  // Also check plain string fields
  if (page.complianceHeadline) textParts.push(page.complianceHeadline);

  return countContentLorann(textParts.join(" "));
}

/** Collect all mutable span/string references from content fields */
function collectAllContentSpans(page) {
  const spans = [];

  // Portable text content fields
  const blockFields = [page.heroDescription, page.complianceBody];
  if (page.introParagraphs) {
    for (const p of page.introParagraphs) {
      if (Array.isArray(p)) blockFields.push(p);
    }
  }
  if (page.proseSections) {
    for (const ps of page.proseSections) {
      if (ps.paragraphs) {
        for (const p of ps.paragraphs) {
          if (Array.isArray(p)) blockFields.push(p);
        }
      }
    }
  }
  if (page.attributes) page.attributes.forEach(a => { if (Array.isArray(a.desc)) blockFields.push(a.desc); });
  if (page.useCases) page.useCases.forEach(u => { if (Array.isArray(u.desc)) blockFields.push(u.desc); });
  if (page.faqItems) page.faqItems.forEach(f => { if (Array.isArray(f.answer)) blockFields.push(f.answer); });
  if (page.featureGridSections) {
    page.featureGridSections.forEach(fg => {
      if (Array.isArray(fg.description)) blockFields.push(fg.description);
      if (fg.features) fg.features.forEach(f => { if (Array.isArray(f.desc)) blockFields.push(f.desc); });
    });
  }

  for (const bf of blockFields) {
    collectSpans(bf, spans);
  }

  return spans;
}

/** Also collect plain string properties that might have Lorann */
function collectStringProps(page) {
  const props = [];

  // prose highlights
  if (page.proseSections) {
    for (const ps of page.proseSections) {
      if (ps.highlights) {
        for (const h of ps.highlights) {
          if (h.text && /\bLorann\b/i.test(h.text)) {
            props.push(h); // we'll mutate h.text
          }
        }
      }
      // plain string paragraphs
      if (ps.paragraphs) {
        for (let i = 0; i < ps.paragraphs.length; i++) {
          if (typeof ps.paragraphs[i] === 'string' && /\bLorann\b/i.test(ps.paragraphs[i])) {
            props.push({ _ref: ps.paragraphs, _idx: i });
          }
        }
      }
    }
  }
  // plain string introParagraphs
  if (page.introParagraphs) {
    for (let i = 0; i < page.introParagraphs.length; i++) {
      if (typeof page.introParagraphs[i] === 'string' && /\bLorann\b/i.test(page.introParagraphs[i])) {
        props.push({ _ref: page.introParagraphs, _idx: i });
      }
    }
  }
  // complianceHeadline
  if (page.complianceHeadline && /\bLorann\b/i.test(page.complianceHeadline)) {
    props.push({ _obj: page, _field: 'complianceHeadline' });
  }
  // FAQ questions
  if (page.faqItems) {
    for (const f of page.faqItems) {
      if (f.question && /\bLorann\b/i.test(f.question)) {
        props.push({ _obj: f, _field: 'question' });
      }
    }
  }

  return props;
}

function removeFromStringProp(prop) {
  const replacements = [
    [/\bLorann LLC's\b/i, "Our"],
    [/\bLorann's\b/i, "Our"],
    [/\bLorann LLC\b/i, "our team"],
    [/\bat Lorann\b/i, "here"],
    [/\bwith Lorann\b/i, "with us"],
    [/\bLorann\b/i, "our team"],
  ];

  if (prop._ref && prop._idx !== undefined) {
    let str = prop._ref[prop._idx];
    for (const [pat, rep] of replacements) {
      if (pat.test(str)) {
        prop._ref[prop._idx] = str.replace(pat, rep).replace(/\s{2,}/g, " ");
        return true;
      }
    }
  }
  if (prop._obj && prop._field) {
    let str = prop._obj[prop._field];
    for (const [pat, rep] of replacements) {
      if (pat.test(str)) {
        prop._obj[prop._field] = str.replace(pat, rep).replace(/\s{2,}/g, " ");
        return true;
      }
    }
  }
  if (prop.text !== undefined) {
    for (const [pat, rep] of replacements) {
      if (pat.test(prop.text)) {
        prop.text = prop.text.replace(pat, rep).replace(/\s{2,}/g, " ");
        return true;
      }
    }
  }
  return false;
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

  console.log(`Processing ${pages.length} documents...\n`);

  let patchCount = 0;
  const results = { fixed: 0, alreadyGood: 0, cantFix: 0 };

  for (const page of pages) {
    // Deep clone for mutation
    const doc = JSON.parse(JSON.stringify(page));
    const originalCount = countPageContentMentions(doc);

    if (originalCount <= 4) {
      if (originalCount >= 3) results.alreadyGood++;
      continue; // Skip pages that are already at 4 or below
    }

    // Need to reduce from originalCount down to 4
    let currentCount = originalCount;
    let iterations = 0;

    while (currentCount > 4 && iterations < 50) {
      iterations++;
      let removed = false;

      // Collect all spans and string props
      const spans = collectAllContentSpans(doc);
      const strProps = collectStringProps(doc);

      // Try removing from string props first (highlights, plain paragraphs)
      for (const prop of strProps) {
        removed = removeFromStringProp(prop);
        if (removed) break;
      }

      // If not removed from strings, try spans (portable text)
      if (!removed) {
        // Start from the end (less important content first)
        for (let i = spans.length - 1; i >= 0; i--) {
          removed = removeFromSpan(spans[i]);
          if (removed) break;
        }
      }

      if (!removed) break;
      currentCount = countPageContentMentions(doc);
    }

    if (currentCount === originalCount) continue; // Nothing changed

    // Build patch object with all content fields that might have changed
    const patch = {};
    if (doc.heroDescription) patch.heroDescription = doc.heroDescription;
    if (doc.introParagraphs) patch.introParagraphs = doc.introParagraphs;
    if (doc.complianceBody) patch.complianceBody = doc.complianceBody;
    if (doc.complianceHeadline) patch.complianceHeadline = doc.complianceHeadline;
    if (doc.proseSections) patch.proseSections = doc.proseSections;
    if (doc.attributes) patch.attributes = doc.attributes;
    if (doc.useCases) patch.useCases = doc.useCases;
    if (doc.faqItems) patch.faqItems = doc.faqItems;
    if (doc.featureGridSections) patch.featureGridSections = doc.featureGridSections;

    try {
      await client.patch(page._id).set(patch).commit();
      patchCount++;
      const isDraft = page._id.startsWith("drafts.");
      if (!isDraft) {
        console.log(`  ✓ ${page.slug || page._id} — ${originalCount} → ${currentCount}`);
        if (currentCount > 4) results.cantFix++;
        else results.fixed++;
      }
    } catch (err) {
      console.error(`  ✗ ${page._id}: ${err.message}`);
    }
  }

  console.log(`\n✅ Done. Patched ${patchCount} documents.`);
  console.log(`   Fixed to ≤4: ${results.fixed}`);
  console.log(`   Already good: ${results.alreadyGood}`);
  console.log(`   Could not fully fix: ${results.cantFix}`);
}

main().catch(console.error);
