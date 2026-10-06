# feat-053 — Complete BPCT applications — Loss travel study marriage and household members

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 166–230; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 13 — Thất Thoát: all passages, conditions, examples, and notes.
- [ ] Chapter 14 — Xuất Hành: all passages, conditions, examples, and notes.
- [ ] Chapter 15 — Cầu Sư: all passages, conditions, examples, and notes.
- [ ] Chapter 16 — Học Quán: all passages, conditions, examples, and notes.
- [ ] Chapter 17 — Hôn Nhân: all passages, conditions, examples, and notes.
- [ ] Chapter 18 — Sản Dục: all passages, conditions, examples, and notes.
- [ ] Chapter 19 — Tiến Nhân Khẩu: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[implementation plan](../docs/plans/feat-053.md).

## Plan

1. Map the actual source passages and compare existing claims.
2. Review and commit one chapter checkpoint at a time.
3. Reconcile all child-unit dispositions and combined release coverage.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/053-bpct-applications-loss-travel-study-marriage-household`, based on `main` at `06165bd55dd61e30b29ee4b79ac36e9027776180`.
- Evidence: feat-052, feat-051, feat-050, and feat-101 are done. The selected feat-045–083 sequence authorizes this feature. Detailed source checkpoints are in the [implementation plan](../docs/plans/feat-053.md). No feat-053 content verification has run.
- Dependencies: See [feature index](../feature_index.json).
- Next: Verify the BPCT source fingerprint and inspect PDF 166–230 to map every assigned source unit before authoring.
