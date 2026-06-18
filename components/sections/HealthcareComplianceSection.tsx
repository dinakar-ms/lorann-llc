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

/* Unique photo per hub — no repeating images across pages */
const COMPLIANCE_PHOTOS: Record<string, string> = {
  "physicians-advanced-practice":  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80",
  "nursing-professionals":         "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80",
  "hospital-decision-makers":      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
  "health-therapy":                "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=900&q=80",
  "behavioral-mental-health":      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=80",
  "dental-vision":                 "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=900&q=80",
  "pharmacy-practice-management":  "https://images.unsplash.com/photo-1585671773819-bc87fcaa99ae?auto=format&fit=crop&w=900&q=80",
  "specialty-other":               "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=80",
  "default":                       "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=900&q=80",
};

function getHubKey(slugParts: string[]): string {
  const idx = slugParts.indexOf("healthcare");
  if (idx === -1) return "default";
  return slugParts[idx + 1] || "default";
}

export default function HealthcareComplianceSection({ slugParts }: { slugParts: string[] }) {
  const key = getHubKey(slugParts);
  const photo = COMPLIANCE_PHOTOS[key] ?? COMPLIANCE_PHOTOS["default"];

  const isPhysician = key === "physicians-advanced-practice";
  const isNursing   = key === "nursing-professionals";
  const isHospital  = key === "hospital-decision-makers";

  const intro = isPhysician
    ? "Physician data carries unique regulatory weight. Every Lorann record is built with compliance as the foundation — not an afterthought."
    : isNursing
    ? "Nursing contact data requires precise credentialing hygiene. Our compliance framework keeps your campaigns legally sound and professionally respectful."
    : isHospital
    ? "Reaching healthcare executives demands airtight data governance. Lorann's compliance stack ensures every outreach stays within regulatory boundaries."
    : "Healthcare marketing operates under strict regulations. Lorann's data governance framework is built to protect your brand and your recipients.";

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
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
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 items-start mb-10 lg:mb-14 reveal">
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
            <p className="text-slate-600 text-[16px] lg:text-[17px] leading-[1.8] lg:pt-2">{intro}</p>
          </div>

          {/* Two-column: photo left + items right */}
          <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-14 items-start">

            {/* ── Photo column ── */}
            <div className="reveal order-2 lg:order-1">
              <div className="relative h-[300px] sm:h-[380px] lg:h-[560px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={photo}
                  alt="Healthcare compliance professional"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(8,15,36,0.88) 0%, rgba(8,15,36,0.25) 50%, transparent 100%)",
                  }}
                />

                {/* Top badge */}
                <div
                  className="absolute top-4 left-4 px-3 py-1.5 rounded-full"
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

                {/* Bottom glass card */}
                <div
                  className="absolute bottom-4 left-4 right-4 p-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.93)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.95)",
                    boxShadow: "0 8px 32px rgba(29,69,217,0.12)",
                  }}
                >
                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-2.5">
                    5 Active Compliance Frameworks
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMPLIANCE_BADGES.map((badge) => (
                      <span
                        key={badge}
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
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
              </div>
            </div>

            {/* ── Compliance items ── */}
            <div className="order-1 lg:order-2 space-y-3">
              {ITEMS.map(({ icon: Icon, badge, title, desc, color }, i) => (
                <div
                  key={badge}
                  className="reveal group flex gap-4 p-4 lg:p-5 rounded-2xl bg-white border border-slate-150 hover:border-blue-200 hover:shadow-[0_8px_40px_-12px_rgba(29,69,217,0.12)] transition-all duration-400"
                >
                  {/* Left accent + icon */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-0.5">
                    <div
                      className="w-9 h-9 lg:w-10 lg:h-10 rounded-xl grid place-items-center transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
                        border: `1px solid ${color}33`,
                      }}
                    >
                      <Icon className="w-4 h-4 lg:w-5 lg:h-5" style={{ color }} />
                    </div>
                    {i < ITEMS.length - 1 && (
                      <div
                        className="w-px flex-1 min-h-[16px]"
                        style={{ background: "linear-gradient(180deg,#D6E2F5,transparent)" }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
                        style={{ background: `${color}18`, color }}
                      >
                        {badge}
                      </span>
                      <h3 className="font-display font-semibold text-[14px] lg:text-[15px] text-slate-900 tracking-tight">
                        {title}
                      </h3>
                    </div>
                    <p className="text-slate-600 text-[13px] lg:text-[13.5px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}

              {/* Disclaimer strip */}
              <div
                className="reveal rounded-2xl px-5 py-4 flex items-start gap-3"
                style={{
                  background: "linear-gradient(135deg,#E4EDFF,#F0F5FF)",
                  border: "1px solid #CDDCFE",
                }}
              >
                <ShieldCheck className="w-4 h-4 lg:w-5 lg:h-5 text-blue-700 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700 text-[12.5px] lg:text-[13px] leading-relaxed">
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
