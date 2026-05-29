"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  Shield,
  Cookie,
  ChevronDown,
  Check,
  X,
  Settings2,
  BarChart3,
  Target,
  Zap,
  ExternalLink,
  Fingerprint,
  Lock,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════ */

type CookieCategory = "necessary" | "analytics" | "marketing" | "functional";
type ConsentState = Record<CookieCategory, boolean>;

type CategoryMeta = {
  key: CookieCategory;
  label: string;
  desc: string;
  icon: typeof Shield;
  required?: boolean;
  cookieCount: number;
  gradient: string;
  gradientRaw: string; // for CSS usage
  ring: string;
};

/* ═══════════════════════════════════════════════════════
   CONSENT STORAGE
   ═══════════════════════════════════════════════════════ */

const STORAGE_KEY = "lorann_cookie_consent";
const CONSENT_VERSION = "1.0";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.consent as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: Date.now() })
  );
  document.cookie = `lorann_consent=1; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}

/* ═══════════════════════════════════════════════════════
   GA LOADER (conditional on consent)
   ═══════════════════════════════════════════════════════ */

let gaLoaded = false;

function loadGA() {
  if (gaLoaded || typeof window === "undefined") return;
  gaLoaded = true;
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-SD98EK2RQ4";
  script.async = true;
  document.head.appendChild(script);
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  gtag("js", new Date());
  gtag("config", "G-SD98EK2RQ4", {
    anonymize_ip: true,
    cookie_flags: "SameSite=Lax;Secure",
  });
}

function disableGA() {
  if (typeof window === "undefined") return;
  (window as any)[`ga-disable-G-SD98EK2RQ4`] = true;
}

/* ═══════════════════════════════════════════════════════
   CATEGORY DEFINITIONS
   ═══════════════════════════════════════════════════════ */

const CATEGORIES: CategoryMeta[] = [
  {
    key: "necessary",
    label: "Strictly Necessary",
    desc: "Essential for the website to function. These cookies enable core features like security, session management, and accessibility. They cannot be disabled.",
    icon: Shield,
    required: true,
    cookieCount: 3,
    gradient: "from-emerald-500 to-emerald-600",
    gradientRaw: "#10b981, #059669",
    ring: "ring-emerald-300",
  },
  {
    key: "analytics",
    label: "Analytics & Performance",
    desc: "Help us understand how visitors interact with the website by collecting and reporting information anonymously. Used to improve site performance and content.",
    icon: BarChart3,
    cookieCount: 4,
    gradient: "from-blue-500 to-blue-600",
    gradientRaw: "#3b82f6, #2563eb",
    ring: "ring-blue-300",
  },
  {
    key: "marketing",
    label: "Marketing & Advertising",
    desc: "Used to deliver personalized advertisements and measure the effectiveness of ad campaigns. These cookies may track your browsing activity across sites.",
    icon: Target,
    cookieCount: 2,
    gradient: "from-purple-500 to-violet-600",
    gradientRaw: "#a855f7, #7c3aed",
    ring: "ring-purple-300",
  },
  {
    key: "functional",
    label: "Functional & Preferences",
    desc: "Enable enhanced features and personalization such as remembering your preferences, language settings, and customized content display options.",
    icon: Zap,
    cookieCount: 2,
    gradient: "from-cyan-500 to-blue-500",
    gradientRaw: "#06b6d4, #3b82f6",
    ring: "ring-cyan-300",
  },
];

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

/* ═══════════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════════ */

function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.18,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(29,69,217,${p.opacity}) 0%, rgba(0,167,239,${p.opacity * 0.5}) 100%)`,
            animation: `cookieParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED COOKIE ICON — orbiting dots + pulse
   ═══════════════════════════════════════════════════════ */

function AnimatedCookieIcon({ size = 48 }: { size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer pulsing ring */}
      <div
        className="absolute inset-[-6px] rounded-[16px] opacity-30"
        style={{
          background: "conic-gradient(from 0deg, #1D45D9, #00A7EF, #A855F7, #1D45D9)",
          animation: "cookieRingSpin 8s linear infinite",
          filter: "blur(4px)",
        }}
      />
      {/* Second pulse ring */}
      <div
        className="absolute inset-[-3px] rounded-[14px]"
        style={{
          background: "conic-gradient(from 180deg, rgba(29,69,217,0.15), transparent 40%, rgba(0,167,239,0.15), transparent 80%)",
          animation: "cookieRingSpin 6s linear infinite reverse",
        }}
      />
      {/* Main icon container */}
      <div
        className="relative w-full h-full rounded-[13px] grid place-items-center text-white shadow-lg overflow-hidden"
        style={{
          background: "radial-gradient(circle at 30% 30%, #4F7DF5 0%, #1D45D9 55%, #0D1B5E 100%)",
          animation: "cookieIconBreathe 3s ease-in-out infinite",
        }}
      >
        {/* Internal shimmer */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)",
            animation: "cookieShimmer 4s ease-in-out infinite",
          }}
        />
        <Cookie className="w-5 h-5 relative z-10" strokeWidth={2} style={{ animation: "cookieWobble 4s ease-in-out infinite" }} />
      </div>
      {/* Live dot */}
      <span
        className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white z-20"
        style={{
          background: "linear-gradient(135deg, #34d399, #10b981)",
          boxShadow: "0 0 10px rgba(52,211,153,0.6)",
          animation: "cookieDotPulse 2s ease-in-out infinite",
        }}
      />
      {/* Orbiting micro-dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            top: "50%",
            left: "50%",
            background: ["#3b82f6", "#a855f7", "#06b6d4"][i],
            opacity: 0.6,
            animation: `cookieOrbit${i} ${3 + i * 0.5}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TYPEWRITER TEXT
   ═══════════════════════════════════════════════════════ */

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(iv);
    }, 18);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="inline-block w-[2px] h-[14px] bg-blue-500 ml-[1px] align-middle" style={{ animation: "cookieCursorBlink 0.8s step-end infinite" }} />
      )}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED TOGGLE SWITCH
   ═══════════════════════════════════════════════════════ */

