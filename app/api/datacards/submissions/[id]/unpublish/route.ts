import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Submission = {
  _id: string;
  uploader?: { _ref: string };
  publishedDataCard?: { _ref: string };
};

const submissionQuery = `*[_type == "dataCardSubmission" && _id == $id][0]{
  _id, uploader, publishedDataCard
}`;

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not signed in." }, { status: 401 });
  }

  const submission = await writeClient.fetch<Submission | null>(submissionQuery, {
    id: params.id,
  });
  if (!submission) {
    return NextResponse.json({ success: false, message: "Submission not found." }, { status: 404 });
  }

  const isOwner = submission.uploader?._ref === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ success: false, message: "Forbidden." }, { status: 403 });
  }

  const dataCardId = submission.publishedDataCard?._ref;
  if (!dataCardId) {
    return NextResponse.json({ success: false, message: "Not currently published." }, { status: 400 });
  }

  try {
    await writeClient.delete(dataCardId).catch(() => {});
    await writeClient.delete(`drafts.${dataCardId}`).catch(() => {});
    await writeClient
      .patch(submission._id)
      .set({
        status: "pending",
        reviewedAt: new Date().toISOString(),
        reviewedBy: { _type: "reference", _ref: session.user.id },
      })
      .unset(["publishedDataCard"])
      .commit();
    try {
      revalidateTag("dataCard");
    } catch (err) {
      console.warn("revalidateTag failed:", err);
    }
    return NextResponse.json({ success: true, message: "Unpublished. Moved back to Pending." });
  } catch (err) {
    const e = err as { message?: string };
    console.error("Unpublish failed:", err);
    return NextResponse.json(
      { success: false, message: e?.message || "Unpublish failed." },
      { status: 500 }
    );
  }
}
