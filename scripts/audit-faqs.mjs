import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const pages = await c.fetch(`*[_type=='page' && !(_id match 'drafts.*')]{
  _id, h1, "slug": slug.current,
  "faqs": faqItems[]{question, answer}
} | order(slug.current)`);

const pagesWithFaqs = pages.filter((p) => p.faqs && p.faqs.length > 0);
let totalQ = 0;

const templateQ = {};
const templateA = {};

for (const p of pagesWithFaqs) {
  for (const faq of p.faqs) {
    totalQ++;
    const h1Escaped = p.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(h1Escaped, "g");
    const qNorm = faq.question.replace(re, "{P}");
    const aNorm =
      typeof faq.answer === "string" ? faq.answer.replace(re, "{P}") : "";

    if (!templateQ[qNorm]) templateQ[qNorm] = [];
    templateQ[qNorm].push(p.slug);

    if (aNorm) {
      if (!templateA[aNorm]) templateA[aNorm] = [];
      templateA[aNorm].push(p.slug);
    }
  }
}

console.log("Pages with FAQs:", pagesWithFaqs.length);
console.log("Total FAQ items:", totalQ);
console.log("Unique question templates:", Object.keys(templateQ).length);
console.log("Unique answer templates:", Object.keys(templateA).length);

const dupQ = Object.entries(templateQ)
  .filter(([k, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length);
console.log("\nDuplicate question templates:", dupQ.length);
dupQ.forEach(([q, slugs]) => {
  console.log(slugs.length + "x: " + q);
});

const dupA = Object.entries(templateA)
  .filter(([k, v]) => v.length > 1)
  .sort((a, b) => b[1].length - a[1].length);
console.log("\nDuplicate answer templates:", dupA.length);
dupA.slice(0, 15).forEach(([a, slugs]) => {
  console.log(slugs.length + "x: " + a.substring(0, 140) + "...");
});

// Show the 7 question positions and how many unique templates exist
console.log("\n=== FAQ POSITIONS (Q1-Q7) ===");
for (let i = 0; i < 7; i++) {
  const posQ = {};
  for (const p of pagesWithFaqs) {
    if (!p.faqs[i]) continue;
    const h1Escaped = p.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(h1Escaped, "g");
    const qNorm = p.faqs[i].question.replace(re, "{P}");
    if (!posQ[qNorm]) posQ[qNorm] = 0;
    posQ[qNorm]++;
  }
  const entries = Object.entries(posQ).sort((a, b) => b[1] - a[1]);
  console.log(`\nQ${i + 1}: ${entries.length} unique templates`);
  entries.forEach(([q, count]) => console.log(`  ${count}x: ${q}`));
}
