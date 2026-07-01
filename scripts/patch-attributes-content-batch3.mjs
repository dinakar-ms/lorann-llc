/**
 * Replaces the `attributes` array for 13 healthcare pages with correct
 * specialty-specific content in American English.
 * (Dentists/dental-vision/dentists already fixed in batch-1 — skipped here.)
 *
 * Pages:
 *   1.  Psychologists
 *   2.  Psychiatrists
 *   3.  Mental Health Counselors
 *   4.  Social Workers & Case Managers
 *   5.  Marriage & Family Therapists
 *   6.  Dental Hygienists
 *   7.  Optometrists
 *   8.  Opticians
 *   9.  Pharmacists
 *  10.  Physician Practice Managers
 *  11.  Chiropractors (specialty-other)
 *  12.  Veterinarians (specialty-other)
 *  13.  Allied Healthcare Professionals
 *
 * Usage:
 *   node scripts/patch-attributes-content-batch3.mjs --dry-run
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/patch-attributes-content-batch3.mjs
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
function k() { return `hcb3p${++_n}`; }
function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
}
function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

// ─── Correct attributes ────────────────────────────────────────────────────────
const CORRECT_ATTRIBUTES = {

  // ── 1. PSYCHOLOGISTS ─────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/behavioral-mental-health/psychologists": [
    feat(
      "Stethoscope",
      "Psychologists License Data",
      "Psychologist records verified against all 50 state psychology licensing boards. Includes Licensed Psychologist (LP) and Licensed Clinical Psychologist (LCP) designations, active licensure status, and health service psychologist classification per record.",
    ),
    feat(
      "Mail",
      "Psychologists Email",
      "Professional email addresses for licensed psychologists across private practices, group therapy centers, hospital psychology departments, and university counseling centers. Validated through SMTP verification with monthly bounce testing for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Psychologists Direct Phone",
      "Practice and clinic phone numbers for licensed psychologists with direct extension data for group and solo practices. Includes landline versus mobile classification and preferred contact window data for scheduled outreach.",
    ),
    feat(
      "MapPin",
      "Psychologists Practice Location",
      "Practice addresses for psychologists at the suite level, covering solo and group private practices, hospital outpatient psychology departments, community mental health centers, and academic psychology training clinics across all 50 states.",
    ),
    feat(
      "Heart",
      "Psychologists Specialty Tags",
      "Psychology specialty and population focus classifications including neuropsychology, forensic psychology, pediatric psychology, geropsychology, health psychology, sports psychology, trauma-focused therapy, and school psychology.",
    ),
    feat(
      "Building2",
      "Psychologists Facility Data",
      "Practice type and employer indicators for psychologists — solo private practice, group practice, hospital outpatient department, community mental health center, university training clinic, VA system, and correctional facility designations.",
    ),
    feat(
      "Activity",
      "Psychologists Credentials",
      "Doctoral degree verification — PhD, PsyD, and EdD — with state board licensure standing and specialty proficiency credentials including ABPP specialty board certifications and Board Certified Behavior Analyst (BCBA) designations where applicable.",
    ),
    feat(
      "Shield",
      "Psychologists Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email and phone contacts. Records scrubbed against CAN-SPAM suppression lists and the National DNC Registry before delivery for compliant psychologist outreach campaigns.",
    ),
  ],

  // ── 2. PSYCHIATRISTS ─────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/behavioral-mental-health/psychiatrists": [
    feat(
      "Stethoscope",
      "Psychiatrists License Data",
      "Psychiatrist records verified against all 50 state medical board registries and ABPN board certification records. Includes active MD and DO licensure, DEA registration status, and subspecialty certifications in child, geriatric, and addiction psychiatry per record.",
    ),
    feat(
      "Mail",
      "Psychiatrists Email",
      "Professional email addresses for psychiatrists across hospital psychiatric units, outpatient behavioral health clinics, private practices, and academic medical centers. SMTP-validated and bounce-tested monthly for sustained deliverability.",
    ),
    feat(
      "Phone",
      "Psychiatrists Direct Phone",
      "Practice, hospital department, and personal direct phone lines for psychiatrists. Includes landline versus mobile classification and call-time optimization data for compliant and effective outreach scheduling.",
    ),
    feat(
      "MapPin",
      "Psychiatrists Work Location",
      "Practice and facility addresses for psychiatrists covering inpatient psychiatric hospitals, hospital behavioral health units, outpatient mental health clinics, community mental health centers, private practices, and telepsychiatry-primary settings.",
    ),
    feat(
      "Heart",
      "Psychiatrists Specialty Tags",
      "ABPN subspecialty certifications and practice focus areas including child and adolescent psychiatry, geriatric psychiatry, addiction psychiatry, forensic psychiatry, consultation-liaison psychiatry, and psychosomatic medicine.",
    ),
    feat(
      "Building2",
      "Psychiatrists Employer Data",
      "Hospital system and practice setting affiliations for psychiatrists including hospital name, health system membership, academic medical center designation, and community mental health organization affiliation for account-based targeting.",
    ),
    feat(
      "Activity",
      "Psychiatrists Education Level",
      "Medical degree type — MD or DO — with psychiatry residency program and fellowship training in subspecialties verified per record. Academic faculty appointments and medical school affiliations included for education and CME product campaigns.",
    ),
    feat(
      "Shield",
      "Psychiatrists Outreach Permissions",
      "HIPAA-conscious data handling with opt-in consent documentation for email and phone contacts. CAN-SPAM and National DNC Registry compliance documentation provided with every psychiatrist contact list delivery.",
    ),
  ],

  // ── 3. MENTAL HEALTH COUNSELORS ──────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/behavioral-mental-health/mental-health-counselors": [
    feat(
      "Stethoscope",
      "Mental Health Counselors License Data",
      "Mental health counselor records verified against all 50 state counseling licensure boards. Includes Licensed Mental Health Counselor (LMHC), Licensed Professional Counselor (LPC), and Licensed Clinical Professional Counselor (LCPC) designations with active status per record.",
    ),
    feat(
      "Mail",
      "Mental Health Counselors Email",
      "Professional email addresses for licensed mental health counselors across private practices, community mental health centers, substance abuse treatment facilities, and telehealth platforms. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Mental Health Counselors Direct Phone",
      "Practice and clinic phone numbers for mental health counselors with direct lines for solo and group practices. Includes line-type classification and preferred contact window data for scheduling outreach to LMHCs and LPCs.",
    ),
    feat(
      "MapPin",
      "Mental Health Counselors Practice Location",
      "Practice addresses for mental health counselors at the suite level, covering solo and group private practices, community mental health centers, substance abuse treatment programs, school-based counseling settings, and telehealth-primary practices.",
    ),
    feat(
      "Heart",
      "Mental Health Counselors Specialty Tags",
      "Practice specialty and population focus for licensed counselors including trauma and PTSD treatment, anxiety and depression, substance use disorders, adolescent and school counseling, grief counseling, relationship issues, and LGBTQ+ affirming services.",
    ),
    feat(
      "Building2",
      "Mental Health Counselors Facility Data",
      "Practice type and employer indicators for mental health counselors — private practice, community mental health center, integrated care clinic, substance abuse treatment facility, school-based setting, and VA or government mental health program.",
    ),
    feat(
      "Activity",
      "Mental Health Counselors Credentials",
      "State licensure standing verified across all 50 jurisdictions with credential type — LMHC, LPC, LCPC, LCMHC — per record. National Certified Counselor (NCC) designation and specialty certifications from NBCC included where available.",
    ),
    feat(
      "Shield",
      "Mental Health Counselors Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all contacts. Records scrubbed against CAN-SPAM requirements and the National DNC Registry before delivery for compliant mental health counselor outreach campaigns.",
    ),
  ],

  // ── 4. SOCIAL WORKERS & CASE MANAGERS ────────────────────────────────────────
  "data-assets/b2b-database/healthcare/behavioral-mental-health/social-workers": [
    feat(
      "Stethoscope",
      "Social Workers & Case Managers License Data",
      "Social worker records verified against all 50 state social work licensing boards. Includes Licensed Social Worker (LSW), Licensed Clinical Social Worker (LCSW), and Licensed Master Social Worker (LMSW) designations with active licensure status per record.",
    ),
    feat(
      "Mail",
      "Social Workers & Case Managers Email",
      "Professional email addresses for licensed social workers and case managers across hospitals, community health agencies, mental health centers, school systems, and child welfare organizations. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Social Workers & Case Managers Direct Phone",
      "Agency, clinic, and direct phone numbers for social workers and case managers with department-level extensions for hospital-based professionals. Includes landline versus mobile classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Social Workers & Case Managers Practice Location",
      "Work-site addresses for social workers and case managers covering hospitals, outpatient behavioral health centers, community health organizations, child welfare agencies, school systems, and VA social work departments across all 50 states.",
    ),
    feat(
      "Heart",
      "Social Workers & Case Managers Population Focus",
      "Practice population and specialization areas for clinical social workers including children and family services, geriatric and aging services, mental health and substance use, healthcare social work, school-based services, and military and veteran support.",
    ),
    feat(
      "Building2",
      "Social Workers & Case Managers Facility Data",
      "Employer and practice setting data for social workers including organization type — hospital, nonprofit community agency, government program, school system, or private practice — with health system and IDN affiliation indicators.",
    ),
    feat(
      "Activity",
      "Social Workers & Case Managers Credentials",
      "LCSW, LMSW, and LSW licensure verification per record. ASWB national exam completion, NASW membership status, and specialty certifications in case management (ACM, CCM) and healthcare social work (C-ASWCM) flagged where available.",
    ),
    feat(
      "Shield",
      "Social Workers & Case Managers Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email and phone contacts. Records scrubbed against CAN-SPAM requirements and National DNC Registry for compliant social worker and case manager outreach campaigns.",
    ),
  ],

  // ── 5. MARRIAGE & FAMILY THERAPISTS ──────────────────────────────────────────
  "data-assets/b2b-database/healthcare/behavioral-mental-health/marriage-family-therapists": [
    feat(
      "Stethoscope",
      "Marriage & Family Therapists License Data",
      "MFT records verified against all 50 state marriage and family therapy licensing boards. Includes Licensed Marriage and Family Therapist (LMFT) designations with active licensure status, supervised hours completion records, and associate-level license designations per record.",
    ),
    feat(
      "Mail",
      "Marriage & Family Therapists Email",
      "Professional email addresses for LMFTs across private practices, family counseling centers, community mental health agencies, and telehealth platforms. All addresses are SMTP-validated and bounce-tested monthly for consistent deliverability.",
    ),
    feat(
      "Phone",
      "Marriage & Family Therapists Direct Phone",
      "Practice and clinic phone numbers for marriage and family therapists with direct lines for solo and group practices. Includes landline versus mobile classification and call-time optimization data for scheduled outreach campaigns.",
    ),
    feat(
      "MapPin",
      "Marriage & Family Therapists Practice Location",
      "Practice addresses for LMFTs at the suite level, covering solo and group private practices, family counseling agencies, community mental health centers, faith-based counseling organizations, and employee assistance program providers.",
    ),
    feat(
      "Heart",
      "Marriage & Family Therapists Therapy Specializations",
      "Practice focus and therapeutic modality classifications for MFTs including couples therapy, family systems, trauma-informed care, child and adolescent therapy, premarital counseling, divorce and co-parenting, and substance use disorder treatment.",
    ),
    feat(
      "Building2",
      "Marriage & Family Therapists Facility Data",
      "Practice setting and employer indicators for LMFTs — private practice, group practice, community agency, nonprofit counseling center, hospital outpatient behavioral health, school-based program, or employee assistance program service provider.",
    ),
    feat(
      "Activity",
      "Marriage & Family Therapists Credentials",
      "LMFT licensure standing verified across all 50 state boards. AAMFT membership status and Approved Supervisor designation included where applicable. Associate and provisional license tiers clearly identified for early-career audience targeting.",
    ),
    feat(
      "Shield",
      "Marriage & Family Therapists Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email contacts. Records scrubbed against CAN-SPAM requirements and National DNC Registry for compliant marriage and family therapist outreach campaigns.",
    ),
  ],

  // ── 6. DENTAL HYGIENISTS ─────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/dental-vision/dental-hygienists": [
    feat(
      "Stethoscope",
      "Dental Hygienists License Data",
      "State dental hygiene licensure verified against all 50 state dental board registries and ADHA membership records. Includes active RDH (Registered Dental Hygienist) status, local anesthesia authorization, and restorative function credentials where applicable per state.",
    ),
    feat(
      "Mail",
      "Dental Hygienists Email",
      "Professional email addresses for registered dental hygienists across private practices, DSO-affiliated locations, community health center dental departments, and academic dental clinics. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Dental Hygienists Direct Phone",
      "Dental practice front-desk and direct phone lines for dental hygienist employer settings. Includes landline versus VoIP classification and call-time optimization data for effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Dental Hygienists Practice Location",
      "Dental office addresses for hygienist employer settings at the suite level, covering private practices, DSO-affiliated clinics, dental school clinics, community health center dental departments, and corporate dental chain locations.",
    ),
    feat(
      "Heart",
      "Dental Hygienists Specialty Tags",
      "Practice-type and specialty service classifications for dental hygienists including pediatric dentistry, periodontics-focused hygiene, public health dentistry, geriatric dental care, and mobile and school-based dental hygiene programs.",
    ),
    feat(
      "Building2",
      "Dental Hygienists Facility Data",
      "Employer and practice setting data for dental hygienists including DSO chain affiliation, practice ownership type, community health center designation, and dental school employment indicators for account-based dental marketing.",
    ),
    feat(
      "Activity",
      "Dental Hygienists Credentials",
      "State RDH licensure verification for all 50 states, ADHA national certification status, local anesthesia and nitrous oxide permits, and OSHA compliance certification flags where available for credential-based audience targeting.",
    ),
    feat(
      "Shield",
      "Dental Hygienists Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and suppression list management. Phone data scrubbed against the National Do Not Call Registry prior to delivery for compliant dental hygienist professional outreach.",
    ),
  ],

  // ── 7. OPTOMETRISTS ──────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/dental-vision/optometrists": [
    feat(
      "Stethoscope",
      "Optometrists License Data",
      "State optometry licensure verified against all 50 state boards of optometry and AOA membership records. Includes active OD licensure, therapeutic pharmaceutical agent (TPA) authority, and glaucoma treatment certification status where applicable per state.",
    ),
    feat(
      "Mail",
      "Optometrists Email",
      "Professional email addresses for optometrists across private practices, optical chains, health system eye clinics, and community health center optometry departments. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Optometrists Direct Phone",
      "Practice and clinic direct phone lines for optometrists including front-desk and practitioner direct lines. Includes landline versus mobile classification and call-time optimization data for outreach scheduling.",
    ),
    feat(
      "MapPin",
      "Optometrists Practice Location",
      "Optometry office addresses at the suite level, covering solo and group private practices, optical retail chain locations, hospital outpatient eye clinics, community health center optical departments, and academic optometry clinics.",
    ),
    feat(
      "Heart",
      "Optometrists Specialty Tags",
      "AOA specialty and patient population focus classifications for ODs including contact lens specialty, pediatric vision care, geriatric optometry, ocular disease management, low vision rehabilitation, sports vision, and myopia management.",
    ),
    feat(
      "Building2",
      "Optometrists Practice Data",
      "Practice type and employer indicators for optometrists — solo private practice, group practice, optical chain, academic training clinic, health system outpatient eye center, and community health center designations for account-based targeting.",
    ),
    feat(
      "Activity",
      "Optometrists Credentials",
      "OD degree verification with state board licensure standing, AOA membership status, and therapeutic certification levels including TPA and glaucoma co-management authority verified across all 50 state licensing jurisdictions.",
    ),
    feat(
      "Shield",
      "Optometrists Compliance Flags",
      "CAN-SPAM-compliant email consent documentation with opt-in provenance tracking and suppression list management. Phone records scrubbed against the National Do Not Call Registry for compliant outreach to optometry professionals.",
    ),
  ],

  // ── 8. OPTICIANS ─────────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/dental-vision/opticians": [
    feat(
      "Stethoscope",
      "Opticians License Data",
      "State optician licensure verified against all state licensing boards — 34 states require licensure — and ABO-NCLE certification records. Includes American Board of Opticianry (ABO) and National Contact Lens Examiners (NCLE) certification status per record.",
    ),
    feat(
      "Mail",
      "Opticians Email",
      "Professional email addresses for licensed and certified opticians across optical retail locations, private optometry offices, and hospital optical shops. SMTP-validated and bounce-tested monthly for reliable campaign deliverability.",
    ),
    feat(
      "Phone",
      "Opticians Direct Phone",
      "Optical shop and practice direct lines for licensed optician employer settings. Includes landline versus mobile classification and call-time optimization data for effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Opticians Practice Location",
      "Optical retail and practice locations at the facility level, covering optical chain locations, private optometry-affiliated dispensaries, independent optical shops, hospital optical departments, and vision care center locations.",
    ),
    feat(
      "Heart",
      "Opticians Specialty Tags",
      "Practice specialization and service focus for opticians including spectacle dispensing, contact lens fitting, low vision aids, sports and occupational eyewear, pediatric opticianry, and independent dispensary versus optical chain affiliation.",
    ),
    feat(
      "Building2",
      "Opticians Practice Data",
      "Employer and practice setting data for licensed opticians including optical chain affiliation, independent dispensary status, optometry office-affiliated dispensary, and hospital optical services for account-level marketing.",
    ),
    feat(
      "Activity",
      "Opticians Credentials",
      "ABO and NCLE national certification status verified per record, state licensure standing for licensed states, and continuing education compliance indicators for credential-based and continuing education product targeting.",
    ),
    feat(
      "Shield",
      "Opticians Compliance Flags",
      "CAN-SPAM-compliant email records with opt-in documentation and suppression list management. Phone data scrubbed against the National Do Not Call Registry for compliant outreach to licensed and certified optician professionals.",
    ),
  ],

  // ── 9. PHARMACISTS ───────────────────────────────────────────────────────────
  "data-assets/b2b-database/healthcare/pharmacy-practice-management/pharmacists": [
    feat(
      "Pill",
      "Pharmacists License Data",
      "State pharmacy board license verification confirming active pharmacist RPh and PharmD status across all 50 states. Includes pharmacy type classifications, controlled substance dispensing authority, and collaborative practice agreement indicators per record.",
    ),
    feat(
      "Mail",
      "Pharmacists Email",
      "Pharmacist professional email addresses across retail pharmacy chains, hospital inpatient pharmacies, specialty compounding facilities, and PBM organizations. SMTP-validated and bounce-tested monthly for sustained deliverability.",
    ),
    feat(
      "Phone",
      "Pharmacists Direct Phone",
      "Pharmacy counter and pharmacist-direct numbers for retail, hospital, and specialty pharmacy locations with call-time optimization data and landline versus mobile classification for compliant outreach scheduling.",
    ),
    feat(
      "MapPin",
      "Pharmacists Pharmacy Location",
      "Retail storefront, hospital inpatient pharmacy, mail-order fulfillment facility, and compounding pharmacy addresses mapped to ZIP+4 for territory assignment and regional campaign targeting.",
    ),
    feat(
      "Heart",
      "Pharmacists Pharmacy Type",
      "Setting-based practice classifications for pharmacists — retail chain, independent community pharmacy, hospital inpatient, ambulatory care, long-term care facility, specialty pharmacy, and nuclear pharmacy practice settings.",
    ),
    feat(
      "Building2",
      "Pharmacists Facility Data",
      "Pharmacy chain identification, health system affiliation, independent ownership status, and PBM relationship data for enterprise-level pharmaceutical company and healthcare product marketing.",
    ),
    feat(
      "Activity",
      "Pharmacists Credentials",
      "PharmD and RPh degree verification, specialty board certifications from BPS including BCPS, BCOP, BCACP, and BCGP, immunization administration authority, and collaborative practice agreement participation indicators.",
    ),
    feat(
      "Shield",
      "Pharmacists Compliance Flags",
      "DEA registration verification with pharmaceutical marketing consent tracking and state-specific detailing restriction awareness for compliant pharmacist professional outreach campaigns across all practice settings.",
    ),
  ],

  // ── 10. PHYSICIAN PRACTICE MANAGERS ──────────────────────────────────────────
  "data-assets/b2b-database/healthcare/pharmacy-practice-management/physician-practice-managers": [
    feat(
      "Briefcase",
      "Physician Practice Managers Manager Profiles",
      "Practice manager and administrator records verified against MGMA membership directories, state medical society practice management associations, and health system operational leadership databases. Includes title, practice size, and reporting structure data.",
    ),
    feat(
      "Mail",
      "Physician Practice Managers Email",
      "Corporate and professional email addresses for physician practice managers and medical office administrators at solo practices, group practices, and health system outpatient departments. SMTP-validated and bounce-tested monthly for reliable deliverability.",
    ),
    feat(
      "Phone",
      "Physician Practice Managers Direct Phone",
      "Practice management office direct lines and personal phone numbers for practice managers at physician offices, medical groups, and ambulatory care centers. Includes landline versus mobile classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Physician Practice Managers Practice Location",
      "Practice management office addresses at the suite level, covering solo physician offices, single and multi-specialty group practices, hospital outpatient departments, ambulatory surgery centers, and federally qualified health centers.",
    ),
    feat(
      "Heart",
      "Physician Practice Managers Specialty Area",
      "Medical practice specialty focus for physician practice managers across primary care, internal medicine, cardiology, orthopedics, dermatology, oncology, surgery, and more than 30 additional specialty practice types for targeted outreach.",
    ),
    feat(
      "Building2",
      "Physician Practice Managers Practice Data",
      "Practice ownership and organizational structure indicators — independent physician practice, physician-owned group, hospital-employed group, private equity-backed practice, and academic faculty practice designations.",
    ),
    feat(
      "Activity",
      "Physician Practice Managers Credentials",
      "CMPE (Certified Medical Practice Executive) and FACMPE (Fellow ACMPE) credentials from ACMPE verified per record, along with healthcare administration degree designations and MGMA membership status where available.",
    ),
    feat(
      "Shield",
      "Physician Practice Managers Compliance Flags",
      "CAN-SPAM-compliant email consent documentation with HIPAA-aware data handling. Records verified against the National DNC Registry for compliant outreach to physician practice management and medical office administration professionals.",
    ),
  ],

  // ── 11. CHIROPRACTORS (specialty-other) ──────────────────────────────────────
  "data-assets/b2b-database/healthcare/specialty-other/chiropractors": [
    feat(
      "Stethoscope",
      "Chiropractors NPI Data",
      "Chiropractor records validated through state chiropractic board registries and NPI lookup to confirm current DC licensure, technique specializations, and active practice scope. Includes primary taxonomy codes and practice type designations per record.",
    ),
    feat(
      "Mail",
      "Chiropractors Email",
      "Practice-specific email addresses for chiropractors sourced from clinic websites, professional directories, and state board records. Verified monthly through SMTP handshake protocols to maintain deliverability rates above 95% for ongoing campaigns.",
    ),
    feat(
      "Phone",
      "Chiropractors Direct Phone",
      "Clinic phone numbers with direct extensions for sole practitioners and multi-provider chiropractic offices. Classified by landline versus VoIP type with call-time optimization data for scheduled outbound outreach campaigns.",
    ),
    feat(
      "MapPin",
      "Chiropractors Practice Location",
      "Street-level clinic addresses for chiropractic practices including standalone offices, multi-disciplinary wellness centers, sports medicine clinics, and integrated rehabilitation facilities mapped at the suite level.",
    ),
    feat(
      "Heart",
      "Chiropractors Specialty Tags",
      "Technique-based specialty classifications for chiropractors including spinal decompression therapy, sports chiropractic, pediatric chiropractic, prenatal care, neurological chiropractic, and rehabilitation-integrated practice designations.",
    ),
    feat(
      "Building2",
      "Chiropractors Facility Data",
      "Practice setting indicators for chiropractic offices — solo clinic, group chiropractic practice, integrated wellness center, sports medicine facility, or hospital-affiliated rehabilitation department — with ownership type classification.",
    ),
    feat(
      "Activity",
      "Chiropractors Credentials",
      "State DC licensure verification across all 50 state boards, continuing education compliance status, and specialty certification from ACBSP, CCSP (Certified Chiropractic Sports Practitioner), and other recognized chiropractic credentialing bodies.",
    ),
    feat(
      "Shield",
      "Chiropractors Compliance Flags",
      "Opt-in documentation with channel-level consent tracking for email, phone, and direct mail outreach to chiropractic professionals. CAN-SPAM and TCPA compliance documentation provided with every chiropractic contact list delivery.",
    ),
  ],

  // ── 12. VETERINARIANS (specialty-other) ──────────────────────────────────────
  "data-assets/b2b-database/healthcare/specialty-other/veterinarians": [
    feat(
      "Heart",
      "Veterinarians License Data",
      "State veterinary board validation confirming active DVM and VMD licensure, USDA accreditation status for food safety and import roles, and controlled substance (DEA) authorization for every veterinarian record in the dataset.",
    ),
    feat(
      "Mail",
      "Veterinarians Email",
      "Practice-specific email addresses for veterinarians at companion animal clinics, equine practices, mixed-animal facilities, and specialty referral hospitals. SMTP-validated and bounce-tested monthly for reliable campaign deliverability.",
    ),
    feat(
      "Phone",
      "Veterinarians Direct Phone",
      "Clinic phone numbers and veterinarian direct extensions for private practices, emergency animal hospitals, and specialty referral centers. Includes landline versus mobile classification and call-time optimization data.",
    ),
    feat(
      "MapPin",
      "Veterinarians Practice Location",
      "Clinic and hospital addresses for companion animal, large animal, equine, and mixed animal practices. Covers private clinics, emergency and specialty hospitals, academic veterinary teaching hospitals, and mobile veterinary service areas.",
    ),
    feat(
      "Stethoscope",
      "Veterinarians Specialty Tags",
      "AVMA-recognized specialty designations for veterinarians including surgery, internal medicine, dermatology, oncology, emergency and critical care, ophthalmology, exotic and zoo animal medicine, and food safety and inspection roles.",
    ),
    feat(
      "Building2",
      "Veterinarians Practice Data",
      "Practice type and ownership indicators — solo owner, corporate-affiliated (Banfield, VCA, National Veterinary Associates), academic teaching hospital, government regulatory, research institution, and nonprofit veterinary organization.",
    ),
    feat(
      "Activity",
      "Veterinarians Credentials",
      "AVMA-accredited degree verification — DVM and VMD — state board licensure standing, USDA veterinary accreditation status, and board certification from ABVS-recognized specialty colleges for credential-based audience filtering.",
    ),
    feat(
      "Shield",
      "Veterinarians Compliance Flags",
      "Veterinary pharmaceutical and animal health product marketing consent documentation with AAHA membership indicators and state advertising regulation awareness for compliant veterinarian professional outreach campaigns.",
    ),
  ],

  // ── 13. ALLIED HEALTHCARE PROFESSIONALS ──────────────────────────────────────
  "data-assets/b2b-database/healthcare/specialty-other/allied-healthcare-professionals": [
    feat(
      "Stethoscope",
      "Allied Healthcare Professionals NPI Data",
      "Allied health professional records verified against the NPPES NPI registry, state professional licensing boards, and national certification body databases covering physical therapists, occupational therapists, respiratory therapists, radiologic technologists, and more than 30 additional allied health disciplines.",
    ),
    feat(
      "Mail",
      "Allied Healthcare Professionals Email",
      "Professional email addresses for allied health professionals across hospitals, outpatient clinics, rehabilitation centers, long-term care facilities, and community health settings. SMTP-validated and bounce-tested monthly for consistent deliverability.",
    ),
    feat(
      "Phone",
      "Allied Healthcare Professionals Direct Phone",
      "Clinic, department, and direct phone numbers for allied health professionals across facility types. Includes landline versus mobile classification and call-time optimization data for effective outbound campaign scheduling.",
    ),
    feat(
      "MapPin",
      "Allied Healthcare Professionals Practice Location",
      "Work-site addresses for allied health professionals at the facility level, covering acute care hospitals, outpatient therapy and rehabilitation clinics, skilled nursing facilities, school districts, home health agencies, and community health centers.",
    ),
    feat(
      "Heart",
      "Allied Healthcare Professionals Specialty Tags",
      "Discipline and specialty classifications spanning physical therapy, occupational therapy, respiratory therapy, radiologic technology, medical laboratory science, health information management, clinical nutrition, speech-language pathology, and 20-plus additional allied health fields.",
    ),
    feat(
      "Building2",
      "Allied Healthcare Professionals Facility Data",
      "Employer and practice setting data for allied health professionals — hospital, outpatient clinic, SNF, home health agency, school system, or community health center — with health system affiliation and corporate rehabilitation group identification.",
    ),
    feat(
      "Activity",
      "Allied Healthcare Professionals Credentials",
      "Multi-discipline credential verification covering state licensure, APTA, AOTA, AARC, and other professional body certifications, national board exam completion, and specialty certifications across all major allied health disciplines.",
    ),
    feat(
      "Shield",
      "Allied Healthcare Professionals Compliance Flags",
      "HIPAA-conscious data handling with opt-in documentation for all email and phone contacts. Records scrubbed against CAN-SPAM requirements and the National DNC Registry before delivery for compliant allied health professional outreach.",
    ),
  ],
};

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nPatching attributes for 13 healthcare pages (batch 3)`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const slugs = Object.keys(CORRECT_ATTRIBUTES);

  for (const slug of slugs) {
    const label = slug.split("/").pop();
    console.log(`\n── ${label}`);

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
