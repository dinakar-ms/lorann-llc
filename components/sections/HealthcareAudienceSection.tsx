import Link from "next/link";
import {
  FlaskConical, BookOpen, Newspaper, Briefcase, Users, GraduationCap,
  HeartPulse, Cpu, Building2, ShoppingCart, Stethoscope, Phone,
  Globe, FileText, PawPrint, ChevronRight, type LucideIcon,
} from "lucide-react";

type Persona = {
  icon: LucideIcon;
  gradient: string;
  role: string;
  industry: string;
  desc: string;
};

const PERSONAS: Record<string, Persona[]> = {
  "physicians-advanced-practice": [
    { icon: FlaskConical, gradient: "from-blue-600 to-cyan-500",  role: "Pharmaceutical Sales Teams",     industry: "Life Sciences",        desc: "Drug detailing reps use physician data to build territory call lists, prioritize high-prescribers, and deliver targeted sample campaigns to the right NPI-verified contacts." },
    { icon: Briefcase,   gradient: "from-blue-700 to-blue-500",  role: "Medical Device Manufacturers",   industry: "MedTech",              desc: "Device reps need to reach procedure-performing physicians. Specialty and hospital-privilege filters deliver the surgeons, interventionalists, and specialists who actually use your product." },
    { icon: BookOpen,    gradient: "from-cyan-600 to-blue-600",  role: "CME & Education Providers",      industry: "Medical Education",    desc: "Accredited CME organizations promote live events, online modules, and journal supplements directly to licensed physicians nearing renewal periods in their specialty." },
    { icon: Newspaper,   gradient: "from-blue-800 to-cyan-600",  role: "Medical Publishers & Journals",  industry: "Healthcare Media",     desc: "Medical journals and clinical publications reach physician subscribers, advertisers, and editorial board candidates with targeted direct mail and email campaigns." },
  ],
  "nursing-professionals": [
    { icon: Users,         gradient: "from-blue-600 to-cyan-500",  role: "Healthcare Staffing Agencies",  industry: "Workforce Solutions",  desc: "Staffing firms recruit RNs, LPNs, and travel nurses at scale. License-type and specialty-unit filters deliver exactly the credentialed nurses your open positions require." },
    { icon: ShoppingCart,  gradient: "from-blue-700 to-blue-500",  role: "Medical Equipment Suppliers",   industry: "Healthcare Supply",    desc: "Nurses influence unit-level purchasing of wound care, IV therapy, and monitoring supplies. Reach the clinicians who specify and order at the bedside, not just the buyer." },
    { icon: GraduationCap, gradient: "from-cyan-600 to-blue-600",  role: "Nursing Education Programs",   industry: "Higher Education",     desc: "BSN, MSN, and nurse practitioner programs recruit working nurses seeking advancement. Target by credential type, years of experience, and geographic market." },
    { icon: HeartPulse,    gradient: "from-blue-800 to-cyan-600",  role: "Home Health & Hospice Agencies",industry: "Home-Based Care",      desc: "Home health organizations recruit experienced nurses for patient-facing roles. Setting filters identify nurses already working in home, hospice, or long-term care environments." },
  ],
  "hospital-decision-makers": [
    { icon: FlaskConical,  gradient: "from-blue-600 to-cyan-500",  role: "Medical Device Companies",      industry: "MedTech & Capital",    desc: "Capital equipment sales teams reach CFOs and materials managers controlling million-dollar budgets. Facility-tier filters identify the right account size for your product's price point." },
    { icon: Cpu,           gradient: "from-blue-700 to-blue-500",  role: "Healthcare IT Vendors",         industry: "Health Tech",          desc: "EHR, RCM, and clinical analytics platforms target CIOs and CMIOs actively evaluating or replacing technology. Current-platform flags refine your prospect list to high-intent accounts." },
    { icon: Briefcase,     gradient: "from-cyan-600 to-blue-600",  role: "Healthcare Consulting Firms",   industry: "Advisory Services",    desc: "Strategy consultants and advisory firms engage hospital CEOs and COOs on margin improvement, workforce strategy, and system consolidation. Title and health-system size filters target ideal accounts." },
    { icon: Building2,     gradient: "from-blue-800 to-cyan-600",  role: "Pharmaceutical Companies",     industry: "Life Sciences",        desc: "Pharma field teams reach CMOs and pharmacy directors who influence formulary placement and clinical protocol adoption. Medical director flags identify the highest-authority contacts." },
  ],
  "health-therapy": [
    { icon: ShoppingCart,  gradient: "from-blue-600 to-cyan-500",  role: "Therapy Equipment Manufacturers",industry: "Rehab & Durable MedEquip", desc: "PTs, OTs, and SLPs specify clinical equipment at the practice level. Therapy-type and practice-setting filters reach the clinicians who write the equipment orders." },
    { icon: Users,         gradient: "from-blue-700 to-blue-500",  role: "Healthcare Staffing Firms",     industry: "Therapy Workforce",    desc: "Contract therapy staffing organizations place PTs, OTs, and SLPs in hospitals, SNFs, and schools. Credential and setting filters deliver candidates who match your open positions." },
    { icon: GraduationCap, gradient: "from-cyan-600 to-blue-600",  role: "CE & Certification Providers",  industry: "Professional Education",desc: "Accredited CE organizations promote therapy-specific continuing education to license-renewal candidates. Renewal-date filters deliver the highest-intent, most time-sensitive audience segment." },
    { icon: FileText,      gradient: "from-blue-800 to-cyan-600",  role: "Medical Billing Companies",     industry: "RCM & Practice Admin",  desc: "Revenue cycle management firms and billing services target outpatient therapy practice managers. Private-practice and multi-location flags identify the highest-value billing prospects." },
  ],
  "behavioral-mental-health": [
    { icon: Globe,         gradient: "from-blue-600 to-cyan-500",  role: "Telehealth & Digital Platforms", industry: "Digital Health",       desc: "Virtual therapy platforms recruit licensed LCSWs, LMFTs, and psychologists for provider networks. Telehealth-active flags deliver clinicians already comfortable with virtual care delivery." },
    { icon: FlaskConical,  gradient: "from-blue-700 to-blue-500",  role: "Pharmaceutical Companies",      industry: "Psychiatry & CNS",     desc: "CNS-focused pharmaceutical reps reach psychiatrists and psychiatric nurse practitioners who prescribe antidepressants, antipsychotics, and mood-stabilizing medications." },
    { icon: Cpu,           gradient: "from-cyan-600 to-blue-600",  role: "EHR & Practice Management Vendors",industry: "Behavioral Health Tech",desc: "Behavioral health-specific EHR platforms target solo and group practices. Private-practice flags and patient-volume indicators identify the accounts most likely to convert to new software." },
    { icon: HeartPulse,    gradient: "from-blue-800 to-cyan-600",  role: "Mental Health Organizations",   industry: "Advocacy & Nonprofit",  desc: "Behavioral health associations and nonprofits engage licensed clinicians for membership drives, continuing education sponsorship, and clinical advocacy initiatives." },
  ],
  "dental-vision": [
    { icon: ShoppingCart,  gradient: "from-blue-600 to-cyan-500",  role: "Dental Supply Companies",       industry: "Dental Supply & Distribution", desc: "Supply reps reach dentists and hygienists who specify consumables, handpieces, and small equipment at the practice level — before the purchasing order reaches the office manager." },
    { icon: Briefcase,     gradient: "from-blue-700 to-blue-500",  role: "Optical Equipment Manufacturers",industry: "Vision & Ophthalmic",  desc: "Optometrists and ophthalmologists specify diagnostic instruments and lens systems. Equipment-vintage flags identify practices due for capital technology upgrades." },
    { icon: FileText,      gradient: "from-cyan-600 to-blue-600",  role: "Dental Insurance Companies",    industry: "Dental Benefits",      desc: "Dental plans recruit general dentists and specialists into preferred provider networks. Credentialing and payor-panel data identifies which practices are currently in-network and which are targets." },
    { icon: Users,         gradient: "from-blue-800 to-cyan-600",  role: "Dental & Vision Staffing Firms",industry: "Healthcare Recruitment",desc: "Staffing firms place hygienists, dental assistants, and opticians in private and group practices. Credential and practice-size filters deliver the most relevant candidates for each open role." },
  ],
  "pharmacy-practice-management": [
    { icon: FlaskConical,  gradient: "from-blue-600 to-cyan-500",  role: "Pharmaceutical Manufacturers",  industry: "Drug Marketing",       desc: "Drug reps reach pharmacists who counsel patients at the point of dispensing. Practice-setting and dispensing-volume filters deliver the pharmacists with the highest patient-counseling impact." },
    { icon: Building2,     gradient: "from-blue-700 to-blue-500",  role: "Pharmacy Benefit Managers",     industry: "PBM & Managed Care",   desc: "PBMs recruit independent and chain pharmacy locations for preferred-network contracts. Pharmacy ownership and volume filters identify the highest-priority acquisition targets." },
    { icon: Cpu,           gradient: "from-cyan-600 to-blue-600",  role: "Pharmacy Software & Automation Vendors",industry: "Pharmacy Tech",  desc: "Dispensing software and automation vendors target pharmacy directors and owners evaluating technology. Practice-setting and technician-ratio data identifies high-volume accounts ready to automate." },
    { icon: ShoppingCart,  gradient: "from-blue-800 to-cyan-600",  role: "Drug Wholesale Distributors",   industry: "Pharmaceutical Distribution", desc: "Wholesale and specialty distributors target independent and compounding pharmacies for primary wholesale relationships. Chain vs. independent flags focus outreach on the highest-conversion account type." },
  ],
  "specialty-other": [
    { icon: PawPrint,      gradient: "from-blue-600 to-cyan-500",  role: "Veterinary Supply Companies",   industry: "Animal Health",        desc: "Vet supply reps reach DVMs by species focus and practice type. Small animal, equine, and food animal segments are available as distinct audiences for product-relevant outreach." },
    { icon: Stethoscope,   gradient: "from-blue-700 to-blue-500",  role: "Chiropractic Equipment Manufacturers",industry: "Chiropractic & Rehab", desc: "Equipment and device manufacturers reach DCs by technique specialization and practice setting. Instrument-adjusting practitioners are flagged separately from manual-technique chiropractors." },
    { icon: Users,         gradient: "from-cyan-600 to-blue-600",  role: "Allied Health Staffing Agencies",industry: "Specialty Recruitment",desc: "Staffing firms recruit radiologic technicians, dieticians, EMTs, and allied professionals at scale. Credential-type and geographic filters match candidates to open positions across every specialty." },
    { icon: GraduationCap, gradient: "from-blue-800 to-cyan-600",  role: "CE & Certification Providers",  industry: "Professional Education",desc: "Accredited CE organizations promote advanced certifications to specialty practitioners. Board-certification status and renewal-timeline filters deliver the highest-intent continuing education audience." },
  ],
};

