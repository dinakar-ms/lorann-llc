/**
 * Migrate all string-typed description fields to richText (Portable Text) arrays.
 * This converts plain string values like "Hello world" into:
 * [{ _type: "block", _key: "xxx", style: "normal", markDefs: [], children: [{ _type: "span", _key: "yyy", text: "Hello world", marks: [] }] }]
 *
 * Run:  node scripts/migrate-richtext.mjs
 */

import { readFileSync } from "fs";
import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

// ── Read env ────────────────────────────────────────────
const env = readFileSync(".env.local", "utf8");
const get = (key) => {
  const m = env.match(new RegExp(`${key}=(.+)`));
  return m ? m[1].trim() : "";
};

const client = createClient({
  projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: get("NEXT_PUBLIC_SANITY_DATASET") || "production",
  apiVersion: "2024-01-01",
  token: get("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

const key = () => randomBytes(6).toString("hex");

function stringToPortableText(str) {
  if (!str || typeof str !== "string") return null;
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: key(),
          text: str,
          marks: [],
        },
      ],
    },
  ];
}

// ── Field maps: docType -> fieldNames that should be richText ──
const FIELD_MAP = {
  homepage: [
    "heroDescription",
    "valueDescription",
    "signalDescription",
    "howDescription",
    "numbersDescription",
    "solutionsDescription",
    "industriesDescription",
    "finalCtaDescription",
  ],
  page: [
    "heroDescription",
    "childrenSectionDescription",
    "hubAttributesSectionDescription",
  ],
  aboutPage: ["heroDescription"],
  howItWorksPage: ["heroDescription"],
  solutionsPage: ["heroDescription"],
  contactPage: ["heroDescription", "infoDescription"],
  dataAssetsPage: ["heroDescription", "sectionDescription"],
  industriesPage: ["heroDescription"],
  insightsPage: ["heroDescription"],
  signalExchangePage: ["heroDescription", "resultsDescription"],
  resourcesPage: ["heroDescription"],
};

// ── Also handle nested array fields with description sub-fields ──
const NESTED_FIELD_MAP = {
  // docType -> { arrayFieldName: subFieldName }
  page: {
    featureGridSections: "description",
  },
};

async function migrate() {
  let totalPatched = 0;
  let totalSkipped = 0;

  for (const [docType, fields] of Object.entries(FIELD_MAP)) {
    // Fetch ALL documents (published + drafts)
    const docs = await client.fetch(
      `*[_type == $type]{ _id, ${fields.join(", ")} }`,
      { type: docType }
    );

    console.log(`\n── ${docType}: ${docs.length} document(s) ──`);

    for (const doc of docs) {
      const patches = {};
      for (const field of fields) {
        const val = doc[field];
        if (typeof val === "string") {
          patches[field] = stringToPortableText(val);
        }
      }

      if (Object.keys(patches).length > 0) {
        console.log(`  PATCH ${doc._id}: ${Object.keys(patches).join(", ")}`);
        await client.patch(doc._id).set(patches).commit();
        totalPatched++;
      } else {
        totalSkipped++;
      }
    }
  }

  // Handle nested array fields
  for (const [docType, arrayMap] of Object.entries(NESTED_FIELD_MAP)) {
    for (const [arrayField, subField] of Object.entries(arrayMap)) {
      const docs = await client.fetch(
        `*[_type == $type && defined(${arrayField})]{ _id, ${arrayField} }`,
        { type: docType }
      );

      for (const doc of docs) {
        const arr = doc[arrayField];
        if (!Array.isArray(arr)) continue;

        let needsPatch = false;
        const newArr = arr.map((item) => {
          if (typeof item[subField] === "string") {
            needsPatch = true;
            return { ...item, [subField]: stringToPortableText(item[subField]) };
          }
          return item;
        });

        if (needsPatch) {
          console.log(`  PATCH ${doc._id}: ${arrayField}[].${subField}`);
          await client.patch(doc._id).set({ [arrayField]: newArr }).commit();
          totalPatched++;
        }
      }
    }
  }

  console.log(`\n✅ Done. Patched: ${totalPatched}, Already OK: ${totalSkipped}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
