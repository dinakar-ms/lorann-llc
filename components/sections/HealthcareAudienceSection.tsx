import Image from "next/image";
import Link from "next/link";
import {
  FlaskConical, BookOpen, Newspaper, Briefcase, Users, GraduationCap,
  HeartPulse, Cpu, Building2, ShoppingCart, Stethoscope,
  Globe, FileText, PawPrint, ChevronRight, type LucideIcon,
} from "lucide-react";

type Persona = {
  icon: LucideIcon;
  role: string;
  industry: string;
  desc: string;
};

const PERSONAS: Record<string, Persona[]> = {
  "physicians-advanced-practice": [
    { icon: FlaskConical, role: "Pharmaceutical Sales Teams",     industry: "Life Sciences",        desc: "Drug detailing reps use physician data to build territory call lists, prioritize high-prescribers, and deliver targeted sample campaigns to the right NPI-verified contacts." },
    { icon: Briefcase,   role: "Medical Device Manufacturers",   industry: "MedTech",              desc: "Device reps need to reach procedure-performing physicians. Specialty and hospital-privilege filters deliver the surgeons, interventionalists, and specialists who actually use your product." },
    { icon: BookOpen,    role: "CME & Education Providers",      industry: "Medical Education",    desc: "Accredited CME organizations promote live events, online modules, and journal supplements directly to licensed physicians nearing renewal periods in their specialty." },
    { icon: Newspaper,   role: "Medical Publishers & Journals",  industry: "Healthcare Media",     desc: "Medical journals and clinical publications reach physician subscribers, advertisers, and editorial board candidates with targeted direct mail and email campaigns." },
  ],
  "nursing-professionals": [
    { icon: Users,         role: "Healthcare Staffing Agencies",  industry: "Workforce Solutions",  desc: "Staffing firms recruit RNs, LPNs, and travel nurses at scale. License-type and specialty-unit filters deliver exactly the credentialed nurses your open positions require." },
    { icon: ShoppingCart,  role: "Medical Equipment Suppliers",   industry: "Healthcare Supply",    desc: "Nurses influence unit-level purchasing of wound care, IV therapy, and monitoring supplies. Reach the clinicians who specify and order at the bedside, not just the buyer." },
    { icon: GraduationCap, role: "Nursing Education Programs",   industry: "Higher Education",     desc: "BSN, MSN, and nurse practitioner programs recruit working nurses seeking advancement. Target by credential type, years of experience, and geographic market." },
    { icon: HeartPulse,    role: "Home Health & Hospice Agencies",industry: "Home-Based Care",      desc: "Home health organizations recruit experienced nurses for patient-facing roles. Setting filters identify nurses already working in home, hospice, or long-term care environments." },
  ],
  "hospital-decision-makers": [
    { icon: FlaskConical,  role: "Medical Device Companies",      industry: "MedTech & Capital",    desc: "Capital equipment sales teams reach CFOs and materials managers controlling million-dollar budgets. Facility-tier filters identify the right account size for your product's price point." },
    { icon: Cpu,           role: "Healthcare IT Vendors",         industry: "Health Tech",          desc: "EHR, RCM, and clinical analytics platforms target CIOs and CMIOs actively evaluating or replacing technology. Current-platform flags refine your prospect list to high-intent accounts." },
    { icon: Briefcase,     role: "Healthcare Consulting Firms",   industry: "Advisory Services",    desc: "Strategy consultants and advisory firms engage hospital CEOs and COOs on margin improvement, workforce strategy, and system consolidation. Title and health-system size filters target ideal accounts." },
    { icon: Building2,     role: "Pharmaceutical Companies",     industry: "Life Sciences",        desc: "Pharma field teams reach CMOs and pharmacy directors who influence formulary placement and clinical protocol adoption. Medical director flags identify the highest-authority contacts." },
  ],
  "health-therapy": [
    { icon: ShoppingCart,  role: "Therapy Equipment Manufacturers",industry: "Rehab & Durable MedEquip", desc: "PTs, OTs, and SLPs specify clinical equipment at the practice level. Therapy-type and practice-setting filters reach the clinicians who write the equipment orders." },
    { icon: Users,         role: "Healthcare Staffing Firms",     industry: "Therapy Workforce",    desc: "Contract therapy staffing organizations place PTs, OTs, and SLPs in hospitals, SNFs, and schools. Credential and setting filters deliver candidates who match your open positions." },
    { icon: GraduationCap, role: "CE & Certification Providers",  industry: "Professional Education",desc: "Accredited CE organizations promote therapy-specific continuing education to license-renewal candidates. Renewal-date filters deliver the highest-intent, most time-sensitive audience segment." },
    { icon: FileText,      role: "Medical Billing Companies",     industry: "RCM & Practice Admin",  desc: "Revenue cycle management firms and billing services target outpatient therapy practice managers. Private-practice and multi-location flags identify the highest-value billing prospects." },
  ],
  "behavioral-mental-health": [
    { icon: Globe,         role: "Telehealth & Digital Platforms", industry: "Digital Health",       desc: "Virtual therapy platforms recruit licensed LCSWs, LMFTs, and psychologists for provider networks. Telehealth-active flags deliver clinicians already comfortable with virtual care delivery." },
    { icon: FlaskConical,  role: "Pharmaceutical Companies",      industry: "Psychiatry & CNS",     desc: "CNS-focused pharmaceutical reps reach psychiatrists and psychiatric nurse practitioners who prescribe antidepressants, antipsychotics, and mood-stabilizing medications." },
    { icon: Cpu,           role: "EHR & Practice Management Vendors",industry: "Behavioral Health Tech",desc: "Behavioral health-specific EHR platforms target solo and group practices. Private-practice flags and patient-volume indicators identify the accounts most likely to convert to new software." },
    { icon: HeartPulse,    role: "Mental Health Organizations",   industry: "Advocacy & Nonprofit",  desc: "Behavioral health associations and nonprofits engage licensed clinicians for membership drives, continuing education sponsorship, and clinical advocacy initiatives." },
  ],
  "dental-vision": [
    { icon: ShoppingCart,  role: "Dental Supply Companies",       industry: "Dental Supply & Distribution", desc: "Supply reps reach dentists and hygienists who specify consumables, handpieces, and small equipment at the practice level — before the purchasing order reaches the office manager." },
    { icon: Briefcase,     role: "Optical Equipment Manufacturers",industry: "Vision & Ophthalmic",  desc: "Optometrists and ophthalmologists specify diagnostic instruments and lens systems. Equipment-vintage flags identify practices due for capital technology upgrades." },
    { icon: FileText,      role: "Dental Insurance Companies",    industry: "Dental Benefits",      desc: "Dental plans recruit general dentists and specialists into preferred provider networks. Credentialing and payor-panel data identifies which practices are currently in-network and which are targets." },
    { icon: Users,         role: "Dental & Vision Staffing Firms",industry: "Healthcare Recruitment",desc: "Staffing firms place hygienists, dental assistants, and opticians in private and group practices. Credential and practice-size filters deliver the most relevant candidates for each open role." },
  ],
  "pharmacy-practice-management": [
    { icon: FlaskConical,  role: "Pharmaceutical Manufacturers",  industry: "Drug Marketing",       desc: "Drug reps reach pharmacists who counsel patients at the point of dispensing. Practice-setting and dispensing-volume filters deliver the pharmacists with the highest patient-counseling impact." },
    { icon: Building2,     role: "Pharmacy Benefit Managers",     industry: "PBM & Managed Care",   desc: "PBMs recruit independent and chain pharmacy locations for preferred-network contracts. Pharmacy ownership and volume filters identify the highest-priority acquisition targets." },
    { icon: Cpu,           role: "Pharmacy Software & Automation Vendors",industry: "Pharmacy Tech",  desc: "Dispensing software and automation vendors target pharmacy directors and owners evaluating technology. Practice-setting and technician-ratio data identifies high-volume accounts ready to automate." },
    { icon: ShoppingCart,  role: "Drug Wholesale Distributors",   industry: "Pharmaceutical Distribution", desc: "Wholesale and specialty distributors target independent and compounding pharmacies for primary wholesale relationships. Chain vs. independent flags focus outreach on the highest-conversion account type." },
  ],
  "specialty-other": [
    { icon: PawPrint,      role: "Veterinary Supply Companies",   industry: "Animal Health",        desc: "Vet supply reps reach DVMs by species focus and practice type. Small animal, equine, and food animal segments are available as distinct audiences for product-relevant outreach." },
    { icon: Stethoscope,   role: "Chiropractic Equipment Manufacturers",industry: "Chiropractic & Rehab", desc: "Equipment and device manufacturers reach DCs by technique specialization and practice setting. Instrument-adjusting practitioners are flagged separately from manual-technique chiropractors." },
    { icon: Users,         role: "Allied Health Staffing Agencies",industry: "Specialty Recruitment",desc: "Staffing firms recruit radiologic technicians, dieticians, EMTs, and allied professionals at scale. Credential-type and geographic filters match candidates to open positions across every specialty." },
    { icon: GraduationCap, role: "CE & Certification Providers",  industry: "Professional Education",desc: "Accredited CE organizations promote advanced certifications to specialty practitioners. Board-certification status and renewal-timeline filters deliver the highest-intent continuing education audience." },
  ],
};

