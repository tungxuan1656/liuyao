# feat-053 — Complete BPCT applications — Loss travel study marriage and household members

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 166–230; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 13 — Thất Thoát: all passages, conditions, examples, and notes.
- [x] Chapter 14 — Xuất Hành: all passages, conditions, examples, and notes.
- [x] Chapter 15 — Cầu Sư: all passages, conditions, examples, and notes.
- [x] Chapter 16 — Học Quán: all passages, conditions, examples, and notes.
- [x] Chapter 17 — Hôn Nhân: all passages, conditions, examples, and notes.
- [x] Chapter 18 — Sản Dục: all passages, conditions, examples, and notes.
- [x] Chapter 19 — Tiến Nhân Khẩu: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[implementation plan](../docs/plans/feat-053.md).

## Plan

1. Map the actual source passages and compare existing claims.
2. Review and commit one chapter checkpoint at a time.
3. Reconcile all child-unit dispositions and combined release coverage.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Verification Evidence

- Verified supplied BPCT SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` and467 pages; all assigned extracted passages read. Contact sheets165–231 inspected, plus individual images1–3,174,190,219–222,227. This does not claim individual full-size review of every page; no table/diagram observed in these seven chapters.
- Actual source corrects planned fragments: individually inspected190/222 are folio-only161/190, with coordinator approval. Chapter15 closing is189 and chapter18 item42 is221; parent bounds are unchanged. Chapter14 opening label23, gaps16/31/41, absent independent meanings at chapter13 item34/chapter14 item7, note disagreements and source-layer uncertainties remain explicit. See [Book sources](../docs/references/book-sources.md#feat-053-final-reconciliation) for canonical findings.
- Published seven V2 articles with760 claims/citations;276 stable children plus seven parents remain discovery/audit-unresolved for feat-087. Registry now has1,300 groups and the same17 exclusions, bound to exact inventory bytes. Corpus has231 released records,5,120 claims,5,366 citations;64 quẻ/384 positions unchanged. No new audit ledger, independent verification or certification is recorded; gates remain closed.
- Semantic comparison against dispatch HEAD `4078d3e84423de6fa1c388372469efb9b9ad9d73` preserves all224 earlier released records and4,606 citations, all1,024 prior registry groups except the seven assigned parents' record mappings, and unrelated layers/cells/specials/exclusions. Source catalog, knowledge worker cap, feature index and progress remain unchanged.
- Checkpoint commits: source map `cc27715`; loss `0d2359a`; travel `83d2ffd`; teacher/study `6902d30`; marriage `8d91fa6`; childbirth/household `77d6cfb`. Each passed focused Vitest and `validate:corpus --check-books --check`; final reconciliation removes the interim synthetic chapter13 item34 meaning confirmed absent on individual174.
- Baseline `./init.sh` passed2,342 tests (181 core +2,161 knowledge). Final `./init.sh` passes2,901 tests (181 core +2,720 knowledge), format, lint, TS length, typecheck, build and package exports. Focused batch20 passes559 tests. Final explicit `validate:corpus --check-books --check` and `pnpm --dir apps/web run check:package-exports` pass. Compiled public exports exactly match all seven full records/760 claims/760 citations;177 local documentation routes checked; `git diff --check` passes.
- Initial verification failures were expected stale exact-count/queue regressions, corrected without weakening checks. A fresh web build after knowledge rebuild exceeded the previous Workbox cap. Only its per-file limit changes:5,570,560 to6,553,600 bytes. Asset `index-CPiWXznf.js` is6,458,670 bytes, reserve94,930; all18 entries precached, main asset present in generated service worker. No other PWA behavior changes. Existing four Fast Refresh lint warnings and Vite large-chunk warning remain non-blocking.

## Handoff

- State: done; merged to `main` in PR #80 at `b4f3ccf42fdb0f80e8ff116ef14af7e5e6282f82`. Reviewed PR head was `d9b080c03c8780f1eff713bed4f678bb4b9f9eda`.
- Evidence: Fresh independent exact-head review returned `OK`, no findings. PR-head CI run `37435012519`, Cloudflare Pages, and GitGuardian all passed. Final `./init.sh` passed 2,901 tests (181 core, 2,720 knowledge); corpus freshness and package-export checks passed. CI-required test scheduling serializes files at two workers, and two measured per-test budgets now cover the expanded 1,300-group corpus; no assertions or child-process timeout changed.
- Blockers: none for feat-053. General authorship credits do not certify each individual verse/commentary, reported source alternatives are not repaired, and unavailable originals cannot be reconstructed. Global discovery, feat-087 audit, independent verification, and certification remain unresolved. No prediction, medical/safety/financial/social advice or copied source material is introduced.
- Next: Stop after feat-053 as requested; do not start feat-054 until the user asks.
