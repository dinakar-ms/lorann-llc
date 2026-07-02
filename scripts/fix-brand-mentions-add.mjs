#!/usr/bin/env node
/**
 * Add Lorann mentions to pages that have <3 mentions but DO have content.
 * Target: bring each page up to 3 natural mentions.
 *
 * Run:  node scripts/fix-brand-mentions-add.mjs
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

function toText(val) {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return val.map(toText).join(" ");
  if (val._type === "block" && val.children) return val.children.map((c) => c.text || "").join("");
  if (typeof val === "object") return Object.values(val).map(toText).join(" ");
  return "";
}

function countContent(text) {
  if (!text) return 0;
  return (text.replace(/[\w.-]+@lorannllc\.com/gi, "").replace(/https?:\/\/[^\s]+/gi, "").match(/\bLorann\b/gi) || []).length;
}

function countPage(p) {
  const cParts = [];
  cParts.push(toText(p.heroDescription));
  if (p.introParagraphs) cParts.push(...p.introParagraphs.map(toText));
  cParts.push(toText(p.complianceBody));
  if (p.complianceHeadline) cParts.push(p.complianceHeadline);
  if (p.proseSections) p.proseSections.forEach((ps) => {
    if (ps.paragraphs) cParts.push(...ps.paragraphs.map(toText));
    if (ps.highlights) cParts.push(...ps.highlights.map((h) => h.text || ""));
  });
  if (p.attributes) cParts.push(...p.attributes.map((a) => toText(a.desc)));
  if (p.useCases) cParts.push(...p.useCases.map((u) => toText(u.desc)));
  if (p.faqItems) cParts.push(...p.faqItems.map((f) => f.question + " " + toText(f.answer)));
  if (p.featureGridSections) p.featureGridSections.forEach((fg) => {
    if (fg.features) cParts.push(...fg.features.map((f) => toText(f.desc)));
  });
  return countContent(cParts.join(" "));
}

/** Try to add one Lorann mention to a span (portable text child) */
function addToSpan(span) {
  if (!span.text || span.text.length < 30) return false;
  // Skip if already has Lorann
  if (/\bLorann\b/i.test(span.text)) return false;

  const additions = [
    [/\bOur team\b/, "Lorann"],
    [/\bour team\b/, "Lorann"],
    [/\bOur verified\b/, "Lorann's verified"],
    [/\bour verified\b/, "Lorann's verified"],
    [/\bOur data\b/, "Lorann's data"],
    [/\bour data\b/, "Lorann's data"],
    [/\bOur platform\b/, "Lorann's platform"],
    [/\bour platform\b/, "Lorann's platform"],
    [/\bOur datasets?\b/, "Lorann's datasets"],
    [/\bour datasets?\b/, "Lorann's datasets"],
    [/\bOur database\b/, "Lorann's database"],
    [/\bour database\b/, "Lorann's database"],
    [/\bOur approach\b/, "Lorann's approach"],
    [/\bour approach\b/, "Lorann's approach"],
    [/\bOur compliance\b/, "Lorann's compliance"],
    [/\bour compliance\b/, "Lorann's compliance"],
    [/\bWe provide\b/, "Lorann provides"],
    [/\bwe provide\b/, "Lorann provides"],
    [/\bWe offer\b/, "Lorann offers"],
    [/\bwe offer\b/, "Lorann offers"],
    [/\bWe deliver\b/, "Lorann delivers"],
    [/\bWe maintain\b/, "Lorann maintains"],
    [/\bWe ensure\b/, "Lorann ensures"],
    [/\bWe support\b/, "Lorann supports"],
    [/\bWe work\b/, "Lorann works"],
    [/\bWe help\b/, "Lorann helps"],
    [/\bwe help\b/, "Lorann helps"],
    [/\bOur enrichment\b/, "Lorann's enrichment"],
    [/\bour enrichment\b/, "Lorann's enrichment"],
    [/\bOur hygiene\b/, "Lorann's hygiene"],
    [/\bour hygiene\b/, "Lorann's hygiene"],
    [/\bOur clients\b/, "Lorann's clients"],
    [/\bour clients\b/, "Lorann's clients"],
    [/\bwith us\b/, "with Lorann"],
    [/\bfrom our team\b/, "from Lorann"],
    [/\bby our team\b/, "by Lorann"],
    [/\bhere at\b/, "at Lorann"],
  ];

  for (const [pattern, replacement] of additions) {
    if (pattern.test(span.text)) {
      span.text = span.text.replace(pattern, replacement);
      return true;
    }
  }
  return false;
}

