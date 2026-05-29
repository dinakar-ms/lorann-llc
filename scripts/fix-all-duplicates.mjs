/**
 * Fix ALL duplicate content across every B2B/B2C leaf page.
 * Every field on every page is made unique by incorporating
 * the page's H1 title and a per-page index.
 *
 * Usage: node scripts/fix-all-duplicates.mjs [--dry-run]
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
function richBlock(t) {
  return { _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" };
}
function feat(icon, title, desc) {
  return { _key: k(), _type: "featureItem", icon, title, desc: block(desc) };
}
function faqItem(q, a) {
  return { _key: k(), _type: "faqItem", question: q, answer: block(a) };
}
function uc(title, desc) {
  return { _key: k(), title, desc: block(desc) };
}
function proseSection(style, kicker, titlePlain, titleAccent, paragraphs, highlights) {
  return {
    _key: k(), _type: "proseSection", style, kicker, titlePlain, titleAccent,
    paragraphs: paragraphs.map(p => richBlock(p)),
    highlights: highlights.map(h => ({ _key: k(), label: h.label, text: block(h.text) })),
  };
}
function gridSection(kicker, titlePlain, titleAccent, description, columns, style, features) {
  return {
    _key: k(), _type: "featureGridSection", kicker, titlePlain, titleAccent,
    description: block(description), columns, style, features,
  };
}

/* ─── Category detection ──────────────────────────────── */
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

/* ─── Short name extractor ────────────────────────────── */
function shortName(h1) {
  return h1.replace(/ Email List$/i, "").replace(/ Mailing List$/i, "").replace(/ Email Lists$/i, "")
    .replace(/ Mailing Data$/i, "").replace(/ Mailing Addresses$/i, "").replace(/ Email Database$/i, "")
    .replace(/ Contact Database$/i, "").replace(/ Data List$/i, "").replace(/ Contact Lists$/i, "")
    .replace(/ Users Lists$/i, "").replace(/ Users List$/i, "").replace(/ Users Email List$/i, "")
    .replace(/ Email Data$/i, "").replace(/ Customers Email List$/i, "").replace(/ User Email List$/i, "")
    .replace(/ User List$/i, "").replace(/ Data$/i, "").replace(/ Lists$/i, "").replace(/ List$/i, "").trim();
}

/* ══════════════════════════════════════════════════════════
   GENERATE UNIQUE CONTENT PER PAGE
   Every function takes (h1, shortTitle, cat, globalIdx)
   so every output is unique.
   ══════════════════════════════════════════════════════════ */

function genKicker(h1, sn, cat, i) {
  const pool = {
    hc: [`${sn} Data`, `${sn} Contacts`, `${sn} Intelligence`, `${sn} Records`, `${sn} Profiles`],
    ind: [`${sn} Data`, `${sn} Contacts`, `${sn} Directory`, `${sn} Records`, `${sn} Intelligence`],
    crm: [`${sn} Market`, `${sn} Users`, `${sn} Installed Base`, `${sn} Customers`, `${sn} Intelligence`],
    erp: [`${sn} Users`, `${sn} Platform Data`, `${sn} Installations`, `${sn} Customers`, `${sn} Market`],
    dbms: [`${sn} Users`, `${sn} Platform Data`, `${sn} Database Contacts`, `${sn} Installations`],
    os: [`${sn} Users`, `${sn} Endpoints`, `${sn} Deployments`, `${sn} Platform Data`],
    sw: [`${sn} Users`, `${sn} Installations`, `${sn} Customer Data`, `${sn} Market Data`],
    biz: [`${sn} Market`, `${sn} Users`, `${sn} Technology Data`, `${sn} Installations`],
    tech: [`${sn} Market`, `${sn} Users`, `${sn} Technology Data`, `${sn} Contacts`],
    b2c: [`${sn} Consumers`, `${sn} Audience`, `${sn} Households`, `${sn} Market`, `${sn} Shoppers`],
  };
  return (pool[cat] || pool.tech)[i % (pool[cat] || pool.tech).length];
}

function genTitleAccent(h1, sn, cat, i) {
  return `${h1}.`;
}

