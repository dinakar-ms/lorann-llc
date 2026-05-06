import type { Metadata } from "next";
import { groq } from "next-sanity";
import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid, { type Feature } from "@/components/sections/FeatureCardGrid";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getIconComponent } from "@/components/ui/IconByName";

export const dynamic = "force-dynamic";

type Cta = { label?: string; href?: string };
type FeatureDoc = {
  icon?: string;
  title?: string;
  desc?: string;
  href?: string;
  badge?: string;
};
type Doc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  heroPrimaryCta?: Cta;
  heroSecondaryCta?: Cta;

  sectionKicker?: string;
  sectionTitleStart?: string;
  sectionTitleHighlight?: string;
  sectionDescription?: string;
  features?: FeatureDoc[];

  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

const DEFAULTS = {
  heroKicker: "Data Assets",
  heroTitleStart: "Built on",
  heroTitleHighlight: "Better Data.",
  heroDescription:
    "A structured view of the datasets behind our solutions — designed to support targeting, enrichment, and activation across marketing channels.",
  heroPrimaryCta: { label: "View Data Cards", href: "/data-assets/data-cards" },
  heroSecondaryCta: { label: "Request Data Overview", href: "/contact" },

  sectionKicker: "Explore the Data",
  sectionTitleStart: "Five asset classes,",
  sectionTitleHighlight: "one unified platform.",
  sectionDescription:
    "Each dataset is built for a specific targeting need — and designed to work together when you need broader audience coverage.",
  features: [
    {
      icon: "Briefcase",
      title: "B2B Data",
      desc: "Comprehensive business and professional datasets for prospecting, account-based marketing, and audience development across industries.",
      href: "/data-assets/b2b-data",
    },
    {
      icon: "Activity",
      title: "Healthcare Data",
      desc: "Specialized healthcare datasets built with compliance, accuracy, and targeting precision in mind.",
      href: "/data-assets/healthcare-data",
    },
    {
      icon: "Sparkles",
      title: "Signal eXchange™",
      desc: "Lorann's proprietary dataset, combining first-party lead data with intent and behavioral signals to create more actionable, performance-driven audiences.",
      href: "/data-assets/signal-exchange",
      badge: "Flagship",
    },
    {
      icon: "Users",
      title: "Consumer Data",
      desc: "Behavioral, lifestyle, and demographic audience attributes designed to support direct and Programmatic consumer outreach.",
      href: "/data-assets/consumer-data",
    },
    {
      icon: "CreditCard",
      title: "Data Cards",
      desc: "Detailed audience definitions, attributes, and counts available through our data card library to support planning and campaign development.",
      href: "/data-assets/data-cards",
    },
  ],
};

const query = groq`*[_type == "dataAssetsPage" && _id == "dataAssetsPage"][0]`;

function pick<T>(value: T | undefined | null, fallback: T): T {
  return value === undefined || value === null || value === "" ? fallback : value;
}

function pickCta(value: Cta | undefined, fallback: { label: string; href: string }) {
  return {
    label: pick(value?.label, fallback.label),
    href: pick(value?.href, fallback.href),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<Doc | null>({ query, tags: ["dataAssetsPage"] });
  return {
    title: doc?.metaTitle || "Data Assets · Built on Better Data — Lorann LLC",
    description: doc?.metaDescription || DEFAULTS.heroDescription,
    keywords: doc?.focusKeyphrase ? [doc.focusKeyphrase] : undefined,
    alternates: doc?.canonicalUrl ? { canonical: doc.canonicalUrl } : undefined,
    robots: doc?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default async function DataAssetsPage() {
  const doc = await sanityFetch<Doc | null>({ query, tags: ["dataAssetsPage"] });

  const features: Feature[] = (
    doc?.features && doc.features.length > 0 ? doc.features : DEFAULTS.features
  ).map((f) => ({
    Icon: getIconComponent(f.icon),
    title: pick(f.title, ""),
    desc: pick(f.desc, ""),
    href: f.href || undefined,
    badge: f.badge || undefined,
  }));

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Data Assets" }]}
        kicker={pick(doc?.heroKicker, DEFAULTS.heroKicker)}
        title={
          <>
            {pick(doc?.heroTitleStart, DEFAULTS.heroTitleStart)}{" "}
            <span className="text-gradient">
              {pick(doc?.heroTitleHighlight, DEFAULTS.heroTitleHighlight)}
            </span>
          </>
        }
        description={pick(doc?.heroDescription, DEFAULTS.heroDescription)}
        primaryCta={pickCta(doc?.heroPrimaryCta, DEFAULTS.heroPrimaryCta)}
        secondaryCta={pickCta(doc?.heroSecondaryCta, DEFAULTS.heroSecondaryCta)}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker={pick(doc?.sectionKicker, DEFAULTS.sectionKicker)}
            title={
              <>
                {pick(doc?.sectionTitleStart, DEFAULTS.sectionTitleStart)}{" "}
                <span className="text-gradient">
                  {pick(doc?.sectionTitleHighlight, DEFAULTS.sectionTitleHighlight)}
                </span>
              </>
            }
            description={pick(doc?.sectionDescription, DEFAULTS.sectionDescription)}
          />
          <FeatureCardGrid columns={3} features={features} />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