const DEFAULT_PERSONAS: Persona[] = [
  { icon: FlaskConical,  gradient: "from-blue-600 to-cyan-500",  role: "Pharmaceutical & Life Sciences",  industry: "Drug Marketing",       desc: "Pharmaceutical companies reach prescribers, dispensers, and clinical decision-makers with NPI-verified contact data segmented by specialty, setting, and prescribing authority." },
  { icon: Briefcase,     gradient: "from-blue-700 to-blue-500",  role: "Medical Device Manufacturers",    industry: "MedTech",              desc: "Device reps build territory call lists filtered by procedure volume, facility type, and specialty. Reach the physicians and administrators who actually evaluate and approve capital purchases." },
  { icon: Users,         gradient: "from-cyan-600 to-blue-600",  role: "Healthcare Staffing Agencies",    industry: "Workforce Solutions",  desc: "Healthcare staffing firms recruit nurses, therapists, and allied professionals at scale. Credential-type and setting filters deliver pre-qualified candidates for every open clinical role." },
  { icon: GraduationCap, gradient: "from-blue-800 to-cyan-600",  role: "Medical Education & CME Providers",industry: "Medical Education",   desc: "CME organizations and nursing education programs promote accredited courses to license-renewal candidates. Renewal-timeline filters deliver the most time-sensitive, highest-converting audience." },
];

function getHubKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  return slugParts[idx + 1] || "default";
}

export default function HealthcareAudienceSection({ slugParts }: { slugParts: string[] }) {
  const key = getHubKey(slugParts);
  const personas = PERSONAS[key] ?? DEFAULT_PERSONAS;

  const headlines: Record<string, { plain: string; accent: string }> = {
    "physicians-advanced-practice": { plain: "Who reaches physicians", accent: "most effectively with Lorann?" },
    "nursing-professionals":        { plain: "Who builds pipelines from", accent: "nursing professional data?" },
    "hospital-decision-makers":     { plain: "Who converts hospital", accent: "executive data into revenue?" },
    "health-therapy":               { plain: "Who drives results from", accent: "therapy professional outreach?" },
    "behavioral-mental-health":     { plain: "Who succeeds with", accent: "behavioral health contact data?" },
    "dental-vision":                { plain: "Who uses dental and vision", accent: "professional data to grow?" },
    "pharmacy-practice-management": { plain: "Who leverages pharmacy data", accent: "to close more deals?" },
    "specialty-other":              { plain: "Who gets the most from", accent: "specialty healthcare lists?" },
    default:                        { plain: "Who uses Lorann healthcare data", accent: "to drive real results?" },
  };
  const { plain, accent } = headlines[key] ?? headlines.default;

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#F0F5FF 0%,#ffffff 40%,#E4EDFF 100%)" }}>
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-40"
        style={{ background: "radial-gradient(circle,rgba(29,69,217,0.08) 0%,transparent 70%)", filter: "blur(80px)" }} />

      <div className="container-custom relative">

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">Who Can Use This Data</span>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-slate-900 max-w-3xl mx-auto">
            {plain}{" "}
            <span style={{ background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#1736B3 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {accent}
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-[16px] max-w-xl mx-auto leading-relaxed">
            Four industries that consistently drive the highest ROI from Lorann's healthcare professional data.
          </p>
        </div>

        {/* Persona cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {personas.map(({ icon: Icon, gradient, role, industry, desc }) => (
            <div key={role}
              className="reveal group bg-white rounded-2xl border border-slate-150 overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-15px_rgba(29,69,217,0.15)] hover:border-blue-200 transition-all duration-500">

              {/* Card header bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${gradient} group-hover:h-2 transition-all duration-300`} />

              <div className="p-7">
                <div className="flex items-start gap-4 mb-4">
                  {/* Icon badge */}
                  <div className={`w-12 h-12 rounded-xl grid place-items-center flex-shrink-0 bg-gradient-to-br ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">{industry}</span>
                    <h3 className="font-display font-bold text-[18px] text-slate-900 tracking-tight leading-tight mt-0.5">{role}</h3>
                  </div>
                </div>

                <p className="text-slate-600 text-[14.5px] leading-[1.7] mb-5">{desc}</p>

                {/* CTA link */}
                <Link href="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:text-cyan-600 transition-colors duration-200 group/link">
                  Request a sample list
                  <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-14 reveal text-center">
          <p className="text-slate-600 text-[15px] mb-5">
            Don't see your industry? Lorann serves <strong className="text-slate-900">500+ verticals</strong> across healthcare, B2B, and consumer data.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] text-white transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(29,69,217,0.5)] hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#1D45D9,#00A7EF)" }}>
            Talk to a data specialist
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
