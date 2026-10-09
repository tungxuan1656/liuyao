# feat-070 — Review and improve quẻ 09–12 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 09 Phong Thiên Tiểu Súc; 10 Thiên Trạch Lý; 11 Địa Thiên Thái; 12 Thiên Địa Bĩ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] 09 · Sơ (1).
- [ ] 09 · Nhị (2).
- [ ] 09 · Tam (3).
- [ ] 09 · Tứ (4).
- [ ] 09 · Ngũ (5).
- [ ] 09 · Thượng (6).
- [ ] 10 · Sơ (1).
- [ ] 10 · Nhị (2).
- [ ] 10 · Tam (3).
- [ ] 10 · Tứ (4).
- [ ] 10 · Ngũ (5).
- [ ] 10 · Thượng (6).
- [ ] 11 · Sơ (1).
- [ ] 11 · Nhị (2).
- [ ] 11 · Tam (3).
- [ ] 11 · Tứ (4).
- [ ] 11 · Ngũ (5).
- [ ] 11 · Thượng (6).
- [ ] 12 · Sơ (1).
- [ ] 12 · Nhị (2).
- [ ] 12 · Tam (3).
- [ ] 12 · Tứ (4).
- [ ] 12 · Ngũ (5).
- [ ] 12 · Thượng (6).
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

### Entry `condition` fields in quẻ 09 and 11

- **Question**: Review removed 12 `condition` values from quẻ 09 and 11. Restore them, or keep them removed?
- **Decision**: Keep them removed as `condition` fields; carry the substantive part as entry prose (or a note).
- **Alternatives**: (a) restore every `condition` unchanged; (b) delete them with no replacement; (c) move only the substantive ones into prose.
- **Rationale**: [Knowledge quality](../docs/product-specs/knowledge-quality.md) limits entry conditions to conditions that change that entry's meaning and forbids repeating authoring instructions, review identity, or general disclaimers. Most removed values were authoring-review boilerplate ("Giữ … không chuyển thành chuẩn mực chung…"). Two carried substance: the Đế Ất marriage analogy is an unverified hypothesis (a material unresolved reading), and the "tây giao" hexagram-direction reading is a project convention.
- **Evidence**: `packages/knowledge/data/hexagrams/hexagram-09.json` and `hexagram-11.json` at `HEAD`; `docs/product-specs/knowledge-quality.md`; the independent review finding on `hexagram-11.json` `lines[4]`.
- **Effect**: `hexagram-11.json` `lines[4]` states Chu Hy's proposal as a reconstruction and PBC's nonliteral reading explicitly. The "tây giao" caveat stays implicit because all three readings are attributed and explicitly contrasted in the overview.

### Parallel writers per quẻ instead of one sequential reviewer pass

- **Question**: One writer for all four quẻ, or one writer per quẻ?
- **Decision**: One writer per quẻ, three in parallel, writing disjoint files; one fresh read-only reviewer afterwards over all four quẻ.
- **Alternatives**: (a) four sequential writers; (b) one writer for all four quẻ.
- **Rationale**: The four files share no write surface, and the user asked for one worker per quẻ with a single combined review. Parallel writers keep each writer's source-reading context bounded.
- **Evidence**: `.agent-work/feat-070-10-12-parallel.js`; workflow run `60095961`.
- **Effect**: Quẻ 09–12 all reached five overview entries and four authors on all 24 hào. The single reviewer found 6 P1 and 4 P2 defects, which confirms one review pass over four quẻ still has enough coverage.

### Leader applies the second-round review fixes directly

- **Question**: The second review left three P2 findings (a missing NHL objection in the quẻ 09 overview, a misnamed source example in quẻ 10, and one too-narrow reference in quẻ 11). Dispatch another writer, or apply them as Leader?
- **Decision**: The Leader applied the three fixes directly in commit `43a85cf`, each verified against the extracted source page before editing, and a fresh reviewer then re-checked the fix diff.
- **Alternatives**: (a) dispatch a `worker` for the three edits; (b) leave them as accepted notes and merge.
- **Rationale**: The findings are three single-string/reference corrections with the exact source pages already supplied by the review. The delivery contract's single-writer rule is about avoiding concurrent writers, and only the Leader was writing at that point. Delegating three line edits would have added a writer round trip without adding source discovery.
- **Evidence**: `43a85cf063dca03801f72fdd257dd6d69b503a36`; NHL PDF 163 prints "Nhưng theo Hậu Thiên bát quái thì tốn là Đông Nam"; NTT PDF 253 prints "Tần Chính" with footnote `[4] Tần Thủy Hoàng` on PDF 258; NHL PDF 175 prints "Quẻ Thái, mới đến hào 3, còn thịnh cực".
- **Effect**: `./init.sh` and `validate:corpus --check-books --check` both pass at `43a85cf`. The first-round P1/P2 count went to 0; no acceptance criterion is left unmet by the second review aside from these three items.

## Handoff

- State: active — all twenty-four hào and the four remaining criteria are implemented and reviewed; the remaining steps are the final exact-head review, the PR, exact-head CI, and the merge.
- Evidence:
  - Content: `packages/knowledge/data/hexagrams/hexagram-09.json` … `hexagram-12.json` at `HEAD`; five overview entries per quẻ and four attributed explanations on each of the 24 hào (Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy via "Ngô Tất Tố — dịch và chú giải"); seven `notes[]` entries, each naming a real source discrepancy with a page locator; no legacy `section`/`printedPages`/`condition` fields remain.
  - Verification: `./init.sh` passes (181 core tests, 97 knowledge tests, format, lint, typecheck, build, package exports); `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passes with 381 records, 381 ready, 4 supplied books.
  - Independent review: three read-only `reviewer` passes (rounds 1–3). Round 1 found 6 P1 and 4 P2, all fixed in `43a85cf`. Round 2 confirmed all ten fixed and left three P2, all fixed in `43a85cf`. Round 3 confirmed all three focus fixes against the extracted source, raised one further P2 in `hexagram-11.json` `lines[1].entries[0]` (an alternative reading presented as one settled instruction), and closed with "no P0/P1 findings".
  - Estimator limits: the reviewers cannot inspect PDF page images or run test commands, and the baseline/frozen-SHA invariant comparison in `.agent-work/feat-070/invariants.md` is Leader-generated.
- Dependencies: none outstanding; `feat-067` and the matching `feat-041`/`feat-044`–`feat-049` are `done`.
- Next: complete the final exact-head review, push `feat/070-review-hexagrams-09-12`, open the single PR, wait for exact-head CI, merge, set `feature_index.json` to `done`, and record the result in `progress.md`.
