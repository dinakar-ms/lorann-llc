/**
 * Fix Sanity errors and populate OG fields for all non-page document types.
 *
 * Fixes:
 * 1. Missing _key on array items (dataAssetsPage, insightsPage, aboutPage, homepage, etc.)
 * 2. Invalid property type on aboutPage (string where richText expected)
 * 3. Populate ogTitle + ogDescription for all singleton documents
 *
 * Usage: node scripts/fix-sanity-errors-og.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);

/** Add _key to all items in an array if missing */
function fixKeys(arr) {
  if (!Array.isArray(arr)) return arr;
  let changed = false;
  const result = arr.map((item) => {
    if (typeof item === "object" && item !== null && !item._key) {
      changed = true;
      return { ...item, _key: k() };
    }
    // Recurse into nested arrays
    const newItem = { ...item };
    for (const key of Object.keys(newItem)) {
      if (Array.isArray(newItem[key])) {
        const fixed = fixKeys(newItem[key]);
        if (fixed !== newItem[key]) {
          changed = true;
          newItem[key] = fixed;
        }
      }
    }
    return newItem;
  });
  return changed ? result : arr;
}

/** Convert a plain string to richText (portable text block array) */
function stringToRichText(str) {
  if (!str || typeof str !== "string") return undefined;
  return [
    {
      _key: k(),
      _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text: str }],
      markDefs: [],
      style: "normal",
    },
  ];
}

// ─── OG field values for each singleton ─────────────────

const ogData = {
  homepage: {
    ogTitle: "Lorann LLC | Data-Driven Audience Solutions",
    ogDescription:
      "Premium audience development and data activation for B2B, healthcare, and consumer marketing. Verified contacts, compliance-ready data, and campaign-ready delivery.",
  },
  aboutPage: {
    ogTitle: "About Lorann LLC | Our Mission & Team",
    ogDescription:
      "Lorann is a premium audience development and activation partner for B2B, healthcare, and consumer data intelligence — delivering data that drives real marketing outcomes.",
  },
  contactPage: {
    ogTitle: "Contact Lorann LLC | Get a Data Strategy",
    ogDescription:
      "Tell us your goals and we'll develop a data strategy aligned to your targeting, activation, and performance needs. Expect a reply within one business day.",
  },
  dataAssetsPage: {
    ogTitle: "Data Assets | Lorann LLC",
    ogDescription:
      "A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels.",
  },
  howItWorksPage: {
    ogTitle: "How It Works | Lorann LLC",
    ogDescription:
      "See how Lorann builds, verifies, and delivers audience data — from source validation through campaign-ready formatting and compliance documentation.",
  },
  insightsPage: {
    ogTitle: "Insights | Lorann LLC",
    ogDescription:
      "Industry analysis, case studies, and data-driven perspectives from Lorann's audience strategy team. Stay ahead of trends in targeting and activation.",
  },
  industryTrendsPage: {
    ogTitle: "Industry Trends | Lorann LLC",
    ogDescription:
      "Short-form commentary, real-campaign results, and data-driven perspectives on audience building, targeting precision, and marketing performance.",
  },
  industriesPage: {
    ogTitle: "Industries Served | Lorann LLC",
    ogDescription:
      "Vertical expertise across healthcare, financial services, insurance, automotive, and B2B technology — data solutions tailored to each industry's requirements.",
  },
  resourcesPage: {
    ogTitle: "Resources | Lorann LLC",
    ogDescription:
      "Guides, whitepapers, and tools to help marketers get more from their data. Explore resources on audience strategy, targeting, and data activation.",
  },
  signalExchangePage: {
    ogTitle: "Signal Exchange | Lorann LLC",
    ogDescription:
      "Real-time intent signals and behavioral data enrichment to power smarter targeting. Identify in-market buyers and activate campaigns with precision.",
  },
  solutionsPage: {
    ogTitle: "Solutions | Lorann LLC",
    ogDescription:
      "Audience targeting, data enrichment, cost-per-lead optimization, and signal exchange solutions designed for marketers who demand measurable performance.",
  },
};

async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN\n");

  const types = Object.keys(ogData);

  for (const docType of types) {
    console.log(`\n═══ ${docType} ═══`);

    // Fetch both published and draft
    const docs = await client.fetch(
      `*[_type == "${docType}"]{ _id, ... }`
    );

    if (!docs.length) {
      console.log("  No documents found");
      continue;
    }

    for (const doc of docs) {
      const isDraft = doc._id.startsWith("drafts.");
      console.log(`  ${isDraft ? "DRAFT" : "PUBLISHED"}: ${doc._id}`);

      const patch = {};

      // ─── 1. Fix missing _key on all array fields ───
      const arrayFields = Object.keys(doc).filter(
        (key) => Array.isArray(doc[key]) && !key.startsWith("_")
      );
      for (const field of arrayFields) {
        const fixed = fixKeys(doc[field]);
        if (fixed !== doc[field]) {
          patch[field] = fixed;
          console.log(`    ✓ Fixed _key on ${field} (${fixed.length} items)`);
        }
      }

      // ─── 2. Fix type mismatches ───
      // aboutPage: features[].desc should be richText (array of blocks), not string
      if (docType === "aboutPage" && doc.features) {
        const fixedFeatures = (doc.features || []).map((f) => {
          if (typeof f.desc === "string") {
            console.log(`    ✓ Converting features[].desc from string to richText`);
            return { ...f, desc: stringToRichText(f.desc) };
          }
          return f;
        });
        // Only update if we already have it in patch or if we found string descs
        const hasStringDesc = doc.features.some((f) => typeof f.desc === "string");
        if (hasStringDesc) {
          // Merge with any _key fixes
          patch.features = (patch.features || fixedFeatures).map((f, i) => {
            if (typeof doc.features[i]?.desc === "string") {
              return { ...f, desc: stringToRichText(doc.features[i].desc) };
            }
            return f;
          });
        }
      }

      // ─── 3. Populate OG fields ───
      const og = ogData[docType];
      if (og) {
        if (!doc.ogTitle) {
          patch.ogTitle = og.ogTitle;
          console.log(`    ✓ Set ogTitle: ${og.ogTitle}`);
        }
        if (!doc.ogDescription) {
          patch.ogDescription = og.ogDescription;
          console.log(`    ✓ Set ogDescription: ${og.ogDescription.substring(0, 60)}...`);
        }
      }

      // ─── Apply patch ───
      if (Object.keys(patch).length > 0) {
        if (!DRY_RUN) {
          await client.patch(doc._id).set(patch).commit();
          console.log(`    → Saved`);
        } else {
          console.log(`    → Would save ${Object.keys(patch).length} fields`);
        }
      } else {
        console.log(`    → No changes needed`);
      }
    }
  }

  console.log("\n\nDone!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
