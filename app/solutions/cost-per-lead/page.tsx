import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  TrendingDown,
  Target,
  BadgeCheck,
  Sparkles,
  RefreshCw,
  Ban,
  ChevronRight,
  ChevronDown,
  DollarSign,
  BarChart3,
  Zap,
  Users,
  Mail,
  Search,
  Linkedin,
  Monitor,
  Megaphone,
  Globe,
  Lightbulb,
  ShieldCheck,
  ArrowUpRight,
  Building2,
  ShoppingCart,
  HeartPulse,
  MailCheck,
  SlidersHorizontal,
  Layers,
  TrendingUp,
  Cookie,
  Brain,
  Lock,
  FileCheck,
  Clock,
  LineChart,
  Database,
  Info,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "Cost Per Lead (CPL) by Industry & Channel | Lorann LLC",
  description:
    "Explore average Cost Per Lead benchmarks by industry and marketing channel. Learn how to calculate, benchmark, and reduce your CPL with verified audience data.",
  keywords: [
    "cost per lead",
    "CPL",
    "CPL by industry",
    "cost per lead benchmarks",
    "reduce cost per lead",
    "lead generation cost",
    "B2B cost per lead",
  ],
  alternates: { canonical: "/solutions/cost-per-lead" },
};

/* ─── Data ─────────────────────────────────────────────── */

const INDUSTRY_BENCHMARKS = [
  { industry: "Technology / SaaS", avg: "$50", range: "$30 – $80", trend: "stable" },
  { industry: "Healthcare", avg: "$65", range: "$35 – $95", trend: "rising" },
  { industry: "Financial Services", avg: "$75", range: "$45 – $110", trend: "rising" },
  { industry: "Insurance", avg: "$70", range: "$45 – $100", trend: "stable" },
  { industry: "Legal Services", avg: "$85", range: "$50 – $130", trend: "rising" },
  { industry: "Manufacturing", avg: "$45", range: "$28 – $65", trend: "falling" },
  { industry: "Real Estate", avg: "$55", range: "$35 – $90", trend: "stable" },
  { industry: "Education / EdTech", avg: "$35", range: "$18 – $55", trend: "falling" },
  { industry: "Retail / Ecommerce", avg: "$30", range: "$15 – $50", trend: "stable" },
  { industry: "Travel & Hospitality", avg: "$28", range: "$12 – $48", trend: "falling" },
  { industry: "B2B Services", avg: "$60", range: "$38 – $85", trend: "stable" },
  { industry: "Telecommunications", avg: "$42", range: "$25 – $65", trend: "stable" },
];

const CHANNEL_BENCHMARKS = [
  { channel: "Google Ads (Search)", avg: "$55", range: "$30 – $90", Icon: Search, quality: "High" },
  { channel: "LinkedIn Ads", avg: "$85", range: "$50 – $150", Icon: Linkedin, quality: "Very High" },
  { channel: "Facebook / Meta Ads", avg: "$30", range: "$12 – $55", Icon: Users, quality: "Medium" },
  { channel: "Email Marketing", avg: "$22", range: "$10 – $40", Icon: Mail, quality: "High" },
  { channel: "Programmatic Display", avg: "$48", range: "$30 – $80", Icon: Monitor, quality: "Medium" },
  { channel: "Content Marketing / SEO", avg: "$25", range: "$12 – $45", Icon: Globe, quality: "High" },
];

const OPTIMIZATION_STRATEGIES = [
  {
    Icon: Target,
    title: "Precision Audience Targeting",
    desc: "Use firmographic, demographic, and technographic filters to narrow your audience to high-fit prospects. Tighter targeting means fewer wasted impressions and dramatically lower CPL.",
  },
  {
    Icon: BadgeCheck,
    title: "Verified & Deliverable Data",
    desc: "Every contact in your list should be verified for accuracy. Bounced emails, disconnected phones, and outdated records inflate your CPL with zero return on investment.",
  },
  {
    Icon: Sparkles,
    title: "Intent Signal Layering",
    desc: "Layer intent data onto your audience segments to prioritize prospects actively researching solutions like yours. Focus spend on buyers showing purchase intent signals.",
  },
  {
    Icon: RefreshCw,
    title: "Data Enrichment & Append",
    desc: "Fill gaps in your CRM records with 50+ enrichment attributes — from direct dials to technology installs. Higher match rates on ad platforms translate to lower CPL.",
  },
  {
    Icon: Ban,
    title: "Suppression & Deduplication",
    desc: "Automatically suppress existing customers, competitors, and disqualified contacts from campaigns. Stop paying to acquire leads you already have.",
  },
  {
    Icon: Zap,
    title: "A/B Test Everything",
    desc: "Systematically test ad creatives, landing pages, CTAs, and offers. Small improvements in conversion rate compound into significant CPL reductions over time.",
  },
];

