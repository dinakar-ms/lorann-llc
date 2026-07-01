/**
 * Replaces the `attributes` array for 5 healthcare pages with correct
 * specialty-specific content written in American English.
 *
 * Targets the `attributes` field (featureItem array), NOT `healthcareFeaturesSection.cards`.
 *
 * Pages fixed:
 *   1. dental-vision/dentists
 *   2. physicians-advanced-practice/nurse-practitioners
 *   3. physicians-advanced-practice/medical-assistants
 *   4. nursing-professionals/registered-nurses
 *   5. nursing-professionals/licensed-practical-nurses
 *
 * Usage:
 *   node scripts/patch-attributes-content.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/patch-attributes-content.mjs
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
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET   || "development";
const token     = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) throw new Error("Missing SANITY_API_WRITE_TOKEN in .env.local");

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

// ─── Key generator ─────────────────────────────────────────────────────────────
let _n = 0;
function k() { return `hcpatch${++_n}`; }

// ─── Portable Text block builder ───────────────────────────────────────────────
function block(t) {
  return [
    {
      _key: k(),
      _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text: t }],
      markDefs: [],
      style: "normal",
    },
  ];
}

// ─── featureItem builder ───────────────────────────────────────────────────────
function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

// ─── Correct attributes for each page ─────────────────────────────────────────
const CORRECT_ATTRIBUTES = {

  // ── DENTISTS (8 cards — correct dental content) ─────────────────────────────
  "data-assets/b2b-database/healthcare/dental-vision/dentists": [
    feat(
      "Stethoscope",
      "Dentists NPI Data",
      "Matched against ADA membership rolls and state dental board records to verify each dentist's license status, specialty certifications, and active practice permits. NPI taxonomy codes identify general dentistry versus recognized specialties for granular targeting.",
    ),
    feat(
      "Mail",
      "Dentists Email",
      "Office and personal professional email addresses for general dentists and dental specialists, validated through SMTP handshake and domain reputation checks. Addresses are re-verified monthly to maintain deliverability rates above 95% for every outreach campaign.",
    ),
    feat(
      "Phone",
      "Dentists Direct Phone",
      "Front-desk and practitioner direct lines for dental offices, verified against current practice records. Includes call-time optimization data and landline versus VoIP classification for effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Dentists Practice Location",
      "Dental office addresses mapped at the suite level including standalone practices, dental service organization locations, community health center dental departments, and dental school clinics across all 50 states.",
    ),
    feat(
      "Heart",
      "Dentists Specialty Tags",
      "ADA-recognized specialty classifications including orthodontics, endodontics, periodontics, prosthodontics, oral and maxillofacial surgery, and pediatric dentistry. Specialty tags are validated and non-overlapping for precise audience segmentation.",
    ),
    feat(
      "Building2",
      "Dentists Facility Data",
      "Practice type classification covering private practice, DSO-affiliated locations, academic dental centers, VA and military dental clinics, and federally qualified health center dental departments for account-based targeting.",
    ),
    feat(
      "Activity",
      "Dentists Credentials",
      "Board certification from ADA-recognized specialty boards, active state dental license verification, and DEA registration status for practices authorized for sedation and controlled substance prescribing.",
    ),
    feat(
      "Shield",
      "Dentists Compliance Flags",
      "CAN-SPAM and state-specific marketing consent documentation with suppression list management and opt-in provenance tracking for compliant outreach to dental professionals across all practice settings.",
    ),
  ],

  // ── NURSE PRACTITIONERS (8 cards) ───────────────────────────────────────────
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/nurse-practitioners": [
    feat(
      "Stethoscope",
      "Nurse Practitioners NPI Data",
      "NPI records for nurse practitioners cross-referenced against the NPPES database and all 50 state advanced practice nursing boards. Includes prescribing authority status, specialty classification, and active licensure verification for every record in the dataset.",
    ),
    feat(
      "Mail",
      "Nurse Practitioners Email",
      "Professional email addresses for NPs across hospital systems, outpatient clinics, and independent practice settings. All addresses are validated through SMTP verification and bounce-tested monthly to maintain sustained deliverability for ongoing outreach.",
    ),
    feat(
      "Phone",
      "Nurse Practitioners Direct Phone",
      "Direct office and practitioner phone numbers for NP practices, including individual direct lines and clinic front-desk contacts. Classified by line type with call-time optimization data and mobile versus landline identification included.",
    ),
    feat(
      "MapPin",
      "Nurse Practitioners Practice Location",
      "Geocoded practice addresses for nurse practitioners covering primary care offices, urgent care centers, hospital outpatient departments, and retail health clinics. Mapped to ZIP+4 precision for accurate regional and territory-based targeting.",
    ),
    feat(
      "Heart",
      "Nurse Practitioners Specialty Tags",
      "Specialty classifications for NPs including family practice, adult-gerontology, pediatric, psychiatric-mental health, women's health, and acute care. Each specialty tag is validated and non-overlapping to enable precise audience segmentation by NP population.",
    ),
    feat(
      "Building2",
      "Nurse Practitioners Facility Data",
      "Health system and practice setting affiliations for NPs, including hospital name, IDN membership, independent practice group, and academic medical center designations. Supports account-based healthcare marketing at the health system level.",
    ),
    feat(
      "Activity",
      "Nurse Practitioners Credentials",
      "ANCC and AANP board certification status verified per NP record, along with state-level APRN licensure standing. Renewal and expiration dates are included where available for continuing education and certification product marketing.",
    ),
    feat(
      "Shield",
      "Nurse Practitioners Compliance Flags",
      "HIPAA-compliant data handling with documented opt-in provenance for all email contacts. Records are scrubbed against CAN-SPAM suppression lists and the National DNC Registry before delivery for fully compliant nurse practitioner outreach.",
    ),
  ],

  // ── MEDICAL ASSISTANTS (8 cards) ────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/medical-assistants": [
    feat(
      "Stethoscope",
      "Medical Assistants NPI Data",
      "Medical assistant records validated against NPI registration data, state medical board directories, and professional certification bodies including AAMA and AMT. Includes credential type, employer affiliation, and practice setting classification per record.",
    ),
    feat(
      "Mail",
      "Medical Assistants Email",
      "Professional and work email addresses for certified and registered medical assistants across outpatient clinics, physician offices, and specialty practices. All addresses are SMTP-validated and bounce-tested to ensure reliable deliverability for every campaign.",
    ),
    feat(
      "Phone",
      "Medical Assistants Direct Phone",
      "Clinic and office phone numbers associated with medical assistant work settings, including front-desk lines for solo and group practices. Includes landline versus VoIP classification and call-time optimization data for campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Medical Assistants Practice Location",
      "Work-site addresses for medical assistants mapped at the suite level, covering private physician offices, outpatient clinics, urgent care centers, and federally qualified health centers across all 50 states.",
    ),
    feat(
      "Heart",
      "Medical Assistants Specialty Tags",
      "Practice-setting specialty designations for MAs including family medicine, internal medicine, dermatology, orthopedics, cardiology, pediatrics, and more than 20 additional specialty clinic types for precise outreach targeting.",
    ),
    feat(
      "Building2",
      "Medical Assistants Facility Data",
      "Employer and facility data for medical assistants including practice type — private practice, DSO-affiliated, academic, or VA and military — along with organization size and health system affiliation indicators.",
    ),
    feat(
      "Activity",
      "Medical Assistants Credentials",
      "Credential types verified and flagged including Certified Medical Assistant (CMA-AAMA), Registered Medical Assistant (RMA-AMT), and state-specific certification designations. EHR platform proficiency flags are included where available for technology-focused campaigns.",
    ),
    feat(
      "Shield",
      "Medical Assistants Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and active suppression list management. Phone data is scrubbed against the National Do Not Call Registry prior to delivery for compliant outreach to medical assistant contacts.",
    ),
  ],

  // ── REGISTERED NURSES (8 cards) ─────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/nursing-professionals/registered-nurses": [
    feat(
      "Stethoscope",
      "Registered Nurses NPI Data",
      "RN records cross-referenced against NPPES and all 50 state nursing board license databases. Each record includes active licensure status, multi-state compact coverage flags, and primary practice specialty designation.",
    ),
    feat(
      "Mail",
      "Registered Nurses Email",
      "Professional email addresses for registered nurses validated through SMTP handshake protocols and domain reputation checks. Covers hospital-employed, outpatient, and independent practice RNs with ongoing monthly re-verification for consistent deliverability.",
    ),
    feat(
      "Phone",
      "Registered Nurses Direct Phone",
      "Direct-dial phone numbers for RN contacts including hospital department lines and clinic direct extensions. Classified by line type with call-time optimization and after-hours availability data for targeted campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Registered Nurses Practice Location",
      "Geocoded work-site addresses for RNs covering acute care hospitals, outpatient clinics, long-term care facilities, home health agencies, and ambulatory surgery centers. Mapped to ZIP+4 for precise regional and territory-based targeting.",
    ),
    feat(
      "Heart",
      "Registered Nurses Specialty Tags",
      "Clinical specialty and unit designations for RNs including ICU, ER, OR, oncology, labor and delivery, NICU, pediatrics, and more than 30 additional unit types. Subspecialty flags allow precise audience segmentation by specific care area.",
    ),
    feat(
      "Building2",
      "Registered Nurses Facility Data",
      "Hospital system and employer affiliations for RNs including health system name, facility size, teaching status, Magnet designation, and IDN membership. Supports account-based targeting at the health system and facility level.",
    ),
    feat(
      "Activity",
      "Registered Nurses Credentials",
      "NCLEX-RN licensure status verified against state nursing board records. BSN, ADN, and advanced degree flags are included. Travel nurse designations and multi-state compact license holders are clearly identified per record.",
    ),
    feat(
      "Shield",
      "Registered Nurses Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email contacts. Records are scrubbed against CAN-SPAM requirements and the National DNC Registry before delivery for compliant registered nurse outreach campaigns.",
    ),
  ],

  // ── LICENSED PRACTICAL NURSES (8 cards) ─────────────────────────────────────
  "data-assets/b2b-database/healthcare/nursing-professionals/licensed-practical-nurses": [
    feat(
      "Stethoscope",
      "Licensed Practical Nurses Provider Profiles",
      "Comprehensive LPN records verified against state nursing board license registries and NPI databases. Includes active licensure status, work-setting classification, and state-level scope-of-practice indicators for all 50 states.",
    ),
    feat(
      "Mail",
      "Licensed Practical Nurses Verified Email",
      "Professional email addresses for licensed practical nurses across long-term care, home health, physician offices, and correctional facilities. All addresses are validated through SMTP verification with monthly bounce testing for sustained deliverability.",
    ),
    feat(
      "Phone",
      "Licensed Practical Nurses Contact Numbers",
      "Direct office and facility phone numbers for LPN work settings including nursing home front desks, clinic lines, and home health agency contacts. Includes landline versus mobile classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Licensed Practical Nurses Facility Addresses",
      "Work-site mailing addresses for LPNs mapped at the facility level, covering skilled nursing facilities, assisted living communities, home health agencies, and physician offices across all 50 states.",
    ),
    feat(
      "Heart",
      "Licensed Practical Nurses Role Classification",
      "Role and setting classifications for LPNs including long-term care, home health, correctional facility, physician office, and hospital settings. For-profit, nonprofit, and government facility designations are flagged per record.",
    ),
    feat(
      "Building2",
      "Licensed Practical Nurses Organization Data",
      "Employer and organization data for LPNs including facility name, ownership type, chain affiliation, bed count for skilled nursing facilities, and health system membership. Supports account-level targeting across all LPN employer types.",
    ),
    feat(
      "Activity",
      "Licensed Practical Nurses Credential Depth",
      "NCLEX-PN licensure verification against all 50 state nursing board registries. Specialty certifications including wound care, IV therapy, and gerontology are flagged. Renewal-pending and multi-state compact license holders are clearly identified per record.",
    ),
    feat(
      "Shield",
      "Licensed Practical Nurses Permission Tracking",
      "HIPAA-aware data handling with channel-level consent tracking for email, phone, and direct mail outreach. CAN-SPAM and National DNC compliance documentation is provided with every LPN contact list delivery.",
    ),
  ],
};

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nPatching attributes for 5 healthcare pages`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const slugs = Object.keys(CORRECT_ATTRIBUTES);

  for (const slug of slugs) {
    console.log(`\n── ${slug}`);

    const page = await client.fetch(
      `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]
       { _id, "slug": slug.current, "attrs": attributes[]{ _key, title } }`,
      { slug },
    );

    if (!page) {
      console.log(`  NOT FOUND — skipping`);
      continue;
    }

    const current = page.attrs || [];
    console.log(`  Current attributes (${current.length} items):`);
    for (const a of current) console.log(`    • "${a.title}"`);

    const newAttrs = CORRECT_ATTRIBUTES[slug];
    console.log(`  New attributes (${newAttrs.length} items):`);
    for (const a of newAttrs) console.log(`    • [${a.icon}] "${a.title}"`);

    if (DRY_RUN) {
      console.log(`  [dry-run — no changes made]`);
      continue;
    }

    // Patch published document
    await client.patch(page._id).set({ attributes: newAttrs }).commit();
    console.log(`  ✓ published patched`);

    // Patch draft if it exists
    try {
      const draft = await client.getDocument(`drafts.${page._id}`);
      if (draft) {
        await client.patch(`drafts.${page._id}`).set({ attributes: newAttrs }).commit();
        console.log(`  ✓ draft patched`);
      }
    } catch (_) {
      // No draft — that's fine
    }
  }

  console.log(`\nDone!\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
