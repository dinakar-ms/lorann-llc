"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool, defineDocuments } from "sanity/presentation";

import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { structure } from "./sanity/structure";

/**
 * Approval-workflow gate.
 *
 * Sanity already separates "draft" docs from "published" docs and the public
 * site's GROQ queries only return published ones — so a draft is invisible to
 * end users until someone publishes it. To make that publish step an admin
 * approval, we hide the Publish (and Unpublish) actions from anyone whose
 * email is NOT in our publisher allowlist. Everyone else can save drafts
 * freely; only allowlisted publishers can promote a draft to live.
 *
 * Why email-based (not role-based): Sanity's free plan only exposes the
 * Administrator and Viewer roles — there's no Editor role to gate against.
 * Listing the publishers explicitly works on every plan and stays in version
 * control. To grant publish rights to a new admin, add their email below
 * (or set NEXT_PUBLIC_SANITY_PUBLISHERS as a comma-separated env var).
 *
 * Covers every document type — pages, sections, homepage, etc. — in one
 * place. Add a new doc type later? No changes needed here.
 */
/**
 * Comma-separated list of emails who can publish/unpublish in Studio. Set in
 *   - `.env.local` for local dev
 *   - Vercel env vars for production
 *
 * Example: `NEXT_PUBLIC_SANITY_PUBLISHERS=lakshmi@example.com,bob@example.com`
 *
 * Empty / unset list = nobody can publish (everyone sees Save only). Useful
 * during onboarding to lock down the live site while admins set themselves up.
 */
const PUBLISHER_ALLOWLIST: string[] = (
  process.env.NEXT_PUBLIC_SANITY_PUBLISHERS || ""
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

function isPublisher(currentUser: { email?: string | null } | null | undefined) {
  const email = (currentUser?.email || "").toLowerCase();
  return email.length > 0 && PUBLISHER_ALLOWLIST.includes(email);
}

// Generic over Sanity's action type so the return value satisfies the strict
// `DocumentActionComponent[]` signature defineConfig() expects. We don't need
// to import Sanity's exact action type — the generic just preserves it.
function gatePublishForNonAdmins<T extends { action?: string | undefined }>(
  prev: T[],
  context: { currentUser?: { email?: string | null } | null }
): T[] {
  if (isPublisher(context.currentUser)) return prev;
  return prev.filter(
    (a) => a.action !== "publish" && a.action !== "unpublish"
  );
}


export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  document: {
    actions: (prev, context) => gatePublishForNonAdmins(prev, context),
  },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          typeof location === "undefined"
            ? "http://localhost:3000"
            : location.origin,
        preview: "/",
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        // Document → URL (Open Preview from a doc)
        locations: {
          page: {
            select: { h1: "h1", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.h1 || "Untitled",
                  href: `/${doc?.slug}`,
                },
              ],
            }),
          },
          industryTrendsPage: {
            select: { titleStart: "titleStart" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.titleStart || "Industry Trends",
                  href: "/insights/industry-trends",
                },
              ],
            }),
          },
          homepage: {
            select: { line1: "heroLine1" },
            resolve: () => ({
              locations: [{ title: "Homepage", href: "/" }],
            }),
          },
          contactPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Contact", href: "/contact" }],
            }),
          },
          dataAssetsPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Data Assets", href: "/data-assets" }],
            }),
          },
          aboutPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "About", href: "/about" }],
            }),
          },
          howItWorksPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "How It Works", href: "/how-it-works" }],
            }),
          },
          industriesPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Industries", href: "/industries" }],
            }),
          },
          solutionsPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Solutions", href: "/solutions" }],
            }),
          },
          insightsPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Insights", href: "/insights" }],
            }),
          },
          signalExchangePage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Signal eXchange™", href: "/signal-exchange" }],
            }),
          },
          resourcesPage: {
            select: { titleStart: "heroTitleStart" },
            resolve: () => ({
              locations: [{ title: "Resources", href: "/resources" }],
            }),
          },
        },
        // URL → document (right-side panel finds the doc for the current preview URL).
        // Multiple route patterns cover paths up to 5 segments deep, matching the seeded site routes.
        mainDocuments: defineDocuments([
          {
            route: "/",
            filter: `_type == "homepage" && _id == "homepage"`,
          },
          {
            route: "/insights/industry-trends",
            filter: `_type == "industryTrendsPage" && _id == "industryTrendsPage"`,
          },
          {
            route: "/contact",
            filter: `_type == "contactPage" && _id == "contactPage"`,
          },
          {
            route: "/data-assets",
            filter: `_type == "dataAssetsPage" && _id == "dataAssetsPage"`,
          },
          {
            route: "/about",
            filter: `_type == "aboutPage" && _id == "aboutPage"`,
          },
          {
            route: "/how-it-works",
            filter: `_type == "howItWorksPage" && _id == "howItWorksPage"`,
          },
          {
            route: "/industries",
            filter: `_type == "industriesPage" && _id == "industriesPage"`,
          },
          {
            route: "/solutions",
            filter: `_type == "solutionsPage" && _id == "solutionsPage"`,
          },
          {
            route: "/insights",
            filter: `_type == "insightsPage" && _id == "insightsPage"`,
          },
          {
            route: "/signal-exchange",
            filter: `_type == "signalExchangePage" && _id == "signalExchangePage"`,
          },
          {
            route: "/resources",
            filter: `_type == "resourcesPage" && _id == "resourcesPage"`,
          },
          {
            route: "/:s1",
            filter: `_type == "page" && slug.current == $s1 && !($s1 in ["contact", "about", "how-it-works", "industries", "solutions", "insights", "signal-exchange", "resources", "data-assets"])`,
          },
          {
            route: "/:s1/:s2",
            filter: `_type == "page" && slug.current == $s1 + "/" + $s2`,
          },
          {
            route: "/:s1/:s2/:s3",
            filter: `_type == "page" && slug.current == $s1 + "/" + $s2 + "/" + $s3`,
          },
          {
            route: "/:s1/:s2/:s3/:s4",
            filter: `_type == "page" && slug.current == $s1 + "/" + $s2 + "/" + $s3 + "/" + $s4`,
          },
          {
            route: "/:s1/:s2/:s3/:s4/:s5",
            filter: `_type == "page" && slug.current == $s1 + "/" + $s2 + "/" + $s3 + "/" + $s4 + "/" + $s5`,
          },
        ]),
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
