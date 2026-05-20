#!/usr/bin/env node
/**
 * Generate unique prose section content for every leaf page.
 * Each page gets topic-specific "Why Choose" and "Who Can Use" content.
 * Patches both published and draft documents.
 */
import { createClient } from "next-sanity";

const TOKEN = "skSSRwRIB9hhK9GBYtQpEpyP4LAq7LEpHuGmoxQ51tn1puS9HTD8PLF2qmz9wdFuSARPyDYyvoBrfJkcAOIcY2n1mptvra97217aT7fllBwRU8mRKYShNzJuWqMDpcBn7eEXqFZZWvOBfZgY6olCwO3AJkxUQ2yj13w1d7MNhqSvdEIcZ4gx";

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

function key() { return Math.random().toString(36).slice(2, 14); }

// ─── Content generators per page ────────────────────────────

function generateContent(h1, slug) {
  const name = h1;
  const cat = detectCategory(slug);
  const whyChoose = generateWhyChoose(name, cat, slug);
  const whoCanUse = generateWhoCanUse(name, cat, slug);
  return [whyChoose, whoCanUse];
}

function detectCategory(slug) {
  if (slug.includes("healthcare")) return "healthcare";
  if (slug.includes("crm-users")) return "crm";
  if (slug.includes("erp-users")) return "erp";
  if (slug.includes("dbms-users")) return "dbms";
  if (slug.includes("operating-system")) return "os";
  if (slug.includes("software-email")) return "software";
  if (slug.includes("business-technology")) return "biztech";
  if (slug.includes("groupware")) return "groupware";
  if (slug.includes("network-users")) return "network";
  if (slug.includes("technology")) return "technology";
  if (slug.includes("other-industry")) return "industry";
  if (slug.includes("b2c-database")) return "b2c";
  return "general";
}

// ────────────────────────────────────────────────────────────
// WHY CHOOSE content — unique per page
// ────────────────────────────────────────────────────────────

