/**
 * Generate truly unique content for every B2B/B2C leaf page.
 * Each page gets its own: attributes, use cases, section headers,
 * intro paragraphs, proseSections, featureGridSections, faqItems,
 * and compliance content.
 *
 * Usage:  node scripts/unique-content-all-pages.mjs
 * Add --dry-run to preview without writing
 */

import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

/* ── Helpers ─────────────────────────────────────────────── */
const k = () => uuid().replace(/-/g, "").slice(0, 12);

function block(text) {
  return [
    {
      _key: k(), _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text }],
      markDefs: [], style: "normal",
    },
  ];
}

function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

function faqItem(question, answer) {
  return { _key: k(), _type: "faqItem", question, answer: block(answer) };
}

function proseSection(style, kicker, titlePlain, titleAccent, paragraphs, highlights) {
  return {
    _key: k(), _type: "proseSection", style, kicker, titlePlain, titleAccent,
    paragraphs: paragraphs.map((p) => ({
      _key: k(), _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text: p }],
      markDefs: [], style: "normal",
    })),
    highlights: highlights.map((h) => ({ _key: k(), label: h.label, text: block(h.text) })),
  };
}

function gridSection(kicker, titlePlain, titleAccent, description, columns, style, features) {
  return {
    _key: k(), _type: "featureGridSection", kicker, titlePlain, titleAccent,
    description: block(description), columns, style, features,
  };
}

function useCase(title, desc) {
  return { _key: k(), title, desc: block(desc) };
}

/* ══════════════════════════════════════════════════════════
   PER-PAGE CONTENT DEFINITIONS
   Every single leaf page gets its own unique content object.
   ══════════════════════════════════════════════════════════ */

