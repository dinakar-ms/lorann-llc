import Image from "next/image";
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

const COMPLIANCE_BADGES = ["HIPAA", "CCPA", "CAN-SPAM", "FCRA", "DNC"];

const PHOTO =
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80";

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
      {/* Subtle background dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #1D45D9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

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
                <span
                  style={{
                    background: "linear-gradient(135deg,#1D45D9 0%,#00A7EF 50%,#1736B3 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  not bolted on.
                </span>
              </h2>
            </div>
            <p className="text-slate-600 text-[17px] leading-[1.8] lg:pt-2">{intro}</p>
          </div>

          {/* Two-column: photo left + items right */}
          <div className="grid lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-start">

            {/* ── Photo column ── */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={PHOTO}
                  alt="Healthcare compliance professional reviewing data"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,15,36,0.88) 0%, rgba(8,15,36,0.3) 50%, transparent 100%)",
                  }}
                />

                {/* Top badge: B2B Only */}
                <div
                  className="absolute top-5 left-5 px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(29,69,217,0.88)",
                    border: "1px solid rgba(99,179,237,0.4)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <span className="font-mono text-[10px] font-bold text-white tracking-[0.14em] uppercase">
                    B2B Marketing Only
                  </span>
                </div>

                {/* Bottom glass card: compliance badges */}
                <div
                  className="absolute bottom-5 left-5 right-5 p-5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.93)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 8px 32px rgba(29,69,217,0.15)",
                  }}
                >
                  <p className="text-slate-500 text-[11px] font-semibold uppercase tracking-wider mb-3">
                    5 Active Compliance Frameworks
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COMPLIANCE_BADGES.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                        style={{
                          background: "rgba(29,69,217,0.08)",
                          color: "#1D45D9",
                          border: "1px solid rgba(29,69,217,0.18)",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Accent orb behind image */}
                <div
                  className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(0,167,239,0.25) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />
              </div>
            </div>

            {/* ── Compliance items ── */}
            <div className="order-1 lg:order-2 space-y-4">
              {ITEMS.map(({ icon: Icon, badge, title, desc, color }, i) => (
                <div
                  key={badge}
                  className="reveal group flex gap-5 p-5 rounded-2xl bg-white border border-slate-150 hover:border-blue-200 hover:shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)] transition-all duration-400"
                >
                  {/* Left accent + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <div
                      className="w-10 h-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                        border: `1px solid ${color}33`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    {i < ITEMS.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[20px]"
                        style={{ background: "linear-gradient(180deg,#D6E2F5,transparent)" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}
                      >
                        {badge}
                      </span>
                      <h3 className="font-display font-semibold text-[15px] text-slate-900 tracking-tight">
                        {title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Disclaimer strip */}
              <div
                className="reveal mt-2 rounded-2xl px-6 py-4 flex items-start gap-3"
                style={{
                  background: "linear-gradient(135deg,#E4EDFF,#F0F5FF)",
                  border: "1px solid #CDDCFE",
                }}
              >
                <ShieldCheck className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 text-[13px] leading-relaxed">
                  <strong className="text-slate-900">
                    All data is supplied for B2B marketing purposes only.
                  </strong>{" "}
                  Lorann does not provide consumer credit data, background screening data, or any
                  data subject to FCRA consumer-protection provisions. Licensing documentation
                  available upon request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
