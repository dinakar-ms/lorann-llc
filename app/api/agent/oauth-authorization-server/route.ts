import { NextResponse } from "next/server";

// RFC 8414 + agent_auth extension for Auth.md agent registration
const authServer = {
  "issuer": "https://www.lorannllc.com",
  "authorization_endpoint": "https://www.lorannllc.com/api/auth/authorize",
  "token_endpoint": "https://www.lorannllc.com/api/auth/token",
  "jwks_uri": "https://www.lorannllc.com/api/auth/jwks",
  "registration_endpoint": "https://www.lorannllc.com/oauth/register",
  "scopes_supported": ["openid", "profile", "email", "data:read", "data:request"],
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "client_credentials"],
  "token_endpoint_auth_methods_supported": ["client_secret_basic", "client_secret_post"],
  "code_challenge_methods_supported": ["S256"],
  "service_documentation": "https://www.lorannllc.com/contact",
  "op_policy_uri": "https://www.lorannllc.com/privacy-policy",
  "op_tos_uri": "https://www.lorannllc.com/terms-of-service",
  "agent_auth": {
    "register_uri": "https://www.lorannllc.com/oauth/register",
    "supported_identity_types": ["api_key", "oauth2"],
    "credential_types": ["bearer"],
    "claim_uri": "https://www.lorannllc.com/api/auth/claims",
    "revocation_uri": "https://www.lorannllc.com/api/auth/revoke",
    "auth_md": "https://www.lorannllc.com/auth.md"
  }
};

export async function GET() {
  return NextResponse.json(authServer, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
