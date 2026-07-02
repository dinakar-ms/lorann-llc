import Image from "next/image";
import {
  ShieldCheck, SlidersHorizontal, FileText, Building2,
  Layers, RefreshCw, BadgeCheck, Stethoscope, Heart,
  Brain, Smile, Pill, PawPrint, Users, Cpu,
  Eye, Award, Activity, ClipboardList, Star, Zap,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  ShieldCheck, SlidersHorizontal, FileText, Building2, Layers, RefreshCw,
  BadgeCheck, Stethoscope, Heart, Brain, Smile, Pill, PawPrint, Users, Cpu,
  Eye, Award, Activity, ClipboardList, Star, Zap,
};

type FeatureCard = { icon: LucideIcon; title: string; desc: string };
type HubFeatures = { kicker: string; headline: string; accent: string; cards: FeatureCard[] };

/* Returns "hub" for hub pages, "hub/sub" for inner pages */
function getPageKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  const hub = slugParts[idx + 1] || "default";
  const sub = slugParts[idx + 2];
  return sub ? `${hub}/${sub}` : hub;
}

/*
 * Unique hero image per page — pool expanded with images from the committed compliance section.
 * Pool: A=1576091160399  B=1576091160550  C=1559757148    D=1530026405186  E=1519494026892
 *       F=1552196563     G=1544027993     H=1606811971618  K=1576671414121  M=1551884170
 *       N=1454165804606  O=1559757175     P=1516574187841  Q=1538108149393  R=1584820927498
 *  (I=1585670087094 and J=1585671773819 confirmed 404 — removed)
 */
const HERO_IMAGES: Record<string, string> = {
  /* ── Hub pages — each image unique across all 46 pages ── */
  "physicians-advanced-practice":   "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80", // A
  "nursing-professionals":          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1400&q=80", // B
  "hospital-decision-makers":       "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1400&q=80", // C
  "health-therapy":                 "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=1400&q=80", // D
  "behavioral-mental-health":       "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=80", // E
  "dental-vision":                  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=1400&q=80", // F
  "pharmacy-practice-management":   "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1400&q=80", // G
  "specialty-other":                "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=80", // H

  /* ── Physicians inner pages ── */
  "physicians-advanced-practice/physicians-doctors":      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80", // KK
  "physicians-advanced-practice/podiatrists":             "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?auto=format&fit=crop&w=1400&q=80", // M
  "physicians-advanced-practice/nurse-practitioners":     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80", // N
  "physicians-advanced-practice/physician-assistants":    "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1400&q=80", // O
  "physicians-advanced-practice/medical-assistants":      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80", // P

  /* ── Nursing inner pages ── */
  "nursing-professionals/registered-nurses":              "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1400&q=80", // Q
  "nursing-professionals/licensed-practical-nurses":      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1400&q=80", // R
  "nursing-professionals/certified-nursing-assistants":   "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80", // S
  "nursing-professionals/certified-nurse-midwives":       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1400&q=80", // T

  /* ── Hospital inner pages ── */
  "hospital-decision-makers/hospital-administrators":     "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80", // U
  "hospital-decision-makers/ceo-cfo-healthcare":          "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1400&q=80", // V
  "hospital-decision-makers/chief-medical-officers":      "https://images.unsplash.com/photo-1593073862407-a3ce22748763?auto=format&fit=crop&w=1400&q=80", // W
  "hospital-decision-makers/chief-nursing-officers":      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1400&q=80", // X
  "hospital-decision-makers/chief-of-staff":              "https://images.unsplash.com/photo-1505253468034-514d2507d914?auto=format&fit=crop&w=1400&q=80", // Y
  "hospital-decision-makers/medical-directors":           "https://images.unsplash.com/photo-1477468572316-36979010099d?auto=format&fit=crop&w=1400&q=80", // Z

  /* ── Health-therapy inner pages ── */
  "health-therapy/physical-therapists":                   "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1400&q=80", // AA
  "health-therapy/occupational-therapists":               "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80", // AB
  "health-therapy/speech-language-therapists":            "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&w=1400&q=80", // AC
  "health-therapy/respiratory-therapists":                "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1400&q=80", // AD
  "health-therapy/massage-therapists":                    "https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?auto=format&fit=crop&w=1400&q=80", // AE
  "health-therapy/emts-paramedics":                       "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1400&q=80", // AF
  "health-therapy/radiologic-technicians":                "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=1400&q=80", // AG
  "health-therapy/dieticians-nutritionists":              "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1400&q=80", // AH

  /* ── Behavioral inner pages ── */
  "behavioral-mental-health/psychologists":               "https://images.unsplash.com/photo-1489533119213-66a5cd877091?auto=format&fit=crop&w=1400&q=80", // AI
  "behavioral-mental-health/psychiatrists":               "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1400&q=80", // AJ
  "behavioral-mental-health/mental-health-counselors":    "https://images.unsplash.com/photo-1614727187346-ec3a009092b0?auto=format&fit=crop&w=1400&q=80", // AK
  "behavioral-mental-health/social-workers":              "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1400&q=80", // AL
  "behavioral-mental-health/marriage-family-therapists":  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?auto=format&fit=crop&w=1400&q=80", // AM

  /* ── Dental inner pages ── */
  "dental-vision/dentists":                               "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1400&q=80", // AN
  "dental-vision/dental-hygienists":                      "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=1400&q=80", // AO
  "dental-vision/dental-assistants":                      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=80", // AP
  "dental-vision/optometrists":                           "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=80", // AQ
  "dental-vision/opticians":                              "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1400&q=80", // AR

  /* ── Pharmacy inner pages ── */
  "pharmacy-practice-management/pharmacists":             "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1400&q=80", // AS
  "pharmacy-practice-management/physician-practice-managers": "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1400&q=80", // AT

  /* ── Specialty inner pages ── */
  "specialty-other/chiropractors":                        "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?auto=format&fit=crop&w=1400&q=80", // AU
  "specialty-other/veterinarians":                        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80", // AV
  "specialty-other/allied-healthcare-professionals":      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1400&q=80", // AW

  "default": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=80", // A
};

