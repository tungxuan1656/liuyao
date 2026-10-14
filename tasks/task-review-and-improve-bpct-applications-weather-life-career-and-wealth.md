# task-review-and-improve-bpct-applications-weather-life-career-and-wealth - Review and improve BPCT applications — Weather life career and wealth

- Status: active
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-weather-life-career-and-wealth](task-complete-bpct-applications-weather-life-career-and-wealth.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [ ] Chapter 7 — Thiên Thời: every passage, condition, example, and note.
- [ ] Niên Thời — unnumbered: every passage, condition, example, and note.
- [ ] Chapter 9 — Thân Mệnh: every passage, condition, example, and note.
- [ ] Chapter 10 — Cầu Danh: every passage, condition, example, and note.
- [ ] Chapter 11 — Sĩ Hoạn: every passage, condition, example, and note.
- [ ] Chapter 12 — Cầu Tài: every passage, condition, example, and note.
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

- Evidence: Started an attributed source review of the six published BPCT articles for PDF
  101–165 (Thiên Thời, Niên Thời, Thân Mệnh and its unsigned insertion, Cầu Danh, Sĩ
  Hoạn, Cầu Tài). Checked all 941 paragraph/source-reference mappings mechanically:
  each entry's paragraph count matches its citations and all page intervals remain inside
  its assigned section. Inspected representative source text and 17 PDF page images at
  unit boundaries, the Thân Mệnh insertion and chapter 12's folio-only PDF 165. Repaired
  one material condition change in Sĩ Hoạn, câu 10 (PDF 151 / printed 126):
  source "Tài lâm, Phúc động" had been compressed to "Tài và Phúc động".
  This is a partial content review, not an assertion that all clauses were inspected.
- Next: Complete clause-by-clause source comparison for every assigned section and its
  notes and examples; obtain independent review of the changed claim and direct uses.
  Run `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`,
  re-verify the PR head, then check the acceptance items before marking done.
- Blockers: Independent content review and full local/CI verification remain pending.
