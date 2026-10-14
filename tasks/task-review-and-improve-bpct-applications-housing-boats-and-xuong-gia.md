# task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia - Review and improve BPCT applications — Housing boats and Xướng Gia

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-housing-boats-and-xuong-gia](task-complete-bpct-applications-housing-boats-and-xuong-gia.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [x] Chapter 20 — Gia Trạch: every passage, condition, example, and note.
- [x] Chapter 20 supplement — Tân Tăng Gia Trạch: every passage, condition, example, and note.
- [x] Chapter 21 — Châu Thuyền: every passage, condition, example, and note.
- [x] Chapter 22 — Xướng Gia: every passage, condition, example, and note.
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

- Evidence: Completed attributed source review of BPCT PDF 231–269 (Gia Trạch, Thuyền Gia Trạch,
  Tân Tăng Gia Trạch, Châu Thuyền, Xướng Gia). All 494 direct references verified within
  the assigned page window. Repaired: Xướng Gia opening (PDF 266 / printed 228) restored
  "xung khắc" (若要安甯必得世無冲剋); Châu Thuyền §6 (PDF 264 / printed 227) restored
  "khô cháy" and "dây chắc" for Đằng Xà. Local verification `./init.sh` and
  `pnpm --filter @liuyao/knowledge validate:corpus --check-books` passed cleanly.
- Next: Merge PR into main.
- Blockers: None.
