# task-review-and-improve-ordered-lessons-and-every-worked-example - Review and improve ordered lessons and every worked example

- Status: todo
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

- Evidence (2026-10-14, T13 proposed PR): Read all 17 lesson blocks across four ordered lessons and independently inspected all three worked examples (input values, six positions, moving patterns, primary/changed quẻ, palace, Thế/Ứng, Nạp Giáp, elemental relations and source routes). Kept project input convention distinct from source terminology. Inspected the supplied book passages: NHL PDF pp. 35–40, 59–61, 72–73, 128, 131–135, 153 and 166; PBC pp. 30–31; NTT pp. 80–81; BPCT pp. 8–14, 49 and 61, including the rendered BPCT board images on pp. 49 and 61. Reviewed existing source pointers against the assigned concepts; existing fixture expectations were not regenerated from the core calculator.
- Material findings repaired in this PR: (1) BPCT PDF p. 61 (printed p. 50) gives Tụng's third line a hidden Quan Quỷ Hợi Thủy (Phục thần) below Ngọ Hỏa; the worked explanation omitted it. (2) NHL pp. 134–135 treats Càn's six changing lines with the special Dụng cửu passage and multiple attributed readings, missing from the worked lesson. Also clarified paired Thế/Ứng positions, the Khảm/Càn Nạp Giáp derivation, the five kinship relations plus “Ta”, and a Càn relative-classification calculation.
- Follow-up verification: focused regression assertions now protect source-page routes for the two missing readings; existing hand-authored expected facts for the three examples remain unchanged. Full `./init.sh`, corpus check, CI and independent review have **not** yet been verified; do not mark the task done from this handoff alone.
- Blockers: external independent content review and verification evidence needed before completing the publication gate; no known unresolved source contradiction in the inspected three worked examples.
- Next: Have a reviewer inspect these changed assertions against BPCT PDF p. 61 and NHL PDF pp. 134–135 (including the page images where needed), run the PR checks and `./init.sh` / corpus validation, then check the final revision, mark the task done, and regenerate `tasks/index.md` with `pnpm tasks:index`.
