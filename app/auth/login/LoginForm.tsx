"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

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
  const [error] = useState<string | null>(
    initialError === "AccessDenied"
      ? "This sign-in is restricted to @lorannllc.com accounts. Please use a Lorann LLC email."
      : initialError
      ? "Sign-in failed. Please try again."
      : null
  );

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

      <p className="text-center text-xs text-slate-500 leading-relaxed">
        Use your <strong>@lorannllc.com</strong> account to sign in.
      </p>
    </div>
  );
}
