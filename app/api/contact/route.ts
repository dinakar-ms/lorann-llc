import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PRIMARY_ADMIN = "info@lorannllc.com";
// const SECONDARY_ADMIN = "chippy@sagaciousinfosystems.com";
const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "info@lorannllc.com";
const FROM_NAME = process.env.SMTP_FROM_NAME || "Lorann LLC Website";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): { valid: boolean; reason?: string } {
  if (/[a-zA-Z]/.test(phone)) return { valid: false, reason: "Phone number cannot contain letters" };
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length < 7) return { valid: false, reason: "Phone number must have at least 7 digits" };
  if (cleaned.length > 15) return { valid: false, reason: "Phone number is too long" };
  if (/^0+$/.test(cleaned)) return { valid: false, reason: "Please enter a valid phone number" };
  if (/^(\d)\1+$/.test(cleaned)) return { valid: false, reason: "Please enter a valid phone number" };
  return { valid: true };
}

async function verifyRecaptcha(token: string, remoteip?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn("RECAPTCHA_SECRET_KEY not set — skipping verification");
    return true;
  }
  const params = new URLSearchParams({ secret, response: token });
  if (remoteip) params.set("remoteip", remoteip);
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const json = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!json.success) {
      console.error("reCAPTCHA failed:", json["error-codes"]);
    }
    return json.success === true;
  } catch (err) {
    console.error("reCAPTCHA verification error:", err);
    return false;
  }
}

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "UNKNOWN";
}

function buildAdminHtml(d: Record<string, string>): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>New Contact Form Submission</title></head>
<body style="font-family:Arial,sans-serif;font-size:13px;line-height:1.4;color:#333;margin:0;padding:15px;background:#f5f5f5;">
  <div style="max-width:700px;margin:0 auto;background:#fff;padding:20px;border:1px solid #ddd;border-radius:5px;">
    <div style="background:#0073aa;color:#fff;padding:15px;text-align:center;border-radius:5px 5px 0 0;margin:-20px -20px 20px -20px;">
      <h1 style="margin:0;font-size:18px;">New Contact Form Submission - Lorann LLC</h1>
    </div>
    <div style="background:#e8f4ff;padding:10px;margin:15px 0;text-align:center;font-weight:bold;border-radius:4px;">
      Reference: ${escapeHtml(d.referenceId)} | Submitted: ${escapeHtml(d.submittedAt)}
    </div>
    <h3 style="color:#0073aa;border-bottom:2px solid #0073aa;padding-bottom:5px;">Contact Information</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;width:140px;">Full Name</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.name)}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Email</th><td style="padding:8px;border:1px solid #ccc;"><a href="mailto:${escapeHtml(d.email)}" style="color:#0073aa;">${escapeHtml(d.email)}</a></td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Phone</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.phone || "Not provided")}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Company</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.company || "—")}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Interest</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.interest)}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Source Page</th><td style="padding:8px;border:1px solid #ccc;"><a href="${escapeHtml(d.sourceUrl)}" style="color:#0073aa;word-break:break-all;">${escapeHtml(d.sourceUrl)}</a></td></tr>
    </table>
    <h3 style="color:#0073aa;border-bottom:2px solid #0073aa;padding-bottom:5px;">Message</h3>
    <div style="background:#f8f9fa;padding:15px;border-left:4px solid #0073aa;line-height:1.5;">${nl2br(d.message)}</div>
    <h3 style="color:#0073aa;border-bottom:2px solid #0073aa;padding-bottom:5px;">Location</h3>
    <table style="width:100%;border-collapse:collapse;">
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;width:140px;">IP Address</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.ipAddress)}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">Country</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.country)} (${escapeHtml(d.countryCode)})</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">State</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.state)}</td></tr>
      <tr><th style="background:#e9e9e9;text-align:left;padding:8px;border:1px solid #ccc;">City</th><td style="padding:8px;border:1px solid #ccc;">${escapeHtml(d.city)}</td></tr>
    </table>
    <div style="text-align:center;margin:20px 0;">
      <a href="mailto:${escapeHtml(d.email)}?subject=Re:%20${encodeURIComponent(d.interest)}" style="display:inline-block;background:#0073aa;color:#fff;padding:8px 15px;margin:0 5px;text-decoration:none;border-radius:4px;">Reply to ${escapeHtml(d.name)}</a>
      ${d.phone ? `<a href="tel:${d.phone.replace(/[^0-9]/g, "")}" style="display:inline-block;background:#0073aa;color:#fff;padding:8px 15px;margin:0 5px;text-decoration:none;border-radius:4px;">Call Customer</a>` : ""}
    </div>
    <div style="margin-top:20px;padding-top:15px;border-top:1px solid #ddd;font-size:12px;color:#666;text-align:center;">
      <p>This email was automatically generated from the contact form on lorannllc.com</p>
      <p>© ${new Date().getFullYear()} Lorann LLC. All rights reserved.</p>
    </div>
  </div>
