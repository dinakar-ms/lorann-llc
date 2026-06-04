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
  status?: string;
};

const submissionQuery = `*[_type == "dataCardSubmission" && _id == $id][0]{
  _id, status, uploader, publishedDataCard
}`;

async function authorize(req: NextRequest, params: { id: string }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { error: NextResponse.json({ success: false, message: "Not signed in." }, { status: 401 }) };
  }
  const submission = await writeClient.fetch<Submission | null>(submissionQuery, { id: params.id });
  if (!submission) {
    return {
      error: NextResponse.json({ success: false, message: "Submission not found." }, { status: 404 }),
    };
  }
  const ownerId = submission.uploader?._ref;
  const isOwner = ownerId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return { error: NextResponse.json({ success: false, message: "Forbidden." }, { status: 403 }) };
  }
  return { session, submission };
}

/**
 * PATCH /api/datacards/submissions/[id]
 * Body: { parsedFields?: Record<string, unknown>, title?, description?, category?, universe? }
 * Update fields on the submission before the user publishes.
 */
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await authorize(req, params);
  if (auth.error) return auth.error;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid body." }, { status: 400 });
  }

  const allowedTop = ["title", "description", "category", "universe"];
  const set: Record<string, unknown> = {};
  for (const k of allowedTop) {
    if (k in body) set[k] = body[k];
  }
  if (body.parsedFields && typeof body.parsedFields === "object") {
    set.parsedFields = body.parsedFields;
  }
  if (Object.keys(set).length === 0) {
    return NextResponse.json({ success: false, message: "Nothing to update." }, { status: 400 });
  }

  try {
    await writeClient.patch(params.id).set(set).commit();
    return NextResponse.json({ success: true, message: "Saved." });
  } catch (err) {
    const e = err as { message?: string };
    return NextResponse.json(
      { success: false, message: e?.message || "Save failed." },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/datacards/submissions/[id]
 * User cancels their submission (or admin removes it). Also clears the published
 * dataCard if any.
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await authorize(req, params);
  if (auth.error) return auth.error;
  const { submission } = auth;

  try {
    const dataCardRef = submission!.publishedDataCard?._ref;
    if (dataCardRef) {
      await writeClient.delete(dataCardRef).catch(() => {});
      await writeClient.delete(`drafts.${dataCardRef}`).catch(() => {});
    }
    await writeClient.delete(params.id).catch(() => {});
    await writeClient.delete(`drafts.${params.id}`).catch(() => {});
    if (dataCardRef) {
      try {
        revalidateTag("dataCard");
      } catch (err) {
        console.warn("revalidateTag failed:", err);
      }
    }
    return NextResponse.json({
      success: true,
      message: dataCardRef
        ? "Submission and published data card deleted."
        : "Submission deleted.",
    });
  } catch (err) {
    const e = err as { message?: string };
    return NextResponse.json(
      { success: false, message: e?.message || "Delete failed." },
      { status: 500 }
    );
  }
}
