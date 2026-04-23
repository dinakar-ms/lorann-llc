import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Plus,
  Zap,
  TrendingUp,
  Target,
  CheckCircle2,
  GitBranch,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Enrichment & Modeling · Lorann LLC",
  description:
    "Enhance and refine existing datasets using appended attributes, modeling, and intent signals to improve match rates, targeting accuracy, and campaign performance.",
};

export default function DataEnrichmentPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Data Enrichment & Modeling" },
        ]}
        kicker="Solution 02"
        title={
          <>
            Make your existing data <span className="text-gradient">do more.</span>
          </>
        }
        description="Enhance and refine existing datasets using appended attributes, modeling, and intent signals to improve match rates, targeting accuracy, and campaign performance."
        primaryCta={{ label: "Enrich My Data", href: "/contact" }}
        secondaryCta={{ label: "See Data Assets", href: "/data-assets" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why enrichment matters
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                A bigger list isn&rsquo;t better.{" "}
                <span className="text-gradient">A smarter list is.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Most marketing teams are sitting on data that&rsquo;s incomplete, outdated, or missing
                the signals that actually predict performance. Enrichment closes those gaps.
              </p>
              <p>
                We append firmographic, demographic, behavioral, and intent attributes to your
                existing file — then model on top to identify the segments most likely to respond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="What Gets Added"
            title={
              <>
                Attributes, signals, and models —{" "}
                <span className="text-gradient">in one pass.</span>
              </>
            }
            description="Mix and match the enrichment layers that move your specific performance metric."
          />
          <FeatureCardGrid
            columns={3}
            features={[
              { Icon: Plus, title: "Attribute Appends", desc: "Firmographic, demographic, technographic, and contact-level appends to complete your records." },
              { Icon: Zap, title: "Intent Signal Overlay", desc: "Layer behavioral and buying signals onto your file to prioritize in-market accounts." },
              { Icon: GitBranch, title: "Lookalike Modeling", desc: "Build predictive lookalikes from your best customers to find more of them." },
              { Icon: Target, title: "Lead Scoring", desc: "Score records by conversion likelihood so sales works the highest-value accounts first." },
              { Icon: TrendingUp, title: "Match Rate Improvement", desc: "Clean, standardize, and match your file against our verified datasets to lift activation rates." },
              { Icon: CheckCircle2, title: "Validation & Hygiene", desc: "Monthly tele-verification and email validation keep your file accurate and deliverable." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
