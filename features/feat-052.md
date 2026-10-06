# feat-052 — Complete BPCT applications — Weather life career and wealth

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 101–165; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 7 — Thiên Thời: all passages, conditions, examples, and notes.
- [ ] Niên Thời — unnumbered: all passages, conditions, examples, and notes.
- [ ] Chapter 9 — Thân Mệnh: all passages, conditions, examples, and notes.
- [ ] Chapter 10 — Cầu Danh: all passages, conditions, examples, and notes.
- [ ] Chapter 11 — Sĩ Hoạn: all passages, conditions, examples, and notes.
- [ ] Chapter 12 — Cầu Tài: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[implementation plan](../docs/plans/feat-052.md).

## Plan

1. Map the actual source units and compare existing claims.
2. Author and commit one chapter or unnumbered-section checkpoint at a time.
3. Reconcile every disposition and run the combined release checks.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/052-bpct-applications-weather-life-career-wealth`, based on `main` at `599b08006e34cf255e147840dc8535318e652409`.
- Evidence: feat-051, feat-050, and feat-101 are done. The selected feat-045–083 sequence authorizes this feature. Detailed checkpoints are in the [implementation plan](../docs/plans/feat-052.md). No feat-052 content verification has run.
- Dependencies: See [feature index](../feature_index.json).
- Next: Verify the BPCT fingerprint and inspect PDFs 101–165 to map every assigned passage before authoring.
