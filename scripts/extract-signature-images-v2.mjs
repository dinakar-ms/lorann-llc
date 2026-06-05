/**
 * v2 — Proper unique-image extraction.
 * Identifies each image by its context (alt text, href, dimensions)
 * so every image gets the correct filename.
 *
 * Run: node scripts/extract-signature-images-v2.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SIG_DIR = join(ROOT, "public", "email_signature");
const IMG_DIR = join(SIG_DIR, "img");
const PEOPLE_DIR = join(IMG_DIR, "people");
const BASE_URL = "https://www.lorannllc.com/email_signature/img";

[IMG_DIR, PEOPLE_DIR].forEach((d) => { if (!existsSync(d)) mkdirSync(d, { recursive: true }); });

const PERSON_MAP = {
  "michael-connolly-signature.html": "michael-connolly",
  "paul-gerardi-signature.html":     "paul-gerardi",
  "fred-onemma-signature.html":      "fred-onemma",
  "joanne-iadarola-signature.html":  "joanne-iadarola",
  "bill-woods-signature.html":       "bill-woods",
  "caryn-trazi-signature.html":      "caryn-trazi",
};

// Global map: base64-hash → { filename, url } so shared images (logo, icons)
// are only saved once and reused across all 6 signatures.
const HASH_MAP = new Map();

// Full regex: captures the surrounding <img> tag context + the data URI
// Group 1 = alt text, Group 2 = width, Group 3 = height
// Group 4 = full data URI (what we replace), Group 5 = mime, Group 6 = base64
const IMG_RE = /<img([^>]*)src="(data:image\/(png|jpeg|jpg|gif|webp);base64,([^"]+))"([^>]*)\/>/gi;

// Pull an attribute value out of an attribute string
function attr(attrs, name) {
  const m = attrs.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : "";
}

// Guess a semantic name from the surrounding HTML context
function guessName(beforeAttrs, afterAttrs, allAttrs, personSlug, imgIndex) {
  const altText = attr(allAttrs, "alt").toLowerCase();
  const width   = parseInt(attr(allAttrs, "width") || "0");
  const height  = parseInt(attr(allAttrs, "height") || "0");

  // First image is always the person photo
  if (imgIndex === 0) return { name: personSlug, folder: "people" };

  // LinkedIn badge / button (typically ~117×26 or 20×20 or alt contains "linkedin")
  if (altText.includes("linkedin")) return { name: "linkedin-icon",  folder: "" };
  if (altText.includes("twitter") || altText.includes("x.com")) return { name: "twitter-icon", folder: "" };
  if (altText.includes("facebook")) return { name: "facebook-icon",  folder: "" };
  if (altText.includes("instagram")) return { name: "instagram-icon",folder: "" };

  // Lorann / company logo (has "lorann" in alt, or tall brand image)
  if (altText.includes("lorann") || altText.includes("logo")) return { name: "lorann-logo", folder: "" };

  // Divider / accent bar (very short height, wide width)
  if (height <= 8 && width > 50)   return { name: `divider-bar`,    folder: "" };

  // Small square icons (phone, email, location, etc.)
  if (width <= 20 && height <= 20) return { name: `icon-${imgIndex}`, folder: "" };

  // Fallback
  return { name: `signature-img-${imgIndex}`, folder: "" };
}

const results = [];

for (const [file, personSlug] of Object.entries(PERSON_MAP)) {
  const htmlPath = join(SIG_DIR, file);
  let html = readFileSync(htmlPath, "utf8");
  const origSize = readFileSync(htmlPath).length;
  console.log(`\n─── ${file} (${Math.round(origSize / 1024)} KB)`);

  let imgIndex = 0;
  const replacements = [];

  // Reset the regex
  IMG_RE.lastIndex = 0;

  // We need to find the href context around each image to help naming
  // Strategy: find all img tags with data: URIs, plus their surrounding context
  const dataUriRegex = /<img([^>]*)src="(data:image\/(png|jpeg|jpg|gif|webp);base64,([^"]+))"([^>]*)\/>/gi;
  let match;

  while ((match = dataUriRegex.exec(html)) !== null) {
    const beforeAttrs = match[1];      // attrs before src=
    const fullDataUri = match[2];      // full data:image/... string
    const mimeType    = match[3];      // png, jpeg, etc.
    const base64Data  = match[4];      // the actual base64 payload
    const afterAttrs  = match[5];      // attrs after the data URI src
    const allAttrs    = beforeAttrs + afterAttrs;
    const ext         = (mimeType === "jpeg" || mimeType === "jpg") ? "jpg" : "png";

    // Hash to detect same image across different files
    const hash = createHash("md5").update(base64Data.slice(0, 200)).digest("hex").slice(0, 8);

    let filename, urlPath;

    if (HASH_MAP.has(hash)) {
      // Reuse already-saved image
      ({ filename, urlPath } = HASH_MAP.get(hash));
      console.log(`  ↩ Reuse: ${filename} [${hash}]`);
    } else {
      const { name, folder } = guessName(beforeAttrs, afterAttrs, allAttrs, personSlug, imgIndex);
      filename = `${name}.${ext}`;
      const destDir = folder ? join(IMG_DIR, folder) : IMG_DIR;
      if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

      let destFilename = filename;
      // Avoid collision with non-same-content files
      let counter = 1;
      while (existsSync(join(destDir, destFilename)) && !HASH_MAP.has(hash)) {
        destFilename = `${name}-${counter}.${ext}`;
        counter++;
      }
      filename = destFilename;

      const destPath = join(destDir, filename);
      writeFileSync(destPath, Buffer.from(base64Data, "base64"));
      urlPath = folder ? `${BASE_URL}/${folder}/${filename}` : `${BASE_URL}/${filename}`;
      HASH_MAP.set(hash, { filename, urlPath });
      console.log(`  ✓ Saved: ${folder ? folder + "/" : ""}${filename}  (${allAttrs.trim().substring(0, 60)})`);
    }

    // Mark for replacement (can't replace during regex exec)
    replacements.push({
      original: `src="${fullDataUri}"`,
      replacement: `src="${urlPath}"`,
    });

    imgIndex++;
  }

  // Apply replacements (reverse order to preserve indices)
  for (const { original, replacement } of replacements) {
    html = html.replaceAll(original, replacement);
  }

  writeFileSync(htmlPath, html, "utf8");
  const newSize = Buffer.byteLength(html, "utf8");
  console.log(`  ✓ HTML rewritten: ${Math.round(newSize / 1024)} KB`);
  results.push({ file, imgCount: imgIndex, origKB: Math.round(origSize / 1024), newKB: Math.round(newSize / 1024) });
}

console.log("\n\n══════════════════════════════════════════");
console.log("DONE — All 6 signatures updated");
console.log("══════════════════════════════════════════\n");
results.forEach((r) => {
  console.log(`  ${r.file}: ${r.imgCount} imgs  ${r.origKB} KB → ${r.newKB} KB`);
});

console.log("\n📁 Shared images in: public/email_signature/img/");
console.log("👤 Person photos in: public/email_signature/img/people/");
console.log("\nOnce deployed, verify each signature in a browser:");
Object.values(PERSON_MAP).forEach((p) => {
  console.log(`  https://www.lorannllc.com/email_signature/${p}-signature.html`);
});

// Write the PowerShell deploy script
const psScript = `# ══════════════════════════════════════════════════════════════
# Lorann LLC — Exchange Online Email Signature Rules
# ══════════════════════════════════════════════════════════════
#
# Prerequisites:
#   Install-Module -Name ExchangeOnlineManagement -Force
#
# To run:
#   1. Open PowerShell as Administrator
#   2. Set the \\$sigDir variable to the folder containing the 6 HTML files
#   3. Run this script
# ══════════════════════════════════════════════════════════════

Import-Module ExchangeOnlineManagement
Connect-ExchangeOnline -UserPrincipalName admin@lorannllc.com

# Path to the folder with the 6 signature HTML files
\\$sigDir = "C:\\sigs"   # ← CHANGE THIS to your actual folder path

\\$people = @(
  @{ Name="Michael Connolly"; Email="michael@lorannllc.com"; HtmlFile="\\$sigDir\\michael-connolly-signature.html" },
  @{ Name="Paul Gerardi";     Email="paul@lorannllc.com";    HtmlFile="\\$sigDir\\paul-gerardi-signature.html" },
  @{ Name="Fred Onemma";      Email="fred@lorannllc.com";    HtmlFile="\\$sigDir\\fred-onemma-signature.html" },
  @{ Name="Joanne Iadarola";  Email="joanne@lorannllc.com";  HtmlFile="\\$sigDir\\joanne-iadarola-signature.html" },
  @{ Name="Bill Woods";       Email="bill@lorannllc.com";    HtmlFile="\\$sigDir\\bill-woods-signature.html" },
  @{ Name="Caryn Trazi";      Email="caryn@lorannllc.com";   HtmlFile="\\$sigDir\\caryn-trazi-signature.html" }
)

foreach (\\$p in \\$people) {
  \\$html = Get-Content -Path \\$p.HtmlFile -Raw
  \\$ruleName = "Email Signature - " + \\$p.Name

  # Remove existing rule if present (safe to re-run for updates)
  if (Get-TransportRule -Identity \\$ruleName -ErrorAction SilentlyContinue) {
    Remove-TransportRule -Identity \\$ruleName -Confirm:\\$false
    Write-Host "  Removed old rule: \\$ruleName" -ForegroundColor Yellow
  }

  New-TransportRule -Name \\$ruleName \`
    -From \\$p.Email \`
    -ApplyHtmlDisclaimerText \\$html \`
    -ApplyHtmlDisclaimerLocation Append \`
    -ApplyHtmlDisclaimerFallbackAction Wrap

  Write-Host "  Created: \\$ruleName" -ForegroundColor Green
}

Write-Host ""
Write-Host "All 6 signature rules deployed to Exchange Online." -ForegroundColor Cyan
`;

writeFileSync(join(ROOT, "scripts", "deploy-email-signatures.ps1"), psScript, "utf8");
console.log("\n📄 PowerShell script saved: scripts/deploy-email-signatures.ps1");