const FAQS = [
  {
    q: "What is a good Cost Per Lead?",
    a: "A 'good' CPL varies by industry and channel. For B2B, anything under $50 is considered strong. For high-value verticals like financial services or legal, $75–$100 may be acceptable if lead quality is high. The key metric is CPL relative to customer lifetime value (LTV) — a $100 lead that converts to a $50,000 customer is excellent.",
  },
  {
    q: "How do you calculate Cost Per Lead?",
    a: "CPL = Total Campaign Spend ÷ Number of Leads Generated. For example, if you spend $5,000 on a campaign that generates 100 leads, your CPL is $50. Include all costs — ad spend, creative production, landing page hosting, and tool subscriptions — for an accurate figure.",
  },
  {
    q: "What's the difference between CPL, CPA, and CAC?",
    a: "CPL measures the cost to generate a lead (someone who shows interest). CPA (Cost Per Acquisition) measures the cost to convert that lead into a paying customer. CAC (Customer Acquisition Cost) is the broadest metric — it includes all sales and marketing costs divided by new customers acquired.",
  },
  {
    q: "How does data quality affect CPL?",
    a: "Data quality is the single biggest lever for CPL optimization. Inaccurate contact data causes bounced emails (wasted send costs), wrong-person targeting (wasted ad spend), and low match rates on platforms like LinkedIn and Google (inflated bids). Verified, enriched data can reduce CPL by 40–60%.",
  },
  {
    q: "How can I reduce my CPL with better data?",
    a: "Verified B2B and B2C databases with 95%+ accuracy, combined with intent signals and data enrichment services, typically produce 40–60% CPL reductions by replacing generic third-party data with precision-targeted, verified audience segments.",
  },
];

/* ─── CPL by Audience Type ────────────────────────────────── */
const AUDIENCE_TYPES = [
  {
    Icon: Building2,
    type: "B2B",
    tagline: "High-value, complex sales cycles",
    avgRange: "$50 – $200",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    points: [
      "Decision-maker targeting requires firmographic and technographic precision to avoid wasting spend on non-buyers.",
      "Longer sales cycles (3–12 months) mean CPL must be evaluated against pipeline value, not just volume.",
      "Account-based strategies with verified contacts consistently deliver 40–55% lower CPL than broad targeting.",
    ],
  },
  {
    Icon: ShoppingCart,
    type: "B2C",
    tagline: "Volume-driven, shorter cycles",
    avgRange: "$5 – $35",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    points: [
      "Consumer campaigns demand massive reach at low cost — every cent per impression matters at scale.",
      "Demographic and lifestyle data overlays ensure ads connect with real buyers, not dead-end records.",
      "Purchase-intent signals reduce wasted spend by concentrating budget on consumers actively shopping your category.",
    ],
  },
  {
    Icon: HeartPulse,
    type: "Healthcare",
    tagline: "Compliance-heavy, niche audiences",
    avgRange: "$75 – $300+",
    color: "from-rose-500 to-pink-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-700",
    points: [
      "HIPAA-aware targeting and NPI-validated provider records are mandatory — generic data sources fail compliance.",
      "Specialty-level targeting (cardiologists vs. general practitioners) requires deep taxonomy that most vendors lack.",
      "Regulatory restrictions limit available channels, making data precision the primary lever for CPL control.",
    ],
  },
];