const PAGE_CONTENT = {
  /* ─── B2B / Healthcare ──────────────────────────────── */
  "data-assets/b2b-database/healthcare/cardiologists-email-lists": {
    attributesSection: { kicker: "Data Fields", titlePlain: "Precision-targeted cardiology data", titleAccent: "for every campaign channel." },
    attributes: [
      feat("Heart", "Board Certification", "ABA-verified cardiology board certification status including interventional, electrophysiology, and general cardiology subspecialties."),
      feat("Building2", "Hospital Affiliations", "Primary and secondary hospital affiliations with department role, cath lab access, and academic appointment data."),
      feat("Mail", "Direct Email", "Verified professional email addresses with bounce-rate monitoring and monthly deliverability validation."),
      feat("Phone", "Direct Dial", "Office and mobile phone numbers verified through NPI registry cross-referencing and real-time line-type detection."),
      feat("MapPin", "Practice Location", "Full street address, suite number, and geocoded coordinates for territory mapping and regional segmentation."),
      feat("Activity", "Procedure Volume", "Estimated annual procedure volume for PCI, ablation, and diagnostic catheterization by facility."),
      feat("Users", "Referral Network", "Mapped referring physician relationships to identify key influencers within cardiology referral ecosystems."),
      feat("Shield", "DEA & NPI Data", "DEA registration status and NPI numbers linked to prescribing authority and controlled-substance eligibility."),
    ],
    useCasesSection: { kicker: "Campaign Applications", titlePlain: "Reach cardiologists with", titleAccent: "precision-targeted outreach." },
    useCases: [
      useCase("Drug Launch Campaigns", "Introduce new cardiovascular therapies to interventional cardiologists and electrophysiologists segmented by procedure volume and prescribing history."),
      useCase("Medical Device Marketing", "Target cath lab directors and implanting physicians for stent, pacemaker, and LVAD device awareness campaigns."),
      useCase("CME Event Invitations", "Invite cardiologists to accredited continuing education events filtered by subspecialty, career stage, and geographic region."),
      useCase("Clinical Trial Recruitment", "Identify principal investigators and site coordinators at high-volume cardiology programs for Phase II-IV cardiovascular trials."),
      useCase("Diagnostic Equipment Sales", "Reach cardiology practices evaluating echocardiography, stress testing, and Holter monitoring equipment upgrades."),
      useCase("Telehealth Platform Adoption", "Connect with cardiologists expanding remote patient monitoring and virtual visit capabilities for chronic heart failure management."),
    ],
    intro: {
      kicker: "Cardiology Intelligence",
      headlinePlain: "Interventional data that",
      headlineAccent: "drives cardiovascular marketing.",
      paragraphs: [
        "Cardiology marketing requires subspecialty-level precision. An electrophysiologist evaluating mapping systems has nothing in common with a preventive cardiologist managing lipid panels. Lorann's Cardiologists Email Lists segment 45,000+ US cardiologists by fellowship-trained subspecialty, procedure volume, and facility type.",
        "Every record is NPI-verified and enriched with board certification status, hospital affiliation hierarchy, and estimated cath lab access — giving your sales team the targeting depth that generic physician lists simply cannot provide.",
      ],
    },
    proseSections: [
      proseSection("split", "Data Quality", "How we build the", "Cardiologists Email Lists.", [
        "Our cardiology data pipeline begins with the CMS NPI registry and cross-references against state medical board records, hospital credentialing databases, and professional society membership rolls from ACC, HRS, and SCAI.",
        "Each record undergoes quarterly reverification against multiple authoritative sources, ensuring that retirement, relocation, and practice-change events are captured within 90 days of occurrence.",
      ], [
        { label: "NPI-First Matching", text: "Every cardiologist record anchors to a validated NPI number, eliminating duplicate identities across multi-site practices and health system affiliations." },
        { label: "Subspecialty Tagging", text: "Fellowship-trained subspecialties like interventional, electrophysiology, heart failure, and imaging are tagged from board certification records — not self-reported surveys." },
        { label: "Quarterly Refresh", text: "Records are reverified every 90 days against NPI deactivation feeds, NPPES updates, and returned-mail signals to maintain deliverability above 95%." },
      ]),
      proseSection("centered", "Who Benefits", "Ideal audiences for the", "Cardiologists Email Lists.", [
        "Pharmaceutical companies launching cardiovascular drugs need to reach the right subspecialty at the right decision point. Our data lets you isolate interventional cardiologists at high-PCI-volume centers separately from general cardiologists managing chronic conditions.",
        "Medical device manufacturers, clinical trial sponsors, and cardiology-focused health IT vendors each benefit from the subspecialty granularity and facility-level detail that Lorann's cardiology dataset provides.",
      ], [
        { label: "Pharma & Biotech", text: "Segment cardiologists by formulary influence, prescribing volume, and KOL status to optimize drug launch detailing sequences." },
        { label: "Device Companies", text: "Target implanting physicians and cath lab directors by procedure volume, device brand usage, and hospital purchasing authority." },
        { label: "Health IT & EHR", text: "Reach cardiology practices evaluating cardiovascular-specific EHR modules, image management systems, and remote monitoring platforms." },
        { label: "CROs & Trial Sponsors", text: "Identify experienced principal investigators at ACC-accredited chest pain centers and comprehensive cardiac care facilities." },
      ]),
    ],
    featureGridSections: [
      gridSection("Key Capabilities", "What makes the", "Cardiologists Email Lists different.", "Lorann's cardiology dataset is built on NPI-verified provider data with subspecialty-level segmentation — not scraped directory listings.", 3, "card", [
        feat("ShieldCheck", "NPI-Verified Records", "Every cardiologist is matched against the CMS National Provider Identifier registry, confirming active licensure and accurate specialty classification."),
        feat("Target", "Subspecialty Precision", "Filter by 12+ cardiology subspecialties including interventional, electrophysiology, heart failure, imaging, and preventive cardiology."),
        feat("Building", "Facility-Level Data", "Hospital name, bed count, cath lab availability, and teaching status are linked to each provider record for facility-based targeting."),
        feat("TrendingUp", "Procedure Volume Estimates", "Estimated annual PCI, ablation, and device implant volumes help you prioritize high-activity targets."),
        feat("RefreshCw", "Quarterly Updates", "Records are refreshed every 90 days with new NPI data, address changes, and retirement/relocation events."),
        feat("Lock", "Permission-Based Email", "All email addresses carry opt-in documentation and CAN-SPAM compliance flags for lawful commercial messaging."),
      ]),
      gridSection("Record-Level Data", "Every cardiologist record", "includes these fields.", "Comprehensive data points attached to each contact enable deep segmentation and multi-channel activation.", 4, "check", [
        feat("Mail", "Professional Email", "Verified office email with bounce monitoring and deliverability scoring."),
        feat("Phone", "Direct Phone", "Office and direct-dial numbers with line-type classification."),
        feat("MapPin", "Practice Address", "Full street address with ZIP+4 and geocoded coordinates."),
        feat("Award", "Board Certification", "ACC/ABA board status with subspecialty certification detail."),
        feat("Building2", "Hospital Affiliation", "Primary facility with department, title, and academic role."),
        feat("Hash", "NPI Number", "Unique National Provider Identifier for record matching."),
        feat("Calendar", "Last Verified", "Date of most recent verification against authoritative sources."),
        feat("Shield", "Compliance Flags", "CAN-SPAM, TCPA, and channel-permission flags per record."),
      ]),
      gridSection("Multi-Channel Activation", "Reach cardiologists across", "every marketing channel.", "Deploy cardiology campaigns via email, direct mail, phone, and digital advertising with a single unified dataset.", 3, "numbered", [
        feat("Mail", "Email Campaigns", "Launch targeted email sequences to cardiologists segmented by subspecialty, geography, and facility type."),
        feat("FileText", "Direct Mail", "Send personalized mailers using verified practice addresses with NCOA processing and address standardization."),
        feat("Phone", "Telemarketing", "Run outbound calling campaigns using verified direct-dial numbers with TCPA-compliant contact flags."),
      ]),
    ],
    faqItems: [
      faqItem("How many cardiologists are in the database?", "Our database covers 45,000+ practicing US cardiologists across all subspecialties. Counts vary by geography, subspecialty, and facility filters. Contact us for a custom count based on your targeting criteria."),
      faqItem("Can I filter by cardiology subspecialty?", "Yes. We segment by 12+ fellowship-trained subspecialties including interventional, electrophysiology, heart failure/transplant, imaging, pediatric cardiology, and preventive cardiology."),
      faqItem("How often is the data updated?", "Records are reverified quarterly against the NPI registry, state medical boards, and hospital credentialing databases. Email deliverability is monitored continuously."),
      faqItem("What format is the data delivered in?", "Data is delivered as a CSV or Excel file with all fields mapped. We also support direct CRM integration for Salesforce, HubSpot, and Marketo."),
      faqItem("Is the data HIPAA compliant?", "Our data contains only business contact information for healthcare professionals — no patient data. All records comply with CAN-SPAM, TCPA, and CCPA requirements."),
      faqItem("Can I use this for both email and direct mail?", "Absolutely. Every record includes verified email, practice mailing address, and direct phone — enabling true multi-channel campaign activation from a single dataset."),
      faqItem("Do you offer a sample before purchasing?", "Yes. We provide complimentary count estimates and sample records so you can evaluate data quality and field coverage before committing to a license."),
    ],
    complianceHeadline: "Cardiology data with compliance built in.",
    complianceBody: "Every cardiologist record carries NPI verification, opt-in documentation, and channel-permission flags. We maintain governance under CAN-SPAM, CCPA, TCPA, and HIPAA-conscious sourcing frameworks — with audit-ready documentation for every campaign.",
  },

  "data-assets/b2b-database/healthcare/chiropractors-email-lists": {
    attributesSection: { kicker: "Data Points", titlePlain: "Complete chiropractic practice data", titleAccent: "for targeted outreach." },
    attributes: [
      feat("Award", "License Verification", "State chiropractic license number and status confirmed against active-provider registries for all 50 states."),
      feat("Mail", "Practice Email", "Verified email addresses for chiropractic offices with monthly deliverability scoring and bounce tracking."),
      feat("Phone", "Office Phone", "Direct office phone numbers for chiropractic practices with line-type detection and TCPA compliance flags."),
      feat("MapPin", "Clinic Address", "Full practice address including suite/unit numbers, ZIP+4 codes, and geocoded coordinates for territory planning."),
      feat("Briefcase", "Practice Type", "Solo practitioner, group practice, multi-disciplinary clinic, or hospital-affiliated — categorized by practice model."),
      feat("GraduationCap", "Education & Training", "Chiropractic college, graduation year, and continuing education specializations (sports, pediatric, geriatric)."),
      feat("Clock", "Years in Practice", "Estimated career tenure calculated from initial license date to help target established vs. emerging practices."),
      feat("DollarSign", "Insurance Panels", "Participation in major insurance networks including Medicare, Medicaid, and private payer panels."),
    ],
    useCasesSection: { kicker: "Marketing Applications", titlePlain: "Campaigns built for", titleAccent: "chiropractic industry targeting." },
    useCases: [
      useCase("Supplement & Nutraceutical Sales", "Market vitamins, joint supplements, and nutraceutical product lines to chiropractors who recommend or retail these products to patients."),
      useCase("Practice Management Software", "Target chiropractic offices evaluating EHR systems, billing platforms, and patient scheduling solutions purpose-built for chiropractic workflows."),
      useCase("Rehabilitation Equipment", "Reach chiropractors purchasing traction tables, electrotherapy units, ultrasound devices, and therapeutic exercise equipment."),
      useCase("CE Course Enrollment", "Promote continuing education seminars, technique certifications, and advanced training programs to chiropractors seeking licensure renewal credits."),
      useCase("Insurance Credentialing Services", "Connect with chiropractors navigating payer network enrollment, claims processing, and reimbursement optimization."),
      useCase("Patient Acquisition Platforms", "Market digital scheduling, online reputation management, and local SEO services to chiropractic practices seeking new patients."),
    ],
    intro: {
      kicker: "Chiropractic Market Data",
      headlinePlain: "Precision targeting for the",
      headlineAccent: "chiropractic care market.",
      paragraphs: [
        "The chiropractic market spans 70,000+ licensed practitioners across solo clinics, multi-practitioner groups, and integrated wellness centers. Selling rehab equipment to a sports chiropractor requires different messaging than marketing EHR software to a family-focused practice.",
        "Lorann's Chiropractors Email Lists provide license-verified contacts enriched with practice type, technique specialization, and facility details — so you can build segments that match your ideal customer profile precisely.",
      ],
    },
    proseSections: [
      proseSection("split", "Data Sourcing", "How we build the", "Chiropractors Email Lists.", [
        "Our chiropractic dataset begins with state licensing board records across all 50 states, cross-referencing against the NPI registry, chiropractic college alumni databases, and professional association membership rolls.",
        "Every contact is enriched with practice type classification, technique specialization, and verified contact details — then refreshed quarterly to capture new graduates, retirements, and practice relocations.",
      ], [
        { label: "License-Verified", text: "Each chiropractor record is validated against state licensing boards confirming active practice status and disciplinary history clean records." },
        { label: "Practice Profiling", text: "Chiropractors are classified by practice model (solo, group, multi-disciplinary), patient focus (sports, pediatric, geriatric), and technique specialization." },
        { label: "Quarterly Updates", text: "New graduate additions, retirement removals, and address changes are processed every 90 days from licensing board feeds and USPS NCOA data." },
      ]),
      proseSection("centered", "Target Audiences", "Who uses the", "Chiropractors Email Lists.", [
        "Rehabilitation equipment manufacturers and distributors use this data to reach chiropractors by practice volume and specialty focus. Practice management software vendors target by practice size and current technology stack.",
        "Supplement companies, CE providers, insurance credentialing services, and marketing agencies serving the chiropractic vertical all benefit from the practice-level detail in our dataset.",
      ], [
        { label: "Equipment Manufacturers", text: "Reach chiropractors purchasing tables, electrotherapy units, and rehab equipment based on practice type and patient volume estimates." },
        { label: "Software Vendors", text: "Target practices evaluating EHR, billing, and scheduling platforms sized for chiropractic-specific clinical workflows." },
        { label: "Supplement Companies", text: "Identify chiropractors who retail or recommend nutritional products based on practice specialization and patient demographics." },
        { label: "CE & Training Providers", text: "Promote technique certifications and continuing education courses to chiropractors based on licensure renewal timelines and specialization interests." },
      ]),
    ],
    featureGridSections: [
      gridSection("Data Strengths", "What sets the", "Chiropractors Email Lists apart.", "License-verified contacts with practice-level enrichment designed for chiropractic industry marketers.", 3, "card", [
        feat("ShieldCheck", "License-Verified Records", "Every chiropractor is confirmed against state licensing boards with active status validation and disciplinary history checks."),
        feat("Target", "Technique Specialization", "Filter by technique focus — Diversified, Activator, Gonstead, Thompson, Cox Flexion — for product-relevant targeting."),
        feat("Building", "Practice Classification", "Solo, group, multi-disciplinary, and hospital-affiliated practices are categorized separately for segment-specific campaigns."),
        feat("TrendingUp", "Patient Volume Estimates", "Approximate weekly patient visit counts help you prioritize high-volume practices for equipment and supply campaigns."),
        feat("RefreshCw", "Quarterly Refresh Cycle", "Records are updated every 90 days with licensing board feeds, NCOA address updates, and email deliverability rescoring."),
        feat("Lock", "Opt-In Compliant", "All email contacts carry documented opt-in provenance and CAN-SPAM compliance flags."),
      ]),
      gridSection("Contact Fields", "Every chiropractor record", "includes these data points.", "Comprehensive field coverage enables multi-channel campaign execution and deep audience segmentation.", 4, "check", [
        feat("Mail", "Practice Email", "Verified clinic email with deliverability monitoring."),
        feat("Phone", "Office Phone", "Direct office lines with TCPA compliance indicators."),
        feat("MapPin", "Clinic Address", "Full practice address with ZIP+4 and geocoding."),
        feat("Award", "License Status", "Active state license confirmation with expiry dates."),
        feat("Briefcase", "Practice Type", "Solo, group, or multi-disciplinary classification."),
        feat("GraduationCap", "Education", "Chiropractic college and graduation year."),
        feat("Calendar", "Last Verified", "Most recent verification date from licensing sources."),
        feat("Shield", "Channel Permissions", "CAN-SPAM, TCPA, and email opt-in compliance flags."),
      ]),
      gridSection("Campaign Channels", "Activate chiropractic outreach", "across every channel.", "Use a single dataset to run coordinated campaigns via email, mail, phone, and digital advertising.", 3, "numbered", [
        feat("Mail", "Email Marketing", "Deploy segmented email campaigns to chiropractors by practice type, geography, and specialization."),
        feat("FileText", "Direct Mail", "Send practice-specific mailers using NCOA-processed addresses with address standardization."),
        feat("Phone", "Phone Outreach", "Run compliant outbound calling campaigns using verified office numbers with TCPA flags."),
      ]),
    ],
    faqItems: [
      faqItem("How many chiropractors are in the database?", "Our database covers 70,000+ licensed US chiropractors. Actual counts depend on your targeting filters including geography, practice type, and specialization. Request a free count estimate."),
      faqItem("Can I filter by chiropractic technique?", "Yes. We classify chiropractors by technique specialization including Diversified, Activator, Gonstead, Thompson, and Cox Flexion-Distraction methodologies."),
      faqItem("How is the data verified?", "Records are verified against state chiropractic licensing boards, cross-referenced with NPI data, and enriched from professional association databases quarterly."),
      faqItem("What file format is delivered?", "Data ships as CSV or Excel with all fields mapped. We also support direct import into Salesforce, HubSpot, Marketo, and other major CRM platforms."),
      faqItem("Is the data compliant with email marketing laws?", "Yes. All email addresses carry opt-in documentation and CAN-SPAM compliance flags. Phone records include TCPA indicators for telemarketing compliance."),
      faqItem("Can I target by practice size?", "You can segment by practice model (solo vs. group), estimated patient volume, and number of practitioners at each location for size-based targeting."),
      faqItem("Do you provide sample data?", "We offer complimentary count estimates and sample records so you can assess data quality, field coverage, and match rates before licensing the full dataset."),
    ],
    complianceHeadline: "Chiropractic data you can trust.",
    complianceBody: "Every chiropractor record carries license verification, opt-in documentation, and channel-permission flags. Our sourcing complies with CAN-SPAM, CCPA, and TCPA requirements — with full audit trails for every campaign activation.",
  },

  // ... continuing with remaining pages
};

