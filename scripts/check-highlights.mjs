#!/usr/bin/env node
/**
 * Check if any proseSections.highlights[].text values are NOT plain strings.
 */
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

async function main() {
  const pages = await client.fetch(
    `*[_type == "page" && defined(proseSections)]{
      _id, "slug": slug.current,
      proseSections
    }`
  );

  console.log(`Checking ${pages.length} documents with proseSections...\n`);
  let issues = 0;

  for (const page of pages) {
    const slug = page.slug || page._id;
    if (page._id.startsWith("drafts.")) continue;

    if (page.proseSections && Array.isArray(page.proseSections)) {
      page.proseSections.forEach((ps, si) => {
        // Check paragraphs
        if (ps.paragraphs && Array.isArray(ps.paragraphs)) {
          ps.paragraphs.forEach((p, pi) => {
            if (typeof p !== "string") {
              issues++;
              console.log(`❌ ${slug} proseSections[${si}].paragraphs[${pi}] type=${typeof p} isArray=${Array.isArray(p)}`, JSON.stringify(p).substring(0, 100));
            }
          });
        }
        // Check highlights
        if (ps.highlights && Array.isArray(ps.highlights)) {
          ps.highlights.forEach((h, hi) => {
            if (typeof h.text !== "string") {
              issues++;
              console.log(`❌ ${slug} proseSections[${si}].highlights[${hi}].text type=${typeof h.text} isArray=${Array.isArray(h.text)}`, JSON.stringify(h.text).substring(0, 150));
            }
          });
        }
      });
    }
  }

  // Also check ALL introParagraphs
  const allPages = await client.fetch(
    `*[_type == "page" && defined(introParagraphs)]{
      _id, "slug": slug.current,
      introParagraphs
    }`
  );

  console.log(`\nChecking ${allPages.length} documents with introParagraphs...`);
  for (const page of allPages) {
    if (page._id.startsWith("drafts.")) continue;
    const slug = page.slug || page._id;
    if (page.introParagraphs && Array.isArray(page.introParagraphs)) {
      page.introParagraphs.forEach((p, i) => {
        if (typeof p !== "string") {
          issues++;
          console.log(`❌ ${slug} introParagraphs[${i}] type=${typeof p} isArray=${Array.isArray(p)}`, JSON.stringify(p).substring(0, 100));
        }
      });
    }
  }

  if (issues === 0) {
    console.log("\n✅ All proseSections and introParagraphs values are plain strings.");
  } else {
    console.log(`\n⚠️ Found ${issues} non-string values.`);
  }
}

main().catch(console.error);
