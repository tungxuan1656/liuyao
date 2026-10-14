# feat-082 - Review and improve quẻ 57–60 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-048](task-feat-048.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 57 Thuần Tốn; 58 Thuần Đoài; 59 Phong Thủy Hoán; 60 Thủy Trạch Tiết.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 57 · Sơ (1).
- [x] 57 · Nhị (2).
- [x] 57 · Tam (3).
- [x] 57 · Tứ (4).
- [x] 57 · Ngũ (5).
- [x] 57 · Thượng (6).
- [x] 58 · Sơ (1).
- [x] 58 · Nhị (2).
- [x] 58 · Tam (3).
- [x] 58 · Tứ (4).
- [x] 58 · Ngũ (5).
- [x] 58 · Thượng (6).
- [x] 59 · Sơ (1).
- [x] 59 · Nhị (2).
- [x] 59 · Tam (3).
- [x] 59 · Tứ (4).
- [x] 59 · Ngũ (5).
- [x] 59 · Thượng (6).
- [x] 60 · Sơ (1).
- [x] 60 · Nhị (2).
- [x] 60 · Tam (3).
- [x] 60 · Tứ (4).
- [x] 60 · Ngũ (5).
- [x] 60 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Four parallel writers, one per quẻ file, with per-entry provenance tables and no length target.
2. Round 1 exhaustive review across all attributed entries against source texts.
3. Round 2 verification of corrections and high-risk passages.
4. Leader runs shared validation, verifies any image-dependent notes, and records evidence.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: PR #115 (one PR for this feature), reviewed heads `3cd0363` (writer pass) and `c5141d8` (fix
  pass);
  `./init.sh` passed (181 core + 97 knowledge tests);
  `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed
  (381 records / 381 ready / 4 supplied books); structure invariants unchanged for all 4 files
  (`id, type, title, aliases, topicIds, relatedIds, status, kingWenNumber, upperTrigramId,
lowerTrigramId`, and every `(position, polarity, label)` tuple); round 1 recorded above and round 2
  cited in the Decision log; the 8 `notes[]` claims (two source misprints each in quẻ 57 and 58, three in
  quẻ 59, one disputed reading in quẻ 60) were verified against the rendered page images, and one
  candidate finding was retracted after the page break showed Chu Hy owned the passage.
- Blockers: none.
- Limits: the two round-2 verifier children for quẻ 59 and 60 could not run (provider quota), so their
  round-2 evidence is Leader-executed rather than independent; quẻ 60 Thượng Lục has three entries
  because NTT prints a Trình Di layer and no Chu Hy `Bản nghĩa` for that hào.
- Dependencies: [frozen index](../feature_index.json).
- Next: Activate the next batch feature (quẻ 61–64).

## Migration provenance

Migrated from [feat-082](../features/feat-082.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
