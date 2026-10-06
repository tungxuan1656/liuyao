# feat-055 — Complete BPCT applications — Illness remedies and absent travellers

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 270–301; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 23 — Tật Bệnh: all passages, conditions, examples, and notes.
- [ ] Chapter 24 — Bệnh Thể: all passages, conditions, examples, and notes.
- [ ] Chapter 25 — Y Dược: all passages, conditions, examples, and notes.
- [ ] Chapter 26 — Hành Nhân: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Map existing claims and uncovered sections.
2. Review and commit each chapter/supplement checkpoint.
3. Reconcile reused terms, exclusions, and group coverage.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active; selected after feat-054 merged.
- Evidence: Selection recorded; implementation has not started.
- Dependencies: feat-054 is done; corpus-wide source review and certification remain closed.
- Next: Inspect BPCT PDF 270–301 by actual chapter boundaries, then author and verify the four assigned units.
