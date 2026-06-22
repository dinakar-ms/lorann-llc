/**
 * Seeds healthcareFeaturesSection and healthcareComplianceSection fields
 * for all healthcare pages in Sanity.
 *
 * Mirrors the hardcoded data from:
 *   components/sections/HealthcareFeaturesSection.tsx
 *   components/sections/HealthcareComplianceSection.tsx
 *
 * Usage:
 *   node scripts/seed-healthcare-sections.mjs                                        (development)
 *   $env:NEXT_PUBLIC_SANITY_DATASET="production"; node scripts/seed-healthcare-sections.mjs
 *   node scripts/seed-healthcare-sections.mjs --dry-run
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

// ─── Hero images (from HealthcareFeaturesSection.tsx HERO_IMAGES) ────────────
const HERO_IMAGES = {
  "physicians-advanced-practice":   "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80",
  "nursing-professionals":          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers":       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80",
  "health-therapy":                 "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health":       "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80",
  "dental-vision":                  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1400&q=80",
  "pharmacy-practice-management":   "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80",
  "specialty-other":                "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80",
  "physicians-advanced-practice/physicians-doctors":           "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80",
  "physicians-advanced-practice/podiatrists":                  "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1400&q=80",
  "physicians-advanced-practice/nurse-practitioners":          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
  "physicians-advanced-practice/physician-assistants":         "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80",
  "physicians-advanced-practice/medical-assistants":           "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80",
  "nursing-professionals/registered-nurses":                   "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80",
  "nursing-professionals/licensed-practical-nurses":           "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1400&q=80",
  "nursing-professionals/certified-nursing-assistants":        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
  "nursing-professionals/certified-nurse-midwives":            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/hospital-administrators":          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/ceo-cfo-healthcare":               "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/chief-medical-officers":           "https://images.unsplash.com/photo-1593073862407-a3ce22748763?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/chief-nursing-officers":           "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/chief-of-staff":                   "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=1400&q=80",
  "hospital-decision-makers/medical-directors":                "https://images.unsplash.com/photo-1477468572316-36979010099d?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/physical-therapists":                        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/occupational-therapists":                    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/speech-language-therapists":                 "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/respiratory-therapists":                     "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/massage-therapists":                         "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/emts-paramedics":                            "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/radiologic-technicians":                     "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=1400&q=80",
  "health-therapy/dieticians-nutritionists":                   "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health/psychologists":                    "https://images.unsplash.com/photo-1489533119213-66a5cd877091?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health/psychiatrists":                    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health/mental-health-counselors":         "https://images.unsplash.com/photo-1614727187346-ec3a009092b0?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health/social-workers":                   "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1400&q=80",
  "behavioral-mental-health/marriage-family-therapists":       "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=1400&q=80",
  "dental-vision/dentists":                                    "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80",
  "dental-vision/dental-hygienists":                           "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=1400&q=80",
  "dental-vision/dental-assistants":                           "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80",
  "dental-vision/optometrists":                                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=80",
  "dental-vision/opticians":                                   "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80",
  "pharmacy-practice-management/pharmacists":                  "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1400&q=80",
  "pharmacy-practice-management/physician-practice-managers":  "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1400&q=80",
  "specialty-other/chiropractors":                             "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=1400&q=80",
  "specialty-other/veterinarians":                             "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80",
  "specialty-other/allied-healthcare-professionals":           "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=80",
};

// ─── Compliance photos (from HealthcareComplianceSection.tsx COMPLIANCE_PHOTOS) ─
const COMPLIANCE_PHOTOS = {
  "physicians-advanced-practice":  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals":         "https://images.unsplash.com/photo-1580281657702-257584239a55?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers":      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=900&q=80",
  "health-therapy":                "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health":      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=900&q=80",
  "dental-vision":                 "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
  "pharmacy-practice-management":  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&w=900&q=80",
  "specialty-other":               "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?auto=format&fit=crop&w=900&q=80",
  "physicians-advanced-practice/physicians-doctors":           "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80",
  "physicians-advanced-practice/podiatrists":                  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80",
  "physicians-advanced-practice/nurse-practitioners":          "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80",
  "physicians-advanced-practice/physician-assistants":         "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=900&q=80",
  "physicians-advanced-practice/medical-assistants":           "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals/registered-nurses":                   "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals/licensed-practical-nurses":           "https://images.unsplash.com/photo-1521931961826-fe48677230a5?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals/certified-nursing-assistants":        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals/certified-nurse-midwives":            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/hospital-administrators":          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/ceo-cfo-healthcare":               "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/chief-medical-officers":           "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/chief-nursing-officers":           "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/chief-of-staff":                   "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers/medical-directors":                "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=900&q=80",
  "health-therapy/physical-therapists":                        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
  "health-therapy/occupational-therapists":                    "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=900&q=80",
  "health-therapy/speech-language-therapists":                 "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=900&q=80",
  "health-therapy/respiratory-therapists":                     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  "health-therapy/massage-therapists":                         "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
  "health-therapy/emts-paramedics":                            "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
  "health-therapy/radiologic-technicians":                     "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",
  "health-therapy/dieticians-nutritionists":                   "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health/psychologists":                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health/psychiatrists":                    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health/mental-health-counselors":         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health/social-workers":                   "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health/marriage-family-therapists":       "https://images.unsplash.com/photo-1593073862407-a3ce22748763?auto=format&fit=crop&w=900&q=80",
  "dental-vision/dentists":                                    "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&q=80",
  "dental-vision/dental-hygienists":                           "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=900&q=80",
  "dental-vision/dental-assistants":                           "https://images.unsplash.com/photo-1477468572316-36979010099d?auto=format&fit=crop&w=900&q=80",
  "dental-vision/optometrists":                                "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
  "dental-vision/opticians":                                   "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  "pharmacy-practice-management/pharmacists":                  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=900&q=80",
  "pharmacy-practice-management/physician-practice-managers":  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=900&q=80",
  "specialty-other/chiropractors":                             "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=900&q=80",
  "specialty-other/veterinarians":                             "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=900&q=80",
  "specialty-other/allied-healthcare-professionals":           "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=900&q=80",
};

// ─── Features data (mirrors DATA in HealthcareFeaturesSection.tsx) ─────────────
// Icons stored as string names matching ICON_MAP in the component
const FEATURES_DATA = {
  "physicians-advanced-practice": {
    kicker: "Precision Physician Data",
    headlinePlain: "Six capabilities that make",
    headlineAccent: "physician outreach convert.",
    cards: [
      { iconName: "ShieldCheck",       title: "NPI-Verified Records",        desc: "Every record cross-matched against the CMS NPPES registry. You reach real, licensed physicians — not stale aggregated entries." },
      { iconName: "SlidersHorizontal", title: "Specialty-Level Targeting",   desc: "Filter by taxonomy code, board certification, and subspecialty. Reach hospitalists, surgeons, and internists independently." },
      { iconName: "FileText",          title: "DEA & Prescriber Flags",      desc: "Identify active prescribers with DEA validation. Ideal for pharmaceutical sales, formulary programs, and sample distribution." },
      { iconName: "Building2",         title: "Hospital Privileges Data",    desc: "Segment physicians by admitting privileges at specific hospital systems, academic centers, or health networks." },
      { iconName: "RefreshCw",         title: "Weekly Data Hygiene",         desc: "Records refreshed weekly against national change-of-address, license, and specialty boards. Bounce rates stay under 2%." },
      { iconName: "Layers",            title: "Multi-Channel Delivery",      desc: "Email, direct mail, phone, and programmatic digital audience formats ready for activation across every marketing channel." },
    ],
  },
  "physicians-advanced-practice/physicians-doctors": {
    kicker: "Medical Physicians & Doctors",
    headlinePlain: "Reach the right physicians",
    headlineAccent: "before competitors do.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Primary Care vs. Specialist Split",  desc: "Separate PCPs from cardiologists, orthopedic surgeons, and oncologists. Board certification and taxonomy code filters make every segment distinct." },
      { iconName: "FileText",          title: "Prescribing Volume Indicators",       desc: "Physician prescribing frequency data available for pharmaceutical sales territory planning and formulary outreach prioritization." },
      { iconName: "Activity",          title: "Patient Load Data",                   desc: "High-volume practices treating 30+ patients daily are flagged for device and supply sales prioritization." },
      { iconName: "Cpu",               title: "EMR/EHR Platform Flags",              desc: "Identify physicians using Epic, Cerner, or Athenahealth for healthcare technology and integration marketing campaigns." },
      { iconName: "Award",             title: "Medical School & Years in Practice",  desc: "Academic background and years-in-practice data available for career-stage and academic-influence outreach strategies." },
      { iconName: "Building2",         title: "Office vs. Hospital Practice Split",  desc: "Separate office-based physicians from hospital-employed, academic, and large group practice settings in a single query." },
    ],
  },
  "physicians-advanced-practice/podiatrists": {
    kicker: "Podiatrist Data",
    headlinePlain: "Connect with every podiatrist",
    headlineAccent: "who drives supply decisions.",
    cards: [
      { iconName: "BadgeCheck",        title: "Specialty Certification Filters",     desc: "Distinguish podiatric surgeons from medical podiatrists. ABPS fellowship-credentialed DPMs identified as a premium sub-segment." },
      { iconName: "Activity",          title: "Surgical Volume Indicators",          desc: "High-volume surgical practices are flagged for instrumentation, wound care product, and orthotic supply outreach." },
      { iconName: "Building2",         title: "Practice Setting Segmentation",       desc: "Separate private practice podiatrists from hospital-employed, wound care clinic, and orthopedic group practice settings." },
      { iconName: "ShieldCheck",       title: "DPM License Validation",              desc: "State podiatric license status cross-validated against board registries. Active and renewal-pending records clearly flagged." },
      { iconName: "ClipboardList",     title: "Insurance Panel Participation",       desc: "Medicare and Medicaid panel status included. Identify podiatrists treating high-volume diabetic foot and wound care populations." },
      { iconName: "Layers",            title: "Equipment & Supply Affiliations",     desc: "Orthotics lab relationships and DME supplier affiliations flagged for targeted supply chain and equipment vendor outreach." },
    ],
  },
  "physicians-advanced-practice/nurse-practitioners": {
    kicker: "Nurse Practitioner Data",
    headlinePlain: "Target NPs who prescribe",
    headlineAccent: "and drive clinical decisions.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Specialty Focus Filters",             desc: "Separate family NPs from psychiatric, acute care, and women's health NPs. Each specialty is a unique, non-overlapping audience." },
      { iconName: "FileText",          title: "Prescribing Authority by State",      desc: "Full prescriptive authority, collaborative practice, and restricted-practice state flags are included per NP record." },
      { iconName: "Building2",         title: "Practice Setting Segmentation",       desc: "Distinguish NPs in primary care from urgent care, retail clinics, hospital systems, and specialty group practices." },
      { iconName: "BadgeCheck",        title: "Certification & Credential Validation", desc: "ANCC and AANP certification status validated. Board renewal dates and specialty endorsements included per record." },
      { iconName: "Users",             title: "Patient Panel Size Indicators",       desc: "High-volume NP practices with large active patient panels flagged for pharmaceutical and device representative priority outreach." },
      { iconName: "Cpu",               title: "Telehealth Provider Flags",           desc: "NPs actively providing telehealth consultations flagged for health technology and virtual care platform marketing." },
    ],
  },
  "physicians-advanced-practice/physician-assistants": {
    kicker: "Physician Assistant Data",
    headlinePlain: "PA data built for",
    headlineAccent: "specialty and surgical outreach.",
    cards: [
      { iconName: "Stethoscope",       title: "Specialty Practice Area Filters",     desc: "Reach PAs in surgery, emergency medicine, orthopedics, and primary care as distinct, validated audience sub-segments." },
      { iconName: "ShieldCheck",       title: "Surgical First-Assist Flags",         desc: "PAs credentialed as surgical first assistants identified and flagged for instrumentation and supply vendor outreach." },
      { iconName: "Building2",         title: "Supervising Physician Affiliation",   desc: "Practice group and supervising physician affiliation data available for account-based medical group targeting." },
      { iconName: "BadgeCheck",        title: "PA-C Certification Validation",       desc: "NCCPA certification status cross-validated. Re-certification cycle data available for CME and education targeting." },
      { iconName: "SlidersHorizontal", title: "Hospital vs. Clinic Setting Split",   desc: "Separate inpatient PA roles from outpatient clinic and group practice settings for channel-specific campaign delivery." },
      { iconName: "ClipboardList",     title: "State Practice Agreement Status",     desc: "Collaborative practice and supervision agreement requirements by state flagged per record for compliance-conscious outreach." },
    ],
  },
  "physicians-advanced-practice/medical-assistants": {
    kicker: "Medical Assistant Data",
    headlinePlain: "Reach clinical MAs",
    headlineAccent: "across every specialty setting.",
    cards: [
      { iconName: "BadgeCheck",        title: "Credential Type Segmentation",        desc: "Separate CMAs (AAMA), RMAs (AMT), and NHCEAs into distinct, validated credential sub-segments for targeted outreach." },
      { iconName: "Activity",          title: "Clinical vs. Administrative Role Flags", desc: "Identify MAs in clinical roles (phlebotomy, injections) vs. administrative positions for relevant supply campaign targeting." },
      { iconName: "Building2",         title: "Specialty Clinic Setting Data",       desc: "Reach MAs in dermatology, orthopedic, cardiology, and 20+ additional specialty clinic settings independently." },
      { iconName: "SlidersHorizontal", title: "Practice Size Indicators",            desc: "Solo and small-group practice MAs flagged separately from large health system and corporate clinic employees." },
      { iconName: "Cpu",               title: "EMR Proficiency Flags",               desc: "MAs trained in specific EHR platforms identified for healthcare IT and training product marketing campaigns." },
      { iconName: "Layers",            title: "Geographic Density Filters",          desc: "MA concentration by ZIP code and metro area available for regional supply rep territory planning and deployment." },
    ],
  },
  "nursing-professionals": {
    kicker: "Comprehensive Nursing Data",
    headlinePlain: "Built for every team",
    headlineAccent: "targeting nursing professionals.",
    cards: [
      { iconName: "BadgeCheck",        title: "License-Type Segmentation",   desc: "Filter by RN, LPN, CNA, CNM, NP, and twelve additional credential types. Reach the exact nursing role your campaign requires." },
      { iconName: "Building2",         title: "Unit Specialization Flags",   desc: "Identify nurses by clinical unit — ICU, ER, L&D, oncology, and pediatrics — for highly relevant outreach." },
      { iconName: "ShieldCheck",       title: "NCLEX-Validated Records",     desc: "Data cross-referenced against state nursing license databases, ensuring every record holds an active, verified credential." },
      { iconName: "SlidersHorizontal", title: "Care Setting Filters",        desc: "Distinguish acute care hospital nurses from long-term care, home health, and outpatient clinic settings in a single query." },
      { iconName: "Users",             title: "Travel Nurse Indicators",     desc: "Travel and agency nurses are flagged separately. Perfect for staffing firms targeting highly mobile clinicians." },
      { iconName: "Layers",            title: "Multi-State License Coverage", desc: "Multi-state compact license holders identified and flagged. Streamline multi-region outreach with a single, clean dataset." },
    ],
  },
  "nursing-professionals/registered-nurses": {
    kicker: "Registered Nurse Data",
    headlinePlain: "RN data engineered for",
    headlineAccent: "precision outreach at scale.",
    cards: [
      { iconName: "BadgeCheck",        title: "Clinical Unit Specialization",        desc: "Filter by ICU, ER, OR, oncology, L&D, NICU, and 30+ unit types. Reach the exact nursing specialty your product serves." },
      { iconName: "Award",             title: "BSN vs. ADN Credential Filters",      desc: "Distinguish BSN-prepared nurses from ADN-credentialed RNs for education-level and career-stage targeted messaging." },
      { iconName: "Building2",         title: "Hospital System Affiliation",         desc: "Reach RNs at specific health systems, IDN networks, or independent hospital facilities by name or region." },
      { iconName: "Users",             title: "Travel Nurse Indicators",             desc: "Travel and agency RNs flagged and segmented for staffing firms, recruiters, and continuing education providers." },
      { iconName: "Star",              title: "Magnet Hospital Designation Flags",   desc: "RNs at Magnet-designated facilities identified. Target high-acuity, evidence-based practice environments for premium messaging." },
      { iconName: "ShieldCheck",       title: "NCLEX-RN License Validation",         desc: "Active licensure verified against state boards. Lapsed, suspended, and multi-state compact holders clearly identified." },
    ],
  },
  "nursing-professionals/licensed-practical-nurses": {
    kicker: "Licensed Practical Nurse Data",
    headlinePlain: "LPN data built for",
    headlineAccent: "long-term care and clinic outreach.",
    cards: [
      { iconName: "Building2",         title: "Care Setting Segmentation",           desc: "Distinguish LPNs in long-term care, assisted living, home health, physician offices, and correctional facilities." },
      { iconName: "SlidersHorizontal", title: "State Scope-of-Practice Flags",       desc: "Medication administration and IV therapy scope vary by state — each record includes applicable state-level permission flags." },
      { iconName: "BadgeCheck",        title: "Specialty Certification Data",         desc: "Wound care, IV therapy, and gerontology specialty certifications for LPNs flagged and validated per record." },
      { iconName: "Layers",            title: "Facility Ownership Type",              desc: "Reach LPNs at for-profit chains, nonprofit SNFs, and government-run facilities as separate addressable audiences." },
      { iconName: "ShieldCheck",       title: "NCLEX-PN License Validation",          desc: "Active LPN licensure verified against all 50 state nursing boards. Renewal-pending and compact holders identified." },
      { iconName: "ClipboardList",     title: "CE & License Renewal Targeting",       desc: "LPN CEU and renewal schedules available for education providers and conference marketing campaigns." },
    ],
  },
  "nursing-professionals/certified-nursing-assistants": {
    kicker: "Certified Nursing Assistant Data",
    headlinePlain: "CNA data for",
    headlineAccent: "SNF and home health outreach.",
    cards: [
      { iconName: "Building2",         title: "Facility Type Segmentation",           desc: "Reach CNAs in SNFs, assisted living, memory care, home health agencies, and hospital settings as distinct audiences." },
      { iconName: "ShieldCheck",       title: "State Registry Validation",            desc: "CNA certifications cross-verified against state nurse aide registries. Active, lapsed, and provisional certifications coded." },
      { iconName: "BadgeCheck",        title: "Specialty Certification Flags",        desc: "CNAs holding dementia care, feeding assistant, and restorative aide certifications identified for targeted supply marketing." },
      { iconName: "Layers",            title: "Facility Size & Chain Affiliation",    desc: "Identify CNAs at large chain SNF operators vs. independent facilities for account-level territory planning." },
      { iconName: "SlidersHorizontal", title: "Geographic Concentration Data",        desc: "CNA density by ZIP code and county available for home health agency recruiting and training program marketing." },
      { iconName: "Users",             title: "Language & Bilingual Flags",           desc: "Bilingual CNA records identified where available. Useful for staffing agencies and multi-language training content marketing." },
    ],
  },
  "nursing-professionals/certified-nurse-midwives": {
    kicker: "Certified Nurse-Midwife Data",
    headlinePlain: "CNM data for precision",
    headlineAccent: "women's health outreach.",
    cards: [
      { iconName: "Building2",         title: "Practice Setting Segmentation",        desc: "Separate CNMs in hospital birth centers, freestanding birth centers, and home birth practices into distinct segments." },
      { iconName: "FileText",          title: "Prescribing Authority by State",        desc: "Full prescriptive authority, collaborative agreement, and restricted-practice designations flagged per CNM record." },
      { iconName: "Stethoscope",       title: "Collaborative Physician Affiliation",   desc: "Hospital group and OB/GYN practice affiliations included for account-based outreach to women's health networks." },
      { iconName: "BadgeCheck",        title: "AMCB Certification Validation",         desc: "Active CNM certification verified against American Midwifery Certification Board records. Renewal-pending records flagged." },
      { iconName: "Activity",          title: "Birth Volume Indicators",               desc: "High-volume birth centers with 200+ annual births identified for pharmaceutical and supply priority outreach." },
      { iconName: "Cpu",               title: "Telehealth Prenatal Provider Flags",    desc: "CNMs offering virtual prenatal consultations flagged for health technology, app, and telehealth platform outreach." },
    ],
  },
  "hospital-decision-makers": {
    kicker: "Executive Healthcare Data",
    headlinePlain: "Data engineered for",
    headlineAccent: "C-suite and director outreach.",
    cards: [
      { iconName: "Users",             title: "Title & Role Targeting",      desc: "Reach CEOs, CFOs, CMOs, CNOs, and department directors independently. Filter by decision-making authority and budget control." },
      { iconName: "Building2",         title: "Health System Affiliation",   desc: "Segment executives by IDN membership, health system size, or independent hospital classification for account-based campaigns." },
      { iconName: "SlidersHorizontal", title: "Bed Count & Facility Tier",   desc: "Filter by facility size — critical access, community, regional, or academic medical center — to match your sales territory." },
      { iconName: "Cpu",               title: "Technology Adoption Flags",   desc: "Identify facilities currently using specific EHR, HIS, or billing platforms. Refine accounts by IT infrastructure stage." },
      { iconName: "ShieldCheck",       title: "Purchasing Authority Data",   desc: "Records flagged with capital vs. operational budget ownership. Reach executives who sign contracts, not influencers alone." },
      { iconName: "RefreshCw",         title: "Quarterly Executive Updates", desc: "Hospital leadership turns over frequently. Quarterly verification cycles ensure your executive contacts remain accurate." },
    ],
  },
  "hospital-decision-makers/hospital-administrators": {
    kicker: "Hospital Administrator Data",
    headlinePlain: "Reach hospital administrators",
    headlineAccent: "who control operations and budgets.",
    cards: [
      { iconName: "Users",             title: "Administrative Role Hierarchy",         desc: "Segment administrators by VP, Director, Manager, and Coordinator levels for authority-matched outreach campaigns." },
      { iconName: "Building2",         title: "Department & Division Filters",         desc: "Reach administrators overseeing supply chain, facilities, HR, revenue cycle, and clinical operations independently." },
      { iconName: "SlidersHorizontal", title: "Health System vs. Independent",         desc: "Distinguish administrators at IDN-affiliated hospitals from independent community and critical access hospital settings." },
      { iconName: "ClipboardList",     title: "Budget Authority Indicators",           desc: "Capital budget and operational budget authority levels flagged where available for vendor prioritization." },
      { iconName: "Activity",          title: "Bed Count & Facility Classification",   desc: "Segment by facility size: critical access (< 25 beds), community (25–499 beds), and academic medical center (500+)." },
      { iconName: "Cpu",               title: "Technology Platform Data",              desc: "Current EHR, HIS, and supply chain platform usage flagged per facility for healthcare IT and SaaS outreach." },
    ],
  },
  "hospital-decision-makers/ceo-cfo-healthcare": {
    kicker: "Healthcare CEO & CFO Data",
    headlinePlain: "Data built for the",
    headlineAccent: "highest level of healthcare leadership.",
    cards: [
      { iconName: "Star",              title: "Executive Title & Authority Level",     desc: "Separate hospital CEOs from CFOs, COOs, and system-level presidents. Each title carries distinct budget and contract authority." },
      { iconName: "Building2",         title: "Health System Scale Filters",           desc: "Reach leaders of small community hospitals, regional systems, and multi-state health networks as distinct size-matched segments." },
      { iconName: "SlidersHorizontal", title: "Equity & Ownership Structure Flags",   desc: "For-profit, nonprofit, and government-owned hospital executives segmented for ownership-relevant messaging." },
      { iconName: "Award",             title: "Board & Committee Membership",          desc: "Executives with AHA, ACHE, HFMA, and state hospital association affiliations flagged for association-level targeting." },
      { iconName: "RefreshCw",         title: "Tenure & Appointment Data",             desc: "New appointments (< 2 years in role) and long-tenured executives identified. Reach leaders at their most receptive windows." },
      { iconName: "Activity",          title: "Media & Investor Relations Flags",      desc: "Executives with recent media coverage or investor relations activity flagged for high-profile account-based outreach." },
    ],
  },
  "hospital-decision-makers/chief-medical-officers": {
    kicker: "Chief Medical Officer Data",
    headlinePlain: "CMO data for clinical",
    headlineAccent: "and enterprise vendor outreach.",
    cards: [
      { iconName: "Building2",         title: "System vs. Hospital CMO Distinction",   desc: "Health system-level CMOs hold broader authority than facility CMOs — both are segmented and flagged independently." },
      { iconName: "Stethoscope",       title: "Clinical Specialty Background",          desc: "CMO specialty background (internal medicine, surgery, EM) data included for clinically relevant vendor conversations." },
      { iconName: "BadgeCheck",        title: "Board Certification Validation",         desc: "CMOs holding active clinical board certifications flagged. Relevant for pharma and device companies seeking peer-level engagement." },
      { iconName: "ShieldCheck",       title: "Quality & Accreditation Focus",          desc: "CMOs at hospitals with recent Joint Commission or CMS accreditation activity flagged for quality and compliance vendors." },
      { iconName: "Award",             title: "Graduate Medical Education Ties",        desc: "CMOs at teaching hospitals and GME-affiliated facilities flagged for medical education and residency program vendors." },
      { iconName: "FileText",          title: "Publication & Research Activity",        desc: "Clinically publishing CMOs identified for academic and clinical evidence-based marketing approaches." },
    ],
  },
  "hospital-decision-makers/chief-nursing-officers": {
    kicker: "Chief Nursing Officer Data",
    headlinePlain: "CNO data for nursing",
    headlineAccent: "workforce and quality vendors.",
    cards: [
      { iconName: "Building2",         title: "System-Level vs. Facility CNO",         desc: "CNOs overseeing nursing strategy at multi-hospital system level segmented from facility-level Chief Nursing Officers." },
      { iconName: "Star",              title: "Magnet & Excellence Program Flags",      desc: "CNOs at Magnet-designated and Pathway to Excellence hospitals flagged for nursing practice and quality product vendors." },
      { iconName: "Award",             title: "ANCC & AONL Affiliation Flags",          desc: "CNOs with American Nurses Credentialing Center and AONL membership and leadership roles identified." },
      { iconName: "Users",             title: "Nursing Workforce Ratios",               desc: "Facilities with high travel nurse dependency and critical vacancy rates flagged for staffing and workforce solution outreach." },
      { iconName: "ClipboardList",     title: "Graduate Nursing Education Background",  desc: "CNOs with DNP or PhD credentials identified for clinical decision-support and advanced nursing education marketing." },
      { iconName: "Layers",            title: "Board & Committee Roles",                desc: "CNOs serving on state nursing boards, ethics committees, or hospital governance bodies flagged for leadership-level engagement." },
    ],
  },
  "hospital-decision-makers/chief-of-staff": {
    kicker: "Hospital Chief of Staff Data",
    headlinePlain: "Chief of Staff data for",
    headlineAccent: "credentialing and vendor outreach.",
    cards: [
      { iconName: "Stethoscope",       title: "Specialty Background Filters",          desc: "Chiefs of Staff with surgical, medical, or emergency medicine backgrounds identified for specialty-relevant vendor outreach." },
      { iconName: "ShieldCheck",       title: "Credentialing Committee Authority",      desc: "Chiefs of Staff with credentialing committee authority flagged — key decision-makers for medical staff technology." },
      { iconName: "Building2",         title: "Academic vs. Community Hospital",        desc: "Academic medical center Chiefs of Staff segmented from community hospital peers — engagement approach differs significantly." },
      { iconName: "Award",             title: "Medical Staff Organization Role",        desc: "Chiefs serving on joint medical staff committees or regional medical staff leadership organizations identified." },
      { iconName: "BadgeCheck",        title: "Board Certification Status",             desc: "Active board certifications and specialty credentials for Chiefs of Staff validated and included in every record." },
      { iconName: "ClipboardList",     title: "Quality Reporting Oversight",            desc: "Chiefs at hospitals with active CMS quality improvement programs or Patient Safety Organizations flagged." },
    ],
  },
  "hospital-decision-makers/medical-directors": {
    kicker: "Medical Director Data",
    headlinePlain: "Medical Director data",
    headlineAccent: "by department and specialty.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Specialty & Departmental Scope",        desc: "Reach Medical Directors by department — radiology, emergency, anesthesiology, and 20+ additional clinical service lines." },
      { iconName: "Building2",         title: "Administrative vs. Clinical Focus",      desc: "Distinguish Medical Directors in administrative leadership roles from those in primarily clinical director roles." },
      { iconName: "Users",             title: "Physician Group Affiliation",            desc: "Medical Directors at large multispecialty groups, hospital-employed groups, and IPAs segmented separately." },
      { iconName: "ShieldCheck",       title: "Quality & Safety Program Oversight",     desc: "Medical Directors with quality metrics and patient safety program oversight flagged for quality software vendors." },
      { iconName: "Award",             title: "Academic Appointment Data",              desc: "Medical Directors with concurrent academic appointments at medical schools or residency programs identified." },
      { iconName: "Cpu",               title: "Telemedicine Program Direction",         desc: "Medical Directors overseeing virtual care programs flagged for telehealth technology and remote monitoring vendors." },
    ],
  },
  "health-therapy": {
    kicker: "Allied & Therapy Professionals Data",
    headlinePlain: "Reach therapists who",
    headlineAccent: "specify, prescribe, and refer.",
    cards: [
      { iconName: "Stethoscope",       title: "Therapy Type Segmentation",   desc: "Filter by PT, OT, SLP, RT, MT, and nine additional therapy disciplines. Each segment delivers a unique, non-overlapping audience." },
      { iconName: "Building2",         title: "Practice Setting Filters",    desc: "Separate hospital-based therapists from outpatient clinics, skilled nursing facilities, home health agencies, and private practices." },
      { iconName: "BadgeCheck",        title: "Licensure & Cert Validation", desc: "License status cross-validated against state therapy boards. Active, lapsed, and renewal-pending records are clearly coded." },
      { iconName: "SlidersHorizontal", title: "Patient Volume Indicators",   desc: "Identify high-volume practices treating 30+ patients per week. Target the therapists most likely to specify your product." },
      { iconName: "FileText",          title: "Referral Network Mapping",    desc: "Records include primary referral sources and payor mix data, helping you align outreach with the full therapy care chain." },
      { iconName: "Layers",            title: "CE & Certification Targeting", desc: "Flag therapists approaching license renewal periods. Market continuing education courses to the highest-intent audience." },
    ],
  },
  "health-therapy/physical-therapists": {
    kicker: "Physical Therapist Data",
    headlinePlain: "PT data that reaches",
    headlineAccent: "every specialty and practice setting.",
    cards: [
      { iconName: "Activity",          title: "Specialty Practice Focus",              desc: "Distinguish orthopedic PTs from neurological, pediatric, sports, and cardiovascular specialists. Each segment is non-overlapping." },
      { iconName: "Building2",         title: "Practice Setting Filters",              desc: "Separate outpatient clinic, acute care hospital, SNF, home health, and private practice PTs into distinct audiences." },
      { iconName: "BadgeCheck",        title: "APTA & ABPTS Certification Flags",      desc: "Board-certified Clinical Specialists (OCS, NCS, PCS, SCS) validated against ABPTS records as a premium PT segment." },
      { iconName: "SlidersHorizontal", title: "Patient Volume Indicators",             desc: "High-volume PT clinics treating 25+ patients daily flagged for supply, equipment, and EMR vendor priority targeting." },
      { iconName: "Star",              title: "Dry Needling & Technique Flags",        desc: "PTs certified in dry needling, aquatic therapy, and manual therapy techniques identified for specialized product outreach." },
      { iconName: "Cpu",               title: "Telehealth PT Providers",               desc: "PTs offering virtual physical therapy flagged for digital health platform and remote exercise technology marketing." },
    ],
  },
  "health-therapy/occupational-therapists": {
    kicker: "Occupational Therapist Data",
    headlinePlain: "OT data for adaptive",
    headlineAccent: "equipment and CE outreach.",
    cards: [
      { iconName: "Building2",         title: "Practice Setting Segmentation",         desc: "Separate OTs in school districts, acute care, outpatient, SNF, hand therapy clinics, and mental health settings." },
      { iconName: "BadgeCheck",        title: "NBCOT Certification Validation",        desc: "OTR/L and COTA certification status verified against NBCOT records. Lapsed and renewal-pending credentials clearly coded." },
      { iconName: "Award",             title: "Specialty Certification Flags",         desc: "OTs with BCPR, CHT, and other specialty certifications validated for the highest-credentialed OT segment." },
      { iconName: "SlidersHorizontal", title: "Pediatric vs. Geriatric Population",    desc: "OTs treating pediatric populations segmented from adult and geriatric-focused practitioners for product alignment." },
      { iconName: "ClipboardList",     title: "Adaptive Equipment Prescribers",        desc: "OTs who regularly prescribe adaptive equipment and AT devices flagged for DME and assistive technology vendors." },
      { iconName: "Star",              title: "Hand Therapy Specialist Flags",         desc: "Certified Hand Therapists (CHT) segmented as a standalone, high-value audience for splinting and orthotic supply." },
    ],
  },
  "health-therapy/speech-language-therapists": {
    kicker: "Speech-Language Pathologist Data",
    headlinePlain: "SLP data for AAC,",
    headlineAccent: "dysphagia, and CE outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Specialty Focus Segmentation",          desc: "Reach SLPs specializing in dysphagia, AAC, pediatric language, voice disorders, and fluency as distinct clinical sub-audiences." },
      { iconName: "Building2",         title: "Practice Setting Filters",              desc: "Distinguish school-based SLPs from acute care, outpatient, SNF, private practice, and early intervention program settings." },
      { iconName: "BadgeCheck",        title: "ASHA CCC Certification Validation",     desc: "CCC-SLP certification status verified against ASHA records. Clinical Fellows and associate-level SLPs also flagged." },
      { iconName: "Users",             title: "Pediatric vs. Adult Population Focus",   desc: "SLPs with primarily pediatric caseloads segmented from adult neurological rehab and geriatric swallowing disorder specialists." },
      { iconName: "Cpu",               title: "AAC Device & Technology Prescribers",   desc: "SLPs certified in AAC device prescription flagged for assistive technology vendor targeting." },
      { iconName: "Activity",          title: "Telepractice Provider Flags",           desc: "SLPs actively delivering services via telepractice platforms flagged for telehealth software and remote therapy tool vendors." },
    ],
  },
  "health-therapy/respiratory-therapists": {
    kicker: "Respiratory Therapist Data",
    headlinePlain: "RT data for ventilator",
    headlineAccent: "and pulmonary care outreach.",
    cards: [
      { iconName: "Building2",         title: "Setting & Acuity Level Segmentation",   desc: "Separate critical care RTs in ICU/NICU from home care, pulmonary rehab, and sleep lab respiratory therapist segments." },
      { iconName: "SlidersHorizontal", title: "Credential Level Filters",              desc: "Distinguish Registered Respiratory Therapists (RRT) from Certified Respiratory Therapists (CRT) by scope and autonomy." },
      { iconName: "BadgeCheck",        title: "NBRC Certification Validation",         desc: "RRT, RPSGT, and specialty credential status verified against NBRC records. Renewal-pending records flagged per state." },
      { iconName: "Activity",          title: "Advanced Ventilator Competency Flags",  desc: "RTs with advanced ventilator, ECMO, and oscillator competency documented for high-acuity equipment vendors." },
      { iconName: "Star",              title: "Sleep Disorder & RPSGT Flags",          desc: "RTs working in sleep labs or holding RPSGT credentials segmented for CPAP, PAP device, and sleep technology vendors." },
      { iconName: "Layers",            title: "Home Respiratory Care Providers",       desc: "RTs working in home health or DME environments flagged for home oxygen, portable ventilator, and nebulizer supply outreach." },
    ],
  },
  "health-therapy/massage-therapists": {
    kicker: "Massage Therapist Data",
    headlinePlain: "LMT data for supply",
    headlineAccent: "and practice management outreach.",
    cards: [
      { iconName: "Award",             title: "Specialty Technique Certification",     desc: "Distinguish LMTs certified in deep tissue, sports, lymphatic drainage, prenatal, and medical massage as separate segments." },
      { iconName: "Building2",         title: "Practice Setting Filters",              desc: "Separate LMTs in clinical/chiropractic co-located practices from spa, resort, sports medicine, and independent settings." },
      { iconName: "ShieldCheck",       title: "NCBTMB & State License Validation",     desc: "Licensing verified against NCBTMB and all 50 state massage licensing boards where licensure is required." },
      { iconName: "Activity",          title: "High-Volume Practice Indicators",       desc: "LMTs with high appointment volume (20+ weekly sessions) flagged for massage table, supply, and practice management vendors." },
      { iconName: "ClipboardList",     title: "Insurance-Billing Eligible Therapists", desc: "LMTs in states where massage is covered under health plans or FSA/HSA flagged for billing and insurance marketing." },
      { iconName: "RefreshCw",         title: "CE Renewal Targeting",                  desc: "LMTs approaching CE renewal periods identified for CE provider, advanced technique, and certification marketing." },
    ],
  },
  "health-therapy/emts-paramedics": {
    kicker: "EMT & Paramedic Data",
    headlinePlain: "EMS data for equipment",
    headlineAccent: "and certification outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Certification Level Segmentation",      desc: "Separate EMT-Basic, AEMT, and Paramedic credentials into distinct audiences. Each level carries different product relevance." },
      { iconName: "Building2",         title: "Employment Setting Filters",            desc: "Reach EMTs in municipal EMS agencies, fire departments, hospital-based EMS, private ambulance, and air medical settings." },
      { iconName: "ShieldCheck",       title: "NREMT Certification Validation",         desc: "National Registry certification status verified. State-level licensure and reciprocity status flagged where available." },
      { iconName: "Star",              title: "Critical Care & Flight Paramedicine",    desc: "CCPs and flight paramedics with FP-C or CCEMTP credentials segmented for advanced monitoring and medication vendors." },
      { iconName: "Layers",            title: "Urban vs. Rural Agency Segmentation",   desc: "High-call-volume urban EMS agencies segmented from rural and volunteer departments for equipment tier targeting." },
      { iconName: "BadgeCheck",        title: "BLS & ACLS Instructor Flags",           desc: "EMTs certified as AHA BLS or ACLS instructors identified for training equipment and simulation product marketing." },
    ],
  },
  "health-therapy/radiologic-technicians": {
    kicker: "Radiologic Technician Data",
    headlinePlain: "Rad tech data by modality",
    headlineAccent: "and certification level.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Modality Certification Segmentation",   desc: "Separate radiographers, CT techs, MRI techs, mammographers, nuclear med, and sonographers by ARRT certification." },
      { iconName: "Building2",         title: "Practice Setting Filters",              desc: "Reach rad techs in hospital imaging, outpatient imaging centers, urgent care, and mobile imaging units as distinct segments." },
      { iconName: "BadgeCheck",        title: "ARRT Certification Validation",         desc: "Active registration verified against ARRT records. Post-primary certification specialties (CT, MRI, mammography) flagged per record." },
      { iconName: "Cpu",               title: "Advanced Modality Flags",               desc: "Techs holding CT and MRI post-primary certifications segmented for advanced equipment, contrast, and PACS technology vendors." },
      { iconName: "Star",              title: "Breast Imaging Specialist Flags",       desc: "ARRT-certified mammographers and tomosynthesis-trained techs identified for breast imaging equipment and AI tool marketing." },
      { iconName: "Activity",          title: "Teleradiology Support Flags",           desc: "Rad techs supporting remote reading and teleradiology operations flagged for PACS, worklist management, and connectivity vendors." },
    ],
  },
  "health-therapy/dieticians-nutritionists": {
    kicker: "Dietitian & Nutritionist Data",
    headlinePlain: "RD data for clinical",
    headlineAccent: "nutrition and wellness outreach.",
    cards: [
      { iconName: "BadgeCheck",        title: "RD vs. DTR Credential Segmentation",    desc: "Separate Registered Dietitians (RDN) from Dietetic Technicians Registered (DTR) and unlicensed nutritionists by state." },
      { iconName: "Building2",         title: "Practice Setting Filters",              desc: "Reach RDs in clinical, outpatient counseling, public health, sports nutrition, corporate wellness, and private practice." },
      { iconName: "ShieldCheck",       title: "CDR Credential Validation",             desc: "Active RDN registration verified against Commission on Dietetic Registration records. Specialization endorsements included." },
      { iconName: "Award",             title: "Specialty Certification Flags",         desc: "Board Certified Specialists in Sports Dietetics (CSSD), Oncology (CSO), Pediatric (CSP), and Renal (CSR) flagged." },
      { iconName: "SlidersHorizontal", title: "Clinical vs. Community Nutrition",      desc: "RDs in medical nutrition therapy roles segmented from community, school, and public health nutrition program positions." },
      { iconName: "Cpu",               title: "Telehealth Nutrition Counseling Flags", desc: "RDs providing virtual medical nutrition therapy flagged for telehealth, billing software, and meal-planning tool vendors." },
    ],
  },
  "behavioral-mental-health": {
    kicker: "Behavioral Health Professional Data",
    headlinePlain: "Data built for the fast-growing",
    headlineAccent: "behavioral health market.",
    cards: [
      { iconName: "Brain",             title: "Credential-Level Filtering",  desc: "Reach PhDs, LCSWs, LMFTs, LPCs, and psychiatrists as separate audiences. Each carries distinct prescribing and referral authority." },
      { iconName: "Building2",         title: "Practice Setting Segmentation", desc: "Distinguish private practices from community mental health centers, inpatient psychiatric units, and substance use facilities." },
      { iconName: "Heart",             title: "Patient Population Flags",    desc: "Identify clinicians treating adult, pediatric, geriatric, or dual-diagnosis populations for maximally relevant outreach." },
      { iconName: "Cpu",               title: "Telehealth Availability Flags", desc: "Clinicians actively providing telehealth services are flagged. Reach virtual care providers for platform and technology marketing." },
      { iconName: "ShieldCheck",       title: "Insurance Panel Participation", desc: "Data includes payor panel participation indicators. Identify clinicians accepting new patients and specific insurance networks." },
      { iconName: "RefreshCw",         title: "Monthly License Verification", desc: "Behavioral health license status changes frequently. Monthly verification ensures your outreach list stays compliant." },
    ],
  },
  "behavioral-mental-health/psychologists": {
    kicker: "Psychologist Data",
    headlinePlain: "PhD and PsyD data for",
    headlineAccent: "assessment and practice outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "License Type & Degree Segmentation",   desc: "Separate licensed psychologists (PhD, PsyD, EdD) from psychological associates and pre-licensed fellows by credential." },
      { iconName: "Brain",             title: "Specialty Practice Area Filters",       desc: "Reach neuropsychologists, clinical psychologists, forensic psychologists, and school psychologists as distinct sub-audiences." },
      { iconName: "ShieldCheck",       title: "State Licensing Board Validation",      desc: "Licensure cross-validated against all 50 state psychology boards. Active, inactive, and license-pending records clearly coded." },
      { iconName: "Award",             title: "APA Membership & Division Affiliation", desc: "APA member psychologists and those affiliated with specific APA divisions flagged for targeted professional messaging." },
      { iconName: "ClipboardList",     title: "Assessment & Testing Specialization",   desc: "Psychologists primarily conducting neuropsychological assessments flagged for test publisher and scoring software outreach." },
      { iconName: "Cpu",               title: "Telehealth Provider Flags",             desc: "Licensed psychologists delivering therapy via telehealth platforms flagged for virtual care technology and billing software." },
    ],
  },
  "behavioral-mental-health/psychiatrists": {
    kicker: "Psychiatrist Data",
    headlinePlain: "Psychiatrist data for",
    headlineAccent: "pharmaceutical and clinical outreach.",
    cards: [
      { iconName: "Building2",         title: "Practice Setting Segmentation",         desc: "Separate inpatient, outpatient, community mental health, VA, and forensic psychiatrists into distinct validated segments." },
      { iconName: "SlidersHorizontal", title: "Subspecialty Certification Flags",      desc: "Board-certified child/adolescent, geriatric, forensic, addiction, and consultation-liaison psychiatrists identified." },
      { iconName: "FileText",          title: "DEA Schedule II Prescribing Authority",  desc: "Active DEA registration for Schedule II controlled substance prescribing validated for pharmaceutical outreach." },
      { iconName: "Award",             title: "Academic & Research Appointment Data",   desc: "Psychiatrists with medical school faculty or clinical research investigator roles flagged for pharma MSL marketing." },
      { iconName: "Brain",             title: "Therapy vs. Medication Management Focus", desc: "Psychiatrists in primarily medication management practices segmented from those offering integrated psychotherapy." },
      { iconName: "BadgeCheck",        title: "ABPN Certification Validation",          desc: "American Board of Psychiatry and Neurology certification verified. MOC cycle data available for CME targeting." },
    ],
  },
  "behavioral-mental-health/mental-health-counselors": {
    kicker: "Mental Health Counselor Data",
    headlinePlain: "LPC and LMHC data for",
    headlineAccent: "practice and technology outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "License Type Segmentation",             desc: "Separate LPCs, LMHCs, LADCs, and LCPCs by state-specific designation. Each maps to distinct scope and population focus." },
      { iconName: "Heart",             title: "Specialty Population Focus",             desc: "Reach counselors specializing in addiction, trauma, grief, eating disorders, and LGBTQ+-affirming practices as distinct sub-audiences." },
      { iconName: "ShieldCheck",       title: "State Licensure Board Validation",       desc: "Mental health counselor license status cross-validated against applicable state boards. Supervised hours status included." },
      { iconName: "Building2",         title: "Private Practice vs. Agency Setting",    desc: "Distinguish independently practicing LMHCs from agency-employed counselors in community and outpatient clinic settings." },
      { iconName: "ClipboardList",     title: "Insurance Panel & Credentialing Status", desc: "Counselors accepted on major insurance panels flagged. Ideal for EHR, billing, and practice management software marketing." },
      { iconName: "Cpu",               title: "Telehealth Counseling Providers",        desc: "LPCs and LMHCs actively providing virtual counseling flagged for telehealth, scheduling, and mental health app outreach." },
    ],
  },
  "behavioral-mental-health/social-workers": {
    kicker: "Social Worker Data",
    headlinePlain: "LCSW data for clinical",
    headlineAccent: "and community outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "License Level Segmentation",            desc: "Separate LSWs, LCSWs, LMSWs, and macro social workers by license designation for relevant outreach alignment." },
      { iconName: "Building2",         title: "Practice Setting Filters",               desc: "Reach social workers in hospitals, school districts, child welfare, corrections, hospice, and private practice." },
      { iconName: "ShieldCheck",       title: "NASW & ASWB Credential Validation",     desc: "ASWB exam passage and state-level social work license status verified. NASW membership and specialty credentials flagged." },
      { iconName: "Heart",             title: "Clinical vs. Case Management Focus",     desc: "Licensed clinical social workers in therapy roles segmented from case managers and community organizers." },
      { iconName: "Stethoscope",       title: "Healthcare & Medical Social Work",        desc: "Hospital-based and medical social workers flagged separately for care transitions and discharge planning vendor outreach." },
      { iconName: "Users",             title: "Hospice & Palliative Care Flags",        desc: "Social workers at hospice organizations and palliative care programs identified for end-of-life care product marketing." },
    ],
  },
  "behavioral-mental-health/marriage-family-therapists": {
    kicker: "Marriage & Family Therapist Data",
    headlinePlain: "LMFT data for practice",
    headlineAccent: "and continuing education outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "License Type by State",                  desc: "Distinguish LMFTs, MFCs, and MFTs by state designation. Practice scope and supervision requirements vary by jurisdiction." },
      { iconName: "Heart",             title: "Specialty Population Focus",              desc: "Reach therapists specializing in couples counseling, family systems, child/adolescent, and premarital therapy as distinct segments." },
      { iconName: "Award",             title: "AAMFT Membership & Approved Supervisor",  desc: "AAMFT members and approved supervisors identified for training, CE, and clinical supervision software targeting." },
      { iconName: "ShieldCheck",       title: "State Licensure Board Validation",        desc: "LMFT license status cross-validated per state. Supervised hours, associate license, and renewal cycle data included." },
      { iconName: "Building2",         title: "Private Practice vs. Agency Setting",     desc: "Independently practicing LMFTs segmented from agency-employed therapists in community, school, and hospital-affiliated roles." },
      { iconName: "ClipboardList",     title: "Insurance Panel Participation Flags",     desc: "LMFTs accepted on major insurance panels identified for billing, credentialing, and practice management software outreach." },
    ],
  },
  "dental-vision": {
    kicker: "Dental & Vision Professional Data",
    headlinePlain: "Reach every dental and vision",
    headlineAccent: "professional with precision.",
    cards: [
      { iconName: "Smile",             title: "Specialty & Subspecialty Filters", desc: "Segment general dentists from orthodontists, periodontists, endodontists, and oral surgeons. Vision data covers ODs and ophthalmologists." },
      { iconName: "Building2",         title: "Practice Model Identification", desc: "Distinguish solo practitioners, group practices, and DSO-affiliated offices. Target ownership type for relevant business messaging." },
      { iconName: "SlidersHorizontal", title: "Equipment Make & Vintage",    desc: "Practices flagged by primary X-ray, CAD/CAM, and laser equipment. Identify the best prospects for capital equipment sales." },
      { iconName: "BadgeCheck",        title: "Credentialing & Board Status", desc: "ADA and AOA board status validated against current membership rolls. Active and specialty-certified records clearly identified." },
      { iconName: "FileText",          title: "Lab & Supply Affiliation Data", desc: "Dental lab relationships and primary supply distributor affiliations included. Target the full dental supply chain efficiently." },
      { iconName: "Layers",            title: "Multi-Channel Activation",    desc: "Email, direct mail, and programmatic display audiences available. Reach dental decision-makers across every marketing channel." },
    ],
  },
  "dental-vision/dentists": {
    kicker: "General & Specialty Dentist Data",
    headlinePlain: "Dentist data for supply",
    headlineAccent: "equipment and drug outreach.",
    cards: [
      { iconName: "Smile",             title: "General vs. Specialty Designation",      desc: "Separate general dentists from periodontists, endodontists, oral surgeons, orthodontists, and prosthodontists in a single query." },
      { iconName: "Award",             title: "ADA Membership & Dental School Flags",   desc: "ADA member dentists identified and flagged. Dental school graduation year available for career-stage outreach." },
      { iconName: "Building2",         title: "Solo vs. DSO Practice Identification",   desc: "Independent solo practitioners segmented from DSO-affiliated, group practice, and multi-location dental office settings." },
      { iconName: "Cpu",               title: "Equipment Make & Vintage Data",          desc: "CBCT, CAD/CAM, laser, and digital X-ray equipment make and installation year flagged for capital equipment vendors." },
      { iconName: "ClipboardList",     title: "Insurance & Fee-for-Service Mix",        desc: "Dentists by primary payor mix — heavy insurance, fee-for-service, and Medicaid — for relevant financial product targeting." },
      { iconName: "FileText",          title: "DEA Registration & Sedation Permits",    desc: "Dentists with IV sedation and oral conscious sedation permits flagged for anesthesia supply and monitoring vendors." },
    ],
  },
  "dental-vision/dental-hygienists": {
    kicker: "Dental Hygienist Data",
    headlinePlain: "Hygienist data for",
    headlineAccent: "instrument and CE outreach.",
    cards: [
      { iconName: "Building2",         title: "Work Setting Segmentation",              desc: "Reach hygienists in solo dental offices, DSO chains, periodontal offices, community health clinics, and school programs." },
      { iconName: "Award",             title: "Extended Function & Expanded Duties",     desc: "Dental hygienists with EFDA or EDHA credentials flagged by state for expanded-function product marketing." },
      { iconName: "BadgeCheck",        title: "ADHA Membership & Specialty Flags",      desc: "ADHA members and locally anesthesia-certified hygienists identified for professional association and CE product targeting." },
      { iconName: "ShieldCheck",       title: "Direct Access State Flags",              desc: "Hygienists practicing under direct access laws flagged for public health and community outreach campaigns." },
      { iconName: "SlidersHorizontal", title: "Periodontal & Specialty Clinic Focus",   desc: "Hygienists primarily in periodontal, implant, and specialty dental offices flagged for relevant instrument and product outreach." },
      { iconName: "RefreshCw",         title: "CE & License Renewal Targeting",         desc: "Hygienists approaching state CE requirement cycles identified for CE provider, webinar, and conference marketing." },
    ],
  },
  "dental-vision/dental-assistants": {
    kicker: "Dental Assistant Data",
    headlinePlain: "DA data for supply",
    headlineAccent: "and training product outreach.",
    cards: [
      { iconName: "BadgeCheck",        title: "Credential Level Segmentation",          desc: "Separate CDAs (DANB-certified), RDAs (state-registered), and non-certified dental assistants by credential level." },
      { iconName: "Building2",         title: "Specialty Office Setting Flags",         desc: "Dental assistants in orthodontic, oral surgery, periodontic, and pediatric practices segmented from general dentistry settings." },
      { iconName: "Award",             title: "Expanded Function Credential Flags",      desc: "EFDAs with coronal polishing, sealant application, and impression-taking authorizations flagged by state." },
      { iconName: "ShieldCheck",       title: "DANB Certification Validation",           desc: "CDA, COA, CPFDA, and CRFDA certification status cross-validated against DANB records where available." },
      { iconName: "SlidersHorizontal", title: "DSO vs. Independent Practice",           desc: "Dental assistants in large DSO chains segmented from small and independent dental office settings." },
      { iconName: "Cpu",               title: "Radiology Operator Authorization",        desc: "Dental assistants with state dental radiography operator permits flagged for X-ray equipment and sensor vendors." },
    ],
  },
  "dental-vision/optometrists": {
    kicker: "Optometrist Data",
    headlinePlain: "OD data for lens",
    headlineAccent: "pharmaceutical and device outreach.",
    cards: [
      { iconName: "Eye",               title: "Therapeutic vs. Diagnostic Scope",       desc: "ODs with therapeutic prescribing authority for medications segmented from diagnostic-only scope practitioners." },
      { iconName: "BadgeCheck",        title: "Specialty Certification Flags",          desc: "Contact lens specialists, low vision specialists, and pediatric optometry certificate holders identified and flagged." },
      { iconName: "Award",             title: "AOA Membership & Accreditation Data",    desc: "AOA member optometrists and ACOE school graduates flagged for association-adjacent pharmaceutical and supply outreach." },
      { iconName: "Building2",         title: "Solo vs. Corporate Practice",            desc: "Independent ODs segmented from franchise-setting and retail-optical-setting-employed optometrists." },
      { iconName: "SlidersHorizontal", title: "High-Volume Contact Lens Practice",      desc: "Optometrists fitting 20+ new contact lens patients weekly flagged for CL manufacturer and solution supply targeting." },
      { iconName: "Stethoscope",       title: "Ocular Disease Management Focus",        desc: "ODs with glaucoma, dry eye, and diabetic retinopathy co-management protocols flagged for pharmaceutical and device vendors." },
    ],
  },
  "dental-vision/opticians": {
    kicker: "Optician Data",
    headlinePlain: "Optician data for frame",
    headlineAccent: "lab and optical supply outreach.",
    cards: [
      { iconName: "BadgeCheck",        title: "License Level & ABO Certification",      desc: "ABO-certified opticians identified and segmented from non-licensed dispensers. State-level licensing status included." },
      { iconName: "Building2",         title: "Practice Setting Segmentation",          desc: "Reach opticians in independent optical shops, ophthalmology offices, OD practices, retail chains, and hospital dispensaries." },
      { iconName: "Award",             title: "NCLE Certification for Contact Lens Fitting", desc: "Opticians holding National Contact Lens Examiners certification flagged for contact lens supply and fitting tool vendors." },
      { iconName: "Layers",            title: "Frame & Lens Lab Supplier Affiliations", desc: "Optician primary frame brand and lens lab supplier relationships flagged for optical wholesale vendor outreach." },
      { iconName: "RefreshCw",         title: "ABO Recertification Targeting",          desc: "Opticians approaching ABO recertification periods identified for CE provider and exam preparation product marketing." },
      { iconName: "SlidersHorizontal", title: "Independent vs. Chain Setting",          desc: "Independent optical shop dispensers segmented from retail-chain-employed opticians for relevant business messaging." },
    ],
  },
  "pharmacy-practice-management": {
    kicker: "Pharmacy Professional Data",
    headlinePlain: "Target pharmacists and managers",
    headlineAccent: "who drive drug and supply decisions.",
    cards: [
      { iconName: "Pill",              title: "Practice Setting Segmentation", desc: "Separate retail chain, independent, hospital, compounding, and mail-order pharmacists into distinct, non-overlapping segments." },
      { iconName: "FileText",          title: "DEA Schedule Authorizations",  desc: "Identify pharmacists and pharmacies licensed to dispense Schedule II–V controlled substances for compliant targeted outreach." },
      { iconName: "SlidersHorizontal", title: "Chain vs. Independent Flags",  desc: "Independent pharmacy owners flagged separately from chain-employed pharmacists. Reach the right decision-maker for every deal." },
      { iconName: "Building2",         title: "PBM Affiliation Data",         desc: "Pharmacy Benefit Manager contract affiliations identified. Ideal for PBMs recruiting network pharmacies or negotiating contracts." },
      { iconName: "BadgeCheck",        title: "Technician Ratio Indicators",  desc: "High-volume dispensing pharmacies flagged by technician-to-pharmacist ratio. Target the busiest locations for supply outreach." },
      { iconName: "RefreshCw",         title: "Biannual License Verification", desc: "State pharmacy board license status verified biannually. Lapsed, suspended, and renewal-pending records removed automatically." },
    ],
  },
  "pharmacy-practice-management/pharmacists": {
    kicker: "Pharmacist Data",
    headlinePlain: "Pharmacist data for drug",
    headlineAccent: "PBM and supply outreach.",
    cards: [
      { iconName: "Building2",         title: "Practice Setting Segmentation",          desc: "Separate retail, independent, hospital, compounding, clinical, and mail-order pharmacists into distinct validated audiences." },
      { iconName: "FileText",          title: "DEA Registration & Schedule Authority",  desc: "Pharmacists licensed for Schedule II–V dispensing validated. Controlled substance specialty pharmacy flags included." },
      { iconName: "Award",             title: "BPharm vs. PharmD Degree Distinction",   desc: "Doctor of Pharmacy (PharmD) graduates segmented from Bachelor of Pharmacy degree holders for education-tier messaging." },
      { iconName: "BadgeCheck",        title: "BCPS & Specialty Board Certification",   desc: "Board Certified Pharmacotherapy Specialists (BCPS) and BPS specialty pharmacists flagged for advanced clinical targeting." },
      { iconName: "ShieldCheck",       title: "State Pharmacy Board License Validation", desc: "Active pharmacist licensure verified against state boards biannually. Suspended and renewal-pending status coded." },
      { iconName: "Cpu",               title: "CDTM & MTM Authority",                   desc: "Pharmacists in states with Collaborative Drug Therapy Management agreements and MTM provider credentials flagged." },
    ],
  },
  "pharmacy-practice-management/physician-practice-managers": {
    kicker: "Physician Practice Manager Data",
    headlinePlain: "Practice manager data for",
    headlineAccent: "EHR supply and operations outreach.",
    cards: [
      { iconName: "Building2",         title: "Practice Size & Specialty Filters",      desc: "Reach practice managers by clinic size (solo, small group, large multispecialty) and primary physician specialty type." },
      { iconName: "Users",             title: "Administrative Title Segmentation",       desc: "Distinguish Practice Administrators, Office Managers, Revenue Cycle Directors, and Operations Directors by authority level." },
      { iconName: "Cpu",               title: "EHR & Practice Management Platform Flags", desc: "Current EHR and PM software in use at the practice flagged. Ideal for software vendor competitive displacement campaigns." },
      { iconName: "FileText",          title: "Billing & Revenue Cycle Authority",       desc: "Practice managers with coding, billing, and AR oversight authority segmented for revenue cycle and billing software vendors." },
      { iconName: "Layers",            title: "Multi-Site & Health System Affiliation",  desc: "Practice managers overseeing multiple clinic locations or health-system-aligned medical groups flagged for enterprise targeting." },
      { iconName: "ClipboardList",     title: "Procurement & Supply Chain Role",         desc: "Practice managers with purchasing authority for supplies and equipment identified for B2B vendor priority outreach." },
    ],
  },
  "specialty-other": {
    kicker: "Specialty Healthcare Professional Data",
    headlinePlain: "Niche professional data that",
    headlineAccent: "generalist lists can never match.",
    cards: [
      { iconName: "PawPrint",          title: "Veterinary Specialty Targeting", desc: "Segment DVMs by species focus — small animal, equine, food animal, and exotic — for highly targeted supply and drug outreach." },
      { iconName: "ShieldCheck",       title: "Chiropractic License Validation", desc: "DC license status cross-matched against state chiropractic boards. Board certification and technique specialization data included." },
      { iconName: "SlidersHorizontal", title: "Allied Health Credential Filters", desc: "Radiologic technicians, dieticians, EMTs, and 14 additional allied disciplines available as standalone, validated audience segments." },
      { iconName: "Building2",         title: "Clinic vs. Hospital Setting",  desc: "Identify specialty practitioners in private clinic, hospital-employed, and academic medical center settings for relevant messaging." },
      { iconName: "BadgeCheck",        title: "Board Certification Flags",    desc: "Specialty board certifications validated and flagged. Reach AVMA, ACA, and ASCP board-certified professionals with confidence." },
      { iconName: "Layers",            title: "Multi-Channel Delivery Ready", desc: "Every specialty dataset delivered in email, postal, phone, and digital activation formats for omnichannel campaign flexibility." },
    ],
  },
  "specialty-other/chiropractors": {
    kicker: "Chiropractor Data",
    headlinePlain: "DC data for technique",
    headlineAccent: "and equipment-specific outreach.",
    cards: [
      { iconName: "SlidersHorizontal", title: "Technique Specialization Flags",        desc: "Reach DCs certified in Gonstead, Diversified, SOT, Activator, and Cox Flexion as distinct technique-based sub-segments." },
      { iconName: "Building2",         title: "Practice Setting Segmentation",         desc: "Separate solo chiropractic offices from multi-practitioner clinics, integrated wellness centers, and sports medicine co-located practices." },
      { iconName: "ShieldCheck",       title: "State License & NBCE Validation",       desc: "Active chiropractic licensure verified against state boards and NBCE records. License renewal cycle and CE status included." },
      { iconName: "Award",             title: "Adjunct Therapy Certifications",         desc: "DCs with acupuncture, kinesiology taping, and physical rehabilitation certifications flagged for complementary supply vendors." },
      { iconName: "ClipboardList",     title: "Insurance vs. Cash-Pay Practice Flags",  desc: "Chiropractic offices primarily billing insurance segmented from cash-pay, membership-model, and direct-care practices." },
      { iconName: "Cpu",               title: "Digital Radiography Equipment Data",     desc: "Practices with in-office X-ray, cone beam CT, or surface EMG equipment flagged for imaging and diagnostic product vendors." },
    ],
  },
  "specialty-other/veterinarians": {
    kicker: "Veterinarian Data",
    headlinePlain: "DVM data for pharma",
    headlineAccent: "and specialty supply outreach.",
    cards: [
      { iconName: "PawPrint",          title: "Species Specialization Segmentation",    desc: "Separate small animal, large animal, equine, exotic/zoo, avian, and aquatic veterinarians into distinct practice audiences." },
      { iconName: "BadgeCheck",        title: "ABVP Diplomate Flags",                   desc: "American Board of Veterinary Practitioners Diplomates flagged by species specialty for targeted drug and supply outreach." },
      { iconName: "Building2",         title: "Practice Setting Filters",               desc: "Distinguish private small animal clinic, specialty/emergency hospital, mobile vet, and university teaching hospital settings." },
      { iconName: "Award",             title: "AVMA & State VMA Membership Flags",       desc: "AVMA member DVMs and state VMA members identified for association-adjacent pharmaceutical and supply marketing." },
      { iconName: "FileText",          title: "Dispensing Practice & DEA Registration", desc: "Veterinary practices registered to dispense controlled substances and maintain in-clinic pharmacies flagged for pharma outreach." },
      { iconName: "Layers",            title: "Large Animal & Production Focus",         desc: "DVMs serving cattle, swine, poultry, and aquaculture production operations segmented for production animal drug vendors." },
    ],
  },
  "specialty-other/allied-healthcare-professionals": {
    kicker: "Allied Healthcare Professional Data",
    headlinePlain: "Multi-discipline data for",
    headlineAccent: "every allied health segment.",
    cards: [
      { iconName: "Layers",            title: "Discipline-Level Segmentation",          desc: "Separate radiologic technicians, dietitians, EMTs, clinical lab scientists, respiratory therapists, and 12+ allied disciplines." },
      { iconName: "BadgeCheck",        title: "Credential & License Validation",        desc: "ASCP, ARRT, AARC, CDR, and discipline-specific certifications cross-validated for each allied health profession." },
      { iconName: "Building2",         title: "Practice Setting Filters",               desc: "Reach allied professionals in hospital labs, imaging centers, public health agencies, schools, and private clinics." },
      { iconName: "SlidersHorizontal", title: "Specialty Certification Flags",          desc: "Advanced credentials within each discipline (CLS generalist vs. specialist, RRT vs. CRT) flagged for appropriate tier messaging." },
      { iconName: "Activity",          title: "Volume & Acuity Indicators",             desc: "High-volume hospital departments and labs with 24/7 operations flagged for supply, equipment, and education priority outreach." },
      { iconName: "Cpu",               title: "Telehealth & Remote Delivery Flags",     desc: "Allied professionals delivering services via telehealth or remote models identified for digital health tool vendor outreach." },
    ],
  },
};

// ─── Compliance data (mirrors HUB_COMPLIANCE in HealthcareComplianceSection.tsx) ─
const COMPLIANCE_DATA = {
  "physicians-advanced-practice": {
    intro: "Physician data carries unique regulatory weight. Every Lorann record is built with compliance as the foundation — your outreach never touches covered-entity territory.",
    items: [
      { badge: "HIPAA",    title: "NPI-Only, PHI-Free Data Handling",    desc: "Physician marketing lists contain NPI numbers, practice addresses, direct emails, and specialty codes — nothing more. No prescription histories, clinical notes, or patient linkages are present. Your drug and device campaigns stay cleanly outside HIPAA's covered-entity scope." },
      { badge: "CCPA",     title: "California Physician Privacy Compliance", desc: "California-licensed physicians are flagged and validated against CCPA opt-out databases. Multi-state privacy statutes are layered in automatically before every delivery, so your physician outreach stays compliant regardless of where a practice is located." },
      { badge: "CAN-SPAM", title: "Physician Email CAN-SPAM Validation",  desc: "Every physician email address is validated against federal CAN-SPAM requirements before delivery. Unsubscribe requests from physician contacts are honored in real time and suppressed from all future pharmaceutical and device deployments." },
      { badge: "FCRA",     title: "B2B Medical Marketing — Not Credentialing", desc: "Physician data is licensed strictly for B2B marketing outreach — not for medical staff credentialing, employment decisions, or DEA background applications. FCRA exemption documentation is available for your legal and compliance team on request." },
      { badge: "DNC",      title: "Physician Phone Numbers DNC-Scrubbed",   desc: "Office phone numbers and direct physician mobile contacts are scrubbed against the National Do Not Call Registry before every delivery. State-level DNC lists for physicians in high-regulation states are applied where applicable." },
    ],
  },
  "nursing-professionals": {
    intro: "Nursing contact data requires precise credentialing hygiene. Our compliance framework keeps your staffing, supply, and education campaigns legally sound and professionally respectful.",
    items: [
      { badge: "HIPAA",    title: "Credential Data Only — No Clinical Records", desc: "Nurse marketing lists include credential type, license number, care setting, and professional contact — no shift logs, patient assignment records, or clinical documentation of any kind. HIPAA's scope never reaches B2B nursing lists structured this way." },
      { badge: "CCPA",     title: "Multi-State Nurse Privacy Validation",    desc: "California, Virginia, Colorado, and other state privacy statutes are applied before every nursing list delivery. Opt-out requests from nursing professionals are suppressed within 24 hours across all data feeds, including travel nurse and compact-license records." },
      { badge: "CAN-SPAM", title: "Nurse Email Campaigns — Fully CAN-SPAM Compliant", desc: "Nursing email addresses are validated against CAN-SPAM requirements at the point of delivery. Unsubscribe and opt-out data from nurse contacts is maintained in real time, ensuring your staffing and education campaigns launch with a clean, legally defensible list." },
      { badge: "FCRA",     title: "Recruitment Marketing, Not Employment Screening", desc: "Nursing data is supplied for marketing and recruitment marketing outreach — not for making employment eligibility determinations. Staffing firms and travel nurse agencies that request formal FCRA exemption documentation receive it with every data order." },
      { badge: "DNC",      title: "Nurse Phone Records DNC-Registry Compliant", desc: "Phone numbers associated with nursing professionals — including travel nurse mobile contacts — are scrubbed against federal and state DNC registries before each delivery. High-volume dialers receive pre-scrubbed records ready for immediate outbound deployment." },
    ],
  },
  "hospital-decision-makers": {
    intro: "Reaching healthcare executives demands airtight data governance. Lorann's compliance stack ensures every executive outreach stays within regulatory boundaries and protects your brand reputation.",
    items: [
      { badge: "HIPAA",    title: "Executive Contact Data — Zero Patient Data",  desc: "Hospital decision-maker lists contain professional titles, direct office contacts, and facility affiliations — no patient census data, financial records, or facility-level PHI. Your vendor and capital equipment outreach to C-suite contacts stays completely outside HIPAA's regulatory reach." },
      { badge: "CCPA",     title: "Hospital Executive State Privacy Compliance", desc: "Health system executives in California and other privacy-regulated states are scrubbed against applicable opt-out registries before delivery. Multi-state IDN accounts are validated against the strictest applicable state statute, ensuring clean delivery across every territory." },
      { badge: "CAN-SPAM", title: "C-Suite Email Delivery — CAN-SPAM Validated",  desc: "Executive email addresses — from CEO to department director — are validated against CAN-SPAM requirements before delivery. Opt-out requests from hospital leadership contacts are suppressed in real time and excluded from all future campaign deployments." },
      { badge: "FCRA",     title: "Vendor Outreach Only — Not Background Checks", desc: "Hospital executive data is licensed for B2B vendor and advisory marketing — not for executive background screening, employment verification, or board-level due diligence. FCRA exemption is documented and available for your compliance officer on request." },
      { badge: "DNC",      title: "Executive Direct Lines DNC-Registry Scrubbed", desc: "Direct office numbers and executive mobile contacts are validated against the National Do Not Call Registry prior to delivery. State-level DNC overlays are applied for health systems operating in high-compliance jurisdictions before your outbound team calls a single contact." },
    ],
  },
  "health-therapy": {
    intro: "Therapy professional marketing operates in a regulated environment. Lorann's compliance framework is built to keep your CE, supply, and staffing campaigns professionally sound and regulation-ready.",
    items: [
      { badge: "HIPAA",    title: "Therapist Directories — No Treatment Records", desc: "Therapy professional lists include license type, practice setting, professional contact, and credential status — no patient treatment plans, session notes, or clinical outcome data. Your equipment and CE marketing stays firmly outside any HIPAA-covered data category." },
      { badge: "CCPA",     title: "State Privacy Compliance for Therapy Outreach", desc: "California-licensed PTs, OTs, and SLPs are validated against CCPA opt-out requirements before every delivery. State privacy statutes applicable to outpatient therapy and SNF-based practices are applied automatically, regardless of the therapy setting targeted." },
      { badge: "CAN-SPAM", title: "Therapy Professional Email — CAN-SPAM Ready",  desc: "All therapy professional email addresses are validated against federal CAN-SPAM requirements before list delivery. Unsubscribe requests from therapists and practice managers are suppressed in real time and excluded from every subsequent CE and supply campaign." },
      { badge: "FCRA",     title: "CE and Supply Marketing — Not License Decisions", desc: "Therapy data is licensed for continuing education, equipment supply, and staffing marketing outreach — not for making professional licensure or credentialing decisions. FCRA exemption documentation is available for compliance review upon request." },
      { badge: "DNC",      title: "Therapy Practice Phone Records DNC-Validated",   desc: "Office and mobile phone numbers for therapists across acute, outpatient, SNF, and home health settings are scrubbed against federal and applicable state DNC registries. Your outbound sales teams reach only contactable therapy professionals." },
    ],
  },
  "behavioral-mental-health": {
    intro: "Behavioral health professional data demands an especially careful compliance posture. Lorann's governance framework is designed with that sensitivity in mind — from collection through delivery.",
    items: [
      { badge: "HIPAA",    title: "Professional Directory Data — No Clinical Content", desc: "Behavioral health lists contain professional license type, credential level, practice setting, and contact information — no patient diagnoses, treatment records, or session notes. Marketing to LCSWs, LMFTs, and psychiatrists never touches HIPAA-regulated clinical data." },
      { badge: "CCPA",     title: "State Privacy Law Validation for Behavioral Health", desc: "Behavioral health professionals licensed in California and other privacy-statute states are scrubbed against current opt-out databases. Telehealth providers operating across state lines are validated against the most stringent applicable state privacy requirement before delivery." },
      { badge: "CAN-SPAM", title: "Behavioral Health Email — CAN-SPAM Compliant Lists",   desc: "Email addresses for psychiatrists, psychologists, and licensed counselors are validated against CAN-SPAM requirements before each deployment. Opt-out requests from behavioral health professionals are honored within hours and suppressed across all future platform and pharma campaigns." },
      { badge: "FCRA",     title: "Marketing Use Only — Not Clinical Decision-Making", desc: "Behavioral health contact data is supplied strictly for B2B marketing purposes — not for clinical credentialing, insurance panel decisions, or professional background investigations. FCRA exemption is documented and provided with every behavioral health data order." },
      { badge: "DNC",      title: "Behavioral Health Practice Phone DNC-Compliant",   desc: "Office and mobile numbers for behavioral health practitioners — including telehealth-active clinicians — are scrubbed against the National DNC Registry and state-level registries before delivery. Your outreach team connects only with practitioners who are contactable under current law." },
    ],
  },
  "dental-vision": {
    intro: "Dental and vision professional marketing has specific compliance considerations. Lorann's data governance ensures your supply, equipment, and staffing campaigns are delivered with confidence.",
    items: [
      { badge: "HIPAA",    title: "Dental & Vision Directories — No Patient Records",  desc: "Dental and vision professional lists include practice name, specialty type, contact details, and equipment flags — no patient ledger data, treatment codes, or insurance claims. Your supply and equipment outreach stays entirely within non-covered-entity territory." },
      { badge: "CCPA",     title: "California Dental & Vision Privacy Compliance",     desc: "California-licensed dentists, orthodontists, ODs, and ophthalmologists are validated against CCPA opt-out databases before each delivery. DSO-affiliated practices with multi-state locations are scrubbed against the most stringent applicable state privacy statute." },
      { badge: "CAN-SPAM", title: "Dental Professional Email — CAN-SPAM Validated",    desc: "Email addresses for general dentists, specialists, optometrists, and ophthalmologists are validated against federal CAN-SPAM requirements. Unsubscribe requests from dental and vision professionals are suppressed in real time before any future supply or equipment campaign launches." },
      { badge: "FCRA",     title: "Supply and Equipment Marketing — Not Credit Screening", desc: "Dental and vision data is licensed for B2B supply, equipment, and staffing marketing — not for practice credit decisions, equipment lease underwriting, or insurance eligibility screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Dental & Vision Practice Phone DNC-Scrubbed",       desc: "Practice office numbers and dentist or OD mobile contacts are scrubbed against the National Do Not Call Registry and state-level DNC lists before delivery. Solo and DSO-affiliated practices are held to the same registry standards before your outbound team dials." },
    ],
  },
  "pharmacy-practice-management": {
    intro: "Pharmacy marketing sits at the intersection of federal drug regulation and data privacy law. Lorann's compliance stack is built to navigate both — protecting your brand and your recipients.",
    items: [
      { badge: "HIPAA",    title: "Pharmacist Contact Data — No Rx or Dispensing Records", desc: "Pharmacy professional lists include pharmacist name, license type, DEA registration status, and practice setting — no prescription dispensing records, patient medication histories, or controlled substance transaction logs. Your drug and supply marketing never enters HIPAA-covered territory." },
      { badge: "CCPA",     title: "Pharmacy State Privacy Law Validation",               desc: "California-licensed pharmacists and pharmacy owners are validated against CCPA opt-out requirements before every delivery. Chain pharmacy locations in multi-state networks are scrubbed against the strictest applicable state privacy statute in the organization's operating footprint." },
      { badge: "CAN-SPAM", title: "Pharmacist Email Records — CAN-SPAM Ready",           desc: "Email addresses for retail, independent, compounding, and hospital pharmacists are validated against CAN-SPAM requirements at delivery. Opt-out requests from pharmacist contacts are suppressed in real time and excluded from all subsequent drug marketing and PBM outreach campaigns." },
      { badge: "FCRA",     title: "Drug Marketing Outreach — Not Licensure Review",       desc: "Pharmacy data is supplied for pharmaceutical marketing, PBM network outreach, and technology sales — not for pharmacist license verification, controlled-substance dispensing eligibility, or DEA registration compliance reviews. FCRA exemption is documented with every order." },
      { badge: "DNC",      title: "Pharmacy Phone Numbers DNC-Registry Compliant",        desc: "Store phone numbers and pharmacist mobile contacts are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Independent pharmacy owner contacts are held to the same registry standards as chain-location numbers." },
    ],
  },
  "specialty-other": {
    intro: "Specialty healthcare professional marketing covers a wide regulatory surface. Lorann's data governance framework applies the same rigorous compliance standards across every niche discipline.",
    items: [
      { badge: "HIPAA",    title: "Specialty Directory Data — No Clinical Records",     desc: "Specialty professional lists — covering chiropractors, veterinarians, radiologic technicians, and allied disciplines — contain credential and contact data only. No patient records, clinical outcomes, or treatment histories are present. Your supply and CE outreach stays outside HIPAA's covered-entity scope." },
      { badge: "CCPA",     title: "Multi-Discipline State Privacy Compliance",          desc: "Specialty professionals licensed in California and other privacy-regulated states are scrubbed against applicable opt-out databases before every delivery. Multi-discipline lists are validated against the most stringent state statute covering each credential type in the dataset." },
      { badge: "CAN-SPAM", title: "Specialty Professional Email — CAN-SPAM Validated",  desc: "Email addresses for chiropractors, DVMs, EMTs, dietitians, and allied health professionals are validated against federal CAN-SPAM requirements before delivery. Unsubscribe and opt-out requests from specialty contacts are suppressed in real time across all future campaign deployments." },
      { badge: "FCRA",     title: "Marketing Use Only — Not Licensing Decisions",       desc: "Specialty healthcare data is licensed strictly for B2B marketing and outreach — not for professional licensing determinations, board certification verification, or employment eligibility screening. FCRA exemption documentation is available for compliance review with every data order." },
      { badge: "DNC",      title: "Specialty Practice Phone Numbers DNC-Scrubbed",      desc: "Office and mobile phone numbers for specialty practitioners — including veterinary clinics, chiropractic offices, and allied health facilities — are scrubbed against the National DNC Registry and state-level lists before delivery to your outbound team." },
    ],
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getPageKey(slugParts) {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  const hub = slugParts[idx + 1] || "default";
  const sub = slugParts[idx + 2];
  return sub ? `${hub}/${sub}` : hub;
}

function getFeaturesData(pageKey) {
  const hubKey = pageKey.split("/")[0];
  return FEATURES_DATA[pageKey] ?? FEATURES_DATA[hubKey] ?? null;
}

function getComplianceData(pageKey) {
  const hubKey = pageKey.split("/")[0];
  return COMPLIANCE_DATA[pageKey] ?? COMPLIANCE_DATA[hubKey] ?? null;
}

function getHeroImage(pageKey) {
  const hubKey = pageKey.split("/")[0];
  return HERO_IMAGES[pageKey] ?? HERO_IMAGES[hubKey] ?? HERO_IMAGES["physicians-advanced-practice"];
}

function getCompliancePhoto(pageKey) {
  const hubKey = pageKey.split("/")[0];
  return COMPLIANCE_PHOTOS[pageKey] ?? COMPLIANCE_PHOTOS[hubKey] ?? COMPLIANCE_PHOTOS["physicians-advanced-practice"];
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\nSeeding healthcare sections`);
  console.log(`Project: ${projectId} | Dataset: ${dataset} | Dry-run: ${DRY_RUN}\n`);

  const pages = await client.fetch(
    `*[_type == "page" && !(_id match "drafts.*") && slug.current match "data-assets/b2b-database/healthcare*"]
    { _id, "slug": slug.current } | order(slug.current)`
  );

  console.log(`Found ${pages.length} healthcare page(s)\n`);

  let updated = 0;
  for (const page of pages) {
    const slugParts = page.slug.split("/");
    const pageKey = getPageKey(slugParts);

    const featuresRaw = getFeaturesData(pageKey);
    const complianceRaw = getComplianceData(pageKey);

    if (!featuresRaw && !complianceRaw) {
      console.log(`  SKIP ${page.slug} (no data found for key "${pageKey}")`);
      continue;
    }

    const heroImageUrl = getHeroImage(pageKey);
    const photoUrl = getCompliancePhoto(pageKey);

    const healthcareFeaturesSection = featuresRaw
      ? {
          heroImageUrl,
          kicker: featuresRaw.headlinePlain ? featuresRaw.kicker : featuresRaw.kicker,
          headlinePlain: featuresRaw.headlinePlain,
          headlineAccent: featuresRaw.headlineAccent,
          cards: featuresRaw.cards.map((c, i) => ({ _key: `card-${i}`, iconName: c.iconName, title: c.title, desc: c.desc })),
        }
      : undefined;

    const healthcareComplianceSection = complianceRaw
      ? {
          photoUrl,
          intro: complianceRaw.intro,
          items: complianceRaw.items.map((it) => ({ _key: `item-${it.badge}`, badge: it.badge, title: it.title, desc: it.desc })),
        }
      : undefined;

    console.log(`  ${page.slug}  [key: ${pageKey}]`);

    if (!DRY_RUN) {
      const patch = client.patch(page._id);
      if (healthcareFeaturesSection) patch.set({ healthcareFeaturesSection });
      if (healthcareComplianceSection) patch.set({ healthcareComplianceSection });
      await patch.commit();

      try {
        const draft = await client.getDocument(`drafts.${page._id}`);
        if (draft) {
          const draftPatch = client.patch(`drafts.${page._id}`);
          if (healthcareFeaturesSection) draftPatch.set({ healthcareFeaturesSection });
          if (healthcareComplianceSection) draftPatch.set({ healthcareComplianceSection });
          await draftPatch.commit();
        }
      } catch {}

      console.log(`  ✓\n`);
    } else {
      if (healthcareFeaturesSection) {
        console.log(`    features: "${healthcareFeaturesSection.kicker}" — ${healthcareFeaturesSection.cards.length} cards`);
      }
      if (healthcareComplianceSection) {
        console.log(`    compliance: "${healthcareComplianceSection.intro.slice(0, 60)}..."`);
      }
      console.log(`  [dry-run]\n`);
    }
    updated++;
  }

  console.log(`Done — ${updated} page(s) ${DRY_RUN ? "would be" : "were"} updated.\n`);
}

run().catch((err) => { console.error(err); process.exit(1); });
