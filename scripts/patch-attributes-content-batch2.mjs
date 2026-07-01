/**
 * Replaces the `attributes` array for 10 healthcare pages with correct
 * specialty-specific content written in American English.
 *
 * Pages:
 *   1. Certified Nursing Assistants
 *   2. Chief Medical Officers
 *   3. Chief Nursing Officers
 *   4. Chief of Staff
 *   5. Occupational Therapists
 *   6. Speech & Language Therapists
 *   7. Massage Therapists
 *   8. EMTs & Paramedics
 *   9. Radiologic Technicians
 *  10. Dieticians & Nutritionists
 *
 * Usage:
 *   node scripts/patch-attributes-content-batch2.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/patch-attributes-content-batch2.mjs
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

let _n = 0;
function k() { return `hcb2p${++_n}`; }

function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
}

function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

// ─── Correct attributes ────────────────────────────────────────────────────────
const CORRECT_ATTRIBUTES = {

  // ── 1. CERTIFIED NURSING ASSISTANTS ──────────────────────────────────────────
  "data-assets/b2b-database/healthcare/nursing-professionals/certified-nursing-assistants": [
    feat(
      "Stethoscope",
      "Certified Nursing Assistants NPI Data",
      "CNA records verified against state nurse aide registries maintained under CMS OBRA requirements. Includes active certification status, training program completion records, and any registry disqualification flags to support compliant outreach planning.",
    ),
    feat(
      "Mail",
      "Certified Nursing Assistants Email",
      "Work and personal email addresses for CNAs employed at skilled nursing facilities, assisted living communities, and home health agencies. Validated through SMTP verification with monthly bounce testing to maintain consistent deliverability.",
    ),
    feat(
      "Phone",
      "Certified Nursing Assistants Direct Phone",
      "Facility front-desk and direct phone numbers associated with CNA employers, including skilled nursing facilities, rehabilitation centers, and home health agency lines. Includes landline versus mobile classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Certified Nursing Assistants Practice Location",
      "Employer facility addresses for CNAs at the building level, covering skilled nursing facilities, assisted living communities, memory care units, adult day programs, and home health agencies across all 50 states.",
    ),
    feat(
      "Heart",
      "Certified Nursing Assistants Specialty Tags",
      "Work-setting classifications for CNAs including skilled nursing, memory care and dementia units, subacute rehabilitation, home health, hospice, assisted living, and adult day health services for precise outreach segmentation.",
    ),
    feat(
      "Building2",
      "Certified Nursing Assistants Facility Data",
      "Employer facility information including nursing home chain affiliation, CMS Five-Star Quality Rating, ownership type — for-profit, nonprofit, or government — bed count, and health system membership for account-based targeting.",
    ),
    feat(
      "Activity",
      "Certified Nursing Assistants Credentials",
      "State nurse aide registry standing verified for all 50 states, including active CNA certification status, specialty training completions such as dementia care and restorative nursing, and continuing education compliance records.",
    ),
    feat(
      "Shield",
      "Certified Nursing Assistants Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and suppression list management. Phone data is scrubbed against the National Do Not Call Registry prior to delivery for compliant outreach to certified nursing assistant contacts.",
    ),
  ],

  // ── 2. CHIEF MEDICAL OFFICERS ────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-medical-officers": [
    feat(
      "Stethoscope",
      "Chief Medical Officers Executive Profiles",
      "Medical leadership records for hospital system CMOs, VPs of Medical Affairs, and Associate CMOs verified against AHA hospital directories, state medical board registries, and health system websites. Includes title, tenure indicators, and reporting structure.",
    ),
    feat(
      "Mail",
      "Chief Medical Officers Email",
      "Corporate email addresses for CMOs and physician executives at acute care hospitals, health systems, and IDNs. Validated through SMTP handshake and domain reputation analysis with regular re-verification for executive-level deliverability.",
    ),
    feat(
      "Phone",
      "Chief Medical Officers Direct Phone",
      "Executive office and personal direct lines for CMOs enabling direct access beyond hospital operator queues. Includes personal assistant routing data and preferred contact window indicators for relationship-based outreach.",
    ),
    feat(
      "MapPin",
      "Chief Medical Officers Hospital Affiliation",
      "Primary hospital and health system employer data for CMOs including facility name, health system parent organization, number of facilities under oversight, and geographic service territory for account-based targeting.",
    ),
    feat(
      "Heart",
      "Chief Medical Officers Clinical Specialty",
      "Underlying clinical specialty credentials for CMOs — internal medicine, surgery, cardiology, emergency medicine, and others — enabling clinical solution positioning and specialty-relevance segmentation for healthcare vendors.",
    ),
    feat(
      "Building2",
      "Chief Medical Officers Facility Data",
      "Hospital facility details including bed count, trauma designation, teaching status, Joint Commission accreditation, Magnet nursing recognition, and IDN network membership for enterprise-level account-based marketing strategies.",
    ),
    feat(
      "Activity",
      "Chief Medical Officers Credentials",
      "MD and DO medical licensure with ABMS board certification in clinical specialty, fellowship training records, and advanced management credentials including MBA and MPH designations for executive education and leadership program campaigns.",
    ),
    feat(
      "Shield",
      "Chief Medical Officers Compliance Flags",
      "HIPAA-conscious data handling with corporate email consent documentation. Records are verified against CAN-SPAM suppression lists and National DNC Registry for compliant outreach to healthcare physician executive audiences.",
    ),
  ],

  // ── 3. CHIEF NURSING OFFICERS ────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-nursing-officers": [
    feat(
      "Stethoscope",
      "Chief Nursing Officers Executive Profiles",
      "CNO and nurse executive records verified against AONL directories, state nursing boards, and health system websites. Covers VP Nursing, Associate CNO, and Chief Nurse Executive titles at hospitals, health systems, and IDNs with tenure and structure data.",
    ),
    feat(
      "Mail",
      "Chief Nursing Officers Email",
      "Corporate email addresses for CNOs and senior nursing executives at hospitals, health systems, and long-term care organizations. Validated through SMTP verification and bounce-monitored monthly for consistent executive-level deliverability.",
    ),
    feat(
      "Phone",
      "Chief Nursing Officers Direct Phone",
      "Executive direct lines and personal office numbers for CNOs and senior nursing leaders enabling direct outreach beyond hospital switchboards. Includes preferred contact window data and personal assistant routing indicators.",
    ),
    feat(
      "MapPin",
      "Chief Nursing Officers Hospital Affiliation",
      "Primary employer data for CNOs including hospital name, health system parent organization, facility size, geographic service area, and number of nursing staff under oversight for account-based and territory-aligned marketing.",
    ),
    feat(
      "Heart",
      "Chief Nursing Officers Nursing Focus",
      "Organizational focus areas and nursing specialty backgrounds for CNOs — Magnet program leadership, perioperative, critical care, community health, and quality improvement — for solution relevance targeting by nursing executives.",
    ),
    feat(
      "Building2",
      "Chief Nursing Officers Facility Data",
      "Hospital and health system data including bed count, Magnet recognition status, teaching hospital designation, CMS Star Rating, trauma level, and system-level IDN membership for enterprise-level account-based healthcare marketing.",
    ),
    feat(
      "Activity",
      "Chief Nursing Officers Credentials",
      "MSN, DNP, and advanced nursing practice credentials verified per CNO record. ANCC nurse executive board certifications — NE-BC and NEA-BC — along with state RN licensure standing and continuing education compliance status.",
    ),
    feat(
      "Shield",
      "Chief Nursing Officers Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email contacts. Records are scrubbed against CAN-SPAM requirements and the National DNC Registry before delivery for compliant chief nursing officer outreach campaigns.",
    ),
  ],

  // ── 4. CHIEF OF STAFF ────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/hospital-decision-makers/chief-of-staff": [
    feat(
      "Stethoscope",
      "Chief of Staff Executive Profiles",
      "Medical leadership records for hospital Chiefs of Staff, Medical Staff Presidents, and Physician Executive Officers verified against medical staff office directories, AHA hospital data, and state medical board registries.",
    ),
    feat(
      "Mail",
      "Chief of Staff Email",
      "Corporate and personal professional email addresses for hospital Chiefs of Staff and medical executive committee leaders. Validated through SMTP handshake protocols with monthly re-verification for sustained deliverability.",
    ),
    feat(
      "Phone",
      "Chief of Staff Direct Phone",
      "Executive office and direct lines for hospital Chiefs of Staff including medical staff office numbers and personal direct dials. Call-time optimization data and preferred contact window indicators included for targeted outreach.",
    ),
    feat(
      "MapPin",
      "Chief of Staff Hospital Affiliation",
      "Primary hospital employer and medical staff office affiliations for Chiefs of Staff, including facility name, health system membership, bed count, geographic service area, and medical staff size indicators.",
    ),
    feat(
      "Heart",
      "Chief of Staff Clinical Specialty",
      "Underlying clinical specialty for hospital Chiefs of Staff — surgery, internal medicine, cardiology, orthopedics, and others — enabling product and solution relevance targeting based on clinical practice background.",
    ),
    feat(
      "Building2",
      "Chief of Staff Facility Data",
      "Hospital facility details including trauma designation, teaching status, bed count, Joint Commission accreditation, and parent health system affiliation for enterprise-level account-based medical staff leadership strategies.",
    ),
    feat(
      "Activity",
      "Chief of Staff Credentials",
      "MD and DO medical licensure with ABMS board certification in clinical specialty and advanced credentials including MBA and MPH. Medical staff committee leadership titles and years in medical executive leadership roles where available.",
    ),
    feat(
      "Shield",
      "Chief of Staff Compliance Flags",
      "CAN-SPAM-compliant email consent documentation with HIPAA-aware data handling. Records are verified against the National DNC Registry for compliant telephone and email outreach to hospital medical staff leadership.",
    ),
  ],

  // ── 5. OCCUPATIONAL THERAPISTS ───────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/occupational-therapists": [
    feat(
      "Stethoscope",
      "Occupational Therapists License Data",
      "OT records validated against NBCOT certification databases and all 50 state occupational therapy licensure boards. Includes OTR/L and COTA designations, specialty certification status, and active versus inactive license classification per record.",
    ),
    feat(
      "Mail",
      "Occupational Therapists Email",
      "Professional email addresses for occupational therapists across hospital systems, outpatient rehabilitation clinics, school-based programs, and skilled nursing facilities. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Occupational Therapists Direct Phone",
      "Clinic and facility phone numbers for OT employer settings including rehabilitation departments, outpatient therapy clinics, and pediatric practice direct lines. Includes landline versus VoIP classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Occupational Therapists Work Location",
      "Work-site addresses for OTs at the facility level, covering acute care hospitals, outpatient rehabilitation centers, school districts, skilled nursing facilities, and home health agencies across all 50 states.",
    ),
    feat(
      "Heart",
      "Occupational Therapists Specialty Tags",
      "Practice area classifications for OTs including pediatric occupational therapy, hand therapy, neurological rehabilitation, mental health, low vision, driving and community mobility, and school-based services.",
    ),
    feat(
      "Building2",
      "Occupational Therapists Facility Data",
      "Employer and facility data for OTs including practice type — hospital, outpatient clinic, school system, SNF, or home health — and health system or corporate rehabilitation company affiliation for account-based targeting.",
    ),
    feat(
      "Activity",
      "Occupational Therapists Credentials",
      "NBCOT OTR and COTA certification status verified per record. Specialty certifications including Certified Hand Therapist (CHT), SCLV, CDRS, and state licensure standing across all 50 jurisdictions for credential-based audience filtering.",
    ),
    feat(
      "Shield",
      "Occupational Therapists Compliance Flags",
      "CAN-SPAM-compliant email records with documented opt-in provenance and suppression list management. Phone data scrubbed against the National Do Not Call Registry for compliant outreach to occupational therapy professionals.",
    ),
  ],

  // ── 6. SPEECH & LANGUAGE THERAPISTS ─────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/speech-language-therapists": [
    feat(
      "Stethoscope",
      "Speech & Language Therapists License Data",
      "State licensure verified for speech-language pathologists through all 50 state licensing boards and the ASHA Certificate of Clinical Competence (CCC-SLP) registry. Active and lapsed CCC-SLP designations are clearly flagged per record.",
    ),
    feat(
      "Mail",
      "Speech & Language Therapists Email",
      "Professional email addresses for SLPs across hospitals, outpatient clinics, school systems, early intervention programs, and private practice settings. Validated through SMTP verification with ongoing monthly bounce testing for consistent deliverability.",
    ),
    feat(
      "Phone",
      "Speech & Language Therapists Direct Phone",
      "Clinic, school department, and personal direct numbers for speech-language pathologists. Includes landline versus mobile classification and call-time optimization data for compliant and effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Speech & Language Therapists Work Location",
      "Work-site addresses for SLPs at the facility level, covering acute care hospitals, outpatient rehabilitation centers, school districts, early intervention programs, and private practices across all 50 states.",
    ),
    feat(
      "Heart",
      "Speech & Language Therapists Specialty Tags",
      "Practice specialty classifications for SLPs including pediatric speech and language, fluency disorders, voice and resonance, dysphagia and swallowing rehabilitation, augmentative and alternative communication (AAC), and adult neurological rehabilitation.",
    ),
    feat(
      "Building2",
      "Speech & Language Therapists Employer Data",
      "Facility and employer information for SLPs including hospital name, school district identifier, private practice type, health system affiliation, and early intervention program participation for account-level healthcare marketing.",
    ),
    feat(
      "Activity",
      "Speech & Language Therapists Education Level",
      "Degree classification for SLPs — MS, MA, and PhD — with ASHA-accredited university program identification where available. Clinical fellowship year completion status included for early-career targeting in CE and licensure product campaigns.",
    ),
    feat(
      "Shield",
      "Speech & Language Therapists Outreach Permissions",
      "TCPA-compliant phone data and CAN-SPAM email consent with state-specific marketing restriction indicators. Records scrubbed against the National DNC Registry prior to delivery for compliant speech-language pathologist outreach.",
    ),
  ],

  // ── 7. MASSAGE THERAPISTS ────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/massage-therapists": [
    feat(
      "Stethoscope",
      "Massage Therapists License Data",
      "State massage therapy licensure verified against all 50 state licensing boards and the NCBTMB certification registry. Includes active LMT and CMT status, training program completion records, and specialty certification flags per record.",
    ),
    feat(
      "Mail",
      "Massage Therapists Email",
      "Professional email addresses for licensed massage therapists across independent practices, day spas, chiropractic offices, and hospital integrative health programs. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Massage Therapists Direct Phone",
      "Practice and personal phone numbers for massage therapists including studio direct lines, spa front desks, and practitioner mobile numbers. Includes TCPA consent documentation and landline versus wireless classification.",
    ),
    feat(
      "MapPin",
      "Massage Therapists Practice Location",
      "Business and work-site addresses for massage therapists at the suite level, covering independent studios, day spas, hotel spas, wellness centers, chiropractic clinics, and hospital integrative medicine departments across all 50 states.",
    ),
    feat(
      "Heart",
      "Massage Therapists Specialty Tags",
      "Technique and specialty classifications for LMTs including Swedish, deep tissue, sports massage, prenatal massage, oncology massage, lymphatic drainage, myofascial release, and medical massage designations for niche audience targeting.",
    ),
    feat(
      "Building2",
      "Massage Therapists Practice Data",
      "Practice setting and ownership indicators for massage therapists — sole proprietor, spa employee, chiropractic affiliate, resort property, integrative health center, or medically integrated practice — with employer affiliation data.",
    ),
    feat(
      "Activity",
      "Massage Therapists Credentials",
      "NCBTMB certification status with state LMT licensure verification for all 50 jurisdictions. Specialty certifications from AMTA-recognized programs including prenatal massage, oncology massage, and sports massage flagged per record.",
    ),
    feat(
      "Shield",
      "Massage Therapists Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and suppression list management. Phone data scrubbed against the National Do Not Call Registry for compliant outreach to licensed massage therapy professionals.",
    ),
  ],

  // ── 8. EMTs & PARAMEDICS ─────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/emts-paramedics": [
    feat(
      "Stethoscope",
      "EMTs & Paramedics License Data",
      "EMS provider records validated against state EMS offices, NREMT certification databases, and local EMS agency rosters. Includes EMT, AEMT, and Paramedic certification levels with active status confirmation and geographic jurisdiction data per record.",
    ),
    feat(
      "Mail",
      "EMTs & Paramedics Email",
      "Work and personal email addresses for EMTs and paramedics employed at public EMS agencies, fire-based EMS departments, hospital-based transport services, and private ambulance companies. SMTP-validated and bounce-tested monthly.",
    ),
    feat(
      "Phone",
      "EMTs & Paramedics Direct Phone",
      "Agency station lines and personal contacts for EMS professionals including dispatcher office numbers and personal mobile contacts. Includes line-type classification and call-time guidance for non-emergency outreach to EMS providers.",
    ),
    feat(
      "MapPin",
      "EMTs & Paramedics Service Location",
      "Station and agency addresses for EMS services at the facility level, including fire-EMS combination departments, hospital-based transport units, air medical bases, and private ambulance service headquarters across all 50 states.",
    ),
    feat(
      "Heart",
      "EMTs & Paramedics Certification Level",
      "EMS certification tier classifications — EMT-Basic, Advanced EMT (AEMT), and Paramedic — with specialty endorsements including critical care transport (CCP-C), flight paramedicine (FP-C), and tactical EMS designations.",
    ),
    feat(
      "Building2",
      "EMTs & Paramedics Agency Data",
      "Agency type and operational data for EMS employers including public 911 service, fire department EMS division, hospital-based transport program, air medical service, and private ambulance company with service area coverage indicators.",
    ),
    feat(
      "Activity",
      "EMTs & Paramedics Credentials",
      "NREMT certification verification with state EMS license standing and continuing education compliance data. Flight paramedic (FP-C), critical care paramedic (CCP-C), and specialty course completions flagged where available per record.",
    ),
    feat(
      "Shield",
      "EMTs & Paramedics Compliance Flags",
      "CAN-SPAM and TCPA compliance documentation with channel-level consent tracking for email and phone outreach to EMS professionals. National DNC Registry scrubbing applied prior to all phone list delivery.",
    ),
  ],

  // ── 9. RADIOLOGIC TECHNICIANS ────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/radiologic-technicians": [
    feat(
      "Stethoscope",
      "Radiologic Technicians License Data",
      "State radiologic technology licensure verified against ARRT certification records and state radiation control program registries. Includes RT(R), RT(CT), RT(MR), RT(N), and other ARRT credential designations with active and inactive status flagged per record.",
    ),
    feat(
      "Mail",
      "Radiologic Technicians Email",
      "Professional email addresses for radiologic technologists across hospital radiology departments, outpatient imaging centers, and mobile imaging services. SMTP-validated and bounce-tested monthly for reliable campaign deliverability.",
    ),
    feat(
      "Phone",
      "Radiologic Technicians Direct Phone",
      "Hospital radiology department lines and imaging center direct numbers for radiologic technologists. Includes landline versus mobile classification and call-time optimization data for non-emergency outreach scheduling.",
    ),
    feat(
      "MapPin",
      "Radiologic Technicians Work Location",
      "Work-site addresses for radiologic technologists at the facility level, covering hospital radiology departments, freestanding imaging centers, urgent care imaging suites, and mobile X-ray service locations across all 50 states.",
    ),
    feat(
      "Heart",
      "Radiologic Technicians Modality Tags",
      "Imaging modality certifications and practice classifications for RTs including radiography, CT, MRI, mammography, nuclear medicine, sonography, fluoroscopy, bone densitometry, and interventional radiology for specialty-level targeting.",
    ),
    feat(
      "Building2",
      "Radiologic Technicians Facility Data",
      "Radiology department and imaging center employer data including hospital name, ACR accreditation status, ownership type — hospital-based, corporate chain, or independent — and multi-facility group affiliation for account-based marketing.",
    ),
    feat(
      "Activity",
      "Radiologic Technicians Credentials",
      "ARRT primary and post-primary certification status verified per record. State licensure standing, continuing qualification (CQ) compliance, and specialty certifications from ARDMS and SNMMI included where applicable.",
    ),
    feat(
      "Shield",
      "Radiologic Technicians Compliance Flags",
      "CAN-SPAM-compliant email consent documentation with opt-in provenance tracking. Phone records scrubbed against the National Do Not Call Registry for compliant outreach to radiologic technology and medical imaging professionals.",
    ),
  ],

  // ── 10. DIETICIANS & NUTRITIONISTS ───────────────────────────────────────────
  "data-assets/b2b-database/healthcare/health-therapy/dieticians-nutritionists": [
    feat(
      "Stethoscope",
      "Dieticians & Nutritionists License Data",
      "Registered Dietitian Nutritionist (RDN) and Dietetic Technician Registered (DTR) credentials verified against CDR registration databases and state dietitian licensure boards. Includes active and inactive registration status per record.",
    ),
    feat(
      "Mail",
      "Dieticians & Nutritionists Email",
      "Professional email addresses for RDNs and nutritionists across clinical settings, outpatient practices, community nutrition programs, and food service management roles. Validated through SMTP handshake with monthly re-verification for sustained deliverability.",
    ),
    feat(
      "Phone",
      "Dieticians & Nutritionists Direct Phone",
      "Clinic, hospital department, and direct phone numbers for registered dietitian nutritionists. Includes landline versus mobile classification and call-time optimization data for effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Dieticians & Nutritionists Practice Location",
      "Work-site addresses for RDNs at the facility level, covering acute care hospitals, outpatient nutrition clinics, long-term care facilities, community health centers, private practices, and food service management settings across all 50 states.",
    ),
    feat(
      "Heart",
      "Dieticians & Nutritionists Specialty Tags",
      "CDR-recognized practice areas for dietitians including oncology nutrition, renal nutrition, pediatric nutrition, diabetes care and education, sports dietetics, eating disorder treatment, and bariatric nutrition for specialty-level audience segmentation.",
    ),
    feat(
      "Building2",
      "Dieticians & Nutritionists Practice Data",
      "Practice setting and employer indicators for RDNs — hospital clinical nutrition, outpatient counseling, food service management, WIC community program, research, and private practice — with health system or corporate employer affiliation.",
    ),
    feat(
      "Activity",
      "Dieticians & Nutritionists Credentials",
      "CDR registration verification with specialty certifications including CSSD, CSO, CSRD, CSP, and CSOWM. State licensure standing flagged where state dietitian boards exist, along with continuing professional education compliance status.",
    ),
    feat(
      "Shield",
      "Dieticians & Nutritionists Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and active suppression list management. Phone data scrubbed against the National Do Not Call Registry for compliant outreach to registered dietitian and nutrition professional audiences.",
    ),
  ],
};

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nPatching attributes for 10 healthcare pages`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const slugs = Object.keys(CORRECT_ATTRIBUTES);

  for (const slug of slugs) {
    console.log(`\n── ${slug.split("/").pop()}`);

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
    console.log(`  Current (${current.length}): ${current.map(a => `"${a.title}"`).join(", ")}`);

    const newAttrs = CORRECT_ATTRIBUTES[slug];
    console.log(`  New     (${newAttrs.length}): ${newAttrs.map(a => `[${a.icon}] "${a.title}"`).join(", ")}`);

    if (DRY_RUN) {
      console.log(`  [dry-run — no changes made]`);
      continue;
    }

    await client.patch(page._id).set({ attributes: newAttrs }).commit();
    console.log(`  ✓ published patched`);

    try {
      const draft = await client.getDocument(`drafts.${page._id}`);
      if (draft) {
        await client.patch(`drafts.${page._id}`).set({ attributes: newAttrs }).commit();
        console.log(`  ✓ draft patched`);
      }
    } catch (_) {}
  }

  console.log(`\nDone!\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
