"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight, Database, Tag, Users, Mail,
  FileText, Download, ArrowRight,
  CheckCircle2, BarChart3, Layers, Building2,
  DollarSign, Clock, RefreshCw, Send,
  Phone, Printer, Hash, PercentIcon, XCircle, Check,
  Truck, Settings, UserCheck, Package, MapPin, Zap,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────── */
export interface FullDataCard {
  name: string;
  universe: number;
  lastUpdated: string;
  category: string;
  description?: string;
  postalRecords?: number;
  phoneNumbers?: number;
  emailAddresses?: number;
  postalCpm?: number;
  phoneCpm?: number;
  emailCpm?: number;
  popularity?: number;
  cardQuality?: string;
  market?: string;
  dataType?: string;
  source?: string;
  geo?: string;
  genderMale?: number;
  genderFemale?: number;
  selects?: string[];
  minimums?: { label?: string; count?: number }[];
  minimumOrder?: number;
  minimumPrice?: number;
  netNamePercent?: number;
  runCharge?: number;
  brokerCommission?: number;
  agencyCommission?: number;
  exchangeAvailable?: boolean;
  reuseAvailable?: boolean;
  emailDeliveryFee?: number;
  ftpDeliveryFee?: number;
  marketEntryDate?: string;
  nextUpdateDate?: string;
  frequency?: string;
  tags?: string[];
  segments?: { label?: string; count?: number; rate?: number }[];
  extraFields?: { label?: string; value?: string }[];
  fileSections?: {
    title?: string;
    rows?: { label?: string; value?: string }[];
  }[];
  uploaderName?: string;
  uploaderEmail?: string;
}

interface RelatedCard {
  name: string;
  universe: number;
  lastUpdated: string;
  category: string;
  slug: string;
}

interface Props {
  card: FullDataCard;
  relatedCards: RelatedCard[];
  totalCards: number;
}

/* ── Helpers ───────────────────────────────────────────── */
const fmt = new Intl.NumberFormat("en-US");
const fmtCurrency = (n: number) => `$${n.toFixed(2)}`;

function formatUniverse(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
  return fmt.format(n);
}

function nameToSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/* ── Animated Counter ──────────────────────────────────── */
function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── Brand gradient — used for the hero CTA and every section header.
      Previously varied by category (Healthcare = green, Financial = orange,
      Real Estate = sky, etc.). Locked to the brand blue so every data card
      page has the same look regardless of category. */
const BRAND_GRADIENT = "from-blue-500 to-blue-700";

