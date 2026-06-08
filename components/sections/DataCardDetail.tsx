"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronRight, Database, Calendar, Tag, TrendingUp, Users, Globe, Mail,
  FileText, Download, ArrowRight, Shield,
  CheckCircle2, BarChart3, Layers, Building2,
  DollarSign, Clock, RefreshCw, Award, Send, Star,
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
  minimumOrder?: number;
  minimumPrice?: number;
  netNamePercent?: number;
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

/* ── Quality Badge Color ───────────────────────────────── */
function qualityColor(q?: string) {
  if (!q) return "bg-slate-100 text-slate-600";
  if (q.startsWith("A")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (q.startsWith("B")) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
}

/* ── Gradient by category ──────────────────────────────── */
const CAT_GRADIENT: Record<string, string> = {
  Technology: "from-blue-500 to-indigo-600",
  Healthcare: "from-emerald-500 to-teal-600",
  Business: "from-slate-600 to-slate-800",
  Consumer: "from-violet-500 to-purple-600",
  Financial: "from-amber-500 to-orange-600",
  Education: "from-cyan-500 to-blue-600",
  Marketing: "from-pink-500 to-rose-600",
  Insurance: "from-indigo-500 to-blue-700",
  Automotive: "from-red-500 to-rose-600",
  Construction: "from-orange-500 to-amber-600",
  Hospitality: "from-teal-500 to-cyan-600",
  "Real Estate": "from-sky-500 to-blue-600",
  Legal: "from-gray-600 to-slate-700",
  Energy: "from-yellow-500 to-orange-500",
  Government: "from-blue-600 to-blue-800",
  Manufacturing: "from-zinc-500 to-zinc-700",
  "Non-Profit": "from-green-500 to-emerald-600",
  Retail: "from-fuchsia-500 to-pink-600",
  Travel: "from-sky-400 to-indigo-500",
  Agriculture: "from-lime-500 to-green-600",
};

const CAT_COLOR: Record<string, string> = {
  Technology: "bg-blue-500",
  Healthcare: "bg-emerald-500",
  Business: "bg-slate-600",
  Consumer: "bg-violet-500",
  Financial: "bg-amber-500",
  Education: "bg-cyan-500",
  Marketing: "bg-pink-500",
  Insurance: "bg-indigo-500",
  Automotive: "bg-red-500",
  Construction: "bg-orange-500",
  Hospitality: "bg-teal-500",
  "Real Estate": "bg-sky-500",
  Legal: "bg-gray-600",
  Energy: "bg-yellow-500",
  Government: "bg-blue-600",
  Manufacturing: "bg-zinc-500",
  "Non-Profit": "bg-green-500",
  Retail: "bg-fuchsia-500",
  Travel: "bg-sky-400",
  Agriculture: "bg-lime-500",
};

/* ── Popularity dots ──────────────────────────────────── */
function PopularityDots({ score }: { score: number }) {
  const filled = Math.round(score / 20);
  return (
    <span className="inline-flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`w-2 h-2 rounded-full ${i < filled ? "bg-blue-500" : "bg-slate-200"}`} />
      ))}
      <span className="ml-1.5 font-bold">{score}</span>
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   COMPONENT
   ════════════════════════════════════════════════════════ */