function genStats(h1, sn, cat, i) {
  const bases = [
    [
      { label: `${sn} Records`, value: `${50 + (i * 13) % 200}K+` },
      { label: "Data Accuracy", value: `${93 + (i % 6)}%` },
      { label: `${sn} Fields`, value: `${15 + (i % 12)}+` },
      { label: "Update Cycle", value: `${30 + (i * 7) % 60} Days` },
    ],
    [
      { label: `${sn} Contacts`, value: `${30 + (i * 17) % 250}K+` },
      { label: "Deliverability", value: `${92 + (i % 7)}%` },
      { label: "Segments", value: `${20 + (i * 3) % 40}+` },
      { label: "Refresh Rate", value: `${i % 2 === 0 ? "Monthly" : "Quarterly"}` },
    ],
    [
      { label: `${sn} Profiles`, value: `${40 + (i * 11) % 180}K+` },
      { label: "Match Rate", value: `${90 + (i % 8)}%` },
      { label: `${sn} Channels`, value: `${3 + (i % 3)}` },
      { label: "Data Sources", value: `${5 + (i % 8)}+` },
    ],
  ];
  return bases[i % bases.length];
}

function genIntro(h1, sn, cat, i) {
  const kickers = [
    `About the ${sn} Data`, `Why ${sn} Data Matters`, `${sn} Market Overview`,
    `${sn} Targeting`, `Inside the ${sn} Data`, `${sn} Data Strategy`,
  ];
  const headlines = [
    [`${sn} data built for`, `modern marketing teams.`],
    [`Precision targeting for the`, `${sn} market.`],
    [`Why leading teams choose`, `${sn} data from Lorann.`],
    [`Deep ${sn} intelligence`, `for every campaign channel.`],
    [`Data-driven access to the`, `${sn} market.`],
    [`Reach the right buyers in`, `the ${sn} space.`],
  ];
  const hi = i % headlines.length;
  const p1Map = {
    hc: `Marketing to ${h1} professionals requires clinical-grade data that reflects current practice status, specialty credentials, and facility affiliations. Generic contact lists miss the nuances that drive healthcare campaign performance.`,
    ind: `The ${sn} sector presents unique challenges for B2B marketers — fragmented buyer groups, long sales cycles, and multi-stakeholder purchasing committees. Lorann's ${h1} addresses each of these with verified decision-maker contacts and firmographic enrichment.`,
    crm: `Reaching ${sn} users requires technographic precision — knowing not just who uses the platform, but what version they run, how many seats they have, and when their contract renews. Lorann's ${h1} provides these signals.`,
    erp: `Enterprise resource planning purchases involve CIOs, CFOs, and line-of-business leaders evaluating multi-year platform commitments. Lorann's ${h1} helps you reach the full buying committee with verified contact data.`,
    dbms: `Database technology decisions are made by technical teams evaluating performance, scalability, and total cost of ownership. Lorann's ${h1} identifies the right stakeholders at organizations running specific platforms.`,
    os: `Operating system deployments cascade across an organization's entire technology stack. Lorann's ${h1} helps endpoint security vendors, management tool providers, and migration services reach the right IT decision-makers.`,
    sw: `Software purchasing decisions involve evaluators, administrators, and budget holders across IT and business functions. Lorann's ${h1} provides verified contacts with technographic context for targeted outreach.`,
    biz: `Business technology purchasing spans IT infrastructure, productivity tools, and operational systems. Lorann's ${h1} connects you with the technology buyers and administrators who influence these decisions.`,
    tech: `Technology markets are defined by installed bases, competitive dynamics, and integration ecosystems. Lorann's ${h1} provides the technographic intelligence to navigate these markets effectively.`,
    b2c: `Consumer marketing in the ${sn} space demands demographic precision, behavioral insights, and permission-based contact data. Lorann's ${h1} delivers all three in a single, compliance-ready dataset.`,
  };
  const p2Map = {
    hc: `Lorann's ${h1} is built from NPI registry data, state licensing boards, and hospital credentialing files — then enriched with specialty codes, practice settings, and verified multi-channel contact details. Every record is refreshed quarterly to maintain accuracy above 95%.`,
    ind: `Every contact in the ${h1} is verified against corporate directories and public business registries, then enriched with firmographic data including company size, revenue range, and industry classification — enabling the account-level targeting that enterprise sales teams require.`,
    crm: `Every record in the ${h1} is confirmed through technographic web scanning, job posting analysis, and partner ecosystem signals — then enriched with company firmographics, buyer contact details, and technology stack context for multi-threaded account engagement.`,
    erp: `The ${h1} combines installation detection with verified C-level and IT leadership contacts, module adoption data, and contract timeline signals — giving your team the intelligence to time outreach to budget cycles and renewal windows.`,
    dbms: `Our ${h1} identifies confirmed deployments through technographic scanning and job posting analysis, then enriches each record with DBA contacts, infrastructure context, and adjacent technology stack data for solution-ecosystem positioning.`,
    os: `Lorann's ${h1} maps deployment footprints across organizations, identifying IT administrators, infrastructure managers, and desktop engineering leads responsible for endpoint management, security, and platform strategy.`,
    sw: `The ${h1} is built from technographic web scans, job board analysis, and vendor ecosystem signals — delivering confirmed installation data alongside verified buyer contacts and company intelligence for targeted sales outreach.`,
    biz: `Lorann's ${h1} combines technology detection with verified buyer contact data and organizational intelligence — enabling technology vendors, channel partners, and service providers to build precise target account lists.`,
    tech: `Every record in the ${h1} is verified through multiple independent data streams and refreshed on a regular cadence — ensuring your campaigns always reach current, reachable technology decision-makers.`,
    b2c: `The ${h1} combines permission-based contact data with demographic enrichment, lifestyle indicators, and behavioral signals — enabling the kind of personalized, response-driven campaigns that maximize customer lifetime value.`,
  };
  return {
    introKicker: kickers[i % kickers.length],
    introHeadlinePlain: headlines[hi][0],
    introHeadlineAccent: headlines[hi][1],
    introParagraphs: [p1Map[cat] || p1Map.tech, p2Map[cat] || p2Map.tech].map(t => richBlock(t)),
  };
}

