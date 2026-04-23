import { Users, CheckCircle, Briefcase, TrendingUp } from "lucide-react";

const BRANDS = [
  "MICROSOFT", "IBM", "ORACLE", "SALESFORCE", "CISCO",
  "ADOBE", "ACCENTURE", "INTEL", "SNOWFLAKE", "WORKDAY",
];

const STRIP = [
  { icon: Users, num: "95M+", label: "Verified Contacts" },
  { icon: CheckCircle, num: "98%", label: "Accuracy Rate" },
  { icon: Briefcase, num: "500+", label: "Industries" },
  { icon: TrendingUp, num: "10K+", label: "Campaigns" },
];

export default function StatsStripAndTrust() {
  return (
    <>
      {/* Stats Strip */}
      <div className="px-5 sm:px-6 lg:px-12 -mt-10 relative z-20">
        <div className="max-w-[1320px] mx-auto bg-white border border-slate-150 rounded-[22px] px-6 sm:px-10 py-7 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {STRIP.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center gap-3.5 relative ${i > 0 ? "md:before:content-[''] md:before:absolute md:before:-left-3 md:before:top-[10%] md:before:bottom-[10%] md:before:w-px md:before:bg-slate-200" : ""}`}
            >
              <div className="w-11 h-11 rounded-[11px] bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 grid place-items-center flex-shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-[22px] text-slate-900 tracking-tight leading-none">
                  {item.num}
                </div>
                <div className="text-xs text-slate-500 mt-1">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Band */}
      <section className="py-16 bg-white border-t border-slate-150">
        <div className="container-custom">
          <p className="text-center font-mono text-[11.5px] tracking-[0.2em] uppercase text-slate-500 mb-8">
            Trusted by leading organizations worldwide
          </p>
          <div className="flex overflow-hidden marquee-mask">
            <div className="flex gap-[72px] flex-shrink-0 animate-scroll-x pr-[72px] items-center">
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <span
                  key={i}
                  className="font-display font-semibold text-xl text-slate-400 tracking-tight whitespace-nowrap hover:text-blue-700 hover:-translate-y-0.5 transition-all"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
