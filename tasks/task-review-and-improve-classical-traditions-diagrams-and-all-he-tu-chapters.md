# task-review-and-improve-classical-traditions-diagrams-and-all-he-tu-chapters - Review and improve classical traditions diagrams and all Hệ Từ chapters

- Status: active
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

- [ ] NHL chapters 1–7, front matter, Part II introduction, and retrospective.
- [ ] NTT translator, Trình Di, Chu Hy diagrams, Cương Lĩnh, and colophon.
- [ ] PBC front/end matter and surviving Thuyết/Tự/Tạp Quái.
- [ ] Hệ Từ Thượng: each of twelve chapters in both NHL and PBC.
- [ ] Hệ Từ Hạ: each of twelve chapters in both NHL and PBC.
- [ ] Record each diagram and author layer separately; never imply edition omissions were recovered.
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

- Evidence: All six start dependencies are `done` on main. This branch has an initial source-fidelity repair in NHL Hệ Từ Hạ V: rendered NHL PDF 372 confirms `nhắm mắt` (the inherited claim `nhắm mà` was false); retained its page reference and author attribution. PBC Hệ Từ Hạ VII was re-read directly at PDF 638–640 and the repetitive nine-quẻ paragraphs rewritten as coherent notes on đức/tài/dụng, preserving all 34 entry references and separate Hán Thư/Luận Ngữ attributions. Spot-inspected images: NTT PDF 20, 35 and 41 (Hà/Lạc, 64-quẻ round/square, Văn Vương's compass); PBC PDF 11–12 (two 32-cell diagrams); NHL PDF 372. This is an initial focused pass, **not** completion of every T12 unit, and **not** an independent review.
- Blockers: Independent source review of the two changed assertions and the remaining assigned chapter/figure units is pending. The full repository verification workflow has not been executed in this GitHub-connected session; validate on the PR's exact head. No final publication sign-off.
- Next: Review the corrected NHL PDF 372 reading and revised PBC PDF 638–640 explanation independently, then inspect and resolve the remaining assigned NHL/NTT/PBC chapters and diagrams. Run `./init.sh` and the book-backed corpus validator on the exact final revision before checking acceptance boxes and marking this task done.
