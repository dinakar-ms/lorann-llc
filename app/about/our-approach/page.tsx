import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Approach · Lorann LLC",
  description:
    "Data is only valuable if it performs. We focus on how audiences are built, how they're activated, and how they improve over time.",
};

export default function OurApproachPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Our Approach" },
        ]}
        kicker="About"
        title={
          <>
            Data is only valuable{" "}
            <span className="text-gradient">if it performs.</span>
          </>
        }
        description="We focus on how audiences are built, how they're activated, and how they improve over time — integrating data across digital, CRM, and lead generation, and continuously refining it based on real campaign results."
        primaryCta={{ label: "See Solutions", href: "/solutions" }}
        secondaryCta={{ label: "Meet the Team", href: "/about/meet-the-team" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The philosophy
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Build well. Activate fully.{" "}
                <span className="text-gradient">Improve constantly.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Most data fails not because it&rsquo;s bad, but because it sits in silos. Our approach
                integrates audience data directly into the channels and workflows you already run —
                so what you buy actually reaches production.
              </p>
              <p>
                And because the data is tied to activation, we see what performs. That feedback loop
                is the engine behind continuous refinement — not guesses, but measurable
                improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Method"
            title={
              <>
                Five steps behind <span className="text-gradient">every engagement.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={3}
            style="numbered"
            features={[
              { title: "Understand the Brief", desc: "Align on audience, objectives, performance metrics, and channels." },
              { title: "Build the Audience", desc: "Source, segment, and enrich from verified datasets and proprietary layers." },
              { title: "Activate Across Channels", desc: "Deliver campaign-ready audiences into your CRM, DSP, email, or call center." },
              { title: "Measure Performance", desc: "Track outcomes at the segment level — what lifts conversion, what doesn't." },
              { title: "Refine & Scale", desc: "Feed results back into the model. Scale what works, retire what doesn't." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