const DEFAULT_PERSONAS: Persona[] = [
  { icon: FlaskConical,  role: "Pharmaceutical & Life Sciences",  industry: "Drug Marketing",       desc: "Pharmaceutical companies reach prescribers, dispensers, and clinical decision-makers with NPI-verified contact data segmented by specialty, setting, and prescribing authority." },
  { icon: Briefcase,     role: "Medical Device Manufacturers",    industry: "MedTech",              desc: "Device reps build territory call lists filtered by procedure volume, facility type, and specialty. Reach the physicians and administrators who actually evaluate and approve capital purchases." },
  { icon: Users,         role: "Healthcare Staffing Agencies",    industry: "Workforce Solutions",  desc: "Healthcare staffing firms recruit nurses, therapists, and allied professionals at scale. Credential-type and setting filters deliver pre-qualified candidates for every open clinical role." },
  { icon: GraduationCap, role: "Medical Education & CME Providers",industry: "Medical Education",   desc: "CME organizations and nursing education programs promote accredited courses to license-renewal candidates. Renewal-timeline filters deliver the most time-sensitive, highest-converting audience." },
];

/*
 * Editorial photo mosaic — 4 photos rotate across personas.
 * These are generic professional photos; text tells the hub-specific story.
 */
const MOSAIC_PHOTOS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80",
];

