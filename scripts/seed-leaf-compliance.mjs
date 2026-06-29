/**
 * Seed script: patches every healthcare LEAF page in Sanity with
 * unique, per-specialty Data Compliance content.
 *
 * Run:  node scripts/seed-leaf-compliance.mjs
 *
 * Requires SANITY_API_WRITE_TOKEN in .env.local
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ── Load env ────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
    raw.split("\n").forEach((line) => {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    });
  } catch {}
}
loadEnv();

const client = createClient({
  projectId: "a694bsry",
  dataset: "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

// ── Helper: string → Portable Text block ────────────────────
function toBlock(text) {
  return [
    {
      _type: "block",
      _key: "b0",
      style: "normal",
      children: [{ _type: "span", _key: "s0", text, marks: [] }],
      markDefs: [],
    },
  ];
}

// ── Helper: items array → Sanity array ──────────────────────
function toItems(items) {
  return items.map((it, i) => ({
    _type: "complianceItem",
    _key: `ci${i}`,
    badge: it.badge,
    title: it.title,
    desc: it.desc,
  }));
}

// ── All leaf-level compliance content ───────────────────────
const LEAF_COMPLIANCE = {
  "physicians-advanced-practice/physicians-doctors": {
    intro: "MD and DO physician contact data is held to the highest regulatory standard in the industry. Every Lorann record for licensed physicians is structured to support lawful B2B marketing — not clinical engagement — across all 50 states.",
    items: [
      { badge: "HIPAA",    title: "MD/DO Records — No PHI or Prescribing Data",       desc: "Physician and doctor lists contain professional licensing data, specialty classification, NPI numbers, and direct practice contact details only. No prescription volumes, DEA schedules, EHR-derived clinical metrics, or patient interaction data is included in any physician marketing file." },
      { badge: "CCPA",     title: "Multi-State Compliance for MD/DO Outreach",        desc: "California-licensed MDs and DOs are scrubbed against CCPA opt-out databases before delivery. Physicians practicing across state lines are evaluated under the most stringent applicable privacy statute in their primary practice jurisdiction before any list is finalized." },
      { badge: "CAN-SPAM", title: "Physician Direct Email — CAN-SPAM Validated",       desc: "Direct email addresses for board-certified physicians across all specialties are validated against federal CAN-SPAM requirements. Opt-out and unsubscribe requests from physician contacts are suppressed in real time and removed from all subsequent pharmaceutical, device, and health technology campaigns." },
      { badge: "FCRA",     title: "Medical Marketing Only — Not Credentialing",       desc: "Physician data is licensed strictly for B2B marketing and outreach — not for hospital privilege determinations, malpractice insurance underwriting, or employment background investigations. FCRA exemption documentation is provided with every physician data order upon request." },
      { badge: "DNC",      title: "MD/DO Office and Mobile Phones DNC-Scrubbed",      desc: "Direct office phone lines and mobile contacts for MDs and DOs across all practice settings are scrubbed against the National Do Not Call Registry before delivery. State-level physician phone records are validated against applicable high-regulation state DNC lists before your outbound team dials." },
    ],
  },

  "physicians-advanced-practice/podiatrists": {
    intro: "Podiatric physician contact data serves a narrow but commercially active specialty. Lorann's compliance framework ensures your supply, device, and practice management outreach to DPMs is structured, lawful, and registry-verified before delivery.",
    items: [
      { badge: "HIPAA",    title: "Podiatry Contact Data — No Patient or Clinical Records", desc: "Podiatrist marketing lists contain DPM license information, NPI registration, practice address, and direct professional contact only. No patient foot-care records, diabetic wound management data, surgical procedure histories, or clinical outcome notes are present in any Lorann podiatry file." },
      { badge: "CCPA",     title: "California DPM Privacy Compliance",                    desc: "California-licensed podiatrists and podiatric surgeons are validated against CCPA opt-out requirements before every list delivery. Multi-state podiatric practices with California locations are scrubbed under the strictest applicable state statute in their operating footprint." },
      { badge: "CAN-SPAM", title: "Podiatrist Email Records — CAN-SPAM Ready",             desc: "Email addresses for DPMs across solo, group, and hospital-affiliated podiatric practices are validated against CAN-SPAM requirements at delivery. Unsubscribe requests from podiatrists are honored in real time and applied across all subsequent supply, device, and CE campaigns before launch." },
      { badge: "FCRA",     title: "Device and Supply Marketing — Not Licensure Verification", desc: "Podiatry data is supplied for B2B supply, device, and CE marketing outreach — not for professional license verification, insurance panel credentialing, or background eligibility screening for hospital surgical privileges. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Podiatry Practice Phone Numbers DNC-Scrubbed",         desc: "Office phone numbers and DPM mobile contacts for solo and group podiatric practices — including diabetic care centers and wound management clinics — are scrubbed against the National DNC Registry and applicable state registries before delivery to your outbound team." },
    ],
  },

  "physicians-advanced-practice/nurse-practitioners": {
    intro: "Nurse practitioner data spans a diverse credential landscape — from FNPs to ACNPs to DNPs. Lorann's compliance framework is built to handle the full breadth of advanced practice nursing scope while keeping every campaign legally sound.",
    items: [
      { badge: "HIPAA",    title: "NP Contact Data — Professional Records Only",        desc: "Nurse practitioner lists contain APRN credential type, specialization, state licensure, practice setting, and professional contact details. No patient panels, EHR access logs, prescribing histories, or controlled substance authorization records are included in any advanced practice nursing marketing file." },
      { badge: "CCPA",     title: "State Privacy Compliance for APRN Outreach",         desc: "Advanced practice nurses — including FNPs, ACNPs, DNPs, and CRNAs — licensed in California and other privacy-regulated states are validated against applicable opt-out databases before every delivery. Multi-state compact-license NP records are evaluated under the strictest state privacy law applicable to each record." },
      { badge: "CAN-SPAM", title: "Nurse Practitioner Email — CAN-SPAM Validated",       desc: "Email addresses for nurse practitioners across primary care, specialty, and acute care settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from NP contacts are suppressed in real time and excluded from all subsequent CE, device, and pharmaceutical outreach campaigns." },
      { badge: "FCRA",     title: "CE and Pharmaceutical Marketing — Not Credentialing", desc: "Nurse practitioner data is licensed for continuing education, pharmaceutical marketing, and device outreach — not for board certification verification, DEA registration review, or hospital privilege evaluation. FCRA exemption documentation is provided with every APRN data order." },
      { badge: "DNC",      title: "Nurse Practitioner Phone Records DNC-Compliant",     desc: "Office and mobile phone numbers for nurse practitioners across acute, primary care, and telehealth settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Compact-license NP contacts across multiple jurisdictions are held to the strictest applicable state standard." },
    ],
  },

  "physicians-advanced-practice/physician-assistants": {
    intro: "Physician assistant contact data supports a commercially growing segment of the clinical workforce. Lorann's compliance infrastructure keeps your device, supply, and CE outreach to PAs and PA-Cs structured, lawful, and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "PA Contact Data — No Clinical or Prescribing Records", desc: "Physician assistant lists include PA-C credential status, state licensure, specialty setting, NPI number, and professional contact information only. No prescription activity data, supervising physician linkages, DEA authorization records, or clinical note data are included in any PA marketing file." },
      { badge: "CCPA",     title: "California PA Privacy Compliance",                   desc: "California-licensed physician assistants and surgical PAs are validated against CCPA opt-out requirements before every delivery. Multi-state PA practices and hospital-employed PA groups with California locations are scrubbed against the most stringent applicable state privacy statute in their operating jurisdiction." },
      { badge: "CAN-SPAM", title: "Physician Assistant Email — CAN-SPAM Ready",          desc: "Email addresses for PAs and PA-Cs across surgical, primary care, emergency, and specialty settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from physician assistant contacts are honored in real time and applied across all subsequent CE, pharmaceutical, and device campaigns." },
      { badge: "FCRA",     title: "Device and Supply Marketing — Not Employment Screening", desc: "Physician assistant data is licensed for B2B device, supply, and CE marketing outreach — not for employment background screening, hospital credentialing, or PA board compliance monitoring. FCRA exemption documentation is provided with every physician assistant data order." },
      { badge: "DNC",      title: "PA Office and Mobile Phone DNC-Scrubbed",            desc: "Office and mobile phone numbers for physician assistants in surgical, hospital, and outpatient clinic settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your outbound team reaches only legally contactable PA professionals." },
    ],
  },

  "physicians-advanced-practice/medical-assistants": {
    intro: "Medical assistant contact data reaches a large, front-line clinical support workforce. Lorann's compliance framework ensures your staffing, training, and supply outreach to MAs and CMAs is delivered cleanly and in full compliance with applicable registries.",
    items: [
      { badge: "HIPAA",    title: "MA Professional Records — No Patient Interaction Data", desc: "Medical assistant lists include CMA or RMA credential status, certification body, employment setting, and professional contact details. No patient rooming records, clinical documentation access logs, or care coordination data of any kind are included in any medical assistant marketing file." },
      { badge: "CCPA",     title: "California Medical Assistant Privacy Compliance",      desc: "California-based medical assistants — including CMAs, RMAs, and EMTs working in clinical settings — are validated against CCPA opt-out requirements before every list delivery. Multi-location clinic and hospital systems with California sites are scrubbed against applicable state privacy statutes before any MA record is released." },
      { badge: "CAN-SPAM", title: "Medical Assistant Email — CAN-SPAM Validated",        desc: "Email addresses for certified and registered medical assistants across outpatient, specialty, and urgent care settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from MA contacts are honored in real time and excluded from all future training, staffing, and supply outreach campaigns." },
      { badge: "FCRA",     title: "Training and Staffing Marketing — Not Employment Verification", desc: "Medical assistant data is licensed for CE, staffing agency marketing, and supply outreach — not for formal employment eligibility verification or background screening. FCRA exemption documentation is available for any staffing firm or CE provider that requires it." },
      { badge: "DNC",      title: "Medical Assistant Phone Records DNC-Registry Compliant", desc: "Phone numbers for medical assistants across physician offices, urgent care centers, and multi-specialty clinics are scrubbed against the National DNC Registry before delivery. Your outbound staffing and training teams reach only legally contactable MA professionals." },
    ],
  },

  "nursing-professionals/registered-nurses": {
    intro: "Registered nurse contact data covers the largest licensed clinical workforce in the United States. Lorann's compliance framework ensures every staffing, CE, and supply campaign targeting RNs is delivered cleanly, lawfully, and in compliance with all applicable registries.",
    items: [
      { badge: "HIPAA",    title: "RN Professional Contact Data — No Patient Assignment Records", desc: "Registered nurse lists include license type, specialty certification, care setting, and professional contact details — no patient census assignments, shift records, or care documentation of any kind. Your staffing, CE, and equipment outreach to RNs stays firmly outside HIPAA's clinical data scope." },
      { badge: "CCPA",     title: "California RN Privacy Compliance",                   desc: "California-licensed registered nurses — including BSN, ADN, and specialty-certified RNs — are validated against CCPA opt-out databases before every delivery. Travel nurses with active California compact assignments are evaluated against the state's privacy standards before any record is included in a finalized list." },
      { badge: "CAN-SPAM", title: "Registered Nurse Email — CAN-SPAM Validated at Delivery", desc: "Direct email addresses for RNs across acute, ambulatory, long-term care, and home health settings are validated against federal CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from RN contacts are suppressed in real time and excluded from all subsequent staffing and CE campaigns." },
      { badge: "FCRA",     title: "Staffing and CE Marketing — Not Employment Eligibility Screening", desc: "Registered nurse data is supplied for staffing agency marketing, continuing education outreach, and supply campaigns — not for formal employment eligibility determinations or nursing board licensure verification. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "RN Phone Records DNC-Registry Compliant",           desc: "Mobile and home phone numbers for registered nurses — including travel nurse contacts and per-diem staff — are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your outbound staffing teams connect only with nurses who are contactable under current law." },
    ],
  },

  "nursing-professionals/licensed-practical-nurses": {
    intro: "Licensed practical and vocational nurse contact data reaches a vital segment of the long-term care and clinical support workforce. Lorann's compliance stack ensures every LPN and LVN campaign is registry-verified and legally sound before it reaches your outbound team.",
    items: [
      { badge: "HIPAA",    title: "LPN/LVN Professional Records — No Clinical Documentation Data", desc: "Licensed practical and vocational nurse lists include state license status, care setting type, employer facility classification, and professional contact information. No patient medication administration records, care plan data, or long-term care charting is included in any LPN or LVN marketing file." },
      { badge: "CCPA",     title: "California LPN/LVN Privacy Compliance",              desc: "California-licensed vocational nurses (LVNs) are validated against CCPA opt-out requirements before every list delivery. LVNs working in SNF, home health, and assisted living settings in California are scrubbed against the state's privacy statutes before any record is included in a finalized outreach file." },
      { badge: "CAN-SPAM", title: "LPN/LVN Email Records — CAN-SPAM Validated",          desc: "Email addresses for licensed practical and vocational nurses across nursing facilities, home health agencies, and outpatient clinics are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from LPN and LVN contacts are honored in real time and applied to all subsequent staffing and CE campaigns." },
      { badge: "FCRA",     title: "Staffing and CE Marketing — Not Background Screening", desc: "LPN and LVN data is supplied for staffing agency outreach, continuing education marketing, and supply campaigns — not for employment background screening or licensure verification. FCRA exemption documentation is available upon request for any staffing agency or training provider." },
      { badge: "DNC",      title: "LPN/LVN Phone Records DNC-Compliant",                desc: "Phone numbers for licensed practical and vocational nurses across SNF, home health, and outpatient settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound team receives only contactable LPN and LVN professionals under current federal and state law." },
    ],
  },

  "nursing-professionals/certified-nursing-assistants": {
    intro: "Certified nursing assistant contact data serves a large and essential care delivery workforce. Lorann's compliance framework keeps your CNA staffing, training, and supply campaigns cleanly structured, legally compliant, and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "CNA Professional Contact Data — No Resident Care Records", desc: "Certified nursing assistant lists include certification status, state registry standing, care setting, and professional contact information. No resident care logs, ADL assistance records, nursing facility charting, or patient interaction documentation is included in any CNA marketing file." },
      { badge: "CCPA",     title: "California CNA Privacy Compliance",                  desc: "California-certified nursing assistants listed on the California Nurse Aide Registry are validated against CCPA opt-out requirements before every delivery. CNAs working across multiple SNF and assisted living locations in California are scrubbed against applicable state privacy standards before any record is released." },
      { badge: "CAN-SPAM", title: "CNA Email Outreach — CAN-SPAM Ready",                  desc: "Email addresses for certified nursing assistants across skilled nursing facilities, memory care centers, and home health agencies are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from CNA contacts are suppressed in real time and excluded from all future training and staffing campaigns." },
      { badge: "FCRA",     title: "Training and Workforce Marketing — Not Registry Verification", desc: "CNA contact data is licensed for workforce training, staffing agency marketing, and supply outreach — not for state aide registry verification, background checks, or employment eligibility determinations. FCRA exemption documentation is available upon request for any training provider or placement firm." },
      { badge: "DNC",      title: "CNA Phone Records DNC-Registry Scrubbed",           desc: "Phone numbers for certified nursing assistants across skilled nursing, assisted living, and home care settings are scrubbed against the National Do Not Call Registry before delivery. Your staffing and training outreach teams reach only legally contactable CNA professionals." },
    ],
  },

  "nursing-professionals/certified-nurse-midwives": {
    intro: "Certified nurse midwife contact data serves a specialized and clinically autonomous segment of advanced practice nursing. Lorann's compliance framework is built for the nuanced regulatory requirements that apply to CNM and APRN outreach across the United States.",
    items: [
      { badge: "HIPAA",    title: "CNM Professional Records — No Birth or Patient Records", desc: "Certified nurse midwife lists include APRN credential status, CNM certification body, practice setting type, and professional contact details. No birth records, maternal care data, labor management documentation, or patient health outcome data is included in any CNM marketing file." },
      { badge: "CCPA",     title: "California CNM Privacy Compliance",                  desc: "California-licensed CNMs and nurse-midwifery practices are validated against CCPA opt-out databases before every list delivery. Telehealth-active CNMs with California patient populations are evaluated under the state's privacy regulations before any contact record is released for outreach." },
      { badge: "CAN-SPAM", title: "Certified Nurse Midwife Email — CAN-SPAM Validated",   desc: "Email addresses for CNMs across birth centers, hospital labor and delivery units, and independent midwifery practices are validated against CAN-SPAM requirements before delivery. Opt-out requests from CNM contacts are honored in real time and suppressed from all future pharmaceutical and CE campaigns." },
      { badge: "FCRA",     title: "Clinical Marketing Only — Not Credentialing or Privilege Review", desc: "CNM contact data is licensed for B2B pharmaceutical, CE, and supply marketing outreach — not for hospital birth center privilege verification, CNM board credentialing review, or employment background screening. FCRA exemption is documented and available upon request." },
      { badge: "DNC",      title: "Nurse Midwife Phone Records DNC-Compliant",          desc: "Office and mobile phone numbers for certified nurse midwives across hospital, birth center, and home birth practice settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound team reaches only legally contactable CNM professionals." },
    ],
  },

  "hospital-decision-makers/hospital-administrators": {
    intro: "Hospital administrator contact data targets the operational backbone of healthcare facility management. Lorann's compliance stack ensures your vendor, technology, and capital equipment outreach to non-clinical hospital leadership is structured, lawful, and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "Administrator Contact Data — No Facility Patient Data", desc: "Hospital administrator lists contain job title, department function, facility affiliation, and professional contact information only. No patient census data, facility-level utilization metrics, or operational data derived from PHI workflows is captured, stored, or transferred in any hospital administrator marketing file." },
      { badge: "CCPA",     title: "California Hospital Administrator Privacy Compliance", desc: "Hospital and health system administrators in California are validated against CCPA opt-out databases before every delivery. Multi-hospital IDN administrators with facilities in California and other privacy-regulated states are scrubbed under the most stringent applicable state statute in the IDN's operating footprint." },
      { badge: "CAN-SPAM", title: "Hospital Administrator Email — CAN-SPAM Validated",    desc: "Direct professional email addresses for hospital administrators across facility operations, supply chain, revenue cycle, and HR departments are validated against CAN-SPAM requirements before delivery. Opt-out requests from administrator contacts are suppressed in real time and excluded from all future vendor and technology outreach campaigns." },
      { badge: "FCRA",     title: "Vendor Outreach Only — Not Background or Employment Screening", desc: "Hospital administrator data is licensed for B2B vendor, technology, and advisory marketing outreach — not for pre-employment background investigation or executive reference verification. FCRA exemption documentation is available for compliance review upon request." },
      { badge: "DNC",      title: "Hospital Administrator Phone Records DNC-Scrubbed",   desc: "Direct office lines and administrator mobile contacts across acute care hospitals, critical access facilities, and specialty hospitals are scrubbed against the National DNC Registry before delivery. State-level DNC overlays are applied for health systems in high-regulation jurisdictions before your outbound team dials." },
    ],
  },

  "hospital-decision-makers/ceo-cfo-healthcare": {
    intro: "Healthcare CEO and CFO contact data reaches the highest decision-making tier of health system leadership. Lorann's compliance framework ensures your capital, advisory, and technology outreach to health system executives is verified, lawful, and registry-compliant at delivery.",
    items: [
      { badge: "HIPAA",    title: "C-Suite Contact Data — No Facility or Financial PHI", desc: "Healthcare CEO and CFO lists include executive title, organizational affiliation, and direct professional contact details only. No facility-level patient financial data, operating margin data derived from PHI billing records, or clinically sensitive organizational metrics are captured or included in any executive marketing file." },
      { badge: "CCPA",     title: "California Health System Executive Privacy Compliance", desc: "CEOs and CFOs at California-domiciled health systems and hospitals are validated against CCPA opt-out requirements before every delivery. Executives at IDNs with mixed-state operations are evaluated under California's standards when any system facility or headquarters is located in the state." },
      { badge: "CAN-SPAM", title: "Health System CEO/CFO Email — CAN-SPAM Validated",    desc: "Direct executive email addresses for healthcare CEOs and CFOs across independent hospitals, IDNs, and health systems are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from executive contacts are honored in real time and removed from all subsequent capital, advisory, and technology outreach campaigns." },
      { badge: "FCRA",     title: "Advisory and Capital Marketing — Not Executive Screening", desc: "Health system CEO and CFO data is licensed for B2B advisory, capital equipment, and financial technology marketing — not for executive background investigation, board director due diligence, or fiduciary suitability screening. FCRA exemption documentation is provided with every executive data order." },
      { badge: "DNC",      title: "Health System Executive Phone Records DNC-Registry Compliant", desc: "Direct office lines and executive mobile contacts for healthcare CEOs and CFOs are scrubbed against the National Do Not Call Registry before delivery. State-level DNC lists for executives at health systems in high-regulation states are applied before your advisory and technology team places a single outbound call." },
    ],
  },

  "hospital-decision-makers/chief-medical-officers": {
    intro: "Chief medical officer contact data reaches physician-executives responsible for clinical strategy and quality across entire health systems. Lorann's compliance framework ensures your consulting, technology, and advisory outreach to CMOs is structured for B2B use — not clinical engagement.",
    items: [
      { badge: "HIPAA",    title: "CMO Contact Data — No Clinical Governance or Quality Data", desc: "Chief medical officer lists contain executive title, health system affiliation, geographic market, and direct professional contact information only. No peer review records, quality improvement metrics, credentialing committee data, or patient safety event documentation is included in any CMO marketing file." },
      { badge: "CCPA",     title: "California CMO Privacy Compliance",                  desc: "Chief medical officers at California-based hospitals and health systems are validated against CCPA opt-out requirements before every delivery. CMOs at multi-state health systems with California operations are scrubbed under the state's privacy statute regardless of the executive's primary office location." },
      { badge: "CAN-SPAM", title: "Chief Medical Officer Email — CAN-SPAM Validated",    desc: "Direct email addresses for CMOs across independent hospitals, academic medical centers, and integrated health systems are validated against CAN-SPAM requirements before delivery. Opt-out requests from CMO contacts are suppressed in real time and excluded from all subsequent technology, consulting, and advisory outreach campaigns." },
      { badge: "FCRA",     title: "Clinical Advisory Marketing — Not Physician Credentialing Review", desc: "CMO contact data is licensed for B2B consulting, technology, and advisory marketing — not for physician peer review, board certification verification, or executive medical staff credentialing. FCRA exemption documentation is available for compliance review upon request." },
      { badge: "DNC",      title: "CMO Direct Phone Records DNC-Scrubbed",              desc: "Office lines and mobile contacts for chief medical officers at hospitals, IDNs, and health systems are scrubbed against the National Do Not Call Registry before delivery. State-level DNC overlays are applied for CMOs at health systems operating in high-regulation jurisdictions." },
    ],
  },

  "hospital-decision-makers/chief-nursing-officers": {
    intro: "Chief nursing officer contact data reaches the executive responsible for nursing workforce strategy, care standards, and clinical operations across hospital systems. Lorann's compliance framework ensures every CNO outreach campaign is lawful, registry-verified, and positioned for B2B engagement.",
    items: [
      { badge: "HIPAA",    title: "CNO Contact Data — No Workforce or Patient Quality Data", desc: "Chief nursing officer lists include executive title, hospital or health system affiliation, and direct professional contact details only. No nurse staffing ratios, incident report summaries, patient satisfaction scores derived from clinical operations, or unit-level quality data is included in any CNO marketing file." },
      { badge: "CCPA",     title: "California CNO Privacy Compliance",                  desc: "Chief nursing officers at California hospitals and health systems are validated against CCPA opt-out databases before every delivery. CNOs at multi-state IDNs with California facilities are scrubbed under California's privacy standards when any part of the system operates in the state." },
      { badge: "CAN-SPAM", title: "Chief Nursing Officer Email — CAN-SPAM Validated",    desc: "Email addresses for CNOs across acute care hospitals, long-term acute care, and community health systems are validated against CAN-SPAM requirements before delivery. Opt-out requests from CNO contacts are honored in real time and removed from all future nursing technology, CE, and workforce outreach campaigns." },
      { badge: "FCRA",     title: "Workforce and Technology Marketing — Not Nursing Oversight Review", desc: "CNO contact data is licensed for B2B nursing technology, workforce solutions, and CE provider outreach — not for nursing board compliance review, staff incident investigations, or employment eligibility determinations. FCRA exemption documentation is provided upon request." },
      { badge: "DNC",      title: "CNO Phone Records DNC-Registry Compliant",           desc: "Office and mobile contacts for chief nursing officers across hospital and IDN settings are scrubbed against the National Do Not Call Registry before delivery. State-level DNC lists are applied for CNOs at health systems in high-regulation states before your outbound team initiates contact." },
    ],
  },

  "hospital-decision-makers/chief-of-staff": {
    intro: "Chief of staff contact data targets physician leaders responsible for medical staff governance and clinical policy across hospital facilities. Lorann's compliance framework keeps your technology, advisory, and vendor outreach to medical staff chiefs structurally sound and lawfully delivered.",
    items: [
      { badge: "HIPAA",    title: "Chief of Staff Contact Data — No Medical Staff or Peer Review Data", desc: "Chief of staff lists contain executive title, hospital affiliation, and direct professional contact information only. No peer review records, medical staff committee proceedings, physician performance data, or credentialing file contents are included in any chief of staff marketing file." },
      { badge: "CCPA",     title: "California Chief of Staff Privacy Compliance",       desc: "Physician leaders serving as hospital chief of staff in California are validated against CCPA opt-out requirements before delivery. Chiefs of staff at multi-hospital systems with California facilities are evaluated under the state's privacy statute regardless of where the individual's administrative office is located." },
      { badge: "CAN-SPAM", title: "Chief of Staff Email — CAN-SPAM Validated",           desc: "Direct professional email addresses for hospital chiefs of staff across community, acute care, and academic medical centers are validated against CAN-SPAM requirements before delivery. Opt-out requests from chief of staff contacts are suppressed in real time and excluded from all subsequent advisory, technology, and vendor outreach campaigns." },
      { badge: "FCRA",     title: "Advisory Outreach Only — Not Medical Staff Governance Review", desc: "Chief of staff contact data is licensed for B2B advisory, technology, and vendor marketing — not for medical staff governance audits, peer review file review, or physician performance assessments. FCRA exemption documentation is available upon request for any vendor or advisory firm." },
      { badge: "DNC",      title: "Chief of Staff Phone Records DNC-Scrubbed",          desc: "Office lines and mobile contacts for hospital chiefs of staff across acute and community settings are scrubbed against the National DNC Registry before delivery. State-level DNC overlays are applied for chiefs of staff at facilities in high-regulation jurisdictions before outbound contact is attempted." },
    ],
  },

  "hospital-decision-makers/medical-directors": {
    intro: "Medical director contact data spans a wide range of clinical leadership roles — from department directors to hospice and managed care medical directors. Lorann's compliance framework ensures every medical director campaign is structured for lawful B2B outreach and registry-verified delivery.",
    items: [
      { badge: "HIPAA",    title: "Medical Director Contact Data — No Department Clinical Records", desc: "Medical director lists include clinical leadership role, department specialty, facility affiliation, and direct professional contact details. No department-level patient outcome data, quality metrics derived from clinical records, or utilization management decisions involving PHI are included in any medical director marketing file." },
      { badge: "CCPA",     title: "California Medical Director Privacy Compliance",     desc: "Medical directors at California-licensed hospitals, managed care organizations, and specialty clinics are validated against CCPA opt-out databases before every delivery. Medical directors in multi-state health plan or IDN structures are scrubbed under the most stringent applicable state privacy statute." },
      { badge: "CAN-SPAM", title: "Medical Director Email — CAN-SPAM Ready",              desc: "Email addresses for medical directors across acute care, behavioral health, hospice, managed care, and ambulatory settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from medical director contacts are honored in real time and removed from all subsequent technology and advisory campaigns." },
      { badge: "FCRA",     title: "Clinical Advisory Marketing — Not Physician Employment Screening", desc: "Medical director contact data is licensed for B2B technology, consulting, and vendor outreach — not for physician employment background review, managed care credentialing decisions, or clinical quality investigation. FCRA exemption documentation is provided with every medical director data order." },
      { badge: "DNC",      title: "Medical Director Phone Records DNC-Compliant",       desc: "Direct office and mobile contacts for medical directors across hospital, managed care, hospice, and ambulatory settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound advisory and technology teams reach only contactable medical director professionals." },
    ],
  },

  "health-therapy/physical-therapists": {
    intro: "Physical therapist contact data serves a diverse clinical workforce across acute, outpatient, and home health settings. Lorann's compliance stack ensures your CE, equipment, and staffing outreach to PTs and DPTs is delivered cleanly and in full regulatory compliance.",
    items: [
      { badge: "HIPAA",    title: "PT Professional Contact Data — No Patient Care or Outcome Records", desc: "Physical therapist lists contain state license status, APTA specialty certification, practice setting, and professional contact details only. No patient functional assessment records, therapy progress notes, or rehab outcome data are included in any PT marketing file." },
      { badge: "CCPA",     title: "California PT Privacy Compliance",                   desc: "California-licensed physical therapists — including those in outpatient orthopedic, pediatric, and SNF settings — are validated against CCPA opt-out requirements before every delivery. Travel PTs with California compact assignments are also evaluated against state privacy standards before any contact record is finalized." },
      { badge: "CAN-SPAM", title: "Physical Therapist Email — CAN-SPAM Validated",       desc: "Email addresses for PTs and DPTs across acute care hospitals, outpatient clinics, school systems, and home health agencies are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from physical therapist contacts are honored in real time and excluded from all subsequent CE, staffing, and equipment campaigns." },
      { badge: "FCRA",     title: "CE and Staffing Marketing — Not Licensure Verification", desc: "Physical therapist data is supplied for continuing education, staffing agency marketing, and equipment outreach — not for state PT board license verification, hospital credentialing, or employment eligibility determinations. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "PT Phone Records DNC-Registry Scrubbed",             desc: "Office and mobile phone numbers for physical therapists across outpatient, hospital, and SNF settings are scrubbed against the National Do Not Call Registry before delivery. Your staffing and CE outreach teams reach only legally contactable PT professionals." },
    ],
  },

  "health-therapy/occupational-therapists": {
    intro: "Occupational therapist contact data reaches OTs and COTAs across pediatric, acute, and community-based settings. Lorann's compliance framework ensures every CE, supply, and staffing outreach campaign targeting occupational therapy professionals is lawful and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "OT Professional Records — No Patient Activity or ADL Data", desc: "Occupational therapist lists include state license type, NBCOT certification status, practice setting, and direct professional contact information. No patient activity limitation records, ADL assessment data, cognitive or sensory therapy notes, or home modification documentation are included in any OT or COTA marketing file." },
      { badge: "CCPA",     title: "California OT Privacy Compliance",                   desc: "California-licensed occupational therapists and COTAs are validated against CCPA opt-out databases before every delivery. School-based OTs and home health occupational therapists with California clients are evaluated against the state's privacy statutes before any record is included in a finalized outreach file." },
      { badge: "CAN-SPAM", title: "Occupational Therapist Email — CAN-SPAM Ready",       desc: "Email addresses for OTs across pediatric, acute care, hand therapy, and community mental health settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from OT contacts are suppressed in real time and excluded from all future CE, supply, and staffing campaigns." },
      { badge: "FCRA",     title: "CE and Supply Marketing — Not License or Credentialing Review", desc: "Occupational therapist data is licensed for CE provider marketing, adaptive equipment outreach, and staffing campaigns — not for NBCOT certification verification, state licensure investigation, or employment background screening. FCRA exemption is documented and available upon request." },
      { badge: "DNC",      title: "OT Phone Records DNC-Compliant",                     desc: "Office and mobile contacts for occupational therapists across hospital, outpatient, school, and home health settings are scrubbed against the National DNC Registry and applicable state DNC lists. Your CE and staffing outbound teams reach only legally contactable OT professionals before each campaign is deployed." },
    ],
  },

  "health-therapy/speech-language-therapists": {
    intro: "Speech-language pathologist contact data covers SLPs and CFY clinicians across schools, hospitals, and private practice settings. Lorann's compliance framework ensures your CE, product, and staffing outreach to speech-language professionals is lawfully structured and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "SLP Professional Contact Data — No Patient or Communication Records", desc: "Speech-language pathologist lists include ASHA certification status, clinical fellowship year flag, employment setting, and direct professional contact details. No patient dysphagia evaluations, augmentative communication device records, swallowing study reports, or therapy progress notes are present in any SLP marketing file." },
      { badge: "CCPA",     title: "California SLP Privacy Compliance",                  desc: "California-licensed SLPs — across public schools, hospitals, SNFs, and private practice — are validated against CCPA opt-out databases before every delivery. School-based SLPs working in California districts and telehealth SLPs serving California patients are evaluated against the state's privacy requirements before list finalization." },
      { badge: "CAN-SPAM", title: "Speech-Language Pathologist Email — CAN-SPAM Validated", desc: "Email addresses for SLPs and CFY clinicians across pediatric, adult neurological, and school-based settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from SLP contacts are honored in real time and applied across all subsequent CE, device, and staffing campaigns." },
      { badge: "FCRA",     title: "CE and Device Marketing — Not Licensure or ASHA Review", desc: "SLP contact data is supplied for continuing education, communication device, and staffing marketing outreach — not for ASHA certification verification, state licensure review, or professional fitness determinations. FCRA exemption documentation is available upon request for any CE or device provider." },
      { badge: "DNC",      title: "SLP Phone Records DNC-Registry Scrubbed",            desc: "Office and mobile phone numbers for speech-language pathologists across hospital, school, SNF, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and staffing teams connect only with legally contactable SLP professionals." },
    ],
  },

  "health-therapy/respiratory-therapists": {
    intro: "Respiratory therapist contact data reaches CRTs and RRTs in critical care, pulmonary, and home health settings. Lorann's compliance stack ensures your device, CE, and staffing outreach to respiratory therapy professionals is delivered lawfully and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "RT Professional Records — No Patient Ventilator or ABG Data", desc: "Respiratory therapist lists include CRT or RRT credential level, NBRC certification status, care setting, and professional contact information. No ventilator management records, arterial blood gas data, pulmonary function test results, or patient-specific respiratory therapy orders are included in any RT marketing file." },
      { badge: "CCPA",     title: "California RT Privacy Compliance",                   desc: "California-licensed respiratory therapists across acute care hospitals, home health agencies, and pulmonary rehab centers are validated against CCPA opt-out requirements before every delivery. Travel RTs on California contract assignments are also evaluated against the state's privacy standards before any contact record is released." },
      { badge: "CAN-SPAM", title: "Respiratory Therapist Email — CAN-SPAM Ready",        desc: "Email addresses for CRTs and RRTs across ICU, NICU, emergency, and home health settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from respiratory therapist contacts are suppressed in real time and removed from all subsequent CE, device, and staffing campaigns." },
      { badge: "FCRA",     title: "Device and CE Marketing — Not Credentialing or Screening", desc: "Respiratory therapist data is licensed for ventilator device outreach, CE marketing, and staffing campaigns — not for NBRC certification verification, state RT board compliance review, or employment background screening. FCRA exemption documentation is available with every respiratory therapist data order." },
      { badge: "DNC",      title: "Respiratory Therapist Phone Records DNC-Scrubbed",   desc: "Office and mobile phone numbers for respiratory therapists across acute care, LTACH, and home health settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound teams connect only with legally contactable RT professionals under current federal and state law." },
    ],
  },

  "health-therapy/massage-therapists": {
    intro: "Licensed massage therapist contact data spans solo practice, spa, chiropractic, and clinical settings. Lorann's compliance framework ensures your CE, supply, and product outreach to LMTs and CMTs is structured for lawful delivery and fully registry-verified.",
    items: [
      { badge: "HIPAA",    title: "LMT Professional Contact Data — No Client Session Records", desc: "Massage therapist lists include state license status, credential type, and practice setting — no client intake records, SOAP notes, treatment session histories, or clinical documentation of any kind. Your supply, CE, and product marketing to LMTs stays entirely outside any HIPAA-adjacent data category." },
      { badge: "CCPA",     title: "California LMT Privacy Compliance",                  desc: "California-certified massage therapists (CMTs) are validated against CCPA opt-out requirements before every delivery. Spa-based and clinical LMTs with California client practices are scrubbed against the state's privacy statutes before any record is included in a finalized outreach list." },
      { badge: "CAN-SPAM", title: "Massage Therapist Email — CAN-SPAM Validated",        desc: "Email addresses for LMTs and CMTs across solo practice, chiropractic integration, and spa and wellness settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from massage therapist contacts are honored in real time and applied across all subsequent CE, product, and supply campaigns." },
      { badge: "FCRA",     title: "CE and Product Marketing — Not State Board Review",  desc: "Massage therapist data is licensed for CE provider outreach, massage supply, and product marketing — not for NCBTMB certification verification, state massage board complaint review, or background eligibility screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "LMT Phone Records DNC-Registry Compliant",           desc: "Office and mobile phone numbers for licensed massage therapists across solo, spa, and clinical settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your CE and supply outreach teams reach only legally contactable LMT professionals." },
    ],
  },

  "health-therapy/emts-paramedics": {
    intro: "EMT and paramedic contact data serves a geographically dispersed and operationally demanding emergency response workforce. Lorann's compliance framework ensures your training, equipment, and staffing outreach to EMS professionals is delivered cleanly and in full compliance with applicable registries.",
    items: [
      { badge: "HIPAA",    title: "EMS Professional Contact Data — No Patient Call or Run Records", desc: "EMT and paramedic lists include certification level, state registry standing, employer agency type, and professional contact details. No patient run reports, PCR data, EMS call records, or emergency dispatch interaction data is included in any EMS marketing file." },
      { badge: "CCPA",     title: "California EMT/Paramedic Privacy Compliance",        desc: "California-certified EMTs and paramedics — including those credentialed through EMSA — are validated against CCPA opt-out databases before every delivery. Career EMS professionals working for both public and private agencies in California are evaluated against state privacy requirements before list finalization." },
      { badge: "CAN-SPAM", title: "EMT and Paramedic Email — CAN-SPAM Validated",        desc: "Email addresses for EMTs and paramedics across municipal, fire department-based, private, and hospital-based EMS systems are validated against CAN-SPAM requirements before list delivery. Opt-out requests from EMS professional contacts are honored in real time and excluded from all subsequent training, equipment, and staffing outreach." },
      { badge: "FCRA",     title: "EMS Training and Equipment Marketing — Not Background Screening", desc: "EMT and paramedic data is licensed for training, simulation equipment, and staffing agency marketing outreach — not for employment background screening, criminal history review, or EMS certification fitness evaluations. FCRA exemption documentation is available upon request for any training or staffing provider." },
      { badge: "DNC",      title: "EMS Professional Phone Records DNC-Scrubbed",        desc: "Mobile and home phone contacts for EMTs and paramedics across career, part-time, and volunteer EMS assignments are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your training and staffing outreach teams reach only legally contactable EMS professionals." },
    ],
  },

  "health-therapy/radiologic-technicians": {
    intro: "Radiologic technologist contact data reaches RT(R)s and specialized imaging professionals across hospital and outpatient radiology settings. Lorann's compliance framework ensures your CE, device, and staffing outreach to imaging professionals is registry-verified and lawfully delivered.",
    items: [
      { badge: "HIPAA",    title: "Radiologic Technologist Contact Data — No Imaging or Patient Records", desc: "Radiologic technologist lists include ARRT certification modality, state license status, practice setting, and direct professional contact information. No patient imaging orders, radiology report data, contrast administration records, or radiation dose logs are included in any RT marketing file." },
      { badge: "CCPA",     title: "California Radiologic Technologist Privacy Compliance", desc: "California-licensed radiologic technologists — including CRTs, MRT(R)s, and nuclear medicine technologists — are validated against CCPA opt-out databases before every delivery. Imaging professionals at multi-site radiology groups with California locations are evaluated under the state's privacy requirements before list release." },
      { badge: "CAN-SPAM", title: "Radiologic Technologist Email — CAN-SPAM Ready",       desc: "Email addresses for RT(R)s across diagnostic radiology, CT, MRI, mammography, and interventional settings are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from imaging professional contacts are suppressed in real time and excluded from all future CE, device, and staffing outreach." },
      { badge: "FCRA",     title: "Imaging CE and Device Marketing — Not ARRT Verification", desc: "Radiologic technologist data is supplied for CE provider marketing, imaging equipment sales, and staffing outreach — not for ARRT certification verification, state radiologic board investigations, or employment background screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Radiologic Technologist Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for radiologic technologists across hospital radiology, urgent care imaging, and outpatient imaging centers are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound teams connect only with legally contactable imaging professionals." },
    ],
  },

  "health-therapy/dieticians-nutritionists": {
    intro: "Registered dietitian and nutritionist contact data spans clinical, community, and corporate wellness settings. Lorann's compliance framework ensures your CE, product, and technology outreach to RDs and LDNs is delivered lawfully and in compliance with applicable privacy statutes and registry requirements.",
    items: [
      { badge: "HIPAA",    title: "RD/LDN Professional Records — No Patient Nutrition or Dietary Data", desc: "Registered dietitian and nutritionist lists include CDR credentialing status, state licensure, employment setting, and professional contact information. No patient medical nutrition therapy records, dietary intake assessments, enteral or parenteral nutrition order data, or clinical outcome documentation is included in any RD marketing file." },
      { badge: "CCPA",     title: "California RD/Nutritionist Privacy Compliance",      desc: "California-licensed registered dietitians and nutritionists across hospital, outpatient, and public health settings are validated against CCPA opt-out requirements before every delivery. Telehealth dietitians with California clients are also evaluated against state privacy standards before any record is finalized for outreach." },
      { badge: "CAN-SPAM", title: "Dietitian and Nutritionist Email — CAN-SPAM Validated", desc: "Email addresses for RDs and LDNs across clinical, school, corporate wellness, and food service settings are validated against CAN-SPAM requirements before list delivery. Opt-out requests from dietitian contacts are honored in real time and removed from all subsequent CE, product, and technology outreach campaigns." },
      { badge: "FCRA",     title: "CE and Product Marketing — Not Licensure or Background Review", desc: "Registered dietitian and nutritionist data is licensed for CE outreach, nutrition product marketing, and technology sales — not for CDR credential verification, state dietetics board compliance review, or employment eligibility screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Dietitian Phone Records DNC-Registry Scrubbed",      desc: "Office and mobile phone numbers for registered dietitians and nutritionists across hospitals, outpatient clinics, and community nutrition programs are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and product outreach teams connect only with legally contactable RD professionals." },
    ],
  },

  "behavioral-mental-health/psychologists": {
    intro: "Licensed psychologist contact data requires sensitivity to the specialized regulatory environment surrounding psychological practice. Lorann's compliance framework is built to support lawful B2B outreach to doctoral-level psychologists without touching any clinically sensitive information.",
    items: [
      { badge: "HIPAA",    title: "Psychologist Professional Contact Data — No Patient or Assessment Records", desc: "Licensed psychologist lists contain doctoral credential type, state license number, practice setting, and direct professional contact information. No patient psychological evaluation records, assessment instrument scores, DSM diagnoses, therapy session notes, or forensic report data are included in any psychologist marketing file." },
      { badge: "CCPA",     title: "California Psychologist Privacy Compliance",         desc: "California-licensed psychologists — including those in independent practice, hospital employment, and forensic settings — are validated against CCPA opt-out databases before every delivery. Telehealth-active psychologists serving California clients are evaluated against the state's privacy requirements before any record is included in a finalized outreach file." },
      { badge: "CAN-SPAM", title: "Licensed Psychologist Email — CAN-SPAM Validated",    desc: "Email addresses for PhD and PsyD psychologists across clinical, neuropsychological, school, and forensic settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from psychologist contacts are suppressed in real time and removed from all subsequent CE, assessment, and technology outreach campaigns." },
      { badge: "FCRA",     title: "CE and Technology Marketing — Not Fitness or Credentialing Review", desc: "Psychologist data is licensed for B2B CE, assessment technology, and software marketing outreach — not for fitness-for-duty evaluations, licensing board investigations, or professional credentialing determinations. FCRA exemption documentation is available with every psychologist data order." },
      { badge: "DNC",      title: "Psychologist Phone Records DNC-Compliant",           desc: "Office and mobile contacts for licensed psychologists across private practice, hospital, and academic settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and technology teams reach only legally contactable psychologist professionals." },
    ],
  },

  "behavioral-mental-health/psychiatrists": {
    intro: "Psychiatrist contact data reaches board-certified physician specialists at the intersection of medicine and mental health. Lorann's compliance framework ensures every pharmaceutical, technology, and CE outreach campaign targeting psychiatrists is lawfully structured, registry-verified, and PHI-free.",
    items: [
      { badge: "HIPAA",    title: "Psychiatrist Contact Data — No Clinical or Medication Records", desc: "Psychiatrist marketing lists contain board certification specialty, NPI number, practice affiliation, and direct professional contact details only. No patient psychiatric diagnoses, medication management records, psychotherapy session data, involuntary commitment records, or clinical outcome data are captured or transferred in any psychiatrist marketing file." },
      { badge: "CCPA",     title: "California Psychiatrist Privacy Compliance",         desc: "California-licensed psychiatrists — including those in academic, community mental health, and correctional settings — are validated against CCPA opt-out requirements before every delivery. Telepsychiatry providers serving California patients are evaluated under state privacy standards before any contact record is finalized for outreach." },
      { badge: "CAN-SPAM", title: "Psychiatrist Email — CAN-SPAM Validated",              desc: "Direct email addresses for board-certified psychiatrists across inpatient, outpatient, child and adolescent, geriatric, and forensic settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from psychiatrist contacts are honored in real time and removed from all subsequent pharmaceutical and CE outreach campaigns." },
      { badge: "FCRA",     title: "Pharmaceutical Marketing Only — Not Credentialing or Review", desc: "Psychiatrist contact data is licensed for pharmaceutical marketing, CME, and technology outreach — not for DEA schedule review, hospital privilege investigations, or physician employment background screening. FCRA exemption documentation is provided with every psychiatrist data order." },
      { badge: "DNC",      title: "Psychiatrist Phone Records DNC-Scrubbed",            desc: "Office and direct phone contacts for psychiatrists across private practice, hospital, community mental health, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound pharmaceutical and CE teams connect only with legally contactable psychiatrist professionals." },
    ],
  },

  "behavioral-mental-health/mental-health-counselors": {
    intro: "Licensed mental health counselor contact data spans a broad range of outpatient, community, and telehealth settings. Lorann's compliance framework keeps your CE, software, and platform outreach to LMHCs, LPCs, and LADCs lawfully structured and registry-verified at delivery.",
    items: [
      { badge: "HIPAA",    title: "LMHC/LPC Contact Data — No Client or Session Records", desc: "Licensed mental health counselor lists include credential level, state license number, practice setting, and professional contact details. No client session records, treatment plan data, DSM diagnoses, crisis intervention records, or mental health court involvement data are included in any LMHC or LPC marketing file." },
      { badge: "CCPA",     title: "California LMHC/LPC Privacy Compliance",             desc: "California-licensed professional counselors and mental health practitioners are validated against CCPA opt-out databases before every delivery. Telehealth counselors serving California clients through multi-state platforms are evaluated under California's privacy requirements before any contact record is finalized for outreach." },
      { badge: "CAN-SPAM", title: "Mental Health Counselor Email — CAN-SPAM Ready",       desc: "Email addresses for LMHCs, LPCs, LCADCs, and LADCs across outpatient, community mental health, school-based, and telehealth settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from counselor contacts are suppressed in real time and excluded from all future CE, platform, and software outreach campaigns." },
      { badge: "FCRA",     title: "CE and Platform Marketing — Not Licensure Fitness Review", desc: "Mental health counselor data is licensed for CE provider outreach, EHR platform marketing, and software sales — not for state counseling board complaint investigations, professional fitness-for-duty assessments, or employment background screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Mental Health Counselor Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for licensed mental health counselors across outpatient, community, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and platform outbound teams reach only legally contactable counselor professionals." },
    ],
  },

  "behavioral-mental-health/social-workers": {
    intro: "Licensed clinical social worker contact data covers a large and diverse behavioral health workforce across hospitals, schools, community agencies, and private practice. Lorann's compliance framework ensures your CE, technology, and policy outreach to LCSWs and MSWs is lawfully structured and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "LCSW/MSW Contact Data — No Case or Client Records",  desc: "Licensed clinical social worker lists include NASW membership status where applicable, state clinical license level, employment setting, and professional contact information. No client case records, protective service involvement data, court-ordered treatment records, or mental health crisis documentation are included in any social worker marketing file." },
      { badge: "CCPA",     title: "California LCSW Privacy Compliance",                 desc: "California-licensed clinical social workers in hospital, school, county mental health, and private practice settings are validated against CCPA opt-out databases before every delivery. Telehealth LCSWs serving California clients through multi-state platforms are evaluated against state privacy requirements before list finalization." },
      { badge: "CAN-SPAM", title: "Licensed Social Worker Email — CAN-SPAM Validated",   desc: "Email addresses for LCSWs, MSWs, and clinical social work associates across child welfare, hospital, school, and outpatient settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from social worker contacts are suppressed in real time and removed from all subsequent CE, EHR, and platform outreach campaigns." },
      { badge: "FCRA",     title: "CE and Technology Marketing — Not Background or Fitness Review", desc: "Social worker contact data is licensed for CE, EHR technology, and platform marketing outreach — not for NASW ethics investigation reference checks, state licensure board fitness reviews, or employment background screening. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Social Worker Phone Records DNC-Compliant",          desc: "Office and mobile phone numbers for licensed clinical social workers across hospital, community, and outpatient settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and technology outreach teams connect only with legally contactable LCSW professionals." },
    ],
  },

  "behavioral-mental-health/marriage-family-therapists": {
    intro: "Licensed marriage and family therapist contact data serves a growing telehealth and outpatient behavioral health professional segment. Lorann's compliance framework ensures your CE, platform, and product outreach to LMFTs is lawfully structured, privacy-statute compliant, and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "LMFT Professional Contact Data — No Session or Couple Records", desc: "Licensed marriage and family therapist lists contain state license status, practice setting type, and professional contact information only. No couples therapy records, family systems case data, genograms, session progress notes, or court-referred treatment documentation are included in any LMFT marketing file." },
      { badge: "CCPA",     title: "California LMFT Privacy Compliance",                 desc: "California-licensed marriage and family therapists — one of the largest MFT licensure populations in the US — are validated against CCPA opt-out requirements before every delivery. Telehealth LMFTs serving California clients are evaluated under the state's privacy standards before any contact record is finalized for outreach." },
      { badge: "CAN-SPAM", title: "Licensed MFT Email — CAN-SPAM Validated",             desc: "Email addresses for LMFTs and associate MFTs across private practice, community mental health, telehealth, and school-based settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from LMFT contacts are honored in real time and excluded from all subsequent CE, platform, and assessment outreach campaigns." },
      { badge: "FCRA",     title: "CE and Platform Marketing — Not Licensure Review",   desc: "LMFT contact data is licensed for CE provider, EHR platform, and teletherapy technology marketing outreach — not for BBS license status investigations, professional fitness determinations, or employment background screening. FCRA exemption documentation is available upon request for any CE or platform provider." },
      { badge: "DNC",      title: "LMFT Phone Records DNC-Registry Compliant",          desc: "Office and mobile contacts for licensed marriage and family therapists across private practice, group practice, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and platform teams reach only legally contactable LMFT professionals." },
    ],
  },

  "dental-vision/dentists": {
    intro: "General and specialty dentist contact data reaches DDS and DMD professionals across solo, group, and DSO-affiliated practices. Lorann's compliance framework ensures every supply, technology, and staffing outreach campaign targeting dentists is legally sound and registry-verified at delivery.",
    items: [
      { badge: "HIPAA",    title: "Dentist Contact Data — No Patient Treatment or Chart Records", desc: "Dentist and dental practice marketing lists include NPI number, specialty classification, practice size, and direct professional contact details. No patient dental charts, radiograph data, periodontal health records, treatment planning notes, or insurance claim histories are included in any dentist marketing file." },
      { badge: "CCPA",     title: "California Dentist Privacy Compliance",               desc: "California-licensed DDS and DMD dentists — including specialists in orthodontics, oral surgery, and periodontics — are validated against CCPA opt-out databases before every delivery. DSO-affiliated multi-location practices with California offices are scrubbed under California's privacy standards regardless of DSO corporate headquarters location." },
      { badge: "CAN-SPAM", title: "Dentist Direct Email — CAN-SPAM Validated",            desc: "Email addresses for general dentists, orthodontists, oral surgeons, endodontists, and periodontists are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from dentist contacts are honored in real time and applied across all subsequent supply, equipment, and technology outreach campaigns." },
      { badge: "FCRA",     title: "Dental Supply and Equipment Marketing — Not License Screening", desc: "Dentist contact data is licensed for B2B dental supply, equipment, and technology marketing — not for dental board license verification, malpractice insurance underwriting, or DSO acquisition due diligence. FCRA exemption documentation is provided with every dentist data order." },
      { badge: "DNC",      title: "Dentist Practice Phone Numbers DNC-Scrubbed",        desc: "Office phone numbers and dentist direct lines across solo, group, and DSO practices are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Specialty dental practice contacts are held to the same registry standards as general dentist phone records before outbound contact is initiated." },
    ],
  },

  "dental-vision/dental-hygienists": {
    intro: "Registered dental hygienist contact data reaches RDHs across dental offices, public health programs, and school-based dental settings. Lorann's compliance framework ensures your CE, supply, and recruitment outreach to dental hygiene professionals is registry-verified and lawfully delivered.",
    items: [
      { badge: "HIPAA",    title: "RDH Professional Contact Data — No Patient Perio or Clinical Records", desc: "Dental hygienist lists contain state license status, RDH certification, employment setting, and professional contact information only. No patient periodontal charting, X-ray interpretation data, treatment notes, or patient oral health history records are included in any dental hygienist marketing file." },
      { badge: "CCPA",     title: "California RDH Privacy Compliance",                  desc: "California-licensed registered dental hygienists — including those in independent and alternative practice settings — are validated against CCPA opt-out requirements before every delivery. RDHs in California school-based and community dental health programs are also evaluated against the state's privacy standards before any contact record is released." },
      { badge: "CAN-SPAM", title: "Dental Hygienist Email — CAN-SPAM Ready",              desc: "Email addresses for RDHs across private dental practices, public health clinics, and hospital-based dental settings are validated against CAN-SPAM requirements before list delivery. Opt-out requests from dental hygienist contacts are honored in real time and removed from all subsequent CE, supply, and recruitment campaigns." },
      { badge: "FCRA",     title: "CE and Supply Marketing — Not State Board Review",   desc: "Dental hygienist data is licensed for CE provider outreach, dental supply marketing, and recruiting campaigns — not for state dental hygiene board complaint review, license verification, or employment eligibility screening. FCRA exemption documentation is available upon request for any CE or staffing provider." },
      { badge: "DNC",      title: "RDH Phone Records DNC-Compliant",                    desc: "Office and mobile contacts for registered dental hygienists across dental practices, community programs, and school-based settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and supply outreach teams connect only with legally contactable RDH professionals." },
    ],
  },

  "dental-vision/dental-assistants": {
    intro: "Dental assistant contact data serves a large chairside clinical support workforce across every dental practice setting. Lorann's compliance framework ensures your training, supply, and recruitment outreach to CDA-certified and registered dental assistants is delivered cleanly and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "Dental Assistant Contact Data — No Patient Procedure or Chart Records", desc: "Dental assistant lists include certification status, CDA or RDA credential type, employment setting, and professional contact information. No patient procedure records, dental X-ray exposure data, treatment coordination notes, or practice management software access logs are included in any dental assistant marketing file." },
      { badge: "CCPA",     title: "California RDA Privacy Compliance",                  desc: "California-registered dental assistants (RDAs) are validated against CCPA opt-out requirements before every delivery. Expanded function dental assistants (EFDAs) and orthodontic assistants in California practices are also scrubbed against the state's privacy statutes before any contact record is included in a finalized outreach file." },
      { badge: "CAN-SPAM", title: "Dental Assistant Email — CAN-SPAM Validated",         desc: "Email addresses for CDAs, RDAs, and uncertified dental assistants across solo and group dental practices are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from dental assistant contacts are honored in real time and excluded from all subsequent training, recruitment, and supply outreach campaigns." },
      { badge: "FCRA",     title: "Training and Staffing Marketing — Not Certification Verification", desc: "Dental assistant contact data is licensed for dental training program outreach, supply marketing, and staffing agency campaigns — not for DANB certification verification, state dental board registration screening, or employment background investigations. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Dental Assistant Phone Records DNC-Registry Scrubbed", desc: "Mobile and office phone numbers for dental assistants across general, specialty, and orthodontic practices are scrubbed against the National DNC Registry before delivery. Your training program and staffing outreach teams reach only legally contactable dental assistant professionals." },
    ],
  },

  "dental-vision/optometrists": {
    intro: "Optometrist contact data reaches ODs across private practice, retail optical, and managed vision care settings. Lorann's compliance framework ensures your product, CE, and technology outreach to optometrists is structured for lawful B2B delivery and fully registry-verified.",
    items: [
      { badge: "HIPAA",    title: "OD Contact Data — No Patient Exam or Prescription Records", desc: "Optometrist lists include NPI number, practice type, state license status, and direct professional contact details. No patient ocular health records, refractive error prescriptions, retinal imaging data, or contact lens fitting records are included in any optometrist marketing file." },
      { badge: "CCPA",     title: "California Optometrist Privacy Compliance",          desc: "California-licensed optometrists across private practice, vision therapy, and corporate optical settings are validated against CCPA opt-out databases before every delivery. ODs at multi-location retail optical groups with California stores are scrubbed against state privacy requirements regardless of the organization's corporate domicile." },
      { badge: "CAN-SPAM", title: "Optometrist Direct Email — CAN-SPAM Ready",            desc: "Email addresses for ODs across primary eye care, low vision, sports vision, and therapeutic optometry settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from optometrist contacts are honored in real time and applied to all subsequent CE, product, and technology outreach campaigns." },
      { badge: "FCRA",     title: "Optical and CE Marketing — Not License or Board Review", desc: "Optometrist data is licensed for B2B optical product, CE provider, and technology marketing — not for state optometry board license verification, therapeutic certification audits, or employment background screening. FCRA exemption documentation is provided with every optometrist data order." },
      { badge: "DNC",      title: "Optometrist Office and Mobile Phone DNC-Scrubbed",   desc: "Practice phone lines and OD mobile contacts across private practice, retail optical, and hospital-based eye clinics are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your optical product and CE outreach teams reach only legally contactable optometrist professionals." },
    ],
  },

  "dental-vision/opticians": {
    intro: "Licensed optician contact data reaches ABO-certified and state-licensed eyewear professionals across independent dispensaries, retail optical chains, and ophthalmology practices. Lorann's compliance framework keeps your lens product, CE, and technology outreach to opticians lawfully structured and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "Optician Professional Records — No Patient Dispensing Data", desc: "Licensed optician lists include ABO/NCLE certification status, state license type, employment setting, and professional contact information. No patient eyewear orders, pupillary distance records, lens fabrication data, or frame selection histories are included in any optician marketing file." },
      { badge: "CCPA",     title: "California Optician Privacy Compliance",             desc: "California-licensed and ABO-certified opticians across independent dispensaries and retail optical chains are validated against CCPA opt-out requirements before every delivery. Opticians working for multi-state optical groups with California retail locations are evaluated under California's privacy statute before list finalization." },
      { badge: "CAN-SPAM", title: "Optician Email — CAN-SPAM Validated",                  desc: "Email addresses for ABO-certified opticians, dispensing opticians, and contact lens fitters across optical retail and clinical settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from optician contacts are suppressed in real time and excluded from all subsequent CE, product, and technology outreach campaigns." },
      { badge: "FCRA",     title: "Lens and CE Marketing — Not Board Licensing Review",  desc: "Optician contact data is licensed for lens product marketing, frame line sales outreach, and CE campaigns — not for ABO certification verification, state optical board license screening, or employment background investigations. FCRA exemption documentation is available upon request." },
      { badge: "DNC",      title: "Optician Phone Records DNC-Compliant",               desc: "Office and mobile contacts for licensed opticians across independent and retail optical settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your lens product and CE outreach teams connect only with legally contactable optician professionals." },
    ],
  },

  "pharmacy-practice-management/pharmacists": {
    intro: "Pharmacist contact data serves a clinically licensed and federally regulated professional workforce. Lorann's compliance framework is built to navigate the intersection of pharmacy law and data privacy, ensuring your drug marketing, PBM, and CE outreach is delivered lawfully and registry-verified.",
    items: [
      { badge: "HIPAA",    title: "Pharmacist Contact Data — No Rx or Dispensing Records", desc: "Pharmacist marketing lists include PharmD or RPh credential status, DEA registration flag, practice setting, and professional contact information. No patient prescription records, dispensing volume metrics, medication therapy management session data, or MTM billing records are included in any pharmacist marketing file." },
      { badge: "CCPA",     title: "California Pharmacist Privacy Compliance",           desc: "California-licensed pharmacists — including those at chain, independent, and compounding pharmacies — are validated against CCPA opt-out databases before every delivery. Pharmacists employed by multi-state pharmacy networks with California retail or specialty locations are scrubbed against California's privacy standards before any record is finalized." },
      { badge: "CAN-SPAM", title: "Pharmacist Direct Email — CAN-SPAM Ready",             desc: "Email addresses for PharmD and RPh pharmacists across retail, hospital, clinical, mail-order, and specialty pharmacy settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from pharmacist contacts are honored in real time and applied across all subsequent pharmaceutical marketing, PBM, and CE outreach campaigns." },
      { badge: "FCRA",     title: "Drug and CE Marketing — Not DEA or Licensure Review", desc: "Pharmacist contact data is licensed for pharmaceutical marketing, PBM outreach, and CE provider campaigns — not for DEA registration compliance investigations, state pharmacy board disciplinary reviews, or background employment screening. FCRA exemption documentation is provided with every pharmacist data order." },
      { badge: "DNC",      title: "Pharmacist Office and Mobile Phone DNC-Scrubbed",    desc: "Store phone numbers and pharmacist mobile contacts across retail, hospital, specialty, and independent pharmacy settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your pharmaceutical and CE outbound teams reach only legally contactable pharmacist professionals." },
    ],
  },

  "pharmacy-practice-management/physician-practice-managers": {
    intro: "Physician practice manager contact data reaches non-clinical administrators responsible for operational, financial, and compliance functions in medical practices. Lorann's compliance framework ensures your technology, billing, and advisory outreach to practice managers is structured for lawful B2B delivery.",
    items: [
      { badge: "HIPAA",    title: "Practice Manager Contact Data — No Patient Financial or Claims Data", desc: "Physician practice manager lists include job title, practice type, specialty setting, and professional contact information. No patient billing records, claims adjudication data, EOB files, or revenue cycle performance metrics derived from PHI billing activity are included in any practice manager marketing file." },
      { badge: "CCPA",     title: "California Practice Manager Privacy Compliance",     desc: "Practice managers and office administrators at California-based physician practices — including solo, multi-specialty group, and FQHC settings — are validated against CCPA opt-out requirements before every delivery. Multi-state medical group administrators with California offices are evaluated under California's privacy statute before list finalization." },
      { badge: "CAN-SPAM", title: "Practice Manager Email — CAN-SPAM Validated",         desc: "Email addresses for physician practice managers, office administrators, and billing directors across primary care, specialty, and surgical practices are validated against CAN-SPAM requirements before delivery. Opt-out requests from practice manager contacts are honored in real time and excluded from all future RCM, EHR, and advisory outreach campaigns." },
      { badge: "FCRA",     title: "Practice Operations Marketing — Not Financial Screening", desc: "Physician practice manager data is licensed for B2B billing technology, RCM platform, and advisory marketing — not for practice credit evaluations, malpractice insurance underwriting, or employment background investigations. FCRA exemption documentation is provided upon request for any technology or advisory firm." },
      { badge: "DNC",      title: "Practice Manager Phone Records DNC-Registry Compliant", desc: "Direct office lines and mobile contacts for physician practice managers across all practice sizes and specialties are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your RCM and technology outbound teams reach only legally contactable practice manager professionals." },
    ],
  },

  "specialty-other/chiropractors": {
    intro: "Chiropractor contact data reaches DCs across solo, group, and multi-disciplinary integrative health settings. Lorann's compliance framework ensures your supply, CE, and technology outreach to chiropractic professionals is lawfully structured, registry-verified, and PHI-free.",
    items: [
      { badge: "HIPAA",    title: "DC Contact Data — No Patient Adjustment or Clinical Records", desc: "Chiropractor marketing lists contain state license status, specialization flags (sports, pediatric, rehab), practice setting, and direct professional contact information. No patient spinal adjustment records, X-ray interpretations, nerve conduction data, or treatment outcome documentation are included in any chiropractic marketing file." },
      { badge: "CCPA",     title: "California Chiropractor Privacy Compliance",         desc: "California-licensed doctors of chiropractic across solo, sports, and integrative practice settings are validated against CCPA opt-out databases before every delivery. Multi-location chiropractic franchises and spinal decompression chains with California offices are scrubbed under state privacy requirements before any record is released for outreach." },
      { badge: "CAN-SPAM", title: "Chiropractor Email — CAN-SPAM Validated",              desc: "Email addresses for DCs across chiropractic clinics, sports medicine practices, and multi-disciplinary wellness centers are validated against CAN-SPAM requirements before list delivery. Opt-out requests from chiropractor contacts are honored in real time and applied to all subsequent supply, CE, and technology outreach campaigns." },
      { badge: "FCRA",     title: "Chiropractic Supply and CE Marketing — Not Board Review", desc: "Chiropractor contact data is licensed for B2B supply, equipment, and CE marketing outreach — not for chiropractic board license verification, malpractice history investigation, or employment background screening. FCRA exemption documentation is provided with every chiropractic data order." },
      { badge: "DNC",      title: "Chiropractor Practice Phone Records DNC-Scrubbed",   desc: "Office lines and DC mobile contacts across solo and group chiropractic practices are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your supply and CE outreach teams reach only legally contactable chiropractic professionals." },
    ],
  },

  "specialty-other/veterinarians": {
    intro: "Veterinarian contact data spans companion animal, equine, livestock, and exotic species practice settings. Lorann's compliance framework ensures your pharmaceutical, device, and CE outreach to DVMs and VMDs is lawfully structured, registry-verified, and free of any patient or client records.",
    items: [
      { badge: "HIPAA",    title: "DVM Contact Data — No Patient or Client Records",    desc: "Veterinarian marketing lists include state license status, species and practice specialty, AVMA membership flag, and professional contact information. No patient animal records, diagnosis histories, prescription dispensing records, or controlled substance logs are included in any veterinarian marketing file. Veterinary practice data operates entirely outside HIPAA's regulatory scope." },
      { badge: "CCPA",     title: "California DVM Privacy Compliance",                  desc: "California-licensed veterinarians — across companion animal, equine, bovine, and exotic species practices — are validated against CCPA opt-out requirements before every delivery. Corporate-owned multi-location veterinary groups with California clinics are scrubbed under California's privacy standards before any DVM record is finalized for outreach." },
      { badge: "CAN-SPAM", title: "Veterinarian Direct Email — CAN-SPAM Ready",           desc: "Email addresses for DVMs and VMDs across small animal hospitals, equine practices, large animal facilities, and mobile veterinary units are validated against CAN-SPAM requirements before delivery. Opt-out requests from veterinarian contacts are honored in real time and excluded from all subsequent pharmaceutical, device, and CE outreach campaigns." },
      { badge: "FCRA",     title: "Veterinary Marketing — Not License or DEA Review",   desc: "Veterinarian contact data is licensed for pharmaceutical, device, and CE marketing outreach — not for DEA veterinary controlled substance registration review, state veterinary board license investigations, or employment eligibility screening. FCRA exemption documentation is available upon request for any veterinary marketing provider." },
      { badge: "DNC",      title: "Veterinarian Practice Phone Records DNC-Scrubbed",   desc: "Office lines and DVM mobile contacts across companion animal hospitals, mobile practices, and large animal facilities are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound pharmaceutical and CE teams reach only legally contactable veterinarian professionals." },
    ],
  },

  "specialty-other/allied-healthcare-professionals": {
    intro: "Allied healthcare professional contact data spans a broad range of clinical support disciplines — from medical laboratory scientists to polysomnographic technologists. Lorann's compliance framework applies consistent, rigorous governance standards across every allied health credential type covered in this data set.",
    items: [
      { badge: "HIPAA",    title: "Allied Health Contact Data — No Patient or Lab Records", desc: "Allied healthcare professional lists contain credential type, certifying body, employment setting, and professional contact information only. No patient lab results, diagnostic test records, imaging interpretations, or clinical documentation of any kind are included in any allied health marketing file across any discipline covered." },
      { badge: "CCPA",     title: "Multi-Credential State Privacy Compliance",          desc: "Allied health professionals licensed or certified in California — including medical laboratory scientists, polysomnographic technologists, surgical technologists, and health educators — are validated against CCPA opt-out databases before every delivery. Multi-discipline lists with California-credentialed professionals are evaluated under the state's privacy standards before list finalization." },
      { badge: "CAN-SPAM", title: "Allied Health Professional Email — CAN-SPAM Validated", desc: "Email addresses for allied health professionals across all disciplines and care settings included in this data set are validated against federal CAN-SPAM requirements before delivery. Opt-out requests from allied health contacts are honored in real time and suppressed across all future CE, supply, and staffing outreach campaigns." },
      { badge: "FCRA",     title: "CE and Staffing Marketing — Not Credentialing or Verification", desc: "Allied healthcare professional data is licensed for CE, staffing agency, and supply marketing outreach across all disciplines — not for professional certification body verification, clinical privilege reviews, or employment eligibility determinations. FCRA exemption documentation is available with every allied health data order." },
      { badge: "DNC",      title: "Allied Health Professional Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for allied healthcare professionals across all disciplines, credential levels, and care settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and staffing teams reach only legally contactable allied health professionals under current federal and state law." },
    ],
  },
};

// ── Run the seed ─────────────────────────────────────────────
async function main() {
  const BASE_SLUG = "data-assets/b2b-database/healthcare";
  const keys = Object.keys(LEAF_COMPLIANCE);
  console.log(`Patching ${keys.length} leaf pages…\n`);

  let ok = 0, skip = 0, fail = 0;

  for (const key of keys) {
    const slug = `${BASE_SLUG}/${key}`;
    const data = LEAF_COMPLIANCE[key];

    // Find ALL Sanity page documents with this slug (duplicates exist)
    const docs = await client.fetch(
      `*[_type == "page" && slug.current == $slug]{ _id }`,
      { slug }
    );

    if (!docs?.length) {
      console.warn(`  SKIP (not found): ${slug}`);
      skip++;
      continue;
    }

    for (const doc of docs) {
      try {
        await client
          .patch(doc._id)
          .set({
            "healthcareComplianceSection.introRich": toBlock(data.intro),
            "healthcareComplianceSection.items": toItems(data.items),
          })
          .unset(["healthcareComplianceSection.intro"])
          .commit({ autoGenerateArrayKeys: true });

        console.log(`  ✓  ${slug}  (${doc._id})`);
        ok++;
      } catch (err) {
        console.error(`  ✗  ${slug}  (${doc._id}): ${err.message}`);
        fail++;
      }
    }
  }

  // Also clear the unknown `intro` field from hub pages
  console.log("\nClearing stale intro field from hub pages…");
  const hubSlugs = [
    "data-assets/b2b-database/healthcare/physicians-advanced-practice",
    "data-assets/b2b-database/healthcare/nursing-professionals",
    "data-assets/b2b-database/healthcare/hospital-decision-makers",
    "data-assets/b2b-database/healthcare/health-therapy",
    "data-assets/b2b-database/healthcare/behavioral-mental-health",
    "data-assets/b2b-database/healthcare/dental-vision",
    "data-assets/b2b-database/healthcare/pharmacy-practice-management",
    "data-assets/b2b-database/healthcare/specialty-other",
  ];
  for (const slug of hubSlugs) {
    const docs = await client.fetch(
      `*[_type == "page" && slug.current == $slug]{ _id }`,
      { slug }
    );
    if (!docs?.length) { console.warn(`  SKIP: ${slug}`); continue; }
    for (const doc of docs) {
      try {
        await client.patch(doc._id).unset(["healthcareComplianceSection.intro"]).commit();
        console.log(`  ✓  ${slug}  (${doc._id})`);
      } catch (err) {
        console.error(`  ✗  ${slug}: ${err.message}`);
      }
    }
  }

  console.log(`\nDone — ${ok} patched, ${skip} skipped, ${fail} failed.`);
}

main().catch((err) => { console.error(err); process.exit(1); });
