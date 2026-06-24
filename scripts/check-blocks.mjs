#!/usr/bin/env node
/**
 * Diagnostic: find any documents that still have Portable Text block objects
 * in introParagraphs or proseSections fields.
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

function isBlock(val) {
  return val && typeof val === "object" && !Array.isArray(val) && val._type === "block";
}

async function main() {
  const pages = await client.fetch(
    `*[_type == "page"]{
      _id, "slug": slug.current,
      introParagraphs, proseSections,
      heroDescription, complianceBody,
      featureGridSections, faqItems,
      ctaBannerData, teamMembers, caseStudies,
      newsletterBody, content
    }`
  );

  console.log(`Checking ${pages.length} documents for remaining block objects...\n`);
  let issues = 0;

  for (const page of pages) {
    const slug = page.slug || page._id;
    const problems = [];

    // Check introParagraphs
    if (page.introParagraphs && Array.isArray(page.introParagraphs)) {
      for (let i = 0; i < page.introParagraphs.length; i++) {
        const p = page.introParagraphs[i];
        if (isBlock(p)) {
          problems.push(`introParagraphs[${i}] is still a block object`);
        }
      }
    }

    // Check proseSections
    if (page.proseSections && Array.isArray(page.proseSections)) {
      page.proseSections.forEach((ps, si) => {
        if (ps.paragraphs && Array.isArray(ps.paragraphs)) {
          ps.paragraphs.forEach((p, pi) => {
            if (isBlock(p)) {
              problems.push(`proseSections[${si}].paragraphs[${pi}] is still a block`);
            }
          });
        }
        if (ps.highlights && Array.isArray(ps.highlights)) {
          ps.highlights.forEach((h, hi) => {
            if (Array.isArray(h.text) && h.text.length > 0 && isBlock(h.text[0])) {
              // This is expected format now (array of blocks) - but check if OLD code handles it
              // Actually let's just note it
            }
            if (isBlock(h.text)) {
              problems.push(`proseSections[${si}].highlights[${hi}].text is a single block (not array)`);
            }
          });
        }
      });
    }

    // Check heroDescription - should be array of blocks (richText type)
    if (page.heroDescription && typeof page.heroDescription !== "string") {
      if (isBlock(page.heroDescription)) {
        problems.push(`heroDescription is a single block object (not array)`);
      }
    }

    // Check featureGridSections descriptions and feature descs
    if (page.featureGridSections && Array.isArray(page.featureGridSections)) {
      page.featureGridSections.forEach((fg, fi) => {
        if (fg.description && isBlock(fg.description)) {
          problems.push(`featureGridSections[${fi}].description is a single block`);
        }
        if (fg.features && Array.isArray(fg.features)) {
          fg.features.forEach((f, ffi) => {
            if (f.desc && isBlock(f.desc)) {
              problems.push(`featureGridSections[${fi}].features[${ffi}].desc is a single block`);
            }
          });
        }
      });
    }

    // Check FAQ answers
    if (page.faqItems && Array.isArray(page.faqItems)) {
      page.faqItems.forEach((faq, fi) => {
        if (faq.answer && isBlock(faq.answer)) {
          problems.push(`faqItems[${fi}].answer is a single block`);
        }
      });
    }

    if (problems.length > 0) {
      issues++;
      console.log(`❌ ${slug}:`);
      problems.forEach(p => console.log(`   - ${p}`));
    }
  }

  if (issues === 0) {
    console.log("✅ No remaining block object issues found in any documents.");
  } else {
    console.log(`\n⚠️ Found ${issues} documents with remaining issues.`);
  }

  // Also check: which page caused the error. Let's check the b2b-database page specifically
  const testPage = await client.fetch(
    `*[_type == "page" && slug.current == "data-assets/b2b-database"][0]{
      _id, "slug": slug.current,
      introParagraphs, heroDescription
    }`
  );

  if (testPage) {
    console.log("\n--- Debug: b2b-database page data ---");
    console.log("heroDescription type:", typeof testPage.heroDescription, Array.isArray(testPage.heroDescription) ? "(array)" : "");
    if (testPage.heroDescription) {
      console.log("heroDescription sample:", JSON.stringify(testPage.heroDescription).substring(0, 200));
    }
    console.log("introParagraphs types:", (testPage.introParagraphs || []).map(p => typeof p));
    if (testPage.introParagraphs && testPage.introParagraphs[0]) {
      console.log("introParagraphs[0] sample:", JSON.stringify(testPage.introParagraphs[0]).substring(0, 200));
    }
  }
}

main().catch(console.error);
