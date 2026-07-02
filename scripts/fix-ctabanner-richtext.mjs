/**
 * Fix ctaBannerData.body stored as plain strings — schema expects richText.
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
  const pages = await client.fetch(
    `*[_type == "page" && defined(ctaBannerData)]{
      _id, "slug": slug.current,
      ctaBannerData{ body }
    }`
  );

  console.log(`Found ${pages.length} pages with ctaBannerData\n`);

  let docCount = 0;
  let fieldCount = 0;

  for (const page of pages) {
    if (typeof page.ctaBannerData?.body !== "string") continue;

    try {
      await client
        .patch(page._id)
        .set({ "ctaBannerData.body": toRichText(page.ctaBannerData.body) })
        .commit();
      console.log(`✓ ${page.slug || page._id}`);
      docCount++;
      fieldCount++;
    } catch (err) {
      console.error(`✗ ${page.slug || page._id}:`, err.message);
    }
  }

  console.log(`\nDone — ${fieldCount} ctaBannerData.body fields converted in ${docCount} documents.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
