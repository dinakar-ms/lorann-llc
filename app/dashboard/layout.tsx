import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, Upload, FileText, Database } from "lucide-react";
import SignOutButton from "./SignOutButton";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
          <aside className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Signed in as
              </div>
              <div className="font-semibold text-slate-900 truncate">
                {session.user.name || session.user.email}
              </div>
              <div className="text-sm text-slate-500 truncate">{session.user.email}</div>
            </div>

            <nav className="bg-white border border-slate-200 rounded-2xl p-3 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/upload"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Data Card
              </Link>
              <Link
                href="/dashboard/submissions"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                My Submissions
              </Link>
              <Link
                href="/dashboard/manage"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium text-sm transition-colors"
              >
                <Database className="w-4 h-4" />
                Published Cards
              </Link>
              <SignOutButton />
            </nav>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
