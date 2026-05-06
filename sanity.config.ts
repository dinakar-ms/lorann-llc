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
            route: "/:s1",
            filter: `_type == "page" && slug.current == $s1`,
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
