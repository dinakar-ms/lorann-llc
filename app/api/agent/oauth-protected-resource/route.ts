import { NextResponse } from "next/server";

const oauthResource = {
  "resource": "https://www.lorannllc.com",
  "authorization_servers": ["https://www.lorannllc.com"],
  "scopes_supported": ["openid", "profile", "email", "data:read", "data:request"],
  "bearer_methods_supported": ["header"],
  "resource_signing_alg_values_supported": ["RS256"],
  "resource_documentation": "https://www.lorannllc.com/contact-us",
  "resource_policy_uri": "https://www.lorannllc.com/privacy-policy",
  "resource_tos_uri": "https://www.lorannllc.com/terms-of-service"
};

export async function GET() {
  return NextResponse.json(oauthResource, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