/* ─── How Data Quality Drives CPL ────────────────────────── */
const DATA_QUALITY_DRIVERS = [
  {
    Icon: MailCheck,
    title: "Deliverability Eliminates Waste",
    stat: "3%",
    statLabel: "Bounce Rate",
    desc: "Unverified email lists generate bounce rates of 15–25%, meaning a quarter of your spend produces zero impressions. Real-time SMTP and mailbox verification keeps bounce rates under 3% so every dollar reaches a living inbox.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Segmentation Precision",
    stat: "50+",
    statLabel: "Enrichment Fields",
    desc: "Broad, unsegmented audiences dilute relevance scores and tank click-through rates. With 50+ enrichment attributes per record, you can micro-segment by role, revenue band, tech stack, and purchase stage.",
  },
  {
    Icon: ShieldCheck,
    title: "Compliance Prevents Penalties",
    stat: "$50K",
    statLabel: "Per Violation",
    desc: "Sending to non-compliant contacts risks CAN-SPAM fines of up to $50,000 per violation and domain blacklisting that torpedoes future deliverability. Scrubbed datasets protect both your budget and brand.",
  },
  {
    Icon: RefreshCw,
    title: "Data Freshness Matters",
    stat: "30%",
    statLabel: "Annual Decay",
    desc: "Business contact data decays at roughly 30% per year as people change roles, companies merge, and domains expire. Monthly hygiene cycles ensure your targeting never relies on stale intelligence.",
  },
  {
    Icon: Zap,
    title: "Intent Signals Prioritize Spend",
    stat: "45%",
    statLabel: "Avg CPL Drop",
    desc: "Not every qualified contact is in-market right now. Intent data identifies accounts actively researching your category, letting you concentrate media dollars on high-conversion windows.",
  },
  {
    Icon: Layers,
    title: "Deduplication Saves Budget",
    stat: "18%",
    statLabel: "Avg Duplicates",
    desc: "Duplicate records across CRM, MAP, and vendor lists cause you to pay multiple times for the same lead. Matching and deduplication ensures each marketing dollar reaches a unique prospect.",
  },
];

/* ─── CPL Trends ─────────────────────────────────────────── */
const CPL_TRENDS = [
  {
    Icon: TrendingUp,
    title: "Rising Platform Costs",
    badge: "↑ Impact",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    desc: "LinkedIn CPC has increased 20% year-over-year, and Google Ads CPCs in competitive B2B verticals now exceed $15. Marketers who rely on platform targeting alone face steadily rising CPLs unless they bring superior first-party and third-party data.",
  },
  {
    Icon: Cookie,
    title: "Cookie Deprecation Fallout",
    badge: "Critical",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    desc: "As third-party cookies vanish, retargeting audiences are shrinking and lookalike model accuracy is dropping. Deterministic data — verified emails, direct dials, and postal addresses — is replacing probabilistic signals as the foundation of efficient CPL.",
  },
  {
    Icon: Brain,
    title: "AI-Driven Lead Scoring",
    badge: "Opportunity",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    desc: "Machine-learning models now score leads in real time based on engagement patterns, firmographic fit, and technographic signals. Teams that feed these models clean, enriched data see 30–50% CPL improvements over manual qualification.",
  },
  {
    Icon: Lock,
    title: "Privacy-First Acquisition",
    badge: "Regulatory",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    desc: "Regulations like CCPA, GDPR, and state-level privacy laws are raising the compliance bar. Ethical, permission-based data sources are becoming the only scalable path to sustainable CPL as non-compliant vendors face enforcement.",
  },
];

