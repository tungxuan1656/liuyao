# task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers - Review and improve BPCT applications — Illness remedies and absent travellers

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-illness-remedies-and-absent-travellers](task-complete-bpct-applications-illness-remedies-and-absent-travellers.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [x] Chapter 23 — Tật Bệnh: every passage, condition, example, and note.
- [x] Chapter 24 — Bệnh Thể: every passage, condition, example, and note.
- [x] Chapter 25 — Y Dược: every passage, condition, example, and note.
- [x] Chapter 26 — Hành Nhân: every passage, condition, example, and note.
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

- Evidence: Completed attributed source review of BPCT chapters 23–26 (PDF 270–301,
  145 child units). Repaired five textual findings: (1) ch 23 §5 (PDF 272) "thương thực hoặc đói";
  (2) ch 23 §25 (PDF 277) "Hào tam lâm Không gắn lưng yếu/đau"; (3) ch 25 §19 (PDF 291)
  reconciled phú 'hưng' vs translation 'vượng'; (4) ch 26 §21 (PDF 299) "Hào ngũ có Quỷ"
  distinguished from spirit Ngũ Quỷ; (5) ch 26 §28 (PDF 300) separated day branch from
  moving lines. Local `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books`
  passed cleanly.
- Next: Merge PR into main.
- Blockers: None.
