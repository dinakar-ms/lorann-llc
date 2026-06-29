import { ShieldCheck, Lock, Mail, Scale, PhoneOff, type LucideIcon } from "lucide-react";
import RichText from "@/components/RichText";

type ComplianceItem = {
  icon: typeof ShieldCheck;
  badge: string;
  title: string;
  desc: string;
  color: string;
};

type HubCompliance = {
  intro: string;
  items: ComplianceItem[];
};

const COLORS = {
  hipaa:    "#1D45D9",
  ccpa:     "#00A7EF",
  canspam:  "#1736B3",
  fcra:     "#22BFFF",
  dnc:      "#1D45D9",
};

/* ── Unique compliance content per hub — no repeated descriptions ── */
const HUB_COMPLIANCE: Record<string, HubCompliance> = {
  "physicians-advanced-practice": {
    intro: "Physician data carries unique regulatory weight. Every Lorann record is built with compliance as the foundation — your outreach never touches covered-entity territory.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "NPI-Only, PHI-Free Data Handling",    desc: "Physician marketing lists contain NPI numbers, practice addresses, direct emails, and specialty codes — nothing more. No prescription histories, clinical notes, or patient linkages are present. Your drug and device campaigns stay cleanly outside HIPAA's covered-entity scope." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Physician Privacy Compliance", desc: "California-licensed physicians are flagged and validated against CCPA opt-out databases. Multi-state privacy statutes are layered in automatically before every delivery, so your physician outreach stays compliant regardless of where a practice is located." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Physician Email CAN-SPAM Validation",  desc: "Every physician email address is validated against federal CAN-SPAM requirements before delivery. Unsubscribe requests from physician contacts are honored in real time and suppressed from all future pharmaceutical and device deployments." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "B2B Medical Marketing — Not Credentialing", desc: "Physician data is licensed strictly for B2B marketing outreach — not for medical staff credentialing, employment decisions, or DEA background applications. FCRA exemption documentation is available for your legal and compliance team on request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Physician Phone Numbers DNC-Scrubbed",   desc: "Office phone numbers and direct physician mobile contacts are scrubbed against the National Do Not Call Registry before every delivery. State-level DNC lists for physicians in high-regulation states are applied where applicable." },
    ],
  },
  "nursing-professionals": {
    intro: "Nursing contact data requires precise credentialing hygiene. Our compliance framework keeps your staffing, supply, and education campaigns legally sound and professionally respectful.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Credential Data Only — No Clinical Records", desc: "Nurse marketing lists include credential type, license number, care setting, and professional contact — no shift logs, patient assignment records, or clinical documentation of any kind. HIPAA's scope never reaches B2B nursing lists structured this way." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Multi-State Nurse Privacy Validation",    desc: "California, Virginia, Colorado, and other state privacy statutes are applied before every nursing list delivery. Opt-out requests from nursing professionals are suppressed within 24 hours across all data feeds, including travel nurse and compact-license records." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Nurse Email Campaigns — Fully CAN-SPAM Compliant", desc: "Nursing email addresses are validated against CAN-SPAM requirements at the point of delivery. Unsubscribe and opt-out data from nurse contacts is maintained in real time, ensuring your staffing and education campaigns launch with a clean, legally defensible list." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Recruitment Marketing, Not Employment Screening", desc: "Nursing data is supplied for marketing and recruitment marketing outreach — not for making employment eligibility determinations. Staffing firms and travel nurse agencies that request formal FCRA exemption documentation receive it with every data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Nurse Phone Records DNC-Registry Compliant", desc: "Phone numbers associated with nursing professionals — including travel nurse mobile contacts — are scrubbed against federal and state DNC registries before each delivery. High-volume dialers receive pre-scrubbed records ready for immediate outbound deployment." },
    ],
  },
  "hospital-decision-makers": {
    intro: "Reaching healthcare executives demands airtight data governance. Lorann's compliance stack ensures every executive outreach stays within regulatory boundaries and protects your brand reputation.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Executive Contact Data — Zero Patient Data",  desc: "Hospital decision-maker lists contain professional titles, direct office contacts, and facility affiliations — no patient census data, financial records, or facility-level PHI. Your vendor and capital equipment outreach to C-suite contacts stays completely outside HIPAA's regulatory reach." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Hospital Executive State Privacy Compliance", desc: "Health system executives in California and other privacy-regulated states are scrubbed against applicable opt-out registries before delivery. Multi-state IDN accounts are validated against the strictest applicable state statute, ensuring clean delivery across every territory." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "C-Suite Email Delivery — CAN-SPAM Validated",  desc: "Executive email addresses — from CEO to department director — are validated against CAN-SPAM requirements before delivery. Opt-out requests from hospital leadership contacts are suppressed in real time and excluded from all future campaign deployments." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Vendor Outreach Only — Not Background Checks", desc: "Hospital executive data is licensed for B2B vendor and advisory marketing — not for executive background screening, employment verification, or board-level due diligence. FCRA exemption is documented and available for your compliance officer on request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Executive Direct Lines DNC-Registry Scrubbed", desc: "Direct office numbers and executive mobile contacts are validated against the National Do Not Call Registry prior to delivery. State-level DNC overlays are applied for health systems operating in high-compliance jurisdictions before your outbound team calls a single contact." },
    ],
  },
  "health-therapy": {
    intro: "Therapy professional marketing operates in a regulated environment. Lorann's compliance framework is built to keep your CE, supply, and staffing campaigns professionally sound and regulation-ready.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Therapist Directories — No Treatment Records", desc: "Therapy professional lists include license type, practice setting, professional contact, and credential status — no patient treatment plans, session notes, or clinical outcome data. Your equipment and CE marketing stays firmly outside any HIPAA-covered data category." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "State Privacy Compliance for Therapy Outreach", desc: "California-licensed PTs, OTs, and SLPs are validated against CCPA opt-out requirements before every delivery. State privacy statutes applicable to outpatient therapy and SNF-based practices are applied automatically, regardless of the therapy setting targeted." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Therapy Professional Email — CAN-SPAM Ready",  desc: "All therapy professional email addresses are validated against federal CAN-SPAM requirements before list delivery. Unsubscribe requests from therapists and practice managers are suppressed in real time and excluded from every subsequent CE and supply campaign." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Supply Marketing — Not License Decisions", desc: "Therapy data is licensed for continuing education, equipment supply, and staffing marketing outreach — not for making professional licensure or credentialing decisions. FCRA exemption documentation is available for compliance review upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Therapy Practice Phone Records DNC-Validated",   desc: "Office and mobile phone numbers for therapists across acute, outpatient, SNF, and home health settings are scrubbed against federal and applicable state DNC registries. Your outbound sales teams reach only contactable therapy professionals." },
    ],
  },
  "behavioral-mental-health": {
    intro: "Behavioral health professional data demands an especially careful compliance posture. Lorann's governance framework is designed with that sensitivity in mind — from collection through delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Professional Directory Data — No Clinical Content", desc: "Behavioral health lists contain professional license type, credential level, practice setting, and contact information — no patient diagnoses, treatment records, or session notes. Marketing to LCSWs, LMFTs, and psychiatrists never touches HIPAA-regulated clinical data." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "State Privacy Law Validation for Behavioral Health", desc: "Behavioral health professionals licensed in California and other privacy-statute states are scrubbed against current opt-out databases. Telehealth providers operating across state lines are validated against the most stringent applicable state privacy requirement before delivery." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Behavioral Health Email — CAN-SPAM Compliant Lists",   desc: "Email addresses for psychiatrists, psychologists, and licensed counselors are validated against CAN-SPAM requirements before each deployment. Opt-out requests from behavioral health professionals are honored within hours and suppressed across all future platform and pharma campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Marketing Use Only — Not Clinical Decision-Making", desc: "Behavioral health contact data is supplied strictly for B2B marketing purposes — not for clinical credentialing, insurance panel decisions, or professional background investigations. FCRA exemption is documented and provided with every behavioral health data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Behavioral Health Practice Phone DNC-Compliant",   desc: "Office and mobile numbers for behavioral health practitioners — including telehealth-active clinicians — are scrubbed against the National DNC Registry and state-level registries before delivery. Your outreach team connects only with practitioners who are contactable under current law." },
    ],
  },
  "dental-vision": {
    intro: "Dental and vision professional marketing has specific compliance considerations. Lorann's data governance ensures your supply, equipment, and staffing campaigns are delivered with confidence.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Dental & Vision Directories — No Patient Records",  desc: "Dental and vision professional lists include practice name, specialty type, contact details, and equipment flags — no patient ledger data, treatment codes, or insurance claims. Your supply and equipment outreach stays entirely within non-covered-entity territory." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Dental & Vision Privacy Compliance",     desc: "California-licensed dentists, orthodontists, ODs, and ophthalmologists are validated against CCPA opt-out databases before each delivery. DSO-affiliated practices with multi-state locations are scrubbed against the most stringent applicable state privacy statute." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Dental Professional Email — CAN-SPAM Validated",    desc: "Email addresses for general dentists, specialists, optometrists, and ophthalmologists are validated against federal CAN-SPAM requirements. Unsubscribe requests from dental and vision professionals are suppressed in real time before any future supply or equipment campaign launches." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Supply and Equipment Marketing — Not Credit Screening", desc: "Dental and vision data is licensed for B2B supply, equipment, and staffing marketing — not for practice credit decisions, equipment lease underwriting, or insurance eligibility screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Dental & Vision Practice Phone DNC-Scrubbed",       desc: "Practice office numbers and dentist or OD mobile contacts are scrubbed against the National Do Not Call Registry and state-level DNC lists before delivery. Solo and DSO-affiliated practices are held to the same registry standards before your outbound team dials." },
    ],
  },
  "pharmacy-practice-management": {
    intro: "Pharmacy marketing sits at the intersection of federal drug regulation and data privacy law. Lorann's compliance stack is built to navigate both — protecting your brand and your recipients.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Pharmacist Contact Data — No Rx or Dispensing Records", desc: "Pharmacy professional lists include pharmacist name, license type, DEA registration status, and practice setting — no prescription dispensing records, patient medication histories, or controlled substance transaction logs. Your drug and supply marketing never enters HIPAA-covered territory." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Pharmacy State Privacy Law Validation",               desc: "California-licensed pharmacists and pharmacy owners are validated against CCPA opt-out requirements before every delivery. Chain pharmacy locations in multi-state networks are scrubbed against the strictest applicable state privacy statute in the organization's operating footprint." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Pharmacist Email Records — CAN-SPAM Ready",           desc: "Email addresses for retail, independent, compounding, and hospital pharmacists are validated against CAN-SPAM requirements at delivery. Opt-out requests from pharmacist contacts are suppressed in real time and excluded from all subsequent drug marketing and PBM outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Drug Marketing Outreach — Not Licensure Review",       desc: "Pharmacy data is supplied for pharmaceutical marketing, PBM network outreach, and technology sales — not for pharmacist license verification, controlled-substance dispensing eligibility, or DEA registration compliance reviews. FCRA exemption is documented with every order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Pharmacy Phone Numbers DNC-Registry Compliant",        desc: "Store phone numbers and pharmacist mobile contacts are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Independent pharmacy owner contacts are held to the same registry standards as chain-location numbers." },
    ],
  },
  "specialty-other": {
    intro: "Specialty healthcare professional marketing covers a wide regulatory surface. Lorann's data governance framework applies the same rigorous compliance standards across every niche discipline.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Specialty Directory Data — No Clinical Records",     desc: "Specialty professional lists — covering chiropractors, veterinarians, radiologic technicians, and allied disciplines — contain credential and contact data only. No patient records, clinical outcomes, or treatment histories are present. Your supply and CE outreach stays outside HIPAA's covered-entity scope." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Multi-Discipline State Privacy Compliance",          desc: "Specialty professionals licensed in California and other privacy-regulated states are scrubbed against applicable opt-out databases before every delivery. Multi-discipline lists are validated against the most stringent state statute covering each credential type in the dataset." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Specialty Professional Email — CAN-SPAM Validated",  desc: "Email addresses for chiropractors, DVMs, EMTs, dietitians, and allied health professionals are validated against federal CAN-SPAM requirements before delivery. Unsubscribe and opt-out requests from specialty contacts are suppressed in real time across all future campaign deployments." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Marketing Use Only — Not Licensing Decisions",       desc: "Specialty healthcare data is licensed strictly for B2B marketing and outreach — not for professional licensing determinations, board certification verification, or employment eligibility screening. FCRA exemption documentation is available for compliance review with every data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Specialty Practice Phone Numbers DNC-Scrubbed",      desc: "Office and mobile phone numbers for specialty practitioners — including veterinary clinics, chiropractic offices, and allied health facilities — are scrubbed against the National DNC Registry and state-level lists before delivery to your outbound team." },
    ],
  },
  /* ── Leaf-level pages: unique content per specialty ── */

  "physicians-advanced-practice/physicians-doctors": {
    intro: "MD and DO physician contact data is held to the highest regulatory standard in the industry. Every Lorann record for licensed physicians is structured to support lawful B2B marketing — not clinical engagement — across all 50 states.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "MD/DO Records — No PHI or Prescribing Data",       desc: "Physician and doctor lists contain professional licensing data, specialty classification, NPI numbers, and direct practice contact details only. No prescription volumes, DEA schedules, EHR-derived clinical metrics, or patient interaction data is included in any physician marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Multi-State Compliance for MD/DO Outreach",        desc: "California-licensed MDs and DOs are scrubbed against CCPA opt-out databases before delivery. Physicians practicing across state lines are evaluated under the most stringent applicable privacy statute in their primary practice jurisdiction before any list is finalized." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Physician Direct Email — CAN-SPAM Validated",       desc: "Direct email addresses for board-certified physicians across all specialties are validated against federal CAN-SPAM requirements. Opt-out and unsubscribe requests from physician contacts are suppressed in real time and removed from all subsequent pharmaceutical, device, and health technology campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Medical Marketing Only — Not Credentialing",       desc: "Physician data is licensed strictly for B2B marketing and outreach — not for hospital privilege determinations, malpractice insurance underwriting, or employment background investigations. FCRA exemption documentation is provided with every physician data order upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "MD/DO Office and Mobile Phones DNC-Scrubbed",      desc: "Direct office phone lines and mobile contacts for MDs and DOs across all practice settings are scrubbed against the National Do Not Call Registry before delivery. State-level physician phone records are validated against applicable high-regulation state DNC lists before your outbound team dials." },
    ],
  },

  "physicians-advanced-practice/podiatrists": {
    intro: "Podiatric physician contact data serves a narrow but commercially active specialty. Lorann's compliance framework ensures your supply, device, and practice management outreach to DPMs is structured, lawful, and registry-verified before delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Podiatry Contact Data — No Patient or Clinical Records", desc: "Podiatrist marketing lists contain DPM license information, NPI registration, practice address, and direct professional contact only. No patient foot-care records, diabetic wound management data, surgical procedure histories, or clinical outcome notes are present in any Lorann podiatry file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California DPM Privacy Compliance",                    desc: "California-licensed podiatrists and podiatric surgeons are validated against CCPA opt-out requirements before every list delivery. Multi-state podiatric practices with California locations are scrubbed under the strictest applicable state statute in their operating footprint." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Podiatrist Email Records — CAN-SPAM Ready",             desc: "Email addresses for DPMs across solo, group, and hospital-affiliated podiatric practices are validated against CAN-SPAM requirements at delivery. Unsubscribe requests from podiatrists are honored in real time and applied across all subsequent supply, device, and CE campaigns before launch." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Device and Supply Marketing — Not Licensure Verification", desc: "Podiatry data is supplied for B2B supply, device, and CE marketing outreach — not for professional license verification, insurance panel credentialing, or background eligibility screening for hospital surgical privileges. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Podiatry Practice Phone Numbers DNC-Scrubbed",         desc: "Office phone numbers and DPM mobile contacts for solo and group podiatric practices — including diabetic care centers and wound management clinics — are scrubbed against the National DNC Registry and applicable state registries before delivery to your outbound team." },
    ],
  },

  "physicians-advanced-practice/nurse-practitioners": {
    intro: "Nurse practitioner data spans a diverse credential landscape — from FNPs to ACNPs to DNPs. Lorann's compliance framework is built to handle the full breadth of advanced practice nursing scope while keeping every campaign legally sound.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "NP Contact Data — Professional Records Only",        desc: "Nurse practitioner lists contain APRN credential type, specialization, state licensure, practice setting, and professional contact details. No patient panels, EHR access logs, prescribing histories, or controlled substance authorization records are included in any advanced practice nursing marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "State Privacy Compliance for APRN Outreach",         desc: "Advanced practice nurses — including FNPs, ACNPs, DNPs, and CRNAs — licensed in California and other privacy-regulated states are validated against applicable opt-out databases before every delivery. Multi-state compact-license NP records are evaluated under the strictest state privacy law applicable to each record." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Nurse Practitioner Email — CAN-SPAM Validated",       desc: "Email addresses for nurse practitioners across primary care, specialty, and acute care settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from NP contacts are suppressed in real time and excluded from all subsequent CE, device, and pharmaceutical outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Pharmaceutical Marketing — Not Credentialing", desc: "Nurse practitioner data is licensed for continuing education, pharmaceutical marketing, and device outreach — not for board certification verification, DEA registration review, or hospital privilege evaluation. FCRA exemption documentation is provided with every APRN data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Nurse Practitioner Phone Records DNC-Compliant",     desc: "Office and mobile phone numbers for nurse practitioners across acute, primary care, and telehealth settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Compact-license NP contacts across multiple jurisdictions are held to the strictest applicable state standard." },
    ],
  },

  "physicians-advanced-practice/physician-assistants": {
    intro: "Physician assistant contact data supports a commercially growing segment of the clinical workforce. Lorann's compliance infrastructure keeps your device, supply, and CE outreach to PAs and PA-Cs structured, lawful, and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "PA Contact Data — No Clinical or Prescribing Records", desc: "Physician assistant lists include PA-C credential status, state licensure, specialty setting, NPI number, and professional contact information only. No prescription activity data, supervising physician linkages, DEA authorization records, or clinical note data are included in any PA marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California PA Privacy Compliance",                   desc: "California-licensed physician assistants and surgical PAs are validated against CCPA opt-out requirements before every delivery. Multi-state PA practices and hospital-employed PA groups with California locations are scrubbed against the most stringent applicable state privacy statute in their operating jurisdiction." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Physician Assistant Email — CAN-SPAM Ready",          desc: "Email addresses for PAs and PA-Cs across surgical, primary care, emergency, and specialty settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from physician assistant contacts are honored in real time and applied across all subsequent CE, pharmaceutical, and device campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Device and Supply Marketing — Not Employment Screening", desc: "Physician assistant data is licensed for B2B device, supply, and CE marketing outreach — not for employment background screening, hospital credentialing, or PA board compliance monitoring. FCRA exemption documentation is provided with every physician assistant data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "PA Office and Mobile Phone DNC-Scrubbed",            desc: "Office and mobile phone numbers for physician assistants in surgical, hospital, and outpatient clinic settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your outbound team reaches only legally contactable PA professionals." },
    ],
  },

  "physicians-advanced-practice/medical-assistants": {
    intro: "Medical assistant contact data reaches a large, front-line clinical support workforce. Lorann's compliance framework ensures your staffing, training, and supply outreach to MAs and CMAs is delivered in a legally defensible, registry-verified manner.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "MA Professional Records — No Patient Interaction Data", desc: "Medical assistant lists include CMA or RMA credential status, certification body, employment setting, and professional contact details. No patient rooming records, clinical documentation access logs, or care coordination data of any kind are included in any medical assistant marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Medical Assistant Privacy Compliance",      desc: "California-based medical assistants — including CMAs, RMAs, and EMTs working in clinical settings — are validated against CCPA opt-out requirements before every list delivery. Multi-location clinic and hospital systems with California sites are scrubbed against applicable state privacy statutes before any MA record is released." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Medical Assistant Email — CAN-SPAM Validated",        desc: "Email addresses for certified and registered medical assistants across outpatient, specialty, and urgent care settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from MA contacts are honored in real time and excluded from all future training, staffing, and supply outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Training and Staffing Marketing — Not Employment Verification", desc: "Medical assistant data is licensed for CE, staffing agency marketing, and supply outreach — not for formal employment eligibility verification or background screening. FCRA exemption documentation is available for any staffing firm or CE provider that requires it." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Medical Assistant Phone Records DNC-Registry Compliant", desc: "Phone numbers for medical assistants across physician offices, urgent care centers, and multi-specialty clinics are scrubbed against the National DNC Registry before delivery. Your outbound staffing and training teams reach only legally contactable MA professionals." },
    ],
  },

  "nursing-professionals/registered-nurses": {
    intro: "Registered nurse contact data covers the largest licensed clinical workforce in the United States. Lorann's compliance framework ensures every staffing, CE, and supply campaign targeting RNs is delivered cleanly, lawfully, and in compliance with all applicable registries.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "RN Professional Contact Data — No Patient Assignment Records", desc: "Registered nurse lists include license type, specialty certification, care setting, and professional contact details — no patient census assignments, shift records, or care documentation of any kind. Your staffing, CE, and equipment outreach to RNs stays firmly outside HIPAA's clinical data scope." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California RN Privacy Compliance",                   desc: "California-licensed registered nurses — including BSN, ADN, and specialty-certified RNs — are validated against CCPA opt-out databases before every delivery. Travel nurses with active California compact assignments are evaluated against the state's privacy standards before any record is included in a finalized list." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Registered Nurse Email — CAN-SPAM Validated at Delivery", desc: "Direct email addresses for RNs across acute, ambulatory, long-term care, and home health settings are validated against federal CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from RN contacts are suppressed in real time and excluded from all subsequent staffing and CE campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Staffing and CE Marketing — Not Employment Eligibility Screening", desc: "Registered nurse data is supplied for staffing agency marketing, continuing education outreach, and supply campaigns — not for formal employment eligibility determinations or nursing board licensure verification. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "RN Phone Records DNC-Registry Compliant",           desc: "Mobile and home phone numbers for registered nurses — including travel nurse contacts and per-diem staff — are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your outbound staffing teams connect only with nurses who are contactable under current law." },
    ],
  },

  "nursing-professionals/licensed-practical-nurses": {
    intro: "Licensed practical and vocational nurse contact data reaches a vital segment of the long-term care and clinical support workforce. Lorann's compliance stack ensures every LPN and LVN campaign is registry-verified and legally sound before it reaches your outbound team.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "LPN/LVN Professional Records — No Clinical Documentation Data", desc: "Licensed practical and vocational nurse lists include state license status, care setting type, employer facility classification, and professional contact information. No patient medication administration records, care plan data, or long-term care charting is included in any LPN or LVN marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California LPN/LVN Privacy Compliance",              desc: "California-licensed vocational nurses (LVNs) are validated against CCPA opt-out requirements before every list delivery. LVNs working in SNF, home health, and assisted living settings in California are scrubbed against the state's privacy statutes before any record is included in a finalized outreach file." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "LPN/LVN Email Records — CAN-SPAM Validated",          desc: "Email addresses for licensed practical and vocational nurses across nursing facilities, home health agencies, and outpatient clinics are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from LPN and LVN contacts are honored in real time and applied to all subsequent staffing and CE campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Staffing and CE Marketing — Not Background Screening", desc: "LPN and LVN data is supplied for staffing agency outreach, continuing education marketing, and supply campaigns — not for employment background screening or licensure verification. FCRA exemption documentation is available upon request for any staffing agency or training provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "LPN/LVN Phone Records DNC-Compliant",                desc: "Phone numbers for licensed practical and vocational nurses across SNF, home health, and outpatient settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound team receives only contactable LPN and LVN professionals under current federal and state law." },
    ],
  },

  "nursing-professionals/certified-nursing-assistants": {
    intro: "Certified nursing assistant contact data serves a large and essential care delivery workforce. Lorann's compliance framework keeps your CNA staffing, training, and supply campaigns cleanly structured, legally compliant, and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "CNA Professional Contact Data — No Resident Care Records", desc: "Certified nursing assistant lists include certification status, state registry standing, care setting, and professional contact information. No resident care logs, ADL assistance records, nursing facility charting, or patient interaction documentation is included in any CNA marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California CNA Privacy Compliance",                  desc: "California-certified nursing assistants listed on the California Nurse Aide Registry are validated against CCPA opt-out requirements before every delivery. CNAs working across multiple SNF and assisted living locations in California are scrubbed against applicable state privacy standards before any record is released." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "CNA Email Outreach — CAN-SPAM Ready",                  desc: "Email addresses for certified nursing assistants across skilled nursing facilities, memory care centers, and home health agencies are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from CNA contacts are suppressed in real time and excluded from all future training and staffing campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Training and Workforce Marketing — Not Registry Verification", desc: "CNA contact data is licensed for workforce training, staffing agency marketing, and supply outreach — not for state aide registry verification, background checks, or employment eligibility determinations. FCRA exemption documentation is available upon request for any training provider or placement firm." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "CNA Phone Records DNC-Registry Scrubbed",           desc: "Phone numbers for certified nursing assistants across skilled nursing, assisted living, and home care settings are scrubbed against the National Do Not Call Registry before delivery. Your staffing and training outreach teams reach only legally contactable CNA professionals." },
    ],
  },

  "nursing-professionals/certified-nurse-midwives": {
    intro: "Certified nurse midwife contact data serves a specialized and clinically autonomous segment of advanced practice nursing. Lorann's compliance framework is built for the nuanced regulatory requirements that apply to CNM and APRN outreach across the United States.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "CNM Professional Records — No Birth or Patient Records", desc: "Certified nurse midwife lists include APRN credential status, CNM certification body, practice setting type, and professional contact details. No birth records, maternal care data, labor management documentation, or patient health outcome data is included in any CNM marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California CNM Privacy Compliance",                  desc: "California-licensed CNMs and nurse-midwifery practices are validated against CCPA opt-out databases before every list delivery. Telehealth-active CNMs with California patient populations are evaluated under the state's privacy regulations before any contact record is released for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Certified Nurse Midwife Email — CAN-SPAM Validated",   desc: "Email addresses for CNMs across birth centers, hospital labor and delivery units, and independent midwifery practices are validated against CAN-SPAM requirements before delivery. Opt-out requests from CNM contacts are honored in real time and suppressed from all future pharmaceutical and CE campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Clinical Marketing Only — Not Credentialing or Privilege Review", desc: "CNM contact data is licensed for B2B pharmaceutical, CE, and supply marketing outreach — not for hospital birth center privilege verification, CNM board credentialing review, or employment background screening. FCRA exemption is documented and available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Nurse Midwife Phone Records DNC-Compliant",          desc: "Office and mobile phone numbers for certified nurse midwives across hospital, birth center, and home birth practice settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound team reaches only legally contactable CNM professionals." },
    ],
  },

  "hospital-decision-makers/hospital-administrators": {
    intro: "Hospital administrator contact data targets the operational backbone of healthcare facility management. Lorann's compliance stack ensures your vendor, technology, and capital equipment outreach to non-clinical hospital leadership is structured, lawful, and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Administrator Contact Data — No Facility Patient Data", desc: "Hospital administrator lists contain job title, department function, facility affiliation, and professional contact information only. No patient census data, facility-level utilization metrics, or operational data derived from PHI workflows is captured, stored, or transferred in any hospital administrator marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Hospital Administrator Privacy Compliance", desc: "Hospital and health system administrators in California are validated against CCPA opt-out databases before every delivery. Multi-hospital IDN administrators with facilities in California and other privacy-regulated states are scrubbed under the most stringent applicable state statute in the IDN's operating footprint." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Hospital Administrator Email — CAN-SPAM Validated",    desc: "Direct professional email addresses for hospital administrators across facility operations, supply chain, revenue cycle, and HR departments are validated against CAN-SPAM requirements before delivery. Opt-out requests from administrator contacts are suppressed in real time and excluded from all future vendor and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Vendor Outreach Only — Not Background or Employment Screening", desc: "Hospital administrator data is licensed for B2B vendor, technology, and advisory marketing outreach — not for pre-employment background investigation or executive reference verification. FCRA exemption documentation is available for compliance review upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Hospital Administrator Phone Records DNC-Scrubbed",   desc: "Direct office lines and administrator mobile contacts across acute care hospitals, critical access facilities, and specialty hospitals are scrubbed against the National DNC Registry before delivery. State-level DNC overlays are applied for health systems in high-regulation jurisdictions before your outbound team dials." },
    ],
  },

  "hospital-decision-makers/ceo-cfo-healthcare": {
    intro: "Healthcare CEO and CFO contact data reaches the highest decision-making tier of health system leadership. Lorann's compliance framework ensures your capital, advisory, and technology outreach to health system executives is verified, lawful, and registry-compliant at delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "C-Suite Contact Data — No Facility or Financial PHI", desc: "Healthcare CEO and CFO lists include executive title, organizational affiliation, and direct professional contact details only. No facility-level patient financial data, operating margin data derived from PHI billing records, or clinically sensitive organizational metrics are captured or included in any executive marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Health System Executive Privacy Compliance", desc: "CEOs and CFOs at California-domiciled health systems and hospitals are validated against CCPA opt-out requirements before every delivery. Executives at IDNs with mixed-state operations are evaluated under California's standards when any system facility or headquarters is located in the state." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Health System CEO/CFO Email — CAN-SPAM Validated",    desc: "Direct executive email addresses for healthcare CEOs and CFOs across independent hospitals, IDNs, and health systems are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from executive contacts are honored in real time and removed from all subsequent capital, advisory, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Advisory and Capital Marketing — Not Executive Screening", desc: "Health system CEO and CFO data is licensed for B2B advisory, capital equipment, and financial technology marketing — not for executive background investigation, board director due diligence, or fiduciary suitability screening. FCRA exemption documentation is provided with every executive data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Health System Executive Phone Records DNC-Registry Compliant", desc: "Direct office lines and executive mobile contacts for healthcare CEOs and CFOs are scrubbed against the National Do Not Call Registry before delivery. State-level DNC lists for executives at health systems in high-regulation states are applied before your advisory and technology team places a single outbound call." },
    ],
  },

  "hospital-decision-makers/chief-medical-officers": {
    intro: "Chief medical officer contact data reaches physician-executives responsible for clinical strategy and quality across entire health systems. Lorann's compliance framework ensures your consulting, technology, and advisory outreach to CMOs is structured for B2B use — not clinical engagement.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "CMO Contact Data — No Clinical Governance or Quality Data", desc: "Chief medical officer lists contain executive title, health system affiliation, geographic market, and direct professional contact information only. No peer review records, quality improvement metrics, credentialing committee data, or patient safety event documentation is included in any CMO marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California CMO Privacy Compliance",                  desc: "Chief medical officers at California-based hospitals and health systems are validated against CCPA opt-out requirements before every delivery. CMOs at multi-state health systems with California operations are scrubbed under the state's privacy statute regardless of the executive's primary office location." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Chief Medical Officer Email — CAN-SPAM Validated",    desc: "Direct email addresses for CMOs across independent hospitals, academic medical centers, and integrated health systems are validated against CAN-SPAM requirements before delivery. Opt-out requests from CMO contacts are suppressed in real time and excluded from all subsequent technology, consulting, and advisory outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Clinical Advisory Marketing — Not Physician Credentialing Review", desc: "CMO contact data is licensed for B2B consulting, technology, and advisory marketing — not for physician peer review, board certification verification, or executive medical staff credentialing. FCRA exemption documentation is available for compliance review upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "CMO Direct Phone Records DNC-Scrubbed",              desc: "Office lines and mobile contacts for chief medical officers at hospitals, IDNs, and health systems are scrubbed against the National Do Not Call Registry before delivery. State-level DNC overlays are applied for CMOs at health systems operating in high-regulation jurisdictions." },
    ],
  },

  "hospital-decision-makers/chief-nursing-officers": {
    intro: "Chief nursing officer contact data reaches the executive responsible for nursing workforce strategy, care standards, and clinical operations across hospital systems. Lorann's compliance framework ensures every CNO outreach campaign is lawful, registry-verified, and positioned for B2B engagement.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "CNO Contact Data — No Workforce or Patient Quality Data", desc: "Chief nursing officer lists include executive title, hospital or health system affiliation, and direct professional contact details only. No nurse staffing ratios, incident report summaries, patient satisfaction scores derived from clinical operations, or unit-level quality data is included in any CNO marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California CNO Privacy Compliance",                  desc: "Chief nursing officers at California hospitals and health systems are validated against CCPA opt-out databases before every delivery. CNOs at multi-state IDNs with California facilities are scrubbed under California's privacy standards when any part of the system operates in the state." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Chief Nursing Officer Email — CAN-SPAM Validated",    desc: "Email addresses for CNOs across acute care hospitals, long-term acute care, and community health systems are validated against CAN-SPAM requirements before delivery. Opt-out requests from CNO contacts are honored in real time and removed from all future nursing technology, CE, and workforce outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Workforce and Technology Marketing — Not Nursing Oversight Review", desc: "CNO contact data is licensed for B2B nursing technology, workforce solutions, and CE provider outreach — not for nursing board compliance review, staff incident investigations, or employment eligibility determinations. FCRA exemption documentation is provided upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "CNO Phone Records DNC-Registry Compliant",           desc: "Office and mobile contacts for chief nursing officers across hospital and IDN settings are scrubbed against the National Do Not Call Registry before delivery. State-level DNC lists are applied for CNOs at health systems in high-regulation states before your outbound team initiates contact." },
    ],
  },

  "hospital-decision-makers/chief-of-staff": {
    intro: "Chief of staff contact data targets physician leaders responsible for medical staff governance and clinical policy across hospital facilities. Lorann's compliance framework keeps your technology, advisory, and vendor outreach to medical staff chiefs structurally sound and lawfully delivered.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Chief of Staff Contact Data — No Medical Staff or Peer Review Data", desc: "Chief of staff lists contain executive title, hospital affiliation, and direct professional contact information only. No peer review records, medical staff committee proceedings, physician performance data, or credentialing file contents are included in any chief of staff marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Chief of Staff Privacy Compliance",       desc: "Physician leaders serving as hospital chief of staff in California are validated against CCPA opt-out requirements before delivery. Chiefs of staff at multi-hospital systems with California facilities are evaluated under the state's privacy statute regardless of where the individual's administrative office is located." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Chief of Staff Email — CAN-SPAM Validated",           desc: "Direct professional email addresses for hospital chiefs of staff across community, acute care, and academic medical centers are validated against CAN-SPAM requirements before delivery. Opt-out requests from chief of staff contacts are suppressed in real time and excluded from all subsequent advisory, technology, and vendor outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Advisory Outreach Only — Not Medical Staff Governance Review", desc: "Chief of staff contact data is licensed for B2B advisory, technology, and vendor marketing — not for medical staff governance audits, peer review file review, or physician performance assessments. FCRA exemption documentation is available upon request for any vendor or advisory firm." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Chief of Staff Phone Records DNC-Scrubbed",          desc: "Office lines and mobile contacts for hospital chiefs of staff across acute and community settings are scrubbed against the National DNC Registry before delivery. State-level DNC overlays are applied for chiefs of staff at facilities in high-regulation jurisdictions before outbound contact is attempted." },
    ],
  },

  "hospital-decision-makers/medical-directors": {
    intro: "Medical director contact data spans a wide range of clinical leadership roles — from department directors to hospice and managed care medical directors. Lorann's compliance framework ensures every medical director campaign is structured for lawful B2B outreach and registry-verified delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Medical Director Contact Data — No Department Clinical Records", desc: "Medical director lists include clinical leadership role, department specialty, facility affiliation, and direct professional contact details. No department-level patient outcome data, quality metrics derived from clinical records, or utilization management decisions involving PHI are included in any medical director marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Medical Director Privacy Compliance",     desc: "Medical directors at California-licensed hospitals, managed care organizations, and specialty clinics are validated against CCPA opt-out databases before every delivery. Medical directors in multi-state health plan or IDN structures are scrubbed under the most stringent applicable state privacy statute." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Medical Director Email — CAN-SPAM Ready",              desc: "Email addresses for medical directors across acute care, behavioral health, hospice, managed care, and ambulatory settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from medical director contacts are honored in real time and removed from all subsequent technology and advisory campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Clinical Advisory Marketing — Not Physician Employment Screening", desc: "Medical director contact data is licensed for B2B technology, consulting, and vendor outreach — not for physician employment background review, managed care credentialing decisions, or clinical quality investigation. FCRA exemption documentation is provided with every medical director data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Medical Director Phone Records DNC-Compliant",       desc: "Direct office and mobile contacts for medical directors across hospital, managed care, hospice, and ambulatory settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound advisory and technology teams reach only contactable medical director professionals." },
    ],
  },

  "health-therapy/physical-therapists": {
    intro: "Physical therapist contact data serves a diverse clinical workforce across acute, outpatient, and home health settings. Lorann's compliance stack ensures your CE, equipment, and staffing outreach to PTs and DPTs is delivered cleanly and in full regulatory compliance.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "PT Professional Contact Data — No Patient Care or Outcome Records", desc: "Physical therapist lists contain state license status, APTA specialty certification, practice setting, and professional contact details only. No patient functional assessment records, therapy progress notes, or rehab outcome data are included in any PT marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California PT Privacy Compliance",                   desc: "California-licensed physical therapists — including those in outpatient orthopedic, pediatric, and SNF settings — are validated against CCPA opt-out requirements before every delivery. Travel PTs with California compact assignments are also evaluated against state privacy standards before any contact record is finalized." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Physical Therapist Email — CAN-SPAM Validated",       desc: "Email addresses for PTs and DPTs across acute care hospitals, outpatient clinics, school systems, and home health agencies are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from physical therapist contacts are honored in real time and excluded from all subsequent CE, staffing, and equipment campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Staffing Marketing — Not Licensure Verification", desc: "Physical therapist data is supplied for continuing education, staffing agency marketing, and equipment outreach — not for state PT board license verification, hospital credentialing, or employment eligibility determinations. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "PT Phone Records DNC-Registry Scrubbed",             desc: "Office and mobile phone numbers for physical therapists across outpatient, hospital, and SNF settings are scrubbed against the National Do Not Call Registry before delivery. Your staffing and CE outreach teams reach only legally contactable PT professionals." },
    ],
  },

  "health-therapy/occupational-therapists": {
    intro: "Occupational therapist contact data reaches OTs and COTAs across pediatric, acute, and community-based settings. Lorann's compliance framework ensures every CE, supply, and staffing outreach campaign targeting occupational therapy professionals is lawful and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "OT Professional Records — No Patient Activity or ADL Data", desc: "Occupational therapist lists include state license type, NBCOT certification status, practice setting, and direct professional contact information. No patient activity limitation records, ADL assessment data, cognitive or sensory therapy notes, or home modification documentation are included in any OT or COTA marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California OT Privacy Compliance",                   desc: "California-licensed occupational therapists and COTAs are validated against CCPA opt-out databases before every delivery. School-based OTs and home health occupational therapists with California clients are evaluated against the state's privacy statutes before any record is included in a finalized outreach file." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Occupational Therapist Email — CAN-SPAM Ready",       desc: "Email addresses for OTs across pediatric, acute care, hand therapy, and community mental health settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from OT contacts are suppressed in real time and excluded from all future CE, supply, and staffing campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Supply Marketing — Not License or Credentialing Review", desc: "Occupational therapist data is licensed for CE provider marketing, adaptive equipment outreach, and staffing campaigns — not for NBCOT certification verification, state licensure investigation, or employment background screening. FCRA exemption is documented and available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "OT Phone Records DNC-Compliant",                     desc: "Office and mobile contacts for occupational therapists across hospital, outpatient, school, and home health settings are scrubbed against the National DNC Registry and applicable state DNC lists. Your CE and staffing outbound teams reach only legally contactable OT professionals before each campaign is deployed." },
    ],
  },

  "health-therapy/speech-language-therapists": {
    intro: "Speech-language pathologist contact data covers SLPs and CFY clinicians across schools, hospitals, and private practice settings. Lorann's compliance framework ensures your CE, product, and staffing outreach to speech-language professionals is lawfully structured and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "SLP Professional Contact Data — No Patient or Communication Records", desc: "Speech-language pathologist lists include ASHA certification status, clinical fellowship year flag, employment setting, and direct professional contact details. No patient dysphagia evaluations, augmentative communication device records, swallowing study reports, or therapy progress notes are present in any SLP marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California SLP Privacy Compliance",                  desc: "California-licensed SLPs — across public schools, hospitals, SNFs, and private practice — are validated against CCPA opt-out databases before every delivery. School-based SLPs working in California districts and telehealth SLPs serving California patients are evaluated against the state's privacy requirements before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Speech-Language Pathologist Email — CAN-SPAM Validated", desc: "Email addresses for SLPs and CFY clinicians across pediatric, adult neurological, and school-based settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from SLP contacts are honored in real time and applied across all subsequent CE, device, and staffing campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Device Marketing — Not Licensure or ASHA Review", desc: "SLP contact data is supplied for continuing education, communication device, and staffing marketing outreach — not for ASHA certification verification, state licensure review, or professional fitness determinations. FCRA exemption documentation is available upon request for any CE or device provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "SLP Phone Records DNC-Registry Scrubbed",            desc: "Office and mobile phone numbers for speech-language pathologists across hospital, school, SNF, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and staffing teams connect only with legally contactable SLP professionals." },
    ],
  },

  "health-therapy/respiratory-therapists": {
    intro: "Respiratory therapist contact data reaches CRTs and RRTs in critical care, pulmonary, and home health settings. Lorann's compliance stack ensures your device, CE, and staffing outreach to respiratory therapy professionals is delivered lawfully and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "RT Professional Records — No Patient Ventilator or ABG Data", desc: "Respiratory therapist lists include CRT or RRT credential level, NBRC certification status, care setting, and professional contact information. No ventilator management records, arterial blood gas data, pulmonary function test results, or patient-specific respiratory therapy orders are included in any RT marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California RT Privacy Compliance",                   desc: "California-licensed respiratory therapists across acute care hospitals, home health agencies, and pulmonary rehab centers are validated against CCPA opt-out requirements before every delivery. Travel RTs on California contract assignments are also evaluated against the state's privacy standards before any contact record is released." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Respiratory Therapist Email — CAN-SPAM Ready",        desc: "Email addresses for CRTs and RRTs across ICU, NICU, emergency, and home health settings are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from respiratory therapist contacts are suppressed in real time and removed from all subsequent CE, device, and staffing campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Device and CE Marketing — Not Credentialing or Screening", desc: "Respiratory therapist data is licensed for ventilator device outreach, CE marketing, and staffing campaigns — not for NBRC certification verification, state RT board compliance review, or employment background screening. FCRA exemption documentation is available with every respiratory therapist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Respiratory Therapist Phone Records DNC-Scrubbed",   desc: "Office and mobile phone numbers for respiratory therapists across acute care, LTACH, and home health settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound teams connect only with legally contactable RT professionals under current federal and state law." },
    ],
  },

  "health-therapy/massage-therapists": {
    intro: "Licensed massage therapist contact data spans solo practice, spa, chiropractic, and clinical settings. Lorann's compliance framework ensures your CE, supply, and product outreach to LMTs and CMTs is structured for lawful delivery and fully registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "LMT Professional Contact Data — No Client Session Records", desc: "Massage therapist lists include state license status, credential type, and practice setting — no client intake records, SOAP notes, treatment session histories, or clinical documentation of any kind. Your supply, CE, and product marketing to LMTs stays entirely outside any HIPAA-adjacent data category." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California LMT Privacy Compliance",                  desc: "California-certified massage therapists (CMTs) are validated against CCPA opt-out requirements before every delivery. Spa-based and clinical LMTs with California client practices are scrubbed against the state's privacy statutes before any record is included in a finalized outreach list." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Massage Therapist Email — CAN-SPAM Validated",        desc: "Email addresses for LMTs and CMTs across solo practice, chiropractic integration, and spa and wellness settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from massage therapist contacts are honored in real time and applied across all subsequent CE, product, and supply campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Product Marketing — Not State Board Review",  desc: "Massage therapist data is licensed for CE provider outreach, massage supply, and product marketing — not for NCBTMB certification verification, state massage board complaint review, or background eligibility screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "LMT Phone Records DNC-Registry Compliant",           desc: "Office and mobile phone numbers for licensed massage therapists across solo, spa, and clinical settings are scrubbed against the National Do Not Call Registry and applicable state DNC lists before delivery. Your CE and supply outreach teams reach only legally contactable LMT professionals." },
    ],
  },

  "health-therapy/emts-paramedics": {
    intro: "EMT and paramedic contact data serves a geographically dispersed and operationally demanding emergency response workforce. Lorann's compliance framework ensures your training, equipment, and staffing outreach to EMS professionals is delivered cleanly and in full compliance with applicable registries.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "EMS Professional Contact Data — No Patient Call or Run Records", desc: "EMT and paramedic lists include certification level, state registry standing, employer agency type, and professional contact details. No patient run reports, PCR data, EMS call records, or emergency dispatch interaction data is included in any EMS marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California EMT/Paramedic Privacy Compliance",        desc: "California-certified EMTs and paramedics — including those credentialed through EMSA — are validated against CCPA opt-out databases before every delivery. Career EMS professionals working for both public and private agencies in California are evaluated against state privacy requirements before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "EMT and Paramedic Email — CAN-SPAM Validated",        desc: "Email addresses for EMTs and paramedics across municipal, fire department-based, private, and hospital-based EMS systems are validated against CAN-SPAM requirements before list delivery. Opt-out requests from EMS professional contacts are honored in real time and excluded from all subsequent training, equipment, and staffing outreach." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "EMS Training and Equipment Marketing — Not Background Screening", desc: "EMT and paramedic data is licensed for training, simulation equipment, and staffing agency marketing outreach — not for employment background screening, criminal history review, or EMS certification fitness evaluations. FCRA exemption documentation is available upon request for any training or staffing provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "EMS Professional Phone Records DNC-Scrubbed",        desc: "Mobile and home phone contacts for EMTs and paramedics across career, part-time, and volunteer EMS assignments are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your training and staffing outreach teams reach only legally contactable EMS professionals." },
    ],
  },

  "health-therapy/radiologic-technicians": {
    intro: "Radiologic technologist contact data reaches RT(R)s and specialized imaging professionals across hospital and outpatient radiology settings. Lorann's compliance framework ensures your CE, device, and staffing outreach to imaging professionals is registry-verified and lawfully delivered.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Radiologic Technologist Contact Data — No Imaging or Patient Records", desc: "Radiologic technologist lists include ARRT certification modality, state license status, practice setting, and direct professional contact information. No patient imaging orders, radiology report data, contrast administration records, or radiation dose logs are included in any RT marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Radiologic Technologist Privacy Compliance", desc: "California-licensed radiologic technologists — including CRTs, MRT(R)s, and nuclear medicine technologists — are validated against CCPA opt-out databases before every delivery. Imaging professionals at multi-site radiology groups with California locations are evaluated under the state's privacy requirements before list release." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Radiologic Technologist Email — CAN-SPAM Ready",       desc: "Email addresses for RT(R)s across diagnostic radiology, CT, MRI, mammography, and interventional settings are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from imaging professional contacts are suppressed in real time and excluded from all future CE, device, and staffing outreach." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Imaging CE and Device Marketing — Not ARRT Verification", desc: "Radiologic technologist data is supplied for CE provider marketing, imaging equipment sales, and staffing outreach — not for ARRT certification verification, state radiologic board investigations, or employment background screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Radiologic Technologist Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for radiologic technologists across hospital radiology, urgent care imaging, and outpatient imaging centers are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound teams connect only with legally contactable imaging professionals." },
    ],
  },

  "health-therapy/dieticians-nutritionists": {
    intro: "Registered dietitian and nutritionist contact data spans clinical, community, and corporate wellness settings. Lorann's compliance framework ensures your CE, product, and technology outreach to RDs and LDNs is delivered lawfully, in compliance with applicable privacy statutes and registry requirements.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "RD/LDN Professional Records — No Patient Nutrition or Dietary Data", desc: "Registered dietitian and nutritionist lists include CDR credentialing status, state licensure, employment setting, and professional contact information. No patient medical nutrition therapy records, dietary intake assessments, enteral or parenteral nutrition order data, or clinical outcome documentation is included in any RD marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California RD/Nutritionist Privacy Compliance",      desc: "California-licensed registered dietitians and nutritionists across hospital, outpatient, and public health settings are validated against CCPA opt-out requirements before every delivery. Telehealth dietitians with California clients are also evaluated against state privacy standards before any record is finalized for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Dietitian and Nutritionist Email — CAN-SPAM Validated", desc: "Email addresses for RDs and LDNs across clinical, school, corporate wellness, and food service settings are validated against CAN-SPAM requirements before list delivery. Opt-out requests from dietitian contacts are honored in real time and removed from all subsequent CE, product, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Product Marketing — Not Licensure or Background Review", desc: "Registered dietitian and nutritionist data is licensed for CE outreach, nutrition product marketing, and technology sales — not for CDR credential verification, state dietetics board compliance review, or employment eligibility screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Dietitian Phone Records DNC-Registry Scrubbed",      desc: "Office and mobile phone numbers for registered dietitians and nutritionists across hospitals, outpatient clinics, and community nutrition programs are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and product outreach teams connect only with legally contactable RD professionals." },
    ],
  },

  "behavioral-mental-health/psychologists": {
    intro: "Licensed psychologist contact data requires sensitivity to the specialized regulatory environment surrounding psychological practice. Lorann's compliance framework is built to support lawful B2B outreach to doctoral-level psychologists without touching any clinically sensitive information.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Psychologist Professional Contact Data — No Patient or Assessment Records", desc: "Licensed psychologist lists contain doctoral credential type, state license number, practice setting, and direct professional contact information. No patient psychological evaluation records, assessment instrument scores, DSM diagnoses, therapy session notes, or forensic report data are included in any psychologist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Psychologist Privacy Compliance",         desc: "California-licensed psychologists — including those in independent practice, hospital employment, and forensic settings — are validated against CCPA opt-out databases before every delivery. Telehealth-active psychologists serving California clients are evaluated against the state's privacy requirements before any record is included in a finalized outreach file." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Licensed Psychologist Email — CAN-SPAM Validated",    desc: "Email addresses for PhD and PsyD psychologists across clinical, neuropsychological, school, and forensic settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from psychologist contacts are suppressed in real time and removed from all subsequent CE, assessment, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Technology Marketing — Not Fitness or Credentialing Review", desc: "Psychologist data is licensed for B2B CE, assessment technology, and software marketing outreach — not for fitness-for-duty evaluations, licensing board investigations, or professional credentialing determinations. FCRA exemption documentation is available with every psychologist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Psychologist Phone Records DNC-Compliant",           desc: "Office and mobile contacts for licensed psychologists across private practice, hospital, and academic settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and technology teams reach only legally contactable psychologist professionals." },
    ],
  },

  "behavioral-mental-health/psychiatrists": {
    intro: "Psychiatrist contact data reaches board-certified physician specialists at the intersection of medicine and mental health. Lorann's compliance framework ensures every pharmaceutical, technology, and CE outreach campaign targeting psychiatrists is lawfully structured, registry-verified, and PHI-free.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Psychiatrist Contact Data — No Clinical or Medication Records", desc: "Psychiatrist marketing lists contain board certification specialty, NPI number, practice affiliation, and direct professional contact details only. No patient psychiatric diagnoses, medication management records, psychotherapy session data, involuntary commitment records, or clinical outcome data are captured or transferred in any psychiatrist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Psychiatrist Privacy Compliance",         desc: "California-licensed psychiatrists — including those in academic, community mental health, and correctional settings — are validated against CCPA opt-out requirements before every delivery. Telepsychiatry providers serving California patients are evaluated under state privacy standards before any contact record is finalized for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Psychiatrist Email — CAN-SPAM Validated",              desc: "Direct email addresses for board-certified psychiatrists across inpatient, outpatient, child and adolescent, geriatric, and forensic settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from psychiatrist contacts are honored in real time and removed from all subsequent pharmaceutical and CE outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Pharmaceutical Marketing Only — Not Credentialing or Review", desc: "Psychiatrist contact data is licensed for pharmaceutical marketing, CME, and technology outreach — not for DEA schedule review, hospital privilege investigations, or physician employment background screening. FCRA exemption documentation is provided with every psychiatrist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Psychiatrist Phone Records DNC-Scrubbed",            desc: "Office and direct phone contacts for psychiatrists across private practice, hospital, community mental health, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound pharmaceutical and CE teams connect only with legally contactable psychiatrist professionals." },
    ],
  },

  "behavioral-mental-health/mental-health-counselors": {
    intro: "Licensed mental health counselor contact data spans a broad range of outpatient, community, and telehealth settings. Lorann's compliance framework keeps your CE, software, and platform outreach to LMHCs, LPCs, and LADCs lawfully structured and registry-verified at delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "LMHC/LPC Contact Data — No Client or Session Records", desc: "Licensed mental health counselor lists include credential level, state license number, practice setting, and professional contact details. No client session records, treatment plan data, DSM diagnoses, crisis intervention records, or mental health court involvement data are included in any LMHC or LPC marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California LMHC/LPC Privacy Compliance",             desc: "California-licensed professional counselors and mental health practitioners are validated against CCPA opt-out databases before every delivery. Telehealth counselors serving California clients through multi-state platforms are evaluated under California's privacy requirements before any contact record is finalized for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Mental Health Counselor Email — CAN-SPAM Ready",       desc: "Email addresses for LMHCs, LPCs, LCADCs, and LADCs across outpatient, community mental health, school-based, and telehealth settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from counselor contacts are suppressed in real time and excluded from all future CE, platform, and software outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Platform Marketing — Not Licensure Fitness Review", desc: "Mental health counselor data is licensed for CE provider outreach, EHR platform marketing, and software sales — not for state counseling board complaint investigations, professional fitness-for-duty assessments, or employment background screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Mental Health Counselor Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for licensed mental health counselors across outpatient, community, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and platform outbound teams reach only legally contactable counselor professionals." },
    ],
  },

  "behavioral-mental-health/social-workers": {
    intro: "Licensed clinical social worker contact data covers a large and diverse behavioral health workforce across hospitals, schools, community agencies, and private practice. Lorann's compliance framework ensures your CE, technology, and policy outreach to LCSWs and MSWs is lawfully structured and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "LCSW/MSW Contact Data — No Case or Client Records",  desc: "Licensed clinical social worker lists include NASW membership status where applicable, state clinical license level, employment setting, and professional contact information. No client case records, protective service involvement data, court-ordered treatment records, or mental health crisis documentation are included in any social worker marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California LCSW Privacy Compliance",                 desc: "California-licensed clinical social workers in hospital, school, county mental health, and private practice settings are validated against CCPA opt-out databases before every delivery. Telehealth LCSWs serving California clients through multi-state platforms are evaluated against state privacy requirements before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Licensed Social Worker Email — CAN-SPAM Validated",   desc: "Email addresses for LCSWs, MSWs, and clinical social work associates across child welfare, hospital, school, and outpatient settings are validated against CAN-SPAM requirements before delivery. Opt-out and unsubscribe requests from social worker contacts are suppressed in real time and removed from all subsequent CE, EHR, and platform outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Technology Marketing — Not Background or Fitness Review", desc: "Social worker contact data is licensed for CE, EHR technology, and platform marketing outreach — not for NASW ethics investigation reference checks, state licensure board fitness reviews, or employment background screening. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Social Worker Phone Records DNC-Compliant",          desc: "Office and mobile phone numbers for licensed clinical social workers across hospital, community, and outpatient settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and technology outreach teams connect only with legally contactable LCSW professionals." },
    ],
  },

  "behavioral-mental-health/marriage-family-therapists": {
    intro: "Licensed marriage and family therapist contact data serves a growing telehealth and outpatient behavioral health professional segment. Lorann's compliance framework ensures your CE, platform, and product outreach to LMFTs is lawfully structured, privacy-statute compliant, and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "LMFT Professional Contact Data — No Session or Couple Records", desc: "Licensed marriage and family therapist lists contain state license status, practice setting type, and professional contact information only. No couples therapy records, family systems case data, genograms, session progress notes, or court-referred treatment documentation are included in any LMFT marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California LMFT Privacy Compliance",                 desc: "California-licensed marriage and family therapists — one of the largest MFT licensure populations in the US — are validated against CCPA opt-out requirements before every delivery. Telehealth LMFTs serving California clients are evaluated under the state's privacy standards before any contact record is finalized for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Licensed MFT Email — CAN-SPAM Validated",             desc: "Email addresses for LMFTs and associate MFTs across private practice, community mental health, telehealth, and school-based settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from LMFT contacts are honored in real time and excluded from all subsequent CE, platform, and assessment outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Platform Marketing — Not Licensure Review",   desc: "LMFT contact data is licensed for CE provider, EHR platform, and teletherapy technology marketing outreach — not for BBS license status investigations, professional fitness determinations, or employment background screening. FCRA exemption documentation is available upon request for any CE or platform provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "LMFT Phone Records DNC-Registry Compliant",          desc: "Office and mobile contacts for licensed marriage and family therapists across private practice, group practice, and telehealth settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound CE and platform teams reach only legally contactable LMFT professionals." },
    ],
  },

  "dental-vision/dentists": {
    intro: "General and specialty dentist contact data reaches DDS and DMD professionals across solo, group, and DSO-affiliated practices. Lorann's compliance framework ensures every supply, technology, and staffing outreach campaign targeting dentists is legally sound and registry-verified at delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Dentist Contact Data — No Patient Treatment or Chart Records", desc: "Dentist and dental practice marketing lists include NPI number, specialty classification, practice size, and direct professional contact details. No patient dental charts, radiograph data, periodontal health records, treatment planning notes, or insurance claim histories are included in any dentist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Dentist Privacy Compliance",               desc: "California-licensed DDS and DMD dentists — including specialists in orthodontics, oral surgery, and periodontics — are validated against CCPA opt-out databases before every delivery. DSO-affiliated multi-location practices with California offices are scrubbed under California's privacy standards regardless of DSO corporate headquarters location." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Dentist Direct Email — CAN-SPAM Validated",            desc: "Email addresses for general dentists, orthodontists, oral surgeons, endodontists, and periodontists are validated against CAN-SPAM requirements before list delivery. Opt-out and unsubscribe requests from dentist contacts are honored in real time and applied across all subsequent supply, equipment, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Dental Supply and Equipment Marketing — Not License Screening", desc: "Dentist contact data is licensed for B2B dental supply, equipment, and technology marketing — not for dental board license verification, malpractice insurance underwriting, or DSO acquisition due diligence. FCRA exemption documentation is provided with every dentist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Dentist Practice Phone Numbers DNC-Scrubbed",        desc: "Office phone numbers and dentist direct lines across solo, group, and DSO practices are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Specialty dental practice contacts are held to the same registry standards as general dentist phone records before outbound contact is initiated." },
    ],
  },

  "dental-vision/dental-hygienists": {
    intro: "Registered dental hygienist contact data reaches RDHs across dental offices, public health programs, and school-based dental settings. Lorann's compliance framework ensures your CE, supply, and recruitment outreach to dental hygiene professionals is registry-verified and lawfully delivered.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "RDH Professional Contact Data — No Patient Perio or Clinical Records", desc: "Dental hygienist lists contain state license status, RDH certification, employment setting, and professional contact information only. No patient periodontal charting, X-ray interpretation data, treatment notes, or patient oral health history records are included in any dental hygienist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California RDH Privacy Compliance",                  desc: "California-licensed registered dental hygienists — including those in independent and alternative practice settings — are validated against CCPA opt-out requirements before every delivery. RDHs in California school-based and community dental health programs are also evaluated against the state's privacy standards before any contact record is released." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Dental Hygienist Email — CAN-SPAM Ready",              desc: "Email addresses for RDHs across private dental practices, public health clinics, and hospital-based dental settings are validated against CAN-SPAM requirements before list delivery. Opt-out requests from dental hygienist contacts are honored in real time and removed from all subsequent CE, supply, and recruitment campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Supply Marketing — Not State Board Review",   desc: "Dental hygienist data is licensed for CE provider outreach, dental supply marketing, and recruiting campaigns — not for state dental hygiene board complaint review, license verification, or employment eligibility screening. FCRA exemption documentation is available upon request for any CE or staffing provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "RDH Phone Records DNC-Compliant",                    desc: "Office and mobile contacts for registered dental hygienists across dental practices, community programs, and school-based settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and supply outreach teams connect only with legally contactable RDH professionals." },
    ],
  },

  "dental-vision/dental-assistants": {
    intro: "Dental assistant contact data serves a large chairside clinical support workforce across every dental practice setting. Lorann's compliance framework ensures your training, supply, and recruitment outreach to CDA-certified and registered dental assistants is delivered cleanly and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Dental Assistant Contact Data — No Patient Procedure or Chart Records", desc: "Dental assistant lists include certification status, CDA or RDA credential type, employment setting, and professional contact information. No patient procedure records, dental X-ray exposure data, treatment coordination notes, or practice management software access logs are included in any dental assistant marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California RDA Privacy Compliance",                  desc: "California-registered dental assistants (RDAs) are validated against CCPA opt-out requirements before every delivery. Expanded function dental assistants (EFDAs) and orthodontic assistants in California practices are also scrubbed against the state's privacy statutes before any contact record is included in a finalized outreach file." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Dental Assistant Email — CAN-SPAM Validated",         desc: "Email addresses for CDAs, RDAs, and uncertified dental assistants across solo and group dental practices are validated against CAN-SPAM requirements before list delivery. Unsubscribe requests from dental assistant contacts are honored in real time and excluded from all subsequent training, recruitment, and supply outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Training and Staffing Marketing — Not Certification Verification", desc: "Dental assistant contact data is licensed for dental training program outreach, supply marketing, and staffing agency campaigns — not for DANB certification verification, state dental board registration screening, or employment background investigations. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Dental Assistant Phone Records DNC-Registry Scrubbed", desc: "Mobile and office phone numbers for dental assistants across general, specialty, and orthodontic practices are scrubbed against the National DNC Registry before delivery. Your training program and staffing outreach teams reach only legally contactable dental assistant professionals." },
    ],
  },

  "dental-vision/optometrists": {
    intro: "Optometrist contact data reaches ODs across private practice, retail optical, and managed vision care settings. Lorann's compliance framework ensures your product, CE, and technology outreach to optometrists is structured for lawful B2B delivery and fully registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "OD Contact Data — No Patient Exam or Prescription Records", desc: "Optometrist lists include NPI number, practice type, state license status, and direct professional contact details. No patient ocular health records, refractive error prescriptions, retinal imaging data, or contact lens fitting records are included in any optometrist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Optometrist Privacy Compliance",          desc: "California-licensed optometrists across private practice, vision therapy, and corporate optical settings are validated against CCPA opt-out databases before every delivery. ODs at multi-location retail optical groups with California stores are scrubbed against state privacy requirements regardless of the organization's corporate domicile." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Optometrist Direct Email — CAN-SPAM Ready",            desc: "Email addresses for ODs across primary eye care, low vision, sports vision, and therapeutic optometry settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from optometrist contacts are honored in real time and applied to all subsequent CE, product, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Optical and CE Marketing — Not License or Board Review", desc: "Optometrist data is licensed for B2B optical product, CE provider, and technology marketing — not for state optometry board license verification, therapeutic certification audits, or employment background screening. FCRA exemption documentation is provided with every optometrist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Optometrist Office and Mobile Phone DNC-Scrubbed",   desc: "Practice phone lines and OD mobile contacts across private practice, retail optical, and hospital-based eye clinics are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your optical product and CE outreach teams reach only legally contactable optometrist professionals." },
    ],
  },

  "dental-vision/opticians": {
    intro: "Licensed optician contact data reaches ABO-certified and state-licensed eyewear professionals across independent dispensaries, retail optical chains, and ophthalmology practices. Lorann's compliance framework keeps your lens product, CE, and technology outreach to opticians lawfully structured and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Optician Professional Records — No Patient Dispensing Data", desc: "Licensed optician lists include ABO/NCLE certification status, state license type, employment setting, and professional contact information. No patient eyewear orders, pupillary distance records, lens fabrication data, or frame selection histories are included in any optician marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Optician Privacy Compliance",             desc: "California-licensed and ABO-certified opticians across independent dispensaries and retail optical chains are validated against CCPA opt-out requirements before every delivery. Opticians working for multi-state optical groups with California retail locations are evaluated under California's privacy statute before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Optician Email — CAN-SPAM Validated",                  desc: "Email addresses for ABO-certified opticians, dispensing opticians, and contact lens fitters across optical retail and clinical settings are validated against CAN-SPAM requirements before delivery. Unsubscribe requests from optician contacts are suppressed in real time and excluded from all subsequent CE, product, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Lens and CE Marketing — Not Board Licensing Review",  desc: "Optician contact data is licensed for lens product marketing, frame line sales outreach, and CE campaigns — not for ABO certification verification, state optical board license screening, or employment background investigations. FCRA exemption documentation is available upon request." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Optician Phone Records DNC-Compliant",               desc: "Office and mobile contacts for licensed opticians across independent and retail optical settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your lens product and CE outreach teams connect only with legally contactable optician professionals." },
    ],
  },

  "pharmacy-practice-management/pharmacists": {
    intro: "Pharmacist contact data serves a clinically licensed and federally regulated professional workforce. Lorann's compliance framework is built to navigate the intersection of pharmacy law and data privacy, ensuring your drug marketing, PBM, and CE outreach is delivered lawfully and registry-verified.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Pharmacist Contact Data — No Rx or Dispensing Records", desc: "Pharmacist marketing lists include PharmD or RPh credential status, DEA registration flag, practice setting, and professional contact information. No patient prescription records, dispensing volume metrics, medication therapy management session data, or MTM billing records are included in any pharmacist marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Pharmacist Privacy Compliance",           desc: "California-licensed pharmacists — including those at chain, independent, and compounding pharmacies — are validated against CCPA opt-out databases before every delivery. Pharmacists employed by multi-state pharmacy networks with California retail or specialty locations are scrubbed against California's privacy standards before any record is finalized." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Pharmacist Direct Email — CAN-SPAM Ready",             desc: "Email addresses for PharmD and RPh pharmacists across retail, hospital, clinical, mail-order, and specialty pharmacy settings are validated against CAN-SPAM requirements before delivery. Opt-out requests from pharmacist contacts are honored in real time and applied across all subsequent pharmaceutical marketing, PBM, and CE outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Drug and CE Marketing — Not DEA or Licensure Review", desc: "Pharmacist contact data is licensed for pharmaceutical marketing, PBM outreach, and CE provider campaigns — not for DEA registration compliance investigations, state pharmacy board disciplinary reviews, or background employment screening. FCRA exemption documentation is provided with every pharmacist data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Pharmacist Office and Mobile Phone DNC-Scrubbed",    desc: "Store phone numbers and pharmacist mobile contacts across retail, hospital, specialty, and independent pharmacy settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your pharmaceutical and CE outbound teams reach only legally contactable pharmacist professionals." },
    ],
  },

  "pharmacy-practice-management/physician-practice-managers": {
    intro: "Physician practice manager contact data reaches non-clinical administrators responsible for operational, financial, and compliance functions in medical practices. Lorann's compliance framework ensures your technology, billing, and advisory outreach to practice managers is structured for lawful B2B delivery.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Practice Manager Contact Data — No Patient Financial or Claims Data", desc: "Physician practice manager lists include job title, practice type, specialty setting, and professional contact information. No patient billing records, claims adjudication data, EOB files, or revenue cycle performance metrics derived from PHI billing activity are included in any practice manager marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Practice Manager Privacy Compliance",     desc: "Practice managers and office administrators at California-based physician practices — including solo, multi-specialty group, and FQHC settings — are validated against CCPA opt-out requirements before every delivery. Multi-state medical group administrators with California offices are evaluated under California's privacy statute before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Practice Manager Email — CAN-SPAM Validated",         desc: "Email addresses for physician practice managers, office administrators, and billing directors across primary care, specialty, and surgical practices are validated against CAN-SPAM requirements before delivery. Opt-out requests from practice manager contacts are honored in real time and excluded from all future RCM, EHR, and advisory outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Practice Operations Marketing — Not Financial Screening", desc: "Physician practice manager data is licensed for B2B billing technology, RCM platform, and advisory marketing — not for practice credit evaluations, malpractice insurance underwriting, or employment background investigations. FCRA exemption documentation is provided upon request for any technology or advisory firm." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Practice Manager Phone Records DNC-Registry Compliant", desc: "Direct office lines and mobile contacts for physician practice managers across all practice sizes and specialties are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your RCM and technology outbound teams reach only legally contactable practice manager professionals." },
    ],
  },

  "specialty-other/chiropractors": {
    intro: "Chiropractor contact data reaches DCs across solo, group, and multi-disciplinary integrative health settings. Lorann's compliance framework ensures your supply, CE, and technology outreach to chiropractic professionals is lawfully structured, registry-verified, and PHI-free.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "DC Contact Data — No Patient Adjustment or Clinical Records", desc: "Chiropractor marketing lists contain state license status, specialization flags (sports, pediatric, rehab), practice setting, and direct professional contact information. No patient spinal adjustment records, X-ray interpretations, nerve conduction data, or treatment outcome documentation are included in any chiropractic marketing file." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California Chiropractor Privacy Compliance",         desc: "California-licensed doctors of chiropractic across solo, sports, and integrative practice settings are validated against CCPA opt-out databases before every delivery. Multi-location chiropractic franchises and spinal decompression chains with California offices are scrubbed under state privacy requirements before any record is released for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Chiropractor Email — CAN-SPAM Validated",              desc: "Email addresses for DCs across chiropractic clinics, sports medicine practices, and multi-disciplinary wellness centers are validated against CAN-SPAM requirements before list delivery. Opt-out requests from chiropractor contacts are honored in real time and applied to all subsequent supply, CE, and technology outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Chiropractic Supply and CE Marketing — Not Board Review", desc: "Chiropractor contact data is licensed for B2B supply, equipment, and CE marketing outreach — not for chiropractic board license verification, malpractice history investigation, or employment background screening. FCRA exemption documentation is provided with every chiropractic data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Chiropractor Practice Phone Records DNC-Scrubbed",   desc: "Office lines and DC mobile contacts across solo and group chiropractic practices are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your supply and CE outreach teams reach only legally contactable chiropractic professionals." },
    ],
  },

  "specialty-other/veterinarians": {
    intro: "Veterinarian contact data spans companion animal, equine, livestock, and exotic species practice settings. Lorann's compliance framework ensures your pharmaceutical, device, and CE outreach to DVMs and VMDs is lawfully structured, registry-verified, and free of any patient or client records.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "DVM Contact Data — No Patient or Client Records",    desc: "Veterinarian marketing lists include state license status, species and practice specialty, AVMA membership flag, and professional contact information. No patient animal records, diagnosis histories, prescription dispensing records, or controlled substance logs are included in any veterinarian marketing file. Veterinary practice data operates entirely outside HIPAA's regulatory scope." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "California DVM Privacy Compliance",                  desc: "California-licensed veterinarians — across companion animal, equine, bovine, and exotic species practices — are validated against CCPA opt-out requirements before every delivery. Corporate-owned multi-location veterinary groups with California clinics are scrubbed under California's privacy standards before any DVM record is finalized for outreach." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Veterinarian Direct Email — CAN-SPAM Ready",           desc: "Email addresses for DVMs and VMDs across small animal hospitals, equine practices, large animal facilities, and mobile veterinary units are validated against CAN-SPAM requirements before delivery. Opt-out requests from veterinarian contacts are honored in real time and excluded from all subsequent pharmaceutical, device, and CE outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "Veterinary Marketing — Not License or DEA Review",   desc: "Veterinarian contact data is licensed for pharmaceutical, device, and CE marketing outreach — not for DEA veterinary controlled substance registration review, state veterinary board license investigations, or employment eligibility screening. FCRA exemption documentation is available upon request for any veterinary marketing provider." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Veterinarian Practice Phone Records DNC-Scrubbed",   desc: "Office lines and DVM mobile contacts across companion animal hospitals, mobile practices, and large animal facilities are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your outbound pharmaceutical and CE teams reach only legally contactable veterinarian professionals." },
    ],
  },

  "specialty-other/allied-healthcare-professionals": {
    intro: "Allied healthcare professional contact data spans a broad range of clinical support disciplines — from medical laboratory scientists to polysomnographic technologists. Lorann's compliance framework applies consistent, rigorous governance standards across every allied health credential type covered in this data set.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Allied Health Contact Data — No Patient or Lab Records", desc: "Allied healthcare professional lists contain credential type, certifying body, employment setting, and professional contact information only. No patient lab results, diagnostic test records, imaging interpretations, or clinical documentation of any kind are included in any allied health marketing file across any discipline covered." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "Multi-Credential State Privacy Compliance",          desc: "Allied health professionals licensed or certified in California — including medical laboratory scientists, polysomnographic technologists, surgical technologists, and health educators — are validated against CCPA opt-out databases before every delivery. Multi-discipline lists with California-credentialed professionals are evaluated under the state's privacy standards before list finalization." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Allied Health Professional Email — CAN-SPAM Validated", desc: "Email addresses for allied health professionals across all disciplines and care settings included in this data set are validated against federal CAN-SPAM requirements before delivery. Opt-out requests from allied health contacts are honored in real time and suppressed across all future CE, supply, and staffing outreach campaigns." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "CE and Staffing Marketing — Not Credentialing or Verification", desc: "Allied healthcare professional data is licensed for CE, staffing agency, and supply marketing outreach across all disciplines — not for professional certification body verification, clinical privilege reviews, or employment eligibility determinations. FCRA exemption documentation is available with every allied health data order." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Allied Health Professional Phone Records DNC-Compliant", desc: "Office and mobile phone numbers for allied healthcare professionals across all disciplines, credential levels, and care settings are scrubbed against the National DNC Registry and applicable state DNC lists before delivery. Your CE and staffing teams reach only legally contactable allied health professionals under current federal and state law." },
    ],
  },

  "default": {
    intro: "Healthcare marketing operates under strict regulatory requirements. Lorann's data governance framework is built to protect your campaigns, your brand, and the professionals you reach.",
    items: [
      { icon: ShieldCheck, badge: "HIPAA", color: COLORS.hipaa,   title: "Professional Contact Data — No PHI Included",      desc: "Every healthcare marketing list contains professional contact information only — names, credentials, practice addresses, and direct emails. No protected health information, patient records, or clinical data of any kind is captured, stored, or transferred with any Lorann delivery." },
      { icon: Lock,        badge: "CCPA",  color: COLORS.ccpa,    title: "State Privacy Law Validation at Delivery",          desc: "Records are validated against California Consumer Privacy Act requirements and applicable state-level privacy statutes before every list is delivered. Opt-out and suppression requests are honored and applied within 24 hours of receipt across all active data feeds." },
      { icon: Mail,        badge: "CAN-SPAM", color: COLORS.canspam, title: "Email Lists Delivered CAN-SPAM Compliant",          desc: "All email addresses are validated against federal CAN-SPAM requirements. Unsubscribe and opt-out data is maintained in real time. Your campaigns launch with a legally defensible contact list that reflects current suppression status at the time of delivery." },
      { icon: Scale,       badge: "FCRA",  color: COLORS.fcra,    title: "B2B Marketing Data — FCRA Exemption Documented",    desc: "Data is supplied exclusively for B2B marketing and outreach purposes — never for consumer credit decisions, employment screening, or tenant evaluation. FCRA exemption compliance is documented and available to your legal team upon request for any data product." },
      { icon: PhoneOff,    badge: "DNC",   color: COLORS.dnc,     title: "Phone Records Scrubbed Against DNC Registry",       desc: "All phone records are scrubbed against the National Do Not Call Registry before delivery. Applicable state-level DNC lists are applied in addition to the federal registry. Your outbound team receives only contactable prospects under current federal and state law." },
    ],
  },
};



