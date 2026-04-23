import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Kicker from "./Kicker";

export type Crumb = { label: string; href?: string };

interface SubPageHeroProps {
  crumbs?: Crumb[];
  kicker: string;
  title: ReactNode;
  description: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function SubPageHero({
  crumbs,
  kicker,
  title,
  description,
  primaryCta,
  secondaryCta,
}: SubPageHeroProps) {
  return (
    <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden radial-hero dot-grid">
      <div
        className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1"
        style={{ background: "rgba(79, 125, 245, 0.4)" }}
      />
      <div
        className="absolute -bottom-20 -right-[10%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[80px] animate-orb-float-2"
        style={{ background: "rgba(34, 191, 255, 0.3)" }}
      />
      <div className="container-custom relative z-[5]">
        {crumbs && crumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-[13px] text-slate-500 mb-6"
          >
            {crumbs.map((c, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <span key={`${c.label}-${i}`} className="inline-flex items-center gap-1.5">
                  {c.href && !isLast ? (
                    <Link
                      href={c.href}
                      className="hover:text-blue-700 transition-colors"
                    >
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-slate-700 font-medium">{c.label}</span>
                  )}
                  {!isLast && (
                    <ChevronRight className="w-3 h-3 opacity-50" />
                  )}
                </span>
              );
            })}
          </nav>
        )}

        <div className="max-w-3xl">
          <Kicker>{kicker}</Kicker>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.04] tracking-[-0.035em] text-slate-900 mt-5 mb-5">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
            {description}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
                >
                  {primaryCta.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-900 font-semibold text-[14.5px] rounded-xl shadow-sm hover:border-blue-500 hover:text-blue-700 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(29,69,217,0.3)] transition-all"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
