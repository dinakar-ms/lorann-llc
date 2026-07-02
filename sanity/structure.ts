import type { StructureResolver } from "sanity/structure";
import PendingApprovalList from "./components/PendingApprovalList";

const SINGLETONS = [
  "homepage",
  "industryTrendsPage",
  "contactPage",
  "dataAssetsPage",
  "aboutPage",
  "howItWorksPage",
  "industriesPage",
  "solutionsPage",
  "insightsPage",
  "signalExchangePage",
  "resourcesPage",
];

// Document types managed entirely via the website/API — hidden from the
// Studio Content sidebar to keep editorial work uncluttered.
const HIDDEN_FROM_STUDIO = ["dataCardSubmission"];

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
      // ---- Pending Approval — every document with an unpublished draft ----
      // Custom component because Studio's documentList won't render rows whose
      // _id starts with "drafts.". This one queries drafts directly via the
      // Sanity client and lets the admin click through to the editor.
      S.listItem()
        .title("⏳ Pending Approval")
        .id("pendingApproval")
        .child(
          S.component(PendingApprovalList)
            .title("Pending Approval")
            .id("pendingApprovalView")
            // When the custom component pushes a `pendingApproval;<docId>`
            // URL, Sanity needs a child renderer to know what to display.
            // documentList would look up the doc's type from the schema; for
            // an arbitrary doc pushed by our component we fetch the type
            // ourselves and return a document pane. The `drafts.` prefix is
            // stripped in openDoc, so we look for both id shapes here.
            .child(async (documentId, { structureContext }) => {
              const client = structureContext.getClient({
                apiVersion: "2024-10-01",
              });
              const doc = await client.fetch<{ _type: string } | null>(
                `*[_id == $id || _id == "drafts." + $id][0]{ _type }`,
                { id: documentId }
              );
              // Fallback to "page" when the lookup misses — every pending
              // approval item is a page today, so this recovers the pane
              // instead of returning null (which the child resolver type
              // doesn't allow).
              return S.document()
                .documentId(documentId)
                .schemaType(doc?._type || "page");
            })
        ),
      S.divider(),

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
      S.listItem()
        .title("Data Assets Page")
        .id("dataAssetsPage")
        .child(
          S.document()
            .schemaType("dataAssetsPage")
            .documentId("dataAssetsPage")
        ),
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("How It Works Page")
        .id("howItWorksPage")
        .child(
          S.document()
            .schemaType("howItWorksPage")
            .documentId("howItWorksPage")
        ),
      S.listItem()
        .title("Industries Page")
        .id("industriesPage")
        .child(
          S.document()
            .schemaType("industriesPage")
            .documentId("industriesPage")
        ),
      S.listItem()
        .title("Solutions Page")
        .id("solutionsPage")
        .child(
          S.document()
            .schemaType("solutionsPage")
            .documentId("solutionsPage")
        ),
      S.listItem()
        .title("Insights Page")
        .id("insightsPage")
        .child(
          S.document()
            .schemaType("insightsPage")
            .documentId("insightsPage")
        ),
      S.listItem()
        .title("Signal eXchange™ Page")
        .id("signalExchangePage")
        .child(
          S.document()
            .schemaType("signalExchangePage")
            .documentId("signalExchangePage")
        ),
      S.listItem()
        .title("Resources Page")
        .id("resourcesPage")
        .child(
          S.document()
            .schemaType("resourcesPage")
            .documentId("resourcesPage")
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
          !["page", ...SINGLETONS, ...HIDDEN_FROM_STUDIO].includes(
            li.getId() as string
          )
      ),
    ]);