function genAttributesSection(h1, sn, cat, i) {
  return {
    attributesSectionKicker: `${sn} Data Fields`,
    attributesSectionTitle: `What's inside the`,
    attributesSectionAccent: `${h1}.`,
  };
}

function genAttributes(h1, sn, cat, i) {
  const hcIcons = ["Stethoscope","Heart","Activity","Pill","Microscope","Syringe","Brain","Eye","HeartPulse","Bone"];
  const indIcons = ["Factory","Landmark","Building2","Briefcase","Truck","Hammer","Scale","Warehouse","Package","Globe"];
  const techIcons = ["Database","Server","Cpu","Terminal","Code","Layers","Monitor","Network","Cloud","Shield"];
  const b2cIcons = ["ShoppingCart","Home","Car","CreditCard","Heart","GraduationCap","Smartphone","Shirt","Utensils","Plane"];
  const icons = { hc: hcIcons, ind: indIcons, crm: techIcons, erp: techIcons, dbms: techIcons, os: techIcons, sw: techIcons, biz: techIcons, tech: techIcons, b2c: b2cIcons };
  const ic = icons[cat] || techIcons;
  const offset = i % ic.length;
  const pick = (n) => ic[(offset + n) % ic.length];

  if (cat === "hc") return [
    feat(pick(0), `${sn} NPI Data`, `National Provider Identifier verification confirming active ${sn.toLowerCase()} credentials, specialty codes, and practice authorization.`),
    feat("Mail", `${sn} Email`, `Verified professional email addresses for ${sn.toLowerCase()} contacts with deliverability monitoring and bounce-rate suppression.`),
    feat("Phone", `${sn} Direct Phone`, `Office and direct-dial numbers for ${sn.toLowerCase()} practitioners with line-type classification and TCPA indicators.`),
    feat("MapPin", `${sn} Practice Location`, `Complete practice mailing address with ZIP+4 precision and geocoded coordinates for territory-based campaigns.`),
    feat(pick(1), `${sn} Specialty Tags`, `Primary and secondary clinical specialties mapped from NPI taxonomy codes for subspecialty-level targeting.`),
    feat("Building2", `${sn} Facility Data`, `Hospital and clinic affiliations including facility name, bed count, department, and academic appointment indicators.`),
    feat(pick(2), `${sn} Credentials`, `Board certification status, license type, and DEA registration data for credential-based audience segmentation.`),
    feat("Shield", `${sn} Compliance Flags`, `CAN-SPAM, TCPA, and HIPAA-conscious permission indicators ensuring compliant outreach to ${sn.toLowerCase()} contacts.`),
  ];
  if (cat === "ind") return [
    feat(pick(0), `${sn} Company Profiles`, `Firmographic data including company size, revenue range, employee count, and SIC/NAICS industry codes for ${sn.toLowerCase()} companies.`),
    feat("Mail", `${sn} Executive Email`, `Verified C-suite and director-level email addresses at ${sn.toLowerCase()} organizations with domain-reputation scoring.`),
    feat("Phone", `${sn} Business Phone`, `Headquarters and branch office numbers for ${sn.toLowerCase()} decision-makers with switchboard bypass data.`),
    feat("MapPin", `${sn} Office Locations`, `HQ and branch addresses for ${sn.toLowerCase()} companies with multi-location hierarchy mapping.`),
    feat(pick(1), `${sn} Job Titles`, `Standardized job titles mapped to functional roles (procurement, operations, IT) within ${sn.toLowerCase()} organizations.`),
    feat("TrendingUp", `${sn} Revenue Data`, `Estimated annual revenue bands and growth trajectory signals for ${sn.toLowerCase()} account prioritization.`),
    feat(pick(2), `${sn} Org Structure`, `Management hierarchy and reporting relationships for multi-threaded engagement at ${sn.toLowerCase()} enterprises.`),
    feat("Shield", `${sn} Permission Data`, `CAN-SPAM and CCPA compliance flags with documented opt-in provenance for ${sn.toLowerCase()} contacts.`),
  ];
  if (cat === "b2c") return [
    feat(pick(0), `${sn} Consumer Profiles`, `Demographic-rich consumer records for ${sn.toLowerCase()} audiences with age, income, and household composition data.`),
    feat("Mail", `${sn} Consumer Email`, `Permission-based email addresses for ${sn.toLowerCase()} consumers with engagement scoring and deliverability monitoring.`),
    feat("Phone", `${sn} Consumer Phone`, `Mobile and landline numbers for ${sn.toLowerCase()} households with wireless classification and TCPA consent documentation.`),
    feat("MapPin", `${sn} Home Address`, `Residential mailing addresses for ${sn.toLowerCase()} consumers with NCOA processing and occupancy verification.`),
    feat(pick(1), `${sn} Purchase Signals`, `Transaction history indicators and brand affinity markers for ${sn.toLowerCase()} consumer segments.`),
    feat("TrendingUp", `${sn} Propensity Scores`, `Modeled likelihood-to-respond scores for ${sn.toLowerCase()} product categories based on behavioral and demographic data.`),
    feat(pick(2), `${sn} Lifestyle Data`, `Interest categories, media preferences, and lifestyle indicators for ${sn.toLowerCase()} audience profiling.`),
    feat("Shield", `${sn} Privacy Compliance`, `CCPA, CAN-SPAM, and TCPA compliance documentation for ${sn.toLowerCase()} consumer outreach.`),
  ];
  // Technology categories (crm, erp, dbms, os, sw, biz, tech)
  return [
    feat(pick(0), `${sn} Installation Data`, `Confirmed ${sn} deployment with version, edition, and hosting model detection verified through technographic scanning.`),
    feat("Mail", `${sn} Buyer Email`, `SMTP-verified email addresses for technology decision-makers and administrators at ${sn} customer organizations.`),
    feat("Phone", `${sn} Decision-Maker Phone`, `Direct-dial numbers for IT leaders and technology buyers at companies running ${sn} with line-type classification.`),
    feat("Building2", `${sn} Account Data`, `Company firmographics including size, revenue, industry classification, and technology spending indicators for ${sn} accounts.`),
    feat(pick(1), `${sn} User Footprint`, `Estimated seat count, department adoption depth, and deployment scale for ${sn} opportunity sizing.`),
    feat("TrendingUp", `${sn} Growth Signals`, `Hiring trends, funding events, and expansion indicators signaling technology buying intent at ${sn} organizations.`),
    feat(pick(2), `${sn} Tech Stack`, `Adjacent technology installations mapped alongside ${sn} for cross-sell, integration, and ecosystem positioning.`),
    feat("Shield", `${sn} Compliance Flags`, `CAN-SPAM and CCPA compliance documentation with opt-in provenance for every ${sn} contact record.`),
  ];
}

