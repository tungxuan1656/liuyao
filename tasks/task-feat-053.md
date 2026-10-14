# feat-053 - Complete BPCT applications — Loss travel study marriage and household members

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-052](task-feat-052.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 166–230; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 13 — Thất Thoát: all passages, conditions, examples, and notes.
- [x] Chapter 14 — Xuất Hành: all passages, conditions, examples, and notes.
- [x] Chapter 15 — Cầu Sư: all passages, conditions, examples, and notes.
- [x] Chapter 16 — Học Quán: all passages, conditions, examples, and notes.
- [x] Chapter 17 — Hôn Nhân: all passages, conditions, examples, and notes.
- [x] Chapter 18 — Sản Dục: all passages, conditions, examples, and notes.
- [x] Chapter 19 — Tiến Nhân Khẩu: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #80 at `b4f3ccf42fdb0f80e8ff116ef14af7e5e6282f82`. Reviewed PR head was `d9b080c03c8780f1eff713bed4f678bb4b9f9eda`.
- Evidence: Fresh independent exact-head review returned `OK`, no findings. PR-head CI run `37435012519`, Cloudflare Pages, and GitGuardian all passed. Final `./init.sh` passed 2,901 tests (181 core, 2,720 knowledge); corpus freshness and package-export checks passed. CI-required test scheduling serializes files at two workers, and two measured per-test budgets now cover the expanded 1,300-group corpus; no assertions or child-process timeout changed.
- Blockers: none for feat-053. General authorship credits do not certify each individual verse/commentary, reported source alternatives are not repaired, and unavailable originals cannot be reconstructed. Global discovery, feat-087 audit, independent verification, and certification remain unresolved. No prediction, medical/safety/financial/social advice or copied source material is introduced.
- Next: Stop after feat-053 as requested; do not start feat-054 until the user asks.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-06 — feat-053 merged

**State**: done and merged to `main` in PR #80 at `b4f3ccf42fdb0f80e8ff116ef14af7e5e6282f82`; reviewed PR head `d9b080c03c8780f1eff713bed4f678bb4b9f9eda`.
**Done**: Published seven BPCT Part I chapters 13–19 records with 760 source-compared claims/citations and 276 child source dispositions. Individually inspected PDFs 190 and 222 are folio-only; chapter 15 closes on 189 and chapter 18 item 42 ends on 221. Parent page intervals remain unchanged.
**Evidence**: Fresh exact-head independent review returned `OK`, no findings. PR-head CI run 37435012519, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 2,901 tests (181 core, 2,720 knowledge); corpus freshness and package-export checks passed. Final asset 6,458,670 bytes fits the 6,553,600-byte Workbox per-file cap; all 18 assets remain precached. To address measured CI contention on the expanded registry, knowledge tests use serial file scheduling at two workers and two case-specific timeouts were raised; assertions and the generator child-process timeout remain unchanged.
**Coverage**: 276 children and seven parent obligations remain discovery/audit-unresolved for feat-087; source review and certification gates remain closed. Prior 224 records and 4,606 citations remain semantically unchanged. Contact-sheet inspection limits and source ambiguities are documented; no efficacy or clinical/safety authority is implied.
**Blockers**: none for feat-053.
**Next**: Stop here as requested; wait for the user's explicit direction before starting feat-054.

## Migration provenance

Migrated from [feat-053](../features/feat-053.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
