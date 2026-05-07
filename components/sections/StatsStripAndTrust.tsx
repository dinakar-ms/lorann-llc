import { Users, CheckCircle, Briefcase, TrendingUp, type LucideIcon } from "lucide-react";
import { getIconComponent } from "../ui/IconByName";

type Stat = { iconName?: string; num?: string; label?: string };

export type StatsStripAndTrustContent = {
  stats?: Stat[];
  trustHeading?: string;
  brands?: string[];
};

const DEFAULT_STATS: { Icon: LucideIcon; num: string; label: string }[] = [
  { Icon: Users, num: "95M+", label: "Verified Contacts" },
  { Icon: CheckCircle, num: "98%", label: "Accuracy Rate" },
  { Icon: Briefcase, num: "500+", label: "Industries" },
  { Icon: TrendingUp, num: "10K+", label: "Campaigns" },
];

const DEFAULT_BRANDS = [
  "MICROSOFT", "IBM", "ORACLE", "SALESFORCE", "CISCO",
  "ADOBE", "ACCENTURE", "INTEL", "SNOWFLAKE", "WORKDAY",
];

const DEFAULT_HEADING = "Trusted by leading organizations worldwide";

export default function StatsStripAndTrust({
  content,
}: {
  content?: StatsStripAndTrustContent;
}) {
  const strip =
    content?.stats && content.stats.length > 0
      ? content.stats.map((s, i) => ({
          Icon: getIconComponent(s.iconName) || DEFAULT_STATS[i % DEFAULT_STATS.length].Icon,
          num: s.num || "",
          label: s.label || "",
        }))
      : DEFAULT_STATS;

  const heading = content?.trustHeading || DEFAULT_HEADING;
  const brands =
    content?.brands && content.brands.length > 0 ? content.brands : DEFAULT_BRANDS;

  return (
    <>
      {/* Stats Strip */}
      <div className="px-5 sm:px-6 lg:px-12 -mt-10 relative z-20">
        <div className="max-w-[1320px] mx-auto bg-white border border-slate-150 rounded-[22px] px-6 sm:px-10 py-7 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {strip.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              className={`flex items-center gap-3.5 relative ${i > 0 ? "md:before:content-[''] md:before:absolute md:before:-left-3 md:before:top-[10%] md:before:bottom-[10%] md:before:w-px md:before:bg-slate-200" : ""}`}
            >
              <div className="w-11 h-11 rounded-[11px] bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 grid place-items-center flex-shrink-0">
                <item.Icon className="w-5 h-5" />
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
            {heading}
          </p>
          <div className="flex overflow-hidden marquee-mask">
            <div className="flex gap-[72px] flex-shrink-0 animate-scroll-x pr-[72px] items-center">
              {[...brands, ...brands].map((brand, i) => (
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
