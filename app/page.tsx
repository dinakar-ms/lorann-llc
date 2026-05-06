import type { Metadata } from "next";
import { groq } from "next-sanity";
import Hero, { type HeroContent } from "@/components/sections/Hero";
import StatsStripAndTrust from "@/components/sections/StatsStripAndTrust";
import ValueProps from "@/components/sections/ValueProps";
import SignalExchangeSection from "@/components/sections/SignalExchangeSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import SolutionsSection from "@/components/sections/SolutionsSection";
import IndustriesSection from "@/components/sections/IndustriesSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/fetch";

type HomepageDoc = {
  heroBadgeLabel?: string;
  heroBadgeText?: string;
  heroLine1?: string;
  heroLine2Start?: string;
  heroLine2Highlight?: string;
  heroLine3Start?: string;
  heroLine3Highlight?: string;
  heroDescription?: string;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  noIndex?: boolean;
};

export const dynamic = "force-dynamic";

const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<HomepageDoc | null>({
    query: homepageQuery,
    tags: ["homepage"],
  });
  return {
    title: doc?.metaTitle || "Lorann — List Smarter · Data-Driven Audience Intelligence",
    description:
      doc?.metaDescription ||
      "Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets. Powered by Signal eXchange™.",
    keywords: doc?.focusKeyphrase ? [doc.focusKeyphrase] : undefined,
    alternates: doc?.canonicalUrl ? { canonical: doc.canonicalUrl } : undefined,
    robots: doc?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function HomePage() {
  const doc = await sanityFetch<HomepageDoc | null>({
    query: homepageQuery,
    tags: ["homepage"],
  });

  const heroContent: HeroContent = {
    badgeLabel: doc?.heroBadgeLabel,
    badgeText: doc?.heroBadgeText,
    line1: doc?.heroLine1,
    line2Start: doc?.heroLine2Start,
    line2Highlight: doc?.heroLine2Highlight,
    line3Start: doc?.heroLine3Start,
    line3Highlight: doc?.heroLine3Highlight,
    description: doc?.heroDescription,
    primaryCta: doc?.heroPrimaryCta,
    secondaryCta: doc?.heroSecondaryCta,
  };

  return (
    <>
      <ScrollReveal />
      <Hero content={heroContent} />
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
