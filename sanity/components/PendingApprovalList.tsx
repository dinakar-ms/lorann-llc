"use client";

import { useEffect, useState } from "react";
import { useClient, useSchema } from "sanity";
import { useRouter } from "sanity/router";
import { Box, Card, Flex, Spinner, Stack, Text } from "@sanity/ui";

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

// Only show drafts edited since midnight today (admin's local time). Older
// drafts — seed-script leftovers, abandoned edits from previous days — are
// hidden from this queue so the list reflects only fresh editorial activity.
// They still exist in the dataset; admins can find them via Structure on the
// individual page (orange "Draft" indicator).

const DRAFTS_QUERY = `*[
  _id in path("drafts.**")
  && !(_type in $hidden)
  && !(_type match "sanity.*")
  && !(_type match "system.*")
  && _updatedAt > $since
] | order(_updatedAt desc) {
  _id,
  _type,
  _updatedAt,
  "title": coalesce(title, h1, name, heroH1Line1, heroTitleStart, _id)
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
  const [rows, setRows] = useState<DraftRow[] | null>(null);

  useEffect(() => {
    let alive = true;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const since = startOfToday.toISOString();
    client
      .fetch<DraftRow[]>(DRAFTS_QUERY, { hidden: HIDDEN_TYPES, since })
      .then((result) => {
        if (alive) setRows(result || []);
      })
      .catch(() => {
        if (alive) setRows([]);
      });
    return () => {
      alive = false;
    };
  }, [client]);

  function openDoc(row: DraftRow) {
    // Drafts have IDs like "drafts.<canonical-id>". Strip the prefix so the
    // editor opens the canonical document (which carries the draft as its
    // working state).
    const canonical = row._id.replace(/^drafts\./, "");
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
            Nothing edited today.
          </Text>
          <Text muted align="center" size={1}>
            Older drafts (e.g. seed leftovers) aren&apos;t shown here. Open the
            source doc directly to publish or discard them.
          </Text>
        </Stack>
      </Box>
    );
  }

  return (
    <Stack space={1} padding={2}>
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
