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
  if (!val) return "(empty)";
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

  console.log("=== SOLUTIONS PAGE — FINAL STATE ===\n");
  console.log("templateType:", page.templateType, "(uses Hub template ✅)");
  console.log("\n--- Hero Section (renders heroDescription) ---");
  console.log(`kicker: ${page.kicker}`);
  console.log(`title: ${page.titlePlain} ${page.titleAccent}`);
  const heroText = extractText(page.heroDescription);
  console.log(`description: "${heroText}"`);
  console.log(`Lorann count: ${(heroText.match(/\blorann\b/gi) || []).length}`);

  console.log("\n--- Intro Section (renders introParagraphs) ---");
  console.log(`introKicker: ${page.introKicker}`);
  console.log(`introHeadline: ${page.introHeadlinePlain} ${page.introHeadlineAccent}`);
  let introCount = 0;
  (page.introParagraphs || []).forEach((p, i) => {
    const text = extractText(typeof p === "object" ? [p] : p);
    const matches = (text.match(/\blorann\b/gi) || []).length;
    introCount += matches;
    console.log(`  para[${i}]: "${text}"`);
    console.log(`  Lorann count: ${matches}`);
  });

  console.log("\n--- Children Section ---");
  console.log(`childrenSectionKicker: ${page.childrenSectionKicker}`);
  console.log(`childrenItems: ${(page.childrenItems || []).length} items`);
  (page.childrenItems || []).forEach((c, i) => {
    console.log(`  [${i}] ${c.title} → ${c.href}`);
  });

  const totalLorann = (heroText.match(/\blorann\b/gi) || []).length + introCount;
  console.log(`\n=== TOTAL visible "Lorann" mentions in content: ${totalLorann} ===`);
}

main().catch(console.error);
