"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-700 font-medium text-sm transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  );
}
