import PageHero from "@/components/ui/PageHero";
import HowItWorksSection, { type HowItWorksContent } from "@/components/sections/HowItWorksSection";
import StatsSection, { type StatsSectionContent } from "@/components/sections/StatsSection";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import { Clock, Users2, FileCheck, Headphones } from "lucide-react";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";

const ICON_MAP: Record<string, any> = { Clock, Users2, FileCheck, Headphones };

const DEFAULT_PROMISES = [
  { iconName: "Clock", title: "Fast turnaround", desc: "Most engagements go from kickoff to first activation in 7–14 days." },
  { iconName: "Users2", title: "Dedicated partnership", desc: "A named data strategist works directly with your team throughout." },
  { iconName: "FileCheck", title: "Transparent reporting", desc: "Clear methodology, clear sourcing, clear outcomes — documented." },
  { iconName: "Headphones", title: "Ongoing support", desc: "Refresh cycles, optimization reviews, and direct access to our team." },
];

type HowItWorksDoc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  promisesKicker?: string;
  promisesTitleStart?: string;
  promisesTitleHighlight?: string;
  promisesCards?: { iconName?: string; title?: string; desc?: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

type HomepageShared = {
  howKicker?: string;
  howTitleStart?: string;
  howTitleHighlight?: string;
  howTitleEnd?: string;
  howDescription?: string;
  howSteps?: any[];
  numbersKicker?: string;
  numbersTitleStart?: string;
  numbersTitleHighlight?: string;
  numbersDescription?: string;
  numbersStats?: any[];
  finalCtaKicker?: string;
  finalCtaTitleStart?: string;
  finalCtaTitleHighlight?: string;
  finalCtaDescription?: string;
  finalCtaPrimary?: { label?: string; href?: string };
  finalCtaSecondary?: { label?: string; href?: string };
  finalCtaTrust?: string[];
};

export const revalidate = 60;

const query = groq`*[_type == "howItWorksPage" && _id == "howItWorksPage"][0]`;
const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  howKicker, howTitleStart, howTitleHighlight, howTitleEnd, howDescription, howSteps,
  numbersKicker, numbersTitleStart, numbersTitleHighlight, numbersDescription, numbersStats,
  finalCtaKicker, finalCtaTitleStart, finalCtaTitleHighlight, finalCtaDescription, finalCtaPrimary, finalCtaSecondary, finalCtaTrust
}`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<HowItWorksDoc | null>({ query, tags: ["howItWorksPage"] });
  return {
    title: doc?.metaTitle || "How It Works · Lorann LLC",
    description: doc?.metaDescription || "A structured four-step process from data strategy to audience activation and continuous optimization.",
    alternates: { canonical: "/how-it-works" },
  };
}

export default async function HowItWorksPage() {
  const [doc, hp] = await Promise.all([
    sanityFetch<HowItWorksDoc | null>({ query, tags: ["howItWorksPage"] }),
    sanityFetch<HomepageShared | null>({ query: homepageQuery, tags: ["homepage"] }),
  ]);

  const promises = doc?.promisesCards ?? DEFAULT_PROMISES;

  const how: HowItWorksContent = {
    kicker: hp?.howKicker,
    titleStart: hp?.howTitleStart,
    titleHighlight: hp?.howTitleHighlight,
    titleEnd: hp?.howTitleEnd,
    description: hp?.howDescription,
    steps: hp?.howSteps,
  };

  const numbers: StatsSectionContent = {
    kicker: hp?.numbersKicker,
    titleStart: hp?.numbersTitleStart,
    titleHighlight: hp?.numbersTitleHighlight,
    description: hp?.numbersDescription,
    stats: hp?.numbersStats,
  };

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
        kicker={doc?.heroKicker ?? "The Process"}
        title={<>{doc?.heroTitleStart ?? "From data to"} <span className="text-gradient">{doc?.heroTitleHighlight ?? "results"}</span></>}
        description={doc?.heroDescription ?? "A structured, transparent process that takes your audience from strategy to activation to continuous optimization."}
      />

      <HowItWorksSection content={how} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>{doc?.promisesKicker ?? "Our Promise"}</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              {doc?.promisesTitleStart ?? "What every client"} <span className="text-gradient">{doc?.promisesTitleHighlight ?? "can expect"}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {promises.map((p) => {
              const Icon = ICON_MAP[p.iconName ?? "Clock"] ?? Clock;
              return (
                <div
                  key={p.title}
                  className="reveal bg-white border border-slate-150 rounded-2xl p-7 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-[14px] grid place-items-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">{p.title}</h3>
                  <p className="text-slate-600 text-[14px] leading-relaxed"><RichText value={p.desc} /></p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <StatsSection content={numbers} />
      <FinalCTA content={finalCta} />
    </>
  );
}
