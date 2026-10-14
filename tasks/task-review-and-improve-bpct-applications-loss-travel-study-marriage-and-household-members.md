# task-review-and-improve-bpct-applications-loss-travel-study-marriage-and-household-members - Review and improve BPCT applications — Loss travel study marriage and household members

- Status: done
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

- [x] Chapter 13 — Thất Thoát: every passage, condition, example, and note.
- [x] Chapter 14 — Xuất Hành: every passage, condition, example, and note.
- [x] Chapter 15 — Cầu Sư: every passage, condition, example, and note.
- [x] Chapter 16 — Học Quán: every passage, condition, example, and note.
- [x] Chapter 17 — Hôn Nhân: every passage, condition, example, and note.
- [x] Chapter 18 — Sản Dục: every passage, condition, example, and note.
- [x] Chapter 19 — Tiến Nhân Khẩu: every passage, condition, example, and note.
- [x] Preserve reported outcomes as attributed claims; reconcile reused rules and explicit exclusions.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

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

- Evidence: Completed attributed source review of the seven chapter records against BPCT
  PDF 166–230 (Chapters 13–19: Thất Thoát, Xuất Hành, Cầu Sư, Học Quán, Hôn Nhân,
  Sản Dục, Tiến Nhân Khẩu). Verified all 276 child units (246 section, 28 note, two folio-only
  locators). Confirmed source numbering gaps at chapter 15 item 16, chapter 17 item 31,
  chapter 18 item 41, and folio-only PDF 190, 222. Chapter 19 item 15 (PDF 227 / printed 194)
  carefully documented truncated wording “hợp với ư” without speculative addition.
  Passed local `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books`.
- Next: Merge PR into main.
- Blockers: None.
