import { ReactNode } from "react";
import Kicker from "./Kicker";

interface PageHeroProps {
  kicker: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export default function PageHero({ kicker, title, description, children }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-24 overflow-hidden radial-hero dot-grid">
      <div
        className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1"
        style={{ background: "rgba(79, 125, 245, 0.4)" }}
      />
      <div
        className="absolute -bottom-20 -right-[10%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[80px] animate-orb-float-2"
        style={{ background: "rgba(34, 191, 255, 0.3)" }}
      />
      <div className="container-custom relative z-[5]">
        <div className="max-w-3xl mx-auto text-center">
          <Kicker>{kicker}</Kicker>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.035em] text-slate-900 mt-6 mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
          {children && <div className="mt-10">{children}</div>}
        </div>
      </div>
    </section>
  );
}