</body></html>`;
}

function buildUserHtml(d: Record<string, string>): string {
  const preview = d.message.length > 300 ? d.message.slice(0, 300) + "..." : d.message;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Thank You for Contacting Lorann LLC</title></head>
<body style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#333;margin:0;padding:20px;background:#f5f5f5;">
  <div style="max-width:600px;margin:0 auto;background:#fff;padding:25px;border:1px solid #ddd;border-radius:5px;">
    <div style="background:#0073aa;color:#fff;padding:20px;text-align:center;border-radius:5px 5px 0 0;margin:-25px -25px 25px -25px;">
      <h1 style="margin:0;font-size:22px;">Thank You for Contacting Lorann LLC!</h1>
    </div>
    <p><strong>Dear ${escapeHtml(d.name)},</strong></p>
    <div style="background:#e8f4ff;padding:15px;margin:15px 0;border-left:4px solid #0073aa;border-radius:4px;">
      <p style="margin:0;font-size:15px;"><strong>&#10003; Your message has been successfully received!</strong></p>
    </div>
    <div style="background:#f0f0f0;padding:12px;margin:15px 0;text-align:center;font-family:monospace;font-size:15px;font-weight:bold;border-radius:4px;">
      Reference Number: ${escapeHtml(d.referenceId)}
    </div>
    <p><strong>Your Message Summary:</strong></p>
    <p><strong>Interested in:</strong> ${escapeHtml(d.interest)}</p>
    <p><strong>Message:</strong> ${nl2br(preview)}</p>
    <div style="margin:20px 0;padding:15px;background:#f9f9f9;border-radius:4px;border-top:3px solid #ddd;">
      <p style="margin:0 0 10px 0;font-size:15px;"><strong>Need Immediate Assistance?</strong></p>
      <p style="margin:5px 0;"><strong>Email:</strong> <a href="mailto:info@lorannllc.com" style="color:#0073aa;">info@lorannllc.com</a></p>
      <p style="margin:5px 0;"><strong>Phone:</strong> <a href="tel:+19145655300" style="color:#0073aa;">+1 914-565-5300</a></p>
    </div>
    <p><strong>Best regards,</strong><br><strong>The Lorann LLC Team</strong></p>
    <div style="margin-top:20px;padding-top:15px;border-top:1px solid #ddd;font-size:12px;color:#666;text-align:center;">
      <p>© ${new Date().getFullYear()} Lorann LLC. All rights reserved.</p>
      <p>This email was sent to ${escapeHtml(d.email)} as a confirmation of your contact form submission.</p>
    </div>
  </div>
</body></html>`;
}

