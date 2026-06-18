import {
  ShieldCheck, SlidersHorizontal, FileText, Building2,
  Layers, RefreshCw, BadgeCheck, Stethoscope, Heart,
  Brain, Smile, Pill, PawPrint, Users, Cpu, Lock,
  type LucideIcon,
} from "lucide-react";

type FeatureCard = { icon: LucideIcon; title: string; desc: string };

type HubFeatures = {
  kicker: string;
  headline: string;
  accent: string;
  cards: FeatureCard[];
};

const DATA: Record<string, HubFeatures> = {
  "physicians-advanced-practice": {
    kicker: "Precision Physician Data",
    headline: "Six capabilities that make",
    accent: "physician outreach convert.",
    cards: [
      { icon: ShieldCheck,        title: "NPI-Verified Records",        desc: "Every record cross-matched against the CMS NPPES registry. You reach real, licensed physicians — not stale aggregated entries." },
      { icon: SlidersHorizontal,  title: "Specialty-Level Targeting",   desc: "Filter by taxonomy code, board certification, and subspecialty. Reach hospitalists, surgeons, and internists independently." },
      { icon: FileText,           title: "DEA & Prescriber Flags",      desc: "Identify active prescribers with DEA validation. Ideal for pharmaceutical sales, formulary programs, and sample distribution." },
      { icon: Building2,          title: "Hospital Privileges Data",    desc: "Segment physicians by admitting privileges at specific hospital systems, academic centers, or health networks." },
      { icon: RefreshCw,          title: "Weekly Data Hygiene",         desc: "Records refreshed weekly against national change-of-address, license, and specialty boards. Bounce rates stay under 2%." },
      { icon: Layers,             title: "Multi-Channel Delivery",      desc: "Email, direct mail, phone, and programmatic digital audience formats ready for activation across every marketing channel." },
    ],
  },
  "nursing-professionals": {
    kicker: "Comprehensive Nursing Data",
    headline: "Built for every marketing team",
    accent: "targeting nursing professionals.",
    cards: [
      { icon: BadgeCheck,        title: "License-Type Segmentation",   desc: "Filter by RN, LPN, CNA, CNM, NP, and twelve additional credential types. Reach the exact nursing role your campaign requires." },
      { icon: Building2,         title: "Unit Specialization Flags",   desc: "Identify nurses by clinical unit — ICU, ER, labor and delivery, oncology, and pediatrics — for highly relevant outreach." },
      { icon: ShieldCheck,       title: "NCLEX-Validated Records",     desc: "Data cross-referenced against state nursing license databases, ensuring every record holds an active, verified credential." },
      { icon: SlidersHorizontal, title: "Care Setting Filters",        desc: "Distinguish acute care hospital nurses from long-term care, home health, and outpatient clinic settings in a single query." },
      { icon: Users,             title: "Travel Nurse Indicators",     desc: "Travel and agency nurses are flagged separately. Perfect for staffing firms and recruiters targeting highly mobile clinicians." },
      { icon: Layers,            title: "Multi-State License Coverage", desc: "Multi-state compact license holders identified and flagged. Streamline multi-region outreach with a single, clean dataset." },
    ],
  },
  "hospital-decision-makers": {
    kicker: "Executive Healthcare Data",
    headline: "Data engineered for",
    accent: "C-suite and director outreach.",
    cards: [
      { icon: Users,             title: "Title & Role Targeting",      desc: "Reach CEOs, CFOs, CMOs, CNOs, and department directors independently. Filter by decision-making authority and budget control." },
      { icon: Building2,         title: "Health System Affiliation",   desc: "Segment executives by IDN membership, health system size, or independent hospital classification for account-based campaigns." },
      { icon: SlidersHorizontal, title: "Bed Count & Facility Tier",  desc: "Filter by facility size — critical access, community, regional, or academic medical center — to match your sales territory." },
      { icon: Cpu,               title: "Technology Adoption Flags",  desc: "Identify facilities currently using specific EHR, HIS, or billing platforms. Refine accounts by IT infrastructure stage." },
      { icon: ShieldCheck,       title: "Purchasing Authority Data",  desc: "Records flagged with capital vs. operational budget ownership. Reach executives who sign contracts, not influencers alone." },
      { icon: RefreshCw,         title: "Quarterly Executive Updates", desc: "Hospital leadership turns over frequently. Quarterly verification cycles ensure your executive contacts remain accurate and deliverable." },
    ],
  },
  "health-therapy": {
    kicker: "Allied & Therapy Professionals Data",
    headline: "Reach therapists who",
    accent: "specify, prescribe, and refer.",
    cards: [
      { icon: Stethoscope,       title: "Therapy Type Segmentation",  desc: "Filter by PT, OT, SLP, RT, MT, and nine additional therapy disciplines. Each segment delivers a unique, non-overlapping audience." },
      { icon: Building2,         title: "Practice Setting Filters",   desc: "Separate hospital-based therapists from outpatient clinics, skilled nursing facilities, home health agencies, and private practices." },
      { icon: BadgeCheck,        title: "Licensure & Cert Validation", desc: "License status cross-validated against state therapy boards. Active, lapsed, and renewal-pending records are clearly coded." },
      { icon: SlidersHorizontal, title: "Patient Volume Indicators",  desc: "Identify high-volume practices treating 30+ patients per week. Target the therapists most likely to specify your product." },
      { icon: FileText,          title: "Referral Network Mapping",   desc: "Records include primary referral sources and payor mix data, helping you align outreach with the full therapy care chain." },
      { icon: Layers,            title: "CE & Certification Targeting", desc: "Flag therapists approaching license renewal periods. Market continuing education courses to the highest-intent audience." },
    ],
  },
  "behavioral-mental-health": {
    kicker: "Behavioral Health Professional Data",
    headline: "Data built for the fast-growing",
    accent: "behavioral health market.",
    cards: [
      { icon: Brain,             title: "Credential-Level Filtering",  desc: "Reach PhDs, LCSWs, LMFTs, LPCs, and psychiatrists as separate audiences. Each credential carries distinct prescribing and referral authority." },
      { icon: Building2,         title: "Practice Setting Segmentation", desc: "Distinguish private practices from community mental health centers, inpatient psychiatric units, and substance use treatment facilities." },
      { icon: Heart,             title: "Patient Population Flags",    desc: "Identify clinicians treating adult, pediatric, geriatric, or dual-diagnosis populations for maximally relevant outreach." },
      { icon: Cpu,               title: "Telehealth Availability Flags", desc: "Clinicians actively providing telehealth services are flagged. Reach virtual care providers for platform and technology marketing." },
      { icon: ShieldCheck,       title: "Insurance Panel Participation", desc: "Data includes payor panel participation indicators. Identify clinicians accepting new patients and specific insurance networks." },
      { icon: RefreshCw,         title: "Monthly License Verification", desc: "Behavioral health license status changes frequently. Monthly verification ensures your outreach list stays compliant and deliverable." },
    ],
  },
  "dental-vision": {
    kicker: "Dental & Vision Professional Data",
    headline: "Reach every dental and vision",
    accent: "professional with precision.",
    cards: [
      { icon: Smile,             title: "Specialty & Subspecialty Filters", desc: "Segment general dentists from orthodontists, periodontists, endodontists, and oral surgeons. Vision data covers ODs and ophthalmologists." },
      { icon: Building2,         title: "Practice Model Identification", desc: "Distinguish solo practitioners, group practices, and DSO-affiliated offices. Target ownership type for relevant business messaging." },
      { icon: SlidersHorizontal, title: "Equipment Make & Vintage",    desc: "Practices flagged by primary X-ray, CAD/CAM, and laser equipment. Identify the best prospects for capital equipment sales." },
      { icon: BadgeCheck,        title: "Credentialing & Board Status", desc: "ADA and AOA board status validated against current membership rolls. Active and specialty-certified records clearly identified." },
      { icon: FileText,          title: "Lab & Supply Affiliation Data", desc: "Dental lab relationships and primary supply distributor affiliations included. Target the full dental supply chain efficiently." },
      { icon: Layers,            title: "Multi-Channel Activation",    desc: "Email, direct mail, and programmatic display audiences available. Reach dental decision-makers across every marketing channel." },
    ],
  },
  "pharmacy-practice-management": {
    kicker: "Pharmacy Professional Data",
    headline: "Target pharmacists and managers",
    accent: "who drive drug and supply decisions.",
    cards: [
      { icon: Pill,              title: "Practice Setting Segmentation", desc: "Separate retail chain, independent, hospital, compounding, and mail-order pharmacists into distinct, non-overlapping segments." },
      { icon: FileText,          title: "DEA Schedule Authorizations",  desc: "Identify pharmacists and pharmacies licensed to dispense Schedule II–V controlled substances for compliant targeted outreach." },
      { icon: SlidersHorizontal, title: "Chain vs. Independent Flags",  desc: "Independent pharmacy owners flagged separately from chain-employed pharmacists. Reach the right decision-maker for every deal." },
      { icon: Building2,         title: "PBM Affiliation Data",         desc: "Pharmacy Benefit Manager contract affiliations identified. Ideal for PBMs recruiting network pharmacies or negotiating contracts." },
      { icon: BadgeCheck,        title: "Technician Ratio Indicators",  desc: "High-volume dispensing pharmacies flagged by technician-to-pharmacist ratio. Target the busiest locations for supply outreach." },
      { icon: RefreshCw,         title: "Biannual License Verification", desc: "State pharmacy board license status verified biannually. Lapsed, suspended, and renewal-pending records removed automatically." },
    ],
  },
  "specialty-other": {
    kicker: "Specialty Healthcare Professional Data",
    headline: "Niche professional data that",
    accent: "generalist lists can never match.",
    cards: [
      { icon: PawPrint,          title: "Veterinary Specialty Targeting", desc: "Segment DVMs by species focus — small animal, equine, food animal, and exotic — for highly targeted supply and drug outreach." },
      { icon: ShieldCheck,       title: "Chiropractic License Validation", desc: "DC license status cross-matched against state chiropractic boards. Board certification and technique specialization data included." },
      { icon: SlidersHorizontal, title: "Allied Health Credential Filters", desc: "Radiologic technicians, dieticians, EMTs, and 14 additional allied disciplines available as standalone, validated audience segments." },
      { icon: Building2,         title: "Clinic vs. Hospital Setting",  desc: "Identify specialty practitioners in private clinic, hospital-employed, and academic medical center settings for relevant messaging." },
      { icon: BadgeCheck,        title: "Board Certification Flags",    desc: "Specialty board certifications validated and flagged. Reach AVMA, ACA, and ASCP board-certified professionals with confidence." },
      { icon: Layers,            title: "Multi-Channel Delivery Ready", desc: "Every specialty dataset delivered in email, postal, phone, and digital activation formats for omnichannel campaign flexibility." },
    ],
  },
};