const WHY_CHOOSE_TEMPLATES = {
  healthcare: [
    (n) => [
      `Choosing the right data source is the most important decision in any targeting campaign. Lorann's ${n} is not compiled from outdated public directories or scraped from unreliable web sources — it is built from verified, first-party data foundations that are continuously maintained for accuracy and deliverability.`,
      `When you license data from Lorann, you are getting more than a list of names. You are getting a precision-engineered audience asset — each record verified across multiple checkpoints, enriched with the attributes your campaigns need, and formatted for immediate activation across email, phone, direct mail, and digital channels.`,
      `Lorann's data team includes vertical specialists who understand the unique challenges of reaching your target audience. We do not just deliver records — we help you select the right segments, optimize your targeting criteria, and monitor deliverability throughout your campaign.`,
    ],
    (n) => [
      `In healthcare marketing, data quality is not optional — it determines whether your message reaches the right professional at the right practice. Lorann's ${n} is engineered for precision, built on licensed provider registries and validated through multi-step verification protocols.`,
      `Every contact in our ${n} undergoes deliverability testing, credential verification, and practice-status confirmation before entering the file. Records that fail any checkpoint are flagged, quarantined, and removed — ensuring your campaigns launch with confidence.`,
      `We maintain dedicated healthcare data analysts who track provider movements, credential changes, and practice closures in real time. This continuous monitoring means your ${n} reflects the market as it exists today, not as it existed six months ago.`,
    ],
    (n) => [
      `Healthcare marketers face a unique challenge: reaching licensed professionals through channels that comply with industry regulations while still delivering measurable ROI. Lorann's ${n} is purpose-built for this environment — every record carries opt-in status, channel permissions, and compliance flags.`,
      `What separates our ${n} from commodity data is the depth of enrichment. Beyond basic contact information, each record includes specialty codes, practice setting identifiers, prescribing authority flags, and geographic precision down to the census tract level.`,
      `Our clients choose Lorann because we treat data as a strategic asset, not a transactional commodity. When you license our ${n}, you receive ongoing support including segment consultation, deliverability monitoring, and quarterly data refresh notifications.`,
    ],
  ],
  crm: [
    (n) => [
      `Reaching CRM technology decision-makers requires data that reflects actual software adoption, not outdated install-base assumptions. Lorann's ${n} is built from verified technology profiles, tracking real deployment footprints across organizations of every size.`,
      `Each record in our ${n} includes confirmed technology stack details, company firmographics, and decision-maker contact information validated through multi-channel verification — email deliverability testing, phone append confirmation, and postal address standardization.`,
      `Our technology data team continuously monitors vendor announcements, product migrations, and contract renewal cycles to ensure our ${n} reflects current adoption patterns. This means your campaigns target active users, not organizations that switched platforms years ago.`,
    ],
  ],
  erp: [
    (n) => [
      `Enterprise resource planning represents one of the highest-value software categories for B2B marketers — but only if your data reflects actual deployment realities. Lorann's ${n} is compiled from verified implementation records, partner channel intelligence, and technology profiling surveys.`,
      `Every contact in our ${n} has been confirmed against current organizational technology stacks. We verify not just that an ERP system is installed, but which modules are active, what integration patterns are in place, and who holds budget authority for renewals and upgrades.`,
      `Lorann invests in ongoing technology intelligence gathering to keep our ${n} current. When vendors release new versions, sunset legacy products, or announce migration paths, our data reflects those changes within our standard refresh cycle — typically 45 to 60 days.`,
    ],
  ],
  dbms: [
    (n) => [
      `Database management systems sit at the core of every organization's technology infrastructure — and the professionals who manage them are among the most sought-after contacts in B2B marketing. Lorann's ${n} delivers verified database administrators, architects, and technology leaders with confirmed platform adoption data.`,
      `Our ${n} goes beyond basic name-and-email records. Each contact includes verified database platform details, deployment scale indicators, cloud vs. on-premises flags, and organizational firmographics that enable precise segmentation for your campaigns.`,
      `Lorann's technology intelligence team maintains real-time awareness of DBMS market shifts — migrations from legacy systems to cloud-native platforms, open-source adoption trends, and vendor consolidation patterns. This market awareness ensures our ${n} targets professionals making active technology decisions.`,
    ],
  ],
  os: [
    (n) => [
      `Operating system adoption data is foundational for technology marketers targeting infrastructure teams, DevOps professionals, and IT decision-makers. Lorann's ${n} is built from verified deployment intelligence, capturing real installation footprints rather than survey estimates.`,
      `Each record in our ${n} includes confirmed OS environment details, deployment scale, cloud infrastructure usage, and decision-maker contact information validated through our standard multi-channel verification protocol.`,
      `Our data team tracks operating system lifecycle events — version releases, end-of-support announcements, and migration windows — to ensure your campaigns reach professionals during active evaluation and transition periods when purchasing intent is highest.`,
    ],
  ],
  software: [
    (n) => [
      `Software buyer intelligence is the backbone of effective B2B technology marketing. Lorann's ${n} is assembled from verified technology adoption records, confirmed through direct profiling, partner channel intelligence, and deployment validation checks.`,
      `What makes our ${n} different is the depth of technology context attached to every contact. Beyond basic contact fields, each record carries confirmed software usage details, licensing tier indicators, and organizational technology maturity signals.`,
      `Lorann's software intelligence practice maintains continuous awareness of product releases, vendor acquisitions, and market shifts. When a product reaches end-of-life or a competitor launches a disruptive alternative, our ${n} is updated to reflect the new targeting landscape.`,
    ],
  ],
  biztech: [
    (n) => [
      `Business technology adoption spans a wide range of platforms and services — from emerging innovations to established enterprise tools. Lorann's ${n} captures verified technology profiles across this spectrum, giving marketers access to early adopters and established users alike.`,
      `Every record in our ${n} includes confirmed technology adoption signals, organizational firmographics, and multi-channel contact details. We verify email deliverability, phone accuracy, and postal standardization on every record before it enters the active file.`,
      `Our technology analysts track emerging business technology trends and adoption curves to ensure our ${n} reflects where the market is heading, not just where it has been. This forward-looking intelligence helps your campaigns reach buyers in active evaluation cycles.`,
    ],
  ],
  groupware: [
    (n) => [
      `Groupware and collaboration platforms sit at the intersection of productivity and communication — making their users high-value targets for technology marketers. Lorann's ${n} is compiled from verified collaboration platform adoption records across enterprise and mid-market organizations.`,
      `Each contact in our ${n} includes confirmed platform usage details, organizational deployment scale, and decision-maker contact information. We validate every record through email deliverability testing, phone verification, and postal address standardization.`,
      `As collaboration technology continues to evolve rapidly — with AI integration, hybrid work features, and platform consolidation — our data team keeps our ${n} current with the latest adoption patterns and migration trends in the groupware space.`,
    ],
  ],
  network: [
    (n) => [
      `Network infrastructure professionals manage the backbone of organizational connectivity — making them essential contacts for technology vendors, service providers, and security companies. Lorann's ${n} delivers verified network engineering and IT infrastructure contacts with confirmed technology stack details.`,
      `Our ${n} includes detailed technology adoption data covering network hardware vendors, software-defined networking platforms, security tools, and cloud connectivity services. Each record carries confirmed deployment context and multi-channel contact information.`,
      `Lorann's infrastructure intelligence team tracks the evolving network technology landscape — from SD-WAN adoption to zero-trust security transitions — ensuring our ${n} reflects current deployment realities and active purchasing cycles.`,
    ],
  ],
  technology: [
    (n) => [
      `Technology buyer data requires a level of specificity that generic business databases cannot deliver. Lorann's ${n} is purpose-built for technology marketing — every record carries verified technology adoption signals alongside accurate, deliverable contact information.`,
      `Our ${n} stands apart because we invest in continuous technology profiling rather than relying on static survey snapshots. Real deployment data, confirmed through multiple intelligence sources, drives every record in our file.`,
      `When you license our ${n}, you receive more than raw contacts — you gain access to Lorann's technology intelligence infrastructure, including segment consultation, deliverability support, and regular updates aligned with technology market cycles.`,
    ],
  ],
  industry: [
    (n) => [
      `Industry-specific marketing requires data that understands sectoral nuances — from regulatory environments and buying cycles to organizational hierarchies and decision-making patterns. Lorann's ${n} is engineered for marketers who need precision targeting within specialized verticals.`,
      `Every record in our ${n} undergoes industry-specific validation, including SIC/NAICS classification confirmation, organizational size verification, and contact role confirmation. We ensure the professionals in your file are active participants in purchasing decisions relevant to your offering.`,
      `Lorann's vertical data specialists maintain ongoing relationships with industry intelligence sources, trade organizations, and professional registries. This network ensures our ${n} reflects current market structure, emerging companies, and leadership changes across the sector.`,
    ],
  ],
  b2c: [
    (n) => [
      `Consumer marketing demands data that captures lifestyle attributes, purchasing behaviors, and demographic precision that generic databases simply cannot provide. Lorann's ${n} is assembled from privacy-compliant consumer intelligence sources, delivering rich audience profiles built for multi-channel activation.`,
      `Each record in our ${n} includes verified postal and email addresses, demographic indicators, interest-based segmentation signals, and geographic precision down to the household level. This depth of enrichment enables campaign personalization at scale.`,
      `Lorann's consumer data practice operates under strict privacy-by-design principles. Every record in our ${n} is sourced through opt-in channels, processed in compliance with CAN-SPAM, CCPA, and applicable state regulations, and refreshed on a regular cycle to maintain accuracy.`,
    ],
  ],
  general: [
    (n) => [
      `Finding the right audience is the difference between campaign success and wasted spend. Lorann's ${n} is precision-engineered to deliver verified, enriched contacts that drive measurable marketing outcomes across email, phone, postal, and digital channels.`,
      `Every record in our ${n} passes through a rigorous multi-step validation process — including email deliverability testing, phone number verification, postal address standardization, and organizational confirmation. Records that fail any checkpoint are removed from the active file.`,
      `When you license our ${n}, you gain a strategic partner, not just a data vendor. Lorann's team provides segment consultation, activation support, and ongoing deliverability monitoring throughout your campaign lifecycle.`,
    ],
  ],
};

