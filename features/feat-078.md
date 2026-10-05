# feat-078 — Audit quẻ 41–44 and all twenty-four hào

## Goal

Accept or reject each quẻ and each position separately.

## Scope

**Intended work:**

- 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu.
- Each line checkbox requires NHL/PBC/NTT cells and all actual commentator/translator layers.
- Intended ledgers: docs/reviews/knowledge/hexagram-XX.md, one per quẻ.
- Canonical decisions: [q41](../docs/reviews/knowledge/ledgers/hexagram-41.json), [q42](../docs/reviews/knowledge/ledgers/hexagram-42.json), [q43](../docs/reviews/knowledge/ledgers/hexagram-43.json), [q44](../docs/reviews/knowledge/ledgers/hexagram-44.json). Summaries: [q41](../docs/reviews/knowledge/hexagram-41.md), [q42](../docs/reviews/knowledge/hexagram-42.md), [q43](../docs/reviews/knowledge/hexagram-43.md), [q44](../docs/reviews/knowledge/hexagram-44.md).

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 41 · Sơ (1).
- [x] 41 · Nhị (2).
- [x] 41 · Tam (3).
- [x] 41 · Tứ (4).
- [x] 41 · Ngũ (5).
- [x] 41 · Thượng (6).
- [x] 42 · Sơ (1).
- [x] 42 · Nhị (2).
- [x] 42 · Tam (3).
- [x] 42 · Tứ (4).
- [x] 42 · Ngũ (5).
- [x] 42 · Thượng (6).
- [x] 43 · Sơ (1).
- [x] 43 · Nhị (2).
- [x] 43 · Tam (3).
- [x] 43 · Tứ (4).
- [x] 43 · Ngũ (5).
- [x] 43 · Thượng (6).
- [x] 44 · Sơ (1).
- [x] 44 · Nhị (2).
- [x] 44 · Tam (3).
- [x] 44 · Tứ (4).
- [x] 44 · Ngũ (5).
- [x] 44 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Decisions have current hashes, exact locators, findings, and reviewer identity; rejected units stay open.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit one quẻ ledger at a time.
2. Repair rejected units and recheck affected evidence.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: complete and merged to `main` in PR #67 (`52b0c19bdb42102e74048fa44dc26354ad1d8a40`).
- Evidence: Coordinator receipt `sh_10a410857001tx6Qv6i1EXnh2u` passed `./init.sh`, format, lint, corpus `--check-books --check`, and diff checks; 440 tests passed (181 core, 259 knowledge). The external ora-44 report found no blockers within this scope; it is not human specialist approval.
- Limits: feat-095 qualified specialist review is pending for all 84 decisions; approved decisions remain zero. feat-096 certification, full source-corpus closure, and rights clearance remain outstanding. These bounded source comparisons do not claim full-corpus coverage.
- Next: Continue the selected knowledge sequence at feat-045.
