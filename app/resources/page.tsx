import PageHero from "@/components/ui/PageHero";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Download } from "lucide-react";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";

const ICON_MAP: Record<string, any> = { BookOpen, FileText, Download };

const DEFAULT_POSTS = [
  { iconName: "BookOpen", type: "Guide", title: "Building audiences that convert in 2026", excerpt: "The playbook for combining first-party data with intent signals — and why most vendors still get it wrong." },
  { iconName: "FileText", type: "White Paper", title: "Data accuracy's hidden tax on ROI", excerpt: "Every 1% drop in data accuracy costs far more than list price. Here's the math, and how to fix it." },
  { iconName: "Download", type: "Template", title: "Audience brief template", excerpt: "The one-page document every marketing team should share with their data partner before kickoff." },
  { iconName: "BookOpen", type: "Guide", title: "Intent signals explained", excerpt: "What they are, where they come from, how to use them responsibly, and what to watch out for." },
  { iconName: "FileText", type: "Case Study", title: "40% pipeline lift in healthcare", excerpt: "How a mid-market medtech client doubled their meeting book after switching to Signal eXchange™." },
  { iconName: "Download", type: "Checklist", title: "GDPR + CCPA audit checklist", excerpt: "A practical checklist for marketing teams verifying data-partner compliance." },
];

type ResourcesDoc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  posts?: { iconName?: string; type?: string; title?: string; excerpt?: string }[];
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  newsletterCtaLabel?: string;
  metaTitle?: string;
  metaDescription?: string;
};

export const revalidate = 60;

const query = groq`*[_type == "resourcesPage" && _id == "resourcesPage"][0]`;
const homepageCtaQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  finalCtaKicker, finalCtaTitleStart, finalCtaTitleHighlight, finalCtaDescription, finalCtaPrimary, finalCtaSecondary, finalCtaTrust
}`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<ResourcesDoc | null>({ query, tags: ["resourcesPage"] });
  return {
    title: doc?.metaTitle || "Resources · Lorann LLC",
    description: doc?.metaDescription || "Guides, white papers, and case studies on audience intelligence, data quality, and marketing performance.",
    alternates: { canonical: "/resources" },
  };
}

export default async function ResourcesPage() {
  const [doc, hp] = await Promise.all([
    sanityFetch<ResourcesDoc | null>({ query, tags: ["resourcesPage"] }),
    sanityFetch<any>({ query: homepageCtaQuery, tags: ["homepage"] }),
  ]);

  const posts = doc?.posts ?? DEFAULT_POSTS;

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
      <PageHero
        kicker={doc?.heroKicker ?? "Resources"}
        title={<>{doc?.heroTitleStart ?? "Ideas, guides, and"} <span className="text-gradient">{doc?.heroTitleHighlight ?? "benchmarks"}</span></>}
        description={doc?.heroDescription ?? "Practical thinking on audience development, data quality, and marketing performance — written by our team."}
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => {
              const Icon = ICON_MAP[p.iconName ?? "BookOpen"] ?? BookOpen;
              return (
                <article
                  key={i}
                  className="reveal bg-white border border-slate-150 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group cursor-pointer"
                >
                  <div className="h-44 relative overflow-hidden"
                    style={{
                      background: i % 3 === 0
                        ? "linear-gradient(135deg, #1D45D9, #00A7EF)"
                        : i % 3 === 1
                          ? "linear-gradient(135deg, #1736B3, #1D45D9)"
                          : "linear-gradient(135deg, #00A7EF, #4F7DF5)"
                    }}
                  >
                    <div className="absolute inset-0"
                      style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    <div className="absolute inset-0 grid place-items-center">
                      <Icon className="w-16 h-16 text-white/40 group-hover:text-white/60 group-hover:scale-110 transition-all duration-500" />
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-[10.5px] font-mono uppercase tracking-wider font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                      {p.type}
                    </span>
                    <h3 className="font-display font-semibold text-xl mb-3 leading-snug tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4"><RichText value={p.excerpt} /></p>
                    <Link
                      href="mailto:info@lorannllc.com?subject=Resource%20Request"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-700 hover:gap-2.5 transition-all"
                    >
                      Request access <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-16 text-center reveal">
            <Kicker>Stay Updated</Kicker>
            <h2 className="font-display font-bold text-2xl lg:text-3xl tracking-tight text-slate-900 mt-4 mb-2">
              {doc?.newsletterTitle ?? "Get our best thinking, monthly"}
            </h2>
            <p className="text-slate-600 mb-6">{doc?.newsletterSubtitle ?? "No spam. Just high-signal ideas on audience intelligence."}</p>
            <Link
              href="mailto:info@lorannllc.com?subject=Newsletter%20Signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
            >
              {doc?.newsletterCtaLabel ?? "Subscribe to newsletter"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA content={finalCta} />
    </>
  );
}
