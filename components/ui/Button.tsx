import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "white" | "ghost-dark" | "glow";

interface ButtonProps {
  href?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

const variantClass: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)]",
  outline:
    "bg-white text-slate-900 border border-slate-200 shadow-sm hover:border-blue-500 hover:text-blue-700 hover:shadow-[0_10px_22px_-8px_rgba(29,69,217,0.3)] hover:-translate-y-0.5",
  white:
    "bg-white text-slate-900 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(111,211,255,0.5)]",
  "ghost-dark":
    "bg-white/10 border border-white/20 text-white backdrop-blur-md hover:bg-white/20 hover:-translate-y-0.5",
  glow: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-[0_12px_30px_-8px_rgba(0,167,239,0.55)] hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-10px_rgba(0,167,239,0.75)]",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  showArrow = false,
  icon,
  onClick,
}: ButtonProps) {
  const base =
    "relative inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[14.5px] tracking-tight rounded-xl transition-all whitespace-nowrap active:scale-95 font-body";
  const classes = `${base} ${variantClass[variant]} ${className}`;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`group/btn ${classes}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`group/btn ${classes}`}>
      {content}
    </button>
  );
}
