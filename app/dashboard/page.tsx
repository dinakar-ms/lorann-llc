import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";
import Link from "next/link";
import { Upload, FileText } from "lucide-react";

export const dynamic = "force-dynamic";

type SubmissionCounts = {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
};

const countsQuery = `{
  "total": count(*[_type == "dataCardSubmission" && uploader._ref == $userId]),
  "pending": count(*[_type == "dataCardSubmission" && uploader._ref == $userId && status == "pending"]),
  "approved": count(*[_type == "dataCardSubmission" && uploader._ref == $userId && status == "approved"]),
  "rejected": count(*[_type == "dataCardSubmission" && uploader._ref == $userId && status == "rejected"]),
}`;

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let counts: SubmissionCounts = { total: 0, pending: 0, approved: 0, rejected: 0 };
  if (userId) {
    try {
      counts = await writeClient.fetch<SubmissionCounts>(countsQuery, { userId });
    } catch (err) {
      console.error("Counts query failed:", err);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mb-2">
          Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-slate-600">Manage your data card submissions below.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total" value={counts.total} color="slate" />
        <StatCard label="Pending" value={counts.pending} color="amber" />
        <StatCard label="Approved" value={counts.approved} color="green" />
        <StatCard label="Rejected" value={counts.rejected} color="red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/dashboard/upload"
          className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-6 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 grid place-items-center mb-4 group-hover:bg-blue-100 transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-lg text-slate-900 mb-1">
            Upload a Data Card
          </h3>
          <p className="text-sm text-slate-600">
            Submit a new Excel or Word file describing your data card.
          </p>
        </Link>
        <Link
          href="/dashboard/submissions"
          className="group bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-6 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 grid place-items-center mb-4 group-hover:bg-blue-100 transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="font-display font-semibold text-lg text-slate-900 mb-1">
            View My Submissions
          </h3>
          <p className="text-sm text-slate-600">
            Track review status and admin feedback on your uploads.
          </p>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "slate" | "amber" | "green" | "red";
}) {
  const colors = {
    slate: "text-slate-900",
    amber: "text-amber-600",
    green: "text-green-600",
    red: "text-red-600",
  };
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="text-[12px] font-mono uppercase tracking-wider text-slate-500 mb-1">
        {label}
      </div>
      <div className={`text-3xl font-display font-bold ${colors[color]}`}>{value}</div>
    </div>
  );
}
