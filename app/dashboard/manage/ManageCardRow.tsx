"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Trash2 } from "lucide-react";
import type { ManageCard } from "./page";

function toSlug(name?: string): string {
  return (name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ManageCardRow({ card }: { card: ManageCard }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);

  async function onDelete() {
    if (
      !window.confirm(
        `Delete data card "${card.name || "(untitled)"}"?\n\nThis removes it from /data-assets/data-cards. ${
          card.hasSubmission
            ? "The linked submission will be reset to Pending."
            : "No submission is linked — safe to delete."
        }`
      )
    ) {
      return;
    }
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/datacards/${card._id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setErr(json.message || "Delete failed");
        setBusy(false);
        return;
      }
      // Optimistic: hide the row immediately so the user sees instant feedback.
      // router.refresh() syncs the rest of the page state with the server.
      setRemoved(true);
      router.refresh();
    } catch {
      setErr("Network error");
      setBusy(false);
    }
  }

  if (removed) return null;

  const slug = toSlug(card.name);

  return (
    <tr className={`hover:bg-slate-50/50 ${!card.hasSubmission ? "bg-amber-50/40" : ""}`}>
      <td className="px-5 py-4">
        <div className="font-semibold text-slate-900">{card.name || "(untitled)"}</div>
        {!card.hasSubmission && (
          <div className="text-[11px] uppercase tracking-wider text-amber-700 font-semibold mt-0.5">
            No submission linked
          </div>
        )}
        {err && <div className="text-xs text-red-700 mt-1">{err}</div>}
      </td>
      <td className="px-5 py-4 text-slate-600">{card.category || "—"}</td>
      <td className="px-5 py-4 text-slate-600">
        {typeof card.universe === "number" ? card.universe.toLocaleString() : "—"}
      </td>
      <td className="px-5 py-4 text-slate-600">
        {card.lastUpdated
          ? new Date(card.lastUpdated).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—"}
      </td>
      <td className="px-5 py-4 text-right">
        <div className="inline-flex items-center gap-2">
          {slug && (
            <Link
              href={`/data-assets/data-cards/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View
            </Link>
          )}
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-red-200 text-red-700 hover:bg-red-50 text-xs font-semibold transition-colors disabled:opacity-60"
          >
            <Trash2 className="w-3 h-3" />
            {busy ? "Deleting…" : "Delete"}
          </button>
        </div>
      </td>
    </tr>
  );
}
