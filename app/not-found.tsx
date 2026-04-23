import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen pt-40 pb-20 radial-hero dot-grid relative overflow-hidden">
      <div
        className="absolute top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none blur-[80px] animate-orb-float-1"
        style={{ background: "rgba(79, 125, 245, 0.4)" }}
      />
      <div className="container-custom relative z-[5] text-center">
        <div className="font-display font-bold text-[10rem] sm:text-[14rem] leading-none text-gradient mb-4">
          404
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 mb-5 tracking-tight">
          Page not found
        </h1>
        <p className="text-slate-600 text-lg max-w-md mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist — but there&apos;s still an audience waiting to be built.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-[14.5px] rounded-xl shadow-brand hover:-translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-900 font-semibold text-[14.5px] rounded-xl shadow-sm hover:border-blue-500 hover:text-blue-700 transition-all"
          >
            Contact us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
