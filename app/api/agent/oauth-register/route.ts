import { NextRequest, NextResponse } from "next/server";

// RFC 7591 — OAuth 2.0 Dynamic Client Registration
export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "invalid_client_metadata", error_description: "Request body must be valid JSON" },
      { status: 400 }
    );
  }

  const clientId = `lorann_agent_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  const response = {
    "client_id": clientId,
    "client_id_issued_at": Math.floor(Date.now() / 1000),
    "client_secret_expires_at": 0,
    "redirect_uris": body.redirect_uris ?? [],
    "client_name": body.client_name ?? "AI Agent Client",
    "token_endpoint_auth_method": body.token_endpoint_auth_method ?? "client_secret_basic",
    "grant_types": body.grant_types ?? ["authorization_code"],
    "response_types": body.response_types ?? ["code"],
    "scope": body.scope ?? "openid data:read",
    "contacts": body.contacts ?? [],
    "registration_access_token": `rat_${clientId}`,
    "registration_client_uri": `https://www.lorannllc.com/oauth/register/${clientId}`
  };

  return NextResponse.json(response, {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-store",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
