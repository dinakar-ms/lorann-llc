import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/env";
import { urlForImage } from "@/sanity/lib/image";
import { allPageSlugsQuery } from "@/sanity/lib/queries";
import PortableContent from "@/components/PortableContent";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FeatureCardGrid, { type Feature } from "@/components/sections/FeatureCardGrid";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import LeafPage from "@/components/templates/LeafPage";
import HubPage from "@/components/templates/HubPage";
import NewsletterForm from "@/app/insights/newsletter/NewsletterForm";
import FaqAccordion from "@/components/sections/FaqAccordion";
import ProseSection, { type ProseSectionData } from "@/components/sections/ProseSection";
import dynamic from "next/dynamic";
import type { DataCard } from "@/components/sections/DataCardsTable";
import { ArrowRight, ShieldCheck, Linkedin, Mail } from "lucide-react";
import { getIcon } from "@/components/ui/IconByName";

const DataCardsTable = dynamic(() => import("@/components/sections/DataCardsTable"), { ssr: true });

// ─── Types ───────────────────────────────────────────────
type CTA = { label?: string; href?: string } | null;
type StatDoc = { label: string; value: string; _key?: string };
type FeatureDoc = { icon?: string; title: string; desc: string; href?: string; badge?: string; _key?: string };
type UseCaseDoc = { title: string; desc: string; _key?: string };
type GridSectionDoc = {
  kicker?: string;
  titlePlain?: string;
  titleAccent?: string;
  description?: string;
  columns?: number;
  style?: "card" | "check" | "numbered";
  features?: FeatureDoc[];
  _key?: string;
};
type BannerDoc = {
  variant?: "dark" | "light";
  icon?: string;
  kicker?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};
type TeamMemberDoc = {
  name: string;
  title: string;
  bio: string;
  initials: string;
  photo?: string;
  objectPosition?: string;
  linkedin: string;
  email: string;
  _key?: string;
};
type CaseStudyDoc = {
  industry: string;
  client: string;
  title: string;
  challenge: string;
  approach: string;
  outcome: string;
  metrics?: StatDoc[];
  _key?: string;
};
type FaqItemDoc = { question: string; answer: string; _key?: string };

type PageDoc = {
  _id: string;
  h1: string;
  slug: string;
  templateType?: "leaf" | "hub" | "custom";
  heroImage?: { asset?: any; alt?: string } | null;
  content?: any;
  // Hero
  kicker?: string;
  titlePlain?: string;
  titleAccent?: string;
  heroDescription?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  // Intro
  introKicker?: string;
  introHeadlinePlain?: string;
  introHeadlineAccent?: string;
  introParagraphs?: string[];
  // Leaf
  stats?: StatDoc[];
  attributesSectionKicker?: string;
  attributesSectionTitle?: string;
  attributesSectionAccent?: string;
  attributes?: FeatureDoc[];
  useCasesSectionKicker?: string;
  useCasesSectionTitle?: string;
  useCasesSectionAccent?: string;
  useCases?: UseCaseDoc[];
  complianceHeadline?: string;
  complianceBody?: string;
  backLink?: CTA;
  // Hub
  childrenSectionKicker?: string;
  childrenSectionTitlePlain?: string;
  childrenSectionTitleAccent?: string;
  childrenSectionDescription?: string;
  childrenSectionColumns?: number;
  childrenItems?: FeatureDoc[];
  hubAttributesSectionKicker?: string;
  hubAttributesSectionTitlePlain?: string;
  hubAttributesSectionTitleAccent?: string;
  hubAttributesSectionDescription?: string;
  hubAttributesSectionColumns?: number;
  hubAttributesItems?: FeatureDoc[];
  // Extra content (all templates)
  featureGridSections?: GridSectionDoc[];
  proseSections?: ProseSectionData[];
  faqItems?: FaqItemDoc[];
  // Custom
  ctaBannerData?: BannerDoc;
  teamMembers?: TeamMemberDoc[];
  caseStudies?: CaseStudyDoc[];
  newsletterHeadlinePlain?: string;
  newsletterHeadlineAccent?: string;
  newsletterBody?: string;
  newsletterBullets?: string[];
  // SEO
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  ogTitle?: string;
  ogDescription?: string;
  noIndex?: boolean;
};

