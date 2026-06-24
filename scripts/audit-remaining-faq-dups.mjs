import { createClient } from "@sanity/client";

const c = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Find pages with FAQs that are NOT 7 items
const pages = await c.fetch(`*[_type=='page' && !(_id match 'drafts.*') && count(faqItems) > 0 && count(faqItems) != 7]{
  h1, "slug": slug.current, "faqCount": count(faqItems),
  "faqs": faqItems[]{question}
} | order(slug.current)`);

console.log(`Pages with FAQs != 7:`, pages.length);
for (const p of pages) {
  console.log(`\n${p.slug} (${p.faqCount} FAQs):`);
  p.faqs.forEach((f, i) => console.log(`  Q${i + 1}: ${f.question}`));
}
