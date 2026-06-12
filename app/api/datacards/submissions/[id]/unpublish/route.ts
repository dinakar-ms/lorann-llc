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
    // 1. Patch the submission first: clear the reference + set status. This
    // protects against Sanity's strong-reference check (a weak ref would
    // normally allow it, but we want to be safe).
    await writeClient
      .patch(submission._id)
      .set({
        status: "pending",
        reviewedAt: new Date().toISOString(),
        reviewedBy: { _type: "reference", _ref: session.user.id },
      })
      .unset(["publishedDataCard"])
      .commit();

    // 2. Delete the dataCard. Treat a "document not found" error as success
    // (someone else may have deleted it already), but propagate everything
    // else so the user knows it's still on the public site.
    let dataCardDeleteError: Error | null = null;
    try {
      await writeClient.delete(dataCardId);
    } catch (err) {
      const e = err as { statusCode?: number; message?: string };
      if (e?.statusCode === 404 || /not found/i.test(e?.message || "")) {
        // already gone — fine
      } else {
        dataCardDeleteError = err as Error;
      }
    }
    // Best-effort delete on the draft too
    try {
      await writeClient.delete(`drafts.${dataCardId}`);
    } catch {
      // draft may not exist
    }

    if (dataCardDeleteError) {
      console.error(
        "Unpublish: submission reset but dataCard could not be deleted:",
        dataCardDeleteError
      );
      return NextResponse.json(
        {
          success: false,
          message: `Submission moved to Pending, but the public data card could not be deleted (${
            (dataCardDeleteError as { message?: string }).message ||
            "unknown error"
          }). Delete it manually from Manage Published Cards.`,
        },
        { status: 500 }
      );
    }

    try {
      revalidateTag("dataCard");
    } catch (err) {
      console.warn("revalidateTag failed:", err);
    }
    return NextResponse.json({
      success: true,
      message: "Unpublished. Moved back to Pending.",
    });
  } catch (err) {
    const e = err as { message?: string };
    console.error("Unpublish failed:", err);
    return NextResponse.json(
      { success: false, message: e?.message || "Unpublish failed." },
      { status: 500 }
    );
  }
}
