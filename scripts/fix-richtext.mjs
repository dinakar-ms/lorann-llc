/**
 * Fix all string→richText mismatches in healthcare pages created by
 * create-healthcare-pages.mjs. The Sanity schema defines:
 *   - featureGridSection.description  → richText (was stored as string)
 *   - featureItem.desc                → richText (was stored as string, in both
 *                                        featureGridSection.features and childrenItems)
 * This script fetches every page under healthcare, detects strings in those
 * positions, converts them to portable-text block arrays, and patches Sanity.
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);

/** Convert a plain string to a portable-text block array */
function toRichText(text) {
  if (!text || typeof text !== "string") return text; // already richText or empty
  return [
    {
      _key: k(),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [{ _key: k(), _type: "span", marks: [], text }],
    },
  ];
}

/** Return true if a value is a plain string (needs converting) */
const isString = (v) => typeof v === "string" && v.length > 0;

async function main() {
  // 1 ── Fetch all pages under data-assets/b2b-database/healthcare
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "data-assets/b2b-database/healthcare*"]{
      _id,
      "slug": slug.current,
      childrenItems[]{ _key, desc },
      featureGridSections[]{ _key, description, features[]{ _key, desc } }
    }`
  );

  console.log(`Found ${pages.length} pages under healthcare\n`);

  let docCount = 0;
  let fieldCount = 0;

  for (const page of pages) {
    let patch = client.patch(page._id);
    let changed = false;

    // ── childrenItems[].desc ─────────────────────────────────────────────────
    for (const item of page.childrenItems ?? []) {
      if (isString(item.desc)) {
        patch = patch.set({
          [`childrenItems[_key=="${item._key}"].desc`]: toRichText(item.desc),
        });
        changed = true;
        fieldCount++;
      }
    }

    // ── featureGridSections[].description  AND  .features[].desc ────────────
    for (const section of page.featureGridSections ?? []) {
      if (isString(section.description)) {
        patch = patch.set({
          [`featureGridSections[_key=="${section._key}"].description`]: toRichText(section.description),
        });
        changed = true;
        fieldCount++;
      }
      for (const feat of section.features ?? []) {
        if (isString(feat.desc)) {
          patch = patch.set({
            [`featureGridSections[_key=="${section._key}"].features[_key=="${feat._key}"].desc`]:
              toRichText(feat.desc),
          });
          changed = true;
          fieldCount++;
        }
      }
    }

    if (changed) {
      await patch.commit();
      console.log(`✓ ${page.slug}`);
      docCount++;
    } else {
      console.log(`  skip (already richText): ${page.slug}`);
    }
  }

  console.log(`\nDone — ${fieldCount} fields converted in ${docCount} documents.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
