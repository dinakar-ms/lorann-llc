import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { groq } from "next-sanity";
import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/fetch";

type Cta = { label: string; href: string };
type Post = {
  title: string;
  excerpt: string;
  category: string;
  readingTime?: string;
  date?: string;
  slug?: string;
};
type Doc = {
  kicker: string;
  titleStart: string;
  titleHighlight: string;
  description: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
  featuredPost?: Post;
  sectionKicker?: string;
  sectionTitleStart?: string;
  sectionTitleHighlight?: string;
  sectionDescription?: string;
  posts?: Post[];
  focusKeyphrase?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  schemaMarkup?: string;
  noIndex?: boolean;
};

export const dynamic = "force-dynamic";

const query = groq`*[_type == "industryTrendsPage" && _id == "industryTrendsPage"][0]`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<Doc | null>({
    query,
    tags: ["industryTrendsPage"],
  });
  if (!doc) return { title: "Industry Trends · Lorann LLC" };
  return {
    title: doc.metaTitle || `${doc.titleStart} ${doc.titleHighlight}`.trim(),
    description: doc.metaDescription || doc.description,
    keywords: doc.focusKeyphrase ? [doc.focusKeyphrase] : undefined,
    alternates: doc.canonicalUrl ? { canonical: doc.canonicalUrl } : undefined,
    robots: doc.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export default async function IndustryTrendsPage() {
  const doc = await sanityFetch<Doc | null>({
    query,
    tags: ["industryTrendsPage"],
  });

  if (!doc) {
    return (
      <div className="container-custom py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Industry Trends</h1>
        <p className="text-slate-600">
          Content not yet created. Open Studio → Industry Trends Page to add it.
        </p>
      </div>
    );
  }

  const featured = doc.featuredPost;
  const rest = doc.posts || [];

  const jsonLd = (() => {
    if (doc.schemaMarkup) {
      try {
        return JSON.parse(doc.schemaMarkup);
      } catch {}
    }
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      headline: `${doc.titleStart} ${doc.titleHighlight}`.trim(),
      description: doc.metaDescription || doc.description,
    };
  })();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Industry Trends" },
        ]}
        kicker={doc.kicker}
        title={
          <>
            {doc.titleStart}{" "}
            <span className="text-gradient">{doc.titleHighlight}</span>
          </>
        }
        description={doc.description}
        primaryCta={doc.primaryCta}
        secondaryCta={doc.secondaryCta}
      />

      {featured && (
        <section className="py-16 lg:py-20 bg-white">
          <div className="container-custom">
            <Link
              href={featured.slug || "#"}
              className="reveal block bg-white border border-slate-150 rounded-[28px] overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-500 group"
            >
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0 min-h-[320px]">
                <div
                  className="relative overflow-hidden min-h-[260px]"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.4), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.3), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                      maskImage:
                        "radial-gradient(ellipse 80% 60% at center, #000 20%, transparent 80%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 80% 60% at center, #000 20%, transparent 80%)",
                    }}
                  />
                  <div className="absolute top-7 left-7 px-3 py-1.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em]">
                    Featured
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <div className="flex items-center flex-wrap gap-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="w-3 h-3" /> {featured.category}
                    </span>
                    {featured.readingTime && (
                      <span className="inline-flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3 h-3" /> {featured.readingTime}
                      </span>
                    )}
                    {featured.date && (
                      <span className="text-slate-500">{featured.date}</span>
                    )}
                  </div>
                  <h2 className="font-display font-bold text-2xl lg:text-[2rem] leading-tight tracking-[-0.025em] text-slate-900 mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 text-[15px] lg:text-base leading-relaxed mb-5">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-[14px]">
                    Read the piece{" "}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {(doc.sectionTitleStart || rest.length > 0) && (
        <section className="py-20 lg:py-28 radial-stats">
          <div className="container-custom">
            <SectionHeader
              kicker={doc.sectionKicker || ""}
              title={
                <>
                  {doc.sectionTitleStart || ""}{" "}
                  <span className="text-gradient">
                    {doc.sectionTitleHighlight || ""}
                  </span>
                </>
              }
              description={doc.sectionDescription || ""}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p, i) => (
                <Link
                  key={`${p.title}-${i}`}
                  href={p.slug || "#"}
                  className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-500 flex flex-col group"
                >
                  <div className="flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="w-[11px] h-[11px]" /> {p.category}
                    </span>
                    {p.date && <span className="text-slate-500">{p.date}</span>}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 tracking-[-0.02em] leading-tight mb-3">
                    {p.title}
                  </h3>
                  <p className="text-slate-600 text-[14px] leading-relaxed flex-1 mb-4">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-150">
                    {p.readingTime && (
                      <span className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                        <Clock className="w-3 h-3" /> {p.readingTime}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-blue-700">
                      Read{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