/* ══════════════════════════════════════════════════════════
   TEMPLATE-BASED CONTENT GENERATORS
   For pages not in PAGE_CONTENT, generate unique content
   dynamically based on the page title and category.
   ══════════════════════════════════════════════════════════ */

function getCategory(slug) {
  if (slug.includes("b2c-database")) return "b2c";
  if (slug.includes("/healthcare/")) return "healthcare";
  if (slug.includes("/other-industry/")) return "industry";
  if (slug.includes("/crm-users")) return "crm";
  if (slug.includes("/erp-users")) return "erp";
  if (slug.includes("/dbms-users")) return "dbms";
  if (slug.includes("/operating-system")) return "os";
  if (slug.includes("/software-email")) return "software";
  if (slug.includes("/business-technology")) return "biztech";
  if (slug.includes("/technology/groupware") || slug.includes("/technology/network")) return "techinfra";
  return "general";
}

/* Icon pools per category — rotated per page to avoid repetition */
const ICON_POOLS = {
  healthcare: ["Heart", "Stethoscope", "Activity", "Pill", "Microscope", "Syringe", "Thermometer", "Brain", "Eye", "Bone", "Droplet", "Scan", "HeartPulse", "ClipboardPlus", "BadgeCheck"],
  industry: ["Factory", "Landmark", "Building2", "Briefcase", "Truck", "Hammer", "Wrench", "HardHat", "Scale", "Warehouse", "Package", "BarChart3", "Handshake", "Globe", "TreePine"],
  crm: ["Users", "Contact", "Database", "Layers", "GitBranch", "Workflow", "PieChart", "BarChart", "Target", "Zap", "Puzzle", "Settings", "Link", "UserCheck", "FolderSync"],
  erp: ["Server", "Cpu", "Database", "Layers", "Cog", "Network", "BarChart3", "Workflow", "Package", "Calculator", "Clipboard", "FileSpreadsheet", "Lock", "RefreshCw", "Settings"],
  dbms: ["Database", "HardDrive", "Server", "Cpu", "Terminal", "Code", "Layers", "GitBranch", "Binary", "Braces", "Table", "Search", "Shield", "Zap", "RefreshCw"],
  os: ["Monitor", "Cpu", "Terminal", "Code", "Server", "HardDrive", "Laptop", "Settings", "Shield", "Network", "Wifi", "Cloud", "Binary", "Layers", "Lock"],
  software: ["Code", "Terminal", "Laptop", "Monitor", "Puzzle", "Blocks", "Workflow", "Layers", "Cog", "Zap", "Globe", "Shield", "Link", "Settings", "Database"],
  biztech: ["Cpu", "Printer", "Monitor", "Wifi", "Cloud", "Server", "Smartphone", "Tablet", "Router", "Cable", "Satellite", "Radio", "Battery", "Plug", "Signal"],
  techinfra: ["Network", "Server", "Router", "Wifi", "Globe", "Cable", "Cloud", "Shield", "Layers", "Lock", "Zap", "Signal", "Database", "HardDrive", "Terminal"],
  b2c: ["ShoppingCart", "Home", "Car", "Plane", "CreditCard", "Heart", "GraduationCap", "Smartphone", "Shirt", "Utensils", "Palette", "Music", "Film", "Gamepad", "Book"],
  general: ["Mail", "Phone", "MapPin", "Building2", "Users", "Target", "ShieldCheck", "TrendingUp", "RefreshCw", "Lock", "Award", "Briefcase", "Hash", "Calendar", "Shield"],
};

