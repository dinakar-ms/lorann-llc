import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same pattern as the /api/contact route — mirror every submission into
// Sanity so admins can review popup leads in Studio alongside contact
// form entries. Falls back gracefully if SANITY_API_WRITE_TOKEN isn't set
// (emails still send; save just logs a warning).
const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "UNKNOWN";
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildAdminHtml(name: string, email: string, company: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;font-size:14px;color:#333;background:#f5f5f5;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);">
    <div style="background:linear-gradient(135deg,#1D45D9,#00A7EF);padding:24px;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:20px;">🎯 New Popup Lead — Lorann LLC</h1>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><th style="background:#f0f4ff;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;width:130px;color:#1D45D9;">Name</th>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;">${escapeHtml(name)}</td></tr>
        <tr><th style="background:#f0f4ff;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;color:#1D45D9;">Email</th>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><th style="background:#f0f4ff;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;color:#1D45D9;">Company</th>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;">${escapeHtml(company || "—")}</td></tr>
        <tr><th style="background:#f0f4ff;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;color:#1D45D9;">Source</th>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;">Popup (Free Sample Request)</td></tr>
        <tr><th style="background:#f0f4ff;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;color:#1D45D9;">Time</th>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;">${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</td></tr>
      </table>
      <div style="margin-top:20px;text-align:center;">
        <a href="mailto:${escapeHtml(email)}?subject=Your%20Free%20Lorann%20Data%20Sample"
           style="display:inline-block;background:linear-gradient(135deg,#1D45D9,#00A7EF);color:#fff;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:bold;">
          Reply to ${escapeHtml(name)}
        </a>
      </div>
    </div>
    <div style="padding:16px;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;">
      © ${new Date().getFullYear()} Lorann LLC · Generated from site popup
    </div>
  </div>
</body></html>`;
}

function buildUserHtml(name: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;font-size:14px;color:#333;background:#f5f5f5;padding:20px;">
  <div style="max-width:580px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1);">
    <div style="background:linear-gradient(135deg,#1D45D9,#00A7EF);padding:28px;text-align:center;">
      <img src="https://www.lorannllc.com/lorann-logo2.png" alt="Lorann" style="height:36px;margin-bottom:12px;" />
      <h1 style="margin:0;color:#fff;font-size:22px;">Your Free Sample Is On Its Way!</h1>
    </div>
    <div style="padding:28px;">
      <p>Hi <strong>${escapeHtml(name)}</strong>,</p>
      <p>Thanks for reaching out — our data team has received your request and will send your <strong>free verified data sample</strong> along with an instant record count within <strong>1 business day</strong>.</p>
      <div style="background:#f0f4ff;border-left:4px solid #1D45D9;padding:14px 16px;margin:20px 0;border-radius:4px;">
        <p style="margin:0;font-weight:bold;color:#1D45D9;">What to expect:</p>
        <ul style="margin:8px 0 0 0;padding-left:18px;color:#555;">
          <li>A verified sample from your target segment</li>
          <li>Instant record count with segmentation breakdown</li>
          <li>Pricing tailored to your volume</li>
        </ul>
      </div>
      <p>Questions? Reply to this email or call us at <a href="tel:+19145655300" style="color:#1D45D9;">+1 914-565-5300</a>.</p>
      <p style="margin-top:24px;">Best regards,<br><strong>The Lorann Data Team</strong></p>
    </div>
    <div style="padding:16px;text-align:center;font-size:11px;color:#999;border-top:1px solid #eee;">
      © ${new Date().getFullYear()} Lorann LLC · 382 NE 191st St, Miami FL 33179
    </div>
  </div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  let body: { name?: string; email?: string; company?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ success: false, message: "Invalid request." }, { status: 400 });
  }

  const name    = (body.name    || "").trim();
  const email   = (body.email   || "").trim();
  const company = (body.company || "").trim();

  if (!name || name.length < 2)   return NextResponse.json({ success: false, message: "Please enter your name." }, { status: 400 });
  if (!email || !isValidEmail(email)) return NextResponse.json({ success: false, message: "Please enter a valid email." }, { status: 400 });

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const referenceId = `LORANN-POPUP-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}-${Math.floor(100 + Math.random() * 900)}`;
  const referer = req.headers.get("referer") || "";
  const userAgent = req.headers.get("user-agent") || "";
  const ipAddress = getClientIp(req);

  // Persist to Sanity — best-effort. If the write fails, still send
  // emails and return success so the user doesn't see a broken form.
  try {
    if (process.env.SANITY_API_WRITE_TOKEN) {
      await sanityWriteClient.create({
        _type: "popupLeadSubmission",
        referenceId,
        name,
        email,
        company,
        sourceUrl: referer,
        referer,
        ipAddress,
        userAgent,
        status: "unread",
        submittedAt: now.toISOString(),
      });
    } else {
      console.warn("SANITY_API_WRITE_TOKEN not set — skipping popup lead persist");
    }
  } catch (err) {
    console.error("Popup lead Sanity save error:", err);
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
      await Promise.allSettled([
        transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME || "Lorann LLC"}" <${process.env.SMTP_FROM_EMAIL || user}>`,
          to: "info@lorannllc.com",
          replyTo: `"${name}" <${email}>`,
          subject: `🎯 New Popup Lead: ${name} — Free Sample Request`,
          html: buildAdminHtml(name, email, company),
        }),
        transporter.sendMail({
          from: `"${process.env.SMTP_FROM_NAME || "Lorann LLC"}" <${process.env.SMTP_FROM_EMAIL || user}>`,
          to: email,
          subject: "Your Free Lorann Data Sample — We're On It!",
          html: buildUserHtml(name),
        }),
      ]);
    } catch (err) {
      console.error("Popup lead email error:", err);
    }
  }

  return NextResponse.json({ success: true });
}
