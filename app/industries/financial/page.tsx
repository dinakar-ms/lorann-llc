import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Banknote,
  Landmark,
  LineChart,
  Building2,
  Briefcase,
  Activity,
  Database,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Services Data & Audiences · Lorann LLC",
  description:
    "Banking, credit union, wealth management, and insurance audiences enriched with intent signals — built for compliance-aware campaigns at scale.",
};

export default function FinancialPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
          { label: "Financial" },
        ]}
        kicker="Industry · Financial"
        title={
          <>
            Bank, wealth, and credit-union audiences —{" "}
            <span className="text-gradient">with intent layered in.</span>
          </>
        }
        description="Verified financial-services audiences across retail banking, credit unions, wealth management, and insurance — enriched with real-time intent signals so campaigns reach buyers in-market this week, not last quarter."
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{ label: "All Industries", href: "/industries" }}
      />

      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Why financial-services teams choose Lorann
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Intent signal in a vertical where{" "}
                <span className="text-gradient">timing is the campaign.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>
                Financial services moves on windows that close fast: a refi window, a mortgage rate change, a life event. Generic demographics describe who someone is — they don&apos;t predict what they&apos;re about to do.
              </p>
              <p>
                Our financial-services audiences layer firmographic and demographic data with Signal eXchange™ intent — so segments are scoped tight enough to perform and timed tight enough to convert.
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
                Four financial-services audiences{" "}
                <span className="text-gradient">we activate daily.</span>
              </>
            }
            description="Retail, commercial, and advisory — sourced from verified financial-services datasets."
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Banknote, title: "Retail Banking", desc: "Checking, savings, credit card, and lending audiences — overlaid with in-market intent." },
              { Icon: Landmark, title: "Credit Unions", desc: "Member-aligned segments for community-scale FIs and shared-branch networks." },
              { Icon: LineChart, title: "Wealth Management", desc: "Advisors, RIAs, broker-dealers, and HNW/UHNW consumer audiences." },
              { Icon: ShieldCheck, title: "Insurance", desc: "Auto, life, health, and property buyers from high-intent lead programs." },
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
                Built for compliance-aware{" "}
                <span className="text-gradient">campaign teams.</span>
              </>
            }
          />
          <FeatureCardGrid
            columns={4}
            features={[
              { Icon: Activity, title: "Intent Overlays", desc: "Signal eXchange™ flags buyers researching loans, cards, advisory, or coverage right now." },
              { Icon: Building2, title: "Firmographic Depth", desc: "Bank size, charter type, AUM bands, and broker-dealer affiliation." },
              { Icon: Briefcase, title: "Role Mapping", desc: "C-suite, treasury, lending, compliance, advisory — by function and seniority." },
              { Icon: Database, title: "Continuously Refreshed", desc: "Verified monthly so role changes and account moves don&apos;t silently erode performance." },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
