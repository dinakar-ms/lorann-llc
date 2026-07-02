/**
 * Fix featureGrid card descriptions (all 17 per page) to be unique across 68 pages.
 * Also fix 5 FAQ answer duplicates (Real Estate B2B vs B2C).
 *
 * Usage: node scripts/fix-featuregrid-faq.mjs [--dry-run]
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
function block(t) {
  return [{ _key: k(), _type: "block", children: [{ _key: k(), _type: "span", marks: [], text: t }], markDefs: [], style: "normal" }];
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
   SECTION 0: "Strengths" — 6 features per page
   Each feature position has unique description generators.
   gi = global index (0–67), ensures no two pages share text.
   ═══════════════════════════════════════════════════ */

function genStrengths(sn, h1, gi, cat) {
  const snl = sn.toLowerCase();
  // Feature 0: Verified Records
  const verified = [
    `${sn} contacts are validated through a multi-step pipeline checking identity against licensing registries, role against employer directories, and deliverability against real-time bounce databases.`,
    `We verify each ${snl} record by cross-referencing government registries, professional licensing databases, and corporate directory services to confirm that every contact is current and reachable.`,
    `The ${h1} verification process layers NPI or business registration checks, SMTP email validation, and phone carrier lookups to eliminate outdated or fabricated contacts.`,
    `${sn} data integrity relies on triangulating each contact across three or more independent sources — no record enters the dataset without passing identity, role, and deliverability checkpoints.`,
    `Each ${snl} record undergoes a 7-point validation sequence covering name standardization, title verification, email SMTP testing, phone line-type detection, and address CASS certification.`,
    `Our ${snl} verification engine runs against regulatory filing databases, industry membership rolls, and real-time email validation APIs to produce contacts with confirmed accuracy above 95%.`,
    `${sn} records are built from authoritative source documents — licensing files, credentialing databases, and corporate org charts — not scraped from unverified web directories.`,
    `We apply deterministic record matching across ${snl} source files, rejecting any contact where identity confidence falls below our threshold, to prevent false positives in your campaigns.`,
    `The ${h1} maintains accuracy through continuous automated monitoring that flags contacts when source records change — license lapses, employer changes, or email bounces trigger immediate review.`,
    `${sn} data passes through deduplication, identity resolution, and deliverability scoring before release, giving each record a composite quality score you can filter on.`,
    `Every ${snl} contact is confirmed against at least two authoritative data sources, with discrepancies flagged for manual review rather than guessed or auto-resolved.`,
    `${sn} verification extends beyond basic email checks to include employer confirmation, title validation against HR databases, and geographic accuracy through postal certification.`,
    `We compile ${snl} data from primary regulatory sources rather than reselling third-party lists, giving you first-party data provenance with full audit trails.`,
    `The ${h1} uses machine-learning identity resolution to merge records from disparate sources into unified ${snl} profiles without creating duplicates or ghost records.`,
    `${sn} contacts are reverified on a rolling schedule, with each record cycling through the full validation pipeline at least once per quarter to maintain campaign-ready accuracy.`,
    `Our ${snl} data pipeline applies phonetic name matching, fuzzy address comparison, and employer disambiguation to catch duplicates that simple exact-match systems miss.`,
    `${sn} data provenance is documented for every record — you can trace each contact back to its original source filing, directory listing, or registration record.`,
    `We validate ${snl} contacts against real-time databases rather than monthly snapshots, catching job changes, retirements, and relocations within days of occurrence.`,
  ];

  // Feature 1: Segmentation
  const segmentation = [
    `${sn} records can be filtered by job function, seniority level, company revenue band, employee count range, geographic region, and industry sub-segment for precise audience construction.`,
    `Build custom ${snl} audiences using any combination of role, department, company size, technology stack, geography, and purchasing authority indicators.`,
    `The ${h1} supports multi-dimensional filtering — combine ${snl} role filters with firmographic criteria like revenue, headcount, and SIC/NAICS codes for surgical targeting.`,
    `Segment ${snl} contacts by decision-making authority, budget ownership, technology adoption signals, and geographic territory to align with your ideal customer profile.`,
    `${sn} segmentation goes beyond standard demographics to include behavioral signals like event attendance, content engagement, and technology purchase indicators.`,
    `Create micro-segments within the ${h1} by layering role-based filters with company growth indicators, funding stage, and competitive technology displacement signals.`,
    `The ${h1} enables audience slicing across ${snl} job levels, functional departments, company maturity stages, and regional market characteristics for precision campaigns.`,
    `${sn} records include enough dimensional depth to support both broad awareness campaigns and highly targeted account-based approaches within a single dataset.`,
    `Filter ${snl} contacts by credential type, years of experience, organizational hierarchy level, and facility characteristics to build audiences that match your buyer persona.`,
    `${sn} segmentation capabilities include custom audience building for lookalike modeling, suppression list generation, and competitive displacement targeting.`,
    `Layer geographic, firmographic, and technographic filters on ${snl} records to build territory-aligned prospect lists that mirror your sales organization structure.`,
    `The ${h1} supports nested filtering logic — include ${snl} contacts matching criteria A AND criteria B while excluding those matching criteria C for clean audience definition.`,
    `${sn} data dimensions include functional role, purchasing influence level, technology environment, company lifecycle stage, and competitive product usage for deep segmentation.`,
    `Build ${snl} audience segments that align with campaign objectives — awareness segments by industry vertical, consideration segments by pain point, and decision segments by budget authority.`,
    `${sn} filtering supports both inclusive and exclusive criteria, letting you build precisely-scoped audiences that eliminate waste spend on poorly-matched contacts.`,
    `The ${h1} provides enough ${snl} attribute depth to support sophisticated lead scoring models that prioritize contacts by fit, intent, and accessibility.`,
    `Segment ${snl} records by engagement readiness indicators including technology refresh cycles, contract renewal timelines, and organizational change signals.`,
    `${sn} audience construction tools support saved segment templates, audience size estimation, and exportable segment definitions for repeatable campaign workflows.`,
  ];

  // Feature 2: Multi-Channel
  const multiChannel = [
    `${sn} records ship with verified email, direct-dial phone, and CASS-certified mailing address enabling synchronized outreach across digital and physical channels.`,
    `Each ${snl} contact includes business email with deliverability score, office phone with line-type flag, and standardized postal address for true omnichannel campaign execution.`,
    `The ${h1} provides three verified contact channels per record — SMTP-validated email, carrier-confirmed phone, and NCOA-processed mailing address — for maximum reach.`,
    `${sn} multi-channel coverage means you can coordinate email sequences, phone follow-ups, and direct mail touches against the same verified contact without data gaps.`,
    `Every ${snl} record includes channel-specific quality indicators — email deliverability scores, phone connection rates, and mail deliverability flags — so you can optimize channel mix.`,
    `${sn} data supports true omnichannel orchestration by providing verified contact details across email, phone, and postal channels with channel-preference indicators where available.`,
    `The ${h1} includes verified email addresses tested against SMTP servers, phone numbers validated against carrier databases, and addresses processed through USPS CASS certification.`,
    `${sn} records enable coordinated multi-touch sequences where email nurture, phone outreach, and direct mail reinforce each other using the same verified contact foundation.`,
    `Each ${snl} contact comes with email verification status, phone verification status, and address verification status independently — letting you select contacts verified on your priority channel.`,
    `${sn} multi-channel data eliminates the need to purchase separate email, phone, and mailing lists — one record provides all channels with unified identity resolution.`,
    `The ${h1} delivers channel-complete ${snl} records so your marketing automation platform can execute cross-channel sequences without hitting dead ends on missing contact data.`,
    `${sn} contacts include both professional email and direct phone lines, bypassing gatekeepers and generic info@ addresses that reduce connection rates.`,
    `Each ${snl} record provides email with inbox placement indicators, phone with best-time-to-call signals where available, and address with residential/commercial classification.`,
    `${sn} data powers integrated campaigns where a direct mail piece drives recipients to a personalized landing page, followed by email and phone touchpoints — all from one record.`,
    `The ${h1} provides ${snl} contacts with enough channel depth that campaign managers can A/B test channel sequencing strategies without needing supplemental data purchases.`,
    `${sn} multi-channel records include format-standardized data ready for bulk email platforms, auto-dialer systems, and print-house mail merge without manual cleanup.`,
    `Every ${snl} contact is enriched with channel availability flags indicating which outreach methods are confirmed active, letting you route contacts to the right campaign stream.`,
    `${sn} records support both digital-first sequences starting with email and traditional sequences starting with direct mail, with phone follow-up capability on every record.`,
  ];

  // Feature 3: Compliance
  const compliance = [
    `${sn} records carry CAN-SPAM, CCPA, and TCPA compliance indicators with documented consent provenance and channel-specific permission flags for regulatory confidence.`,
    `Every ${snl} contact includes opt-in documentation, suppression list cross-referencing, and jurisdiction-specific compliance markers that protect your sender reputation.`,
    `The ${h1} attaches regulatory compliance metadata to each record — consent origin, permission scope, and applicable regulation flags — so your legal team can verify before launch.`,
    `${sn} compliance infrastructure includes automated DNC registry checking, state-level privacy law compliance, and consent timestamp logging for audit trail requirements.`,
    `Each ${snl} record ships with permission-based marketing indicators that specify which channels the contact can be reached on under current CAN-SPAM, TCPA, and CCPA regulations.`,
    `${sn} data includes compliance-ready flags that integrate with major email platform suppression systems and auto-dialer DNC checking to prevent regulatory violations.`,
    `The ${h1} maintains ${snl} contact permissions through regular consent verification sweeps, suppression list synchronization, and regulatory update monitoring across all 50 states.`,
    `${sn} records include granular permission indicators — email opt-in status, phone consent type (express vs. implied), and postal preference flags — for channel-specific compliance.`,
    `Every ${snl} contact is screened against federal DNC lists, state-level suppression registries, and industry-specific opt-out databases before entering the deliverable dataset.`,
    `${sn} compliance documentation supports CCPA data subject access requests with source provenance, collection date, and processing purpose records attached to each contact.`,
    `The ${h1} embeds compliance into the data pipeline rather than treating it as an afterthought — ${snl} records are born compliant through permission-verified sourcing.`,
    `${sn} data includes consent decay tracking that flags records approaching permission expiration, enabling proactive re-consent campaigns before contacts become non-compliant.`,
    `Each ${snl} record carries a compliance confidence score based on consent recency, source authority, and regulation applicability — letting you set your own risk threshold.`,
    `${sn} compliance markers integrate with Salesforce, HubSpot, and Marketo permission management systems so that compliance state transfers cleanly into your CRM.`,
    `The ${h1} handles ${snl} regulatory complexity by maintaining jurisdiction-specific permission records that account for variations across CCPA, CAN-SPAM, TCPA, and state privacy laws.`,
    `${sn} records include suppression synchronization capabilities — when contacts opt out, the change propagates across all channel permissions automatically.`,
    `Every ${snl} contact is processed through our compliance engine before delivery, which checks against current regulatory requirements and strips records that fail any compliance checkpoint.`,
    `${sn} data supports your compliance obligations by providing transparent sourcing documentation, consent records, and regulatory applicability flags for each individual contact.`,
  ];

  // Feature 4: Data Freshness
  const freshness = [
    `${sn} records are refreshed on a rolling quarterly cycle with automated bounce detection, job-change monitoring, and employer-status verification running continuously between full refreshes.`,
    `The ${h1} maintains ${snl} currency through real-time bounce monitoring that triggers immediate re-verification when email deliverability drops below threshold.`,
    `${sn} data freshness relies on a continuous monitoring pipeline that detects job changes within 30 days, company closures within 14 days, and email bounces within 24 hours.`,
    `Each ${snl} record carries a last-verified timestamp and a data-age indicator, letting you filter for contacts verified within your preferred recency window.`,
    `${sn} refresh cycles combine scheduled full-file reverification with event-triggered updates — role changes, relocations, and retirements are caught as they happen, not months later.`,
    `The ${h1} applies decay-rate modeling to ${snl} records, prioritizing re-verification of contacts in high-turnover roles and fast-changing industries.`,
    `${sn} data freshness is maintained through integration with employment change databases, corporate announcement feeds, and email reputation monitoring systems.`,
    `Each ${snl} record includes both initial verification date and most recent reverification date, giving you full visibility into data currency without guesswork.`,
    `${sn} refresh operations run automated suppression of contacts associated with closed businesses, surrendered licenses, or permanently undeliverable addresses.`,
    `The ${h1} uses predictive analytics to identify ${snl} records at highest risk of decay and routes them for priority re-verification, keeping accuracy high between full refresh cycles.`,
    `${sn} data is never static — our pipeline continuously ingests updated source files and reconciles changes against existing records to keep contact details current.`,
    `Each ${snl} record is scored for decay risk based on industry turnover rates, role stability metrics, and contact age — high-risk records are refreshed more frequently.`,
    `${sn} freshness extends beyond basic email validity to include employer verification, title confirmation, and address currency — ensuring the whole record is current, not just the email.`,
    `The ${h1} runs ${snl} email deliverability checks weekly and full record reverification quarterly, balancing data currency with source-system rate limits.`,
    `${sn} records that fail reverification are quarantined rather than deleted — if the contact returns to active status, the record is automatically restored with updated details.`,
    `Each ${snl} contact includes a freshness tier (A/B/C) based on verification recency, source authority, and change probability — letting you target only the freshest records.`,
    `${sn} data maintenance includes proactive monitoring of employer merger/acquisition activity that triggers immediate re-verification of all contacts at affected organizations.`,
    `The ${h1} provides ${snl} refresh audit logs showing exactly when each record was last verified, what changed, and which source confirmed the update.`,
  ];

  // Feature 5: CRM Ready
  const crmReady = [
    `${sn} data exports in CSV, Excel, and API formats with field mapping templates for Salesforce, HubSpot, Marketo, Pardot, and other major CRM and marketing automation platforms.`,
    `Import ${snl} records directly into your CRM using pre-built field mappings that align ${sn} data attributes with standard CRM contact and account object fields.`,
    `The ${h1} includes native integration connectors for Salesforce, HubSpot, and Microsoft Dynamics — push ${snl} contacts into your CRM without manual file manipulation.`,
    `${sn} data is formatted for immediate CRM ingestion with standardized field names, consistent data types, and deduplication keys that prevent record conflicts during import.`,
    `Export ${snl} records with CRM-ready formatting including account hierarchy identifiers, contact role codes, and lead source attribution fields pre-populated for your platform.`,
    `${sn} integration supports both bulk import and incremental update workflows — initial list loads and ongoing refresh pushes both map cleanly to your CRM data model.`,
    `The ${h1} provides ${snl} data in formats compatible with all major marketing automation platforms including Eloqua, Pardot, ActiveCampaign, and Klaviyo.`,
    `${sn} records include CRM deduplication keys — company identifiers, email hashes, and composite match keys — that prevent duplicate creation during import operations.`,
    `Import ${snl} contacts with pre-mapped fields for lead scoring, territory assignment, and campaign attribution so records are actionable immediately after CRM import.`,
    `${sn} data supports API-based delivery for teams that want to programmatically pull ${snl} contacts into custom applications, data warehouses, or enrichment pipelines.`,
    `The ${h1} ships with platform-specific import guides for Salesforce, HubSpot, and Zoho that walk your ops team through mapping, validation, and deduplication steps.`,
    `${sn} export formats include flat-file CSV for simple imports, nested JSON for API integrations, and tagged XML for enterprise data management platforms.`,
    `Each ${snl} record includes a universal contact ID that persists across data refreshes, enabling your CRM to receive updates without creating duplicate records.`,
    `${sn} data integrates with enrichment platforms like Clearbit, ZoomInfo, and 6sense — append ${snl} records to your existing accounts for gap-filling and validation.`,
    `The ${h1} provides ${snl} data pre-formatted for marketing automation list imports with campaign source codes, import batch identifiers, and timestamp fields included.`,
    `${sn} records come with a data dictionary documenting every field name, data type, and example value to accelerate CRM mapping and reduce import configuration time.`,
    `Import ${snl} contacts into your CRM with confidence — our pre-import validation report flags potential duplicates, format issues, and mapping conflicts before you commit the import.`,
    `${sn} data delivery includes both full-file exports for initial loads and delta-only exports for incremental updates, minimizing CRM processing overhead on refresh cycles.`,
  ];

  return [
    verified[gi % verified.length],
    segmentation[gi % segmentation.length],
    multiChannel[gi % multiChannel.length],
    compliance[gi % compliance.length],
    freshness[gi % freshness.length],
    crmReady[gi % crmReady.length],
  ];
}

