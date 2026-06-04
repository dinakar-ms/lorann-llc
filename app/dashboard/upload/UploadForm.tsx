"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check, FileSpreadsheet } from "lucide-react";

const ACCEPTED = ".xlsx,.xls,.csv,.docx,.doc,.pdf,.rtf";
const MAX_BYTES = 25 * 1024 * 1024;

export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: string; title: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please choose a file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("File too large. Maximum is 25 MB.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    fd.set("file", file);

    setSubmitting(true);
    try {
      const res = await fetch("/api/datacards/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json.message || "Upload failed.");
        return;
      }
      setSuccess({ id: json.id, title: json.title });
      // Take the user to the Review & Publish page immediately
      setTimeout(() => router.push(`/dashboard/submissions/${json.id}`), 1200);
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 grid place-items-center">
          <Check className="w-7 h-7 text-green-600" strokeWidth={2.5} />
        </div>
        <h3 className="font-display font-bold text-xl text-slate-900 mb-2">
          Upload received
        </h3>
        <p className="text-slate-600">
          Taking you to the Review &amp; Publish page for &ldquo;{success.title}&rdquo;…
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-5"
    >
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 text-red-800 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
          Data Card Title *
        </label>
        <input
          type="text"
          name="title"
          required
          minLength={2}
          placeholder="e.g. US Auto Enthusiasts — Q1 2026"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">Category</label>
          <select
            name="category"
            defaultValue="other"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          >
            <option value="b2b">B2B Database</option>
            <option value="b2c">B2C Database</option>
            <option value="signal-exchange">Signal eXchange™</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            Universe (record count)
          </label>
          <input
            type="number"
            name="universe"
            min={0}
            placeholder="e.g. 250000"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">Description</label>
        <textarea
          name="description"
          rows={3}
          placeholder="What's in this data card? Targeting attributes, source, refresh cadence…"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 resize-none"
        />
      </div>

      <div>
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
          Data Card File *
        </label>
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50/30 rounded-xl py-10 px-6 cursor-pointer transition-colors"
        >
          <FileSpreadsheet className="w-8 h-8 text-slate-400" />
          <div className="text-sm font-medium text-slate-700">
            {file ? file.name : "Click to choose a file"}
          </div>
          <div className="text-xs text-slate-500">
            {file
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : "Accepts .xlsx, .xls, .csv, .docx, .doc, .pdf, .rtf"}
          </div>
          <input
            id="file-input"
            type="file"
            name="file"
            accept={ACCEPTED}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting || !file}
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-brand hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        <Upload className="w-4 h-4" />
        {submitting ? "Uploading…" : "Submit for Review"}
      </button>
    </form>
  );
}
