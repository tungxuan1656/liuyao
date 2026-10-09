# feat-082 — Review and improve quẻ 57–60 and all twenty-four hào

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

## Decision log

### Apply every round-1 finding, including the ones the written bar does not require

- **Question:** round 1 returned FAIL for all four quẻ (57: 8 P1 + 4 P2; 58: 2 + 7; 59: 7 + 5; 60: 14 + 0,
  47 findings, 0 P0). About 36 of them were `defect—exclusion` findings: genuine attributed content that
  the writer pass had deleted. The governing bar (`knowledge-quality.md#hexagram-review-batches` → the
  operator ruling in `features/feat-071.md`) requires only correct page references and no invention, and
  the review brief's own comparison table says excluded legacy content is not a defect.
- **Decision:** apply all 47 findings in one bounded pass, exclusions included.
- **Alternatives:** apply only the reference/attribution findings; keep the deletions and record them as
  accepted losses.
- **Rationale:** the operator's recorded precedent is to apply the findings even under the relaxed bar.
  Adding back source-backed content costs nothing in correctness, while a recorded content gap would
  outlive the feature.
- **Evidence:** the four round-1 reports (`.agent-work/feat-082/h{57,58,59,60}-review.md`), the fix brief's
  binding rules, and the fixers' per-finding tables.
- **Effect:** `c5141d8`. Attributed entries after the fix pass: quẻ 57 — 33 (overview 6, lines
  4/4/5/6/4/4), quẻ 58 — 29 (5, 4/4/4/4/4/4), quẻ 59 — 33 (6, 4/4/5/5/5/4), quẻ 60 — 29 (6, 4/4/4/4/4/3).
  Restored content kept the source wording's modality, so possibility clauses stay possible and PBC's
  "hung" stays a name for the act, not a forecast.

### Round-2 verification for quẻ 59 and 60 was executed by the Leader

- **Question:** the four round-2 verifier children were dispatched read-only against `c5141d8`; quẻ 57 and
  58 completed with PASS and 0 findings, but the quẻ 59 and 60 children both died on the provider quota
  (`9router API error (503): [codex/gpt-6.1-sol] [429] usage limit`) and produced no report.
- **Decision:** the Leader re-verified the 12 quẻ-59 and 14 quẻ-60 findings directly against the cited
  pages (NTT 874–884, NHL 318–320, PBC 546–563) and recorded PASS.
- **Alternatives:** re-dispatch the two children after the quota reset; leave quẻ 59 and 60 verified only
  by the fixers' own claims.
- **Rationale:** the remaining work was verification against text the Leader had already read for the fix
  pass; re-dispatching would add a provider round for no new evidence.
- **Evidence:** `.agent-work/feat-082/h57-verify.md` and `h58-verify.md` (independent PASS); the Leader's
  per-finding page checks for quẻ 59 and 60, cited in the Handoff evidence line.
- **Effect:** round 2 closes with no open P0/P1/P2 for any of the four quẻ.

### Keep R. Wilhelm's `Tần tốn` reading at quẻ 57 hào Ba

- **Question:** the writer brief ordered the quẻ 57 hào Ba `R. Wilhelm` entry deleted or re-attributed,
  because a case-sensitive search for `Wilhelm` on NHL 309–311 returned nothing.
- **Decision:** keep the entry, attributed `{"author": "R. Wilhelm", "via": "Nguyễn Hiến Lê — dẫn lại"}`
  and referenced to NHL `[310, 310]`.
- **Alternatives:** delete it (the brief's original instruction).
- **Rationale:** the page does carry it — NHL 310 reads "R. WilheLm giảng: suy nghĩ đi suy nghĩ lại nhiều
  lần kĩ quá, mà không quyết định hành động, xấu hổ". The scan capitalises the `L` mid-word and the
  first search missed it.
- **Evidence:** `.agent-work/pdftext/NHL...txt` page 310; `pshow.sh NHL 310`.
- **Effect:** a genuine attributed reading is preserved. Lesson: match names case-insensitively in the
  scanned text before declaring a page empty.

## Handoff

- State: done.
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
- Dependencies: [feature index](../feature_index.json).
- Next: Activate the next batch feature (quẻ 61–64).
