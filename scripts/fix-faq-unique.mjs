/**
 * Make ALL FAQ questions + answers unique across 68 leaf pages.
 *
 * Strategy:
 * - 7 question positions, each gets a POOL of distinct question phrasings
 * - Each page gets a unique combination based on its index
 * - Answers are generated uniquely per page using product name + category context
 *
 * Usage: node scripts/fix-faq-unique.mjs [--dry-run]
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

const k = () => uuid().replace(/-/g, "").slice(0, 12);

function richText(str) {
  return [
    {
      _key: k(),
      _type: "block",
      children: [{ _key: k(), _type: "span", marks: [], text: str }],
      markDefs: [],
      style: "normal",
    },
  ];
}

// ─── 68 UNIQUE QUESTION TEMPLATES per position ──────────────────
// Each uses ${sn} = short product name (h1)
// We have 7 positions × 68 variants = 476 unique questions

const Q_TEMPLATES = [
  // Position 0: Volume/size questions
  (sn) => [
    `How many records are in the ${sn}?`,
    `What is the total record count for the ${sn}?`,
    `How large is the ${sn} dataset?`,
    `How many contacts does the ${sn} include?`,
    `What volume of records can I access in the ${sn}?`,
    `How extensive is the ${sn} in terms of coverage?`,
    `What is the estimated record count for the ${sn}?`,
    `How many verified entries does the ${sn} contain?`,
    `What is the current size of the ${sn} database?`,
    `How many unique profiles are in the ${sn}?`,
    `How many data points are available in the ${sn}?`,
    `What is the total reach of the ${sn}?`,
    `How many marketable contacts are in the ${sn}?`,
    `How comprehensive is the ${sn} in record count?`,
    `What is the full scope of the ${sn} database?`,
    `How many active records does the ${sn} maintain?`,
    `What is the approximate volume of the ${sn}?`,
    `How many entries can I expect from the ${sn}?`,
    `What's the total number of contacts in the ${sn}?`,
    `How many deliverable records are in the ${sn}?`,
    `What scale does the ${sn} dataset offer?`,
    `How many addressable contacts are in the ${sn}?`,
    `What's the overall record depth of the ${sn}?`,
    `How many data records does the ${sn} provide?`,
    `How many selectable contacts are in the ${sn}?`,
    `What's the estimated universe for the ${sn}?`,
    `How many target-ready records are in the ${sn}?`,
    `What's the breadth of coverage for the ${sn}?`,
    `How many campaign-ready contacts are in the ${sn}?`,
    `How many reachable individuals are in the ${sn}?`,
    `How deep is the ${sn} contact pool?`,
    `What is the addressable universe of the ${sn}?`,
    `How many sourced records does the ${sn} include?`,
    `What is the full record universe of the ${sn}?`,
    `How many distinct contacts are in the ${sn}?`,
    `What is the market coverage of the ${sn}?`,
    `How many validated contacts are in the ${sn}?`,
    `What's the total data universe of the ${sn}?`,
    `How wide is the ${sn} coverage?`,
    `How many usable records does the ${sn} offer?`,
    `How many field-verified contacts are in the ${sn}?`,
    `What's the overall footprint of the ${sn}?`,
    `How many sourced profiles does the ${sn} contain?`,
    `What's the aggregate record count of the ${sn}?`,
    `How many opt-in contacts are in the ${sn}?`,
    `How many qualified records are in the ${sn}?`,
    `What is the total contact universe for the ${sn}?`,
    `How many data assets are in the ${sn}?`,
    `What is the combined volume of the ${sn}?`,
    `How many leads does the ${sn} contain?`,
    `What is the record density of the ${sn}?`,
    `How many curated contacts are in the ${sn}?`,
    `How extensive is the ${sn} record library?`,
    `How many clean records does the ${sn} offer?`,
    `What is the scope of the ${sn} contact pool?`,
    `How many available contacts are in the ${sn}?`,
    `What is the size footprint of the ${sn}?`,
    `How many confirmed records are in the ${sn}?`,
    `What is the total deliverable count for the ${sn}?`,
    `How many ready-to-use records are in the ${sn}?`,
    `What is the working record count of the ${sn}?`,
    `How many coverage points does the ${sn} have?`,
    `What is the total universe estimate for the ${sn}?`,
    `How many screened records are in the ${sn}?`,
    `What's the data depth of the ${sn}?`,
    `How many permission-based records are in the ${sn}?`,
    `What is the reach estimate for the ${sn}?`,
    `How many live records does the ${sn} maintain?`,
  ],

  // Position 1: Verification/quality questions
  (sn) => [
    `How is the ${sn} verified?`,
    `What verification process does the ${sn} go through?`,
    `How does Lorann ensure ${sn} data accuracy?`,
    `What quality checks are applied to the ${sn}?`,
    `How is data quality maintained in the ${sn}?`,
    `What validation methods are used for the ${sn}?`,
    `How frequently is the ${sn} re-verified?`,
    `What accuracy standards does the ${sn} meet?`,
    `How is the ${sn} data authenticated?`,
    `What data hygiene processes does the ${sn} use?`,
    `How does Lorann validate the ${sn} records?`,
    `What quality assurance steps does the ${sn} undergo?`,
    `How is the ${sn} accuracy guaranteed?`,
    `What verification cadence does the ${sn} follow?`,
    `How is freshness maintained for the ${sn}?`,
    `What data cleaning protocols are used for the ${sn}?`,
    `How does Lorann keep the ${sn} up to date?`,
    `What data integrity checks does the ${sn} include?`,
    `How is the ${sn} sourced and validated?`,
    `What multi-step verification does the ${sn} undergo?`,
    `How is the ${sn} email deliverability verified?`,
    `What quality benchmarks does the ${sn} meet?`,
    `How is the ${sn} cross-referenced for accuracy?`,
    `What refresh cycle does the ${sn} follow?`,
    `How does Lorann audit the ${sn} data?`,
    `What compliance checks does the ${sn} pass?`,
    `How is the ${sn} tested before delivery?`,
    `What data enrichment quality controls does the ${sn} use?`,
    `How does the ${sn} handle bounce reduction?`,
    `What sourcing standards does the ${sn} follow?`,
    `How is the ${sn} data scored for quality?`,
    `What accuracy rate does the ${sn} maintain?`,
    `How is the ${sn} updated to remove stale records?`,
    `What multi-source validation does the ${sn} use?`,
    `How does the ${sn} compare on deliverability?`,
    `What data provenance checks does the ${sn} pass?`,
    `How is the ${sn} refreshed between licensing cycles?`,
    `What quality tier does the ${sn} data belong to?`,
    `How does Lorann detect outdated records in the ${sn}?`,
    `What data stewardship process does the ${sn} follow?`,
    `How is the ${sn} vetted before release?`,
    `What field-level validation does the ${sn} include?`,
    `How does the ${sn} prevent data decay?`,
    `What verification technology does the ${sn} rely on?`,
    `How is the ${sn} matched and de-duplicated?`,
    `What QA pipeline does the ${sn} follow?`,
    `How does the ${sn} verify phone and email accuracy?`,
    `What independent audits does the ${sn} pass?`,
    `How is the ${sn} screened for invalid records?`,
    `What real-time validation does the ${sn} use?`,
    `How does the ${sn} track and resolve data issues?`,
    `What data governance does the ${sn} follow?`,
    `How is the ${sn} validated against authoritative sources?`,
    `What data confidence score does the ${sn} provide?`,
    `How does Lorann benchmark the ${sn} accuracy?`,
    `What verification layers does the ${sn} include?`,
    `How does the ${sn} ensure contact reachability?`,
    `What sampling checks does the ${sn} undergo?`,
    `How is the ${sn} continually monitored for quality?`,
    `What deliverability testing does the ${sn} pass?`,
    `How does the ${sn} filter out bad data?`,
    `What source credibility checks does the ${sn} use?`,
    `How is the ${sn} field completeness measured?`,
    `What recency verification does the ${sn} maintain?`,
    `How is the ${sn} spot-checked for errors?`,
    `What data lifecycle management does the ${sn} follow?`,
    `How does the ${sn} ensure SMTP-level email validation?`,
    `What contact verification methodology does the ${sn} employ?`,
  ],

  // Position 2: Format/delivery questions
  (sn) => [
    `What file format does the ${sn} come in?`,
    `How is the ${sn} data delivered?`,
    `What delivery options are available for the ${sn}?`,
    `In what formats can I receive the ${sn}?`,
    `How is the ${sn} formatted for download?`,
    `What export options does the ${sn} support?`,
    `Can I get the ${sn} as a direct CRM import?`,
    `What integration options does the ${sn} offer?`,
    `How is the ${sn} structured for delivery?`,
    `What data fields are included in the ${sn} export?`,
    `Can the ${sn} be delivered via API?`,
    `How quickly is the ${sn} delivered after ordering?`,
    `What CRM integrations does the ${sn} support?`,
    `Is the ${sn} available as a real-time feed?`,
    `What columns are included in the ${sn} output?`,
    `Can the ${sn} be imported into Salesforce directly?`,
    `How is the ${sn} packaged for marketing platforms?`,
    `What onboarding options exist for the ${sn}?`,
    `Can the ${sn} data be customized before delivery?`,
    `What file types does the ${sn} export support?`,
    `Is the ${sn} available as an API endpoint?`,
    `How does the ${sn} handle field mapping for CRM import?`,
    `What turnover time can I expect for the ${sn}?`,
    `Can I get the ${sn} data in a flat-file format?`,
    `How does the ${sn} integrate with marketing automation?`,
    `What ESP compatibility does the ${sn} offer?`,
    `Can the ${sn} be delivered as a HubSpot-ready list?`,
    `How is the ${sn} structured for email platforms?`,
    `What custom formatting is available for the ${sn}?`,
    `Can the ${sn} be output in JSON or XML?`,
    `How does the ${sn} support direct platform activation?`,
    `What data schema does the ${sn} deliver?`,
    `Can I receive the ${sn} in multiple file splits?`,
    `How is the ${sn} labeled and organized for campaign use?`,
    `What data portability options does the ${sn} offer?`,
    `How does the ${sn} support programmatic delivery?`,
    `Can the ${sn} be pushed directly into my DSP?`,
    `What audience onboarding platforms work with the ${sn}?`,
    `How quickly can I activate the ${sn} after receiving it?`,
    `What data enrichment layers are included in the ${sn} delivery?`,
    `How does the ${sn} arrive — as a download link or hosted file?`,
    `What header fields are in the ${sn} CSV?`,
    `Can the ${sn} feed directly into Marketo?`,
    `How is the ${sn} segmented within the export file?`,
    `What are the standard columns in the ${sn} output?`,
    `Can the ${sn} be delivered via SFTP or cloud sync?`,
    `How is the ${sn} formatted for cross-channel deployment?`,
    `What look-back options are in the ${sn} delivery?`,
    `Can I split the ${sn} data by geography before delivery?`,
    `How does the ${sn} handle multi-file delivery?`,
    `What encoding is used for the ${sn} export?`,
    `Can I preview the ${sn} schema before purchase?`,
    `How does the ${sn} support automated data ingestion?`,
    `What compliance documentation ships with the ${sn}?`,
    `Can I receive the ${sn} data with suppression files included?`,
    `How is the ${sn} tailored for omnichannel campaigns?`,
    `What post-delivery support comes with the ${sn}?`,
    `Can the ${sn} be customized by field selection?`,
    `What metadata is included with the ${sn} delivery?`,
    `How is the ${sn} compressed for large file delivery?`,
    `Can I set up recurring delivery for the ${sn}?`,
    `What data dictionary comes with the ${sn}?`,
    `How does the ${sn} export handle special characters?`,
    `What delivery SLA does the ${sn} follow?`,
    `Can the ${sn} data be streamed in real time?`,
    `How does the ${sn} support audience mirroring?`,
    `What deployment-ready formats does the ${sn} offer?`,
    `How is the ${sn} packaged for direct mail use?`,
  ],

  // Position 3: Segmentation/targeting questions
  (sn) => [
    `Can I segment the ${sn} by geography?`,
    `What targeting filters are available for the ${sn}?`,
    `How granular is the ${sn} segmentation?`,
    `Can I filter the ${sn} by industry or vertical?`,
    `What geographic breakdowns does the ${sn} support?`,
    `Can I narrow the ${sn} by job title or role?`,
    `Does the ${sn} support firmographic filtering?`,
    `Can I target specific demographics with the ${sn}?`,
    `How can I customize the ${sn} to my audience?`,
    `What audience selects does the ${sn} allow?`,
    `Can I build look-alike segments from the ${sn}?`,
    `Does the ${sn} include behavioral filters?`,
    `Can I split the ${sn} by state, ZIP, or metro?`,
    `What company size filters does the ${sn} offer?`,
    `Can the ${sn} be filtered by revenue range?`,
    `What role-based filters does the ${sn} support?`,
    `Can I target C-level contacts in the ${sn}?`,
    `Does the ${sn} support SIC/NAICS industry targeting?`,
    `Can I filter the ${sn} by technology stack?`,
    `What department-level targeting does the ${sn} offer?`,
    `Can I cross-reference the ${sn} with intent data?`,
    `Does the ${sn} allow multi-attribute filtering?`,
    `Can I segment the ${sn} by company age?`,
    `What custom audience criteria does the ${sn} support?`,
    `Can I overlay purchase signals on the ${sn}?`,
    `Does the ${sn} support territory-based targeting?`,
    `Can I create micro-segments within the ${sn}?`,
    `What seniority filters are available in the ${sn}?`,
    `Can I segment the ${sn} by organizational function?`,
    `Does the ${sn} include account-level filtering?`,
    `Can I apply propensity models to the ${sn}?`,
    `What location precision does the ${sn} targeting offer?`,
    `Can I filter the ${sn} by years of experience?`,
    `Does the ${sn} support persona-based targeting?`,
    `Can I segment the ${sn} by engagement history?`,
    `What buyer journey filters does the ${sn} include?`,
    `Can I refine the ${sn} by budget or spend indicators?`,
    `Does the ${sn} allow exclusion-based filtering?`,
    `Can I target decision-makers only in the ${sn}?`,
    `What radius-targeting options does the ${sn} provide?`,
    `Can I filter the ${sn} by professional certifications?`,
    `Does the ${sn} support account-based marketing filters?`,
    `Can I target by company headquarters region in the ${sn}?`,
    `What lifestyle attributes can I filter in the ${sn}?`,
    `Can I segment the ${sn} by data recency?`,
    `Does the ${sn} support lookalike modeling?`,
    `Can I narrow the ${sn} by purchase intent?`,
    `What education-level filters does the ${sn} include?`,
    `Can I segment the ${sn} by licensing or credential?`,
    `Does the ${sn} support geo-fencing for selection?`,
    `Can I combine firmographic and demographic filters on the ${sn}?`,
    `What specialty-level filters does the ${sn} allow?`,
    `Can I create custom score-based segments from the ${sn}?`,
    `Does the ${sn} support omnichannel audience building?`,
    `Can I break the ${sn} into test and control groups?`,
    `What net-new filters does the ${sn} provide?`,
    `Can the ${sn} exclude contacts already in my CRM?`,
    `Does the ${sn} allow sequential audience builds?`,
    `Can I filter the ${sn} by verified contact method?`,
    `What time-based targeting does the ${sn} support?`,
    `Can the ${sn} be narrowed by organizational growth rate?`,
    `Does the ${sn} support tribal or affinity targeting?`,
    `Can I target the ${sn} by last-verified date?`,
    `What product-interest filters does the ${sn} include?`,
    `Can I segment the ${sn} by employee headcount band?`,
    `Does the ${sn} allow census-tract-level targeting?`,
    `Can I filter the ${sn} by channel preference?`,
    `What layered targeting can I apply to the ${sn}?`,
  ],

  // Position 4: Compliance/regulations questions
  (sn) => [
    `Is the ${sn} compliant with marketing regulations?`,
    `What privacy standards does the ${sn} adhere to?`,
    `Is the ${sn} GDPR and CCPA compliant?`,
    `How does the ${sn} handle consent management?`,
    `What regulatory certifications does the ${sn} carry?`,
    `Is the ${sn} CAN-SPAM compliant?`,
    `How does the ${sn} ensure opt-in compliance?`,
    `What data privacy safeguards does the ${sn} include?`,
    `Is the ${sn} TCPA compliant for phone outreach?`,
    `How does the ${sn} handle suppression and opt-outs?`,
    `What legal frameworks govern the ${sn} usage?`,
    `Does the ${sn} include DNC and suppression lists?`,
    `How does the ${sn} protect consumer privacy?`,
    `What consent documentation comes with the ${sn}?`,
    `Is the ${sn} safe for B2B cold email campaigns?`,
    `How does the ${sn} meet state-level privacy laws?`,
    `What audit trail does the ${sn} provide?`,
    `Is the ${sn} suitable for regulated industries?`,
    `How does the ${sn} handle right-to-delete requests?`,
    `What data provenance records does the ${sn} maintain?`,
    `Is the ${sn} compliant with industry-specific regulations?`,
    `How does the ${sn} address cross-border data rules?`,
    `What permission indicators does the ${sn} include?`,
    `Is the ${sn} verified for commercial messaging compliance?`,
    `How does the ${sn} handle data retention policies?`,
    `What opt-out mechanisms are built into the ${sn}?`,
    `Is the ${sn} aligned with IAB data ethics guidelines?`,
    `How does the ${sn} maintain regulatory compliance over time?`,
    `What data processing agreements cover the ${sn}?`,
    `Is the ${sn} suitable for financial services marketing?`,
    `How does the ${sn} handle HIPAA considerations?`,
    `What data usage restrictions apply to the ${sn}?`,
    `Is the ${sn} cleared for telemarketing campaigns?`,
    `How does the ${sn} document data consent?`,
    `What third-party compliance audits does the ${sn} undergo?`,
    `Is the ${sn} appropriate for email campaigns in the EU?`,
    `How does the ${sn} support right-to-access requests?`,
    `What data minimization practices does the ${sn} follow?`,
    `Is the ${sn} compatible with privacy-first marketing strategies?`,
    `How does the ${sn} verify lawful basis for processing?`,
    `What transparency reports are available for the ${sn}?`,
    `Is the ${sn} compliant with Canadian anti-spam law (CASL)?`,
    `How does the ${sn} handle data subject requests?`,
    `What PII protection measures does the ${sn} include?`,
    `Is the ${sn} vetted for direct mail compliance?`,
    `How does the ${sn} manage data breach notifications?`,
    `What ethical data sourcing standards does the ${sn} meet?`,
    `Is the ${sn} auditable for compliance reporting?`,
    `How does the ${sn} align with FTC marketing guidelines?`,
    `What data security certifications does the ${sn} hold?`,
    `Is the ${sn} cleared for SMS marketing campaigns?`,
    `How does the ${sn} ensure data is ethically sourced?`,
    `What jurisdictional compliance does the ${sn} cover?`,
    `Is the ${sn} safe for use in insurance marketing?`,
    `How does the ${sn} handle sensitive category data?`,
    `What consent verification steps does the ${sn} pass?`,
    `Is the ${sn} covered by Lorann's master data agreement?`,
    `How does the ${sn} handle minor/age-restricted data?`,
    `What vendor risk assessment does the ${sn} meet?`,
    `Is the ${sn} compliant with state biometric privacy laws?`,
    `How does the ${sn} support privacy impact assessments?`,
    `What data classification does the ${sn} carry?`,
    `Is the ${sn} suitable for healthcare-regulated marketing?`,
    `How does the ${sn} handle multi-jurisdiction compliance?`,
    `What data anonymization options does the ${sn} offer?`,
    `Is the ${sn} approved for use under client compliance teams?`,
    `How does the ${sn} manage cross-device consent tracking?`,
    `What privacy certification does the ${sn} hold?`,
  ],

  // Position 5: Multi-channel/activation questions
  (sn) => [
    `Does the ${sn} support multi-channel campaigns?`,
    `What marketing channels can the ${sn} activate?`,
    `Can I use the ${sn} for both email and direct mail?`,
    `How does the ${sn} support omnichannel outreach?`,
    `Is the ${sn} formatted for phone, email, and mail?`,
    `What activation channels does the ${sn} enable?`,
    `Can I deploy the ${sn} across digital and offline channels?`,
    `How does the ${sn} integrate with my marketing stack?`,
    `Does the ${sn} include verified fields for multiple channels?`,
    `Can I run coordinated campaigns using the ${sn}?`,
    `What channel-specific data does the ${sn} provide?`,
    `How does the ${sn} support programmatic advertising?`,
    `Can I use the ${sn} for retargeting campaigns?`,
    `Does the ${sn} support social media ad targeting?`,
    `How does the ${sn} enhance my ABM strategy?`,
    `Can the ${sn} be used for connected TV targeting?`,
    `Does the ${sn} support email nurture workflows?`,
    `How does the ${sn} enable cross-channel sequencing?`,
    `Can I use the ${sn} for LinkedIn matched audiences?`,
    `Does the ${sn} support direct mail personalization?`,
    `How does the ${sn} power display advertising?`,
    `Can I onboard the ${sn} to Facebook custom audiences?`,
    `Does the ${sn} enable SMS and MMS campaigns?`,
    `How does the ${sn} support content syndication?`,
    `Can I use the ${sn} for event marketing outreach?`,
    `Does the ${sn} work with demand-generation platforms?`,
    `How does the ${sn} integrate with CDP platforms?`,
    `Can the ${sn} power intent-based advertising?`,
    `Does the ${sn} support geotargeted mobile ads?`,
    `How does the ${sn} enable sales team outreach?`,
    `Can I use the ${sn} for account-based display?`,
    `Does the ${sn} support addressable TV campaigns?`,
    `How does the ${sn} power lead scoring workflows?`,
    `Can the ${sn} be used for podcast advertising targeting?`,
    `Does the ${sn} enable digital out-of-home targeting?`,
    `How does the ${sn} support webinar registration campaigns?`,
    `Can I use the ${sn} across paid and owned channels?`,
    `Does the ${sn} support lookalike expansion on ad platforms?`,
    `How does the ${sn} integrate with affiliate marketing?`,
    `Can the ${sn} feed Google Customer Match campaigns?`,
    `Does the ${sn} support print catalog targeting?`,
    `How does the ${sn} enhance trade show follow-up campaigns?`,
    `Can I use the ${sn} data in programmatic direct buys?`,
    `Does the ${sn} work with marketing orchestration tools?`,
    `How does the ${sn} support voice-channel campaigns?`,
    `Can I deploy the ${sn} through LiveRamp or similar?`,
    `Does the ${sn} support sequential multi-touch campaigns?`,
    `How does the ${sn} enable always-on prospecting?`,
    `Can I sync the ${sn} with ad platform audience managers?`,
    `Does the ${sn} power multi-wave direct mail campaigns?`,
    `How does the ${sn} support influencer outreach targeting?`,
    `Can the ${sn} activate through data clean rooms?`,
    `Does the ${sn} enable triggered campaign workflows?`,
    `How does the ${sn} support dynamic creative optimization?`,
    `Can the ${sn} data feed multi-platform retargeting?`,
    `Does the ${sn} support partnership co-marketing campaigns?`,
    `How does the ${sn} enable re-engagement campaigns?`,
    `Can I use the ${sn} for nurture-to-close programs?`,
    `Does the ${sn} support location-based push notifications?`,
    `How does the ${sn} integrate with sales engagement platforms?`,
    `Can the ${sn} power custom audience creation at scale?`,
    `Does the ${sn} enable multi-brand campaign activation?`,
    `How does the ${sn} support channel mix optimization?`,
    `Can I use the ${sn} for always-on awareness campaigns?`,
    `Does the ${sn} power cold-to-warm conversion funnels?`,
    `How does the ${sn} enable audience syndication?`,
    `Can I deploy the ${sn} across DMP and DSP platforms?`,
    `Does the ${sn} support whitelabel audience delivery?`,
  ],

  // Position 6: Sample/trial questions
  (sn) => [
    `Can I get sample ${sn} data before purchasing?`,
    `Is a free data preview available for the ${sn}?`,
    `Can I evaluate the ${sn} before committing?`,
    `Does Lorann offer test records from the ${sn}?`,
    `Can I request a ${sn} sample count and preview?`,
    `How can I validate the ${sn} before licensing?`,
    `Is there a trial option for the ${sn}?`,
    `Can I see a data card for the ${sn}?`,
    `What sample options are available for the ${sn}?`,
    `Can I review ${sn} field coverage before buying?`,
    `Does Lorann provide sample ${sn} records at no cost?`,
    `Can I test ${sn} data quality before full purchase?`,
    `How can I evaluate ${sn} match rates before committing?`,
    `Is a ${sn} data audit available before licensing?`,
    `Can I get a free count estimate for the ${sn}?`,
    `Does Lorann offer a ${sn} pilot program?`,
    `Can I run a deliverability test on ${sn} samples?`,
    `What proof-of-quality options exist for the ${sn}?`,
    `Can I compare ${sn} data against my existing records?`,
    `Is there a ${sn} match-back analysis available?`,
    `Can I get a ${sn} data quality scorecard?`,
    `Does Lorann offer a risk-free ${sn} evaluation?`,
    `Can I request a custom ${sn} count breakdown?`,
    `Is there a ${sn} preview dashboard available?`,
    `Can I get field-level previews of the ${sn}?`,
    `How do I validate ${sn} coverage for my market?`,
    `Does Lorann share ${sn} accuracy benchmarks?`,
    `Can I get geography-specific ${sn} sample counts?`,
    `Is there a ${sn} data fit assessment?`,
    `Can I benchmark ${sn} against my current list?`,
    `Does Lorann offer complimentary ${sn} profiling?`,
    `Can I request a ${sn} overlapping analysis?`,
    `Is there a ${sn} ROI projection available?`,
    `Can I trial the ${sn} with a small test segment?`,
    `Does Lorann provide ${sn} documentation before licensing?`,
    `Can I evaluate the ${sn} schema before committing?`,
    `How quickly can I receive ${sn} sample records?`,
    `Is there a ${sn} freshness audit available?`,
    `Can I test the ${sn} across my target verticals?`,
    `Does Lorann provide a ${sn} sample suppression check?`,
    `Can I run a ${sn} append test against my CRM?`,
    `Is there a ${sn} data completeness report available?`,
    `Can I get a segmented ${sn} preview by region?`,
    `Does Lorann offer a guided ${sn} data walk-through?`,
    `Can I get a ${sn} deliverability benchmark report?`,
    `Is there a ${sn} coverage map available?`,
    `Can I request a ${sn} data dictionary before purchase?`,
    `Does Lorann offer a ${sn} no-obligation consultation?`,
    `Can I evaluate ${sn} source documentation?`,
    `Is there a ${sn} enrichment preview available?`,
    `Can I get a ${sn} overlap check with my suppression file?`,
    `Does Lorann provide ${sn} recency statistics?`,
    `Can I preview ${sn} data fields and fill rates?`,
    `Is there a ${sn} sample for each available channel?`,
    `Can I request a ${sn} title/role distribution preview?`,
    `Does Lorann offer a ${sn} data strategy session?`,
    `Can I test ${sn} targeting before activation?`,
    `Is there a ${sn} audience sizing tool available?`,
    `Can I get a ${sn} custom data audit?`,
    `Does Lorann offer a ${sn} money-back quality guarantee?`,
    `Can I get multi-vertical ${sn} sample data?`,
    `Is there a ${sn} competitive benchmark report?`,
    `Can I test the ${sn} in a sandbox environment?`,
    `Does Lorann offer a ${sn} hands-on data review?`,
    `Can I evaluate ${sn} against industry accuracy standards?`,
    `Is there a ${sn} free trial with full field access?`,
    `Can I get a ${sn} segment-by-segment quality report?`,
    `Does Lorann provide ${sn} data guarantees in writing?`,
  ],
];

// ─── UNIQUE ANSWER GENERATORS per position ──────────────────
// Each returns a unique answer using the page index + product name

const A_GENERATORS = [
  // A0: volume/size answer
  (sn, idx) => {
    const openers = [
      `Our ${sn} contains a large and continuously expanding dataset.`,
      `The ${sn} covers a substantial audience universe.`,
      `Lorann maintains an extensive ${sn} with deep market coverage.`,
      `The ${sn} database includes a wide-reaching set of verified contacts.`,
      `Our ${sn} spans a significant volume of actionable records.`,
      `The ${sn} offers broad and deep coverage across its target market.`,
    ];
    const mids = [
      `Record counts are tailored to your specific targeting needs — geography, role, specialty, and industry filters all affect final counts.`,
      `The exact count depends on your targeting selections: geographic scope, job function, company size, and vertical all shape the final file.`,
      `Your count will vary based on the filters you apply — we customize every pull to match your campaign criteria.`,
      `Volumes adjust based on your segment definitions including region, title, industry classification, and data recency requirements.`,
      `Available records shift according to your selected parameters — ZIP radius, revenue band, seniority, and channel preference all factor in.`,
      `Final counts reflect your specific audience spec — coverage area, firmographic criteria, and deliverability thresholds all play a role.`,
    ];
    const closes = [
      `Contact our data team for a complimentary count estimate tailored to your campaign requirements.`,
      `Reach out for a free, no-obligation count breakout matched to your targeting brief.`,
      `Get in touch for a custom universe estimate — we provide counts within one business day.`,
      `Request a free audience sizing to see exactly how many records match your campaign goals.`,
      `Ask for a complimentary count analysis — our team provides detailed segment breakdowns.`,
      `Connect with us for a personalized count projection aligned to your outreach strategy.`,
    ];
    return `${openers[idx % openers.length]} ${mids[idx % mids.length]} ${closes[idx % closes.length]}`;
  },

  // A1: verification answer
  (sn, idx) => {
    const parts = [
      [
        `${sn} records are verified through a multi-step validation pipeline that checks email deliverability, phone accuracy, and postal address formatting.`,
        `Every record in the ${sn} passes through SMTP validation, reverse-append verification, and source-to-source cross-referencing.`,
        `The ${sn} undergoes a layered quality process including real-time bounce detection, phone line-type identification, and address standardization.`,
        `Lorann applies a rigorous 4-stage verification process to the ${sn}: source validation, field-level checks, deliverability testing, and final QA review.`,
        `${sn} data is authenticated against multiple authoritative databases, with email addresses SMTP-validated and phone numbers checked for line type and connectivity.`,
        `Verification for the ${sn} includes National Change of Address (NCOA) processing, CASS certification for postal data, and email engagement scoring.`,
      ],
      [
        `Records are refreshed on a quarterly cycle with continuous monitoring for bounces, disconnects, and role changes between full updates.`,
        `Our team re-validates the dataset every 90 days and applies real-time suppression updates as they occur.`,
        `Data freshness is maintained through scheduled quarterly refreshes plus event-triggered updates for job changes, company moves, and opt-outs.`,
        `The verification cadence includes quarterly full audits supplemented by monthly incremental checks on high-churn segments.`,
        `Continuous change detection identifies stale records between quarterly full re-certifications.`,
        `Lorann's data operations team runs rolling accuracy audits, with full re-verification every quarter and ad-hoc scrubs on demand.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },

  // A2: format/delivery answer
  (sn, idx) => {
    const parts = [
      [
        `The ${sn} is delivered as a ready-to-use CSV or Excel file with all data fields clearly mapped and labeled.`,
        `You'll receive the ${sn} data in CSV format with standardized column headers, compatible with all major marketing platforms.`,
        `Lorann delivers the ${sn} as a structured flat file (CSV or XLSX) with full field documentation included.`,
        `The ${sn} export includes a clean, labeled CSV with each data point mapped to standard field names for easy ingestion.`,
        `Your ${sn} data arrives as a formatted spreadsheet or CSV with fields organized for immediate campaign deployment.`,
        `The ${sn} is packaged as a compliance-documented CSV with suppression files, field definitions, and import instructions included.`,
      ],
      [
        `We also support direct CRM imports for Salesforce, HubSpot, and Marketo — as well as custom formatting for any ESP or marketing automation platform.`,
        `Direct import support is available for Salesforce, HubSpot, Marketo, Pardot, and Eloqua. Custom field mapping is included at no extra charge.`,
        `Our team provides pre-formatted imports for major CRMs and ESPs, plus API-based delivery for programmatic integration.`,
        `For enterprise clients, we offer SFTP delivery, API endpoints, and platform-specific formatting for LiveRamp, The Trade Desk, and more.`,
        `Custom onboarding to your data platform of choice is standard — we format for your tech stack, not the other way around.`,
        `In addition to file delivery, we support automated data feeds, cloud storage sync, and direct audience onboarding to programmatic platforms.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },

  // A3: segmentation answer
  (sn, idx) => {
    const parts = [
      [
        `Yes. ${sn} data can be segmented by state, metro area, ZIP code, county, or custom radius from any location.`,
        `Absolutely. The ${sn} supports granular geographic targeting at the state, city, ZIP, metro, and radius level.`,
        `Yes — you can slice the ${sn} by any combination of geography, industry, job function, seniority, and company size.`,
        `The ${sn} offers multi-dimensional segmentation across geography, firmographics, demographics, and intent signals.`,
        `Yes. We support geographic, demographic, firmographic, and behavioral segmentation across the entire ${sn}.`,
        `Lorann enables precise targeting within the ${sn} — from broad region-level selects down to ZIP+4 precision.`,
      ],
      [
        `Territory-aligned selections are available for field sales teams, and all segments can be combined with additional firmographic or demographic filters.`,
        `You can layer multiple criteria simultaneously — title, revenue range, employee count, and more — to build a hyper-targeted audience.`,
        `Custom scoring and propensity models can be applied on top of standard segmentation to prioritize high-value prospects.`,
        `Our team will work with you to define the optimal segment criteria based on your campaign goals and historical performance data.`,
        `ABM-ready account lists, persona-based segments, and suppression-matched files are all available as add-on options.`,
        `All segmentation is performed pre-delivery so you receive only the contacts that match your specific audience definition.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },

  // A4: compliance answer
  (sn, idx) => {
    const parts = [
      [
        `Yes. All ${sn} data is sourced and maintained in compliance with CAN-SPAM, TCPA, CCPA, and applicable federal and state regulations.`,
        `The ${sn} is fully compliant with CAN-SPAM, TCPA, GDPR, and CCPA requirements. Consent flags and suppression indicators are included with every record.`,
        `Lorann maintains strict compliance standards for the ${sn}, including documented opt-in status, DNC cross-referencing, and privacy regulation adherence.`,
        `Yes. Every ${sn} record carries compliance metadata including consent documentation, suppression status, and permissible use indicators.`,
        `The ${sn} meets all applicable US data privacy regulations and includes compliance documentation for audit purposes.`,
        `All ${sn} records are ethically sourced with full regulatory compliance — including CAN-SPAM, TCPA, and state-level privacy laws.`,
      ],
      [
        `Lorann provides detailed compliance documentation and usage guidelines with every data delivery.`,
        `We include suppression processing, opt-out management, and compliance certification as standard with every order.`,
        `Our legal and compliance team reviews all data sourcing practices quarterly to ensure ongoing regulatory alignment.`,
        `Compliance documentation, permissible use guidelines, and data processing agreements are available upon request.`,
        `We support client compliance reviews and can provide source documentation, processing records, and consent audit trails.`,
        `Every delivery includes a compliance packet with usage terms, suppression instructions, and regulatory reference documentation.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },

  // A5: multi-channel answer
  (sn, idx) => {
    const parts = [
      [
        `Yes. Every ${sn} record includes verified email, mailing address, and phone fields — enabling true multi-channel campaign activation.`,
        `The ${sn} supports email, direct mail, phone, and digital advertising activation with verified contact data across all channels.`,
        `Absolutely. ${sn} data is structured for omnichannel deployment — email marketing, direct mail, telemarketing, and programmatic display.`,
        `Yes. The ${sn} includes channel-specific fields optimized for email deliverability, postal accuracy, and phone connectivity.`,
        `The ${sn} is built for multi-channel campaigns from the ground up, with each record carrying verified email, phone, and address data.`,
        `Yes — ${sn} records include all fields needed for coordinated outreach across email, phone, mail, and digital advertising channels.`,
      ],
      [
        `Our team can also format the data for social platform onboarding, programmatic display, and CTV advertising campaigns.`,
        `We support audience onboarding to Facebook, Google, LinkedIn, The Trade Desk, LiveRamp, and other major activation platforms.`,
        `Cross-channel campaign sequencing is fully supported — deploy the same audience across email, then mail, then phone with coordinated timing.`,
        `The data integrates with all major ESPs, CRMs, DSPs, and direct mail vendors for true omnichannel execution.`,
        `We provide platform-specific formatting so the same audience can be activated simultaneously across your entire marketing stack.`,
        `Multi-touch campaign support is standard — use the data for initial outreach, follow-up, retargeting, and re-engagement across all channels.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },

  // A6: sample/trial answer
  (sn, idx) => {
    const parts = [
      [
        `Yes. We provide complimentary count estimates and sample ${sn} records so you can evaluate data quality, field coverage, and match rates before committing.`,
        `Absolutely. Lorann offers free ${sn} sample records and detailed count breakdowns to help you assess data fit and quality.`,
        `Yes — you can request a no-obligation ${sn} data preview including sample records, field documentation, and audience sizing.`,
        `We offer a risk-free ${sn} evaluation with sample data, accuracy benchmarks, and coverage estimates at no charge.`,
        `Yes. Our team provides ${sn} sample records and a custom data briefing so you can validate quality before any commitment.`,
        `Complimentary ${sn} previews are available including sample records, field fill-rate reports, and segment-level count projections.`,
      ],
      [
        `Contact our data team to request your free preview — most sample requests are fulfilled within one business day.`,
        `Reach out for your complimentary evaluation — we typically deliver sample data and counts within 24 hours.`,
        `Request your free data audit today — our team will prepare a custom preview matched to your campaign criteria.`,
        `Get in touch for a guided data walk-through — we'll show you exactly what's in the ${sn} for your target audience.`,
        `Our team is standing by to prepare your personalized ${sn} preview — just share your targeting criteria to get started.`,
        `Schedule a free data strategy call and we'll prepare a custom ${sn} sample matched to your specific requirements.`,
      ],
    ];
    return `${parts[0][idx % parts[0].length]} ${parts[1][idx % parts[1].length]}`;
  },
];

// ─── MAIN ───────────────────────────────────────────────

async function main() {
  console.log(DRY_RUN ? "DRY RUN\n" : "LIVE RUN\n");

  // Fetch all leaf pages (68 pages with the 7 standard FAQ templates)
  const pages = await client.fetch(`*[_type=='page' && !(_id match 'drafts.*') && count(faqItems) == 7]{
    _id, h1, "slug": slug.current,
    "faqCount": count(faqItems),
    faqItems
  } | order(slug.current)`);

  console.log(`Found ${pages.length} pages with exactly 7 FAQs\n`);

  // Check which pages have the standard template questions
  const standardPages = pages.filter((p) => {
    const q1 = p.faqItems[0]?.question || "";
    return (
      q1.includes("How many records are in the") ||
      q1.includes("How many contacts are available")
    );
  });

  console.log(`${standardPages.length} pages have standard template FAQs\n`);

  let updated = 0;

  for (let i = 0; i < standardPages.length; i++) {
    const page = standardPages[i];
    const sn = page.h1;
    const slug = page.slug;

    console.log(`[${i + 1}/${standardPages.length}] ${slug} (${sn})`);

    const newFaqItems = [];

    for (let q = 0; q < 7; q++) {
      const oldFaq = page.faqItems[q];
      const questionPool = Q_TEMPLATES[q](sn);
      const newQuestion = questionPool[i % questionPool.length];
      const newAnswerText = A_GENERATORS[q](sn, i);

      newFaqItems.push({
        _key: oldFaq._key || k(),
        _type: oldFaq._type || "object",
        question: newQuestion,
        answer: richText(newAnswerText),
      });

      if (newQuestion !== oldFaq.question) {
        console.log(`  Q${q + 1}: "${oldFaq.question.substring(0, 50)}..." → "${newQuestion.substring(0, 50)}..."`);
      }
    }

    if (!DRY_RUN) {
      // Update published doc
      await client.patch(page._id).set({ faqItems: newFaqItems }).commit();

      // Update draft if exists
      const draftId = `drafts.${page._id}`;
      try {
        const draft = await client.getDocument(draftId);
        if (draft) {
          await client.patch(draftId).set({ faqItems: newFaqItems }).commit();
        }
      } catch {}

      console.log(`  → Saved\n`);
    } else {
      console.log(`  → Would save\n`);
    }

    updated++;
  }

  // ─── VERIFICATION ───
  console.log("\n═══ VERIFICATION ═══\n");

  const allPages = await client.fetch(`*[_type=='page' && !(_id match 'drafts.*') && count(faqItems) > 0]{
    h1, "slug": slug.current,
    "faqs": faqItems[]{question}
  }`);

  const allQ = [];
  for (const p of allPages) {
    for (const f of p.faqs) {
      allQ.push(f.question);
    }
  }

  const uniqueQ = new Set(allQ);
  console.log(`Total FAQ questions: ${allQ.length}`);
  console.log(`Unique FAQ questions: ${uniqueQ.size}`);
  console.log(`Duplicate questions: ${allQ.length - uniqueQ.size}`);

  // Find remaining duplicates
  const qCount = {};
  for (const q of allQ) {
    qCount[q] = (qCount[q] || 0) + 1;
  }
  const dups = Object.entries(qCount)
    .filter(([k, v]) => v > 1)
    .sort((a, b) => b[1] - a[1]);
  if (dups.length > 0) {
    console.log("\nRemaining duplicates:");
    dups.slice(0, 10).forEach(([q, count]) => {
      console.log(`  ${count}x: ${q.substring(0, 100)}`);
    });
  } else {
    console.log("\n✓ ALL FAQ questions are unique!");
  }

  console.log(`\nDone! ${updated} pages updated.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
