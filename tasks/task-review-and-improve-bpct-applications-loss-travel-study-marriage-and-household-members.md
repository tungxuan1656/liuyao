# task-review-and-improve-bpct-applications-loss-travel-study-marriage-and-household-members - Review and improve BPCT applications — Loss travel study marriage and household members

- Status: active
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-loss-travel-study-marriage-and-household-members](task-complete-bpct-applications-loss-travel-study-marriage-and-household-members.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior. No unrelated refactors, record splits, ID or
route changes, or edits outside the assigned group.

## Acceptance

- [ ] Chapter 13 — Thất Thoát: every passage, condition, example, and note.
- [ ] Chapter 14 — Xuất Hành: every passage, condition, example, and note.
- [ ] Chapter 15 — Cầu Sư: every passage, condition, example, and note.
- [ ] Chapter 16 — Học Quán: every passage, condition, example, and note.
- [ ] Chapter 17 — Hôn Nhân: every passage, condition, example, and note.
- [ ] Chapter 18 — Sản Dục: every passage, condition, example, and note.
- [ ] Chapter 19 — Tiến Nhân Khẩu: every passage, condition, example, and note.
- [ ] Preserve reported outcomes as attributed claims; reconcile reused rules and explicit exclusions.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality and agent execution gate](../docs/product-specs/knowledge-quality.md#agent-execution-gate),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve every gate finding: repair supported defects, then re-verify the final revision.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: Started after confirming all three required-to-start tasks are marked done on `main`. Checked the seven BPCT chapter record structures against the supplied PDF boundaries (PDF 166–230): 246 main-section locators, 28 note locators, and two folio-only observations (= 276 child locators). Each published entry's paragraph count matches its reference count; all citations remain within the assigned PDF range. Inspected source text and commentary for PDF 166–168, 176–180, 191–194, 200–204, 208–210, 212–215, and 223–230. Verified the deliberate numbering gaps (chapter 15 lacks 16; chapter 17 lacks 31; chapter 18 lacks 41) and folio-only PDFs 190/222. Material finding: chapter 19, item 15 (PDF 227, printed 194), has a truncated object after “hợp với ư”. Fixed the published Lời bình paraphrase so it does not invent a specific line or party for this incomplete construction. These are *structural* and *sampled semantic* checks, **not** a complete clause-by-clause sign-off for 276 source units.
- Blockers: Full clause-by-clause review of every passage and remaining notes, an independent review of materially changed assertions, source-page image checks where typography affects meaning, and final-head repository verification are outstanding. Do not mark the seven chapter acceptance boxes or this task done before those gates pass.
- Next: Have an independent reviewer inspect chapter 19 item 15 on PDF 227 against the changed text and complete remaining full-source checks across chapters 13–19; then run `pnpm tasks:index`, `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, and `./init.sh` on the final revision and record results.
