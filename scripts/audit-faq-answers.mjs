import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const pages = await c.fetch(`*[_type=='page' && !(_id match 'drafts.*') && count(faqItems) > 0]{
  h1, "slug": slug.current,
  "faqs": faqItems[]{question, "answerText": answer[0].children[0].text}
} | order(slug.current)`);

// Extract answer templates per position
for (let i = 0; i < 7; i++) {
  const templateA = {};
  for (const p of pages) {
    const faq = (p.faqs || [])[i];
    if (!faq || !faq.answerText) continue;
    const h1Escaped = p.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(h1Escaped, "g");
    const aNorm = faq.answerText.replace(re, "{P}");
    if (!templateA[aNorm]) templateA[aNorm] = 0;
    templateA[aNorm]++;
  }

  const entries = Object.entries(templateA).sort((a, b) => b[1] - a[1]);
  console.log(`\n=== A${i + 1}: ${entries.length} unique answer templates ===`);
  entries.slice(0, 5).forEach(([a, count]) => {
    console.log(`  ${count}x: ${a.substring(0, 140)}`);
  });
}
