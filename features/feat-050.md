# feat-050 — Complete BPCT chapter 6 sentences 57–69

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, Hoàng Kim Sách / Thiên Kim Phú, sentences 57–69; PDF 94–100.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Sentences 57–64: full clauses, explanation, and notes.
- [x] Sentences 65–69: full clauses, explanation, and notes.
- [x] Previously cited fragments do not establish full numbered-passage coverage.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Source-comparison evidence

- Branch and initial HEAD matched the assignment: `feat/050-bpct-ch06-57-69` at `43b7730c63f3eb216ecee70c655a88258a976fd2`; initial worktree and baseline-fixer output were clean. Feat-049 is done and feat-050 remains active. No feature-index or progress changes are made by this worker.
- Before authoring, BPCT SHA-256 matched `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`, 467 pages. Complete extracted passages and individual full-page images at PDFs 1–3 and 93–101 were directly inspected. PDFs 93 and 101 are boundary context only. All assigned pages 94–100 were individually inspected, not just a contact sheet. No selected diagram/table occurs. No assertion of inspection beyond those pages is made.
- Added one reviewed/released article with 61 cited original-summary claims and 43 new citations: 13 separate verses, 13 separate Vietnamese meanings, 13 main commentaries, all 12 timing cases, seven additional Quái thân/spirit commentary blocks, two notes and the unnumbered closing. The supplied verse attribution, Vĩnh Cao meanings/notes and Vương Hồng Tự commentary stay separate. Front credits are bounded role evidence only.
- Full observed unit/layer/note dispositions are canonical in [the inventory](../docs/reviews/knowledge/source-inventory.md#feat-050-numbered-passage-dispositions). [Book sources](../docs/references/book-sources.md#bpct-57-69-selected-comparison) owns exact source tensions and non-authority limits. All 13 expected-unit mappings and five continuation end bounds advance together with registry revision 8 and the inventory hash; all existing obligations, ownership, unresolved discovery and layer rosters remain intact.
- Preserve ambiguous chế sát, overlapping timing contexts, public/private scope at 60, distinct Đa/Phản glosses versus rendering at 62, original glyph differences, sự thể/tướng mạo tension at 64, negative rendering versus affirmative Huyền Vũ/Chu Tước commentary at 65 and tri tiền/thông biến at 66. Notes 12 and 13 attach to 58/63, not footer neighbors 60/65. No original-text repair, reconstructed missing text, copied source prose, ritual rules, calendar, classifier, medical/mortality/crime/class judgment as fact or UI behavior is released.
- New `book-batch-seventeen.test.ts` executes 19 source-named cases; rolling release-count and next-batch assertions advance without altering prior passage expectations. Generated reports/projection are refreshed by the existing validator; no generator logic or schema change is needed. Current totals: 203 records, 2,459 claims, 2,705 citations, 64 quẻ and 384 positions. Next batch is intended feat-051; no activation occurs here.

## Measured offline bundle

Question: Does this knowledge-only addition exceed the existing Workbox cap and require a measured
increase? A fresh knowledge-package build followed by the integrated web build initially produced
`assets/index--P3XJWwz.js` at 3,190,920 bytes (gzip 527.77 kB). It remains below the existing
3,211,264-byte cap with 20,344 bytes headroom. Therefore keep the cap unchanged; do not raise it
speculatively. This first measurement precedes two small source-limitation prose additions;
the final full-workflow measurement is recorded below. All 18 entries were precached including the
main asset. Glob patterns, update prompt, cleanupOutdatedCaches, clientsClaim, skipWaiting,
PDF exclusion and every other PWA setting remain unchanged. `apps/web/vite.config.ts` is not edited.

## Verification evidence

- Baseline `./init.sh`: passed all checks and 493 tests (181 core + 312 knowledge), without worktree drift.
- First authored validator pass exposed a missing new front-role citation definition; added its exact PDF 2–3 definition. First focused test pass exposed only a case-sensitive regex mismatch in the new test; corrected the expectation, not the source summary. No unrelated failures were repaired.
- `validate:corpus --check-books`: passed, all four supplied PDF fingerprints matched; corpus totals are 203 records, 2,459 claims and 2,705 citations.
- Focused package run: 59 tests passed across new batch, public catalog, V1 migration and corpus validation tests. Fresh package plus web builds passed.
- Final `./init.sh`: passed Prettier/fix, ESLint, TypeScript size checks, type-check, production build, built package-export/type-consumer check and 512 tests (181 core + 331 knowledge). Existing font-resolution, sourcemap and chunk-size warnings remain non-blocking.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`: passed with 203 records, 2,459 claims and 2,705 citations; fingerprint and generated freshness checks pass. `pnpm --dir apps/web run check:package-exports`: independently rerun and passed.
- Built Node consumer from `apps/web` imports the public `@liuyao/knowledge` export and deep-compares the entire new article, all 61 claims/conditions/attributions/review/rights and all 43 new citations. It confirms 203 releases, 2,705 citations, 64 stable compatibility quẻ, frozen record/claim arrays and no local source paths. A first ad hoc comparison attempt hit Node's default subprocess buffer on the old large release JSON; reading a shell-exported temporary snapshot instead passed without product changes.
- All 202 prior released record objects, 2,662 prior citation objects and all released source metadata remain equal to initial HEAD. Source-review and certification gates remain closed; existing 84 decisions/197 covered claims are unaffected and no new audit decisions are supplied. Snapshot: `liuyao-knowledge-snapshot-v1:sha256:d4090a2ae4abdc31be46097500d9f11494ce488f102bebae05a4dc4f0008f484`.
- Final integrated main asset: `assets/index-Dng8wbus.js`, 3,191,187 bytes (gzip 527.85 kB), below unchanged 3,211,264-byte cap with 20,077 bytes reserve. All 18 entries are precached, with this exact asset explicitly present in generated `sw.js`. Cap/config/PWA behavior remain unchanged. Headroom is small; future batches must measure again.
- Registry revision 8 binds exact inventory SHA-256 `379bd9bc70a607764ed13da8634e5499067aeb1b1a1c127fe96a4e8dc8b087ed`. All 161 local documentation destinations and fragment anchors in the changed feature/source/inventory documents resolve. `pnpm format:check` and `git diff --check` pass.
- Implementation checkpoint: `02e1786a6b08707ee3de34709926dcc049dd587f` (`feat(knowledge): review BPCT sentences 57-69`), 16 bounded content/registry/report/test files. The separate verification checkpoint records this active handoff; no application/core/generator logic, feature-index or progress files change. No staged files remain after each checkpoint.

## Handoff

- State: active; local source-comparison implementation and required verification pass. Fresh independent branch acceptance review remains the next gate; parent owns completion.
- Evidence: source boundaries, layer/note dispositions, release/registry/inventory, generator outputs and focused tests are current. No independent corpus audit, verification approval or certification is claimed.
- Blockers: none for this batch; unresolved source wording and missing priority/algorithm details stay non-authoritative.
- Next: Obtain fresh independent acceptance review of the final local checkpoint. No push or PR is made by this worker; parent owns feature completion and progress history.
