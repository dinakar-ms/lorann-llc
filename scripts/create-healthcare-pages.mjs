/**
 * Create 8 Healthcare group hub pages + 38 leaf pages in Sanity.
 * All pages follow the same leaf/hub template as existing pages.
 * Usage: node scripts/create-healthcare-pages.mjs [--dry-run]
 */
import { createClient } from "@sanity/client";
import { v4 as uuid } from "uuid";

const DRY_RUN = process.argv.includes("--dry-run");
const client = createClient({
  projectId: "a694bsry",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx",
  useCdn: false,
});

const k = () => uuid().replace(/-/g, "").slice(0, 12);

const richText = (text) => [{
  _key: k(), _type: "block", style: "normal", markDefs: [],
  children: [{ _key: k(), _type: "span", marks: [], text }],
}];

// ─── Healthcare groups and their leaves ─────────────────────────
const HC = "data-assets/b2b-database/healthcare";

const GROUPS = [
  {
    slug: `${HC}/physicians-advanced-practice`,
    h1: "Physicians & Advanced Practice Providers",
    kicker: "B2B Healthcare",
    desc: "Verified email and mailing data for physicians, podiatrists, nurse practitioners, physician assistants, and medical assistants — targeted by specialty, geography, and practice setting.",
    childIcon: "UserCog",
    leaves: [
      { slug: "physicians-doctors",  h1: "Physicians & Doctors Email List",    specialty: "physicians and doctors",        role: "primary care and specialist physicians", channel: "outreach campaigns targeting medical practices" },
      { slug: "podiatrists",         h1: "Podiatrists Email List",              specialty: "podiatrists",                   role: "foot and ankle specialists",             channel: "direct mail and email campaigns for podiatry practices" },
      { slug: "nurse-practitioners", h1: "Nurse Practitioners Email List",      specialty: "nurse practitioners",           role: "advanced practice registered nurses",    channel: "healthcare marketing targeting NP-led practices" },
      { slug: "physician-assistants",h1: "Physician Assistants Email List",     specialty: "physician assistants",          role: "clinical PAs across all specialties",    channel: "multi-channel outreach to PA professionals" },
      { slug: "medical-assistants",  h1: "Medical Assistants Email List",       specialty: "medical assistants",            role: "clinical and administrative MAs",         channel: "staff-level healthcare marketing campaigns" },
    ],
  },
  {
    slug: `${HC}/nursing-professionals`,
    h1: "Nursing Professionals",
    kicker: "B2B Healthcare",
    desc: "Comprehensive nursing contact data for registered nurses, licensed practical nurses, certified nursing assistants, and certified nurse-midwives — segmented by facility type, specialty, and location.",
    childIcon: "HeartPulse",
    leaves: [
      { slug: "registered-nurses",            h1: "Registered Nurses Email List",              specialty: "registered nurses",              role: "RNs across hospital, clinic, and home health settings", channel: "nursing-targeted email and direct mail campaigns" },
      { slug: "licensed-practical-nurses",    h1: "Licensed Practical Nurses Email List",       specialty: "licensed practical nurses",       role: "LPNs in clinical and long-term care settings",          channel: "healthcare workforce marketing campaigns" },
      { slug: "certified-nursing-assistants", h1: "Certified Nursing Assistants Email List",    specialty: "certified nursing assistants",    role: "CNAs in hospitals, nursing homes, and home care",       channel: "outreach targeting entry-level clinical staff" },
      { slug: "certified-nurse-midwives",     h1: "Certified Nurse-Midwives Email List",        specialty: "certified nurse-midwives",        role: "CNMs in obstetric and women's health settings",         channel: "women's health and maternity marketing campaigns" },
    ],
  },
  {
    slug: `${HC}/hospital-decision-makers`,
    h1: "Hospital Decision Makers",
    kicker: "B2B Healthcare",
    desc: "C-suite and senior leadership contacts for hospital administrators, CEOs, CFOs, Chief Medical Officers, Chief Nursing Officers, Chiefs of Staff, and Medical Directors — the decision-makers who drive procurement and partnerships.",
    childIcon: "Building2",
    leaves: [
      { slug: "hospital-administrators", h1: "Hospital Administrators Email List",  specialty: "hospital administrators",  role: "facility administrators managing operations and procurement", channel: "B2B outreach targeting hospital leadership" },
      { slug: "ceo-cfo-healthcare",      h1: "Healthcare CEO & CFO Email List",      specialty: "healthcare CEOs and CFOs", role: "executive decision-makers controlling strategic spend",       channel: "enterprise healthcare sales and marketing programs" },
      { slug: "chief-medical-officers",  h1: "Chief Medical Officers Email List",    specialty: "chief medical officers",   role: "CMOs overseeing clinical quality and physician relations",    channel: "clinical leadership outreach campaigns" },
      { slug: "chief-nursing-officers",  h1: "Chief Nursing Officers Email List",    specialty: "chief nursing officers",   role: "CNOs directing nursing staff and patient care standards",    channel: "nursing leadership and workforce solutions marketing" },
      { slug: "chief-of-staff",          h1: "Chief of Staff Email List",            specialty: "chiefs of staff",          role: "physician leaders coordinating clinical departments",         channel: "medical staff leadership engagement campaigns" },
      { slug: "medical-directors",       h1: "Medical Directors Email List",         specialty: "medical directors",        role: "physician executives managing clinical programs",             channel: "clinical management and healthcare vendor outreach" },
    ],
  },
  {
    slug: `${HC}/health-therapy`,
    h1: "Health & Therapy Professionals",
    kicker: "B2B Healthcare",
    desc: "Targeted contact data for physical therapists, occupational therapists, speech-language therapists, respiratory therapists, massage therapists, EMTs, paramedics, radiologic technicians, dieticians, and nutritionists.",
    childIcon: "Activity",
    leaves: [
      { slug: "physical-therapists",          h1: "Physical Therapists Email List",               specialty: "physical therapists",           role: "PTs in outpatient, hospital, and sports rehab settings",   channel: "rehabilitation and sports medicine marketing" },
      { slug: "occupational-therapists",      h1: "Occupational Therapists Email List",            specialty: "occupational therapists",       role: "OTs across clinical and community health settings",        channel: "therapy services and equipment marketing campaigns" },
      { slug: "speech-language-therapists",   h1: "Speech & Language Therapists Email List",       specialty: "speech-language pathologists",  role: "SLPs in hospitals, schools, and private practice",         channel: "speech and language therapy outreach programs" },
      { slug: "respiratory-therapists",       h1: "Respiratory Therapists Email List",             specialty: "respiratory therapists",        role: "RTs managing pulmonary and critical care patients",         channel: "respiratory care equipment and services campaigns" },
      { slug: "massage-therapists",           h1: "Massage Therapists Email List",                 specialty: "massage therapists",            role: "LMTs in clinical, spa, and sports settings",               channel: "wellness and therapy services marketing" },
      { slug: "emts-paramedics",              h1: "EMTs & Paramedics Email List",                  specialty: "EMTs and paramedics",           role: "emergency medical technicians and paramedics",             channel: "emergency services equipment and training outreach" },
      { slug: "radiologic-technicians",       h1: "Radiologic Technicians Email List",             specialty: "radiologic technicians",        role: "radiologic techs in hospitals and imaging centers",        channel: "medical imaging equipment and services campaigns" },
      { slug: "dieticians-nutritionists",     h1: "Dieticians & Nutritionists Email List",         specialty: "registered dieticians and nutritionists", role: "RDs and nutritionists in clinical and community settings", channel: "nutrition products and wellness services marketing" },
    ],
  },
  {
    slug: `${HC}/behavioral-mental-health`,
    h1: "Behavioral & Mental Health Professionals",
    kicker: "B2B Healthcare",
    desc: "Verified contact lists for psychologists, psychiatrists, mental health counselors, social workers, case managers, and marriage and family therapists — segmented by practice type, specialty, and location.",
    childIcon: "Brain",
    leaves: [
      { slug: "psychologists",               h1: "Psychologists Email List",                  specialty: "psychologists",                role: "licensed psychologists in clinical and research settings",   channel: "mental health services and assessment tools marketing" },
      { slug: "psychiatrists",               h1: "Psychiatrists Email List",                  specialty: "psychiatrists",                role: "board-certified psychiatrists across inpatient and outpatient", channel: "psychiatric medication, EHR, and services outreach" },
      { slug: "mental-health-counselors",    h1: "Mental Health Counselors Email List",        specialty: "licensed mental health counselors", role: "LMHCs in private practice and community health settings", channel: "behavioral health services and platform marketing" },
      { slug: "social-workers",              h1: "Social Workers & Case Managers Email List",  specialty: "social workers and case managers", role: "MSWs and case managers in hospital and community settings", channel: "care coordination and social services outreach" },
      { slug: "marriage-family-therapists",  h1: "Marriage & Family Therapists Email List",    specialty: "marriage and family therapists", role: "LMFTs in private practice and counseling centers",          channel: "family therapy services and training campaigns" },
    ],
  },
  {
    slug: `${HC}/dental-vision`,
    h1: "Dental & Vision Professionals",
    kicker: "B2B Healthcare",
    desc: "Comprehensive contact data for dentists, dental hygienists, dental assistants, optometrists, and opticians — segmented by practice type, specialty, and geographic market.",
    childIcon: "Smile",
    leaves: [
      { slug: "dentists",          h1: "Dentists Email List",          specialty: "general and specialty dentists",  role: "DMDs and DDSs in private and group dental practices", channel: "dental products, equipment, and services marketing" },
      { slug: "dental-hygienists", h1: "Dental Hygienists Email List", specialty: "dental hygienists",              role: "licensed dental hygienists in clinical settings",     channel: "dental hygiene products and continuing education outreach" },
      { slug: "dental-assistants", h1: "Dental Assistants Email List", specialty: "dental assistants",              role: "CDAs and dental assistants in dental offices",        channel: "dental practice staff training and supplies marketing" },
      { slug: "optometrists",      h1: "Optometrists Email List",       specialty: "optometrists",                   role: "ODs in private practice and optical retail settings", channel: "optical products and vision care services campaigns" },
      { slug: "opticians",         h1: "Opticians Email List",          specialty: "opticians",                      role: "licensed opticians in optical retail and clinical settings", channel: "eyewear and lens marketing campaigns" },
    ],
  },
  {
    slug: `${HC}/pharmacy-practice-management`,
    h1: "Pharmacy & Practice Management",
    kicker: "B2B Healthcare",
    desc: "Targeted contact data for pharmacists and physician practice managers — reaching professionals who influence drug purchasing decisions and manage the operational side of healthcare practices.",
    childIcon: "Pill",
    leaves: [
      { slug: "pharmacists",                 h1: "Pharmacists Email List",                specialty: "licensed pharmacists",           role: "RPhs in retail, hospital, and specialty pharmacy settings", channel: "pharmaceutical products and pharmacy services outreach" },
      { slug: "physician-practice-managers", h1: "Physician Practice Managers Email List", specialty: "physician practice managers",     role: "practice administrators managing physician offices",        channel: "practice management software and services campaigns" },
    ],
  },
  {
    slug: `${HC}/specialty-other`,
    h1: "Specialty & Other Healthcare Professionals",
    kicker: "B2B Healthcare",
    desc: "Targeted lists for chiropractors, veterinarians, and allied healthcare professionals — covering specialty practitioners who serve unique patient populations and purchasing needs.",
    childIcon: "Award",
    leaves: [
      { slug: "chiropractors",                   h1: "Chiropractors Email List",                     specialty: "chiropractors",                    role: "DCs in private chiropractic and integrative health practices", channel: "chiropractic equipment and wellness products marketing" },
      { slug: "veterinarians",                   h1: "Veterinarians Email List",                     specialty: "veterinarians",                    role: "DVMs in private practice, emergency, and specialty clinics",   channel: "veterinary products, pharmaceuticals, and services outreach" },
      { slug: "allied-healthcare-professionals", h1: "Allied Healthcare Professionals Email List",   specialty: "allied healthcare professionals",  role: "licensed allied health clinicians across multiple disciplines", channel: "multi-specialty healthcare marketing campaigns" },
    ],
  },
];