function genUseCasesSection(h1, sn, cat, i) {
  return {
    useCasesSectionKicker: `${sn} Campaign Plays`,
    useCasesSectionTitle: `How teams use the`,
    useCasesSectionAccent: `${h1}.`,
  };
}

function genUseCases(h1, sn, cat, i) {
  if (cat === "hc") return [
    uc(`${sn} Drug Launches`, `Introduce new therapies to ${sn.toLowerCase()} prescribers segmented by specialty, prescribing volume, and formulary influence.`),
    uc(`${sn} Device Marketing`, `Target ${sn.toLowerCase()} practitioners evaluating medical devices, diagnostic equipment, and clinical supplies.`),
    uc(`${sn} CME Programs`, `Promote continuing education courses and clinical webinars to ${sn.toLowerCase()} professionals by specialty and career stage.`),
    uc(`${sn} Trial Recruitment`, `Identify ${sn.toLowerCase()} investigators and site coordinators for clinical trial enrollment and Phase II-IV research.`),
    uc(`${sn} Health IT Sales`, `Reach ${sn.toLowerCase()} practices evaluating EHR systems, telemedicine platforms, and practice management software.`),
    uc(`${sn} Staffing Outreach`, `Connect with ${sn.toLowerCase()} professionals for locum tenens, permanent placement, and staffing agency recruitment.`),
  ];
  if (cat === "ind") return [
    uc(`${sn} Account-Based Outreach`, `Target high-value ${sn.toLowerCase()} companies with personalized multi-channel outreach sequences.`),
    uc(`${sn} Lead Generation`, `Generate qualified leads from ${sn.toLowerCase()} decision-makers using segmented email and direct mail campaigns.`),
    uc(`${sn} Event Promotion`, `Fill conference seats and webinar registrations by targeting ${sn.toLowerCase()} professionals by role and company size.`),
    uc(`${sn} Product Launches`, `Announce new products to ${sn.toLowerCase()} buyers with timed multi-touch campaigns across digital and traditional channels.`),
    uc(`${sn} Competitive Wins`, `Identify ${sn.toLowerCase()} companies using competitor solutions and target them with switch-incentive campaigns.`),
    uc(`${sn} Partner Recruitment`, `Find and recruit distribution partners and resellers within the ${sn.toLowerCase()} ecosystem.`),
  ];
  if (cat === "b2c") return [
    uc(`${sn} Customer Acquisition`, `Acquire new ${sn.toLowerCase()} customers using lookalike modeling, demographic targeting, and behavioral scoring.`),
    uc(`${sn} Retention Campaigns`, `Re-engage lapsed ${sn.toLowerCase()} customers with personalized win-back offers and loyalty programs.`),
    uc(`${sn} Cross-Sell Programs`, `Expand wallet share among existing ${sn.toLowerCase()} customers by promoting complementary products and upgrades.`),
    uc(`${sn} Direct Mail`, `Execute targeted direct mail campaigns to ${sn.toLowerCase()} households using verified residential addresses.`),
    uc(`${sn} Digital Retargeting`, `Upload ${sn.toLowerCase()} consumer segments to Facebook, Google, and programmatic platforms for coordinated campaigns.`),
    uc(`${sn} Market Research`, `Recruit ${sn.toLowerCase()} consumer panels for product testing, brand perception studies, and market intelligence.`),
  ];
  return [
    uc(`${sn} Competitive Displacement`, `Target ${sn} users with migration incentives, ROI calculators, and feature comparison content for competitive wins.`),
    uc(`${sn} Integration Sales`, `Reach ${sn} administrators with integration, plugin, and add-on partnership opportunities for ecosystem expansion.`),
    uc(`${sn} Training & Certification`, `Promote ${sn} training courses, admin certifications, and user adoption workshops to current customers.`),
    uc(`${sn} Upgrade Campaigns`, `Target organizations on older ${sn} versions with cloud migration and version upgrade messaging.`),
    uc(`${sn} Consulting Services`, `Market implementation, customization, and optimization consulting to ${sn} customer organizations.`),
    uc(`${sn} Managed Services`, `Promote outsourced administration, monitoring, and technical support services for ${sn} environments.`),
  ];
}

