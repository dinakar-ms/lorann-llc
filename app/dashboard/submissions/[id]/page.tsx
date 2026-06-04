import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { writeClient } from "@/sanity/lib/writeClient";
import ReviewForm from "./ReviewForm";

export const dynamic = "force-dynamic";

export type ReviewSubmission = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  universe?: number;
  status: "pending" | "approved" | "rejected";
  fileType?: string;
  fileUrl?: string;
  submittedAt?: string;
  parsedFields?: Record<string, unknown>;
  parseWarnings?: string[];
  publishedDataCard?: { _id: string; name?: string };
  uploaderRef?: string;
};

const query = `*[_type == "dataCardSubmission" && _id == $id][0]{
  _id, title, description, category, universe, status, fileType,
  "fileUrl": file.asset->url,
  submittedAt, parsedFields, parseWarnings,
  publishedDataCard->{ _id, name },
  "uploaderRef": uploader._ref
}`;

export default async function ReviewSubmissionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    redirect(`/auth/login?callbackUrl=/dashboard/submissions/${params.id}`);

  let submission: ReviewSubmission | null = null;
  try {
    submission = await writeClient.fetch<ReviewSubmission | null>(query, {
      id: params.id,
    });
  } catch (err) {
    console.error("Submission fetch failed:", err);
  }

  if (!submission) notFound();

  const isOwner = submission.uploaderRef === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) redirect("/dashboard/submissions");

  return (
    <div className="space-y-6">
      <ReviewForm submission={submission} />
    </div>
  );
}