// ─── FAQ generators (7 unique questions per leaf page) ──────────
const FAQ_Q_POOLS = [
  (sn) => [
    `How many records are in the ${sn}?`,
    `What is the total record count for the ${sn}?`,
    `How large is the ${sn} dataset?`,
    `How many contacts does the ${sn} include?`,
    `What volume of records can I access in the ${sn}?`,
    `How extensive is the ${sn} in terms of coverage?`,
    `What is the estimated record count for the ${sn}?`,
  ],
  (sn) => [
    `How is the ${sn} verified?`,
    `What verification process does the ${sn} go through?`,
    `How does Lorann ensure ${sn} data accuracy?`,
    `What quality checks are applied to the ${sn}?`,
    `How is data quality maintained in the ${sn}?`,
    `What validation methods are used for the ${sn}?`,
    `How frequently is the ${sn} re-verified?`,
  ],
  (sn) => [
    `What file format does the ${sn} come in?`,
    `How is the ${sn} data delivered?`,
    `What delivery options are available for the ${sn}?`,
    `In what formats can I receive the ${sn}?`,
    `How is the ${sn} formatted for download?`,
    `What export options does the ${sn} support?`,
    `Can I get the ${sn} as a direct CRM import?`,
  ],
  (sn) => [
    `Can I segment the ${sn} by geography?`,
    `What targeting filters are available for the ${sn}?`,
    `How granular is the ${sn} segmentation?`,
    `Can I filter the ${sn} by specialty or practice type?`,
    `What geographic breakdowns does the ${sn} support?`,
    `Can I narrow the ${sn} by facility type or region?`,
    `Does the ${sn} support custom audience filters?`,
  ],
  (sn) => [
    `Is the ${sn} compliant with marketing regulations?`,
    `What privacy standards does the ${sn} adhere to?`,
    `Is the ${sn} GDPR and CCPA compliant?`,
    `How does the ${sn} handle consent management?`,
    `What regulatory certifications does the ${sn} carry?`,
    `Is the ${sn} CAN-SPAM compliant?`,
    `How does the ${sn} ensure opt-in compliance?`,
  ],
  (sn) => [
    `Does the ${sn} support multi-channel campaigns?`,
    `What marketing channels can the ${sn} activate?`,
    `Can I use the ${sn} for both email and direct mail?`,
    `How does the ${sn} support omnichannel outreach?`,
    `Is the ${sn} formatted for phone, email, and mail?`,
    `What activation channels does the ${sn} enable?`,
    `Can I deploy the ${sn} across digital and offline channels?`,
  ],
  (sn) => [
    `Can I get sample ${sn} data before purchasing?`,
    `Is a free data preview available for the ${sn}?`,
    `Can I evaluate the ${sn} before committing?`,
    `Does Lorann offer test records from the ${sn}?`,
    `Can I request a ${sn} sample count and preview?`,
    `How can I validate the ${sn} before licensing?`,
    `Is there a trial option for the ${sn}?`,
  ],
];

