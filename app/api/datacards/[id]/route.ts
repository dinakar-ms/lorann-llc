import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * DELETE /api/datacards/[id]
 * Deletes a published dataCard. Any signed-in user can delete (no admin gate),
 * since users own the content they publish through the dashboard. Also clears
 * any submission references pointing at this card.
 */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not signed in." }, { status: 401 });
  }

  const id = params.id;
  if (!id) {
    return NextResponse.json({ success: false, message: "Missing data card id." }, { status: 400 });
  }

  try {
    // Reset any submissions that point at this card.
    const refSubmissions = await writeClient.fetch<{ _id: string }[]>(
      `*[_type == "dataCardSubmission" && publishedDataCard._ref == $id]{_id}`,
      { id }
    );
    for (const sub of refSubmissions) {
      try {
        await writeClient
          .patch(sub._id)
          .set({ status: "pending" })
          .unset(["publishedDataCard"])
          .commit();
      } catch (err) {
        console.warn("Failed to reset submission:", sub._id, err);
      }
    }

    // Delete published + draft copies.
    await writeClient.delete(id).catch(() => {});
    await writeClient.delete(`drafts.${id}`).catch(() => {});

    try {
      revalidateTag("dataCard");
    } catch (err) {
      console.warn("revalidateTag failed:", err);
    }

    return NextResponse.json({
      success: true,
      message: `Deleted. ${refSubmissions.length} submission(s) reset to pending.`,
    });
  } catch (err) {
    const e = err as { statusCode?: number; message?: string };
    console.error("Data card delete failed:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV !== "production"
            ? `Delete failed: ${e?.statusCode ? `HTTP ${e.statusCode}: ` : ""}${e?.message || String(err)}`
            : "Delete failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
