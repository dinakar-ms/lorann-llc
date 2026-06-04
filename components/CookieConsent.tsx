"use client";

import { useEffect, useState, useCallback } from "react";
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
  Lock,
  Sparkles,
  Fingerprint,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════ */

type CookieCategory = "necessary" | "analytics" | "marketing" | "functional";
type ConsentState = Record<CookieCategory, boolean>;

const STORAGE_KEY = "lorann_cookie_consent";
const CONSENT_VERSION = "1.0";

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CATEGORIES = [
  { key: "necessary" as const, label: "Strictly Necessary", desc: "Essential for the website to function. These cookies enable core features like security, session management, and accessibility.", icon: Shield, required: true, cookieCount: 3, gradient: "from-emerald-500 to-emerald-600" },
  { key: "analytics" as const, label: "Analytics & Performance", desc: "Help us understand how visitors interact with the website by collecting and reporting information anonymously.", icon: BarChart3, cookieCount: 4, gradient: "from-blue-500 to-blue-600" },
  { key: "marketing" as const, label: "Marketing & Advertising", desc: "Used to deliver personalized advertisements and measure the effectiveness of ad campaigns.", icon: Target, cookieCount: 2, gradient: "from-purple-500 to-violet-600" },
  { key: "functional" as const, label: "Functional & Preferences", desc: "Enable enhanced features and personalization such as remembering your preferences and language settings.", icon: Zap, cookieCount: 2, gradient: "from-cyan-500 to-blue-500" },
];

/* ═══════════════════════════════════════════════════════
   STORAGE
   ═══════════════════════════════════════════════════════ */

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: Date.now() }));
  document.cookie = `lorann_consent=1; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Lax`;
}

/* ═══════════════════════════════════════════════════════
   GA — Consent Mode v2
   gtag script is loaded in layout.tsx with default=denied.
   These functions just update consent state via gtag().
   ═══════════════════════════════════════════════════════ */

function callGtag(...args: any[]) {
  if (typeof window === "undefined") return;
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).dataLayer.push(args);
}

function loadGA() {
  // Grant analytics storage — gtag script is already on the page
  callGtag("consent", "update", {
    analytics_storage:  "granted",
    ad_storage:         "denied",   // only grant if marketing consent given
    ad_user_data:       "denied",
    ad_personalization: "denied",
  });
}

function loadGAMarketing() {
  // Grant all storage for marketing consent
  callGtag("consent", "update", {
    analytics_storage:  "granted",
    ad_storage:         "granted",
    ad_user_data:       "granted",
    ad_personalization: "granted",
  });
}

function disableGA() {
  // Deny all — reverts to default
  callGtag("consent", "update", {
    analytics_storage:  "denied",
    ad_storage:         "denied",
    ad_user_data:       "denied",
    ad_personalization: "denied",
  });
}

/* ═══════════════════════════════════════════════════════
   TOGGLE
   ═══════════════════════════════════════════════════════ */

