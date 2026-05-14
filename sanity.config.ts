"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool, defineDocuments } from "sanity/presentation";

import { apiVersion, dataset, projectId, studioUrl } from "./sanity/env";
import { schema } from "./sanity/schemas";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          typeof location === "undefined"
            ? "http://localhost:3000"
            : location.origin,
        preview: "/",
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