function makeTransport() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) {
    throw new Error("SMTP configuration missing (SMTP_HOST / SMTP_USER / SMTP_PASSWORD)");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const company = (body.company || "").trim();
  const interest = (body.interest || "Website Contact Form").trim();
  const message = (body.message || "").trim();
  const country = (body.country || "").trim();
  const countryCode = (body.country_code || "").trim();
  const state = (body.state || "").trim();
  const city = (body.city || "").trim();
  const sourceUrl = (body.source_url || req.headers.get("referer") || "").trim();
  const recaptchaToken = body["g-recaptcha-response"] || "";
  const ipAddress = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "";

  // Validation
  const errors: string[] = [];
  if (!name || name.length < 2) errors.push("Please enter your full name (minimum 2 characters).");
  if (!email || !isValidEmail(email)) errors.push("Please enter a valid email address.");
  if (!phone) errors.push("Phone number is required.");
  else {
    const pv = isValidPhone(phone);
    if (!pv.valid) errors.push(pv.reason!);
  }
  if (!message || message.length < 10) errors.push("Please enter a message (minimum 10 characters).");
  if (errors.length) {
    return NextResponse.json({ success: false, message: errors.join(" ") }, { status: 400 });
  }

  // reCAPTCHA
  if (!recaptchaToken) {
    return NextResponse.json(
      { success: false, message: "Please complete the reCAPTCHA verification." },
      { status: 400 }
    );
  }
  const captchaOk = await verifyRecaptcha(recaptchaToken, ipAddress);
  if (!captchaOk) {
    return NextResponse.json(
      { success: false, message: "reCAPTCHA verification failed. Please try again." },
      { status: 400 }
    );
  }

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const referenceId = `LORANN-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}-${Math.floor(100 + Math.random() * 900)}`;
  const submittedAt = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const emailData = {
    name,
    email,
    phone,
    company,
    interest,
    message,
    country,
    countryCode,
    state,
    city,
    ipAddress,
    sourceUrl,
    referenceId,
    submittedAt,
  };

  // Send emails
  let emailsSent = 0;
  const emailErrors: string[] = [];
  try {
    const transporter = makeTransport();
    const adminSubject = `New Contact Form Submission - ${interest} [Ref: ${referenceId}]`;
    const adminHtml = buildAdminHtml(emailData);
    const userSubject = `Thank You for Contacting Lorann LLC - ${referenceId}`;
    const userHtml = buildUserHtml(emailData);

    const recipients = [
      { label: "admin-primary", to: PRIMARY_ADMIN, subject: adminSubject, html: adminHtml, replyTo: `"${name}" <${email}>` as string | undefined },
      { label: "user-confirmation", to: email, subject: userSubject, html: userHtml, replyTo: undefined as string | undefined },
    ];

    const results = await Promise.allSettled(
      recipients.map((r) =>
        transporter.sendMail({
          from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
          to: r.to,
          replyTo: r.replyTo,
          subject: r.subject,
          html: r.html,
        })
      )
    );
    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        emailsSent++;
      } else {
        const reason = r.reason as { code?: string; response?: string; message?: string };
        const msg = `${recipients[i].label}: ${reason?.code || ""} ${reason?.response || reason?.message || String(reason)}`.trim();
        emailErrors.push(msg);
        console.error(`Email ${recipients[i].label} failed:`, r.reason);
      }
    });
  } catch (err) {
    const e = err as { code?: string; message?: string };
    const msg = `transport-init: ${e?.code || ""} ${e?.message || String(err)}`.trim();
    emailErrors.push(msg);
    console.error("Email transport error:", err);
  }

  // Persist to Sanity
  let saved = false;
  let saveError: string | null = null;
  try {
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      saveError = "SANITY_API_WRITE_TOKEN not set";
      console.warn(saveError);
    } else {
      await sanityWriteClient.create({
        _type: "contactSubmission",
        referenceId,
        name,
        email,
        phone,
        company,
        interest,
        message,
        country,
        countryCode,
        state,
        city,
        ipAddress,
        sourceUrl,
        userAgent,
        status: "unread",
        submittedAt: now.toISOString(),
      });
      saved = true;
    }
  } catch (err) {
    const e = err as { statusCode?: number; message?: string };
    saveError = `${e?.statusCode ? `HTTP ${e.statusCode}: ` : ""}${e?.message || String(err)}`;
    console.error("Sanity save error:", err);
  }

  const debug = process.env.NODE_ENV !== "production";

  if (emailsSent === 0 && !saved) {
    return NextResponse.json(
      {
        success: false,
        message: debug
          ? `Submission failed. Email errors: [${emailErrors.join(" | ") || "none"}]. Sanity error: ${saveError || "none"}.`
          : "Sorry, there was an error processing your request. Please email info@lorannllc.com directly.",
        ...(debug && { emailErrors, saveError }),
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    referenceId,
    saved,
    emailsSent,
    ...(debug && emailErrors.length > 0 && { emailErrors }),
    ...(debug && saveError && { saveError }),
    message: `Thank you! Your message has been received. Reference: ${referenceId}.${
      emailsSent > 0 ? " A confirmation email has been sent to you." : " We will get back to you soon."
    }`,
  });
}
