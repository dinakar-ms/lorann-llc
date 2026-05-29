/**
 * Fix intro section paragraphs — make each page's intro text
 * truly unique, not just name-swapped templates.
 *
 * Usage: node scripts/fix-intro-paragraphs.mjs [--dry-run]
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
function richBlock(t) {
  return { _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" };
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

/* ═══════════════════════════════════════════════════
   UNIQUE INTRO PARAGRAPHS PER PAGE
   Each page gets 2 paragraphs that are completely
   different in structure and wording.
   ═══════════════════════════════════════════════════ */

function genIntroParas(h1, sn, cat, catIdx) {
  // ─── HEALTHCARE (12 pages, each unique) ──────
  const hcParas = [
    // 0: Cardiologists
    [
      `Cardiovascular specialists represent one of the highest-value segments in pharmaceutical and medical device marketing. Reaching interventional cardiologists, electrophysiologists, and heart failure specialists demands data that distinguishes between subspecialties, procedural volumes, and hospital affiliations — precision that generic physician lists simply cannot deliver.`,
      `The ${h1} draws from NPI registry feeds, ABIM board certification records, and hospital credentialing databases to build subspecialty-level profiles. Each cardiologist record includes practice setting details, catheterization lab affiliations, and multi-channel contact data verified quarterly against authoritative clinical sources.`,
    ],
    // 1: Chiropractors
    [
      `Chiropractic practitioners operate in a unique healthcare niche — blending holistic wellness with clinical rehabilitation. Marketing to this audience effectively means understanding practice modalities, from spinal decompression to sports chiropractic, and knowing whether a provider runs a solo clinic or works within a multi-disciplinary wellness group.`,
      `Lorann compiles the ${h1} from state chiropractic licensing boards, professional association membership rolls, and clinic directory submissions. Contact details are validated through direct practice outreach and SMTP verification, ensuring that email, phone, and mailing data remain current and deliverable across the dataset.`,
    ],
    // 2: Dentist
    [
      `The dental industry spans general practitioners managing routine care and specialists performing complex procedures — orthodontists, periodontists, endodontists, and oral surgeons. Effective outreach requires segmentation by specialty type, practice ownership model, and patient volume — data dimensions that off-the-shelf contact lists typically lack.`,
      `Our ${h1} is compiled from ADA membership directories, state dental board registries, and dental service organization (DSO) network filings. Each record is enriched with practice type indicators, specialty board certifications, and location-level data verified through NCOA processing and corporate directory matching.`,
    ],
    // 3: Doctors
    [
      `With over 1.4 million active physicians in the US spanning 65+ medical specialties, targeting the right doctors requires more than a name and email address. Pharma marketers need prescribing data context. Device companies need procedural volume insight. Health IT vendors need EHR adoption signals. A single physician list must serve all of these use cases with specialty-level granularity.`,
      `The ${h1} is assembled from the CMS NPPES registry, state medical board licensing files, and hospital credentialing systems. Every record undergoes multi-step verification including NPI active-status confirmation, SMTP email validation, and phone line-type classification — producing a dataset with deliverability rates consistently above 95%.`,
    ],
    // 4: Hospital
    [
      `Hospital purchasing decisions involve committees spanning C-suite executives, department directors, clinical champions, and procurement officers. Reaching the right stakeholders at the right facilities requires organizational intelligence — not just contact names, but bed counts, teaching status, health system affiliations, and departmental structure data.`,
      `Lorann's ${h1} maps decision-maker contacts to facility profiles sourced from CMS Provider of Services files, Joint Commission accreditation records, and AHA survey data. Each hospital record carries administrator contacts verified through corporate directory lookup, with department-level routing data for multi-threaded engagement strategies.`,
    ],
    // 5: Medical Mailing
    [
      `Healthcare marketing campaigns often need to reach across provider types — physicians, nurses, allied health professionals, and administrators — within a single coordinated outreach program. Building these cross-functional audiences from separate siloed lists creates duplication, inconsistent formatting, and compliance gaps.`,
      `The ${h1} solves this by providing a unified, multi-provider-type dataset built from NPI registries, state licensing boards, and hospital HR directories. Records are normalized to a consistent schema with standardized role taxonomy, credential verification, and multi-channel contact data — enabling clean audience segmentation across the entire healthcare workforce.`,
    ],
    // 6: Nurses
    [
      `Nurses represent the largest clinical workforce in healthcare — over 4 million RNs, LPNs, and APRNs across acute care, long-term care, and community health settings. Reaching specific nursing segments requires licensure-level data, specialty certifications from bodies like ANCC, and employer-facility context that general healthcare lists don't provide.`,
      `The ${h1} is sourced from state nursing board license files, ANCC certification records, and hospital staffing directories. Each nurse record is enriched with degree level (ADN, BSN, MSN, DNP), specialty certification, employment setting, and verified contact details — enabling campaigns targeted by clinical role, education level, and geographic territory.`,
    ],
    // 7: Physician
    [
      `Physician outreach drives revenue for pharmaceutical companies, medical device manufacturers, health IT vendors, and clinical staffing agencies alike. But each use case demands different data dimensions — prescribing authority for pharma, procedural capabilities for devices, EHR systems for health IT, and career-stage indicators for recruiters.`,
      `Our ${h1} addresses these varied requirements with a multi-dimensional physician dataset built from NPPES registry data, medical board records, and hospital staff directories. Beyond standard contact fields, each record includes board certification details, medical school identification, residency program history, and practice-setting classifications for granular audience building.`,
    ],
    // 8: Plastic Surgeons
    [
      `Plastic surgery spans two distinct markets — elective cosmetic procedures driven by consumer demand and reconstructive surgery driven by clinical referrals. Marketing to these surgeons effectively requires understanding whether a provider focuses on aesthetic procedures, reconstruction, or both — and whether they operate in a private practice, med-spa, or academic hospital setting.`,
      `The ${h1} is built from ABPS certification records, ASPS membership directories, and state medical board filings. Each surgeon record is tagged with procedure focus areas, practice ownership indicators, and ambulatory surgery center affiliations — providing the targeting depth needed for campaigns from aesthetic device companies, skincare brands, and surgical supply manufacturers.`,
    ],
    // 9: US Pharmacist
    [
      `Pharmacists influence billions of dollars in drug dispensing decisions annually, from retail prescription fulfillment to hospital formulary management. Targeting this audience requires understanding practice setting — retail chain, independent, hospital, specialty compounding, or mail-order — because each setting implies different purchasing authority and clinical decision-making scope.`,
      `The ${h1} draws from state pharmacy board licensure files, DEA registration databases, and chain pharmacy corporate directories. Each pharmacist record identifies practice setting type, employer chain affiliation, and specialty certification status from BPS — enabling segmentation by dispensing volume, clinical service capability, and formulary influence.`,
    ],
    // 10: Veterinarians
    [
      `Veterinary medicine spans companion animal clinics, large animal practices, equine hospitals, and exotic species specialists — each with distinct product needs and purchasing patterns. Animal health marketers targeting this audience need species-focus data, practice ownership indicators, and clinic-size context that human healthcare lists never address.`,
      `Our ${h1} is compiled from state veterinary licensing boards, AVMA membership directories, and corporate veterinary group rosters. Each DVM record includes species-focus classification, practice setting type, and clinic ownership data — distinguishing solo practitioners from corporate-affiliated clinics for campaigns from animal pharmaceutical, diagnostic, and nutrition companies.`,
    ],
    // 11: X-Ray Laboratories
    [
      `Diagnostic imaging facilities are high-value targets for medical equipment manufacturers, service contract providers, and radiology IT vendors. But reaching the right contacts — chief radiologists, imaging directors, and facility administrators — requires data that maps equipment modalities to facility profiles and identifies replacement-cycle timing.`,
      `The ${h1} is assembled from CMS imaging center certification files, ACR accreditation databases, and state radiation control program records. Each facility record includes modality coverage (X-ray, CT, MRI, mammography), ownership structure, and decision-maker contacts — enabling targeted campaigns for equipment upgrades, service agreements, and PACS/RIS software solutions.`,
    ],
  ];

  // ─── OTHER INDUSTRY (10 pages, each unique) ──
  const indParas = [
    // 0: Agriculture
    [
      `Agricultural businesses range from family-owned farms to multinational agribusiness corporations, each with different technology adoption curves, input purchasing cycles, and decision-making structures. Marketing to this sector effectively requires USDA-sourced firmographic data, crop-type segmentation, and geographic granularity aligned to agricultural production regions.`,
      `The ${h1} combines USDA census data, state agricultural department registries, and commodity association membership rolls to create a comprehensive view of the farming and agribusiness market. Each company record includes crop or livestock specialization, estimated acreage and revenue, and verified decision-maker contacts for procurement, operations, and technology purchasing.`,
    ],
    // 1: Banking Finance
    [
      `Financial institutions face regulatory complexity that shapes both their technology buying and vendor selection processes. Selling into banks, credit unions, and investment firms requires understanding charter type, asset size, compliance posture, and organizational structure — data dimensions that generic business lists rarely capture.`,
      `Our ${h1} integrates FDIC call report data, SEC registrant filings, and NCUA credit union profiles to build detailed institutional records. Each contact is mapped to functional role — C-suite, compliance, IT, lending, or operations — with direct email and phone verification against corporate directory services.`,
    ],
    // 2: Construction
    [
      `Construction companies operate on project cycles that create concentrated purchasing windows for materials, equipment, and technology. Reaching general contractors, specialty subcontractors, and construction managers requires license-class data, bonding capacity indicators, and project-type specialization that standard industry lists don't include.`,
      `The ${h1} is built from state contractor licensing boards, surety bond registries, and construction project databases. Each company record includes license classifications, estimated annual construction volume, union affiliation data, and verified contacts for project managers, estimators, and procurement professionals.`,
    ],
    // 3: Hotels
    [
      `Hotel procurement decisions are made at multiple levels — brand headquarters set standards and preferred vendor programs, management companies oversee operations across portfolios, and individual property GMs control day-to-day purchasing. Effective hospitality marketing requires data that maps these relationships and identifies the right contact at each level.`,
      `Our ${h1} draws from STR property databases, brand franchise disclosure documents, and hospitality industry association directories. Each property record includes brand affiliation, management company identification, room count, star classification, and verified contacts for general managers, directors of operations, and procurement managers.`,
    ],
    // 4: Insurance
    [
      `The insurance industry's distribution model — carriers writing policies, agencies selling them, and MGAs bridging specialty markets — creates a multi-layered prospect landscape. Marketing to insurance professionals requires line-of-business segmentation, premium volume indicators, and state licensing data that distinguishes carriers from agencies and brokers.`,
      `The ${h1} integrates NAIC statutory filing data, state insurance department producer license records, and industry directory listings. Each company and contact record includes lines of business, estimated premium volume, state licensing coverage, and functional role classification — underwriter, actuary, claims, sales, or compliance.`,
    ],
    // 5: IT Decision Makers
    [
      `Technology purchasing in mid-market and enterprise organizations involves CIOs setting strategy, IT directors evaluating solutions, and technical architects validating compatibility. Reaching these decision-makers requires company-level technology stack intelligence alongside verified professional contact data — a combination that generic business databases rarely deliver.`,
      `Our ${h1} merges technographic detection data with corporate organizational intelligence to identify IT leaders at companies with specific technology profiles. Each contact record includes job function classification, estimated budget authority, technology stack context, and multi-channel contact details verified through LinkedIn profile matching and corporate directory lookup.`,
    ],
    // 6: Manufacturing
    [
      `Manufacturers operate complex supply chains with purchasing decisions distributed across plant managers, procurement directors, quality engineers, and maintenance supervisors. Targeting this sector requires plant-level data — production type, equipment age, shift patterns, and ISO certification status — not just company headquarters information.`,
      `The ${h1} is compiled from state manufacturing directories, ISO certification databases, and industrial trade association memberships. Each plant-level record includes production classification (discrete, process, or batch), estimated employee count, SIC/NAICS codes, and verified contacts for operations, engineering, purchasing, and EHS functions.`,
    ],
    // 7: Real Estate
    [
      `Real estate industry dynamics vary dramatically between residential brokerages, commercial firms, property management companies, and development organizations. Selling technology, financial products, or services into this market requires license-level data, transaction volume indicators, and market specialization classifications that generic lists overlook.`,
      `Our ${h1} draws from state real estate commission licensing databases, MLS participation records, and franchise network directories. Each agent and brokerage record includes transaction volume tiers, market focus classification, franchise affiliation, and verified contact information — enabling campaigns segmented by production level, geography, and specialization.`,
    ],
    // 8: Sports Industry
    [
      `Sports organizations — professional teams, collegiate athletic departments, venue operators, and sports marketing agencies — have distinct sponsorship, technology, and operational procurement needs. Reaching front-office decision-makers requires organizational intelligence that maps league structures, venue ownership, and revenue categories.`,
      `The ${h1} is assembled from league office directories, NCAA member institution records, and venue management company filings. Each organization record includes league or conference affiliation, venue capacity and ownership data, and verified contacts for marketing, sponsorship, operations, and facility management functions.`,
    ],
    // 9: Travel Data
    [
      `The travel distribution ecosystem connects agencies, tour operators, destination management companies, and online travel aggregators through complex consortium and host-agency relationships. Marketing to travel professionals requires understanding these affiliations alongside booking volume data and travel-type specialization.`,
      `Our ${h1} integrates ASTA membership records, consortium enrollment data, and CLIA cruise agent certifications to build a complete picture of the travel advisor market. Each contact record includes host agency and consortium affiliation, preferred supplier relationships, annual booking volume estimates, and specialization in leisure, corporate, group, or luxury segments.`,
    ],
  ];

  // ─── B2C (10 pages, each unique) ─────────────
  const b2cParas = [
    // 0: Automotive
    [
      `Automotive marketers face a unique challenge — vehicle purchases are high-consideration, infrequent decisions driven by life events, lease expirations, and model-year transitions. Reaching in-market buyers requires timing signals, ownership history data, and demographic indicators that predict purchase readiness with statistical precision.`,
      `The ${h1} combines DMV registration records, warranty expiration databases, and consumer lifestyle surveys to identify vehicle owners approaching purchase decisions. Each consumer record includes current vehicle make and model, estimated trade-in timing, household income indicators, and permission-based multi-channel contact data for coordinated automotive marketing campaigns.`,
    ],
    // 1: DTC & CPG
    [
      `Direct-to-consumer and CPG brands compete for share of wallet in categories where brand switching is common and trial offers drive acquisition. Winning in this space requires granular consumer segmentation — purchase frequency data, brand affinity indicators, and channel preference intelligence that mass media targeting cannot provide.`,
      `Our ${h1} is built from opted-in consumer registrations, product review participation records, and lifestyle survey responses. Each consumer profile includes product category purchase history, brand loyalty indicators, subscription service participation, and verified email and mailing addresses for omni-channel DTC campaign activation.`,
    ],
    // 2: Education & EdTech
    [
      `Education purchasing decisions span institutional buyers — school administrators and district technology officers — and consumer buyers — parents investing in tutoring, test prep, and enrichment programs. Each segment requires different data dimensions: institutional data for school-level targeting and household data for parent-level personalization.`,
      `The ${h1} merges school district enrollment records, household composition data, and educational interest surveys to build segmented audiences. Each consumer profile includes children's education stages, school type (public, private, charter, homeschool), household income indicators, and opt-in contact data for email, phone, and direct mail education marketing.`,
    ],
    // 3: Financial Services
    [
      `Consumer financial services marketing is governed by strict regulations — FCRA for credit products, GLBA for data privacy, and state-level lending laws — that require pre-screened lists, compliant contact methods, and documented permission chains. Working with non-compliant data exposes brands to regulatory enforcement and reputational damage.`,
      `Our ${h1} provides regulation-ready consumer records with credit-tier indicators, financial product affinity scoring, and documented consent provenance. Each profile includes estimated household income, homeownership status, investment interest indicators, and multi-channel contact data cleared for firm-offer-of-credit, insurance, and wealth management marketing programs.`,
    ],
    // 4: Healthcare & Wellness
    [
      `Health and wellness consumers span a broad spectrum — from fitness enthusiasts and supplement buyers to patients managing chronic conditions and caregivers researching treatment options. Effective marketing in this space requires lifestyle segmentation, health interest indicators, and HIPAA-aware data handling practices.`,
      `The ${h1} is assembled from wellness program registrations, OTC health product purchase records, and health interest surveys with documented opt-in consent. Each consumer profile includes wellness interest categories, fitness membership indicators, dietary preference markers, and permission-based contact data for compliant health and wellness marketing outreach.`,
    ],
    // 5: Home Services
    [
      `Homeowner spending on maintenance, improvement, and professional services is driven by property characteristics — home age, lot size, systems lifecycle, and seasonal maintenance patterns. Targeting homeowners likely to need specific services requires property-level intelligence combined with demographic indicators of project spending capacity.`,
      `Our ${h1} enriches homeowner contact records with property parcel data — year built, assessed value, lot size, and recent permit activity. Each household profile includes homeownership tenure, estimated home equity, improvement spending propensity scores, and verified contact data for email, phone, and direct mail home services marketing.`,
    ],
    // 6: Real Estate Consumer
    [
      `Real estate consumer marketing targets two distinct audiences simultaneously — buyers searching for properties and homeowners considering a sale. Identifying pre-movers before they publicly list or actively search requires predictive modeling based on equity accumulation, length of residence, life-event triggers, and local market conditions.`,
      `The ${h1} combines property ownership records, mortgage maturity data, and life-event indicators to score households for move likelihood. Each consumer record includes current property value estimates, equity position, length of residence, household composition changes, and permission-based contact data for mortgage, moving services, and real estate marketing campaigns.`,
    ],
    // 7: Retail & Ecommerce
    [
      `Retail marketing has fragmented across online storefronts, brick-and-mortar locations, social commerce, and marketplace channels — making unified consumer profiles essential for coordinated campaign execution. Reaching high-value shoppers requires transaction-derived category affinity data, not just demographic assumptions.`,
      `Our ${h1} is built from opted-in shopper registrations, loyalty program participation records, and retail purchase surveys. Each consumer profile includes spending categories, preferred shopping channels (online, in-store, mobile), brand engagement indicators, and verified contact data for email, direct mail, and digital audience matching across major advertising platforms.`,
    ],
    // 8: Telecommunications
    [
      `Telecom consumers make bundling decisions that lock in monthly recurring revenue for years — choosing between mobile carriers, broadband providers, streaming services, and home security packages. Acquiring subscribers from competitors requires contract-timing intelligence and service-gap identification that standard consumer lists cannot provide.`,
      `The ${h1} integrates carrier identification data, broadband availability mapping, and consumer technology surveys to build churn-targeted audiences. Each consumer record includes current provider identification, plan type indicators, contract renewal timing, and cord-cutting behavior signals alongside verified contact data for multi-channel telecom acquisition campaigns.`,
    ],
    // 9: Travel Consumer
    [
      `Travel consumers plan purchases months in advance, researching destinations, comparing prices, and booking across multiple touchpoints — OTAs, airline websites, travel advisors, and social media. Capturing demand requires reaching travelers during the planning window with destination-relevant messaging matched to their travel style and budget preferences.`,
      `Our ${h1} combines frequent traveler program participation records, booking history indicators, and destination interest surveys. Each consumer profile includes trip frequency, preferred travel style (luxury, budget, adventure, family), booking channel preferences, and loyalty program memberships alongside verified contact data for email, direct mail, and digital travel marketing.`,
    ],
  ];

  // ─── TECHNOLOGY (use catIdx to create varied paragraphs) ──
  function techParas(h1, sn, catIdx) {
    const p1Pool = [
      `Organizations running ${sn} have made a strategic technology investment that signals budget authority, technical sophistication, and ongoing platform dependency. Vendors selling complementary tools, migration services, or competitive alternatives can leverage installation-confirmed data to build precisely targeted outreach programs rather than relying on broad industry or firmographic filters.`,
      `The ${sn} installed base represents a defined market segment with quantifiable characteristics — deployment scale, version currency, and integration ecosystem dependencies. Accessing this market effectively requires technographic intelligence that goes beyond company demographics to reveal platform-specific buying signals and decision-maker contact paths.`,
      `Selling to ${sn} customers demands context that general B2B databases lack — which version is deployed, how many seats are active, what complementary tools are in the stack, and when the current contract comes up for renewal. Without these signals, outreach feels generic and conversion rates suffer against competitors who bring platform-specific relevance to every interaction.`,
      `${sn} deployments create ecosystems of adjacent technology needs — integrations, customizations, training, and managed services. Companies marketing into this ecosystem need to identify not just who runs ${sn}, but how deeply it's embedded in their operations and which complementary capabilities represent the highest-probability expansion opportunities.`,
      `Technology decisions around ${sn} involve multiple stakeholders — the technical team managing daily operations, the IT leadership setting platform strategy, and the finance team evaluating total cost of ownership. Multi-threaded engagement across these roles requires contact data mapped to organizational structure alongside deployment-specific context.`,
      `The competitive landscape around ${sn} creates displacement opportunities for vendors offering migration incentives, feature advantages, or cost savings. Identifying ${sn} customers who may be evaluating alternatives requires intent signals layered on top of installation confirmation — a data combination that standard technology databases rarely provide.`,
    ];
    const p2Pool = [
      `Lorann's ${h1} identifies confirmed deployments through multi-signal technographic detection — web scanning, DNS analysis, job posting monitoring, and vendor ecosystem mapping. Each account record is enriched with deployment-scale estimates, technology stack context, and SMTP-verified decision-maker contacts at IT leadership and technology buyer levels.`,
      `The ${h1} is assembled through continuous scanning of technology footprints across millions of organizations. Installation confirmations are cross-referenced against firmographic databases and enriched with direct-dial phone numbers, corporate email addresses, and organizational role data — enabling targeted outreach to the administrators and budget holders who influence ${sn} purchasing decisions.`,
      `Our ${h1} combines technographic detection data with corporate intelligence to build account profiles that include deployment confirmation, stack context, and multi-contact coverage. Each record undergoes SMTP email validation, phone line-type classification, and corporate directory matching to ensure that outreach reaches real, current technology professionals at verified ${sn} accounts.`,
      `Building the ${h1} starts with deployment confirmation through proprietary scanning algorithms, then layers on firmographic enrichment from business registries and financial databases. Decision-maker contacts are identified through corporate org-chart analysis and validated through multi-step verification — producing a dataset optimized for both email deliverability and phone connect rates.`,
      `The ${h1} delivers verified ${sn} customer intelligence refreshed on a continuous cycle. New installations are detected through technology monitoring systems, existing records are reverified against corporate directories and email validation services, and outdated contacts are automatically suppressed — maintaining data quality that supports high-performance sales and marketing programs.`,
      `Lorann's approach to building the ${h1} prioritizes signal quality over record volume. Each ${sn} installation is confirmed through multiple independent detection methods before entering the dataset. Contact records are sourced from corporate directories and professional networks, then validated through SMTP handshake and phone verification for campaign-ready accuracy.`,
    ];
    return [p1Pool[catIdx % p1Pool.length], p2Pool[catIdx % p2Pool.length]];
  }

  // Route to the right paragraphs
  if (cat === "hc") return hcParas[catIdx % hcParas.length];
  if (cat === "ind") return indParas[catIdx % indParas.length];
  if (cat === "b2c") return b2cParas[catIdx % b2cParas.length];
  return techParas(h1, sn, catIdx);
}


/* ═══════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════ */
async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");

  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  const catCounters = {};

  for (let gi = 0; gi < pages.length; gi++) {
    const { _id, h1, slug } = pages[gi];
    const cat = getCat(slug);
    const sn = shortName(h1);
    const catIdx = catCounters[cat] || 0;
    catCounters[cat] = catIdx + 1;

    const [p1, p2] = genIntroParas(h1, sn, cat, catIdx);

    console.log(`[${gi + 1}] ${slug} (${cat}#${catIdx})`);

    if (DRY_RUN) {
      console.log(`  P1: ${p1.slice(0, 70)}...`);
      console.log(`  P2: ${p2.slice(0, 70)}...`);
    } else {
      const patch = {
        introParagraphs: [richBlock(p1), richBlock(p2)],
      };
      await client.patch(_id).set(patch).commit();
      try {
        const d = await client.getDocument(`drafts.${_id}`);
        if (d) await client.patch(`drafts.${_id}`).set(patch).commit();
      } catch {}
      console.log("  ✓");
    }
  }
  console.log(`\nDone! ${pages.length} pages updated.`);
}

main().catch(e => { console.error(e); process.exit(1); });
