import Hero from "@/components/sections/Hero";
import StatsStripAndTrust from "@/components/sections/StatsStripAndTrust";
import ValueProps from "@/components/sections/ValueProps";
import SignalExchangeSection from "@/components/sections/SignalExchangeSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <ScrollReveal />
      <Hero />
      <StatsStripAndTrust />
      <ValueProps />
      <SignalExchangeSection />
      <HowItWorksSection />
      <StatsSection />
      <SolutionsSection />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}
