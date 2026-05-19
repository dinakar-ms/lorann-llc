import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  Tag,
  Calendar,
  Check,
  Quote,
  TrendingUp,
  Database,
  Activity,
  HeartPulse,
  Users2,
  Building2,
  ShieldCheck,
} from "lucide-react";
import SubPageHero from "@/components/ui/SubPageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import RichText from "@/components/RichText";
import ScrollReveal from "@/components/ScrollReveal";

type Section = { heading: string; body: string };
type Article = {
  slug: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  titleHighlight: string;
  excerpt: string;
  Icon: typeof TrendingUp;
  intro: string;
  takeaways: string[];
  sections: Section[];
  pullQuote: string;
  relatedSlugs: string[];
};

const ARTICLES: Record<string, Article> = {
  "first-party-vs-third-party-data": {
    slug: "first-party-vs-third-party-data",
    category: "Data Strategy",
    date: "Apr 2026",
    readingTime: "7 min read",
    title: "Why first-party lead data outperforms",
    titleHighlight: "third-party files in 2026.",
    excerpt:
      "The intent signal layer matters more than the list size. A look at how Signal eXchange™ is built, and why continuous refresh beats quarterly batch updates.",
    Icon: TrendingUp,
    intro:
      "Through 2025 we watched buyers stop responding to the same playbook that powered the last decade of demand-gen. Bigger lists stopped translating into more meetings — and the teams winning the year all had one thing in common: a tighter, fresher, signal-rich first-party layer driving the campaign.",
    takeaways: [
      "Match rate is a vanity metric — recency and intent recency drive conversion.",
      "Continuous refresh outperforms quarterly batch updates by a wide margin on response rate.",
      "Signal eXchange™ blends behavioral, intent, and verified contact data into one live layer.",
      "First-party-led targeting compresses CPL while improving downstream pipeline quality.",
    ],
    sections: [
      {
        heading: "The list is no longer the asset.",
        body: "Third-party files were built for a world where contact information was scarce. In 2026 contact information is abundant — what is scarce is the signal that tells you which of those contacts is actually in market this week. Teams still buying static files are paying for the wrong thing. The asset isn't the row count; it's how recently each row moved.",
      },
      {
        heading: "What continuous refresh actually changes.",
        body: "Quarterly batch updates create a 90-day blind spot — exactly the window in which most B2B and consumer purchase intent forms and decays. Continuous refresh shrinks that window to days. The downstream effect is measurable: higher reply rates, lower bounce rates, and far less waste on accounts that already bought something else.",
      },
      {
        heading: "How Signal eXchange™ is layered.",
        body: "Signal eXchange™ stitches behavioral signals, content engagement, technographic shifts, and verified contact movement into one live layer that overlays your first-party file. Instead of replacing what you have, it tells you which records to act on now — and which to deprioritize until the signal returns.",
      },
    ],
    pullQuote:
      "The teams winning 2026 aren't buying bigger lists. They're operating smaller, fresher, signal-driven ones — and refreshing them in days, not quarters.",
    relatedSlugs: [
      "data-activation-bottleneck",
      "abm-data-quality",
      "auto-insurance-intent-roi",
    ],
  },
  "data-activation-bottleneck": {
    slug: "data-activation-bottleneck",
    category: "Activation",
    date: "Apr 2026",
    readingTime: "6 min read",
    title: "Data activation is the new bottleneck —",
    titleHighlight: "not data sourcing.",
    excerpt:
      "Marketing teams have more data than ever, and less of it is making it into production. Why integration, not acquisition, is the unlock.",
    Icon: Activity,
    intro:
      "Across the campaigns we ran in Q1 2026, the teams blocked on results weren't blocked on data — they were blocked on getting the data they already owned into the destinations that needed it. Acquisition has been solved. Activation has not.",
    takeaways: [
      "Most teams are sitting on more usable signal than they can deploy.",
      "The real cost is integration latency, not acquisition cost.",
      "Activation pipes — not warehouses — are where ROI gets unlocked or lost.",
      "Treating activation as a deployment surface, not a project, changes the math.",
    ],
    sections: [
      {
        heading: "Why the warehouse alone won't save you.",
        body: "A clean warehouse is necessary but not sufficient. If signal lands in a table and waits weeks to reach a campaign destination, the signal has already decayed by the time it arrives. The teams pulling ahead are the ones treating activation as a continuous pipe, not a quarterly project.",
      },
      {
        heading: "Where the friction actually lives.",
        body: "We see the same three frictions repeatedly: identity stitching across destinations, schema drift between source and platform, and a manual approval step that gates every release. Removing any one of them produces an outsized return — removing all three changes the operating model.",
      },
      {
        heading: "What good activation looks like.",
        body: "Signal moves from source to destination in hours, not weeks. Audiences refresh on a schedule the campaign actually needs. Suppression and consent state propagates everywhere automatically. And measurement is wired back into the same pipe — so the next refresh is smarter than the last.",
      },
    ],
    pullQuote:
      "Data sourcing is no longer the constraint. The teams that win in 2026 are the ones treating activation like the production system it is.",
    relatedSlugs: [
      "first-party-vs-third-party-data",
      "abm-data-quality",
      "healthcare-audience-patterns",
    ],
  },
  "healthcare-audience-patterns": {
    slug: "healthcare-audience-patterns",
    category: "Healthcare",
    date: "Mar 2026",
    readingTime: "5 min read",
    title: "Three patterns we see in healthcare",
    titleHighlight: "audience campaigns.",
    excerpt:
      "Provider-to-patient journeys, specialty-specific targeting, and compliance as a design constraint (not an afterthought).",
    Icon: HeartPulse,
    intro:
      "Healthcare campaigns operate under constraints that most other verticals don't: compliance posture, specialty fragmentation, and a buyer journey that crosses provider, payer, and patient. The patterns that work share a common shape — they treat those constraints as the design brief, not the cleanup step.",
    takeaways: [
      "Provider-to-patient journeys need different signal layers at each stage.",
      "Specialty-level targeting outperforms broad HCP coverage by a wide margin.",
      "Compliance designed into the data layer is faster than compliance bolted on later.",
      "The most effective healthcare files are continuously verified, not periodically scrubbed.",
    ],
    sections: [
      {
        heading: "Pattern 1 — Specialty-first targeting.",
        body: "Broad HCP coverage looks impressive on a slide and underperforms in a campaign. The HCP segments that lift response are scoped at the specialty and sub-specialty level — and matched against prescribing or referral signals where the use case allows.",
      },
      {
        heading: "Pattern 2 — Journey-aware audiences.",
        body: "A provider-facing message and a patient-facing message rarely belong in the same audience build. The journeys are different, the consent state is different, and the destinations are different. Splitting the audience by journey stage — and matching the signal layer to that stage — is what separates campaigns that scale from campaigns that stall.",
      },
      {
        heading: "Pattern 3 — Compliance as a design constraint.",
        body: "Compliance baked into the data layer is dramatically faster than compliance bolted on at the end. We design audiences with consent, channel-eligibility, and suppression state attached at the record level — so the activation step doesn't become the gating step.",
      },
    ],
    pullQuote:
      "Healthcare audiences don't fail because the data is wrong. They fail because the journey, the specialty, and the compliance posture weren't designed in from the start.",
    relatedSlugs: [
      "generic-consumer-data",
      "first-party-vs-third-party-data",
      "data-activation-bottleneck",
    ],
  },
  "generic-consumer-data": {
    slug: "generic-consumer-data",
    category: "Consumer",
    date: "Mar 2026",
    readingTime: "4 min read",
    title: "The case against",
    titleHighlight: "generic consumer data.",
    excerpt:
      "Demographics alone don't predict behavior. Why intent and lifecycle overlays transform the same audience into a very different result.",
    Icon: Users2,
    intro:
      "Two campaigns can buy the exact same demographic segment and see wildly different outcomes. The difference is rarely the file — it's the overlay. Generic consumer data describes who someone is. Intent and lifecycle data describe what they're about to do.",
    takeaways: [
      "Demographics describe the population. Intent describes the behavior.",
      "Lifecycle stage moves response rates more than demographic precision.",
      "Layered overlays consistently outperform single-dimension targeting.",
      "The same audience, retargeted with intent, frequently doubles in performance.",
    ],
    sections: [
      {
        heading: "Demographics describe — they don't predict.",
        body: "A 35–44 homeowner in the suburbs is a description, not a buyer signal. The same description fits someone refinancing, someone shopping for a second car, and someone who hasn't been in-market for either in years. Generic targeting treats all three identically.",
      },
      {
        heading: "What overlays change.",
        body: "Lifecycle stage, in-market signals, and recent behavior overlays act as a filter on top of demographics. The audience size shrinks — and response rate, conversion, and downstream value all rise. The math almost always favors the smaller, sharper segment.",
      },
      {
        heading: "Where this matters most.",
        body: "Direct-response verticals — auto, insurance, financial services, real estate — see the biggest gap between generic and overlay-targeted audiences. The same file, retargeted with the right signal layer, is effectively a different file.",
      },
    ],
    pullQuote:
      "Generic consumer data tells you who someone is. Intent and lifecycle data tell you what they're about to do — and that's the only one that converts.",
    relatedSlugs: [
      "auto-insurance-intent-roi",
      "first-party-vs-third-party-data",
      "data-activation-bottleneck",
    ],
  },
  "abm-data-quality": {
    slug: "abm-data-quality",
    category: "B2B",
    date: "Feb 2026",
    readingTime: "8 min read",
    title: "How we think about",
    titleHighlight: "ABM data quality.",
    excerpt:
      "Role mapping, technographic overlays, and the verification cadence that keeps account lists alive past their quarterly — written up as a working playbook.",
    Icon: Building2,
    intro:
      "ABM lists rot faster than the calendars built around them. The teams running ABM well in 2026 aren't running it from a one-time list — they're running it from a maintained surface, with role mapping, technographic overlays, and a verification cadence built into the operating rhythm.",
    takeaways: [
      "Role mapping at the buying-committee level beats title-only targeting.",
      "Technographic overlays change which accounts are actually addressable.",
      "Continuous verification beats quarterly cleanups by every metric we track.",
      "ABM is a maintained surface, not a deliverable list.",
    ],
    sections: [
      {
        heading: "Role mapping that survives reorgs.",
        body: "Title-only targeting fails the moment a buying committee shifts. The lists that hold up map roles by function and influence — economic buyer, technical evaluator, end user, blocker — and rebuild that mapping as titles change underneath them.",
      },
      {
        heading: "Technographic overlays that filter for fit.",
        body: "Two accounts with the same firmographic profile can be wildly different fits depending on their stack. Technographic overlays surface the accounts where your product is technically compatible — and quietly de-prioritize the ones where it never will be.",
      },
      {
        heading: "Verification as a cadence, not a project.",
        body: "We verify on a continuous cadence — contact movement, role changes, technographic shifts — and we treat the ABM file as a living surface. Once a quarter is too slow. The right cadence is closer to the cadence of your campaigns.",
      },
    ],
    pullQuote:
      "ABM doesn't fail at the campaign layer. It fails at the data layer, in the 90 days between when the list was built and when the campaign actually ran.",
    relatedSlugs: [
      "first-party-vs-third-party-data",
      "data-activation-bottleneck",
      "auto-insurance-intent-roi",
    ],
  },
  "auto-insurance-intent-roi": {
    slug: "auto-insurance-intent-roi",
    category: "Insurance",
    date: "Feb 2026",
    readingTime: "6 min read",
    title: "Auto and insurance: when intent",
    titleHighlight: "data changes the ROI math.",
    excerpt:
      "Case observations from running Signal eXchange™ across live campaigns — the segments that converted, and the ones that didn't.",
    Icon: ShieldCheck,
    intro:
      "Auto and insurance carriers run some of the most cost-sensitive direct-response programs in the market. When intent data is layered correctly, the ROI math changes — not by a few points, but by a step-function. Layered incorrectly, it just adds cost. The difference is in the segmentation.",
    takeaways: [
      "Intent windows are short — recency is everything.",
      "Quote-stage and bind-stage signals belong in different audiences.",
      "Segments that didn't convert almost always shared the same flaw: stale signal.",
      "The right intent layer compresses CPL while lifting bind rate at the same time.",
    ],
    sections: [
      {
        heading: "What converted.",
        body: "Audiences scoped tightly to in-market intent windows — and matched to the right campaign stage — consistently outperformed broader retargeted segments. Quote-stage signal routed to quote-stage creative outperformed everything else we tested.",
      },
      {
        heading: "What didn't.",
        body: "Segments built on intent signal older than the campaign cycle. Segments that mixed quote-stage and bind-stage prospects under one creative. Segments that ignored geographic and carrier-eligibility constraints. The pattern was consistent: when the segment failed, the signal was either stale, mixed, or mismatched to the creative.",
      },
      {
        heading: "Where the ROI math actually shifts.",
        body: "When carriers move from broad demographic targeting to layered intent targeting, the headline metric isn't response rate — it's cost-per-bind. Smaller, sharper audiences spend less to reach the same number of binds, and the surplus reinvests into the next cycle. That's the compounding effect that changes the operating model.",
      },
    ],
    pullQuote:
      "When intent data is fresh, scoped, and matched to the campaign stage, auto and insurance economics quietly stop looking like direct response and start looking like a subscription.",
    relatedSlugs: [
      "generic-consumer-data",
      "first-party-vs-third-party-data",
      "data-activation-bottleneck",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) return { title: "Industry Trends · Lorann LLC" };
  return {
    title: `${a.title} ${a.titleHighlight} · Lorann LLC`,
    description: a.excerpt,
    alternates: { canonical: `/insights/industry-trends/${slug}` },
  };
}

export default async function IndustryTrendArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const related = article.relatedSlugs
    .map((s) => ARTICLES[s])
    .filter(Boolean)
    .slice(0, 3);

  const Icon = article.Icon;

  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Industry Trends", href: "/insights/industry-trends" },
          { label: article.category },
        ]}
        kicker={article.category}
        title={
          <>
            {article.title}{" "}
            <span className="text-gradient">{article.titleHighlight}</span>
          </>
        }
        description={article.excerpt}
        primaryCta={{ label: "Talk to an Expert", href: "/contact" }}
        secondaryCta={{
          label: "All Industry Trends",
          href: "/insights/industry-trends",
        }}
      />

      {/* Meta strip */}
      <section className="bg-white border-b border-slate-150">
        <div className="container-custom py-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-blue-700">
          <span className="inline-flex items-center gap-1.5">
            <Tag className="w-3 h-3" /> {article.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3 h-3" /> {article.readingTime}
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3 h-3" /> {article.date}
          </span>
        </div>
      </section>

      {/* Decorative banner with icon */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[28px] min-h-[220px] lg:min-h-[260px] grid place-items-center"
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
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] border border-cyan-300/15 rounded-full pointer-events-none"
              style={{ animation: "spin 28s linear infinite" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22BFFF]" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-blue-400/10 rounded-full pointer-events-none"
              style={{ animation: "spin 44s linear infinite reverse" }}
            />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-400/15 border border-cyan-300/30 backdrop-blur-md grid place-items-center shadow-[0_20px_60px_-15px_rgba(34,191,255,0.5)]">
              <Icon className="w-10 h-10 text-cyan-200" strokeWidth={1.6} />
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Key takeaways */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            <div className="reveal">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                The take
              </div>
              <p className="text-slate-700 text-[18px] lg:text-[19px] leading-[1.75]">
                {article.intro}
              </p>
            </div>
            <aside className="reveal bg-gradient-to-br from-blue-50/60 to-cyan-50/40 border border-blue-100 rounded-2xl p-7 lg:p-8">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <Database className="w-3.5 h-3.5" />
                Key takeaways
              </div>
              <ul className="space-y-3.5">
                {article.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[14.5px] text-slate-700 leading-relaxed">
                    <Check
                      className="w-4 h-4 text-blue-700 mt-1 shrink-0"
                      strokeWidth={2.5}
                    />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* Body sections */}
      <section className="py-16 lg:py-20 radial-stats">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto space-y-12 lg:space-y-14">
            {article.sections.map((s, i) => (
              <article key={s.heading} className="reveal">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
                  {String(i + 1).padStart(2, "0")} ·{" "}
                  <span className="text-slate-500">Section</span>
                </div>
                <h2 className="font-display font-bold text-2xl lg:text-[2rem] leading-[1.15] tracking-[-0.025em] text-slate-900 mb-4">
                  {s.heading}
                </h2>
                <p className="text-slate-700 text-[16.5px] leading-[1.8]">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div
            className="reveal relative overflow-hidden rounded-[32px] p-10 lg:p-16 text-white"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <Quote className="w-12 h-12 text-cyan-300/70 mb-6" strokeWidth={1.5} />
            <p className="font-display text-2xl lg:text-[2rem] leading-[1.3] tracking-[-0.02em] max-w-3xl">
              {article.pullQuote}
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 lg:py-24 radial-stats">
          <div className="container-custom">
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                  Keep reading
                </div>
                <h2 className="font-display font-bold text-3xl lg:text-[2.4rem] leading-[1.1] tracking-[-0.025em] text-slate-900">
                  Related <span className="text-gradient">commentary.</span>
                </h2>
              </div>
              <Link
                href="/insights/industry-trends"
                className="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-[14px] hover:gap-2.5 transition-all"
              >
                All Industry Trends <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/insights/industry-trends/${r.slug}`}
                  className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-500 flex flex-col group"
                >
                  <div className="flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Tag className="w-[11px] h-[11px]" /> {r.category}
                    </span>
                    <span className="text-slate-500">{r.date}</span>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 tracking-[-0.02em] leading-tight mb-3">
                    {r.title} {r.titleHighlight}
                  </h3>
                  <p className="text-slate-600 text-[14px] leading-relaxed flex-1 mb-4">
                    <RichText value={r.excerpt} />
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-150">
                    <span className="flex items-center gap-1.5 text-[12.5px] text-slate-500">
                      <Clock className="w-3 h-3" /> {r.readingTime}
                    </span>
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
