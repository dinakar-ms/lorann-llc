/**
 * Fix duplicate content across all B2B/B2C leaf pages
 * Each category group gets unique features, attributes, FAQs, prose, compliance
 * and different visual layout (columns, styles, icons)
 *
 * Usage: node scripts/fix-duplicate-content.mjs
 */

import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token:
    "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);

function block(text) {
  return [
    {
      _key: k(),
      _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text }],
      markDefs: [],
      style: "normal",
    },
  ];
}

function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}

function faqItem(question, answer) {
  return { _key: k(), _type: "faqItem", question, answer: block(answer) };
}

function gridSection(kicker, titlePlain, titleAccent, description, columns, style, features) {
  return {
    _key: k(),
    _type: "featureGridSection",
    kicker,
    titlePlain,
    titleAccent,
    description: block(description),
    columns,
    style,
    features,
  };
}

function proseSection(style, kicker, titlePlain, titleAccent, paragraphs, highlights) {
  return {
    _key: k(),
    _type: "proseSection",
    style,
    kicker,
    titlePlain,
    titleAccent,
    paragraphs: paragraphs.map((p) => ({
      _key: k(),
      _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text: p }],
      markDefs: [],
      style: "normal",
    })),
    highlights: highlights.map((h) => ({
      _key: k(),
      label: h.label,
      text: block(h.text),
    })),
  };
}

// ── Category detection ──────────────────────────────────────
function getCategory(slug) {
  if (slug.includes("/healthcare/")) return "healthcare";
  if (slug.includes("/crm-users-mailing-data/")) return "crm";
  if (slug.includes("/erp-users-email-lists/")) return "erp";
  if (slug.includes("/software-email-lists/")) return "software";
  if (slug.includes("/dbms-users-email-data/")) return "dbms";
  if (slug.includes("/operating-system-users-list/")) return "os";
  if (slug.includes("/business-technology-email-lists/")) return "biztech";
  if (slug.includes("/other-industry/")) return "industry";
  if (slug.includes("/b2c-database/")) return "b2c";
  // Technology hub-level leafs
  if (slug.includes("/technology/groupware")) return "biztech";
  if (slug.includes("/technology/network")) return "biztech";
  return "industry"; // fallback
}

// ── Content templates by category ──────────────────────────