const FAQ_A_GEN = [
  (sn, idx) => {
    const openers = [
      `Our ${sn} contains a large and continuously expanding dataset.`,
      `The ${sn} covers a substantial audience universe.`,
      `Lorann maintains an extensive ${sn} with deep market coverage.`,
      `The ${sn} database includes a wide-reaching set of verified contacts.`,
    ];
    const closes = [
      `Contact our data team for a complimentary count estimate tailored to your campaign requirements.`,
      `Reach out for a free, no-obligation count breakout matched to your targeting brief.`,
      `Get in touch for a custom universe estimate — we provide counts within one business day.`,
      `Request a free audience sizing to see exactly how many records match your campaign goals.`,
    ];
    return `${openers[idx % openers.length]} Record counts vary based on your targeting criteria including geographic scope, specialty, facility type, and practice setting. ${closes[idx % closes.length]}`;
  },
  (sn, idx) => {
    const parts = [
      `${sn} records undergo a multi-step validation process including NPI registry cross-referencing, email SMTP validation, and postal address standardization.`,
      `Every record in the ${sn} passes through professional license verification, email deliverability testing, and source-to-source cross-referencing.`,
      `Lorann applies a rigorous 4-stage verification process to the ${sn}: credential verification, field-level checks, deliverability testing, and final QA review.`,
      `Verification for the ${sn} includes National Provider Identifier (NPI) validation, CASS certification for postal records, and continuous change monitoring.`,
    ];
    return `${parts[idx % parts.length]} Records are refreshed quarterly with continuous monitoring for license changes, practice relocations, and opt-outs between full update cycles.`;
  },
  (sn, idx) => {
    const parts = [
      `The ${sn} is delivered as a ready-to-use CSV or Excel file with all data fields clearly mapped and labeled.`,
      `You'll receive the ${sn} data in CSV format with standardized column headers, compatible with all major marketing platforms.`,
      `Lorann delivers the ${sn} as a structured flat file (CSV or XLSX) with full field documentation included.`,
      `Your ${sn} data arrives as a formatted spreadsheet or CSV with fields organized for immediate campaign deployment.`,
    ];
    return `${parts[idx % parts.length]} We also support direct CRM imports for Salesforce, HubSpot, and Marketo, plus custom formatting for any ESP or marketing automation platform. SFTP and API delivery are available for enterprise clients.`;
  },
  (sn, idx) => {
    const parts = [
      `Yes. ${sn} data can be segmented by state, metro area, ZIP code, county, or custom radius from any location.`,
      `Absolutely. The ${sn} supports granular geographic targeting at the state, city, ZIP, metro, and radius level.`,
      `Yes — you can slice the ${sn} by any combination of geography, specialty, practice type, and facility setting.`,
      `The ${sn} offers multi-dimensional segmentation across geography, specialty, practice size, and credentialing.`,
    ];
    return `${parts[idx % parts.length]} Additional filters include NPI specialty codes, years in practice, practice setting (solo, group, hospital-employed), and board certification status. Our team will work with you to define the optimal segment criteria.`;
  },
  (sn, idx) => {
    const parts = [
      `Yes. All ${sn} data is sourced and maintained in compliance with CAN-SPAM, TCPA, CCPA, and applicable federal and state regulations.`,
      `The ${sn} is fully compliant with CAN-SPAM, TCPA, GDPR, and CCPA requirements. Consent flags and suppression indicators are included with every record.`,
      `Lorann maintains strict compliance standards for the ${sn}, including documented opt-in status, DNC cross-referencing, and privacy regulation adherence.`,
      `Yes. Every ${sn} record carries compliance metadata including consent documentation, suppression status, and permissible use indicators.`,
    ];
    return `${parts[idx % parts.length]} Lorann provides detailed compliance documentation and usage guidelines with every data delivery. Suppression processing, opt-out management, and compliance certification are standard with every order.`;
  },
  (sn, idx) => {
    const parts = [
      `Yes. Every ${sn} record includes verified email, mailing address, and phone fields — enabling true multi-channel campaign activation.`,
      `The ${sn} supports email, direct mail, phone, and digital advertising activation with verified contact data across all channels.`,
      `Absolutely. ${sn} data is structured for omnichannel deployment — email marketing, direct mail, telemarketing, and programmatic display.`,
      `Yes. The ${sn} includes channel-specific fields optimized for email deliverability, postal accuracy, and phone connectivity.`,
    ];
    return `${parts[idx % parts.length]} We support audience onboarding to Facebook, Google, LinkedIn, The Trade Desk, LiveRamp, and other major activation platforms. Cross-channel campaign sequencing is fully supported.`;
  },
  (sn, idx) => {
    const parts = [
      `Yes. We provide complimentary count estimates and sample ${sn} records so you can evaluate data quality, field coverage, and match rates before committing.`,
      `Absolutely. Lorann offers free ${sn} sample records and detailed count breakdowns to help you assess data fit and quality.`,
      `Yes — you can request a no-obligation ${sn} data preview including sample records, field documentation, and audience sizing.`,
      `We offer a risk-free ${sn} evaluation with sample data, accuracy benchmarks, and coverage estimates at no charge.`,
    ];
    return `${parts[idx % parts.length]} Contact our data team to request your free preview — most sample requests are fulfilled within one business day.`;
  },
];

