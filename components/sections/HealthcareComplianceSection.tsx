import { ShieldCheck, Lock, Mail, Scale, PhoneOff } from "lucide-react";

type ComplianceItem = {
  icon: typeof ShieldCheck;
  badge: string;
  title: string;
  desc: string;
  color: string;
};

const ITEMS: ComplianceItem[] = [
  {
    icon: ShieldCheck,
    badge: "HIPAA",
    title: "HIPAA-Aware Data Handling",
    desc: "Our healthcare data contains marketing contact information only — no protected health information (PHI) is captured, stored, or transferred. Every delivery is structured to keep your campaigns fully outside HIPAA's scope.",
    color: "#1D45D9",
  },
  {
    icon: Lock,
    badge: "CCPA",
    title: "CCPA & State Privacy Compliance",
    desc: "Records are validated against California Consumer Privacy Act requirements and applicable state-level privacy statutes. Opt-out requests are honored and suppressed within 24 hours of receipt.",
    color: "#00A7EF",
  },
  {
    icon: Mail,
    badge: "CAN-SPAM",
    title: "CAN-SPAM Act Compliance",
    desc: "All email records are validated against federal CAN-SPAM requirements. Unsubscribe and opt-out data is maintained in real time. Your campaigns launch with a clean, legally defensible contact list.",
    color: "#1736B3",
  },
  {
    icon: Scale,
    badge: "FCRA",
    title: "FCRA Exemption Compliant",
    desc: "Data is supplied exclusively for B2B marketing and outreach purposes — not for credit, employment, or tenant-screening decisions. FCRA exemption compliance is documented and available on request.",
    color: "#22BFFF",
  },
  {
    icon: PhoneOff,
    badge: "DNC",
    title: "National DNC Registry Scrubbed",
    desc: "All phone records are scrubbed against the National Do Not Call Registry prior to delivery. State-level DNC lists are applied where applicable. Your outbound team reaches only contactable prospects.",
    color: "#1D45D9",
  },
];