// Per-page highlight variations based on slug uniqueness
function getHighlightSeed(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const HIGHLIGHT_POOLS = {
  healthcare: [
    { label: "VERIFICATION STANDARD", texts: [
      "Every record passes multi-step verification including email deliverability, phone validation, and postal certification — achieving 96%+ accuracy.",
      "Records undergo NPI cross-referencing, credential verification, and practice-status confirmation before entering the active file.",
      "Our verification protocol combines NCOA processing, CASS certification, and real-time email validation to deliver consistently high accuracy.",
    ]},
    { label: "AUDIENCE STRATEGY", texts: [
      "A named Lorann data strategist works with your team to optimize list selection, targeting criteria, and activation strategy.",
      "Our healthcare data team advises on specialty segmentation, practice-setting filters, and geographic targeting to maximize campaign relevance.",
      "Lorann assigns a dedicated account specialist who understands healthcare marketing — providing segment guidance and activation consulting.",
    ]},
    { label: "FLEXIBLE LICENSING", texts: [
      "Choose per-record, project-based, or 12-month unlimited-use licensing structured around your campaign economics.",
      "Our licensing model adapts to your campaign needs — from single-use project files to annual unlimited arrangements with full multi-channel rights.",
      "License records for postal, email, and telemarketing channels with flexible terms designed for healthcare marketing workflows.",
    ]},
    { label: "NPI VERIFICATION", texts: [
      "Every healthcare provider is validated against the National Provider Identifier Registry — no unverified NCP records enter our database.",
      "We cross-reference every provider record against the CMS NPI registry, state licensing boards, and specialty certification databases.",
      "NPI validation ensures every record represents a currently licensed, practicing healthcare professional with an active provider identifier.",
    ]},
    { label: "SPECIALTY PRECISION", texts: [
      "Filter by medical specialty, sub-specialty, practice setting, and credential type for campaigns that reach exactly the right practitioners.",
      "Our taxonomy covers 200+ medical specialties and sub-specialties, enabling granular targeting impossible with generic healthcare databases.",
      "Target by specialty code, board certification, fellowship training, and practice focus area — precision that drives higher engagement rates.",
    ]},
    { label: "COMPLIANCE BUILT IN", texts: [
      "Every record carries opt-in status, channel permission flags, and suppression list processing — compliance is embedded, not afterthought.",
      "Our healthcare data undergoes CAN-SPAM compliance review, state-level telemarketing regulation checks, and suppression file processing.",
      "Compliance documentation including data sourcing methodology, permission basis, and processing history is available for every campaign.",
    ]},
  ],
  crm: [
    { label: "TECHNOLOGY VERIFICATION", texts: [
      "Every record includes confirmed CRM platform deployment details — not self-reported survey data, but verified technology adoption intelligence.",
      "We validate CRM usage through multiple intelligence sources including technology profiling, partner channel data, and deployment confirmation.",
    ]},
    { label: "DECISION-MAKER ACCESS", texts: [
      "Contacts include IT directors, VP-level technology leaders, and business unit heads with confirmed CRM budget authority.",
      "Our records target the professionals who evaluate, purchase, and manage CRM platforms — from technical admins to C-suite sponsors.",
    ]},
    { label: "ADOPTION CURRENCY", texts: [
      "Our CRM adoption data is refreshed quarterly to reflect platform migrations, version upgrades, and vendor switches.",
      "We track CRM contract renewal cycles, implementation timelines, and migration patterns to identify high-intent prospects.",
    ]},
    { label: "INTEGRATION CONTEXT", texts: [
      "Records include related technology stack details — marketing automation, ERP, analytics tools — enabling cross-sell targeting strategies.",
      "Beyond CRM, each record carries confirmed tech stack context including connected platforms, integration patterns, and complementary tools.",
    ]},
  ],
  erp: [
    { label: "DEPLOYMENT INTELLIGENCE", texts: [
      "Every record includes confirmed ERP implementation details — modules in use, deployment model, and organizational scale indicators.",
      "Our ERP data captures real deployment footprints including active modules, cloud vs. on-premises status, and integration architecture.",
    ]},
    { label: "UPGRADE CYCLE TRACKING", texts: [
      "We monitor ERP vendor release schedules and end-of-support timelines to identify organizations in active upgrade evaluation windows.",
      "Our intelligence tracks version currency across ERP installations, flagging organizations running legacy versions approaching end-of-life.",
    ]},
    { label: "BUDGET AUTHORITY", texts: [
      "Contacts span IT leadership, finance executives, and operations directors who control ERP purchasing and renewal decisions.",
      "Records target the cross-functional buying committee typical in ERP decisions — IT, finance, operations, and executive sponsors.",
    ]},
    { label: "IMPLEMENTATION STATUS", texts: [
      "Know whether an organization is in active implementation, post-deployment optimization, or approaching renewal — and target accordingly.",
      "Our data distinguishes between new implementations, established deployments, and organizations evaluating platform changes.",
    ]},
  ],
  technology: [
    { label: "STACK INTELLIGENCE", texts: [
      "Every record includes verified technology adoption data — not assumptions, but confirmed deployment intelligence from multiple sources.",
    ]},
    { label: "BUYER INTENT SIGNALS", texts: [
      "Our data captures technology evaluation activity, vendor research patterns, and procurement signals to identify high-intent prospects.",
    ]},
    { label: "MULTI-CHANNEL VERIFIED", texts: [
      "Email, phone, and postal contacts are independently verified through dedicated validation processes for each channel.",
    ]},
    { label: "REFRESH CYCLE", texts: [
      "Technology adoption data is refreshed on a 45-60 day cycle, aligned with the pace of technology purchasing decisions.",
    ]},
  ],
  industry: [
    { label: "VERTICAL EXPERTISE", texts: [
      "Our data team includes industry specialists who understand sector-specific buying cycles, regulations, and organizational structures.",
      "Lorann's vertical data analysts maintain ongoing intelligence about industry trends, regulatory changes, and market structure shifts.",
    ]},
    { label: "SIC/NAICS PRECISION", texts: [
      "Every record carries confirmed industry classification codes — enabling precise vertical targeting without cross-sector contamination.",
      "Our classification verification goes beyond primary SIC codes to include secondary codes, revenue breakdowns, and business activity descriptions.",
    ]},
    { label: "ORGANIZATIONAL DEPTH", texts: [
      "Records include company size, revenue range, location count, and employee headcount for precise firmographic segmentation.",
      "Beyond contact details, each record carries organizational intelligence including headquarters location, subsidiary structure, and growth indicators.",
    ]},
    { label: "DECISION-MAKER MAPPING", texts: [
      "Contacts are mapped to functional roles within industry-specific buying committees — procurement, operations, finance, and executive leadership.",
      "Our role taxonomy is calibrated to industry-specific organizational structures, targeting the professionals who influence and approve purchasing decisions.",
    ]},
  ],
  b2c: [
    { label: "PRIVACY COMPLIANT", texts: [
      "Every record is sourced through opt-in channels and processed in compliance with CAN-SPAM, CCPA, TCPA, and applicable state privacy regulations.",
      "Our consumer data practice operates under privacy-by-design principles — sourcing, processing, and delivery all conform to current regulatory requirements.",
    ]},
    { label: "HOUSEHOLD PRECISION", texts: [
      "Geographic targeting extends to household level with verified postal addresses, ZIP+4 precision, and census-tract demographic overlays.",
      "Our consumer records carry address-level precision enhanced with neighborhood demographic profiles, housing data, and geographic cluster codes.",
    ]},
    { label: "LIFESTYLE ENRICHMENT", texts: [
      "Records include interest-based segmentation signals, purchasing propensity scores, and lifestyle indicators that drive personalized campaigns.",
      "Beyond demographics, each record carries behavioral and lifestyle attributes enabling message personalization that resonates with individual consumers.",
    ]},
    { label: "MULTI-CHANNEL READY", texts: [
      "Every record includes verified postal address, email (where available), and phone with channel-level permission flags for compliant activation.",
      "Consumer records are formatted for immediate activation across postal, email, and outbound calling channels — with permission status confirmed per channel.",
    ]},
  ],
};

// Fallback highlights
const GENERIC_HIGHLIGHTS = [
  { label: "DATA ACCURACY", texts: [
    "Every record undergoes multi-step verification including email deliverability, phone validation, and postal certification for maximum accuracy.",
  ]},
  { label: "STRATEGIC SUPPORT", texts: [
    "A dedicated Lorann data strategist works with your team to optimize list selection, targeting criteria, and activation approach.",
  ]},
  { label: "FLEXIBLE TERMS", texts: [
    "Choose per-record, project-based, or annual unlimited-use licensing structured around your specific campaign economics and volume needs.",
  ]},
  { label: "CONTINUOUS REFRESH", texts: [
    "Data is refreshed on a regular cycle with ongoing verification — ensuring your campaigns launch with current, deliverable contacts.",
  ]},
];

function generateWhyChoose(name, cat, slug) {
  const seed = getHighlightSeed(slug);
  const templates = WHY_CHOOSE_TEMPLATES[cat] || WHY_CHOOSE_TEMPLATES.general;
  const templateIdx = seed % templates.length;
  const paragraphs = templates[templateIdx](name);

  // Pick 4 highlights, using seed to vary selection
  const pool = HIGHLIGHT_POOLS[cat] || HIGHLIGHT_POOLS[Object.keys(HIGHLIGHT_POOLS).find(k => cat.startsWith(k))] || GENERIC_HIGHLIGHTS;
  const highlights = [];
  const usedLabels = new Set();
  for (let i = 0; i < 4 && i < pool.length; i++) {
    const idx = (seed + i * 7) % pool.length;
    const h = pool[idx];
    if (usedLabels.has(h.label)) {
      // Find next unused
      for (let j = 0; j < pool.length; j++) {
        const alt = pool[(idx + j + 1) % pool.length];
        if (!usedLabels.has(alt.label)) {
          usedLabels.add(alt.label);
          const textIdx = (seed + i) % alt.texts.length;
          highlights.push({ _key: key(), label: alt.label, text: alt.texts[textIdx] });
          break;
        }
      }
    } else {
      usedLabels.add(h.label);
      const textIdx = (seed + i) % h.texts.length;
      highlights.push({ _key: key(), label: h.label, text: h.texts[textIdx] });
    }
  }
  // Fill remaining if pool was small
  while (highlights.length < 4) {
    const fallback = GENERIC_HIGHLIGHTS[highlights.length % GENERIC_HIGHLIGHTS.length];
    if (!usedLabels.has(fallback.label)) {
      usedLabels.add(fallback.label);
      highlights.push({ _key: key(), label: fallback.label, text: fallback.texts[0] });
    } else {
      break;
    }
  }

  return {
    _key: key(),
    style: "split",
    kicker: "The Lorann Difference",
    titlePlain: "Why choose Lorann's",
    titleAccent: `${name}?`,
    paragraphs,
    highlights,
  };
}

// ────────────────────────────────────────────────────────────
// WHO CAN USE content — unique per page
// ────────────────────────────────────────────────────────────

const WHO_CAN_USE_TEMPLATES = {
  healthcare: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} serves pharmaceutical companies, medical device manufacturers, health IT vendors, healthcare staffing firms, and continuing medical education providers who need to reach verified healthcare professionals with precision and compliance.`,
        `Marketing teams use the ${n} for HCP awareness campaigns, product launches, and thought-leader engagement. Sales teams rely on it for territory planning, call-center outreach, and conference follow-up. Medical affairs teams leverage it for KOL identification and clinical trial recruitment outreach.`,
        `Whether you are a Fortune 500 pharma company running a national campaign or a regional medical device distributor building a local prospect list, Lorann's ${n} scales to your needs — with the same verification standards and compliance framework at every volume tier.`,
      ],
      highlights: [
        { _key: key(), label: "Marketing Teams", text: "Brand campaigns, direct mail, digital audiences, HCP programs, and content syndication." },
        { _key: key(), label: "Sales Teams", text: "Outbound prospecting, territory planning, pipeline building, and call-center activation." },
        { _key: key(), label: "Agencies & Consultants", text: "Multi-client campaigns, market research, lead generation programs, and audience strategy." },
      ],
    }),
    (n) => ({
      paragraphs: [
        `Lorann's ${n} is built for organizations that market to healthcare professionals — from global pharmaceutical brands to specialized medical technology startups. Any team that needs verified provider contacts with compliance documentation can activate this data.`,
        `Product marketing managers use it to launch new therapies and devices to targeted specialties. Business development representatives use it to identify and qualify prospective accounts. Market access teams leverage it for payer outreach and formulary positioning.`,
        `The ${n} is equally effective for established organizations with national campaigns and emerging companies entering new therapeutic areas. Lorann's flexible licensing ensures you pay for the reach you need without committing to volumes you cannot use.`,
      ],
      highlights: [
        { _key: key(), label: "Pharmaceutical Brands", text: "Product launches, HCP engagement, medical education, and brand awareness across therapeutic areas." },
        { _key: key(), label: "Medical Device Companies", text: "Surgeon targeting, hospital procurement outreach, and specialty-specific product promotion." },
        { _key: key(), label: "Health IT Vendors", text: "EHR adoption campaigns, clinical workflow tools, and practice management software promotion." },
      ],
    }),
    (n) => ({
      paragraphs: [
        `Our ${n} supports a diverse range of healthcare marketing use cases — from national DTC-adjacent campaigns to hyperlocal specialty targeting. Organizations of every size and focus area rely on this data to connect with the right providers.`,
        `Clinical research organizations use it to identify investigators and site coordinators. Healthcare staffing agencies use it to source candidates and market placement services. Continuing medical education providers use it to promote accredited programs and conferences.`,
        `Whether your campaign targets a single ZIP code or every licensed professional in a specialty nationwide, Lorann's ${n} delivers the coverage, accuracy, and compliance infrastructure your team requires.`,
      ],
      highlights: [
        { _key: key(), label: "Clinical Research Teams", text: "Investigator recruitment, site identification, and patient-referral network development." },
        { _key: key(), label: "Healthcare Recruiters", text: "Provider sourcing, credential-based filtering, and geographic candidate mapping." },
        { _key: key(), label: "CME Providers", text: "Program promotion, specialty-targeted invitations, and accreditation outreach." },
      ],
    }),
  ],
  crm: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} is designed for technology vendors, SaaS companies, systems integrators, and consulting firms who sell into the CRM ecosystem. If your product or service connects to, competes with, or complements CRM platforms, this data is built for your campaigns.`,
        `Marketing teams use it for ABM programs, competitive displacement campaigns, and platform-specific content syndication. Sales development teams use it to identify accounts with confirmed CRM adoption and qualify leads based on technology stack context.`,
        `Whether you are targeting enterprise Salesforce deployments or mid-market CRM adopters evaluating new platforms, Lorann's ${n} provides the technology intelligence and contact accuracy your pipeline depends on.`,
      ],
      highlights: [
        { _key: key(), label: "SaaS Vendors", text: "Competitive displacement, integration partnerships, and platform-specific marketing campaigns." },
        { _key: key(), label: "Systems Integrators", text: "Implementation services, migration projects, and consulting engagement development." },
        { _key: key(), label: "Marketing Agencies", text: "Client campaign support, ABM execution, and technology-targeted audience development." },
      ],
    }),
  ],
  erp: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} serves ERP software vendors, implementation partners, add-on solution providers, and IT consulting firms who need access to confirmed ERP decision-makers. This data powers competitive displacement, upgrade campaigns, and net-new pipeline development.`,
        `Account-based marketing teams use it to target organizations running specific ERP platforms. Channel partners use it to identify implementation and migration opportunities. Business development teams use it to map the ERP landscape within their target verticals.`,
        `From Fortune 500 enterprises running SAP to mid-market manufacturers on legacy ERP systems, Lorann's ${n} covers the full spectrum of ERP adoption — with the deployment context your campaigns need to convert.`,
      ],
      highlights: [
        { _key: key(), label: "ERP Vendors", text: "Competitive intelligence, upgrade promotion, and new-logo acquisition across deployment types." },
        { _key: key(), label: "Implementation Partners", text: "Migration project sourcing, deployment consulting, and post-implementation services marketing." },
        { _key: key(), label: "Add-on Providers", text: "Integration marketing, module-specific targeting, and complementary solution promotion." },
      ],
    }),
  ],
  technology: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} is built for technology companies, managed service providers, VARs, and IT consulting firms who sell products and services to technology buyers. The data enables precise targeting based on confirmed technology adoption.`,
        `Marketing teams use it for technology-specific campaigns, competitive programs, and cross-sell initiatives. Sales teams use it to qualify accounts by technology stack and prioritize outreach based on adoption signals.`,
        `Whether your go-to-market strategy targets enterprise accounts or the mid-market, Lorann's ${n} provides the technology intelligence and contact precision your pipeline generation depends on.`,
      ],
      highlights: [
        { _key: key(), label: "Technology Vendors", text: "Product marketing, competitive campaigns, and technology-adoption-based targeting programs." },
        { _key: key(), label: "Managed Service Providers", text: "Client acquisition, services marketing, and technology migration opportunity development." },
        { _key: key(), label: "Channel Partners", text: "Reseller outreach, partner recruitment, and co-marketing campaign development." },
      ],
    }),
  ],
  industry: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} serves B2B marketers, industry-focused sales teams, and specialized agencies who need access to verified contacts within specific economic sectors. The data enables campaigns that speak directly to vertical pain points and purchasing patterns.`,
        `Marketing managers use it for industry-focused content campaigns, trade show follow-up, and vertical ABM programs. Business development teams use it to map target accounts within specific industries and identify decision-makers by functional role.`,
        `Whether you serve a single vertical exclusively or run cross-industry campaigns that require sector-level segmentation, Lorann's ${n} delivers the industry precision and contact quality your programs demand.`,
      ],
      highlights: [
        { _key: key(), label: "B2B Sales Teams", text: "Industry-targeted prospecting, account mapping, and vertical pipeline development." },
        { _key: key(), label: "Marketing Departments", text: "Vertical content campaigns, industry-specific ABM, and trade show outreach programs." },
        { _key: key(), label: "Industry Consultants", text: "Market research, competitive intelligence, and sector-focused lead generation." },
      ],
    }),
  ],
  b2c: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} is designed for consumer brands, direct-to-consumer companies, retail chains, and agencies that market to individual households. The data enables personalized outreach based on demographic, geographic, and lifestyle attributes.`,
        `Brand marketing teams use it for customer acquisition campaigns, loyalty program expansion, and seasonal promotions. Performance marketing teams use it for postal prospecting, email list building, and lookalike audience development.`,
        `Whether you are a national retailer running omnichannel campaigns or a regional service provider building local awareness, Lorann's ${n} delivers the household-level precision and privacy compliance your consumer programs require.`,
      ],
      highlights: [
        { _key: key(), label: "Brand Marketers", text: "Customer acquisition, retention campaigns, and cross-channel consumer engagement programs." },
        { _key: key(), label: "Performance Teams", text: "Postal prospecting, email acquisition, lookalike modeling, and conversion-focused campaigns." },
        { _key: key(), label: "Agency Teams", text: "Multi-client consumer programs, audience development, and campaign analytics support." },
      ],
    }),
  ],
  general: [
    (n) => ({
      paragraphs: [
        `Lorann's ${n} serves marketing teams, sales organizations, and agencies across industries who need verified, enriched contacts for multi-channel campaigns. The data enables targeted outreach that drives measurable business outcomes.`,
        `Marketing departments use it for demand generation, ABM programs, and content distribution. Sales teams use it for pipeline development, territory planning, and outbound prospecting. Agencies use it to power client campaigns with reliable audience data.`,
        `Whether you are building awareness with a national campaign or driving conversions with targeted outreach, Lorann's ${n} delivers the contact quality, enrichment depth, and activation readiness your programs require.`,
      ],
      highlights: [
        { _key: key(), label: "Marketing Teams", text: "Demand generation, brand campaigns, ABM programs, and multi-channel audience activation." },
        { _key: key(), label: "Sales Organizations", text: "Pipeline development, territory mapping, outbound prospecting, and account-based selling." },
        { _key: key(), label: "Agencies & Partners", text: "Client campaign execution, audience development, and data-driven marketing strategy." },
      ],
    }),
  ],
};

