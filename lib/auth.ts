import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";
import { writeClient } from "@/sanity/lib/writeClient";

/**
 * Sanity user shape persisted via NextAuth callbacks.
 */
export type SanityUser = {
  _id: string;
  _type: "user";
  email: string;
  name?: string;
  image?: string;
  role?: "user" | "admin";
  provider?: string;
  providerAccountId?: string;
  hashedPassword?: string;
};

const userByEmailQuery = `*[_type == "user" && email == $email][0]`;

async function findUserByEmail(email: string): Promise<SanityUser | null> {
  return await writeClient.fetch<SanityUser | null>(userByEmailQuery, { email });
}

async function upsertOAuthUser(args: {
  email: string;
  name?: string | null;
  image?: string | null;
  provider: "azure-ad";
  providerAccountId: string;
}): Promise<SanityUser> {
  const existing = await findUserByEmail(args.email);
  const nowIso = new Date().toISOString();

  if (existing) {
    const patched = await writeClient
      .patch(existing._id)
      .set({
        name: args.name || existing.name,
        image: args.image || existing.image,
        provider: args.provider,
        providerAccountId: args.providerAccountId,
        lastLoginAt: nowIso,
      })
      .commit<SanityUser>();
    return patched;
  }

  const created = await writeClient.create<Omit<SanityUser, "_id">>({
    _type: "user",
    email: args.email,
    name: args.name || "",
    image: args.image || "",
    role: "user",
    provider: args.provider,
    providerAccountId: args.providerAccountId,
    emailVerified: nowIso,
    lastLoginAt: nowIso,
    createdAt: nowIso,
  } as never);
  return created as SanityUser;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    AzureADProvider({
      clientId:
        process.env.AZURE_AD_CLIENT_ID || process.env.MICROSOFT_CLIENT_ID || "",
      clientSecret:
        process.env.AZURE_AD_CLIENT_SECRET ||
        process.env.MICROSOFT_CLIENT_SECRET ||
        "",
      tenantId:
        process.env.AZURE_AD_TENANT_ID ||
        process.env.MICROSOFT_TENANT_ID ||
        "common",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) {
        console.error("[signIn] missing account");
        return false;
      }

      // Azure AD exposes the email under different claims depending on the account
      // type (work/school vs personal). Fall back through every common claim.
      const p = (profile || {}) as {
        email?: string;
        preferred_username?: string;
        upn?: string;
        unique_name?: string;
        name?: string;
        oid?: string;
        sub?: string;
      };
      const email =
        user.email ||
        p.email ||
        p.preferred_username ||
        p.upn ||
        p.unique_name ||
        null;

      if (!email) {
        console.error(
          "[signIn] no email could be derived from Microsoft profile. Available claims:",
          Object.keys(p)
        );
        return false;
      }

      // Restrict sign-in to a whitelist of email domains. Comma-separated env
      // var, e.g. "lorannllc.com,sagaciousinfosystems.com". Defaults to
      // lorannllc.com only.
      const allowedDomains = (
        process.env.AUTH_ALLOWED_DOMAINS || "lorannllc.com"
      )
        .split(",")
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);
      const emailDomain = email.toLowerCase().split("@")[1] || "";
      if (!allowedDomains.includes(emailDomain)) {
        console.error(
          `[signIn] domain ${emailDomain} is not in the allowed list:`,
          allowedDomains
        );
        return "/auth/login?error=AccessDenied";
      }

      try {
        await upsertOAuthUser({
          email: email.toLowerCase(),
          name: user.name ?? p.name ?? "",
          image: user.image ?? null,
          provider: account.provider as "azure-ad",
          providerAccountId:
            account.providerAccountId || p.oid || p.sub || email,
        });
        return true;
      } catch (err) {
        console.error("[signIn] OAuth user upsert failed:", err);
        return false;
      }
    },
    async jwt({ token, user, profile }) {
      const p = (profile || {}) as {
        email?: string;
        preferred_username?: string;
        upn?: string;
        unique_name?: string;
      };
      // Best-effort: backfill the token email from OIDC claims if NextAuth's
      // default didn't get it (common for personal Microsoft accounts).
      if (!token.email) {
        token.email =
          user?.email ||
          p.email ||
          p.preferred_username ||
          p.upn ||
          p.unique_name ||
          token.email;
      }
      if (token.email && !token.sanityUserId) {
        const sanityUser = await findUserByEmail(String(token.email).toLowerCase());
        if (sanityUser) {
          token.sanityUserId = sanityUser._id;
          token.role = sanityUser.role || "user";
        }
      }
      return token;
    },
    async session({ session, token }: { session: { user?: Record<string, unknown> }; token: JWT }) {
      if (session.user) {
        session.user.id = token.sanityUserId as string | undefined;
        session.user.role = (token.role as string | undefined) || "user";
      }
      return session as never;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
