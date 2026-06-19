# Auth.md

> Agent authentication and registration metadata for lorannllc.com
> Spec: https://workos.com/auth.md

## Agent Registration

Agents can register dynamically via OAuth 2.0 Dynamic Client Registration (RFC 7591):

- **Registration URL**: https://www.lorannllc.com/oauth/register
- **Supported Identity Types**: api_key, oauth2
- **Credential Types**: bearer
- **Token Endpoint**: https://www.lorannllc.com/api/auth/token

## Discovery Endpoints

- **OIDC Configuration**: https://www.lorannllc.com/.well-known/openid-configuration
- **OAuth Authorization Server**: https://www.lorannllc.com/.well-known/oauth-authorization-server
- **Protected Resource**: https://www.lorannllc.com/.well-known/oauth-protected-resource

## Scopes

| Scope | Description |
|-------|-------------|
| `openid` | OpenID Connect |
| `data:read` | Read B2B contact data |
| `data:request` | Submit data requests |

## Contact

For agent access inquiries: support@lorannllc.com