export default function HealthcareComplianceSection({ slugParts }: { slugParts: string[] }) {
  const isPhysician = slugParts.includes("physicians-advanced-practice");
  const isNursing   = slugParts.includes("nursing-professionals");
  const isHospital  = slugParts.includes("hospital-decision-makers");

  const intro = isPhysician
    ? "Physician data carries unique regulatory weight. Every Lorann record is built with compliance as the foundation — not an afterthought."
    : isNursing
    ? "Nursing contact data requires precise credentialing hygiene. Our compliance framework keeps your campaigns legally sound and professionally respectful."
    : isHospital
    ? "Reaching healthcare executives demands airtight data governance. Lorann's compliance stack ensures every outreach stays within regulatory boundaries."
    : "Healthcare marketing operates under strict regulations. Lorann's data governance framework is built to protect your brand and your recipients.";

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{ backgroundImage: "radial-gradient(circle, #1D45D9 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container-custom relative">
        <div className="max-w-6xl mx-auto">

          {/* Top label */}
          <div className="flex items-center gap-2 mb-4 reveal">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700">
              Data Compliance
            </span>
          </div>

          {/* Split header */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start mb-14 reveal">
            <div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.12] tracking-[-0.028em] text-slate-900">
                Compliance is built in,{" "}
                <span style={{ background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#1736B3 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  not bolted on.
                </span>
              </h2>
            </div>
            <p className="text-slate-600 text-[17px] leading-[1.8] lg:pt-2">{intro}</p>
          </div>

          {/* Two-column layout: shield visual + items */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-center">

            {/* Shield visual */}
            <div className="reveal order-2 lg:order-1 flex justify-center">
              <div className="relative w-80 h-80">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, #1D45D9 0%, transparent 70%)", filter: "blur(40px)" }} />

                {/* Shield SVG */}
                <svg viewBox="0 0 280 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                  <defs>
                    <linearGradient id="shieldGrad" x1="0" y1="0" x2="280" y2="320" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#1D45D9" />
                      <stop offset="50%" stopColor="#1736B3" />
                      <stop offset="100%" stopColor="#0C1847" />
                    </linearGradient>
                    <linearGradient id="innerGrad" x1="0" y1="0" x2="280" y2="260" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#22BFFF" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#1D45D9" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="checkGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6FD3FF" />
                      <stop offset="100%" stopColor="#00A7EF" />
                    </linearGradient>
                  </defs>

                  {/* Shield base */}
                  <path d="M140 8 L258 52 L258 160 C258 228 196 286 140 310 C84 286 22 228 22 160 L22 52 Z"
                    fill="url(#shieldGrad)" stroke="rgba(99,179,237,0.3)" strokeWidth="1.5" />

                  {/* Shield inner highlight */}
                  <path d="M140 28 L240 64 L240 158 C240 216 188 266 140 287 C92 266 40 216 40 158 L40 64 Z"
                    fill="url(#innerGrad)" />

                  {/* Shield inner border */}
                  <path d="M140 28 L240 64 L240 158 C240 216 188 266 140 287 C92 266 40 216 40 158 L40 64 Z"
                    fill="none" stroke="rgba(99,179,237,0.2)" strokeWidth="1" />

                  {/* Check icon */}
                  <circle cx="140" cy="152" r="48" fill="rgba(0,167,239,0.12)" stroke="rgba(0,167,239,0.3)" strokeWidth="1.5" />
                  <polyline points="116,152 132,168 164,136"
                    stroke="url(#checkGrad)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                  {/* Badge pills */}
                  {[
                    { x: 140, y: 44,  label: "HIPAA" },
                    { x: 60,  y: 106, label: "CCPA" },
                    { x: 220, y: 106, label: "FCRA" },
                    { x: 72,  y: 224, label: "CAN-SPAM" },
                    { x: 210, y: 224, label: "DNC" },
                  ].map(({ x, y, label }) => (
                    <g key={label}>
                      <rect x={x - 30} y={y - 10} width={60} height={20} rx={10}
                        fill="rgba(29,69,217,0.85)" stroke="rgba(99,179,237,0.5)" strokeWidth="1" />
                      <text x={x} y={y + 4} textAnchor="middle" fill="#6FD3FF"
                        fontSize="8" fontWeight="700" fontFamily="monospace" letterSpacing="1">
                        {label}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Orbiting dot */}
                <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22BFFF] animate-pulse" />
                <div className="absolute bottom-10 left-6 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#1D45D9] animate-pulse" style={{ animationDelay: "0.7s" }} />
              </div>
            </div>

            {/* Compliance items */}
            <div className="order-1 lg:order-2 space-y-4">
              {ITEMS.map(({ icon: Icon, badge, title, desc, color }, i) => (
                <div key={badge}
                  className="reveal group flex gap-5 p-5 rounded-2xl bg-white border border-slate-150 hover:border-blue-200 hover:shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)] transition-all duration-400">
                  {/* Left accent + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <div className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${color}22, ${color}11)`, border: `1px solid ${color}33` }}>
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    {i < ITEMS.length - 1 && (
                      <div className="w-px flex-1 min-h-[20px]"
                        style={{ background: "linear-gradient(180deg,#D6E2F5,transparent)" }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}>
                        {badge}
                      </span>
                      <h3 className="font-display font-semibold text-[15px] text-slate-900 tracking-tight">{title}</h3>
                    </div>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom disclaimer strip */}
          <div className="mt-12 reveal rounded-2xl px-7 py-4 flex items-center gap-4"
            style={{ background: "linear-gradient(135deg,#E4EDFF,#F0F5FF)", border: "1px solid #CDDCFE" }}>
            <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <p className="text-slate-700 text-[13.5px] leading-relaxed">
              <strong className="text-slate-900">All data is supplied for B2B marketing purposes only.</strong>{" "}
              Lorann does not provide consumer credit data, background screening data, or any data subject to FCRA consumer-protection provisions.
              Licensing documentation available upon request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