const BADGE_ICON: Record<string, LucideIcon> = {
  HIPAA: ShieldCheck,
  CCPA: Lock,
  "CAN-SPAM": Mail,
  FCRA: Scale,
  DNC: PhoneOff,
};

const BADGE_COLOR: Record<string, string> = {
  HIPAA: COLORS.hipaa,
  CCPA: COLORS.ccpa,
  "CAN-SPAM": COLORS.canspam,
  FCRA: COLORS.fcra,
  DNC: COLORS.dnc,
};

type SanityComplianceData = {
  intro?: any;
  introRich?: any;
  items?: { badge?: string; title?: string; desc?: string }[];
} | null | undefined;

/* Returns "hub" for hub pages, "hub/sub" for inner pages */
function getPageKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  const hub = slugParts[idx + 1] || "default";
  const sub = slugParts[idx + 2];
  return sub ? `${hub}/${sub}` : hub;
}

export default function HealthcareComplianceSection({
  slugParts,
  sanityData,
}: {
  slugParts: string[];
  sanityData?: SanityComplianceData;
}) {
  const key = getPageKey(slugParts);
  const hubKey = key.split("/")[0];

  let intro: any;
  let items: ComplianceItem[];

  if (HUB_COMPLIANCE[key]) {
    const entry = HUB_COMPLIANCE[key];
    intro = entry.intro;
    items = entry.items;
  } else if (sanityData?.items && sanityData.items.length > 0) {
    intro = sanityData.introRich ?? sanityData.intro ?? "";
    items = sanityData.items.map((it) => {
      const badge = it.badge ?? "HIPAA";
      return {
        icon: BADGE_ICON[badge] ?? ShieldCheck,
        badge,
        title: it.title ?? "",
        desc: it.desc ?? "",
        color: BADGE_COLOR[badge] ?? COLORS.hipaa,
      };
    });
  } else {
    const entry = HUB_COMPLIANCE[hubKey] ?? HUB_COMPLIANCE["default"];
    intro = entry.intro;
    items = entry.items;
  }

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1D45D9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container-custom relative">
        <div className="max-w-6xl mx-auto">

          {/* Top label */}
          <div className="flex items-center gap-2 mb-4 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              Data Compliance
            </span>
          </div>

          {/* Split header */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 items-start mb-10 lg:mb-14 reveal">
            <div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-slate-900">
                Compliance is built in,{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#1736B3 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  not bolted on.
                </span>
              </h2>
            </div>
            <div className="text-slate-600 text-[16px] lg:text-[17px] leading-[1.8] lg:pt-2">
              {Array.isArray(intro) ? <RichText value={intro} /> : intro}
            </div>
          </div>

          {/* 2-cards-per-row compliance grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {items.map(({ icon: Icon, badge, title, desc, color }) => (
              <div
                key={badge}
                className="reveal group flex gap-4 p-5 lg:p-6 rounded-2xl bg-white border border-slate-150 hover:border-blue-200 hover:shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)] transition-all duration-400"
              >
                {/* Icon */}
                <div className="flex-shrink-0 pt-0.5">
                  <div
                    className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                      border: `1px solid ${color}33`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                      style={{ background: `${color}18`, color }}
                    >
                      {badge}
                    </span>
                    <h3 className="font-display font-semibold text-[14px] lg:text-[15px] text-slate-900 tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <p className="text-slate-600 text-[13px] lg:text-[13.5px] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer strip */}
          <div
            className="reveal mt-5 rounded-2xl px-5 py-4 flex items-start gap-3"
            style={{
              background: "linear-gradient(135deg,#E4EDFF,#F0F5FF)",
              border: "1px solid #CDDCFE",
            }}
          >
            <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <p className="text-slate-700 text-[12.5px] lg:text-[13px] leading-relaxed">
              <strong className="text-slate-900">
                All data is supplied for B2B marketing purposes only.
              </strong>{" "}
              Lorann does not provide consumer credit data, background screening data, or any
              data subject to FCRA consumer-protection provisions. Licensing documentation
              available upon request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