const TEMPLATES = {
  healthcare: {
    featuresSection: (name) =>
      gridSection(
        "Key Capabilities",
        `What makes the`,
        `${name} different.`,
        `Lorann's ${name} is built on NPI-verified provider data with specialty-level segmentation — not a generic scrape of contact directories.`,
        3,
        "card",
        [
          feat("Stethoscope", "NPI-Verified Provider Records", `Every healthcare professional in our ${name} is matched against the CMS National Provider Identifier registry, ensuring you reach real, licensed practitioners.`),
          feat("ShieldCheck", "Multi-Step Verification Pipeline", `Records pass through email deliverability testing, phone line-type validation, and NCOA postal processing before entering the ${name}.`),
          feat("Filter", "Specialty & Taxonomy Targeting", `Segment by primary and secondary specialty, taxonomy code, and board certification status to reach the exact clinical audience your campaign requires.`),
          feat("Building2", "Facility & System Linkage", `Each record carries hospital affiliation, health system membership, practice group, and facility type — enabling account-level healthcare targeting.`),
          feat("RefreshCw", "Quarterly Refresh Cycle", `The ${name} is reverified every quarter with continuous bounce monitoring between cycles to maintain 95%+ deliverability.`),
          feat("Layers", "Multi-Channel Ready", `Every record includes verified email, direct phone, and CASS-certified postal address for integrated outreach across all marketing channels.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Record-Level Data",
        `Data fields in`,
        `every ${name} record.`,
        `Each provider record comes enriched with clinical, institutional, and contact data — ready for CRM import and campaign segmentation.`,
        4,
        "card",
        [
          feat("User", "Provider Name & Credentials", `Full name, professional suffix (MD, DO, DDS, etc.), and credential designations standardized for personalized outreach.`),
          feat("Mail", "Verified Email Address", `Business email validated through MX lookup, syntax verification, and inbox deliverability scoring for 95%+ placement rates.`),
          feat("Phone", "Direct Phone & Mobile", `Direct-dial, office, and mobile numbers with line-type classification and DNC registry status indicators.`),
          feat("MapPin", "Practice Postal Address", `CASS-certified, NCOA-processed addresses with ZIP+4, county, metro area, and congressional district identifiers.`),
          feat("Stethoscope", "NPI & Specialty Codes", `National Provider Identifier, primary/secondary specialty, and NUCC taxonomy classification for precise clinical segmentation.`),
          feat("Building", "Hospital & Facility Data", `Affiliated hospital, health system, practice group name, facility type, and bed count for institutional-level targeting.`),
          feat("Activity", "Clinical Focus Indicators", `Therapeutic area focus, procedure volume indicators, and prescribing tier classification for pharma and device campaigns.`),
          feat("Briefcase", "Practice Setting Type", `Solo, group, hospital-employed, academic, federally-qualified, or government setting — classified for each provider.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Regulatory Framework",
        `Compliance standards for the`,
        `${name}.`,
        `Healthcare data demands the highest compliance standards. Every record in our ${name} is processed within these governance frameworks.`,
        3,
        "check",
        [
          feat("ShieldCheck", "CAN-SPAM Compliant", `All email records include opt-out processing, suppression list management, and commercial messaging compliance per the CAN-SPAM Act.`),
          feat("Lock", "CCPA & State Privacy", `Consumer privacy requests are honored across all state-level frameworks, with documented data subject access and deletion processes.`),
          feat("PhoneOff", "TCPA Adherence", `Phone records are scrubbed against the National DNC Registry and include TCPA consent indicators for compliant telemarketing outreach.`),
          feat("HeartPulse", "HIPAA-Conscious Sourcing", `Provider data is sourced exclusively from publicly available registries, professional directories, and opt-in channels — never from protected health information.`),
          feat("Clock", "Data Retention Controls", `Licensing terms include defined retention periods with verified destruction processes for expired or consent-withdrawn records.`),
          feat("FileCheck", "Audit Documentation", `Sourcing methodology, permission basis, processing chain-of-custody, and compliance certificates available for regulatory audit requirements.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "The Lorann Advantage",
        "Why marketers choose the",
        `${name}.`,
        [
          `Healthcare marketing requires verified, specialty-segmented provider data that meets stringent compliance requirements. Generic contact databases fall short because they lack NPI validation, specialty taxonomy, and the institutional linkage needed for precision HCP campaigns.`,
          `Lorann's ${name} is built from authoritative healthcare data sources — professional registries, licensing boards, and credentialing databases — then enriched with multi-channel contact data and practice-level attributes.`,
          `The result is a campaign-ready provider database that lets your team target by specialty, geography, facility type, and clinical focus without additional enrichment steps.`,
        ],
        [
          { label: "NPI VALIDATION", text: `Every provider is matched against the CMS NPI Registry — no unverified records enter the ${name}.` },
          { label: "SPECIALTY DEPTH", text: `Coverage spans 200+ medical specialties and sub-specialties for granular clinical audience targeting.` },
          { label: "LICENSING FLEXIBILITY", text: `License for postal, email, and telemarketing channels with terms designed for healthcare marketing compliance.` },
          { label: "CAMPAIGN SUPPORT", text: `Our team provides count estimates, segmentation guidance, and compliance documentation for every order.` },
        ]
      ),
      proseSection(
        "centered",
        "Who Benefits",
        "Teams that rely on the",
        `${name}.`,
        [
          `Pharmaceutical marketers use the ${name} to reach prescribers by therapeutic area and prescribing volume. Medical device companies target surgeons and proceduralists by specialty and facility type.`,
          `Healthcare staffing firms prospect licensed professionals by credential, location, and practice setting. Health IT vendors identify decision-makers at hospitals and health systems.`,
          `Whether you're running an awareness campaign, appointment-setting program, or account-based initiative, the ${name} provides the verified provider data your team needs.`,
        ],
        [
          { label: "PHARMA & BIOTECH", text: "Reach prescribers segmented by therapeutic area, formulary influence, and prescribing tier." },
          { label: "MEDICAL DEVICES", text: "Target proceduralists and facility-level buyers by specialty, procedure volume, and institutional affiliation." },
          { label: "HEALTH IT", text: "Identify IT decision-makers at hospitals, clinics, and health systems by facility size and technology stack." },
          { label: "STAFFING & RECRUITING", text: "Prospect licensed healthcare professionals by credential type, specialty, and geographic availability." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How many records are available in the ${name}?`, `Record counts vary by specialty, geography, and targeting criteria. Lorann provides complimentary count estimates based on your specific campaign requirements — including specialty, location, facility type, and credential filters. Contact our data team for a custom count.`),
      faqItem(`How often is the ${name} updated?`, `The ${name} is refreshed quarterly with full re-verification of email deliverability, phone accuracy, NPI status, and practice details. Between quarterly refreshes, continuous monitoring removes bounces and updates credential changes as they occur.`),
      faqItem(`What format is the data delivered in?`, `Data is delivered in your preferred format — CSV, Excel, or direct CRM integration. All records are standardized, deduplicated, and formatted for clean import into Salesforce, HubSpot, Marketo, or any marketing automation platform.`),
      faqItem(`Can I get a sample before licensing?`, `Yes. We provide complimentary data samples so you can evaluate record quality, field coverage, and deliverability before committing to a full license. Contact our team to request a sample matched to your targeting criteria.`),
      faqItem(`Are the healthcare providers NPI-verified?`, `Every provider in the ${name} is validated against the CMS National Provider Identifier Registry. Records include NPI number, primary and secondary specialty codes, and taxonomy classification.`),
      faqItem(`What compliance frameworks does the data support?`, `The ${name} is processed under CAN-SPAM, CCPA, TCPA, and HIPAA-conscious sourcing frameworks. All records include opt-out suppression, DNC scrubbing, and channel-permission flags. Compliance documentation is available for audit requirements.`),
      faqItem(`Can I target by specialty and geography?`, `Yes. The ${name} supports multi-dimensional filtering by medical specialty, sub-specialty, state, metro area, ZIP code, hospital affiliation, practice setting, and credential type. Our team can help build custom segments for complex targeting scenarios.`),
    ],
    complianceHeadline: "Healthcare data compliance is non-negotiable.",
    complianceBody: "Every record carries NPI verification, opt-in documentation, and channel-permission flags. We maintain governance under CAN-SPAM, CCPA, TCPA, and HIPAA-conscious sourcing frameworks — with audit-ready documentation for every campaign.",
  },

  crm: {
    featuresSection: (name) =>
      gridSection(
        "Platform Intelligence",
        `What's inside the`,
        `${name}.`,
        `Lorann's ${name} identifies companies actively using specific CRM platforms — enabling vendors, integrators, and consultants to target by technology stack.`,
        3,
        "card",
        [
          feat("Monitor", "Verified Install Base", `Every company in the ${name} has a confirmed CRM installation detected through technographic scanning, vendor partnerships, and public integration data.`),
          feat("Users", "Decision-Maker Contacts", `Records include IT directors, CRM administrators, sales operations leaders, and C-suite executives who influence technology purchasing decisions.`),
          feat("BarChart3", "Company Firmographics", `Each record is enriched with revenue range, employee count, industry vertical, and headquarters location for account-level qualification.`),
          feat("GitBranch", "Technology Stack Context", `Beyond CRM, records indicate complementary technologies — marketing automation, ERP, analytics platforms — for cross-sell and integration targeting.`),
          feat("RefreshCw", "Monthly Refresh Cycle", `The ${name} is updated monthly with new install detections, deinstallation removals, and contact verification to maintain data currency.`),
          feat("Target", "Intent & Engagement Signals", `Behavioral indicators including vendor comparison activity, contract renewal timing, and technology evaluation signals for pipeline prioritization.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Contact & Account Fields",
        `Data points in`,
        `every ${name} record.`,
        `Each record combines verified contact data with technographic and firmographic attributes for qualified technology prospect outreach.`,
        4,
        "card",
        [
          feat("User", "Contact Name & Title", `Full name, job title, and functional role — standardized for personalized outreach to technology decision-makers.`),
          feat("Mail", "Business Email", `Corporate email address validated through domain verification, MX lookup, and deliverability scoring for high inbox placement.`),
          feat("Phone", "Direct Dial & Office", `Direct phone numbers with line-type validation and DNC status for compliant outbound calling campaigns.`),
          feat("Building2", "Company Profile", `Company name, headquarters address, industry classification, revenue band, and employee count for account qualification.`),
          feat("Monitor", "CRM Platform Details", `Specific CRM product version, deployment type (cloud vs. on-premise), and estimated seat count for solution-fit targeting.`),
          feat("Layers", "Tech Stack Mapping", `Adjacent technology installations including marketing automation, analytics, ERP, and collaboration tools.`),
          feat("TrendingUp", "Growth & Intent Indicators", `Company growth signals, technology evaluation activity, and contract timing indicators for opportunity scoring.`),
          feat("Globe", "Geographic Coverage", `Full address with metro area, state, and region — plus satellite office and multi-location indicators for enterprise accounts.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Data Standards",
        `Governance behind the`,
        `${name}.`,
        `Technology contact data is sourced ethically and processed within strict compliance frameworks to protect your outreach reputation.`,
        2,
        "check",
        [
          feat("ShieldCheck", "CAN-SPAM & CASL Compliant", `Email records include opt-out processing and suppression management per CAN-SPAM and Canadian anti-spam legislation requirements.`),
          feat("Lock", "CCPA & GDPR Ready", `Privacy request workflows, data subject access procedures, and documented consent basis for all contact records.`),
          feat("PhoneOff", "DNC & TCPA Scrubbed", `All phone records are matched against federal and state Do Not Call registries with TCPA consent classification.`),
          feat("FileCheck", "Transparent Sourcing", `Data sourcing methodology documentation available upon request — including collection channels, verification steps, and processing chain-of-custody.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "Competitive Advantage",
        "How the",
        `${name} drives pipeline.`,
        [
          `Technology vendors, system integrators, and consulting firms need more than job titles to build pipeline — they need to know what platforms their prospects already use. The ${name} provides this technographic intelligence combined with verified decision-maker contacts.`,
          `Instead of cold outreach to generic IT contacts, your team can target specific CRM administrators, operations leaders, and executives at companies confirmed to use particular platforms — opening conversations around migration, integration, and optimization.`,
          `Every record is enriched with firmographic context so your SDRs can qualify accounts before the first touchpoint.`,
        ],
        [
          { label: "INSTALL VERIFICATION", text: "Every technology detection is confirmed through multiple data sources — not inferred from web scraping alone." },
          { label: "DECISION-MAKER ACCESS", text: "Records target IT leaders, operations managers, and C-suite executives who control technology budgets." },
          { label: "STACK INTELLIGENCE", text: "See the full technology ecosystem at each account — identifying integration opportunities and competitive displacement scenarios." },
          { label: "MONTHLY FRESHNESS", text: "New installs, platform switches, and contact changes are captured monthly to keep your targeting current." },
        ]
      ),
      proseSection(
        "centered",
        "Use Cases",
        "Teams that use the",
        `${name}.`,
        [
          `CRM vendors and resellers use this data to identify competitive displacement opportunities and upsell targets within their existing ecosystem. System integrators find companies ready for implementation, migration, or customization projects.`,
          `Marketing automation vendors cross-reference CRM install data to identify integration-ready prospects. Training and certification providers target CRM administrators and power users for professional development programs.`,
          `Whether your play is land-and-expand, competitive displacement, or ecosystem partnership, the ${name} provides the install-base intelligence and decision-maker access to build qualified pipeline.`,
        ],
        [
          { label: "SOFTWARE VENDORS", text: "Identify competitive accounts ripe for migration or complementary platform adoption." },
          { label: "SYSTEM INTEGRATORS", text: "Find companies with new or growing CRM installations needing implementation and customization." },
          { label: "CONSULTANCIES", text: "Target organizations with optimization, training, and digital transformation opportunities." },
          { label: "RESELLERS & PARTNERS", text: "Build channel pipeline with verified install-base intelligence and renewal timing signals." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How do you verify CRM installations in the ${name}?`, `We use a multi-source technographic detection methodology combining web technology scanning, integration marketplace data, job posting analysis, and verified partnership channels. Each installation is confirmed through at least two independent data sources before inclusion.`),
      faqItem(`How current is the technology data?`, `The ${name} is refreshed monthly. New CRM installations are detected, platform switches are tracked, and deinstallations are removed. Contact data is reverified quarterly with continuous bounce monitoring between cycles.`),
      faqItem(`Can I filter by company size and industry?`, `Yes. Every record includes company revenue range, employee count, industry vertical (SIC/NAICS), and headquarters location. You can combine firmographic filters with technology criteria for precise account targeting.`),
      faqItem(`What contact roles are included?`, `The ${name} targets technology decision-makers including CIOs, CTOs, IT Directors, CRM Administrators, Sales Operations Managers, VP of Sales, and Marketing Operations leaders who influence or control CRM purchasing decisions.`),
      faqItem(`Do you include technology stack data beyond CRM?`, `Yes. Records are enriched with complementary technology detections including marketing automation platforms, ERP systems, analytics tools, and collaboration software — enabling cross-sell and integration-based outreach strategies.`),
      faqItem(`What format is the data delivered in?`, `Data is delivered as CSV, Excel, or direct integration to your CRM or marketing automation platform. Records are deduplicated, standardized, and formatted for clean import into Salesforce, HubSpot, Outreach, or similar tools.`),
      faqItem(`Can I request a sample before purchasing?`, `Yes. We provide complimentary data samples matched to your ideal customer profile so you can evaluate record quality, technology accuracy, and contact deliverability before committing to a full license.`),
    ],
    complianceHeadline: "Ethically sourced technology intelligence.",
    complianceBody: "All technographic data is collected from publicly available sources, verified partnerships, and opt-in channels. Contact records carry opt-out suppression, DNC scrubbing, and documented consent basis under CAN-SPAM, CCPA, and GDPR frameworks.",
  },

  erp: {
    featuresSection: (name) =>
      gridSection(
        "ERP Intelligence",
        `Inside the`,
        `${name}.`,
        `Lorann's ${name} maps enterprise resource planning installations to verified decision-maker contacts — giving your sales team install-base intelligence for targeted outreach.`,
        3,
        "numbered",
        [
          feat("Server", "Confirmed ERP Installations", `Each company record includes a verified ERP platform installation detected through technographic analysis, vendor ecosystem data, and integration signals.`),
          feat("Users", "IT & Finance Decision-Makers", `Records target CFOs, CIOs, IT Directors, ERP project managers, and operations leaders who drive enterprise software purchasing and upgrade decisions.`),
          feat("LineChart", "Implementation Stage Signals", `Indicators for deployment maturity — new implementation, mid-lifecycle optimization, or approaching end-of-support — help prioritize outreach timing.`),
          feat("Puzzle", "Integration Ecosystem Data", `Adjacent technology detections including CRM, BI, supply chain, and HR platforms reveal integration opportunities and total enterprise IT landscape.`),
          feat("RefreshCw", "Bi-Monthly Data Refresh", `ERP install detections are updated bi-monthly with contact verification cycles ensuring current job titles and deliverable contact information.`),
          feat("Shield", "Enterprise-Grade Compliance", `Data processing follows SOC 2-aligned practices with documented sourcing, retention controls, and privacy framework adherence.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Record Fields",
        `What's in each`,
        `${name} record.`,
        `Every record delivers the contact, firmographic, and technographic fields your team needs for qualified enterprise software prospecting.`,
        4,
        "card",
        [
          feat("User", "Contact Name & Role", `Full name, job title, functional department, and seniority level for personalized outreach to ERP stakeholders.`),
          feat("Mail", "Corporate Email", `Business email validated through domain checks, MX verification, and inbox deliverability testing for enterprise-grade placement.`),
          feat("Phone", "Direct & Office Numbers", `Direct-dial and main office numbers with line-type classification and DNC registry matching for compliant outbound dialing.`),
          feat("Building2", "Company Firmographics", `Revenue band, employee count, industry classification (SIC/NAICS), and headquarters with multi-location indicators.`),
          feat("Server", "ERP Platform Details", `Specific product, version, deployment model (cloud, on-premise, hybrid), and estimated user count for solution-fit qualification.`),
          feat("Layers", "Adjacent Tech Stack", `Complementary platform detections — CRM, BI, supply chain, HR, and middleware — for integration-based selling.`),
          feat("Calendar", "Lifecycle Indicators", `Implementation date ranges, upgrade history signals, and end-of-support timing for replacement and migration campaigns.`),
          feat("Globe", "Global Coverage", `Headquarters and subsidiary addresses with country, region, and metro area for territory-based account assignment.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Data Governance",
        `Compliance standards for`,
        `${name} data.`,
        `Enterprise technology data requires rigorous sourcing standards and transparent processing — our governance framework ensures both.`,
        3,
        "check",
        [
          feat("ShieldCheck", "CAN-SPAM Compliant", `Email records include opt-out mechanisms and suppression processing per CAN-SPAM requirements for B2B commercial messaging.`),
          feat("Lock", "Privacy Framework Adherence", `Data processing follows CCPA, GDPR, and emerging state privacy framework requirements with documented subject access procedures.`),
          feat("PhoneOff", "DNC Registry Scrubbed", `All phone records are matched against federal and state Do Not Call registries before delivery.`),
          feat("Eye", "Transparent Sourcing", `Technology detections come from publicly observable signals, vendor ecosystem data, and professional network integrations — never from unauthorized access.`),
          feat("Clock", "Defined Retention Terms", `Licensing agreements include clear retention periods, renewal terms, and data destruction requirements.`),
          feat("FileCheck", "Audit Trail Available", `Complete processing documentation including data sources, verification methodology, and chain-of-custody records for compliance reviews.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "Strategic Value",
        "Why teams choose the",
        `${name}.`,
        [
          `ERP markets are complex — with long sales cycles, multiple stakeholders, and high contract values. Success requires knowing exactly which companies run specific platforms and who makes the purchasing decisions.`,
          `The ${name} eliminates the guesswork by mapping confirmed ERP installations to verified decision-maker contacts with firmographic context for account qualification.`,
          `Whether you're selling complementary modules, migration services, or competitive alternatives, having accurate install-base data compresses your prospecting cycle and improves win rates.`,
        ],
        [
          { label: "VERIFIED INSTALLS", text: "Every ERP detection is confirmed through multiple signals — not estimated from web traffic or assumed from industry vertical." },
          { label: "STAKEHOLDER MAP", text: "Records include multiple decision-maker roles per account — from IT leadership to finance and operations executives." },
          { label: "LIFECYCLE TIMING", text: "Implementation maturity indicators help your team prioritize accounts approaching upgrade, renewal, or end-of-support windows." },
          { label: "FIRMOGRAPHIC DEPTH", text: "Revenue, headcount, industry, and geography data enables precise ICP matching before first outreach." },
        ]
      ),
      proseSection(
        "centered",
        "Who Uses This Data",
        "Teams building pipeline with the",
        `${name}.`,
        [
          `ERP vendors use install-base data to find competitive displacement opportunities and identify accounts running outdated versions ripe for upgrade. Cloud migration specialists target on-premise installations for transformation projects.`,
          `System integrators and consultancies prospect companies with new or expanding ERP deployments that need implementation support, training, and optimization services.`,
          `ISVs and add-on providers use this data to find companies whose ERP installation matches their integration requirements — accelerating go-to-market for complementary solutions.`,
        ],
        [
          { label: "ERP VENDORS", text: "Find competitive accounts and customers on versions approaching end-of-support for upgrade campaigns." },
          { label: "CLOUD MIGRATION", text: "Target on-premise ERP installations for cloud transformation and managed service opportunities." },
          { label: "SYSTEM INTEGRATORS", text: "Identify companies with active implementations needing configuration, customization, and training support." },
          { label: "ISV PARTNERS", text: "Map install bases for integration partnerships, add-on licensing, and marketplace ecosystem growth." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How do you detect ERP installations for the ${name}?`, `We combine web technology fingerprinting, vendor ecosystem signals, job posting analysis, integration marketplace data, and verified partner channels. Each detection is confirmed through at least two independent sources before inclusion.`),
      faqItem(`What decision-maker roles are included?`, `The ${name} includes CIOs, CTOs, CFOs, VP of IT, ERP project managers, operations directors, and supply chain leaders. Multiple contacts per account are available for enterprise organizations.`),
      faqItem(`How often is the data refreshed?`, `ERP installation data is refreshed bi-monthly with contact information reverified quarterly. Continuous monitoring between cycles removes bounced emails and tracks job changes.`),
      faqItem(`Can I filter by deployment type?`, `Yes. Records can be segmented by deployment model (cloud, on-premise, hybrid), product version, estimated seat count, and implementation maturity stage to match your specific sales motion.`),
      faqItem(`Is adjacent technology data included?`, `Yes. Each record is enriched with detections of complementary platforms — CRM, business intelligence, supply chain management, HR, and middleware — for cross-sell and integration-based prospecting.`),
      faqItem(`What delivery formats are supported?`, `Data is available as CSV, Excel, or direct push to your CRM (Salesforce, HubSpot, etc.). All records are deduplicated and standardized for clean system import.`),
      faqItem(`Can I evaluate the data before licensing?`, `Yes. We provide complimentary sample records matched to your ideal customer criteria so you can assess technology accuracy, contact quality, and firmographic depth before committing.`),
    ],
    complianceHeadline: "Enterprise data with enterprise governance.",
    complianceBody: "ERP install-base intelligence is sourced from publicly observable signals and verified channels. All contact records carry opt-out suppression, DNC scrubbing, and privacy framework compliance documentation for CAN-SPAM, CCPA, and GDPR.",
  },

  software: {
    featuresSection: (name) =>
      gridSection(
        "Data Capabilities",
        `What powers the`,
        `${name}.`,
        `The ${name} combines verified user and customer data with technology intelligence to help you target companies running specific software platforms.`,
        3,
        "card",
        [
          feat("Cpu", "Active User Detection", `Companies in the ${name} have confirmed software usage detected through web technology analysis, integration signals, and verified partner ecosystem data.`),
          feat("UserCheck", "Verified Decision-Makers", `Records include technology buyers, IT managers, department heads, and end-user champions who drive software adoption and renewal decisions.`),
          feat("BarChart3", "Account Intelligence", `Firmographic enrichment with revenue, headcount, industry, and growth indicators enables ICP scoring and territory prioritization.`),
          feat("Zap", "Real-Time Usage Signals", `Technology engagement indicators including adoption depth, usage maturity, and expansion signals help your team prioritize active evaluators.`),
          feat("RefreshCw", "Continuous Verification", `Contact data is reverified monthly. Software usage detections are updated with new installations, migrations, and churn events captured between cycles.`),
          feat("Lock", "Privacy-First Collection", `All data is sourced from public signals, opt-in channels, and technology partnerships — never from unauthorized scraping or privacy-violating methods.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Record Attributes",
        `Fields included in`,
        `the ${name}.`,
        `Each record pairs verified professional contact data with software usage intelligence and company firmographics for qualified prospecting.`,
        4,
        "card",
        [
          feat("User", "Contact Details", `Full name, job title, department, and seniority level for personalized outreach to software stakeholders and users.`),
          feat("Mail", "Validated Email", `Business email confirmed through MX lookup, deliverability testing, and real-time verification for high placement rates.`),
          feat("Phone", "Phone Numbers", `Direct-dial and office numbers validated with line-type detection and federal/state DNC registry matching.`),
          feat("Building2", "Company Profile", `Organization name, industry vertical, revenue range, employee count, and headquarters location for account qualification.`),
          feat("Cpu", "Software Usage Data", `Confirmed platform or product usage, deployment details, and estimated adoption scope for solution-fit matching.`),
          feat("GitBranch", "Technology Ecosystem", `Related technology detections across CRM, ERP, analytics, security, and infrastructure for stack-aware selling.`),
          feat("TrendingUp", "Business Signals", `Company growth trajectory, funding events, hiring patterns, and technology investment indicators for timing optimization.`),
          feat("MapPin", "Location & Territory", `Full address, metro area, and regional classification for territory assignment and geo-targeted campaigns.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Compliance & Ethics",
        `Data governance for the`,
        `${name}.`,
        `We maintain rigorous sourcing, processing, and delivery standards to protect your brand reputation and campaign compliance.`,
        2,
        "check",
        [
          feat("ShieldCheck", "Anti-Spam Compliant", `All email records include CAN-SPAM suppression processing, valid sender requirements, and opt-out mechanism compliance.`),
          feat("Lock", "Privacy Regulation Ready", `CCPA, GDPR, and state-level privacy framework compliance with documented data subject access and deletion processes.`),
          feat("PhoneOff", "Telemarketing Compliant", `Phone records are DNC-scrubbed with TCPA consent classification for compliant outbound call programs.`),
          feat("FileCheck", "Source Documentation", `Data provenance, collection methodology, and processing records available for vendor assessment and compliance audits.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "Why This Data Matters",
        "How the",
        `${name} accelerates your sales.`,
        [
          `Selling technology is harder when you're guessing which companies use which platforms. The ${name} removes that guesswork by identifying confirmed software users and matching them to verified decision-maker contacts.`,
          `This means your SDRs can open conversations about specific workflows, integration challenges, and upgrade opportunities — not generic product pitches. Account executives can prioritize leads that match your ideal technology profile.`,
          `Combined with firmographic scoring and business signals, the ${name} transforms your prospecting from volume-based to intelligence-driven.`,
        ],
        [
          { label: "CONFIRMED USAGE", text: "Software detections are verified through multiple signals — web technologies, integrations, and ecosystem partnerships." },
          { label: "BUYER CONTACTS", text: "Records include verified decision-makers and influencers — not generic info@ addresses or outdated org charts." },
          { label: "STACK CONTEXT", text: "Adjacent technology data reveals the full platform ecosystem for integration-based and competitive selling." },
          { label: "FRESH DATA", text: "Monthly refresh cycles ensure your targeting reflects current software installations and up-to-date contacts." },
        ]
      ),
      proseSection(
        "centered",
        "Target Audiences",
        "Who benefits from the",
        `${name}.`,
        [
          `Software vendors use this data for competitive intelligence and displacement campaigns. Consulting firms identify companies needing implementation, optimization, and training services for specific platforms.`,
          `Channel partners and resellers prospect companies whose technology stack aligns with their solution portfolio. Marketing teams build targeted ABM campaigns based on confirmed technology adoption.`,
          `Whether you're selling complementary tools, migration services, or competitive alternatives, verified user data gives your team the intelligence advantage.`,
        ],
        [
          { label: "SOFTWARE VENDORS", text: "Find users of competing or complementary platforms for displacement and cross-sell campaigns." },
          { label: "CONSULTANTS", text: "Identify companies using platforms that match your implementation and advisory expertise." },
          { label: "CHANNEL PARTNERS", text: "Build pipeline with verified customer data that aligns with your reseller or integration partnerships." },
          { label: "MARKETING TEAMS", text: "Create technology-segmented ABM audiences for campaigns that resonate with specific platform users." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How accurate is the software usage data in the ${name}?`, `Technology detections are confirmed through multiple independent sources including web fingerprinting, integration marketplace data, job postings, and vendor ecosystem signals. We target 90%+ detection accuracy with monthly refresh cycles.`),
      faqItem(`What contact roles are included?`, `The ${name} includes IT managers, technology directors, CIOs, department heads, and end-user champions. Enterprise accounts typically include multiple stakeholder contacts per organization.`),
      faqItem(`How fresh is the contact data?`, `Contact information is reverified monthly with continuous bounce monitoring. Software usage detections are updated bi-monthly to capture new installations, platform changes, and churn events.`),
      faqItem(`Can I combine technology and firmographic filters?`, `Yes. You can filter by software platform, company size, industry vertical, geography, and growth stage. Our team can help build custom segments for complex multi-variable targeting.`),
      faqItem(`Do you track related technologies?`, `Yes. Each record includes detections of adjacent platforms across categories like CRM, marketing automation, analytics, and infrastructure — enabling technology-stack-aware prospecting.`),
      faqItem(`What's the delivery format?`, `Data is delivered as CSV, Excel, or direct integration to your sales and marketing platforms. Records are standardized and deduplicated for clean CRM import.`),
      faqItem(`Is a sample available before purchase?`, `Yes. We provide complimentary sample records matched to your target criteria so you can evaluate detection accuracy, contact quality, and data freshness before licensing.`),
    ],
    complianceHeadline: "Technology data, ethically sourced.",
    complianceBody: "Software usage intelligence is collected from publicly available signals and authorized technology partnerships. All contact records include opt-out processing, DNC scrubbing, and privacy framework documentation for CAN-SPAM, CCPA, and GDPR compliance.",
  },

  dbms: {
    featuresSection: (name) =>
      gridSection(
        "Database Intelligence",
        `Capabilities of the`,
        `${name}.`,
        `The ${name} maps database management system installations to IT decision-makers — enabling targeted outreach for database tools, migration services, and infrastructure solutions.`,
        3,
        "card",
        [
          feat("Database", "Confirmed DBMS Installations", `Every company has a verified database platform installation — detected through infrastructure scanning, cloud marketplace signals, and developer ecosystem data.`),
          feat("UserCheck", "Database Administrators & IT Leaders", `Records include DBAs, data engineers, infrastructure architects, CIOs, and VP-level technology executives who manage database strategy and spending.`),
          feat("BarChart3", "Deployment Context", `Deployment type (cloud-managed, self-hosted, hybrid), estimated data volume tier, and workload classification (OLTP, analytics, mixed) for solution-fit targeting.`),
          feat("GitBranch", "Data Stack Mapping", `Adjacent platform detections including data warehouses, ETL tools, BI platforms, and cloud infrastructure for ecosystem-aware prospecting.`),
          feat("RefreshCw", "Bi-Monthly Updates", `Installation detections and contact information are refreshed bi-monthly with continuous monitoring for platform migrations and vendor switches.`),
          feat("Shield", "Compliance-Ready Data", `All records follow CAN-SPAM, CCPA, and GDPR processing standards with opt-out suppression and transparent sourcing documentation.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection("Record Fields", `Data in each`, `${name} record.`, `Each record delivers contact, firmographic, and technographic intelligence for database technology prospecting.`, 4, "card", [
        feat("User", "Contact Identity", `Full name, job title, functional role, and seniority level targeting database administrators and IT decision-makers.`),
        feat("Mail", "Verified Email", `Corporate email with MX validation, syntax check, and deliverability scoring for reliable inbox placement.`),
        feat("Phone", "Direct Phone", `Direct-dial numbers with line-type classification and DNC registry matching for compliant outbound calling.`),
        feat("Building2", "Company Data", `Organization name, revenue, headcount, industry, and location for account qualification and territory assignment.`),
        feat("Database", "DBMS Platform Details", `Specific database product, version indicators, deployment model, and estimated scale for solution matching.`),
        feat("Cloud", "Cloud Infrastructure", `Cloud provider (AWS, Azure, GCP) and managed service usage for cloud-native database targeting.`),
        feat("Layers", "Data Stack Context", `Related data platform detections — warehouses, lakes, ETL, BI, and streaming tools — for stack-aware selling.`),
        feat("Globe", "Geographic Coverage", `Full address with metro, state, and region for territory-based prospecting and event-driven outreach.`),
      ]),
    complianceSection: (name) =>
      gridSection("Data Standards", `Governance for the`, `${name}.`, `Database technology intelligence is sourced and processed under strict ethical and legal compliance standards.`, 2, "check", [
        feat("ShieldCheck", "Email Compliance", `CAN-SPAM and CASL compliant email processing with suppression management and opt-out mechanisms.`),
        feat("Lock", "Privacy Frameworks", `CCPA and GDPR compliant processing with documented data subject access and deletion procedures.`),
        feat("PhoneOff", "Telemarketing Compliance", `Federal and state DNC registry scrubbing with TCPA consent indicators for phone outreach.`),
        feat("FileCheck", "Audit Documentation", `Sourcing methodology, verification steps, and processing chain-of-custody available for compliance reviews.`),
      ]),
    proseSections: (name) => [
      proseSection("split", "The Data Advantage", "Why teams choose", `the ${name}.`, [
        `Database technology decisions involve specialized stakeholders — DBAs, data architects, and infrastructure leaders who evaluate platforms based on workload requirements, scale needs, and ecosystem compatibility.`,
        `The ${name} helps you reach these specialists with intelligence about their current database environment, enabling relevant conversations about migration, optimization, and modernization.`,
        `Combined with data stack context, your team can position solutions that fit the prospect's existing architecture.`,
      ], [
        { label: "VERIFIED INSTALLS", text: "Database detections confirmed through infrastructure analysis, cloud signals, and developer community data." },
        { label: "DBA ACCESS", text: "Direct access to database administrators, data engineers, and infrastructure architects who drive platform decisions." },
        { label: "STACK CONTEXT", text: "See the full data infrastructure — warehouses, ETL, BI tools, and cloud platforms — for ecosystem-fit positioning." },
        { label: "MIGRATION SIGNALS", text: "Deployment maturity and modernization indicators help prioritize accounts considering platform transitions." },
      ]),
      proseSection("centered", "Use Cases", "Who benefits from", `the ${name}.`, [
        `Cloud database providers target on-premise installations for managed-service migration campaigns. Database tooling vendors identify companies whose platform aligns with their integration requirements.`,
        `Consulting firms prospect organizations with database modernization, performance optimization, and cloud migration needs. Data platform vendors find accounts evaluating next-generation database architectures.`,
      ], [
        { label: "CLOUD PROVIDERS", text: "Target on-premise databases for managed cloud migration and modernization campaigns." },
        { label: "TOOL VENDORS", text: "Find companies using databases compatible with your monitoring, backup, or optimization tools." },
        { label: "CONSULTANCIES", text: "Identify organizations with database performance, scaling, or migration challenges." },
        { label: "PLATFORM VENDORS", text: "Reach accounts evaluating modern database architectures for new workloads." },
      ]),
    ],
    faqs: (name) => [
      faqItem(`How do you detect database installations?`, `We use infrastructure technology scanning, cloud marketplace signals, developer ecosystem analysis, and verified partnership data. Each detection is confirmed through multiple independent sources.`),
      faqItem(`What roles are included in the ${name}?`, `Records include DBAs, data engineers, infrastructure architects, CIOs, CTOs, and VP-level IT leaders who manage database strategy and purchasing decisions.`),
      faqItem(`How often is the data updated?`, `DBMS installation data is refreshed bi-monthly. Contact information is reverified quarterly with continuous bounce monitoring between cycles.`),
      faqItem(`Can I filter by deployment type?`, `Yes. Records can be segmented by deployment model (cloud-managed, self-hosted, hybrid), cloud provider, estimated data volume, and workload type.`),
      faqItem(`Is related technology data included?`, `Yes. Each record includes detections of adjacent data platforms — warehouses, ETL tools, BI platforms, and cloud infrastructure services.`),
      faqItem(`What delivery formats are available?`, `CSV, Excel, or direct CRM integration. All records are deduplicated and formatted for clean import into your sales and marketing systems.`),
      faqItem(`Can I get a sample first?`, `Yes. We provide complimentary sample records matched to your targeting criteria for quality evaluation before licensing.`),
    ],
    complianceHeadline: "Data infrastructure intelligence, responsibly sourced.",
    complianceBody: "DBMS installation data is collected from publicly observable infrastructure signals and authorized partnerships. Contact records include CAN-SPAM suppression, DNC scrubbing, and privacy framework compliance under CCPA and GDPR.",
  },

  os: {
    featuresSection: (name) =>
      gridSection("Platform Intelligence", `Inside the`, `${name}.`, `The ${name} identifies companies running specific operating systems — enabling vendors, MSPs, and security firms to target by infrastructure platform.`, 3, "numbered", [
        feat("Monitor", "Verified OS Deployments", `Company-level operating system detections confirmed through endpoint analysis, infrastructure signals, and technology partnership data.`),
        feat("Users", "IT Infrastructure Contacts", `System administrators, infrastructure managers, CIOs, and IT directors who manage operating system strategy and vendor relationships.`),
        feat("Shield", "Security Posture Context", `Patch management signals, version currency indicators, and end-of-support status for security-focused targeting.`),
        feat("Server", "Deployment Scale Indicators", `Estimated endpoint count, server vs. desktop distribution, and enterprise vs. SMB deployment classification.`),
        feat("RefreshCw", "Monthly Freshness", `OS deployment data and contact information refreshed monthly to capture migrations, upgrades, and organizational changes.`),
        feat("Layers", "Infrastructure Stack Data", `Adjacent technology detections — virtualization, cloud, security tools, and management platforms — for solution-fit positioning.`),
      ]),
    attributesSection: (name) =>
      gridSection("Record Fields", `Data in the`, `${name}.`, `Each record combines verified IT contacts with operating system deployment intelligence and company firmographics.`, 4, "card", [
        feat("User", "IT Contact Details", `Full name, title, and department for system administrators, IT managers, and infrastructure decision-makers.`),
        feat("Mail", "Business Email", `Corporate email validated for deliverability with MX verification and real-time bounce checking.`),
        feat("Phone", "Direct Numbers", `Direct-dial and office phone with line-type validation and DNC matching for compliant calling.`),
        feat("Building2", "Organization Profile", `Company name, size, industry, revenue, and location for account qualification.`),
        feat("Monitor", "OS Platform Data", `Operating system family, version indicators, and deployment type for platform-specific targeting.`),
        feat("Cloud", "Cloud & Virtualization", `Cloud provider usage, virtualization platform, and hybrid infrastructure indicators.`),
        feat("Shield", "Security Tools", `Endpoint security, MDM, and patch management platform detections for security-stack targeting.`),
        feat("Globe", "Geographic Data", `Full address with metro area and region for territory-based account assignment.`),
      ]),
    complianceSection: (name) =>
      gridSection("Data Governance", `Standards for the`, `${name}.`, `Infrastructure technology data is processed under strict compliance and ethical sourcing standards.`, 2, "check", [
        feat("ShieldCheck", "Anti-Spam Compliance", `CAN-SPAM compliant email processing with opt-out suppression and commercial messaging requirements.`),
        feat("Lock", "Privacy Regulations", `CCPA and GDPR processing with data subject access, deletion procedures, and consent documentation.`),
        feat("PhoneOff", "DNC Compliance", `Federal and state DNC registry scrubbing with TCPA consent classification for phone campaigns.`),
        feat("FileCheck", "Sourcing Transparency", `Technology detection methodology and data processing documentation available for vendor assessments.`),
      ]),
    proseSections: (name) => [
      proseSection("split", "Infrastructure Targeting", "What makes", `the ${name} valuable.`, [
        `IT vendors, managed service providers, and security firms need to know what operating systems their prospects run. The ${name} provides this intelligence combined with verified IT decision-maker contacts.`,
        `Instead of broad IT targeting, your team can focus on companies running specific platforms — opening conversations about migration, security, management, and optimization that resonate with infrastructure teams.`,
      ], [
        { label: "PLATFORM VERIFIED", text: "OS deployments confirmed through endpoint scanning and infrastructure analysis — not inferred from web traffic." },
        { label: "IT CONTACTS", text: "Direct access to system administrators, infrastructure managers, and IT leadership." },
        { label: "VERSION CURRENCY", text: "Deployment version indicators help prioritize accounts running outdated or end-of-support releases." },
        { label: "STACK CONTEXT", text: "Adjacent security, virtualization, and cloud platform data for ecosystem-aware positioning." },
      ]),
      proseSection("centered", "Who Uses This", "Teams that target with", `the ${name}.`, [
        `OS vendors target migration opportunities from competing platforms. MSPs identify companies needing management, monitoring, and support services for specific operating environments.`,
        `Security vendors prospect by platform vulnerability profile and patch management maturity. Hardware vendors align device recommendations with OS deployment requirements.`,
      ], [
        { label: "OS VENDORS", text: "Identify competitive migration and enterprise licensing opportunities by platform." },
        { label: "MSPs", text: "Find companies needing platform management, patching, and support services." },
        { label: "SECURITY FIRMS", text: "Target by OS platform, version currency, and endpoint security posture." },
        { label: "HARDWARE VENDORS", text: "Align device and infrastructure recommendations with OS deployment environments." },
      ]),
    ],
    faqs: (name) => [
      faqItem(`How are OS installations detected?`, `We use endpoint technology analysis, infrastructure fingerprinting, and enterprise licensing signals from multiple verified data sources.`),
      faqItem(`What IT roles are included?`, `System administrators, infrastructure managers, IT directors, CIOs, and security officers who manage OS deployment and vendor decisions.`),
      faqItem(`How current is the data?`, `OS deployment data is refreshed monthly. Contact information is reverified quarterly with continuous monitoring between cycles.`),
      faqItem(`Can I filter by version or deployment size?`, `Yes. Records include version indicators, estimated endpoint count, and enterprise vs. SMB classification for precise targeting.`),
      faqItem(`Is cloud and virtualization data included?`, `Yes. Each record includes cloud provider, virtualization platform, and hybrid infrastructure detections alongside the OS deployment data.`),
      faqItem(`What delivery formats are available?`, `CSV, Excel, or direct CRM integration with standardized, deduplicated records ready for import.`),
      faqItem(`Can I sample the data first?`, `Yes. Complimentary samples matched to your targeting criteria are available for quality evaluation.`),
    ],
    complianceHeadline: "Infrastructure data with full compliance.",
    complianceBody: "OS deployment intelligence is sourced from publicly observable signals and authorized channels. All records carry CAN-SPAM, DNC, CCPA, and GDPR compliance documentation.",
  },

  biztech: {
    featuresSection: (name) =>
      gridSection("Technology Intelligence", `What's in the`, `${name}.`, `The ${name} maps technology adoption patterns to verified buyer contacts — connecting your team with companies using specific business technology platforms.`, 3, "card", [
        feat("Cpu", "Verified Technology Adoption", `Each company has confirmed technology usage detected through web scanning, API integrations, and partner ecosystem intelligence.`),
        feat("Users", "Technology Buyers & Users", `Records target IT directors, technology managers, department heads, and power users who drive adoption and purchasing decisions.`),
        feat("BarChart3", "Firmographic Enrichment", `Revenue, headcount, industry, and growth indicators enable ICP matching and account-level qualification before outreach.`),
        feat("Puzzle", "Integration Landscape", `Adjacent platform detections across business systems reveal integration opportunities and total technology investment profile.`),
        feat("RefreshCw", "Regular Data Refresh", `Technology detections and contact information are updated monthly to capture new adoption, churn, and organizational changes.`),
        feat("Target", "Adoption Depth Signals", `Usage maturity indicators, engagement level, and expansion signals help prioritize active technology evaluators.`),
      ]),
    attributesSection: (name) =>
      gridSection("Data Fields", `What's in each`, `${name} record.`, `Every record combines verified contact information with technology intelligence and company firmographics for qualified prospecting.`, 4, "card", [
        feat("User", "Contact Information", `Full name, job title, department, and seniority level for technology buyers and users.`),
        feat("Mail", "Validated Email", `Business email confirmed through multi-step verification for reliable campaign deliverability.`),
        feat("Phone", "Phone Numbers", `Direct-dial and office numbers with DNC matching and line-type classification.`),
        feat("Building2", "Company Profile", `Organization name, industry, revenue, headcount, and headquarters location.`),
        feat("Cpu", "Technology Data", `Confirmed platform usage, deployment details, and adoption maturity indicators.`),
        feat("Layers", "Tech Stack Context", `Related technology detections across business applications and infrastructure.`),
        feat("TrendingUp", "Growth Signals", `Business trajectory, technology investment patterns, and expansion indicators.`),
        feat("Globe", "Location Data", `Full address with metro and regional classification for territory management.`),
      ]),
    complianceSection: (name) =>
      gridSection("Data Governance", `Standards for the`, `${name}.`, `All data is sourced ethically and processed under strict regulatory compliance frameworks.`, 2, "check", [
        feat("ShieldCheck", "Email Compliance", `CAN-SPAM compliant processing with opt-out mechanisms and suppression list management.`),
        feat("Lock", "Privacy Ready", `CCPA and GDPR compliant with data subject access and deletion procedures documented.`),
        feat("PhoneOff", "DNC Scrubbed", `Federal and state Do Not Call registry matching with TCPA consent classification.`),
        feat("FileCheck", "Audit Ready", `Data sourcing methodology, verification steps, and processing records available for compliance reviews.`),
      ]),
    proseSections: (name) => [
      proseSection("split", "Technology Targeting", "How the", `${name} delivers value.`, [
        `Successful technology sales start with knowing what your prospects already use. The ${name} gives your team confirmed adoption data paired with verified buyer contacts — transforming cold outreach into informed conversations.`,
        `Beyond the primary technology detection, records include adjacent platform data that reveals integration opportunities, competitive dynamics, and total technology investment context.`,
        `This stack-aware intelligence helps your team position solutions within the prospect's existing ecosystem rather than pitching in isolation.`,
      ], [
        { label: "ADOPTION CONFIRMED", text: "Technology detections are verified through multiple signals — not estimated from traffic or assumed from industry." },
        { label: "BUYER ACCESS", text: "Records target decision-makers and power users who influence technology purchasing and adoption." },
        { label: "STACK AWARENESS", text: "Adjacent technology data provides context for integration-based and competitive positioning." },
        { label: "MONTHLY UPDATES", text: "Data freshness maintained through regular verification cycles capturing new adoption and churn." },
      ]),
      proseSection("centered", "Who This Serves", "Teams using the", `${name}.`, [
        `Technology vendors use this data for ABM campaigns, competitive displacement, and ecosystem expansion. Consultancies identify companies needing implementation, migration, and optimization services.`,
        `Channel partners prospect accounts whose technology profile matches their solution portfolio. Marketing teams build segmented audiences for technology-aware demand generation campaigns.`,
      ], [
        { label: "TECH VENDORS", text: "Target users of competing or complementary platforms for displacement and expansion campaigns." },
        { label: "CONSULTANCIES", text: "Find companies using platforms that match your advisory and implementation expertise." },
        { label: "CHANNEL PARTNERS", text: "Build pipeline with technology-qualified accounts aligned to your partner certifications." },
        { label: "MARKETING TEAMS", text: "Create platform-segmented ABM audiences for high-relevance demand generation." },
      ]),
    ],
    faqs: (name) => [
      faqItem(`How do you verify technology adoption for the ${name}?`, `We combine web technology scanning, API integration signals, job posting analysis, and vendor ecosystem data. Each detection requires confirmation from at least two independent sources.`),
      faqItem(`What contact roles are available?`, `IT directors, technology managers, department heads, CTOs, CIOs, and power users who influence technology buying decisions.`),
      faqItem(`How often is the data refreshed?`, `Technology detections are updated monthly. Contact information is reverified quarterly with continuous bounce monitoring.`),
      faqItem(`Can I combine tech and firmographic filters?`, `Yes. Filter by technology platform, company size, industry, geography, and growth stage for precise audience building.`),
      faqItem(`Is adjacent technology data included?`, `Yes. Records include detections of related platforms across CRM, analytics, infrastructure, and collaboration categories.`),
      faqItem(`What delivery options are available?`, `CSV, Excel, or direct CRM integration with standardized, deduplicated records.`),
      faqItem(`Can I evaluate before purchasing?`, `Yes. Complimentary samples are available matched to your ideal customer criteria for quality assessment.`),
    ],
    complianceHeadline: "Technology intelligence, responsibly sourced.",
    complianceBody: "All technology data is collected from publicly available signals and authorized channels. Contact records carry CAN-SPAM, DNC, CCPA, and GDPR compliance documentation with opt-out processing and transparent sourcing.",
  },

  industry: {
    featuresSection: (name) =>
      gridSection(
        "Industry Data Strengths",
        `Why Lorann's`,
        `${name} stands apart.`,
        `The ${name} provides industry-specific business contacts with company firmographics, decision-maker identification, and multi-channel reach for targeted B2B campaigns.`,
        3,
        "card",
        [
          feat("Target", "Industry-Verified Records", `Every company in the ${name} is classified using SIC and NAICS codes, then verified against business registration data to confirm active industry participation.`),
          feat("Users", "Key Decision-Maker Access", `Records include C-suite executives, department heads, procurement managers, and operations leaders who control purchasing and vendor selection in this industry.`),
          feat("BarChart3", "Company Firmographics", `Revenue bands, employee counts, years in business, and growth indicators enable account-level qualification and ICP matching before outreach.`),
          feat("Layers", "Multi-Channel Contact Data", `Every record includes verified email, direct phone, and CASS-certified postal address for coordinated outreach across all marketing channels.`),
          feat("RefreshCw", "Quarterly Data Refresh", `The ${name} is reverified quarterly with continuous monitoring for business closures, job changes, and contact accuracy between refresh cycles.`),
          feat("Globe", "National & Regional Coverage", `Contacts span all 50 US states with metro area, state, and regional segmentation for territory-based prospecting and geo-targeted campaigns.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Contact & Company Data",
        `Fields in each`,
        `${name} record.`,
        `Every record delivers the contact and firmographic intelligence your sales team needs for qualified industry-specific prospecting.`,
        4,
        "card",
        [
          feat("User", "Contact Name & Title", `Full name, job title, and functional department for personalized B2B outreach to industry decision-makers.`),
          feat("Mail", "Business Email", `Corporate email validated through MX lookup, syntax verification, and deliverability scoring for high inbox placement rates.`),
          feat("Phone", "Direct & Office Phone", `Direct-dial and main office numbers with line-type validation and DNC registry matching for compliant outbound calling.`),
          feat("MapPin", "Business Address", `CASS-certified postal address with ZIP+4, county, metro area, and state for direct mail and geo-targeted campaigns.`),
          feat("Building2", "Company Profile", `Organization name, industry classification (SIC/NAICS), revenue range, employee count, and years in business.`),
          feat("TrendingUp", "Business Signals", `Company growth trajectory, hiring activity, and market expansion indicators for opportunity timing and prioritization.`),
          feat("Briefcase", "Functional Role Data", `Department classification, decision-making authority level, and purchasing influence indicators for prospect qualification.`),
          feat("Globe", "Territory Data", `State, metro area, county, and region for territory assignment and geographic campaign targeting.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Data Governance",
        `Compliance behind the`,
        `${name}.`,
        `Every record is sourced ethically and processed within strict regulatory compliance frameworks to protect your brand and campaigns.`,
        3,
        "check",
        [
          feat("ShieldCheck", "CAN-SPAM Compliant", `Email records include opt-out suppression, unsubscribe processing, and commercial messaging compliance per federal anti-spam requirements.`),
          feat("Lock", "CCPA & Privacy Ready", `Consumer and business privacy requests honored under CCPA, state-level frameworks, and emerging privacy regulations with documented processes.`),
          feat("PhoneOff", "TCPA & DNC Scrubbed", `All phone records matched against federal and state Do Not Call registries with TCPA consent indicators for compliant calling programs.`),
          feat("Eye", "Ethical Data Sourcing", `Records sourced from business registrations, professional directories, opt-in channels, and public filings — never from unauthorized data collection methods.`),
          feat("Clock", "Retention & Disposal", `Clear licensing terms with defined retention periods and verified data destruction processes for expired or unused records.`),
          feat("FileCheck", "Compliance Documentation", `Sourcing methodology, processing chain-of-custody, and regulatory compliance certificates available for vendor assessments and audits.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "Industry Expertise",
        "The value of the",
        `${name}.`,
        [
          `Generic B2B databases group companies by broad industry codes without understanding the specific dynamics, stakeholders, and buying patterns within each vertical. The ${name} is built with industry expertise.`,
          `Records are verified against industry-specific business data — trade associations, licensing boards, and professional registries — ensuring your team reaches genuine participants in this market.`,
          `Combined with decision-maker identification and company firmographics, the ${name} transforms industry prospecting from volume-based outreach to precision-targeted campaigns.`,
        ],
        [
          { label: "INDUSTRY VERIFIED", text: "Company classifications confirmed through multiple sources — business registrations, trade data, and professional directories." },
          { label: "DECISION-MAKERS", text: "Records target executives, department heads, and purchasing influencers — not generic contact databases." },
          { label: "COMPANY INTEL", text: "Revenue, headcount, and growth indicators enable account-level qualification before first contact." },
          { label: "QUARTERLY FRESH", text: "Data reverified quarterly with continuous monitoring for business changes, closures, and contact updates." },
        ]
      ),
      proseSection(
        "centered",
        "Campaign Applications",
        "How teams deploy the",
        `${name}.`,
        [
          `Sales teams use industry-verified data for targeted account prospecting, conference pre-outreach, and territory-based pipeline building. Account executives prioritize companies matching their ideal customer profile using firmographic and growth indicators.`,
          `Marketing teams build industry-segmented audiences for email campaigns, direct mail programs, and ABM initiatives. Event teams identify attendees and exhibitors for trade show outreach and sponsorship campaigns.`,
          `Channel partners prospect companies whose industry profile aligns with their vertical expertise and solution portfolio.`,
        ],
        [
          { label: "DIRECT SALES", text: "Prospect verified industry contacts with account intelligence for personalized, relevant outreach." },
          { label: "MARKETING", text: "Build industry-segmented audiences for email, direct mail, and account-based marketing campaigns." },
          { label: "EVENT MARKETING", text: "Identify companies and decision-makers for trade show, conference, and industry event engagement." },
          { label: "CHANNEL PARTNERS", text: "Target industry verticals that match your solution expertise and partner certifications." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How many contacts are in the ${name}?`, `Record counts vary based on industry segment, geography, and role filters. Lorann provides free count estimates based on your specific targeting criteria. Contact our data team for a custom count matched to your campaign requirements.`),
      faqItem(`How current is the ${name}?`, `The ${name} is refreshed quarterly with full re-verification of email deliverability, phone accuracy, and business status. Continuous monitoring between quarterly cycles captures closures, job changes, and contact updates.`),
      faqItem(`What format is the data delivered in?`, `Data is delivered as CSV, Excel, or direct integration to your CRM or marketing automation platform. Records are standardized, deduplicated, and formatted for clean import into Salesforce, HubSpot, or similar systems.`),
      faqItem(`Can I get a sample before licensing?`, `Yes. We provide complimentary data samples matched to your targeting criteria so you can evaluate record quality, industry accuracy, and deliverability before committing to a full license.`),
      faqItem(`What roles and titles are included?`, `The ${name} includes C-suite executives, VPs, directors, managers, and key department heads across operations, purchasing, IT, finance, and marketing functions — focused on decision-makers with budget authority.`),
      faqItem(`Can I target by geography and company size?`, `Yes. Records support filtering by state, metro area, ZIP code, revenue range, employee count, and years in business for precise territory-based and account-level targeting.`),
      faqItem(`What compliance standards does the data meet?`, `The ${name} is processed under CAN-SPAM, CCPA, TCPA, and state-level privacy frameworks. Records include opt-out suppression, DNC scrubbing, and compliance documentation for audit requirements.`),
    ],
    complianceHeadline: "Industry data with full regulatory compliance.",
    complianceBody: "Every record is sourced from business registrations, professional directories, and opt-in channels. Processing follows CAN-SPAM, CCPA, TCPA, and state privacy frameworks with opt-out suppression, DNC scrubbing, and audit-ready documentation.",
  },

  b2c: {
    featuresSection: (name) =>
      gridSection(
        "Consumer Data Strengths",
        `What defines Lorann's`,
        `${name}.`,
        `The ${name} delivers permission-based consumer profiles enriched with demographic, lifestyle, and behavioral attributes for precision direct-to-consumer marketing.`,
        3,
        "card",
        [
          feat("Users", "Permission-Based Consumer Profiles", `Every record in the ${name} originates from opt-in sources — surveys, registrations, purchase data, and public records — with documented permission basis for each channel.`),
          feat("PieChart", "Deep Demographic Segmentation", `Records include age, income, education, homeownership, household composition, and life-stage indicators for precise consumer audience definition.`),
          feat("Heart", "Lifestyle & Interest Data", `Behavioral attributes covering purchase preferences, media consumption, brand affinities, and lifestyle indicators enable psychographic targeting beyond basic demographics.`),
          feat("Layers", "Multi-Channel Consumer Reach", `Each record carries verified email, phone, and postal data with channel-level opt-in status for coordinated direct-to-consumer campaigns.`),
          feat("RefreshCw", "Monthly Consumer Updates", `Consumer profiles are refreshed monthly with address changes (NCOA), deceased suppression, and behavioral data updates from ongoing source feeds.`),
          feat("ShieldCheck", "Privacy-First Processing", `All consumer data adheres to CAN-SPAM, CCPA, TCPA, and state-level privacy frameworks with documented opt-in and suppression management.`),
        ]
      ),
    attributesSection: (name) =>
      gridSection(
        "Consumer Record Fields",
        `What's in each`,
        `${name} record.`,
        `Every consumer profile combines identity, demographic, behavioral, and contact attributes for personalized marketing at scale.`,
        4,
        "card",
        [
          feat("User", "Consumer Identity", `Full name, age range, gender, and household position for personalized consumer outreach and audience segmentation.`),
          feat("Mail", "Verified Email Address", `Consumer email with permission status, deliverability verification, and engagement recency indicators for inbox-optimized campaigns.`),
          feat("Phone", "Phone & Mobile", `Home, mobile, and landline numbers with DNC status, TCPA consent classification, and SMS-capability indicators.`),
          feat("MapPin", "Residential Address", `CASS-certified, NCOA-processed addresses with ZIP+4, county, carrier route, and dwelling-type classification for direct mail targeting.`),
          feat("Home", "Household Demographics", `Income range, home value, dwelling type, length of residence, presence of children, and household size indicators.`),
          feat("Heart", "Interests & Lifestyle", `Purchase behavior categories, hobby indicators, media preferences, and brand affinity data for psychographic targeting.`),
          feat("TrendingUp", "Life-Stage Triggers", `Recent mover status, new homeowner, new parent, pre-retiree, and other life-event signals for trigger-based marketing.`),
          feat("Globe", "Geographic Segments", `State, metro, county, ZIP, carrier route, and neighborhood-level demographic clusters for geo-targeted campaigns.`),
        ]
      ),
    complianceSection: (name) =>
      gridSection(
        "Consumer Privacy",
        `Privacy standards for the`,
        `${name}.`,
        `Consumer data demands the highest privacy standards. Every record is processed within these governance frameworks to protect consumers and your brand.`,
        3,
        "check",
        [
          feat("ShieldCheck", "CAN-SPAM Compliant", `All email contacts include opt-out suppression processing, valid sender requirements, and commercial messaging compliance under federal anti-spam law.`),
          feat("Lock", "CCPA Consumer Rights", `Full compliance with California Consumer Privacy Act including right-to-know, right-to-delete, and right-to-opt-out provisions.`),
          feat("PhoneOff", "TCPA & DNC Compliant", `Phone records are scrubbed against federal and state DNC registries with TCPA express consent and prior express written consent classification.`),
          feat("UserX", "Deceased Suppression", `Records are matched against national deceased databases monthly to prevent outreach to deceased individuals.`),
          feat("FileX", "Do Not Mail Suppression", `Postal records honor DMA Mail Preference Service (MPS) opt-outs and prison address suppression for responsible direct mail.`),
          feat("FileCheck", "Documented Permission Basis", `Every record carries documented source type, collection date, and permission level for channel-specific campaign compliance.`),
        ]
      ),
    proseSections: (name) => [
      proseSection(
        "split",
        "Consumer Intelligence",
        "What makes the",
        `${name} different.`,
        [
          `Consumer marketing success depends on reaching the right people with relevant messages — and that starts with data quality. The ${name} provides permission-based consumer profiles enriched with the demographic and behavioral attributes that drive campaign performance.`,
          `Unlike scraped or aggregated consumer databases, every record in the ${name} traces back to documented opt-in sources with channel-level permissions. This means higher deliverability, better response rates, and cleaner compliance posture.`,
          `Monthly updates ensure your campaigns reflect current consumer addresses, life events, and behavioral shifts — not stale data that wastes budget and damages reputation.`,
        ],
        [
          { label: "PERMISSION BASED", text: "Every consumer record traces to documented opt-in sources — surveys, registrations, and verified purchase data." },
          { label: "BEHAVIORAL DEPTH", text: "Lifestyle indicators, purchase categories, and interest data enable psychographic targeting beyond demographics." },
          { label: "LIFE TRIGGERS", text: "New mover, new homeowner, new parent, and pre-retiree signals for event-driven, high-response campaigns." },
          { label: "MONTHLY FRESH", text: "Address changes, deceased suppression, and behavioral updates processed monthly for data currency." },
        ]
      ),
      proseSection(
        "centered",
        "Campaign Applications",
        "How marketers use the",
        `${name}.`,
        [
          `Direct-to-consumer brands use the ${name} for customer acquisition campaigns targeting prospects who match their best-customer profiles by demographics, lifestyle, and purchase behavior.`,
          `Direct mail marketers combine postal data with demographic selects for high-response packages targeted by income, home value, and household composition. Email marketers build permission-based audiences segmented by interest and engagement.`,
          `Agencies and media buyers leverage consumer profiles for cross-channel campaign planning, audience modeling, and performance optimization across postal, email, and phone channels.`,
        ],
        [
          { label: "DTC BRANDS", text: "Acquire new customers matching your best-buyer demographics, lifestyle, and purchase behavior profiles." },
          { label: "DIRECT MAIL", text: "Build high-response postal campaigns with precise demographic, geographic, and household targeting." },
          { label: "EMAIL MARKETING", text: "Reach permission-based consumer audiences segmented by interest, behavior, and engagement recency." },
          { label: "AGENCIES", text: "Plan and execute cross-channel consumer campaigns with unified audience profiles across postal, email, and phone." },
        ]
      ),
    ],
    faqs: (name) => [
      faqItem(`How many consumer records are available in the ${name}?`, `The ${name} draws from a universe of 250M+ US consumer records. Available counts depend on your demographic, geographic, and behavioral selection criteria. Contact our team for a complimentary count estimate based on your campaign specifications.`),
      faqItem(`What is the permission basis for consumer data?`, `All records originate from documented opt-in sources including consumer surveys, product registrations, e-commerce transactions, and public records. Each record carries source type, collection date, and channel-level permission status.`),
      faqItem(`How often is the consumer data updated?`, `The ${name} is refreshed monthly with NCOA address processing, deceased suppression, and behavioral data updates from ongoing source feeds. Email deliverability is reverified continuously.`),
      faqItem(`What demographic selects are available?`, `Available selects include age, income, gender, education, homeownership, home value, dwelling type, household composition, presence of children, marital status, ethnicity, and 100+ lifestyle and interest categories.`),
      faqItem(`Can I target by life events?`, `Yes. The ${name} includes trigger-based selects for recent movers, new homeowners, new parents, pre-retirees, and other life-stage transitions that indicate heightened purchase intent in specific product categories.`),
      faqItem(`What format is consumer data delivered in?`, `Data is delivered as CSV, Excel, or formatted for direct integration with your ESP, marketing automation platform, or direct mail production system. Records are deduplicated and CASS-certified.`),
      faqItem(`Is a consumer data sample available?`, `Yes. We provide complimentary sample records matched to your demographic and geographic criteria so you can evaluate data quality, attribute coverage, and deliverability before licensing.`),
    ],
    complianceHeadline: "Consumer privacy is built into every record.",
    complianceBody: "Every consumer profile is sourced from opt-in channels with documented permission basis. Processing follows CAN-SPAM, CCPA, TCPA, DMA guidelines, and state-level privacy frameworks with deceased suppression, DNC scrubbing, and opt-out management.",
  },
};

// ── Main execution ──────────────────────────────────────────

async function main() {
  console.log("📋 Fetching all B2B/B2C leaf pages...\n");

  const pages = await client.fetch(`*[_type == "page" && templateType == "leaf" && !(_id in path("drafts.**")) && (slug.current match "data-assets/b2b*" || slug.current match "data-assets/b2c*")]{
    _id, h1, "slug": slug.current
  } | order(slug asc)`);

  console.log(`   Found ${pages.length} leaf pages to update.\n`);

  let tx = client.transaction();
  let count = 0;

  for (const page of pages) {
    const cat = getCategory(page.slug);
    const template = TEMPLATES[cat];

    if (!template) {
      console.log(`   ⚠ No template for ${page.slug} (category: ${cat}), skipping.`);
      continue;
    }

    const name = page.h1;

    const featureGridSections = [
      template.featuresSection(name),
      template.attributesSection(name),
      template.complianceSection(name),
    ];

    const proseSections = template.proseSections(name);
    const faqItems = template.faqs(name);

    tx = tx.patch(page._id, (p) =>
      p.set({
        featureGridSections,
        proseSections,
        faqItems,
        complianceHeadline: template.complianceHeadline,
        complianceBody: block(template.complianceBody),
      })
    );

    // Also patch the draft if it exists
    const draftId = `drafts.${page._id}`;
    tx = tx.patch(draftId, (p) =>
      p.set({
        featureGridSections,
        proseSections,
        faqItems,
        complianceHeadline: template.complianceHeadline,
        complianceBody: block(template.complianceBody),
      })
    );

    count++;
    console.log(`   ✓ ${name} [${cat}]`);
  }

  console.log(`\n🚀 Committing ${count} page updates...`);

  try {
    const result = await tx.commit({ autoGenerateArrayKeys: true });
    console.log(`\n✅ Done! Updated ${count} pages. Transaction: ${result.transactionId}`);
  } catch (err) {
    // If the draft patch fails, retry without draft patching
    console.log(`\n⚠ Transaction error: ${err.message}`);
    console.log("   Retrying without draft patches...\n");

    let tx2 = client.transaction();
    for (const page of pages) {
      const cat = getCategory(page.slug);
      const template = TEMPLATES[cat];
      if (!template) continue;

      const name = page.h1;
      tx2 = tx2.patch(page._id, (p) =>
        p.set({
          featureGridSections: [
            template.featuresSection(name),
            template.attributesSection(name),
            template.complianceSection(name),
          ],
          proseSections: template.proseSections(name),
          faqItems: template.faqs(name),
          complianceHeadline: template.complianceHeadline,
          complianceBody: block(template.complianceBody),
        })
      );
    }
    const result = await tx2.commit({ autoGenerateArrayKeys: true });
    console.log(`\n✅ Done! Updated ${count} pages. Transaction: ${result.transactionId}`);
  }
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