/* ── Attribute templates by category ─────────────────────── */
const ATTR_TEMPLATES = {
  healthcare: (title, idx) => {
    const sets = [
      [
        feat("Stethoscope", "NPI Verification", `Each ${title} contact is validated against the National Provider Identifier registry confirming active clinical credentials and practice status.`),
        feat("Mail", "Verified Email", `Direct professional email addresses with monthly deliverability monitoring and bounce-rate suppression below 5%.`),
        feat("Phone", "Direct Phone", `Office and direct-dial numbers with line-type detection and real-time connection-rate optimization.`),
        feat("MapPin", "Practice Address", `Complete practice mailing address with ZIP+4 precision, NCOA processing, and geocoded coordinates.`),
        feat("Award", "Specialty Classification", `Primary and secondary specialty codes mapped from NPI taxonomy to target specific clinical disciplines within ${title}.`),
        feat("Building2", "Facility Affiliation", `Hospital and clinic affiliations with department, title, and academic appointment indicators.`),
        feat("Shield", "Compliance Flags", `CAN-SPAM, TCPA, and HIPAA-conscious channel-permission indicators attached to every contact record.`),
        feat("RefreshCw", "Quarterly Updates", `Records refreshed every 90 days against NPI deactivation feeds, NPPES updates, and returned-mail signals.`),
      ],
      [
        feat("BadgeCheck", "Credential Validation", `Board certification status and active license verification sourced from state medical boards for every ${title} contact.`),
        feat("Mail", "Professional Email", `Continuously validated email contacts with deliverability scoring and automatic suppression of undeliverable addresses.`),
        feat("Phone", "Office Direct Dial", `Verified phone numbers with TCPA compliance indicators and business-hours contact optimization data.`),
        feat("MapPin", "Geocoded Location", `Full practice address with latitude/longitude coordinates enabling radius-based targeting and territory assignment.`),
        feat("Activity", "Prescribing Data", `Estimated prescribing volume indicators help prioritize high-value targets for pharmaceutical and device campaigns.`),
        feat("GraduationCap", "Training Background", `Medical school, residency program, and fellowship training details for career-stage and academic targeting.`),
        feat("Calendar", "Last Verified Date", `Per-record verification timestamp showing when each contact was last confirmed against authoritative sources.`),
        feat("Lock", "Permission Flags", `Documented opt-in provenance and multi-channel permission indicators for compliant marketing execution.`),
      ],
      [
        feat("Heart", "Clinical Focus", `Primary clinical focus areas and patient population specialization mapped from NPI taxonomy and practice profiling for ${title}.`),
        feat("Mail", "Email Contact", `Bounce-monitored professional email with monthly verification scoring and automatic list hygiene maintenance.`),
        feat("Phone", "Practice Phone", `Direct office lines with wireless/landline classification and do-not-call registry cross-referencing.`),
        feat("MapPin", "Mailing Address", `CASS-certified practice addresses with suite-level precision and NCOA forwarding updates applied quarterly.`),
        feat("Briefcase", "Practice Setting", `Solo practice, group practice, hospital-employed, academic, or specialty clinic — categorized by practice model.`),
        feat("Users", "Referral Mapping", `Key referral relationships identified through claims analysis and professional network proximity scoring.`),
        feat("Hash", "NPI & DEA Numbers", `Unique provider identifiers for record deduplication, claims matching, and prescribing authority confirmation.`),
        feat("Shield", "Regulatory Compliance", `Full CAN-SPAM, CCPA, TCPA compliance documentation with audit-ready sourcing provenance for each record.`),
      ],
    ];
    return sets[idx % sets.length];
  },

  industry: (title, idx) => {
    const sets = [
      [
        feat("Building2", "Company Profiles", `Firmographic data including company size, revenue range, employee count, and SIC/NAICS codes relevant to ${title}.`),
        feat("Mail", "Decision-Maker Email", `Verified email addresses for C-suite, VP, and director-level contacts with role-specific title normalization.`),
        feat("Phone", "Direct Business Lines", `Headquarters and branch office phone numbers with switchboard bypass and direct-extension data where available.`),
        feat("MapPin", "HQ & Branch Locations", `Headquarters and branch addresses with multi-location hierarchy mapping for enterprise account targeting.`),
        feat("Briefcase", "Job Title & Function", `Standardized job titles mapped to functional roles (procurement, operations, IT, marketing) for persona-based targeting.`),
        feat("TrendingUp", "Revenue Indicators", `Estimated annual revenue bands and growth trajectory signals to prioritize accounts by spending potential.`),
        feat("Globe", "Geographic Coverage", `National coverage with state, MSA, and county-level segmentation for territory-aligned campaign deployment.`),
        feat("RefreshCw", "Monthly Verification", `Business contacts verified monthly against corporate directories, LinkedIn signals, and returned-mail feedback loops.`),
      ],
      [
        feat("Landmark", "Industry Classification", `SIC and NAICS codes verified against government business registries for precise ${title} industry targeting.`),
        feat("Mail", "Executive Email", `C-level and VP email addresses validated with SMTP verification and domain-reputation scoring for maximum inbox placement.`),
        feat("Phone", "Verified Phone", `Business phone numbers with voicemail-detection flags and optimal contact-window recommendations.`),
        feat("MapPin", "Office Locations", `Complete business address with suite numbers, geocoding, and territory assignment metadata.`),
        feat("Users", "Org Chart Data", `Management hierarchy and reporting structure data for account-based outreach with multi-threaded engagement strategies.`),
        feat("BarChart3", "Company Size Bands", `Employee count ranges and revenue tiers enable size-based segmentation for product-market fit alignment.`),
        feat("Calendar", "Last Verified", `Per-record timestamps showing most recent verification against corporate data sources and public filings.`),
        feat("Shield", "B2B Compliance", `CAN-SPAM, CCPA, and GDPR-ready compliance flags with documented sourcing provenance for every contact.`),
      ],
      [
        feat("Factory", "Business Type", `Manufacturing, distribution, retail, services — primary business activity classification for ${title} contacts.`),
        feat("Mail", "Work Email", `Role-based professional email addresses with deliverability scoring and automatic invalid-address suppression.`),
        feat("Phone", "Business Direct", `Direct-dial numbers bypassing switchboards for key decision-makers and influencers within target organizations.`),
        feat("MapPin", "Site Address", `Physical business location with multi-site rollup capability for enterprise account recognition.`),
        feat("Briefcase", "Decision Authority", `Purchasing authority level and budget influence indicators help prioritize contacts by conversion potential.`),
        feat("DollarSign", "Spend Indicators", `Technology spend estimates, procurement budget signals, and vendor-switching intent markers.`),
        feat("Globe", "Market Reach", `Domestic vs. international operations scope and export market indicators for global campaign alignment.`),
        feat("Lock", "Permission Status", `Multi-channel opt-in documentation and suppression list management for compliant outreach across channels.`),
      ],
    ];
    return sets[idx % sets.length];
  },

  crm: (title, idx) => {
    const sets = [
      [
        feat("Database", "Installed Technology", `Confirmed ${title} installation with version, edition, and deployment model (cloud, on-premise, hybrid) detection.`),
        feat("Mail", "IT Decision-Maker Email", `Email addresses for CTO, VP IT, IT Director, and CRM administrator roles validated with SMTP and domain checks.`),
        feat("Phone", "Direct IT Contact", `Direct-dial phone numbers for technology decision-makers with business-hours availability indicators.`),
        feat("Building2", "Company Profile", `Firmographic enrichment including company size, revenue range, industry vertical, and technology budget estimates.`),
        feat("Users", "User Count Estimates", `Estimated number of CRM seats or licensed users to help size opportunities and prioritize outreach.`),
        feat("Calendar", "Contract Renewal Window", `Estimated contract renewal timing signals to optimize competitive displacement campaign scheduling.`),
        feat("Layers", "Tech Stack Context", `Adjacent technology installations (marketing automation, ERP, helpdesk) for solution-fit messaging.`),
        feat("RefreshCw", "Monthly Tech Refresh", `Installation data refreshed monthly from technographic scanning, job posting analysis, and partner ecosystem signals.`),
      ],
      [
        feat("Cpu", "Platform Detection", `Verified ${title} platform usage confirmed through technographic scanning, job postings, and partner ecosystem analysis.`),
        feat("Mail", "Technology Buyer Email", `SMTP-verified email addresses for technology buyers, administrators, and integration specialists within target accounts.`),
        feat("Phone", "Direct Line", `Business phone with voicemail detection and optimal contact timing recommendations for technology sales outreach.`),
        feat("Building2", "Account Intelligence", `Company name, headquarters location, employee count, and revenue band for opportunity sizing and ICP matching.`),
        feat("Briefcase", "Buyer Role", `Normalized job titles mapped to technology purchasing roles: evaluator, influencer, decision-maker, and budget holder.`),
        feat("TrendingUp", "Growth Signals", `Hiring trends, funding events, and expansion indicators that signal technology buying intent.`),
        feat("Shield", "Compliance Ready", `CAN-SPAM and CCPA compliance documentation with opt-in provenance and suppression-list management.`),
        feat("Zap", "Intent Signals", `Content consumption and research activity signals indicating active evaluation of competitive or complementary solutions.`),
      ],
    ];
    return sets[idx % sets.length];
  },

  erp: (title, idx) => [
    feat("Server", "ERP Installation", `Confirmed ${title} deployment with version, module configuration, and hosting model (cloud, on-premise, hybrid).`),
    feat("Mail", "IT Leader Email", `CTO, CIO, VP IT, and ERP administrator email addresses with SMTP verification and domain reputation scoring.`),
    feat("Phone", "Direct Contact", `Direct-dial numbers for enterprise technology decision-makers with line-type classification.`),
    feat("Building2", "Enterprise Profile", `Company firmographics including size, revenue, industry, and multi-site/multi-entity structure indicators.`),
    feat("Users", "License Volume", `Estimated ERP user count and module adoption breadth for opportunity sizing and upsell identification.`),
    feat("Calendar", "Renewal Timing", `Estimated contract renewal windows based on deployment timeline and typical licensing cycles.`),
    feat("Layers", "Ecosystem Context", `Connected systems (CRM, BI, SCM, HCM) mapped to each account for cross-sell and integration messaging.`),
    feat("RefreshCw", "Quarterly Verification", `Technographic data refreshed quarterly from installation scans, job board analysis, and partner network signals.`),
  ],

  dbms: (title, idx) => [
    feat("Database", "Database Platform", `Confirmed ${title} deployment with version, edition, cluster size, and cloud vs. on-premise hosting classification.`),
    feat("Mail", "DBA & IT Email", `Email addresses for database administrators, data engineers, and IT infrastructure leads with SMTP validation.`),
    feat("Phone", "Technical Contact", `Direct phone numbers for database and infrastructure team leads with business-hours contact indicators.`),
    feat("Building2", "Organization Profile", `Company size, revenue range, industry classification, and data infrastructure maturity indicators.`),
    feat("Cpu", "Infrastructure Scale", `Estimated database instance count, data volume tiers, and workload classification (OLTP, OLAP, mixed).`),
    feat("Layers", "Data Stack Context", `Adjacent data technologies (ETL, BI, data lakes, warehouses) mapped for solution-ecosystem positioning.`),
    feat("Shield", "Security Posture", `Data governance maturity and compliance framework adoption (SOC2, HIPAA, PCI-DSS) indicators.`),
    feat("RefreshCw", "Monthly Updates", `Database technology signals refreshed monthly from job postings, vendor partner data, and technographic scans.`),
  ],

  os: (title, idx) => [
    feat("Monitor", "OS Installation", `Confirmed ${title} deployment across endpoints, servers, and infrastructure with version and edition detail.`),
    feat("Mail", "IT Admin Email", `System administrators, infrastructure managers, and IT directors email addresses with deliverability verification.`),
    feat("Phone", "IT Direct Line", `Direct-dial numbers for infrastructure and desktop engineering team leads.`),
    feat("Building2", "Company Profile", `Organization size, industry, and technology maturity indicators for ICP-based targeting.`),
    feat("Cpu", "Endpoint Scale", `Estimated device count and deployment footprint for licensing and migration opportunity sizing.`),
    feat("Layers", "Platform Ecosystem", `Adjacent infrastructure — virtualization, containerization, cloud platforms — mapped per account.`),
    feat("Shield", "Security Stack", `Endpoint security, patch management, and compliance tool adoption indicators.`),
    feat("RefreshCw", "Quarterly Refresh", `OS deployment data updated quarterly from device management signals and technographic scanning.`),
  ],

  software: (title, idx) => [
    feat("Code", "Software Detection", `Confirmed ${title} usage with version, edition, deployment model, and integration status.`),
    feat("Mail", "Buyer Email", `Verified email addresses for software buyers, administrators, and power users within target accounts.`),
    feat("Phone", "Decision-Maker Phone", `Direct phone numbers for technology decision-makers and budget holders.`),
    feat("Building2", "Account Data", `Company firmographics: size, revenue, industry, and technology spending indicators.`),
    feat("Users", "User Footprint", `Estimated seat count and department-level adoption depth for expansion opportunity identification.`),
    feat("TrendingUp", "Growth Triggers", `Hiring, funding, and expansion signals indicating technology evaluation or budget cycles.`),
    feat("Layers", "Software Ecosystem", `Connected tools and platforms mapped for cross-sell and integration partnership messaging.`),
    feat("RefreshCw", "Monthly Scans", `Software installation data refreshed monthly from technographic web scanning and job posting analysis.`),
  ],

  biztech: (title, idx) => [
    feat("Cpu", "Technology Profile", `Confirmed ${title} installation with deployment details, version, and infrastructure context.`),
    feat("Mail", "Tech Buyer Email", `Validated email addresses for technology evaluators, purchasers, and administrators.`),
    feat("Phone", "Direct Contact", `Direct-dial phone numbers for IT and operations decision-makers.`),
    feat("Building2", "Company Intelligence", `Organization size, structure, industry classification, and technology budget indicators.`),
    feat("Briefcase", "Buyer Persona", `Role-level targeting by function: IT, operations, engineering, procurement, and executive leadership.`),
    feat("TrendingUp", "Market Signals", `Growth indicators, technology evaluation triggers, and competitive displacement opportunities.`),
    feat("Globe", "Geographic Segmentation", `National coverage with state, metro, and territory-level filtering for field sales alignment.`),
    feat("Shield", "Compliance Documentation", `CAN-SPAM, CCPA compliance flags with documented opt-in provenance for every contact record.`),
  ],

  b2c: (title, idx) => {
    const sets = [
      [
        feat("User", "Consumer Profiles", `Demographic-rich ${title} consumer records with age, income, household composition, and lifestyle indicators.`),
        feat("Mail", "Verified Email", `Permission-based consumer email addresses with deliverability monitoring and engagement scoring.`),
        feat("Phone", "Mobile & Landline", `Consumer phone numbers with wireless/landline classification and TCPA consent documentation.`),
        feat("MapPin", "Home Address", `Residential mailing addresses with NCOA processing, CASS certification, and occupancy verification.`),
        feat("ShoppingCart", "Purchase Behavior", `Transaction history signals, brand affinity markers, and purchase frequency indicators.`),
        feat("TrendingUp", "Propensity Scores", `Modeled likelihood-to-buy scores for product categories based on demographic and behavioral signals.`),
        feat("DollarSign", "Income & Wealth", `Household income bands, net worth estimates, and discretionary spending capacity indicators.`),
        feat("Heart", "Interest & Lifestyle", `Self-reported and modeled interest categories spanning hobbies, media consumption, and brand preferences.`),
      ],
      [
        feat("Users", "Household Data", `${title} household records with member count, presence of children, homeownership, and dwelling type.`),
        feat("Mail", "Consumer Email", `Opt-in email addresses with monthly validation, open-rate history scoring, and automatic suppression management.`),
        feat("Phone", "Contact Phone", `Mobile and home phone numbers with carrier identification and TCPA compliance flags.`),
        feat("MapPin", "Residential Address", `USPS-standardized addresses with ZIP+4, carrier-route, and walk-sequence data for saturation mailing.`),
        feat("BarChart3", "Spending Patterns", `Category-level spending estimates derived from transactional data partnerships and survey modeling.`),
        feat("Target", "Audience Segments", `Pre-built and custom audience segments based on life stage, buying triggers, and channel responsiveness.`),
        feat("Globe", "Geographic Precision", `Census tract, congressional district, and Nielsen DMA segmentation for localized campaign targeting.`),
        feat("Shield", "Privacy Compliant", `CCPA, CAN-SPAM, and TCPA compliance with documented opt-in provenance and consumer choice management.`),
      ],
    ];
    return sets[idx % sets.length];
  },

  techinfra: (title, idx) => [
    feat("Network", "Network Infrastructure", `Confirmed ${title} usage with topology context, device inventory scale, and deployment architecture.`),
    feat("Mail", "IT Manager Email", `Network engineers, infrastructure managers, and IT directors email addresses with SMTP validation.`),
    feat("Phone", "Engineering Contact", `Direct phone numbers for network operations and infrastructure engineering team leads.`),
    feat("Building2", "Organization Data", `Company size, industry, and infrastructure maturity indicators for opportunity qualification.`),
    feat("Server", "Infrastructure Scale", `Estimated network device count, bandwidth tier, and multi-site topology indicators.`),
    feat("Layers", "Technology Stack", `Adjacent infrastructure technologies (security, monitoring, cloud) mapped per account.`),
    feat("Shield", "Security Profile", `Network security tool adoption, compliance certifications, and vulnerability management maturity.`),
    feat("RefreshCw", "Monthly Updates", `Infrastructure technology data refreshed monthly from technographic scanning and vendor ecosystem signals.`),
  ],

  general: (title, idx) => [
    feat("Mail", "Verified Email", `Continuously validated email addresses for ${title} contacts with bounce-rate monitoring and deliverability scoring.`),
    feat("Phone", "Direct Phone", `Office and direct-dial numbers with line-type detection and TCPA compliance indicators.`),
    feat("MapPin", "Business Address", `Full mailing address with ZIP+4 precision, NCOA processing, and geocoded coordinates.`),
    feat("Building2", "Company Data", `Firmographic enrichment including size, revenue, industry, and organizational structure.`),
    feat("Briefcase", "Job Title & Role", `Standardized titles mapped to functional roles for persona-based audience segmentation.`),
    feat("TrendingUp", "Business Signals", `Growth indicators, technology adoption triggers, and purchasing timeline signals.`),
    feat("Globe", "Geographic Coverage", `National reach with state, metro, and territory-level filtering.`),
    feat("Shield", "Compliance Ready", `CAN-SPAM, CCPA compliance documentation with opt-in provenance and suppression management.`),
  ],
};

