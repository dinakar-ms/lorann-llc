import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { Activity, Landmark, Briefcase, ShieldCheck, Car, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries Served · Lorann LLC",
  description:
    "We support organizations across industries where data quality, targeting precision, and performance matter most — healthcare, financial services, B2B, insurance, and automotive.",
};

export default function IndustriesServedPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
          { label: "Industries Served" },
        ]}
        kicker="About"
        title={
          <>
            Where data quality, precision,{" "}
            <span className="text-gradient">and performance matter most.</span>
          </>
        }
        description="We support organizations across industries where data quality, targeting precision, and campaign performance are non-negotiable."
        primaryCta={{ label: "See Case Studies", href: "/insights/case-studies" }}
        secondaryCta={{ label: "Start a Conversation", href: "/contact" }}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Coverage"
            title={
              <>
                Five industries. <span className="text-gradient">Deep coverage.</span>
              </>
            }
            description="Each vertical gets purpose-built data assets and activation workflows — not one-size-fits-all."
          />
          <FeatureCardGrid
            columns={3}
            features={[
              {
                Icon: Activity,
                title: "Healthcare",
                desc: "Compliance-first data for providers, facilities, and patient-directed campaigns. Specialty, credential, and NPI-level targeting.",
              },
              {
                Icon: Landmark,
                title: "Financial Services",
                desc: "High-intent consumer audiences for banking, lending, investment, and insurance-adjacent products.",
              },
              {
                Icon: Briefcase,
                title: "B2B / Professional Services",
                desc: "ABM, prospecting, and executive reach across industry, role, department, and seniority.",
              },
              {
                Icon: ShieldCheck,
                title: "Insurance",
                desc: "Performance-driven lead programs for auto, home, life, and commercial lines — powered by Signal eXchange™.",
              },
              {
                Icon: Car,
                title: "Automotive",
                desc: "In-market, lifecycle, and loyalty audiences for OEMs, dealer groups, and captive lenders.",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="reveal bg-white border border-slate-150 rounded-3xl p-10 lg:p-14 shadow-md text-center max-w-3xl mx-auto">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
              Don&rsquo;t see yours?
            </div>
            <h3 className="font-display font-bold text-2xl lg:text-[1.9rem] tracking-[-0.025em] text-slate-900 leading-tight mb-3">
              We build custom audiences across adjacent verticals too.
            </h3>
            <p className="text-slate-600 text-[15px] leading-relaxed max-w-lg mx-auto mb-6">
              From SaaS and retail to education and non-profit — if the vertical rewards precision
              targeting and channel integration, we can build for it.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
            >
              Talk to our team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