/* ─── Enhanced FAQ ───────────────────────────────────────── */
const ENHANCED_FAQS = [
  {
    q: "What is a good Cost Per Lead?",
    a: "A 'good' CPL varies by industry and channel. For B2B, anything under $50 is considered strong. For high-value verticals like financial services or legal, $75–$100 may be acceptable if lead quality is high. The key metric is CPL relative to customer lifetime value (LTV) — a $100 lead that converts to a $50,000 customer is excellent.",
  },
  {
    q: "How do you calculate Cost Per Lead?",
    a: "CPL = Total Campaign Spend ÷ Number of Leads Generated. For example, if you spend $5,000 on a campaign that generates 100 leads, your CPL is $50. Include all costs — ad spend, creative production, landing page hosting, and tool subscriptions — for an accurate figure.",
  },
  {
    q: "What's the difference between CPL, CPA, and CAC?",
    a: "CPL measures the cost to generate a lead (someone who shows interest). CPA (Cost Per Acquisition) measures the cost to convert that lead into a paying customer. CAC (Customer Acquisition Cost) is the broadest metric — it includes all sales and marketing costs divided by new customers acquired.",
  },
  {
    q: "How does data quality affect CPL?",
    a: "Data quality is the single biggest lever for CPL optimization. Inaccurate contact data causes bounced emails (wasted send costs), wrong-person targeting (wasted ad spend), and low match rates on platforms like LinkedIn and Google (inflated bids). Verified, enriched data can reduce CPL by 40–60%.",
  },
  {
    q: "How can I reduce my CPL with better data?",
    a: "Verified B2B and B2C databases with 95%+ accuracy, combined with intent signals and data enrichment services, typically produce 40–60% CPL reductions by replacing generic third-party data with precision-targeted, verified audience segments.",
  },
  {
    q: "What channels typically have the lowest CPL?",
    a: "Email marketing consistently delivers the lowest CPL when powered by verified lists — often under $25 per lead. Organic content and SEO also produce low-cost leads over time. Paid channels like LinkedIn and Google Ads have higher CPLs but deliver stronger purchase intent signals. The most efficient strategy blends multiple channels with shared audience data.",
  },
  {
    q: "How quickly can I expect CPL improvements with better data?",
    a: "Most clients see measurable CPL reductions within the first 30–60 days of deploying verified data. Email campaigns show immediate improvement through lower bounce rates. Paid media campaigns typically require one to two optimization cycles to fully realize the targeting benefits.",
  },
  {
    q: "Can intent data really lower my cost per lead?",
    a: "Yes. Intent data identifies accounts and contacts actively researching topics related to your product. By concentrating spend on in-market prospects rather than cold audiences, clients typically see CPL drop by 30–50%. Signal eXchange™ intent signals integrate directly with major ad platforms and marketing automation tools.",
  },
  {
    q: "How do you ensure the data stays fresh and accurate?",
    a: "Our hygiene process runs on a continuous monthly cycle. We verify emails via SMTP handshake, validate phone numbers against carrier databases, cross-reference business records with corporate filings, and flag job-change events in real time. Records that fail verification are quarantined until re-confirmed.",
  },
  {
    q: "Is there a minimum campaign size or contract requirement?",
    a: "We offer flexible licensing options ranging from single-campaign list pulls to annual unlimited-use agreements. There is no minimum record count for standard list orders. Enterprise clients can license full multi-channel databases for a flat annual fee covering postal, email, and telemarketing channels.",
  },
];

/* ─── Trend badge helper ─────────────────────────────────── */
function TrendBadge({ trend }: { trend: string }) {
  const colors =
    trend === "falling"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : trend === "rising"
        ? "bg-amber-50 text-amber-700 border-amber-200"
        : "bg-slate-50 text-slate-600 border-slate-200";
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${colors}`}>
      {trend === "falling" ? "↓ Falling" : trend === "rising" ? "↑ Rising" : "→ Stable"}
    </span>
  );
}

function QualityBadge({ quality }: { quality: string }) {
  const colors =
    quality === "Very High"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : quality === "High"
        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : "bg-slate-50 text-slate-600 border-slate-200";
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${colors}`}>
      {quality}
    </span>
  );
}

/* ─── Page ──────────────────────────────────────────────── */

