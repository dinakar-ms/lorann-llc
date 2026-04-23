"use client";

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    const body = encodeURIComponent(
      `Subscribe request:\n\nName: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "—"}\n\n— Sent from lorannllc.com/insights/newsletter`
    );
    const subject = encodeURIComponent(
      `[Newsletter] ${form.name || form.email}`
    );
    window.location.href = `mailto:info@lorannllc.com?subject=${subject}&body=${body}`;
    setTimeout(() => setState("sent"), 400);
  };

  if (state === "sent") {
    return (
      <div className="bg-white border border-slate-150 rounded-[22px] p-10 text-center shadow-md">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white grid place-items-center mx-auto mb-4 shadow-[0_10px_24px_-6px_rgba(29,69,217,0.5)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display font-bold text-[1.35rem] tracking-[-0.02em] text-slate-900 mb-2.5">
          You&rsquo;re in.
        </h3>
        <p className="text-[14.5px] text-slate-600 leading-relaxed">
          Your subscription request is on the way. Expect the next Lorann
          dispatch within a couple of weeks.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-slate-150 rounded-[22px] p-8 sm:p-9 shadow-md flex flex-col gap-4 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 100% 0%, rgba(111, 211, 255, 0.1), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="inline-flex items-center gap-2 text-blue-700 mb-3">
          <Mail className="w-4 h-4" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
            Subscribe
          </span>
        </div>
        <h3 className="font-display font-bold text-[1.35rem] tracking-[-0.02em] text-slate-900 mb-1.5">
          Join the Lorann list.
        </h3>
        <p className="text-[14px] text-slate-600 mb-2">
          Three fields. Unsubscribe anytime.
        </p>
      </div>

      <label className="relative flex flex-col gap-1.5">
        <span className="text-[12.5px] font-semibold text-slate-700">Name</span>
        <input
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Jane Doe"
          className="w-full text-[14.5px] text-slate-900 bg-slate-50 border border-slate-150 rounded-[10px] px-3.5 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 transition-all"
        />
      </label>

      <label className="relative flex flex-col gap-1.5">
        <span className="text-[12.5px] font-semibold text-slate-700">
          Email
        </span>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="jane@company.com"
          className="w-full text-[14.5px] text-slate-900 bg-slate-50 border border-slate-150 rounded-[10px] px-3.5 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 transition-all"
        />
      </label>

      <label className="relative flex flex-col gap-1.5">
        <span className="text-[12.5px] font-semibold text-slate-700">
          Company{" "}
          <small className="text-slate-400 font-normal">(optional)</small>
        </span>
        <input
          type="text"
          value={form.company}
          onChange={update("company")}
          placeholder="Company Inc."
          className="w-full text-[14.5px] text-slate-900 bg-slate-50 border border-slate-150 rounded-[10px] px-3.5 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 transition-all"
        />
      </label>

      <button
        type="submit"
        disabled={state === "sending"}
        className="relative mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all disabled:opacity-60"
      >
        {state === "sending" ? "Subscribing…" : "Subscribe for Updates"}
        <ArrowRight className="w-4 h-4" />
      </button>

      <small className="relative text-[12px] text-slate-500 leading-relaxed">
        By subscribing, you agree to receive periodic email from Lorann. We
        don&rsquo;t share your details.
      </small>
    </form>
  );
}
