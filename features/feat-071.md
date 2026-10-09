# feat-071 — Review and improve quẻ 13–16 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 13 Thiên Hỏa Đồng Nhân; 14 Hỏa Thiên Đại Hữu; 15 Địa Sơn Khiêm; 16 Lôi Địa Dự.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 13 · Sơ (1).
- [ ] 13 · Nhị (2).
- [ ] 13 · Tam (3).
- [ ] 13 · Tứ (4).
- [ ] 13 · Ngũ (5).
- [ ] 13 · Thượng (6).
- [ ] 14 · Sơ (1).
- [ ] 14 · Nhị (2).
- [ ] 14 · Tam (3).
- [ ] 14 · Tứ (4).
- [ ] 14 · Ngũ (5).
- [ ] 14 · Thượng (6).
- [ ] 15 · Sơ (1).
- [ ] 15 · Nhị (2).
- [ ] 15 · Tam (3).
- [ ] 15 · Tứ (4).
- [ ] 15 · Ngũ (5).
- [ ] 15 · Thượng (6).
- [ ] 16 · Sơ (1).
- [ ] 16 · Nhị (2).
- [ ] 16 · Tam (3).
- [ ] 16 · Tứ (4).
- [ ] 16 · Ngũ (5).
- [ ] 16 · Thượng (6).
- [ ] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [ ] Inspect full passages/images; review each source error and exclusion.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Decision log

### Four writers own four quẻ in parallel, reviewed once

- **Question**: Review quẻ 13–16 with one writer at a time, or four writers in parallel?
- **Decision**: One writer per quẻ, all four dispatched in parallel, followed by a single independent review covering all four quẻ.
- **Alternatives**: (a) one writer for the whole feature; (b) one writer per quẻ with one review per quẻ.
- **Rationale**: The four files are disjoint, so parallel writers cannot conflict; the user asked for this shape. A single review over the whole feature keeps one review verdict per deliverable and matches feat-070's accepted flow.
- **Evidence**: `packages/knowledge/data/hexagrams/hexagram-13.json` through `hexagram-16.json` are separate records with no cross-references inside the feature.
- **Effect**: Four writers ran concurrently; the Leader verified structure, notes and gates before freezing the tree.

### Review dispatched as a direct subagent instead of a workflow child

- **Question**: Run the review as a child inside the workflow, or as a direct `subagent` call?
- **Decision**: Direct `subagent({agent: 'reviewer'})`, with the reviewer told not to call `compress`.
- **Alternatives**: (a) a `review` stage inside the workflow; (b) skip independent review.
- **Rationale**: The equivalent review stage failed in feat-070 as a lane-infrastructure error — the child's own `compress` call produced a `marker-…` message id the provider rejected (`Invalid 'input[14].id': Expected an ID that begins with 'msg'`). The failure was in the harness, not the verdict.
- **Evidence**: feat-070 review run `033a2367` failed with `9router API error (400)` on that marker id; the same review passed as a direct subagent call.
- **Effect**: Reviews for this feature run as direct subagents with a no-`compress` instruction.

### Leader applies the round-2 review fixes directly

- **Question**: The round-2 review left five content findings (four P1, one P2) that all take the same form — another author's explanation imported into Nguyễn Hiến Lê's layer, or a cause assigned to a phrase that the source does not give it. Dispatch another writer, or apply them as Leader?
- **Decision**: The Leader applied all five directly in the commit `fix(knowledge): keep each author's own reading in quẻ 13–16`, verifying each against the cited extracted page before editing, and a fresh reviewer then re-checked the fix diff.
- **Alternatives**: (a) dispatch a `worker` for the five edits; (b) accept them as known notes and merge.
- **Rationale**: Each finding already carried the exact source page and the exact correction, so no source discovery was left. The two prior writer rounds had each introduced new instances of this same defect class while rewriting unflagged prose, so a further rewrite round carried more risk of a new import than of a fix. The delivery contract's single-writer rule is about avoiding concurrent writers, and only the Leader was writing at that point.
- **Evidence**: NHL PDF 178 attaches the absent responding hào to the unfulfilled aspiration, not to `vô hối`; NHL PDF 184 gives "vì tài kém" as the only limit on Thượng lục's campaign; NHL PDF 187 grounds the hope of reform in `Chấn` meaning movement and never states `cùng tắc biến` or `cố tật`; NHL PDF 180 describes only a heavy cart travelling far, with no cargo-integrity gloss; NHL PDF 183 gives the reputation warning without the inner-to-outer or bird gloss.
- **Effect**: All five found texts now read as their author wrote them. One further fidelity repair was made in the same commit on a sentence the review did not name: the quẻ 16 Thượng lục entry credited the closing Mạnh Tử quotation to NHL directly, while NHL PDF 187 credits it to Phan Bội Châu.

### Leader applies the round-3 review fixes directly

- **Question**: The round-3 review — the first exhaustive sweep of all twenty-four hào — left eleven findings (eight P1, three P2), all but two in Nguyễn Hiến Lê's layers. Dispatch a writer again, or apply them as Leader?
- **Decision**: The Leader applied all eleven directly, removing only the unsupported clause in each case and restoring the author's own wording, then re-ran the gates.
- **Alternatives**: (a) dispatch a `worker` for the eleven edits; (b) rewrite every Nguyễn Hiến Lê layer from the extracted source text.
- **Rationale**: Same as the round-2 decision, now with more evidence: three writer rounds had produced ten, five and eleven instances of one defect class, so the readers' padding of the short Nguyễn Hiến Lê layers was systematic rather than incidental. Each finding again carried the exact source page and correction. Rewriting all layers would have replaced a converging repair with a fresh rewrite of unflagged, already-verified prose.
- **Evidence**: NTT PDF 289 gives "không hệ ứng"/"không thiên tư"/"chưa có chủ riêng về đâu" for Sơ cửu, absent from NHL PDF 177; NTT PDF 291 gives "lý không thẳng, nghĩa không thẳng" for Cửu tam, absent from NHL PDF 177; PBC PDF 169 gives "tự tri mình là bất trực" for Cửu tứ, absent from NHL PDF 177; NTT PDFs 303–304 put the greed mechanism in Trình Di while Chu Hy gives only the lack of `cương chính`; NHL PDF 183 gives position and the instruction to further humility without a suspicion cause; NTT PDFs 326–327 give the `trung chính` cause for quẻ 16 Lục nhị, absent from NHL PDF 186; NHL PDF 186 attributes Cửu tứ's doubt to carrying the burden alone, while "vị nguy nghi" is PBC PDF 194 and NTT PDF 329; PBC PDF 188 compares Thượng lục's position with Ngũ's and explains the limit by extreme softness, while "không có ngôi" is Trình Di and Chu Hy at NTT PDF 319; NHL PDFs 186–187 say only that Cửu tứ "không áp bức"; NHL PDF 179 says "mập mờ" without "uất ức", which is PBC PDF 175. The three bracketed Sino-Vietnamese phrases `chí vị đắc dã`, `minh biện tích dã` and `tri cơ` do not appear on the cited Nguyễn Hiến Lê pages.
- **Effect**: Each Nguyễn Hiến Lê layer now carries only what Nguyễn Hiến Lê wrote, and the Chu Hy and Phan Bội Châu layers the same. Because the class had survived three rounds, the fix round was followed by a further full sweep of all twenty-four hào rather than a spot check.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
