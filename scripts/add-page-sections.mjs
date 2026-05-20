/**
 * Migration: Add new content sections (featureGridSections + faqItems)
 * to B2B Database, B2C Database, Audience Targeting, Data Enrichment,
 * Signal Exchange, Data Activation, and Cost Per Lead pages.
 *
 * Also ensures Lorann brand is mentioned 2–3 times naturally in each page's
 * existing intro/hero content for brand consistency.
 *
 * Usage:
 *   $env:SANITY_WRITE_TOKEN = "sk..."; node scripts/add-page-sections.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { randomUUID } from "crypto";

// Load .env.local if present
try {
  const envPath = resolve(process.cwd(), ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {}

const writeToken = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!writeToken) {
  console.error("No token found. Set SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: writeToken,
  useCdn: false,
});

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

// ─── Helper: portable text block ─────────────────────────
function pt(text) {
  return [
    {
      _type: "block",
      _key: key(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: key(), text, marks: [] }],
    },
  ];
}

function feat(icon, title, desc) {
  return { _key: key(), _type: "featureItem", icon, title, desc: pt(desc) };
}

function faq(question, answer) {
  return { _key: key(), _type: "faqItem", question, answer: pt(answer) };
}

function gridSection(kicker, titlePlain, titleAccent, description, columns, style, features) {
  return {
    _key: key(),
    _type: "featureGridSection",
    kicker,
    titlePlain,
    titleAccent,
    description: description ? pt(description) : undefined,
    columns: columns || 3,
    style: style || "card",
    features,
  };
}

// ══════════════════════════════════════════════════════════
// PAGE CONTENT DEFINITIONS
// ══════════════════════════════════════════════════════════

const PAGES = {};

// ── 1. B2B DATABASE ──────────────────────────────────────
PAGES["data-assets/b2b-database"] = {
  featureGridSections: [
    gridSection(
      "Key Capabilities",
      "Features of the",
      "B2B Database.",
      "Lorann's B2B Database is engineered for precision outreach across healthcare, technology, and industry verticals — delivering verified contacts that drive measurable campaign performance.",
      3, "card",
      [
        feat("Database", "Multi-Channel Contact Records", "Every record includes email, phone, postal, and LinkedIn data so your team can activate across any channel without additional enrichment."),
        feat("ShieldCheck", "NCOA & CASS Verified", "All postal records are validated through National Change of Address and Coding Accuracy Support System processing for deliverability."),
        feat("RefreshCw", "Quarterly Refresh Cycle", "Lorann refreshes the full B2B universe every 90 days — removing bounces, updating job titles, and verifying company-level firmographics."),
        feat("Filter", "500+ Selectable Segments", "Filter by SIC/NAICS code, job function, company revenue, employee count, technology installed, geography, and hundreds of additional attributes."),
        feat("Zap", "Activation-Ready Formats", "Data is delivered in CSV, custom flat-file, or direct API feed — formatted for immediate ingestion into your ESP, CRM, or DSP."),
        feat("Target", "Account-Level Targeting", "Build account-based marketing lists by pairing firmographic data with contact-level attributes for precision ABM campaigns."),
      ]
    ),
    gridSection(
      "Data Fields",
      "Attributes included in",
      "every B2B record.",
      "Lorann's B2B records carry deep data points across contact, company, and technology dimensions — giving your team the segmentation depth to build campaigns that convert.",
      4, "card",
      [
        feat("Users", "Full Name & Title", "First name, last name, job title, job function, seniority level, and department — mapped to a standardized title taxonomy."),
        feat("Mail", "Verified Email", "Business email addresses validated through multi-step verification including MX lookup, syntax check, and deliverability scoring."),
        feat("Phone", "Direct Dial & Mobile", "Direct-dial phone numbers and mobile numbers where available — essential for outbound sales and call-center activation."),
        feat("Building2", "Company Firmographics", "Company name, headquarters address, revenue range, employee count, year founded, public/private status, and parent/subsidiary linkage."),
        feat("Layers", "SIC & NAICS Codes", "Primary and secondary industry classification codes for precise vertical targeting across 1,000+ industry segments."),
        feat("Database", "Technology Install Data", "Technology stack data including CRM, ERP, marketing automation, cloud platforms, and 8,000+ software products tracked by Lorann."),
        feat("MapPin", "Full Postal Address", "Street address, city, state, ZIP, ZIP+4, county, metro area, and congressional district — all CASS and NCOA certified."),
        feat("Linkedin", "Social & Web Presence", "LinkedIn profile URLs, company website, and social media handles where available for multi-touch engagement strategies."),
      ]
    ),
    gridSection(
      "The Lorann Difference",
      "Why choose Lorann's",
      "B2B Database?",
      "Not all B2B data is created equal. Lorann combines proprietary sourcing, rigorous verification, and deep vertical expertise to deliver a contact universe that outperforms commodity data providers.",
      3, "check",
      [
        feat("Check", "Proprietary Sourcing", "Our data is sourced through direct partnerships, registration data, public filings, and opt-in channels — never scraped or aggregated from low-quality sources."),
        feat("Check", "95%+ Email Deliverability", "Multi-step verification ensures industry-leading deliverability rates, reducing bounce costs and protecting your sender reputation."),
        feat("Check", "Vertical Depth", "Unlike horizontal data vendors, Lorann maintains deep specialty databases in Healthcare, Technology, and key Industry verticals with granular segmentation."),
        feat("Check", "Flexible Licensing", "Choose between per-record licensing, annual subscriptions, or custom data-as-a-service arrangements tailored to your campaign volume."),
        feat("Check", "Dedicated Support", "Every Lorann client works with a named data strategist who understands your vertical and helps optimize list selection for campaign performance."),
        feat("Check", "Compliance Built In", "All Lorann data is collected and maintained in accordance with CAN-SPAM, CCPA, TCPA, and applicable data protection regulations."),
      ]
    ),
    gridSection(
      "Industries & Use Cases",
      "Who can use",
      "our B2B Database?",
      "Lorann's B2B Database serves marketing, sales, and operations teams across industries that depend on accurate contact data for revenue growth.",
      3, "card",
      [
        feat("Briefcase", "B2B Marketers & Agencies", "Demand generation teams, ABM practitioners, and marketing agencies who need verified contact lists for email, direct mail, and digital campaigns."),
        feat("LineChart", "Sales & Revenue Teams", "SDR/BDR teams, enterprise sales organizations, and channel partners who rely on accurate contact data for outbound prospecting and pipeline building."),
        feat("Stethoscope", "Healthcare & Life Sciences", "Pharma marketers, medical device companies, and health IT vendors targeting HCPs, hospital administrators, and payer decision-makers."),
        feat("Database", "Technology Vendors", "SaaS companies, managed service providers, and IT consultants targeting technology buyers by installed software, platform, or infrastructure."),
        feat("Users", "Staffing & Recruiting", "Recruiting firms and HR technology companies who need to reach hiring managers, CHROs, and department heads across specific industries."),
        feat("Building2", "Financial Services", "Banks, insurance carriers, fintech companies, and wealth management firms targeting CFOs, controllers, and financial decision-makers."),
      ]
    ),
    gridSection(
      "Data Governance",
      "Compliance &",
      "data governance.",
      "Lorann maintains rigorous data governance standards across sourcing, processing, and delivery — ensuring every record meets regulatory and ethical standards.",
      3, "check",
      [
        feat("ShieldCheck", "CAN-SPAM Compliant", "All email records include opt-out suppression processing and comply with CAN-SPAM Act requirements for commercial messaging."),
        feat("ShieldCheck", "CCPA & State Privacy", "Lorann honors California Consumer Privacy Act requests and maintains processes for all emerging state-level privacy regulations."),
        feat("ShieldCheck", "TCPA Adherence", "Phone records include DNC registry scrubbing and TCPA consent indicators for compliant telemarketing outreach."),
        feat("ShieldCheck", "SOC 2 Aligned Practices", "Data handling follows SOC 2 Type II aligned security controls including encryption at rest and in transit, access controls, and audit logging."),
        feat("ShieldCheck", "Data Retention Policy", "Records are retained only for the licensed period, with verified destruction processes for expired or withdrawn-consent data."),
        feat("ShieldCheck", "Regular Audit Cadence", "Lorann conducts quarterly internal data quality audits and annual third-party compliance reviews across the full data supply chain."),
      ]
    ),
  ],
  faqItems: [
    faq("How many B2B contacts does Lorann's database include?", "Lorann's B2B Database includes over 80 million verified business contacts across Healthcare, Technology, and 10+ industry verticals — each record carrying email, phone, postal, and firmographic data points."),
    faq("How often is the B2B data updated?", "The full B2B universe is refreshed quarterly. Email deliverability checks run continuously, and firmographic data (company size, revenue, industry codes) is updated as changes are detected through our sourcing network."),
    faq("Can I filter by specific job titles or industries?", "Yes. Lorann supports 500+ selectable segments including job title, job function, seniority level, SIC/NAICS code, company revenue, employee size, geography, technology installed, and many more attributes."),
    faq("What formats is the data delivered in?", "Data can be delivered as CSV, custom flat-file, or via direct API integration. We format files for immediate ingestion into your ESP, CRM, DSP, or marketing automation platform."),
    faq("Is Lorann's B2B data compliant with privacy regulations?", "Yes. All Lorann data is sourced and maintained in compliance with CAN-SPAM, CCPA, TCPA, and applicable state-level privacy laws. We perform DNC scrubbing, opt-out suppression, and honor all data subject requests."),
    faq("What's the minimum order or licensing commitment?", "Lorann offers flexible licensing models including per-record, project-based, and annual unlimited-use arrangements. Contact our team for a custom quote based on your targeting criteria and campaign volume."),
  ],
};

// ── 2. B2C DATABASE ──────────────────────────────────────
PAGES["data-assets/b2c-database"] = {
  featureGridSections: [
    gridSection(
      "Key Capabilities",
      "Features of the",
      "B2C Database.",
      "Lorann's B2C Database captures consumer intent, demographics, and lifestyle signals across ten vertical categories — purpose-built for direct response, acquisition, and retention campaigns.",
      3, "card",
      [
        feat("Users", "Identity-Resolved Records", "Every consumer record is identity-resolved with name, postal address, email, and phone — enabling true multi-channel activation from a single source."),
        feat("Activity", "Behavioral & Lifestyle Data", "In-market signals, purchase propensity scores, lifestyle interests, and media consumption data enrich every record beyond basic demographics."),
        feat("Target", "Life-Event Targeting", "Reach consumers at pivotal moments — new movers, new homeowners, expecting parents, recent retirees, and other high-intent life-stage transitions."),
        feat("RefreshCw", "Monthly Refresh Cycle", "Lorann refreshes consumer records monthly, validating addresses through NCOA, updating phone/email deliverability, and refreshing behavioral signals."),
        feat("MapPin", "National Coverage", "Full U.S. coverage across all 50 states with address-level precision — from dense metro areas to rural and suburban geographies."),
        feat("Filter", "400+ Selectable Attributes", "Segment by age, income, home value, vehicle ownership, health interests, education level, ethnicity, and hundreds of additional consumer dimensions."),
      ]
    ),
    gridSection(
      "Data Fields",
      "Attributes included in",
      "every B2C record.",
      "Lorann's consumer records are built for the segmentation depth that modern marketers need — from demographic basics to behavioral and psychographic layers.",
      4, "card",
      [
        feat("Users", "Demographics", "Age, gender, marital status, presence of children, household income, education level, occupation, and ethnicity — all modeled at the individual or household level."),
        feat("Building2", "Home & Property", "Home ownership status, home value, dwelling type, length of residence, mortgage information, and property characteristics for real estate and home services campaigns."),
        feat("Car", "Vehicle Data", "Vehicle make, model, year, fuel type, and purchase timeline — essential for automotive, insurance, and transportation-related marketing."),
        feat("Activity", "Lifestyle Interests", "Interests in travel, fitness, cooking, gardening, pets, outdoor recreation, technology, investing, and 200+ additional lifestyle categories."),
        feat("LineChart", "Purchase Propensity", "Modeled scores for likelihood to purchase across categories including financial products, insurance, home improvement, health & wellness, and education."),
        feat("Mail", "Email & Phone", "Verified consumer email addresses and phone numbers (landline and mobile) with deliverability and contact-ability indicators."),
        feat("MapPin", "Full Postal Address", "CASS-certified and NCOA-processed addresses with ZIP+4, carrier route, county, metro area, and congressional district data."),
        feat("HeartPulse", "Health & Wellness", "Self-reported health interests, condition awareness indicators, and wellness-related behavioral signals — compliant with all applicable health data regulations."),
      ]
    ),
    gridSection(
      "The Lorann Advantage",
      "Why choose Lorann's",
      "B2C Database?",
      "Lorann's consumer data goes beyond commodity demographic files — delivering behavioral depth, multi-channel readiness, and the compliance framework that modern campaigns require.",
      3, "check",
      [
        feat("Check", "Beyond Demographics", "While most consumer data vendors stop at age and income, Lorann layers in behavioral signals, purchase propensity, and life-event triggers that drive response rates."),
        feat("Check", "True Multi-Channel", "Every record is built for activation across email, direct mail, phone, and digital — eliminating the need to license separate files for each channel."),
        feat("Check", "Privacy-First Architecture", "Lorann's consumer data is sourced through opt-in channels and public records, with full CAN-SPAM, CCPA, and TCPA compliance baked into every record."),
        feat("Check", "Response-Optimized", "Lorann's data has been proven across thousands of campaigns — our clients consistently see 15–30% higher response rates compared to standard consumer files."),
        feat("Check", "Flexible Licensing", "License data by record count, by geography, or through annual unlimited-use arrangements — we structure deals around your campaign economics."),
        feat("Check", "Named Data Strategist", "Every Lorann client is assigned a dedicated data strategist who helps optimize targeting, recommends segments, and monitors campaign performance."),
      ]
    ),
    gridSection(
      "Industries & Use Cases",
      "Who can use",
      "our B2C Database?",
      "Lorann's B2C Database serves acquisition, retention, and re-engagement teams across consumer-facing industries that depend on precision targeting.",
      3, "card",
      [
        feat("Building2", "Real Estate & Mortgage", "Reach new movers, pre-movers, homeowners by equity range, and renters likely to buy — with property and financial attributes for precision targeting."),
        feat("Car", "Automotive & Dealers", "Target in-market auto shoppers by make/model preference, current vehicle age, lease expiration, and purchase timeline for service, sales, and F&I campaigns."),
        feat("HeartPulse", "Healthcare & Wellness", "Reach health-conscious consumers, condition-aware audiences, and wellness buyers with compliant, opt-in consumer health data."),
        feat("LineChart", "Financial Services", "Target consumers by investment propensity, insurance renewal timing, credit profile indicators, and life events like retirement or home purchase."),
        feat("Sparkles", "Retail & E-commerce", "Identify high-value consumer segments by purchase behavior, brand affinity, channel preference, and seasonal buying patterns."),
        feat("Users", "Education & EdTech", "Reach prospective students, parents of college-bound teens, and continuing education prospects by education level, career stage, and interest indicators."),
      ]
    ),
    gridSection(
      "Data Governance",
      "Compliance &",
      "data governance.",
      "Lorann's consumer data program is built on a foundation of regulatory compliance, ethical sourcing, and transparent data practices.",
      3, "check",
      [
        feat("ShieldCheck", "CAN-SPAM Compliant", "All consumer email addresses are opted-in for commercial communication, with full suppression processing and unsubscribe infrastructure."),
        feat("ShieldCheck", "CCPA Rights Honored", "Lorann maintains a real-time CCPA request-processing system for consumer data access, deletion, and opt-out requests."),
        feat("ShieldCheck", "TCPA Phone Compliance", "All consumer phone records include DNC registry scrubbing, wireless identification, and TCPA consent indicators."),
        feat("ShieldCheck", "Ethical Sourcing", "Consumer data is sourced exclusively through opt-in registration, public records, and authorized data partnerships — never scraped or harvested."),
        feat("ShieldCheck", "Data Minimization", "Lorann collects only the data attributes needed for marketing activation — no sensitive financial account numbers, SSNs, or protected health information."),
        feat("ShieldCheck", "Transparent Practices", "Our data sourcing, processing, and retention policies are documented and available for client review as part of our compliance commitment."),
      ]
    ),
  ],
  faqItems: [
    faq("How many consumer records does Lorann's B2C database contain?", "Lorann's B2C Database covers over 250 million U.S. consumer records across ten vertical categories including real estate, automotive, healthcare, financial services, retail, and more."),
    faq("How frequently is consumer data updated?", "Consumer records are refreshed monthly. Postal addresses undergo NCOA processing, email and phone deliverability are re-validated, and behavioral and lifestyle signals are updated through Lorann's continuous sourcing network."),
    faq("Can I target consumers by life events?", "Yes. Lorann tracks life-event triggers including new movers, new homeowners, new parents, recent retirees, lease expirations, and other high-intent moments that drive campaign response."),
    faq("Is Lorann's consumer data compliant with CCPA?", "Yes. Lorann honors all CCPA data subject requests and maintains real-time processing for access, deletion, and opt-out requests. Our consumer data is sourced through opt-in channels and public records."),
    faq("What channels can I activate B2C data across?", "Every Lorann consumer record is built for multi-channel activation including email, direct mail, outbound phone, and digital/programmatic — all from a single licensed file."),
    faq("How is Lorann's B2C data different from other consumer files?", "Lorann goes beyond basic demographics by layering behavioral signals, purchase propensity scores, and life-event triggers into every record — delivering 15–30% higher response rates compared to standard consumer files."),
  ],
};

// ── 3. AUDIENCE TARGETING ────────────────────────────────
PAGES["solutions/audience-targeting"] = {
  featureGridSections: [
    gridSection(
      "The Quality Imperative",
      "Why audience quality outperforms",
      "audience size.",
      "Bigger lists do not mean better results. Lorann builds audiences where every record is verified, segmented, and aligned to your campaign goals — because precision drives performance, not volume.",
      3, "check",
      [
        feat("Check", "Lower Cost Per Acquisition", "Precisely targeted audiences reduce wasted impressions and unqualified leads, driving down your effective cost per acquisition across every channel."),
        feat("Check", "Higher Engagement Rates", "When your audience matches your ideal customer profile, open rates, click-through rates, and conversion rates all improve — Lorann clients typically see 20–40% lifts."),
        feat("Check", "Sender Reputation Protection", "High-quality, verified audiences mean fewer bounces and spam complaints — protecting your domain reputation and long-term deliverability."),
      ]
    ),
    gridSection(
      "Segmentation Depth",
      "Targeting dimensions",
      "we use.",
      "Lorann builds audiences using multi-dimensional segmentation across firmographic, demographic, behavioral, intent, and technographic layers — giving your campaigns surgical precision.",
      4, "card",
      [
        feat("Building2", "Firmographic", "Company size, revenue, industry (SIC/NAICS), geography, ownership structure, and growth indicators for B2B audience construction."),
        feat("Users", "Demographic", "Job title, seniority, function, department, and individual-level demographics for contact-level targeting within accounts."),
        feat("Activity", "Behavioral & Intent", "Online research patterns, content consumption signals, software evaluation activity, and purchase-intent indicators from Lorann's Signal eXchange™."),
        feat("Database", "Technographic", "Installed technology, platform preferences, contract renewal timelines, and IT spending patterns for technology-buyer targeting."),
        feat("HeartPulse", "Healthcare Specialty", "NPI-verified specialties, prescribing patterns, hospital affiliations, practice setting, and payer mix for HCP targeting."),
        feat("MapPin", "Geographic", "National, regional, state, DMA, MSA, ZIP code, radius, and congressional district targeting for geo-focused campaigns."),
        feat("LineChart", "Propensity Scoring", "Modeled scores predicting likelihood to purchase, switch vendors, expand contracts, or respond to specific offer types."),
        feat("Sparkles", "Custom Attributes", "Lorann can source and append custom attributes specific to your vertical or campaign — from association memberships to certification status."),
      ]
    ),
    gridSection(
      "Custom vs. Off-the-Shelf",
      "Custom audience development vs.",
      "off-the-shelf lists.",
      "Off-the-shelf lists give you what the vendor already has. Lorann's custom audience development builds what your campaign actually needs — sourced, verified, and segmented to your specifications.",
      2, "card",
      [
        feat("SlidersHorizontal", "Custom Audiences by Lorann", "Sourced to your ICP definition. Multi-attribute segmentation. Verified and deduplicated against your suppression file. Refreshed on your schedule. Delivered in your preferred format with a named strategist managing the build."),
        feat("Database", "Off-the-Shelf Lists", "Pre-built segments with generic filters. Limited attribute depth. No deduplication against your house file. Static data with unknown refresh dates. Self-service with no strategic guidance on selection optimization."),
      ]
    ),
    gridSection(
      "Vertical Expertise",
      "Industries",
      "we serve.",
      "Lorann's audience targeting capabilities span the verticals where data quality matters most — and where generic data vendors consistently fall short.",
      3, "card",
      [
        feat("Stethoscope", "Healthcare & Life Sciences", "HCP targeting by NPI, specialty, prescribing patterns, and hospital affiliation. Payer and health system decision-maker audiences for enterprise health IT sales."),
        feat("Database", "Technology & SaaS", "Technology buyer audiences segmented by installed software, IT budget, cloud maturity, and contract renewal timing across 8,000+ tracked products."),
        feat("LineChart", "Financial Services", "CFO, controller, and treasury audiences for fintech. Wealth management prospect lists. Insurance buyer audiences by line of business and renewal cycle."),
        feat("Building2", "Manufacturing & Industrial", "Plant managers, procurement directors, and operations leaders across discrete and process manufacturing — segmented by output type and facility size."),
        feat("Users", "Professional Services", "Partners, principals, and practice leaders at law firms, accounting firms, consulting firms, and staffing agencies — filterable by firm revenue and specialty."),
        feat("Briefcase", "B2B Services & SaaS", "Marketing, sales, and IT decision-makers at mid-market and enterprise companies — built for demand generation and ABM programs."),
      ]
    ),
    gridSection(
      "Data Freshness",
      "Audience refresh &",
      "maintenance.",
      "Audience data decays fast — Lorann's refresh and maintenance programs keep your targeting current, deliverable, and performance-ready throughout your campaign lifecycle.",
      3, "check",
      [
        feat("RefreshCw", "Quarterly Full Refresh", "Every audience built by Lorann is refreshed quarterly with updated contact information, job title changes, company moves, and new firmographic data."),
        feat("Check", "Continuous Email Verification", "Email deliverability is monitored continuously, with bounced addresses removed and replacements sourced between scheduled refresh cycles."),
        feat("Check", "Suppression File Processing", "Your suppression files are processed against every delivery and refresh, ensuring you never pay to reach contacts already in your CRM or opt-out list."),
      ]
    ),
    gridSection(
      "Integration Ready",
      "How Lorann audiences plug",
      "into your stack.",
      "Lorann delivers audiences in the format your platforms need — no reformatting, no manual import gymnastics, no waiting for IT to build a connector.",
      3, "card",
      [
        feat("Mail", "Email & ESP", "Pre-formatted files for Salesforce Marketing Cloud, HubSpot, Marketo, Klaviyo, Mailchimp, and other ESPs — with field mapping included."),
        feat("Database", "CRM & CDP", "Direct import files for Salesforce CRM, HubSpot CRM, Microsoft Dynamics, and customer data platforms — including lead source and campaign tagging."),
        feat("Zap", "DSP & Programmatic", "Hashed audience files for LiveRamp, The Trade Desk, DV360, and Meta Custom Audiences — enabling programmatic activation within hours."),
      ]
    ),
    gridSection(
      "Data Governance",
      "Compliance &",
      "data governance.",
      "Every Lorann audience is built on a compliance-first foundation — from sourcing through delivery and suppression.",
      3, "check",
      [
        feat("ShieldCheck", "CAN-SPAM Compliant", "All email-targeted audiences include opt-out suppression and comply with CAN-SPAM requirements for commercial email."),
        feat("ShieldCheck", "CCPA Honored", "Lorann processes all CCPA consumer requests and ensures no opted-out records appear in audience deliveries."),
        feat("ShieldCheck", "TCPA Adherence", "Phone-targeted audiences include DNC scrubbing and TCPA consent indicators for compliant telemarketing outreach."),
      ]
    ),
  ],
  faqItems: [
    faq("How long does it take Lorann to build a custom audience?", "Most custom audiences are delivered within 3–5 business days from brief approval. Complex builds involving custom sourcing or multi-step enrichment may take 7–10 business days."),
    faq("What's the minimum audience size?", "Lorann does not impose strict minimums — we build audiences based on your targeting criteria. Typical campaign audiences range from 5,000 to 5 million records depending on the vertical and use case."),
    faq("Can I use Lorann audiences across multiple campaigns?", "Yes. Lorann offers 12-month unlimited-use licensing for most audience products, allowing repeated use across email, direct mail, phone, and digital campaigns throughout the license period."),
    faq("How does Lorann handle audience deduplication?", "We deduplicate against your existing customer file, suppression list, and any other exclusion files you provide — so you only pay for net-new prospects that aren't already in your database."),
    faq("What industries does Lorann have the deepest data for?", "Lorann maintains deep vertical expertise in Healthcare, Technology, Financial Services, Manufacturing, and Professional Services — with specialty databases and dedicated data strategists for each."),
    faq("Can I preview data before licensing?", "Yes. Lorann provides sample records and count estimates based on your targeting criteria before you commit to a license — so you can validate fit before investing."),
  ],
};

// ── 4. DATA ENRICHMENT ───────────────────────────────────
PAGES["solutions/data-enrichment"] = {
  featureGridSections: [
    gridSection(
      "The Impact",
      "What data enrichment",
      "actually changes.",
      "Enrichment is not about adding columns to a spreadsheet — it is about transforming incomplete records into actionable intelligence that drives campaign performance. Lorann's enrichment process fills the gaps that prevent your data from converting.",
      3, "card",
      [
        feat("Target", "Better Targeting Precision", "Enriched records carry the attributes you need to segment precisely — so your campaigns reach the right audience instead of a broad, poorly defined list."),
        feat("Mail", "Higher Deliverability", "Validated and appended email addresses, phone numbers, and postal addresses reduce bounces and wasted outreach spend by up to 40%."),
        feat("LineChart", "Stronger Lead Scoring", "Appended firmographic, technographic, and intent attributes feed your lead-scoring models with the data points they need to rank prospects accurately."),
        feat("Users", "Complete Customer Profiles", "Lorann fills in missing fields — title, company size, industry, technology stack, and contact details — so your CRM reflects reality, not partial records."),
        feat("RefreshCw", "Reduced Data Decay", "B2B contact data decays at 30%+ annually. Regular enrichment by Lorann keeps your database current and prevents campaign performance from degrading over time."),
        feat("Zap", "Faster Time to Activation", "Enriched data is campaign-ready on delivery — formatted, deduplicated, and validated so your team can activate immediately without manual cleanup."),
      ]
    ),
    gridSection(
      "Our Process",
      "How the enrichment",
      "process works.",
      "Lorann follows a structured five-step enrichment workflow that ensures accuracy, completeness, and compliance at every stage — from file intake to delivery.",
      3, "numbered",
      [
        feat("Search", "File Intake & Analysis", "Your data file is ingested and analyzed for completeness, accuracy, and match potential. Lorann identifies missing fields, stale records, and enrichment opportunities across every record."),
        feat("Database", "Match & Append", "Records are matched against Lorann's 80M+ B2B and 250M+ B2C universes using deterministic and probabilistic matching — appending missing attributes at industry-leading match rates."),
        feat("ShieldCheck", "Validation & Verification", "Every appended data point is validated through multi-source verification. Email addresses are deliverability-tested, phone numbers are DNC-scrubbed, and addresses are NCOA-processed."),
        feat("Filter", "Deduplication & Hygiene", "The enriched file is deduplicated, standardized, and cleansed — removing duplicates, correcting formatting inconsistencies, and flagging records that fail quality checks."),
        feat("Zap", "Formatted Delivery", "The final enriched file is delivered in your preferred format — CSV, CRM-ready, or via API — with field mapping documentation and a match-rate summary report."),
        feat("RefreshCw", "Ongoing Maintenance", "Lorann offers scheduled re-enrichment cycles (monthly, quarterly, or custom) to keep your database current as contacts change jobs, companies grow, and new data becomes available."),
      ]
    ),
    gridSection(
      "Attribute Coverage",
      "Data attributes Lorann",
      "can append.",
      "Lorann enriches across the full spectrum of B2B and B2C data attributes — from basic contact details to advanced behavioral and technology signals.",
      4, "card",
      [
        feat("Users", "Contact Details", "Email, direct-dial phone, mobile, and postal address — validated and deliverability-scored for immediate activation."),
        feat("Building2", "Firmographics", "Company name, revenue, employee count, industry codes (SIC/NAICS), headquarters location, ownership type, and subsidiary linkage."),
        feat("Briefcase", "Job-Level Attributes", "Job title, function, seniority, department, and decision-making authority — standardized to a consistent taxonomy."),
        feat("Database", "Technographics", "Installed software, cloud platforms, CRM/ERP systems, marketing tools, and contract renewal indicators across 8,000+ tracked products."),
        feat("Activity", "Intent Signals", "Online research activity, content consumption patterns, software evaluation behavior, and in-market indicators from Signal eXchange™."),
        feat("HeartPulse", "Healthcare Attributes", "NPI numbers, medical specialty, prescribing volume, hospital affiliations, and practice setting for HCP records."),
        feat("LineChart", "Propensity Scores", "Modeled scores for purchase likelihood, technology adoption, vendor switching, and campaign response across key product categories."),
        feat("MapPin", "Geographic Enrichment", "ZIP+4, carrier route, county FIPS, metro area, DMA, congressional district, and latitude/longitude for geo-targeting and analytics."),
      ]
    ),
    gridSection(
      "Healthcare Focus",
      "Enrichment for",
      "healthcare data.",
      "Healthcare data has unique enrichment requirements — from NPI validation to specialty mapping. Lorann maintains a dedicated healthcare data team with deep domain expertise.",
      3, "card",
      [
        feat("Stethoscope", "NPI Verification", "Every healthcare provider record is validated against the NPI Registry with specialty codes, taxonomy classifications, and license status verification."),
        feat("Pill", "Prescribing Data Overlay", "Lorann can append prescribing volume indicators and therapeutic category focus to HCP records for pharmaceutical and medical device targeting."),
        feat("Building2", "Facility & Affiliation", "Hospital affiliations, practice group memberships, health system linkage, and facility-level attributes including bed count and trauma designation."),
      ]
    ),
    gridSection(
      "Refresh Cadence",
      "How often Lorann enriches",
      "and why.",
      "Data decay is the silent killer of campaign performance. Lorann's enrichment programs run on a cadence that keeps your data ahead of the decay curve.",
      3, "check",
      [
        feat("RefreshCw", "Monthly Email Re-validation", "Email deliverability is re-checked monthly — bounced addresses are removed and replacement contacts are sourced where available."),
        feat("Check", "Quarterly Full Re-enrichment", "All appended attributes are refreshed quarterly — job titles, company data, technology installs, and intent signals are all updated against Lorann's latest universe."),
        feat("Check", "Annual Deep Cleanse", "A comprehensive annual review removes permanently undeliverable records, merges duplicates created by company acquisitions, and re-benchmarks match rates."),
      ]
    ),
  ],
  faqItems: [
    faq("What match rates can I expect from Lorann's enrichment?", "Match rates vary by data quality and record type, but Lorann typically achieves 60–85% match rates for B2B records and 70–90% for B2C records. We provide a match-rate estimate before you commit to enrichment."),
    faq("Can Lorann enrich my existing CRM data?", "Yes. Lorann accepts data files exported from any CRM — Salesforce, HubSpot, Microsoft Dynamics, and others. We match, enrich, and return the file in a format ready for re-import."),
    faq("How long does an enrichment project take?", "Standard enrichment projects are delivered within 5–7 business days from file receipt. Rush delivery (2–3 days) is available for time-sensitive campaigns."),
    faq("Does enrichment include email verification?", "Yes. Every email address appended by Lorann goes through multi-step verification including MX lookup, syntax validation, and deliverability scoring — ensuring 95%+ inbox placement rates."),
    faq("Is enriched data compliant with privacy regulations?", "All Lorann enrichment is performed in compliance with CAN-SPAM, CCPA, TCPA, and applicable data protection laws. We only append data from verified, compliant sources."),
    faq("What if my match rate is lower than expected?", "If match rates fall below our pre-enrichment estimate, Lorann will work with your team to identify additional matching strategies or apply credit toward a future enrichment project."),
  ],
};

// ── 5. SIGNAL EXCHANGE ───────────────────────────────────
PAGES["solutions/signal-exchange"] = {
  featureGridSections: [
    gridSection(
      "The Difference",
      "What makes Signal eXchange™ different",
      "from standard lead data?",
      "Standard lead databases are static — compiled once and sold repeatedly until the data decays. Signal eXchange™ by Lorann is a continuously evolving dataset that combines first-party lead data with real-time intent and behavioral signals.",
      3, "card",
      [
        feat("Zap", "First-Party Foundation", "Signal eXchange™ is built on verified first-party lead data — not aggregated, scraped, or modeled from third-party sources. Every record originates from a real engagement."),
        feat("Activity", "Intent Signal Overlay", "Lorann layers online research patterns, content consumption behavior, and software evaluation signals onto every record — so you know who is actively in-market."),
        feat("RefreshCw", "Continuously Refreshed", "Unlike static databases, Signal eXchange™ is updated continuously as new leads enter the system, intent signals evolve, and stale records are retired."),
        feat("Target", "Vertical Specificity", "Signal eXchange™ data is organized by vertical — Healthcare, Technology, Financial Services, and more — with industry-specific attributes that generic data vendors cannot provide."),
        feat("Layers", "Activation-Ready", "Every Signal eXchange™ record is formatted for immediate activation across email, phone, CRM, and programmatic channels — no additional enrichment required."),
        feat("ShieldCheck", "Governance Built In", "Consent indicators, opt-out processing, and regulatory compliance are embedded at the record level — not applied as an afterthought."),
      ]
    ),
    gridSection(
      "Dataset Construction",
      "How the",
      "dataset is built.",
      "Signal eXchange™ is not purchased — it is constructed through Lorann's proprietary multi-source ingestion, verification, and signal-layering process.",
      3, "numbered",
      [
        feat("Search", "Source Ingestion", "First-party lead data is ingested from verified registration sources, opt-in channels, and direct data partnerships — forming the foundation of every Signal eXchange™ record."),
        feat("ShieldCheck", "Verification Layer", "Every record passes through multi-step identity verification — confirming name, company, title, email deliverability, and phone reachability before entering the dataset."),
        feat("Activity", "Intent Signal Mapping", "Lorann maps online behavioral signals — content downloads, search patterns, software evaluations, and website engagement — to verified contact records."),
        feat("Layers", "Attribute Enrichment", "Records are enriched with firmographic, technographic, and healthcare-specific attributes from Lorann's master data universe."),
        feat("Filter", "Quality Scoring", "Each record receives a composite quality score based on recency, verification status, intent strength, and attribute completeness — giving your team a clear activation priority."),
        feat("Zap", "Continuous Refresh", "New leads enter Signal eXchange™ daily. Stale records are retired on a rolling basis. Intent signals are recalculated weekly to reflect current market behavior."),
      ]
    ),
    gridSection(
      "Signal Coverage",
      "Intent signal types",
      "Lorann tracks.",
      "Signal eXchange™ captures a broad spectrum of intent signals that indicate active purchasing behavior across B2B and healthcare verticals.",
      3, "card",
      [
        feat("Search", "Content Consumption", "Tracks downloads of white papers, case studies, industry reports, and educational content that signal category-level or product-level interest."),
        feat("Database", "Software Evaluation", "Monitors activity on software review platforms, comparison sites, and vendor evaluation pages to identify prospects actively researching solutions."),
        feat("LineChart", "Competitive Research", "Detects when prospects are actively researching competitors in your space — giving your sales team a window to engage before decisions are made."),
        feat("Activity", "Topic Surge Detection", "Identifies when a company or buying group shows a sudden spike in research activity around a specific topic, technology, or business challenge."),
        feat("Briefcase", "Job-Change Signals", "Tracks when key decision-makers change roles or companies — a proven trigger for technology re-evaluation and new vendor conversations."),
        feat("Radio", "Event & Webinar Engagement", "Captures registration and attendance data from industry events, webinars, and virtual conferences that indicate active market participation."),
      ]
    ),
    gridSection(
      "Data Freshness",
      "How frequently is Lorann's",
      "data refreshed and updated?",
      "Signal eXchange™ follows a continuous refresh model — not quarterly batches. Lorann's data pipeline ensures your audiences always reflect the latest market behavior.",
      3, "check",
      [
        feat("RefreshCw", "Daily Lead Ingestion", "New first-party leads enter Signal eXchange™ every day from Lorann's sourcing network — keeping the dataset growing and current."),
        feat("Check", "Weekly Intent Recalculation", "Intent signals are recalculated weekly based on the latest behavioral data — ensuring your targeting reflects current, not historical, purchase intent."),
        feat("Check", "Monthly Verification Sweep", "Contact-level verification runs monthly — validating email deliverability, phone reachability, and job title accuracy across the full dataset."),
      ]
    ),
  ],
  faqItems: [
    faq("What is Signal eXchange™?", "Signal eXchange™ is Lorann's proprietary dataset that combines verified first-party lead data with real-time intent and behavioral signals — delivering higher-converting audiences than static contact databases."),
    faq("How is Signal eXchange™ different from buying a lead list?", "Traditional lead lists are static snapshots that decay rapidly. Signal eXchange™ is continuously refreshed with new leads, updated intent signals, and verified contact information — so your data reflects today's market, not last quarter's."),
    faq("What verticals does Signal eXchange™ cover?", "Signal eXchange™ currently covers Healthcare, Technology, Financial Services, Manufacturing, Professional Services, and Education verticals — with industry-specific attributes and intent signals for each."),
    faq("Can I integrate Signal eXchange™ data into my CRM?", "Yes. Signal eXchange™ data is delivered in formats compatible with Salesforce, HubSpot, Microsoft Dynamics, and other major CRMs — including lead source tagging and intent score fields."),
    faq("How are intent signals measured?", "Lorann tracks content downloads, software evaluations, competitive research, topic surge activity, job changes, and event engagement — each signal is scored and mapped to verified contact records in Signal eXchange™."),
    faq("Is Signal eXchange™ data compliant?", "Yes. Signal eXchange™ data is sourced through opt-in channels and verified partnerships, with CAN-SPAM, CCPA, and TCPA compliance embedded at the record level."),
  ],
};

// ── 6. DATA ACTIVATION ───────────────────────────────────
PAGES["solutions/data-activation"] = {
  featureGridSections: [
    gridSection(
      "The Activation Gap",
      "Why most audience data dies",
      "before activation.",
      "Companies invest in data acquisition and enrichment — then lose value at the activation stage because of format mismatches, platform incompatibilities, and a lack of channel-specific optimization. Lorann closes that gap.",
      3, "card",
      [
        feat("AlertTriangle", "Format Friction", "Data arrives in formats your platforms cannot ingest — wrong field mapping, incompatible delimiters, missing required fields. Lorann delivers activation-ready files for every major platform."),
        feat("AlertTriangle", "Channel Silos", "Most data vendors optimize for one channel. Lorann formats audiences for simultaneous activation across email, phone, direct mail, CRM, and programmatic — from a single source file."),
        feat("AlertTriangle", "No Optimization Layer", "Raw data lists get loaded and sent without segmentation, suppression, or personalization. Lorann's activation workflow includes the optimization steps that turn data into performance."),
      ]
    ),
    gridSection(
      "End-to-End Process",
      "Our activation",
      "workflow.",
      "Lorann's activation workflow turns audience data into in-market campaigns through a structured process that ensures data quality, platform compatibility, and channel optimization at every step.",
      3, "numbered",
      [
        feat("Filter", "Audience Preparation", "Your audience is segmented, deduplicated, and suppressed against your exclusion files. Lorann applies any final enrichment or scoring needed for channel-specific optimization."),
        feat("SlidersHorizontal", "Platform Formatting", "Files are formatted for your specific activation platforms — Salesforce Marketing Cloud, HubSpot, The Trade Desk, LiveRamp, Meta, Google Ads, or your custom ESP/CRM/DSP configuration."),
        feat("Zap", "Channel Deployment", "Lorann delivers formatted audience files directly into your platforms or provides hashed/encrypted files for programmatic onboarding — ready for immediate campaign launch."),
        feat("ShieldCheck", "Suppression & Compliance", "Final suppression processing ensures DNC, opt-out, and privacy-request compliance across every channel before data is activated."),
        feat("LineChart", "Performance Monitoring", "Post-activation, Lorann tracks deliverability, engagement, and response metrics to inform future audience optimization and refresh cycles."),
        feat("RefreshCw", "Continuous Optimization", "Lorann feeds campaign performance data back into audience selection — refining targeting criteria, updating suppression lists, and optimizing segments for each subsequent activation."),
      ]
    ),
  ],
  faqItems: [
    faq("What platforms does Lorann support for data activation?", "Lorann supports activation across all major ESPs (Salesforce Marketing Cloud, HubSpot, Marketo, Klaviyo), CRMs (Salesforce, HubSpot, Dynamics), DSPs (The Trade Desk, DV360), identity platforms (LiveRamp), and social platforms (Meta, LinkedIn, Google Ads)."),
    faq("How quickly can Lorann activate an audience after delivery?", "Most audiences are activation-ready within 24 hours of delivery. Programmatic activations via LiveRamp or hashed onboarding are typically live within 48 hours."),
    faq("Does Lorann handle suppression processing?", "Yes. Lorann processes your suppression files — CRM exports, opt-out lists, DNC registries, and prior-campaign exclusions — against every activation delivery."),
    faq("Can Lorann activate across multiple channels simultaneously?", "Yes. Lorann formats and delivers audience files for simultaneous multi-channel activation — email, direct mail, phone, programmatic, and social — from a single source audience."),
    faq("What reporting does Lorann provide after activation?", "Lorann provides post-activation reports covering deliverability rates, match rates, and channel-level engagement metrics. These insights feed back into audience optimization for future campaigns."),
  ],
};

// ── 7. COST PER LEAD ─────────────────────────────────────
PAGES["solutions/cost-per-lead"] = {
  featureGridSections: [
    gridSection(
      "CPL by Audience",
      "CPL by audience type:",
      "B2B vs. B2C vs. Healthcare.",
      "Cost per lead varies dramatically by audience type — understanding the benchmarks helps you set realistic goals and identify where Lorann's data delivers the highest ROI.",
      3, "card",
      [
        feat("Briefcase", "B2B CPL Benchmarks", "B2B leads typically range from $35–$200+ depending on seniority, industry, and channel. Lorann's verified B2B data consistently reduces CPL by 30–50% versus unverified list sources through precision targeting and deliverability."),
        feat("Users", "B2C CPL Benchmarks", "Consumer lead costs range from $5–$50 depending on vertical and intent level. Lorann's behavioral and life-event targeting delivers higher-intent consumer leads at lower acquisition costs than broad demographic targeting."),
        feat("Stethoscope", "Healthcare CPL Benchmarks", "Healthcare professional leads are among the most expensive — $50–$300+ for verified HCPs. Lorann's NPI-verified healthcare database reduces HCP acquisition costs by ensuring every dollar reaches a validated provider."),
      ]
    ),
    gridSection(
      "The Data Factor",
      "How data quality",
      "drives CPL.",
      "The single biggest lever for reducing CPL is data quality — and most marketers underestimate how much bad data inflates their costs. Lorann's verified data eliminates the waste that drives CPL up.",
      3, "check",
      [
        feat("Check", "Fewer Bounces, Lower Waste", "Unverified email lists bounce at 15–25%. Every bounce costs you the send, damages sender reputation, and produces zero leads. Lorann's 95%+ deliverability eliminates this waste."),
        feat("Check", "Better Targeting, Fewer Misses", "When your audience matches your ICP precisely, every impression has a higher probability of conversion — reducing the total spend needed to generate each qualified lead."),
        feat("Check", "Intent Signals Reduce Funnel Leakage", "Lorann's intent-enriched audiences identify prospects already researching solutions like yours — shortening the sales cycle and reducing the number of touches needed to convert."),
        feat("Check", "Suppression Prevents Double-Spend", "Without proper suppression, you pay to reach existing customers and prior leads. Lorann's suppression processing ensures every dollar goes toward net-new prospect acquisition."),
        feat("Check", "Multi-Channel Efficiency", "When the same verified record activates across email, phone, direct mail, and digital — each channel reinforces the others, lowering the blended CPL across your entire campaign."),
        feat("Check", "Continuous Optimization", "Lorann feeds campaign performance data back into audience refinement — so each subsequent campaign targets a more optimized audience and achieves a lower CPL."),
      ]
    ),
    gridSection(
      "Market Intelligence",
      "CPL trends:",
      "what's shifting.",
      "The CPL landscape is evolving as privacy regulations tighten, third-party cookies deprecate, and marketers shift budget toward first-party and intent-driven data strategies.",
      3, "card",
      [
        feat("AlertTriangle", "Cookie Deprecation Impact", "As third-party cookies disappear, programmatic CPLs are rising 20–40% for campaigns reliant on cookie-based targeting. Lorann's first-party data strategy bypasses cookie dependency entirely."),
        feat("ShieldCheck", "Privacy Regulation Costs", "CCPA, state privacy laws, and potential federal legislation are increasing compliance costs — which flow through to CPL. Lorann's compliance-first data eliminates the risk of regulatory penalties inflating your cost structure."),
        feat("Sparkles", "Intent Data Advantage", "Marketers using intent-enriched audiences (like Lorann's Signal eXchange™) are achieving 25–45% lower CPLs than those using static contact lists — because intent signals concentrate spend on active buyers."),
      ]
    ),
  ],
  faqItems: [
    faq("What CPL reduction can I expect with Lorann's data?", "Lorann clients typically achieve 30–60% CPL reductions compared to unverified list sources. The exact improvement depends on your current data quality, channel mix, and campaign targeting — we provide a CPL impact estimate during the scoping process."),
    faq("How does Lorann measure CPL impact?", "Lorann provides pre- and post-campaign analytics comparing CPL across audience segments. We track deliverability, engagement, and conversion metrics to quantify the data-driven CPL improvement for each campaign."),
    faq("Does Lorann guarantee a specific CPL?", "Lorann does not guarantee specific CPL figures — cost per lead depends on many campaign variables beyond data quality. However, we commit to data quality benchmarks (95%+ deliverability, verified contacts) that directly drive CPL reduction."),
    faq("Which channels benefit most from Lorann's CPL optimization?", "Email and direct mail campaigns typically see the largest CPL improvements because deliverability and targeting precision have the most direct impact. Programmatic and social campaigns also benefit from Lorann's verified audience data and suppression processing."),
    faq("Can Lorann help reduce CPL for healthcare campaigns?", "Yes. Healthcare campaigns typically have the highest CPLs due to the cost of reaching verified HCPs. Lorann's NPI-verified healthcare database and specialty-level targeting help reduce healthcare CPL by ensuring every dollar reaches a validated provider."),
  ],
};

// ══════════════════════════════════════════════════════════
// BRAND MENTION UPDATES — ensure Lorann appears 2–3 times
// in hero/intro content for pages where it's currently absent
// ══════════════════════════════════════════════════════════

const BRAND_UPDATES = {
  // B2B Database — hero already mentions Lorann via the new sections,
  // but add brand to introParagraphs if missing
  "data-assets/b2b-database": {
    introParagraphs: [
      "Lorann's B2B contact universe spans Healthcare, Technology, and key Industry verticals — each branch independently sourced, verified, and continuously maintained. Every record carries multi-channel contact data, firmographic detail, and the compliance indicators enterprise campaigns require.",
      "Whether you are building a prospecting list, fueling an ABM program, or activating across email, phone, and programmatic channels, Lorann's B2B Database gives your team the verified, channel-ready contacts that drive performance."
    ],
  },
  // B2C Database
  "data-assets/b2c-database": {
    introHeadlinePlain: "Ten consumer verticals.",
    introParagraphs: [
      "Lorann's consumer database captures behavioral, demographic, and lifestyle signals across ten vertical categories — each built for the direct-response, acquisition, and retention campaigns that consumer marketers run every day.",
      "From new-mover targeting to auto-intender identification, Lorann delivers the multi-channel consumer data your campaigns need — verified, refreshed monthly, and ready to activate across email, direct mail, phone, and digital.",
    ],
  },
  // Audience Targeting
  "solutions/audience-targeting": {
    introParagraphs: [
      "Lorann builds audiences differently — starting with your ideal customer profile and working backward through our data universe to construct a segment that matches your exact targeting criteria. No generic lists. No guesswork.",
      "Every Lorann audience is sourced from verified, first-party data foundations, enriched with firmographic, demographic, behavioral, and intent attributes, then formatted for immediate activation across your preferred channels.",
    ],
  },
  // Data Enrichment
  "solutions/data-enrichment": {
    introParagraphs: [
      "A bigger list is not a better list. A smarter list is. Lorann's enrichment services take your existing data — CRM exports, house files, purchased lists — and transform them into verified, attribute-rich records that your campaigns can actually use.",
      "Enrichment by Lorann goes beyond appending missing fields. We validate what you have, fill in what is missing, layer in intent and behavioral signals, and deliver a file that is ready to activate — not just store.",
    ],
  },
  // Data Activation
  "solutions/data-activation": {
    introParagraphs: [
      "From audience file to in-market campaign — Lorann bridges the gap between data strategy and channel execution so your audiences perform across every activation platform.",
      "Most data investments lose value at the activation stage. Format mismatches, platform incompatibilities, and missing suppression processing turn good data into wasted budget. Lorann's activation services solve that.",
    ],
  },
};

// ══════════════════════════════════════════════════════════
// EXECUTION
// ══════════════════════════════════════════════════════════

async function patchPage(slug, patch) {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0]{ _id }`,
    { slug }
  );

  if (!page) {
    console.log(`  ❌  "${slug}" not found in Sanity.`);
    return;
  }

  const publishedId = page._id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;

  try {
    await client.patch(publishedId).set(patch).commit();
    console.log(`  ✅  ${slug} — published patched`);
  } catch (err) {
    console.error(`  ❌  ${slug} published — ${err.message}`);
  }

  try {
    const draft = await client.fetch(`*[_id == $id][0]{ _id }`, { id: draftId });
    if (draft) {
      await client.patch(draftId).set(patch).commit();
      console.log(`  ✅  ${slug} — draft patched`);
    }
  } catch {}
}

async function run() {
  console.log("🚀  Adding new content sections to pages…\n");

  // ── Add featureGridSections + faqItems ──────────────────
  for (const [slug, data] of Object.entries(PAGES)) {
    console.log(`\n── ${slug} ──`);
    await patchPage(slug, data);
  }

  // ── Brand mention updates ──────────────────────────────
  console.log("\n\n── Brand Mention Updates ──");
  for (const [slug, data] of Object.entries(BRAND_UPDATES)) {
    console.log(`\n── ${slug} ──`);
    await patchPage(slug, data);
  }

  console.log("\n\n🏁  Done! All pages updated with new content sections.\n");
}

run().catch((err) => {
  console.error("Migration failed:", err.message);
  process.exit(1);
});
