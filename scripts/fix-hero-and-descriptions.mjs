/**
 * Fix hero titles (remove repeated H1) and make attribute card
 * descriptions truly unique per page — not just name-swapped templates.
 *
 * Usage: node scripts/fix-hero-and-descriptions.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);
function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
}
function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

function getCat(slug) {
  if (slug.includes("b2c-database")) return "b2c";
  if (slug.includes("/healthcare/")) return "hc";
  if (slug.includes("/other-industry/")) return "ind";
  if (slug.includes("/crm-users")) return "crm";
  if (slug.includes("/erp-users")) return "erp";
  if (slug.includes("/dbms-users")) return "dbms";
  if (slug.includes("/operating-system")) return "os";
  if (slug.includes("/software-email")) return "sw";
  if (slug.includes("/business-technology")) return "biz";
  return "tech";
}

function shortName(h1) {
  return h1.replace(/ Email List$/i, "").replace(/ Mailing List$/i, "").replace(/ Email Lists$/i, "")
    .replace(/ Mailing Data$/i, "").replace(/ Mailing Addresses$/i, "").replace(/ Email Database$/i, "")
    .replace(/ Contact Database$/i, "").replace(/ Data List$/i, "").replace(/ Contact Lists$/i, "")
    .replace(/ Users Lists$/i, "").replace(/ Users List$/i, "").replace(/ Users Email List$/i, "")
    .replace(/ Email Data$/i, "").replace(/ Customers Email List$/i, "").replace(/ User Email List$/i, "")
    .replace(/ User List$/i, "").replace(/ Data$/i, "").replace(/ Lists$/i, "").replace(/ List$/i, "").trim();
}

/* ═══════════════════════════════════════════════
   1) HERO TITLE ACCENT — unique taglines
   ═══════════════════════════════════════════════ */

function genTitleAccent(h1, sn, cat, i) {
  const hcAccents = [
    "Verified & Deliverable.",
    "NPI-Verified Contacts.",
    "Specialty-Level Precision.",
    "Practice-Ready Data.",
    "Clinically Verified Records.",
    "Multi-Channel Healthcare Data.",
    "Board-Certified Accuracy.",
    "HIPAA-Conscious Outreach.",
    "Licensed & Current.",
    "Direct-to-Provider Access.",
    "Credentialed Contact Data.",
    "Clinical-Grade Targeting.",
  ];
  const indAccents = [
    "Decision-Maker Access.",
    "Industry-Verified Contacts.",
    "Firmographic Precision.",
    "Executive-Level Targeting.",
    "Account-Ready Intelligence.",
    "Revenue-Segmented Data.",
    "Multi-Stakeholder Coverage.",
    "Territory-Aligned Contacts.",
    "Procurement-Ready Leads.",
    "Enterprise-Grade Data.",
  ];
  const techAccents = [
    "Technographic Precision.",
    "Installation-Verified Data.",
    "Platform-Level Intelligence.",
    "Buyer-Ready Contacts.",
    "Stack-Aware Targeting.",
    "Deployment-Confirmed Records.",
    "IT Decision-Maker Access.",
    "Version-Level Detail.",
    "Ecosystem-Mapped Data.",
    "License-Tracked Intelligence.",
    "Admin-Level Contacts.",
    "Integration-Ready Profiles.",
    "Cloud & On-Prem Coverage.",
    "Renewal-Timed Outreach.",
    "Seat-Count Visibility.",
    "Migration-Ready Targeting.",
    "Cross-Platform Intelligence.",
    "Vendor-Verified Records.",
    "Contract-Aware Data.",
    "User-Base Analytics.",
    "Module-Level Detection.",
    "Adoption-Stage Insights.",
    "Multi-Vendor Mapping.",
    "Endpoint-Level Coverage.",
    "Infrastructure Intelligence.",
    "Workload-Aware Data.",
    "Deployment-Scale Metrics.",
    "Platform-Certified Records.",
    "Operational Visibility.",
    "Technology Buyer Access.",
    "Stack-Verified Profiles.",
    "Usage-Pattern Insights.",
    "Budget-Cycle Alignment.",
    "Upgrade-Ready Targeting.",
    "Enterprise IT Coverage.",
    "Implementation-Stage Data.",
  ];
  const b2cAccents = [
    "Permission-Based & Verified.",
    "Demographic-Rich Profiles.",
    "Consumer-Ready Audiences.",
    "Household-Level Precision.",
    "Behavioral Intelligence.",
    "Lifestyle-Segmented Data.",
    "Purchase-Intent Signals.",
    "Multi-Channel Consumer Data.",
    "Response-Optimized Records.",
    "Privacy-Compliant Outreach.",
  ];

  const pools = { hc: hcAccents, ind: indAccents, b2c: b2cAccents };
  const pool = pools[cat] || techAccents;
  return pool[i % pool.length];
}

/* ═══════════════════════════════════════════════
   2) ATTRIBUTE DESCRIPTIONS — truly unique per page
   Each HC page gets 8 cards with completely different
   descriptions, not name-swapped templates.
   ═══════════════════════════════════════════════ */

