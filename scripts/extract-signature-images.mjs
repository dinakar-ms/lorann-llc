/**
 * Extracts base64 images from all 6 email signature HTML files,
 * saves them as real PNG/JPG files, and rewrites the HTML
 * to reference hosted https:// URLs instead of data URIs.
 *
 * Run: node scripts/extract-signature-images.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SIG_DIR = join(ROOT, "public", "email_signature");
const IMG_DIR = join(SIG_DIR, "img");
const BASE_URL = "https://www.lorannllc.com/email_signature/img";

// Make img directory
if (!existsSync(IMG_DIR)) mkdirSync(IMG_DIR, { recursive: true });
if (!existsSync(join(IMG_DIR, "people"))) mkdirSync(join(IMG_DIR, "people"), { recursive: true });

// Known person → filename mapping (logo is shared)
const PERSON_MAP = {
  "michael-connolly-signature.html": "michael-connolly",
  "paul-gerardi-signature.html":     "paul-gerardi",
  "fred-onemma-signature.html":      "fred-onemma",
  "joanne-iadarola-signature.html":  "joanne-iadarola",
  "bill-woods-signature.html":       "bill-woods",
  "caryn-trazi-signature.html":      "caryn-trazi",
};

// Logo is the same across all signatures — save once
let logoSaved = false;
let logoFilename = "lorann-logo.png";

const files = Object.keys(PERSON_MAP);
const results = [];

for (const file of files) {
  const personSlug = PERSON_MAP[file];
  const htmlPath = join(SIG_DIR, file);
  let html = readFileSync(htmlPath, "utf8");

  console.log(`\n─── Processing: ${file} (${Math.round(readFileSync(htmlPath).length / 1024)} KB)`);

  let imgIndex = 0;
  const replacements = [];

  // Find all src="data:image/..." occurrences
  const dataUriRegex = /src="(data:image\/(png|jpeg|jpg|gif|webp);base64,([^"]+))"/gi;
  let match;

  while ((match = dataUriRegex.exec(html)) !== null) {
    const fullDataUri = match[1];
    const mimeType = match[2].toLowerCase();
    const base64Data = match[3];
    const ext = mimeType === "jpeg" || mimeType === "jpg" ? "jpg" : "png";

    imgIndex++;

    // Heuristic: first image is usually the person photo, second is the logo
    let filename, urlPath;
    if (imgIndex === 1) {
      // Person photo
      filename = `${personSlug}.${ext}`;
      urlPath = `${BASE_URL}/people/${filename}`;
      const destPath = join(IMG_DIR, "people", filename);
      if (!existsSync(destPath)) {
        writeFileSync(destPath, Buffer.from(base64Data, "base64"));
        console.log(`  ✓ Saved person photo: img/people/${filename}`);
      } else {
        console.log(`  → Person photo already exists: img/people/${filename}`);
      }
    } else {
      // Logo (shared)
      filename = logoFilename;
      urlPath = `${BASE_URL}/${filename}`;
      const destPath = join(IMG_DIR, filename);
      if (!existsSync(destPath)) {
        writeFileSync(destPath, Buffer.from(base64Data, "base64"));
        console.log(`  ✓ Saved logo: img/${filename}`);
        logoSaved = true;
      } else {
        console.log(`  → Logo already exists: img/${filename}`);
      }
    }

    replacements.push({ original: match[0], replacement: `src="${urlPath}"` });
  }

  // Apply all replacements
  for (const { original, replacement } of replacements) {
    html = html.replace(original, replacement);
  }

  // Write the updated HTML
  writeFileSync(htmlPath, html, "utf8");
  const newSize = Buffer.byteLength(html, "utf8");
  console.log(`  ✓ Rewrote HTML: ${Math.round(newSize / 1024)} KB`);
  results.push({ file, imgCount: imgIndex, newSize: Math.round(newSize / 1024) });
}

console.log("\n\n══════════════════════════════════");
console.log("COMPLETE — All 6 signatures updated");
console.log("══════════════════════════════════\n");
results.forEach((r) => {
  console.log(`  ${r.file}: ${r.imgCount} images extracted → ${r.newSize} KB`);
});

console.log("\n📁 Image files saved to: public/email_signature/img/");
console.log("🌐 Live URLs will be:    https://www.lorannllc.com/email_signature/img/...\n");

// Generate PowerShell script
const psLines = [
  "# Exchange Online — Email Signature Transport Rules",
  "# Run in PowerShell as Global/Exchange Admin",
  "# Prerequisite: Install-Module -Name ExchangeOnlineManagement -Force",
  "",
  "Import-Module ExchangeOnlineManagement",
  "Connect-ExchangeOnline -UserPrincipalName admin@lorannllc.com",
  "",
  "# ── Signature HTML files (local paths) ──────────────────────────────",
  '$sigDir = "C:\\sigs"   # ← change to the folder where you save the HTML files',
  "",
  '$people = @(',
  '  @{ Name="Michael Connolly"; Email="michael@lorannllc.com"; HtmlFile="$sigDir\\michael-connolly-signature.html" },',
  '  @{ Name="Paul Gerardi";     Email="paul@lorannllc.com";    HtmlFile="$sigDir\\paul-gerardi-signature.html" },',
  '  @{ Name="Fred Onemma";      Email="fred@lorannllc.com";    HtmlFile="$sigDir\\fred-onemma-signature.html" },',
  '  @{ Name="Joanne Iadarola";  Email="joanne@lorannllc.com";  HtmlFile="$sigDir\\joanne-iadarola-signature.html" },',
  '  @{ Name="Bill Woods";       Email="bill@lorannllc.com";    HtmlFile="$sigDir\\bill-woods-signature.html" },',
  '  @{ Name="Caryn Trazi";      Email="caryn@lorannllc.com";   HtmlFile="$sigDir\\caryn-trazi-signature.html" }',
  ")",
  "",
  "foreach ($p in $people) {",
  "  $html = Get-Content -Path $p.HtmlFile -Raw",
  '  $ruleName = "Email Signature - " + $p.Name',
  "",
  "  # Remove rule if it already exists (for re-runs / updates)",
  "  if (Get-TransportRule -Identity $ruleName -ErrorAction SilentlyContinue) {",
  "    Remove-TransportRule -Identity $ruleName -Confirm:$false",
  '    Write-Host "Removed existing rule: $ruleName"',
  "  }",
  "",
  "  New-TransportRule -Name $ruleName `",
  "    -From $p.Email `",
  "    -ApplyHtmlDisclaimerText $html `",
  "    -ApplyHtmlDisclaimerLocation Append `",
  "    -ApplyHtmlDisclaimerFallbackAction Wrap",
  "",
  '  Write-Host "Created rule: $ruleName"',
  "}",
  "",
  'Write-Host ""',
  'Write-Host "All 6 signature rules created!" -ForegroundColor Green',
];

const psPath = join(ROOT, "scripts", "deploy-email-signatures.ps1");
writeFileSync(psPath, psLines.join("\n"), "utf8");
console.log(`📄 PowerShell script saved: scripts/deploy-email-signatures.ps1`);