/* Unique feature card content per page */
const DATA: Record<string, HubFeatures> = {
  /* ───────── PHYSICIANS HUB ───────── */
  "physicians-advanced-practice": {
    kicker: "Precision Physician Data",
    headline: "Six capabilities that make",
    accent: "physician outreach convert.",
    cards: [
      { icon: ShieldCheck,        title: "NPI-Verified Records",        desc: "Every record cross-matched against the CMS NPPES registry. You reach real, licensed physicians — not stale aggregated entries." },
      { icon: SlidersHorizontal,  title: "Specialty-Level Targeting",   desc: "Filter by taxonomy code, board certification, and subspecialty. Reach hospitalists, surgeons, and internists independently." },
      { icon: FileText,           title: "DEA & Prescriber Flags",      desc: "Identify active prescribers with DEA validation. Ideal for pharmaceutical sales, formulary programs, and sample distribution." },
      { icon: Building2,          title: "Hospital Privileges Data",    desc: "Segment physicians by admitting privileges at specific hospital systems, academic centers, or health networks." },
      { icon: RefreshCw,          title: "Weekly Data Hygiene",         desc: "Records refreshed weekly against national change-of-address, license, and specialty boards. Bounce rates stay under 2%." },
      { icon: Layers,             title: "Multi-Channel Delivery",      desc: "Email, direct mail, phone, and programmatic digital audience formats ready for activation across every marketing channel." },
    ],
  },

  "physicians-advanced-practice/physicians-doctors": {
    kicker: "Medical Physicians & Doctors",
    headline: "Reach the right physicians",
    accent: "before competitors do.",
    cards: [
      { icon: SlidersHorizontal,  title: "Primary Care vs. Specialist Split",  desc: "Separate PCPs from cardiologists, orthopedic surgeons, and oncologists. Board certification and taxonomy code filters make every segment distinct." },
      { icon: FileText,           title: "Prescribing Volume Indicators",       desc: "Physician prescribing frequency data available for pharmaceutical sales territory planning and formulary outreach prioritization." },
      { icon: Activity,           title: "Patient Load Data",                   desc: "High-volume practices treating 30+ patients daily are flagged for device and supply sales prioritization." },
      { icon: Cpu,                title: "Electronic Health Record Platform Flags", desc: "Identify physicians using Epic, Cerner, or Athenahealth for healthcare technology and integration marketing campaigns." },
      { icon: Award,              title: "Medical School & Years in Practice",  desc: "Academic background and years-in-practice data available for career-stage and academic-influence outreach strategies." },
      { icon: Building2,          title: "Office vs. Hospital Practice Split",  desc: "Separate office-based physicians from hospital-employed, academic, and large group practice settings in a single query." },
    ],
  },

  "physicians-advanced-practice/podiatrists": {
    kicker: "Podiatrist Data",
    headline: "Connect with every podiatrist",
    accent: "who drives supply decisions.",
    cards: [
      { icon: BadgeCheck,         title: "Specialty Certification Filters",     desc: "Distinguish podiatric surgeons from medical podiatrists. ABPS fellowship-credentialed Doctors of Podiatric Medicine identified as a premium sub-segment." },
      { icon: Activity,           title: "Surgical Volume Indicators",          desc: "High-volume surgical practices are flagged for instrumentation, wound care product, and orthotic supply outreach." },
      { icon: Building2,          title: "Practice Setting Segmentation",       desc: "Separate private practice podiatrists from hospital-employed, wound care clinic, and orthopedic group practice settings." },
      { icon: ShieldCheck,        title: "Doctor of Podiatric Medicine License Validation", desc: "State podiatric license status cross-validated against board registries. Active and renewal-pending records clearly flagged." },
      { icon: ClipboardList,      title: "Insurance Panel Participation",       desc: "Medicare and Medicaid panel status included. Identify podiatrists treating high-volume diabetic foot and wound care populations." },
      { icon: Layers,             title: "Equipment & Supply Affiliations",     desc: "Orthotics lab relationships and Durable Medical Equipment supplier affiliations flagged for targeted supply chain and equipment vendor outreach." },
    ],
  },

  "physicians-advanced-practice/nurse-practitioners": {
    kicker: "Nurse Practitioner Data",
    headline: "Target Nurse Practitioners who prescribe",
    accent: "and drive clinical decisions.",
    cards: [
      { icon: SlidersHorizontal,  title: "Specialty Focus Filters",             desc: "Separate family Nurse Practitioners from psychiatric, acute care, and women's health Nurse Practitioners. Each specialty is a unique, non-overlapping audience." },
      { icon: FileText,           title: "Prescribing Authority by State",      desc: "Full prescriptive authority, collaborative practice, and restricted-practice state flags are included per Nurse Practitioner record." },
      { icon: Building2,          title: "Practice Setting Segmentation",       desc: "Distinguish Nurse Practitioners in primary care from urgent care, retail clinics, hospital systems, and specialty group practices." },
      { icon: BadgeCheck,         title: "Certification & Credential Validation",desc: "American Nurses Credentialing Center and American Association of Nurse Practitioners certification status validated. Board renewal dates and specialty endorsements included per record." },
      { icon: Users,              title: "Patient Panel Size Indicators",       desc: "High-volume Nurse Practitioner practices with large active patient panels flagged for pharmaceutical and device representative priority outreach." },
      { icon: Cpu,                title: "Telehealth Provider Flags",           desc: "Nurse Practitioners actively providing telehealth consultations flagged for health technology and virtual care platform marketing." },
    ],
  },

  "physicians-advanced-practice/physician-assistants": {
    kicker: "Physician Assistant Data",
    headline: "Physician Assistant data built for",
    accent: "specialty and surgical outreach.",
    cards: [
      { icon: Stethoscope,        title: "Specialty Practice Area Filters",     desc: "Reach Physician Assistants in surgery, emergency medicine, orthopedics, and primary care as distinct, validated audience sub-segments." },
      { icon: ShieldCheck,        title: "Surgical First-Assist Flags",         desc: "Physician Assistants credentialed as surgical first assistants identified and flagged for instrumentation and supply vendor outreach." },
      { icon: Building2,          title: "Supervising Physician Affiliation",   desc: "Practice group and supervising physician affiliation data available for account-based medical group targeting." },
      { icon: BadgeCheck,         title: "PA-C Certification Validation",       desc: "NCCPA certification status cross-validated. Re-certification cycle data available for CME and education targeting." },
      { icon: SlidersHorizontal,  title: "Hospital vs. Clinic Setting Split",   desc: "Separate inpatient PA roles from outpatient clinic and group practice settings for channel-specific campaign delivery." },
      { icon: ClipboardList,      title: "State Practice Agreement Status",     desc: "Collaborative practice and supervision agreement requirements by state flagged per record for compliance-conscious outreach." },
    ],
  },

  "physicians-advanced-practice/medical-assistants": {
    kicker: "Medical Assistant Data",
    headline: "Reach clinical Medical Assistants",
    accent: "across every specialty setting.",
    cards: [
      { icon: BadgeCheck,         title: "Credential Type Segmentation",        desc: "Separate Certified Medical Assistants, Registered Medical Assistants, and National Healthcareer Association credentialed assistants into distinct, validated credential sub-segments for targeted outreach." },
      { icon: Activity,           title: "Clinical vs. Administrative Role Flags",desc: "Identify MAs in clinical roles (phlebotomy, injections) vs. administrative positions for relevant supply campaign targeting." },
      { icon: Building2,          title: "Specialty Clinic Setting Data",       desc: "Reach MAs in dermatology, orthopedic, cardiology, and 20+ additional specialty clinic settings independently." },
      { icon: SlidersHorizontal,  title: "Practice Size Indicators",            desc: "Solo and small-group practice MAs flagged separately from large health system and corporate clinic employees." },
      { icon: Cpu,                title: "Electronic Health Record Proficiency Flags", desc: "Medical Assistants trained in specific Electronic Health Record platforms identified for healthcare technology and training product marketing campaigns." },
      { icon: Layers,             title: "Geographic Density Filters",          desc: "MA concentration by ZIP code and metro area available for regional supply rep territory planning and deployment." },
    ],
  },

  /* ───────── NURSING HUB ───────── */
  "nursing-professionals": {
    kicker: "Comprehensive Nursing Data",
    headline: "Built for every team",
    accent: "targeting nursing professionals.",
    cards: [
      { icon: BadgeCheck,         title: "License-Type Segmentation",   desc: "Filter by Registered Nurse, Licensed Practical Nurse, Certified Nursing Assistant, Certified Nurse-Midwife, Nurse Practitioner, and twelve additional credential types. Reach the exact nursing role your campaign requires." },
      { icon: Building2,          title: "Unit Specialization Flags",   desc: "Identify nurses by clinical unit — ICU, ER, L&D, oncology, and pediatrics — for highly relevant outreach." },
      { icon: ShieldCheck,        title: "NCLEX-Validated Records",     desc: "Data cross-referenced against state nursing license databases, ensuring every record holds an active, verified credential." },
      { icon: SlidersHorizontal,  title: "Care Setting Filters",        desc: "Distinguish acute care hospital nurses from long-term care, home health, and outpatient clinic settings in a single query." },
      { icon: Users,              title: "Travel Nurse Indicators",     desc: "Travel and agency nurses are flagged separately. Perfect for staffing firms targeting highly mobile clinicians." },
      { icon: Layers,             title: "Multi-State License Coverage", desc: "Multi-state compact license holders identified and flagged. Streamline multi-region outreach with a single, clean dataset." },
    ],
  },

  "nursing-professionals/registered-nurses": {
    kicker: "Registered Nurse Data",
    headline: "Registered Nurse data engineered for",
    accent: "precision outreach at scale.",
    cards: [
      { icon: BadgeCheck,         title: "Clinical Unit Specialization",        desc: "Filter by ICU, ER, OR, oncology, L&D, NICU, and 30+ unit types. Reach the exact nursing specialty your product serves." },
      { icon: Award,              title: "Bachelor vs. Associate Degree Credential Filters", desc: "Distinguish Bachelor of Science in Nursing-prepared nurses from Associate Degree in Nursing-credentialed Registered Nurses for education-level and career-stage targeted messaging." },
      { icon: Building2,          title: "Hospital System Affiliation",         desc: "Reach Registered Nurses at specific health systems, Integrated Delivery Network networks, or independent hospital facilities by name or region." },
      { icon: Users,              title: "Travel Nurse Indicators",             desc: "Travel and agency Registered Nurses flagged and segmented for staffing firms, recruiters, and continuing education providers." },
      { icon: Star,               title: "Magnet Hospital Designation Flags",   desc: "Registered Nurses at Magnet-designated facilities identified. Target high-acuity, evidence-based practice environments for premium messaging." },
      { icon: ShieldCheck,        title: "NCLEX-RN License Validation",         desc: "Active licensure verified against state boards. Lapsed, suspended, and multi-state compact holders clearly identified." },
    ],
  },

  "nursing-professionals/licensed-practical-nurses": {
    kicker: "Licensed Practical Nurse Data",
    headline: "Licensed Practical Nurse data built for",
    accent: "long-term care and clinic outreach.",
    cards: [
      { icon: Building2,          title: "Care Setting Segmentation",           desc: "Distinguish Licensed Practical Nurses in long-term care, assisted living, home health, physician offices, and correctional facilities." },
      { icon: SlidersHorizontal,  title: "State Scope-of-Practice Flags",       desc: "Medication administration and intravenous therapy scope vary by state — each record includes applicable state-level permission flags." },
      { icon: BadgeCheck,         title: "Specialty Certification Data",         desc: "Wound care, intravenous therapy, and gerontology specialty certifications for Licensed Practical Nurses flagged and validated per record." },
      { icon: Layers,             title: "Facility Ownership Type",              desc: "Reach Licensed Practical Nurses at for-profit chains, nonprofit skilled nursing facilities, and government-run facilities as separate addressable audiences." },
      { icon: ShieldCheck,        title: "NCLEX-PN License Validation",          desc: "Active Licensed Practical Nurse licensure verified against all 50 state nursing boards. Renewal-pending and compact holders identified." },
      { icon: ClipboardList,      title: "CE & License Renewal Targeting",       desc: "Licensed Practical Nurse continuing education and renewal schedules available for education providers and conference marketing campaigns." },
    ],
  },

  "nursing-professionals/certified-nursing-assistants": {
    kicker: "Certified Nursing Assistant Data",
    headline: "Certified Nursing Assistant data for",
    accent: "skilled nursing and home health outreach.",
    cards: [
      { icon: Building2,          title: "Facility Type Segmentation",           desc: "Reach Certified Nursing Assistants in skilled nursing facilities, assisted living, memory care, home health agencies, and hospital settings as distinct audiences." },
      { icon: ShieldCheck,        title: "State Registry Validation",            desc: "Certified Nursing Assistant certifications cross-verified against state nurse aide registries. Active, lapsed, and provisional certifications coded." },
      { icon: BadgeCheck,         title: "Specialty Certification Flags",        desc: "Certified Nursing Assistants holding dementia care, feeding assistant, and restorative aide certifications identified for targeted supply marketing." },
      { icon: Layers,             title: "Facility Size & Chain Affiliation",    desc: "Identify Certified Nursing Assistants at large chain skilled nursing facility operators versus independent facilities for account-level territory planning." },
      { icon: SlidersHorizontal,  title: "Geographic Concentration Data",        desc: "Certified Nursing Assistant density by ZIP code and county available for home health agency recruiting and training program marketing." },
      { icon: Users,              title: "Language & Bilingual Flags",           desc: "Bilingual Certified Nursing Assistant records identified where available. Useful for staffing agencies and multi-language training content marketing." },
    ],
  },

  "nursing-professionals/certified-nurse-midwives": {
    kicker: "Certified Nurse-Midwife Data",
    headline: "Certified Nurse-Midwife data for precision",
    accent: "women's health outreach.",
    cards: [
      { icon: Building2,          title: "Practice Setting Segmentation",        desc: "Separate Certified Nurse-Midwives in hospital birth centers, freestanding birth centers, and home birth practices into distinct segments." },
      { icon: FileText,           title: "Prescribing Authority by State",        desc: "Full prescriptive authority, collaborative agreement, and restricted-practice designations flagged per CNM record." },
      { icon: Stethoscope,        title: "Collaborative Physician Affiliation",   desc: "Hospital group and OB/GYN practice affiliations included for account-based outreach to women's health networks." },
      { icon: BadgeCheck,         title: "AMCB Certification Validation",         desc: "Active CNM certification verified against American Midwifery Certification Board records. Renewal-pending records flagged." },
      { icon: Activity,           title: "Birth Volume Indicators",               desc: "High-volume birth centers with 200+ annual births identified for pharmaceutical and supply priority outreach." },
      { icon: Cpu,                title: "Telehealth Prenatal Provider Flags",    desc: "Certified Nurse-Midwives offering virtual prenatal consultations flagged for health technology, app, and telehealth platform outreach." },
    ],
  },

  /* ───────── HOSPITAL DECISION-MAKERS HUB ───────── */
  "hospital-decision-makers": {
    kicker: "Executive Healthcare Data",
    headline: "Data engineered for",
    accent: "C-suite and director outreach.",
    cards: [
      { icon: Users,              title: "Title & Role Targeting",      desc: "Reach Chief Executive Officers, Chief Financial Officers, Chief Medical Officers, Chief Nursing Officers, and department directors independently. Filter by decision-making authority and budget control." },
      { icon: Building2,          title: "Health System Affiliation",   desc: "Segment executives by IDN membership, health system size, or independent hospital classification for account-based campaigns." },
      { icon: SlidersHorizontal,  title: "Bed Count & Facility Tier",   desc: "Filter by facility size — critical access, community, regional, or academic medical center — to match your sales territory." },
      { icon: Cpu,                title: "Technology Adoption Flags",   desc: "Identify facilities currently using specific Electronic Health Record, Health Information System, or billing platforms. Refine accounts by technology infrastructure stage." },
      { icon: ShieldCheck,        title: "Purchasing Authority Data",   desc: "Records flagged with capital vs. operational budget ownership. Reach executives who sign contracts, not influencers alone." },
      { icon: RefreshCw,          title: "Quarterly Executive Updates", desc: "Hospital leadership turns over frequently. Quarterly verification cycles ensure your executive contacts remain accurate." },
    ],
  },

  "hospital-decision-makers/hospital-administrators": {
    kicker: "Hospital Administrator Data",
    headline: "Reach hospital administrators",
    accent: "who control operations and budgets.",
    cards: [
      { icon: Users,              title: "Administrative Role Hierarchy",         desc: "Segment administrators by Vice President, Director, Manager, and Coordinator levels for authority-matched outreach campaigns." },
      { icon: Building2,          title: "Department & Division Filters",         desc: "Reach administrators overseeing supply chain, facilities, HR, revenue cycle, and clinical operations independently." },
      { icon: SlidersHorizontal,  title: "Health System vs. Independent",         desc: "Distinguish administrators at IDN-affiliated hospitals from independent community and critical access hospital settings." },
      { icon: ClipboardList,      title: "Budget Authority Indicators",           desc: "Capital budget and operational budget authority levels flagged where available for vendor prioritization." },
      { icon: Activity,           title: "Bed Count & Facility Classification",   desc: "Segment by facility size: critical access (< 25 beds), community (25–499 beds), and academic medical center (500+)." },
      { icon: Cpu,                title: "Technology Platform Data",              desc: "Current Electronic Health Record, Health Information System, and supply chain platform usage flagged per facility for healthcare technology and software outreach." },
    ],
  },

  "hospital-decision-makers/ceo-cfo-healthcare": {
    kicker: "Healthcare CEO & CFO Data",
    headline: "Data built for the",
    accent: "highest level of healthcare leadership.",
    cards: [
      { icon: Star,               title: "Executive Title & Authority Level",     desc: "Separate hospital Chief Executive Officers from Chief Financial Officers, Chief Operating Officers, and system-level presidents. Each title carries distinct budget and contract authority." },
      { icon: Building2,          title: "Health System Scale Filters",           desc: "Reach leaders of small community hospitals, regional systems, and multi-state health networks as distinct size-matched segments." },
      { icon: SlidersHorizontal,  title: "Equity & Ownership Structure Flags",   desc: "For-profit, nonprofit, and government-owned hospital executives segmented for ownership-relevant messaging." },
      { icon: Award,              title: "Board & Committee Membership",          desc: "Executives with AHA, ACHE, HFMA, and state hospital association affiliations flagged for association-level targeting." },
      { icon: RefreshCw,          title: "Tenure & Appointment Data",             desc: "New appointments (< 2 years in role) and long-tenured executives identified. Reach leaders at their most receptive windows." },
      { icon: Activity,           title: "Media & Investor Relations Flags",      desc: "Executives with recent media coverage or investor relations activity flagged for high-profile account-based outreach." },
    ],
  },

  "hospital-decision-makers/chief-medical-officers": {
    kicker: "Chief Medical Officer Data",
    headline: "Chief Medical Officer data for clinical",
    accent: "and enterprise vendor outreach.",
    cards: [
      { icon: Building2,          title: "System vs. Hospital Chief Medical Officer Distinction",   desc: "Health system-level Chief Medical Officers hold broader authority than facility Chief Medical Officers — both are segmented and flagged independently." },
      { icon: Stethoscope,        title: "Clinical Specialty Background",          desc: "CMO specialty background (internal medicine, surgery, EM) data included for clinically relevant vendor conversations." },
      { icon: BadgeCheck,         title: "Board Certification Validation",         desc: "Chief Medical Officers holding active clinical board certifications flagged. Relevant for pharmaceutical and device companies seeking peer-level engagement." },
      { icon: ShieldCheck,        title: "Quality & Accreditation Focus",          desc: "Chief Medical Officers at hospitals with recent Joint Commission or Centers for Medicare and Medicaid Services accreditation activity flagged for quality and compliance vendors." },
      { icon: Award,              title: "Graduate Medical Education Ties",        desc: "Chief Medical Officers at teaching hospitals and graduate medical education-affiliated facilities flagged for medical education and residency program vendors." },
      { icon: FileText,           title: "Publication & Research Activity",        desc: "Clinically publishing Chief Medical Officers identified for academic and clinical evidence-based marketing approaches." },
    ],
  },

  "hospital-decision-makers/chief-nursing-officers": {
    kicker: "Chief Nursing Officer Data",
    headline: "Chief Nursing Officer data for nursing",
    accent: "workforce and quality vendors.",
    cards: [
      { icon: Building2,          title: "System-Level vs. Facility Chief Nursing Officer",         desc: "Chief Nursing Officers overseeing nursing strategy at multi-hospital system level segmented from facility-level Chief Nursing Officers." },
      { icon: Star,               title: "Magnet & Excellence Program Flags",      desc: "Chief Nursing Officers at Magnet-designated and Pathway to Excellence hospitals flagged for nursing practice and quality product vendors." },
      { icon: Award,              title: "ANCC & AONL Affiliation Flags",          desc: "Chief Nursing Officers with American Nurses Credentialing Center and American Organization for Nursing Leadership membership and leadership roles identified." },
      { icon: Users,              title: "Nursing Workforce Ratios",               desc: "Facilities with high travel nurse dependency and critical vacancy rates flagged for staffing and workforce solution outreach." },
      { icon: ClipboardList,      title: "Graduate Nursing Education Background",  desc: "Chief Nursing Officers with Doctor of Nursing Practice or Doctoral credentials identified for clinical decision-support and advanced nursing education marketing." },
      { icon: Layers,             title: "Board & Committee Roles",                desc: "Chief Nursing Officers serving on state nursing boards, ethics committees, or hospital governance bodies flagged for leadership-level engagement." },
    ],
  },

  "hospital-decision-makers/chief-of-staff": {
    kicker: "Hospital Chief of Staff Data",
    headline: "Chief of Staff data for",
    accent: "credentialing and vendor outreach.",
    cards: [
      { icon: Stethoscope,        title: "Specialty Background Filters",          desc: "Chiefs of Staff with surgical, medical, or emergency medicine backgrounds identified for specialty-relevant vendor outreach." },
      { icon: ShieldCheck,        title: "Credentialing Committee Authority",      desc: "Chiefs of Staff with credentialing committee authority flagged — key decision-makers for medical staff technology." },
      { icon: Building2,          title: "Academic vs. Community Hospital",        desc: "Academic medical center Chiefs of Staff segmented from community hospital peers — engagement approach differs significantly." },
      { icon: Award,              title: "Medical Staff Organization Role",        desc: "Chiefs serving on joint medical staff committees or regional medical staff leadership organizations identified." },
      { icon: BadgeCheck,         title: "Board Certification Status",             desc: "Active board certifications and specialty credentials for Chiefs of Staff validated and included in every record." },
      { icon: ClipboardList,      title: "Quality Reporting Oversight",            desc: "Chiefs at hospitals with active CMS quality improvement programs or Patient Safety Organizations flagged." },
    ],
  },

  "hospital-decision-makers/medical-directors": {
    kicker: "Medical Director Data",
    headline: "Medical Director data",
    accent: "by department and specialty.",
    cards: [
      { icon: SlidersHorizontal,  title: "Specialty & Departmental Scope",        desc: "Reach Medical Directors by department — radiology, emergency, anesthesiology, and 20+ additional clinical service lines." },
      { icon: Building2,          title: "Administrative vs. Clinical Focus",      desc: "Distinguish Medical Directors in administrative leadership roles from those in primarily clinical director roles." },
      { icon: Users,              title: "Physician Group Affiliation",            desc: "Medical Directors at large multispecialty groups, hospital-employed groups, and IPAs segmented separately." },
      { icon: ShieldCheck,        title: "Quality & Safety Program Oversight",     desc: "Medical Directors with quality metrics and patient safety program oversight flagged for quality software vendors." },
      { icon: Award,              title: "Academic Appointment Data",              desc: "Medical Directors with concurrent academic appointments at medical schools or residency programs identified." },
      { icon: Cpu,                title: "Telemedicine Program Direction",         desc: "Medical Directors overseeing virtual care programs flagged for telehealth technology and remote monitoring vendors." },
    ],
  },

  /* ───────── HEALTH & THERAPY HUB ───────── */
  "health-therapy": {
    kicker: "Allied & Therapy Professionals Data",
    headline: "Reach therapists who",
    accent: "specify, prescribe, and refer.",
    cards: [
      { icon: Stethoscope,        title: "Therapy Type Segmentation",   desc: "Filter by Physical Therapist, Occupational Therapist, Speech-Language Pathologist, Respiratory Therapist, Massage Therapist, and nine additional therapy disciplines. Each segment delivers a unique, non-overlapping audience." },
      { icon: Building2,          title: "Practice Setting Filters",    desc: "Separate hospital-based therapists from outpatient clinics, skilled nursing facilities, home health agencies, and private practices." },
      { icon: BadgeCheck,         title: "Licensure & Cert Validation", desc: "License status cross-validated against state therapy boards. Active, lapsed, and renewal-pending records are clearly coded." },
      { icon: SlidersHorizontal,  title: "Patient Volume Indicators",   desc: "Identify high-volume practices treating 30+ patients per week. Target the therapists most likely to specify your product." },
      { icon: FileText,           title: "Referral Network Mapping",    desc: "Records include primary referral sources and payor mix data, helping you align outreach with the full therapy care chain." },
      { icon: Layers,             title: "CE & Certification Targeting", desc: "Flag therapists approaching license renewal periods. Market continuing education courses to the highest-intent audience." },
    ],
  },

  "health-therapy/physical-therapists": {
    kicker: "Physical Therapist Data",
    headline: "Physical Therapist data that reaches",
    accent: "every specialty and practice setting.",
    cards: [
      { icon: Activity,           title: "Specialty Practice Focus",              desc: "Distinguish orthopedic Physical Therapists from neurological, pediatric, sports, and cardiovascular specialists. Each segment is non-overlapping." },
      { icon: Building2,          title: "Practice Setting Filters",              desc: "Separate outpatient clinic, acute care hospital, skilled nursing facility, home health, and private practice Physical Therapists into distinct audiences." },
      { icon: BadgeCheck,         title: "APTA & ABPTS Certification Flags",      desc: "Board-certified Clinical Specialists (OCS, NCS, PCS, SCS) validated against ABPTS records as a premium PT segment." },
      { icon: SlidersHorizontal,  title: "Patient Volume Indicators",             desc: "High-volume Physical Therapist clinics treating 25 or more patients daily flagged for supply, equipment, and health records vendor priority targeting." },
      { icon: Star,               title: "Dry Needling & Technique Flags",        desc: "Physical Therapists certified in dry needling, aquatic therapy, and manual therapy techniques identified for specialized product outreach." },
      { icon: Cpu,                title: "Telehealth Physical Therapist Providers",desc: "Physical Therapists offering virtual physical therapy flagged for digital health platform and remote exercise technology marketing." },
    ],
  },

  "health-therapy/occupational-therapists": {
    kicker: "Occupational Therapist Data",
    headline: "Occupational Therapist data for adaptive",
    accent: "equipment and continuing education outreach.",
    cards: [
      { icon: Building2,          title: "Practice Setting Segmentation",         desc: "Separate Occupational Therapists in school districts, acute care, outpatient, skilled nursing facilities, hand therapy clinics, and mental health settings." },
      { icon: BadgeCheck,         title: "NBCOT Certification Validation",        desc: "OTR/L and COTA certification status verified against NBCOT records. Lapsed and renewal-pending credentials clearly coded." },
      { icon: Award,              title: "Specialty Certification Flags",         desc: "Occupational Therapists with Board Certified in Physical Rehabilitation, Certified Hand Therapist, and other specialty certifications validated for the highest-credentialed Occupational Therapist segment." },
      { icon: SlidersHorizontal,  title: "Pediatric vs. Geriatric Population",    desc: "Occupational Therapists treating pediatric populations segmented from adult and geriatric-focused practitioners for product alignment." },
      { icon: ClipboardList,      title: "Adaptive Equipment Prescribers",        desc: "Occupational Therapists who regularly prescribe adaptive equipment and assistive technology devices flagged for durable medical equipment and assistive technology vendors." },
      { icon: Star,               title: "Hand Therapy Specialist Flags",         desc: "Certified Hand Therapists (CHT) segmented as a standalone, high-value audience for splinting and orthotic supply." },
    ],
  },

  "health-therapy/speech-language-therapists": {
    kicker: "Speech-Language Pathologist Data",
    headline: "Speech-Language Pathologist data for",
    accent: "dysphagia, augmentative communication, and continuing education outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "Specialty Focus Segmentation",          desc: "Reach Speech-Language Pathologists specializing in dysphagia, augmentative and alternative communication, pediatric language, voice disorders, and fluency as distinct clinical sub-audiences." },
      { icon: Building2,          title: "Practice Setting Filters",              desc: "Distinguish school-based Speech-Language Pathologists from acute care, outpatient, skilled nursing facility, private practice, and early intervention program settings." },
      { icon: BadgeCheck,         title: "ASHA CCC Certification Validation",     desc: "Certificate of Clinical Competence in Speech-Language Pathology certification status verified against American Speech-Language-Hearing Association records. Clinical Fellows and associate-level Speech-Language Pathologists also flagged." },
      { icon: Users,              title: "Pediatric vs. Adult Population Focus",   desc: "Speech-Language Pathologists with primarily pediatric caseloads segmented from adult neurological rehab and geriatric swallowing disorder specialists." },
      { icon: Cpu,                title: "Augmentative Communication Device Prescribers", desc: "Speech-Language Pathologists certified in augmentative and alternative communication device prescription flagged for assistive technology vendor targeting." },
      { icon: Activity,           title: "Telepractice Provider Flags",           desc: "Speech-Language Pathologists actively delivering services via telepractice platforms flagged for telehealth software and remote therapy tool vendors." },
    ],
  },

  "health-therapy/respiratory-therapists": {
    kicker: "Respiratory Therapist Data",
    headline: "Respiratory Therapist data for ventilator",
    accent: "and pulmonary care outreach.",
    cards: [
      { icon: Building2,          title: "Setting & Acuity Level Segmentation",   desc: "Separate critical care Respiratory Therapists in intensive care and neonatal intensive care units from home care, pulmonary rehab, and sleep lab respiratory therapist segments." },
      { icon: SlidersHorizontal,  title: "Credential Level Filters",              desc: "Distinguish Registered Respiratory Therapists from Certified Respiratory Therapists by scope and autonomy." },
      { icon: BadgeCheck,         title: "NBRC Certification Validation",         desc: "Registered Respiratory Therapist, Registered Polysomnographic Technologist, and specialty credential status verified against National Board for Respiratory Care records. Renewal-pending records flagged per state." },
      { icon: Activity,           title: "Advanced Ventilator Competency Flags",  desc: "Respiratory Therapists with advanced ventilator and oscillator competency documented for high-acuity equipment vendors." },
      { icon: Star,               title: "Sleep Disorder Specialist Flags",        desc: "Respiratory Therapists working in sleep labs segmented for continuous positive airway pressure device and sleep technology vendors." },
      { icon: Layers,             title: "Home Respiratory Care Providers",       desc: "Respiratory Therapists working in home health or durable medical equipment environments flagged for home oxygen, portable ventilator, and nebulizer supply outreach." },
    ],
  },

  "health-therapy/massage-therapists": {
    kicker: "Massage Therapist Data",
    headline: "Licensed Massage Therapist data for supply",
    accent: "and practice management outreach.",
    cards: [
      { icon: Award,              title: "Specialty Technique Certification",     desc: "Distinguish Licensed Massage Therapists certified in deep tissue, sports, lymphatic drainage, prenatal, and medical massage as separate segments." },
      { icon: Building2,          title: "Practice Setting Filters",              desc: "Separate Licensed Massage Therapists in clinical and chiropractic co-located practices from spa, resort, sports medicine, and independent settings." },
      { icon: ShieldCheck,        title: "NCBTMB & State License Validation",     desc: "Licensing verified against NCBTMB and all 50 state massage licensing boards where licensure is required." },
      { icon: Activity,           title: "High-Volume Practice Indicators",       desc: "Licensed Massage Therapists with high appointment volume flagged for massage table, supply, and practice management vendors." },
      { icon: ClipboardList,      title: "Insurance-Billing Eligible Therapists", desc: "Licensed Massage Therapists in states where massage is covered under health plans flagged for billing and insurance marketing." },
      { icon: RefreshCw,          title: "CE Renewal Targeting",                  desc: "Licensed Massage Therapists approaching continuing education renewal periods identified for course provider, advanced technique, and certification marketing." },
    ],
  },

  "health-therapy/emts-paramedics": {
    kicker: "EMT & Paramedic Data",
    headline: "EMS data for equipment",
    accent: "and certification outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "Certification Level Segmentation",      desc: "Separate EMT-Basic, AEMT, and Paramedic credentials into distinct audiences. Each level carries different product relevance." },
      { icon: Building2,          title: "Employment Setting Filters",            desc: "Reach EMTs in municipal EMS agencies, fire departments, hospital-based EMS, private ambulance, and air medical settings." },
      { icon: ShieldCheck,        title: "NREMT Certification Validation",         desc: "National Registry certification status verified. State-level licensure and reciprocity status flagged where available." },
      { icon: Star,               title: "Critical Care & Flight Paramedicine",    desc: "CCPs and flight paramedics with FP-C or CCEMTP credentials segmented for advanced monitoring and medication vendors." },
      { icon: Layers,             title: "Urban vs. Rural Agency Segmentation",   desc: "High-call-volume urban EMS agencies segmented from rural and volunteer departments for equipment tier targeting." },
      { icon: BadgeCheck,         title: "BLS & ACLS Instructor Flags",           desc: "EMTs certified as AHA BLS or ACLS instructors identified for training equipment and simulation product marketing." },
    ],
  },

  "health-therapy/radiologic-technicians": {
    kicker: "Radiologic Technician Data",
    headline: "Rad tech data by modality",
    accent: "and certification level.",
    cards: [
      { icon: SlidersHorizontal,  title: "Modality Certification Segmentation",   desc: "Separate radiographers, CT techs, MRI techs, mammographers, nuclear med, and sonographers by ARRT certification." },
      { icon: Building2,          title: "Practice Setting Filters",              desc: "Reach rad techs in hospital imaging, outpatient imaging centers, urgent care, and mobile imaging units as distinct segments." },
      { icon: BadgeCheck,         title: "ARRT Certification Validation",         desc: "Active registration verified against ARRT records. Post-primary certification specialties (CT, MRI, mammography) flagged per record." },
      { icon: Cpu,                title: "Advanced Modality Flags",               desc: "Techs holding CT and MRI post-primary certifications segmented for advanced equipment, contrast, and PACS technology vendors." },
      { icon: Star,               title: "Breast Imaging Specialist Flags",       desc: "ARRT-certified mammographers and tomosynthesis-trained techs identified for breast imaging equipment and AI tool marketing." },
      { icon: Activity,           title: "Teleradiology Support Flags",           desc: "Rad techs supporting remote reading and teleradiology operations flagged for PACS, worklist management, and connectivity vendors." },
    ],
  },

  "health-therapy/dieticians-nutritionists": {
    kicker: "Dietitian & Nutritionist Data",
    headline: "Registered Dietitian data for clinical",
    accent: "nutrition and wellness outreach.",
    cards: [
      { icon: BadgeCheck,         title: "Registered Dietitian vs. Dietetic Technician Credential Segmentation", desc: "Separate Registered Dietitian Nutritionists from Dietetic Technicians Registered and unlicensed nutritionists by state." },
      { icon: Building2,          title: "Practice Setting Filters",              desc: "Reach Registered Dietitians in clinical, outpatient counseling, public health, sports nutrition, corporate wellness, and private practice." },
      { icon: ShieldCheck,        title: "CDR Credential Validation",             desc: "Active RDN registration verified against Commission on Dietetic Registration records. Specialization endorsements included." },
      { icon: Award,              title: "Specialty Certification Flags",         desc: "Board Certified Specialists in Sports Dietetics (CSSD), Oncology (CSO), Pediatric (CSP), and Renal (CSR) flagged." },
      { icon: SlidersHorizontal,  title: "Clinical vs. Community Nutrition",      desc: "Registered Dietitians in medical nutrition therapy roles segmented from community, school, and public health nutrition program positions." },
      { icon: Cpu,                title: "Telehealth Nutrition Counseling Flags", desc: "Registered Dietitians providing virtual medical nutrition therapy flagged for telehealth, billing software, and meal-planning tool vendors." },
    ],
  },

  /* ───────── BEHAVIORAL & MENTAL HEALTH HUB ───────── */
  "behavioral-mental-health": {
    kicker: "Behavioral Health Professional Data",
    headline: "Data built for the fast-growing",
    accent: "behavioral health market.",
    cards: [
      { icon: Brain,              title: "Credential-Level Filtering",  desc: "Reach Doctoral-Level Psychologists, Licensed Clinical Social Workers, Licensed Marriage and Family Therapists, Licensed Professional Counselors, and psychiatrists as separate audiences. Each carries distinct prescribing and referral authority." },
      { icon: Building2,          title: "Practice Setting Segmentation", desc: "Distinguish private practices from community mental health centers, inpatient psychiatric units, and substance use facilities." },
      { icon: Heart,              title: "Patient Population Flags",    desc: "Identify clinicians treating adult, pediatric, geriatric, or dual-diagnosis populations for maximally relevant outreach." },
      { icon: Cpu,                title: "Telehealth Availability Flags", desc: "Clinicians actively providing telehealth services are flagged. Reach virtual care providers for platform and technology marketing." },
      { icon: ShieldCheck,        title: "Insurance Panel Participation", desc: "Data includes payor panel participation indicators. Identify clinicians accepting new patients and specific insurance networks." },
      { icon: RefreshCw,          title: "Monthly License Verification", desc: "Behavioral health license status changes frequently. Monthly verification ensures your outreach list stays compliant." },
    ],
  },

  "behavioral-mental-health/psychologists": {
    kicker: "Psychologist Data",
    headline: "Doctoral-Level Psychologist data for",
    accent: "assessment and practice outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "License Type & Degree Segmentation",   desc: "Separate licensed psychologists (PhD, PsyD, EdD) from psychological associates and pre-licensed fellows by credential." },
      { icon: Brain,              title: "Specialty Practice Area Filters",       desc: "Reach neuropsychologists, clinical psychologists, forensic psychologists, and school psychologists as distinct sub-audiences." },
      { icon: ShieldCheck,        title: "State Licensing Board Validation",      desc: "Licensure cross-validated against all 50 state psychology boards. Active, inactive, and license-pending records clearly coded." },
      { icon: Award,              title: "APA Membership & Division Affiliation", desc: "APA member psychologists and those affiliated with specific APA divisions flagged for targeted professional messaging." },
      { icon: ClipboardList,      title: "Assessment & Testing Specialization",   desc: "Psychologists primarily conducting neuropsychological assessments flagged for test publisher and scoring software outreach." },
      { icon: Cpu,                title: "Telehealth Provider Flags",             desc: "Licensed psychologists delivering therapy via telehealth platforms flagged for virtual care technology and billing software." },
    ],
  },

  "behavioral-mental-health/psychiatrists": {
    kicker: "Psychiatrist Data",
    headline: "Psychiatrist data for",
    accent: "pharmaceutical and clinical outreach.",
    cards: [
      { icon: Building2,          title: "Practice Setting Segmentation",         desc: "Separate inpatient, outpatient, community mental health, VA, and forensic psychiatrists into distinct validated segments." },
      { icon: SlidersHorizontal,  title: "Subspecialty Certification Flags",      desc: "Board-certified child/adolescent, geriatric, forensic, addiction, and consultation-liaison psychiatrists identified." },
      { icon: FileText,           title: "DEA Schedule II Prescribing Authority",  desc: "Active DEA registration for Schedule II controlled substance prescribing validated for pharmaceutical outreach." },
      { icon: Award,              title: "Academic & Research Appointment Data",   desc: "Psychiatrists with medical school faculty or clinical research investigator roles flagged for pharma MSL marketing." },
      { icon: Brain,              title: "Therapy vs. Medication Management Focus", desc: "Psychiatrists in primarily medication management practices segmented from those offering integrated psychotherapy." },
      { icon: BadgeCheck,         title: "ABPN Certification Validation",          desc: "American Board of Psychiatry and Neurology certification verified. MOC cycle data available for CME targeting." },
    ],
  },

  "behavioral-mental-health/mental-health-counselors": {
    kicker: "Mental Health Counselor Data",
    headline: "Licensed Mental Health Counselor data for",
    accent: "practice and technology outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "License Type Segmentation",             desc: "Separate Licensed Professional Counselors, Licensed Mental Health Counselors, Licensed Alcohol and Drug Counselors, and Licensed Clinical Professional Counselors by state-specific designation. Each maps to distinct scope and population focus." },
      { icon: Heart,              title: "Specialty Population Focus",             desc: "Reach counselors specializing in addiction, trauma, grief, eating disorders, and LGBTQ+-affirming practices as distinct sub-audiences." },
      { icon: ShieldCheck,        title: "State Licensure Board Validation",       desc: "Mental health counselor license status cross-validated against applicable state boards. Supervised hours status included." },
      { icon: Building2,          title: "Private Practice vs. Agency Setting",    desc: "Distinguish independently practicing LMHCs from agency-employed counselors in community and outpatient clinic settings." },
      { icon: ClipboardList,      title: "Insurance Panel & Credentialing Status", desc: "Counselors accepted on major insurance panels flagged. Ideal for Electronic Health Record, billing, and practice management software marketing." },
      { icon: Cpu,                title: "Telehealth Counseling Providers",        desc: "Licensed Professional Counselors and Licensed Mental Health Counselors actively providing virtual counseling flagged for telehealth, scheduling, and mental health app outreach." },
    ],
  },

  "behavioral-mental-health/social-workers": {
    kicker: "Social Worker Data",
    headline: "Licensed Clinical Social Worker data for clinical",
    accent: "and community outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "License Level Segmentation",            desc: "Separate Licensed Social Workers, Licensed Clinical Social Workers, Licensed Master Social Workers, and macro social workers by license designation for relevant outreach alignment." },
      { icon: Building2,          title: "Practice Setting Filters",               desc: "Reach social workers in hospitals, school districts, child welfare, corrections, hospice, and private practice." },
      { icon: ShieldCheck,        title: "NASW & ASWB Credential Validation",     desc: "ASWB exam passage and state-level social work license status verified. NASW membership and specialty credentials flagged." },
      { icon: Heart,              title: "Clinical vs. Case Management Focus",     desc: "Licensed clinical social workers in therapy roles segmented from case managers and community organizers." },
      { icon: Stethoscope,        title: "Healthcare & Medical Social Work",        desc: "Hospital-based and medical social workers flagged separately for care transitions and discharge planning vendor outreach." },
      { icon: Users,              title: "Hospice & Palliative Care Flags",        desc: "Social workers at hospice organizations and palliative care programs identified for end-of-life care product marketing." },
    ],
  },

  "behavioral-mental-health/marriage-family-therapists": {
    kicker: "Marriage & Family Therapist Data",
    headline: "Licensed Marriage and Family Therapist data for practice",
    accent: "and continuing education outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "License Type by State",                  desc: "Distinguish Licensed Marriage and Family Therapists, Marriage and Family Counselors, and Marriage and Family Therapists by state designation. Practice scope and supervision requirements vary by jurisdiction." },
      { icon: Heart,              title: "Specialty Population Focus",              desc: "Reach therapists specializing in couples counseling, family systems, child/adolescent, and premarital therapy as distinct segments." },
      { icon: Award,              title: "AAMFT Membership & Approved Supervisor",  desc: "AAMFT members and approved supervisors identified for training, CE, and clinical supervision software targeting." },
      { icon: ShieldCheck,        title: "State Licensure Board Validation",        desc: "LMFT license status cross-validated per state. Supervised hours, associate license, and renewal cycle data included." },
      { icon: Building2,          title: "Private Practice vs. Agency Setting",     desc: "Independently practicing Licensed Marriage and Family Therapists segmented from agency-employed therapists in community, school, and hospital-affiliated roles." },
      { icon: ClipboardList,      title: "Insurance Panel Participation Flags",     desc: "Licensed Marriage and Family Therapists accepted on major insurance panels identified for billing, credentialing, and practice management software outreach." },
    ],
  },

  /* ───────── DENTAL & VISION HUB ───────── */
  "dental-vision": {
    kicker: "Dental & Vision Professional Data",
    headline: "Reach every dental and vision",
    accent: "professional with precision.",
    cards: [
      { icon: Smile,              title: "Specialty & Subspecialty Filters", desc: "Segment general dentists from orthodontists, periodontists, endodontists, and oral surgeons. Vision data covers Optometrists and ophthalmologists." },
      { icon: Building2,          title: "Practice Model Identification", desc: "Distinguish solo practitioners, group practices, and DSO-affiliated offices. Target ownership type for relevant business messaging." },
      { icon: SlidersHorizontal,  title: "Equipment Make & Vintage",    desc: "Practices flagged by primary X-ray, CAD/CAM, and laser equipment. Identify the best prospects for capital equipment sales." },
      { icon: BadgeCheck,         title: "Credentialing & Board Status", desc: "ADA and AOA board status validated against current membership rolls. Active and specialty-certified records clearly identified." },
      { icon: FileText,           title: "Lab & Supply Affiliation Data", desc: "Dental lab relationships and primary supply distributor affiliations included. Target the full dental supply chain efficiently." },
      { icon: Layers,             title: "Multi-Channel Activation",    desc: "Email, direct mail, and programmatic display audiences available. Reach dental decision-makers across every marketing channel." },
    ],
  },

  "dental-vision/dentists": {
    kicker: "General & Specialty Dentist Data",
    headline: "Dentist data for supply",
    accent: "equipment and drug outreach.",
    cards: [
      { icon: Smile,              title: "General vs. Specialty Designation",      desc: "Separate general dentists from periodontists, endodontists, oral surgeons, orthodontists, and prosthodontists in a single query." },
      { icon: Award,              title: "ADA Membership & Dental School Flags",   desc: "ADA member dentists identified and flagged. Dental school graduation year available for career-stage outreach." },
      { icon: Building2,          title: "Solo vs. DSO Practice Identification",   desc: "Independent solo practitioners segmented from DSO-affiliated, group practice, and multi-location dental office settings." },
      { icon: Cpu,                title: "Equipment Make & Vintage Data",          desc: "CBCT, CAD/CAM, laser, and digital X-ray equipment make and installation year flagged for capital equipment vendors." },
      { icon: ClipboardList,      title: "Insurance & Fee-for-Service Mix",        desc: "Dentists by primary payor mix — heavy insurance, fee-for-service, and Medicaid — for relevant financial product targeting." },
      { icon: FileText,           title: "DEA Registration & Sedation Permits",    desc: "Dentists with IV sedation and oral conscious sedation permits flagged for anesthesia supply and monitoring vendors." },
    ],
  },

  "dental-vision/dental-hygienists": {
    kicker: "Dental Hygienist Data",
    headline: "Hygienist data for",
    accent: "instrument and CE outreach.",
    cards: [
      { icon: Building2,          title: "Work Setting Segmentation",              desc: "Reach hygienists in solo dental offices, DSO chains, periodontal offices, community health clinics, and school programs." },
      { icon: Award,              title: "Extended Function & Expanded Duties",     desc: "Dental hygienists with EFDA or EDHA credentials flagged by state for expanded-function product marketing." },
      { icon: BadgeCheck,         title: "ADHA Membership & Specialty Flags",      desc: "ADHA members and locally anesthesia-certified hygienists identified for professional association and CE product targeting." },
      { icon: ShieldCheck,        title: "Direct Access State Flags",              desc: "Hygienists practicing under direct access laws flagged for public health and community outreach campaigns." },
      { icon: SlidersHorizontal,  title: "Periodontal & Specialty Clinic Focus",   desc: "Hygienists primarily in periodontal, implant, and specialty dental offices flagged for relevant instrument and product outreach." },
      { icon: RefreshCw,          title: "CE & License Renewal Targeting",         desc: "Hygienists approaching state CE requirement cycles identified for CE provider, webinar, and conference marketing." },
    ],
  },

  "dental-vision/dental-assistants": {
    kicker: "Dental Assistant Data",
    headline: "DA data for supply",
    accent: "and training product outreach.",
    cards: [
      { icon: BadgeCheck,         title: "Credential Level Segmentation",          desc: "Separate CDAs (DANB-certified), RDAs (state-registered), and non-certified dental assistants by credential level." },
      { icon: Building2,          title: "Specialty Office Setting Flags",         desc: "Dental assistants in orthodontic, oral surgery, periodontic, and pediatric practices segmented from general dentistry settings." },
      { icon: Award,              title: "Expanded Function Credential Flags",      desc: "EFDAs with coronal polishing, sealant application, and impression-taking authorizations flagged by state." },
      { icon: ShieldCheck,        title: "DANB Certification Validation",           desc: "CDA, COA, CPFDA, and CRFDA certification status cross-validated against DANB records where available." },
      { icon: SlidersHorizontal,  title: "DSO vs. Independent Practice",           desc: "Dental assistants in large DSO chains segmented from small and independent dental office settings." },
      { icon: Cpu,                title: "Radiology Operator Authorization",        desc: "Dental assistants with state dental radiography operator permits flagged for X-ray equipment and sensor vendors." },
    ],
  },

  "dental-vision/optometrists": {
    kicker: "Optometrist Data",
    headline: "Optometrist data for lens",
    accent: "pharmaceutical and device outreach.",
    cards: [
      { icon: Eye,                title: "Therapeutic vs. Diagnostic Scope",       desc: "Optometrists with therapeutic prescribing authority for medications segmented from diagnostic-only scope practitioners." },
      { icon: BadgeCheck,         title: "Specialty Certification Flags",          desc: "Contact lens specialists, low vision specialists, and pediatric optometry certificate holders identified and flagged." },
      { icon: Award,              title: "AOA Membership & Accreditation Data",    desc: "American Optometric Association member Optometrists and Accreditation Council on Optometric Education school graduates flagged for association-adjacent pharmaceutical and supply outreach." },
      { icon: Building2,          title: "Solo vs. Corporate Practice",            desc: "Independent Optometrists segmented from franchise-setting and retail-optical-setting-employed optometrists." },
      { icon: SlidersHorizontal,  title: "High-Volume Contact Lens Practice",      desc: "Optometrists fitting 20+ new contact lens patients weekly flagged for contact lens manufacturer and solution supply targeting." },
      { icon: Stethoscope,        title: "Ocular Disease Management Focus",        desc: "Optometrists with glaucoma, dry eye, and diabetic retinopathy co-management protocols flagged for pharmaceutical and device vendors." },
    ],
  },

  "dental-vision/opticians": {
    kicker: "Optician Data",
    headline: "Optician data for frame",
    accent: "lab and optical supply outreach.",
    cards: [
      { icon: BadgeCheck,         title: "License Level & ABO Certification",      desc: "ABO-certified opticians identified and segmented from non-licensed dispensers. State-level licensing status included." },
      { icon: Building2,          title: "Practice Setting Segmentation",          desc: "Reach opticians in independent optical shops, ophthalmology offices, OD practices, retail chains, and hospital dispensaries." },
      { icon: Award,              title: "NCLE Certification for Contact Lens Fitting", desc: "Opticians holding National Contact Lens Examiners certification flagged for contact lens supply and fitting tool vendors." },
      { icon: Layers,             title: "Frame & Lens Lab Supplier Affiliations", desc: "Optician primary frame brand and lens lab supplier relationships flagged for optical wholesale vendor outreach." },
      { icon: RefreshCw,          title: "ABO Recertification Targeting",          desc: "Opticians approaching ABO recertification periods identified for CE provider and exam preparation product marketing." },
      { icon: SlidersHorizontal,  title: "Independent vs. Chain Setting",          desc: "Independent optical shop dispensers segmented from retail-chain-employed opticians for relevant business messaging." },
    ],
  },

  /* ───────── PHARMACY HUB ───────── */
  "pharmacy-practice-management": {
    kicker: "Pharmacy Professional Data",
    headline: "Target pharmacists and managers",
    accent: "who drive drug and supply decisions.",
    cards: [
      { icon: Pill,               title: "Practice Setting Segmentation", desc: "Separate retail chain, independent, hospital, compounding, and mail-order pharmacists into distinct, non-overlapping segments." },
      { icon: FileText,           title: "DEA Schedule Authorizations",  desc: "Identify pharmacists and pharmacies licensed to dispense Schedule II–V controlled substances for compliant targeted outreach." },
      { icon: SlidersHorizontal,  title: "Chain vs. Independent Flags",  desc: "Independent pharmacy owners flagged separately from chain-employed pharmacists. Reach the right decision-maker for every deal." },
      { icon: Building2,          title: "Pharmacy Benefit Manager Affiliation Data", desc: "Pharmacy Benefit Manager contract affiliations identified. Ideal for Pharmacy Benefit Managers recruiting network pharmacies or negotiating contracts." },
      { icon: BadgeCheck,         title: "Technician Ratio Indicators",  desc: "High-volume dispensing pharmacies flagged by technician-to-pharmacist ratio. Target the busiest locations for supply outreach." },
      { icon: RefreshCw,          title: "Biannual License Verification", desc: "State pharmacy board license status verified biannually. Lapsed, suspended, and renewal-pending records removed automatically." },
    ],
  },

  "pharmacy-practice-management/pharmacists": {
    kicker: "Pharmacist Data",
    headline: "Pharmacist data for drug",
    accent: "Pharmacy Benefit Manager and supply outreach.",
    cards: [
      { icon: Building2,          title: "Practice Setting Segmentation",          desc: "Separate retail, independent, hospital, compounding, clinical, and mail-order pharmacists into distinct validated audiences." },
      { icon: FileText,           title: "DEA Registration & Schedule Authority",  desc: "Pharmacists licensed for Schedule II–V dispensing validated. Controlled substance specialty pharmacy flags included." },
      { icon: Award,              title: "BPharm vs. PharmD Degree Distinction",   desc: "Doctor of Pharmacy (PharmD) graduates segmented from Bachelor of Pharmacy degree holders for education-tier messaging." },
      { icon: BadgeCheck,         title: "BCPS & Specialty Board Certification",   desc: "Board Certified Pharmacotherapy Specialists (BCPS) and BPS specialty pharmacists flagged for advanced clinical targeting." },
      { icon: ShieldCheck,        title: "State Pharmacy Board License Validation", desc: "Active pharmacist licensure verified against state boards biannually. Suspended and renewal-pending status coded." },
      { icon: Cpu,                title: "CDTM & MTM Authority",                   desc: "Pharmacists in states with Collaborative Drug Therapy Management agreements and MTM provider credentials flagged." },
    ],
  },

  "pharmacy-practice-management/physician-practice-managers": {
    kicker: "Physician Practice Manager Data",
    headline: "Practice manager data for",
    accent: "Electronic Health Record supply and operations outreach.",
    cards: [
      { icon: Building2,          title: "Practice Size & Specialty Filters",      desc: "Reach practice managers by clinic size (solo, small group, large multispecialty) and primary physician specialty type." },
      { icon: Users,              title: "Administrative Title Segmentation",       desc: "Distinguish Practice Administrators, Office Managers, Revenue Cycle Directors, and Operations Directors by authority level." },
      { icon: Cpu,                title: "Electronic Health Record & Practice Management Platform Flags", desc: "Current Electronic Health Record and practice management software in use at the practice flagged. Ideal for software vendor competitive displacement campaigns." },
      { icon: FileText,           title: "Billing & Revenue Cycle Authority",       desc: "Practice managers with coding, billing, and AR oversight authority segmented for revenue cycle and billing software vendors." },
      { icon: Layers,             title: "Multi-Site & Health System Affiliation",  desc: "Practice managers overseeing multiple clinic locations or health-system-aligned medical groups flagged for enterprise targeting." },
      { icon: ClipboardList,      title: "Procurement & Supply Chain Role",         desc: "Practice managers with purchasing authority for supplies and equipment identified for B2B vendor priority outreach." },
    ],
  },

  /* ───────── SPECIALTY & OTHER HUB ───────── */
  "specialty-other": {
    kicker: "Specialty Healthcare Professional Data",
    headline: "Niche professional data that",
    accent: "generalist lists can never match.",
    cards: [
      { icon: PawPrint,           title: "Veterinary Specialty Targeting", desc: "Segment Veterinarians by species focus — small animal, equine, food animal, and exotic — for highly targeted supply and drug outreach." },
      { icon: ShieldCheck,        title: "Chiropractic License Validation", desc: "DC license status cross-matched against state chiropractic boards. Board certification and technique specialization data included." },
      { icon: SlidersHorizontal,  title: "Allied Health Credential Filters", desc: "Radiologic technicians, dieticians, EMTs, and 14 additional allied disciplines available as standalone, validated audience segments." },
      { icon: Building2,          title: "Clinic vs. Hospital Setting",  desc: "Identify specialty practitioners in private clinic, hospital-employed, and academic medical center settings for relevant messaging." },
      { icon: BadgeCheck,         title: "Board Certification Flags",    desc: "Specialty board certifications validated and flagged. Reach AVMA, ACA, and ASCP board-certified professionals with confidence." },
      { icon: Layers,             title: "Multi-Channel Delivery Ready", desc: "Every specialty dataset delivered in email, postal, phone, and digital activation formats for omnichannel campaign flexibility." },
    ],
  },

  "specialty-other/chiropractors": {
    kicker: "Chiropractor Data",
    headline: "Chiropractor data for technique",
    accent: "and equipment-specific outreach.",
    cards: [
      { icon: SlidersHorizontal,  title: "Technique Specialization Flags",        desc: "Reach Chiropractors certified in Gonstead, Diversified, Sacro Occipital Technique, Activator, and Cox Flexion as distinct technique-based sub-segments." },
      { icon: Building2,          title: "Practice Setting Segmentation",         desc: "Separate solo chiropractic offices from multi-practitioner clinics, integrated wellness centers, and sports medicine co-located practices." },
      { icon: ShieldCheck,        title: "State License & NBCE Validation",       desc: "Active chiropractic licensure verified against state boards and NBCE records. License renewal cycle and continuing education status included." },
      { icon: Award,              title: "Adjunct Therapy Certifications",         desc: "Chiropractors with acupuncture, kinesiology taping, and physical rehabilitation certifications flagged for complementary supply vendors." },
      { icon: ClipboardList,      title: "Insurance vs. Cash-Pay Practice Flags",  desc: "Chiropractic offices primarily billing insurance segmented from cash-pay, membership-model, and direct-care practices." },
      { icon: Cpu,                title: "Digital Radiography Equipment Data",     desc: "Practices with in-office X-ray, cone beam CT, or surface EMG equipment flagged for imaging and diagnostic product vendors." },
    ],
  },

  "specialty-other/veterinarians": {
    kicker: "Veterinarian Data",
    headline: "Veterinarian data for pharma",
    accent: "and specialty supply outreach.",
    cards: [
      { icon: PawPrint,           title: "Species Specialization Segmentation",    desc: "Separate small animal, large animal, equine, exotic/zoo, avian, and aquatic veterinarians into distinct practice audiences." },
      { icon: BadgeCheck,         title: "ABVP Diplomate Flags",                   desc: "American Board of Veterinary Practitioners Diplomates flagged by species specialty for targeted drug and supply outreach." },
      { icon: Building2,          title: "Practice Setting Filters",               desc: "Distinguish private small animal clinic, specialty/emergency hospital, mobile vet, and university teaching hospital settings." },
      { icon: Award,              title: "AVMA & State VMA Membership Flags",       desc: "American Veterinary Medical Association member Veterinarians and state Veterinary Medical Association members identified for association-adjacent pharmaceutical and supply marketing." },
      { icon: FileText,           title: "Dispensing Practice & DEA Registration", desc: "Veterinary practices registered to dispense controlled substances and maintain in-clinic pharmacies flagged for pharma outreach." },
      { icon: Layers,             title: "Large Animal & Production Focus",         desc: "Veterinarians serving cattle, swine, poultry, and aquaculture production operations segmented for production animal drug vendors." },
    ],
  },

  "specialty-other/allied-healthcare-professionals": {
    kicker: "Allied Healthcare Professional Data",
    headline: "Multi-discipline data for",
    accent: "every allied health segment.",
    cards: [
      { icon: Layers,             title: "Discipline-Level Segmentation",          desc: "Separate radiologic technicians, dietitians, EMTs, clinical lab scientists, respiratory therapists, and 12+ allied disciplines." },
      { icon: BadgeCheck,         title: "Credential & License Validation",        desc: "ASCP, ARRT, AARC, CDR, and discipline-specific certifications cross-validated for each allied health profession." },
      { icon: Building2,          title: "Practice Setting Filters",               desc: "Reach allied professionals in hospital labs, imaging centers, public health agencies, schools, and private clinics." },
      { icon: SlidersHorizontal,  title: "Specialty Certification Flags",          desc: "Advanced credentials within each discipline (Clinical Laboratory Scientist generalist vs. specialist, Registered Respiratory Therapist vs. Certified Respiratory Therapist) flagged for appropriate tier messaging." },
      { icon: Activity,           title: "Volume & Acuity Indicators",             desc: "High-volume hospital departments and labs with 24/7 operations flagged for supply, equipment, and education priority outreach." },
      { icon: Cpu,                title: "Telehealth & Remote Delivery Flags",     desc: "Allied professionals delivering services via telehealth or remote models identified for digital health tool vendor outreach." },
    ],
  },
};

