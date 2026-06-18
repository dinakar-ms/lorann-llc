import Image from "next/image";
import { ShieldCheck, Lock, Mail, Scale, PhoneOff } from "lucide-react";

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

const COMPLIANCE_BADGES = ["HIPAA", "CCPA", "CAN-SPAM", "FCRA", "DNC"];

/* Unique photo per hub — no repeating images across pages */
const COMPLIANCE_PHOTOS: Record<string, string> = {
  "physicians-advanced-practice":  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals":         "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers":      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  "health-therapy":                "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health":      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
  "dental-vision":                 "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
  "pharmacy-practice-management":  "https://images.unsplash.com/photo-1585671773819-bc87fcaa99ae?auto=format&fit=crop&w=900&q=80",
  "specialty-other":               "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",
  "default":                       "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80",
};

function getHubKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  return slugParts[idx + 1] || "default";
}

export default function HealthcareComplianceSection({ slugParts }: { slugParts: string[] }) {
  const key = getHubKey(slugParts);
  const photo = COMPLIANCE_PHOTOS[key] ?? COMPLIANCE_PHOTOS["default"];
  const { intro, items } = HUB_COMPLIANCE[key] ?? HUB_COMPLIANCE["default"];

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
            <p className="text-slate-600 text-[16px] lg:text-[17px] leading-[1.8] lg:pt-2">{intro}</p>
          </div>

          {/* Two-column: photo left (stretches to match content height) + items right */}
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-14">

            {/* ── Photo column — stretches to match content column height ── */}
            <div className="reveal order-2 lg:order-1 flex flex-col">
              <div className="relative flex-1 min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photo}
                  alt="Healthcare compliance professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,15,36,0.88) 0%, rgba(8,15,36,0.25) 50%, transparent 100%)",
                  }}
                />

                {/* Top badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(29,69,217,0.88)",
                    border: "1px solid rgba(99,179,237,0.4)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span className="font-mono text-[10px] font-bold text-white tracking-[0.14em] uppercase">
                    B2B Marketing Only
                  </span>
                </div>

                {/* Bottom glass card */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.93)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 8px 32px rgba(29,69,217,0.12)",
                  }}
                >
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-2.5">
                    5 Active Compliance Frameworks
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMPLIANCE_BADGES.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(29,69,217,0.08)",
                          color: "#1D45D9",
                          border: "1px solid rgba(29,69,217,0.18)",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Compliance items (unique per hub) ── */}
            <div className="order-1 lg:order-2 space-y-3">
              {items.map(({ icon: Icon, badge, title, desc, color }, i) => (
                <div
                  key={badge}
                  className="reveal group flex gap-4 p-4 lg:p-5 rounded-2xl bg-white border border-slate-150 hover:border-blue-200 hover:shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)] transition-all duration-400"
                >
                  {/* Left accent + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <div
                      className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                        border: `1px solid ${color}33`,
                      }}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" style={{ color }} />
                    </div>
                    {i < items.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[16px]"
                        style={{ background: "linear-gradient(180deg,#D6E2F5,transparent)" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
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

              {/* Disclaimer strip */}
              <div
                className="reveal rounded-2xl px-5 py-4 flex items-start gap-3"
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
        </div>
      </div>
    </section>
  );
}
