"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Linkedin, Facebook, type LucideIcon } from "lucide-react";

// X (formerly Twitter) doesn't have a stable lucide icon — inline the
// official wordmark glyph as an SVG.
function XGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

type Social = {
  name: string;
  href: string;
  Icon: LucideIcon | ((props: React.SVGProps<SVGSVGElement>) => JSX.Element);
  brand: string; // hex for brand-colored hover ring
};

const SOCIALS: Social[] = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/lorann-llc/",
    Icon: Linkedin,
    brand: "#0A66C2",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Lorannllc/61578075234628/",
    Icon: Facebook,
    brand: "#1877F2",
  },
  {
    name: "X / Twitter",
    href: "https://x.com/lorannllc1996",
    Icon: XGlyph,
    brand: "#0F1419",
  },
];

export default function SocialRail() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Stagger-in after first paint so the rail glides in.
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <aside
      aria-label="Social links"
      className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <div className="pointer-events-auto relative pl-2">
        {/* Vertical accent line that pulses */}
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
        />

        <ul className="relative flex flex-col items-center gap-2.5 p-2 rounded-full bg-white/80 border border-slate-200/80 shadow-[0_10px_40px_-15px_rgba(15,23,42,0.25)] backdrop-blur-md">
          {SOCIALS.map((s, i) => (
            <li
              key={s.name}
              className="group relative"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateX(0)" : "translateX(-24px)",
                transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${
                  i * 90
                }ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${
                  i * 90
                }ms`,
              }}
            >
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="relative grid place-items-center w-10 h-10 rounded-full text-slate-700 hover:text-white transition-colors duration-300 overflow-hidden"
              >
                {/* Brand-color radial fill that sweeps up on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 100%, ${s.brand} 0%, ${s.brand}cc 70%, transparent 100%)`,
                  }}
                />
                {/* Subtle outer glow on hover */}
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-300"
                  style={{ background: s.brand }}
                />
                <s.Icon className="relative w-[18px] h-[18px]" />
              </a>

              {/* Sliding label tooltip */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[12.5px] font-medium tracking-tight whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg before:content-[''] before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-y-[5px] before:border-y-transparent before:border-r-[6px] before:border-r-slate-900"
              >
                {s.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
