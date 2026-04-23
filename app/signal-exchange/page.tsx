import PageHero from "@/components/ui/PageHero";
import SignalExchangeSection from "@/components/sections/SignalExchangeSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import Button from "@/components/ui/Button";
import { Zap, RefreshCw, Target, BarChart3, Radio, Database } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signal eXchange™ · Lorann LLC",
  description: "Our proprietary intelligence layer fuses first-party lead data with real-time intent signals — producing higher-converting audiences.",
};

const CAPABILITIES = [
  { Icon: Database, title: "First-party data layer", desc: "Continuously sourced lead data from trusted partners, processed through our proprietary quality pipeline." },
  { Icon: Radio, title: "Real-time intent signals", desc: "Live buyer-signal feeds reveal who's actively researching what — so you focus where demand exists right now." },
  { Icon: RefreshCw, title: "Continuous refresh", desc: "Profiles never stop improving. Verification, enrichment, and scoring run continuously in the background." },
  { Icon: Target, title: "Higher-intent segments", desc: "Intent + firmographic fusion produces audiences that convert measurably higher than traditional lists." },
  { Icon: Zap, title: "Channel-ready output", desc: "Activate directly into CRM, email, digital ads, and direct mail with no reformatting friction." },
  { Icon: BarChart3, title: "Performance feedback loop", desc: "Campaign results feed back into the model — so your audiences get sharper with every activation." },
];

export default function SignalExchangePage() {
  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="Proprietary Intelligence"
        title={<>Meet <span className="text-gradient">Signal eXchange™</span></>}
        description="The industry's first continuously evolving dataset that fuses first-party lead data with real-time intent signals — delivering audiences that reach ready buyers, not just people."
      />

      <SignalExchangeSection />

      {/* Capabilities */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>Capabilities</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              Six capabilities, <span className="text-gradient">one engine</span>
            </h2>
            <p className="text-slate-600 text-lg">Every Signal eXchange™ audience benefits from the full capability set — working together.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CAPABILITIES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">{title}</h3>
                <p className="text-slate-600 text-[14.5px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results block */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto reveal">
            <div className="bg-white border border-slate-150 rounded-3xl p-10 lg:p-14 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <Kicker>Typical Results</Kicker>
                  <h3 className="font-display font-bold text-3xl lg:text-4xl leading-tight tracking-tight text-slate-900 mt-4 mb-4">
                    Audiences that <span className="text-gradient">perform</span>
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Signal eXchange™ audiences consistently outperform traditional list pulls across the metrics that matter — opens, engagement, meetings, and pipeline.
                  </p>
                  <Button href="mailto:info@lorannllc.com?subject=Signal%20eXchange%20Demo" variant="glow" showArrow>
                    Request a Demo
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "+40%", label: "Engagement lift" },
                    { num: "+28%", label: "Meeting rate" },
                    { num: "+35%", label: "Pipeline velocity" },
                    { num: "-22%", label: "CAC reduction" },
                  ].map((s) => (
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

      <FinalCTA />
    </>
  );
}
