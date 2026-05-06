"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

export type ContactFormCopy = {
  formNameLabel: string;
  formCompanyLabel: string;
  formEmailLabel: string;
  formPhoneLabel: string;
  formInterestLabel: string;
  formInterestPlaceholder: string;
  formInterestOptions: string[];
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitLabel: string;
  formPrivacyNote: string;
  successTitle: string;
  successBody: string;
  emailFallback: string;
};

export default function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const body = `Hi Lorann Team,

Name: ${data.name}
Company: ${data.company}
Email: ${data.email}
Phone: ${data.phone || "—"}

Interested in: ${data.interest}

Message:
${data.message}

Thanks!`;

    window.location.href = `mailto:${copy.emailFallback}?subject=${encodeURIComponent(
      `New Inquiry — ${data.interest}`
    )}&body=${encodeURIComponent(body)}`;

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-slate-150 rounded-2xl p-12 text-center shadow-lg">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 grid place-items-center">
          <Check className="w-8 h-8 text-green-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">
          {copy.successTitle}
        </h3>
        <p className="text-slate-600 leading-relaxed max-w-md mx-auto">
          {copy.successBody}{" "}
          <a
            href={`mailto:${copy.emailFallback}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            {copy.emailFallback}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-slate-150 rounded-2xl p-8 lg:p-10 shadow-lg space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {copy.formNameLabel}
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {copy.formCompanyLabel}
          </label>
          <input
            type="text"
            name="company"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {copy.formEmailLabel}
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {copy.formPhoneLabel}
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
          {copy.formInterestLabel}
        </label>
        <select
          name="interest"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
        >
          <option value="" disabled>
            {copy.formInterestPlaceholder}
          </option>
          {copy.formInterestOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
          {copy.formMessageLabel}
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 resize-none"
          placeholder={copy.formMessagePlaceholder}
        />
      </div>
      <button
        type="submit"
        className="group/btn inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all"
      >
        {copy.formSubmitLabel}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
      <p className="text-[12px] text-slate-500">{copy.formPrivacyNote}</p>
    </form>
  );
}
