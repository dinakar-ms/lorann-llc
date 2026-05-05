import Link from "next/link";
import {
  ChevronRight, ArrowRight, Check,
  Eye,
  FileLock,
  Globe2,
  KeyRound,
  Lock,
  Scale,
  ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy-First Compliance · Lorann LLC",
  description:
    "Lorann data is GDPR, CCPA, and CAN-SPAM compliant across all datasets, with HIPAA-conscious practices for healthcare audiences. Strong governance from source to delivery.",
};

export default function PrivacyCompliancePage() {
  return (
    <>
      {/* ===================== 1. HERO ===================== */}
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-24 overflow-hidden radial-hero dot-grid">
        <div
          className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1"
          style={{ background: "rgba(79, 125, 245, 0.4)" }}
        />
        <div
          className="absolute -bottom-20 -right-[10%] w-[450px] h-[450px] rounded-full pointer-events-none blur-[80px] animate-orb-float-2"
          style={{ background: "rgba(34, 191, 255, 0.3)" }}
        />

        <div className="container-custom relative z-[5]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center flex-wrap gap-1.5 text-[13px] text-slate-500 mb-6"
          >
            <span className="inline-flex items-center gap-1.5">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Link href="/why-lorann" className="hover:text-blue-700 transition-colors">
                Why Lorann
              </Link>
              <ChevronRight className="w-3 h-3 opacity-50" />
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-slate-700 font-medium">Privacy-First Compliance</span>
            </span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2F5DEC] animate-pulse-dot" />
              Why Lorann
            </span>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[4.2rem] leading-[1.04] tracking-[-0.035em] text-slate-900 mt-5 mb-5">
              Strong governance —{" "}
              <span className="text-gradient">from source to delivery.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Privacy isn&apos;t a feature added at the end of the pipeline. It&apos;s the architecture every Lorann record passes through from collection through activation — GDPR, CCPA, and CAN-SPAM compliant by design, with HIPAA-conscious practices for healthcare audiences.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="mailto:info@lorannllc.com?subject=Compliance%20Documentation%20Request"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
              >
                Request Compliance Docs
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/about/our-approach"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-900 font-semibold text-[14.5px] rounded-xl shadow-sm hover:border-blue-500 hover:text-blue-700 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(29,69,217,0.3)] transition-all"
              >
                Our Approach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 2. INTRO ===================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-start max-w-6xl mx-auto">
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-700 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                What Privacy-First Means at Lorann
              </div>
              <h2 className="font-display font-bold text-3xl lg:text-[2.6rem] leading-[1.1] tracking-[-0.028em] text-slate-900">
                Compliance built into the pipeline —{" "}
                <span className="text-gradient">not bolted on at the end.</span>
              </h2>
            </div>
            <div className="text-slate-700 text-[17px] leading-[1.75] space-y-4">
              <p>Privacy regulation isn&apos;t a checklist exercise. GDPR, CCPA, CAN-SPAM, and HIPAA all impose obligations on how data is collected, stored, processed, and activated — and treating any one stage as an afterthought creates risk that compounds.</p>
              <p>Lorann engineers governance into the data lifecycle itself. Every record carries documented basis for use, every storage layer is encrypted, every activation honors suppression. The compliance posture is the product, not a wrapper around it.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 3. SIX-CARD GRID ===================== */}
      <section className="py-20 lg:py-28 radial-stats">
        <div className="container-custom">
          <div className="text-center mx-auto max-w-[720px] mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_#2F5DEC] animate-pulse-dot" />
              Compliance Framework
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.05] tracking-[-0.028em] text-slate-900 mt-5 mb-4">
              Six pillars protecting every{" "}
              <span className="text-gradient">record we deliver.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Globe2, title: "GDPR / UK-GDPR", body: "EU and UK General Data Protection Regulation compliance — including lawful basis, data subject rights, retention limits, and processor agreements." },
              { icon: Scale, title: "CCPA / CPRA", body: "California Consumer Privacy Act and CPRA compliance — opt-out support, do-not-sell signals, and consumer rights workflows." },
              { icon: FileLock, title: "CAN-SPAM Act", body: "Federal compliance for commercial email — accurate sender identification, honored unsubscribes, and physical postal disclosures across every send." },
              { icon: ShieldCheck, title: "HIPAA-Conscious Practices", body: "Healthcare audiences are handled with elevated controls — minimum necessary access, no PHI in marketing files, and BAAs available where applicable." },
              { icon: KeyRound, title: "Encryption + Access Controls", body: "Encrypted at rest and in transit, role-based access, and audit logs on every record-level operation." },
              { icon: Eye, title: "Suppression-Aware Delivery", body: "Opt-outs honored on every send, every channel, every cycle — with bidirectional sync to your suppression file." },
            ].map((card) => (
              <div
                key={card.title}
                className="relative bg-white border border-slate-150 rounded-2xl p-7 hover:-translate-y-1.5 hover:shadow-xl hover:border-blue-200 transition-all duration-500 group flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-5 bg-gradient-to-br from-blue-50 to-slate-100 border border-slate-150 text-blue-700 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent group-hover:scale-105 transition-all">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 tracking-tight text-slate-900 flex items-center gap-2 flex-wrap">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-[14.5px] leading-relaxed flex-1">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 4. USE-CASES BANNER ===================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div
            className="relative overflow-hidden rounded-[32px] p-8 lg:p-14 text-white grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-center"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(79, 125, 245, 0.35), transparent 60%), radial-gradient(ellipse 70% 55% at 85% 75%, rgba(34, 191, 255, 0.28), transparent 60%), linear-gradient(135deg, #03061A, #13256E)",
            }}
          >
            <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-[24px] bg-cyan-400/15 border border-cyan-400/[0.28] grid place-items-center">
              <Lock className="w-14 h-14 text-cyan-300" />
            </div>
            <div className="relative">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-300 mb-3">
                Source-to-Delivery Governance
              </div>
              <h3 className="font-display font-bold text-2xl lg:text-[2rem] tracking-[-0.025em] leading-tight mb-3.5">
                Permissioned acquisition. Encrypted storage. Suppression-aware activation.
              </h3>
              <p className="text-white/75 text-[15px] leading-relaxed max-w-2xl">
                Compliance is enforced at every stage — from how a record is acquired (documented opt-in or legitimate interest), through how it&apos;s stored (encrypted, role-based access, audit-logged), to how it&apos;s activated (opt-outs honored on every send, every cycle).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== 5. FINAL CTA (inlined) ===================== */}
      <section id="contact-cta" className="py-24 lg:py-32 bg-white">
        <div className="container-custom">
          <div className="final-bg rounded-[32px] px-8 sm:px-12 lg:px-20 py-20 sm:py-24 lg:py-32 text-center relative overflow-hidden text-white shadow-[0_50px_120px_-25px_rgba(29,69,217,0.5)]">
            <div className="absolute inset-0 grid-drift-bg" />

            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/8 rounded-full pointer-events-none"
              style={{ animation: "spin 40s linear infinite" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/8 rounded-full pointer-events-none"
              style={{ animation: "spin 60s linear infinite reverse" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
            </div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/8 rounded-full pointer-events-none"
              style={{ animation: "spin 80s linear infinite" }}
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_16px_#22BFFF]" />
            </div>

            <div className="relative z-[2]">
              <span className="inline-flex items-center gap-2 font-mono text-[11.5px] font-medium uppercase tracking-[0.15em] text-cyan-300 px-3.5 py-1.5 bg-cyan-400/15 border border-cyan-400/30 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22BFFF] animate-pulse-dot" />
                Let&apos;s Build Together
              </span>

              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-[-0.025em] mb-5 max-w-[720px] mx-auto">
                Build the right audience
                <br />
                for your <span className="text-gradient-cyan">business.</span>
              </h2>

              <p className="text-[17px] opacity-85 max-w-[560px] mx-auto mb-9 leading-relaxed">
                Tell us your goals — we&apos;ll develop a data strategy aligned to
                your targeting, activation, and performance needs.
              </p>

              <div className="flex justify-center gap-3 flex-wrap mb-8">
                <Link
                  href="/contact"
                  className="group/btn relative inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-900 font-semibold text-[14.5px] rounded-xl hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-10px_rgba(111,211,255,0.5)] transition-all overflow-hidden"
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                    style={{ background: "linear-gradient(135deg, #6FD3FF, #A9C2FD)" }}
                  />
                  <span className="relative">Get Started</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
                <a
                  href="mailto:info@lorannllc.com?subject=Talk%20to%20an%20Expert"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 text-white font-semibold text-[14.5px] rounded-xl backdrop-blur-md hover:bg-white/[0.18] hover:-translate-y-0.5 transition-all"
                >
                  Talk to an Expert
                </a>
              </div>

              <div className="flex justify-center gap-6 flex-wrap text-[13.5px] opacity-80">
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                  No long-term contracts
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                  GDPR &amp; CCPA compliant
                </span>
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                  Free consultation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
