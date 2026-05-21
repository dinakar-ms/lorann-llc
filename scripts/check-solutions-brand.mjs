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
  // Get the solutions hub page
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "solutions" && !(_id in path("drafts.**"))][0]`
  );

  if (!page) { console.log("Solutions page not found."); return; }

  console.log("=== SOLUTIONS PAGE CONTENT ===\n");
  console.log("h1:", page.h1);
  console.log("kicker:", page.kicker);
  console.log("titlePlain:", page.titlePlain);
  console.log("titleAccent:", page.titleAccent);
  console.log("heroDescription:", extractText(page.heroDescription));
  console.log("introKicker:", page.introKicker);
  console.log("introHeadlinePlain:", page.introHeadlinePlain);
  console.log("introHeadlineAccent:", page.introHeadlineAccent);

  if (page.introParagraphs) {
    console.log("\nintroParagraphs:");
    page.introParagraphs.forEach((p, i) => console.log(`  [${i}]: ${extractText(typeof p === "object" ? [p] : p)}`));
  }

  if (page.childrenItems) {
    console.log("\nchildrenItems:");
    page.childrenItems.forEach((c, i) => {
      console.log(`  [${i}] title: ${c.title}`);
      console.log(`  [${i}] desc: ${extractText(c.desc)}`);
    });
  }

  if (page.featureGridSections) {
    console.log("\nfeatureGridSections:");
    page.featureGridSections.forEach((fg, i) => {
      console.log(`  [${i}] kicker: ${fg.kicker}`);
      console.log(`  [${i}] titlePlain: ${fg.titlePlain}`);
      console.log(`  [${i}] titleAccent: ${fg.titleAccent}`);
      console.log(`  [${i}] description: ${extractText(fg.description)}`);
      if (fg.features) {
        fg.features.forEach((f, fi) => {
          console.log(`    feature[${fi}] title: ${f.title}`);
          console.log(`    feature[${fi}] desc: ${extractText(f.desc)}`);
        });
      }
    });
  }

  if (page.proseSections) {
    console.log("\nproseSections:");
    page.proseSections.forEach((ps, i) => {
      console.log(`  [${i}] kicker: ${ps.kicker}`);
      console.log(`  [${i}] titlePlain: ${ps.titlePlain}`);
      console.log(`  [${i}] titleAccent: ${ps.titleAccent}`);
      if (ps.paragraphs) {
        ps.paragraphs.forEach((p, pi) => console.log(`    para[${pi}]: ${extractText(typeof p === "object" ? [p] : p)}`));
      }
      if (ps.highlights) {
        ps.highlights.forEach((h, hi) => {
          console.log(`    highlight[${hi}] label: ${h.label}`);
          console.log(`    highlight[${hi}] text: ${extractText(Array.isArray(h.text) ? h.text : h.text)}`);
        });
      }
    });
  }

  if (page.faqItems) {
    console.log("\nfaqItems:");
    page.faqItems.forEach((f, i) => {
      console.log(`  [${i}] Q: ${f.question}`);
      console.log(`  [${i}] A: ${extractText(f.answer)}`);
    });
  }

  // Count Lorann mentions in content (exclude URLs/emails)
  const allText = [
    page.kicker, page.titlePlain, page.titleAccent,
    extractText(page.heroDescription),
    page.introKicker, page.introHeadlinePlain, page.introHeadlineAccent,
    ...(page.introParagraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)),
    ...(page.childrenItems || []).flatMap(c => [c.title, extractText(c.desc)]),
    ...(page.featureGridSections || []).flatMap(fg => [
      fg.kicker, fg.titlePlain, fg.titleAccent, extractText(fg.description),
      ...(fg.features || []).flatMap(f => [f.title, extractText(f.desc)])
    ]),
    ...(page.proseSections || []).flatMap(ps => [
      ps.kicker, ps.titlePlain, ps.titleAccent,
      ...(ps.paragraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)),
      ...(ps.highlights || []).flatMap(h => [h.label, extractText(Array.isArray(h.text) ? h.text : h.text)])
    ]),
    ...(page.faqItems || []).flatMap(f => [f.question, extractText(f.answer)])
  ].join(" ");

  const matches = allText.match(/\blorann\b/gi) || [];
  console.log(`\n=== Total visible "Lorann" mentions: ${matches.length} ===`);
  if (matches.length > 0) {
    // Find where
    const fields = {
      heroDescription: extractText(page.heroDescription),
      introParas: (page.introParagraphs || []).map(p => extractText(typeof p === "object" ? [p] : p)).join(" "),
    };
    for (const [k, v] of Object.entries(fields)) {
      if (/lorann/i.test(v)) console.log(`  Found in: ${k}`);
    }
  }
}

main().catch(console.error);
