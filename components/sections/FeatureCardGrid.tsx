import { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export type Feature = {
  Icon?: React.ElementType;
  title: string;
  desc: string;
  href?: string;
  badge?: string;
};

interface FeatureCardGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  style?: "card" | "check" | "numbered";
}

export default function FeatureCardGrid({
  features,
  columns = 3,
  style = "card",
}: FeatureCardGridProps) {
  const colClass =
    columns === 4
      ? "md:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-2 lg:grid-cols-3";

  if (style === "check") {
    return (
      <ul className="flex flex-col gap-4 max-w-4xl mx-auto">
        {features.map((f) => (
          <li
            key={f.title}
            className="reveal grid grid-cols-[auto_1fr] gap-4 items-start p-5 bg-white border border-slate-150 rounded-2xl hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white grid place-items-center flex-shrink-0 mt-0.5 shadow-[0_4px_10px_-3px_rgba(29,69,217,0.4)]">
              <Check className="w-4 h-4" strokeWidth={3} />
            </span>
            <div>
              <h3 className="font-display font-semibold text-[16px] text-slate-900 tracking-[-0.015em] leading-snug mb-1">
                {f.title}
              </h3>
              {f.desc && (
                <p className="text-[14px] text-slate-600 leading-relaxed">
                  {f.desc}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (style === "numbered") {
    return (
      <div className={`grid grid-cols-1 ${colClass} gap-5`}>
        {features.map((f, i) => (
          <div
            key={f.title}
            className="reveal relative bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-500 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            <span className="font-mono text-[13px] font-semibold text-blue-600 tracking-[0.08em] block mb-4 relative">
              {String(i + 1).padStart(2, "0")}
              <span className="absolute top-1/2 -translate-y-1/2 left-12 w-10 h-px bg-gradient-to-r from-blue-400 to-transparent" />
            </span>
            <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900">
              {f.title}
            </h3>
            <p className="text-slate-600 text-[14.5px] leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 ${colClass} gap-5`}>
      {features.map((f) => {
        const body = (
          <>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
            {f.Icon && (
              <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent group-hover:scale-105 transition-all">
                <f.Icon className="w-5 h-5" />
              </div>
            )}
            <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900 flex items-center gap-2 flex-wrap">
              {f.title}
              {f.badge && (
                <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                  {f.badge}
                </span>
              )}
            </h3>
            <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
              {f.desc}
            </p>
            {f.href && (
              <span className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-blue-700 mt-4 group-hover:gap-2.5 transition-all">
                Learn more <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            )}
          </>
        );

        const classes =
          "reveal relative bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200 transition-all duration-500 group flex flex-col overflow-hidden";

        return f.href ? (
          <Link key={f.title} href={f.href} className={classes}>
            {body}
          </Link>
        ) : (
          <div key={f.title} className={classes}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
