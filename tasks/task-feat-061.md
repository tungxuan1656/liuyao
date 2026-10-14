# feat-061 - Complete Hệ Từ Thượng across NHL and PBC

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-060](task-feat-060.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 334–362; PBC PDF 601–630; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Thượng chapters 1–6: both books and all named layers.
- [x] Thượng chapters 7–12: both books and all named layers.
- [x] Give each chapter and named layer its own disposition. Keep PBC's explicit omissions edition-specific; do not treat NHL's complete text or NTT (Ngô Tất Tố) excerpts as PBC coverage.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review chapters 1–6 and commit.
2. Review chapters 7–12 and commit.
3. Reconcile quẻ-level quotations, notes, and exclusions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #89 at `eb66085cc62686686e388e23e7a2b5e4ba5f9ac4`, from reviewed head `125a3a4928d3c917db3338a1bfa9df28bd5a13f7`.
- Evidence: Independent exact-head review returned `OK`, no findings. The review reconciled all 50 paths from base `6139d39` to HEAD, including the parent-owned feat-061 activation in `feature_index.json`; `progress.md` was not changed on the feature branch. Verify run `37556788220`/job `112584763898`, Cloudflare Pages, and GitGuardian passed. Pre-push `./init.sh` passed 5,651 tests (5,470 knowledge, 181 core); corpus/books, package exports, focused tests, preservation and offline checks passed.
- Coverage: 26 records add 430 claims/citations for 12 NHL and 12 PBC chapter parents plus title/framing. All 321 prior records and 8,683 citations remain byte-identical. PBC omissions and partial sections are edition-specific; NHL chapters 6 and 9 remain present despite its parenthetical statements about PBC. The 11,892,554-byte asset fits the 12 MiB Workbox cap by 690,358 bytes; all 18 precache entries remain.
- Open gates: Source audit 092, global source review and corpus certification remain closed/incomplete. No missing text was reconstructed and no predictive or modern medical/legal/safety authority is claimed.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Continue with selected feat-062 from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — feat-061 merged

**State**: done and merged to `main` in PR #89 at `eb66085cc62686686e388e23e7a2b5e4ba5f9ac4`; reviewed exact head `125a3a4928d3c917db3338a1bfa9df28bd5a13f7`.
**Done**: Added 26 source-comparison records for Hệ Từ Thượng across NHL PDF 334–362 and PBC PDF 601–630, with 430 source-attributed claims/citations. NHL and PBC dispositions remain edition-specific; no NTT (Ngô Tất Tố) text or citation is used. PBC's explicit missing notices, partial sections and cross-references are preserved without reconstruction.
**Evidence**: Independent exact-head review returned `OK`, no findings; it reconciled 50 paths from base `6139d39`, including the parent-owned activation change. Verify run `37556788220`/job `112584763898`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 5,651 tests (5,470 knowledge, 181 core); corpus/books, focused 436 cases, package exports, preservation and 194 offline documentation-route checks passed.
**Coverage**: Total corpus is 347 records/8,867 claims/9,113 citations; prior 321 records/8,683 citations and public projections are byte-identical. Registry revision55 has3,981 groups and17 exclusions. The 11,892,554-byte integrated asset fits the measured 12 MiB Workbox cap by690,358 bytes; all18 precache entries remain. Source audit092, global source review and certification remain closed/incomplete; no efficacy or modern advice is claimed.
**Blockers**: none for feat-061.
**Next**: Continue with selected feat-062 from updated `main`.

## Migration provenance

Migrated from [feat-061](../features/feat-061.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
