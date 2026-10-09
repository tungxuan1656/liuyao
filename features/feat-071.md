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

### Leader applies the round-2 review fixes directly

- **Question**: The round-2 review left five content findings (four P1, one P2) that all take the same form — another author's explanation imported into Nguyễn Hiến Lê's layer, or a cause assigned to a phrase that the source does not give it. Dispatch another writer, or apply them as Leader?
- **Decision**: The Leader applied all five directly in the commit `fix(knowledge): keep each author's own reading in quẻ 13–16`, verifying each against the cited extracted page before editing, and a fresh reviewer then re-checked the fix diff.
- **Alternatives**: (a) dispatch a `worker` for the five edits; (b) accept them as known notes and merge.
- **Rationale**: Each finding already carried the exact source page and the exact correction, so no source discovery was left. The two prior writer rounds had each introduced new instances of this same defect class while rewriting unflagged prose, so a further rewrite round carried more risk of a new import than of a fix. The delivery contract's single-writer rule is about avoiding concurrent writers, and only the Leader was writing at that point.
- **Evidence**: NHL PDF 178 attaches the absent responding hào to the unfulfilled aspiration, not to `vô hối`; NHL PDF 184 gives "vì tài kém" as the only limit on Thượng lục's campaign; NHL PDF 187 grounds the hope of reform in `Chấn` meaning movement and never states `cùng tắc biến` or `cố tật`; NHL PDF 180 describes only a heavy cart travelling far, with no cargo-integrity gloss; NHL PDF 183 gives the reputation warning without the inner-to-outer or bird gloss.
- **Effect**: All five found texts now read as their author wrote them. One further fidelity repair was made in the same commit on a sentence the review did not name: the quẻ 16 Thượng lục entry credited the closing Mạnh Tử quotation to NHL directly, while NHL PDF 187 credits it to Phan Bội Châu.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
