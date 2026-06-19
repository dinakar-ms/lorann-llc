import { NextResponse } from "next/server";

const oidcConfig = {
  "issuer": "https://www.lorannllc.com",
  "authorization_endpoint": "https://www.lorannllc.com/api/auth/authorize",
  "token_endpoint": "https://www.lorannllc.com/api/auth/token",
  "userinfo_endpoint": "https://www.lorannllc.com/api/auth/userinfo",
  "jwks_uri": "https://www.lorannllc.com/api/auth/jwks",
  "response_types_supported": ["code"],
  "subject_types_supported": ["public"],
  "id_token_signing_alg_values_supported": ["RS256"],
  "scopes_supported": ["openid", "profile", "email"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post"],
  "claims_supported": ["sub", "name", "email", "email_verified"],
  "grant_types_supported": ["authorization_code"],
  "service_documentation": "https://www.lorannllc.com/contact-us"
};

export async function GET() {
  return NextResponse.json(oidcConfig, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