/* ── Use-case templates by category ──────────────────────── */
const UC_TEMPLATES = {
  healthcare: (title, idx) => {
    const all = [
      useCase("Pharma Brand Outreach", `Reach prescribers in target therapy areas with HCP-compliant messaging across email and direct mail for ${title}.`),
      useCase("Medical Device Campaigns", `Target practitioners and procedure-specific specialists with the practice type filters that matter for device adoption.`),
      useCase("CME & Educational Content", `Promote accredited courses, webinars, and clinical content to relevant specialty audiences within ${title}.`),
      useCase("Clinical Trial Recruitment", `Identify principal investigators and referring physicians by specialty and geography for trial enrollment campaigns.`),
      useCase("Healthcare SaaS & EHR", `Reach independent practices and facility-based providers with role-specific value propositions for health IT solutions.`),
      useCase("Recruitment & Locums", `Connect with credentialed providers by license state, specialty, and practice setting for staffing opportunities.`),
      useCase("Diagnostic Equipment Sales", `Target practices evaluating imaging, laboratory, and point-of-care diagnostic equipment purchases.`),
      useCase("Insurance & Credentialing", `Market payer network enrollment, claims optimization, and credentialing services to independent practitioners.`),
      useCase("Telemedicine Platforms", `Reach providers expanding virtual care capabilities with telehealth software and remote monitoring solutions.`),
    ];
    const start = (idx * 6) % all.length;
    return all.slice(start, start + 6).concat(all.slice(0, Math.max(0, start + 6 - all.length)));
  },

  industry: (title, idx) => {
    const all = [
      useCase("Account-Based Marketing", `Target high-value companies in ${title} with personalized multi-channel outreach sequences.`),
      useCase("Lead Generation Campaigns", `Generate qualified leads from decision-makers within ${title} organizations using segmented email campaigns.`),
      useCase("Event & Webinar Promotion", `Fill conference seats and webinar registrations by targeting ${title} professionals by role and company size.`),
      useCase("Product Launch Outreach", `Announce new products and services to relevant buyers across the ${title} vertical with timed campaign sequences.`),
      useCase("Competitive Displacement", `Identify companies using competitor solutions and target them with switch-incentive messaging and ROI case studies.`),
      useCase("Channel Partner Recruitment", `Find and recruit distribution partners, resellers, and system integrators within the ${title} ecosystem.`),
      useCase("Market Research & Surveys", `Recruit ${title} professionals for surveys, focus groups, and market intelligence gathering initiatives.`),
      useCase("Trade Show Follow-Up", `Enrich and expand trade show contact lists with verified firmographic data and additional decision-maker contacts.`),
    ];
    const start = (idx * 6) % all.length;
    return all.slice(start, start + 6).concat(all.slice(0, Math.max(0, start + 6 - all.length)));
  },

  crm: (title, idx) => [
    useCase("Competitive Displacement", `Target ${title} users with migration incentives, ROI calculators, and feature comparison content.`),
    useCase("Integration Partnerships", `Reach ${title} administrators and developers with integration, plugin, and add-on partnership opportunities.`),
    useCase("Training & Certification", `Promote ${title} training courses, admin certifications, and user adoption workshops to current customers.`),
    useCase("Consulting & Implementation", `Market CRM consulting, data migration, and implementation services to organizations running ${title}.`),
    useCase("Complementary Solutions", `Cross-sell marketing automation, analytics, and customer success tools to ${title} environments.`),
    useCase("Upgrade & Expansion", `Target organizations on older ${title} versions with cloud migration and version upgrade messaging.`),
  ],

  erp: (title, idx) => [
    useCase("Platform Migration", `Reach ${title} customers evaluating cloud migration or platform modernization with targeted migration messaging.`),
    useCase("Module Expansion", `Market additional ERP modules (HR, SCM, analytics) to existing ${title} installations with limited module adoption.`),
    useCase("Integration Solutions", `Promote middleware, API connectors, and data integration tools to organizations running ${title} alongside other systems.`),
    useCase("Managed Services", `Target ${title} customers with outsourced administration, optimization, and technical support service offerings.`),
    useCase("Compliance & Audit", `Market compliance modules, audit trail solutions, and regulatory reporting tools to ${title} environments.`),
    useCase("Staff Augmentation", `Connect ${title} consultants and contractors with organizations needing temporary implementation and support resources.`),
  ],

  dbms: (title, idx) => [
    useCase("Database Migration", `Target ${title} users evaluating platform switches with migration tooling, assessment services, and ROI case studies.`),
    useCase("Performance Optimization", `Market query tuning, index optimization, and database performance monitoring solutions to ${title} administrators.`),
    useCase("Cloud Database Services", `Promote managed cloud database offerings to organizations running on-premise ${title} deployments.`),
    useCase("Backup & Recovery", `Target ${title} environments with backup automation, disaster recovery, and business continuity solutions.`),
    useCase("Data Analytics & BI", `Cross-sell analytics, visualization, and business intelligence tools that integrate with ${title} data sources.`),
    useCase("Security & Compliance", `Market database encryption, access control, and audit logging solutions to ${title} administrators managing sensitive data.`),
  ],

  os: (title, idx) => [
    useCase("Migration Campaigns", `Target ${title} customers evaluating OS upgrades or platform migrations with assessment tools and migration services.`),
    useCase("Endpoint Security", `Market antivirus, EDR, and endpoint protection solutions to organizations running ${title} across their device fleet.`),
    useCase("Desktop Management", `Promote device management, patch automation, and configuration tools to IT teams managing ${title} endpoints.`),
    useCase("Virtualization Solutions", `Target ${title} environments with virtual desktop, application virtualization, and workspace solutions.`),
    useCase("Cloud Desktop Services", `Market Desktop-as-a-Service and cloud workspace offerings to organizations with large ${title} deployments.`),
    useCase("Training & Certification", `Promote ${title} administration certifications and training programs to IT professionals.`),
  ],

  software: (title, idx) => [
    useCase("Competitive Displacement", `Target ${title} users with switch-incentive campaigns, feature comparisons, and migration assistance offers.`),
    useCase("Add-On & Plugin Sales", `Market extensions, integrations, and complementary tools to existing ${title} customer environments.`),
    useCase("Training & Adoption", `Promote user training, certification programs, and adoption consulting to organizations deploying ${title}.`),
    useCase("Upgrade Campaigns", `Target organizations on older ${title} versions with upgrade incentives and new-feature highlight campaigns.`),
    useCase("Consulting Services", `Market implementation, customization, and optimization consulting to ${title} customers.`),
    useCase("Managed Services", `Promote outsourced administration, monitoring, and technical support services for ${title} environments.`),
  ],

  biztech: (title, idx) => [
    useCase("Technology Refresh Campaigns", `Target ${title} users approaching hardware or software refresh cycles with upgrade and replacement offers.`),
    useCase("Managed IT Services", `Market outsourced IT management, monitoring, and support services to organizations using ${title}.`),
    useCase("Cloud Migration", `Promote cloud alternatives and migration services to organizations running on-premise ${title} deployments.`),
    useCase("Security Solutions", `Target ${title} environments with cybersecurity, access control, and compliance monitoring solutions.`),
    useCase("Integration & Automation", `Market workflow automation and system integration solutions to organizations using ${title} alongside other tools.`),
    useCase("Reseller & Distribution", `Build channel partner relationships with organizations that distribute or resell ${title} products.`),
  ],

  techinfra: (title, idx) => [
    useCase("Infrastructure Modernization", `Target ${title} users evaluating network upgrades and infrastructure modernization initiatives.`),
    useCase("Managed Network Services", `Market outsourced network management, monitoring, and NOC services to organizations using ${title}.`),
    useCase("Security Overlay", `Promote network security, SD-WAN, and zero-trust architecture solutions to ${title} environments.`),
    useCase("Cloud Connectivity", `Target ${title} customers with cloud interconnect, hybrid networking, and multi-cloud management solutions.`),
    useCase("Collaboration Platforms", `Market unified communications and collaboration tools that integrate with ${title} infrastructure.`),
    useCase("Compliance & Audit", `Promote network compliance monitoring, access logging, and audit reporting tools for ${title} environments.`),
  ],

  b2c: (title, idx) => {
    const all = [
      useCase("Customer Acquisition", `Acquire new customers for ${title} products and services using lookalike modeling and demographic targeting.`),
      useCase("Retention & Loyalty", `Re-engage lapsed ${title} customers with personalized win-back offers and loyalty program promotions.`),
      useCase("Cross-Sell Campaigns", `Expand wallet share among existing ${title} customers by promoting complementary products and premium upgrades.`),
      useCase("Seasonal Promotions", `Time promotional campaigns to seasonal buying patterns and life events relevant to ${title} consumers.`),
      useCase("Direct Mail Programs", `Execute targeted direct mail campaigns using verified residential addresses with response-rate optimization.`),
      useCase("Digital Retargeting", `Upload ${title} consumer segments to Facebook, Google, and programmatic platforms for coordinated digital campaigns.`),
      useCase("Survey & Research", `Recruit ${title} consumer panels for market research, product testing, and brand perception studies.`),
      useCase("Local Market Activation", `Target ${title} consumers within specific DMAs, zip codes, and neighborhoods for localized promotions.`),
    ];
    const start = (idx * 6) % all.length;
    return all.slice(start, start + 6).concat(all.slice(0, Math.max(0, start + 6 - all.length)));
  },

  general: (title, idx) => [
    useCase("Lead Generation", `Generate qualified leads from ${title} decision-makers using targeted multi-channel outreach campaigns.`),
    useCase("Account-Based Marketing", `Target high-value ${title} accounts with personalized content sequences across email, mail, and phone.`),
    useCase("Event Marketing", `Fill webinar and conference seats by targeting ${title} professionals by role, company size, and geography.`),
    useCase("Product Launch", `Announce new products to ${title} buyers with timed multi-touch campaigns across digital and traditional channels.`),
    useCase("Competitive Intelligence", `Identify ${title} organizations using competitor solutions for competitive displacement campaigns.`),
    useCase("Market Research", `Recruit ${title} professionals for surveys, interviews, and market intelligence initiatives.`),
  ],
};

