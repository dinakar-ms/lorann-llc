import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["homepage", "industryTrendsPage", "contactPage"];

// Groups all `page` documents whose slug starts with a given prefix.
const pageGroup = (S: any, title: string, prefix: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter(`_type == "page" && slug.current match $prefix`)
        .params({ prefix: `${prefix}*` })
        .defaultOrdering([{ field: "slug.current", direction: "asc" }])
    );

const exactPage = (S: any, title: string, slug: string) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter(`_type == "page" && slug.current == $slug`)
        .params({ slug })
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ---- Singletons (fully click-editable in Presentation) ----
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Industry Trends Page")
        .id("industryTrendsPage")
        .child(
          S.document()
            .schemaType("industryTrendsPage")
            .documentId("industryTrendsPage")
        ),
      S.listItem()
        .title("Contact Page")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage")
        ),
      S.divider(),

      // ---- All static pages (SEO editable, body migration pending) ----
      pageGroup(S, "About", "about"),
      exactPage(S, "Contact", "contact"),
      pageGroup(S, "Data Assets", "data-assets"),
      pageGroup(S, "Insights", "insights"),
      pageGroup(S, "Solutions", "solutions"),
      pageGroup(S, "Why Lorann", "why-lorann"),
      exactPage(S, "How It Works", "how-it-works"),
      exactPage(S, "Industries", "industries"),
      exactPage(S, "Resources", "resources"),
      exactPage(S, "Signal Exchange", "signal-exchange"),
      S.divider(),
      S.documentTypeListItem("page").title("All Pages (flat)"),
      S.divider(),

      // ---- Anything else not yet listed ----
      ...S.documentTypeListItems().filter(
        (li: any) =>
          !["page", ...SINGLETONS].includes(li.getId() as string)
      ),
    ]);
