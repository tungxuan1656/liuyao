# task-review-and-improve-que-33-36-and-all-twenty-four-hao - Review and improve quẻ 33–36 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 33 Thiên Sơn Độn; 34 Lôi Thiên Đại Tráng; 35 Hỏa Địa Tấn; 36 Địa Hỏa Minh Di.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 33 · Sơ (1).
- [x] 33 · Nhị (2).
- [x] 33 · Tam (3).
- [x] 33 · Tứ (4).
- [x] 33 · Ngũ (5).
- [x] 33 · Thượng (6).
- [x] 34 · Sơ (1).
- [x] 34 · Nhị (2).
- [x] 34 · Tam (3).
- [x] 34 · Tứ (4).
- [x] 34 · Ngũ (5).
- [x] 34 · Thượng (6).
- [x] 35 · Sơ (1).
- [x] 35 · Nhị (2).
- [x] 35 · Tam (3).
- [x] 35 · Tứ (4).
- [x] 35 · Ngũ (5).
- [x] 35 · Thượng (6).
- [x] 36 · Sơ (1).
- [x] 36 · Nhị (2).
- [x] 36 · Tam (3).
- [x] 36 · Tứ (4).
- [x] 36 · Ngũ (5).
- [x] 36 · Thượng (6).
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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- **Status:** implementation, round-1 repair and round-2 verification are complete on branch `tungxuan1656/task-review-and-improve-que-33-36-and-all-twenty-four-hao`; PR [#110](https://github.com/tungxuan1656/liuyao/pull/110) is open and awaiting merge. `tasks/index.md` keeps this feature at `todo` because the single `active` slot is held by task-review-and-improve-que-25-28-and-all-twenty-four-hao (already merged in PR #104, still awaiting status cleanup) and this repository marks a feature `done` only once it is merged.
- **Blockers:** none.
- **Limits:** reviewer lanes read extracted page text only and never page images, so the seven image-dependent note claims remain Leader-verified; the invariant comparison and the page renders are Leader-generated; the round-2 model had to be changed after the reviewer provider returned “No active credentials for provider: codex”.
- **Next action:** merge PR [#110](https://github.com/tungxuan1656/liuyao/pull/110), then set task-review-and-improve-que-33-36-and-all-twenty-four-hao to `done` in [frozen index](../tasks/index.md). Note for the operator: task-review-and-improve-que-21-24-and-all-twenty-four-hao (quẻ 21–24) is already `done`; task-review-and-improve-que-25-28-and-all-twenty-four-hao (quẻ 25–28) was merged in PR [#104](https://github.com/tungxuan1656/liuyao/pull/104), but its index entry is still `active` on `main`.

#### Follow-up review — 2026-10-09

- Re-checked the newly added Chu Hy layers and risk passages against NTT PDF 538–581, NHL PDF 236–247 and PBC PDF 329–357; no new actionable source-fidelity finding in the reviewed passages.
- Reconciled append-only `task handoff history` with current `main` instead of overwriting newer entries. Kept `task-review-and-improve-que-33-36-and-all-twenty-four-hao` `todo` until merge; the separate task-review-and-improve-que-25-28-and-all-twenty-four-hao status cleanup is out of scope.
- Rerun CI on this synchronised branch; verification quoted for `4e69953` applies only to that historical revision.

#### Operator sign-off — 2026-10-09

- At the operator's request, `task-review-and-improve-que-33-36-and-all-twenty-four-hao` was marked `done` in `tasks/index.md` **before merging** so PR [#110](https://github.com/tungxuan1656/liuyao/pull/110) can be merged manually. This supersedes the earlier handoff's `todo until merge` convention.
- The content review, source corrections, branch synchronisation and CI checks were completed in the PR. Do not merge automatically; the operator will merge it.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — task-review-and-improve-que-33-36-and-all-twenty-four-hao marked done for operator merge

- Historical status: `done` in `tasks/index.md` on PR #110 by explicit operator request, ahead of the operator's manual merge. The PR stays open and unmerged by the agent.
- Evidence: two content review rounds for quẻ 33–36, the follow-up review and current-main synchronisation in `3a56c91`, and successful CI on that revision. The sign-off intentionally supersedes the older `todo until merge` handoff; source details remain recorded in `task-review-and-improve-que-33-36-and-all-twenty-four-hao`.
- Next: operator merges PR #110 into `main` after the final check.
