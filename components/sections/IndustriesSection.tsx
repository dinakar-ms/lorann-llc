import { Heart, BarChart3, Building2, Shield, Car, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";

const INDUSTRIES = [
  { id: "healthcare", Icon: Heart, title: "Healthcare", desc: "Physicians, hospitals, and allied health with HIPAA-conscious practices." },
  { id: "financial", Icon: BarChart3, title: "Financial", desc: "Banks, credit unions, wealth management, and insurance with intent signals." },
  { id: "b2b", Icon: Building2, title: "B2B", desc: "Decision-makers, department heads, and procurement teams everywhere." },
  { id: "insurance", Icon: Shield, title: "Insurance", desc: "Auto, life, health, and property buyers from high-intent lead programs." },
  { id: "automotive", Icon: Car, title: "Automotive", desc: "In-market buyers, dealerships, fleet operators, and aftermarket networks." },
];

export default function IndustriesSection() {
  return (
    <section id="industries" className="py-24 lg:py-32 radial-industries">
      <div className="container-custom">
        <SectionHeader
          kicker="Verticals"
          title={<>Deep expertise across<br /><span className="text-gradient">every industry</span></>}
          description="Vertical knowledge where data precision, targeting accuracy, and performance matter most."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map(({ id, Icon, title, desc }) => (
            <Link
              key={id}
              id={id}
              href={`mailto:info@lorannllc.com?subject=${title}%20Inquiry`}
              className="ind-card group relative bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 min-h-[220px] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 reveal"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ background: "linear-gradient(135deg, #1736B3, #13256E)" }}
              />
              <div className="relative z-[1] transition-all duration-400">
                <div className="w-13 h-13 w-[52px] h-[52px] bg-blue-50 text-blue-700 group-hover:bg-white/12 group-hover:text-white rounded-[14px] grid place-items-center mb-4.5 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900 group-hover:text-white transition-colors">
                  {title}
                </h4>
                <p className="text-slate-600 text-[13.5px] leading-relaxed group-hover:text-white transition-colors">
                  {desc}
                </p>
              </div>
              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-blue-50 group-hover:bg-white/15 grid place-items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 z-[2]">
                <ArrowRight className="w-3.5 h-3.5 text-blue-700 group-hover:text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