function Toggle({ checked, disabled, onChange, id }: { checked: boolean; disabled?: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      type="button" role="switch" id={id} aria-checked={checked} disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${checked ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-slate-300"}
      `}
    >
      <span className={`pointer-events-none relative inline-flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${checked ? "translate-x-[22px]" : "translate-x-[2px]"}`}>
        {checked && <Check className="w-3 h-3 text-blue-600" strokeWidth={3} />}
      </span>
    </button>
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

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      if (stored.marketing) loadGAMarketing();
      else if (stored.analytics) loadGA();
      else disableGA();
    } else {
      disableGA();
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const handleClose = useCallback((c: ConsentState) => {
    setClosing(true);
    storeConsent(c);
    if (c.marketing) loadGAMarketing();
    else if (c.analytics) loadGA();
    else disableGA();
    setTimeout(() => { setVisible(false); setClosing(false); }, 400);
  }, []);

  const acceptAll = useCallback(() => {
    const all: ConsentState = { necessary: true, analytics: true, marketing: true, functional: true };
    setConsent(all);
    handleClose(all);
  }, [handleClose]);

  const rejectAll = useCallback(() => {
    const min: ConsentState = { necessary: true, analytics: false, marketing: false, functional: false };
    setConsent(min);
    handleClose(min);
  }, [handleClose]);

  if (pathname?.startsWith("/studio")) return null;
  if (!visible) return null;

  const acceptedCount = Object.values(consent).filter(Boolean).length;

  return (
    <>
      {/* Backdrop */}
      {showPrefs && (
        <div
          className={`fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${closing ? "opacity-0" : "opacity-100"}`}
          onClick={() => setShowPrefs(false)}
        />
      )}

      <div
        role="dialog" aria-modal={showPrefs} aria-label="Cookie consent"
        className={`fixed z-[9999] transition-all duration-300 ${showPrefs ? "inset-0 flex items-center justify-center p-4" : "bottom-0 left-0 right-0 flex justify-center p-4"}`}
      >
        <div
          className={`
            relative w-full overflow-hidden bg-white border border-slate-200 transition-all duration-400
            ${closing ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}
            ${showPrefs ? "max-w-[520px] rounded-2xl shadow-2xl" : "max-w-4xl rounded-2xl shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.15)]"}
          `}
          style={!closing ? { animation: "ccSlideUp 0.5s cubic-bezier(0.16,1,0.3,1) both" } : undefined}
        >
          {/* Gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

          {/* ─── Banner ─── */}
          {!showPrefs && (
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div className="shrink-0 w-11 h-11 rounded-xl grid place-items-center text-white shadow-md bg-gradient-to-br from-blue-500 to-blue-700">
                    <Cookie className="w-5 h-5" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-[15px] text-slate-900 tracking-tight">We value your privacy</h2>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-600 max-w-xl">
                      We use cookies to enhance your experience and analyze site performance. Choose your preferences or accept all.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                  <button type="button" onClick={() => setShowPrefs(true)} className="group flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all">
                    <Settings2 className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.2} />
                    Customize
                  </button>
                  <button type="button" onClick={rejectAll} className="px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 transition-all">
                    Reject All
                  </button>
                  <button type="button" onClick={acceptAll} className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition-all">
                    <Sparkles className="w-3.5 h-3.5" strokeWidth={2.2} />
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── Preferences ─── */}
          {showPrefs && (
            <div className="flex flex-col max-h-[85vh]">
              {/* Header */}
              <div className="shrink-0 px-5 pt-5 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl grid place-items-center text-white shadow-md bg-gradient-to-br from-blue-500 to-blue-700">
                      <Settings2 className="w-4 h-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="font-display font-bold text-[16px] text-slate-900 tracking-tight">Cookie Preferences</h2>
                      <p className="text-[11.5px] text-slate-500 font-mono">{acceptedCount}/4 categories enabled</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setShowPrefs(false)} className="w-8 h-8 rounded-lg grid place-items-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
                    <X className="w-4 h-4" strokeWidth={2.4} />
                  </button>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" style={{ width: `${(acceptedCount / 4) * 100}%` }} />
                </div>
              </div>

              {/* Cards */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isExpanded = expanded === cat.key;
                  return (
                    <div key={cat.key} className={`rounded-2xl border transition-all duration-200 ${isExpanded ? "border-blue-200 shadow-md" : "border-slate-200 hover:border-blue-200/60"}`}>
                      <div className="flex items-center gap-3 px-4 py-3">
                        <div className={`shrink-0 w-9 h-9 rounded-lg grid place-items-center text-white bg-gradient-to-br ${cat.gradient}`}>
                          <Icon className="w-4 h-4" strokeWidth={2.2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[13.5px] text-slate-900">{cat.label}</span>
                            {cat.required && (
                              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 rounded-md">
                                <Lock className="w-2.5 h-2.5" /> Always on
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 font-mono">{cat.cookieCount} cookies</span>
                        </div>
                        <Toggle id={`t-${cat.key}`} checked={consent[cat.key]} disabled={cat.required} onChange={(v) => setConsent((p) => ({ ...p, [cat.key]: v }))} />
                        <button type="button" onClick={() => setExpanded(isExpanded ? null : cat.key)} className="shrink-0 w-7 h-7 rounded-lg grid place-items-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="px-4 pb-3.5">
                          <p className="text-[12.5px] leading-relaxed text-slate-600 p-2.5 bg-slate-50 rounded-lg">{cat.desc}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="shrink-0 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
                <div className="flex items-center gap-2.5">
                  <button type="button" onClick={rejectAll} className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 bg-white border border-slate-200 hover:border-slate-300 transition-all">Essential Only</button>
                  <button type="button" onClick={() => handleClose(consent)} className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg hover:-translate-y-px transition-all">Save Preferences</button>
                  <button type="button" onClick={acceptAll} className="flex-1 px-4 py-2.5 rounded-xl text-[13px] font-bold text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all">Accept All</button>
                </div>
                <a href="/cookie-policy" className="mt-2.5 flex items-center justify-center gap-1 text-[11px] text-slate-400 hover:text-blue-600 transition-colors">
                  <Fingerprint className="w-3 h-3" /> Cookie Policy
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes ccSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
