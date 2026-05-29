/**
 * Populate Open Graph title and description for all pages.
 * OG title = metaTitle or h1 (with site name suffix for social sharing).
 * OG description = metaDescription (truncated to ~160 chars for social previews).
 *
 * Usage: node scripts/populate-og-fields.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");

  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*")]{ _id, h1, "slug": slug.current, metaTitle, metaDescription, templateType } | order(slug.current)'
  );
  console.log(`Found ${pages.length} pages\n`);

  let updated = 0;
  let skipped = 0;

  for (let i = 0; i < pages.length; i++) {
    const { _id, h1, slug, metaTitle, metaDescription, templateType } = pages[i];

    // Build OG title: use metaTitle if available, otherwise h1 + site suffix
    const baseTitle = metaTitle || h1 || "Lorann LLC";
    // Strip existing " | Lorann" or " · Lorann" suffixes to avoid doubling
    const cleanTitle = baseTitle
      .replace(/\s*[|·–—]\s*Lorann\s*(LLC)?$/i, "")
      .trim();
    const ogTitle = `${cleanTitle} | Lorann LLC`;

    // Build OG description: use metaDescription, trim to ~160 chars at word boundary
    let ogDescription = metaDescription || "";
    if (ogDescription.length > 160) {
      ogDescription = ogDescription.substring(0, 157).replace(/\s+\S*$/, "") + "…";
    }
    if (!ogDescription) {
      // Fallback: generate from h1
      ogDescription = `${h1 || "Lorann"} — explore data solutions, verified contact records, and campaign-ready audience segments from Lorann LLC.`;
    }

    if (DRY_RUN) {
      console.log(`[${i + 1}] ${slug}`);
      console.log(`  OG Title: ${ogTitle}`);
      console.log(`  OG Desc:  ${ogDescription.substring(0, 80)}...`);
      updated++;
      continue;
    }

    // Update published doc
    await client.patch(_id).set({ ogTitle, ogDescription }).commit();

    // Update draft if exists
    try {
      const d = await client.getDocument(`drafts.${_id}`);
      if (d) await client.patch(`drafts.${_id}`).set({ ogTitle, ogDescription }).commit();
    } catch {}

    updated++;
    console.log(`[${i + 1}] ✓ ${slug}`);
  }

  console.log(`\nDone! ${updated} pages updated, ${skipped} skipped.`);
}

main().catch(e => { console.error(e); process.exit(1); });
