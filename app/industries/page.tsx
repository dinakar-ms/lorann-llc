import PageHero from "@/components/ui/PageHero";
import IndustriesSection from "@/components/sections/IndustriesSection";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollReveal from "@/components/ScrollReveal";
import Kicker from "@/components/ui/Kicker";
import { Heart, BarChart3, Building2, Shield, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries · Lorann LLC",
  description: "Vertical expertise across healthcare, financial, B2B, insurance, and automotive — powered by high-accuracy data.",
};

const DEEP_DIVES = [
  {
    Icon: Heart,
    id: "healthcare",
    title: "Healthcare",
    lede: "Physicians, hospital systems, specialists, and allied health professionals.",
    features: [
      "NPI-verified physician records",
      "Hospital & health-system hierarchies",
      "Specialty-level segmentation",
      "HIPAA-conscious practices",
    ],
  },
  {
    Icon: BarChart3,
    id: "financial",
    title: "Financial Services",
    lede: "Banks, credit unions, wealth managers, CFOs, and treasury decision-makers.",
    features: [
      "High-net-worth consumer data",
      "Commercial banking decision-makers",
      "Wealth-tier segmentation",
      "Regulatory-compliant sourcing",
    ],
  },
  {
    Icon: Building2,
    id: "b2b",
    title: "B2B",
    lede: "Department heads, procurement teams, and decision-makers across every industry.",
    features: [
      "Function + seniority filters",
      "Technographic intelligence",
      "Company-size & revenue filters",
      "ABM-ready account lists",
    ],
  },
  {
    Icon: Shield,
    id: "insurance",
    title: "Insurance",
    lede: "Auto, life, health, and property buyers from high-intent lead programs.",
    features: [
      "In-market intent signals",
      "Coverage-type segmentation",
      "Age + demographic filters",
      "Multi-channel activation",
    ],
  },
  {
    Icon: Car,
    id: "automotive",
    title: "Automotive",
    lede: "In-market buyers, dealerships, fleet operators, and aftermarket networks.",
    features: [
      "Vehicle-purchase intent",
      "Dealership contact data",
      "Fleet operator records",
      "Geographic + make/model filters",
    ],
  },
];

export default function IndustriesPage() {
  return (
    <>
      <ScrollReveal />
      <PageHero
        kicker="Industries"
        title={<>Vertical expertise <span className="text-gradient">that delivers</span></>}
        description="Deep knowledge across five flagship industries — with accurate data, targeted segmentation, and measurable activation outcomes."
      />

      <IndustriesSection />

      {/* Deep dives */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 reveal">
            <Kicker>Deep Dives</Kicker>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-slate-900 mt-5 mb-4">
              Industry-specific <span className="text-gradient">data assets</span>
            </h2>
            <p className="text-slate-600 text-lg">Each vertical has its own sourcing, compliance framework, and segmentation logic.</p>
          </div>

          <div className="space-y-5">
            {DEEP_DIVES.map(({ Icon, id, title, lede, features }) => (
              <div
                key={id}
                id={id}
                className="reveal bg-white border border-slate-150 rounded-2xl p-8 lg:p-10 hover:shadow-lg transition-all group grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-center"
              >
                <div className="w-16 h-16 rounded-2xl grid place-items-center bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-[0_10px_24px_-8px_rgba(29,69,217,0.45)] group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-2xl mb-2 tracking-tight text-slate-900">{title}</h3>
                  <p className="text-slate-600 mb-3">{lede}</p>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f) => (
                      <span key={f} className="text-[12.5px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={`mailto:info@lorannllc.com?subject=${encodeURIComponent(title)}%20Data%20Inquiry`}
                  className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 text-slate-900 rounded-xl font-semibold text-[14px] hover:border-blue-500 hover:text-blue-700 transition-all"
                >
                  Request Info
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