const DARK_OVERLAY =
  "linear-gradient(to top, rgba(6,16,48,0.93) 0%, rgba(6,16,48,0.45) 55%, rgba(6,16,48,0.12) 100%)";

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
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg,#F0F5FF 0%,#ffffff 40%,#E4EDFF 100%)" }}
    >
      {/* Decorative blob */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background: "radial-gradient(circle,rgba(29,69,217,0.08) 0%,transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container-custom relative">

        {/* ── Header ── */}
        <div className="text-center mb-10 lg:mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              Who Can Use This Data
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-slate-900 max-w-3xl mx-auto">
            {plain}{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#1736B3 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {accent}
            </span>
          </h2>
          <p className="mt-4 text-slate-600 text-[15px] lg:text-[16px] max-w-xl mx-auto leading-relaxed">
            Four industries that consistently drive the highest ROI from Lorann&apos;s healthcare
            professional data.
          </p>
        </div>

        {/* ── Editorial Photo Mosaic ── */}
        <div className="max-w-6xl mx-auto reveal rounded-2xl overflow-hidden shadow-2xl">

          {/* Hero panel — persona 0, full width */}
          <div className="relative h-[340px] sm:h-[400px] lg:h-[460px] group overflow-hidden">
            <Image
              src={MOSAIC_PHOTOS[0]}
              alt={personas[0].role}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={55}
              priority
            />
            <div className="absolute inset-0" style={{ background: DARK_OVERLAY }} />

            {/* Persona content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(0,167,239,0.2)",
                    border: "1px solid rgba(0,167,239,0.4)",
                    color: "#6FD3FF",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {personas[0].industry}
                </span>
                <span className="font-mono text-[11px] text-white/25 tracking-widest">01</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-[2rem] text-white mb-2 tracking-tight">
                {personas[0].role}
              </h3>
              <p className="text-white/65 text-[14px] lg:text-[15px] leading-relaxed max-w-2xl mb-5">
                {personas[0].desc}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-cyan-400 text-[13px] font-semibold hover:text-white transition-colors duration-200 w-fit"
              >
                Request a sample list
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Icon badge — top right */}
            <div
              className="absolute top-5 right-5 w-10 h-10 rounded-xl grid place-items-center"
              style={{
                background: "rgba(29,69,217,0.7)",
                border: "1px solid rgba(99,179,237,0.4)",
                backdropFilter: "blur(12px)",
              }}
            >
              {(() => { const Icon = personas[0].icon; return <Icon className="w-5 h-5 text-cyan-300" />; })()}
            </div>
          </div>

          {/* 3 smaller panels — personas 1, 2, 3 */}
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: "2px", background: "rgba(6,16,48,0.9)" }}
          >
            {personas.slice(1).map((persona, i) => {
              const Icon = persona.icon;
              return (
                <div
                  key={persona.role}
                  className="relative h-[280px] sm:h-[300px] lg:h-[320px] group overflow-hidden"
                >
                  <Image
                    src={MOSAIC_PHOTOS[i + 1]}
                    alt={persona.role}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={55}
                  />
                  <div className="absolute inset-0" style={{ background: DARK_OVERLAY }} />

                  {/* Icon badge */}
                  <div
                    className="absolute top-4 right-4 w-9 h-9 rounded-lg grid place-items-center"
                    style={{
                      background: "rgba(29,69,217,0.65)",
                      border: "1px solid rgba(99,179,237,0.35)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Icon className="w-4 h-4 text-cyan-300" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(0,167,239,0.18)",
                          border: "1px solid rgba(0,167,239,0.3)",
                          color: "#6FD3FF",
                        }}
                      >
                        {persona.industry}
                      </span>
                      <span className="font-mono text-[10px] text-white/20 tracking-widest">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-[17px] lg:text-[18px] text-white mb-2 tracking-tight leading-snug">
                      {persona.role}
                    </h3>
                    <p className="text-white/60 text-[12.5px] leading-relaxed mb-4 line-clamp-3">
                      {persona.desc}
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-cyan-400 text-[12px] font-semibold hover:text-white transition-colors duration-200 w-fit"
                    >
                      Request a sample list
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 lg:mt-14 reveal text-center">
          <p className="text-slate-600 text-[15px] mb-5">
            Don&apos;t see your industry? Lorann serves{" "}
            <strong className="text-slate-900">500+ verticals</strong> across healthcare, B2B,
            and consumer data.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px] text-white transition-all duration-300 hover:shadow-[0_8px_30px_-6px_rgba(29,69,217,0.5)] hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#1D45D9,#00A7EF)" }}
          >
            Talk to a data specialist
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