function generateWhoCanUse(name, cat, slug) {
  const seed = getHighlightSeed(slug);
  const catKey = Object.keys(WHO_CAN_USE_TEMPLATES).find(k => k === cat) ||
    Object.keys(WHO_CAN_USE_TEMPLATES).find(k => cat.startsWith(k)) || "general";
  const templates = WHO_CAN_USE_TEMPLATES[catKey] || WHO_CAN_USE_TEMPLATES.general;
  const templateIdx = seed % templates.length;
  const { paragraphs, highlights } = templates[templateIdx](name);

  return {
    _key: key(),
    style: "centered",
    kicker: "Built For Your Team",
    titlePlain: "Who can use",
    titleAccent: `our ${name}?`,
    paragraphs,
    highlights,
  };
}

// ────────────────────────────────────────────────────────────
// Main migration
// ────────────────────────────────────────────────────────────

async function main() {
  const pages = await client.fetch(
    `*[_type == "page" && templateType == "leaf"]{_id, h1, "slug": slug.current}`
  );

  console.log(`Found ${pages.length} leaf pages to update`);

  let success = 0;
  let errors = 0;

  for (const page of pages) {
    const proseSections = generateContent(page.h1, page.slug);

    // Determine base ID (strip drafts. prefix if present)
    const baseId = page._id.replace(/^drafts\./, "");
    const draftId = `drafts.${baseId}`;

    for (const docId of [baseId, draftId]) {
      try {
        await client.patch(docId).set({ proseSections }).commit();
        console.log(`  ✓ ${docId} — ${page.h1}`);
        success++;
      } catch (err) {
        if (err.statusCode === 404) {
          // Document doesn't exist in this form, skip
        } else {
          console.error(`  ✗ ${docId} — ${err.message}`);
          errors++;
        }
      }
    }
  }

  console.log(`\nDone. ${success} documents updated, ${errors} errors.`);
}

main().catch(console.error);
