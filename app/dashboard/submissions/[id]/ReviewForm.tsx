"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Download,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Save,
} from "lucide-react";
import type { ReviewSubmission } from "./page";

type FieldDef = {
  key: string;
  label: string;
  type: "text" | "number" | "textarea" | "boolean" | "select" | "csv";
  options?: string[];
  span?: 1 | 2 | 3;
};

const PARSED_FIELDS: FieldDef[] = [
  { key: "name", label: "Data card name", type: "text", span: 2 },
  {
    key: "category",
    label: "Public category",
    type: "select",
    options: [
      "Technology", "Healthcare", "Business", "Consumer", "Financial",
      "Education", "Marketing", "Insurance", "Automotive", "Construction",
      "Hospitality", "Real Estate", "Legal", "Energy", "Government",
      "Manufacturing", "Non-Profit", "Retail", "Travel", "Agriculture",
    ],
  },
  { key: "universe", label: "Universe", type: "number" },
  { key: "postalRecords", label: "Postal records", type: "number" },
  { key: "phoneNumbers", label: "Phone numbers", type: "number" },
  { key: "emailAddresses", label: "Email addresses", type: "number" },
  { key: "postalCpm", label: "Postal CPM ($)", type: "number" },
  { key: "phoneCpm", label: "Phone CPM ($)", type: "number" },
  { key: "emailCpm", label: "Email CPM ($)", type: "number" },
  { key: "market", label: "Market", type: "text" },
  { key: "dataType", label: "Data type", type: "text" },
  { key: "source", label: "Source", type: "text" },
  { key: "geo", label: "Geo", type: "text" },
  { key: "cardQuality", label: "Card quality", type: "text" },
  { key: "popularity", label: "Popularity (1-100)", type: "number" },
  { key: "genderMale", label: "Gender % male", type: "number" },
  { key: "genderFemale", label: "Gender % female", type: "number" },
  { key: "minimumOrder", label: "Minimum order", type: "number" },
  { key: "minimumPrice", label: "Minimum price ($)", type: "number" },
  { key: "netNamePercent", label: "Net name %", type: "number" },
  { key: "brokerCommission", label: "Broker commission %", type: "number" },
  { key: "agencyCommission", label: "Agency commission %", type: "number" },
  { key: "exchangeAvailable", label: "Exchange available", type: "boolean" },
  { key: "reuseAvailable", label: "Reuse available", type: "boolean" },
  { key: "emailDeliveryFee", label: "Email delivery fee ($)", type: "number" },
  { key: "ftpDeliveryFee", label: "FTP delivery fee ($)", type: "number" },
  { key: "marketEntryDate", label: "Market entry date", type: "text" },
  { key: "lastUpdated", label: "Last updated", type: "text" },
  { key: "nextUpdateDate", label: "Next update date", type: "text" },
  { key: "frequency", label: "Update frequency", type: "text" },
  { key: "selects", label: "Selects (comma separated)", type: "csv", span: 3 },
  {
    key: "tags",
    label: "Tags / SEO keywords (comma separated)",
    type: "csv",
    span: 3,
  },
  { key: "description", label: "Public description", type: "textarea", span: 3 },
];

function toFormValue(raw: unknown, type: FieldDef["type"]): string {
  if (raw === null || raw === undefined) return "";
  if (type === "boolean") return raw === true ? "true" : raw === false ? "false" : "";
  if (type === "csv" && Array.isArray(raw)) return raw.join(", ");
  return String(raw);
}

function fromFormValue(raw: string, type: FieldDef["type"]): unknown {
  const trimmed = raw.trim();
  if (trimmed === "") return undefined;
  if (type === "number") {
    const n = Number(trimmed.replace(/[, $]/g, ""));
    return Number.isFinite(n) ? n : undefined;
  }
  if (type === "boolean") {
    if (trimmed === "true") return true;
    if (trimmed === "false") return false;
    return undefined;
  }
  if (type === "csv") {
    const parts = trimmed
      .split(/[\n,;|]/)
      .map((p) => p.trim())
      .filter(Boolean);
    return parts.length ? parts : undefined;
  }
  return trimmed;
}

