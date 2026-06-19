# auth.md

> Agent authentication and registration metadata for lorannllc.com.
> See https://workos.com/auth.md for the spec.

This file describes how AI agents can register and authenticate with lorannllc.com.

## Endpoint

Base URL: https://www.lorannllc.com

## Agent Registration

Agents can register dynamically using OAuth 2.0 Dynamic Client Registration (RFC 7591).

**Step 1: Register the agent**

```http
POST https://www.lorannllc.com/oauth/register
Content-Type: application/json

{
  "client_name": "My AI Agent",
  "redirect_uris": ["https://agent.example.com/callback"],
  "grant_types": ["authorization_code", "client_credentials"],
  "scope": "openid data:read data:request"
}
```

Response:

```json
{
  "client_id": "lorann_agent_...",
  "client_id_issued_at": 1700000000,
  "client_secret_expires_at": 0,
  "scope": "openid data:read data:request"
}
```

**Step 2: Use the credential**

Include the `client_id` as a Bearer token or use client credentials flow to obtain an access token from:

```
POST https://www.lorannllc.com/api/auth/token
```

## Discovery Endpoints

| Endpoint | URL |
|----------|-----|
| OIDC Configuration | https://www.lorannllc.com/.well-known/openid-configuration |
| Authorization Server | https://www.lorannllc.com/.well-known/oauth-authorization-server |
| Protected Resource | https://www.lorannllc.com/.well-known/oauth-protected-resource |
| Client Registration | https://www.lorannllc.com/oauth/register |

## Supported Identity Types

- `api_key` — Static API key for server-to-server
- `oauth2` — Standard OAuth 2.0 flow

## Credential Types

- `bearer` — Bearer token in Authorization header

## Scopes

| Scope | Description |
|-------|-------------|
| `openid` | OpenID Connect identity |
| `data:read` | Read B2B contact data |
| `data:request` | Submit data sample requests |

## Errors

| Status | Meaning | Action |
|--------|---------|--------|
| 400 | Invalid client metadata | Check request body |
| 401 | Unauthorized | Re-authenticate |
| 429 | Rate limited | Retry after 60s |

## Contact

support@lorannllc.com | https://www.lorannllc.com/contact-us
