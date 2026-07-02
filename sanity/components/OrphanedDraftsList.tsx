"use client";

import { useEffect, useState } from "react";
import { useClient, useSchema } from "sanity";
import { useRouter } from "sanity/router";
import { Badge, Box, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";

type DraftRow = {
  _id: string;
  _type: string;
  _updatedAt: string;
  title?: string;
};

// Same exclusions as the Pending Approval queue: dashboard-only submissions
// and Sanity's internal bookkeeping docs.
const HIDDEN_TYPES = ["dataCardSubmission"];

// Same fetch shape as PendingApprovalList — drafts + published ids in
// one round-trip — but we keep the OPPOSITE half: drafts whose canonical
// is missing. These are "orphaned" (brand-new pages awaiting first
// publish, or leftovers whose canonical was deleted). Shown in a
// separate tab so publishers can clean them up without polluting the
// Pending Approval queue.
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
 * Lists every draft whose canonical (published) document does NOT exist.
 * Clicking a row uses Sanity's default intent resolver rather than the
 * custom pane URL we use in Pending Approval — the pane resolver relies on
 * a canonical existing, which by definition orphaned drafts don't have.
 */
export default function OrphanedDraftsList() {
  const client = useClient({ apiVersion: "2024-10-01" });
  const schema = useSchema();
  const router = useRouter();
  const [rows, setRows] = useState<DraftRow[] | null>(null);

  useEffect(() => {
    let alive = true;
    client
      .fetch<{ drafts: DraftRow[]; publishedIds: string[] }>(
        DRAFTS_AND_PUBLISHED_QUERY,
        { hidden: HIDDEN_TYPES }
      )
      .then(({ drafts, publishedIds }) => {
        if (!alive) return;
        const publishedSet = new Set(publishedIds || []);
        // Keep only drafts whose canonical is MISSING (inverse of the
        // Pending Approval filter).
        const orphaned = (drafts || []).filter((row) => {
          const canonical = row._id.replace(/^drafts\./, "");
          return !publishedSet.has(canonical);
        });
        setRows(orphaned);
      })
      .catch(() => {
        if (alive) setRows([]);
      });
    return () => {
      alive = false;
    };
  }, [client]);

  function openDoc(row: DraftRow) {
    const canonical = row._id.replace(/^drafts\./, "");
    // navigateIntent lets Sanity pick its default pane — for orphaned
    // drafts that's safer than pushing our own pane URL, which requires
    // a canonical document to render the editor cleanly and blows up
    // with "editOpsOf does not expect a draft id" when the canonical
    // is missing.
    router.navigateIntent("edit", { id: canonical, type: row._type });
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
        <Stack space={3}>
          <Text muted align="center">
            No orphaned drafts.
          </Text>
          <Text muted align="center" size={1}>
            Everything with a draft also has a published version — nothing
            to clean up.
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack space={1} padding={2}>
      <Box padding={3} paddingBottom={4}>
        <Text muted size={1}>
          Drafts with no published counterpart. Either new pages awaiting
          their first publish, or leftovers whose canonical was deleted.
        </Text>
      </Box>
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
              <Flex align="center" gap={2}>
                <Text weight="semibold" size={1}>
                  {row.title || "(untitled)"}
                </Text>
                <Badge tone="caution" fontSize={0}>
                  orphaned
                </Badge>
              </Flex>
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
