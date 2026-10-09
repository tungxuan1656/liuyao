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
- **Effect**: Each of the eleven flagged passages now reads as its author wrote it. Because the class had survived three rounds, the fix round was followed by a further full sweep of all twenty-four hào rather than a spot check; that sweep is recorded below.

### Leader applies the round-4 review fixes directly

- **Question**: The round-4 sweep confirmed all eleven round-3 repairs but raised ten further findings (seven P1, three P2) in the same author-layer class. Dispatch a writer, or apply them as Leader?
- **Decision**: The Leader applied all ten directly, deleting only the unsupported clause and restoring the source's own wording where the review supplied it, then re-ran the gates.
- **Alternatives**: (a) dispatch a `worker` for the ten edits; (b) launch an open rewrite of all ninety-six attributed entries.
- **Rationale**: This was the fourth round to produce instances of one class, but the round-4 sweep was the second exhaustive walk of all twenty-four hào and it cleared most cells, so the class looked narrowing rather than constant. Each finding again carried its exact source page, leaving no source discovery. An open rewrite would discard a large body of already-verified prose — the risk the round-3 entry already rejected.
- **Evidence**: NTT PDF 292 gives Chu Hy's Tượng gloss as only “Ý nói không thể đi được”, the opponent's strength-and-righteousness reason being Trình Di's on the same page; NTT PDFs 295–296 give Trình Di's “Lúc trước có sự cùng nhau, thì đến lúc sau, hoặc có ăn năn” with no private-faction clause, and Chu Hy there mentions neither faction nor `chí vị đắc dã`; PBC PDF 178 grounds Cửu tứ's danger in “bất trung bất chính … xử vào địa vị phú thịnh e có nguy họa tới nơi”, not in proximity to the ruler; NTT PDF 314 ends Trình Di's `ty dĩ tự mục` gloss at “Tự chăn tức là tự xử”, the virtue-nourishing sentence belonging to Khấu Kiến An under “Lời bàn của Tiên Nho”; NHL PDF 184 says “nhu quá, thiếu uy thì không phải là tư cách một ông vua” where the entry had written “dễ sinh rối loạn”, and “giữ đức nhún thuận, để tiếp kẻ dưới” is Trình Di's at NTT PDF 318; NHL PDF 186 says “kiêu mạn, xấu” where “khinh bạc nông nổi” is Trình Di's at NTT PDF 325; the bracketed `lí tín`, `tư thuận`, `thượng hiền` and `tiên khuất hậu tín` are absent from the cited Chu Hy pages (NTT 308–309, 311) — PBC PDF 179 supplies the first three, and NTT PDF 311 gives only “trước bị co lại, sau được duỗi ra”; PBC PDF 195 says “Tứ cũng không quá tay áp bức” and never “soán ngôi”.
- **Effect**: All ten passages now read as their author wrote them. The round-3 effect statement's categorical claim — that every author layer now carried only its own author's wording — was withdrawn as unsupported: it described the outcome of one repair round, not an audited property of the file. Four of the ten findings sat in Trình Di, Chu Hy or Phan Bội Châu layers, so the class is not specific to Nguyễn Hiến Lê.

### Leader applies the round-5 review fixes directly, and fixes the convergence rule

- **Question**: The round-5 review was the first fully exhaustive walk of every attributed entry (112 passages: 96 hào entries plus 16 author-overview entries, plus the 4 general introductions and 8 notes). It confirmed nine of the ten round-4 repairs, reported the tenth as incompletely fixed, and raised fifteen further findings in the same class. After five rounds produced 10, 5, 11, 10 and 15 instances, does another repair round still converge, and who should apply it?
- **Decision**: The Leader applied all fifteen directly again, changing only the named clause or reference and restoring the source's own wording where the review supplied it. Separately, the Leader recorded the convergence rule: if round 6 again returns findings in this class, the Leader raises the non-convergence with the operator instead of silently opening round 7 — because each repair is now buying fewer defects than the next more thorough audit finds.
- **Alternatives**: (a) dispatch a `worker` for the fifteen edits; (b) rewrite every attributed entry from the cited pages in one pass; (c) stop and ask the operator now.
- **Rationale**: Each finding again carried its exact source page and the reviewer's proposed wording, so there was no source discovery left to do and a writer round-trip would only re-open prose that five rounds of review have already cleared. Option (b) stays rejected for the reason first given in the round-3 entry: it discards a large body of independently verified prose to fix fifteen named clauses. Option (c) was not yet warranted because the round-5 audit was genuinely exhaustive for the first time and its fifteen findings are each independently checkable against one page.
- **Evidence**: Round-5 run `af6cac15-c724-4d5a-8e52-b9443b5a1ffe`, verdict FAIL with 9/10 round-4 repairs confirmed and F01 residual — NTT PDF 292 ends Chu Hy's Tượng gloss at “Ý nói không thể đi được”, so the entry's added consequence clause was cut. NHL PDF 178 grounds Cửu ngũ's outcry in the neighbours' obstruction (“ngăn cản, dèm pha, phá rối, nên mới đầu phải kêu rêu”) and concludes that harmony “không dễ dàng thực hiện ngay được”, where the entry had imported Trình Di's NTT 294–295 “oan ức” and a universal demand for decisive struggle. NTT PDF 325 ends Chu Hy's Dự overview at “cho nên có sự tốt xấu khác nhau”, with no `trung chính` rule of thumb. NHL PDFs 186–187 state the conditions on Lục ngũ separately and link the immersion in pleasure to the illness image only. NTT PDF 330 has “ngôi giữa chưa mất” (not “đức trung chưa mất”) and closes Chu Hy's reading with “Theo Tượng mà xem, lời Chiêm sẽ ở trong đó.” PBC PDF 166 gives “Các tận sở năng, các thủ sở nhu”. NTT PDF 314 gives “lợi về sự sang sông lớn”; PDF 315 gives “Mềm thuận trung chính, vì sự nhún mà có tiếng tăm, ấy là kẻ chính mà tốt”; PDF 328 gives “nếu hối chậm, thì sẽ có sự ăn năn”. Two references were widened rather than annotating: NTT `[308, 309]` → `[306, 309]` for Sáu Năm of quẻ 14 and NTT `[317, 317]` → `[316, 317]` for Cửu tam of quẻ 15, because the cited Chu Hy passage runs onto the earlier page.
- **Effect**: All fifteen passages now read as their author wrote them, and the two widened references cite the page that actually carries the reading. The pending convergence rule is now written down, so a round-6 failure is an operator decision rather than an automatically repeated repair.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
