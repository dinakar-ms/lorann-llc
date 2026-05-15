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
    q: "How can Lorann LLC help reduce my CPL?",
    a: "Lorann provides verified B2B and B2C databases with 95%+ accuracy, intent signals via Signal eXchange™, and data enrichment services. Our clients typically see 40–60% CPL reductions by replacing generic third-party data with precision-targeted, verified audience segments.",
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
                A lower CPL means more leads for the same budget, a shorter path to ROI, and more room to scale. The biggest lever? <strong className="text-slate-900">The quality of data powering your campaigns.</strong>
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
              { value: "40–60%", label: "CPL Reduction", sub: "With Lorann Data" },
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
            Sources: Aggregated from HubSpot, Gartner, and internal Lorann campaign data (2024–2025). All figures in USD.
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

      {/* ── Lorann Advantage CTA Banner ── */}
      <section className="py-16 lg:py-20 bg-white">
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
                The Lorann Advantage
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

      {/* ── FAQ ── */}
      <section className="py-20 lg:py-28 radial-stats">
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
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group bg-white border border-slate-150 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-lg transition-all"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 lg:p-7 select-none list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display font-bold text-[16px] text-slate-900 tracking-[-0.01em] pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-6 pb-6 lg:px-7 lg:pb-7 -mt-1">
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
                  Every lead generated through Lorann data is backed by CCPA, GDPR, and CAN-SPAM compliance. Our datasets are ethically sourced, regularly verified, and fully documented — so you can scale lead generation without regulatory risk.
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
