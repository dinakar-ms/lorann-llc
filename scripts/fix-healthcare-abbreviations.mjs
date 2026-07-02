/**
 * Fix all medical abbreviations in Sanity CMS healthcare pages.
 * Replaces role abbreviations (NP, PA, RN, etc.) with full professional names
 * across every text field of every healthcare leaf/hub page.
 *
 * Usage:
 *   node scripts/fix-healthcare-abbreviations.mjs --dry-run   (preview changes)
 *   node scripts/fix-healthcare-abbreviations.mjs             (apply to production)
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/fix-healthcare-abbreviations.mjs
 */

import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");

// Load .env.local
const envPath = join(projectRoot, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

// ─── Abbreviation replacement rules ──────────────────────────────────────────
// Order matters: plurals before singulars, longer before shorter.
// All use \b word boundaries to avoid partial-word matches.
const REPLACEMENTS = [
  // Plural role abbreviations
  [/\bNPs\b/g,  "Nurse Practitioners"],
  [/\bPAs\b/g,  "Physician Assistants"],
  [/\bRNs\b/g,  "Registered Nurses"],
  [/\bLPNs\b/g, "Licensed Practical Nurses"],
  [/\bCNAs\b/g, "Certified Nursing Assistants"],
  [/\bCNMs\b/g, "Certified Nurse-Midwives"],
  [/\bDVMs\b/g, "Veterinarians"],
  [/\bODs\b/g,  "Optometrists"],
  [/\bDPMs\b/g, "Doctors of Podiatric Medicine"],
  [/\bPTs\b/g,  "Physical Therapists"],
  [/\bOTs\b/g,  "Occupational Therapists"],
  [/\bSLPs\b/g, "Speech-Language Pathologists"],
  [/\bMAs\b/g,  "Medical Assistants"],
  [/\bCMOs\b/g, "Chief Medical Officers"],
  [/\bCNOs\b/g, "Chief Nursing Officers"],
  [/\bDCs\b/g,  "Chiropractors"],

  // Singular role abbreviations
  [/\bNP\b/g,   "Nurse Practitioner"],
  [/\bPA\b/g,   "Physician Assistant"],
  [/\bRN\b/g,   "Registered Nurse"],
  [/\bLPN\b/g,  "Licensed Practical Nurse"],
  [/\bCNA\b/g,  "Certified Nursing Assistant"],
  [/\bCNM\b/g,  "Certified Nurse-Midwife"],
  [/\bDVM\b/g,  "Veterinarian"],
  [/\bOD\b/g,   "Optometrist"],
  [/\bDPM\b/g,  "Doctor of Podiatric Medicine"],
  [/\bPT\b/g,   "Physical Therapist"],
  [/\bOT\b/g,   "Occupational Therapist"],
  [/\bSLP\b/g,  "Speech-Language Pathologist"],
  [/\bCMO\b/g,  "Chief Medical Officer"],
  [/\bCNO\b/g,  "Chief Nursing Officer"],
  [/\bDC\b/g,   "Chiropractor"],
  // MA last (most ambiguous — Medical Assistant only in healthcare professional context)
  [/\bMA\b/g,   "Medical Assistant"],

  // Technology & other abbreviations
  [/\bEMR\b/g,  "Electronic Medical Record"],
  [/\bEHR\b/g,  "Electronic Health Record"],
  [/\bHIS\b/g,  "Health Information System"],
  [/\bDME\b/g,  "Durable Medical Equipment"],
  [/\bPBM\b/g,  "Pharmacy Benefit Manager"],

  // Fix common double-expansion artifacts after chaining rules
  [/\bNurse Practitioners Practitioner\b/g, "Nurse Practitioner"],
  [/\bPhysician Assistants Assistant\b/g, "Physician Assistant"],
];

// Sanity object keys to never modify (internal / structural fields)
const SKIP_KEYS = new Set([
  "_id", "_rev", "_type", "_key", "_ref", "_weak",
  "slug", "url", "href", "src", "asset", "_createdAt", "_updatedAt",
]);

function replaceInString(str) {
  let result = str;
  for (const [pattern, replacement] of REPLACEMENTS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function deepReplace(value, key = null) {
  if (SKIP_KEYS.has(key)) return value;
  if (typeof value === "string") return replaceInString(value);
  if (Array.isArray(value)) return value.map((item) => deepReplace(item));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = deepReplace(v, k);
    }
    return out;
  }
  return value;
}

async function main() {
  console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "LIVE"}`);
  console.log(`Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}`);

  // Fetch all healthcare pages (hubs + leaves)
  const pages = await client.fetch(
    `*[_type == "page" && slug.current match "data-assets/b2b-database/healthcare/**"]{
      _id, _rev, _type, _createdAt, _updatedAt,
      ...
    }`
  );

  console.log(`\nFound ${pages.length} healthcare pages\n`);

  let patchedCount = 0;
  let skippedCount = 0;

  for (const page of pages) {
    const updated = deepReplace(page);
    const originalStr = JSON.stringify(page);
    const updatedStr = JSON.stringify(updated);

    if (originalStr === updatedStr) {
      skippedCount++;
      continue;
    }

    console.log(`${DRY_RUN ? "[DRY RUN] " : ""}Patching: ${page.slug?.current}`);

    if (!DRY_RUN) {
      try {
        await client.createOrReplace({
          ...updated,
          _id: page._id,
          _type: page._type,
        });
      } catch (err) {
        console.error(`  ERROR patching ${page.slug?.current}: ${err.message}`);
        continue;
      }
    }

    patchedCount++;
  }

  console.log(`\n─────────────────────────────────────`);
  console.log(`Patched : ${patchedCount}`);
  console.log(`No change: ${skippedCount}`);
  console.log(`Total   : ${pages.length}`);
  if (DRY_RUN) console.log(`\nRe-run without --dry-run to apply.`);
}

main().catch(console.error);
