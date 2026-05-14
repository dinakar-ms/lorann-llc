import PageHero from "@/components/ui/PageHero";
import SignalExchangeSection, { type SignalExchangeContent } from "@/components/sections/SignalExchangeSection";
import FinalCTA, { type FinalCTAContent } from "@/components/sections/FinalCTA";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";
import { Zap, RefreshCw, Target, BarChart3, Radio, Database } from "lucide-react";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/fetch";

const ICON_MAP: Record<string, any> = { Database, Radio, RefreshCw, Target, Zap, BarChart3 };

const DEFAULT_CAPABILITIES = [
  { iconName: "Database", title: "First-party data layer", desc: "Continuously sourced lead data from trusted partners, processed through our proprietary quality pipeline." },
  { iconName: "Radio", title: "Real-time intent signals", desc: "Live buyer-signal feeds reveal who's actively researching what — so you focus where demand exists right now." },
  { iconName: "RefreshCw", title: "Continuous refresh", desc: "Profiles never stop improving. Verification, enrichment, and scoring run continuously in the background." },
  { iconName: "Target", title: "Higher-intent segments", desc: "Intent + firmographic fusion produces audiences that convert measurably higher than traditional lists." },
  { iconName: "Zap", title: "Channel-ready output", desc: "Activate directly into CRM, email, Programmatic ads, and direct mail with no reformatting friction." },
  { iconName: "BarChart3", title: "Performance feedback loop", desc: "Campaign results feed back into the model — so your audiences get sharper with every activation." },
];

const DEFAULT_RESULTS_STATS = [
  { num: "+40%", label: "Engagement lift" },
  { num: "+28%", label: "Meeting rate" },
  { num: "+35%", label: "Pipeline velocity" },
  { num: "-22%", label: "CAC reduction" },
];

type SignalExchangeDoc = {
  heroKicker?: string;
  heroTitleStart?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  capabilitiesKicker?: string;
  capabilitiesTitleStart?: string;
  capabilitiesTitleHighlight?: string;
  capabilitiesSubtitle?: string;
  capabilitiesCards?: { iconName?: string; title?: string; desc?: string }[];
  resultsKicker?: string;
  resultsTitleStart?: string;
  resultsTitleHighlight?: string;
  resultsDescription?: string;
  resultsCta?: { label?: string; href?: string };
  resultsStats?: { num?: string; label?: string }[];
  metaTitle?: string;
  metaDescription?: string;
};

type HomepageShared = {
  signalKicker?: string;
  signalTitle?: string;
  signalDescription?: string;
  signalFeatures?: string[];
  signalCta?: { label?: string; href?: string };
  finalCtaKicker?: string;
  finalCtaTitleStart?: string;
  finalCtaTitleHighlight?: string;
  finalCtaDescription?: string;
  finalCtaPrimary?: { label?: string; href?: string };
  finalCtaSecondary?: { label?: string; href?: string };
  finalCtaTrust?: string[];
};

export const dynamic = "force-dynamic";

const query = groq`*[_type == "signalExchangePage" && _id == "signalExchangePage"][0]`;
const homepageQuery = groq`*[_type == "homepage" && _id == "homepage"][0]{
  signalKicker, signalTitle, signalDescription, signalFeatures, signalCta,
  finalCtaKicker, finalCtaTitleStart, finalCtaTitleHighlight, finalCtaDescription, finalCtaPrimary, finalCtaSecondary, finalCtaTrust
}`;

export async function generateMetadata(): Promise<Metadata> {
  const doc = await sanityFetch<SignalExchangeDoc | null>({ query, tags: ["signalExchangePage"] });
  return {
    title: doc?.metaTitle || "Signal eXchange™ · Lorann LLC",
    description: doc?.metaDescription || "Our proprietary intelligence layer fuses first-party lead data with real-time intent signals — producing higher-converting audiences.",
  };
}

export default async function SignalExchangePage() {
  const [doc, hp] = await Promise.all([
    sanityFetch<SignalExchangeDoc | null>({ query, tags: ["signalExchangePage"] }),
    sanityFetch<HomepageShared | null>({ query: homepageQuery, tags: ["homepage"] }),
  ]);

  const capabilities = doc?.capabilitiesCards ?? DEFAULT_CAPABILITIES;
  const resultsStats = doc?.resultsStats ?? DEFAULT_RESULTS_STATS;

  const signal: SignalExchangeContent = {
    kicker: hp?.signalKicker,
    title: hp?.signalTitle,
    description: hp?.signalDescription,
    features: hp?.signalFeatures,
    cta: hp?.signalCta,
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
        kicker={doc?.heroKicker ?? "Proprietary Intelligence"}
        title={<>{doc?.heroTitleStart ?? "Meet"} <span className="text-gradient">{doc?.heroTitleHighlight ?? "Signal eXchange™"}</span></>}
        description={doc?.heroDescription ?? "The industry's first continuously evolving dataset that fuses first-party lead data with real-time intent signals — delivering audiences that reach ready buyers, not just people."}
      />

      <SignalExchangeSection content={signal} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>{doc?.capabilitiesKicker ?? "Capabilities"}</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              {doc?.capabilitiesTitleStart ?? "Six capabilities,"} <span className="text-gradient">{doc?.capabilitiesTitleHighlight ?? "one engine"}</span>
            </h2>
            <p className="text-slate-600 text-lg">{doc?.capabilitiesSubtitle ?? "Every Signal eXchange™ audience benefits from the full capability set — working together."}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((c) => {
              const Icon = ICON_MAP[c.iconName ?? "Database"] ?? Database;
              return (
                <div
                  key={c.title}
                  className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">{c.title}</h3>
                  <p className="text-slate-600 text-[14.5px] leading-relaxed"><RichText value={c.desc} /></p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto reveal">
            <div className="bg-white border border-slate-150 rounded-3xl p-10 lg:p-14 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <Kicker>{doc?.resultsKicker ?? "Typical Results"}</Kicker>
                  <h3 className="font-display font-bold text-3xl lg:text-4xl leading-tight tracking-tight text-slate-900 mt-4 mb-4">
                    {doc?.resultsTitleStart ?? "Audiences that"} <span className="text-gradient">{doc?.resultsTitleHighlight ?? "perform"}</span>
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {doc?.resultsDescription ?? "Signal eXchange™ audiences consistently outperform traditional list pulls across the metrics that matter — opens, engagement, meetings, and pipeline."}
                  </p>
                  <Button href={doc?.resultsCta?.href ?? "mailto:info@lorannllc.com?subject=Signal%20eXchange%20Demo"} variant="glow" showArrow>
                    {doc?.resultsCta?.label ?? "Request a Demo"}
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {resultsStats.map((s) => (
                    <div key={s.label} className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100">
                      <div className="font-display font-bold text-3xl mb-1"
                        style={{ background: "linear-gradient(135deg, #1736B3 0%, #00A7EF 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {s.num}
                      </div>
                      <div className="text-slate-500 text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA content={finalCta} />
    </>
  );
}