export default function CostPerLeadPage() {
  return (
    <>
      <ScrollReveal />

      {/* ── Hero ── */}
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Cost Per Lead" },
        ]}
        kicker="Solutions"
        title={
          <>
            Cost Per Lead{" "}
            <span className="text-gradient">by Industry & Channel</span>
          </>
        }
        description="Understand what you should be paying per lead, benchmark against your industry, and discover how verified audience data can reduce your CPL by 40–60%."
        primaryCta={{ label: "Get a Custom CPL Estimate", href: "/contact" }}
        secondaryCta={{ label: "Explore Data Assets", href: "/data-assets" }}
      />

      {/* ── What is CPL + Formula ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The Metric That Matters
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                What is{" "}
                <span className="text-gradient">Cost Per Lead?</span>
              </h2>
              <p className="text-slate-700 text-[17px] leading-[1.75] mt-5">
                Cost Per Lead (CPL) measures how much you spend to acquire a single qualified lead. It&rsquo;s the most critical efficiency metric in demand generation — and the clearest signal of whether your campaigns are profitable.
              </p>
              <p className="text-slate-700 text-[17px] leading-[1.75] mt-4">
                A lower CPL means more leads for the same budget, a shorter path to ROI, and more room to scale. The biggest lever? <strong className="text-slate-900">The quality of data powering your campaigns — and that&rsquo;s where Lorann makes the difference.</strong>
              </p>
            </div>

            {/* Formula Card */}
            <div
              className="relative rounded-[28px] p-8 lg:p-10 overflow-hidden text-white"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-60"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/15 border border-cyan-400/28 grid place-items-center">
                    <Calculator className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="font-display font-bold text-xl tracking-[-0.02em]">
                    CPL Formula
                  </h3>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 mb-6">
                  <div className="text-center">
                    <span className="font-display font-bold text-2xl lg:text-3xl tracking-[-0.02em] text-cyan-200">
                      CPL
                    </span>
                    <span className="text-white/60 text-2xl mx-3">=</span>
                    <span className="font-display font-bold text-lg lg:text-xl text-white/90">
                      Total Campaign Spend
                    </span>
                    <span className="text-white/60 text-xl mx-3">÷</span>
                    <span className="font-display font-bold text-lg lg:text-xl text-white/90">
                      Leads Generated
                    </span>
                  </div>
                </div>

                <div className="bg-white/[0.07] rounded-xl border border-white/10 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-cyan-300 mb-2">
                    Example
                  </p>
                  <p className="text-white/80 text-[15px] leading-relaxed">
                    Spend <strong className="text-white">$10,000</strong> on a LinkedIn campaign →
                    generate <strong className="text-white">125 leads</strong> →
                    CPL = <strong className="text-cyan-300">$80 per lead</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Stats Strip ── */}
      <section className="py-6 bg-slate-50/80 border-y border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "$22", label: "Lowest Avg. CPL", sub: "Email Marketing" },
              { value: "$85", label: "Highest Avg. CPL", sub: "LinkedIn Ads" },
              { value: "40–60%", label: "CPL Reduction", sub: "With Verified Data" },
              { value: "95%+", label: "Contact Accuracy", sub: "Verified & Deliverable" },
            ].map((s) => (
              <div key={s.label} className="text-center py-4">
                <div className="font-display font-bold text-2xl lg:text-3xl text-blue-700 tracking-[-0.025em]">
                  {s.value}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-slate-500 mt-1">
                  {s.label}
                </div>
                <div className="text-[12px] text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CPL by Industry ── */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Industry Benchmarks"
            title={
              <>
                Average Cost Per Lead{" "}
                <span className="text-gradient">by industry.</span>
              </>
            }
            description="CPL varies dramatically by vertical. High-value, complex-sale industries naturally have higher CPL — but data quality can shift any industry's numbers down significantly."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 reveal">
            {INDUSTRY_BENCHMARKS.map((row) => (
              <div
                key={row.industry}
                className="bg-white border border-slate-150 rounded-2xl p-6 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display font-bold text-[15px] text-slate-900 tracking-[-0.01em] group-hover:text-blue-700 transition-colors">
                    {row.industry}
                  </h3>
                  <TrendBadge trend={row.trend} />
                </div>
                <div className="font-display font-bold text-3xl text-blue-700 tracking-[-0.03em] mb-1">
                  {row.avg}
                </div>
                <div className="text-[13px] text-slate-500">
                  Range: <span className="font-medium text-slate-700">{row.range}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[13px] text-slate-400 mt-8">
            Sources: Aggregated from HubSpot, Gartner, and internal campaign data (2024–2025). All figures in USD.
          </p>
        </div>
      </section>

      {/* ── CPL by Channel ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Channel Benchmarks"
            title={
              <>
                Average Cost Per Lead{" "}
                <span className="text-gradient">by marketing channel.</span>
              </>
            }
            description="Channel selection has a massive impact on CPL. Match your channel to your audience's intent level for optimal cost efficiency."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {CHANNEL_BENCHMARKS.map((ch) => (
              <div
                key={ch.channel}
                className="relative bg-white border border-slate-150 rounded-2xl p-7 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[60px] pointer-events-none" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 grid place-items-center mb-4 group-hover:bg-blue-100 transition-colors">
                    <ch.Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-display font-bold text-[16px] text-slate-900 tracking-[-0.01em] mb-3">
                    {ch.channel}
                  </h3>
                  <div className="flex items-end gap-3 mb-3">
                    <span className="font-display font-bold text-3xl text-blue-700 tracking-[-0.03em]">
                      {ch.avg}
                    </span>
                    <span className="text-[13px] text-slate-400 mb-1">avg CPL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-slate-500">
                      Range: <span className="font-medium text-slate-700">{ch.range}</span>
                    </span>
                    <QualityBadge quality={ch.quality} />
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">Lead Quality</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How to Reduce CPL ── */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Optimization Playbook"
            title={
              <>
                6 proven strategies to{" "}
                <span className="text-gradient">reduce your CPL.</span>
              </>
            }
            description="The fastest path to lower CPL isn't spending less — it's targeting better. Here's how leading teams cut cost per lead by 40–60%."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {OPTIMIZATION_STRATEGIES.map((s, i) => (
              <div
                key={s.title}
                className="bg-white border border-slate-150 rounded-2xl p-7 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <s.Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[11px] font-bold text-blue-600 tracking-wider">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[16px] text-slate-900 tracking-[-0.01em] mb-2">
                  {s.title}
                </h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CPL by Audience Type: B2B vs. B2C vs. Healthcare ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Audience Breakdown"
            title={
              <>
                CPL by Audience Type:{" "}
                <span className="text-gradient">B2B vs. B2C vs. Healthcare</span>
              </>
            }
            description="Cost per lead varies dramatically by audience segment. Understanding the dynamics of each helps you set realistic benchmarks and allocate budget where it performs."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 reveal">
            {AUDIENCE_TYPES.map((aud) => (
              <div
                key={aud.type}
                className="relative bg-white border border-slate-150 rounded-[24px] overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 group"
              >
                {/* Gradient header */}
                <div className={`bg-gradient-to-r ${aud.color} p-6 pb-8 relative`}>
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }} />
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 grid place-items-center backdrop-blur-sm">
                        <aud.Icon className="w-5.5 h-5.5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl text-white tracking-[-0.02em]">{aud.type}</h3>
                        <p className="text-white/70 text-[12px] font-medium">{aud.tagline}</p>
                      </div>
                    </div>
                    <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20 p-3.5 text-center">
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 mb-1">Avg. CPL Range</div>
                      <div className="font-display font-bold text-2xl text-white tracking-[-0.025em]">{aud.avgRange}</div>
                    </div>
                  </div>
                </div>

                {/* Points */}
                <div className="p-6 pt-5 space-y-4">
                  {aud.points.map((point, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-6 h-6 rounded-lg ${aud.bgColor} ${aud.borderColor} border grid place-items-center flex-shrink-0 mt-0.5`}>
                        <span className={`font-mono text-[10px] font-bold ${aud.textColor}`}>{i + 1}</span>
                      </div>
                      <p className="text-slate-600 text-[14px] leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How Data Quality Drives CPL ── */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="The Data Advantage"
            title={
              <>
                How Data Quality{" "}
                <span className="text-gradient">Drives CPL Down</span>
              </>
            }
            description="The fastest CPL improvement doesn't come from negotiating lower ad rates — it comes from eliminating waste at the data layer before a single dollar is spent on media."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {DATA_QUALITY_DRIVERS.map((d, i) => (
              <div
                key={d.title}
                className="relative bg-white border border-slate-150 rounded-2xl p-7 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-bl from-blue-50/80 to-transparent rounded-full pointer-events-none" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 grid place-items-center text-blue-600 group-hover:bg-blue-100 group-hover:scale-105 transition-all">
                      <d.Icon className="w-6 h-6" />
                    </div>
                    {/* Stat badge */}
                    <div className="text-right">
                      <div className="font-display font-bold text-2xl text-blue-700 tracking-[-0.03em] leading-none">{d.stat}</div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400 mt-0.5">{d.statLabel}</div>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-[16px] text-slate-900 tracking-[-0.01em] mb-2.5 group-hover:text-blue-700 transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CPL Trends: What's Shifting ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Market Intelligence"
            title={
              <>
                CPL Trends:{" "}
                <span className="text-gradient">What&rsquo;s Shifting</span>
              </>
            }
            description="The CPL landscape is evolving fast. Here are the macro trends reshaping what marketers pay per lead — and what you can do to stay ahead."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto reveal">
            {CPL_TRENDS.map((t, i) => (
              <div
                key={t.title}
                className="relative bg-white border border-slate-150 rounded-[22px] p-7 lg:p-8 hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 group"
              >
                {/* Gradient left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center text-slate-600 group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 transition-all flex-shrink-0">
                    <t.Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <h3 className="font-display font-bold text-[17px] text-slate-900 tracking-[-0.01em] group-hover:text-blue-700 transition-colors">
                        {t.title}
                      </h3>
                      <span className={`text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border ${t.badgeColor} whitespace-nowrap`}>
                        {t.badge}
                      </span>
                    </div>
                    <p className="text-[14.5px] text-slate-600 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lorann Advantage CTA Banner ── */}
      <section className="py-16 lg:py-20 radial-stats">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[32px] p-8 lg:p-14 text-white grid lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-10 items-center"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative w-20 h-20 lg:w-28 lg:h-28 rounded-[24px] bg-cyan-400/15 border border-cyan-400/28 grid place-items-center">
              <TrendingDown className="w-10 h-10 lg:w-14 lg:h-14 text-cyan-300" />
            </div>
            <div className="relative max-w-[560px]">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-3">
                The Data Advantage
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-[2rem] tracking-[-0.025em] leading-tight mb-3.5">
                Cut your CPL by 40–60% — guaranteed.
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                Our clients consistently reduce cost per lead by switching to Lorann&rsquo;s verified databases, enrichment services, and Signal eXchange™ intent data. Better data in, lower cost out.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-cyan-400/30 text-white font-semibold text-[14.5px] rounded-xl backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── About CPL — Why Choose (Split) ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="reveal mb-12 lg:mb-16">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The Difference
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900 max-w-3xl">
                Why Smart Marketers Choose{" "}
                <span className="text-gradient">Data-Driven CPL Optimization</span>
              </h2>
            </div>

            <div className="reveal grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-16 items-start">
              {/* Prose paragraphs */}
              <div className="space-y-5">
                <p className="text-slate-700 text-[17px] leading-[1.8] tracking-[-0.005em]">
                  Most marketers treat cost per lead as an output metric — something you measure after a campaign ends. We treat it as an input you can engineer from the start. By building campaigns on verified, enriched, and intent-scored audiences, you set a lower CPL floor before a single ad dollar is committed.
                </p>
                <p className="text-slate-700 text-[17px] leading-[1.8] tracking-[-0.005em]">
                  Our approach is different because we attack CPL from the data layer, not the creative layer. Better targeting means higher relevance scores, lower auction costs, and fewer wasted impressions. Better deliverability means every email, every call, and every direct-mail piece reaches a real person.
                </p>
                <p className="text-slate-700 text-[17px] leading-[1.8] tracking-[-0.005em]">
                  The result is a compounding advantage. Each campaign cycle generates cleaner performance data, which feeds better optimization, which drives CPL even lower over time. Clients who stay with Lorann for 12 months or longer routinely see CPL reductions of 50% or more compared to their original benchmarks.
                </p>
              </div>

              {/* Timeline-style highlights */}
              <div className="relative">
                <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-300 rounded-full" />
                <div className="flex flex-col gap-6">
                  {[
                    { label: "Verified Audiences", text: "Every record passes multi-point verification before entering your campaign file, eliminating the dead weight that inflates CPL across every channel." },
                    { label: "Intent-First Targeting", text: "Signal eXchange behavioral signals identify in-market accounts so your spend concentrates where conversion probability is highest." },
                    { label: "Continuous Optimization", text: "Monthly data refreshes and campaign-level match-back reporting create a feedback loop that drives CPL lower with each successive campaign." },
                    { label: "Full-Funnel Visibility", text: "Track cost per lead from first touch through closed revenue to understand true acquisition economics, not just top-of-funnel vanity metrics." },
                  ].map((h, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-[9px] top-[6px] w-[14px] h-[14px] rounded-full border-[3px] border-white bg-gradient-to-br from-blue-600 to-cyan-500 shadow-[0_0_0_3px_rgba(29,69,217,0.12)] z-10" />
                      <div className="bg-white border border-slate-150 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                        <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-blue-700 mb-1.5">
                          {h.label}
                        </div>
                        <p className="text-slate-700 text-[14.5px] leading-relaxed">{h.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About CPL — Who Benefits (Dark Centered) ── */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div
              className="relative overflow-hidden rounded-[28px] p-8 lg:p-14 reveal"
              style={{
                background:
                  "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.25), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(34, 191, 255, 0.18), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
              }}
            >
              {/* Dot pattern */}
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(111, 211, 255, 0.1) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              <div className="relative">
                {/* Header */}
                <div className="mb-10">
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                    Built For Your Team
                  </div>
                  <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-white max-w-2xl">
                    Who Benefits from{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                      CPL Optimization?
                    </span>
                  </h2>
                </div>

                {/* Two-column: prose + persona cards */}
                <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-start">
                  {/* Prose paragraphs */}
                  <div className="space-y-5">
                    <p className="text-white/70 text-[16px] leading-[1.85] tracking-[-0.005em]">
                      Cost per lead is not just a marketing metric — it is a business performance indicator that touches demand generation, sales, finance, and executive leadership. Every team that touches the revenue pipeline has a stake in driving CPL down while maintaining lead quality.
                    </p>
                    <p className="text-white/70 text-[16px] leading-[1.85] tracking-[-0.005em]">
                      Whether you are a growth marketer managing six-figure monthly media budgets, a sales development leader who needs qualified pipeline, or a CFO evaluating marketing ROI, our data infrastructure gives you the precision and transparency to make CPL work harder for your organization.
                    </p>
                  </div>

                  {/* Persona cards */}
                  <div className="flex flex-col gap-3 mt-6 lg:mt-0">
                    {[
                      { label: "Demand Gen Marketers", text: "Build precisely targeted campaigns across email, paid search, social, and programmatic display with verified audiences that lower CPL from the first send.", border: "border-l-cyan-400", dot: "bg-cyan-400" },
                      { label: "Sales Development Teams", text: "Receive higher-quality leads with accurate direct dials and verified emails so outreach connects with real decision-makers, not dead ends.", border: "border-l-blue-500", dot: "bg-blue-500" },
                      { label: "Marketing Operations", text: "Integrate clean, enriched data into your CRM and MAP workflows to improve lead scoring accuracy and reduce the manual effort of data cleansing.", border: "border-l-violet-500", dot: "bg-violet-500" },
                      { label: "Revenue Leadership", text: "Gain full-funnel visibility from CPL through customer acquisition cost to understand the true ROI of every marketing dollar invested.", border: "border-l-emerald-400", dot: "bg-emerald-400" },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className={`relative border-l-[3px] ${p.border} rounded-xl bg-white/[0.06] backdrop-blur-sm p-5 hover:bg-white/[0.1] transition-all duration-300 group`}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`w-2 h-2 rounded-full ${p.dot} mt-1.5 flex-shrink-0 shadow-[0_0_6px_currentColor]`} />
                          <div>
                            <div className="font-display font-semibold text-[15px] text-white tracking-[-0.01em] mb-1">{p.label}</div>
                            <p className="text-white/55 text-[13.5px] leading-relaxed">{p.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enhanced FAQ ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="FAQ"
            title={
              <>
                Frequently asked{" "}
                <span className="text-gradient">questions.</span>
              </>
            }
            description="Everything you need to know about Cost Per Lead — from calculation to optimization."
          />

          <div className="max-w-3xl mx-auto flex flex-col gap-4 reveal">
            {ENHANCED_FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-150 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 lg:p-7 select-none list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3.5 pr-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 grid place-items-center flex-shrink-0">
                      <span className="font-mono text-[11px] font-bold text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-[16px] text-slate-900 tracking-[-0.01em]">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 lg:px-7 lg:pb-7 -mt-1 ml-[46px]">
                  <p className="text-[15px] text-slate-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Band ── */}
      <section className="py-0">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[28px] my-16 p-8 lg:p-12 text-white"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.22), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/28 grid place-items-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7 text-cyan-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl lg:text-2xl tracking-[-0.02em] mb-2">
                  Lower CPL without cutting corners on compliance.
                </h3>
                <p className="text-white/70 text-[15px] leading-relaxed max-w-3xl">
                  Every lead generated through our data is backed by CCPA, GDPR, and CAN-SPAM compliance. Our datasets are ethically sourced, regularly verified, and fully documented — so you can scale lead generation without regulatory risk.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
