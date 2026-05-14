import { Heart, BarChart3, Building2, Shield, Car, ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import SectionHeader from "../ui/SectionHeader";
import { getIconComponent } from "../ui/IconByName";
import RichText from "../RichText";

type Industry = { id: string; Icon: LucideIcon; title: string; desc: any; href: string };

export type IndustriesContent = {
  kicker?: string;
  titleStart?: string;
  titleHighlight?: string;
  description?: any; // richText Portable Text
  items?: { id?: string; iconName?: string; title?: string; desc?: string; href?: string }[];
};

const DEFAULT_INDUSTRIES: Industry[] = [
  { id: "healthcare", Icon: Heart, title: "Healthcare", desc: "Physicians, hospitals, and allied health with HIPAA-conscious practices.", href: "/industries/healthcare" },
  { id: "financial", Icon: BarChart3, title: "Financial", desc: "Banks, credit unions, wealth management, and insurance with intent signals.", href: "/industries/financial" },
  { id: "b2b", Icon: Building2, title: "B2B", desc: "Decision-makers, department heads, and procurement teams everywhere.", href: "/industries/b2b" },
  { id: "insurance", Icon: Shield, title: "Insurance", desc: "Auto, life, health, and property buyers from high-intent lead programs.", href: "/industries/insurance" },
  { id: "automotive", Icon: Car, title: "Automotive", desc: "In-market buyers, dealerships, fleet operators, and aftermarket networks.", href: "/industries/automotive" },
];

export default function IndustriesSection({ content }: { content?: IndustriesContent }) {
  const INDUSTRIES: Industry[] =
    content?.items && content.items.length > 0
      ? content.items.map((it, i) => {
          const fallback = DEFAULT_INDUSTRIES[i % DEFAULT_INDUSTRIES.length];
          return {
            id: it.id || fallback.id,
            Icon: getIconComponent(it.iconName) || fallback.Icon,
            title: it.title || fallback.title,
            desc: it.desc || fallback.desc,
            href: it.href || fallback.href,
          };
        })
      : DEFAULT_INDUSTRIES;

  const kicker = content?.kicker || "Verticals";
  const titleStart = content?.titleStart || "Deep expertise across";
  const titleHighlight = content?.titleHighlight || "every industry";
  const description =
    content?.description ||
    "Vertical knowledge where data precision, targeting accuracy, and performance matter most.";
  return (
    <section id="industries" className="py-24 lg:py-32 radial-industries">
      <div className="container-custom">
        <SectionHeader
          kicker={kicker}
          title={
            <>
              {titleStart}
              <br />
              <span className="text-gradient">{titleHighlight}</span>
            </>
          }
          description={description}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {INDUSTRIES.map(({ id, Icon, title, desc, href }) => (
            <Link
              key={id}
              id={id}
              href={href}
              className="ind-card group relative bg-white border border-slate-150 rounded-2xl p-6 sm:p-8 min-h-[220px] overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-500 reveal"
            >
              {/* Dark blue gradient background — fades in on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{ background: "linear-gradient(135deg, #1736B3, #13256E)" }}
              />

              {/* Soft cyan glow behind the icon on hover — adds depth without
                  competing with the icon's own color. Pure decoration. */}
              <div
                className="absolute top-6 left-6 w-[52px] h-[52px] rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  background: "radial-gradient(circle, rgba(34, 191, 255, 0.55), transparent 70%)",
                  filter: "blur(14px)",
                }}
              />

              <div className="relative z-[1] transition-all duration-400">
                {/* Icon container
                    REST  : pale blue tile, brand-blue icon       (bg-blue-50 / text-blue-700)
                    HOVER : bright cyan gradient tile, deep navy icon
                            — high contrast against the dark card,
                            matches the brand's blue→cyan signature
                            used in the navbar feature panel and the
                            "Get Started" CTA. */}
                <div
                  className="w-[52px] h-[52px] rounded-[14px] grid place-items-center mb-4 transition-all duration-400
                             bg-blue-50 text-blue-700 ring-1 ring-transparent
                             group-hover:bg-gradient-to-br group-hover:from-cyan-400 group-hover:to-cyan-300
                             group-hover:text-blue-900 group-hover:ring-cyan-200/40
                             group-hover:shadow-[0_8px_24px_-6px_rgba(34,191,255,0.55)]"
                >
                  <Icon className="w-6 h-6" strokeWidth={2.25} />
                </div>

                <h4 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900 group-hover:text-white transition-colors">
                  {title}
                </h4>
                <p className="text-slate-600 text-[13.5px] leading-relaxed group-hover:text-white/85 transition-colors">
                  <RichText value={desc} />
                </p>
              </div>

              {/* Arrow circle — also switches to cyan on hover so it visually
                  rhymes with the icon container. */}
              <div
                className="absolute bottom-5 right-5 w-8 h-8 rounded-full grid place-items-center transition-all duration-400 z-[2]
                           bg-blue-50 text-blue-700
                           opacity-0 -translate-x-2
                           group-hover:opacity-100 group-hover:translate-x-0
                           group-hover:bg-cyan-400 group-hover:text-blue-900
                           group-hover:shadow-[0_6px_16px_-4px_rgba(34,191,255,0.55)]"
              >
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}