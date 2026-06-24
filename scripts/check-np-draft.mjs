import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "..", ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const client = createClient({ projectId: "a694bsry", dataset: "production", apiVersion: "2024-10-01", useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN });

// Get the published NP page ID first
const published = await client.fetch(
  `*[_type == "page" && slug.current == "data-assets/b2b-database/healthcare/physicians-advanced-practice/nurse-practitioners" && !(_id match "drafts.*")][0]{ _id }`
);
console.log("Published _id:", published?._id);

if (published?._id) {
  // Fetch the draft directly
  const draftId = `drafts.${published._id}`;
  const draft = await client.getDocument(draftId);
  if (draft) {
    const keys = Object.keys(draft);
    console.log("\nDraft fields:", keys.join(", "));
    if (draft.introContent !== undefined) {
      console.log("\nintroContent EXISTS in draft:", JSON.stringify(draft.introContent).slice(0, 200));
    } else {
      console.log("\nintroContent NOT found in draft");
    }
    // Check for any other unknown-looking fields
    const knownFields = ["_id","_type","_rev","_createdAt","_updatedAt","slug","h1","templateType","introKicker",
      "introHeadlinePlain","introHeadlineAccent","introParagraphs","stats","attributes","attributesSectionKicker",
      "attributesSectionTitle","attributesSectionAccent","useCases","useCasesSectionKicker","useCasesSectionTitle",
      "useCasesSectionAccent","backLink","proseSections","featureGridSections","healthcareFeaturesSection",
      "healthcareComplianceSection","faqItems","seo","heroImage","heroImageAlt","complianceBandLogos","introContent"];
    const unknownFields = keys.filter(k => !knownFields.includes(k));
    if (unknownFields.length) console.log("\nPotentially unknown fields:", unknownFields);
  } else {
    console.log("\nNo draft document found");
  }
}

// Also search broadly for any docs with introContent using a different approach
const anyWithField = await client.fetch(
  `*[_type == "page" && introContent != null] | order(_id) { _id, "slug": slug.current }`
);
console.log(`\nBroad search (introContent != null): ${anyWithField.length} docs`);
anyWithField.forEach(d => console.log(" ", d._id, d.slug));
