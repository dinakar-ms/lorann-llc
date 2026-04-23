import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Kicker from "@/components/ui/Kicker";
import ScrollReveal from "@/components/ScrollReveal";
import FinalCTA from "@/components/sections/FinalCTA";
import { Target, Eye, Heart, TrendingUp, Users, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Lorann LLC",
  description: "Lorann builds audiences that perform. Learn about our mission, team, and commitment to data quality.",
};

const VALUES = [
  { Icon: Target, title: "Precision over volume", desc: "Better-targeted audiences outperform bigger lists every time. We choose quality at every step." },
  { Icon: Eye, title: "Transparency always", desc: "Clear sourcing, clear methods, clear compliance. Our clients know exactly what they're buying." },
  { Icon: Heart, title: "Client-first culture", desc: "Every engagement is a partnership. We win when your campaigns win — that's the whole business." },
  { Icon: TrendingUp, title: "Continuous improvement", desc: "Data moves. So do we. Our verification, enrichment, and modeling never stop." },
  { Icon: Users, title: "Privacy as a value", desc: "We treat consumer and business data like the sensitive asset it is — with GDPR, CCPA, and beyond." },
  { Icon: Award, title: "Outcomes we can prove", desc: "Open reporting, measurable impact, and campaigns that lift the metrics clients actually care about." },
];

export default function AboutPage() {
  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="About Lorann"
        title={<>Built to help marketers <span className="text-gradient">list smarter.</span></>}
        description="Lorann is a premium audience development and activation partner for B2B, healthcare, and consumer data intelligence — delivering data that drives real marketing outcomes."
      />

      {/* Mission section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal">
              <Kicker>Our Mission</Kicker>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-6">
                We believe great marketing starts with <span className="text-gradient">great data.</span>
              </h2>
              <div className="space-y-5 text-slate-600 text-[16.5px] leading-relaxed">
                <p>
                  Lorann was founded on a simple observation: marketing teams everywhere are drowning in tools, but starving for audiences that actually perform. Most data providers hand you a list; we hand you a strategy.
                </p>
                <p>
                  We combine 95M+ continuously verified contacts with our proprietary Signal eXchange™ intent layer — then pair that with the hands-on partnership most teams never get from a data vendor.
                </p>
                <p>
                  The result: audiences that don&apos;t just reach people, they reach the right people, at the right time, through the right channels.
                </p>
              </div>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden reveal"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(29, 69, 217, 0.15), transparent 60%), linear-gradient(135deg, #E4EDFF 0%, #F0F5FF 100%)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(rgba(29, 69, 217, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(29, 69, 217, 0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  WebkitMaskImage: "radial-gradient(ellipse at center, #000, transparent 80%)",
                  maskImage: "radial-gradient(ellipse at center, #000, transparent 80%)",
                }}
              />
              <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full p-10">
                <defs>
                  <radialGradient id="aboutCore"><stop offset="0%" stopColor="#4F7DF5" /><stop offset="100%" stopColor="#162D8C" /></radialGradient>
                </defs>
                <circle cx="200" cy="200" r="150" fill="none" stroke="#CDDCFE" strokeWidth="1.5" strokeDasharray="4 4"><animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" /></circle>
                <circle cx="200" cy="200" r="110" fill="none" stroke="#A9C2FD" strokeWidth="1.5" strokeDasharray="2 4"><animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="30s" repeatCount="indefinite" /></circle>
                <circle cx="200" cy="200" r="70" fill="url(#aboutCore)"><animate attributeName="r" values="65;75;65" dur="3s" repeatCount="indefinite" /></circle>
                <text x="200" y="196" fill="#fff" fontFamily="Space Grotesk" fontSize="18" fontWeight="700" textAnchor="middle">LORANN</text>
                <text x="200" y="216" fill="#CDDCFE" fontFamily="Inter" fontSize="11" textAnchor="middle">List Smarter</text>
                {[0, 60, 120, 180, 240, 300].map((angle) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 200 + Math.cos(rad) * 150;
                  const cy = 200 + Math.sin(rad) * 150;
                  return (
                    <circle key={angle} cx={cx} cy={cy} r="6" fill="#22BFFF">
                      <animate attributeName="r" values="5;9;5" dur="2s" begin={`${angle / 100}s`} repeatCount="indefinite" />
                    </circle>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>Our Values</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              What we <span className="text-gradient">stand for</span>
            </h2>
            <p className="text-slate-600 text-lg">Six principles that shape every dataset we build and every campaign we support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="reveal bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">{title}</h3>
                <p className="text-slate-600 text-[14.5px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/stats */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>Our Scale</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              Built on <span className="text-gradient">trust and volume</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {[
              { num: "95M+", label: "Verified Contacts" },
              { num: "98%", label: "Accuracy Rate" },
              { num: "500+", label: "Industries" },
              { num: "10K+", label: "Campaigns Powered" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-slate-150 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all">
                <div className="font-display font-bold text-4xl lg:text-5xl leading-none mb-2"
                  style={{ background: "linear-gradient(135deg, #1736B3 0%, #00A7EF 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {s.num}
                </div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal">
            <Button href="/contact" variant="primary" showArrow>
              Work With Us
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
