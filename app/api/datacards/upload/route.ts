import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";
import { parseDataCardFile } from "@/lib/parseDataCardFile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

const ACCEPTED_EXTENSIONS = new Set(["xlsx", "xls", "csv", "docx", "doc", "pdf", "rtf"]);
const ACCEPTED_MIME = new Set([
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.ms-excel", // xls
  "text/csv", // csv
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/msword", // doc
  "application/pdf", // pdf
  "application/rtf", // rtf
  "text/rtf", // rtf alt
  "application/octet-stream", // generic fallback
]);

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, message: "Not signed in." }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 });
  }

  const title = String(form.get("title") || "").trim();
  const description = String(form.get("description") || "").trim();
  const category = String(form.get("category") || "other").trim();
  const universeRaw = String(form.get("universe") || "").trim();
  const universe = universeRaw ? Number(universeRaw) : undefined;
  const file = form.get("file");

  if (!title || title.length < 2) {
    return NextResponse.json(
      { success: false, message: "Title must be at least 2 characters." },
      { status: 400 }
    );
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, message: "File is required." }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ success: false, message: "Uploaded file is empty." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { success: false, message: "File too large. Maximum is 25 MB." },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "";
  if (!ACCEPTED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      {
        success: false,
        message: "Unsupported file type. Use .xlsx, .xls, .csv, .docx, .doc, .pdf, or .rtf.",
      },
      { status: 400 }
    );
  }
  if (file.type && !ACCEPTED_MIME.has(file.type)) {
    // Some browsers send odd MIMEs — log but don't reject if extension is OK
    console.warn(`Unusual MIME type ${file.type} for ${file.name} — accepting based on extension`);
  }

  try {
    const buf = Buffer.from(await file.arrayBuffer());

    // Parse uploaded file (xlsx/xls/csv/pdf/docx/rtf supported; .doc unsupported).
    // Parsing is best-effort: missing/blank fields just mean admin fills them in at approval.
    const parsed = await parseDataCardFile(buf, file.name);

    // Demote "required field missing" errors into warnings — never reject the upload.
    const softWarnings = [...parsed.warnings, ...parsed.errors];

    const asset = await writeClient.assets.upload("file", buf, {
      filename: file.name,
      contentType: file.type || "application/octet-stream",
    });

    const nowIso = new Date().toISOString();

    // Prefer the parsed name/universe/description/category over the form values,
    // since the spreadsheet is the source of truth.
    const finalTitle = parsed.fields.name || title;
    const finalDescription = parsed.fields.description || description || undefined;
    const finalCategory = category;
    const finalUniverse =
      typeof parsed.fields.universe === "number"
        ? parsed.fields.universe
        : typeof universe === "number" && !Number.isNaN(universe)
        ? universe
        : undefined;

    const doc = await writeClient.create({
      _type: "dataCardSubmission",
      title: finalTitle,
      description: finalDescription,
      category: finalCategory,
      universe: finalUniverse,
      file: {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
      },
      fileType: ext,
      uploader: { _type: "reference", _ref: session.user.id },
      uploaderEmail: session.user.email || "",
      status: "pending",
      submittedAt: nowIso,
      parsedFields: parsed.fields,
      parseWarnings: softWarnings,
    });

    return NextResponse.json({
      success: true,
      id: doc._id,
      title: finalTitle,
      warnings: softWarnings,
      message: `Submitted for review.${
        softWarnings.length > 0 ? ` ${softWarnings.length} field(s) need admin attention.` : ""
      }`,
    });
  } catch (err) {
    const e = err as { statusCode?: number; message?: string };
    console.error("Upload error:", err);
    return NextResponse.json(
      {
        success: false,
        message:
          process.env.NODE_ENV !== "production"
            ? `Upload failed: ${e?.statusCode ? `HTTP ${e.statusCode}: ` : ""}${e?.message || String(err)}`
            : "Upload failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