/* ════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════ */
export default function DataCardDetail({ card, relatedCards, totalCards }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const gradient = BRAND_GRADIENT;
  const universeCounter = useCountUp(card.universe, 1800);

  // "Request This Data Card" opens the visitor's mail client pre-filled:
  //   To:      the uploader's email (they own this card — quickest reply)
  //   Cc:      info@lorannllc.com (ops sees every inquiry too)
  //   Subject: "Inquiry for <card name>" (matches Meet the Team pattern;
  //            when uploader name is known, appends " (via <name>)" so the
  //            uploader can immediately match the request to their upload).
  // If the uploader email isn't set (older manually-entered cards), we
  // fall back to info@ as the primary recipient with no Cc.
  const inquirySubject = `Inquiry for ${card.name}${
    card.uploaderName ? ` (via ${card.uploaderName})` : ""
  }`;
  const inquiryMailto = card.uploaderEmail
    ? `mailto:${encodeURIComponent(card.uploaderEmail)}?cc=${encodeURIComponent(
        "info@lorannllc.com"
      )}&subject=${encodeURIComponent(inquirySubject)}`
    : `mailto:info@lorannllc.com?subject=${encodeURIComponent(inquirySubject)}`;

  if (!mounted) {
    return (
      <div className="min-h-screen pt-36 pb-20">
        <div className="container-custom">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-10 bg-slate-200 rounded-xl w-2/3" />
            <div className="grid lg:grid-cols-[1fr_340px] gap-6">
              <div className="space-y-4">
                <div className="h-48 bg-slate-200 rounded-xl" />
                <div className="h-64 bg-slate-200 rounded-xl" />
              </div>
              <div className="h-[500px] bg-slate-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative pt-32 pb-10 lg:pt-36 lg:pb-12 overflow-hidden">
        <div className="absolute inset-0 radial-hero dot-grid" />
        <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1" style={{ background: "rgba(79, 125, 245, 0.4)" }} />
        <div className="absolute bottom-[5%] -right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[80px] animate-orb-float-2" style={{ background: "rgba(111, 211, 255, 0.3)" }} />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-5 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/data-assets" className="hover:text-blue-600 transition-colors">Data Assets</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href="/data-assets/data-cards" className="hover:text-blue-600 transition-colors">Data Cards</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[250px]">{card.name}</span>
          </nav>

          <div className="flex flex-col gap-8">
            {/* Left */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-3 animate-[slideIn_0.5s_ease-out]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 text-xs font-bold uppercase tracking-wider text-slate-600">
                  <Tag className="w-3.5 h-3.5 text-blue-500" /> {card.category}
                </span>
              </div>

              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900 mb-3 animate-[slideIn_0.5s_ease-out_0.1s_both]">
                {card.name}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed max-w-2xl mb-4 animate-[slideIn_0.5s_ease-out_0.15s_both]">
                Reach <strong className="text-slate-900">{formatUniverse(card.universe)}</strong> verified contacts.
                {card.dataType && <> Available as <strong className="text-slate-800">{card.dataType}</strong>.</>}
                {card.source && <> Source: {card.source}.</>}
              </p>

              {/* Tags */}
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5 animate-[slideIn_0.5s_ease-out_0.18s_both]">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[12px] font-semibold text-blue-700"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 animate-[slideIn_0.5s_ease-out_0.2s_both]">
                <a href={inquiryMailto} className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300`}>
                  <Send className="w-4 h-4" /> Request This Data Card
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT — mirrors the uploaded file's structure ═══════
          Every section header from the source RTF/PDF/XLS renders as its own
          labeled table. Nothing else is shown here — no form-filled cards,
          no per-field sidebar — so what appears on this page is exactly what
          was in the uploaded file. Admins update by re-uploading. */}
      <section className="pt-8 pb-14 lg:pb-16 bg-white border-t border-slate-100">
        {/* Full page-width — no fixed sidebar. The hero already has "Request
            This Data Card" and the bottom section has "Ready to activate →
            Request a Quote", so file sections use the entire container. */}
        <div className="container-custom">
          <div className="min-w-0">
              {(!card.fileSections || card.fileSections.length === 0) && (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm px-6 py-10 text-center">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-500">
                    No file preview available yet. Re-upload the source file to
                    populate this page.
                  </p>
                </div>
              )}
              {card.fileSections && card.fileSections.length > 0 && (
                <div className="md:[column-count:2] md:[column-gap:1.25rem]">
                  {card.fileSections
                    .filter((s) => s.title && s.rows && s.rows.length > 0)
                    .map((section, sIdx) => {
                      const rows = section.rows || [];
                      const hasAnyLabel = rows.some(
                        (r) => (r.label || "").trim() !== ""
                      );
                      // Full-width sections (span both columns):
                      //   - SEGMENTS: the primary pricing block — deserves top
                      //     billing, and rows have three data points (count /
                      //     label / rate) that read cleanly full-width.
                      //   - Any section with a long-prose row > 200 chars
                      //     (typically DESCRIPTION) — narrow columns would
                      //     mangle the paragraphs.
                      // Everything else packs tightly into two masonry columns
                      // — no wasted vertical gaps between mismatched heights.
                      const longestValue = rows.reduce(
                        (max, r) => Math.max(max, (r.value || "").length),
                        0
                      );
                      const titleUpper = (section.title || "")
                        .toUpperCase()
                        .trim();
                      const spanBoth =
                        longestValue > 200 || titleUpper === "SEGMENTS";
                      return (
                        <div
                          key={`filesec-${sIdx}`}
                          className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-5 [break-inside:avoid] ${
                            spanBoth ? "md:[column-span:all]" : ""
                          }`}
                        >
                          <div
                            className={`flex items-center px-5 py-3 bg-gradient-to-r ${gradient}`}
                          >
                            <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                              <FileText className="w-4 h-4" /> {section.title}
                            </h2>
                          </div>
                          {hasAnyLabel ? (
                            <dl className="divide-y divide-slate-100 text-sm">
                              {rows.map((r, rIdx) => (
                                <div
                                  key={`filerow-${sIdx}-${rIdx}`}
                                  className="grid grid-cols-[1fr_1fr] gap-4 px-5 py-3"
                                >
                                  <dt className="text-slate-500 font-medium break-words">
                                    {r.label || ""}
                                  </dt>
                                  <dd className="text-slate-900 font-semibold break-words">
                                    {r.value || ""}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          ) : (
                            <div className="px-5 py-4 space-y-2 text-[14px] text-slate-700 leading-relaxed">
                              {rows.map((r, rIdx) => (
                                <p key={`filerow-${sIdx}-${rIdx}`}>{r.value}</p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
          </div>
        </div>
      </section>


      {/* ═══════ RELATED ═══════ */}
      {relatedCards.length > 0 && (
        <section className="py-12 lg:py-14 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-xl text-slate-900">
                Related <span className="text-gradient">{card.category}</span> Data Cards
              </h2>
              <Link href="/data-assets/data-cards" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                View All {totalCards} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCards.map((rc) => (
                <Link key={rc.name} href={`/data-assets/data-cards/${rc.slug}`} className="group relative bg-white rounded-xl border border-slate-200/70 p-5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-500" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors mb-1.5 line-clamp-2">{rc.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" />{formatUniverse(rc.universe)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════ BOTTOM CTA ═══════ */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-8 lg:p-12 text-center">
            <div className="absolute top-0 left-1/4 w-[400px] h-[250px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-white mb-3">
                Ready to activate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">{card.name}</span>?
              </h2>
              <p className="text-blue-200/80 max-w-lg mx-auto mb-6 text-sm leading-relaxed">
                Get a custom quote, request a sample count, or speak with our data team about building your ideal audience segment.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href={inquiryMailto} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <Send className="w-4 h-4" /> Request a Quote
                </a>
                <Link href="/data-assets/data-cards" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-all duration-300">
                  Browse All Data Cards <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