// ─── Feature grid (3 sections: Strengths, Record Fields, Channels) ──
function buildFeatureGrid(sn, specialty, role) {
  return [
    {
      _key: k(), _type: "object",
      kicker: "Data Strengths",
      titlePlain: "Why choose our",
      titleAccent: `${sn}`,
      description: `Verified, specialty-matched data built for precision healthcare marketing targeting ${role}.`,
      columns: 3,
      style: "card",
      features: [
        { _key: k(), icon: "ShieldCheck", title: "NPI Verified",       desc: `All ${specialty} records validated against the National Provider Identifier Registry for credential accuracy.` },
        { _key: k(), icon: "Target",      title: "Specialty Matched",   desc: `Precisely segmented by ${specialty} specialty codes, practice type, and clinical focus area.` },
        { _key: k(), icon: "RefreshCw",   title: "Quarterly Refresh",   desc: `Dataset refreshed every 90 days with continuous monitoring for practice changes and license updates.` },
        { _key: k(), icon: "MapPin",      title: "Geographic Precision",desc: `Segment by state, county, ZIP, metro area, or custom radius to match your exact territory.` },
        { _key: k(), icon: "Database",    title: "Rich Field Coverage", desc: `Each record includes email, phone, postal address, specialty code, NPI number, and facility affiliation.` },
        { _key: k(), icon: "Zap",         title: "Campaign Ready",      desc: `Pre-formatted for direct import into Salesforce, HubSpot, Marketo, and all major ESPs.` },
      ],
    },
    {
      _key: k(), _type: "object",
      kicker: "Data Fields",
      titlePlain: "What's included in every",
      titleAccent: `${sn} record`,
      description: `Comprehensive field coverage for every ${specialty} contact — everything you need for precision targeting and compliance-ready outreach.`,
      columns: 4,
      style: "check",
      features: [
        { _key: k(), icon: "Mail",         title: "Email Address",       desc: `SMTP-validated email address for every ${specialty} contact with deliverability score.` },
        { _key: k(), icon: "Phone",        title: "Phone Number",        desc: `Direct office and mobile phone numbers for ${specialty} professionals, verified for connectivity.` },
        { _key: k(), icon: "MapPin",       title: "Mailing Address",     desc: `CASS-certified postal address for direct mail campaigns, including suite and ZIP+4.` },
        { _key: k(), icon: "Building2",    title: "Practice/Facility",   desc: `Employer name, facility type, and organizational affiliation for account-level targeting.` },
        { _key: k(), icon: "Stethoscope",  title: "Specialty & NPI",     desc: `Primary specialty classification, sub-specialty, and NPI number for credential verification.` },
        { _key: k(), icon: "Users",        title: "Seniority & Title",   desc: `Professional title, seniority level, and role classification for precision audience segmentation.` },
        { _key: k(), icon: "RefreshCw",    title: "Last Verified Date",  desc: `Recency timestamp showing when each ${specialty} record was last verified and updated.` },
        { _key: k(), icon: "ShieldCheck",  title: "Compliance Flags",    desc: `Opt-in status, CAN-SPAM compliance indicator, and DNC suppression flags included with each record.` },
      ],
    },
    {
      _key: k(), _type: "object",
      kicker: "Activation Channels",
      titlePlain: "Deploy the",
      titleAccent: `${sn} everywhere`,
      description: `Verified ${specialty} contacts formatted for seamless activation across email, direct mail, and digital advertising channels.`,
      columns: 3,
      style: "card",
      features: [
        { _key: k(), icon: "Mail",     title: "Email Campaigns",   desc: `SMTP-validated emails with engagement indicators — ready for deployment through any major ESP or marketing automation platform.` },
        { _key: k(), icon: "MailOpen", title: "Direct Mail",       desc: `CASS-certified postal addresses formatted for direct mail vendors. Suppression processing included at no extra charge.` },
        { _key: k(), icon: "Phone",    title: "Phone Outreach",    desc: `Verified phone numbers with line-type identification for compliant telemarketing and appointment-setting campaigns.` },
      ],
    },
  ];
}

