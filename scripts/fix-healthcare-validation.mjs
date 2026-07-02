/**
 * Fix ALL Sanity validation errors across every healthcare page (hub + leaf):
 *
 *  1. hubAttributesSectionDescription  string → richText array
 *  2. childrenSectionDescription        string → richText array
 *  3. featureGridSections[].description string → richText array
 *  4. hubAttributesItems[].desc         string → richText array
 *  5. featureGridSections[].features[].desc  string → richText array
 *  6. metaTitle > 70 chars              trimmed to ≤ 70 chars
 *
 * Patches BOTH published documents AND their draft counterparts so Sanity
 * Studio's validation panel clears regardless of which version is open.
 *
 * Usage: node scripts/fix-healthcare-validation.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";

const DRY_RUN = process.argv.includes("--dry-run");

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

let keyCounter = 0;
const k = () => `k${String(++keyCounter).padStart(10, "0")}`;

/** Convert a plain string to a portable-text richText block array */
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

/** Trim a meta title to ≤ 70 characters — cut before the last word boundary */
function trimMetaTitle(title) {
  if (!title || title.length <= 70) return title;
  const trimmed = title.slice(0, 70);
  const lastSpace = trimmed.lastIndexOf(" ");
  return (lastSpace > 50 ? trimmed.slice(0, lastSpace) : trimmed).replace(/\s*[|—]\s*$/, "").trim();
}

const FIELDS_QUERY = `{
  _id,
  "slug": slug.current,
  templateType,
  metaTitle,
  childrenSectionDescription,
  hubAttributesSectionDescription,
  hubAttributesItems[]{ _key, desc },
  featureGridSections[]{
    _key,
    description,
    features[]{ _key, desc }
  }
}`;

/** Build fixes list for a single page document */
function buildFixes(page) {
  const fixes = [];
  const log  = [];

  if (typeof page.hubAttributesSectionDescription === "string") {
    fixes.push({ path: "hubAttributesSectionDescription", value: toRichText(page.hubAttributesSectionDescription) });
    log.push("hubAttributesSectionDescription");
  }
  if (typeof page.childrenSectionDescription === "string") {
    fixes.push({ path: "childrenSectionDescription", value: toRichText(page.childrenSectionDescription) });
    log.push("childrenSectionDescription");
  }
  for (const section of (page.featureGridSections || [])) {
    if (typeof section.description === "string") {
      fixes.push({
        path: `featureGridSections[_key=="${section._key}"].description`,
        value: toRichText(section.description),
      });
      log.push(`featureGridSections[${section._key}].description`);
    }
    for (const feat of (section.features || [])) {
      if (typeof feat.desc === "string") {
        fixes.push({
          path: `featureGridSections[_key=="${section._key}"].features[_key=="${feat._key}"].desc`,
          value: toRichText(feat.desc),
        });
        log.push(`featureGridSections[${section._key}].features[${feat._key}].desc`);
      }
    }
  }
  for (const item of (page.hubAttributesItems || [])) {
    if (typeof item.desc === "string") {
      fixes.push({
        path: `hubAttributesItems[_key=="${item._key}"].desc`,
        value: toRichText(item.desc),
      });
      log.push(`hubAttributesItems[${item._key}].desc`);
    }
  }
  if (page.metaTitle && page.metaTitle.length > 70) {
    const trimmed = trimMetaTitle(page.metaTitle);
    fixes.push({ path: "metaTitle", value: trimmed });
    log.push(`metaTitle (${page.metaTitle.length} → ${trimmed.length} chars)`);
  }

  return { fixes, log };
}

/** Commit a patch for a given document ID */
async function commitPatch(id, fixes) {
  let patch = client.patch(id);
  for (const fix of fixes) {
    patch = patch.set({ [fix.path]: fix.value });
  }
  await patch.commit();
}

async function main() {
  console.log(DRY_RUN ? "=== DRY RUN ===\n" : "=== LIVE RUN ===\n");

  // ── 1. Query published healthcare pages ─────────────────────────────────
  const published = await client.fetch(`
    *[
      !(_id in path("drafts.**")) &&
      _type == "page" &&
      slug.current match "data-assets/b2b-database/healthcare*"
    ]${FIELDS_QUERY}
  `);

  // ── 2. Query draft healthcare pages ─────────────────────────────────────
  const drafts = await client.fetch(`
    *[
      _id in path("drafts.**") &&
      _type == "page" &&
      slug.current match "data-assets/b2b-database/healthcare*"
    ]${FIELDS_QUERY}
  `);

  console.log(`Found ${published.length} published + ${drafts.length} draft healthcare pages\n`);

  // Build a set of draft IDs already found so we don't double-process
  const draftIdSet = new Set(drafts.map(d => d._id));

  let totalDocs = 0;
  let totalFixes = 0;

  async function processDoc(page, label) {
    const { fixes, log } = buildFixes(page);
    if (!fixes.length) return;

    const slug = page.slug || page._id;
    console.log(`► [${label}] ${slug}  [${fixes.length} fix${fixes.length > 1 ? "es" : ""}]`);
    for (const l of log) console.log(`  • ${l}`);

    if (!DRY_RUN) {
      try {
        await commitPatch(page._id, fixes);
        console.log(`  ✓ committed`);
        totalDocs++;
        totalFixes += fixes.length;
      } catch (err) {
        console.error(`  ✗ error:`, err.message);
      }
    } else {
      totalDocs++;
      totalFixes += fixes.length;
    }
  }

  // ── 3. Process all published docs, then also try their draft counterpart ──
  for (const page of published) {
    await processDoc(page, "published");

    // Also patch the draft version if it wasn't already in the draft query
    const draftId = `drafts.${page._id}`;
    if (!draftIdSet.has(draftId)) {
      // Draft may still exist even if query didn't return it — try directly
      if (!DRY_RUN) {
        const { fixes } = buildFixes(page);
        if (fixes.length) {
          try {
            await commitPatch(draftId, fixes);
            console.log(`  ✓ draft also committed (${draftId})`);
          } catch {
            // Draft doesn't exist for this doc — that's fine
          }
        }
      }
    }
  }

  // ── 4. Process draft docs ────────────────────────────────────────────────
  for (const page of drafts) {
    await processDoc(page, "draft");
  }

  console.log(`\n${ DRY_RUN ? "[DRY RUN] Would fix" : "Fixed" } ${totalFixes} fields in ${totalDocs} documents.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