const DEFAULT: HubFeatures = {
  kicker: "Healthcare Data Intelligence",
  headline: "Six capabilities that power",
  accent: "high-performance healthcare campaigns.",
  cards: [
    { icon: ShieldCheck,        title: "NPI-Verified Records",        desc: "Every record cross-matched against CMS NPPES and state license boards. Active, licensed professionals only — no stale aggregates." },
    { icon: SlidersHorizontal,  title: "Specialty-Level Targeting",   desc: "Filter by specialty code, credential type, board certification, and practice setting. Every query returns a distinct, actionable audience." },
    { icon: FileText,           title: "Rich Demographic Data",       desc: "Records include gender, years in practice, NPI, medical school, graduation year, and geographic filters down to the ZIP code level." },
    { icon: Building2,          title: "Facility & Affiliation Data", desc: "Hospital systems, health network affiliations, practice group names, and facility size data included for account-based targeting." },
    { icon: RefreshCw,          title: "Weekly Data Hygiene",         desc: "Continuous verification against national databases, USPS NCOA, and opt-out registries. Bounce rates consistently under 2%." },
    { icon: Layers,             title: "Multi-Channel Delivery",      desc: "Email, direct mail, phone, and programmatic audience formats available. Activate your list across every marketing channel on day one." },
  ],
};

