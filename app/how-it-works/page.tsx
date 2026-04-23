import PageHero from "@/components/ui/PageHero";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsSection from "@/components/sections/StatsSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import { Clock, Users2, FileCheck, Headphones } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works · Lorann LLC",
  description: "A structured four-step process from data strategy to audience activation and continuous optimisation.",
};

const PROMISES = [
  { Icon: Clock, title: "Fast turnaround", desc: "Most engagements go from kickoff to first activation in 7–14 days." },
  { Icon: Users2, title: "Dedicated partnership", desc: "A named data strategist works directly with your team throughout." },
  { Icon: FileCheck, title: "Transparent reporting", desc: "Clear methodology, clear sourcing, clear outcomes — documented." },
  { Icon: Headphones, title: "Ongoing support", desc: "Refresh cycles, optimisation reviews, and direct access to our team." },
];

export default function HowItWorksPage() {
  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="The Process"
        title={<>From data to <span className="text-gradient">results</span></>}
        description="A structured, transparent process that takes your audience from strategy to activation to continuous optimisation."
      />

      <HowItWorksSection />

      {/* What you get */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>Our Promise</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              What every client <span className="text-gradient">can expect</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROMISES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="reveal bg-white border border-slate-150 rounded-2xl p-7 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-[14px] grid place-items-center bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">{title}</h3>
                <p className="text-slate-600 text-[14px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <FinalCTA />
    </>
  );
}
