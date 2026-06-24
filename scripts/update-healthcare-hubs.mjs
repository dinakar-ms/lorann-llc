/**
 * Update all 8 Healthcare hub pages with:
 * 1. Unique intro section (kicker, headline, 2 paragraphs) — fixes blank white space
 * 2. Unique hubAttributesSection with 4 key attributes per specialty group
 * 3. Unique featureGridSections (1 overview grid per hub)
 * 4. Updated heroDescription, titlePlain/titleAccent unique per hub
 * Usage: node scripts/update-healthcare-hubs.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry", dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);
const blk = (t) => ({ _key: k(), _type: "block", style: "normal", markDefs: [], children: [{ _key: k(), _type: "span", marks: [], text: t }] });

const HC = "data-assets/b2b-database/healthcare";

const HUBS = [
  {
    slug: `${HC}/physicians-advanced-practice`,
    kicker: "B2B Healthcare Data",
    titlePlain: "Physicians &",
    titleAccent: "Advanced Practice Providers",
    heroDesc: "Verified, NPI-validated contact data for physicians, podiatrists, nurse practitioners, physician assistants, and medical assistants — segmented by specialty, practice setting, and prescribing authority.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "Browse Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "The most complete",
    introHeadlineAccent: "advanced practice provider database",
    introPara1: "The Physicians & Advanced Practice Providers segment covers the full spectrum of licensed medical professionals with independent or supervised prescriptive authority — from MDs and DOs across all specialties to nurse practitioners, physician assistants, podiatrists, and medical assistants. Together, these professionals represent the primary clinical decision-makers for pharmaceutical, device, and clinical supply procurement across ambulatory and acute care settings.",
    introPara2: "Every record in this segment is verified against the National Provider Identifier Registry, state medical and APRN licensing boards, and professional credentialing databases. Contact data is SMTP-validated and CASS-certified, refreshed quarterly, and delivered with full compliance documentation including opt-in status, CAN-SPAM flags, and DNC suppression processing.",
    hubAttrKicker: "Targeting Capabilities",
    hubAttrTitle: "Precision filters for the",
    hubAttrAccent: "advanced practice audience",
    hubAttrDesc: "Segment physicians and advanced practice providers by specialty, credential level, prescriptive authority, practice setting, and geographic territory.",
    hubAttrs: [
      { icon: "Stethoscope", title: "Specialty Segmentation", desc: "300+ medical specialty codes including primary care, cardiology, oncology, orthopedics, neurology, and every major clinical discipline." },
      { icon: "ShieldCheck", title: "Prescriptive Authority", desc: "Filter by DEA registration, Schedule II prescribing authority, and APRN scope of practice for pharmaceutical campaign targeting." },
      { icon: "Building2",   title: "Practice Setting",    desc: "Solo practice, multi-physician group, hospital-employed, academic medical center, urgent care, or FQHC practice type." },
      { icon: "MapPin",      title: "Geographic Precision", desc: "State, county, DMA, city, or ZIP-level targeting with territory-aligned selects for field force alignment." },
    ],
    fgKicker: "Why Choose This Segment",
    fgTitle: "Verified data for every",
    fgAccent: "advanced practice specialty",
    fgDesc: "Five targeted lists covering the full advanced practice provider spectrum — each NPI-verified, specialty-matched, and campaign-ready.",
    fgFeatures: [
      { icon: "Stethoscope", title: "Physicians & Doctors",    desc: "MDs and DOs across all medical specialties — verified against the NPI Registry and state medical board records for prescriber-level targeting." },
      { icon: "UserCog",     title: "Podiatrists",            desc: "Licensed DPMs in private practice, hospital-based, and wound care settings with subspecialty and geographic segmentation." },
      { icon: "HeartPulse",  title: "Nurse Practitioners",    desc: "APRNs with prescriptive authority in all 50 states, segmented by population focus certification and practice authority status." },
      { icon: "Users",       title: "Physician Assistants",   desc: "NCCPA-certified PA-Cs across surgical, emergency, primary care, and specialty clinical settings with DEA status." },
      { icon: "Activity",    title: "Medical Assistants",     desc: "CMA, RMA, and CCMA-certified clinical support staff in physician offices, urgent care, and ambulatory surgery settings." },
    ],
  },

  {
    slug: `${HC}/nursing-professionals`,
    kicker: "B2B Healthcare Data",
    titlePlain: "Nursing",
    titleAccent: "Professionals",
    heroDesc: "Comprehensive, license-verified contact data for Registered Nurses, Licensed Practical Nurses, Certified Nursing Assistants, and Certified Nurse-Midwives — the clinical workforce at the heart of patient care.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "Browse Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Data for the",
    introHeadlineAccent: "largest clinical workforce in healthcare",
    introPara1: "With over 4 million licensed nurses in the United States, the nursing workforce represents the single largest clinical professional group in healthcare — and one of the most influential. Nurses drive adoption of clinical supply products, patient monitoring technology, EHR documentation platforms, and continuing education programs at the unit and department level across every healthcare setting.",
    introPara2: "Our Nursing Professionals segment covers all major nursing credential levels — from RNs and LPNs through CNAs and Certified Nurse-Midwives — each verified against state board of nursing licensing records and professional association data. Segmentation by clinical specialty, unit type, facility type, and credential level allows marketers to reach exactly the right nursing audience for their program.",
    hubAttrKicker: "Nursing Audience Filters",
    hubAttrTitle: "Reach nurses by credential,",
    hubAttrAccent: "specialty & setting",
    hubAttrDesc: "Segment the nursing workforce by credential level, clinical unit, practice setting, and specialty certification for precision nursing audience targeting.",
    hubAttrs: [
      { icon: "HeartPulse",  title: "Credential Level",   desc: "RN (BSN, ASN, MSN), LPN, CNA, or CNM credential filters for precise nursing workforce segmentation." },
      { icon: "Stethoscope", title: "Clinical Specialty",  desc: "ICU, ER, OR, oncology, labor and delivery, pediatrics, home health, and 50+ additional specialty and unit-type filters." },
      { icon: "Building2",   title: "Practice Setting",   desc: "Hospital, outpatient clinic, long-term care, home health, SNF, ambulatory surgery, or school health setting." },
      { icon: "Award",       title: "Specialty Certification", desc: "CCRN, CEN, CNOR, PCCN, OCN, WHNC, and other advanced nursing specialty certification filters available." },
    ],
    fgKicker: "Four Nursing Specialties",
    fgTitle: "Targeted data for",
    fgAccent: "every nursing credential",
    fgDesc: "Four verified nursing contact lists covering the full credential spectrum — from RNs and LPNs through CNAs and nurse-midwives.",
    fgFeatures: [
      { icon: "HeartPulse",  title: "Registered Nurses",            desc: "Licensed RNs across all 50 states verified from state BON records. Segmented by specialty, unit, and practice setting." },
      { icon: "Users",       title: "Licensed Practical Nurses",    desc: "LPNs and LVNs in long-term care, physician offices, and SNF settings with facility-type segmentation." },
      { icon: "ShieldCheck", title: "Certified Nursing Assistants", desc: "State-registered CNAs in nursing homes, assisted living, home health, and hospital settings." },
      { icon: "Heart",       title: "Certified Nurse-Midwives",     desc: "AMCB-certified CNMs in hospital L&D, birth centers, OB-GYN offices, and FQHCs with prescriptive authority data." },
    ],
  },

  {
    slug: `${HC}/hospital-decision-makers`,
    kicker: "B2B Healthcare Executive Data",
    titlePlain: "Hospital",
    titleAccent: "Decision Makers",
    heroDesc: "Verified C-suite and senior leadership contact data for hospital administrators, CEOs, CFOs, Chief Medical Officers, Chief Nursing Officers, Chiefs of Staff, and Medical Directors — the executives who drive healthcare procurement.",
    primaryCta: { label: "Request Executive Counts", href: "/contact" },
    secondaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Direct access to the executives who",
    introHeadlineAccent: "control hospital strategy and spend",
    introPara1: "Hospital decision-makers — from CEOs and CFOs to CMOs, CNOs, Chiefs of Staff, and Medical Directors — control the purchasing decisions that shape how healthcare is delivered and technology is adopted across U.S. hospitals and health systems. Reaching these executives requires verified, title-confirmed contact data that reflects their current role and organizational affiliation.",
    introPara2: "Our Hospital Decision Makers segment is sourced from AHA member directories, CMS provider enrollment records, health system governance databases, and physician leadership rosters. Each record is verified for active role, current title, facility affiliation, and executive contact accuracy — giving your B2B healthcare sales and marketing teams the confidence to reach the right decision-maker at the right organization.",
    hubAttrKicker: "Executive Audience Filters",
    hubAttrTitle: "Target hospital leaders by role,",
    hubAttrAccent: "system size & clinical domain",
    hubAttrDesc: "Segment hospital decision-makers by executive title, health system size, facility type, clinical domain, and geographic region for account-based outreach.",
    hubAttrs: [
      { icon: "Building2",   title: "Executive Role",    desc: "CEO, CFO, CMO, CNO, Chief of Staff, Medical Director, VP of Operations, and 20+ additional hospital leadership titles." },
      { icon: "Activity",    title: "System Size",       desc: "Filter by bed count, annual revenue, number of employed physicians, or system-level organizational tier." },
      { icon: "Stethoscope", title: "Clinical Domain",   desc: "Target CMOs, medical directors, and chiefs of staff by clinical program area (oncology, cardiology, emergency medicine, etc.)." },
      { icon: "MapPin",      title: "Geography",         desc: "Filter by state, DMA, health system affiliation, or census region for territory-aligned executive outreach." },
    ],
    fgKicker: "Six Executive Segments",
    fgTitle: "Verified data for every",
    fgAccent: "hospital leadership role",
    fgDesc: "Six targeted C-suite and senior leadership lists covering the full hospital executive hierarchy.",
    fgFeatures: [
      { icon: "Building2",   title: "Hospital Administrators", desc: "Facility administrators managing operations, procurement, and vendor relationships at hospitals and health systems." },
      { icon: "LineChart",   title: "CEOs & CFOs",            desc: "Strategic C-suite executives controlling capital allocation, vendor partnerships, and enterprise technology decisions." },
      { icon: "Stethoscope", title: "Chief Medical Officers",  desc: "Physician executives overseeing clinical quality, physician relations, and patient safety programs." },
      { icon: "HeartPulse",  title: "Chief Nursing Officers",  desc: "Nursing executives directing nursing workforce technology, patient care standards, and clinical documentation." },
      { icon: "Users",       title: "Chiefs of Staff",         desc: "Elected physician leaders coordinating medical staff governance and clinical department programs." },
      { icon: "Activity",    title: "Medical Directors",       desc: "Program-level physician executives managing service lines, utilization review, and population health initiatives." },
    ],
  },

  {
    slug: `${HC}/health-therapy`,
    kicker: "B2B Healthcare Data",
    titlePlain: "Health &",
    titleAccent: "Therapy Professionals",
    heroDesc: "Verified contact data for Physical Therapists, Occupational Therapists, Speech-Language Pathologists, Respiratory Therapists, Massage Therapists, EMTs, Paramedics, Radiologic Technicians, Dieticians, and Nutritionists.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "Browse Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "The most comprehensive therapy",
    introHeadlineAccent: "and allied health professional database",
    introPara1: "The Health & Therapy segment covers the allied health and rehabilitation therapy workforce across every clinical modality — from physical and occupational therapists treating musculoskeletal and functional limitations, to respiratory therapists managing critical care ventilation, speech-language pathologists treating communication disorders, dieticians managing therapeutic nutrition, and EMTs providing prehospital emergency care.",
    introPara2: "Each professional in this segment is sourced from their respective credentialing body and state licensing board — APTA for PTs, AOTA for OTs, ASHA for SLPs, AARC for RTs, ARRT for radiologic technologists, CDR for dieticians, and NREMT for EMS providers. Records are segmented by specialty, practice setting, and geographic location for precision audience targeting across eight distinct therapy and allied health disciplines.",
    hubAttrKicker: "Therapy Audience Filters",
    hubAttrTitle: "Target therapy professionals by",
    hubAttrAccent: "discipline, specialty & setting",
    hubAttrDesc: "Segment across eight therapy disciplines with filters for specialty certification, practice setting, credential level, and geographic territory.",
    hubAttrs: [
      { icon: "Activity",    title: "Therapy Discipline",   desc: "PT, OT, SLP, RT, massage therapy, EMS, radiologic technology, or dietetics specialty for discipline-specific outreach." },
      { icon: "Award",       title: "Specialty Certification", desc: "CCRN, CHT, CEN, CRRN, board certification, and 40+ additional specialty certifications available as filters." },
      { icon: "Building2",   title: "Practice Setting",     desc: "Hospital, outpatient clinic, home health, SNF, school-based, private practice, sports facility, or emergency services." },
      { icon: "MapPin",      title: "Geographic Targeting", desc: "State, county, ZIP, DMA, or custom radius targeting for territory-aligned therapy professional outreach." },
    ],
    fgKicker: "Eight Therapy Specialties",
    fgTitle: "Targeted lists for",
    fgAccent: "every therapy discipline",
    fgDesc: "Eight verified therapy and allied health contact lists covering every major clinical rehabilitation discipline.",
    fgFeatures: [
      { icon: "Activity",    title: "Physical Therapists",           desc: "APTA member-sourced PT data with orthopedic, neurologic, sports, and pediatric specialty segmentation." },
      { icon: "Users",       title: "Occupational Therapists",       desc: "AOTA member-sourced OT data with hand therapy, pediatric, adult rehab, and school-based practice filters." },
      { icon: "MessageCircle",title:"Speech & Language Therapists", desc: "ASHA member-sourced SLP data with AAC, dysphagia, pediatric language, and school-based specialty filters." },
      { icon: "Wind",        title: "Respiratory Therapists",        desc: "AARC member-sourced RT data with ICU/critical care, neonatal, sleep diagnostics, and home care specialty filters." },
      { icon: "HeartHandshake",title:"Massage Therapists",          desc: "AMTA and ABMP member-sourced LMT data with modality, practice setting, and geographic segmentation." },
      { icon: "Zap",         title: "EMTs & Paramedics",            desc: "NREMT-certified EMS provider data with certification level and EMS system type segmentation." },
      { icon: "Scan",        title: "Radiologic Technicians",       desc: "ARRT registry-sourced tech data with modality (X-ray, CT, MRI, mammography) and setting filters." },
      { icon: "Leaf",        title: "Dieticians & Nutritionists",   desc: "CDR registry-sourced RDN data with clinical specialty (renal, oncology, sports, pediatric) and setting filters." },
    ],
  },

  {
    slug: `${HC}/behavioral-mental-health`,
    kicker: "B2B Behavioral Health Data",
    titlePlain: "Behavioral &",
    titleAccent: "Mental Health Professionals",
    heroDesc: "Verified contact data for Psychologists, Psychiatrists, Mental Health Counselors, Social Workers, Case Managers, and Marriage & Family Therapists — the licensed professionals delivering America's behavioral health care.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Verified data for the professionals",
    introHeadlineAccent: "delivering mental and behavioral health care",
    introPara1: "The Behavioral & Mental Health segment covers the five primary licensed professional groups delivering mental health and substance use treatment services in the U.S. — from doctoral-level psychologists and psychiatrists to licensed counselors, clinical social workers, and marriage and family therapists. Together, these clinicians represent the purchasing and prescribing audience for psychiatric medications, telehealth platforms, behavioral health EHR systems, and continuing education programs.",
    introPara2: "Records in this segment are sourced from APA licensing boards (psychologists), state medical boards with psychiatry specialty filters (psychiatrists), AMHCA and state counseling boards (LMHCs/LPCs), NASW member directories and state licensing boards (LCSWs), and AAMFT member records (LMFTs). All contact information is SMTP-validated and CASS-certified, with specialty and practice setting segmentation available for each discipline.",
    hubAttrKicker: "Behavioral Health Filters",
    hubAttrTitle: "Segment behavioral health professionals by",
    hubAttrAccent: "discipline, specialty & prescribing status",
    hubAttrDesc: "Target behavioral health clinicians by credential type, therapeutic specialty, prescribing authority, practice setting, and geographic territory.",
    hubAttrs: [
      { icon: "Brain",       title: "Clinical Discipline",     desc: "Psychologist, psychiatrist, LMHC/LPC, LCSW, or LMFT credential filter for discipline-specific campaign targeting." },
      { icon: "Stethoscope", title: "Prescribing Authority",   desc: "Psychiatrists with DEA and Schedule II prescribing authority for psychiatric pharmaceutical marketing." },
      { icon: "Users",       title: "Therapeutic Specialty",   desc: "CBT, DBT, EMDR, trauma, substance use, child and adolescent, geriatric, or forensic behavioral health specialty." },
      { icon: "Building2",   title: "Practice Setting",        desc: "Private practice, community mental health, hospital behavioral health, VA, correctional, school, or telehealth platform." },
    ],
    fgKicker: "Five Behavioral Health Specialties",
    fgTitle: "Targeted data for",
    fgAccent: "every behavioral health discipline",
    fgDesc: "Five verified behavioral health and mental health contact lists covering every major licensed clinical discipline in the behavioral health sector.",
    fgFeatures: [
      { icon: "Brain",       title: "Psychologists",              desc: "PhD, PsyD, and EdD psychologists verified from state licensing boards and APA member directories with specialty segmentation." },
      { icon: "Stethoscope", title: "Psychiatrists",              desc: "Board-certified psychiatrists with DEA flag and subspecialty (child, geriatric, forensic, addiction) segmentation." },
      { icon: "MessageCircle",title:"Mental Health Counselors",   desc: "LMHCs, LPCs, and LCPCs from state licensing boards with specialty and practice setting segmentation." },
      { icon: "HeartHandshake",title:"Social Workers",            desc: "LCSWs, LMSWs, and CCMs from NASW directories and state licensing boards with setting-level segmentation." },
      { icon: "Heart",       title: "Marriage & Family Therapists",desc: "LMFTs from AAMFT membership and state licensing boards with relational specialty and setting filters." },
    ],
  },

  {
    slug: `${HC}/dental-vision`,
    kicker: "B2B Dental & Vision Data",
    titlePlain: "Dental & Vision",
    titleAccent: "Professionals",
    heroDesc: "Verified contact data for Dentists, Dental Hygienists, Dental Assistants, Optometrists, and Opticians — the licensed professionals who deliver dental and vision care across private practice, group, DSO, and retail optical settings.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Verified data across the full",
    introHeadlineAccent: "dental and vision care workforce",
    introPara1: "The Dental & Vision segment covers the licensed clinical professionals who deliver preventive, restorative, and therapeutic oral and ocular health care — from general and specialty dentists who drive purchasing decisions for dental materials, equipment, and software, to dental hygienists who recommend preventive products, dental assistants who manage daily clinical operations, optometrists who prescribe optical and pharmaceutical treatments, and opticians who dispense prescription eyewear.",
    introPara2: "Records in this segment are sourced from ADA member directories and state dental licensing boards (dentists), ADHA membership and state hygiene boards (RDHs), DANB certification records (dental assistants), AOA member directories and state optometry boards (ODs), and ABO/NCLE certification records and state optician licensing boards (opticians). Geographic, specialty, and credential-level segmentation is available across all five disciplines.",
    hubAttrKicker: "Dental & Vision Filters",
    hubAttrTitle: "Segment by specialty,",
    hubAttrAccent: "credential & practice type",
    hubAttrDesc: "Target dental and vision professionals by specialty discipline, practice type, credential level, and geographic market.",
    hubAttrs: [
      { icon: "Smile",       title: "Clinical Discipline",   desc: "General dentist, dental specialist, dental hygienist, dental assistant, optometrist, or optician segmentation." },
      { icon: "Building2",   title: "Practice Type",         desc: "Solo private, group dental, DSO-affiliated, dental school, independent optical, retail chain, or hospital-based." },
      { icon: "Award",       title: "Specialty/Credential",  desc: "Dental specialty (ortho, oral surgery, perio, endo, prostho, peds), OD specialty, ABO/NCLE optician certification." },
      { icon: "MapPin",      title: "Geographic Market",     desc: "State, county, DMA, or ZIP-level targeting for regional dental or vision market campaign alignment." },
    ],
    fgKicker: "Five Dental & Vision Specialties",
    fgTitle: "Verified data for every",
    fgAccent: "dental and vision professional",
    fgDesc: "Five targeted contact lists covering the complete dental and vision care professional workforce.",
    fgFeatures: [
      { icon: "Smile",       title: "Dentists",            desc: "DMDs and DDSs across general and specialty practice — ADA member-sourced with specialty, practice type, and DSO filters." },
      { icon: "HeartPulse",  title: "Dental Hygienists",   desc: "RDH-verified contact data from ADHA membership and state boards with specialty and extended function filters." },
      { icon: "Stethoscope", title: "Dental Assistants",   desc: "DANB-certified CDAs, RDAs, and CCMAs from state licensing records with employer practice type segmentation." },
      { icon: "Eye",         title: "Optometrists",        desc: "ODs verified from AOA membership and state boards with specialty (contact lens, low vision, ocular disease) segmentation." },
      { icon: "Layers",      title: "Opticians",           desc: "ABO/NCLE-certified dispensing opticians from state licensing records with retail, independent, and clinical setting filters." },
    ],
  },

  {
    slug: `${HC}/pharmacy-practice-management`,
    kicker: "B2B Pharmacy & Practice Data",
    titlePlain: "Pharmacy &",
    titleAccent: "Practice Management",
    heroDesc: "Verified contact data for licensed Pharmacists (RPhs and PharmDs) and Physician Practice Managers — two key healthcare purchasing audiences who control formulary decisions and operational technology adoption.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Pharmacy and practice leaders who",
    introHeadlineAccent: "control medication and operations decisions",
    introPara1: "The Pharmacy & Practice Management segment brings together two distinct but complementary healthcare professional audiences: licensed pharmacists who manage drug formularies, dispensing operations, and medication therapy management programs, and physician practice managers who oversee the business operations of physician offices, including technology procurement, billing systems, and vendor contracts.",
    introPara2: "Pharmacist data is sourced from state pharmacy licensing boards and APhA, ASHP, and NCPA member directories — covering community retail, hospital, specialty, LTC, mail-order, and compounding pharmacy settings. Physician practice manager data is sourced from MGMA membership and state medical group associations, covering practices from solo provider offices to large multi-specialty medical groups across all geographic markets.",
    hubAttrKicker: "Pharmacy & Practice Filters",
    hubAttrTitle: "Segment by setting,",
    hubAttrAccent: "credential & practice focus",
    hubAttrDesc: "Target pharmacists and practice managers by practice setting, credential level, specialty certification, and geographic market.",
    hubAttrs: [
      { icon: "Pill",        title: "Pharmacy Setting",    desc: "Community retail, hospital inpatient, specialty, LTC, mail-order, compounding, or ambulatory clinic pharmacy." },
      { icon: "Award",       title: "Pharmacist Credential", desc: "RPh vs. PharmD credential level, and specialty board certifications (BCPS, BCACP, BCOP, BCPPS) as targeting filters." },
      { icon: "Building2",   title: "Practice Size",       desc: "Solo provider, small group, large multi-specialty group, or health system-employed practice type for practice manager targeting." },
      { icon: "MapPin",      title: "Geographic Market",   desc: "State, county, DMA, or ZIP-level targeting for market-specific pharmacy and practice management outreach." },
    ],
    fgKicker: "Two Specialty Segments",
    fgTitle: "Verified data for pharmacy",
    fgAccent: "and practice management professionals",
    fgDesc: "Two targeted contact lists for the key professionals who control pharmaceutical and practice management purchasing decisions.",
    fgFeatures: [
      { icon: "Pill",        title: "Pharmacists",                   desc: "RPhs and PharmDs verified from state pharmacy licensing boards and professional associations. All pharmacy practice settings covered." },
      { icon: "Briefcase",   title: "Physician Practice Managers",   desc: "Practice administrators from MGMA membership and medical group directories. Filtered by practice specialty, size, and ownership model." },
    ],
  },

  {
    slug: `${HC}/specialty-other`,
    kicker: "B2B Specialty Healthcare Data",
    titlePlain: "Specialty &",
    titleAccent: "Other Healthcare Professionals",
    heroDesc: "Targeted contact data for Chiropractors, Veterinarians, and Allied Healthcare Professionals — specialty practitioners who serve unique patient populations and drive distinct purchasing categories.",
    primaryCta: { label: "Request a Count", href: "/contact" },
    secondaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
    introKicker: "About This Segment",
    introHeadlinePlain: "Specialty healthcare professionals who",
    introHeadlineAccent: "require distinct targeting approaches",
    introPara1: "The Specialty & Other Healthcare Professionals segment covers three specialized professional groups that don't fit neatly within the primary clinical and nursing categories but represent significant healthcare marketing audiences in their own right. Chiropractors, veterinarians, and the broader allied healthcare professional workforce each have distinct credentialing systems, purchasing needs, professional associations, and clinical workflows that require specialty-specific data sourcing and segmentation.",
    introPara2: "Chiropractic data is sourced from ACA membership and state chiropractic licensing boards. Veterinary data is sourced from AVMA membership and state veterinary medical licensing boards. Allied healthcare professional data is aggregated from discipline-specific credentialing bodies and professional associations including AAMA, AMT, ARRT, AARC, ASCP, AHIMA, and others — providing a broad multi-discipline allied health contact list for multi-specialty campaigns.",
    hubAttrKicker: "Specialty Segment Filters",
    hubAttrTitle: "Target specialty professionals by",
    hubAttrAccent: "discipline, setting & credential",
    hubAttrDesc: "Segment chiropractors, veterinarians, and allied health professionals by specialty discipline, practice setting, credential level, and geographic market.",
    hubAttrs: [
      { icon: "Award",       title: "Specialty Discipline",  desc: "Chiropractic, veterinary (small animal, equine, exotic, emergency, specialty), or specific allied health profession." },
      { icon: "Building2",   title: "Practice Setting",      desc: "Solo chiropractic practice, corporate veterinary group, independent veterinary clinic, or multi-discipline allied health facility." },
      { icon: "ShieldCheck", title: "Credential Level",      desc: "DC license status, DVM/VMD credential, AVMA specialty board, or allied health certification type for verified professional targeting." },
      { icon: "MapPin",      title: "Geographic Targeting",  desc: "State, county, DMA, or ZIP-level targeting for market-specific specialty healthcare professional outreach." },
    ],
    fgKicker: "Three Specialty Segments",
    fgTitle: "Targeted data for",
    fgAccent: "specialty and allied health professionals",
    fgDesc: "Three specialized contact lists covering the chiropractic, veterinary, and allied healthcare professional markets.",
    fgFeatures: [
      { icon: "Award",       title: "Chiropractors",                    desc: "DCs verified from ACA membership and state chiropractic licensing boards. Subspecialty (sports, pediatric, functional medicine) and practice type filters available." },
      { icon: "Cat",         title: "Veterinarians",                    desc: "DVMs verified from AVMA membership and state veterinary licensing boards. Species specialty and practice type (private, corporate, emergency, specialty) filters available." },
      { icon: "Users",       title: "Allied Healthcare Professionals",  desc: "Multi-discipline allied health contact list aggregated from professional credentialing bodies. Discipline-specific segmentation available across 20+ allied health professions." },
    ],
  },
];

// ─── Build the full patch for a hub page ─────────────────────────
function buildHubPatch(hub) {
  return {
    kicker: hub.kicker,
    titlePlain: hub.titlePlain,
    titleAccent: hub.titleAccent,
    heroDescription: [blk(hub.heroDesc)],
    primaryCta: hub.primaryCta,
    secondaryCta: hub.secondaryCta,

    // ── Intro section (fixes the blank white space) ──
    introKicker: hub.introKicker,
    introHeadlinePlain: hub.introHeadlinePlain,
    introHeadlineAccent: hub.introHeadlineAccent,
    introParagraphs: [blk(hub.introPara1), blk(hub.introPara2)],

    // ── Hub attributes section (shows between children grid and FAQs) ──
    hubAttributesSectionKicker: hub.hubAttrKicker,
    hubAttributesSectionTitlePlain: hub.hubAttrTitle,
    hubAttributesSectionTitleAccent: hub.hubAttrAccent,
    hubAttributesSectionDescription: hub.hubAttrDesc,
    hubAttributesSectionColumns: 4,
    hubAttributesItems: hub.hubAttrs.map((a) => ({
      _key: k(), icon: a.icon, title: a.title, desc: a.desc,
    })),

    // ── Feature grid (overview of what's in the segment) ──
    featureGridSections: [{
      _key: k(), _type: "object",
      kicker: hub.fgKicker,
      titlePlain: hub.fgTitle,
      titleAccent: hub.fgAccent,
      description: hub.fgDesc,
      columns: hub.fgFeatures.length <= 4 ? 2 : 3,
      style: "card",
      features: hub.fgFeatures.map((f) => ({
        _key: k(), icon: f.icon, title: f.title, desc: f.desc,
      })),
    }],

    // ── SEO ──
    metaTitle: `${hub.titlePlain} ${hub.titleAccent} | Healthcare Data — Lorann LLC`,
    metaDescription: hub.heroDesc.substring(0, 160),
    ogTitle: `${hub.titlePlain} ${hub.titleAccent} | Lorann LLC`,
    ogDescription: hub.heroDesc.substring(0, 200),
  };
}

// ─── MAIN ─────────────────────────────────────────────────────────
async function main() {
  console.log(DRY_RUN ? "DRY RUN\n" : "LIVE RUN\n");

  for (const hub of HUBS) {
    console.log(`\n► ${hub.titlePlain} ${hub.titleAccent}`);
    const docs = await client.fetch(`*[_type=="page" && slug.current=="${hub.slug}"]{_id}`);

    if (!docs.length) {
      console.log(`  ⚠️  Not found: ${hub.slug}`);
      continue;
    }

    const patch = buildHubPatch(hub);

    if (!DRY_RUN) {
      for (const doc of docs) {
        await client.patch(doc._id).set(patch).commit();
        console.log(`  ✓ Updated: ${doc._id.startsWith("drafts.") ? "draft" : "published"}`);
      }
    } else {
      console.log(`  → Would update ${docs.length} doc(s)`);
      console.log(`  → intro: "${hub.introHeadlinePlain} ${hub.introHeadlineAccent}"`);
      console.log(`  → hubAttrs: ${hub.hubAttrs.length} items`);
      console.log(`  → featureGrid: ${hub.fgFeatures.length} features`);
    }
  }

  console.log("\n\nDone! All 8 healthcare hub pages updated.");
}

main().catch((e) => { console.error(e); process.exit(1); });
