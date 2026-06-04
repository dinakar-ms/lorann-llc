import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
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
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "common",
    }),
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const user = await findUserByEmail(credentials.email.toLowerCase().trim());
        if (!user || !user.hashedPassword) return null;
        const ok = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!ok) return null;
        // Stamp lastLoginAt (best-effort)
        writeClient
          .patch(user._id)
          .set({ lastLoginAt: new Date().toISOString() })
          .commit()
          .catch(() => {});
        return {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!account) return false;
      if (account.provider === "credentials") return true;
      if (!user.email) return false;

      try {
        await upsertOAuthUser({
          email: user.email.toLowerCase(),
          name: user.name ?? (profile as { name?: string })?.name ?? "",
          image: user.image ?? null,
          provider: account.provider as "azure-ad",
          providerAccountId: account.providerAccountId,
        });
        return true;
      } catch (err) {
        console.error("OAuth user upsert failed:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.email && !token.sanityUserId) {
        const sanityUser = await findUserByEmail(user.email.toLowerCase());
        if (sanityUser) {
          token.sanityUserId = sanityUser._id;
          token.role = sanityUser.role || "user";
        }
      } else if (token.email && !token.sanityUserId) {
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
