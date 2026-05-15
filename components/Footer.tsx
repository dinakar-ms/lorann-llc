import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import Logo from "./Logo";

const FOOTER_COLS = [
  {
    heading: "Solutions",
    links: [
      { label: "Overview", href: "/solutions" },
      { label: "Audience Targeting", href: "/solutions/audience-targeting" },
      { label: "Data Enrichment", href: "/solutions/data-enrichment" },
      { label: "Signal eXchange™", href: "/solutions/signal-exchange" },
      { label: "Data Activation", href: "/solutions/data-activation" },
    ],
  },
  {
    heading: "Data Assets",
    links: [
      { label: "Overview", href: "/data-assets" },
      { label: "B2B Database", href: "/data-assets/b2b-database" },
      { label: "B2C Database", href: "/data-assets/b2c-database" },
      { label: "Data Cards", href: "/data-assets/data-cards" },
      { label: "Signal eXchange™", href: "/data-assets/signal-exchange" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Company Overview", href: "/about/company-overview" },
      { label: "Our Approach", href: "/about/our-approach" },
      { label: "Meet the Team", href: "/about/meet-the-team" },
      { label: "Industries Served", href: "/about/industries-served" },
    ],
  },
  {
    heading: "Insights",
    links: [
      { label: "Industry Trends", href: "/insights/industry-trends" },
      { label: "Case Studies", href: "/insights/case-studies" },
      { label: "Newsletter", href: "/insights/newsletter" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   FOOTER
   The previous footer used a dark navy background which clashed with
   the brand-blue logo (the wordmark "Lorann" rendered dark-blue on
   dark-navy and was barely legible). This version uses a soft light
   surface ( #F4F7FB → white ) so the existing brand-colored logo
   reads cleanly without needing a separate light/dark logo asset.
   The blue/cyan accent gradient is preserved as a subtle top-edge
   wash so the footer still feels visually anchored to the brand.
   ───────────────────────────────────────────────────────────────── */

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-20 pb-7 text-slate-600 border-t border-slate-200"
      style={{
        // background:
        //   "linear-gradient(180deg, #F4F7FB 0%, #FFFFFF 35%, #FFFFFF 100%)",
      }}
    >
      {/* Soft brand-blue glow at the top edge — keeps the footer feeling
          part of the brand without compromising logo legibility. */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[820px] h-[260px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(29, 69, 217, 0.18), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Faint dot-grid texture for visual depth — same pattern used
          elsewhere on the site (compliance band, hero sections). */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(29, 69, 217, 0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            {/* Logo renders in its native brand colors against the light surface. */}
            <Logo size="md" />

            <p className="text-[14px] leading-relaxed mt-5 mb-6 max-w-[340px] text-slate-600">
              Data-driven audience solutions for targeting, activation, and
              growth. Build, enrich, and activate high-performing audiences
              across B2B, consumer, and healthcare datasets.
            </p>

            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:info@lorannllc.com"
                className="flex items-center gap-2.5 text-[13.5px] text-slate-700 hover:text-blue-700 transition-colors"
              >
                <Mail className="w-[15px] h-[15px] text-blue-600 flex-shrink-0" />
                info@lorannllc.com
              </a>
              <a
                href="tel:+19145655300"
                className="flex items-center gap-2.5 text-[13.5px] text-slate-700 hover:text-blue-700 transition-colors"
              >
                <Phone className="w-[15px] h-[15px] text-blue-600 flex-shrink-0" />
                +1 914-565-5300
              </a>
              <span className="flex items-start gap-2.5 text-[13.5px] text-slate-700">
                <MapPin className="w-[15px] h-[15px] text-blue-600 flex-shrink-0 mt-0.5" />
                382 NE 191st St, PMB 463398, Miami, Florida 33179-3899
              </span>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h5 className="font-mono text-[11px] uppercase tracking-[0.14em] font-semibold text-blue-700 mb-5">
                {col.heading}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Legal / Policy Links ── */}
        <div className="border-t border-slate-200 pt-6 pb-6">
          <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2 text-[12.5px]">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Data Security", href: "/data-security-policy" },
              { label: "CCPA Privacy Policy", href: "/ccpa-privacy-policy" },
              { label: "Cookie Policy", href: "/cookie-policy" },
              { label: "Do Not Sell My Data", href: "/do-not-sell-my-data" },
              { label: "Do Not Call Compliance Policy", href: "/do-not-call-compliance" },
            ].map((item, i, arr) => (
              <span key={item.href} className="flex items-center gap-1.5">
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-blue-700 transition-colors underline-offset-2 hover:underline"
                >
                  {item.label}
                </Link>
                {i < arr.length - 1 && (
                  <span className="text-slate-300 select-none" aria-hidden>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom bar: copyright + socials ── */}
        <div className="border-t border-slate-200 pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13px] text-slate-500">
          <p>
            © {new Date().getFullYear()} Lorann LLC · Signal eXchange™ is a
            trademark of Lorann LLC
          </p>
          <div className="flex gap-2.5">
            {[
              { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/lorann-llc/" },
              { Icon: Twitter, label: "Twitter", href: "https://x.com/lorannllc1996" },
              { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Lorannllc/61578075234628/" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-[10px] border border-slate-200 grid place-items-center text-slate-500 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 hover:-translate-y-0.5 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
