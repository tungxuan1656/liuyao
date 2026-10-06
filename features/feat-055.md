# feat-055 — Complete BPCT applications — Illness remedies and absent travellers

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 270–301; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Chapter 23 — Tật Bệnh: all passages, conditions, examples, and notes.
- [ ] Chapter 24 — Bệnh Thể: all passages, conditions, examples, and notes.
- [ ] Chapter 25 — Y Dược: all passages, conditions, examples, and notes.
- [ ] Chapter 26 — Hành Nhân: all passages, conditions, examples, and notes.
- [ ] Preserve question-specific roles, qualifications, and translator disagreements.
- [ ] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Verify the supplied fingerprint and inspect complete text and individual images for PDF270–301, including credits and boundary pages.
2. Map the four chapter units, actual source layers, notes, inserted material and folio-only279 without changing the source intervals or later audit ownership.
3. Author concise Vietnamese summaries with claim-specific citations; preserve repeated/missing labels, question roles and translator disagreements.
4. Reconcile the inventory register, expected-unit projection, manifest and generated reports; add package regressions and measure the offline bundle.
5. Run the publication checks and full workflow, verify unchanged prior content, commit implementation and hand off for independent branch acceptance. Parent owns canonical completion/progress after merge.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Worker Implementation Evidence

- Four V2 articles cover chapter23 opening/1–28,3 notes and the Vietnamese-only Đông tà framing/1–11; chapter24 opening/1–26 and2 notes; chapter25 opening/1–31,6 notes/prose closing; chapter26 actual1–25/27–31,2 notes/unnumbered closing. 145 children and379 claim-specific citations; comparative claims additionally cite their opposing source layer/note.
- Complete extracted text and all32 individual page images270–301 inspected, plus269/302 and credits1–3. Supplied SHA-256 remains `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`,467 pages. The [inventory register](../docs/reviews/knowledge/source-inventory.md#feat-055-illness-remedies-and-absent-travellers-passage-register) owns locators/dispositions; [source findings](../docs/references/book-sources.md#feat-055-source-comparison) own differences and attribution limits.
- PDF279 is only folio241 and remains the existing non-content obligation. Chapter24 repeats13 at14; chapter26 skips26. No reconstruction, copied source prose/images, table/diagram, medical/legal/travel advice, calendar or new application interpretation is added. Đông tà is an observed signature, not an identified compiler/translator; its layer remains discovery-unresolved.
- Corpus:239 released records,5,993 claims,6,239 citations,64 quẻ/384 positions; expected-unit revision45 contains1,630 groups and preserves17 exclusions. All four parent intervals and055 →089 ownership remain; all discoveries, separate verification and certification remain unresolved/closed.
- Focused package regressions pass152 tests, covering every actual layer/locator, folios, absent/repeated labels, question roles, source alternatives, comparative evidence and non-advice scope. Existing aggregate/next-batch assertions are updated only for this batch. `./init.sh` passes all checks and3,245 tests (181 core +3,064 knowledge); explicit corpus/fingerprint freshness and package-export checks pass.
- The integrated `index-CofnermX.js` asset measures7,613,685 bytes, exceeding the prior7 MiB cap. Only Workbox's authorized cap/comment changes to8 MiB, giving774,923-byte reserve and preserving all18 precache entries. No other PWA behavior changes.
- Initial baseline workflow timed out after200 seconds while package tests were still running; no baseline failure is inferred. The measured rebuild rejected the old Workbox cap as expected. The first final workflow passed format/lint/typecheck/build/exports but four older queue assertions still expected feat-055; those assertions now follow intended feat-056. An added comparison test initially needed a readonly tuple annotation for strict TypeScript; the test was corrected without changing content. Final full verification passes. Existing lint/build warnings remain non-blocking.
- No canonical completion state or progress entry is changed by the worker. Acceptance checkboxes remain intact for the parent's independent exact-head review/merge decision; source comparison is not feat-089 audit or corpus certification.

## Handoff

- State: done; merged to `main` in PR #83 at `d0848eb7de6e776b8e421acc21f53fa209ee7e2d`; reviewed head `ddc8c1932a62e00752bc6e7b6b3b09f31a3e8220`.
- Evidence: Independent exact-head review returned `OK` with no P0/P1/P2 findings. PR-head verify run `37463702490`/job `112269320088`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 181 core and 3,064 knowledge tests; corpus validation passed for 239 records, 5,993 claims, and 6,239 citations.
- Result: Four BPCT articles contain 145 child units and 379 citations; 150 assigned obligations remain for feat-089 audit, including the four parent units and PDF 279 disposition. Prior released content is semantically preserved. The 7,613,685-byte integrated asset fits the 8 MiB Workbox cap with 774,923 bytes reserve; all 18 precache entries remain.
- Blockers: none for feat-055; feat-089 source audit and corpus certification remain open. Source comparison does not establish efficacy or provide medical, legal, travel, calendar, or prediction advice.
- Next: Continue with selected feat-056 from updated `main`.