type SanityFeaturesData = {
  heroImageUrl?: string;
  kicker?: string;
  headlinePlain?: string;
  headlineAccent?: string;
  cards?: { iconName?: string; title?: string; desc?: string }[];
} | null | undefined;

export default function HealthcareFeaturesSection({
  slugParts,
  sanityData,
}: {
  slugParts: string[];
  sanityData?: SanityFeaturesData;
}) {
  const key = getPageKey(slugParts);
  const hubKey = key.split("/")[0];

  let kicker: string;
  let headline: string;
  let accent: string;
  let cards: FeatureCard[];
  let heroImage: string;

  if (sanityData?.cards && sanityData.cards.length > 0) {
    /* Use Sanity CMS data */
    kicker   = sanityData.kicker ?? "";
    headline = sanityData.headlinePlain ?? "";
    accent   = sanityData.headlineAccent ?? "";
    heroImage = sanityData.heroImageUrl ?? HERO_IMAGES[key] ?? HERO_IMAGES[hubKey] ?? HERO_IMAGES["default"];
    cards = sanityData.cards.map((c) => ({
      icon: ICON_MAP[c.iconName ?? ""] ?? ShieldCheck,
      title: c.title ?? "",
      desc: c.desc ?? "",
    }));
  } else {
    /* Fallback to hardcoded DATA */
    const entry = DATA[key] ?? DATA[hubKey] ?? DEFAULT;
    kicker   = entry.kicker;
    headline = entry.headline;
    accent   = entry.accent;
    cards    = entry.cards;
    heroImage = HERO_IMAGES[key] ?? HERO_IMAGES[hubKey] ?? HERO_IMAGES["default"];
  }

  const { icon: HeroIcon, title: heroTitle, desc: heroDesc } = cards[0];
  const sideCards   = cards.slice(1, 3);
  const bottomCards = cards.slice(3);

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080F24 0%, #0C1847 40%, #061030 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle, #6FD3FF 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,167,239,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(29,69,217,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container-custom relative">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-400">{kicker}</span>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-white">
            {headline}{" "}
            <span style={{ background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#22BFFF 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {accent}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 max-w-6xl mx-auto">

          {/* Hero card */}
          <div className="reveal lg:col-span-2 lg:row-span-2 relative overflow-hidden rounded-2xl min-h-[380px] lg:min-h-[520px] group cursor-default">
            <Image src={heroImage} alt={heroTitle} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 700px" quality={55} priority />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,16,48,0.97) 0%, rgba(6,16,48,0.6) 45%, rgba(6,16,48,0.18) 100%)" }} />
            <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: "rgba(0,167,239,0.15)", border: "1px solid rgba(0,167,239,0.35)", backdropFilter: "blur(12px)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] font-semibold text-cyan-400 tracking-wider uppercase">Live Data</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="font-mono text-[11px] font-semibold text-white/30 tracking-[0.2em] mb-4 block">01</span>
              <div className="w-14 h-14 rounded-xl grid place-items-center mb-5" style={{ background: "linear-gradient(135deg,rgba(29,69,217,0.55),rgba(0,167,239,0.45))", border: "1px solid rgba(0,167,239,0.45)", backdropFilter: "blur(12px)" }}>
                <HeroIcon className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="h-[2px] w-12 rounded-full mb-4" style={{ background: "linear-gradient(90deg,#1D45D9,#00A7EF)" }} />
              <h3 className="font-display font-bold text-2xl lg:text-[1.75rem] text-white mb-3 tracking-tight">{heroTitle}</h3>
              <p className="text-white/65 text-[15px] leading-relaxed max-w-lg">{heroDesc}</p>
            </div>
          </div>

          {/* Right column cards */}
          {sideCards.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="reveal group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(0,167,239,0.4),0_20px_60px_-10px_rgba(0,167,239,0.18)] hover:bg-[rgba(0,167,239,0.06)]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
              <span className="absolute top-5 right-6 font-mono text-[11px] font-semibold text-white/20 tracking-widest">{String(i + 2).padStart(2, "0")}</span>
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(135deg,rgba(29,69,217,0.4),rgba(0,167,239,0.3))", border: "1px solid rgba(0,167,239,0.25)" }}>
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="h-[2px] w-0 group-hover:w-full rounded-full mb-4 transition-all duration-500" style={{ background: "linear-gradient(90deg,#1D45D9,#00A7EF)" }} />
              <h3 className="font-display font-semibold text-[17px] text-white mb-2 tracking-tight">{title}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{desc}</p>
            </div>
          ))}

          {/* Bottom row */}
          {bottomCards.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="reveal group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(0,167,239,0.4),0_20px_60px_-10px_rgba(0,167,239,0.18)] hover:bg-[rgba(0,167,239,0.06)]" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
              <span className="absolute top-5 right-6 font-mono text-[11px] font-semibold text-white/20 tracking-widest">{String(i + 4).padStart(2, "0")}</span>
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 transition-all duration-300 group-hover:scale-105" style={{ background: "linear-gradient(135deg,rgba(29,69,217,0.4),rgba(0,167,239,0.3))", border: "1px solid rgba(0,167,239,0.25)" }}>
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="h-[2px] w-0 group-hover:w-full rounded-full mb-4 transition-all duration-500" style={{ background: "linear-gradient(90deg,#1D45D9,#00A7EF)" }} />
              <h3 className="font-display font-semibold text-[17px] text-white mb-2 tracking-tight">{title}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
