import PageHero from "@/components/ui/PageHero";
import SolutionsSection from "@/components/sections/SolutionsSection";
import ValueProps from "@/components/sections/ValueProps";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions · Lorann LLC",
  description: "Precision audience targeting, data enrichment, lead generation, and data activation — built for B2B, healthcare, and consumer campaigns.",
};

export default function SolutionsPage() {
  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="Solutions"
        title={<>Flexible solutions for <span className="text-gradient">every campaign</span></>}
        description="From audience discovery to activation, our services adapt to your marketing stack and operational workflow. Explore each solution below."
      />
      <SolutionsSection />
      <ValueProps />
      <FinalCTA />
    </>
  );
}
