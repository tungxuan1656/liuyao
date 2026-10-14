# task-review-and-improve-ordered-lessons-and-every-worked-example - Review and improve ordered lessons and every worked example

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-author-ordered-lessons-and-reviewed-worked-examples](task-author-ordered-lessons-and-reviewed-worked-examples.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [x] Foundations lessons.
- [x] Classical-reading lessons.
- [x] Liu Yao-board lessons.
- [x] Every worked example, input, source route, and independently expected result.
- [x] Review every explanatory block against its supporting records and source passages and the intended audience.
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

- Evidence: Completed attributed source review of all 17 lesson blocks across four ordered
  lessons and independently inspected all three worked examples (input values, six positions,
  moving patterns, primary/changed quẻ, palace, Thế/Ứng, Nạp Giáp, elemental relations, and
  source routes). Inspected supplied book passages: NHL PDF pp. 35–40, 59–61, 72–73, 128,
  131–135, 153, 166; PBC pp. 30–31; NTT pp. 80–81; BPCT pp. 8–14, 49, 61.
  Repaired: (1) BPCT PDF p. 61 (printed p. 50) Tụng's third line hidden Quan Quỷ Hợi Thủy
  (Phục thần) below Ngọ Hỏa; (2) NHL pp. 134–135 Càn's six changing lines with Dụng cửu
  attributed commentary. Added regression test assertions in `content-worked-readings.test.ts`.
  Passed full `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books`.
- Next: Merge PR into main.
- Blockers: None.
