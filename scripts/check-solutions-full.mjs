#!/usr/bin/env node
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

async function main() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "solutions" && !(_id in path("drafts.**"))][0]`
  );
  if (!page) { console.log("Not found"); return; }

  console.log("templateType:", page.templateType);
  console.log("h1:", page.h1);
  console.log("kicker:", page.kicker);
  console.log("titlePlain:", page.titlePlain);
  console.log("titleAccent:", page.titleAccent);
  console.log("heroDescription:", extractText(page.heroDescription));
  console.log("introKicker:", page.introKicker);
  console.log("introHeadlinePlain:", page.introHeadlinePlain);
  console.log("introHeadlineAccent:", page.introHeadlineAccent);
  console.log("introParagraphs count:", (page.introParagraphs || []).length);
  console.log("childrenItems count:", (page.childrenItems || []).length);
  console.log("childrenSectionKicker:", page.childrenSectionKicker);
  console.log("childrenSectionTitlePlain:", page.childrenSectionTitlePlain);
  console.log("childrenSectionTitleAccent:", page.childrenSectionTitleAccent);
  console.log("childrenSectionDescription:", extractText(page.childrenSectionDescription));
  console.log("featureGridSections count:", (page.featureGridSections || []).length);
  console.log("proseSections count:", (page.proseSections || []).length);
  console.log("faqItems count:", (page.faqItems || []).length);

  if (page.childrenItems) {
    console.log("\n--- Children Items ---");
    page.childrenItems.forEach((c, i) => {
      console.log(`  [${i}] title: ${c.title}, desc: ${extractText(c.desc).substring(0, 80)}...`);
    });
  }

  // Also check all solution child pages
  console.log("\n--- Solution Child Pages ---");
  const children = await client.fetch(
    `*[_type == "page" && slug.current match "solutions/*" && !(_id in path("drafts.**"))]{
      "slug": slug.current, h1, heroDescription, introParagraphs
    } | order(slug.current asc)`
  );
  for (const child of children) {
    const heroText = extractText(child.heroDescription);
    const introText = (child.introParagraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)).join(" ");
    const allText = heroText + " " + introText;
    const count = (allText.match(/\blorann\b/gi) || []).length;
    console.log(`  ${child.slug}: ${count} Lorann mentions`);
  }
}

main().catch(console.error);