/* ═══════════════════════════════════════════════════
   SECTION 1: "Record Fields" — 8 features per page
   ═══════════════════════════════════════════════════ */

function genRecordFields(sn, h1, gi, cat) {
  const snl = sn.toLowerCase();
  // 0: Email
  const email = [
    `${sn} email addresses are SMTP-validated with inbox-level verification, catching invalid, disposable, and catch-all addresses before they reach your campaign.`,
    `Each ${snl} email undergoes real-time deliverability testing including MX record verification, SMTP handshake, and role-address detection for maximum inbox placement.`,
    `${sn} email data includes deliverability confidence scores, domain reputation indicators, and bounce risk classification to help you prioritize high-quality sends.`,
    `We verify ${snl} emails against live mail servers rather than relying on syntax checks, catching typos, deactivated accounts, and full mailboxes that simpler tools miss.`,
    `${sn} email verification runs in real-time against mail server responses, with catch-all domain detection and disposable address filtering for clean campaign lists.`,
    `Each ${snl} email address is tested for deliverability and scored on a scale that accounts for domain age, MX configuration, and historical bounce patterns.`,
    `${sn} email data goes beyond simple valid/invalid status to include inbox type classification, domain reputation scores, and suggested send-time optimization data.`,
    `We validate ${snl} emails through direct SMTP conversation with destination servers, confirming mailbox existence without sending a message to protect your sender reputation.`,
    `${sn} email verification includes spam-trap detection algorithms that identify and suppress known trap addresses operated by major ISPs and anti-spam organizations.`,
    `Each ${snl} email is classified by type — corporate, free provider, role-based, or alias — letting you tailor deliverability strategies per email category.`,
    `${sn} email data includes historical deliverability performance where available, showing whether past campaigns to similar domains achieved strong inbox placement rates.`,
    `We maintain ${snl} email accuracy through continuous monitoring that detects bounce pattern changes at the domain level and triggers re-verification across affected contacts.`,
    `${sn} email addresses are verified against corporate mail server configurations, catching domains that have migrated to new providers or changed MX routing since last check.`,
    `Each ${snl} email carries a verification timestamp and confidence tier, letting you filter for recently-verified addresses or accept older verifications at your discretion.`,
    `${sn} email validation distinguishes between hard-bounce addresses (permanently undeliverable) and soft-bounce addresses (temporarily full or unavailable) for nuanced suppression.`,
    `We test ${snl} email deliverability from multiple geographic sending locations to catch region-specific blocks and ensure addresses are reachable from your sending infrastructure.`,
    `${sn} email data includes domain-level intelligence — organization size, industry, and email security configuration — enriching each address beyond basic deliverability status.`,
    `Each ${snl} email is deduplicated across the dataset, ensuring you never send duplicate messages to the same recipient even when they appear under multiple titles or organizations.`,
  ];

  // 1: Phone
  const phone = [
    `${sn} phone numbers are validated through carrier lookup databases that confirm line type (landline, mobile, VoIP), connection status, and TCPA compliance classification.`,
    `Each ${snl} direct-dial number is verified for active status with carrier-level line-type detection distinguishing mobile, landline, and VoIP connections for compliant outreach.`,
    `${sn} phone data includes line-type flags that separate mobile numbers (requiring express consent under TCPA) from landline numbers for appropriate compliance handling.`,
    `We validate ${snl} phone numbers against real-time carrier databases rather than static number-range tables, catching ported numbers and disconnected lines that range-based tools miss.`,
    `${sn} phone verification identifies direct-dial extensions that bypass receptionist gatekeeping, increasing connection rates for inside sales and SDR outreach teams.`,
    `Each ${snl} phone record includes DNC registry cross-reference status, state-level calling restriction flags, and time-zone indicators for compliant outbound dialing.`,
    `${sn} phone data supports auto-dialer integration with pre-formatted E.164 number formatting, line-type routing rules, and TCPA consent classification per number.`,
    `We verify ${snl} phone connectivity through network-level checks that detect disconnected lines, reassigned numbers, and temporary out-of-service conditions.`,
    `${sn} phone numbers are classified by reachability tier — direct line, department line, or main switchboard — so your SDRs can prioritize the highest-connection-rate numbers.`,
    `Each ${snl} phone record carries a carrier identification code, network type flag, and geographic routing indicator for territory-aligned outbound calling campaigns.`,
    `${sn} phone data includes best-contact-window indicators based on time zone, line type, and industry calling patterns to optimize SDR dial-time scheduling.`,
    `We cross-reference ${snl} phone numbers against federal and state DNC registries on every data refresh, automatically suppressing numbers that appear on restricted lists.`,
    `${sn} phone verification extends to mobile number portability databases, ensuring the carrier and line-type information reflects current porting status rather than original assignment.`,
    `Each ${snl} phone number is formatted for direct integration with Outreach, SalesLoft, Five9, and other dialing platforms without manual formatting or cleanup.`,
    `${sn} phone data includes connection-rate benchmarks by industry and role seniority, helping you set realistic expectations and KPIs for outbound calling campaigns.`,
    `We maintain ${snl} phone accuracy through quarterly carrier re-verification and real-time disconnect detection, suppressing numbers that become unreachable between refresh cycles.`,
    `${sn} phone records separate personal mobile numbers from business direct-dial lines, letting you apply different consent requirements and calling strategies per number type.`,
    `Each ${snl} phone record includes a recency indicator showing when the number was last confirmed active, giving your compliance team confidence in outbound dialing lists.`,
  ];

  // 2: Address
  const address = [
    `${sn} mailing addresses are CASS-certified and NCOA-processed, with ZIP+4 precision and geocoding coordinates for geographic targeting and territory alignment.`,
    `Each ${snl} postal address is standardized through USPS CASS processing, verified through NCOA change-of-address databases, and enriched with delivery point validation codes.`,
    `${sn} address data includes carrier route codes, delivery point barcodes, and residential/commercial classification for direct mail campaign optimization and postal discount qualification.`,
    `We process ${snl} addresses through NCOA move-update files within 95 days of mailing, maintaining compliance with USPS Move Update requirements for automated mail rates.`,
    `${sn} mailing data provides suite/floor-level precision for commercial addresses and apartment-level detail for residential contacts, reducing returned mail and improving deliverability.`,
    `Each ${snl} address carries USPS deliverability status, vacancy indicators, and seasonal address flags that identify contacts at temporary or seasonal locations.`,
    `${sn} address verification includes DPV confirmation that validates the specific delivery point exists, not just that the ZIP code or street name is valid.`,
    `We enrich ${snl} addresses with latitude/longitude coordinates enabling radius-based targeting, drive-time analysis, and geographic clustering for field sales territory planning.`,
    `${sn} addresses are formatted for automated mail-house processing with IMb-ready barcoding, presort indicators, and postal discount qualification flags.`,
    `Each ${snl} mailing address is verified through the USPS address hygiene pipeline including LACS conversion for rural route to street addressing updates.`,
    `${sn} address data includes Congressional district, county, MSA, and census tract coding for government affairs, regulatory compliance, and demographic overlay applications.`,
    `We run ${snl} addresses through NCOA processing and proprietary change detection algorithms that catch moves, business relocations, and address format changes.`,
    `${sn} addresses include suite-level validation for multi-tenant commercial buildings, preventing mail from being routed to building management instead of your intended recipient.`,
    `Each ${snl} address carries a deliverability confidence score combining DPV status, vacancy indicators, and seasonal flags for intelligent campaign targeting decisions.`,
    `${sn} mailing data supports both first-class and standard mail campaigns with automated presort analysis that estimates postage costs before you commit to a mailing.`,
    `We maintain ${snl} address currency through quarterly NCOA processing and continuous monitoring of USPS address change notifications for real-time update integration.`,
    `${sn} address records include both primary business address and any known secondary locations, enabling multi-site targeting for contacts with presence at multiple facilities.`,
    `Each ${snl} postal address is validated against the USPS AMS database confirming the address exists, is deliverable, and matches the intended recipient's known location.`,
  ];

  // 3: Org Data
  const orgData = [
    `${sn} organizational data includes company name, parent entity, SIC/NAICS codes, revenue range, employee count, and founding year for comprehensive firmographic profiling.`,
    `Each ${snl} contact is linked to a verified company profile with industry classification, annual revenue band, headcount range, and headquarters location for account-level targeting.`,
    `${sn} org data maps corporate hierarchies — parent companies, subsidiaries, and divisions — enabling enterprise-level account strategies that span organizational boundaries.`,
    `We enrich ${snl} company records with D&B identifiers, stock ticker symbols where public, and ownership type classification (public, private, government, nonprofit) for segmentation.`,
    `${sn} firmographic data includes company growth indicators — year-over-year revenue trends, hiring velocity, and funding round history — for identifying accounts in growth mode.`,
    `Each ${snl} contact carries standardized industry codes at the 6-digit NAICS level, enabling precise vertical market targeting beyond broad SIC-based industry categories.`,
    `${sn} org data provides technology stack indicators where available, showing which platforms, cloud providers, and business systems the company operates for technographic targeting.`,
    `We link ${snl} contacts to verified company records using domain-based matching and corporate directory confirmation, preventing mis-association with similarly-named organizations.`,
    `${sn} company data includes geographic footprint indicators — single location vs. multi-site, domestic vs. international presence — for territory planning and account prioritization.`,
    `Each ${snl} organizational record carries fiscal year timing, budget cycle indicators, and procurement process complexity ratings where available for sales cycle alignment.`,
    `${sn} org data includes competitive product usage signals derived from technology detection, vendor partnership listings, and contract expiration estimates.`,
    `We maintain ${snl} company accuracy through real-time monitoring of business registration changes, M&A announcements, and corporate restructuring filings.`,
    `${sn} firmographic records include both primary SIC and all secondary SIC codes, capturing diversified companies that operate across multiple industry verticals.`,
    `Each ${snl} company profile includes estimated IT budget range, procurement team size, and vendor count indicators for understanding purchasing capacity and process complexity.`,
    `${sn} org data distinguishes between company headquarters, regional offices, and branch locations — letting you target the right facility for your go-to-market strategy.`,
    `We enrich ${snl} organizational records with LinkedIn company page data including follower count, posting frequency, and job opening volume as business health indicators.`,
    `${sn} company data supports both named-account targeting and lookalike audience building by providing enough firmographic dimensions to define and replicate your ideal customer profile.`,
    `Each ${snl} org record includes subsidiary relationships and franchise affiliations, enabling campaigns that target either individual locations or enterprise parent organizations.`,
  ];

  // 4: Contact Role
  const contactRole = [
    `${sn} contact titles are normalized to functional role categories — executive, management, technical, operational — enabling persona-based targeting across organizational levels.`,
    `Each ${snl} contact carries both the original job title and a standardized role classification, letting you build audiences by either specific title or broad functional category.`,
    `${sn} role data includes seniority level coding (C-suite, VP, Director, Manager, Individual Contributor) for campaigns that need to reach specific decision-making tiers.`,
    `We classify ${snl} contacts by purchasing influence — budget owner, evaluator, influencer, end user — to support multi-threaded selling strategies across buying committees.`,
    `${sn} title normalization maps thousands of unique job titles to a consistent taxonomy of functional roles, eliminating the noise of creative title variations.`,
    `Each ${snl} contact includes department classification — sales, marketing, IT, finance, operations, HR — for campaigns targeting specific functional stakeholders.`,
    `${sn} role data distinguishes between technical decision-makers and business decision-makers, enabling different messaging tracks for each buyer type within the same account.`,
    `We analyze ${snl} job titles using NLP-based classification that handles abbreviations, industry jargon, and non-standard title formats to produce consistent role assignments.`,
    `${sn} contacts include buying authority indicators derived from title analysis, organizational position, and company size — larger companies have more distributed decision-making.`,
    `Each ${snl} role classification includes a confidence score reflecting how clearly the original title maps to the assigned functional category.`,
    `${sn} title data captures both primary role and secondary responsibilities where indicated, catching hybrid roles like IT-Finance or Marketing-Operations that span departments.`,
    `We maintain ${snl} role accuracy by monitoring corporate announcement feeds and LinkedIn profile changes that signal promotions, lateral moves, and organizational restructuring.`,
    `${sn} role classifications are aligned with industry-standard job function taxonomies used by major CRM platforms, enabling seamless import without manual re-categorization.`,
    `Each ${snl} contact carries a management span indicator (individual contributor, team lead, department head, division executive) for campaigns calibrated to scope of influence.`,
    `${sn} role data includes functional budget responsibility indicators — who controls purchasing decisions for technology, services, supplies, and capital equipment.`,
    `We classify ${snl} contacts into buyer journey roles — champion, economic buyer, technical evaluator, and end user — to support modern consensus-selling playbooks.`,
    `${sn} title normalization handles international title conventions, mapping non-US role structures to comparable functional categories for global campaign consistency.`,
    `Each ${snl} contact includes both their current title and their title at time of initial database entry, enabling career progression tracking for long-cycle relationship building.`,
  ];

  // 5: Identifiers
  const identifiers = [
    `${sn} records carry unique persistent identifiers that remain constant across data refreshes, enabling your CRM to receive updates without creating duplicate contact records.`,
    `Each ${snl} contact is assigned a universal record ID that links across all data deliveries, making incremental updates and historical change tracking straightforward.`,
    `${sn} identifier architecture includes both individual contact IDs and company account IDs, supporting CRM structures that link multiple contacts to shared account records.`,
    `We assign ${snl} records composite deduplication keys using name-email-company hashing that catches duplicates even when individual fields have minor variations.`,
    `${sn} record IDs are deterministic — the same real-world contact always receives the same ID regardless of which source file contributed the record — preventing phantom duplicates.`,
    `Each ${snl} identifier persists through name changes, title updates, and company moves, maintaining relationship continuity in your CRM as contacts evolve.`,
    `${sn} deduplication uses multi-field matching algorithms that compare name phonetics, email domain patterns, and company name similarity to catch non-obvious duplicates.`,
    `We provide ${snl} records with both internal dataset IDs and external identifier mappings (D-U-N-S, domain, LinkedIn URL) for cross-referencing against your existing data.`,
    `${sn} identifiers support both contact-level and account-level deduplication, preventing duplicate company records when multiple contacts share the same employer.`,
    `Each ${snl} record includes a match-confidence score reflecting how reliably the record was deduplicated against other source entries during compilation.`,
    `${sn} record identifiers enable change-data-capture workflows where only modified records are transmitted in refresh deliveries, reducing CRM processing overhead.`,
    `We maintain ${snl} identifier consistency through a master identity graph that resolves the same person across job changes, email updates, and company moves.`,
    `${sn} deduplication keys are included in every export format, letting your data ops team run pre-import duplicate checks against existing CRM records before loading.`,
    `Each ${snl} identifier follows a collision-resistant format that eliminates the chance of two different contacts receiving the same ID across the entire dataset.`,
    `${sn} record IDs support merge-and-purge workflows where your CRM team can identify overlapping records between the ${h1} and your existing database.`,
    `We generate ${snl} identifiers using deterministic hashing of verified identity attributes, producing stable IDs that don't change across data refresh cycles.`,
    `${sn} identifier metadata includes record creation date, modification history count, and source-system origin codes for data lineage and audit compliance.`,
    `Each ${snl} record carries cross-reference IDs for matching against major third-party data providers, enabling multi-vendor data enrichment and validation workflows.`,
  ];

  // 6: Verified Date
  const verifiedDate = [
    `${sn} records include the exact date of most recent verification, letting you filter for contacts confirmed within any timeframe — 30 days, 90 days, or 6 months.`,
    `Each ${snl} contact carries a verification timestamp showing when identity, role, and contact details were last independently confirmed against authoritative sources.`,
    `${sn} verification dates are updated only when active re-verification occurs — dates reflect genuine confirmation events, not automated timestamp refreshes.`,
    `We timestamp ${snl} records at the field level, showing separately when email, phone, and address were each last verified for granular data currency assessment.`,
    `${sn} verification recency indicators let you build campaigns targeting only the freshest records, reducing bounce rates and improving first-touch connection rates.`,
    `Each ${snl} record shows both initial entry date and most recent reverification date, letting you calculate data age and prioritize newly-verified contacts.`,
    `${sn} verification timestamps integrate with CRM data-age monitoring, enabling automated alerts when imported records approach your organization's freshness thresholds.`,
    `We provide ${snl} verification dates in ISO 8601 format for universal compatibility with CRM date fields, reporting dashboards, and data quality monitoring tools.`,
    `${sn} records include verification frequency metadata showing how many times the contact has been independently confirmed, with higher-frequency records indicating greater stability.`,
    `Each ${snl} verification date reflects a complete re-check of all contact channels — not just email ping but full identity and role re-confirmation.`,
    `${sn} data currency indicators include both the verification date and a predicted decay date based on industry turnover rates and role stability patterns.`,
    `We maintain ${snl} verification date integrity by logging each re-confirmation event separately, creating an audit trail of data quality checks over time.`,
    `${sn} verification dates enable data freshness SLA monitoring — track what percentage of your imported records meet your organization's currency requirements.`,
    `Each ${snl} record carries a data vintage tier (A = verified within 30 days, B = 90 days, C = 180 days) for quick filtering without date calculations.`,
    `${sn} verification timestamps support automated data rotation workflows where records exceeding your freshness threshold are automatically flagged for re-verification or suppression.`,
    `We report ${snl} verification dates at both the individual record level and the aggregate dataset level, showing overall data currency statistics alongside record-specific timestamps.`,
    `${sn} records include both human-verified and machine-verified timestamps, distinguishing between automated API checks and manual research-confirmed verifications.`,
    `Each ${snl} verification date is cryptographically signed in our system of record, preventing timestamp manipulation and supporting audit compliance requirements.`,
  ];

  // 7: Permissions
  const permissions = [
    `${sn} records include channel-specific permission flags — email consent, phone consent, postal consent — enabling compliant outreach across every campaign channel.`,
    `Each ${snl} contact carries granular permission indicators that specify which marketing channels are authorized and under which regulatory framework consent was obtained.`,
    `${sn} permission data integrates with marketing automation consent management systems, syncing opt-in/opt-out status across your technology stack automatically.`,
    `We attach ${snl} records with permission provenance documentation showing when, where, and how marketing consent was established for each contact channel.`,
    `${sn} permission flags follow a deny-by-default model — contacts are only marked as reachable on channels where positive consent documentation exists.`,
    `Each ${snl} record includes permission expiration indicators that flag contacts approaching consent renewal deadlines under GDPR, CCPA, and other time-limited regulations.`,
    `${sn} permission architecture supports both explicit opt-in consent and legitimate interest basis, with clear documentation of which legal basis applies to each contact.`,
    `We maintain ${snl} permission accuracy through real-time suppression synchronization — opt-out requests propagate across all channel permissions within 24 hours.`,
    `${sn} permission data includes preference center indicators where available, showing which content topics, frequency preferences, and channel selections the contact has specified.`,
    `Each ${snl} permission record carries a compliance confidence tier based on consent quality, documentation completeness, and regulatory alignment.`,
    `${sn} permission metadata supports data subject access requests by providing complete consent history, processing purpose records, and data source documentation.`,
    `We structure ${snl} permission data for direct import into OneTrust, TrustArc, and other privacy management platforms used by enterprise compliance teams.`,
    `${sn} permission flags include both marketing consent and transactional communication authorization, distinguishing between promotional and service-related outreach permissions.`,
    `Each ${snl} contact carries a do-not-contact flag that overrides all channel-level permissions, providing a master suppression control for contacts who have fully opted out.`,
    `${sn} permission data tracks consent across multiple brands and campaigns when contacts appear in overlapping audience segments, preventing over-communication.`,
    `We provide ${snl} permission metadata in machine-readable format for automated compliance checking, reducing the manual review burden on your legal and privacy teams.`,
    `${sn} permission indicators include industry-specific compliance flags — HIPAA for healthcare data, GLBA for financial data — beyond standard marketing regulations.`,
    `Each ${snl} permission record includes the original consent collection mechanism (web form, trade show, partner data share) for audit trail completeness.`,
  ];

  return [
    email[gi % email.length],
    phone[gi % phone.length],
    address[gi % address.length],
    orgData[gi % orgData.length],
    contactRole[gi % contactRole.length],
    identifiers[gi % identifiers.length],
    verifiedDate[gi % verifiedDate.length],
    permissions[gi % permissions.length],
  ];
}

