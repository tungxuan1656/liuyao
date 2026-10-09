# feat-080 — Review and improve quẻ 49–52 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 49 · Sơ (1).
- [x] 49 · Nhị (2).
- [x] 49 · Tam (3).
- [x] 49 · Tứ (4).
- [x] 49 · Ngũ (5).
- [x] 49 · Thượng (6).
- [x] 50 · Sơ (1).
- [x] 50 · Nhị (2).
- [x] 50 · Tam (3).
- [x] 50 · Tứ (4).
- [x] 50 · Ngũ (5).
- [x] 50 · Thượng (6).
- [x] 51 · Sơ (1).
- [x] 51 · Nhị (2).
- [x] 51 · Tam (3).
- [x] 51 · Tứ (4).
- [x] 51 · Ngũ (5).
- [x] 51 · Thượng (6).
- [x] 52 · Sơ (1).
- [x] 52 · Nhị (2).
- [x] 52 · Tam (3).
- [x] 52 · Tứ (4).
- [x] 52 · Ngũ (5).
- [x] 52 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Four parallel writers, one per quẻ file, with per-entry provenance tables and no length target.
2. Round 1 exhaustive review across all attributed entries against source texts.
3. Round 2 verification of corrections and high-risk passages.
4. Leader runs shared validation, verifies any image-dependent notes, and records evidence.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Decision log

### Round 2 ran on a different reviewer model

- **Question:** the batch contract requires a second verification round by a fresh read-only reviewer. The
  `reviewer` role's model (`9router/cx/gpt-6.1-sol`) served round 1, then its provider lost its credentials
  mid-session: two dispatches of all three round-2 children failed at launch with
  `9router API error (404): No active credentials for provider: codex`.
- **Decision:** the operator chose `9router/ag/gemini-3.8-flash` for round 2 rather than waiting for the
  codex credentials to return, moving to Claude Sonnet 4.6, or falling back to Leader-only verification.
- **Alternatives:** dropping round 2 was rejected first — the round-1 P0 was a fix no second reader would
  then have checked, and the batch's own lesson from feat-072 is that a single round's PASS is not a gate.
- **Rationale:** the task text, the read-only reviewer role and the acceptance bar are unchanged; only the
  model differs, and a fixed bar read by a different reviewer is a stronger check than no second reviewer.
- **Evidence:** failed workflows `9871565b-ccca-4935-9c41-4fbb8aa9ec92` and
  `3dbad700-307e-4321-a82e-4a7be140c373` (all children failed before any report was written); the third
  workflow `288e29cb-92d5-4a39-9979-98632683d872` completed all three children.
- **Effect:** the two rounds are not a like-for-like model comparison, and the PR body says so. No finding
  changed because of the substitution.

### Completion records were written before the merge

- **Question:** feat-072 recorded its completion in a commit made on `main` after its PR merged. The
  operator directed that this feature record be written and pushed while the PR is still open.
- **Decision:** check the acceptance criteria, mark feat-080 `done` in `feature_index.json` and record the
  evidence here on the feature branch, without merging.
- **Alternatives:** holding the records back for a post-merge commit on `main` (the feat-072 pattern).
- **Rationale:** the operator's explicit instruction, and the record is verifiable against the frozen head
  either way.
- **Evidence:** this file, `feature_index.json` and the `progress.md` block.
- **Effect:** `main` keeps feat-080 as `todo` until the PR merges; the branch is otherwise the same corpus.

## Handoff

- State: done.
- Evidence: reviewed corpus head `c78b044779194c891599d36fa7c75851640155f8` — the complete corpus change;
  the commits that follow it add only records (`ed0f7d6` activation, `ba77b62` completion) and the `main`
  merge. Open PR #108, **not merged**, exact-head CI green (`verify`, Cloudflare Pages, GitGuardian) with
  `mergeStateStatus: CLEAN`. `./init.sh` passed with `=== Verification passed ===` (181 core tests + 97
  knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check`
  reported 381
  records, 381 ready, 4 supplied books. Structure invariants unchanged against baseline `b9d306d`: 0 of 4
  files changed an invariant field, all 24 `(position, polarity, label)` tuples and every entry count
  unchanged; references 65→64 (Cách, duplicate dropped), 63→63, 57→57, 63→65 (Cấn, two Chu Hy pages
  added). Review rounds 1–2 recorded above; the five `notes[]` image claims were rendered with PyMuPDF and
  read by the Leader. Reports: `.agent-work/feat-080/reports/h{49,50,51,52}-report.md`,
  `.agent-work/feat-080/reviews/r1-h*.md` and `r2-h*.md`, `.agent-work/feat-080/notes-image-verification.md`.
- Blockers: none.
- Limits: the reviewer children read extracted page text and cannot see page images, and they did not run
  the test commands; the invariant comparison is Leader-generated. Round 2 verified the four corrections
  and 41 risk cells rather than re-walking all 122 entries, so a defect outside those cells would still be
  undetected. The reviewer's provider losing credentials mid-feature is an environment limit worth
  expecting again in this batch.
- Dependencies: [feature index](../feature_index.json).
- Next: review and merge PR #108; the rest of the batch (feat-081, feat-082, feat-083) is still `todo`.

## Follow-up review and integration — 2026-10-09

- The operator requested review and fixes on PR #108 while leaving it unmerged. Confirmed PR #112 / feat-079 already merged and fetched updated `main`; the feature index on `main` was `feat-080: todo`, `feat-081: done`, `feat-082: done`, `feat-083: todo`. Kept these later statuses and preserved the older `feat-074: active` entry without changing unrelated features.
- Inspected four quẻ / 24 hào / citation shapes and re-read the disputed Ngô Tất Tố, Phan Bội Châu and Nguyễn Hiến Lê pages for quẻ 49–52. One further **source-content defect** was found in a previously reviewed cell: `hexagram-52.json`, Lục Nhị, Phan Bội Châu text states `cứu được tam nên không vui`, directly reversing his explanation. **PBC PDF 497** explicitly says `Nhị ... không sức chỉ được Tam`, `không thể chữa được` and `không cứu chửng được` in the Tiểu Tượng, so this entry now correctly says Nhị cannot restrain or repair Tam, must follow and is unhappy.
- No further actionable source-text discrepancy was confirmed in the high-risk passages checked. Earlier reviewer reports and their limitations remain described above; this follow-up does not claim to redo the entire independent two-round audit.
- Synchronized the branch with latest `main` via a merge commit preserving all new append-only `progress.md` entries, `feature_index.json` changes from other PRs, and the reviewed quẻ 49–52 data. No identity, polarity, author-layer count or reference shape changed; five source notes remain.
- Marked `feat-080` **done** in the feature index on this PR, before operator merge as directed. Run CI against final branch head. PR remains open; the operator will squash merge manually.
