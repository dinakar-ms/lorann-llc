/**
 * Migrate remaining nested string desc/body/bio/excerpt fields to richText.
 * Run AFTER migrate-richtext.mjs (which handled top-level description fields).
 *
 * Run:  node scripts/migrate-richtext-nested.mjs
 */

import { readFileSync } from "fs";
import { createClient } from "@sanity/client";
import { randomBytes } from "crypto";

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

function toPortableText(str) {
  if (!str || typeof str !== "string") return null;
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text: str, marks: [] }],
    },
  ];
}

// Nested array migrations: docType -> [{ arrayField, subFields }]
const NESTED_MIGRATIONS = [
  // Homepage
  { type: "homepage", arrayField: "valueCards", subFields: ["desc"] },
  { type: "homepage", arrayField: "howSteps", subFields: ["desc"] },
  { type: "homepage", arrayField: "solutionsRows", subFields: ["desc"] },
  { type: "homepage", arrayField: "industriesItems", subFields: ["desc"] },
  // About
  { type: "aboutPage", arrayField: null, subFields: ["missionParagraph1", "missionParagraph2", "missionParagraph3"] },
  { type: "aboutPage", arrayField: "valuesCards", subFields: ["desc"] },
  // How It Works
  { type: "howItWorksPage", arrayField: "promisesCards", subFields: ["desc"] },
  // Insights
  { type: "insightsPage", arrayField: "browseCards", subFields: ["desc"] },
  // Signal Exchange
  { type: "signalExchangePage", arrayField: "capabilitiesCards", subFields: ["desc"] },
  // Industries
  { type: "industriesPage", arrayField: "deepDivesItems", subFields: ["lede"] },
  // Resources
  { type: "resourcesPage", arrayField: "posts", subFields: ["excerpt"] },
  // Data Assets
  { type: "dataAssetsPage", arrayField: "features", subFields: ["desc"] },
  // Contact
  { type: "contactPage", arrayField: null, subFields: ["responseBody"] },
  // Industry Trends
  { type: "industryTrendsPage", arrayField: null, subFields: ["description", "sectionDescription"] },
  { type: "industryTrendsPage", arrayField: "posts", subFields: ["excerpt"] },
  // Page (generic) - nested arrays
  { type: "page", arrayField: "useCases", subFields: ["desc"] },
  { type: "page", arrayField: null, subFields: ["complianceBody", "newsletterBody"] },
  // Template objects via page
  { type: "page", arrayField: "teamMembers", subFields: ["bio"] },
  { type: "page", arrayField: "caseStudies", subFields: ["challenge", "approach", "outcome"] },
];

async function migrate() {
  let totalPatched = 0;

  for (const migration of NESTED_MIGRATIONS) {
    const { type, arrayField, subFields } = migration;

    if (arrayField) {
      // Nested array field migration
      const docs = await client.fetch(
        `*[_type == $type && defined(${arrayField})]{ _id, ${arrayField} }`,
        { type }
      );

      for (const doc of docs) {
        const arr = doc[arrayField];
        if (!Array.isArray(arr)) continue;

        let needsPatch = false;
        const newArr = arr.map((item) => {
          const patched = { ...item };
          for (const sf of subFields) {
            if (typeof patched[sf] === "string") {
              patched[sf] = toPortableText(patched[sf]);
              needsPatch = true;
            }
          }
          return patched;
        });

        if (needsPatch) {
          console.log(`  PATCH ${doc._id}: ${arrayField}[].${subFields.join(",")}`);
          await client.patch(doc._id).set({ [arrayField]: newArr }).commit();
          totalPatched++;
        }
      }
    } else {
      // Top-level field migration
      const docs = await client.fetch(
        `*[_type == $type]{ _id, ${subFields.join(", ")} }`,
        { type }
      );

      for (const doc of docs) {
        const patches = {};
        for (const sf of subFields) {
          if (typeof doc[sf] === "string") {
            patches[sf] = toPortableText(doc[sf]);
          }
        }
        if (Object.keys(patches).length > 0) {
          console.log(`  PATCH ${doc._id}: ${Object.keys(patches).join(", ")}`);
          await client.patch(doc._id).set(patches).commit();
          totalPatched++;
        }
      }
    }
  }

  // Also handle the featured article in industryTrendsPage (single object, not array)
  const itDocs = await client.fetch(
    `*[_type == "industryTrendsPage" && defined(featuredArticle)]{ _id, featuredArticle }`,
  );
  for (const doc of itDocs) {
    const fa = doc.featuredArticle;
    if (fa && typeof fa.excerpt === "string") {
      console.log(`  PATCH ${doc._id}: featuredArticle.excerpt`);
      await client
        .patch(doc._id)
        .set({ "featuredArticle.excerpt": toPortableText(fa.excerpt) })
        .commit();
      totalPatched++;
    }
  }

  console.log(`\n✅ Done. Patched: ${totalPatched}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
