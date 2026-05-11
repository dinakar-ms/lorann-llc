import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Building2,
  Users2,
  Cpu,
  Briefcase,
  Activity,
  Target,
  Database,
  Globe2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "B2B Data & Audiences · Lorann LLC",
  description:
    "Decision-makers, department heads, and procurement teams across industries — with firmographic, technographic, and intent overlays for ABM and demand-gen.",
};

export default function B2BPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "B2B" },
        ]}
        kicker="Industry · B2B"
        title={
          <>
            Decision-makers, buying committees,{" "}
            <span className="text-gradient">and the signal between them.</span>
          </>
        }
        description="Reach C-suite, department heads, technical evaluators, and procurement teams across every industry — with firmographic, technographic, and Signal eXchange™ intent overlays built for ABM and demand-generation."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "B2B Data", href: "/data-assets/b2b-data" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why B2B teams choose Lorann
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                ABM lists that survive{" "}
                <span className="text-gradient">past the quarter.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                B2B lists rot faster than the calendars built around them. Title-only targeting fails the moment a buying committee shifts. The lists that hold up map roles at the function and influence level — and rebuild that mapping as titles change underneath them.
              </p>
              <p>
                Our B2B file is a maintained surface, not a one-time deliverable: continuously verified contacts, technographic overlays, and Signal eXchange™ intent layered on top so segments stay sharp through the entire campaign cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="Coverage"
            title={
              <>
                Four B2B audiences{" "}
                <span className="text-gradient">we deliver every week.</span>
              </>
            }
            description="From single-title prospecting to enterprise-wide ABM — all sourced from the same maintained surface."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Building2, title: "Decision-Makers", desc: "C-suite, VPs, and economic buyers — mapped by function, seniority, and influence." },
              { Icon: Users2, title: "Buying Committees", desc: "Economic buyer, technical evaluator, end user, and blocker — surfaced together." },
              { Icon: Cpu, title: "Technical Buyers", desc: "Engineering, IT, security, and platform owners — filtered by installed stack." },
              { Icon: Briefcase, title: "Procurement & Ops", desc: "Procurement, finance, legal, and operations decision-makers." },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="What's Inside"
            title={
              <>
                Designed for ABM and demand-gen{" "}
                <span className="text-gradient">that needs to scale.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Database, title: "Verified Contacts", desc: "Direct dials, validated business email, and continuously refreshed records." },
              { Icon: Cpu, title: "Technographic Overlays", desc: "Installed software, platform usage, and stack-fit filtering at the account level." },
              { Icon: Activity, title: "Signal eXchange™ Intent", desc: "Accounts actively researching your category — surfaced in real time." },
              { Icon: Globe2, title: "Global Coverage", desc: "US core, with international firmographic and contact coverage on demand." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
