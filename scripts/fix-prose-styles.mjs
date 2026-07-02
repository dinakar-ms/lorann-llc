#!/usr/bin/env node
/**
 * Fix prose section styles:
 * - "Why Choose" (kicker: "The Lorann Difference") → style: "split"
 * - "Who Can Use" (kicker: "Built For Your Team") → style: "centered"
 *
 * Patches both published and draft documents.
 */
import { createClient } from "next-sanity";

const TOKEN = "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

async function main() {
  // Get all pages with prose sections
  const pages = await client.fetch(
    `*[_type == "page" && defined(proseSections) && count(proseSections) > 0]{
      _id, h1, proseSections
    }`
  );

  console.log(`Found ${pages.length} pages with prose sections`);

  let patchCount = 0;

  for (const page of pages) {
    const sections = page.proseSections;
    let changed = false;

    const updatedSections = sections.map((s) => {
      if (s.kicker === "The Lorann Difference" && s.style !== "split") {
        changed = true;
        return { ...s, style: "split" };
      }
      if (s.kicker === "Built For Your Team" && s.style !== "centered") {
        changed = true;
        return { ...s, style: "centered" };
      }
      return s;
    });

    if (!changed) continue;

    // Patch the document
    try {
      await client.patch(page._id).set({ proseSections: updatedSections }).commit();
      patchCount++;
      console.log(`  ✓ ${page._id} — ${page.h1}`);
    } catch (err) {
      console.error(`  ✗ ${page._id} — ${err.message}`);
    }
  }

  console.log(`\nDone. Patched ${patchCount} documents.`);
}

main().catch(console.error);
