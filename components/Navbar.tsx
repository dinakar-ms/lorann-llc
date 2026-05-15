"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Target,
  Layers,
  Radio,
  Share2,
  DollarSign,
  Building2,
  Lightbulb,
  Handshake,
  Factory,
  LineChart,
  FileText,
  Mailbox,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "./Logo";
import { DATA_ASSETS_TREE, type DataAssetNode } from "./nav-data";

type NavChild = {
  label: string;
  href: string;
  desc?: string;
  badge?: string;
  Icon?: React.ElementType;
};

type NavItem = {
  label: string;
  href: string;
  /** When true, this item renders the cascading Data Assets mega-menu instead of a flat dropdown. */
  cascade?: boolean;
  children?: NavChild[];
  featured?: { title: string; desc: string; href: string };
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Audience Targeting & Data Development",
        href: "/solutions/audience-targeting",
        desc: "Build precise audiences across B2B, consumer, and healthcare data.",
        Icon: Target,
      },
      {
        label: "Data Enrichment & Modeling",
        href: "/solutions/data-enrichment",
        desc: "Append attributes, modeling, and intent signals.",
        Icon: Layers,
      },
      {
        label: "Signal eXchange™ (Lead & Intent Data)",
        href: "/solutions/signal-exchange",
        desc: "Lead data combined with intent signals for higher performance.",
        Icon: Radio,
        badge: "Flagship",
      },
      {
        label: "Data Activation & Channel Integration",
        href: "/solutions/data-activation",
        desc: "Deploy audiences across CRM, email, Programmatic, and traditional.",
        Icon: Share2,
      },
      {
        label: "Cost Per Lead Optimization",
        href: "/solutions/cost-per-lead",
        desc: "Reduce CPL by 40–60% with verified data and precision targeting.",
        Icon: DollarSign,
        badge: "New",
      },
    ],
    featured: {
      title: "Signal eXchange™",
      desc: "Our proprietary dataset — first-party lead data combined with intent and behavioral signals to create more actionable audiences.",
      href: "/solutions/signal-exchange",
    },
  },
  {
    // Cascading mega-menu — children intentionally omitted; dropdown reads from DATA_ASSETS_TREE.
    label: "Data Assets",
    href: "/data-assets",
    cascade: true,
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "Company Overview",
        href: "/about/company-overview",
        desc: "Who we are and what we do.",
        Icon: Building2,
      },
      {
        label: "Our Approach",
        href: "/about/our-approach",
        desc: "How we build, activate, and improve audiences.",
        Icon: Lightbulb,
      },
      {
        label: "Meet the Team",
        href: "/about/meet-the-team",
        desc: "Decades of experience across data and marketing.",
        Icon: Handshake,
      },
      {
        label: "Industries Served",
        href: "/about/industries-served",
        desc: "Healthcare, Financial, B2B, Insurance, Automotive.",
        Icon: Factory,
      },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
    children: [
      {
        label: "Industry Trends",
        href: "/insights/industry-trends",
        desc: "POV, commentary, and data-driven insights.",
        Icon: LineChart,
      },
      {
        label: "Case Studies",
        href: "/insights/case-studies",
        desc: "How our data performs in real campaigns.",
        Icon: FileText,
      },
      {
        label: "Newsletter",
        href: "/insights/newsletter",
        desc: "Periodic insights delivered to your inbox.",
        Icon: Mailbox,
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

/* ─────────────────────────────────────────────────────────────────
   CASCADING MEGA-MENU FOR DATA ASSETS
   Up to 4 columns: Category > Sub-hub > Sub-sub-hub > Leaf.
   Each column highlights the row whose children populate the next column.
   ───────────────────────────────────────────────────────────────── */

type CascadeColumnProps = {
  items: DataAssetNode[];
  /** Label of the row currently under the cursor — drives the visual highlight. */
  hoveredLabel: string | null;
  /** Label of the row that is the cascade anchor (whose children fill the next column). May equal hoveredLabel. */
  anchoredLabel: string | null;
  /** Called when the user enters a row — drives the next column. */
  onHoverRow: (node: DataAssetNode) => void;
  /** Called when any link is clicked — closes the dropdown. */
  onLinkClick: () => void;
  /** Whether each row should reserve space for a chevron (only when this column has children-bearing rows). */
  showChevronGutter: boolean;
  /** Visual title shown above the column. */
  title: string;
  /** Width preset for this column. First column is wider, others narrower. */
  variant?: "primary" | "secondary";
};

function CascadeColumn({
  items,
  hoveredLabel,
  anchoredLabel,
  onHoverRow,
  onLinkClick,
  showChevronGutter,
  title,
  variant = "secondary",
}: CascadeColumnProps) {
  return (
    <div
      className={`flex flex-col ${
        variant === "primary" ? "min-w-[260px]" : "min-w-[240px]"
      }`}
    >
      <h4 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3.5 flex items-center gap-2 px-1">
        {title}
        <span className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
      </h4>
      <ul className="flex flex-col gap-0.5">
        {items.map((node) => {
          const Icon = node.Icon;
          const hasChildren = !!node.children?.length;
          // Visual highlight follows the cursor — anchor controls cascade content.
          const isHovered = hoveredLabel === node.label;
          const isAnchored = anchoredLabel === node.label;
          const isActive = isHovered || isAnchored;
          return (
            <li
              key={node.href}
              onMouseEnter={() => onHoverRow(node)}
            >
              <Link
                href={node.href}
                onClick={onLinkClick}
                className={`grid items-center gap-2.5 px-2.5 py-2 rounded-lg transition-colors group/cell ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-blue-50 text-slate-800 hover:text-blue-700"
                }`}
                style={{
                  gridTemplateColumns: variant === "primary"
                    ? `auto 1fr ${showChevronGutter ? "auto" : ""}`
                    : `1fr ${showChevronGutter ? "auto" : ""}`,
                }}
              >
                {variant === "primary" && Icon && (
                  <span
                    className={`w-8 h-8 rounded-[8px] grid place-items-center transition-all flex-shrink-0 ${
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white border border-transparent"
                        : "bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover/cell:bg-gradient-to-br group-hover/cell:from-blue-600 group-hover/cell:to-cyan-500 group-hover/cell:text-white group-hover/cell:border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                )}
                <span className="min-w-0">
                  <span className="flex items-center gap-2 font-semibold text-[13.5px] leading-tight">
                    <span className="truncate">{node.label}</span>
                    {node.badge && (
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex-shrink-0">
                        {node.badge}
                      </span>
                    )}
                  </span>
                  {variant === "primary" && node.desc && (
                    <span className="block text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                      {node.desc}
                    </span>
                  )}
                </span>
                {showChevronGutter && (
                  <span className="flex-shrink-0">
                    {hasChildren ? (
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-colors ${
                          isActive ? "text-blue-700" : "text-slate-300 group-hover/cell:text-blue-600"
                        }`}
                      />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 text-slate-300 group-hover/cell:text-blue-600" />
                    )}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function DataAssetsCascade({
  isOpen,
  onLinkClick,
}: {
  isOpen: boolean;
  onLinkClick: () => void;
}) {
  // Default open path: B2B Database > Healthcare so the menu shows content immediately.
  const defaultLevel1 = DATA_ASSETS_TREE[0];
  const defaultLevel2 = defaultLevel1.children?.[0] ?? null;

  /* ── ANCHOR STATE — drives WHAT each subsequent column shows ──
     An anchor is a row whose children populate the NEXT column. Anchors only
     change when the cursor enters a row that HAS children. Hovering a leaf-only
     row (e.g. Data Cards, Signal eXchange) does NOT collapse the cascade — it
     just updates the hover highlight at that level.
     ─────────────────────────────────────────────────────────────── */
  const [level1Anchor, setLevel1Anchor] = useState<DataAssetNode>(defaultLevel1);
  const [level2Anchor, setLevel2Anchor] = useState<DataAssetNode | null>(defaultLevel2);
  const [level3Anchor, setLevel3Anchor] = useState<DataAssetNode | null>(null);

  /* ── HOVER STATE — drives only the VISUAL highlight per column ──
     These update on every row enter, including leaf-only rows. They give the
     user immediate feedback when crossing rows even if the row is a leaf and
     therefore wouldn't change the cascade content.
     ─────────────────────────────────────────────────────────────── */
  const [level1Hover, setLevel1Hover] = useState<string | null>(defaultLevel1.label);
  const [level2Hover, setLevel2Hover] = useState<string | null>(defaultLevel2?.label ?? null);
  const [level3Hover, setLevel3Hover] = useState<string | null>(null);

  // When the dropdown closes (mouse left, escape pressed, route change), reset
  // to the default open path so re-opening always starts at B2B Database > Healthcare.
  useEffect(() => {
    if (!isOpen) {
      setLevel1Anchor(defaultLevel1);
      setLevel2Anchor(defaultLevel2);
      setLevel3Anchor(null);
      setLevel1Hover(defaultLevel1.label);
      setLevel2Hover(defaultLevel2?.label ?? null);
      setLevel3Hover(null);
    }
    // We intentionally only run this on isOpen flip; defaultLevel1/2 are constants.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const onHoverLevel1 = (node: DataAssetNode) => {
    setLevel1Hover(node.label);
    // Re-anchor only when the hovered row has children. This is the key fix:
    // hovering Data Cards or Signal eXchange (leaves) leaves the cascade intact.
    if (!node.children?.length) return;
    setLevel1Anchor(node);
    const firstChild = node.children[0];
    setLevel2Anchor(firstChild);
    setLevel2Hover(firstChild.label);
    if (firstChild.children?.length) {
      const firstWithChildren = firstChild.children.find((c) => c.children?.length) ?? null;
      setLevel3Anchor(firstWithChildren);
      setLevel3Hover(firstWithChildren?.label ?? null);
    } else {
      setLevel3Anchor(null);
      setLevel3Hover(null);
    }
  };

  const onHoverLevel2 = (node: DataAssetNode) => {
    setLevel2Hover(node.label);
    setLevel2Anchor(node);
    if (node.children?.length) {
      const firstWithChildren = node.children.find((c) => c.children?.length) ?? null;
      setLevel3Anchor(firstWithChildren);
      setLevel3Hover(firstWithChildren?.label ?? null);
    } else {
      setLevel3Anchor(null);
      setLevel3Hover(null);
    }
  };

  const onHoverLevel3 = (node: DataAssetNode) => {
    setLevel3Hover(node.label);
    if (node.children?.length) {
      setLevel3Anchor(node);
    } else {
      setLevel3Anchor(null);
    }
  };

  const level2Items = level1Anchor.children ?? [];
  const level3Items = level2Anchor?.children ?? [];
  const level4Items = level3Anchor?.children ?? [];

  return (
    <div
      className="bg-white border border-slate-200 rounded-[22px] shadow-2xl p-5 xl:p-6 flex gap-4"
      style={{ maxWidth: "min(95vw, 1180px)" }}
    >
      {/* Level 1 — Data Assets categories. Always visible. */}
      <CascadeColumn
        title="Data Assets"
        items={DATA_ASSETS_TREE}
        hoveredLabel={level1Hover}
        anchoredLabel={level1Anchor.label}
        onHoverRow={onHoverLevel1}
        onLinkClick={onLinkClick}
        showChevronGutter
        variant="primary"
      />

      {/* Level 2 — visible whenever level1Anchor has children (always true for B2B / B2C). */}
      {level2Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 self-stretch" />
          <CascadeColumn
            title={level1Anchor.label}
            items={level2Items}
            hoveredLabel={level2Hover}
            anchoredLabel={level2Anchor?.label ?? null}
            onHoverRow={onHoverLevel2}
            onLinkClick={onLinkClick}
            showChevronGutter={level2Items.some((n) => n.children?.length)}
          />
        </>
      )}

      {/* Level 3 — visible when level2Anchor has children. Hidden for B2C leaves. */}
      {level3Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 self-stretch" />
          <CascadeColumn
            title={level2Anchor?.label ?? ""}
            items={level3Items}
            hoveredLabel={level3Hover}
            anchoredLabel={level3Anchor?.label ?? null}
            onHoverRow={onHoverLevel3}
            onLinkClick={onLinkClick}
            showChevronGutter={level3Items.some((n) => n.children?.length)}
          />
        </>
      )}

      {/* Level 4 — Technology platforms only (when a level-3 row with children is anchored). */}
      {level4Items.length > 0 && (
        <>
          <div className="w-px bg-slate-150 self-stretch" />
          <CascadeColumn
            title={level3Anchor?.label ?? ""}
            items={level4Items}
            hoveredLabel={null}
            anchoredLabel={null}
            onHoverRow={() => {}}
            onLinkClick={onLinkClick}
            showChevronGutter={false}
          />
        </>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MOBILE PANEL — RECURSIVE NESTED ACCORDION FOR DATA ASSETS
   ───────────────────────────────────────────────────────────────── */

function MobileCascadeNode({
  node,
  depth,
  onLinkClick,
}: {
  node: DataAssetNode;
  depth: number;
  onLinkClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = !!node.children?.length;

  if (!hasChildren) {
    return (
      <Link
        href={node.href}
        onClick={onLinkClick}
        className="block px-3 py-2 rounded-lg text-[13.5px] text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        {node.label}
        {node.badge && (
          <span className="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
            {node.badge}
          </span>
        )}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left text-[13.5px] font-semibold text-slate-900 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {node.label}
          {node.badge && (
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              {node.badge}
            </span>
          )}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="flex flex-col gap-0.5 py-1 pl-3 ml-2 border-l-2 border-blue-100"
            style={{ marginLeft: depth === 0 ? 8 : 4 }}
          >
            <Link
              href={node.href}
              onClick={onLinkClick}
              className="px-3 py-2 rounded-lg text-[13px] font-semibold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
            >
              All {node.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
            {node.children!.map((child) => (
              <MobileCascadeNode
                key={child.href}
                node={child}
                depth={depth + 1}
                onLinkClick={onLinkClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MAIN NAVBAR
   ───────────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
    setOpenDesktopMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDesktopMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const closeDesktop = () => setOpenDesktopMenu(null);

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-[100] transition-all duration-400"
        style={{ top: 0 }}
      >
        <div
          className={`transition-all duration-400 border-b ${
            scrolled
              ? "bg-white border-gray-200 shadow-md"
              : "bg-white border-gray-100"
          }`}
        >
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-[64px] sm:h-[70px] md:h-[76px] flex items-center justify-between gap-4 lg:gap-6">
            <Logo size="md" />

            <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-1 justify-center">
              {NAV.map((item) => {
                const isOpen = openDesktopMenu === item.label;
                const hasDropdown = !!item.children?.length || !!item.cascade;
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      if (hasDropdown) setOpenDesktopMenu(item.label);
                    }}
                    onMouseLeave={() => setOpenDesktopMenu(null)}
                  >
                    <Link
                      href={item.href}
                      onClick={closeDesktop}
                      className={`flex items-center gap-1 px-2.5 xl:px-3.5 py-2 rounded-[10px] text-[13.5px] xl:text-[14.5px] font-medium transition-all ${
                        isActive(item.href)
                          ? "text-blue-700 bg-blue-50"
                          : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      {item.label}
                      {hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform opacity-70 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </Link>

                    {hasDropdown && (
                      <div
                        className={`absolute top-full pt-3 transition-all duration-200 ${
                          item.cascade
                            ? "left-1/2 -translate-x-1/2"
                            : "left-1/2 -translate-x-1/2"
                        } ${
                          isOpen
                            ? "opacity-100 visible"
                            : "opacity-0 invisible pointer-events-none"
                        }`}
                      >
                        {/* Cascading Data Assets variant */}
                        {item.cascade && (
                          <DataAssetsCascade isOpen={isOpen} onLinkClick={closeDesktop} />
                        )}

                        {/* Standard flat dropdown variant (Solutions, About, Insights) */}
                        {!item.cascade && item.children && (
                          <div
                            className={`bg-white border border-slate-200 rounded-[22px] shadow-2xl p-5 xl:p-6 grid gap-5 xl:gap-6 ${
                              item.featured
                                ? "grid-cols-[1.3fr_1fr] w-[720px] xl:w-[820px]"
                                : "grid-cols-1 min-w-[360px] xl:min-w-[380px]"
                            }`}
                          >
                            <div>
                              <h4 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3.5 flex items-center gap-2">
                                {item.label}
                                <span className="flex-1 h-px bg-gradient-to-r from-blue-200 to-transparent" />
                              </h4>
                              <ul className="flex flex-col gap-1">
                                {item.children.map((child) => {
                                  const Icon = child.Icon;
                                  return (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        onClick={closeDesktop}
                                        className="grid grid-cols-[auto_1fr_auto] items-start gap-3 px-3 xl:px-3.5 py-2.5 xl:py-3 rounded-xl hover:bg-blue-50 transition-colors group/item"
                                      >
                                        <span className="w-9 h-9 rounded-[10px] grid place-items-center bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover/item:bg-gradient-to-br group-hover/item:from-blue-600 group-hover/item:to-cyan-500 group-hover/item:text-white group-hover/item:border-transparent transition-all flex-shrink-0">
                                          {Icon ? <Icon className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                                        </span>
                                        <span className="min-w-0">
                                          <span className="flex items-center gap-2 font-semibold text-[13.5px] text-slate-900 group-hover/item:text-blue-700 transition-colors leading-tight">
                                            {child.label}
                                            {child.badge && (
                                              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                                                {child.badge}
                                              </span>
                                            )}
                                          </span>
                                          {child.desc && (
                                            <span className="block text-[12px] text-slate-500 mt-1 leading-snug">
                                              {child.desc}
                                            </span>
                                          )}
                                        </span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all self-center flex-shrink-0" />
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            {item.featured && (
                              <Link
                                href={item.featured.href}
                                onClick={closeDesktop}
                                className="relative overflow-hidden rounded-2xl p-5 xl:p-6 text-white flex flex-col justify-between min-h-[220px] xl:min-h-[240px] group/featured"
                                style={{
                                  background:
                                    "radial-gradient(ellipse 80% 70% at 30% 20%, rgba(79, 125, 245, 0.3), transparent 60%), linear-gradient(135deg, #03061A 0%, #13256E 100%)",
                                }}
                              >
                                <div
                                  className="absolute inset-0 opacity-70 pointer-events-none"
                                  style={{
                                    backgroundImage:
                                      "radial-gradient(circle, rgba(111, 211, 255, 0.14) 1px, transparent 1px)",
                                    backgroundSize: "18px 18px",
                                  }}
                                />
                                <div
                                  className="absolute -bottom-10 -right-8 w-40 h-40 rounded-full pointer-events-none blur-2xl"
                                  style={{
                                    background:
                                      "radial-gradient(circle, rgba(34, 191, 255, 0.45), transparent 70%)",
                                  }}
                                />
                                <div className="relative">
                                  <h5 className="font-display font-bold text-lg xl:text-xl mb-2 xl:mb-2.5 tracking-tight">
                                    {item.featured.title}
                                  </h5>
                                  <p className="text-[12.5px] xl:text-[13px] text-white/75 leading-relaxed">
                                    {item.featured.desc}
                                  </p>
                                </div>
                                <span className="relative inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300 group-hover/featured:gap-2.5 transition-all">
                                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
              {/* <Link
                href="mailto:info@lorannllc.com?subject=Sign%20In%20Request"
                className="text-[13.5px] xl:text-[14px] text-slate-700 font-medium px-2.5 xl:px-3.5 py-2 hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link> */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 xl:gap-2 px-4 xl:px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[13.5px] xl:text-[14px] font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 grid place-items-center rounded-xl hover:bg-blue-50 transition-colors flex-shrink-0"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE PANEL */}
      <div
        className={`fixed inset-0 z-[110] lg:hidden transition-all duration-500 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />

        <div
          className={`absolute inset-y-0 right-0 w-full sm:max-w-md flex flex-col transition-transform duration-500 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 90% 10%, rgba(79, 125, 245, 0.22), transparent 55%), radial-gradient(ellipse 80% 60% at 10% 95%, rgba(34, 191, 255, 0.20), transparent 55%), linear-gradient(180deg, #FFFFFF 0%, #F0F5FF 100%)",
          }}
        >
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-150 flex-shrink-0 bg-white/50 backdrop-blur-md">
            <Logo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-11 h-11 grid place-items-center rounded-xl hover:bg-blue-50 transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-6">
            <div className="mb-6">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Navigate Lorann
              </div>
              <h2 className="font-display font-bold text-[26px] sm:text-[32px] tracking-[-0.025em] leading-[1.1] text-slate-900">
                Where do you want to{" "}
                <span className="text-gradient italic">go?</span>
              </h2>
            </div>

            <ul className="flex flex-col gap-1">
              {NAV.map((item) => {
                const hasDropdown = !!item.children?.length || !!item.cascade;
                return (
                  <li key={item.label}>
                    {hasDropdown ? (
                      <>
                        <button
                          onClick={() =>
                            setOpenSubmenu(
                              openSubmenu === item.label ? null : item.label
                            )
                          }
                          className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left text-[16px] sm:text-[17px] font-semibold font-display transition-colors ${
                            isActive(item.href)
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-900 hover:bg-slate-50"
                          }`}
                          aria-expanded={openSubmenu === item.label}
                        >
                          {item.label}
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              openSubmenu === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-all duration-300 ${
                            openSubmenu === item.label
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-col gap-0.5 py-2 pl-3 ml-3 border-l-2 border-blue-100">
                              <Link
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-2.5 rounded-lg text-[14px] font-semibold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                              >
                                All {item.label}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                              {item.cascade
                                ? DATA_ASSETS_TREE.map((node) => (
                                    <MobileCascadeNode
                                      key={node.href}
                                      node={node}
                                      depth={0}
                                      onLinkClick={() => setMobileOpen(false)}
                                    />
                                  ))
                                : item.children!.map((child) => (
                                    <Link
                                      key={child.href}
                                      href={child.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="block px-4 py-2.5 rounded-lg text-[14px] text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                                    >
                                      {child.label}
                                      {child.badge && (
                                        <span className="ml-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                                          {child.badge}
                                        </span>
                                      )}
                                    </Link>
                                  ))}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-4 rounded-xl text-[16px] sm:text-[17px] font-semibold font-display transition-colors ${
                          isActive(item.href)
                            ? "bg-blue-50 text-blue-700"
                            : "text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-150 shadow-sm">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
                Get in touch
              </div>
              <div className="flex flex-col gap-2.5 text-[13.5px] text-slate-700">
                <a
                  href="mailto:info@lorannllc.com"
                  className="flex items-center gap-2.5 hover:text-blue-700 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  info@lorannllc.com
                </a>
                <a
                  href="tel:+19145655300"
                  className="flex items-center gap-2.5 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  +1 914-565-5300
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>75 Lake Rd, Suite 326, Congers, NY 10920</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 border-t border-slate-150 flex-shrink-0 space-y-3 bg-white/70 backdrop-blur-md">
            {/* <Link
              href="mailto:info@lorannllc.com?subject=Sign%20In%20Request"
              className="block w-full text-center py-3.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-[14.5px] hover:border-blue-500 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link> */}
            <Link
              href="/contact"
              className="block w-full text-center py-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] shadow-brand"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