/* ── Section header templates ──────────────────────────── */
const SECTION_HEADERS = {
  healthcare: [
    { attrKicker: "Data Fields", attrTitle: "Precision-targeted provider data", attrAccent: "for every campaign channel." },
    { attrKicker: "Record Details", attrTitle: "Complete contact records", attrAccent: "built for healthcare marketers." },
    { attrKicker: "What's Inside", attrTitle: "Clinical-grade contact data", attrAccent: "verified at the source." },
  ],
  industry: [
    { attrKicker: "Data Capabilities", attrTitle: "Enterprise-grade business data", attrAccent: "for B2B campaigns." },
    { attrKicker: "Contact Intelligence", attrTitle: "Decision-maker profiles", attrAccent: "enriched for targeting." },
    { attrKicker: "Data Fields", attrTitle: "Comprehensive firmographic data", attrAccent: "for account-based marketing." },
  ],
  crm: [
    { attrKicker: "Technographic Data", attrTitle: "Installed-base intelligence", attrAccent: "for CRM markets." },
    { attrKicker: "Account Insights", attrTitle: "Technology buyer profiles", attrAccent: "verified monthly." },
  ],
  erp: [
    { attrKicker: "ERP Intelligence", attrTitle: "Enterprise software data", attrAccent: "for platform targeting." },
    { attrKicker: "Technographic Fields", attrTitle: "Detailed ERP installation data", attrAccent: "for competitive campaigns." },
  ],
  dbms: [{ attrKicker: "Database Intelligence", attrTitle: "Infrastructure data", attrAccent: "for database markets." }],
  os: [{ attrKicker: "Platform Data", attrTitle: "Operating system intelligence", attrAccent: "for IT campaigns." }],
  software: [
    { attrKicker: "Software Intelligence", attrTitle: "Application installation data", attrAccent: "for technology sales." },
    { attrKicker: "Technographic Fields", attrTitle: "Software stack insights", attrAccent: "verified from multiple sources." },
  ],
  biztech: [{ attrKicker: "Technology Data", attrTitle: "Business technology profiles", attrAccent: "for targeted outreach." }],
  techinfra: [{ attrKicker: "Infrastructure Data", attrTitle: "Network and platform data", attrAccent: "for IT infrastructure sales." }],
  b2c: [
    { attrKicker: "Consumer Fields", attrTitle: "Demographic-rich consumer data", attrAccent: "for DTC campaigns." },
    { attrKicker: "Audience Data", attrTitle: "Consumer lifestyle profiles", attrAccent: "for targeted marketing." },
  ],
  general: [{ attrKicker: "Data Points", attrTitle: "Complete contact records", attrAccent: "for multi-channel campaigns." }],
};

const UC_SECTION_HEADERS = {
  healthcare: [
    { ucKicker: "Campaign Applications", ucTitle: "Reach healthcare providers with", ucAccent: "precision-targeted campaigns." },
    { ucKicker: "Marketing Use Cases", ucTitle: "Campaigns designed for", ucAccent: "healthcare marketers." },
    { ucKicker: "Outreach Scenarios", ucTitle: "Proven applications for", ucAccent: "medical marketing teams." },
  ],
  industry: [
    { ucKicker: "B2B Applications", ucTitle: "Drive pipeline with", ucAccent: "industry-focused outreach." },
    { ucKicker: "Campaign Scenarios", ucTitle: "Go-to-market campaigns for", ucAccent: "enterprise sales teams." },
    { ucKicker: "Marketing Plays", ucTitle: "Proven outreach strategies for", ucAccent: "industry verticals." },
  ],
  crm: [{ ucKicker: "Sales Plays", ucTitle: "Win CRM market share with", ucAccent: "installed-base targeting." }],
  erp: [{ ucKicker: "Go-To-Market", ucTitle: "Target ERP buyers with", ucAccent: "precision outreach." }],
  dbms: [{ ucKicker: "Sales Motions", ucTitle: "Reach database teams with", ucAccent: "relevant campaigns." }],
  os: [{ ucKicker: "IT Campaigns", ucTitle: "Engage OS customers with", ucAccent: "platform-specific outreach." }],
  software: [{ ucKicker: "Sales Campaigns", ucTitle: "Target software users with", ucAccent: "competitive messaging." }],
  biztech: [{ ucKicker: "Technology Campaigns", ucTitle: "Engage technology buyers with", ucAccent: "targeted outreach." }],
  techinfra: [{ ucKicker: "Infrastructure Sales", ucTitle: "Reach IT teams with", ucAccent: "infrastructure-focused campaigns." }],
  b2c: [
    { ucKicker: "Consumer Campaigns", ucTitle: "Engage consumers with", ucAccent: "data-driven marketing." },
    { ucKicker: "DTC Applications", ucTitle: "Drive response with", ucAccent: "targeted consumer outreach." },
  ],
  general: [{ ucKicker: "Campaign Applications", ucTitle: "Activate outreach with", ucAccent: "multi-channel campaigns." }],
};

