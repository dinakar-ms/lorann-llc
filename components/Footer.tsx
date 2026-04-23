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
      { label: "Consumer Data", href: "/data-assets/consumer-data" },
      { label: "B2B Data", href: "/data-assets/b2b-data" },
      { label: "Healthcare Data", href: "/data-assets/healthcare-data" },
      { label: "Data Cards", href: "/data-assets/data-cards" },
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

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70 pt-20 pb-7 relative overflow-hidden">
      <div
        className="absolute -top-52 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(29, 69, 217, 0.35), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-10 mb-14">
          <div>
            <Logo dark size="md" />
            <p className="text-[14px] leading-relaxed mt-5 mb-6 max-w-[340px] text-white/60">
              Data-driven audience solutions for targeting, activation, and growth. Build, enrich, and activate high-performing audiences across B2B, consumer, and healthcare datasets.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="mailto:info@lorannllc.com"
                className="flex items-center gap-2.5 text-[13.5px] text-white/65 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-[15px] h-[15px] text-blue-400 flex-shrink-0" />
                info@lorannllc.com
              </a>
              <a
                href="tel:+19145655300"
                className="flex items-center gap-2.5 text-[13.5px] text-white/65 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-[15px] h-[15px] text-blue-400 flex-shrink-0" />
                +1 914-565-5300
              </a>
              <span className="flex items-start gap-2.5 text-[13.5px] text-white/65">
                <MapPin className="w-[15px] h-[15px] text-blue-400 flex-shrink-0 mt-0.5" />
                75 Lake Rd, Suite 326, Congers, NY 10920
              </span>
            </div>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h5 className="font-mono text-[11px] uppercase tracking-wider text-white/45 mb-5">
                {col.heading}
              </h5>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-cyan-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13px] text-white/50">
          <p>
            © {new Date().getFullYear()} Lorann LLC · Signal eXchange™ is a trademark of Lorann LLC
          </p>
          <div className="flex gap-2.5">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Facebook, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-[10px] border border-white/10 grid place-items-center text-white/60 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-600/10 hover:-translate-y-0.5 transition-all"
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
