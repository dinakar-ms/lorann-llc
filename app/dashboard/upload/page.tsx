import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import UploadForm from "./UploadForm";

export const dynamic = "force-dynamic";

export default async function UploadDataCardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login?callbackUrl=/dashboard/upload");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">
          Upload a Data Card
        </h1>
        <p className="text-slate-600">
          Excel (.xlsx, .xls, .csv), Word (.docx, .doc), PDF, or RTF — up to 25&nbsp;MB.
          After upload, we&apos;ll parse the file and show you a review screen where you
          can verify the fields and publish to <code className="text-blue-700">/data-assets/data-cards</code>.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base text-blue-900 mb-1">
            Use the data card template
          </h3>
          <p className="text-sm text-blue-800/90">
            Best results come from the structured Excel template. Other formats still
            work; we&apos;ll parse what we can and you can edit the rest on the review
            screen before publishing.
          </p>
        </div>
        <a
          href="/templates/data-card-template.xlsx"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-blue-200 hover:bg-blue-100 text-blue-700 text-sm font-semibold transition-colors"
        >
          Download Template (.xlsx)
        </a>
      </div>

      <UploadForm />
    </div>
  );
}