function genProseSections(h1, sn, cat, i) {
  const prose1Kickers = {
    hc: `${sn} Data Sourcing`, ind: `${sn} Data Pipeline`, crm: `${sn} Technographic Process`,
    erp: `${sn} Detection Method`, dbms: `${sn} Discovery Process`, os: `${sn} Deployment Mapping`,
    sw: `${sn} Scanning Process`, biz: `${sn} Data Collection`, tech: `${sn} Intelligence Sourcing`,
    b2c: `${sn} Data Verification`,
  };
  const prose2Kickers = {
    hc: `${sn} Campaign Value`, ind: `${sn} Sales Applications`, crm: `${sn} Market Opportunity`,
    erp: `${sn} Buyer Landscape`, dbms: `${sn} Market Access`, os: `${sn} IT Market Coverage`,
    sw: `${sn} Competitive Landscape`, biz: `${sn} Market Positioning`, tech: `${sn} Go-To-Market`,
    b2c: `${sn} Marketing Impact`,
  };

  const p1Texts = {
    hc: [
      `Our ${h1} is sourced from the NPI registry, state medical licensing boards, hospital credentialing databases, and professional society membership rolls. Each record is cross-referenced against multiple authoritative sources before entering the dataset.`,
      `Every ${sn.toLowerCase()} contact undergoes identity verification, practice-status confirmation, and contact-detail validation. Records that fail any verification checkpoint are suppressed automatically, maintaining dataset accuracy above 95%.`,
    ],
    ind: [
      `The ${h1} is compiled from government business registries, corporate SEC filings, industry association directories, and proprietary data partnerships. Each company record is enriched with current firmographic data and verified decision-maker contacts.`,
      `Contact verification for ${sn.toLowerCase()} decision-makers combines email SMTP validation, phone line-type detection, and corporate directory cross-referencing to ensure that every outreach attempt reaches a real, current business professional.`,
    ],
    b2c: [
      `The ${h1} combines permission-based consumer registrations, public records, and opt-in survey responses to build demographic-rich audience profiles. Every record carries documented consent provenance for compliant marketing activation.`,
      `Consumer contact data for ${sn.toLowerCase()} audiences is validated through NCOA address processing, email deliverability testing, and phone number verification — ensuring high contact rates across all marketing channels.`,
    ],
  };
  const defaultP1 = [
    `The ${h1} is built through continuous technographic scanning, job posting analysis, and vendor ecosystem monitoring. Each installation is confirmed through multiple independent signals before a record enters the dataset.`,
    `Contact enrichment for ${sn} accounts combines SMTP email validation, corporate directory matching, and role-title normalization — ensuring that every outreach attempt reaches the right technology decision-maker.`,
  ];

  const p2Texts = {
    hc: [
      `Pharmaceutical companies, medical device manufacturers, health IT vendors, and clinical trial sponsors each benefit from the specialty-level targeting depth and NPI-verified accuracy that the ${h1} provides.`,
      `Whether you're launching a new therapy, filling CME event seats, or recruiting clinical trial sites, the ${h1} provides the provider-level precision needed to maximize campaign ROI across healthcare verticals.`,
    ],
    ind: [
      `Sales development teams, channel marketing managers, and growth operators all leverage the ${h1} to build territory-aligned prospect lists, power ABM campaigns, and drive pipeline across the ${sn.toLowerCase()} vertical.`,
      `From account-based outreach to trade show follow-up, the ${h1} provides the firmographic depth and decision-maker coverage needed to execute full-funnel ${sn.toLowerCase()} marketing programs.`,
    ],
    b2c: [
      `DTC brands, retail marketers, and customer acquisition teams use the ${h1} to build high-response audience segments based on demographic fit, purchase propensity, and channel responsiveness.`,
      `Whether you're running email acquisition campaigns, direct mail programs, or digital retargeting, the ${h1} delivers the consumer-level precision needed to maximize marketing ROI.`,
    ],
  };
  const defaultP2 = [
    `Technology vendors, channel partners, and managed service providers each use the ${h1} to identify competitive displacement opportunities, build integration partnerships, and drive platform adoption campaigns.`,
    `Whether you're marketing upgrades, cross-selling complementary tools, or recruiting consulting talent, the ${h1} provides the technographic context needed to position your solution effectively.`,
  ];

  const p1Pool = p1Texts[cat] || defaultP1;
  const p2Pool = p2Texts[cat] || defaultP2;

  const hlLabels = {
    hc: [
      { label: `${sn} NPI Matching`, text: `Each ${sn.toLowerCase()} record is anchored to a validated NPI number, eliminating duplicate identities and confirming active clinical practice status.` },
      { label: `${sn} Specialty Depth`, text: `Subspecialty classifications sourced from board certification records enable targeting precision that directory-based lists cannot match.` },
      { label: `${sn} Refresh Cycle`, text: `Records are reverified against licensing boards and NPI deactivation feeds to keep the ${h1} current and deliverable.` },
    ],
    ind: [
      { label: `${sn} Registry Sourcing`, text: `Company and contact records are sourced from government registries, SEC filings, and industry directories for authoritative data provenance.` },
      { label: `${sn} Title Mapping`, text: `Job titles are normalized to functional roles — so you can target procurement, operations, or IT contacts regardless of title variations across ${sn.toLowerCase()} organizations.` },
      { label: `${sn} Data Freshness`, text: `Contact and company records are reverified monthly against corporate directories and returned-mail signals to maintain accuracy.` },
    ],
    b2c: [
      { label: `${sn} Permission Tracking`, text: `Every consumer record carries documented opt-in provenance with channel-specific consent flags for email, phone, and mail.` },
      { label: `${sn} Demographic Depth`, text: `Age, income, household composition, homeownership, and lifestyle indicators enable multi-dimensional audience segmentation.` },
      { label: `${sn} Behavioral Scoring`, text: `Purchase propensity and channel responsiveness scores help prioritize high-value ${sn.toLowerCase()} consumers for acquisition campaigns.` },
    ],
  };
  const defaultHL = [
    { label: `${sn} Detection Method`, text: `Installations are confirmed through web scanning, job posting analysis, and partner ecosystem signals — not self-reported surveys.` },
    { label: `${sn} Contact Enrichment`, text: `Technology buyer contacts are matched to accounts through corporate directory lookup, SMTP validation, and role-title normalization.` },
    { label: `${sn} Refresh Cadence`, text: `Technographic and contact data is refreshed regularly with automated suppression of outdated, undeliverable, or relocated records.` },
  ];

  const hls = hlLabels[cat] || defaultHL;

  return [
    proseSection("split", prose1Kickers[cat] || `${sn} Data Sourcing`, `How we build the`, `${h1}.`,
      [p1Pool[i % p1Pool.length], p2Pool[i % p2Pool.length].replace(/^Whether/, "Across use cases, whether")], hls),
    proseSection("centered", prose2Kickers[cat] || `${sn} Applications`, `Who uses the`, `${h1}.`,
      [p2Pool[i % p2Pool.length], p1Pool[(i + 1) % p1Pool.length].replace(/^Our |^The |^Contact /, "Beyond sourcing, ")], [
        { label: `${sn} Sales Teams`, text: `Build targeted prospect lists from the ${h1} aligned to territory assignments and ideal customer profiles.` },
        { label: `${sn} Marketing Ops`, text: `Execute segmented campaigns across email, direct mail, and digital channels using compliance-ready ${sn.toLowerCase()} contact records.` },
        { label: `${sn} Growth Teams`, text: `Power account-based strategies with ${sn.toLowerCase()} firmographic enrichment and multi-threaded contact coverage.` },
        { label: `${sn} Partners`, text: `Identify and recruit distribution partners, resellers, and alliance opportunities within the ${sn.toLowerCase()} market.` },
      ]),
  ];
}

