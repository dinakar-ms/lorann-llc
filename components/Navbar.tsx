"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Target,
  Layers,
  Radio,
  Share2,
  Users,
  Briefcase,
  Activity,
  CreditCard,
  Sparkles,
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
        desc: "Deploy audiences across CRM, email, digital, and traditional.",
        Icon: Share2,
      },
    ],
    featured: {
      title: "Signal eXchange™",
      desc: "Our proprietary dataset — first-party lead data combined with intent and behavioral signals to create more actionable audiences.",
      href: "/solutions/signal-exchange",
    },
  },
  {
    label: "Data Assets",
    href: "/data-assets",
    children: [
      {
        label: "Consumer Data",
        href: "/data-assets/consumer-data",
        desc: "Behavioral, lifestyle, and demographic attributes.",
        Icon: Users,
      },
      {
        label: "B2B Data",
        href: "/data-assets/b2b-data",
        desc: "Business & professional datasets for ABM and prospecting.",
        Icon: Briefcase,
      },
      {
        label: "Healthcare Data",
        href: "/data-assets/healthcare-data",
        desc: "Compliance-first targeting precision for healthcare.",
        Icon: Activity,
      },
      {
        label: "Data Cards",
        href: "/data-assets/data-cards",
        desc: "Detailed audience definitions, attributes, and counts.",
        Icon: CreditCard,
      },
      {
        label: "Signal eXchange™",
        href: "/data-assets/signal-exchange",
        desc: "Proprietary lead + intent dataset.",
        Icon: Sparkles,
        badge: "New",
      },
    ],
    featured: {
      title: "Built on Better Data",
      desc: "A structured view of the datasets behind our solutions — built for targeting, enrichment, and activation.",
      href: "/data-assets",
    },
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
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
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-[100] transition-all duration-400"
        style={{ top: "var(--announce-height, 36px)" }}
      >
        <div
          className={`transition-all duration-400 ${
            scrolled
            ? "bg-white border-gray-200 shadow-md"
            : "bg-white border-gray-100"
          } border-b`
        }
        >
          <div className="max-w-[1320px] mx-auto px-5 sm:px-6 lg:px-12 h-[70px] md:h-[76px] flex items-center justify-between gap-6">
            <Logo size="md" />

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {NAV.map((item) => (
                <li key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-[10px] text-[14.5px] font-medium transition-all ${
                      isActive(item.href)
                        ? "text-blue-700 bg-blue-50"
                        : "text-slate-700 hover:text-blue-700 hover:bg-blue-50"
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 opacity-70" />
                    )}
                  </Link>

                  {item.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div
                        className={`bg-white border border-slate-200 rounded-[22px] shadow-2xl p-6 grid gap-6 ${
                          item.featured
                            ? "grid-cols-[1.35fr_1fr] w-[820px]"
                            : "grid-cols-1 min-w-[380px]"
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
                                    className="grid grid-cols-[auto_1fr_auto] items-start gap-3 px-3.5 py-3 rounded-xl hover:bg-blue-50 transition-colors group/item"
                                  >
                                    <span className="w-9 h-9 rounded-[10px] grid place-items-center bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover/item:bg-gradient-to-br group-hover/item:from-blue-600 group-hover/item:to-cyan-500 group-hover/item:text-white group-hover/item:border-transparent transition-all flex-shrink-0">
                                      {Icon ? (
                                        <Icon className="w-4 h-4" />
                                      ) : (
                                        <ArrowRight className="w-4 h-4" />
                                      )}
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
                            className="relative overflow-hidden rounded-2xl p-6 text-white flex flex-col justify-between min-h-[240px] group/featured"
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
                              <h5 className="font-display font-bold text-xl mb-2.5 tracking-tight">
                                {item.featured.title}
                              </h5>
                              <p className="text-[13px] text-white/75 leading-relaxed">
                                {item.featured.desc}
                              </p>
                            </div>
                            <span className="relative inline-flex items-center gap-1.5 text-[13px] font-semibold text-cyan-300 group-hover/featured:gap-2.5 transition-all">
                              Learn more <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right CTAs */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="mailto:info@lorannllc.com?subject=Sign%20In%20Request"
                className="text-[14px] text-slate-700 font-medium px-3.5 py-2 hover:text-blue-700 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-[14px] font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-11 h-11 grid place-items-center rounded-xl hover:bg-blue-50 transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen panel */}
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
          <div className="flex items-center justify-between p-5 border-b border-slate-150 flex-shrink-0 bg-white/50 backdrop-blur-md">
            <Logo size="sm" />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="w-11 h-11 grid place-items-center rounded-xl hover:bg-blue-50 transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="mb-6">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Navigate Lorann
              </div>
              <h2 className="font-display font-bold text-[28px] sm:text-[32px] tracking-[-0.025em] leading-[1.1] text-slate-900">
                Where do you want to{" "}
                <span className="text-gradient italic">go?</span>
              </h2>
            </div>

            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenSubmenu(
                            openSubmenu === item.label ? null : item.label
                          )
                        }
                        className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-left text-[17px] font-semibold font-display transition-colors ${
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
                              className="px-4 py-2.5 rounded-lg text-[14px] font-semibold text-blue-700 hover:bg-blue-50 flex items-center gap-2"
                            >
                              All {item.label}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
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
                      className={`block px-4 py-4 rounded-xl text-[17px] font-semibold font-display transition-colors ${
                        isActive(item.href)
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-150 shadow-sm">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-3">
                Get in touch
              </div>
              <div className="flex flex-col gap-2.5 text-[13.5px] text-slate-700">
                <a
                  href="mailto:info@lorannllc.com"
                  className="flex items-center gap-2.5 hover:text-blue-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  info@lorannllc.com
                </a>
                <a
                  href="tel:+19145655300"
                  className="flex items-center gap-2.5 hover:text-blue-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  +1 914-565-5300
                </a>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>75 Lake Rd, Suite 326, Congers, NY 10920</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-slate-150 flex-shrink-0 space-y-3 bg-white/70 backdrop-blur-md">
            <Link
              href="mailto:info@lorannllc.com?subject=Sign%20In%20Request"
              className="block w-full text-center py-3.5 rounded-xl border border-slate-200 text-slate-900 font-semibold text-[14.5px] hover:border-blue-500 hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
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
