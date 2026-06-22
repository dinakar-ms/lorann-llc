"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Database,
  FileText,
  Eye,
  Download,
  Filter,
  X,
  BarChart3,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

/* ────────────────────────────────────────────────────────
   Types
   ──────────────────────────────────────────────────────── */
export interface DataCard {
  name: string;
  universe: number;
  lastUpdated: string;
  category?: string;
}

interface Props {
  cards: DataCard[];
}

type SortKey = "name" | "universe" | "lastUpdated";
type SortDir = "asc" | "desc";

/* ────────────────────────────────────────────────────────
   Helpers
   ──────────────────────────────────────────────────────── */
const fmt = new Intl.NumberFormat("en-US");

function parseDate(d: string) {
  const [m, dd, y] = d.split("/").map(Number);
  return new Date(y, m - 1, dd);
}

function fmtDate(d: string) {
  try {
    return parseDate(d).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

function nameToSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const PAGE_OPTIONS = [10, 25, 50, 100] as const;

/* ────────────────────────────────────────────────────────
   Animated Counter Hook
   ──────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return { count, ref };
}

/* ────────────────────────────────────────────────────────
   Component
   ──────────────────────────────────────────────────────── */
export default function DataCardsTable({ cards }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [animateRows, setAnimateRows] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Categories with counts */
  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    cards.forEach((c) => {
      const cat = c.category || "Other";
      map.set(cat, (map.get(cat) || 0) + 1);
    });
    const sorted = Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
    return [{ name: "All", count: cards.length }, ...sorted.map(([name, count]) => ({ name, count }))];
  }, [cards]);

  const categories = useMemo(() => categoryData.map((c) => c.name), [categoryData]);

  /* Filter & sort */
  const filtered = useMemo(() => {
    let result = cards;
    if (activeCategory !== "All") result = result.filter((c) => c.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q));
    }
    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "universe") cmp = a.universe - b.universe;
      else cmp = parseDate(a.lastUpdated).getTime() - parseDate(b.lastUpdated).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });
    return result;
  }, [cards, search, sortKey, sortDir, activeCategory]);

  /* Max universe for bar chart */
  const maxUniverse = useMemo(() => Math.max(...filtered.map((c) => c.universe), 1), [filtered]);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePageValue = Math.min(page, totalPages);
  const paged = filtered.slice((safePageValue - 1) * perPage, safePageValue * perPage);

  /* Trigger row animation on data change */
  const triggerRowAnimation = useCallback(() => {
    setAnimateRows(false);
    requestAnimationFrame(() => setAnimateRows(true));
  }, []);

  useEffect(() => { setPage(1); triggerRowAnimation(); }, [search, activeCategory, perPage, triggerRowAnimation]);
  useEffect(() => { triggerRowAnimation(); }, [page, sortKey, sortDir, triggerRowAnimation]);

  /* Sort toggle */
  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "name" ? "asc" : "desc"); }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ArrowUpDown className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3.5 h-3.5 text-blue-500 animate-[bounceIn_0.3s_ease-out]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-blue-500 animate-[bounceIn_0.3s_ease-out]" />
    );
  }

  /* Stats */
  const totalUniverse = useMemo(() => cards.reduce((s, c) => s + c.universe, 0), [cards]);
  const stat1 = useCountUp(cards.length, 1200);
  const stat2Val = totalUniverse >= 1_000_000 ? Math.round(totalUniverse / 1_000_000) : totalUniverse;
  const stat2 = useCountUp(stat2Val, 1800);
  const stat3 = useCountUp(categories.length - 1, 1000);

  /* Pagination range */
  function pageRange() {
    const delta = 2;
    const range: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= safePageValue - delta && i <= safePageValue + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }

  if (!mounted) {
    return (
      <section className="py-20 lg:py-28">
        <div className="container-custom">
          <div className="animate-pulse space-y-6">
            <div className="h-10 bg-slate-200 rounded-xl w-2/3 mx-auto" />
            <div className="h-6 bg-slate-200 rounded-lg w-1/2 mx-auto" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-slate-200 rounded-2xl" />)}
            </div>
            <div className="h-14 bg-slate-200 rounded-2xl" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-slate-200 rounded-xl" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-[140px] animate-[float_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-20 right-[10%] w-[500px] h-[500px] rounded-full bg-cyan-100/40 blur-[120px] animate-[float_15s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-indigo-50/30 blur-[150px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Section Header with animated accent ── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              Data Card Library
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-[2.8rem] leading-[1.08] tracking-[-0.028em] text-slate-900 mb-5">
            Browse our complete{" "}
            <span className="relative inline-block">
              <span className="text-gradient">audience catalog.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full opacity-60" />
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Search, sort, and explore every audience available in our library.
            Each card includes universe size, update frequency, and activation-ready specs.
          </p>
        </div>

        {/* ── Animated Stats Row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-12">
          {[
            {
              icon: Database,
              label: "Total Data Cards",
              displayValue: fmt.format(stat1.count),
              ref: stat1.ref,
              gradient: "from-blue-500 to-blue-600",
              bgGlow: "bg-blue-500/10",
              iconBg: "from-blue-500 via-blue-600 to-indigo-600",
            },
            {
              icon: TrendingUp,
              label: "Total Universe",
              displayValue: fmt.format(stat2.count) + "M+",
              ref: stat2.ref,
              gradient: "from-cyan-500 to-blue-500",
              bgGlow: "bg-cyan-500/10",
              iconBg: "from-cyan-400 via-cyan-500 to-blue-500",
            },
            {
              icon: BarChart3,
              label: "Categories",
              displayValue: String(stat3.count),
              ref: stat3.ref,
              gradient: "from-indigo-500 to-blue-600",
              bgGlow: "bg-indigo-500/10",
              iconBg: "from-indigo-500 via-indigo-600 to-blue-700",
            },
            {
              icon: Zap,
              label: "Updated",
              displayValue: "Monthly",
              ref: null,
              gradient: "from-amber-500 to-orange-500",
              bgGlow: "bg-amber-500/10",
              iconBg: "from-amber-400 via-amber-500 to-orange-500",
            },
          ].map(({ icon: Icon, label, displayValue, ref, bgGlow, iconBg }, idx) => (
            <div
              key={label}
              ref={ref}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/70 p-5 lg:p-6 hover:border-blue-300/80 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Hover glow */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 ${bgGlow} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center mb-3.5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-[1.75rem] font-bold text-slate-900 tracking-tight tabular-nums leading-none mb-1">
                  {displayValue}
                </div>
                <div className="text-xs text-slate-500 font-medium tracking-wide uppercase">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Search + Filters Bar ── */}
        <div className={`relative bg-white/90 backdrop-blur-md rounded-2xl border shadow-sm p-5 lg:p-6 mb-5 transition-all duration-500 ${searchFocused ? "border-blue-300 shadow-lg shadow-blue-100/50 ring-4 ring-blue-50" : "border-slate-200/80"}`}>
          {/* Animated border glow on focus */}
          {searchFocused && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 pointer-events-none animate-[pulse_3s_ease-in-out_infinite]" />
          )}

          <div className="relative flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search input */}
            <div className="relative flex-1 min-w-0 group">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] transition-colors duration-300 ${searchFocused ? "text-blue-500" : "text-slate-400"}`} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search data cards by name..."
                className="w-full pl-12 pr-10 py-3.5 bg-slate-50/80 border border-slate-200/80 rounded-xl text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-300 focus:shadow-sm transition-all duration-300"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-400 transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Per-page select */}
            <div className="flex items-center gap-2.5 text-sm text-slate-600 whitespace-nowrap">
              <span className="hidden sm:inline font-medium">Show</span>
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 cursor-pointer transition-all"
              >
                {PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="hidden sm:inline text-slate-400">per page</span>
            </div>
          </div>

          {/* Category pills with counts */}
          {categories.length > 2 && (
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100/80">
              <div className="flex items-center gap-1.5 mr-2 text-slate-400">
                <Filter className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline">Filter</span>
              </div>
              {categoryData.map(({ name: cat, count }) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`group/pill inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-300/40 scale-105"
                      : "bg-slate-100/80 text-slate-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm"
                  }`}
                >
                  {cat}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-[18px] rounded-full text-[10px] font-bold px-1 transition-colors duration-300 ${
                    activeCategory === cat
                      ? "bg-white/25 text-white"
                      : "bg-slate-200/80 text-slate-500 group-hover/pill:bg-blue-100 group-hover/pill:text-blue-600"
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Results count + active filter ── */}
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length === 0 ? 0 : (safePageValue - 1) * perPage + 1}
              –{Math.min(safePageValue * perPage, filtered.length)}
            </span>{" "}
            of <span className="font-semibold text-slate-700">{fmt.format(filtered.length)}</span> data cards
          </p>
          {(search || activeCategory !== "All") && (
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-500">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 via-slate-50/80 to-blue-50/40 border-b border-slate-200/60">
                  <th className="text-left px-5 py-4 w-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    #
                  </th>
                  <th onClick={() => toggleSort("name")} className="text-left px-5 py-4 cursor-pointer group select-none">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                      Media Name <SortIcon col="name" />
                    </div>
                  </th>
                  <th onClick={() => toggleSort("universe")} className="text-right px-5 py-4 cursor-pointer group select-none">
                    <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                      Universe <SortIcon col="universe" />
                    </div>
                  </th>
                  <th className="text-left px-5 py-4 hidden lg:table-cell">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reach</div>
                  </th>
                  <th onClick={() => toggleSort("lastUpdated")} className="text-right px-5 py-4 cursor-pointer group select-none">
                    <div className="flex items-center justify-end gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                      Updated <SortIcon col="lastUpdated" />
                    </div>
                  </th>
                  <th className="text-center px-5 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-20">
                      <div className="inline-flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                          <Search className="w-7 h-7 text-slate-300" />
                        </div>
                        <p className="text-lg font-semibold text-slate-400 mb-1">No data cards found</p>
                        <p className="text-sm text-slate-400">Try adjusting your search or filter criteria</p>
                        <button
                          onClick={() => { setSearch(""); setActiveCategory("All"); }}
                          className="mt-4 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors"
                        >
                          Reset filters
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paged.map((card, i) => {
                    const rowNum = (safePageValue - 1) * perPage + i + 1;
                    const barWidth = Math.max(4, (card.universe / maxUniverse) * 100);

                    return (
                      <tr
                        key={card.name + "-" + safePageValue}
                        className={`group border-b border-slate-100/80 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/60 hover:to-transparent transition-all duration-300 ${
                          animateRows ? "animate-[slideIn_0.35s_ease-out_both]" : ""
                        }`}
                        style={{ animationDelay: animateRows ? `${i * 40}ms` : "0ms" }}
                      >
                        {/* Row number */}
                        <td className="px-5 py-4 text-xs text-slate-400 font-mono tabular-nums">
                          {rowNum}
                        </td>

                        {/* Name with icon */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 flex items-center justify-center flex-shrink-0 group-hover:from-blue-100 group-hover:to-indigo-100 group-hover:border-blue-200 group-hover:scale-110 transition-all duration-300">
                              <FileText className="w-4 h-4 text-blue-500 group-hover:text-blue-600 transition-colors" />
                            </div>
                            <div className="min-w-0">
                              <Link
                                href={`/data-assets/data-cards/${nameToSlug(card.name)}`}
                                className="text-[14px] font-semibold text-slate-800 group-hover:text-blue-700 hover:underline transition-colors duration-200 line-clamp-1"
                              >
                                {card.name}
                              </Link>
                              {card.category && (
                                <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">
                                  {card.category}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Universe count */}
                        <td className="px-5 py-4 text-right">
                          <span className="text-[14px] font-bold text-slate-800 tabular-nums group-hover:text-blue-700 transition-colors">
                            {fmt.format(card.universe)}
                          </span>
                        </td>

                        {/* Visual bar — desktop only */}
                        <td className="px-5 py-4 hidden lg:table-cell w-[180px]">
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 transition-all duration-700 ease-out group-hover:from-blue-500 group-hover:to-cyan-300"
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        </td>

                        {/* Updated date */}
                        <td className="px-5 py-4 text-right">
                          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                            {fmtDate(card.lastUpdated)}
                          </span>
                        </td>

                        {/* Action button */}
                        <td className="px-5 py-4 text-center">
                          <a
                            href="/contact"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/80 text-blue-600 text-xs font-bold hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-200/50 hover:scale-105 transition-all duration-300"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Request
                          </a>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-slate-50/80 to-blue-50/30 border-t border-slate-100">
              <p className="text-sm text-slate-500">
                Page <span className="font-bold text-slate-700">{safePageValue}</span> of{" "}
                <span className="font-bold text-slate-700">{totalPages}</span>
              </p>

              <div className="flex items-center gap-1">
                {/* First / Prev */}
                <button onClick={() => setPage(1)} disabled={safePageValue === 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="First page">
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={safePageValue === 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Previous page">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-1">
                  {pageRange().map((p, i) =>
                    p === "..." ? (
                      <span key={`dot-${i}`} className="px-1.5 text-slate-400 text-sm select-none">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setPage(p as number)}
                        className={`min-w-[38px] h-[38px] rounded-xl text-sm font-semibold transition-all duration-300 ${
                          safePageValue === p
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-300/40 scale-105"
                            : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                {/* Next / Last */}
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={safePageValue === totalPages}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Next page">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => setPage(totalPages)} disabled={safePageValue === totalPages}
                  className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-sm disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Last page">
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

    </section>
  );
}