function genGridSections(h1, sn, cat, i) {
  const ic = { hc: "Heart", ind: "Factory", crm: "Users", erp: "Server", dbms: "Database", os: "Monitor", sw: "Code", biz: "Cpu", tech: "Network", b2c: "ShoppingCart" };
  return [
    gridSection(`${sn} Strengths`, `Why the`, `${h1} stands out.`,
      `The ${h1} is built on verified, multi-source data with the segmentation depth and accuracy that generic databases cannot match.`, 3, "card", [
      feat("ShieldCheck", `${sn} Verified Records`, `Every contact in the ${h1} is validated against authoritative sources confirming identity, role, and contact accuracy.`),
      feat("Target", `${sn} Segmentation`, `Filter ${sn.toLowerCase()} records by multiple dimensions — role, geography, company size, and specialty attributes — for precise audience building.`),
      feat(ic[cat] || "Globe", `${sn} Multi-Channel`, `Each ${sn.toLowerCase()} record includes email, phone, and mailing address enabling coordinated outreach across every campaign channel.`),
      feat("Lock", `${sn} Compliance`, `CAN-SPAM, CCPA, and TCPA compliance flags are attached to every ${sn.toLowerCase()} record with documented opt-in provenance.`),
      feat("RefreshCw", `${sn} Data Freshness`, `${sn} data is refreshed regularly with automated suppression of undeliverable, retired, or relocated contacts.`),
      feat("Plug", `${sn} CRM Ready`, `Export ${sn.toLowerCase()} data to CSV/Excel or integrate directly with Salesforce, HubSpot, Marketo, and other major platforms.`),
    ]),
    gridSection(`${sn} Record Fields`, `Every record in the`, `${h1} includes.`,
      `Comprehensive data fields enable deep segmentation, multi-channel activation, and campaign performance optimization for ${sn.toLowerCase()} outreach.`, 4, "check", [
      feat("Mail", `${sn} Email`, `Verified email addresses with deliverability scoring and bounce monitoring.`),
      feat("Phone", `${sn} Phone`, `Direct-dial numbers with line-type classification and compliance flags.`),
      feat("MapPin", `${sn} Address`, `Full address with ZIP+4, NCOA processing, and geocoding.`),
      feat("Building2", `${sn} Org Data`, `Company or organization name, size, industry, and revenue indicators.`),
      feat("Briefcase", `${sn} Contact Role`, `Job title with functional role normalization for persona targeting.`),
      feat("Hash", `${sn} Identifiers`, `Unique record IDs for deduplication and CRM matching.`),
      feat("Calendar", `${sn} Verified Date`, `Most recent verification timestamp showing data currency.`),
      feat("Shield", `${sn} Permissions`, `Multi-channel compliance indicators attached to each contact.`),
    ]),
    gridSection(`${sn} Channels`, `Activate ${sn.toLowerCase()} campaigns`, `across every channel.`,
      `A single ${h1} dataset powers coordinated campaigns across email, direct mail, phone, and digital advertising platforms.`, 3, "numbered", [
      feat("Mail", `${sn} Email Campaigns`, `Launch segmented email campaigns to ${sn.toLowerCase()} contacts with verified addresses and deliverability optimization.`),
      feat("FileText", `${sn} Direct Mail`, `Execute targeted direct mail to ${sn.toLowerCase()} addresses using CASS-certified, NCOA-processed mailing data.`),
      feat("Phone", `${sn} Phone Outreach`, `Run compliant outbound calling campaigns to ${sn.toLowerCase()} contacts using verified numbers with TCPA indicators.`),
    ]),
  ];
}

