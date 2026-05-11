import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ShieldCheck,
  Car,
  HeartPulse,
  Home,
  Activity,
  Target,
  Database,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insurance Data & Audiences · Lorann LLC",
  description:
    "Auto, life, health, and property insurance buyers from high-intent lead programs — built for carriers, brokers, and direct-response programs.",
};

export default function InsurancePage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Insurance" },
        ]}
        kicker="Industry · Insurance"
        title={
          <>
            Auto, life, health, and property —{" "}
            <span className="text-gradient">timed to the intent window.</span>
          </>
        }
        description="High-intent insurance audiences sourced from verified lead programs and overlaid with real-time intent signal. Built for carriers, brokers, and direct-response programs that need to compress cost-per-bind without sacrificing quote quality."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "All Industries", href: "/industries" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why insurance teams choose Lorann
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                When intent data is fresh,{" "}
                <span className="text-gradient">the ROI math changes.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Insurance carriers run some of the most cost-sensitive direct-response programs in the market. Intent windows are short — quote-stage signal that&apos;s a week old is usually already someone else&apos;s bind.
              </p>
              <p>
                Our insurance audiences are scoped tightly to in-market windows, matched to the right campaign stage, and refreshed continuously. The headline metric isn&apos;t response rate — it&apos;s cost-per-bind, and the right segmentation moves it down by a step-function.
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
                Four insurance audiences{" "}
                <span className="text-gradient">we activate every week.</span>
              </>
            }
            description="From quote-stage retargeting to life-event-driven outreach — sourced from verified lead programs."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Car, title: "Auto Insurance", desc: "In-market quote-stage and bind-stage audiences, segmented by vehicle, geo, and carrier eligibility." },
              { Icon: HeartPulse, title: "Health & Life", desc: "Life-event-driven prospects for term, whole life, and supplemental health coverage." },
              { Icon: Home, title: "Home & Property", desc: "Homeowners, renters, and high-value property prospects with refresh-cycle eligibility." },
              { Icon: ShieldCheck, title: "Commercial Lines", desc: "Small-business and mid-market commercial property, liability, and BOP buyers." },
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
                Built for carriers chasing{" "}
                <span className="text-gradient">lower cost-per-bind.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Activity, title: "Quote-Stage Intent", desc: "Signal eXchange™ surfaces prospects actively shopping coverage in your geos." },
              { Icon: Target, title: "Stage-Matched Audiences", desc: "Quote-stage and bind-stage routed to the right creative — never mixed under one segment." },
              { Icon: Database, title: "Verified Lead Programs", desc: "Sourced from compliant, consented lead programs with continuous suppression hygiene." },
              { Icon: TrendingUp, title: "Carrier Eligibility", desc: "Geo, age, vehicle, and underwriting eligibility filtered before activation, not after." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
