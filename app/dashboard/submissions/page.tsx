import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { writeClient } from "@/sanity/lib/writeClient";
import Link from "next/link";
import { Upload } from "lucide-react";

export const dynamic = "force-dynamic";

type Submission = {
  _id: string;
  title: string;
  category?: string;
  universe?: number;
  status: "pending" | "approved" | "rejected";
  reviewNotes?: string;
  submittedAt?: string;
  reviewedAt?: string;
  fileType?: string;
};

const submissionsQuery = `*[_type == "dataCardSubmission" && uploader._ref == $userId] | order(submittedAt desc) {
  _id, title, category, universe, status, reviewNotes, submittedAt, reviewedAt, fileType
}`;

const statusStyles: Record<Submission["status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<Submission["status"], string> = {
  pending: "Awaiting your review",
  approved: "Published",
  rejected: "Rejected",
};

export default async function MySubmissionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login?callbackUrl=/dashboard/submissions");

  let submissions: Submission[] = [];
  try {
    submissions = await writeClient.fetch<Submission[]>(submissionsQuery, {
      userId: session.user.id,
    });
  } catch (err) {
    console.error("Submissions query failed:", err);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">My Submissions</h1>
          <p className="text-slate-600">{submissions.length} total</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 transition-all text-sm"
        >
          <Upload className="w-4 h-4" />
          New Submission
        </Link>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-slate-600 mb-5">You haven&apos;t submitted any data cards yet.</p>
          <Link
            href="/dashboard/upload"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm"
          >
            <Upload className="w-4 h-4" />
            Upload your first data card
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-[12px] font-mono uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Universe</th>
                <th className="px-5 py-3">Submitted</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {submissions.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50/50">
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    <Link
                      href={`/dashboard/submissions/${s._id}`}
                      className="hover:text-blue-700"
                    >
                      {s.title}
                    </Link>
                    {s.reviewNotes && s.status === "rejected" && (
                      <div className="mt-1 text-xs text-red-700 font-normal italic">
                        “{s.reviewNotes}”
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4 text-slate-600 capitalize">{s.category || "—"}</td>
                  <td className="px-5 py-4 text-slate-600">
                    {s.universe ? s.universe.toLocaleString() : "—"}
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {s.submittedAt
                      ? new Date(s.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${statusStyles[s.status]}`}
                    >
                      {statusLabels[s.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/dashboard/submissions/${s._id}`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        s.status === "pending"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {s.status === "pending"
                        ? "Review & Publish"
                        : s.status === "approved"
                        ? "Manage"
                        : "View"}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
