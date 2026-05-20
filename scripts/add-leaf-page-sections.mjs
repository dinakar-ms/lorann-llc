/**
 * Migration: Add 6 new content sections to ALL B2B and B2C leaf pages:
 *   1. Features of the List (featureGridSection)
 *   2. Attributes Included (featureGridSection)
 *   3. Why Choose Our [List Name]? (proseSection)
 *   4. Who Can Use Our List? (proseSection)
 *   5. Compliance & Data Governance (featureGridSection)
 *   6. FAQ (faqItems)
 *
 * Content is dynamically generated based on the page's h1 (list name)
 * and its category (healthcare, technology, other-industry, or B2C).
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=sk... node scripts/add-leaf-page-sections.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { randomUUID } from "crypto";

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

const writeToken = process.env.SANITY_WRITE_TOKEN;
if (!writeToken) { console.error("Set SANITY_WRITE_TOKEN."); process.exit(1); }

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: writeToken,
  useCdn: false,
});

function key() { return randomUUID().replace(/-/g, "").slice(0, 12); }

function pt(text) {
  return [{ _type: "block", _key: key(), style: "normal", markDefs: [], children: [{ _type: "span", _key: key(), text, marks: [] }] }];
}
function feat(icon, title, desc) {
  return { _key: key(), _type: "featureItem", icon, title, desc: pt(desc) };
}
function faqItem(question, answer) {
  return { _key: key(), _type: "faqItem", question, answer: pt(answer) };
}
function gridSection(kicker, titlePlain, titleAccent, description, columns, style, features) {
  return { _key: key(), _type: "featureGridSection", kicker, titlePlain, titleAccent, description: description ? pt(description) : undefined, columns: columns || 3, style: style || "card", features };
}
function prose(kicker, titlePlain, titleAccent, paragraphs, highlights) {
  return {
    _key: key(), _type: "proseSection", kicker, titlePlain, titleAccent,
    paragraphs: paragraphs || [],
    highlights: (highlights || []).map(h => ({ _key: key(), label: h.label, text: h.text })),
  };
}

// ══════════════════════════════════════════════════════════
// CATEGORY DETECTION
// ══════════════════════════════════════════════════════════

function detectCategory(slug) {
  if (slug.includes("b2c-database")) return "b2c";
  if (slug.includes("healthcare")) return "healthcare";
  if (slug.includes("technology")) return "technology";
  return "industry";
}

// ══════════════════════════════════════════════════════════
// DYNAMIC CONTENT GENERATORS
// ══════════════════════════════════════════════════════════

function generateFeatures(listName, category) {
  const base = [
    feat("Database", "Multi-Channel Contact Records", `Every record in the ${listName} includes email, phone, and postal data for immediate multi-channel activation — no additional enrichment required.`),
    feat("ShieldCheck", "Verified & Deliverable", `All contacts in Lorann's ${listName} undergo multi-step verification including email deliverability testing, phone validation, and postal address certification.`),
    feat("RefreshCw", "Regularly Refreshed", `Lorann refreshes the ${listName} on a quarterly cycle — updating titles, removing bounces, and verifying contact accuracy to keep your campaigns performing.`),
  ];

  if (category === "healthcare") {
    base.push(
      feat("Stethoscope", "NPI-Verified Providers", `Healthcare provider records in the ${listName} are validated against the NPI Registry with specialty codes and taxonomy classification.`),
      feat("Filter", "Specialty & Practice Segmentation", `Segment by medical specialty, practice setting, hospital affiliation, and geographic coverage for precision HCP targeting.`),
      feat("Target", "Prescribing & Procedure Data", `Access prescribing volume indicators and procedure focus areas to target the right healthcare professionals for your campaign objectives.`),
    );
  } else if (category === "technology") {
    base.push(
      feat("Layers", "Technology Stack Data", `The ${listName} includes installed software, platform versions, and contract renewal indicators for technology-buyer targeting.`),
      feat("Filter", "Firmographic & Technographic Segmentation", `Segment by company size, revenue, industry vertical, and specific technology products installed for precision B2B targeting.`),
      feat("LineChart", "IT Spending Indicators", `Identify high-value prospects with IT budget data, cloud maturity scoring, and technology adoption indicators.`),
    );
  } else if (category === "b2c") {
    base.push(
      feat("Activity", "Behavioral & Lifestyle Data", `Consumer records include interest indicators, purchase propensity scores, and lifestyle attributes that drive direct response performance.`),
      feat("Users", "Demographic Depth", `Full demographic profiles including age, income, household composition, education, and homeownership status for precise consumer segmentation.`),
      feat("Target", "Life-Event Targeting", `Reach consumers at high-intent moments — new movers, vehicle intenders, homebuyers, and other life-stage triggers available in the ${listName}.`),
    );
  } else {
    base.push(
      feat("Building2", "Firmographic Coverage", `The ${listName} includes company revenue, employee count, SIC/NAICS codes, headquarters location, and ownership structure for precise industry targeting.`),
      feat("Filter", "Role & Function Segmentation", `Filter by job title, seniority, department, and decision-making authority to reach the right stakeholders within target companies.`),
      feat("MapPin", "Geographic Precision", `Target by state, metro area, ZIP code, or custom radius — all postal records in the ${listName} are CASS-certified and NCOA-processed.`),
    );
  }

  return gridSection(
    "Key Capabilities",
    `Features of the`,
    `${listName}.`,
    `Lorann's ${listName} is built for precision targeting and multi-channel activation — delivering verified, segmentation-ready records that drive campaign performance.`,
    3, "card", base
  );
}

function generateAttributes(listName, category) {
  const items = [
    feat("Users", "Full Name & Title", `Contact name, job title, and professional designation — standardized for clean CRM import and personalized outreach.`),
    feat("Mail", "Verified Email Address", `Business or consumer email validated through MX lookup, syntax check, and deliverability scoring for 95%+ inbox placement.`),
    feat("Phone", "Phone & Mobile Numbers", `Direct-dial, switchboard, and mobile numbers with DNC scrub status and contactability indicators.`),
    feat("MapPin", "Complete Postal Address", `CASS-certified, NCOA-processed addresses with ZIP+4, county, metro area, and congressional district data.`),
  ];

  if (category === "healthcare") {
    items.push(
      feat("Stethoscope", "NPI & Specialty Codes", `National Provider Identifier, primary and secondary specialty, taxonomy code, and board certification status.`),
      feat("Building2", "Facility & Affiliation", `Hospital name, health system linkage, practice group, facility type, and bed count for institutional targeting.`),
      feat("Pill", "Prescribing Indicators", `Therapeutic focus areas, prescribing volume tier, and formulary influence indicators for pharma and device campaigns.`),
      feat("Activity", "Practice Setting", `Solo practice, group practice, hospital-employed, academic, or government setting classification for each provider.`),
    );
  } else if (category === "technology") {
    items.push(
      feat("Database", "Technology Stack", `Installed CRM, ERP, cloud, security, and marketing tools — tracked across 8,000+ software products.`),
      feat("Building2", "Company Firmographics", `Revenue range, employee count, industry codes, headquarters location, and parent/subsidiary relationships.`),
      feat("Layers", "IT Infrastructure", `Cloud provider, operating systems, database platforms, and networking infrastructure for technical targeting.`),
      feat("LineChart", "Contract & Budget", `Technology contract renewal windows, IT budget indicators, and growth-stage classification.`),
    );
  } else if (category === "b2c") {
    items.push(
      feat("Users", "Demographics", `Age, gender, income, education level, marital status, and household composition at the individual level.`),
      feat("Building2", "Home & Property", `Home value, ownership status, dwelling type, length of residence, and mortgage indicators.`),
      feat("Activity", "Lifestyle & Interests", `200+ lifestyle interest categories including travel, fitness, investing, pets, and technology adoption.`),
      feat("LineChart", "Purchase Propensity", `Modeled scores for product category purchase likelihood, channel preference, and brand affinity indicators.`),
    );
  } else {
    items.push(
      feat("Building2", "Company Details", `Company name, revenue, employee count, SIC/NAICS codes, year founded, and public/private ownership status.`),
      feat("Briefcase", "Decision-Maker Role", `Job function, seniority level, department, and purchasing authority classification.`),
      feat("Linkedin", "Social Profiles", `LinkedIn profile URLs and company social handles where available for multi-touch engagement.`),
      feat("Layers", "Industry Classification", `Primary and secondary industry codes for vertical targeting across 1,000+ industry segments.`),
    );
  }

  return gridSection(
    "Data Fields",
    `Attributes included in`,
    `every record.`,
    `Every contact in the ${listName} carries the data points your team needs to segment, personalize, and activate — without going back to enrich.`,
    4, "card", items
  );
}

function generateWhyChoose(listName, category) {
  const paras = [
    `Choosing the right data source is the most important decision in any targeting campaign. Lorann's ${listName} is not compiled from outdated public directories or scraped from unreliable web sources — it is built from verified, first-party data foundations that are continuously maintained for accuracy and deliverability.`,
    `When you license data from Lorann, you are getting more than a list of names. You are getting a precision-engineered audience asset — each record verified across multiple checkpoints, enriched with the attributes your campaigns need, and formatted for immediate activation across email, phone, direct mail, and digital channels.`,
    `Lorann's data team includes vertical specialists who understand the unique challenges of reaching your target audience. We do not just deliver records — we help you select the right segments, optimize your targeting criteria, and monitor deliverability throughout your campaign.`,
  ];

  const highlights = [
    { label: "Verification Standard", text: "Every record passes multi-step verification including email deliverability, phone validation, and postal certification — achieving 95%+ accuracy." },
    { label: "Dedicated Strategist", text: "A named Lorann data strategist works with your team to optimize list selection, targeting criteria, and activation strategy." },
    { label: "Flexible Licensing", text: "Choose per-record, project-based, or 12-month unlimited-use licensing structured around your campaign economics." },
  ];

  if (category === "healthcare") {
    highlights.push({ label: "NPI Verification", text: "Every healthcare provider is validated against the National Provider Identifier Registry — no unverified HCP records enter our database." });
  } else if (category === "technology") {
    highlights.push({ label: "Technology Tracking", text: "Lorann tracks 8,000+ software products and platforms — ensuring your technology-buyer targeting is based on current install data, not stale assumptions." });
  }

  return prose(
    "The Lorann Difference",
    `Why choose Lorann's`,
    `${listName}?`,
    paras,
    highlights
  );
}

function generateWhoCanUse(listName, category) {
  let paras;

  if (category === "healthcare") {
    paras = [
      `Lorann's ${listName} serves pharmaceutical companies, medical device manufacturers, health IT vendors, healthcare staffing firms, and continuing medical education providers who need to reach verified healthcare professionals with precision and compliance.`,
      `Marketing teams use the ${listName} for HCP awareness campaigns, product launches, and thought-leader engagement. Sales teams rely on it for territory planning, call-center outreach, and conference follow-up. Medical affairs teams leverage it for KOL identification and clinical trial recruitment outreach.`,
      `Whether you are a Fortune 500 pharma company running a national campaign or a regional medical device distributor building a local prospect list, Lorann's ${listName} scales to your needs — with the same verification standards and compliance framework at every volume tier.`,
    ];
  } else if (category === "technology") {
    paras = [
      `Lorann's ${listName} is used by SaaS companies, managed service providers, IT consultants, hardware manufacturers, and channel partners who need to reach technology decision-makers and end-users with targeted, verified contact data.`,
      `Demand generation teams use the ${listName} to fuel email campaigns, webinar registrations, and content syndication. Account-based marketing teams pair it with firmographic and technographic filters to build precision account lists. Channel and partner teams leverage it to identify reseller opportunities and ISV partnerships.`,
      `From early-stage startups building their first outbound program to enterprise software companies running global ABM campaigns, Lorann's ${listName} delivers the verified, technology-enriched contact data your team needs to drive pipeline.`,
    ];
  } else if (category === "b2c") {
    paras = [
      `Lorann's ${listName} serves direct-to-consumer brands, retailers, e-commerce companies, financial services firms, insurance carriers, and agencies who need to reach the right consumers at the right moment with multi-channel precision.`,
      `Acquisition teams use the ${listName} for prospect outreach across email, direct mail, and digital channels. Retention teams leverage demographic and behavioral attributes for win-back and loyalty campaigns. Analytics teams use the data for customer profiling, lookalike modeling, and market sizing.`,
      `Whether you are running a national direct mail campaign or building hyper-targeted digital audiences for a regional promotion, Lorann's ${listName} delivers the identity-resolved, behaviorally enriched consumer data your campaigns need to perform.`,
    ];
  } else {
    paras = [
      `Lorann's ${listName} is designed for B2B marketers, sales development teams, recruiting firms, event organizers, and agencies who need verified contact data for outbound prospecting, demand generation, and relationship-building campaigns.`,
      `Marketing teams use the ${listName} to power email campaigns, direct mail programs, and digital audience strategies. Sales teams rely on it for cold outreach, account mapping, and pipeline building. Agencies license it on behalf of clients running multi-vertical campaigns across industries.`,
      `From single-vertical specialists to multi-industry agencies, Lorann's ${listName} provides the verified, multi-channel contact data your campaigns need — with the segmentation depth to reach exactly the right decision-makers at the right companies.`,
    ];
  }

  const highlights = [
    { label: "Marketing Teams", text: "Email campaigns, direct mail, digital audiences, ABM programs, and content syndication." },
    { label: "Sales Teams", text: "Outbound prospecting, territory planning, pipeline building, and call-center activation." },
    { label: "Agencies & Consultants", text: "Multi-client campaigns, market research, lead generation programs, and audience strategy." },
  ];

  return prose(
    "Built For Your Team",
    `Who can use`,
    `our ${listName}?`,
    paras,
    highlights
  );
}

function generateCompliance(listName, category) {
  const items = [
    feat("ShieldCheck", "CAN-SPAM Compliant", `All email contacts in the ${listName} include opt-out suppression processing and comply with CAN-SPAM Act requirements for commercial messaging.`),
    feat("ShieldCheck", "CCPA & State Privacy", `Lorann honors California Consumer Privacy Act requests and maintains processes for all emerging state-level privacy regulations.`),
    feat("ShieldCheck", "TCPA Adherence", `Phone records include DNC registry scrubbing and TCPA consent indicators for compliant telemarketing and call-center outreach.`),
  ];

  if (category === "healthcare") {
    items.push(
      feat("ShieldCheck", "HIPAA-Conscious Sourcing", `Healthcare data is sourced from publicly available registries, opt-in channels, and verified partnerships — never from protected health information sources.`),
    );
  }

  items.push(
    feat("ShieldCheck", "Data Retention Controls", `Records are licensed for specified periods with verified data destruction processes for expired or withdrawn-consent data.`),
    feat("ShieldCheck", "Audit-Ready Documentation", `Lorann provides sourcing documentation and compliance certificates for clients with regulatory audit requirements.`),
  );

  return gridSection(
    "Data Governance",
    `Compliance &`,
    `data governance.`,
    `Every record in Lorann's ${listName} is sourced, processed, and delivered within a rigorous compliance framework — protecting your brand and your campaigns.`,
    3, "check", items
  );
}

function generateFaqs(listName, category) {
  const faqs = [
    faqItem(
      `How many contacts are available in the ${listName}?`,
      `Contact counts vary by segment and targeting criteria. Lorann provides free count estimates based on your specific requirements — including geography, job function, and industry filters. Contact our team for a custom count.`
    ),
    faqItem(
      `How often is the ${listName} updated?`,
      `Lorann refreshes the ${listName} quarterly with full re-verification of email deliverability, phone accuracy, and contact details. Continuous monitoring between refresh cycles removes bounces and updates job changes as they are detected.`
    ),
    faqItem(
      `What format is the data delivered in?`,
      `Data can be delivered as CSV, custom flat-file, or via API integration. Lorann formats files for direct import into your ESP, CRM, marketing automation platform, or DSP — with field mapping documentation included.`
    ),
    faqItem(
      `Can I get a sample before licensing?`,
      `Yes. Lorann provides sample records and detailed count breakdowns based on your targeting criteria before you commit — so you can validate data quality and fit before investing.`
    ),
  ];

  if (category === "healthcare") {
    faqs.push(
      faqItem(
        `Are all healthcare providers NPI-verified?`,
        `Yes. Every healthcare provider record in the ${listName} is validated against the National Provider Identifier Registry, including specialty codes, taxonomy classification, and active license status.`
      ),
      faqItem(
        `Can I target by medical specialty and practice setting?`,
        `Yes. Lorann supports segmentation by primary specialty, sub-specialty, practice type (solo, group, hospital-employed, academic), hospital affiliation, and geographic coverage area.`
      ),
    );
  } else if (category === "technology") {
    faqs.push(
      faqItem(
        `Can I filter by specific software or technology products?`,
        `Yes. Lorann tracks 8,000+ software products including CRM, ERP, cloud platforms, security tools, and marketing automation systems. You can target users of specific products or technology categories.`
      ),
      faqItem(
        `Does the data include technology install verification?`,
        `Yes. Technology install data is verified through multiple detection methods and updated quarterly. Lorann also provides contract renewal window indicators where available.`
      ),
    );
  } else if (category === "b2c") {
    faqs.push(
      faqItem(
        `Can I target consumers by specific life events?`,
        `Yes. Lorann's consumer data includes life-event triggers such as new movers, new homeowners, vehicle intenders, expecting parents, and recent retirees for high-intent targeting.`
      ),
      faqItem(
        `Is the consumer data opt-in?`,
        `Yes. Lorann sources consumer data through opt-in registration channels, public records, and authorized data partnerships. All records comply with CAN-SPAM, CCPA, and TCPA regulations.`
      ),
    );
  } else {
    faqs.push(
      faqItem(
        `Can I target specific job titles and company sizes?`,
        `Yes. The ${listName} supports filtering by job title, function, seniority, department, company revenue, employee count, industry codes, and hundreds of additional attributes.`
      ),
      faqItem(
        `Is the data available for international markets?`,
        `Lorann's primary coverage is the United States, with select international data available for Canada, UK, and EMEA markets. Contact our team for international count availability.`
      ),
    );
  }

  faqs.push(
    faqItem(
      `What licensing options are available?`,
      `Lorann offers per-record licensing, project-based arrangements, and 12-month unlimited-use subscriptions. We structure pricing around your campaign volume and targeting criteria — contact us for a custom quote.`
    ),
  );

  return faqs;
}

// ══════════════════════════════════════════════════════════
// EXECUTION
// ══════════════════════════════════════════════════════════

async function patchPage(id, patch) {
  const publishedId = id.replace(/^drafts\./, "");
  const draftId = `drafts.${publishedId}`;
  try { await client.patch(publishedId).set(patch).commit(); } catch (e) { console.error(`    ❌ published: ${e.message}`); return false; }
  try {
    const draft = await client.fetch(`*[_id == $id][0]{ _id }`, { id: draftId });
    if (draft) await client.patch(draftId).set(patch).commit();
  } catch {}
  return true;
}

async function run() {
  console.log("🚀  Adding content sections to all B2B & B2C inner pages…\n");

  // Fetch all leaf pages under B2B and B2C
  const pages = await client.fetch(`
    *[_type == "page"
      && (slug.current match "data-assets/b2b-database/*" || slug.current match "data-assets/b2c-database/*")
      && templateType == "leaf"
      && !(_id in path("drafts.**"))
    ]{ _id, h1, "slug": slug.current }
    | order(slug asc)
  `);

  console.log(`  Found ${pages.length} leaf pages to update.\n`);

  let success = 0;
  let failed = 0;

  for (const page of pages) {
    const listName = page.h1;
    const category = detectCategory(page.slug);

    const patch = {
      featureGridSections: [
        generateFeatures(listName, category),
        generateAttributes(listName, category),
        generateCompliance(listName, category),
      ],
      proseSections: [
        generateWhyChoose(listName, category),
        generateWhoCanUse(listName, category),
      ],
      faqItems: generateFaqs(listName, category),
    };

    const ok = await patchPage(page._id, patch);
    if (ok) {
      console.log(`  ✅  ${page.slug} (${listName})`);
      success++;
    } else {
      failed++;
    }
  }

  // ── Also update hub pages under B2B/B2C that are sub-hubs (healthcare, technology, etc.) ──
  console.log("\n── Sub-hub pages ──");
  const subHubs = await client.fetch(`
    *[_type == "page"
      && (slug.current match "data-assets/b2b-database/*" || slug.current match "data-assets/b2c-database/*")
      && templateType == "hub"
      && !(_id in path("drafts.**"))
    ]{ _id, h1, "slug": slug.current }
    | order(slug asc)
  `);

  for (const page of subHubs) {
    const listName = page.h1 + " Data";
    const category = detectCategory(page.slug);

    const patch = {
      featureGridSections: [
        generateFeatures(listName, category),
        generateCompliance(listName, category),
      ],
      proseSections: [
        generateWhyChoose(listName, category),
      ],
      faqItems: generateFaqs(listName, category),
    };

    const ok = await patchPage(page._id, patch);
    if (ok) {
      console.log(`  ✅  ${page.slug} (${listName})`);
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\n🏁  Done! ${success} pages updated, ${failed} failed.\n`);
}

run().catch((err) => { console.error("Failed:", err.message); process.exit(1); });