/** Also handle plain string fields */
function addToString(str) {
  if (!str || str.length < 30 || /\bLorann\b/i.test(str)) return [str, false];
  const additions = [
    [/\bOur team\b/, "Lorann"],
    [/\bour team\b/, "Lorann"],
    [/\bOur data\b/, "Lorann's data"],
    [/\bour data\b/, "Lorann's data"],
    [/\bOur verified\b/, "Lorann's verified"],
    [/\bour verified\b/, "Lorann's verified"],
    [/\bWe provide\b/, "Lorann provides"],
    [/\bWe offer\b/, "Lorann offers"],
    [/\bWe deliver\b/, "Lorann delivers"],
    [/\bwith us\b/, "with Lorann"],
    [/\bfrom our team\b/, "from Lorann"],
  ];
  for (const [pattern, replacement] of additions) {
    if (pattern.test(str)) {
      return [str.replace(pattern, replacement), true];
    }
  }
  return [str, false];
}

function collectSpans(val, result = []) {
  if (!val) return result;
  if (Array.isArray(val)) { val.forEach((v) => collectSpans(v, result)); return result; }
  if (val._type === "span" && typeof val.text === "string") { result.push(val); return result; }
  if (val._type === "block" && val.children) { val.children.forEach((c) => collectSpans(c, result)); return result; }
  if (typeof val === "object") { Object.values(val).forEach((v) => collectSpans(v, result)); return result; }
  return result;
}

async function main() {
  const pages = await client.fetch(
    `*[_type == "page"]{
      _id, h1, "slug": slug.current, templateType,
      heroDescription, introParagraphs, complianceBody, complianceHeadline,
      proseSections, attributes, useCases, faqItems, featureGridSections
    }`
  );

  let patchCount = 0;

  for (const page of pages) {
    const doc = JSON.parse(JSON.stringify(page));
    const currentCount = countPage(doc);

    // Skip pages with enough mentions or no content to work with
    if (currentCount >= 3) continue;

    const allText = toText(doc);
    if (allText.length < 100) continue; // Skip empty/minimal pages

    // Try to add mentions
    let count = currentCount;
    let iterations = 0;

    while (count < 3 && iterations < 20) {
      iterations++;
      let added = false;

      // Collect all spans from content fields
      const blockFields = [
        doc.heroDescription,
        doc.complianceBody,
      ];
      if (doc.introParagraphs) {
        for (const p of doc.introParagraphs) {
          if (Array.isArray(p)) blockFields.push(p);
        }
      }
      if (doc.proseSections) {
        for (const ps of doc.proseSections) {
          if (ps.paragraphs) {
            for (const p of ps.paragraphs) {
              if (Array.isArray(p)) blockFields.push(p);
            }
          }
        }
      }
      if (doc.attributes) doc.attributes.forEach((a) => { if (Array.isArray(a.desc)) blockFields.push(a.desc); });
      if (doc.useCases) doc.useCases.forEach((u) => { if (Array.isArray(u.desc)) blockFields.push(u.desc); });
      if (doc.faqItems) doc.faqItems.forEach((f) => { if (Array.isArray(f.answer)) blockFields.push(f.answer); });
      if (doc.featureGridSections) doc.featureGridSections.forEach((fg) => {
        if (fg.features) fg.features.forEach((f) => { if (Array.isArray(f.desc)) blockFields.push(f.desc); });
      });

      const spans = [];
      for (const bf of blockFields) collectSpans(bf, spans);

      for (const span of spans) {
        added = addToSpan(span);
        if (added) break;
      }

      // Try plain string fields if portable text didn't work
      if (!added) {
        // introParagraphs (plain strings)
        if (doc.introParagraphs) {
          for (let i = 0; i < doc.introParagraphs.length; i++) {
            if (typeof doc.introParagraphs[i] === "string") {
              const [newStr, did] = addToString(doc.introParagraphs[i]);
              if (did) { doc.introParagraphs[i] = newStr; added = true; break; }
            }
          }
        }
        // Prose section string paragraphs
        if (!added && doc.proseSections) {
          for (const ps of doc.proseSections) {
            if (ps.paragraphs) {
              for (let i = 0; i < ps.paragraphs.length; i++) {
                if (typeof ps.paragraphs[i] === "string") {
                  const [newStr, did] = addToString(ps.paragraphs[i]);
                  if (did) { ps.paragraphs[i] = newStr; added = true; break; }
                }
              }
            }
            if (added) break;
            // Highlight text
            if (ps.highlights) {
              for (const h of ps.highlights) {
                if (h.text) {
                  const [newStr, did] = addToString(h.text);
                  if (did) { h.text = newStr; added = true; break; }
                }
              }
            }
            if (added) break;
          }
        }
      }

      if (!added) break;
      count = countPage(doc);
    }

    if (count === currentCount) continue;

    // Patch
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
        console.log(`  ✓ ${page.slug || page._id} — ${currentCount} → ${count}`);
      }
    } catch (err) {
      console.error(`  ✗ ${page._id}: ${err.message}`);
    }
  }

  console.log(`\n✅ Done. Patched ${patchCount} documents to add Lorann mentions.`);
}

main().catch(console.error);