export default function DataCardDetail({ card, relatedCards, totalCards }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const gradient = CAT_GRADIENT[card.category] || "from-blue-500 to-blue-700";
  const catColor = CAT_COLOR[card.category] || "bg-blue-500";
  const universeCounter = useCountUp(card.universe, 1800);

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
                {card.cardQuality && (
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-bold ${qualityColor(card.cardQuality)}`}>
                    <Star className="w-3 h-3" /> Quality: {card.cardQuality}
                  </span>
                )}
                {card.popularity && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
                    <TrendingUp className="w-3 h-3" /> Popularity: {card.popularity}/100
                  </span>
                )}
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
                <Link href="/contact" className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-300`}>
                  <Send className="w-4 h-4" /> Request This Data Card
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT — 2 COLUMN ═══════ */}
      <section className="pt-8 pb-14 lg:pb-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

            {/* ────── LEFT COLUMN ────── */}
            <div className="space-y-5 min-w-0">

              {/* SEGMENTS TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-[slideIn_0.4s_ease-out_0.1s_both]">
                <div className={`flex items-center justify-between px-5 py-3 bg-gradient-to-r ${gradient}`}>
                  <h2 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Segments
                  </h2>
                  <span className="text-xs text-white/80 font-medium">COUNTS THROUGH {card.lastUpdated}</span>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="text-left py-2.5 px-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Count</th>
                      <th className="text-left py-2.5 px-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">Segment</th>
                      <th className="text-right py-2.5 px-5 font-semibold text-slate-500 text-xs uppercase tracking-wider">CPM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-5 font-bold text-slate-900 tabular-nums">{fmt.format(card.universe)}</td>
                      <td className="py-3 px-5 text-slate-700">Total Universe / Base Rate</td>
                      <td className="py-3 px-5 text-right font-semibold text-slate-800">{card.postalCpm ? fmtCurrency(card.postalCpm) + "/M" : "—"}</td>
                    </tr>
                    {card.postalRecords != null && (
                      <tr className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-5 font-bold text-slate-900 tabular-nums">{fmt.format(card.postalRecords)}</td>
                        <td className="py-3 px-5 text-slate-700 flex items-center gap-2"><Printer className="w-3.5 h-3.5 text-slate-400" />Postal Records</td>
                        <td className="py-3 px-5 text-right font-semibold text-slate-800">{card.postalCpm ? fmtCurrency(card.postalCpm) + "/M" : "—"}</td>
                      </tr>
                    )}
                    {card.phoneNumbers != null && (
                      <tr className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-5 font-bold text-slate-900 tabular-nums">{fmt.format(card.phoneNumbers)}</td>
                        <td className="py-3 px-5 text-slate-700 flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" />Phone Numbers</td>
                        <td className="py-3 px-5 text-right font-semibold text-slate-800">{card.phoneCpm ? fmtCurrency(card.phoneCpm) + "/M" : "—"}</td>
                      </tr>
                    )}
                    {card.emailAddresses != null && (
                      <tr className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3 px-5 font-bold text-slate-900 tabular-nums">{fmt.format(card.emailAddresses)}</td>
                        <td className="py-3 px-5 text-slate-700 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" />Email Addresses</td>
                        <td className="py-3 px-5 text-right font-semibold text-slate-800">{card.emailCpm ? fmtCurrency(card.emailCpm) + "/M" : "—"}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* DESCRIPTION */}
              {card.description && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-[slideIn_0.4s_ease-out_0.15s_both]">
                  <div className="flex items-center px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                    <h2 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-400" /> Description
                    </h2>
                  </div>
                  <div className="px-5 py-4 text-[14px] leading-relaxed text-slate-600 space-y-3">
                    {card.description.split("\n\n").map((p, i) => (
                      <p key={i} className={i === 0 ? "text-slate-700" : ""}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* ORDERING INSTRUCTIONS */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-[slideIn_0.4s_ease-out_0.2s_both]">
                <div className="flex items-center px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Package className="w-4 h-4 text-slate-400" /> Ordering Instructions
                  </h2>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2 text-sm text-slate-600">
                    {card.minimumOrder != null && (
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        <span>{fmt.format(card.minimumOrder)} Name Minimum Order{card.minimumPrice != null && <> ${card.minimumPrice.toFixed(2)} Minimum Price</>}</span>
                      </li>
                    )}
                    {card.netNamePercent != null && (
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        <span>{card.netNamePercent}% Net Name available on orders of 50,000 or more ($10.00/M Run Charge)</span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${card.exchangeAvailable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <span>Exchange is {card.exchangeAvailable ? "" : "not "}available</span>
                    </li>
                    {card.brokerCommission != null && (
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        <span>Broker Commission {card.brokerCommission}% on base</span>
                      </li>
                    )}
                    {card.agencyCommission != null && (
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                        <span>Agency Commission {card.agencyCommission}% on base</span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${card.reuseAvailable ? "bg-emerald-500" : "bg-red-400"}`} />
                      <span>Reuse is {card.reuseAvailable ? "" : "not "}available</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ADDRESSING */}
              {(card.emailDeliveryFee != null || card.ftpDeliveryFee != null) && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-[slideIn_0.4s_ease-out_0.25s_both]">
                  <div className="flex items-center px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                    <h2 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Truck className="w-4 h-4 text-slate-400" /> Addressing
                    </h2>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {card.emailDeliveryFee != null && (
                      <div className="flex items-center justify-between px-5 py-3 text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-500" />Email</span>
                        <span className="font-bold text-slate-800">${card.emailDeliveryFee.toFixed(2)}/F</span>
                      </div>
                    )}
                    {card.ftpDeliveryFee != null && (
                      <div className="flex items-center justify-between px-5 py-3 text-sm">
                        <span className="text-slate-600 flex items-center gap-2"><Settings className="w-3.5 h-3.5 text-indigo-500" />FTP</span>
                        <span className="font-bold text-slate-800">${card.ftpDeliveryFee.toFixed(2)}/F</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ────── RIGHT COLUMN (SIDEBAR) ────── */}
            <div className="space-y-5 lg:sticky lg:top-24 animate-[slideIn_0.5s_ease-out_0.15s_both]">

              {/* CARD INFO */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                {/* Popularity row */}
                {card.popularity != null && (
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/80 to-indigo-50/60">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Popularity</span>
                    <PopularityDots score={card.popularity} />
                  </div>
                )}

                <div className="divide-y divide-slate-100 text-sm">
                  {card.cardQuality && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Card Quality</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-xs font-bold ${qualityColor(card.cardQuality)}`}>
                        <Star className="w-3 h-3" /> {card.cardQuality}
                      </span>
                    </div>
                  )}
                  {card.market && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Market</span>
                      <span className="font-bold text-slate-800">{card.market}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-2.5">
                    <span className="text-slate-500 font-medium">Category</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-slate-800">
                      <span className={`w-2.5 h-2.5 rounded-full ${catColor}`} />
                      {card.category}
                    </span>
                  </div>
                  {card.dataType && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Type</span>
                      <span className="font-bold text-slate-800 text-right max-w-[180px]">{card.dataType}</span>
                    </div>
                  )}
                  {card.source && (
                    <div className="flex items-center justify-between px-5 py-2.5 gap-4">
                      <span className="text-slate-500 font-medium flex-shrink-0">Source</span>
                      <span className="font-bold text-slate-800 text-right text-xs leading-snug">{card.source}</span>
                    </div>
                  )}
                  {card.geo && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Geo</span>
                      <span className="font-bold text-slate-800">{card.geo}</span>
                    </div>
                  )}
                  {(card.genderMale != null && card.genderFemale != null) && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Gender</span>
                      <span className="font-bold text-slate-800">{card.genderFemale}% Female {card.genderMale}% Male</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-2.5">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="inline-flex items-center gap-1.5 font-bold text-emerald-600 text-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE
                    </span>
                  </div>
                </div>

                {/* CTA button */}
                <div className="p-4 border-t border-slate-100">
                  <Link href="/contact" className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r ${gradient} text-white font-bold text-sm shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300`}>
                    Get Count <Zap className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* SELECTS */}
              {card.selects && card.selects.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                    <h2 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" /> Selects
                    </h2>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{card.selects.length}</span>
                  </div>
                  <div className="px-5 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {card.selects.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default">
                          <CheckCircle2 className="w-3 h-3 text-blue-400" />
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CARD METADATA */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="flex items-center px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                  <h2 className="font-display font-bold text-sm text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" /> Card Metadata
                  </h2>
                </div>
                <div className="divide-y divide-slate-100 text-sm">
                  {card.marketEntryDate && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Market Entry</span>
                      <span className="font-bold text-slate-800">{card.marketEntryDate}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-5 py-2.5">
                    <span className="text-slate-500 font-medium">Last Updated</span>
                    <span className="font-bold text-slate-800">{card.lastUpdated}</span>
                  </div>
                  {card.nextUpdateDate && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Next Update</span>
                      <span className="font-bold text-slate-800">{card.nextUpdateDate}</span>
                    </div>
                  )}
                  {card.frequency && (
                    <div className="flex items-center justify-between px-5 py-2.5">
                      <span className="text-slate-500 font-medium">Frequency</span>
                      <span className="font-bold text-emerald-600">{card.frequency}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* COMPLIANCE */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "CCPA", icon: Shield },
                  { label: "CAN-SPAM", icon: CheckCircle2 },
                  { label: "GDPR Ready", icon: Globe },
                  { label: "SOC 2", icon: Award },
                ].map(({ label, icon: CIcon }) => (
                  <div key={label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50/80 border border-emerald-100">
                    <CIcon className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-emerald-800">{label}</span>
                  </div>
                ))}
              </div>
            </div>
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
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{rc.lastUpdated}</span>
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
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm hover:bg-blue-50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                  <Send className="w-4 h-4" /> Request a Quote
                </Link>
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
