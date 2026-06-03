/**
 * Update all 38 Healthcare leaf pages with:
 * 1. Fixed prose section (paragraphs[] field, not paragraph1/2/3)
 * 2. Fully unique headings, descriptions, kickers, intro, attributes, use cases per page
 * 3. Unique feature grid section titles and descriptions
 * 4. Unique FAQ questions and answers
 *
 * Usage: node scripts/update-healthcare-content.mjs [--dry-run]
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
const rt = (text) => [{
  _key: k(), _type: "block", style: "normal", markDefs: [],
  children: [{ _key: k(), _type: "span", marks: [], text }],
}];

// ─── PER-PAGE UNIQUE CONTENT ─────────────────────────────────────
// Each entry: slug suffix → full unique content for that page
const PAGE_CONTENT = {

  // ── Group 1: Physicians & Advanced Practice ──────────────────
  "physicians-advanced-practice/physicians-doctors": {
    h1: "Physicians & Doctors Email List",
    kicker: "B2B Healthcare Data",
    titlePlain: "Reach Licensed",
    titleAccent: "Physicians & Doctors",
    heroDesc: "Precision-verified contact data for MDs, DOs, and specialist physicians across every major clinical discipline — including primary care, internal medicine, cardiology, oncology, and surgery.",
    introKicker: "Physician Targeting",
    introHeadlinePlain: "Connect directly with",
    introHeadlineAccent: "practicing physicians",
    introParagraph: "Our Physicians & Doctors Email List delivers verified physician contact data sourced from the NPI Registry, state medical board records, and credentialing databases. Every MD and DO record is validated for email deliverability, postal accuracy, and professional license status before delivery.",
    stats: [
      { label: "Email Deliverability", value: "96%+" },
      { label: "NPI Verified", value: "100%" },
      { label: "Data Refresh", value: "Quarterly" },
      { label: "Specialty Codes", value: "300+" },
    ],
    attrKicker: "Physician Segmentation",
    attrTitle: "Target by specialty,",
    attrAccent: "setting & seniority",
    attrs: [
      { icon: "Stethoscope", title: "Medical Specialty", desc: "Filter by primary specialty (cardiology, oncology, family medicine, etc.) and sub-specialty for precision targeting." },
      { icon: "Building2",   title: "Practice Setting",  desc: "Solo practice, multi-physician group, hospital-employed, academic medical center, or federally qualified health center." },
      { icon: "MapPin",      title: "Geography",         desc: "State, county, city, ZIP, or custom radius from any location for territory-aligned physician prospecting." },
      { icon: "Award",       title: "Board Certification",desc: "Filter by board-certified status, fellowship credentials, and years in active practice." },
    ],
    ucKicker: "Campaign Applications",
    ucTitle: "How marketers activate the",
    ucAccent: "Physicians & Doctors List",
    ucs: [
      { icon: "Mail",     title: "Pharma & Device Outreach", desc: "Reach prescribers and procedure-performing physicians with drug formulary updates, device trials, and continuing education invitations." },
      { icon: "MailOpen", title: "Medical Services Mail",    desc: "Drive physician referrals and practice partnerships with credentialed direct mail delivered to verified practice addresses." },
      { icon: "Phone",    title: "Sales Rep Prospecting",    desc: "Equip field sales teams with direct office numbers and mobile contacts for appointment-setting and lunch-and-learn scheduling." },
    ],
    proseKicker: "About Physician Data",
    proseTitle: "The most complete",
    proseAccent: "physician contact database",
    prosePara1: "Physicians are among the most sought-after and hardest-to-reach professionals in B2B healthcare marketing. Our Physicians & Doctors Email List is built from the ground up using the National Provider Identifier Registry as a primary source, cross-referenced with state medical board license data, hospital credentialing files, and professional society membership records.",
    prosePara2: "Each physician record carries a full field set: verified email address, direct office phone, practice mailing address, primary specialty code, NPI number, practice name, hospital affiliations, board certification status, and years in practice. Records are refreshed quarterly with continuous change monitoring to ensure you're always working with current, deliverable data.",
    prosePara3: "Whether you're launching a pharmaceutical campaign targeting specific prescribers, a medical device trial recruitment effort, or a healthcare services prospecting program, the Physicians & Doctors Email List gives your team the verified, specialty-segmented data to reach the right clinicians at the right time.",
    fgKicker1: "Why Choose This List", fgTitle1: "Purpose-built for", fgAccent1: "physician marketing",
    fgDesc1: "The Physicians & Doctors Email List is designed for marketers who need credentialed, specialty-matched physician data for high-stakes healthcare campaigns.",
    fgFeatures1: [
      { icon: "ShieldCheck", title: "NPI Registry Verified",    desc: "Every physician cross-referenced against the federal NPI Registry for license and credential accuracy." },
      { icon: "Stethoscope", title: "300+ Specialty Codes",     desc: "Target by primary specialty, sub-specialty, procedure type, and clinical focus area with granular precision." },
      { icon: "RefreshCw",   title: "Quarterly Re-Verification",desc: "Full credential and contact re-verification every 90 days with continuous change monitoring between cycles." },
      { icon: "MapPin",      title: "Territory-Ready",          desc: "Geographic selects at state, county, city, or ZIP level for field-force aligned physician prospecting." },
      { icon: "Database",    title: "18+ Data Fields",          desc: "Email, phone, address, NPI, specialty code, hospital affiliation, board certification, and more." },
      { icon: "Zap",         title: "CRM-Ready Delivery",       desc: "Pre-formatted for Salesforce, Veeva, HubSpot, and all major pharma CRM platforms." },
    ],
    fgKicker2: "Data Fields", fgTitle2: "Complete record", fgAccent2: "field coverage",
    fgDesc2: "Every Physicians & Doctors record includes the full field set required for multi-channel physician engagement across email, mail, phone, and digital platforms.",
    fgFeatures2: [
      { icon: "Mail",       title: "Verified Email",       desc: "SMTP-validated physician email address with engagement indicator and bounce risk score." },
      { icon: "Phone",      title: "Direct Office Phone",  desc: "Verified direct and main office phone numbers with line-type identification." },
      { icon: "MapPin",     title: "Practice Address",     desc: "CASS-certified postal address for the physician's primary practice location." },
      { icon: "Building2",  title: "Hospital Affiliations",desc: "Affiliated hospital and health system names for account-level targeting." },
      { icon: "Stethoscope",title: "Specialty & NPI",      desc: "Primary specialty, sub-specialty, NPI number, and DEA registration indicator." },
      { icon: "Award",      title: "Board Status",         desc: "Board certification status and certifying body for credentialed targeting." },
      { icon: "RefreshCw",  title: "Verified Date",        desc: "Last verification date for recency filtering and data freshness assurance." },
      { icon: "ShieldCheck",title: "Compliance Flags",     desc: "CAN-SPAM, TCPA, and opt-out suppression indicators included with each record." },
    ],
    fgKicker3: "Channels", fgTitle3: "Deploy across", fgAccent3: "every physician channel",
    fgDesc3: "Physician contacts formatted and cleared for email, direct mail, and phone outreach — ready for activation across your preferred marketing channels.",
    fgFeatures3: [
      { icon: "Mail",   title: "Email Campaigns",  desc: "Send clinical content, formulary updates, device trial invitations, and event registrations directly to verified physician inboxes." },
      { icon: "MailOpen",title: "Direct Mail",     desc: "Reach physicians at their practice address with high-quality print materials, samples, and educational content." },
      { icon: "Phone",  title: "Phone Outreach",   desc: "Connect field reps and inside sales teams with verified physician direct lines for appointment-setting and detailing." },
    ],
    faqItems: [
      { q: "How many physicians are in the Physicians & Doctors Email List?", a: "Our Physicians & Doctors Email List covers hundreds of thousands of active licensed physicians across all 50 states. Counts vary by specialty, geography, and practice setting filter. Contact us for a free custom universe count matched to your campaign criteria." },
      { q: "How are physician records verified for accuracy?", a: "Every physician record is cross-referenced against the National Provider Identifier Registry, state medical board license databases, and hospital credentialing files. Email addresses undergo SMTP validation, and postal addresses are CASS-certified for deliverability. Records are re-verified quarterly with continuous monitoring for license changes and practice relocations." },
      { q: "What file format is the Physicians & Doctors Email List delivered in?", a: "Data is delivered as a ready-to-use CSV or Excel file with all fields mapped and documented. We support direct CRM import for Salesforce, Veeva, HubSpot, and Marketo. Custom field mapping, SFTP delivery, and API integration are available for enterprise clients." },
      { q: "Can I segment physicians by specialty and practice setting?", a: "Yes. Our segmentation options include primary specialty (300+ codes), sub-specialty, board certification, practice setting (solo, group, hospital-employed, academic), hospital affiliation, geographic territory, and years in practice. Custom multi-attribute selects are available." },
      { q: "Is the Physicians & Doctors Email List compliant for pharmaceutical marketing?", a: "Yes. All records carry opt-in documentation, CAN-SPAM compliance indicators, and TCPA consent flags. We cross-reference against the Do Not Contact registry and provide full suppression processing. Compliance documentation is included with every delivery. Consult your legal team for campaign-specific requirements." },
      { q: "Can I use this data for both email and direct mail outreach?", a: "Absolutely. Every physician record includes verified email address, practice mailing address, and direct phone number — enabling true omnichannel physician engagement. We also support digital advertising onboarding through LiveRamp and major DSP platforms." },
      { q: "How can I get a sample of the Physicians & Doctors Email List?", a: "Yes — we offer complimentary sample records and custom universe counts at no charge. Submit your targeting criteria and we'll provide a data sample and count breakdown within one business day. Contact our data team to request your free preview." },
    ],
  },

  "physicians-advanced-practice/podiatrists": {
    h1: "Podiatrists Email List",
    kicker: "Foot & Ankle Specialist Data",
    titlePlain: "Reach Verified",
    titleAccent: "Podiatrists Nationwide",
    heroDesc: "Comprehensive contact data for licensed podiatrists (DPMs) practicing in private clinics, hospital outpatient departments, wound care centers, and sports medicine facilities across the U.S.",
    introKicker: "Podiatry Data Targeting",
    introHeadlinePlain: "Verified contacts for",
    introHeadlineAccent: "foot and ankle specialists",
    introParagraph: "The Podiatrists Email List connects you with licensed Doctors of Podiatric Medicine (DPMs) who influence purchasing decisions for specialty footwear, orthotic devices, wound care supplies, surgical instruments, and practice management solutions.",
    stats: [
      { label: "Deliverability", value: "95%+" },
      { label: "DPM Verified", value: "100%" },
      { label: "Specialty Fields", value: "12+" },
      { label: "Refresh Cycle", value: "Quarterly" },
    ],
    attrKicker: "Podiatrist Segmentation",
    attrTitle: "Filter by subspecialty,",
    attrAccent: "location & practice type",
    attrs: [
      { icon: "Stethoscope", title: "Subspecialty",     desc: "Wound care, sports medicine, diabetic foot care, reconstructive surgery, or general podiatric practice." },
      { icon: "Building2",   title: "Practice Setting", desc: "Private clinic, hospital-based, federally qualified health center, or multi-specialty group." },
      { icon: "MapPin",      title: "Geography",        desc: "Target by state, city, ZIP code, or custom radius around specific locations." },
      { icon: "Users",       title: "Practice Size",    desc: "Solo DPM practice, small group, or large podiatric specialty group for account-based outreach." },
    ],
    ucKicker: "Podiatry Marketing Uses",
    ucTitle: "Campaigns powered by",
    ucAccent: "podiatrist contact data",
    ucs: [
      { icon: "Mail",     title: "Device & Supply Sales",   desc: "Promote orthotics, wound care products, surgical instruments, and podiatric equipment directly to DPM decision-makers." },
      { icon: "MailOpen", title: "Practice Marketing Mail", desc: "Send targeted direct mail to podiatric practices for referral network building and service promotion." },
      { icon: "Phone",    title: "Sales Rep Scheduling",    desc: "Equip territory reps with verified podiatrist direct lines for appointment scheduling and product demonstrations." },
    ],
    proseKicker: "About Podiatry Data",
    proseTitle: "Reaching every practicing",
    proseAccent: "podiatrist in America",
    prosePara1: "The Podiatrists Email List is purpose-built for marketers targeting the specialized field of podiatric medicine. DPMs are key decision-makers for foot and ankle surgical devices, diabetic wound care protocols, custom orthotic fabrication systems, electronic health record platforms, and practice management solutions.",
    prosePara2: "Our podiatrist data is sourced from the APMA member registry, state podiatry board licensing databases, and the federal NPI Registry. Every DPM record is validated for email deliverability and postal accuracy, with credentials cross-referenced to confirm active license status. Geographic and subspecialty segmentation is available at the ZIP level.",
    prosePara3: "Whether you're targeting wound care specialists in high-diabetic-prevalence markets, sports podiatrists affiliated with orthopedic groups, or general podiatrists for practice management software, our list gives you the targeting precision and data quality to reach the right DPMs with the right message.",
    fgKicker1: "List Strengths", fgTitle1: "Why marketers choose the", fgAccent1: "Podiatrists Email List",
    fgDesc1: "Built from podiatric licensing records and professional society data, this list gives marketers verified DPM contacts with specialty-level segmentation.",
    fgFeatures1: [
      { icon: "ShieldCheck", title: "License Verified",      desc: "Every DPM record validated against state podiatry licensing boards and federal NPI Registry." },
      { icon: "Stethoscope", title: "Subspecialty Filters",  desc: "Wound care, sports medicine, pediatric podiatry, reconstructive surgery, and more." },
      { icon: "RefreshCw",   title: "Quarterly Refresh",     desc: "Re-verified every 90 days to reflect practice relocations, license renewals, and contact changes." },
      { icon: "MapPin",      title: "ZIP-Level Geography",   desc: "Target podiatrists in high-diabetic-prevalence counties, urban cores, or specific DMA territories." },
      { icon: "Database",    title: "Full Field Set",        desc: "Email, phone, address, NPI, subspecialty, and practice name included with every record." },
      { icon: "Zap",         title: "Campaign Ready",        desc: "Pre-formatted CSV with suppression files and compliance documentation for immediate activation." },
    ],
    fgKicker2: "Data Fields", fgTitle2: "Every DPM record", fgAccent2: "fully documented",
    fgDesc2: "Podiatrist records include all contact and credential fields needed for targeted email, mail, and phone outreach campaigns.",
    fgFeatures2: [
      { icon: "Mail",       title: "Email Address",      desc: "SMTP-validated podiatrist email with bounce risk scoring for inbox-optimized deployment." },
      { icon: "Phone",      title: "Office Phone",        desc: "Verified direct and main office lines for territory rep scheduling and inside sales outreach." },
      { icon: "MapPin",     title: "Practice Address",    desc: "CASS-certified postal address for direct mail delivery to podiatric clinics and offices." },
      { icon: "Building2",  title: "Practice Name",       desc: "Clinic or group practice name for personalized outreach and CRM account creation." },
      { icon: "Stethoscope",title: "DPM Credential",     desc: "License number, NPI, state of licensure, and active/inactive status." },
      { icon: "Users",      title: "Specialty Focus",    desc: "Primary subspecialty code including wound care, sports, or reconstructive podiatry." },
      { icon: "RefreshCw",  title: "Last Verified",      desc: "Verification timestamp for data freshness filtering and recency-based segmentation." },
      { icon: "ShieldCheck",title: "Compliance Flags",   desc: "CAN-SPAM and TCPA indicators plus DNC suppression processing included." },
    ],
    fgKicker3: "Activation Channels", fgTitle3: "Reach podiatrists", fgAccent3: "where it matters most",
    fgDesc3: "Podiatrist contacts formatted for seamless email, direct mail, and phone campaign activation.",
    fgFeatures3: [
      { icon: "Mail",    title: "Email Marketing",  desc: "Deliver product announcements, clinical education content, and event invites to verified DPM inboxes." },
      { icon: "MailOpen",title: "Direct Mail",      desc: "Send samples, catalogs, and practice-building materials to CASS-certified podiatric practice addresses." },
      { icon: "Phone",   title: "Phone Outreach",   desc: "Reach DPM decision-makers at verified office lines for sales rep appointment scheduling." },
    ],
    faqItems: [
      { q: "How many podiatrists are in the Podiatrists Email List?", a: "Our Podiatrists Email List covers licensed DPMs across all 50 states. The exact count varies based on subspecialty, geographic, and practice-type filters you select. Request a free count estimate and we'll provide a full universe breakdown within 24 hours." },
      { q: "How is podiatrist data verified for accuracy?", a: "Every DPM record is validated against state podiatry licensing boards, the federal NPI Registry, and APMA member data. Email addresses are SMTP-tested and postal addresses are CASS-certified. Full re-verification runs quarterly with continuous monitoring for practice changes." },
      { q: "In what format is the Podiatrists Email List delivered?", a: "You receive a ready-to-use CSV or Excel file with all fields labeled and documented. We support imports into Salesforce, HubSpot, and most major CRMs, plus custom SFTP and API delivery for enterprise teams." },
      { q: "Can I target podiatrists by subspecialty and location?", a: "Yes. Filter by wound care, sports podiatry, pediatric podiatry, diabetic foot care, or reconstructive surgery. Geographic segmentation is available by state, DMA, county, or ZIP code for territory-aligned targeting." },
      { q: "Is the Podiatrists Email List suitable for medical device marketing?", a: "Yes. Records carry full compliance documentation including opt-in status, CAN-SPAM flags, and TCPA indicators. Suppression processing and DNC cross-referencing are included with every order. Review your product-specific regulatory requirements with your compliance team." },
      { q: "Can I run multi-channel campaigns with this data?", a: "Yes. Every podiatrist record includes email, office phone, and mailing address for omnichannel campaign activation across email marketing, direct mail, telemarketing, and digital advertising platforms." },
      { q: "Is a free sample available before I commit to the Podiatrists Email List?", a: "Absolutely. We provide complimentary sample records and a detailed count breakdown at no charge. Share your targeting criteria and we'll have your free preview ready within one business day." },
    ],
  },

  "physicians-advanced-practice/nurse-practitioners": {
    h1: "Nurse Practitioners Email List",
    kicker: "Advanced Practice Nurse Data",
    titlePlain: "Connect with",
    titleAccent: "Nurse Practitioners",
    heroDesc: "Verified contact data for Nurse Practitioners (NPs) practicing independently and collaboratively across primary care, specialty clinics, urgent care centers, and hospital outpatient departments throughout the U.S.",
    introKicker: "NP Targeting Data",
    introHeadlinePlain: "Reach APRNs who",
    introHeadlineAccent: "prescribe and purchase",
    introParagraph: "Nurse Practitioners hold prescriptive authority in all 50 states and are primary healthcare decision-makers for drugs, devices, and clinical supplies in independent and collaborative practice settings. Our NP Email List is built from state APRN licensing boards and the NPI Registry.",
    stats: [
      { label: "Email Deliverability", value: "95%+" },
      { label: "APRN Verified",        value: "100%" },
      { label: "NP Specialties",       value: "15+" },
      { label: "Refresh Cycle",        value: "Quarterly" },
    ],
    attrKicker: "NP Segmentation Options",
    attrTitle: "Target NPs by specialty",
    attrAccent: "scope & setting",
    attrs: [
      { icon: "Stethoscope", title: "NP Population Focus", desc: "Adult-gerontology, family, pediatric, psychiatric-mental health, women's health, or neonatal NPs." },
      { icon: "Building2",   title: "Practice Setting",    desc: "Independent practice, collaborating physician practice, urgent care, hospital outpatient, or community health." },
      { icon: "MapPin",      title: "Geography",           desc: "Filter by full-practice-authority states, specific DMAs, or custom geographic territories." },
      { icon: "ShieldCheck", title: "Prescribing Status",  desc: "Target NPs with DEA registration and Schedule II prescriptive authority for pharmaceutical outreach." },
    ],
    ucKicker: "NP Marketing Applications",
    ucTitle: "How brands activate",
    ucAccent: "Nurse Practitioner data",
    ucs: [
      { icon: "Mail",     title: "Pharmaceutical Outreach", desc: "Reach NPs with prescriptive authority for drug sample programs, formulary updates, and clinical education mailings." },
      { icon: "MailOpen", title: "Clinical Supply Sales",   desc: "Market diagnostic tools, wound care products, and point-of-care equipment to NPs managing independent practices." },
      { icon: "Phone",    title: "CME & Education Calls",   desc: "Schedule continuing education events, webinars, and product training calls with NPs at their practice office." },
    ],
    proseKicker: "About NP Contact Data",
    proseTitle: "Data built for the",
    proseAccent: "NP prescriber audience",
    prosePara1: "Nurse Practitioners represent one of the fastest-growing prescriber populations in the U.S., with full practice authority in an increasing number of states and significant formulary influence even in collaborative practice states. Our Nurse Practitioners Email List is built from state APRN licensing board records and the federal NPI Registry, with every NP validated for active license status and contact deliverability.",
    prosePara2: "Each NP record includes APRN certification (ANCC, AANP), population focus certification (FNP, AGNP, PMHNP, PNP, WHNP, NNP), practice authority state classification, prescriptive authority status, NPI number, and practice address. These fields allow pharmaceutical marketers to target specific NP prescriber profiles with precision that generic HCP lists cannot provide.",
    prosePara3: "Whether you're running a patient services program targeting FNPs in primary care, a device trial outreach for acute care NPs, or a brand launch campaign for psychiatric NPs, our list delivers the specialty-segmented, prescriber-verified contacts your team needs to maximize engagement and ROI.",
    fgKicker1: "NP List Advantages", fgTitle1: "Purpose-built for", fgAccent1: "NP prescriber marketing",
    fgDesc1: "Our Nurse Practitioners Email List is designed for marketers who need verified APRN contact data with prescriber credentials and specialty-level segmentation.",
    fgFeatures1: [
      { icon: "ShieldCheck", title: "APRN Credential Verified", desc: "Every NP record validated against state APRN licensing boards and federal NPI Registry." },
      { icon: "Stethoscope", title: "Population Focus Codes",   desc: "Target by FNP, AGNP, PMHNP, PNP, WHNP, NNP, and 15+ additional specialty certifications." },
      { icon: "RefreshCw",   title: "Quarterly Refresh",        desc: "Full re-verification every 90 days to capture new NP graduates and practice location changes." },
      { icon: "MapPin",      title: "Authority State Targeting", desc: "Segment by full, restricted, or supervised practice authority states for regulatory-aligned outreach." },
      { icon: "Database",    title: "Prescriber Fields",        desc: "DEA number, prescriptive authority status, and NPI included for pharmaceutical targeting." },
      { icon: "Zap",         title: "Multi-CRM Ready",          desc: "Pre-formatted for Veeva, Salesforce, HubSpot, and all major healthcare CRM platforms." },
    ],
    fgKicker2: "Data Fields", fgTitle2: "What's in each", fgAccent2: "NP record",
    fgDesc2: "Nurse Practitioner records include the full credential and contact field set required for APRN-targeted pharmaceutical and clinical outreach.",
    fgFeatures2: [
      { icon: "Mail",       title: "Work Email",          desc: "SMTP-validated NP email address with inbox deliverability scoring." },
      { icon: "Phone",      title: "Practice Phone",      desc: "Verified direct and main office phone numbers for appointment and event scheduling." },
      { icon: "MapPin",     title: "Practice Address",    desc: "CASS-certified postal address for NP's primary practice location." },
      { icon: "Building2",  title: "Practice Name",      desc: "Clinic or employer organization for account-level outreach and relationship mapping." },
      { icon: "Stethoscope",title: "Specialty & Cert",   desc: "APRN certification type, population focus, and specialty board certifier." },
      { icon: "ShieldCheck",title: "NPI & DEA",          desc: "NPI number and DEA registration flag for prescriber-verified pharmaceutical campaigns." },
      { icon: "RefreshCw",  title: "License Date",       desc: "License renewal date and initial licensure year for recency-based targeting." },
      { icon: "Award",      title: "Practice Authority", desc: "Full, reduced, or restricted practice authority state classification for regulatory targeting." },
    ],
    fgKicker3: "Channel Activation", fgTitle3: "NP marketing", fgAccent3: "across all channels",
    fgDesc3: "Verified NP contacts ready for deployment across email, direct mail, and phone outreach for pharmaceutical, device, and clinical service campaigns.",
    fgFeatures3: [
      { icon: "Mail",    title: "Email Campaigns", desc: "Prescriber-targeted email for drug formulary, CME, clinical trial, and product launch campaigns delivered to verified NP inboxes." },
      { icon: "MailOpen",title: "Direct Mail",     desc: "Clinical education, sample request cards, and practice-building materials mailed to CASS-certified NP practice addresses." },
      { icon: "Phone",   title: "Phone Outreach",  desc: "Connect sales reps and medical science liaisons with NPs via verified office phone for detailing and scheduling." },
    ],
    faqItems: [
      { q: "How many Nurse Practitioners are included in this list?", a: "Our NP list covers hundreds of thousands of licensed APRNs nationwide. Universe size varies by specialty certification, practice authority state, and geographic filter. Contact us for a free count estimate tailored to your campaign." },
      { q: "How is NP credential data verified?", a: "Every NP record is verified against state APRN licensing boards, ANCC and AANP certification databases, and the federal NPI Registry. Email deliverability and postal accuracy are validated before every delivery. Full re-verification runs quarterly." },
      { q: "What format is the NP list delivered in?", a: "CSV or Excel with fully documented field headers. We support Veeva, Salesforce, HubSpot, and Marketo imports. SFTP and API delivery are available for enterprise and pharmaceutical clients." },
      { q: "Can I target NPs with prescriptive authority for pharmaceutical campaigns?", a: "Yes. We include DEA number flag, prescriptive authority status, and practice authority state classification so you can target only NPs with the specific prescribing scope relevant to your product." },
      { q: "Is this list compliant for pharmaceutical marketing regulations?", a: "Yes. Records include opt-in documentation, CAN-SPAM and TCPA compliance flags, and DNC suppression processing. Compliance documentation ships with every order. Consult your regulatory team for product-specific requirements." },
      { q: "Can this list be used for digital and programmatic advertising?", a: "Yes. NP contact data can be onboarded to Facebook Custom Audiences, Google Customer Match, LinkedIn Matched Audiences, and major DSP platforms through LiveRamp for coordinated multi-channel outreach." },
      { q: "Is a sample available before purchase?", a: "Yes. We provide complimentary NP sample records and a custom universe count at no charge. Submit your targeting criteria and receive your data preview within one business day." },
    ],
  },

  "physicians-advanced-practice/physician-assistants": {
    h1: "Physician Assistants Email List",
    kicker: "PA Prescriber Contact Data",
    titlePlain: "Target Licensed",
    titleAccent: "Physician Assistants",
    heroDesc: "Accurate, NPI-verified contact data for Physician Assistants (PAs) practicing across surgical specialties, emergency medicine, primary care, and hospital-based settings nationwide.",
    introKicker: "PA Targeting Data",
    introHeadlinePlain: "Reach PAs who drive",
    introHeadlineAccent: "clinical purchasing decisions",
    introParagraph: "PAs hold prescriptive authority in all 50 states and are key decision-makers in drug selection, device adoption, and supply procurement in both physician-supervised and team-based care environments. Our PA Email List is sourced from NCCPA certification records and state PA licensing boards.",
    stats: [
      { label: "Email Accuracy", value: "95%+" },
      { label: "NCCPA Verified", value: "100%" },
      { label: "Specialties Covered", value: "30+" },
      { label: "Data Refresh", value: "Quarterly" },
    ],
    attrKicker: "PA Audience Segmentation",
    attrTitle: "Segment PAs by specialty",
    attrAccent: "setting & certification",
    attrs: [
      { icon: "Stethoscope", title: "Clinical Specialty", desc: "Surgical PAs, emergency medicine, orthopedics, dermatology, cardiology, oncology, or primary care." },
      { icon: "Building2",   title: "Practice Setting",  desc: "Hospital, outpatient clinic, surgical center, emergency department, or multi-specialty practice." },
      { icon: "MapPin",      title: "Geography",         desc: "State, county, DMA, or ZIP-level targeting for territory-based PA outreach campaigns." },
      { icon: "ShieldCheck", title: "Certification",     desc: "NCCPA-certified PA-C status, CME completion indicator, and recertification year available." },
    ],
    ucKicker: "PA Campaign Use Cases",
    ucTitle: "How brands use the",
    ucAccent: "Physician Assistants Email List",
    ucs: [
      { icon: "Mail",     title: "Surgical Product Sales",  desc: "Reach surgical PAs and ortho PAs who assist in procedures and influence device purchasing in operating rooms." },
      { icon: "MailOpen", title: "Emergency Care Outreach", desc: "Market trauma supplies, diagnostic tools, and point-of-care devices to ED-based PAs at their work location." },
      { icon: "Phone",    title: "Medical Science Liaison", desc: "Schedule PA advisory board calls, speaker programs, and continuing education events via verified office contact." },
    ],
    proseKicker: "About PA Data",
    proseTitle: "Certified data for",
    proseAccent: "the PA prescriber market",
    prosePara1: "Physician Assistants are the second-largest prescriber group in the U.S. after physicians and nurse practitioners, with over 175,000 licensed PAs across all clinical settings. Our Physician Assistants Email List is built from NCCPA certification records, state PA licensing board data, and the federal NPI Registry — giving marketers a verified, specialty-segmented PA audience for clinical campaigns.",
    prosePara2: "PA records include their clinical specialty area, supervising physician practice or employer organization, DEA prescribing status, NCCPA certification number, NPI, and primary practice location. This allows pharmaceutical and device companies to target specific PA prescriber cohorts — surgical PAs in orthopedic groups, PA-Cs in dermatology practices, or ED PAs in high-volume trauma centers.",
    prosePara3: "From drug formulary marketing to surgical instrument demonstrations, medical conference invitations to post-acute care solutions, the Physician Assistants Email List gives your team the credential-verified, specialty-matched data to engage this growing, high-influence prescriber group effectively.",
    fgKicker1: "PA List Strengths", fgTitle1: "Built for the", fgAccent1: "PA prescriber market",
    fgDesc1: "Credential-verified PA contact data with specialty, setting, and certification segmentation for targeted pharmaceutical and device marketing.",
    fgFeatures1: [
      { icon: "ShieldCheck", title: "NCCPA Certified",      desc: "Validated against National Commission on Certification of Physician Assistants records." },
      { icon: "Stethoscope", title: "30+ Specialty Codes",  desc: "Surgical, ED, orthopedic, derm, oncology, cardiology, primary care, and more." },
      { icon: "RefreshCw",   title: "Quarterly Refresh",    desc: "Re-verified every 90 days for license renewals, practice changes, and certification updates." },
      { icon: "MapPin",      title: "Territory Targeting",  desc: "Geographic segmentation at state, county, DMA, and ZIP level for field team alignment." },
      { icon: "Database",    title: "Prescriber Fields",    desc: "DEA status, NCCPA number, NPI, and supervising physician practice included." },
      { icon: "Zap",         title: "CRM-Ready Format",     desc: "Pre-formatted CSV compatible with Veeva, Salesforce, HubSpot, and Marketo." },
    ],
    fgKicker2: "Record Fields", fgTitle2: "Complete PA", fgAccent2: "record coverage",
    fgDesc2: "Every PA record includes the full credential, contact, and specialty field set needed for targeted clinical outreach.",
    fgFeatures2: [
      { icon: "Mail",       title: "Work Email",        desc: "SMTP-validated email with deliverability scoring for inbox-optimized campaign send." },
      { icon: "Phone",      title: "Office Phone",      desc: "Verified direct and main office lines for scheduling sales calls and MSL meetings." },
      { icon: "MapPin",     title: "Work Address",      desc: "CASS-certified practice mailing address for direct mail and sample delivery." },
      { icon: "Building2",  title: "Employer Name",    desc: "Practice, group, or hospital employer for account-level CRM mapping." },
      { icon: "Stethoscope",title: "Specialty",        desc: "Primary clinical specialty and sub-specialty area for audience segmentation." },
      { icon: "ShieldCheck",title: "NPI & DEA",        desc: "NPI number and DEA prescribing status for pharmaceutical campaign qualification." },
      { icon: "Award",      title: "NCCPA Number",     desc: "Certification number and recertification year for credential-level targeting." },
      { icon: "RefreshCw",  title: "Last Verified",    desc: "Contact and credential verification timestamp for data freshness filtering." },
    ],
    fgKicker3: "Marketing Channels", fgTitle3: "Activate PAs across", fgAccent3: "all marketing channels",
    fgDesc3: "PA contacts formatted and cleared for email, direct mail, and phone outreach across all healthcare marketing channels.",
    fgFeatures3: [
      { icon: "Mail",    title: "Email Marketing", desc: "Reach PAs with formulary updates, device trial invitations, CME content, and conference registrations at verified email addresses." },
      { icon: "MailOpen",title: "Direct Mail",     desc: "Deliver catalogs, clinical reprints, and product samples to verified PA practice addresses." },
      { icon: "Phone",   title: "Sales Outreach",  desc: "Connect field reps with PAs via verified office phone for detailing appointments and product demonstrations." },
    ],
    faqItems: [
      { q: "How many Physician Assistants are in this list?", a: "Our PA list covers active, certified PA-Cs nationwide. Universe size depends on specialty, geography, and setting filters. Request a free count estimate and we'll provide a complete breakdown within 24 hours." },
      { q: "How are PA records verified?", a: "Records are cross-referenced against NCCPA certification data, state PA licensing boards, and the federal NPI Registry. Email and postal data are validated for deliverability. Full re-verification runs quarterly with continuous change monitoring." },
      { q: "What CRM platforms does this PA list support?", a: "We support Veeva, Salesforce, HubSpot, and Marketo with pre-formatted imports. SFTP delivery and API integration are available. Custom field mapping is included for pharmaceutical and medical device clients." },
      { q: "Can I target surgical PAs or specialty-specific cohorts?", a: "Yes. Segment by clinical specialty including surgery, orthopedics, dermatology, cardiology, oncology, ED medicine, and primary care. Practice setting and geographic filters can be combined for precision targeting." },
      { q: "Is the PA list compliant for healthcare marketing regulations?", a: "Yes. Records include opt-in documentation, CAN-SPAM compliance flags, and TCPA consent indicators. DNC suppression and compliance certification are included with every delivery." },
      { q: "Can this list power digital advertising campaigns targeting PAs?", a: "Yes. PA contact data can be onboarded to Facebook, LinkedIn, and Google platforms, and to DSPs through LiveRamp, for digital advertising that reaches PAs by specialty and practice type across multiple screens." },
      { q: "Is a free preview of the PA list available?", a: "Yes. We offer complimentary sample records and a custom universe count. Provide your targeting criteria and we'll have your preview ready within one business day at no cost." },
    ],
  },

  "physicians-advanced-practice/medical-assistants": {
    h1: "Medical Assistants Email List",
    kicker: "Clinical Support Staff Data",
    titlePlain: "Reach Certified",
    titleAccent: "Medical Assistants",
    heroDesc: "Targeted contact data for certified medical assistants (CMAs and RMAs) working in physician offices, ambulatory care clinics, specialty practices, and outpatient surgery centers across the United States.",
    introKicker: "Medical Assistant Targeting",
    introHeadlinePlain: "Connect with clinical",
    introHeadlineAccent: "frontline healthcare staff",
    introParagraph: "Medical assistants are the backbone of physician practices — managing patient intake, performing clinical procedures, and administering medications under supervision. They are key purchasers and users of point-of-care supplies, EHR training materials, and clinical workflow tools.",
    stats: [
      { label: "Email Deliverability", value: "94%+" },
      { label: "Certification Verified", value: "100%" },
      { label: "Practice Settings", value: "20+" },
      { label: "Refresh Cycle", value: "Quarterly" },
    ],
    attrKicker: "MA Audience Filters",
    attrTitle: "Target MAs by setting",
    attrAccent: "specialty & certification",
    attrs: [
      { icon: "Building2",   title: "Practice Setting",    desc: "Physician office, multispecialty clinic, urgent care, ambulatory surgery, or hospital outpatient department." },
      { icon: "Stethoscope", title: "Clinical Specialty",  desc: "Primary care, pediatrics, OB-GYN, dermatology, cardiology, or specialty practice medical assistants." },
      { icon: "MapPin",      title: "Geography",           desc: "State, county, ZIP, or metro area targeting for regional and territory-based campaigns." },
      { icon: "Award",       title: "Certification",       desc: "CMA (AAMA), RMA (AMT), CCMA (NHA), or NCMA certification for credentialed professional targeting." },
    ],
    ucKicker: "MA Marketing Applications",
    ucTitle: "How marketers use",
    ucAccent: "Medical Assistant contact data",
    ucs: [
      { icon: "Mail",     title: "Clinical Supply Sales",  desc: "Promote point-of-care supplies, phlebotomy equipment, and clinical consumables to MAs who order and use them daily." },
      { icon: "MailOpen", title: "EHR & Workflow Tools",   desc: "Market EHR training programs, scheduling software, and clinical workflow solutions to MA staff." },
      { icon: "Phone",    title: "Training & Education",   desc: "Schedule certification prep, CE courses, and product training sessions with MA staff at their practice location." },
    ],
    proseKicker: "About Medical Assistant Data",
    proseTitle: "Verified data for",
    proseAccent: "clinical support professionals",
    prosePara1: "Medical assistants perform dual administrative and clinical roles in ambulatory care settings, making them critical influencers in the procurement of clinical supplies, point-of-care devices, and practice management technology. Our Medical Assistants Email List is sourced from AAMA and AMT certification records, NHA credentialing data, and state-level allied health licensing databases.",
    prosePara2: "MA records include certification type (CMA, RMA, CCMA), employer practice name, practice specialty, geographic location, and verified contact information. This allows marketers of clinical consumables, EHR systems, diagnostic devices, and continuing education programs to reach the staff who directly recommend and purchase these products.",
    prosePara3: "From phlebotomy supply vendors to medical coding software companies, our Medical Assistants Email List supports highly targeted campaigns to the clinical professionals who run daily operations in physician practices across America.",
    fgKicker1: "List Strengths", fgTitle1: "Why the", fgAccent1: "Medical Assistants Email List works",
    fgDesc1: "Certification-sourced MA contact data with practice setting and specialty segmentation for clinical supply and education marketing.",
    fgFeatures1: [
      { icon: "ShieldCheck", title: "Certification Sourced", desc: "Records from AAMA, AMT, and NHA certification databases for verified CMA, RMA, and CCMA contacts." },
      { icon: "Building2",   title: "Setting Segmentation", desc: "Physician office, ambulatory, urgent care, surgical center, or hospital outpatient targeting." },
      { icon: "RefreshCw",   title: "Quarterly Refresh",    desc: "Re-verified every 90 days to capture certification updates and practice location changes." },
      { icon: "Stethoscope", title: "Specialty Filters",    desc: "Target MAs by the specialty of the practice they work in for product-aligned outreach." },
      { icon: "Database",    title: "Full Record Fields",   desc: "Email, phone, address, certification type, and employer practice name in every record." },
      { icon: "Zap",         title: "Immediate Deployment", desc: "Pre-formatted CSV with suppression files and documentation for same-day campaign activation." },
    ],
    fgKicker2: "Record Fields", fgTitle2: "Complete MA", fgAccent2: "data field coverage",
    fgDesc2: "Medical Assistant records include all contact and credential fields needed for clinical supply, software, and education marketing campaigns.",
    fgFeatures2: [
      { icon: "Mail",       title: "Work Email",        desc: "SMTP-validated email with deliverability rating for inbox-optimized deployment." },
      { icon: "Phone",      title: "Practice Phone",    desc: "Verified main office phone at MA's primary work location for call and scheduling campaigns." },
      { icon: "MapPin",     title: "Practice Address",  desc: "CASS-certified address for direct mail, sample delivery, and clinical visit scheduling." },
      { icon: "Building2",  title: "Employer Practice",desc: "Practice name, specialty, and group size for account-level relationship mapping." },
      { icon: "Award",      title: "Certification Type",desc: "CMA, RMA, CCMA, or NCMA credential with certifying body and certification year." },
      { icon: "Stethoscope",title: "Clinical Specialty",desc: "Primary specialty of the employer practice for product-aligned audience segmentation." },
      { icon: "RefreshCw",  title: "Verified Date",    desc: "Last verification timestamp for data freshness filtering and recency segmentation." },
      { icon: "ShieldCheck",title: "Compliance Flags", desc: "CAN-SPAM and TCPA compliance indicators plus DNC suppression processing." },
    ],
    fgKicker3: "Channel Options", fgTitle3: "Reach MAs through", fgAccent3: "the right channels",
    fgDesc3: "Medical assistant contacts formatted for email, direct mail, and phone activation across your preferred marketing platforms.",
    fgFeatures3: [
      { icon: "Mail",    title: "Email Marketing",  desc: "Deliver product announcements, clinical education content, and certification prep offers directly to MA work inboxes." },
      { icon: "MailOpen",title: "Direct Mail",      desc: "Send product catalogs, samples, and training materials to verified MA practice mailing addresses." },
      { icon: "Phone",   title: "Outbound Calling", desc: "Reach MAs at their clinic for training scheduling, product demonstrations, and supply procurement conversations." },
    ],
    faqItems: [
      { q: "How many Medical Assistants are in this list?", a: "Our MA list covers certified CMAs, RMAs, and CCMAs working in ambulatory care settings across the U.S. The exact count varies by specialty setting and geographic filter. Request a free universe estimate from our data team." },
      { q: "How is medical assistant data verified?", a: "Records are sourced from AAMA, AMT, and NHA certification databases and validated for email deliverability and postal accuracy. Full re-verification runs quarterly with monitoring for certification updates and employer changes between cycles." },
      { q: "What is the delivery format for the MA list?", a: "CSV or Excel with labeled fields and import-ready formatting. We support Salesforce, HubSpot, and Marketo imports. SFTP delivery is available for larger orders and recurring clients." },
      { q: "Can I target MAs by the specialty of their employer practice?", a: "Yes. Filter by primary care, pediatrics, dermatology, OB-GYN, cardiology, oncology, or other specialty to target MAs working in specific clinical environments relevant to your product or service." },
      { q: "Is the MA list suitable for clinical supply and equipment marketing?", a: "Yes. Records are maintained in compliance with CAN-SPAM and TCPA regulations. Opt-in documentation and suppression processing are included. Confirm campaign-specific requirements with your legal and compliance team." },
      { q: "Can I use this list for multi-channel marketing?", a: "Yes. Each MA record includes email, practice phone, and mailing address for email, direct mail, and phone outreach. Digital advertising onboarding through major platforms is also supported." },
      { q: "Is a free preview of the Medical Assistants Email List available?", a: "Yes. We provide sample records and a custom count estimate at no charge. Share your campaign criteria and receive your free data preview within one business day." },
    ],
  },
};

// ─── HELPER to build a full page patch ──────────────────────────
function buildPatch(data) {
  return {
    h1: data.h1,
    kicker: data.kicker,
    titlePlain: data.titlePlain,
    titleAccent: data.titleAccent,
    heroDescription: rt(data.heroDesc),

    introKicker: data.introKicker,
    introHeadlinePlain: data.introHeadlinePlain,
    introHeadlineAccent: data.introHeadlineAccent,
    introParagraphs: rt(data.introParagraph),

    stats: data.stats.map((s) => ({ _key: k(), label: s.label, value: s.value })),

    attributesSectionKicker: data.attrKicker,
    attributesSectionTitle: data.attrTitle,
    attributesSectionAccent: data.attrAccent,
    attributes: data.attrs.map((a) => ({
      _key: k(), icon: a.icon, title: a.title, desc: a.desc,
    })),

    useCasesSectionKicker: data.ucKicker,
    useCasesSectionTitle: data.ucTitle,
    useCasesSectionAccent: data.ucAccent,
    useCases: data.ucs.map((u) => ({
      _key: k(), icon: u.icon, title: u.title, desc: u.desc,
    })),

    proseSections: [{
      _key: k(), _type: "object",
      style: "split",
      kicker: data.proseKicker,
      titlePlain: data.proseTitle,
      titleAccent: data.proseAccent,
      paragraphs: [rt(data.prosePara1)[0], rt(data.prosePara2)[0], rt(data.prosePara3)[0]],
    }],

    featureGridSections: [
      {
        _key: k(), _type: "object",
        kicker: data.fgKicker1, titlePlain: data.fgTitle1, titleAccent: data.fgAccent1,
        description: data.fgDesc1, columns: 3, style: "card",
        features: data.fgFeatures1.map((f) => ({ _key: k(), icon: f.icon, title: f.title, desc: f.desc })),
      },
      {
        _key: k(), _type: "object",
        kicker: data.fgKicker2, titlePlain: data.fgTitle2, titleAccent: data.fgAccent2,
        description: data.fgDesc2, columns: 4, style: "check",
        features: data.fgFeatures2.map((f) => ({ _key: k(), icon: f.icon, title: f.title, desc: f.desc })),
      },
      {
        _key: k(), _type: "object",
        kicker: data.fgKicker3, titlePlain: data.fgTitle3, titleAccent: data.fgAccent3,
        description: data.fgDesc3, columns: 3, style: "card",
        features: data.fgFeatures3.map((f) => ({ _key: k(), icon: f.icon, title: f.title, desc: f.desc })),
      },
    ],

    faqItems: data.faqItems.map((faq) => ({
      _key: k(),
      question: faq.q,
      answer: rt(faq.a),
    })),

    metaTitle: `${data.h1} | Healthcare Marketing Data — Lorann LLC`,
    metaDescription: data.heroDesc.substring(0, 160),
    ogTitle: `${data.h1} | Lorann LLC`,
    ogDescription: data.heroDesc.substring(0, 200),
    focusKeyphrase: data.h1,
  };
}

// ─── MAIN ─────────────────────────────────────────────────────────
async function main() {
  console.log(DRY_RUN ? "DRY RUN\n" : "LIVE RUN\n");

  const slugKeys = Object.keys(PAGE_CONTENT);
  console.log(`Updating ${slugKeys.length} pages with unique content...\n`);

  for (const slugSuffix of slugKeys) {
    const fullSlug = `data-assets/b2b-database/healthcare/${slugSuffix}`;
    const data = PAGE_CONTENT[slugSuffix];
    console.log(`Processing: ${data.h1}`);

    // Fetch the published doc
    const docs = await client.fetch(
      `*[_type=="page" && slug.current=="${fullSlug}"]{_id}`
    );

    if (!docs.length) {
      console.log(`  ⚠️  NOT FOUND: ${fullSlug}`);
      continue;
    }

    const patch = buildPatch(data);

    if (!DRY_RUN) {
      for (const doc of docs) {
        await client.patch(doc._id).set(patch).commit();
        const isDraft = doc._id.startsWith("drafts.");
        console.log(`  ✓ ${isDraft ? "Draft" : "Published"} updated: ${doc._id}`);
      }
    } else {
      console.log(`  → Would update ${docs.length} doc(s)`);
      console.log(`  → Prose paragraphs: 3`);
      console.log(`  → Feature sections: 3`);
      console.log(`  → FAQ items: ${data.faqItems.length}`);
    }
  }

  console.log("\nDone!");
  console.log(`\nNOTE: ${slugKeys.length} pages fully updated with unique content.`);
  console.log("Remaining 33 healthcare pages need content — run phase 2 script.");
}

main().catch((e) => { console.error(e); process.exit(1); });
