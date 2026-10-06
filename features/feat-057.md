# feat-057 — Complete BPCT eighteen questions and Hà Tri Chương

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II, chapters 1–2; PDF 365–428.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Questions 1–6.
- [x] Questions 7–12.
- [x] Questions 13–18.
- [x] Every Hà Tri Chương heading, explanation, and note.
- [x] Give each question and subordinate passage its own inventory disposition.
- [x] Distinguish the question, attributed experiment, example, and general conditional rule.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit each six-question checkpoint.
2. Review and commit Hà Tri Chương.
3. Reconcile overlap with existing claims and verify all dispositions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: previously user-authorized in the feat-045–083 sequence; feat-056 is done and this feature is the next dependency-ready item.
- Scope: retain the existing 18-question and Hà Tri Chương boundaries; inventory routes questions to audit091 and preserves selected prior coverage of Q5, Q6, Q10, and Q12–14.
- Source: use `docs/books/Tăng bổ bốc phệ chính tông.pdf`, SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` (467 pages); inspect assigned pages 365–428 and transitions 413/429. Keep PDF 413 as its image-checked folio-only disposition.
- Planning: existing acceptance and inline plan are sufficient for this one-package authoring cohort; no API, migration, or workspace change is planned.
- Boundaries: distinguish questions, attributed experiments/examples, and conditional rules; preserve existing claims and source differences. Authoring does not close source audit, verification, or corpus-certification gates.

## Decision log

- Preserve existing selected Q5/Q6 answer claims and citations; reuse Q5 answer rather than publish a duplicate. New records account for complete question contexts, dated/repeated experiments, separate selected chart annotations and translator notes. Full board reconstruction/calculation fixtures are explicitly excluded per chart; no source image is copied and no calculator-derived repair is made.
- Treat the unsigned different-font insertion after Q18 on PDF412 as a separate supplement within the assigned page interval, not a nineteenth question or certain compiler/translator text.
- Supervisor approved updating only the existing aggregate registry census expectations to the source-derived total, preserving assertion strength and all test/child-process timeouts. Final next-batch matches will move to actual feat-058, not preserve obsolete planning text.

- The fresh integrated asset exceeded9MiB (9,437,184 bytes): measured9,862,515 bytes. Raise only `maximumFileSizeToCacheInBytes` to10MiB (10,485,760), keeping623,245 bytes reserve; retain18 precache entries and all other PWA settings.
- Supervisor also approved refreshing the remaining existing aggregate registry/release/claim/citation expected literals to2536/268/7414/7660 and moving next-batch assertions tofeat-058. No test assertion is weakened and no test/child-process timeout changes.

## Implementation checkpoints

- Questions1–6: inspected all source passages/images, added six original-summary articles,41 dated/repeated example contexts and41 separate chart observations,10 notes, six queries, five new answer summaries plus reused Q5 answer. Checkpoint corpus validates254 records/6951 claims/7197 citations; new cohort145 claims with146 dispositions. Baseline `./init.sh` passed181 core and3366 knowledge tests. Full final gates remain pending.

- Questions7–12: checkpoint `bb12a1b` preserves Q1–6. Added six articles and54 separately located example contexts/experiments,52 charts (two Q9 passages have no chart),16 notes; Q10 answer reuses four existing claims. Cumulative332 new claims/334 dispositions,260 records/7138 claims/7384 citations,2258 registry groups. Source-specific tests retain two failed timing claims, different Thế/Ứng labels, repeated questioning and note disagreements.

- Questions13–18: checkpoint `30f33a5` preserves Q1–12. Added six question articles,36 examples/experiments/charts, nine printed notes (Q13 note9 reuses the existing disagreement), Q12 separate conclusion, Q13 red emphasis and Q14 full detailed Ghi chú. The unsigned412 insertion has its own article and18 separate framing/rule/example/special dispositions using the existing uncredited-supplement layer. Cumulative481 new claims/484 mapped fine dispositions;267 records/7287 claims/7533 citations;2409 registry groups. Individual413 confirms folio-only366; Hà Tri release remains the next checkpoint.

- Hà Tri and reconciliation: checkpoint `4bdbed4` preserves the18 questions; all60 verse/reading and meaning pairs, four notes, heading and two closing-layer summaries add127 claims. No independent commentary layer is synthesized. Q5/Q6/Q12 selected conditional claims remain their existing owners via supporting dependencies; new outcomes/dialogues add only remaining context. Cohort20 records/608 new claims/citations/611 fine mapped dispositions plus one insertion parent;612 new registry groups,2536 total, all19 global layer rosters and17 exclusions unchanged.

## Worker verification evidence

- Source: all64 assigned full-page images and extraction artifacts `/tmp/feat057/365..428.{png,txt}` individually inspected, plus364/429 boundaries and1–3 credits. Images are918x1188 at1.5x render, not contact sheets or all467 source pages. Question/example/experiment/chart/notes and all60 Hà Tri entry/layer dispositions are in the canonical register; detailed source limits stay in the source catalog.
- Baseline full gate passed; checkpoint focused runs passed148/337/488 tests, final new-file focused run616 and six-file focused suite977. First final full run found only stale aggregate census expectations and a new-test array-index type error; narrow approved corrections preserve assertion strength/timeouts. Fresh package build and `validate:corpus --check-books --check` pass; corrected final `./init.sh` passed all gates and4163 tests (181 core/3982 knowledge).
- Package export/preservation comparison `/tmp/feat057/check-exports.mjs` resolves the production `@liuyao/knowledge` export, compares all20 new records/608 citations and all248 prior records (6806 claims)/7052 citations, and checks1843 non-cohort groups,81 retained cohort parent IDs, all19 layer rosters and17 exclusions. All semantic preservation checks pass.
- Final source-compared totals:268 released records/7414 claims/7660 citations;64 quẻ/384 positions unchanged. Snapshot `liuyao-knowledge-snapshot-v1:sha256:80df438c43029dc68830b61861cc58bad1a122c288ba34904d9f77245f682b99`. SourceReview/certification remain closed; feat-091 has0/813 current obligations; this is not feat-091 audit, separate verification or corpus certification.
- PWA: fresh asset `index-hWzhFL3V.js`,9,862,515 bytes,10MiB cap,623,245-byte headroom. Build/compiled-export probe checks18 SW precache entries including that asset and byte-equivalent PWA configuration except the cap/comment.
- Parent retains final review/status/handoff/publication/merge ownership; no `feature_index.json` or `progress.md` changes, branch switch, push or PR.

## Handoff

- State: done; merged to `main` in PR #85 at `1e1a5d53ecabd3344cd41c15cecc32068819ee0b`, from reviewed head `2e69eef1250f202f34be7e8244c1e8a0790201a3`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. PR verify run `37494127883`/job `112374155807`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 4,163 tests (3,982 knowledge, 181 core); corpus validation and package-export checks passed. The measured 9,862,515-byte asset fits the 10 MiB Workbox cap with 623,245 bytes headroom; all 18 precache entries remain.
- Coverage: Added 20 source-compared records and 608 claims/citations with 612 registry groups. Prior 248 records, 6,806 claims, 7,052 citations, 17 exclusions, and 19 layer rosters remain unchanged. feat-091 audit has0/813 current obligations; source audit and corpus certification remain open. No efficacy, medical, legal, or safety authority is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-058 from updated `main`.
