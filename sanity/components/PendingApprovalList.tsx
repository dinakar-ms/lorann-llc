"use client";

import { useCallback, useEffect, useState } from "react";
import { useClient, useCurrentUser, useSchema } from "sanity";
import { useRouter } from "sanity/router";
import { Box, Button, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";

// Same email allowlist that gates Publish/Unpublish in sanity.config.ts.
// Kept in sync with NEXT_PUBLIC_SANITY_PUBLISHERS so this bulk-publish
// button is only shown to the same users who can publish individually
// from the Studio document editor. Anyone else sees the queue but not
// the button.
const PUBLISHER_ALLOWLIST: string[] = (
  process.env.NEXT_PUBLIC_SANITY_PUBLISHERS || ""
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

type DraftRow = {
  _id: string;
  _type: string;
  _updatedAt: string;
  title?: string;
};

// Document types that should never appear in the approval queue:
// - dataCardSubmission: managed by the dashboard, not Studio editorial
// - sanity.previewUrlSecret, sanity.imageAsset, sanity.fileAsset, etc.:
//   Sanity-system bookkeeping docs auto-created by Studio (e.g. preview tokens)
const HIDDEN_TYPES = ["dataCardSubmission"];

// Fetch every draft + every published id in one round-trip, then filter
// client-side. Doing the "does the canonical exist?" join in GROQ
// requires string slicing (`_id[7..]`) that doesn't work reliably across
// GROQ versions — client-side filtering is unambiguous.
//
// Sanity-system docs and the dashboard-only dataCardSubmission type are
// excluded server-side to keep the payload small.

const DRAFTS_AND_PUBLISHED_QUERY = `{
  "drafts": *[
    _id in path("drafts.**")
    && !(_type in $hidden)
    && !(_type match "sanity.*")
    && !(_type match "system.*")
  ] | order(_updatedAt desc) {
    _id,
    _type,
    _updatedAt,
    "title": coalesce(title, h1, name, heroH1Line1, heroTitleStart, _id)
  },
  "publishedIds": *[
    !(_id in path("drafts.**"))
    && !(_type in $hidden)
    && !(_type match "sanity.*")
    && !(_type match "system.*")
  ]._id
}`;

/**
 * Lists every document that has an unpublished draft. Clicking a row opens
 * the canonical (non-"drafts.") version in the standard editor so the admin
 * can review and publish.
 *
 * documentList() in the structure resolver normalizes draft IDs and so won't
 * render them as standalone rows — hence this custom component.
 */
export default function PendingApprovalList() {
  const client = useClient({ apiVersion: "2024-10-01" });
  const schema = useSchema();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [rows, setRows] = useState<DraftRow[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<
    { tone: "positive" | "critical"; text: string } | null
  >(null);

  const isPublisher =
    !!currentUser?.email &&
    PUBLISHER_ALLOWLIST.includes(currentUser.email.toLowerCase());

  const loadRows = useCallback(
    async (alive?: { current: boolean }) => {
      try {
        const { drafts, publishedIds } = await client.fetch<{
          drafts: DraftRow[];
          publishedIds: string[];
        }>(DRAFTS_AND_PUBLISHED_QUERY, { hidden: HIDDEN_TYPES });
        if (alive && !alive.current) return;
        const publishedSet = new Set(publishedIds || []);
        // Keep only drafts whose canonical (drafts._id minus the
        // "drafts." prefix — 7 chars) exists as a published document.
        // Orphaned drafts — brand-new pages, or leftovers whose canonical
        // was deleted — go to the separate Orphaned Drafts tab and never
        // enter this queue. Opening them here would blow up with the
        // "editOpsOf does not expect a draft id" Studio error.
        const withCanonical = (drafts || []).filter((row) => {
          const canonical = row._id.replace(/^drafts\./, "");
          return publishedSet.has(canonical);
        });
        setRows(withCanonical);
      } catch {
        if (!alive || alive.current) setRows([]);
      }
    },
    [client]
  );

  useEffect(() => {
    const alive = { current: true };
    loadRows(alive);
    return () => {
      alive.current = false;
    };
  }, [loadRows]);

  // Bulk-publish every visible pending draft:
  //   for each draft, `createOrReplace` the canonical with the draft's
  //   content and delete the draft in a single transaction. That's the
  //   same primitive Sanity Studio's per-doc Publish action uses. Each
  //   draft gets its own transaction so a single failure doesn't block
  //   the rest — successes and failures are counted separately and
  //   reported at the end.
  async function publishAll() {
    if (!rows || rows.length === 0 || busy) return;
    if (
      !window.confirm(
        `Publish all ${rows.length} pending draft${
          rows.length === 1 ? "" : "s"
        }? This promotes every draft to live in one shot.`
      )
    ) {
      return;
    }
    setBusy(true);
    setMessage(null);
    let succeeded = 0;
    const failures: DraftRow[] = [];
    for (const row of rows) {
      try {
        const draft = await client.getDocument(row._id);
        if (!draft) {
          failures.push(row);
          continue;
        }
        const canonicalId = row._id.replace(/^drafts\./, "");
        // Strip system fields that shouldn't be copied verbatim onto
        // the new/updated canonical. Sanity assigns fresh _rev,
        // _createdAt, _updatedAt on write.
        const {
          _id: _draftId,
          _rev: _draftRev,
          _createdAt: _draftCreatedAt,
          _updatedAt: _draftUpdatedAt,
          ...rest
        } = draft;
        void _draftId;
        void _draftRev;
        void _draftCreatedAt;
        void _draftUpdatedAt;
        await client
          .transaction()
          .createOrReplace({ ...rest, _id: canonicalId })
          .delete(row._id)
          .commit();
        succeeded++;
      } catch {
        failures.push(row);
      }
    }
    setBusy(false);
    if (failures.length === 0) {
      setMessage({
        tone: "positive",
        text: `Published ${succeeded} draft${succeeded === 1 ? "" : "s"}.`,
      });
    } else {
      setMessage({
        tone: "critical",
        text: `Published ${succeeded}, ${failures.length} failed. Open the failing docs to see why.`,
      });
    }
    // Refresh so the freshly-published rows disappear from the queue.
    await loadRows();
  }

  function openDoc(row: DraftRow) {
    // Drafts have IDs like "drafts.<canonical-id>". Strip the prefix so the
    // editor opens the canonical document (which carries the draft as its
    // working state).
    const canonical = row._id.replace(/^drafts\./, "");
    // Navigate to the pane URL directly instead of using navigateIntent.
    // navigateIntent lets Sanity's resolver pick whichever structure pane
    // "matches" the document type/slug first — for a `page` doc with slug
    // /about/… that lands on the About section, not Pending Approval, which
    // is confusing when the admin is reviewing a queue. Setting the URL
    // to `pendingApproval;<docId>` keeps the reviewer's context.
    //
    // Path shape: `router.navigateUrl` auto-prepends BOTH the `/studio`
    // basePath AND the current tool segment (`structure`), so we pass only
    // the pane portion. Include neither the leading slash (that dropped
    // basePath → "Workspace not found") nor the `structure/` prefix (that
    // gave us `/studio/structure/structure/…`, doubled up).
    router.navigateUrl({
      path: `pendingApproval;${encodeURIComponent(canonical)}`,
    });
  }

  if (rows === null) {
    return (
      <Flex align="center" justify="center" padding={5}>
        <Spinner muted />
      </Flex>
    );
  }

  if (rows.length === 0) {
    return (
      <Box padding={5}>
        <Text muted align="center">
          No drafts awaiting approval.
        </Text>
      </Box>
    );
  }

  return (
    <Stack space={1} padding={2}>
      {(isPublisher || message) && (
        <Box padding={2}>
          <Stack space={3}>
            {isPublisher && (
              <Flex align="center" justify="space-between" gap={3}>
                <Text muted size={1}>
                  {rows.length} draft{rows.length === 1 ? "" : "s"} awaiting
                  approval
                </Text>
                <Button
                  fontSize={1}
                  mode="default"
                  padding={3}
                  tone="positive"
                  text={busy ? "Publishing…" : `Publish all (${rows.length})`}
                  onClick={publishAll}
                  disabled={busy}
                />
              </Flex>
            )}
            {message && (
              <Card
                tone={message.tone}
                padding={3}
                radius={2}
                border
              >
                <Text size={1}>{message.text}</Text>
              </Card>
            )}
          </Stack>
        </Box>
      )}
      {rows.map((row) => {
        const schemaType = schema.get(row._type);
        const typeTitle = schemaType?.title || row._type;
        const updatedAt = new Date(row._updatedAt).toLocaleString();
        return (
          <Card
            key={row._id}
            as="button"
            onClick={() => openDoc(row)}
            padding={3}
            radius={2}
            tone="default"
            style={{ textAlign: "left", cursor: "pointer", width: "100%" }}
          >
            <Stack space={2}>
              <Text weight="semibold" size={1}>
                {row.title || "(untitled)"}
              </Text>
              <Flex gap={3}>
                <Text muted size={0}>
                  {typeTitle}
                </Text>
                <Text muted size={0}>
                  Updated {updatedAt}
                </Text>
              </Flex>
            </Stack>
          </Card>
        );
      })}
    </Stack>
  );
}
