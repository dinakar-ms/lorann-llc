#!/usr/bin/env node
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
  if (!val) return "(empty)";
  if (typeof val === "string") return val;
  if (Array.isArray(val)) {
    return val.map(b => {
      if (typeof b === "string") return b;
      if (b._type === "block" && b.children) return b.children.map(c => c.text || "").join("");
      return "";
    }).join("\n");
  }
  return "";
}

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "solutions" && !(_id in path("drafts.**"))][0]{
      _id, h1, templateType, metaDescription, heroDescription, content,
      kicker, titlePlain, titleAccent,
      introKicker, introHeadlinePlain, introHeadlineAccent, introParagraphs,
      childrenSectionKicker, childrenSectionTitlePlain, childrenSectionDescription,
      childrenItems, featureGridSections, proseSections, faqItems
    }`
  );

  console.log("templateType:", page.templateType || "(none — uses fallback)");
  console.log("\n--- WHAT ACTUALLY RENDERS (fallback template) ---");
  console.log("SubPageHero description = metaDescription:");
  console.log(`  "${page.metaDescription || "(empty)"}"`);
  console.log("\nPortableContent = content:");
  console.log(`  "${extractText(page.content)}"`);
  console.log("\nheroDescription (NOT rendered in fallback!):");
  console.log(`  "${extractText(page.heroDescription)}"`);
  console.log("\nintroParagraphs (NOT rendered - no introKicker):");
  (page.introParagraphs || []).forEach((p, i) => {
    console.log(`  [${i}]: "${extractText(typeof p === "object" ? [p] : p)}"`);
  });
}

main().catch(console.error);
