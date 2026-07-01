/**
 * Removes the orphaned `introContent` and `photoUrl` fields from inside
 * every page document's `healthcareComplianceSection` object.
 *
 * These fields were defined in the healthcareComplianceSection schema but
 * have since been removed. Sanity Studio shows an "Unknown fields found"
 * warning whenever it encounters values for them in stored documents.
 *
 * IMPORTANT: this only touches NESTED fields inside healthcareComplianceSection.
 * The top-level `page.introContent` field is a DIFFERENT field that is still
 * in active use — this script does not touch it.
 *
 * Usage:
 *   node scripts/clean-healthcare-compliance-orphans.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="development"
 *   node scripts/clean-healthcare-compliance-orphans.mjs
 *
 *   # Then for production:
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"
 *   node scripts/clean-healthcare-compliance-orphans.mjs
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const DRY_RUN = process.argv.includes("--dry-run");
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "development";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

async function run() {
  console.log(`\nCleaning orphan fields from healthcareComplianceSection`);
  console.log(
    `Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`
  );

  // Match docs where EITHER nested orphan is present.
  const docs = await client.fetch(
    `*[
       _type == "page" &&
       defined(healthcareComplianceSection) &&
       (
         defined(healthcareComplianceSection.introContent) ||
         defined(healthcareComplianceSection.photoUrl)
       )
     ] {
       _id,
       "slug": slug.current,
       "hasIntroContent": defined(healthcareComplianceSection.introContent),
       "hasPhotoUrl": defined(healthcareComplianceSection.photoUrl)
     }`
  );

  console.log(
    `Found ${docs.length} page document${docs.length === 1 ? "" : "s"} with at least one orphan field.\n`
  );

  if (docs.length === 0) {
    console.log("Nothing to clean up.\n");
    return;
  }

  let cleaned = 0;
  for (const doc of docs) {
    const label = doc._id.startsWith("drafts.") ? "[draft]    " : "[published]";
    const orphans = [];
    if (doc.hasIntroContent) orphans.push("introContent");
    if (doc.hasPhotoUrl) orphans.push("photoUrl");

    console.log(
      `  ${label} ${doc.slug || doc._id}  —  ${orphans.join(", ")}`
    );

    if (!DRY_RUN) {
      // Unset the nested keys. Sanity supports dot-paths in patch.unset().
      const paths = orphans.map(
        (key) => `healthcareComplianceSection.${key}`
      );
      await client.patch(doc._id).unset(paths).commit();
      cleaned++;
    }
  }

  if (DRY_RUN) {
    console.log(`\n[dry-run — no changes made]\n`);
  } else {
    console.log(
      `\n✓ Done — cleaned ${cleaned} document${cleaned === 1 ? "" : "s"}.\n`
    );
    console.log(
      "Refresh Sanity Studio. The 'Unknown fields found' warning should be gone."
    );
  }
}

run().catch((err) => {
  console.error("Cleanup failed:", err);
  process.exit(1);
});
