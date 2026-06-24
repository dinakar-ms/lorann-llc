/**
 * Fix attributes[].desc fields stored as plain strings across ALL pages.
 * The featureItem schema defines desc as richText, but the page-creation
 * script stored plain strings. This converts them to portable-text blocks.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

let keyCounter = 0;
const k = () => `k${String(++keyCounter).padStart(10, "0")}`;

/** Convert a plain string to a portable-text block array */
function toRichText(text) {
  if (!text || typeof text !== "string") return text;
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

async function main() {
  // Fetch ALL pages that have an attributes array
  const pages = await client.fetch(
    `*[_type == "page" && defined(attributes)]{
      _id, "slug": slug.current,
      attributes[]{ _key, desc }
    }`
  );

  console.log(`Found ${pages.length} pages with attributes\n`);

  let docCount = 0;
  let fieldCount = 0;

  for (const page of pages) {
    const badItems = (page.attributes || []).filter(
      (a) => typeof a.desc === "string"
    );
    if (!badItems.length) continue;

    let patch = client.patch(page._id);
    for (const item of badItems) {
      patch = patch.set({
        [`attributes[_key=="${item._key}"].desc`]: toRichText(item.desc),
      });
      fieldCount++;
    }

    try {
      await patch.commit();
      console.log(`✓ ${page.slug || page._id}  (${badItems.length} fixed)`);
      docCount++;
    } catch (err) {
      console.error(`✗ ${page.slug || page._id}:`, err.message);
    }
  }

  console.log(`\nDone — ${fieldCount} desc fields converted in ${docCount} documents.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
