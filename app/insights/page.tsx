import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid from "@/components/sections/FeatureCardGrid";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LineChart, FileText, Mailbox } from "lucide-react";

const ICON_MAP: Record<string, any> = { LineChart, FileText, Mailbox };

const DEFAULT_BROWSE_CARDS = [
  { iconName: "LineChart", title: "Industry Trends", desc: "Perspectives on data, audience strategy, and performance-driven marketing. Articles, commentary, and strategic POV.", href: "/insights/industry-trends" },
  { iconName: "FileText", title: "Case Studies", desc: "Examples of how Lorann data and audience strategies support real campaign performance across industries and channels.", href: "/insights/case-studies" },
  { iconName: "Mailbox", title: "Newsletter", desc: "Get periodic insights on data, audience strategy, and marketing performance delivered directly to your inbox.", href: "/insights/newsletter" },
];

type InsightsDoc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroTitleEnd?: string;
  heroDescription?: string;
  heroPrimaryCta?: { label?: string; href?: string };
  heroSecondaryCta?: { label?: string; href?: string };
  browseKicker?: string;
  browseTitleStart?: string;
  browseTitleHighlight?: string;
  browseDescription?: string;
  browseCards?: { iconName?: string; title?: string; desc?: string; href?: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

export const revalidate = 60;

const query = groq`*[_type == "insightsPage" && _id == "insightsPage"][0]`;
const homepageCtaQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  finalCtaKicker, finalCtaTitleStart, finalCtaTitleHighlight, finalCtaDescription, finalCtaPrimary, finalCtaSecondary, finalCtaTrust
}`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<InsightsDoc | null>({ query, tags: ["insightsPage"] });
  return {
    title: doc?.metaTitle || "Insights · Lorann LLC",
    description: doc?.metaDescription || "POV, commentary, case studies, and newsletters on data, audience strategy, and performance-driven marketing.",
    alternates: { canonical: "/insights" },
  };
}

export default async function InsightsPage() {
  const [doc, hp] = await Promise.all([
    sanityFetch<InsightsDoc | null>({ query, tags: ["insightsPage"] }),
    sanityFetch<any>({ query: homepageCtaQuery, tags: ["homepage"] }),
  ]);

  const browseCards = doc?.browseCards ?? DEFAULT_BROWSE_CARDS;

  const finalCta: FinalCTAContent = {
    kicker: hp?.finalCtaKicker,
    titleStart: hp?.finalCtaTitleStart,
    titleHighlight: hp?.finalCtaTitleHighlight,
    description: hp?.finalCtaDescription,
    primaryCta: hp?.finalCtaPrimary,
    secondaryCta: hp?.finalCtaSecondary,
    trust: hp?.finalCtaTrust,
  };

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        kicker={doc?.heroKicker ?? "Insights"}
        title={
          <>
            {doc?.heroTitleStart ?? "Perspectives on"} <span className="text-gradient">{doc?.heroTitleHighlight ?? "data, audience strategy,"}</span> {doc?.heroTitleEnd ?? "and performance-driven marketing."}
          </>
        }
        description={doc?.heroDescription ?? "Our content hub for POV, commentary, case studies, and data-driven insights from the team at Lorann."}
        primaryCta={{
          label: doc?.heroPrimaryCta?.label ?? "Read Industry Trends",
          href: doc?.heroPrimaryCta?.href ?? "/insights/industry-trends",
        }}
        secondaryCta={{
          label: doc?.heroSecondaryCta?.label ?? "See Case Studies",
          href: doc?.heroSecondaryCta?.href ?? "/insights/case-studies",
        }}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <SectionHeader
            kicker={doc?.browseKicker ?? "Browse by Type"}
            title={
              <>
                {doc?.browseTitleStart ?? "Three places"} <span className="text-gradient">{doc?.browseTitleHighlight ?? "to dig in."}</span>
              </>
            }
            description={doc?.browseDescription ?? "Short-form commentary, real-campaign results, and periodic updates — all in one place."}
          />
          <FeatureCardGrid
            columns={3}
            features={browseCards.map((c) => ({
              Icon: ICON_MAP[c.iconName ?? "LineChart"] ?? LineChart,
              title: c.title ?? "",
              desc: c.desc ?? "",
              href: c.href,
            }))}
          />
        </div>
      </section>

      <FinalCTA content={finalCta} />
    </>
  );
}