// ─── Prose sections ─────────────────────────────────────────────
function buildProse(sn, specialty, role, channel) {
  return [
    {
      _key: k(), _type: "object",
      kicker: "About This Data",
      headlinePlain: "Built for precision",
      headlineAccent: "healthcare marketing",
      paragraph1: richText(`Our ${sn} is designed for marketers who need verified, specialty-specific contact data to reach ${role} with confidence. Every record is sourced from authoritative healthcare databases, cross-referenced against the NPI Registry, and validated for email deliverability and postal accuracy before delivery.`),
      paragraph2: richText(`Whether you're launching ${channel}, running account-based outreach, or building a healthcare prospect pipeline, our data gives you the targeting precision to reach the right professionals at the right facilities. Segmentation options include specialty codes, practice type, geographic scope, facility size, and years in practice.`),
      paragraph3: richText(`All ${sn} records are delivered with full compliance documentation, including consent indicators, CAN-SPAM flags, and DNC suppression status. Our team provides ongoing support for list hygiene, append services, and multi-channel deployment across email, direct mail, and digital platforms.`),
    },
  ];
}

// ─── Compliance body ─────────────────────────────────────────────
const COMPLIANCE_BODY = `All data is sourced, processed, and delivered in compliance with CAN-SPAM, TCPA, CCPA, GDPR, and applicable healthcare industry regulations. Records include opt-in documentation, suppression processing, and National Provider Identifier (NPI) verification where applicable. Lorann maintains strict data governance standards and provides compliance documentation with every delivery. Contact our team for custom compliance review prior to campaign launch.`;