// ─── Query ───────────────────────────────────────────────
const fullPageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id, h1, "slug": slug.current, templateType,
  heroImage, content,
  kicker, titlePlain, titleAccent, heroDescription,
  primaryCta, secondaryCta,
  introKicker, introHeadlinePlain, introHeadlineAccent, introParagraphs,
  stats, attributesSectionKicker, attributesSectionTitle, attributesSectionAccent, attributes,
  useCasesSectionKicker, useCasesSectionTitle, useCasesSectionAccent, useCases,
  complianceHeadline, complianceBody, backLink,
  childrenSectionKicker, childrenSectionTitlePlain, childrenSectionTitleAccent,
  childrenSectionDescription, childrenSectionColumns, childrenItems,
  hubAttributesSectionKicker, hubAttributesSectionTitlePlain,
  hubAttributesSectionTitleAccent, hubAttributesSectionDescription,
  hubAttributesSectionColumns, hubAttributesItems,
  featureGridSections, proseSections, faqItems, ctaBannerData,
  teamMembers, caseStudies,
  newsletterHeadlinePlain, newsletterHeadlineAccent, newsletterBody, newsletterBullets,
  focusKeyphrase, metaTitle, metaDescription, canonicalUrl, schemaMarkup, ogTitle, ogDescription, noIndex
}`;

const homepageCtaQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  finalCtaKicker, finalCtaTitleStart, finalCtaTitleHighlight, finalCtaDescription, finalCtaPrimary, finalCtaSecondary, finalCtaTrust
}`;

// ─── Reserved paths ──────────────────────────────────────
const RESERVED_TOP_SEGMENTS = new Set([
  "api",
  "contact",
  "data-assets",
  "how-it-works",
  "industries",
  "insights",
  "resources",
  "signal-exchange",
  "studio",
]);

function isReservedPath(parts: string[]): boolean {
  if (parts.length !== 1) return false;
  return RESERVED_TOP_SEGMENTS.has(parts[0]);
}

// ─── Static params ───────────────────────────────────────
// Use a stega-free, token-authenticated client for build-time slug fetching
// (dataset is private and requires a token for all reads)
const plainClient = client.withConfig({ stega: false, token: token || undefined });

export const dynamicParams = true; // allow on-demand ISR for pages not pre-rendered

export async function generateStaticParams() {
  try {
    const slugs = await plainClient.fetch<string[]>(allPageSlugsQuery);
    return slugs
      .map((slug) => slug.split("/"))
      .filter((parts) => !isReservedPath(parts))
      .filter((parts) => parts.length > 0 && parts[0] !== "")
      .map((parts) => ({ slug: parts }));
  } catch {
    return [];
  }
}

function paramsToPath(slug: string[] | undefined): string {
  return (slug || []).join("/");
}

// ─── Metadata ────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const path = paramsToPath(params.slug);
  const page = await sanityFetch<PageDoc | null>({
    query: fullPageQuery,
    params: { slug: path },
    tags: [`page:${path}`],
  });

  if (!page) return {};

  const title = page.metaTitle || page.h1;
  const description = page.metaDescription;

  return {
    title,
    description,
    keywords: page.focusKeyphrase ? [page.focusKeyphrase] : undefined,
    alternates: { canonical: page.canonicalUrl || `/${path}` },
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: page.ogTitle || title,
      description: page.ogDescription || description || undefined,
      type: "article",
      url: page.canonicalUrl || `/${path}`,
    },
  };
}

// ─── Helpers ─────────────────────────────────────────────

// Maps for proper breadcrumb parent labels (slug segment → display label)
const BREADCRUMB_PARENTS: Record<string, string> = {
  "about": "About",
  "solutions": "Solutions",
  "data-assets": "Data Assets",
  "b2b-database": "B2B Database",
  "healthcare": "Healthcare",
  "technology": "Technology",
  "other-industry": "Other Industry",
  "b2c-database": "B2C Database",
  "insights": "Insights",
  "industries": "Industries",
  "why-lorann": "Why Lorann",
  "crm-users-mailing-data": "CRM Users Mailing Data",
  "erp-users-email-lists": "ERP Users Email Lists",
  "software-email-lists": "Software Email Lists",
  "business-technology-email-lists": "Business Technology Email Lists",
  "dbms-users-email-data": "DBMS Users Email Data",
  "operating-system-users-list": "Operating System Users List",
  "groupware-email-lists": "Groupware Email Lists",
  "network-users-data-list": "Network Users Data List",
};

