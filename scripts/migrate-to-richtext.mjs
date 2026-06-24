#!/usr/bin/env node
/**
 * Migrate plain string fields to Portable Text blocks for:
 *  - introParagraphs (array of strings → array of blocks)
 *  - proseSections[].paragraphs (array of strings → array of blocks)
 *  - proseSections[].highlights[].text (string → array of blocks)
 *
 * This ensures the Sanity Studio shows the Bold/Italic/Underline/Link toolbar
 * for these fields after the schema change.
 *
 * IMPORTANT: Deploy the code changes FIRST, then run this script.
 *
 * Run:  node scripts/migrate-to-richtext.mjs
 */
import { createClient } from "next-sanity";
import { randomBytes } from "crypto";

const TOKEN =
  "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

/** Convert a plain string to a Portable Text block */
function stringToBlock(str) {
  if (!str || typeof str !== "string") return str;
  return {
    _type: "block",
    _key: key(),
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: key(), text: str, marks: [] }],
  };
}

/** Check if a value is already a Portable Text block */
function isBlock(val) {
  return val && typeof val === "object" && val._type === "block";
}

/** Check if a value is a Portable Text array (array of blocks) */
function isBlockArray(val) {
  return Array.isArray(val) && val.length > 0 && isBlock(val[0]);
}

async function main() {
  const pages = await client.fetch(
    `*[_type == "page"]{
      _id, h1, "slug": slug.current,
      introParagraphs, proseSections
    }`
  );

  console.log(`Processing ${pages.length} documents...\n`);
  let patchCount = 0;

  for (const page of pages) {
    const patch = {};
    let changed = false;

    // ── Migrate introParagraphs ──
    if (page.introParagraphs && Array.isArray(page.introParagraphs)) {
      const migrated = page.introParagraphs.map((p) => {
        if (typeof p === "string") {
          changed = true;
          return stringToBlock(p);
        }
        if (isBlock(p)) return p; // Already a block
        if (isBlockArray(p)) {
          // Already an array of blocks — unwrap first block
          changed = true;
          return p[0];
        }
        return p;
      });
      if (changed) patch.introParagraphs = migrated;
    }

    // ── Migrate proseSections ──
    if (page.proseSections && Array.isArray(page.proseSections)) {
      let proseChanged = false;
      const migratedProse = page.proseSections.map((ps) => {
        const section = { ...ps };

        // Migrate paragraphs
        if (section.paragraphs && Array.isArray(section.paragraphs)) {
          section.paragraphs = section.paragraphs.map((p) => {
            if (typeof p === "string") {
              proseChanged = true;
              return stringToBlock(p);
            }
            if (isBlock(p)) return p;
            if (isBlockArray(p)) {
              proseChanged = true;
              return p[0];
            }
            return p;
          });
        }

        // Migrate highlights[].text
        if (section.highlights && Array.isArray(section.highlights)) {
          section.highlights = section.highlights.map((h) => {
            if (typeof h.text === "string") {
              proseChanged = true;
              return {
                ...h,
                text: [stringToBlock(h.text)],
              };
            }
            // If already block array, keep as is
            if (isBlockArray(h.text)) return h;
            // If it's a single block, wrap in array
            if (isBlock(h.text)) {
              proseChanged = true;
              return { ...h, text: [h.text] };
            }
            return h;
          });
        }

        return section;
      });

      if (proseChanged) {
        patch.proseSections = migratedProse;
        changed = true;
      }
    }

    if (!changed) continue;

    try {
      await client.patch(page._id).set(patch).commit();
      patchCount++;
      const isDraft = page._id.startsWith("drafts.");
      if (!isDraft) {
        console.log(`  ✓ ${page.slug || page._id}`);
      }
    } catch (err) {
      console.error(`  ✗ ${page._id}: ${err.message}`);
    }
  }

  console.log(`\n✅ Done. Migrated ${patchCount} documents to rich text format.`);
}

main().catch(console.error);
