import SubPageHero from "@/components/ui/SubPageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies · Lorann LLC",
  description:
    "Examples of how Lorann data and audience strategies support real campaign performance across industries and channels.",
};

const CASES = [
  {
    industry: "Auto Insurance",
    client: "Mid-market insurer",
    title: "Lifting quote-to-bind conversion with Signal eXchange™.",
    challenge:
      "A mid-market auto insurance carrier needed higher-intent lead volume to feed their call center — with strict CPL constraints.",
    approach:
      "We layered Signal eXchange™ intent signals onto their existing consumer file and prioritized records by in-market likelihood.",
    outcome: "+34% lift in quote-to-bind on matched segments, at a lower per-lead cost.",
    metrics: [
      { label: "Conversion Lift", value: "+34%" },
      { label: "CPL Change", value: "−21%" },
      { label: "Deployment", value: "Call center" },
    ],
  },
  {
    industry: "B2B SaaS",
    client: "Enterprise platform vendor",
    title: "Rebuilding ABM targeting from a legacy account list.",
    challenge:
      "A SaaS vendor had a stale ABM target list — out-of-date contacts, missing technographic signals, and poor deliverability.",
    approach:
      "We enriched their account file with current contacts, technographics, and intent overlays — then rebuilt the target list around ICP-fit segments.",
    outcome: "+52% improvement in email deliverability, +28% MQL lift over two quarters.",
    metrics: [
      { label: "Deliverability", value: "+52%" },
      { label: "MQL Lift", value: "+28%" },
      { label: "Coverage", value: "4,200 accounts" },
    ],
  },
  {
    industry: "Healthcare",
    client: "Specialty pharma manufacturer",
    title: "Reaching prescribing specialists with compliance built in.",
    challenge:
      "A specialty pharma brand needed targeted outreach to a specific prescribing physician segment without compromising on compliance posture.",
    approach:
      "We built a custom HCP audience using specialty, credential, and prescribing-pattern attributes — cleared through our compliance review before activation.",
    outcome:
      "Segment audience activated across email and direct mail; campaign achieved brand's target engagement benchmarks.",
    metrics: [
      { label: "Segment Size", value: "~18K HCPs" },
      { label: "Channels", value: "Email + DM" },
      { label: "Compliance", value: "Verified" },
    ],
  },
  {
    industry: "Financial Services",
    client: "Regional lender",
    title: "Scaling consumer lending acquisition with a lookalike model.",
    challenge:
      "A regional consumer lender wanted to scale acquisition in new geographies with a tightly-performing lookalike of their best customers.",
    approach:
      "We modeled lookalikes from their best-performing customer cohort using consumer attributes + intent signals, then deployed across digital and direct mail.",
    outcome: "+41% higher conversion on lookalike segments vs. control audience.",
    metrics: [
      { label: "Conversion Lift", value: "+41%" },
      { label: "Geographies", value: "7 new DMAs" },
      { label: "Channel Mix", value: "Digital + DM" },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Case Studies" },
        ]}
        kicker="Insights"
        title={
          <>
            How Lorann data performs{" "}
            <span className="text-gradient">in real campaigns.</span>
          </>
        }
        description="Examples of how our data and audience strategies support real campaign performance across industries and channels. Clear, outcome-focused — no fluff, no exaggeration."
        primaryCta={{ label: "Build My Audience", href: "/contact" }}
        secondaryCta={{ label: "See Industry Trends", href: "/insights/industry-trends" }}
      />

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
            {CASES.map((c) => (
              <article
                key={c.title}
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
                      <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">
                        Challenge
                      </dt>
                      <dd className="text-[14.5px] text-slate-700 leading-relaxed">
                        {c.challenge}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">
                        Approach
                      </dt>
                      <dd className="text-[14.5px] text-slate-700 leading-relaxed">
                        {c.approach}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-blue-700 mb-1">
                        Outcome
                      </dt>
                      <dd className="text-[14.5px] text-slate-900 font-medium leading-relaxed">
                        {c.outcome}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div
                  className="p-7 rounded-2xl text-white flex flex-col gap-4 relative overflow-hidden"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 20% 30%, rgba(79, 125, 245, 0.22), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
                  }}
                >
                  {c.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className={`flex flex-col gap-1 ${
                        i < c.metrics.length - 1 ? "pb-4 border-b border-cyan-400/18" : ""
                      }`}
                    >
                      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                        {m.label}
                      </span>
                      <span className="font-display font-bold text-2xl lg:text-[1.7rem] tracking-[-0.02em] leading-none">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
