import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { groq } from "next-sanity";
import Hero, { type HeroContent } from "@/components/sections/Hero";
import StatsStripAndTrust, { type StatsStripAndTrustContent } from "@/components/sections/StatsStripAndTrust";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/fetch";

// Below-the-fold sections — lazy loaded to speed up initial paint
import type { ValuePropsContent } from "@/components/sections/ValueProps";
import type { SignalExchangeContent } from "@/components/sections/SignalExchangeSection";
import type { HowItWorksContent } from "@/components/sections/HowItWorksSection";
import type { StatsSectionContent } from "@/components/sections/StatsSection";
import type { SolutionsSectionContent } from "@/components/sections/SolutionsSection";
import type { IndustriesContent } from "@/components/sections/IndustriesSection";
import type { FinalCTAContent } from "@/components/sections/FinalCTA";

const ValueProps = dynamic(() => import("@/components/sections/ValueProps"));
const SignalExchangeSection = dynamic(() => import("@/components/sections/SignalExchangeSection"));
const HowItWorksSection = dynamic(() => import("@/components/sections/HowItWorksSection"));
const StatsSection = dynamic(() => import("@/components/sections/StatsSection"));
const SolutionsSection = dynamic(() => import("@/components/sections/SolutionsSection"));
const IndustriesSection = dynamic(() => import("@/components/sections/IndustriesSection"));
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA"));

type Cta = { label?: string; href?: string };

type HomepageDoc = {
  // Hero
  heroBadgeLabel?: string;
  heroBadgeText?: string;
  heroLine1?: string;
  heroLine2Start?: string;
  heroLine2Highlight?: string;
  heroLine3Start?: string;
  heroLine3Highlight?: string;
  heroDescription?: any; // richText Portable Text
  heroPrimaryCta?: Cta;
  heroSecondaryCta?: Cta;

  // Stats strip + trust
  statsStrip?: { iconName?: string; num?: string; label?: string }[];
  trustHeading?: string;
  trustBrands?: string[];

  // Value props
  valueKicker?: string;
  valueTitleStart?: string;
  valueTitleHighlight?: string;
  valueDescription?: any; // richText Portable Text
  valueCards?: {
    iconName?: string;
    title?: string;
    desc?: string;
    backTitle?: string;
    backList?: string[];
    link?: string;
    accent?: string;
    accentBg?: string;
  }[];

  // Signal eXchange
  signalKicker?: string;
  signalTitle?: string;
  signalDescription?: any; // richText Portable Text
  signalFeatures?: string[];
  signalCta?: Cta;

  // How it works
  howKicker?: string;
  howTitleStart?: string;
  howTitleHighlight?: string;
  howTitleEnd?: string;
  howDescription?: any; // richText Portable Text
  howSteps?: { iconName?: string; title?: string; desc?: string }[];

  // Numbers
  numbersKicker?: string;
  numbersTitleStart?: string;
  numbersTitleHighlight?: string;
  numbersDescription?: any; // richText Portable Text
  numbersStats?: {
    iconName?: string;
    count?: number;
    suffix?: string;
    label?: string;
    offset?: number;
  }[];

  // Solutions
  solutionsKicker?: string;
  solutionsTitleStart?: string;
  solutionsTitleHighlight?: string;
  solutionsDescription?: any; // richText Portable Text
  solutionsRows?: {
    id?: string;
    kicker?: string;
    title?: string;
    titleAccent?: string;
    desc?: string;
    feats?: string[];
    cta?: string;
    ctaHref?: string;
    vizVariant?: string;
    reverse?: boolean;
  }[];

  // Industries
  industriesKicker?: string;
  industriesTitleStart?: string;
  industriesTitleHighlight?: string;
  industriesDescription?: any; // richText Portable Text
  industriesItems?: {
    id?: string;
    iconName?: string;
    title?: string;
    desc?: string;
    href?: string;
  }[];

  // Final CTA
  finalCtaKicker?: string;
  finalCtaTitleStart?: string;
  finalCtaTitleHighlight?: string;
  finalCtaDescription?: any; // richText Portable Text
  finalCtaPrimary?: Cta;
  finalCtaSecondary?: Cta;
  finalCtaTrust?: string[];

  // SEO
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  noIndex?: boolean;
};

export const revalidate = 60; // ISR — re-generate at most every 60 s

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
    alternates: { canonical: doc?.canonicalUrl || "/" },
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

  const statsStrip: StatsStripAndTrustContent = {
    stats: doc?.statsStrip,
    trustHeading: doc?.trustHeading,
    brands: doc?.trustBrands,
  };

  const valueProps: ValuePropsContent = {
    kicker: doc?.valueKicker,
    titleStart: doc?.valueTitleStart,
    titleHighlight: doc?.valueTitleHighlight,
    description: doc?.valueDescription,
    cards: doc?.valueCards,
  };

  const signal: SignalExchangeContent = {
    kicker: doc?.signalKicker,
    title: doc?.signalTitle,
    description: doc?.signalDescription,
    features: doc?.signalFeatures,
    cta: doc?.signalCta,
  };

  const how: HowItWorksContent = {
    kicker: doc?.howKicker,
    titleStart: doc?.howTitleStart,
    titleHighlight: doc?.howTitleHighlight,
    titleEnd: doc?.howTitleEnd,
    description: doc?.howDescription,
    steps: doc?.howSteps,
  };

  const numbers: StatsSectionContent = {
    kicker: doc?.numbersKicker,
    titleStart: doc?.numbersTitleStart,
    titleHighlight: doc?.numbersTitleHighlight,
    description: doc?.numbersDescription,
    stats: doc?.numbersStats,
  };

  const solutions: SolutionsSectionContent = {
    kicker: doc?.solutionsKicker,
    titleStart: doc?.solutionsTitleStart,
    titleHighlight: doc?.solutionsTitleHighlight,
    description: doc?.solutionsDescription,
    rows: doc?.solutionsRows,
  };

  const industries: IndustriesContent = {
    kicker: doc?.industriesKicker,
    titleStart: doc?.industriesTitleStart,
    titleHighlight: doc?.industriesTitleHighlight,
    description: doc?.industriesDescription,
    items: doc?.industriesItems,
  };

  const finalCta: FinalCTAContent = {
    kicker: doc?.finalCtaKicker,
    titleStart: doc?.finalCtaTitleStart,
    titleHighlight: doc?.finalCtaTitleHighlight,
    description: doc?.finalCtaDescription,
    primaryCta: doc?.finalCtaPrimary,
    secondaryCta: doc?.finalCtaSecondary,
    trust: doc?.finalCtaTrust,
  };

  return (
    <>
      <ScrollReveal />
      <Hero content={heroContent} />
      <StatsStripAndTrust content={statsStrip} />
      <ValueProps content={valueProps} />
      <SignalExchangeSection content={signal} />
      <HowItWorksSection content={how} />
      <StatsSection content={numbers} />
      <SolutionsSection content={solutions} />
      <IndustriesSection content={industries} />
      <FinalCTA content={finalCta} />
    </>
  );
}