const statusBadge = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};
const statusLabel = { pending: "Pending Review", approved: "Published", rejected: "Rejected" };

export default function ReviewForm({ submission }: { submission: ReviewSubmission }) {
  const router = useRouter();
  const [busy, setBusy] = useState<"save" | "publish" | "unpublish" | "delete" | null>(null);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  // Hydrate form state from parsedFields (single source of truth for the dataCard)
  const initialParsed: Record<string, string> = {};
  const parsed = submission.parsedFields || {};
  for (const f of PARSED_FIELDS) {
    // Fall back to the submission's top-level value when parsedFields hasn't set
    // a key — e.g. first review after upload, when the user filled in the upload
    // form but parser couldn't extract that field.
    const fallbackKey =
      f.key === "name"
        ? "title"
        : f.key === "description" || f.key === "category" || f.key === "universe"
        ? f.key
        : null;
    const fallback = fallbackKey
      ? (submission as unknown as Record<string, unknown>)[fallbackKey]
      : undefined;
    const value = parsed[f.key] !== undefined && parsed[f.key] !== null && parsed[f.key] !== ""
      ? parsed[f.key]
      : fallback;
    initialParsed[f.key] = toFormValue(value, f.type);
  }
  const [parsedVals, setParsedVals] = useState<Record<string, string>>(initialParsed);

  async function save(): Promise<boolean> {
    setMsg(null);
    setBusy("save");
    const parsedBody: Record<string, unknown> = {};
    for (const f of PARSED_FIELDS) {
      const v = fromFormValue(parsedVals[f.key], f.type);
      if (v !== undefined) parsedBody[f.key] = v;
    }
    // Also mirror the dataCard's name/description/category/universe to the
    // submission top-level fields so list views stay in sync.
    const topBody = {
      title: parsedBody.name,
      description: parsedBody.description,
      category: parsedBody.category,
      universe: parsedBody.universe,
    };
    try {
      const res = await fetch(`/api/datacards/submissions/${submission._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...topBody, parsedFields: parsedBody }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setMsg({ kind: "err", text: json.message || "Save failed" });
        return false;
      }
      setMsg({ kind: "ok", text: "Saved." });
      router.refresh();
      return true;
    } catch {
      setMsg({ kind: "err", text: "Network error" });
      return false;
    } finally {
      setBusy(null);
    }
  }

  async function publish() {
    setMsg(null);
    // Save edits first so the publish uses the latest values
    setBusy("publish");
    const ok = await save();
    if (!ok) {
      setBusy(null);
      return;
    }
    try {
      setBusy("publish");
      const res = await fetch(`/api/datacards/submissions/${submission._id}/publish`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setMsg({ kind: "err", text: json.message || "Publish failed" });
        return;
      }
      setMsg({ kind: "ok", text: "Published to /data-assets/data-cards." });
      router.refresh();
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    } finally {
      setBusy(null);
    }
  }

  async function unpublish() {
    if (
      !window.confirm(
        "Unpublish this data card?\n\nIt will be removed from /data-assets/data-cards and moved back to Pending so you can edit and re-publish."
      )
    ) {
      return;
    }
    setMsg(null);
    setBusy("unpublish");
    try {
      const res = await fetch(`/api/datacards/submissions/${submission._id}/unpublish`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setMsg({ kind: "err", text: json.message || "Unpublish failed" });
        return;
      }
      setMsg({ kind: "ok", text: "Unpublished." });
      router.refresh();
    } catch {
      setMsg({ kind: "err", text: "Network error" });
    } finally {
      setBusy(null);
    }
  }

  async function destroy() {
    if (
      !window.confirm(
        "Delete this submission?\n\nThe uploaded file is removed. If the data card was published, it will also be removed from the public site. This cannot be undone."
      )
    ) {
      return;
    }
    setMsg(null);
    setBusy("delete");
    try {
      const res = await fetch(`/api/datacards/submissions/${submission._id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setMsg({ kind: "err", text: json.message || "Delete failed" });
        setBusy(null);
        return;
      }
      router.push("/dashboard/submissions");
    } catch {
      setMsg({ kind: "err", text: "Network error" });
      setBusy(null);
    }
  }

  const isPublished = submission.status === "approved";
  const submittedAt = submission.submittedAt
    ? new Date(submission.submittedAt).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  return (
    <>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <Link
            href="/dashboard/submissions"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to submissions
          </Link>
          <h1 className="font-display font-bold text-3xl text-slate-900">
            Review &amp; Publish
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span
              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${statusBadge[submission.status]}`}
            >
              {statusLabel[submission.status]}
            </span>
            {submittedAt && <span className="text-sm text-slate-500">{submittedAt}</span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {submission.fileUrl && (
            <a
              href={submission.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-medium text-slate-700"
            >
              <Download className="w-4 h-4" />
              Download .{submission.fileType || "file"}
            </a>
          )}
          {isPublished && submission.publishedDataCard?.name && (
            <Link
              href={`/data-assets/data-cards/${(submission.publishedDataCard.name || "")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")}`}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-sm font-semibold text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
              View on public site
            </Link>
          )}
        </div>
      </div>

      {msg && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            msg.kind === "ok"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {msg.text}
        </div>
      )}

      {!!submission.parseWarnings?.length && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <div className="font-semibold mb-1">Parser notes:</div>
          <ul className="list-disc list-inside space-y-0.5">
            {submission.parseWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
        <h2 className="font-display font-semibold text-lg text-slate-900 mb-1">
          Data card fields
        </h2>
        <p className="text-sm text-slate-600 mb-5">
          These exact values become the public data card on
          <code className="text-blue-700"> /data-assets/data-cards</code>. Correct anything
          wrong, then click <strong>Verify &amp; Publish</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PARSED_FIELDS.map((f) => (
            <FieldInput
              key={`parsed-${f.key}`}
              field={f}
              value={parsedVals[f.key] || ""}
              onChange={(v) => setParsedVals((s) => ({ ...s, [f.key]: v }))}
            />
          ))}
        </div>
      </section>

      <div className="sticky bottom-0 -mx-4 lg:mx-0 bg-white border-t border-slate-200 lg:border lg:rounded-2xl shadow-md px-4 lg:px-6 py-4 flex flex-wrap gap-3 items-center justify-end">
        <button
          type="button"
          onClick={destroy}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-red-200 text-red-700 hover:bg-red-50 text-sm font-semibold transition-colors disabled:opacity-60 mr-auto"
        >
          <Trash2 className="w-4 h-4" />
          {busy === "delete" ? "Deleting…" : "Delete submission"}
        </button>

        {isPublished && (
          <button
            type="button"
            onClick={unpublish}
            disabled={busy !== null}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-700 hover:bg-amber-50 text-sm font-semibold transition-colors disabled:opacity-60"
          >
            {busy === "unpublish" ? "Unpublishing…" : "Unpublish"}
          </button>
        )}

        <button
          type="button"
          onClick={save}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700 transition-colors disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          {busy === "save" ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={publish}
          disabled={busy !== null}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:-translate-y-0.5 transition-all text-sm font-semibold shadow-brand disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          <Check className="w-4 h-4" />
          {isPublished
            ? busy === "publish"
              ? "Re-publishing…"
              : "Save & Re-publish"
            : busy === "publish"
            ? "Publishing…"
            : "Verify & Publish"}
        </button>
      </div>
    </>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const colSpan =
    field.span === 3
      ? "md:col-span-3"
      : field.span === 2
      ? "md:col-span-2"
      : "";
  const inputCls =
    "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 text-sm";

  return (
    <div className={colSpan}>
      <label className="block text-[12px] font-semibold text-slate-700 mb-1.5">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={`${inputCls} resize-none`}
        />
      ) : field.type === "select" && field.options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="">—</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.type === "boolean" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="">—</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      ) : (
        <input
          type={field.type === "number" ? "number" : "text"}
          step={field.type === "number" ? "any" : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );
}
