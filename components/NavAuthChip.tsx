"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";

export default function NavAuthChip() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-20 h-9" aria-hidden />;
  }

  if (session?.user) {
    return (
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-[13.5px] xl:text-[14px] text-slate-700 font-medium px-2.5 xl:px-3.5 py-2 hover:text-blue-700 transition-colors"
      >
        <LayoutDashboard className="w-4 h-4" />
        Dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="text-[13.5px] xl:text-[14px] text-slate-700 font-medium px-2.5 xl:px-3.5 py-2 hover:text-blue-700 transition-colors"
    >
      Sign in
    </Link>
  );
}
