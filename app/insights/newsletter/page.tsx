import SubPageHero from "@/components/ui/SubPageHero";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import NewsletterForm from "./NewsletterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter · Stay Connected — Lorann LLC",
  description:
    "Get periodic insights on data, audience strategy, and marketing performance delivered directly to your inbox.",
};

export default function NewsletterPage() {
  return (
    <>
      <ScrollReveal />
      <SubPageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: "Newsletter" },
        ]}
        kicker="Newsletter"
        title={
          <>
            Periodic insights on data, audience strategy,{" "}
            <span className="text-gradient">and marketing performance.</span>
          </>
        }
        description="Get strategic POV, commentary, and market observations from the Lorann team — delivered to your inbox on a cadence that respects your time."
      />

      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div className="reveal">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What you&rsquo;ll get
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900 mb-5">
                Strategic perspective,{" "}
                <span className="text-gradient">not noise.</span>
              </h2>
              <p className="text-slate-600 text-[17px] leading-[1.7] mb-7">
                No daily digests, no promotional spam. Just periodic POV on data, audience
                strategy, and the patterns we&rsquo;re seeing across client campaigns.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "New commentary on audience strategy and performance",
                  "Early access to Lorann case studies and benchmarks",
                  "Signal eXchange™ product updates and vertical expansions",
                  "Occasional long-reads — never more than one a month",
                ].map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-[14.5px] text-slate-700 leading-relaxed"
                  >
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

      <FinalCTA />
    </>
  );
}
