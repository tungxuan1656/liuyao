# task-review-and-improve-classical-traditions-diagrams-and-all-he-tu-chapters - Review and improve classical traditions diagrams and all Hệ Từ chapters

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-nhl-introductory-chapters-and-framing](task-complete-nhl-introductory-chapters-and-framing.md), [task-complete-ntt-and-pbc-introductory-traditions-and-diagrams](task-complete-ntt-and-pbc-introductory-traditions-and-diagrams.md), [task-complete-he-tu-thuong-across-nhl-and-pbc](task-complete-he-tu-thuong-across-nhl-and-pbc.md), [task-complete-he-tu-ha-across-nhl-and-pbc](task-complete-he-tu-ha-across-nhl-and-pbc.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [x] NHL chapters 1–7, front matter, Part II introduction, and retrospective.
- [x] NTT translator, Trình Di, Chu Hy diagrams, Cương Lĩnh, and colophon.
- [x] PBC front/end matter and surviving Thuyết/Tự/Tạp Quái.
- [x] Hệ Từ Thượng: each of twelve chapters in both NHL and PBC.
- [x] Hệ Từ Hạ: each of twelve chapters in both NHL and PBC.
- [x] Record each diagram and author layer separately; never imply edition omissions were recovered.
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

- Evidence: Completed attributed source review across NHL, NTT, and PBC introductory
  traditions, diagrams, and Hệ Từ Thượng & Hạ chapters. Repaired: (1) NHL Hệ Từ Hạ V
  (PDF 372) confirmed print reading “thiệc là nhắm mắt bắn một con vật”; (2) PBC Hệ Từ Hạ VII
  (PDF 638–640) streamlined nine-quẻ hoạn nạn explanations across đức/tài/dụng while
  preserving all 34 entry references and separate Hán Thư/Luận Ngữ attributions.
  Spot-inspected diagram page images in NTT (PDF 20, 35, 41), PBC (PDF 11–12), NHL (PDF 372).
  Local `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books`
  passed cleanly.
- Next: Merge PR into main.
- Blockers: None.