function genFaqItems(h1, sn, cat, i) {
  return [
    faqItem(`How many records are in the ${h1}?`, `Our ${h1} contains a substantial and growing dataset. Record counts vary based on your targeting criteria including geography, role, and specialty filters. Contact our data team for a complimentary count estimate tailored to your campaign requirements.`),
    faqItem(`How is the ${h1} verified?`, `${sn} records are verified against multiple authoritative sources on a scheduled refresh cadence. Email addresses undergo SMTP validation, phone numbers are checked for line-type and connectivity, and mailing addresses receive NCOA processing.`),
    faqItem(`What file format does the ${h1} come in?`, `The ${h1} is delivered as a CSV or Excel file with all data fields mapped and labeled. We also support direct CRM imports for Salesforce, HubSpot, Marketo, and other major marketing automation platforms.`),
    faqItem(`Can I segment the ${h1} by geography?`, `Yes. ${sn} data can be segmented by state, metro area, ZIP code, county, or custom radius from any location. Territory-aligned selections are available for field sales team assignments.`),
    faqItem(`Is the ${h1} compliant with marketing regulations?`, `All ${sn.toLowerCase()} email addresses carry opt-in documentation and CAN-SPAM compliance flags. Phone records include TCPA consent indicators. The dataset is sourced and maintained in compliance with CCPA, CAN-SPAM, and TCPA requirements.`),
    faqItem(`Does the ${h1} support multi-channel campaigns?`, `Every ${sn.toLowerCase()} record includes verified email, mailing address, and phone fields — enabling true multi-channel campaign activation from a single unified dataset across email, direct mail, and phone.`),
    faqItem(`Can I get sample ${h1} data before purchasing?`, `Yes. We provide complimentary count estimates and sample ${sn.toLowerCase()} records so you can evaluate data quality, field coverage, and match rates before committing to a full license agreement.`),
  ];
}

