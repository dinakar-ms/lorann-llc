"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MessageCircle,
  X,
  ArrowUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const PHONE = "+1 914 565 5300";
const PHONE_TEL = "+19145655300";
const EMAIL = "info@lorannllc.com";
const LINKEDIN_MSG = "https://www.linkedin.com/company/lorann-llc/";

type Action = {
  name: string;
  sub: string;
  Icon: LucideIcon;
  href: string;
  bg: string;
  ring: string;
};

const ACTIONS: Action[] = [
  {
    name: "Call us",
    sub: PHONE,
    Icon: Phone,
    href: `tel:${PHONE_TEL}`,
    bg: "from-emerald-500 to-emerald-600",
    ring: "ring-emerald-200",
  },
  {
    name: "Email us",
    sub: EMAIL,
    Icon: Mail,
    href: `mailto:${EMAIL}?subject=Inquiry%20from%20lorannllc.com`,
    bg: "from-blue-600 to-blue-700",
    ring: "ring-blue-200",
  },
  {
    name: "Message on LinkedIn",
    sub: "Open chat",
    Icon: MessageCircle,
    href: LINKEDIN_MSG,
    bg: "from-cyan-500 to-blue-600",
    ring: "ring-cyan-200",
  },
];

export default function ContactDial() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (dialRef.current && !dialRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <div
      ref={dialRef}
      className="fixed right-5 sm:right-6 bottom-5 sm:bottom-6 z-40 flex flex-col items-end gap-3 pointer-events-none"
    >
      {/* Scroll-to-top button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className={`pointer-events-auto w-11 h-11 rounded-full bg-white border border-slate-200 text-slate-700 shadow-lg grid place-items-center hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 transition-all duration-300 ${
          scrolled
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
      </button>

      {/* Action fan — only rendered in DOM when open, preventing
          any hover/focus leaking through when closed */}
      {open && (
        <ul
          className="pointer-events-auto flex flex-col items-end gap-2.5"
          aria-label="Contact options"
        >
          {ACTIONS.map((a, i) => (
            <li
              key={a.name}
              style={{
                opacity: 0,
                transform: "translateY(20px) scale(0.85)",
                animation: `dialFanIn 320ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms forwards`,
              }}
            >
              <a
                href={a.href}
                target={a.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  a.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group inline-flex items-center gap-3 pl-3.5 pr-1.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-[0_12px_32px_-10px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-12px_rgba(29,69,217,0.45)] transition-all duration-300"
              >
                <div className="text-right leading-tight">
                  <div className="font-semibold text-[13px] text-slate-900 tracking-tight">
                    {a.name}
                  </div>
                  <div className="font-mono text-[10.5px] text-slate-500 tracking-[0.04em]">
                    {a.sub}
                  </div>
                </div>
                <span
                  className={`relative grid place-items-center w-10 h-10 rounded-full bg-gradient-to-br ${a.bg} text-white shadow-md group-hover:scale-110 transition-transform`}
                >
                  <a.Icon className="w-4 h-4" strokeWidth={2.4} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Main FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close contact menu" : "Open contact menu"}
        aria-expanded={open}
        className="pointer-events-auto relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full grid place-items-center text-white shadow-[0_18px_44px_-10px_rgba(29,69,217,0.55)] hover:shadow-[0_24px_60px_-12px_rgba(29,69,217,0.75)] transition-all duration-300 group"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #4F7DF5 0%, #1D45D9 55%, #13256E 100%)",
        }}
      >
        {/* Pulsing rings — only when closed */}
        {!open && (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-blue-400/60"
              style={{ animation: "contactPing 2.2s ease-out infinite" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-cyan-400/40"
              style={{ animation: "contactPing 2.2s ease-out infinite 0.8s" }}
            />
          </>
        )}

        {/* Live status dot */}
        <span
          aria-hidden="true"
          className="absolute top-1.5 right-1.5 flex items-center justify-center"
        >
          <span className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400/40 animate-ping" />
          <span className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
        </span>

        {/* Icon swap */}
        <span className="relative w-5 h-5">
          <MessageCircle
            className={`absolute inset-0 transition-all duration-300 ${
              open
                ? "opacity-0 scale-50 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}
            strokeWidth={2.4}
          />
          <X
            className={`absolute inset-0 transition-all duration-300 ${
              open
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-50 -rotate-45"
            }`}
            strokeWidth={2.6}
          />
        </span>

        {/* Sparkle accent */}
        <Sparkles
          aria-hidden="true"
          className="absolute -top-1 -left-1 w-3.5 h-3.5 text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          strokeWidth={2.2}
        />
      </button>

      <style jsx>{`
        @keyframes contactPing {
          0% { transform: scale(1); opacity: 0.7; }
          80%, 100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes dialFanIn {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}