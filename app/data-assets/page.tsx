import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Users,
  Briefcase,
  Activity,
  CreditCard,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Assets · Built on Better Data — Lorann LLC",
  description:
    "A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels.",
};

export default function DataAssetsPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Data Assets" }]}
        kicker="Data Assets"
        title={
          <>
            Built on <span className="text-gradient">Better Data.</span>
          </>
        }
        description="A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels."
        primaryCta={{ label: "View Data Cards", href: "/data-assets/data-cards" }}
        secondaryCta={{ label: "Request Data Overview", href: "/contact" }}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker="Explore the Data"
            title={
              <>
                Five asset classes,{" "}
                <span className="text-gradient">one unified platform.</span>
              </>
            }
            description="Each dataset is built for a specific targeting need — and designed to work together when you need broader audience coverage."
          />
          <FeatureCardGrid
            columns={3}
            features={[
              {
                Icon: Briefcase,
                title: "B2B Data",
                desc: "Comprehensive business and professional datasets for prospecting, account-based marketing, and audience development across industries.",
                href: "/data-assets/b2b-data",
              },
              {
                Icon: Activity,
                title: "Healthcare Data",
                desc: "Specialized healthcare datasets built with compliance, accuracy, and targeting precision in mind.",
                href: "/data-assets/healthcare-data",
              },
              {
                Icon: Sparkles,
                title: "Signal eXchange™",
                desc: "Lorann's proprietary dataset, combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences.",
                href: "/data-assets/signal-exchange",
                badge: "Flagship",
              },
              {
                Icon: Users,
                title: "Consumer Data",
                desc: "Behavioral, lifestyle, and demographic audience attributes designed to support direct and digital consumer outreach.",
                href: "/data-assets/consumer-data",
              },
              {
                Icon: CreditCard,
                title: "Data Cards",
                desc: "Detailed audience definitions, attributes, and counts available through our data card library to support planning and campaign development.",
                href: "/data-assets/data-cards",
              },
            ]}
          />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
