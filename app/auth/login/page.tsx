import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign In · Lorann LLC",
  robots: { index: false, follow: false },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { callbackUrl?: string; error?: string };
}) {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-bold text-3xl text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-2">Sign in to upload and manage your data cards.</p>
        </div>
        <LoginForm callbackUrl={searchParams.callbackUrl} initialError={searchParams.error} />
      </div>
    </main>
  );
}