// ─── Hub page child items ─────────────────────────────────────────
function buildChildItems(group) {
  return group.leaves.map((leaf) => ({
    _key: k(),
    icon: group.childIcon,
    title: leaf.h1.replace(" Email List", "").replace(" Mailing List", ""),
    desc: `Verified ${leaf.specialty} contact data for precision healthcare marketing.`,
    href: `/${group.slug}/${leaf.slug}`,
  }));
}

// ─── FAQ builder ──────────────────────────────────────────────────
function buildFaqs(sn, idx) {
  return FAQ_Q_POOLS.map((qPool, pos) => ({
    _key: k(),
    question: qPool(sn)[idx % qPool(sn).length],
    answer: richText(FAQ_A_GEN[pos](sn, idx)),
  }));
}

// ─── MAIN ─────────────────────────────────────────────────────────
async function main() {
  console.log(DRY_RUN ? "DRY RUN\n" : "LIVE RUN\n");

  // Check existing slugs to avoid duplicates
  const existing = await client.fetch(`*[_type=="page"]{slug}`);
  const existingSlugs = new Set(existing.map((p) => p.slug?.current));

  let created = 0;
  let skipped = 0;
  let leafIndex = 0; // global counter for FAQ variety

  for (const group of GROUPS) {
    console.log(`\n═══ ${group.h1} ═══`);

    // ── Hub page ──
    const hubSlug = group.slug;
    if (existingSlugs.has(hubSlug)) {
      console.log(`  SKIP hub (exists): ${hubSlug}`);
      skipped++;
    } else {
      console.log(`  CREATE hub: ${hubSlug}`);
      const hubDoc = {
        _type: "page",
        h1: group.h1,
        slug: { current: hubSlug },
        templateType: "hub",
        kicker: group.kicker,
        titlePlain: group.h1.split(" ").slice(0, -1).join(" ") + " ",
        titleAccent: group.h1.split(" ").slice(-1)[0],
        heroDescription: richText(group.desc),
        metaTitle: `${group.h1} | Healthcare Data — Lorann LLC`,
        metaDescription: group.desc.substring(0, 160),
        ogTitle: `${group.h1} | Lorann LLC`,
        ogDescription: group.desc.substring(0, 200),
        childrenSectionKicker: "Browse Specialties",
        childrenSectionTitlePlain: "Targeted data for",
        childrenSectionTitleAccent: "every specialty",
        childrenSectionDescription: `Select a specialty below to explore verified contact lists for ${group.h1.toLowerCase()}.`,
        childrenSectionColumns: 3,
        childrenItems: buildChildItems(group),
        backLink: { label: "← Healthcare", href: "/data-assets/b2b-database/healthcare" },
        faqItems: buildFaqs(group.h1 + " Data", leafIndex++),
        complianceHeadline: "Built for compliant healthcare marketing",
        complianceBody: richText(COMPLIANCE_BODY),
      };
      if (!DRY_RUN) {
        await client.create(hubDoc);
        console.log(`  ✓ Hub created`);
      } else {
        console.log(`  → Would create hub`);
      }
      created++;
    }

    // ── Leaf pages ──
    for (let li = 0; li < group.leaves.length; li++) {
      const leaf = group.leaves[li];
      const leafSlug = `${group.slug}/${leaf.slug}`;
      const idx = leafIndex++;

      if (existingSlugs.has(leafSlug)) {
        console.log(`  SKIP leaf (exists): ${leafSlug}`);
        skipped++;
        continue;
      }

      console.log(`  CREATE leaf: ${leaf.h1}`);

      const leafDoc = {
        _type: "page",
        h1: leaf.h1,
        slug: { current: leafSlug },
        templateType: "leaf",
        kicker: group.kicker,
        titlePlain: leaf.h1.replace(" Email List", " ").replace(" Mailing List", " "),
        titleAccent: "Email List",
        heroDescription: richText(`Our ${leaf.h1} provides verified, specialty-matched contact data for ${leaf.role} — delivered with full field coverage, compliance documentation, and campaign-ready formatting for ${leaf.channel}.`),
        primaryCta: { label: "Request a Sample", href: "/contact" },
        secondaryCta: { label: "View All Healthcare", href: "/data-assets/b2b-database/healthcare" },
        introKicker: "Data Quality",
        introHeadlinePlain: "Verified data for",
        introHeadlineAccent: leaf.specialty,
        introParagraphs: richText(`Every ${leaf.specialty} record is validated against the NPI Registry, SMTP-tested for email deliverability, and CASS-certified for postal accuracy. Our data operations team runs quarterly full re-verifications with continuous monitoring for practice changes between cycles.`),
        stats: [
          { _key: k(), label: "Deliverability Rate", value: "95%+" },
          { _key: k(), label: "Quarterly Refresh",   value: "4x/yr" },
          { _key: k(), label: "Compliance Ready",    value: "100%" },
          { _key: k(), label: "Fields Per Record",   value: "18+" },
        ],
        attributesSectionKicker: "Targeting Options",
        attributesSectionTitle: "Segment by",
        attributesSectionAccent: "what matters most",
        attributes: [
          { _key: k(), icon: "MapPin",      title: "Geography",       desc: "State, city, ZIP, metro, or custom radius — precise territory alignment for field sales and regional campaigns." },
          { _key: k(), icon: "Stethoscope", title: "Specialty",       desc: "Primary specialty, sub-specialty, and NPI classification codes for precise clinical audience targeting." },
          { _key: k(), icon: "Building2",   title: "Practice Setting",desc: "Solo practice, group practice, hospital-employed, academic, or community health center affiliation." },
          { _key: k(), icon: "Users",       title: "Seniority",       desc: "Title, years in practice, and board certification status for decision-maker-level targeting." },
        ],
        useCasesSectionKicker: "Campaign Use Cases",
        useCasesSectionTitle: "How marketers use the",
        useCasesSectionAccent: leaf.h1,
        useCases: [
          { _key: k(), icon: "Mail",       title: "Email Prospecting",    desc: `Launch targeted email campaigns to ${leaf.specialty} with verified addresses and specialty-level segmentation.` },
          { _key: k(), icon: "MailOpen",   title: "Direct Mail",          desc: `Reach ${leaf.specialty} at their practice address with CASS-certified postal data and suppression processing included.` },
          { _key: k(), icon: "Phone",      title: "Phone Outreach",       desc: `Conduct compliant phone outreach to ${leaf.specialty} with verified direct lines and TCPA-compliant records.` },
        ],
        featureGridSections: buildFeatureGrid(leaf.h1, leaf.specialty, leaf.role),
        proseSections: buildProse(leaf.h1, leaf.specialty, leaf.role, leaf.channel),
        faqItems: buildFaqs(leaf.h1, idx),
        complianceHeadline: "HIPAA-Adjacent, Compliance-Ready Data",
        complianceBody: richText(COMPLIANCE_BODY),
        backLink: { label: `← ${group.h1}`, href: `/${group.slug}` },
        metaTitle: `${leaf.h1} | Healthcare Data — Lorann LLC`,
        metaDescription: `Verified ${leaf.specialty} contact data for email, direct mail, and digital campaigns. NPI-validated, CCPA compliant, quarterly refreshed. Request a sample today.`,
        ogTitle: `${leaf.h1} | Lorann LLC`,
        ogDescription: `Reach ${leaf.specialty} with verified email addresses, phone numbers, and mailing data. Segmented by specialty, geography, and practice type.`,
        noIndex: false,
        focusKeyphrase: leaf.h1,
      };

      if (!DRY_RUN) {
        await client.create(leafDoc);
        console.log(`    ✓ Created`);
      } else {
        console.log(`    → Would create`);
      }
      created++;
    }
  }

  console.log(`\n\nDone! Created: ${created} | Skipped: ${skipped}`);
  console.log(`\nHub pages: ${GROUPS.length}`);
  console.log(`Leaf pages: ${GROUPS.reduce((a, g) => a + g.leaves.length, 0)}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
