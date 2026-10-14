# task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers - Review and improve BPCT applications — Illness remedies and absent travellers

- Status: todo
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

- [ ] Chapter 23 — Tật Bệnh: every passage, condition, example, and note.
- [ ] Chapter 24 — Bệnh Thể: every passage, condition, example, and note.
- [ ] Chapter 25 — Y Dược: every passage, condition, example, and note.
- [ ] Chapter 26 — Hành Nhân: every passage, condition, example, and note.
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

- Evidence: Source-comparison pass on supplied BPCT PDF 270–301 (verified SHA-256: `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`): 145 child units across chapters 23–26 (44/29/39/33), four chapter units, and PDF 279 folio-only. Five source-specific wording defects repaired in three existing articles. JSON parsing and unchanged identifiers, reference arrays, and attributions checked on each edited record; an independent source review and repository verification have not yet been completed.
- Next: Ask an independent reviewer to inspect the five repairs and nearby source contexts, run `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` on the PR head, then record exact-head acceptance and close the task only when both pass.
- Blockers: not assessed: independent source review and required repository checks pending.

## T09 source-comparison findings (PR candidate, not acceptance)

All 145 child units have source locators; the chapter-unit coverage is 44 + 29 + 39 + 33.
PDF 279 was visually checked and contains only printed folio 241. Chapter 24 repeats item
14, and chapter 26 skips item 26: preserve these source features rather than inventing text.

- Chapter 23 / item 5 (BPCT PDF 272, printed 234): Replace vague “đói/no” with
  the source distinction “thương thực hoặc đói”.
- Chapter 23 / item 25 (PDF 277, printed 239): Say *hào tam lâm Không*, not
  ambiguous “Tam Không” (which could mean three empty lines).
- Chapter 25 / item 19 (PDF 291, printed 251): Keep the phú’s “Mộc đới Tài hưng”
  distinct from the Vietnamese gloss’s “vượng”; the commentary separately
  conditions its reading on Tài moving. These are historical claims, not dietary instructions.
- Chapter 26 / item 21 (PDF 299, printed 258): Specify *hào ngũ có Quỷ*, not
  “Ngũ Quỷ” as though it were a five-ghost category.
- Chapter 26 / item 28 (PDF 300, printed 259): Preserve “Nhật tính, Kỵ hưng”
  and “Thân lâm, Dụng phát” instead of treating Nhật as a moving line or
  the phrase as a single “Thân Dụng” condition.

Chapters 23–26 retain their phú, Vietnamese rendering, commentary, and Vĩnh Cao note
layers; chapter 23 additionally keeps the separate unsigned “Đông tà” insertion.
Chapter 24 was source-compared with no material content amendment warranted in this pass.
Source-attributed medical outcomes, ritual proposals, allegations about travellers,
and date judgments are historical claims, **not** clinical guidance or verified forecasts.

**Review gate remains open:** the writer's source comparison is not an independent
review; page images were inspected for PDFs 277, 279, 283, 291, 299, and 300
(not all 32 pages). Automated repository tests and complete source-image inspection
have not been performed in this environment.
This task remains `todo` until the PR's independent review and verification are
accepted; no review PASS or publication certificate is claimed.
