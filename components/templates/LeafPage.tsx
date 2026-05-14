import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import RichText from "@/components/RichText";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";
import type { Crumb } from "@/components/ui/SubPageHero";

export type Stat = { label: string; value: string };
export type Attribute = { Icon: React.ElementType; title: string; desc: any };
export type UseCase = { title: string; desc: any };

export interface LeafPageProps {
  /** Breadcrumb trail leading to this page */
  crumbs: Crumb[];
  /** Small uppercase label above the hero title (e.g. "Healthcare List", "B2C List") */
  kicker: string;
  /** Hero title — first part is plain, second part renders in gradient */
  titlePlain: string;
  titleAccent: string;
  /** Hero description paragraph */
  description: string;
  /** Snapshot strip: 2–4 stats shown in a horizontal row beneath the hero */
  stats: Stat[];
  /** Two-column intro block: kicker line + headline (left) and 2 paragraphs (right) */
  intro: {
    kicker: string;
    headlinePlain: string;
    headlineAccent: string;
    paragraphs: ReactNode[];
  };
  /** "What's Included" attribute grid — 6 to 8 cards work best */
  attributes: Attribute[];
  /** Use cases — 3 to 6 cards work best */
  useCases: UseCase[];
  /** Compliance band copy */
  compliance: {
    headline: string;
    body: string;
  };
  /** Optional sibling-list "back" link below the closing band */
  backLink: { label: string; href: string };
}

/**
 * Shared template for every product leaf page (e.g. Doctors Email List,
 * Real Estate, etc). Every section is data-driven via props so we can roll
 * out 60+ leaf pages with zero duplication and one place to edit the design.
 */
export default function LeafPage({
  crumbs,
  kicker,
  titlePlain,
  titleAccent,
  description,
  stats,
  intro,
  attributes,
  useCases,
  compliance,
  backLink,
}: LeafPageProps) {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={crumbs}
        kicker={kicker}
        title={
          <>
            {titlePlain} <span className="text-gradient">{titleAccent}</span>
          </>
        }
        description={description}
        primaryCta={{ label: "Request Counts & Sample", href: "/contact" }}
        secondaryCta={backLink}
      />

      {/* Snapshot strip */}
      {stats.length > 0 && (
        <section className="py-12 bg-white border-b border-slate-150">
          <div className="container-custom">
            <div
              className={`grid gap-6 max-w-5xl mx-auto reveal ${
                stats.length === 4
                  ? "grid-cols-2 md:grid-cols-4"
                  : stats.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-2"
              }`}
            >
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display font-bold text-3xl lg:text-4xl tracking-[-0.02em] text-slate-900 mb-1">
                    {s.value}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Intro split */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                {intro.kicker}
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                {intro.headlinePlain}{" "}
                <span className="text-gradient">{intro.headlineAccent}</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="What's Included"
            title={
              <>
                Every record carries the{" "}
                <span className="text-gradient">data points marketers need.</span>
              </>
            }
            description="Built so your team can segment, personalise, and activate without going back to enrich."
          />
          <FeatureCardGrid columns={4} features={attributes} />
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Use Cases"
            title={
              <>
                Built for the campaigns{" "}
                <span className="text-gradient">marketers run every day.</span>
              </>
            }
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {useCases.map((u) => (
              <div
                key={u.title}
                className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-500 group"
              >
                <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-4 bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">
                  {u.title}
                </h3>
                <p className="text-slate-600 text-[14.5px] leading-relaxed"><RichText value={u.desc} /></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance band */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div
            className="relative overflow-hidden rounded-[24px] p-8 lg:p-12 text-white reveal"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 30% 20%, rgba(79, 125, 245, 0.3), transparent 60%), linear-gradient(135deg, #03061A 0%, #13256E 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 grid place-items-center text-cyan-300 flex-shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl lg:text-3xl tracking-tight mb-2">
                  {compliance.headline}
                </h3>
                <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                  <RichText value={compliance.body} />
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-semibold text-[14px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(111,211,255,0.5)] transition-all flex-shrink-0"
              >
                Discuss Licensing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing licensing note */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto reveal">
            <p className="text-[15px] text-slate-700 leading-relaxed border-l-4 border-blue-200 pl-5 italic">
              <strong className="text-slate-900 not-italic">Please note:</strong> We offer direct
              marketers the ability to license complete multi-channel records (with all
              selections included) for a 12-month unlimited-use arrangement. Data can be used for
              postal, email, and outbound telemarketing campaigns.{" "}
              <Link
                href="/contact"
                className="text-blue-700 not-italic font-semibold hover:underline"
              >
                Contact Lorann for details and pricing.
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