function buildCrumbs(slugParts: string[], pageTitle: string) {
  const crumbs: { label: string; href?: string }[] = [{ label: "Home", href: "/" }];
  for (let i = 0; i < slugParts.length - 1; i++) {
    const href = "/" + slugParts.slice(0, i + 1).join("/");
    const segment = slugParts[i];
    const label = BREADCRUMB_PARENTS[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href });
  }
  crumbs.push({ label: pageTitle });
  return crumbs;
}

function buildJsonLd(page: PageDoc) {
  if (page.schemaMarkup) {
    try {
      return JSON.parse(page.schemaMarkup);
    } catch {
      // fall through
    }
  }
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1,
    description: page.metaDescription,
    keywords: page.focusKeyphrase,
    image: page.heroImage?.asset
      ? urlForImage(page.heroImage).width(1600).url()
      : undefined,
    mainEntityOfPage: page.canonicalUrl,
  };
}

function mapFeatures(items: FeatureDoc[] | undefined): Feature[] {
  if (!items) return [];
  return items.map((f) => ({
    Icon: getIcon(f.icon),
    title: f.title,
    desc: f.desc,
    href: f.href,
    badge: f.badge,
  }));
}

function mapAttributes(items: FeatureDoc[] | undefined): { Icon: React.ElementType; title: string; desc: string }[] {
  if (!items) return [];
  return items.map((f) => ({
    Icon: getIcon(f.icon),
    title: f.title,
    desc: f.desc,
  }));
}

function mapHubChildren(items: FeatureDoc[] | undefined): { Icon: React.ElementType; title: string; desc: string; href: string; badge?: string }[] {
  if (!items) return [];
  return items.map((f) => ({
    Icon: getIcon(f.icon),
    title: f.title,
    desc: f.desc,
    href: f.href || "#",
    badge: f.badge,
  }));
}

// ─── Shared section renderers ────────────────────────────

/** Renders featureGridSections array — reusable across all template types */
function renderFeatureGridSections(sections: GridSectionDoc[] | undefined, startIdx = 0) {
  if (!sections || sections.length === 0) return null;
  return (
    <>
      {sections
        .filter((section) => section.features && section.features.length > 0)
        .map((section, idx) => (
          <section
            key={section._key || idx}
            className={(idx + startIdx) % 2 === 0 ? "py-20 lg:py-28 radial-stats" : "py-20 lg:py-24 bg-white"}
          >
            <div className="container-custom">
              <SectionHeader
                kicker={section.kicker || ""}
                title={
                  section.titleAccent ? (
                    <>
                      {section.titlePlain}{" "}
                      <span className="text-gradient">{section.titleAccent}</span>
                    </>
                  ) : (
                    section.titlePlain || ""
                  )
                }
                description={section.description}
              />
              <FeatureCardGrid
                columns={(section.columns || 3) as 2 | 3 | 4}
                style={section.style || "card"}
                features={mapFeatures(section.features)}
              />
            </div>
          </section>
        ))}
    </>
  );
}

/** Renders prose sections (paragraph-style — Why Choose, Who Can Use) */
function renderProseSections(proseSections: ProseSectionData[] | undefined) {
  if (!proseSections || proseSections.length === 0) return null;
  return (
    <>
      {proseSections.map((section, idx) => (
        <ProseSection
          key={section._key || idx}
          section={section}
          variant={idx % 2 === 0 ? "tinted" : "light"}
        />
      ))}
    </>
  );
}

/** Renders FAQ accordion section (animated client component) */
function renderFaqSection(faqItems: FaqItemDoc[] | undefined) {
  if (!faqItems || faqItems.length === 0) return null;
  return <FaqAccordion items={faqItems} />;
}

