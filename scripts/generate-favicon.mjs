/**
 * Generate favicon files from the Lorann globe logo.
 * Uses sharp to resize and convert formats.
 *
 * Run:  node scripts/generate-favicon.mjs <path-to-globe-image>
 *
 * Outputs:
 *   app/icon.png         (32×32 — browser tab favicon)
 *   app/icon-192.png     (192×192 — PWA)
 *   app/icon-512.png     (512×512 — PWA splash)
 *   app/apple-icon.png   (180×180 — Apple touch icon)
 *   public/favicon.ico   (multi-size ICO)
 */

import { execSync } from "child_process";

// Check if sharp is available
try {
  await import("sharp");
} catch {
  console.log("Installing sharp...");
  execSync("npm install sharp --save-dev", { stdio: "inherit" });
}

import sharp from "sharp";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const inputPath = process.argv[2];
if (!inputPath) {
  console.error("Usage: node scripts/generate-favicon.mjs <path-to-image>");
  process.exit(1);
}

const appDir = join(process.cwd(), "app");
const publicDir = join(process.cwd(), "public");

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

async function generate() {
  const img = sharp(inputPath).png();

  // 1. Browser tab favicon (32×32)
  await img
    .clone()
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(join(appDir, "icon.png"));
  console.log("  ✓ app/icon.png (32×32)");

  // 2. PWA icon (192×192)
  await img
    .clone()
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(join(appDir, "icon-192.png"));
  console.log("  ✓ app/icon-192.png (192×192)");

  // 3. PWA splash icon (512×512)
  await img
    .clone()
    .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(join(appDir, "icon-512.png"));
  console.log("  ✓ app/icon-512.png (512×512)");

  // 4. Apple touch icon (180×180)
  await img
    .clone()
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile(join(appDir, "apple-icon.png"));
  console.log("  ✓ app/apple-icon.png (180×180)");

  // 5. favicon.ico (use 32×32 PNG as ICO — browsers accept PNG-in-ICO)
  const ico32 = await img
    .clone()
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Build minimal ICO container with single 32×32 PNG entry
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // count: 1 image

  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(32, 0);      // width
  dirEntry.writeUInt8(32, 1);      // height
  dirEntry.writeUInt8(0, 2);       // color palette
  dirEntry.writeUInt8(0, 3);       // reserved
  dirEntry.writeUInt16LE(1, 4);    // color planes
  dirEntry.writeUInt16LE(32, 6);   // bits per pixel
  dirEntry.writeUInt32LE(ico32.length, 8);  // size of PNG data
  dirEntry.writeUInt32LE(22, 12);  // offset (6 header + 16 dir entry = 22)

  const ico = Buffer.concat([icoHeader, dirEntry, ico32]);
  writeFileSync(join(publicDir, "favicon.ico"), ico);
  console.log("  ✓ public/favicon.ico (32×32 ICO)");

  console.log("\n✅ All favicon files generated.");
}

generate().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
