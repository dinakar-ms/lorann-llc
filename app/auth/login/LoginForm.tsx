"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { LogIn } from "lucide-react";

function MicrosoftIcon() {
  return (
    <svg viewBox="0 0 23 23" width="18" height="18" aria-hidden="true">
      <path fill="#f35325" d="M1 1h10v10H1z" />
      <path fill="#81bc06" d="M12 1h10v10H12z" />
      <path fill="#05a6f0" d="M1 12h10v10H1z" />
      <path fill="#ffba08" d="M12 12h10v10H12z" />
    </svg>
  );
}

export default function LoginForm({
  callbackUrl,
  initialError,
}: {
  callbackUrl?: string;
  initialError?: string;
}) {
  const dest = callbackUrl || "/dashboard";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(
    initialError === "AccessDenied"
      ? "This sign-in is restricted to @lorannllc.com accounts. Please use a Lorann LLC email."
      : initialError
      ? "Sign-in failed. Please try again."
      : null
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
      redirect: false,
      callbackUrl: dest,
    });
    setSubmitting(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    if (res?.ok) {
      window.location.href = res.url || dest;
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg space-y-5">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={() => signIn("azure-ad", { callbackUrl: dest })}
        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors font-medium text-slate-800"
      >
        <MicrosoftIcon />
        Continue with Microsoft
      </button>

      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[12px] uppercase tracking-wider text-slate-500">or</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          <LogIn className="w-4 h-4" />
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
