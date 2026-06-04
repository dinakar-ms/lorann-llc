import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "image", title: "Profile Image URL", type: "url" }),
    defineField({
      name: "provider",
      title: "Sign-in Provider",
      type: "string",
      options: { list: ["credentials", "azure-ad"] },
    }),
    defineField({
      name: "providerAccountId",
      title: "Provider Account ID",
      type: "string",
      description: "Stable ID from the OAuth provider (sub/oid).",
    }),
    defineField({
      name: "hashedPassword",
      title: "Hashed Password",
      type: "string",
      description: "bcrypt hash; only set for credentials users.",
      hidden: true,
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: { list: ["user", "admin"] },
      initialValue: "user",
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "emailVerified",
      title: "Email Verified At",
      type: "datetime",
    }),
    defineField({
      name: "lastLoginAt",
      title: "Last Login",
      type: "datetime",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", role: "role" },
    prepare({ title, subtitle, role }) {
      return {
        title: title || subtitle || "(no name)",
        subtitle: `${subtitle || ""} · ${role || "user"}`,
      };
    },
  },
});
