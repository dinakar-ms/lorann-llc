import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeClient } from "@/sanity/lib/writeClient";
import { parseDataCardFile, PARSER_VERSION } from "@/lib/parseDataCardFile";

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
  const tagsRaw = String(form.get("tags") || "").trim();
  const tags = tagsRaw
    ? tagsRaw
        .split(/[\n,;|]/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
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

    // ── Diagnostic: capture exactly what the parser saw so we can compare
    // local vs. production behavior post-hoc.
    const diag = {
      fileName: file.name,
      fileSize: buf.length,
      fileType: file.type,
      fileExt: ext,
      // First 200 bytes as a hex preview — tells us if RTF/PDF magic bytes are correct
      head200Hex: buf.subarray(0, 200).toString("hex"),
      // First 200 bytes interpreted as UTF-8 — quickly shows if it looks like RTF
      head200Utf8: buf.subarray(0, 200).toString("utf8").replace(/[\x00-\x1f]/g, "."),
      // Approximate text-extraction sanity check for RTF
      hasSegmentsLiteral: ext === "rtf" ? buf.toString("utf8").includes("SEGMENTS") : null,
      hasRtfHeader: ext === "rtf" ? buf.toString("utf8").startsWith("{\\rtf") : null,
    };
    console.log("[upload DIAG]", JSON.stringify(diag).slice(0, 1000));

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

    // Reject obvious junk that the text-based parser sometimes picks up from
    // file styling/metadata (e.g. "Times New Roman;Arial;" from font specs).
    function looksLikeJunkName(s: string | undefined): boolean {
      if (!s) return true;
      const t = s.trim();
      if (t.length < 3) return true;
      // Comma/semicolon-separated font list pattern
      if (/^([A-Z][A-Za-z ]+[;,]\s*){2,}$/.test(t)) return true;
      if (/Times New Roman|Arial|Helvetica|Calibri|Verdana/i.test(t) && /[;,]/.test(t))
        return true;
      // CSS-ish lines
      if (/^font[- ]?(family|size|weight)/i.test(t)) return true;
      return false;
    }

    // The uploaded file is the source of truth. Parsed values win whenever the
    // parser was able to extract them (and they pass the junk filter). The
    // upload form's title/description/universe are fallbacks for fields the
    // parser couldn't read. Users can correct anything on the Review & Publish
    // page before publishing.
    const cleanParsedName = looksLikeJunkName(parsed.fields.name)
      ? undefined
      : parsed.fields.name;
    const finalTitle = cleanParsedName || title || "Untitled Data Card";
    const finalDescription = parsed.fields.description || description || undefined;
    const finalCategory = category;
    const finalUniverse =
      typeof parsed.fields.universe === "number"
        ? parsed.fields.universe
        : typeof universe === "number" && !Number.isNaN(universe)
        ? universe
        : undefined;

    // Sanity requires each item in an array of objects to carry a unique `_key`.
    // Decorate the parsed segments / extra fields with stable index-based keys
    // before write.
    const segmentsWithKeys = parsed.fields.segments?.map((s, i) => ({
      _key: `seg-${i}`,
      ...s,
    }));
    const extraFieldsWithKeys = parsed.fields.extraFields?.map((f, i) => ({
      _key: `ef-${i}`,
      ...f,
    }));

    // Sync the effective values into parsedFields so the publish step (which
    // reads from parsedFields) produces the dataCard the user actually expects.
    const parsedWithTags = {
      ...parsed.fields,
      name: finalTitle,
      ...(finalDescription !== undefined ? { description: finalDescription } : {}),
      ...(finalUniverse !== undefined ? { universe: finalUniverse } : {}),
      ...(segmentsWithKeys ? { segments: segmentsWithKeys } : {}),
      ...(extraFieldsWithKeys ? { extraFields: extraFieldsWithKeys } : {}),
      ...(tags.length > 0 ? { tags } : {}),
    };

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
      parsedFields: parsedWithTags,
      parseWarnings: softWarnings,
    });

    return NextResponse.json({
      success: true,
      id: doc._id,
      title: finalTitle,
      warnings: softWarnings,
      parserVersion: PARSER_VERSION,
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
