# feat-076 — Review and improve quẻ 33–36 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 33 Thiên Sơn Độn; 34 Lôi Thiên Đại Tráng; 35 Hỏa Địa Tấn; 36 Địa Hỏa Minh Di.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 33 · Sơ (1).
- [x] 33 · Nhị (2).
- [x] 33 · Tam (3).
- [x] 33 · Tứ (4).
- [x] 33 · Ngũ (5).
- [x] 33 · Thượng (6).
- [x] 34 · Sơ (1).
- [x] 34 · Nhị (2).
- [x] 34 · Tam (3).
- [x] 34 · Tứ (4).
- [x] 34 · Ngũ (5).
- [x] 34 · Thượng (6).
- [x] 35 · Sơ (1).
- [x] 35 · Nhị (2).
- [x] 35 · Tam (3).
- [x] 35 · Tứ (4).
- [x] 35 · Ngũ (5).
- [x] 35 · Thượng (6).
- [x] 36 · Sơ (1).
- [x] 36 · Nhị (2).
- [x] 36 · Tam (3).
- [x] 36 · Tứ (4).
- [x] 36 · Ngũ (5).
- [x] 36 · Thượng (6).
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

## Evidence

- Content: `packages/knowledge/data/hexagrams/hexagram-33.json`, `-34`, `-35`, `-36`; branch `tungxuan1656/feat-076`, PR [#110](https://github.com/tungxuan1656/liuyao/pull/110), rebased on `main` at `cc68182`.
- Revision ladder: `81283ac` (writer pass, frozen for round 1), `ea1d0f8` (thirteen round-1 repairs, the revision round 2 verified), `4e69953` (two round-2 repairs, the revision the gates below ran on).
- Layers added, each on a page that carries it: Chu Hy overviews for quẻ 34 (NTT 546–548) and quẻ 36 (NTT 569–571); Chu Hy commentary for quẻ 33 hào 1, 3, 4, 5, 6 (NTT 538, 540, 542–544), quẻ 34 hào 1 and 6 (NTT 549, 556), quẻ 35 hào 1 (NTT 561–562), quẻ 36 hào 1, 2, 3, 5, 6. One Trình Di range was widened: `hexagram-33.json` `lines[3].entries[2]` `[539,539]` → `[538,539]`. The four records now carry 95 attributed layers; quẻ 35 hào three keeps three layers because NTT 564 carries Trình Di alone there.
- One note added (`hexagram-34.json` `notes[2]`): NHL 240 reads “quân tử dụng võng” as Chu Hy, Legge and Wilhelm do, while NTT 552's Chu Hy reads it otherwise. The seven pre-existing notes are byte-identical to the baseline.
- Round 1, exhaustive and read-only over `81283ac`: every attributed entry, all overview layers and all eight notes — 13 P1 findings, 0 P0 (33: 1, 34: 5, 35: 2, 36: 5). Nine were inherited from the corpus baseline; four sat in the newly added layers. Reports in `.agent-work/feat-076/reviews/r1-hNN.md`.
- Round 2 verified every correction plus the high-risk passages: `r2-h33-h34` and `r2-h35-h36` both returned **PASS** (33: 1/1, 34: 5/5, 35: 2/2, 36: 5/5), 0 blocking defects. The lanes also confirmed the record shape, each introduction's structure claim and the extra `source-book-nhl` `[59, 61]` citation, every author/`via` pair, and that Khâu Kiến An's “Lời bàn của Tiên Nho” paragraph is quoted by no entry.
- Round 2 asked for two further repairs, both applied in `4e69953`: `hexagram-36.json` `lines[5].entries[1]` now states Phan Bội Châu's own gloss “bỏ mất hết nguyên tắc đức minh” (PBC 356 Tượng 失則, glossed on PBC 357) instead of “mất vị”, and `hexagram-34.json` `lines[2].entries[0]` uses Nguyễn Hiến Lê's own word “cừu đực” (NHL 240). Four further observations were declined and are recorded in the self-review.
- Leader verification: clause-level re-derivation of all thirteen corrected cells from the pages that carry them (13/13 faithful); diff integrity of `ea1d0f8` (13 insertions / 13 deletions, nothing else) and of `4e69953` (2 / 2); an old-wording grep clean apart from two legitimate uses; and the seven image-dependent note claims read from PyMuPDF renders of NTT 541, 543, 556, 563, 576 and NHL 241, 247 — all hold. Evidence file `.agent-work/feat-076/self-review.md`.
- Gates on `4e69953`: `./init.sh` → `=== Verification passed ===` (format, lint, typecheck, build, 181 core + 97 knowledge tests); `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → “Knowledge: 381 records; 381 ready; 4 supplied books. Structural links and source pages valid.”
- Structure held: ids, `kingWenNumber`, upper/lower trigram ids, aliases, `topicIds`, `relatedIds`, `status` and all six `(position, polarity, label)` tuples are unchanged, and the invariant diff against the recorded baseline reports **0 invariant fields changed**. Only entry lists and `hexagram-34.json` `notes` grew.

## Decision log

### A layer is added only where the cited page carries it

- **Question:** the neighbouring merged batches carry four attributed layers on every hào. Three hào here had only three, because the writer added a Chu Hy layer only where a Chu Hy paragraph exists.
- **Decision:** keep that rule. Add the missing layer wherever the cited page carries one, and leave quẻ 35 hào three at three layers because NTT 564 gives Trình Di alone for that hào.
- **Alternatives:** pad every hào to four layers; or leave the thin hào untouched and record the gap in a note.
- **Rationale:** the acceptance bar is a source-backed reading with correct page references, not a layer count. Composing a fourth layer from another author's sentences would create exactly the defect class the review then has to remove.
- **Effect:** 15 new attributed layers; 23 of 24 hào carry four attributed layers and quẻ 35 hào three carries three, with the source reason recorded here.

### Every finding becomes the smallest edit that removes the defect

- **Question:** round 1 reported 13 defects and round 2 asked for two more. Repair each in place, or restate the affected passages?
- **Decision:** apply each as the smallest edit — usually one clause — after the Leader had re-read the page that carries the passage. No entry was restyled, and no page citation changed except the one Trình Di range that was too narrow.
- **Alternatives:** rewrite the affected paragraphs; or record the weaker wording as a note and leave it published.
- **Rationale:** the record must not contain a claim its cited page does not carry, and a rewrite would make the diff reviewable only by re-auditing everything.
- **Effect:** the final content diff is 15 corrections (13 round-1, 2 round-2), each traceable to a named finding and to a page the Leader read; four non-blocking observations were declined with their reasons (a wheel-and-axle image that would be new content, and three note wordings the cited pages support as written).

### Round 2 was re-dispatched instead of skipped

- **Question:** the round-2 lanes died on infrastructure — the reviewer role's configured model returned “No active credentials for provider: codex”, and a second attempt on another model produced no output at all. Accept the round-1 evidence, or retry?
- **Decision:** retry on an available model (`deepseek-v4.1-flash`, high reasoning) and record the outage.
- **Rationale:** verification of the corrections is an acceptance criterion; skipping it would have left the thirteen repairs unverified by anyone but their author.
- **Effect:** both lanes ran to completion and returned PASS, with their own limitations stated (text-only, no shell, no page images).

## Handoff

- **Status:** implementation, round-1 repair and round-2 verification are complete on branch `tungxuan1656/feat-076`; PR [#110](https://github.com/tungxuan1656/liuyao/pull/110) is open and awaiting merge. `feature_index.json` keeps this feature at `todo` because the single `active` slot is held by feat-074 (already merged in PR #104, still awaiting status cleanup) and this repository marks a feature `done` only once it is merged.
- **Blockers:** none.
- **Limits:** reviewer lanes read extracted page text only and never page images, so the seven image-dependent note claims remain Leader-verified; the invariant comparison and the page renders are Leader-generated; the round-2 model had to be changed after the reviewer provider returned “No active credentials for provider: codex”.
- **Next action:** merge PR [#110](https://github.com/tungxuan1656/liuyao/pull/110), then set feat-076 to `done` in [feature index](../feature_index.json). Note for the operator: feat-073 (quẻ 21–24) is already `done`; feat-074 (quẻ 25–28) was merged in PR [#104](https://github.com/tungxuan1656/liuyao/pull/104), but its index entry is still `active` on `main`.

## Follow-up review — 2026-10-09

- Re-checked the newly added Chu Hy layers and risk passages against NTT PDF 538–581, NHL PDF 236–247 and PBC PDF 329–357; no new actionable source-fidelity finding in the reviewed passages.
- Reconciled append-only `progress.md` with current `main` instead of overwriting newer entries. Kept `feat-076` `todo` until merge; the separate feat-074 status cleanup is out of scope.
- Rerun CI on this synchronised branch; verification quoted for `4e69953` applies only to that historical revision.
