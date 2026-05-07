import type { Metadata } from "next";
import { groq } from "next-sanity";
import Hero, { type HeroContent } from "@/components/sections/Hero";
import StatsStripAndTrust, { type StatsStripAndTrustContent } from "@/components/sections/StatsStripAndTrust";
import ValueProps, { type ValuePropsContent } from "@/components/sections/ValueProps";
import SignalExchangeSection, { type SignalExchangeContent } from "@/components/sections/SignalExchangeSection";
import HowItWorksSection, { type HowItWorksContent } from "@/components/sections/HowItWorksSection";
import StatsSection, { type StatsSectionContent } from "@/components/sections/StatsSection";
import SolutionsSection, { type SolutionsSectionContent } from "@/components/sections/SolutionsSection";
import IndustriesSection, { type IndustriesContent } from "@/components/sections/IndustriesSection";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/fetch";

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
  heroDescription?: string;
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
  valueDescription?: string;
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
  signalDescription?: string;
  signalFeatures?: string[];
  signalCta?: Cta;

  // How it works
  howKicker?: string;
  howTitleStart?: string;
  howTitleHighlight?: string;
  howTitleEnd?: string;
  howDescription?: string;
  howSteps?: { iconName?: string; title?: string; desc?: string }[];

  // Numbers
  numbersKicker?: string;
  numbersTitleStart?: string;
  numbersTitleHighlight?: string;
  numbersDescription?: string;
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
  solutionsDescription?: string;
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
  industriesDescription?: string;
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
  finalCtaDescription?: string;
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