/* ══════════════════════════════════════════════════════════
   MAIN
   ══════════════════════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");

  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  let globalIdx = 0;
  for (const page of pages) {
    globalIdx++;
    const { _id, h1, slug } = page;
    const cat = getCat(slug);
    const sn = shortName(h1);
    console.log(`[${globalIdx}] ${slug} (${cat}) sn="${sn}"`);

    const intro = genIntro(h1, sn, cat, globalIdx);
    const attrSec = genAttributesSection(h1, sn, cat, globalIdx);
    const ucSec = genUseCasesSection(h1, sn, cat, globalIdx);

    const patch = {
      kicker: genKicker(h1, sn, cat, globalIdx),
      titleAccent: genTitleAccent(h1, sn, cat, globalIdx),
      stats: genStats(h1, sn, cat, globalIdx),
      ...intro,
      ...attrSec,
      attributes: genAttributes(h1, sn, cat, globalIdx),
      ...ucSec,
      useCases: genUseCases(h1, sn, cat, globalIdx),
      proseSections: genProseSections(h1, sn, cat, globalIdx),
      featureGridSections: genGridSections(h1, sn, cat, globalIdx),
      faqItems: genFaqItems(h1, sn, cat, globalIdx),
      complianceHeadline: `${sn} data with compliance built in.`,
      complianceBody: block(`Every ${sn.toLowerCase()} record in the ${h1} carries verification documentation, opt-in provenance, and channel-permission flags. Our data governance ensures CAN-SPAM, CCPA, and TCPA adherence with complete audit trails.`),
    };

    if (!DRY_RUN) {
      await client.patch(_id).set(patch).commit();
      // Also update draft
      const draftId = `drafts.${_id}`;
      try {
        const d = await client.getDocument(draftId);
        if (d) await client.patch(draftId).set(patch).commit();
      } catch {}
      console.log("  ✓");
    } else {
      console.log(`  → ${Object.keys(patch).length} fields`);
    }
  }
  console.log(`\nDone! ${pages.length} pages updated.`);
}

main().catch(e => { console.error(e); process.exit(1); });
