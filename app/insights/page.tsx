import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { LineChart, FileText, Mailbox } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights · Lorann LLC",
  description:
    "POV, commentary, case studies, and newsletters on data, audience strategy, and performance-driven marketing.",
};

export default function InsightsPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        kicker="Insights"
        title={
          <>
            Perspectives on <span className="text-gradient">data, audience strategy,</span> and performance-driven marketing.
          </>
        }
        description="Our content hub for POV, commentary, case studies, and data-driven insights from the team at Lorann."
        primaryCta={{ label: "Read Industry Trends", href: "/insights/industry-trends" }}
        secondaryCta={{ label: "See Case Studies", href: "/insights/case-studies" }}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Browse by Type"
            title={
              <>
                Three places <span className="text-gradient">to dig in.</span>
              </>
            }
            description="Short-form commentary, real-campaign results, and periodic updates — all in one place."
          />
          <FeatureCardGrid
            columns={3}
            features={[
              {
                Icon: LineChart,
                title: "Industry Trends",
                desc: "Perspectives on data, audience strategy, and performance-driven marketing. Articles, commentary, and strategic POV.",
                href: "/insights/industry-trends",
              },
              {
                Icon: FileText,
                title: "Case Studies",
                desc: "Examples of how Lorann data and audience strategies support real campaign performance across industries and channels.",
                href: "/insights/case-studies",
              },
              {
                Icon: Mailbox,
                title: "Newsletter",
                desc: "Get periodic insights on data, audience strategy, and marketing performance delivered directly to your inbox.",
                href: "/insights/newsletter",
              },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