/* ── Intro templates ─────────────────────────────────── */
function generateIntro(title, category, idx) {
  const intros = {
    healthcare: [
      { kicker: "Provider Intelligence", headlinePlain: "Verified provider data that", headlineAccent: "powers healthcare campaigns.", p1: `Healthcare marketers targeting ${title} need more than a name and email. They need NPI-verified credentials, specialty codes, facility affiliations, and prescribing context to build campaigns that reach the right provider at the right moment.`, p2: `Lorann's ${title} delivers exactly that — a continuously verified, multi-source dataset built from licensing boards, credentialing databases, and professional registries. The result is provider-level precision that generic contact databases simply cannot match.` },
      { kicker: "Clinical Targeting", headlinePlain: "Specialty-level precision for", headlineAccent: "healthcare outreach.", p1: `Marketing to ${title} contacts requires understanding clinical workflows, specialty nuances, and facility dynamics. A hospital-employed specialist responds to different value propositions than an independent practitioner.`, p2: `Lorann's dataset captures these distinctions with NPI-anchored records enriched by practice setting, board certification, and referral network data — enabling the segment-specific messaging that drives healthcare marketing ROI.` },
      { kicker: "Healthcare Data", headlinePlain: "Multi-source provider data for", headlineAccent: "precision marketing.", p1: `The ${title} market demands data accuracy that most providers cannot deliver. Lorann builds every record from authoritative sources — state licensing boards, the NPI registry, hospital credentialing files — and refreshes quarterly.`, p2: `This sourcing rigor means your campaigns reach active, credentialed professionals at their current practice locations. No stale records, no retired providers, no misclassified specialties.` },
    ],
    industry: [
      { kicker: "Industry Data", headlinePlain: "Decision-maker contacts for", headlineAccent: "targeted B2B outreach.", p1: `Selling into the ${title} vertical requires firmographic context that most B2B databases lack. Company size, revenue range, procurement structure, and budget cycle timing all influence campaign effectiveness.`, p2: `Lorann's ${title} provides verified decision-maker contacts enriched with company intelligence — so your outbound campaigns reach the right buyer with the right message at the right time in their purchasing cycle.` },
      { kicker: "Market Intelligence", headlinePlain: "Enterprise data that", headlineAccent: "drives vertical sales.", p1: `The ${title} landscape spans organizations from mid-market operators to multinational enterprises. Each segment responds to different value propositions, pricing models, and competitive comparisons.`, p2: `Lorann's dataset segments ${title} contacts by company size, revenue band, job function, and geographic territory — enabling the account-level targeting precision that enterprise sales teams require.` },
    ],
    crm: [
      { kicker: "CRM Intelligence", headlinePlain: "Installed-base data for", headlineAccent: "CRM market targeting.", p1: `Selling to ${title} customers requires knowing who uses the platform, what edition they run, and when their contract comes up for renewal. Lorann's technographic dataset provides exactly these signals.`, p2: `Every record is enriched with company firmographics, technology buyer contact details, and adjacent technology stack context — giving your sales team the competitive intelligence to craft displacement messaging that converts.` },
    ],
    erp: [
      { kicker: "ERP Market Data", headlinePlain: "Enterprise platform data for", headlineAccent: "ERP sales teams.", p1: `The ERP market is driven by contract renewal cycles, module expansion opportunities, and cloud migration decisions. Reaching ${title} customers at the right moment requires technographic data that tracks deployment status and renewal timing.`, p2: `Lorann's ${title} dataset provides verified technology contacts enriched with installation details, module adoption breadth, and ecosystem context — enabling your team to time outreach to buying windows rather than spraying generic campaigns.` },
    ],
    dbms: [
      { kicker: "Database Market Data", headlinePlain: "Technology intelligence for", headlineAccent: "database market targeting.", p1: `Database technology decisions involve DBAs, data engineers, and IT leaders evaluating performance, scalability, and total cost of ownership. Reaching ${title} stakeholders requires technographic precision.`, p2: `Lorann's dataset identifies confirmed ${title} installations with version detail, deployment model, and infrastructure context — enabling database vendors, cloud providers, and tooling companies to target accounts with relevant messaging.` },
    ],
    os: [
      { kicker: "Platform Intelligence", headlinePlain: "OS deployment data for", headlineAccent: "IT infrastructure sales.", p1: `Operating system decisions cascade across an organization's entire technology stack — from endpoint security to application compatibility to cloud strategy. Marketing to ${title} environments requires deployment-level intelligence.`, p2: `Lorann identifies organizations running ${title} with endpoint scale estimates, version detail, and IT leadership contact data — enabling security vendors, management tool providers, and migration service firms to target the right accounts.` },
    ],
    software: [
      { kicker: "Software Market Data", headlinePlain: "Application intelligence for", headlineAccent: "technology sales teams.", p1: `Software markets are defined by installed bases, switching costs, and integration dependencies. Reaching ${title} customers requires knowing what they run, how deeply it's adopted, and what else is in their stack.`, p2: `Lorann's ${title} dataset provides verified technology contacts with installation confirmation, user-count estimates, and ecosystem context — enabling competitive displacement campaigns backed by real technographic intelligence.` },
    ],
    biztech: [
      { kicker: "Technology Intelligence", headlinePlain: "Business technology data for", headlineAccent: "targeted sales outreach.", p1: `Technology purchasing decisions in the ${title} space involve multiple stakeholders across IT, operations, and executive leadership. Reaching the right buyer requires firmographic and technographic context.`, p2: `Lorann's dataset combines technology installation detection with verified buyer contact data and company intelligence — enabling your sales team to build multi-threaded account engagement strategies.` },
    ],
    techinfra: [
      { kicker: "Infrastructure Data", headlinePlain: "Network technology data for", headlineAccent: "infrastructure sales.", p1: `Infrastructure technology sales depend on understanding an organization's current architecture, scale, and strategic direction. Marketing ${title} solutions requires data that goes beyond simple contact lists.`, p2: `Lorann provides verified IT infrastructure contacts enriched with deployment topology, technology adjacencies, and organizational intelligence — giving your team the context to position solutions against real infrastructure needs.` },
    ],
    b2c: [
      { kicker: "Consumer Intelligence", headlinePlain: "Demographic-rich consumer data for", headlineAccent: "DTC marketing.", p1: `Consumer marketing in the ${title} space requires understanding household composition, lifestyle preferences, and purchase behavior patterns. Generic email lists cannot deliver the targeting precision that DTC campaigns demand.`, p2: `Lorann's ${title} consumer dataset combines verified contact information with demographic enrichment, behavioral signals, and propensity modeling — enabling the kind of personalized, response-driven campaigns that build customer lifetime value.` },
      { kicker: "Audience Data", headlinePlain: "Consumer profiles that", headlineAccent: "power acquisition campaigns.", p1: `The ${title} market responds to precision-targeted messaging that speaks to specific life stages, interests, and purchasing triggers. Broad-reach campaigns waste budget on unqualified audiences.`, p2: `Lorann's consumer data segments ${title} audiences by demographics, geography, purchase history, and lifestyle indicators — so every dollar of marketing spend reaches consumers with genuine affinity for your products.` },
    ],
    general: [
      { kicker: "Market Intelligence", headlinePlain: "Verified contact data for", headlineAccent: "targeted outreach.", p1: `Effective ${title} campaigns require data that goes beyond basic contact information. Decision-maker roles, company context, and channel permissions all influence campaign performance.`, p2: `Lorann's ${title} dataset delivers verified contacts enriched with firmographic data, role classification, and compliance documentation — enabling multi-channel campaigns that reach qualified prospects.` },
    ],
  };

  const pool = intros[category] || intros.general;
  const entry = pool[idx % pool.length];
  return {
    introKicker: entry.kicker,
    introHeadlinePlain: entry.headlinePlain,
    introHeadlineAccent: entry.headlineAccent,
    introParagraphs: [entry.p1, entry.p2].map((text) => ({
      _key: k(), _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text }],
      markDefs: [], style: "normal",
    })),
  };
}

/* ── Prose section generator ─────────────────────────── */
function generateProseSections(title, category, idx) {
  const qualityLabels = {
    healthcare: ["NPI-First Matching", "Specialty Tagging", "Quarterly Refresh"],
    industry: ["Registry Sourcing", "Title Normalization", "Monthly Verification"],
    crm: ["Technographic Scanning", "Contact Enrichment", "Signal Monitoring"],
    erp: ["Installation Detection", "Version Tracking", "Renewal Timing"],
    dbms: ["Platform Detection", "DBA Identification", "Stack Mapping"],
    os: ["Deployment Scanning", "Endpoint Sizing", "Version Tracking"],
    software: ["Web Scanning", "Job Board Mining", "Partner Signals"],
    biztech: ["Technology Profiling", "Buyer Matching", "Market Signals"],
    techinfra: ["Network Discovery", "Topology Mapping", "Vendor Identification"],
    b2c: ["Permission Verification", "Demographic Enrichment", "Behavioral Scoring"],
    general: ["Multi-Source Verification", "Contact Enrichment", "Quality Scoring"],
  };

  const labels = qualityLabels[category] || qualityLabels.general;

  return [
    proseSection("split", "Data Quality", "How we build the", `${title}.`, [
      `Our ${title} is sourced from authoritative registries, verified through multiple independent data streams, and refreshed on a regular cadence to maintain accuracy above 95%.`,
      `Each record undergoes multi-point validation before entering the dataset — and continuous monitoring after — ensuring that your campaigns always target current, reachable contacts.`,
    ], [
      { label: labels[0], text: `Primary data sourcing methodology ensures that every ${title} record is anchored to authoritative, verifiable sources rather than self-reported directories.` },
      { label: labels[1], text: `Records are enriched with classification data that enables precise audience segmentation beyond basic contact information.` },
      { label: labels[2], text: `Continuous monitoring and scheduled refresh cycles keep the ${title} dataset current, suppressing outdated records before they impact campaign performance.` },
    ]),
    proseSection("centered", "Who Benefits", "Ideal use cases for the", `${title}.`, [
      `The ${title} serves marketers, sales development teams, and growth operators who need verified contact data to power multi-channel outreach campaigns.`,
      `Whether you're launching a new product, displacing a competitor, or expanding into a new market segment, the targeting precision in this dataset accelerates your pipeline.`,
    ], [
      { label: "Sales Teams", text: `Build targeted prospect lists with verified contact data that aligns to your ideal customer profile and territory assignments.` },
      { label: "Marketing Teams", text: `Execute segmented campaigns across email, direct mail, and digital channels with compliance-ready contact records.` },
      { label: "Growth Teams", text: `Power account-based strategies with firmographic enrichment, technographic signals, and multi-threaded contact coverage.` },
      { label: "Channel Partners", text: `Identify and recruit distribution partners, resellers, and alliance opportunities within your target market segments.` },
    ]),
  ];
}

