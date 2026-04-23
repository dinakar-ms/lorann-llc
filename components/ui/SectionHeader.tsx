import { ReactNode } from "react";
import Kicker from "./Kicker";

interface SectionHeaderProps {
  kicker: string;
  title: ReactNode;
  description?: string;
  center?: boolean;
  className?: string;
}

export default function SectionHeader({
  kicker,
  title,
  description,
  center = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} max-w-[720px] mb-16 md:mb-20 reveal ${className}`}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.028em] text-slate-900 mt-5 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 text-[17px] max-w-[580px] mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
