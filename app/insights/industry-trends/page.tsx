import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industry Trends · Lorann LLC",
  description:
    "Perspectives on data, audience strategy, and performance-driven marketing — articles, commentary, and strategic POV.",
};

const POSTS = [
  {
    title: "Why first-party lead data outperforms third-party files in 2026.",
    excerpt:
      "The intent signal layer matters more than the list size. A look at how Signal eXchange™ is built, and why continuous refresh beats quarterly batch updates.",
    category: "Data Strategy",
    readingTime: "7 min read",
    date: "Apr 2026",
    slug: "#",
    featured: true,
  },
  {
    title: "Data activation is the new bottleneck — not data sourcing.",
    excerpt:
      "Marketing teams have more data than ever, and less of it is making it into production. Why integration, not acquisition, is the unlock.",
    category: "Activation",
    readingTime: "6 min read",
    date: "Apr 2026",
    slug: "#",
  },
  {
    title: "Three patterns we see in healthcare audience campaigns.",
    excerpt:
      "Provider-to-patient journeys, specialty-specific targeting, and compliance as a design constraint (not an afterthought).",
    category: "Healthcare",
    readingTime: "5 min read",
    date: "Mar 2026",
    slug: "#",
  },
  {
    title: "The case against generic consumer data.",
    excerpt:
      "Demographics alone don't predict behavior. Why intent and lifecycle overlays transform the same audience into a very different result.",
    category: "Consumer",
    readingTime: "4 min read",
    date: "Mar 2026",
    slug: "#",
  },
  {
    title: "How we think about ABM data quality.",
    excerpt:
      "Role mapping, technographic overlays, and the verification cadence that keeps account lists alive past their quarterly — written up as a working playbook.",
    category: "B2B",
    readingTime: "8 min read",
    date: "Feb 2026",
    slug: "#",
  },
  {
    title: "Auto and insurance: when intent data changes the ROI math.",
    excerpt:
      "Case observations from running Signal eXchange™ across live campaigns — the segments that converted, and the ones that didn't.",
    category: "Insurance",
    readingTime: "6 min read",
    date: "Feb 2026",
    slug: "#",
  },
];

export default function IndustryTrendsPage() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Industry Trends" },
        ]}
        kicker="Insights"
        title={
          <>
            Perspectives on data, audience strategy,{" "}
            <span className="text-gradient">and performance marketing.</span>
          </>
        }
        description="Articles, commentary, strategic POV, and market observations from the Lorann team."
        primaryCta={{ label: "Subscribe for Updates", href: "/insights/newsletter" }}
        secondaryCta={{ label: "See Case Studies", href: "/insights/case-studies" }}
      />

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <Link
            href={featured.slug}
            className="reveal block bg-white border border-slate-150 rounded-[28px] overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 group"
          >
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0 min-h-[320px]">
              <div
                className="relative overflow-hidden min-h-[260px]"
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.3), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                    maskImage:
                      "radial-gradient(ellipse 80% 60% at center, #000 20%, transparent 80%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 80% 60% at center, #000 20%, transparent 80%)",
                  }}
                />
                <div className="absolute top-7 left-7 px-3 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center flex-wrap gap-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3 h-3" /> {featured.readingTime}
                  </span>
                  <span className="text-slate-500">{featured.date}</span>
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-[2rem] leading-tight tracking-[-0.025em] text-slate-900 mb-4">
                  {featured.title}
                </h2>
                <p className="text-slate-600 text-[15px] lg:text-base leading-relaxed mb-5">
                  {featured.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-[14px]">
                  Read the piece <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Latest"
            title={
              <>
                Recent commentary <span className="text-gradient">and POV.</span>
              </>
            }
            description="Short reads and long reads — grouped by the channels and industries they touch."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((p) => (
              <Link
                key={p.title}
                href={p.slug}
                className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-500 flex flex-col group"
              >
                <div className="flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-4">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag className="w-[11px] h-[11px]" /> {p.category}
                  </span>
                  <span className="text-slate-500">{p.date}</span>
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900 tracking-[-0.02em] leading-tight mb-3">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-[14px] leading-relaxed flex-1 mb-4">
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-150">
                  <span className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                    <Clock className="w-3 h-3" /> {p.readingTime}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-blue-700">
                    Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
