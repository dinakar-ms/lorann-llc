import { NextResponse } from "next/server";
import { PARSER_VERSION } from "@/lib/parseDataCardFile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Diagnostic endpoint — confirms which parser build is actually running.
 * Public; safe because it only echoes constants.
 */
export async function GET() {
  return NextResponse.json({
    parserVersion: PARSER_VERSION,
    nodeVersion: process.version,
    platform: process.platform,
    buildTime: process.env.VERCEL_GIT_COMMIT_SHA || "unknown",
    deployedAt: new Date().toISOString(),
  });
}