const DEFAULT: HubFeatures = {
  kicker: "Healthcare Data Intelligence",
  headline: "Six capabilities that power",
  accent: "high-performance healthcare campaigns.",
  cards: [
    { icon: ShieldCheck,       title: "NPI-Verified Records",        desc: "Every record cross-matched against CMS NPPES and state license boards. Active, licensed professionals only — no stale aggregates." },
    { icon: SlidersHorizontal, title: "Specialty-Level Targeting",   desc: "Filter by specialty code, credential type, board certification, and practice setting. Every query returns a distinct, actionable audience." },
    { icon: FileText,          title: "Rich Demographic Data",       desc: "Records include gender, years in practice, NPI, medical school, graduation year, and geographic filters down to the ZIP code level." },
    { icon: Building2,         title: "Facility & Affiliation Data", desc: "Hospital systems, health network affiliations, practice group names, and facility size data included for account-based targeting." },
    { icon: RefreshCw,         title: "Weekly Data Hygiene",         desc: "Continuous verification against national databases, USPS NCOA, and opt-out registries. Bounce rates consistently under 2%." },
    { icon: Layers,            title: "Multi-Channel Delivery",      desc: "Email, direct mail, phone, and programmatic audience formats available. Activate your list across every marketing channel on day one." },
  ],
};

function getHubKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  return slugParts[idx + 1] || "default";
}

export default function HealthcareFeaturesSection({ slugParts }: { slugParts: string[] }) {
  const key = getHubKey(slugParts);
  const { kicker, headline, accent, cards } = DATA[key] ?? DEFAULT;

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #080F24 0%, #0C1847 40%, #061030 100%)" }}>
      {/* Dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: "radial-gradient(circle, #6FD3FF 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      {/* Glow orbs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,167,239,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(29,69,217,0.15) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="container-custom relative">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-400">{kicker}</span>
          </div>
          <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-white">
            {headline}{" "}
            <span style={{ background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#22BFFF 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {accent}
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {cards.map(({ icon: Icon, title, desc }, i) => (
            <div key={title}
              className="reveal group relative rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_0_1px_rgba(0,167,239,0.4),0_20px_60px_-10px_rgba(0,167,239,0.18)] hover:bg-[rgba(0,167,239,0.06)]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}>
              {/* Number badge */}
              <span className="absolute top-5 right-6 font-mono text-[11px] font-semibold text-white/20 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 transition-all duration-300"
                style={{ background: "linear-gradient(135deg,rgba(29,69,217,0.4) 0%,rgba(0,167,239,0.3) 100%)", border: "1px solid rgba(0,167,239,0.25)" }}>
                <Icon className="w-6 h-6 text-cyan-400" />
              </div>
              {/* Accent bar */}
              <div className="h-[2px] w-0 group-hover:w-full rounded-full mb-4 transition-all duration-500"
                style={{ background: "linear-gradient(90deg,#1D45D9,#00A7EF)" }} />
              <h3 className="font-display font-semibold text-[17px] text-white mb-2 tracking-tight">{title}</h3>
              <p className="text-white/55 text-[14px] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
