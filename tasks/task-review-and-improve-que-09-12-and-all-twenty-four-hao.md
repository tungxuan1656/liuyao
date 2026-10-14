# task-review-and-improve-que-09-12-and-all-twenty-four-hao - Review and improve quẻ 09–12 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 09 Phong Thiên Tiểu Súc; 10 Thiên Trạch Lý; 11 Địa Thiên Thái; 12 Thiên Địa Bĩ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 09 · Sơ (1).
- [x] 09 · Nhị (2).
- [x] 09 · Tam (3).
- [x] 09 · Tứ (4).
- [x] 09 · Ngũ (5).
- [x] 09 · Thượng (6).
- [x] 10 · Sơ (1).
- [x] 10 · Nhị (2).
- [x] 10 · Tam (3).
- [x] 10 · Tứ (4).
- [x] 10 · Ngũ (5).
- [x] 10 · Thượng (6).
- [x] 11 · Sơ (1).
- [x] 11 · Nhị (2).
- [x] 11 · Tam (3).
- [x] 11 · Tứ (4).
- [x] 11 · Ngũ (5).
- [x] 11 · Thượng (6).
- [x] 12 · Sơ (1).
- [x] 12 · Nhị (2).
- [x] 12 · Tam (3).
- [x] 12 · Tứ (4).
- [x] 12 · Ngũ (5).
- [x] 12 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done — merged to `main` in `9162858` (PR #98, squash-merged at exact reviewed head `69375fd9b1f7d76046fd66a497e9874e3dd45ba3`).
- Evidence:
  - Content: `packages/knowledge/data/hexagrams/hexagram-09.json` … `hexagram-12.json` at `HEAD`; five overview entries per quẻ and four attributed explanations on each of the 24 hào (Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy via "Ngô Tất Tố — dịch và chú giải"); seven `notes[]` entries, each naming a real source discrepancy with a page locator; no legacy `section`/`printedPages`/`condition` fields remain.
  - Verification: `./init.sh` passes (181 core tests, 97 knowledge tests, format, lint, typecheck, build, package exports); `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passes with 381 records, 381 ready, 4 supplied books.
  - Independent review: four read-only `reviewer` passes (rounds 1–4). Round 1 found 6 P1 and 4 P2, all fixed in `43a85cf`. Round 2 confirmed all ten fixed and left three P2, all fixed in `43a85cf`. Round 3 confirmed all three focus fixes against the extracted source, raised one further P2 in `hexagram-11.json` `lines[1].entries[0]` (an alternative reading presented as one settled instruction), and closed with "no P0/P1 findings". Round 4 confirmed that final fix against NHL PDF 170 and returned **no findings**.
  - Estimator limits: the reviewers cannot inspect PDF page images or run test commands, and the baseline/frozen-SHA invariant comparison in `.agent-work/task-review-and-improve-que-09-12-and-all-twenty-four-hao/invariants.md` is Leader-generated.
- Dependencies: none outstanding; `task-implement-versioned-audit-ledgers-and-completion-gates` and the matching `task-reviewed-knowledge-batch-ten`/`task-reviewed-que-41-44-and-bpct-sentences-12-16`–`task-reviewed-que-61-64-and-bpct-sentences-49-56` are `done`.
- Next: none for this feature. The batch continues with `task-review-and-improve-que-13-16-and-all-twenty-four-hao` (quẻ 13–16); no in-batch feature depends on task-review-and-improve-que-09-12-and-all-twenty-four-hao.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — task-review-and-improve-que-09-12-and-all-twenty-four-hao reviewed and improved quẻ 09–12

- Historical status: done; merged to `main` in `9162858` (PR #98), squash-merged at the exact reviewed head `69375fd9b1f7d76046fd66a497e9874e3dd45ba3`.
- Result: reviewed and improved all four assigned quẻ (09 Phong Thiên Tiểu Súc, 10 Thiên Trạch Lý, 11 Địa Thiên Thái, 12 Thiên Địa Bĩ) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”). Author-specific readings are kept distinct rather than harmonised, unresolved readings stay explicit, and seven `notes[]` entries record genuine source discrepancies with page locators.
- Model: removed the legacy `section` and `printedPages` reference fields from these four records. Of the twelve `condition` values dropped from quẻ 09 and 11, the two that carried substance moved into attributed prose; the rest were authoring boilerplate that `docs/product-specs/knowledge-quality.md` forbids repeating.
- Evidence: `./init.sh` passed (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Four independent read-only review rounds: round 1 found 6 P1 and 4 P2; rounds 2–3 confirmed each fix and raised four further P2s in total; round 4 returned no findings.
- Limits: reviewers inspected extracted page text, not page images, and did not execute the test commands; the baseline-vs-final invariant comparison (0 deviations, all 24 position/polarity/label tuples unchanged) is Leader-generated.
- Blockers: none for task-review-and-improve-que-09-12-and-all-twenty-four-hao.
- Next: activate task-review-and-improve-que-13-16-and-all-twenty-four-hao (Review and improve quẻ 13–16 and all twenty-four hào) from `main` at `9162858`.
