/**
 * Patches the healthcareFeaturesSection card descriptions for 5 healthcare pages
 * where the descriptions contained content from the wrong specialty.
 *
 * Pages fixed:
 *   1. dental-vision/dentists
 *   2. physicians-advanced-practice/nurse-practitioners
 *   3. physicians-advanced-practice/medical-assistants
 *   4. nursing-professionals/registered-nurses
 *   5. nursing-professionals/licensed-practical-nurses
 *
 * Usage:
 *   node scripts/patch-segmentation-content.mjs                                        (development)
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/patch-segmentation-content.mjs
 *   node scripts/patch-segmentation-content.mjs --dry-run
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

// ─── Correct card content for each page ───────────────────────────────────────
// Descriptions are accurate, specialty-specific, and written in American English.
// Keys match the card titles stored in Sanity for each page.

const CORRECT_DESCRIPTIONS = {

  // ── DENTISTS ────────────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/dental-vision/dentists": [
    {
      title: "Dentists Facility Data",
      desc: "Dental practice profiles verified through ADA membership directories, state dental board licensing records, and NPI registration data. Includes practice name, address, ownership type, and facility classification at the suite level.",
    },
    {
      title: "Dentists Email",
      desc: "Professional email addresses for general dentists and dental specialists validated through SMTP handshake protocols and domain reputation analysis. Addresses are re-verified monthly to maintain deliverability rates above 95%.",
    },
    {
      title: "Dentists Direct Phone",
      desc: "Front-desk and direct practitioner phone lines for dental offices, verified against current practice records. Includes call-time optimization data and landline versus mobile classification for effective outbound campaigns.",
    },
    {
      title: "Dentists Lab Location",
      desc: "Dental office and affiliated dental laboratory addresses mapped at the suite level. Covers solo practices, DSO-affiliated locations, dental schools, and community health center dental departments across all 50 states.",
    },
  ],

  // ── NURSE PRACTITIONERS ─────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/nurse-practitioners": [
    {
      title: "Nurse Practitioners NPI Data",
      desc: "NPI records for nurse practitioners cross-referenced against the NPPES database and state advanced practice nursing boards. Includes prescribing authority status, specialty classification, and active licensure verification per record.",
    },
    {
      title: "Nurse Practitioners Email",
      desc: "Professional email addresses for NPs across hospital systems, outpatient clinics, and independent practice settings. All addresses are validated through SMTP verification and bounce-tested monthly for sustained deliverability.",
    },
    {
      title: "Nurse Practitioners Direct Phone",
      desc: "Direct office and practitioner phone numbers for NP practices, including individual direct lines and clinic front-desk contacts. Classified by line type with call-time optimization data included.",
    },
    {
      title: "Nurse Practitioners Practice Location",
      desc: "Geocoded practice addresses for nurse practitioners covering primary care offices, urgent care centers, hospital outpatient departments, and retail health clinics. Mapped to ZIP+4 precision for regional targeting.",
    },
    {
      title: "Nurse Practitioners Specialty Tags",
      desc: "Specialty classifications for NPs including family practice, adult-gerontology, pediatric, psychiatric-mental health, women's health, and acute care. Each specialty tag is validated and non-overlapping for precise audience segmentation.",
    },
    {
      title: "Nurse Practitioners Facility Data",
      desc: "Health system and practice setting affiliations for NPs, including hospital name, IDN membership, independent practice group, and academic medical center designations. Useful for account-based healthcare marketing.",
    },
    {
      title: "Nurse Practitioners Credentials",
      desc: "ANCC and AANP board certification status verified per NP record, along with state-level APRN licensure status. Renewal and expiration dates are included where available for CE and certification marketing.",
    },
    {
      title: "Nurse Practitioners Compliance Flags",
      desc: "HIPAA-compliant data handling with documented opt-in provenance for all email contacts. Records are scrubbed against CAN-SPAM suppression lists and the National DNC Registry before delivery for compliant NP outreach.",
    },
  ],

  // ── MEDICAL ASSISTANTS ──────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/physicians-advanced-practice/medical-assistants": [
    {
      title: "Medical Assistants NPI Data",
      desc: "Medical assistant records validated against NPI registration data, state medical board directories, and professional certification bodies including AAMA and AMT. Includes credential type, employer affiliation, and practice setting per record.",
    },
    {
      title: "Medical Assistants Email",
      desc: "Professional and work email addresses for certified and registered medical assistants across outpatient clinics, physician offices, and specialty practices. Email addresses are SMTP-validated and bounce-tested for reliable deliverability.",
    },
    {
      title: "Medical Assistants Direct Phone",
      desc: "Clinic and office phone numbers associated with medical assistant work settings, including front-desk lines for solo and group practices. Includes landline versus VoIP classification and call-time optimization data.",
    },
    {
      title: "Medical Assistants Practice Location",
      desc: "Work-site addresses for medical assistants mapped at the suite level, covering private physician offices, outpatient clinics, urgent care centers, and federally qualified health centers nationwide.",
    },
    {
      title: "Medical Assistants Specialty Tags",
      desc: "Practice-setting specialty designations for MAs, including family medicine, internal medicine, dermatology, orthopedics, cardiology, pediatrics, and 20+ additional specialty clinic types for precise outreach targeting.",
    },
    {
      title: "Medical Assistants Facility Data",
      desc: "Employer and facility data for medical assistants, including practice type (private practice, DSO-affiliated, academic, or VA/military), organization size, and health system affiliation indicators.",
    },
    {
      title: "Medical Assistants Credentials",
      desc: "Credential types verified and flagged, including Certified Medical Assistant (CMA-AAMA), Registered Medical Assistant (RMA-AMT), and state-specific certification designations. EHR platform proficiency flags are included where available.",
    },
    {
      title: "Medical Assistants Compliance Flags",
      desc: "CAN-SPAM-compliant email records with opt-in documentation and suppression list management. Phone data is scrubbed against the National Do Not Call Registry prior to delivery for compliant outreach to medical assistant contacts.",
    },
  ],

  // ── REGISTERED NURSES ───────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/nursing-professionals/registered-nurses": [
    {
      title: "Registered Nurses NPI Data",
      desc: "RN records cross-referenced against NPPES and all 50 state nursing board license databases. Each record includes active licensure status, multi-state compact coverage flags, and primary practice specialty designation.",
    },
    {
      title: "Registered Nurses Email",
      desc: "Professional email addresses for registered nurses validated through SMTP handshake protocols and domain reputation checks. Covers hospital-employed, outpatient, and independent practice RNs with ongoing monthly re-verification.",
    },
    {
      title: "Registered Nurses Direct Phone",
      desc: "Direct-dial phone numbers for RN contacts, including hospital department lines and clinic direct extensions. Classified by line type with call-time optimization and after-hours availability data included.",
    },
    {
      title: "Registered Nurses Practice Location",
      desc: "Geocoded work-site addresses for RNs, covering acute care hospitals, outpatient clinics, long-term care facilities, home health agencies, and ambulatory surgery centers. Mapped to ZIP+4 for precise regional targeting.",
    },
    {
      title: "Registered Nurses Specialty Tags",
      desc: "Clinical specialty and unit designations for RNs, including ICU, ER, OR, oncology, labor and delivery, NICU, pediatrics, and 30+ additional unit types. Subspecialty flags allow precise audience segmentation by care area.",
    },
    {
      title: "Registered Nurses Facility Data",
      desc: "Hospital system and employer affiliations for RNs, including health system name, facility size, teaching status, Magnet designation, and IDN membership. Supports account-based targeting at the health system level.",
    },
    {
      title: "Registered Nurses Credentials",
      desc: "NCLEX-RN licensure status verified against state nursing board records. BSN, ADN, and advanced degree flags included. Travel nurse designations and multi-state compact license holders are clearly identified per record.",
    },
    {
      title: "Registered Nurses Compliance Flags",
      desc: "HIPAA-conscious data handling with opt-in documentation for all email contacts. Records are scrubbed against CAN-SPAM requirements and the National DNC Registry before delivery for compliant RN outreach campaigns.",
    },
  ],

  // ── LICENSED PRACTICAL NURSES ───────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/nursing-professionals/licensed-practical-nurses": [
    {
      title: "Licensed Practical Nurses Provider Profiles",
      desc: "Comprehensive LPN records verified against state nursing board license registries and NPI databases. Includes active licensure status, work-setting classification, and state-level scope-of-practice indicators for all 50 states.",
    },
    {
      title: "Licensed Practical Nurses Verified Email",
      desc: "Professional email addresses for licensed practical nurses across long-term care, home health, physician offices, and correctional facilities. All addresses are validated through SMTP verification with monthly bounce testing.",
    },
    {
      title: "Licensed Practical Nurses Contact Numbers",
      desc: "Direct office and facility phone numbers for LPN work settings, including nursing home front desks, clinic lines, and home health agency contacts. Includes landline versus mobile classification and call-time optimization data.",
    },
    {
      title: "Licensed Practical Nurses Facility Addresses",
      desc: "Work-site mailing addresses for LPNs mapped at the facility level, covering skilled nursing facilities, assisted living communities, home health agencies, and physician offices across all 50 states.",
    },
    {
      title: "Licensed Practical Nurses Role Classification",
      desc: "Role and setting classifications for LPNs, including long-term care, home health, correctional facility, physician office, and hospital settings. For-profit, nonprofit, and government facility designations are flagged per record.",
    },
    {
      title: "Licensed Practical Nurses Organization Data",
      desc: "Employer and organization data for LPNs, including facility name, ownership type, chain affiliation, bed count for SNFs, and health system membership. Supports account-level targeting across LPN employer types.",
    },
    {
      title: "Licensed Practical Nurses Credential Depth",
      desc: "NCLEX-PN licensure verification against all 50 state nursing board registries. Specialty certifications including wound care, IV therapy, and gerontology are flagged. Renewal-pending and compact license holders are identified.",
    },
    {
      title: "Licensed Practical Nurses Permission Tracking",
      desc: "HIPAA-aware data handling with channel-level consent tracking for email, phone, and direct mail outreach. CAN-SPAM and National DNC compliance documentation is provided with every LPN contact list delivery.",
    },
  ],
};

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nPatching segmentation card descriptions for 5 healthcare pages`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const slugs = Object.keys(CORRECT_DESCRIPTIONS);

  for (const slug of slugs) {
    const page = await client.fetch(
      `*[_type == "page" && slug.current == $slug && !(_id match "drafts.*")][0]
       { _id, "slug": slug.current, "cards": healthcareFeaturesSection.cards }`,
      { slug }
    );

    if (!page) {
      console.log(`  NOT FOUND: ${slug}\n`);
      continue;
    }

    const correctCards = CORRECT_DESCRIPTIONS[slug];

    if (!page.cards || page.cards.length === 0) {
      console.log(`  SKIP ${slug} — no cards in Sanity (component fallback is used)\n`);
      continue;
    }

    console.log(`  ${slug}`);
    console.log(`    Current cards: ${page.cards.length}  |  Patch cards: ${correctCards.length}`);

    // Build updated cards: match by title, update desc; keep all other fields.
    const updatedCards = page.cards.map((card) => {
      const match = correctCards.find((c) => c.title === card.title);
      if (match) {
        console.log(`    ✏  "${card.title}"`);
        return { ...card, desc: match.desc };
      }
      console.log(`    ✗  "${card.title}" — no matching correction found, keeping original`);
      return card;
    });

    if (!DRY_RUN) {
      await client.patch(page._id).set({ "healthcareFeaturesSection.cards": updatedCards }).commit();

      // Also patch the draft if it exists
      try {
        const draft = await client.getDocument(`drafts.${page._id}`);
        if (draft) {
          await client
            .patch(`drafts.${page._id}`)
            .set({ "healthcareFeaturesSection.cards": updatedCards })
            .commit();
          console.log(`    ✓ draft patched`);
        }
      } catch {}

      console.log(`    ✓ published patched\n`);
    } else {
      console.log(`    [dry-run — no changes made]\n`);
    }
  }

  console.log(`Done!\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
