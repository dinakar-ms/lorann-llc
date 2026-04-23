import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Users,
  Briefcase,
  Activity,
  Filter,
  Database,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Audience Targeting & Data Development · Lorann LLC",
  description:
    "Build precise audiences using B2B, consumer, and healthcare data, enhanced through custom sourcing, segmentation, and proprietary data development.",
};

export default function AudienceTargetingPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions", href: "/solutions" },
          { label: "Audience Targeting" },
        ]}
        kicker="Solution 01"
        title={
          <>
            Build precise audiences from{" "}
            <span className="text-gradient">the ground up.</span>
          </>
        }
        description="Leverage B2B, consumer, and healthcare data enhanced through custom sourcing, segmentation, and proprietary data development — designed to reach exactly the right audience."
        primaryCta={{ label: "Get Started", href: "/contact" }}
        secondaryCta={{ label: "See Data Assets", href: "/data-assets" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What this solution covers
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Segmentation, sourcing, and the inputs that feed{" "}
                <span className="text-gradient">your activation platforms.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Audience targeting is the foundation of every campaign. We build, refine, and source
                audience segments using verified B2B, healthcare, and consumer datasets — then
                enhance them through our proprietary data development process.
              </p>
              <p>
                The output: clean, campaign-ready audiences that plug directly into your CRM, DSP,
                email platform, or activation channel of choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <SectionHeader
            kicker="How We Build It"
            title={
              <>
                Four building blocks behind{" "}
                <span className="text-gradient">every audience.</span>
              </>
            }
            description="Each segment we deliver runs through this process — whether you need 50,000 records or 5 million."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Search, title: "Discover", desc: "Map your ideal audience across firmographic, demographic, behavioral, and intent dimensions." },
              { Icon: Database, title: "Source", desc: "Pull from verified B2B, consumer, and healthcare datasets — plus proprietary sources." },
              { Icon: SlidersHorizontal, title: "Segment", desc: "Apply custom logic, modeling, and scoring to isolate the audiences that will perform." },
              { Icon: Filter, title: "Deliver", desc: "Hand off campaign-ready audiences in the format your platforms expect." },
            ]}
          />
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Coverage"
            title={
              <>
                B2B, healthcare, and consumer —{" "}
                <span className="text-gradient">in one engagement.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={3}
            features={[
              { Icon: Briefcase, title: "B2B Audiences", desc: "Industry, function, seniority, and technographic targeting at scale." },
              { Icon: Activity, title: "Healthcare Audiences", desc: "Specialty, NPI-based targeting, and patient-facing consumer segments." },
              { Icon: Users, title: "Consumer Audiences", desc: "Lifestyle, demographic, and behavioral segmentation." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