/* ═══════════════════════════════════════════════════
   SECTION 2: "Channels" — 3 features per page
   ═══════════════════════════════════════════════════ */

function genChannels(sn, h1, gi, cat) {
  const snl = sn.toLowerCase();
  // 0: Email Campaigns
  const emailCamp = [
    `Launch ${snl} email campaigns with SMTP-verified addresses, bounce prediction scoring, and inbox placement optimization to maximize deliverability and engagement rates.`,
    `Execute segmented email outreach to ${snl} contacts using deliverability-scored addresses that have been tested against live mail servers within the current quarter.`,
    `${sn} email campaign data powers personalized drip sequences, newsletter distribution, and event invitation programs with addresses verified for inbox-level deliverability.`,
    `Build and launch ${snl} email campaigns using audience segments filtered by role, geography, and company size — each address backed by SMTP verification and bounce monitoring.`,
    `${sn} email data supports high-volume campaign execution with deliverability optimization including domain reputation monitoring, send-time recommendations, and throttling guidance.`,
    `Deploy ${snl} email campaigns through your existing ESP or marketing automation platform using pre-formatted contact exports with deliverability scores and segment tags included.`,
    `${sn} email campaign readiness means every address has passed SMTP verification, spam-trap screening, and role-address filtering — your sends start with a clean foundation.`,
    `Execute A/B tested ${snl} email campaigns with enough audience depth to achieve statistical significance across subject lines, content variations, and send-time experiments.`,
    `${sn} email data integrates with deliverability monitoring tools like 250ok and Validity to provide closed-loop campaign performance tracking from send through inbox placement.`,
    `Launch targeted ${snl} email sequences with personalization tokens mapped to contact attributes — name, title, company, industry — for relevance-driven engagement rates.`,
    `${sn} email campaign data includes suppression file integration, ensuring your sends automatically exclude previous opt-outs, bounces, and compliance-restricted addresses.`,
    `Build multi-stage ${snl} email nurture workflows using contact segments aligned to buyer journey stages — awareness, consideration, and decision — for full-funnel engagement.`,
    `${sn} email data supports both cold outreach prospecting and warm engagement campaigns with deliverability indicators calibrated for each campaign type's risk profile.`,
    `Execute ${snl} email campaigns with confidence — every address has been verified within your specified recency window and carries a deliverability confidence score.`,
    `${sn} email campaign data powers marketing automation workflows including trigger-based sends, behavioral re-engagement sequences, and lifecycle milestone communications.`,
    `Deploy ${snl} email campaigns at scale with bulk-optimized address formatting, automatic ESP compatibility checks, and pre-send deliverability forecasting.`,
    `${sn} email data supports both HTML-rich marketing emails and plain-text sales outreach sequences, with deliverability optimization recommendations for each format.`,
    `Launch ${snl} email campaigns with real-time bounce monitoring integration that automatically suppresses failing addresses mid-campaign to protect your sender reputation.`,
  ];

  // 1: Direct Mail
  const directMail = [
    `Execute ${snl} direct mail campaigns using CASS-certified, NCOA-processed addresses with ZIP+4 precision and carrier route presort optimization for maximum postal savings.`,
    `${sn} mailing data powers targeted direct mail programs with addresses validated for deliverability, formatted for automated mail-house processing, and pre-sorted for postal discounts.`,
    `Launch ${snl} direct mail campaigns with addresses that have passed USPS CASS certification, NCOA move-update processing, and delivery point validation for minimal returned mail.`,
    `Build personalized ${snl} direct mail campaigns using address data enriched with residential/commercial classification, delivery type indicators, and seasonal occupancy flags.`,
    `${sn} direct mail data supports both first-class and standard mail campaigns with presort analysis, postage estimation, and address hygiene processing included in every delivery.`,
    `Execute multi-wave ${snl} direct mail campaigns with matched address data that coordinates physical mail touchpoints with concurrent digital campaign activity.`,
    `${sn} mailing data includes IMb-ready formatting for Intelligent Mail barcode generation, enabling full-service discount qualification and in-transit visibility tracking.`,
    `Deploy ${snl} direct mail programs with enough address volume to qualify for USPS automation presort discounts, with carrier route and walk-sequence optimization pre-applied.`,
    `${sn} direct mail data supports variable data printing with personalization fields mapped to each address record for one-to-one customized print communications.`,
    `Launch ${snl} direct mail campaigns with address data that has been scrubbed against USPS deliverability databases within 95 days, meeting Move Update compliance requirements.`,
    `${sn} mailing data powers triggered direct mail workflows where physical pieces are automatically generated based on digital engagement signals from your marketing platform.`,
    `Build ${snl} direct mail audiences using geographic targeting — radius, ZIP code, county, MSA, or state — with addresses verified for each selected region.`,
    `${sn} direct mail data includes apartment/suite-level precision for multi-tenant locations, ensuring pieces reach the intended recipient rather than a building mailroom.`,
    `Execute ${snl} dimensional mail and package campaigns with verified business addresses that include department names, floor numbers, and internal routing codes where available.`,
    `${sn} mailing data supports catalog, postcard, letter, and package formats with address formatting optimized for each piece type and postal class.`,
    `Deploy ${snl} direct mail campaigns with real-time address verification that catches recent moves, vacancies, and format changes between the time you order and the time you mail.`,
    `${sn} direct mail data includes geodemographic overlays — household income, home value, lifestyle segment — for consumer campaigns that require demographic targeting beyond business attributes.`,
    `Launch ${snl} direct mail programs with enough geographic depth to support regional test campaigns before committing to national rollouts, with statistically valid test panel sizing.`,
  ];

  // 2: Phone Outreach
  const phoneOut = [
    `Run compliant ${snl} outbound calling campaigns using carrier-verified numbers with line-type classification, DNC cross-referencing, and TCPA consent indicators for regulatory safety.`,
    `${sn} phone outreach data powers SDR calling sequences with direct-dial numbers that bypass switchboards, verified against carrier databases for active connection status.`,
    `Execute ${snl} phone campaigns using numbers classified by line type (mobile, landline, VoIP) with appropriate consent handling for each type under current TCPA regulations.`,
    `Build ${snl} calling lists from verified phone data with DNC compliance, time-zone awareness, and connection-rate optimization for maximum productive dials per hour.`,
    `${sn} phone data supports both manual dialing and auto-dialer workflows with E.164 formatting, line-type routing rules, and compliance flag integration.`,
    `Deploy ${snl} phone outreach programs with numbers verified for connectivity within the current quarter, reducing dead-dial rates and improving SDR productivity metrics.`,
    `${sn} calling data includes best-time-to-reach indicators based on industry patterns and role seniority, helping your team schedule dials during high-connection windows.`,
    `Execute warm ${snl} phone follow-ups after email or direct mail touches using the same verified contact records for coordinated multi-channel campaign sequencing.`,
    `${sn} phone outreach data integrates with Outreach, SalesLoft, and Gong for automated sequence enrollment, call recording, and conversation intelligence analytics.`,
    `Build territory-aligned ${snl} calling campaigns with phone records sorted by geographic region, time zone, and area code for efficient dial scheduling.`,
    `${sn} phone data powers both cold prospecting calls and warm follow-up sequences with enough contact context (title, company, industry) for personalized conversation openers.`,
    `Deploy ${snl} phone campaigns with real-time DNC checking that validates each number against current federal and state registries immediately before dialing.`,
    `${sn} calling data supports voicemail-drop campaigns for mobile numbers and live-connect prioritization for direct-dial landlines, optimizing each number for the right approach.`,
    `Execute ${snl} phone outreach with role-specific talking point guidance — the same phone data includes title, department, and company context for rep preparation.`,
    `${sn} phone data powers appointment-setting campaigns with enough contact depth to qualify prospects during the initial call rather than requiring multiple callback attempts.`,
    `Build ${snl} phone outreach lists with carrier-level verification that catches numbers ported to new carriers, disconnected by previous owners, or reassigned to different contacts.`,
    `${sn} calling data includes connection-rate benchmarks for similar industries and roles, helping you set realistic expectations and staffing plans for outbound phone campaigns.`,
    `Deploy ${snl} phone campaigns with compliance-first design — every number carries DNC status, consent type, and line-type classification before it reaches your dialer.`,
  ];

  return [
    emailCamp[gi % emailCamp.length],
    directMail[gi % directMail.length],
    phoneOut[gi % phoneOut.length],
  ];
}