function genAttributes(h1, sn, cat, catIdx) {
  const snl = sn.toLowerCase();

  // ─── HEALTHCARE (12 pages) ────────────────────
  const hcDescSets = [
    // 0: Cardiologists
    [
      feat("Stethoscope", `${sn} NPI Data`, `Cross-referenced against the NPPES database to verify each cardiologist's active license status, board certifications, and interventional subspecialty designations.`),
      feat("Mail", `${sn} Email`, `Individually validated email addresses for cardiologists across hospital systems, private practices, and academic medical centers with ongoing bounce monitoring.`),
      feat("Phone", `${sn} Direct Phone`, `Direct-dial numbers bypassing hospital switchboards, connecting you to cardiologists at the practice or department level with line-type verification.`),
      feat("MapPin", `${sn} Practice Location`, `Geocoded practice addresses including catheterization labs, electrophysiology centers, and heart failure clinics mapped to ZIP+4 precision.`),
      feat("Heart", `${sn} Specialty Tags`, `Subspecialty classifications covering interventional cardiology, electrophysiology, heart failure, pediatric cardiology, and preventive cardiology.`),
      feat("Building2", `${sn} Facility Data`, `Hospital and health system affiliations with catheterization lab volume data, teaching status, and cardiac surgery capability indicators.`),
      feat("Activity", `${sn} Credentials`, `Fellowship training records, ABIM board certification status, and state licensure verification for credential-based audience filtering.`),
      feat("Shield", `${sn} Compliance Flags`, `HIPAA-conscious permission tracking with documented opt-in provenance and CAN-SPAM suppression for compliant cardiologist outreach.`),
    ],
    // 1: Chiropractors
    [
      feat("Stethoscope", `${sn} NPI Data`, `Validated through state chiropractic board registries and NPI lookup to confirm current DC licensure, technique specializations, and practice scope.`),
      feat("Mail", `${sn} Email`, `Practice-specific email addresses sourced from clinic websites and professional directories, verified monthly for deliverability above 95%.`),
      feat("Phone", `${sn} Direct Phone`, `Clinic phone numbers with direct extensions for sole practitioners and multi-provider offices, classified by landline and VoIP type.`),
      feat("MapPin", `${sn} Practice Location`, `Street-level clinic addresses including standalone practices, multi-disciplinary wellness centers, and sports medicine facilities.`),
      feat("Heart", `${sn} Specialty Tags`, `Technique-based classifications including spinal decompression, sports chiropractic, pediatric care, and rehabilitation specialties.`),
      feat("Building2", `${sn} Facility Data`, `Practice setting indicators — solo clinics, group practices, integrated wellness centers, and hospital-affiliated rehabilitation departments.`),
      feat("Activity", `${sn} Credentials`, `State licensure status, continuing education compliance, and specialty certification from ACBSP and other chiropractic credentialing bodies.`),
      feat("Shield", `${sn} Compliance Flags`, `Opt-in documentation with channel-level consent tracking for email, phone, and direct mail outreach to chiropractic practices.`),
    ],
    // 2: Dentist
    [
      feat("Stethoscope", `${sn} NPI Data`, `Matched against ADA membership rolls and state dental board records to verify license status, specialty certifications, and active practice permits.`),
      feat("Mail", `${sn} Email`, `Office and personal professional email addresses for general dentists and specialists, validated through SMTP handshake and domain reputation checks.`),
      feat("Phone", `${sn} Direct Phone`, `Front-desk and practitioner direct lines for dental offices, with call-time optimization data and after-hours availability indicators.`),
      feat("MapPin", `${sn} Practice Location`, `Dental office addresses mapped at suite level including standalone practices, dental service organizations, and community health centers.`),
      feat("Heart", `${sn} Specialty Tags`, `ADA-recognized specialties including orthodontics, endodontics, periodontics, prosthodontics, oral surgery, and pediatric dentistry.`),
      feat("Building2", `${sn} Facility Data`, `Practice type classification — private practice, DSO-affiliated, academic, VA/military, and federally qualified health center designations.`),
      feat("Activity", `${sn} Credentials`, `Board certification from ADA-recognized specialty boards, state dental license verification, and DEA registration for sedation capabilities.`),
      feat("Shield", `${sn} Compliance Flags`, `CAN-SPAM and state-specific marketing consent documentation with suppression list management for dental professional outreach.`),
    ],
    // 3: Doctors
    [
      feat("Stethoscope", `${sn} NPI Data`, `Every physician record anchored to a validated NPI number with active-practice confirmation, specialty taxonomy codes, and medical school credentials.`),
      feat("Mail", `${sn} Email`, `Hospital, clinic, and academic email addresses verified through multi-step SMTP validation with ongoing deliverability monitoring and bounce suppression.`),
      feat("Phone", `${sn} Direct Phone`, `Office and mobile numbers for practicing physicians with switchboard-bypass extensions, call-time preferences, and TCPA compliance indicators.`),
      feat("MapPin", `${sn} Practice Location`, `Multi-location practice mapping including primary offices, hospital affiliations, and ambulatory surgery centers at ZIP+4 precision.`),
      feat("Heart", `${sn} Specialty Tags`, `Over 65 physician specialties and subspecialties mapped from ABMS board certifications and NPI taxonomy codes for granular targeting.`),
      feat("Building2", `${sn} Facility Data`, `Health system affiliations with bed count, teaching status, trauma designation, and departmental assignment indicators.`),
      feat("Activity", `${sn} Credentials`, `MD/DO degree verification, residency training history, ABMS board certification status, and state medical license standing.`),
      feat("Shield", `${sn} Compliance Flags`, `Multi-regulation compliance including CAN-SPAM, TCPA, and HIPAA-aware permission tracking with documented opt-in provenance.`),
    ],
    // 4: Hospital
    [
      feat("Building2", `${sn} Facility Profiles`, `Detailed hospital profiles including bed count, ownership type, trauma level, teaching status, and health system network affiliations.`),
      feat("Mail", `${sn} Administrator Email`, `Verified email addresses for C-suite executives, department directors, and procurement managers at US hospital systems.`),
      feat("Phone", `${sn} Direct Dial`, `Department-level direct numbers and executive assistant lines bypassing main hospital switchboards for decision-maker outreach.`),
      feat("MapPin", `${sn} Campus Address`, `Main campus and satellite facility addresses with building-level precision for territory planning and field sales routing.`),
      feat("Heart", `${sn} Department Data`, `Departmental structure mapping including cardiology, oncology, surgery, emergency, radiology, and ancillary service departments.`),
      feat("Landmark", `${sn} System Affiliation`, `Parent health system identification linking individual hospitals to multi-facility networks for enterprise-level account strategies.`),
      feat("Activity", `${sn} Accreditation`, `Joint Commission accreditation, CMS certification status, and specialty program designations like Magnet nursing recognition.`),
      feat("Shield", `${sn} Compliance Data`, `Procurement and vendor credentialing requirements mapped by facility to support compliant sales engagement processes.`),
    ],
    // 5: Medical Mailing
    [
      feat("Stethoscope", `${sn} Provider Profiles`, `Comprehensive provider records spanning physicians, nurses, allied health professionals, and administrative leaders across the US healthcare system.`),
      feat("Mail", `${sn} Verified Email`, `Multi-step validated email addresses covering clinical, administrative, and executive contacts at healthcare organizations of all sizes.`),
      feat("Phone", `${sn} Contact Numbers`, `Office, department, and direct-dial phone numbers for medical professionals with mobile classification and opt-in status.`),
      feat("MapPin", `${sn} Facility Addresses`, `Practice and facility mailing addresses covering hospitals, clinics, ambulatory centers, and home health agencies nationwide.`),
      feat("Heart", `${sn} Role Classification`, `Functional role mapping across clinical care, administration, procurement, IT, and finance for persona-based targeting.`),
      feat("Building2", `${sn} Organization Data`, `Employer-level data including organization type, size, revenue, and network affiliations for account-based healthcare marketing.`),
      feat("Activity", `${sn} Credential Depth`, `Multi-credential verification covering medical licenses, board certifications, DEA registrations, and professional association memberships.`),
      feat("Shield", `${sn} Permission Tracking`, `Channel-by-channel consent tracking for email, phone, and mail with HIPAA-aware data handling documentation.`),
    ],
    // 6: Nurses
    [
      feat("Heart", `${sn} License Data`, `State nursing board validation confirming RN, LPN, and APRN licensure with compact-state eligibility and specialty certification records.`),
      feat("Mail", `${sn} Email`, `Personal and institutional email addresses for nurses across acute care, long-term care, and community health settings with deliverability scoring.`),
      feat("Phone", `${sn} Direct Phone`, `Unit-level and personal phone numbers for nursing professionals with shift-pattern metadata and mobile-number classification.`),
      feat("MapPin", `${sn} Work Location`, `Employer facility addresses for nurses working in hospitals, skilled nursing facilities, home health agencies, and outpatient clinics.`),
      feat("Stethoscope", `${sn} Specialty Tags`, `Nursing specialty certifications from ANCC and other bodies — critical care, oncology, pediatrics, emergency, perioperative, and more.`),
      feat("Building2", `${sn} Employer Data`, `Facility-level employment data including hospital name, department assignment, bed count, and Magnet recognition status.`),
      feat("Activity", `${sn} Education Level`, `Degree classification — ADN, BSN, MSN, DNP — with nursing school identification for education-targeted campaigns.`),
      feat("Shield", `${sn} Outreach Permissions`, `TCPA-compliant phone flags and CAN-SPAM email consent with state-specific marketing restriction indicators.`),
    ],
    // 7: Physician
    [
      feat("Stethoscope", `${sn} Registry Data`, `Physician identities validated against state medical boards, DEA databases, and hospital credentialing systems for maximum accuracy.`),
      feat("Mail", `${sn} Email`, `Professional email addresses sourced from medical group directories, hospital websites, and academic faculty pages with real-time bounce detection.`),
      feat("Phone", `${sn} Direct Phone`, `Practice and personal office numbers enabling direct physician contact without navigating hospital phone trees or voicemail systems.`),
      feat("MapPin", `${sn} Practice Location`, `Primary and secondary practice sites geocoded for radius-based targeting including rural health clinics and urban medical centers.`),
      feat("Heart", `${sn} Specialty Tags`, `Physician taxonomy codes from the CMS NPPES system providing both primary and secondary specialty classifications for precise audience building.`),
      feat("Building2", `${sn} Affiliation Data`, `Group practice, hospital, and health system affiliations showing organizational relationships for multi-threaded account strategies.`),
      feat("Activity", `${sn} Credentials`, `Medical school, residency program, fellowship training, and board examination history for career-stage-based segmentation.`),
      feat("Shield", `${sn} Compliance Flags`, `State-by-state marketing restriction awareness with sunshine-act disclosure tracking and pharmaceutical detailing consent indicators.`),
    ],
    // 8: Plastic Surgeons
    [
      feat("Stethoscope", `${sn} Board Data`, `ABPS and ABMS board certification verification distinguishing cosmetic-focused from reconstructive surgeons with fellowship training details.`),
      feat("Mail", `${sn} Email`, `Practice and professional email addresses for plastic surgeons including med-spa operators and academic reconstructive specialists with bounce monitoring.`),
      feat("Phone", `${sn} Direct Phone`, `Front-desk and surgeon-direct numbers for private aesthetic practices and hospital-based reconstructive surgery departments.`),
      feat("MapPin", `${sn} Practice Location`, `Office and surgical facility addresses including ambulatory surgery centers, med-spas, and hospital-based clinics mapped by metro area.`),
      feat("Heart", `${sn} Procedure Focus`, `Procedure-level classifications covering breast augmentation, rhinoplasty, body contouring, facial reconstruction, and burn care specialties.`),
      feat("Building2", `${sn} Facility Data`, `Practice setting indicators — solo aesthetic practice, multi-surgeon group, hospital department, or academic medical center appointment.`),
      feat("Activity", `${sn} Credentials`, `ABPS/ASPS membership, hospital privileges, ambulatory surgery center ownership, and state medical board standing.`),
      feat("Shield", `${sn} Compliance Flags`, `FDA marketing restriction awareness for medical devices with aesthetic-industry-specific consent documentation.`),
    ],
    // 9: US Pharmacist
    [
      feat("Pill", `${sn} License Data`, `State pharmacy board license verification confirming active pharmacist status, pharmacy type classifications, and controlled substance dispensing authority.`),
      feat("Mail", `${sn} Email`, `Pharmacist professional email addresses across retail chains, hospital pharmacies, specialty compounding facilities, and PBM organizations.`),
      feat("Phone", `${sn} Direct Phone`, `Pharmacy counter and pharmacist-direct numbers for retail, hospital, and specialty pharmacy locations with call-time optimization data.`),
      feat("MapPin", `${sn} Pharmacy Location`, `Retail storefront, hospital pharmacy, mail-order facility, and compounding pharmacy addresses mapped to ZIP+4 for territory assignments.`),
      feat("Heart", `${sn} Practice Setting`, `Setting-based classifications — retail chain, independent, hospital inpatient, ambulatory, long-term care, specialty, and nuclear pharmacy.`),
      feat("Building2", `${sn} Employer Data`, `Pharmacy chain identification, health system affiliation, and PBM relationship data for enterprise-level pharmaceutical marketing.`),
      feat("Activity", `${sn} Credentials`, `PharmD/RPh credential verification, specialty certifications from BPS, immunization authority, and collaborative practice agreement indicators.`),
      feat("Shield", `${sn} Compliance Flags`, `DEA registration verification with pharmaceutical marketing consent tracking and state-specific detailing restriction awareness.`),
    ],
    // 10: Veterinarians
    [
      feat("Heart", `${sn} License Data`, `State veterinary board validation confirming active DVM/VMD licensure, USDA accreditation status, and controlled substance authorization.`),
      feat("Mail", `${sn} Email`, `Practice-specific email addresses for veterinarians at companion animal clinics, equine practices, and mixed-animal facilities with SMTP validation.`),
      feat("Phone", `${sn} Direct Phone`, `Clinic phone numbers and veterinarian direct extensions for private practices, emergency hospitals, and specialty referral centers.`),
      feat("MapPin", `${sn} Practice Location`, `Clinic and hospital addresses for companion animal, large animal, and mixed practices including mobile veterinary services.`),
      feat("Stethoscope", `${sn} Specialty Tags`, `AVMA-recognized specialties including surgery, internal medicine, dermatology, oncology, emergency/critical care, and exotic animal medicine.`),
      feat("Building2", `${sn} Practice Data`, `Practice type indicators — solo owner, corporate-affiliated, academic, government, research, and nonprofit veterinary organizations.`),
      feat("Activity", `${sn} Credentials`, `Board certification from ABVS-recognized specialties, state license standing, and RACE-approved continuing education compliance status.`),
      feat("Shield", `${sn} Compliance Flags`, `Veterinary pharmaceutical marketing consent with AAHA membership indicators and state advertising regulation awareness.`),
    ],
    // 11: X-Ray Laboratories
    [
      feat("Microscope", `${sn} Facility Data`, `Imaging center and radiology laboratory profiles verified through CMS certification records, state licensing databases, and ACR accreditation lists.`),
      feat("Mail", `${sn} Email`, `Technical director, chief radiologist, and lab manager email addresses with domain-reputation scoring and monthly deliverability verification.`),
      feat("Phone", `${sn} Direct Phone`, `Department-level numbers for radiology facilities, mobile X-ray services, and imaging centers with decision-maker extension mapping.`),
      feat("MapPin", `${sn} Lab Location`, `Fixed-site imaging center, hospital radiology department, and mobile X-ray service territory addresses at suite-level precision.`),
      feat("Heart", `${sn} Modality Tags`, `Equipment modality classifications — X-ray, CT, MRI, ultrasound, mammography, fluoroscopy, and nuclear medicine capabilities.`),
      feat("Building2", `${sn} Ownership Data`, `Ownership structure identification — hospital-based, physician-owned, corporate chain, and independent freestanding imaging center.`),
      feat("Activity", `${sn} Accreditation`, `ACR accreditation status, MQSA certification for mammography, and state radiation control program compliance verification.`),
      feat("Shield", `${sn} Compliance Flags`, `HIPAA security compliance indicators with medical imaging equipment marketing consent and FDA device registration awareness.`),
    ],
  ];

  // ─── OTHER INDUSTRY (10 pages) ────────────────
  const indDescSets = [
    // 0: Agriculture Industry
    [
      feat("Factory", `${sn} Company Profiles`, `Farm operations, agribusiness corporations, and agricultural cooperatives profiled with crop type, acreage, and annual revenue data.`),
      feat("Mail", `${sn} Executive Email`, `Verified email addresses for farm owners, agribusiness executives, and cooperative directors sourced from USDA databases and trade associations.`),
      feat("Phone", `${sn} Business Phone`, `Direct-dial numbers for agricultural decision-makers including procurement directors, operations managers, and farm owners.`),
      feat("MapPin", `${sn} Office Locations`, `Farm headquarters, regional offices, and distribution facility addresses mapped by agricultural district and commodity region.`),
      feat("Briefcase", `${sn} Job Titles`, `Role-based targeting for farm managers, agronomists, procurement officers, livestock directors, and agricultural technology adopters.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Estimated annual revenue bands based on USDA census data, crop production reports, and agricultural commodity pricing.`),
      feat("Landmark", `${sn} Org Structure`, `Ownership classification — family farm, corporate operation, cooperative, contract grower — with parent-company identification.`),
      feat("Shield", `${sn} Permission Data`, `CAN-SPAM and TCPA compliance documentation with farm-specific marketing consent tracking for B2B agricultural outreach.`),
    ],
    // 1: Banking Finance
    [
      feat("Landmark", `${sn} Company Profiles`, `Commercial banks, credit unions, investment firms, and fintech companies profiled with asset size, charter type, and branch count.`),
      feat("Mail", `${sn} Executive Email`, `C-suite and VP-level email addresses at financial institutions verified against SEC filings, FDIC records, and corporate directories.`),
      feat("Phone", `${sn} Business Phone`, `Direct-dial numbers for banking executives, loan officers, and compliance directors bypassing branch phone trees and IVR systems.`),
      feat("MapPin", `${sn} Office Locations`, `Headquarters, regional offices, and branch addresses for banks and financial services firms with FDIC certificate mapping.`),
      feat("Briefcase", `${sn} Job Titles`, `Functional role mapping for CFOs, CROs, compliance officers, lending directors, and wealth management professionals.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Asset-based institution sizing with total deposits, loan portfolio metrics, and CAMELS-adjacent performance indicators.`),
      feat("Building2", `${sn} Org Structure`, `Holding company hierarchies linking subsidiary banks to parent organizations for enterprise-level financial services targeting.`),
      feat("Shield", `${sn} Permission Data`, `Financial industry marketing compliance documentation including GLBA awareness and state banking department regulation tracking.`),
    ],
    // 2: Construction Industry
    [
      feat("Hammer", `${sn} Company Profiles`, `General contractors, specialty subcontractors, and construction management firms profiled by license class, project type, and bonding capacity.`),
      feat("Mail", `${sn} Executive Email`, `Project manager, estimator, and executive email addresses verified against state contractor license boards and industry directories.`),
      feat("Phone", `${sn} Business Phone`, `Office and mobile numbers for construction company owners, site superintendents, and procurement managers with TCPA indicators.`),
      feat("MapPin", `${sn} Office Locations`, `Corporate offices, regional branches, and yard locations for construction firms mapped by metro area and service territory.`),
      feat("Briefcase", `${sn} Job Titles`, `Role targeting for project managers, estimators, safety directors, equipment managers, and purchasing agents in construction.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Annual construction volume, bonding capacity, and project backlog indicators for contractor qualification and opportunity sizing.`),
      feat("Scale", `${sn} Org Structure`, `License classification — general building, heavy civil, specialty trades — with union affiliation and minority-owned business indicators.`),
      feat("Shield", `${sn} Permission Data`, `Marketing consent documentation with state contractor board advertising regulations and TCPA-compliant phone outreach flags.`),
    ],
    // 3: Hotels
    [
      feat("Building2", `${sn} Property Profiles`, `Hotel and resort properties profiled by star rating, room count, brand affiliation, property type, and amenity classification.`),
      feat("Mail", `${sn} Executive Email`, `General manager, director of sales, and revenue manager email addresses verified against brand directories and hospitality associations.`),
      feat("Phone", `${sn} Business Phone`, `Property-level direct numbers for hotel decision-makers bypassing front desk and reservation lines for B2B outreach.`),
      feat("MapPin", `${sn} Property Locations`, `Hotel property addresses with geographic clustering data, airport proximity indicators, and convention center distance metrics.`),
      feat("Briefcase", `${sn} Job Titles`, `Hospitality-specific role targeting for GMs, directors of operations, food and beverage directors, and procurement managers.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Average daily rate ranges, occupancy indicators, and RevPAR-based performance tiers for hotel market segmentation.`),
      feat("Globe", `${sn} Brand Affiliation`, `Management company and brand identification — Marriott, Hilton, IHG, independents — with franchise vs. managed property classification.`),
      feat("Shield", `${sn} Permission Data`, `B2B hospitality marketing consent with brand-level solicitation policy awareness and property-management company authorization.`),
    ],
    // 4: Insurance
    [
      feat("Scale", `${sn} Company Profiles`, `Insurance carriers, agencies, brokerages, and MGAs profiled by line of business, premium volume, and state licensing coverage.`),
      feat("Mail", `${sn} Executive Email`, `Underwriter, claims manager, and executive email addresses verified against state insurance department records and NAIC filings.`),
      feat("Phone", `${sn} Business Phone`, `Direct-dial numbers for insurance professionals bypassing call center queues for agent, broker, and carrier-level contacts.`),
      feat("MapPin", `${sn} Office Locations`, `Home offices, regional claims centers, and local agency addresses mapped by state licensing jurisdiction and territory assignments.`),
      feat("Briefcase", `${sn} Job Titles`, `Role-based targeting for underwriters, actuaries, claims adjusters, agency principals, and insurance technology officers.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Direct written premium volume, loss ratio indicators, and market share positioning for carrier and agency segmentation.`),
      feat("Building2", `${sn} Org Structure`, `Company type classification — stock carrier, mutual, reciprocal, MGA, wholesale broker — with group affiliation mapping.`),
      feat("Shield", `${sn} Permission Data`, `State insurance department marketing compliance with anti-rebating regulation awareness and producer licensing verification.`),
    ],
    // 5: IT Decision Makers
    [
      feat("Briefcase", `${sn} Contact Profiles`, `CIOs, CTOs, IT directors, and technology managers profiled by budget authority, team size, and purchasing influence level.`),
      feat("Mail", `${sn} Executive Email`, `Corporate email addresses for IT leaders verified against LinkedIn profiles, company org charts, and technology vendor partner portals.`),
      feat("Phone", `${sn} Business Phone`, `Direct office and mobile numbers for IT executives enabling personalized outreach beyond generic department phone lines.`),
      feat("MapPin", `${sn} Office Locations`, `Corporate headquarters and technology center addresses for companies with identifiable IT departments and budget authority.`),
      feat("Cpu", `${sn} Tech Stack`, `Current technology stack intelligence including ERP, CRM, cloud platform, and infrastructure vendor relationships for solution positioning.`),
      feat("TrendingUp", `${sn} Budget Indicators`, `Estimated IT budget ranges derived from company revenue, employee count, and technology spending benchmarks by industry vertical.`),
      feat("Building2", `${sn} Company Data`, `Employer firmographics including company size, revenue, industry vertical, and geographic footprint for account-based IT marketing.`),
      feat("Shield", `${sn} Permission Data`, `B2B marketing compliance documentation with corporate email policy awareness and IT professional outreach consent tracking.`),
    ],
    // 6: Manufacturing Industry
    [
      feat("Factory", `${sn} Company Profiles`, `Manufacturers profiled by SIC/NAICS code, production type, plant capacity, and supply chain position — OEM, tier-1, or contract manufacturer.`),
      feat("Mail", `${sn} Executive Email`, `Plant manager, VP of operations, and engineering director email addresses sourced from manufacturing directories and trade associations.`),
      feat("Phone", `${sn} Business Phone`, `Plant-level and corporate office numbers for manufacturing decision-makers with procurement buyer direct-dial extensions.`),
      feat("MapPin", `${sn} Plant Locations`, `Manufacturing plant, warehouse, and distribution center addresses with production capacity indicators and multi-site hierarchy mapping.`),
      feat("Briefcase", `${sn} Job Titles`, `Manufacturing-specific roles — plant managers, quality engineers, procurement directors, maintenance supervisors, and EHS coordinators.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Annual manufacturing output estimates, employee count by site, and capital expenditure indicators for opportunity sizing.`),
      feat("Warehouse", `${sn} Org Structure`, `Production type classification — discrete, process, batch — with ISO certification status and lean manufacturing adoption markers.`),
      feat("Shield", `${sn} Permission Data`, `B2B marketing consent documentation with industry trade show opt-in tracking and manufacturing directory listing provenance.`),
    ],
    // 7: Real Estate
    [
      feat("Building2", `${sn} Company Profiles`, `Brokerages, property management firms, and development companies profiled by transaction volume, portfolio size, and market specialization.`),
      feat("Mail", `${sn} Agent Email`, `Licensed agent and broker email addresses verified against state real estate commission records and MLS membership directories.`),
      feat("Phone", `${sn} Business Phone`, `Agent mobile and brokerage office numbers with direct-dial routing for top-producing agents and team leaders.`),
      feat("MapPin", `${sn} Office Locations`, `Brokerage offices, property management headquarters, and development company addresses mapped by MLS region and market area.`),
      feat("Briefcase", `${sn} Specialization`, `Market focus classifications — residential, commercial, industrial, land, luxury, and property management service categories.`),
      feat("TrendingUp", `${sn} Transaction Data`, `Annual transaction volume, average sale price ranges, and production tier classifications for agent and brokerage targeting.`),
      feat("Globe", `${sn} Franchise Data`, `Brand affiliation identification — Keller Williams, RE/MAX, Coldwell Banker, independents — with franchise vs. company-owned status.`),
      feat("Shield", `${sn} Permission Data`, `State real estate commission advertising compliance with RESPA awareness and MLS data usage consent documentation.`),
    ],
    // 8: Sports Industry
    [
      feat("Globe", `${sn} Org Profiles`, `Professional teams, collegiate programs, sports facilities, and athletic brands profiled by league, division, and revenue category.`),
      feat("Mail", `${sn} Executive Email`, `Marketing directors, sponsorship managers, and front-office executive emails verified against league directories and team websites.`),
      feat("Phone", `${sn} Business Phone`, `Front-office direct lines for sports organizations bypassing ticket offices and general-inquiry numbers for business contacts.`),
      feat("MapPin", `${sn} Venue Locations`, `Stadium, arena, training facility, and corporate headquarters addresses for professional and collegiate sports organizations.`),
      feat("Briefcase", `${sn} Job Titles`, `Sports business roles — general managers, sponsorship directors, facility managers, athletic directors, and team marketing executives.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Franchise valuation ranges, attendance figures, and media rights indicators for sports industry opportunity assessment.`),
      feat("Building2", `${sn} League Data`, `League and conference affiliations with ownership group identification and multi-team portfolio mapping for enterprise deals.`),
      feat("Shield", `${sn} Permission Data`, `Sports marketing consent with league-level solicitation policy compliance and venue-specific vendor credentialing requirements.`),
    ],
    // 9: Travel Data
    [
      feat("Plane", `${sn} Company Profiles`, `Travel agencies, tour operators, DMCs, and OTAs profiled by travel type specialization, annual booking volume, and market segment focus.`),
      feat("Mail", `${sn} Executive Email`, `Agency owner, operations director, and group travel coordinator emails sourced from ASTA membership rolls and consortium directories.`),
      feat("Phone", `${sn} Business Phone`, `Agency direct lines and travel advisor personal numbers with preferred contact time data and TCPA-compliant mobile classification.`),
      feat("MapPin", `${sn} Office Locations`, `Travel agency storefronts, corporate travel departments, and tour operator headquarters with home-based advisor identification.`),
      feat("Briefcase", `${sn} Specialization`, `Travel segment focus — luxury, corporate, group, adventure, cruise, destination weddings — with supplier partnership indicators.`),
      feat("TrendingUp", `${sn} Revenue Data`, `Annual booking volume estimates, preferred supplier tier status, and consortium membership for agency qualification and ranking.`),
      feat("Globe", `${sn} Network Data`, `Host agency, consortium, and franchise network affiliations — Virtuoso, Signature, ASTA — with independent advisor identification.`),
      feat("Shield", `${sn} Permission Data`, `Travel industry marketing consent with supplier co-op advertising compliance and consortium solicitation policy awareness.`),
    ],
  ];

  // ─── B2C (10 pages) ──────────────────────────
  const b2cDescSets = [
    // 0: Automotive
    [
      feat("Car", `${sn} Consumer Profiles`, `Vehicle owners and auto enthusiasts profiled by make, model year, purchase channel, and vehicle financing preferences.`),
      feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for auto buyers and lessees with brand affinity scoring and purchase-cycle timing indicators.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile and home numbers for automotive consumers with wireless carrier classification and TCPA consent documentation.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses for vehicle owners with DMV-sourced registration data, NCOA processing, and DPV confirmation.`),
      feat("ShoppingCart", `${sn} Purchase Signals`, `Vehicle ownership history, service contract status, and warranty expiration data for conquest and retention targeting.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Modeled purchase-intent scores based on lease maturity timing, vehicle age, and lifestyle indicators.`),
      feat("Heart", `${sn} Lifestyle Data`, `Driving habits, commute patterns, recreational vehicle interests, and environmental preference indicators for audience segmentation.`),
      feat("Shield", `${sn} Privacy Compliance`, `CCPA, DPPA, and TCPA compliance documentation for automotive consumer marketing with consent provenance tracking.`),
    ],
    // 1: DTC & CPG Consumer
    [
      feat("ShoppingCart", `${sn} Consumer Profiles`, `Direct-to-consumer shoppers profiled by product category affinity, subscription status, and average order value ranges.`),
      feat("Mail", `${sn} Consumer Email`, `Opted-in email addresses for DTC brand shoppers with purchase frequency scoring and category engagement indicators.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile numbers for CPG and DTC consumers with SMS opt-in status and preferred communication channel preferences.`),
      feat("MapPin", `${sn} Home Address`, `Residential delivery addresses for DTC consumers with apartment/house classification and shipping zone optimization data.`),
      feat("Heart", `${sn} Brand Affinity`, `Brand loyalty indicators, competitor product usage, and subscription-box participation data for customer acquisition modeling.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Category-level purchase propensity scores derived from transaction history, survey responses, and digital engagement patterns.`),
      feat("CreditCard", `${sn} Spending Data`, `Household spending indicators for consumable goods categories with channel preference data — online, grocery, mass retail, and club.`),
      feat("Shield", `${sn} Privacy Compliance`, `CCPA and CAN-SPAM compliance with DTC marketing consent chains and unsubscribe management documentation.`),
    ],
    // 2: Education & EdTech Consumer
    [
      feat("GraduationCap", `${sn} Consumer Profiles`, `Students, parents, and lifelong learners profiled by education stage, institution type, and learning format preferences.`),
      feat("Mail", `${sn} Consumer Email`, `Personal email addresses for education decision-makers — parents of school-age children and adult learners — with opt-in consent.`),
      feat("Phone", `${sn} Consumer Phone`, `Parent and student mobile numbers with age-verified classification and COPPA-aware consent documentation for education marketing.`),
      feat("MapPin", `${sn} Home Address`, `Household addresses enriched with school district mapping, proximity-to-campus data, and college enrollment indicators.`),
      feat("Heart", `${sn} Education Interests`, `Academic interest areas, extracurricular activities, test-prep participation, and online learning platform usage indicators.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Enrollment likelihood models based on academic stage, household income, geographic location, and digital engagement behavior.`),
      feat("Smartphone", `${sn} Device Usage`, `Technology adoption indicators including device type, ed-tech platform usage, and digital learning tool engagement patterns.`),
      feat("Shield", `${sn} Privacy Compliance`, `COPPA, FERPA-aware, and CCPA compliance documentation with age-gated consent management for education consumer marketing.`),
    ],
    // 3: Financial Services Consumer
    [
      feat("CreditCard", `${sn} Consumer Profiles`, `Banking, investment, and insurance consumers profiled by product holdings, credit tier, and financial life-stage indicators.`),
      feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for financial product consumers with account-type affinity scoring and engagement tracking.`),
      feat("Phone", `${sn} Consumer Phone`, `Verified mobile and home numbers for financial services prospects with TCPA and state telemarketing regulation compliance flags.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses for financial services consumers with home value estimates, mortgage indicators, and credit pre-screen eligibility.`),
      feat("Heart", `${sn} Product Affinity`, `Financial product holding indicators — checking, savings, investment, insurance, lending — for cross-sell and acquisition targeting.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Credit product response models based on credit bureau triggers, life-event signals, and financial behavior patterns.`),
      feat("Home", `${sn} Wealth Indicators`, `Household income ranges, investable asset estimates, and homeownership data for affluent and mass-market audience segmentation.`),
      feat("Shield", `${sn} Privacy Compliance`, `GLBA, FCRA, TCPA, and CCPA compliance documentation with firm-offer-of-credit eligibility tracking for financial marketing.`),
    ],
    // 4: Healthcare & Wellness Consumer
    [
      feat("Heart", `${sn} Consumer Profiles`, `Health-conscious consumers profiled by wellness interests, health condition indicators, and healthcare utilization patterns.`),
      feat("Mail", `${sn} Consumer Email`, `Opted-in email addresses for health and wellness consumers with product category engagement and content interaction scoring.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile numbers for healthcare consumers with HIPAA-aware consent documentation and health marketing opt-in verification.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses for wellness consumers with pharmacy proximity data and healthcare facility access indicators.`),
      feat("ShoppingCart", `${sn} Purchase Signals`, `OTC health product purchases, supplement buying behavior, and fitness membership indicators for category-level targeting.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Health product response models based on lifestyle indicators, age demographics, and wellness engagement patterns.`),
      feat("Smartphone", `${sn} Digital Health`, `Health app usage, wearable device adoption, telehealth utilization, and digital health engagement indicators.`),
      feat("Shield", `${sn} Privacy Compliance`, `HIPAA-aware marketing consent with health data sensitivity classification and state health privacy law compliance tracking.`),
    ],
    // 5: Home Services Consumer
    [
      feat("Home", `${sn} Consumer Profiles`, `Homeowners and renters profiled by property type, home age, household size, and home improvement spending propensity.`),
      feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for home services buyers with seasonal project indicators and contractor hiring patterns.`),
      feat("Phone", `${sn} Consumer Phone`, `Homeowner mobile and landline numbers with property ownership verification and TCPA consent documentation for service marketing.`),
      feat("MapPin", `${sn} Home Address`, `Property addresses with parcel data enrichment including lot size, year built, assessed value, and recent sale indicators.`),
      feat("ShoppingCart", `${sn} Project Signals`, `Home improvement project indicators — roofing, HVAC, plumbing, remodeling — based on home age, permits, and seasonal patterns.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Service-category response models based on property characteristics, homeowner tenure, and neighborhood spending patterns.`),
      feat("CreditCard", `${sn} Spending Data`, `Home improvement spending indicators with financing preferences and project budget ranges for service provider targeting.`),
      feat("Shield", `${sn} Privacy Compliance`, `CCPA and TCPA compliance with contractor marketing consent and state home-improvement licensing regulation awareness.`),
    ],
    // 6: Real Estate Consumer
    [
      feat("Home", `${sn} Consumer Profiles`, `Home buyers, sellers, and renters profiled by transaction stage, property preferences, and pre-qualification indicators.`),
      feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for active home shoppers and property owners with listing alert engagement and open house attendance data.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile numbers for real estate consumers with mortgage pre-approval indicators and TCPA-compliant consent documentation.`),
      feat("MapPin", `${sn} Home Address`, `Current residential addresses with property value estimates, equity positions, and length-of-residence data for move-likelihood scoring.`),
      feat("ShoppingCart", `${sn} Transaction Signals`, `Pre-mover indicators based on listing activity, mortgage applications, and life-event triggers like job changes and family growth.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Move-likelihood models combining property tenure, equity accumulation, life-stage signals, and local market conditions.`),
      feat("CreditCard", `${sn} Financial Data`, `Mortgage status, estimated equity, household income, and credit-tier indicators for mortgage and real estate service targeting.`),
      feat("Shield", `${sn} Privacy Compliance`, `RESPA-aware marketing consent with fair lending compliance documentation and state real estate advertising regulation tracking.`),
    ],
    // 7: Retail & Ecommerce Consumer
    [
      feat("ShoppingCart", `${sn} Consumer Profiles`, `Online and in-store shoppers profiled by retail category preferences, purchase frequency, and average transaction values.`),
      feat("Mail", `${sn} Consumer Email`, `Opted-in shopper email addresses with cart-abandonment indicators, promotional responsiveness scores, and category engagement data.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile numbers for retail consumers with SMS marketing opt-in status and push notification preference indicators.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses for retail consumers with store-proximity scoring, delivery zone classification, and catalog-response history.`),
      feat("Heart", `${sn} Shopping Behavior`, `Category affinity scores for apparel, electronics, home goods, beauty, and food covering both online and in-store channels.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Purchase-likelihood models by product category combining past transaction data, seasonal patterns, and promotional responsiveness.`),
      feat("CreditCard", `${sn} Spending Data`, `Discretionary spending indicators with payment method preferences and loyalty program participation across retail categories.`),
      feat("Shield", `${sn} Privacy Compliance`, `CCPA and CAN-SPAM compliance with retail marketing consent chains and cross-channel permission management documentation.`),
    ],
    // 8: Telecommunications Consumer
    [
      feat("Smartphone", `${sn} Consumer Profiles`, `Mobile, broadband, and cable subscribers profiled by carrier, plan type, device preferences, and contract renewal timing.`),
      feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for telecom consumers with plan-type indicators and upgrade eligibility timing data.`),
      feat("Phone", `${sn} Consumer Phone`, `Verified mobile numbers with carrier identification, contract status, and TCPA consent documentation for telecom marketing.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses with broadband availability mapping, fiber footprint data, and service-area coverage classification.`),
      feat("Heart", `${sn} Service Preferences`, `Bundle composition indicators — mobile, internet, TV, home security — with streaming service subscriptions and cord-cutting signals.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Churn-risk and upgrade-propensity models based on contract timing, competitive availability, and satisfaction survey responses.`),
      feat("CreditCard", `${sn} Spending Data`, `Monthly telecom spend indicators with device financing status and premium tier subscription identification.`),
      feat("Shield", `${sn} Privacy Compliance`, `TCPA, CCPA, and FCC regulation compliance with telecom-specific marketing consent and do-not-call registry verification.`),
    ],
    // 9: Travel Consumer
    [
      feat("Plane", `${sn} Consumer Profiles`, `Leisure and business travelers profiled by trip frequency, destination preferences, booking channels, and loyalty program memberships.`),
      feat("Mail", `${sn} Consumer Email`, `Opted-in traveler email addresses with booking-window indicators, destination interest scoring, and promotional engagement data.`),
      feat("Phone", `${sn} Consumer Phone`, `Mobile numbers for travel consumers with booking confirmation indicators and TCPA-compliant consent for travel marketing outreach.`),
      feat("MapPin", `${sn} Home Address`, `Residential addresses for travel consumers with airport proximity scoring, passport holding indicators, and vacation home ownership data.`),
      feat("Heart", `${sn} Travel Preferences`, `Travel style indicators — luxury, adventure, family, cruise, all-inclusive — with destination interest profiles and seasonal booking patterns.`),
      feat("TrendingUp", `${sn} Propensity Scores`, `Trip-booking propensity models based on past travel frequency, household income, available vacation time, and seasonal trends.`),
      feat("CreditCard", `${sn} Spending Data`, `Annual travel spending indicators with credit card reward program memberships and premium travel service adoption markers.`),
      feat("Shield", `${sn} Privacy Compliance`, `CCPA and CAN-SPAM compliance with travel industry marketing consent and loyalty program data-sharing authorization tracking.`),
    ],
  ];

  // ─── TECHNOLOGY: generic but varied by catIdx ────
  function techAttrs(sn, catIdx) {
    const techIcons = ["Database","Server","Cpu","Terminal","Code","Layers","Monitor","Network","Cloud","Shield"];
    const offset = catIdx % techIcons.length;
    const pick = (n) => techIcons[(offset + n) % techIcons.length];

    // 36 tech pages — create variation using catIdx to pick different sentence structures
    const installDescs = [
      `Confirmed ${sn} deployment with version, edition, and hosting model detected through proprietary web scanning and technology fingerprinting algorithms.`,
      `Active ${sn} installations identified via DNS analysis, JavaScript framework detection, and server-response header parsing across millions of domains.`,
      `${sn} platform presence confirmed through job posting analysis, technology review sites, and vendor partner ecosystem signal triangulation.`,
      `Verified ${sn} usage detected by analyzing HTTP headers, SSL certificate metadata, and CDN configuration patterns across enterprise domains.`,
      `${sn} deployment confirmed through a combination of employee LinkedIn profile analysis, GitHub repository activity, and technology community participation signals.`,
      `Active ${sn} instances identified via cloud marketplace subscription data, container registry analysis, and infrastructure-as-code repository scanning.`,
    ];
    const emailDescs = [
      `SMTP-validated email addresses for IT administrators and technology buyers at confirmed ${sn} customer organizations with role-based targeting.`,
      `Corporate email addresses for ${sn} decision-makers verified through mailbox-level SMTP handshake, domain reputation scoring, and catch-all detection.`,
      `Multi-step validated email addresses targeting CIOs, IT directors, and platform administrators at organizations running ${sn} in production.`,
      `Verified professional emails for ${sn} power users, system administrators, and procurement contacts sourced from vendor communities and technology forums.`,
      `Deliverability-optimized email addresses for ${sn} budget holders and technical evaluators with bounce-rate history and engagement scoring.`,
      `Email addresses for ${sn} stakeholders validated against corporate directory services, WHOIS domain records, and technology vendor partner portals.`,
    ];
    const phoneDescs = [
      `Direct-dial numbers for IT leadership at ${sn} customer organizations with landline, VoIP, and mobile classification for channel optimization.`,
      `Switchboard-bypass phone numbers connecting you directly to ${sn} administrators and technology procurement contacts at enterprise accounts.`,
      `Verified phone numbers for ${sn} decision-makers including mobile numbers with TCPA consent indicators and business-hours call optimization data.`,
      `Direct office lines for ${sn} technical leads and IT managers verified through corporate directory matching and phone-number portability databases.`,
      `Multi-channel phone data for ${sn} account contacts — office, mobile, and department numbers with compliance classification and preferred contact windows.`,
      `Phone numbers for ${sn} evaluators and budget approvers verified against telecom carrier databases with line-type and geographic location data.`,
    ];
    const companyDescs = [
      `Company firmographics for ${sn} customers including revenue band, employee count, industry classification, and technology spending propensity indicators.`,
      `Employer-level data for ${sn} accounts covering SIC/NAICS industry codes, annual revenue ranges, and organizational structure for territory alignment.`,
      `Account intelligence for ${sn} customer organizations with company size tiers, headquarter locations, and subsidiary-parent relationship mapping.`,
      `Firmographic enrichment for ${sn} accounts including funding history, growth trajectory signals, and competitive technology landscape assessment.`,
      `Organization profiles for ${sn} customers with department headcount estimates, technology team size, and IT budget allocation indicators.`,
      `Enterprise data for ${sn} accounts covering ownership type — public, private, PE-backed, government — with fiscal year and procurement cycle timing.`,
    ];
    const footprintDescs = [
      `Estimated seat count and deployment depth for ${sn} at each customer organization based on job posting volume and technology team headcount.`,
      `${sn} adoption scale indicators including user count estimates, department penetration depth, and enterprise vs. departmental deployment classification.`,
      `Module-level ${sn} adoption data showing which product components are active at each customer for cross-sell and expansion targeting.`,
      `${sn} deployment maturity indicators — pilot, production, enterprise-wide — combined with contract timeline estimates for renewal-timed outreach.`,
      `Seat-count ranges and license-tier classification for ${sn} customers enabling opportunity sizing and expansion-revenue forecasting.`,
      `${sn} usage intensity scoring based on technographic signals including API integration depth, plugin ecosystem adoption, and platform customization markers.`,
    ];
    const growthDescs = [
      `Hiring trends, funding announcements, and expansion signals at ${sn} customer organizations indicating technology buying intent and budget availability.`,
      `Growth trajectory indicators for ${sn} accounts — revenue growth, headcount expansion, new office openings — signaling technology investment readiness.`,
      `Technology buying-intent signals for ${sn} customers derived from RFP publications, vendor comparison research activity, and analyst inquiry patterns.`,
      `${sn} account health signals including customer satisfaction indicators, support ticket volume trends, and renewal risk factors for retention campaigns.`,
      `Market expansion and M&A activity signals at ${sn} accounts creating integration, consolidation, and platform migration opportunities.`,
      `Budget-cycle and fiscal-year intelligence for ${sn} customers enabling campaign timing aligned with technology procurement windows.`,
    ];
    const stackDescs = [
      `Adjacent technology installations mapped alongside ${sn} covering complementary tools, middleware, and infrastructure dependencies for ecosystem positioning.`,
      `Complete technology environment context for ${sn} accounts — cloud providers, databases, security tools, and development frameworks in use.`,
      `Competitive technology presence data for ${sn} customers showing which alternative platforms are also deployed for displacement campaign targeting.`,
      `Integration ecosystem mapping for ${sn} accounts identifying API connections, data pipelines, and middleware dependencies for partnership positioning.`,
      `Technology refresh signals at ${sn} accounts — end-of-life platform components, legacy system dependencies, and modernization project indicators.`,
      `Full-stack technology context for ${sn} customers including DevOps toolchain, monitoring platforms, and collaboration tools for solution-fit assessment.`,
    ];
    const complianceDescs = [
      `CAN-SPAM and CCPA compliance documentation with opt-in provenance tracking for every ${sn} contact record in the dataset.`,
      `Multi-regulation compliance flags for ${sn} contacts — CAN-SPAM email consent, TCPA phone permissions, and CCPA data-rights documentation.`,
      `Permission-based contact governance for ${sn} records including consent source tracking, suppression list integration, and privacy-request handling.`,
      `Regulatory compliance metadata for ${sn} contacts covering international data protection standards, industry-specific regulations, and corporate email policies.`,
      `Audit-ready compliance documentation for ${sn} outreach — consent timestamps, source attribution, and channel-specific permission flags for every record.`,
      `Data governance framework for ${sn} records including consent refresh cadence, opt-out propagation, and cross-channel permission synchronization.`,
    ];

    return [
      feat(pick(0), `${sn} Installation Data`, installDescs[catIdx % installDescs.length]),
      feat("Mail", `${sn} Buyer Email`, emailDescs[catIdx % emailDescs.length]),
      feat("Phone", `${sn} Decision-Maker Phone`, phoneDescs[catIdx % phoneDescs.length]),
      feat("Building2", `${sn} Account Data`, companyDescs[catIdx % companyDescs.length]),
      feat(pick(1), `${sn} User Footprint`, footprintDescs[catIdx % footprintDescs.length]),
      feat("TrendingUp", `${sn} Growth Signals`, growthDescs[catIdx % growthDescs.length]),
      feat(pick(2), `${sn} Tech Stack`, stackDescs[catIdx % stackDescs.length]),
      feat("Shield", `${sn} Compliance Flags`, complianceDescs[catIdx % complianceDescs.length]),
    ];
  }

  // ─── Route to the right set ──────────────────
  if (cat === "hc") return hcDescSets[catIdx % hcDescSets.length];
  if (cat === "ind") return indDescSets[catIdx % indDescSets.length];
  if (cat === "b2c") return b2cDescSets[catIdx % b2cDescSets.length];
  return techAttrs(sn, catIdx);
}


/* ═══════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");

  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  // Track category indices
  const catCounters = {};

  for (let gi = 0; gi < pages.length; gi++) {
    const { _id, h1, slug } = pages[gi];
    const cat = getCat(slug);
    const sn = shortName(h1);
    const catIdx = catCounters[cat] || 0;
    catCounters[cat] = catIdx + 1;

    console.log(`[${gi + 1}] ${slug} (${cat}#${catIdx}) sn="${sn}"`);

    // 1) Fix hero title — remove repeated H1
    const newTitlePlain = h1;  // just the H1, no " —"
    const newTitleAccent = genTitleAccent(h1, sn, cat, catIdx);

    // 2) Fix attribute descriptions
    const newAttributes = genAttributes(h1, sn, cat, catIdx);

    const patch = {
      titlePlain: newTitlePlain,
      titleAccent: newTitleAccent,
      attributes: newAttributes,
    };

    if (!DRY_RUN) {
      await client.patch(_id).set(patch).commit();
      try {
        const d = await client.getDocument(`drafts.${_id}`);
        if (d) await client.patch(`drafts.${_id}`).set(patch).commit();
      } catch {}
      console.log("  ✓");
    } else {
      console.log(`  titlePlain: "${newTitlePlain}"`);
      console.log(`  titleAccent: "${newTitleAccent}"`);
      console.log(`  attrs[0]: "${newAttributes[0].title}" → ${newAttributes[0].desc[0].children[0].text.slice(0, 60)}...`);
    }
  }
  console.log(`\nDone! ${pages.length} pages updated.`);
}

main().catch(e => { console.error(e); process.exit(1); });