/* ── Feature grid section generator ──────────────────── */
function generateFeatureGridSections(title, category, idx) {
  const icons = ICON_POOLS[category] || ICON_POOLS.general;
  return [
    gridSection("Key Capabilities", "What makes the", `${title} different.`,
      `Lorann's ${title} is built on verified, multi-source data with segmentation depth that generic contact databases cannot match.`, 3, "card", [
      feat(icons[0], "Verified Records", `Every contact in the ${title} is validated against authoritative sources, confirming identity, role, and contact accuracy.`),
      feat(icons[1], "Deep Segmentation", `Filter by multiple dimensions — role, geography, company size, and specialty attributes — for precise audience building.`),
      feat(icons[2], "Multi-Channel Ready", `Each record includes email, phone, and mailing address fields enabling coordinated outreach across every campaign channel.`),
      feat(icons[3], "Compliance Built In", `CAN-SPAM, CCPA, and TCPA compliance flags are attached to every record with documented opt-in provenance.`),
      feat(icons[4], "Regular Refresh", `Data is refreshed on a scheduled cadence with automated suppression of undeliverable, retired, or relocated contacts.`),
      feat(icons[5], "CRM Integration", `Export to CSV/Excel or integrate directly with Salesforce, HubSpot, Marketo, and other major platforms.`),
    ]),
    gridSection("Record-Level Data", "Every record in the", `${title} includes.`,
      `Comprehensive data fields enable deep segmentation, multi-channel activation, and campaign performance optimization.`, 4, "check", [
      feat("Mail", "Email Address", `Verified email with deliverability scoring and bounce monitoring.`),
      feat("Phone", "Phone Number", `Direct-dial with line-type classification and compliance flags.`),
      feat("MapPin", "Mailing Address", `Full address with ZIP+4, NCOA processing, and geocoding.`),
      feat("Building2", "Organization Data", `Company name, size, industry, and revenue indicators.`),
      feat("Briefcase", "Contact Role", `Job title with functional role normalization.`),
      feat("Hash", "Unique Identifiers", `Record IDs for deduplication and CRM matching.`),
      feat("Calendar", "Verification Date", `Most recent verification timestamp per record.`),
      feat("Shield", "Permission Flags", `Multi-channel compliance indicators per contact.`),
    ]),
    gridSection("Activation Channels", "Deploy campaigns via", `every marketing channel.`,
      `A single dataset powers coordinated campaigns across email, direct mail, phone, and digital advertising platforms.`, 3, "numbered", [
      feat("Mail", "Email Marketing", `Launch segmented email campaigns with verified addresses and deliverability optimization.`),
      feat("FileText", "Direct Mail", `Execute targeted direct mail programs using CASS-certified, NCOA-processed addresses.`),
      feat("Phone", "Phone Outreach", `Run compliant outbound calling campaigns using verified numbers with TCPA indicators.`),
    ]),
  ];
}

/* ── FAQ generator ───────────────────────────────────── */
function generateFaqItems(title, category) {
  return [
    faqItem(`How many records are available in the ${title}?`, `Record counts vary by your targeting criteria including geography, role, company size, and specialty filters. Lorann provides complimentary count estimates based on your specific campaign requirements. Contact our data team for a custom count.`),
    faqItem(`How is the ${title} data verified?`, `Records are verified against multiple authoritative sources including government registries, corporate directories, and professional databases. Verification is performed on a scheduled cadence with continuous monitoring for bounced emails and returned mail.`),
    faqItem(`What format is the ${title} delivered in?`, `Data is delivered as a CSV or Excel file with all fields mapped and labeled. We also support direct CRM imports for Salesforce, HubSpot, Marketo, and other major marketing platforms.`),
    faqItem(`Can I filter the ${title} by geography?`, `Yes. You can segment by state, metro area, ZIP code, county, or custom radius from any location. Territory-aligned selections are available for field sales team alignment.`),
    faqItem(`Is the ${title} compliant with email marketing laws?`, `All email addresses carry opt-in documentation and CAN-SPAM compliance flags. Phone records include TCPA consent indicators. The dataset is sourced and maintained in compliance with CCPA, CAN-SPAM, and TCPA requirements.`),
    faqItem(`Can I use the ${title} for both email and direct mail?`, `Absolutely. Every record includes verified email, mailing address, and phone fields — enabling true multi-channel campaign activation from a single unified dataset.`),
    faqItem(`Do you offer sample records before purchasing?`, `Yes. We provide complimentary count estimates and sample records so you can evaluate data quality, field coverage, and match rates before committing to a full license agreement.`),
  ];
}

/* ══════════════════════════════════════════════════════════
   MAIN EXECUTION
   ══════════════════════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN — no writes" : "LIVE RUN — updating Sanity");

  // Fetch all leaf pages
  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current } | order(slug.current)'
  );

  console.log(`Found ${pages.length} leaf pages to update\n`);

  // Track per-category index for rotating templates
  const categoryCounters = {};

  for (const page of pages) {
    const { _id, h1, slug } = page;
    const title = h1;
    const category = getCategory(slug);
    const idx = categoryCounters[category] = (categoryCounters[category] || 0) + 1;

    console.log(`[${idx}] ${slug} (${category})`);

    // Check if we have hand-crafted content for this page
    const custom = PAGE_CONTENT[slug];

    let patch;
    if (custom) {
      // Use hand-crafted content
      const introData = custom.intro ? {
        introKicker: custom.intro.kicker,
        introHeadlinePlain: custom.intro.headlinePlain,
        introHeadlineAccent: custom.intro.headlineAccent,
        introParagraphs: custom.intro.paragraphs.map((text) => ({
          _key: k(), _type: "block",
          children: [{ _key: k(), _type: "span", marks: [], text }],
          markDefs: [], style: "normal",
        })),
      } : {};

      patch = {
        attributesSectionKicker: custom.attributesSection?.kicker,
        attributesSectionTitle: custom.attributesSection?.titlePlain,
        attributesSectionAccent: custom.attributesSection?.titleAccent,
        attributes: custom.attributes,
        useCasesSectionKicker: custom.useCasesSection?.kicker,
        useCasesSectionTitle: custom.useCasesSection?.titlePlain,
        useCasesSectionAccent: custom.useCasesSection?.titleAccent,
        useCases: custom.useCases,
        ...introData,
        proseSections: custom.proseSections,
        featureGridSections: custom.featureGridSections,
        faqItems: custom.faqItems,
        complianceHeadline: custom.complianceHeadline,
        complianceBody: block(custom.complianceBody),
      };
    } else {
      // Generate from templates with per-page variation
      const sHeaders = SECTION_HEADERS[category] || SECTION_HEADERS.general;
      const ucHeaders = UC_SECTION_HEADERS[category] || UC_SECTION_HEADERS.general;
      const sh = sHeaders[idx % sHeaders.length];
      const uh = ucHeaders[idx % ucHeaders.length];

      const attrFn = ATTR_TEMPLATES[category] || ATTR_TEMPLATES.general;
      const ucFn = UC_TEMPLATES[category] || UC_TEMPLATES.general;

      const attrs = typeof attrFn === "function" ? attrFn(title, idx) : attrFn;
      const ucs = typeof ucFn === "function" ? ucFn(title, idx) : ucFn;

      const intro = generateIntro(title, category, idx);
      const prose = generateProseSections(title, category, idx);
      const grids = generateFeatureGridSections(title, category, idx);
      const faqs = generateFaqItems(title, category);

      const complianceTexts = [
        `Every ${title} record carries verification documentation, opt-in provenance, and channel-permission flags. We maintain governance under CAN-SPAM, CCPA, and TCPA frameworks with audit-ready documentation for every campaign.`,
        `Compliance is embedded in every ${title} record — from sourcing provenance to channel permissions. Our data governance framework ensures CAN-SPAM, CCPA, and TCPA adherence with complete audit trails.`,
        `The ${title} is built with compliance at its foundation. Every record includes permission flags, opt-in documentation, and regulatory compliance indicators across CAN-SPAM, CCPA, and TCPA requirements.`,
      ];

      const complianceHeadlines = [
        `${title} with compliance built in.`,
        `Data governance you can trust.`,
        `Compliance-ready from record to campaign.`,
      ];

      patch = {
        attributesSectionKicker: sh.attrKicker,
        attributesSectionTitle: sh.attrTitle,
        attributesSectionAccent: sh.attrAccent,
        attributes: attrs,
        useCasesSectionKicker: uh.ucKicker,
        useCasesSectionTitle: uh.ucTitle,
        useCasesSectionAccent: uh.ucAccent,
        useCases: ucs,
        ...intro,
        proseSections: prose,
        featureGridSections: grids,
        faqItems: faqs,
        complianceHeadline: complianceHeadlines[idx % complianceHeadlines.length],
        complianceBody: block(complianceTexts[idx % complianceTexts.length]),
      };
    }

    if (!DRY_RUN) {
      // Update published document
      await client.patch(_id).set(patch).commit();
      // Also update draft if it exists
      const draftId = `drafts.${_id}`;
      try {
        const draft = await client.getDocument(draftId);
        if (draft) {
          await client.patch(draftId).set(patch).commit();
        }
      } catch { /* no draft, that's fine */ }
      console.log(`  ✓ Updated`);
    } else {
      console.log(`  → Would update: ${Object.keys(patch).length} fields`);
    }
  }

  console.log(`\nDone! Updated ${pages.length} pages.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
