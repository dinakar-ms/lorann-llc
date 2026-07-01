import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ParsedFields = {
  name?: string;
  description?: string;
  universe?: number;
  category?: string;
  market?: string;
  dataType?: string;
  source?: string;
  geo?: string;
  postalRecords?: number;
  phoneNumbers?: number;
  emailAddresses?: number;
  postalCpm?: number;
  phoneCpm?: number;
  emailCpm?: number;
  popularity?: number;
  cardQuality?: string;
  genderMale?: number;
  genderFemale?: number;
  minimumOrder?: number;
  minimumPrice?: number;
  netNamePercent?: number;
  runCharge?: number;
  brokerCommission?: number;
  agencyCommission?: number;
  exchangeAvailable?: boolean;
  reuseAvailable?: boolean;
  emailDeliveryFee?: number;
  ftpDeliveryFee?: number;
  marketEntryDate?: string;
  nextUpdateDate?: string;
  frequency?: string;
  lastUpdated?: string;
  selects?: string[];
  segments?: { label: string; count?: number; rate?: number }[];
  extraFields?: { label: string; value: string }[];
  minimums?: { label: string; count?: number }[];
  fileSections?: {
    title: string;
    rows: { label: string; value: string }[];
  }[];
  tags?: string[];
};

type Submission = {
  _id: string;
  title: string;
  description?: string;
  category?: string;
  universe?: number;
  uploader?: { _ref: string };
  uploaderEmail?: string;
  uploaderName?: string;
  publishedDataCard?: { _ref: string };
  parsedFields?: ParsedFields;
};

const submissionQuery = `*[_type == "dataCardSubmission" && _id == $id][0]{
  _id, title, description, category, universe,
  uploader,
  uploaderEmail,
  "uploaderName": uploader->name,
  publishedDataCard,
  parsedFields
}`;

const categoryMap: Record<string, string> = {
  b2b: "Business",
  b2c: "Consumer",
  "signal-exchange": "Marketing",
  other: "Business",
};

const optionalKeys: (keyof ParsedFields)[] = [
  "market",
  "dataType",
  "source",
  "postalRecords",
  "phoneNumbers",
  "emailAddresses",
  "postalCpm",
  "phoneCpm",
  "emailCpm",
  "popularity",
  "cardQuality",
  "genderMale",
  "genderFemale",
  "minimumOrder",
  "minimumPrice",
  "netNamePercent",
  "runCharge",
  "brokerCommission",
  "agencyCommission",
  "exchangeAvailable",
  "reuseAvailable",
  "emailDeliveryFee",
  "ftpDeliveryFee",
  "marketEntryDate",
  "nextUpdateDate",
  "selects",
  "segments",
  "extraFields",
  "minimums",
  "fileSections",
  "tags",
];

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

  const nowIso = new Date().toISOString();
  const todayDate = nowIso.slice(0, 10);

  try {
    const parsed = submission.parsedFields || {};

    // parsedFields IS the source of truth — the user just verified them on the
    // review screen. Top-level submission values are only used as a last-resort
    // fallback when parsedFields literally has no entry for a required key.
    const required: Record<string, unknown> = {
      name: parsed.name ?? submission.title ?? "Untitled Data Card",
      description: parsed.description ?? submission.description ?? "",
      universe: parsed.universe ?? submission.universe ?? 0,
      category:
        parsed.category ?? categoryMap[submission.category || "other"] ?? "Business",
      lastUpdated: parsed.lastUpdated ?? todayDate,
      frequency: parsed.frequency ?? "Monthly",
      geo: parsed.geo ?? "USA",
      uploaderName: submission.uploaderName ?? session.user.name ?? "",
      uploaderEmail: submission.uploaderEmail ?? session.user.email ?? "",
    };
    const optionalSet: Record<string, unknown> = {};
    const optionalUnset: string[] = [];
    for (const key of optionalKeys) {
      const v = parsed[key];
      if (v !== undefined && v !== null && v !== "") {
        // Sanity requires every object in an array to have a unique `_key`.
        // Decorate before writing.
        if (key === "segments" && Array.isArray(v)) {
          optionalSet[key] = v.map((s, i) => ({
            _key: (s as { _key?: string })._key || `seg-${i}`,
            ...(s as Record<string, unknown>),
          }));
        } else if (key === "extraFields" && Array.isArray(v)) {
          optionalSet[key] = v.map((s, i) => ({
            _key: (s as { _key?: string })._key || `ef-${i}`,
            ...(s as Record<string, unknown>),
          }));
        } else if (key === "minimums" && Array.isArray(v)) {
          optionalSet[key] = v.map((s, i) => ({
            _key: (s as { _key?: string })._key || `min-${i}`,
            ...(s as Record<string, unknown>),
          }));
        } else if (key === "fileSections" && Array.isArray(v)) {
          // Each section object AND each nested row need a stable `_key`.
          optionalSet[key] = v.map((s, i) => {
            const sec = s as {
              _key?: string;
              title?: string;
              rows?: { _key?: string; label?: string; value?: string }[];
            };
            return {
              _key: sec._key || `sec-${i}`,
              title: sec.title,
              rows: (sec.rows || []).map((r, j) => ({
                _key: r._key || `sec-${i}-${j}`,
                label: r.label,
                value: r.value,
              })),
            };
          });
        } else {
          optionalSet[key] = v;
        }
      } else {
        optionalUnset.push(key);
      }
    }

    let dataCardId = submission.publishedDataCard?._ref;

    if (!dataCardId) {
      // First publish — create a brand-new dataCard
      const created = await writeClient.create({
        _type: "dataCard",
        ...required,
        ...optionalSet,
      } as { _type: "dataCard" });
      dataCardId = created._id;
    } else {
      // Re-publish — overwrite the existing dataCard with the latest values
      let patch = writeClient
        .patch(dataCardId)
        .set({ ...required, ...optionalSet });
      if (optionalUnset.length) {
        patch = patch.unset(optionalUnset);
      }
      await patch.commit();
      // Also update the draft copy if one exists (Studio edits can leave a draft)
      await writeClient
        .patch(`drafts.${dataCardId}`)
        .set({ ...required, ...optionalSet })
        .commit()
        .catch(() => {
          /* draft may not exist — that's fine */
        });
    }

    await writeClient
      .patch(submission._id)
      .set({
        status: "approved",
        reviewedAt: nowIso,
        reviewedBy: { _type: "reference", _ref: session.user.id },
        publishedDataCard: { _type: "reference", _ref: dataCardId },
      })
      .commit();

    // Bust the Next.js fetch cache so /data-assets/data-cards picks up the changes
    // immediately instead of waiting up to 60s for revalidation.
    try {
      revalidateTag("dataCard");
    } catch (err) {
      console.warn("revalidateTag failed:", err);
    }

    return NextResponse.json({
      success: true,
      message: "Published.",
      dataCardId,
    });
  } catch (err) {
    const e = err as { message?: string };
    console.error("Publish failed:", err);
    return NextResponse.json(
      { success: false, message: e?.message || "Publish failed." },
      { status: 500 }
    );
  }
}
