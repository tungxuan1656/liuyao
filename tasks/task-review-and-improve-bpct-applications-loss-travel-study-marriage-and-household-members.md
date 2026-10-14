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

- Evidence: All three prerequisites are marked done on `main`. Inspected the seven chapter
  records against BPCT PDF 166–230: 246 section, 28 note and two folio-only locators (276
  child units). Each entry's paragraph count matches its references; all citations are in
  range. Compared sampled source text on PDF 166–168, 176–180, 191–194, 200–204,
  208–210, 212–215 and 223–230. Confirmed numbering gaps at chapter 15 item 16,
  chapter 17 item 31, chapter 18 item 41, plus folio-only PDF 190 and 222.
  Chapter 19 item 15 (PDF 227 / printed 194) contains the truncated wording
  “hợp với ư” in the _rendered page image_ as well as extracted text. Corrected
  its Lời bình paraphrase without guessing the missing object. This is structural
  and sampled content review, **not** a complete 276-unit semantic audit.
- Blockers: Clause-by-clause source review of the remaining units; independent review
  of changed knowledge; outstanding source-image checks; final-head verification.
  Keep the seven chapter acceptance items unchecked and the task active until
  all gates pass.
- Next: Independently review the chapter 19 item 15 correction against PDF 227,
  complete chapter 13–19 source checks, regenerate `tasks/index.md` with
  `pnpm tasks:index`, and run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
  plus `./init.sh`. Record the final revision and outcomes.
