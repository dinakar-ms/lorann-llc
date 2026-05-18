"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Script from "next/script";
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

declare global {
  interface Window {
    grecaptcha?: {
      getResponse: (id?: number) => string;
      reset: (id?: number) => void;
      render: (container: HTMLElement, params: Record<string, unknown>) => number;
      ready: (cb: () => void) => void;
    };
    onLorannRecaptchaLoad?: () => void;
  }
}

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
  "6Lf3750sAAAAAPjhvYlHiHNVPnEgqCDy5gOh3y9r";

type Location = {
  country: string;
  country_code: string;
  state: string;
  city: string;
};

function isValidPhone(phone: string): { valid: boolean; reason?: string } {
  if (/[a-zA-Z]/.test(phone)) return { valid: false, reason: "Phone number cannot contain letters" };
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 7) return { valid: false, reason: "Phone number must have at least 7 digits" };
  if (cleaned.length > 15) return { valid: false, reason: "Phone number is too long" };
  if (/^0+$/.test(cleaned)) return { valid: false, reason: "Please enter a valid phone number" };
  if (/^(\d)\1+$/.test(cleaned)) return { valid: false, reason: "Please enter a valid phone number" };
  return { valid: true };
}

export default function ContactForm({ copy }: { copy: ContactFormCopy }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const recaptchaRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const locationRef = useRef<Location>({ country: "", country_code: "", state: "", city: "" });

  useEffect(() => {
    const tryRender = () => {
      if (
        typeof window === "undefined" ||
        !window.grecaptcha ||
        typeof window.grecaptcha.render !== "function" ||
        !recaptchaRef.current ||
        recaptchaWidgetId.current !== null
      ) {
        return false;
      }
      try {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
        setRecaptchaReady(true);
        return true;
      } catch {
        return false;
      }
    };

    if (tryRender()) return;
    const interval = setInterval(() => {
      if (tryRender()) clearInterval(interval);
    }, 200);
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        locationRef.current = {
          country: d.country_name || "",
          country_code: d.country_code || "",
          state: d.region || "",
          city: d.city || "",
        };
      })
      .catch(() => {
        fetch("https://ipinfo.io/json")
          .then((r) => r.json())
          .then((d) => {
            locationRef.current = {
              country: d.country || "",
              country_code: d.country || "",
              state: d.region || "",
              city: d.city || "",
            };
          })
          .catch(() => {});
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const interest = String(formData.get("interest") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const errs: Record<string, string> = {};
    if (!name) errs.name = "Name is required";
    if (!company) errs.company = "Company is required";
    if (!email) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email address";
    if (!phone) errs.phone = "Phone number is required";
    else {
      const pv = isValidPhone(phone);
      if (!pv.valid) errs.phone = pv.reason || "Invalid phone number";
    }
    if (!interest) errs.interest = "Please choose one";
    if (!message) errs.message = "Message is required";

    let recaptchaToken = "";
    if (typeof window !== "undefined" && window.grecaptcha) {
      try {
        recaptchaToken = window.grecaptcha.getResponse(recaptchaWidgetId.current ?? undefined);
      } catch {
        recaptchaToken = "";
      }
    }
    if (!recaptchaToken) errs.recaptcha = "Please complete the reCAPTCHA verification";

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setErrorMessage("Please correct the highlighted fields and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          interest,
          message,
          country: locationRef.current.country,
          country_code: locationRef.current.country_code,
          state: locationRef.current.state,
          city: locationRef.current.city,
          source_url: typeof window !== "undefined" ? window.location.href : "",
          "g-recaptcha-response": recaptchaToken,
        }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setSuccessMessage(json.message || "Thank you! Your message has been received.");
        setSubmitted(true);
      } else {
        setErrorMessage(json.message || "Sorry, there was an error. Please try again.");
        if (window.grecaptcha) window.grecaptcha.reset(recaptchaWidgetId.current ?? undefined);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Network error. Please try again or email us directly.");
      if (window.grecaptcha) window.grecaptcha.reset(recaptchaWidgetId.current ?? undefined);
    } finally {
      setSubmitting(false);
    }
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
          {successMessage ||
            `${copy.successBody} ${copy.emailFallback}.`}
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-150 rounded-2xl p-8 lg:p-10 shadow-lg space-y-5"
        noValidate
      >
        {errorMessage && (
          <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
            {errorMessage}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
              {copy.formNameLabel}
            </label>
            <input
              type="text"
              name="name"
              required
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 ${
                fieldErrors.name
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {fieldErrors.name && <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>}
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
              {copy.formCompanyLabel}
            </label>
            <input
              type="text"
              name="company"
              required
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 ${
                fieldErrors.company
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {fieldErrors.company && <p className="text-xs text-red-600 mt-1">{fieldErrors.company}</p>}
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
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 ${
                fieldErrors.email
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-slate-700 mb-2">
              {copy.formPhoneLabel}
            </label>
            <input
              type="tel"
              name="phone"
              required
              className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 ${
                fieldErrors.phone
                  ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
            {fieldErrors.phone && <p className="text-xs text-red-600 mt-1">{fieldErrors.phone}</p>}
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
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 ${
              fieldErrors.interest
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          >
            <option value="" disabled>
              {copy.formInterestPlaceholder}
            </option>
            {copy.formInterestOptions.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
          {fieldErrors.interest && <p className="text-xs text-red-600 mt-1">{fieldErrors.interest}</p>}
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {copy.formMessageLabel}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={copy.formMessagePlaceholder}
            className={`w-full px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:ring-2 outline-none transition-all text-slate-900 resize-none ${
              fieldErrors.message
                ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
          {fieldErrors.message && <p className="text-xs text-red-600 mt-1">{fieldErrors.message}</p>}
        </div>
        <div>
          <div ref={recaptchaRef} />
          {fieldErrors.recaptcha && (
            <p className="text-xs text-red-600 mt-2">{fieldErrors.recaptcha}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="group/btn inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(29,69,217,0.65)] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {submitting ? "Sending…" : copy.formSubmitLabel}
          {!submitting && (
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          )}
        </button>
        <p className="text-[12px] text-slate-500">{copy.formPrivacyNote}</p>
      </form>
    </>
  );
}