/** Renders the compliance band + licensing note (moved out of LeafPage) */
function renderComplianceBand(page: PageDoc) {
  const headline = page.complianceHeadline || "Compliance is built in, not bolted on.";
  const body = page.complianceBody || "";
  return (
    <>
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div
            className="relative overflow-hidden rounded-[24px] p-8 lg:p-12 text-white reveal"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 30% 20%, rgba(79, 125, 245, 0.3), transparent 60%), linear-gradient(135deg, #03061A 0%, #13256E 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-60 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div className="relative grid lg:grid-cols-[auto_1fr_auto] items-center gap-6 lg:gap-10">
              <div className="w-14 h-14 rounded-2xl bg-cyan-400/15 border border-cyan-400/30 grid place-items-center text-cyan-300 flex-shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display font-bold text-2xl lg:text-3xl tracking-tight mb-2">
                  {headline}
                </h3>
                <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                  <RichText value={body} />
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-semibold text-[14px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(111,211,255,0.5)] transition-all flex-shrink-0"
              >
                Discuss Licensing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto reveal">
            <p className="text-[15px] text-slate-700 leading-relaxed border-l-4 border-blue-200 pl-5 italic">
              <strong className="text-slate-900 not-italic">Please note:</strong> We offer direct
              marketers the ability to license complete multi-channel records (with all
              selections included) for a 12-month unlimited-use arrangement. Data can be used for
              postal, email, and outbound telemarketing campaigns.{" "}
              <Link
                href="/contact"
                className="text-blue-700 not-italic font-semibold hover:underline"
              >
                Contact Lorann for details and pricing.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Template renderers ──────────────────────────────────

function renderLeaf(page: PageDoc, slugParts: string[]) {
  const crumbs = buildCrumbs(slugParts, page.h1);
  const hasExtraSections = (page.featureGridSections && page.featureGridSections.length > 0) || (page.proseSections && page.proseSections.length > 0) || (page.faqItems && page.faqItems.length > 0);

  return (
    <>
      <LeafPage
        crumbs={crumbs}
        kicker={page.kicker || ""}
        titlePlain={page.titlePlain || page.h1}
        titleAccent={page.titleAccent || ""}
        description={page.heroDescription || page.metaDescription || ""}
        stats={(page.stats || []).map((s) => ({ label: s.label, value: s.value }))}
        intro={{
          kicker: page.introKicker || "",
          headlinePlain: page.introHeadlinePlain || "",
          headlineAccent: page.introHeadlineAccent || "",
          paragraphs: (page.introParagraphs || []).map((p) => p),
        }}
        attributes={mapAttributes(page.attributes)}
        attributesSection={{
          kicker: page.attributesSectionKicker,
          titlePlain: page.attributesSectionTitle,
          titleAccent: page.attributesSectionAccent,
        }}
        useCases={(page.useCases || []).map((u) => ({ title: u.title, desc: u.desc }))}
        useCasesSection={{
          kicker: page.useCasesSectionKicker,
          titlePlain: page.useCasesSectionTitle,
          titleAccent: page.useCasesSectionAccent,
        }}
        backLink={{
          label: page.backLink?.label || "Back",
          href: page.backLink?.href || "/" + slugParts.slice(0, -1).join("/"),
        }}
        hideFinalCta={hasExtraSections}
      />
      {renderProseSections(page.proseSections)}
      {renderFeatureGridSections(page.featureGridSections, 1)}
      {renderFaqSection(page.faqItems)}
      {renderComplianceBand(page)}
      {hasExtraSections && <FinalCTA />}
    </>
  );
}

function renderHub(page: PageDoc, slugParts: string[]) {
  const crumbs = buildCrumbs(slugParts, page.h1);

  const hubProps: any = {
    crumbs,
    kicker: page.kicker || "",
    titlePlain: page.titlePlain || page.h1,
    titleAccent: page.titleAccent || "",
    description: page.heroDescription || page.metaDescription || "",
    primaryCta: page.primaryCta?.label ? page.primaryCta : undefined,
    secondaryCta: page.secondaryCta?.label ? page.secondaryCta : undefined,
    intro: {
      kicker: page.introKicker || "",
      headlinePlain: page.introHeadlinePlain || "",
      headlineAccent: page.introHeadlineAccent || "",
      paragraphs: (page.introParagraphs || []).map((p) => p),
    },
    childrenSection: {
      kicker: page.childrenSectionKicker || "",
      titlePlain: page.childrenSectionTitlePlain || "",
      titleAccent: page.childrenSectionTitleAccent || "",
      description: page.childrenSectionDescription,
      columns: page.childrenSectionColumns || 3,
      items: mapHubChildren(page.childrenItems),
    },
  };

  if (page.hubAttributesSectionKicker || page.hubAttributesItems?.length) {
    hubProps.attributesSection = {
      kicker: page.hubAttributesSectionKicker || "",
      titlePlain: page.hubAttributesSectionTitlePlain || "",
      titleAccent: page.hubAttributesSectionTitleAccent || "",
      description: page.hubAttributesSectionDescription,
      columns: page.hubAttributesSectionColumns || 4,
      items: mapAttributes(page.hubAttributesItems),
    };
  }

  const hasExtraSections = (page.featureGridSections && page.featureGridSections.length > 0) || (page.proseSections && page.proseSections.length > 0) || (page.faqItems && page.faqItems.length > 0);

  return (
    <>
      <HubPage {...hubProps} hideFinalCta={hasExtraSections} />
      {renderFeatureGridSections(page.featureGridSections, 1)}
      {renderProseSections(page.proseSections)}
      {renderFaqSection(page.faqItems)}
      {hasExtraSections && <FinalCTA />}
    </>
  );
}

function renderCustom(page: PageDoc, slugParts: string[], dataCards?: DataCard[]) {
  const crumbs = buildCrumbs(slugParts, page.h1);
  const kicker = page.kicker || "";

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={crumbs}
        kicker={kicker}
        title={
          page.titleAccent ? (
            <>
              {page.titlePlain || page.h1}{" "}
              <span className="text-gradient">{page.titleAccent}</span>
            </>
          ) : (
            page.titlePlain || page.h1
          )
        }
        description={page.heroDescription || page.metaDescription || ""}
        primaryCta={page.primaryCta?.label ? (page.primaryCta as { label: string; href: string }) : undefined}
        secondaryCta={page.secondaryCta?.label ? (page.secondaryCta as { label: string; href: string }) : undefined}
      />

      {/* Intro section (skip if newsletter section will render — it includes its own headline) */}
      {page.introKicker && !(page.newsletterBullets && page.newsletterBullets.length > 0) && (
        <section className="py-20 lg:py-24 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto reveal">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                  {page.introKicker}
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                  {page.introHeadlinePlain}{" "}
                  <span className="text-gradient">{page.introHeadlineAccent}</span>
                </h2>
              </div>
              <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
                {(page.introParagraphs || []).map((p: any, i: number) => (
                  <p key={(p && typeof p === "object" && p._key) || i}>
                    <RichText value={typeof p === "string" ? p : [p]} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature grid sections */}
      {(page.featureGridSections || [])
        .filter((section) => section.features && section.features.length > 0)
        .map((section, idx) => (
        <section
          key={section._key || idx}
          className={idx % 2 === 0 ? "py-20 lg:py-28 radial-stats" : "py-20 lg:py-24 bg-white"}
        >
          <div className="container-custom">
            <SectionHeader
              kicker={section.kicker || ""}
              title={
                section.titleAccent ? (
                  <>
                    {section.titlePlain}{" "}
                    <span className="text-gradient">{section.titleAccent}</span>
                  </>
                ) : (
                  section.titlePlain || ""
                )
              }
              description={section.description}
            />
            <FeatureCardGrid
              columns={(section.columns || 3) as 2 | 3 | 4}
              style={section.style || "card"}
              features={mapFeatures(section.features)}
            />
          </div>
        </section>
      ))}

      {/* Data Cards Table — only for the data-cards page */}
      {slugParts.join("/") === "data-assets/data-cards" && dataCards && dataCards.length > 0 && (
        <DataCardsTable cards={dataCards} />
      )}

      {/* CTA Banner */}
      {page.ctaBannerData?.title && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-custom">
            {(page.ctaBannerData.variant || "dark") === "dark" ? (
              /* Dark gradient banner */
              <div
                className={`reveal relative overflow-hidden rounded-[32px] p-8 lg:p-14 text-white ${
                  page.ctaBannerData.icon
                    ? "grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center"
                    : "flex flex-wrap gap-8 items-center justify-between"
                }`}
                style={{
                  background:
                    "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
                {page.ctaBannerData.icon && (
                  <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-[24px] bg-cyan-400/15 border border-cyan-400/28 grid place-items-center">
                    {(() => {
                      const IconComp = getIcon(page.ctaBannerData!.icon);
                      return <IconComp className="w-14 h-14 text-cyan-300" />;
                    })()}
                  </div>
                )}
                <div className="relative max-w-[560px]">
                  {page.ctaBannerData.kicker && (
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-3">
                      {page.ctaBannerData.kicker}
                    </div>
                  )}
                  <h3 className="font-display font-bold text-2xl lg:text-[2rem] tracking-[-0.025em] leading-tight mb-3.5">
                    {page.ctaBannerData.title}
                  </h3>
                  {page.ctaBannerData.body && (
                    <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                      <RichText value={page.ctaBannerData.body} />
                    </p>
                  )}
                </div>
                {page.ctaBannerData.ctaLabel && page.ctaBannerData.ctaHref && (
                  <Link
                    href={page.ctaBannerData.ctaHref}
                    className="relative inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-cyan-400/30 text-white font-semibold text-[14.5px] rounded-xl backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5 transition-all"
                  >
                    {page.ctaBannerData.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ) : (
              /* Light card callout (industries-served style) */
              <div className="reveal bg-white border border-slate-150 rounded-3xl p-10 lg:p-14 shadow-md text-center max-w-3xl mx-auto">
                {page.ctaBannerData.kicker && (
                  <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
                    {page.ctaBannerData.kicker}
                  </div>
                )}
                <h3 className="font-display font-bold text-2xl lg:text-[1.9rem] tracking-[-0.025em] text-slate-900 leading-tight mb-3">
                  {page.ctaBannerData.title}
                </h3>
                {page.ctaBannerData.body && (
                  <p className="text-slate-600 text-[15px] leading-relaxed max-w-lg mx-auto mb-6">
                    <RichText value={page.ctaBannerData.body} />
                  </p>
                )}
                {page.ctaBannerData.ctaLabel && page.ctaBannerData.ctaHref && (
                  <Link
                    href={page.ctaBannerData.ctaHref}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
                  >
                    {page.ctaBannerData.ctaLabel}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Team Members */}
      {page.teamMembers && page.teamMembers.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom">
            <SectionHeader
              kicker="Leadership"
              title={
                <>
                  The people behind{" "}
                  <span className="text-gradient">your audience strategy.</span>
                </>
              }
              description="Practical experts — not résumé-heavy, just people who build audiences that perform."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.teamMembers.map((m) => (
                <article
                  key={m._key || m.name}
                  className="reveal bg-white border border-slate-150 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-500 flex flex-col"
                >
                  <div
                    className="aspect-[4/3] relative grid place-items-center overflow-hidden"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 55% at 30% 30%, rgba(79, 125, 245, 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.35), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                    }}
                  >
                    {m.photo ? (
                      <Image
                        src={m.photo}
                        alt={`${m.name}, ${m.title}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        style={{ objectPosition: m.objectPosition ?? "center 20%" }}
                        priority
                      />
                    ) : (
                      <>
                        <span className="font-display font-bold text-6xl lg:text-7xl text-white/90 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                          {m.initials}
                        </span>
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, rgba(111, 211, 255, 0.12) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                          }}
                        />
                      </>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-lg text-slate-900 tracking-[-0.02em] mb-1">
                      {m.name}
                    </h3>
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-blue-700 mb-3.5">
                      {m.title}
                    </div>
                    <p className="text-[14px] text-slate-600 leading-relaxed flex-1"><RichText value={m.bio} /></p>
                    <div className="flex gap-2 mt-5 pt-5 border-t border-slate-150">
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} on LinkedIn`}
                        className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent(`Inquiry for ${m.name}`)}`}
                        aria-label={`Email ${m.name}`}
                        className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-500 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 transition-all"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies */}
      {page.caseStudies && page.caseStudies.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom">
            <SectionHeader
              kicker="Selected Work"
              title={
                <>
                  Four recent <span className="text-gradient">engagements.</span>
                </>
              }
              description="Names withheld for NDA purposes — but the approach, the data, and the outcomes are real."
            />
            <div className="flex flex-col gap-7">
              {page.caseStudies.map((c) => (
                <article
                  key={c._key || c.title}
                  className="reveal bg-white border border-slate-150 rounded-[28px] p-8 lg:p-10 hover:shadow-xl hover:border-blue-200 transition-all grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10 items-start"
                >
                  <div>
                    <div className="flex items-center flex-wrap gap-3 mb-5">
                      <span className="font-mono text-[11px] font-bold text-blue-700 tracking-[0.12em] uppercase px-2.5 py-1 bg-blue-50 rounded-full">
                        {c.industry}
                      </span>
                      <span className="text-[13px] text-slate-500">{c.client}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl lg:text-[1.7rem] text-slate-900 tracking-[-0.025em] leading-[1.2] mb-5">
                      {c.title}
                    </h3>
                    <dl className="flex flex-col gap-4">
                      <div>
                        <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">Challenge</dt>
                        <dd className="text-[14.5px] text-slate-700 leading-relaxed"><RichText value={c.challenge} /></dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">Approach</dt>
                        <dd className="text-[14.5px] text-slate-700 leading-relaxed"><RichText value={c.approach} /></dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">Outcome</dt>
                        <dd className="text-[14.5px] text-slate-900 font-medium leading-relaxed"><RichText value={c.outcome} /></dd>
                      </div>
                    </dl>
                  </div>
                  {c.metrics && c.metrics.length > 0 && (
                    <div
                      className="p-7 rounded-2xl text-white flex flex-col gap-4 relative overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(79, 125, 245, 0.22), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                      }}
                    >
                      {c.metrics.map((met, mi) => (
                        <div
                          key={met._key || mi}
                          className={`flex flex-col gap-1 ${mi < c.metrics!.length - 1 ? "pb-4 border-b border-cyan-400/18" : ""}`}
                        >
                          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                            {met.label}
                          </span>
                          <span className="font-display font-bold text-2xl lg:text-[1.7rem] tracking-[-0.02em] leading-none">
                            {met.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter section */}
      {page.newsletterBullets && page.newsletterBullets.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
              <div className="reveal">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                  What you&rsquo;ll get
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900 mb-5">
                  {page.newsletterHeadlinePlain}{" "}
                  <span className="text-gradient">{page.newsletterHeadlineAccent}</span>
                </h2>
                {page.newsletterBody && (
                  <p className="text-slate-600 text-[17px] leading-[1.7] mb-7"><RichText value={page.newsletterBody} /></p>
                )}
                <ul className="flex flex-col gap-3.5">
                  {page.newsletterBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[14.5px] text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="reveal">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prose Sections (Why Choose / The Lorann Difference — before FAQ) */}
      {renderProseSections(page.proseSections)}

      {/* FAQ Section */}
      {renderFaqSection(page.faqItems)}

      <FinalCTA />
    </>
  );
}

// ─── Fallback render (no template) ───────────────────────
function renderFallback(page: PageDoc, slugParts: string[], finalCta: FinalCTAContent) {
  const crumbs = buildCrumbs(slugParts, page.h1);
  const kicker = slugParts.length > 1
    ? slugParts[0].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={crumbs}
        kicker={kicker}
        title={page.h1}
        description={page.metaDescription || ""}
      />
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <article className="mx-auto max-w-3xl">
            {page.heroImage?.asset && (
              <div className="mb-10">
                <Image
                  src={urlForImage(page.heroImage).width(1600).url()}
                  alt={page.heroImage.alt || ""}
                  width={1600}
                  height={900}
                  priority
                  className="rounded-xl w-full h-auto"
                />
              </div>
            )}
            <PortableContent value={page.content} />
          </article>
        </div>
      </section>
      <FinalCTA content={finalCta} />
    </>
  );
}

// ─── Main component ──────────────────────────────────────
export default async function Page({
  params,
}: {
  params: { slug: string[] };
}) {
  if (isReservedPath(params.slug || [])) notFound();

  const path = paramsToPath(params.slug);
  const [page, hp] = await Promise.all([
    sanityFetch<PageDoc | null>({
      query: fullPageQuery,
      params: { slug: path },
      tags: [`page:${path}`],
    }),
    sanityFetch<any>({ query: homepageCtaQuery, tags: ["homepage"] }),
  ]);

  if (!page) notFound();

  /* ── Fetch data cards dynamically for the data-cards page ── */
  const isDataCardsPage = params.slug.join("/") === "data-assets/data-cards";
  let dataCards: DataCard[] | undefined;
  if (isDataCardsPage) {
    const raw = await sanityFetch<
      { name: string; universe: number; lastUpdated: string; category: string }[] | null
    >({
      query: groq`*[_type == "dataCard"] | order(name asc) {
        name,
        universe,
        lastUpdated,
        category
      }`,
      tags: ["dataCard"],
    });
    if (raw) {
      dataCards = raw.map((c) => ({
        name: c.name,
        universe: c.universe,
        lastUpdated: c.lastUpdated
          ? new Date(c.lastUpdated).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
          : "",
        category: c.category,
      }));
    }
  }

  const jsonLd = buildJsonLd(page);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {page.templateType === "leaf" && renderLeaf(page, params.slug)}
      {page.templateType === "hub" && renderHub(page, params.slug)}
      {page.templateType === "custom" && renderCustom(page, params.slug, dataCards)}
      {!page.templateType && renderFallback(page, params.slug, finalCta)}
    </>
  );
}
