import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Target, Eye, Heart, Compass, Zap, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Overview · Lorann LLC",
  description:
    "Lorann is a data-driven marketing partner focused on building and activating high-quality audiences that drive measurable results.",
};

export default function CompanyOverviewPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Company Overview" },
        ]}
        kicker="About"
        title={
          <>
            A data-driven marketing partner{" "}
            <span className="text-gradient">focused on results.</span>
          </>
        }
        description="Lorann is a data-driven marketing partner focused on building and activating high-quality audiences that drive measurable results."
        primaryCta={{ label: "Our Approach", href: "/about/our-approach" }}
        secondaryCta={{ label: "Meet the Team", href: "/about/meet-the-team" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What we do
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Audiences built to perform — across{" "}
                <span className="text-gradient">B2B, consumer, and healthcare.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                We work across B2B, consumer, and healthcare datasets, combining deep experience in
                data development, segmentation, and campaign execution to help organizations reach
                the right audiences — and make those audiences perform.
              </p>
              <p>
                Our approach centers on three things: the quality of the data, the precision of the
                targeting, and the measurable performance across channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="What We Stand For"
            title={
              <>
                Four principles behind{" "}
                <span className="text-gradient">every engagement.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Target, title: "Performance First", desc: "We measure success by outcomes, not data volume." },
              { Icon: Eye, title: "Honest Data", desc: "Verified, validated, and transparent about what we can and can't do." },
              { Icon: Heart, title: "Partner Mindset", desc: "We work the brief, not just the order." },
              { Icon: Compass, title: "Continuous Improvement", desc: "Refined by real campaign results, not ideal-case assumptions." },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="reveal bg-white border border-slate-150 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white grid place-items-center mb-5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
                Our mission
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Help marketers reach the right audience, on the right channel, with the right
                message — through data that&rsquo;s verified, enriched, and continuously improved.
              </p>
            </div>
            <div className="reveal bg-white border border-slate-150 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white grid place-items-center mb-5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2.5 tracking-tight text-slate-900">
                Where we&rsquo;re going
              </h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">
                Expanding Signal eXchange™ across more verticals, deepening our intent-signal
                coverage, and building the activation connectors that modern marketers expect.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