/* ═══════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════ */

async function main() {
  console.log(DRY_RUN ? "DRY RUN" : "LIVE RUN");
  const pages = await client.fetch(
    '*[_type == "page" && !(_id match "drafts.*") && templateType == "leaf" && (slug.current match "data-assets/b2b-database*" || slug.current match "data-assets/b2c-database*")]{ _id, h1, "slug": slug.current, featureGridSections, faqItems } | order(slug.current)'
  );
  console.log(`Found ${pages.length} leaf pages\n`);

  for (let gi = 0; gi < pages.length; gi++) {
    const { _id, h1, slug, featureGridSections, faqItems } = pages[gi];
    const cat = getCat(slug);
    const sn = shortName(h1);
    console.log(`[${gi + 1}] ${slug} (${cat})`);

    // Clone existing featureGridSections and update descriptions
    const newGrid = (featureGridSections || []).map((section, si) => {
      const newSection = { ...section };
      const newFeatures = (section.features || []).map((feat, fi) => {
        const newFeat = { ...feat };
        let descs;
        if (si === 0) descs = genStrengths(sn, h1, gi, cat);
        else if (si === 1) descs = genRecordFields(sn, h1, gi, cat);
        else descs = genChannels(sn, h1, gi, cat);

        if (descs[fi] !== undefined) {
          newFeat.desc = block(descs[fi]);
        }
        return newFeat;
      });
      newSection.features = newFeatures;
      return newSection;
    });

    // Fix FAQ for B2C Real Estate (slug contains b2c-database/real-estate)
    let newFaq = faqItems;
    if (slug === "data-assets/b2c-database/real-estate") {
      newFaq = (faqItems || []).map((faq, fi) => {
        const newFaq = { ...faq };
        // Replace answers to differentiate from B2B Real Estate
        const b2cAnswers = [
          `The B2C Real Estate consumer dataset is verified through property ownership records, mortgage filing databases, and consumer identity verification services. Each homeowner and renter record is cross-referenced against county assessor files and postal delivery databases for current residency confirmation.`,
          `Yes — segment B2C Real Estate consumer records by property type, home value range, ownership status, neighborhood demographics, and geographic region from ZIP code to metropolitan statistical area.`,
          `The B2C Real Estate consumer dataset is built with CAN-SPAM, TCPA, and CCPA compliance at every stage. Consumer consent documentation, suppression list synchronization, and privacy regulation adherence are embedded into the data pipeline.`,
          `Absolutely — the B2C Real Estate consumer dataset includes verified email, phone, and mailing address for each homeowner and renter record, supporting coordinated outreach across digital and physical channels.`,
          `Yes — request a sample of B2C Real Estate consumer records filtered to your target criteria. The sample includes representative records across property types, geographies, and demographic segments so you can evaluate data quality before committing.`,
          `B2C Real Estate consumer data is refreshed quarterly with continuous monitoring of property transaction databases, move indicators, and consumer identity changes between full refresh cycles.`,
          `The B2C Real Estate consumer dataset covers homeowners, renters, property investors, and real estate service consumers across all 50 states, with density proportional to market population.`,
        ];
        if (fi < b2cAnswers.length) {
          newFaq.answer = block(b2cAnswers[fi]);
        }
        return newFaq;
      });
    }

    if (DRY_RUN) {
      // Show first desc from each section
      newGrid.forEach((s, si) => {
        const firstDesc = (s.features[0]?.desc || []).map(b => (b.children || []).map(c => c.text).join("")).join("");
        console.log(`  S${si}: ${firstDesc.substring(0, 100)}...`);
      });
      if (slug === "data-assets/b2c-database/real-estate") {
        console.log(`  FAQ fixed for B2C Real Estate`);
      }
    } else {
      const patch = { featureGridSections: newGrid };
      if (newFaq !== faqItems) patch.faqItems = newFaq;

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