function Toggle({ checked, disabled, onChange, id }: { checked: boolean; disabled?: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full
        transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${checked ? "shadow-[0_0_16px_rgba(29,69,217,0.35)]" : "bg-slate-300/80"}
      `}
      style={
        checked
          ? { background: "linear-gradient(135deg, #3b82f6, #1D45D9)" }
          : undefined
      }
    >
      {/* Track glow when active */}
      {checked && (
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.18) 55%, transparent 70%)",
            animation: "cookieToggleShine 2.5s ease-in-out infinite",
          }}
        />
      )}
      <span
        className={`
          pointer-events-none relative inline-flex items-center justify-center
          h-[22px] w-[22px] rounded-full bg-white shadow-md
          transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${checked ? "translate-x-[26px]" : "translate-x-[3px]"}
        `}
      >
        {checked ? (
          <Check className="w-3 h-3 text-blue-600" strokeWidth={3} style={{ animation: "cookieCheckPop 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }} />
        ) : (
          <X className="w-2.5 h-2.5 text-slate-400" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   CATEGORY CARD — with hover glow + animated border
   ═══════════════════════════════════════════════════════ */

function CategoryCard({
  cat,
  checked,
  expanded,
  onToggle,
  onExpand,
  highlight,
  index,
}: {
  cat: CategoryMeta;
  checked: boolean;
  expanded: boolean;
  onToggle: (v: boolean) => void;
  onExpand: () => void;
  highlight: boolean;
  index: number;
}) {
  const Icon = cat.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={`
        group relative overflow-hidden rounded-[16px] border-[1.5px] transition-all duration-400
        ${highlight && !expanded ? "border-blue-300/80 shadow-[0_0_20px_-4px_rgba(29,69,217,0.15)]" : ""}
        ${expanded ? "border-blue-300 bg-white shadow-lg" : "border-slate-200/80 bg-white/90 hover:border-blue-200/70 hover:shadow-md"}
      `}
      style={{
        animation: `cookieCardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms both`,
      }}
    >
      {/* Mouse-follow glow */}
      {hovering && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePos.x - 80,
            top: mousePos.y - 80,
            width: 160,
            height: 160,
            background: `radial-gradient(circle, rgba(29,69,217,0.07) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Active state animated border-glow */}
      {checked && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[16px]"
          style={{
            background: `linear-gradient(135deg, transparent 40%, rgba(${cat.key === "necessary" ? "16,185,129" : "29,69,217"},0.04) 60%, transparent 80%)`,
          }}
        />
      )}

      {/* Auto-highlight shimmer (when cycling through categories) */}
      {highlight && !expanded && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 20%, rgba(29,69,217,0.03) 50%, transparent 80%)",
            animation: "cookieHighlightSweep 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Header row */}
      <div className="flex items-center gap-3.5 px-4 py-3.5">
        <div
          className={`
            shrink-0 w-10 h-10 rounded-[12px] grid place-items-center text-white shadow-sm
            bg-gradient-to-br ${cat.gradient}
            transition-all duration-400 ${expanded ? "scale-110 shadow-md" : "group-hover:scale-105"}
          `}
          style={highlight ? { animation: "cookieIconPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both" } : undefined}
        >
          <Icon className="w-[18px] h-[18px]" strokeWidth={2.2} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[14px] text-slate-900 tracking-tight">{cat.label}</span>
            {cat.required && (
              <span className="shrink-0 inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-[6px]">
                <Lock className="w-2.5 h-2.5" strokeWidth={2.5} />
                Always on
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-slate-500 font-mono tracking-wide">
              {cat.cookieCount} cookie{cat.cookieCount !== 1 ? "s" : ""}
            </span>
            {checked && !cat.required && (
              <span className="inline-flex items-center gap-0.5 text-[10px] text-blue-600 font-medium" style={{ animation: "cookieFadeIn 0.3s ease both" }}>
                <Check className="w-2.5 h-2.5" strokeWidth={3} /> Enabled
              </span>
            )}
          </div>
        </div>

        <Toggle id={`toggle-${cat.key}`} checked={checked} disabled={cat.required} onChange={onToggle} />

        <button
          type="button"
          onClick={onExpand}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Hide" : "Show"} details for ${cat.label}`}
          className="shrink-0 w-8 h-8 rounded-[10px] grid place-items-center text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 transition-all duration-200"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${expanded ? "rotate-180" : ""}`}
            strokeWidth={2.2}
          />
        </button>
      </div>

      {/* Expandable description */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 pb-4">
          <div className="p-3 rounded-[10px] bg-slate-50/80 border border-slate-100">
            <p className="text-[12.5px] leading-relaxed text-slate-600">{cat.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   CIRCULAR PROGRESS (SVG ring)
   ═══════════════════════════════════════════════════════ */

function ProgressRing({ count, total }: { count: number; total: number }) {
  const pct = (count / total) * 100;
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative w-14 h-14 shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 52 52">
        {/* Track */}
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="4" />
        {/* Progress */}
        <circle
          cx="26"
          cy="26"
          r={r}
          fill="none"
          stroke="url(#cookieProgressGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)" }}
        />
        <defs>
          <linearGradient id="cookieProgressGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[13px] font-bold text-slate-800 font-mono">
          {count}<span className="text-slate-400 text-[10px]">/{total}</span>
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function CookieConsent() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [expanded, setExpanded] = useState<CookieCategory | null>(null);
  const [closing, setClosing] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const [bannerPhase, setBannerPhase] = useState(0); // 0=hidden, 1=entering, 2=visible

  // On mount: check stored consent
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      if (stored.analytics) loadGA();
      else disableGA();
    } else {
      disableGA();
      const t = setTimeout(() => {
        setVisible(true);
        setBannerPhase(1);
        setTimeout(() => setBannerPhase(2), 800);
      }, 1000);
      return () => clearTimeout(t);
    }
  }, []);

  // Auto-cycle category highlight on the banner (draws attention)
  useEffect(() => {
    if (!visible || showPrefs || closing || bannerPhase < 2) return;
    const startDelay = setTimeout(() => {
      setHighlightIdx(0);
    }, 2000);

    const iv = setInterval(() => {
      setHighlightIdx((p) => (p + 1) % CATEGORIES.length);
    }, 2500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(iv);
    };
  }, [visible, showPrefs, closing, bannerPhase]);

  const handleClose = useCallback((finalConsent: ConsentState) => {
    setClosing(true);
    storeConsent(finalConsent);
    if (finalConsent.analytics) loadGA();
    else disableGA();
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
    }, 600);
  }, []);

  const acceptAll = useCallback(() => {
    const all: ConsentState = { necessary: true, analytics: true, marketing: true, functional: true };
    setConsent(all);
    handleClose(all);
  }, [handleClose]);

  const rejectNonEssential = useCallback(() => {
    const minimal: ConsentState = { necessary: true, analytics: false, marketing: false, functional: false };
    setConsent(minimal);
    handleClose(minimal);
  }, [handleClose]);

  const savePreferences = useCallback(() => {
    handleClose(consent);
  }, [consent, handleClose]);

  // Don't render in studio
  if (pathname?.startsWith("/studio")) return null;
  if (!visible) return null;

  const acceptedCount = Object.values(consent).filter(Boolean).length;
  const totalCount = CATEGORIES.length;

  return (
    <>
      {/* Backdrop */}
      {showPrefs && (
        <div
          className={`
            fixed inset-0 z-[9998] backdrop-blur-[3px]
            transition-all duration-500
            ${closing ? "opacity-0" : "opacity-100"}
          `}
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(8,15,36,0.25) 0%, rgba(8,15,36,0.40) 100%)" }}
          onClick={() => setShowPrefs(false)}
          aria-hidden="true"
        />
      )}

      {/* Container */}
      <div
        role="dialog"
        aria-modal={showPrefs}
        aria-label="Cookie consent"
        className={`
          fixed z-[9999] transition-all duration-500
          ${showPrefs ? "inset-0 flex items-center justify-center p-4" : "bottom-0 left-0 right-0 flex justify-center p-4 sm:p-5"}
        `}
      >
        <div
          className={`
            relative w-full overflow-hidden
            bg-white/[0.97] backdrop-blur-2xl
            border border-white/60
            transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${closing ? "opacity-0 translate-y-10 scale-[0.94]" : "opacity-100 translate-y-0 scale-100"}
            ${showPrefs
              ? "max-w-[540px] rounded-[22px] shadow-[0_32px_80px_-12px_rgba(8,15,36,0.45)]"
              : "max-w-4xl rounded-[20px] shadow-[0_-12px_60px_-15px_rgba(8,15,36,0.22)]"
            }
          `}
          style={{
            animation: closing ? undefined : "cookieBannerIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Animated gradient border top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2.5px]"
            style={{
              background: "linear-gradient(90deg, #1D45D9, #00A7EF, #A855F7, #06b6d4, #1D45D9)",
              backgroundSize: "200% 100%",
              animation: "cookieGradientFlow 4s linear infinite",
            }}
          />

          {/* Floating particles */}
          <FloatingParticles />

          {/* ─── COMPACT BANNER ─── */}
          {!showPrefs && (
            <div className="relative p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                {/* Icon + Text */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <AnimatedCookieIcon size={48} />
                  <div className="pt-0.5">
                    <h2 className="font-display font-bold text-[16px] text-slate-900 tracking-tight leading-tight">
                      <TypewriterText text="We value your privacy" delay={300} />
                    </h2>
                    <p
                      className="mt-1.5 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-600 max-w-xl"
                      style={{ animation: "cookieFadeUp 0.8s 1.2s cubic-bezier(0.16,1,0.3,1) both" }}
                    >
                      We use cookies to enhance your experience, analyze site performance,
                      and personalize content. Choose your preferences or accept all.
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div
                  className="flex items-center gap-2.5 w-full sm:w-auto shrink-0"
                  style={{ animation: "cookieFadeUp 0.6s 1.5s cubic-bezier(0.16,1,0.3,1) both" }}
                >
                  <button
                    type="button"
                    onClick={() => { setShowPrefs(true); setHighlightIdx(-1); }}
                    className="
                      group flex items-center gap-1.5 px-4 py-2.5 rounded-[11px]
                      text-[13px] font-semibold text-slate-700
                      bg-slate-100/80 hover:bg-slate-100
                      border border-slate-200/80 hover:border-slate-300
                      transition-all duration-200 hover:shadow-sm
                    "
                  >
                    <Settings2 className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-90 transition-transform duration-500" strokeWidth={2.2} />
                    <span className="hidden sm:inline">Customize</span>
                    <span className="sm:hidden">Settings</span>
                  </button>

                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="
                      px-4 py-2.5 rounded-[11px]
                      text-[13px] font-semibold text-slate-600
                      bg-white hover:bg-slate-50
                      border border-slate-200 hover:border-slate-300
                      transition-all duration-200
                    "
                  >
                    Reject All
                  </button>

                  <button
                    type="button"
                    onClick={acceptAll}
                    className="
                      group relative px-5 py-2.5 rounded-[11px]
                      text-[13px] font-bold text-white
                      overflow-hidden
                      shadow-[0_4px_18px_-3px_rgba(29,69,217,0.5)]
                      hover:shadow-[0_8px_25px_-5px_rgba(29,69,217,0.6)]
                      hover:-translate-y-[1px]
                      active:translate-y-0 active:shadow-[0_2px_10px_-3px_rgba(29,69,217,0.4)]
                      transition-all duration-200
                    "
                    style={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #1D45D9 50%, #0D1B5E 100%)",
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" strokeWidth={2.2} />
                      Accept All
                    </span>
                    {/* Animated shine */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)",
                        animation: "cookieButtonShine 3s ease-in-out 2s infinite",
                      }}
                    />
                  </button>
                </div>
              </div>

              {/* Mini category pills — auto-highlight cycles through them */}
              <div
                className="mt-4 flex flex-wrap items-center gap-2"
                style={{ animation: "cookieFadeUp 0.6s 1.8s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                {CATEGORIES.map((cat, i) => {
                  const Icon = cat.icon;
                  const isHl = highlightIdx === i;
                  return (
                    <div
                      key={cat.key}
                      className={`
                        inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px]
                        text-[11px] font-medium transition-all duration-500
                        ${isHl
                          ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm scale-[1.04]"
                          : "bg-slate-50 text-slate-500 border border-slate-100 scale-100"
                        }
                      `}
                    >
                      <Icon className="w-3 h-3" strokeWidth={2.2} />
                      {cat.label}
                      {cat.required && <Lock className="w-2.5 h-2.5 opacity-50" strokeWidth={2.5} />}
                    </div>
                  );
                })}
              </div>

              {/* Policy link */}
              <div
                className="mt-3 flex items-center gap-3"
                style={{ animation: "cookieFadeUp 0.6s 2s cubic-bezier(0.16,1,0.3,1) both" }}
              >
                <a
                  href="/cookie-policy"
                  className="group inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-blue-600 transition-colors duration-200"
                >
                  <Fingerprint className="w-3 h-3" strokeWidth={2} />
                  Cookie Policy
                  <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={2.2} />
                </a>
              </div>
            </div>
          )}

          {/* ─── PREFERENCES PANEL ─── */}
          {showPrefs && (
            <div className="relative flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="shrink-0 px-5 pt-5 pb-4 border-b border-slate-100/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <ProgressRing count={acceptedCount} total={totalCount} />
                    <div>
                      <h2 className="font-display font-bold text-[17px] text-slate-900 tracking-tight">
                        Cookie Preferences
                      </h2>
                      <p className="text-[11.5px] text-slate-500 mt-0.5">
                        Manage how we use data to improve your experience
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPrefs(false)}
                    aria-label="Close preferences"
                    className="w-9 h-9 rounded-[10px] grid place-items-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    <X className="w-4.5 h-4.5" strokeWidth={2.2} />
                  </button>
                </div>
              </div>

              {/* Category cards */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 cookie-scrollbar">
                {CATEGORIES.map((cat, i) => (
                  <CategoryCard
                    key={cat.key}
                    cat={cat}
                    checked={consent[cat.key]}
                    expanded={expanded === cat.key}
                    highlight={highlightIdx === i}
                    index={i}
                    onToggle={(v) => setConsent((prev) => ({ ...prev, [cat.key]: v }))}
                    onExpand={() => setExpanded((prev) => (prev === cat.key ? null : cat.key))}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="shrink-0 px-5 py-4 border-t border-slate-100 bg-gradient-to-t from-slate-50/80 to-white">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={rejectNonEssential}
                    className="
                      flex-1 px-4 py-2.5 rounded-[11px]
                      text-[13px] font-semibold text-slate-600
                      bg-white border border-slate-200 hover:border-slate-300
                      hover:bg-slate-50
                      transition-all duration-200
                    "
                  >
                    Essential Only
                  </button>
                  <button
                    type="button"
                    onClick={savePreferences}
                    className="
                      relative flex-1 px-4 py-2.5 rounded-[11px]
                      text-[13px] font-bold text-white overflow-hidden
                      shadow-[0_4px_14px_-3px_rgba(29,69,217,0.45)]
                      hover:shadow-[0_6px_20px_-3px_rgba(29,69,217,0.6)]
                      hover:-translate-y-[1px] active:translate-y-0
                      transition-all duration-200
                    "
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #1D45D9)",
                    }}
                  >
                    <span className="relative z-10">Save Preferences</span>
                    <span
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)",
                        animation: "cookieButtonShine 3s ease-in-out infinite",
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="
                      flex-1 px-4 py-2.5 rounded-[11px]
                      text-[13px] font-bold text-blue-600
                      bg-blue-50/80 border border-blue-200/80 hover:bg-blue-100
                      transition-all duration-200
                    "
                  >
                    Accept All
                  </button>
                </div>

                <a
                  href="/cookie-policy"
                  className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <Fingerprint className="w-3 h-3" strokeWidth={2} />
                  Read our full Cookie Policy
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── ALL ANIMATIONS ─── */}
      <style jsx>{`
        @keyframes cookieBannerIn {
          0% {
            opacity: 0;
            transform: translateY(40px) scale(0.92);
            filter: blur(4px);
          }
          60% {
            filter: blur(0);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes cookieFadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cookieFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cookieCardIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cookieGradientFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes cookieParticleFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.15;
          }
          25% {
            transform: translate(12px, -18px) scale(1.3);
            opacity: 0.25;
          }
          50% {
            transform: translate(-8px, -30px) scale(0.8);
            opacity: 0.1;
          }
          75% {
            transform: translate(15px, -12px) scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes cookieRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cookieIconBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }

        @keyframes cookieShimmer {
          0%, 100% { transform: translateX(-80%); }
          50% { transform: translateX(80%); }
        }

        @keyframes cookieWobble {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        @keyframes cookieDotPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 10px rgba(52,211,153,0.6); }
          50% { transform: scale(1.15); box-shadow: 0 0 18px rgba(52,211,153,0.8); }
        }

        @keyframes cookieOrbit0 {
          from { transform: translate(-50%, -50%) rotate(0deg) translateX(30px) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        @keyframes cookieOrbit1 {
          from { transform: translate(-50%, -50%) rotate(120deg) translateX(34px) rotate(-120deg); }
          to { transform: translate(-50%, -50%) rotate(480deg) translateX(34px) rotate(-480deg); }
        }
        @keyframes cookieOrbit2 {
          from { transform: translate(-50%, -50%) rotate(240deg) translateX(28px) rotate(-240deg); }
          to { transform: translate(-50%, -50%) rotate(600deg) translateX(28px) rotate(-600deg); }
        }

        @keyframes cookieCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes cookieButtonShine {
          0%, 20% { transform: translateX(-120%); }
          60%, 100% { transform: translateX(120%); }
        }

        @keyframes cookieToggleShine {
          0%, 100% { transform: translateX(-120%); }
          50% { transform: translateX(120%); }
        }

        @keyframes cookieCheckPop {
          from { transform: scale(0) rotate(-45deg); }
          to { transform: scale(1) rotate(0deg); }
        }

        @keyframes cookieHighlightSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes cookieIconPop {
          0% { transform: scale(1); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1.1); }
        }

        .cookie-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .cookie-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .cookie-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(29, 69, 217, 0.12);
          border-radius: 100px;
        }
        .cookie-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(29, 69, 217, 0.25);
        }
      `}</style>
    </>
  );
}
