# Casting Core Implementation Plan

> **Execution:** Follow repository implementation and verification rules. Steps use checkbox syntax for tracking.

**Evidence chronology:** Initial plan commit `56c17f1` contained no implementation. Plan-only revision `939db09` prematurely checked implementation steps and reported local verification while its tree still lacked casting source and feature completion state; those marks were an inaccurate snapshot of that commit. Implementation, tests, browser adapter, completed feature state, and progress evidence first coexist in `cce13f1ba7c4d1f404c03f716d77a0aea73a54de`. The checked steps and evidence below describe that implementation head, not either plan-only commit; this follow-up corrects the plan history without changing casting behavior.

**Goal:** Produce six correctly ordered Liu Yao line values from three-coin casts or manual entry, with secure browser randomness and a reusable deterministic core.

**Architecture:** `@liuyao/core` owns coin arithmetic, typed outcomes, the casting service with injected coin-bit source, and normalization to its existing `SixLines` contract. `apps/web` owns the `crypto.getRandomValues` adapter and composes it with the service; core never references browser globals. No casting UI is added in F04.

**Tech Stack:** TypeScript, Vitest, pnpm, browser Web Crypto.

## Global Constraints

- F04-T01–T07 and evidence in `docs/product-specs/v1-task-map.md` are canonical.
- Preserve `LineValue` (`6 | 7 | 8 | 9`), `SixLines` first-to-sixth bottom-to-top, and `liuyao-standard-v1`.
- Keep core independent of browser globals, React, persistence, network, and authored interpretation.
- Tests belong only under `packages/*/tests`; web adapter receives typecheck/build and explicit boundary inspection, not app tests.

---

## Decision log

- 2026-09-26: Use three unbiased independent bits (0 or 1), where 0 contributes 2 and 1 contributes 3. Their sum has exact counts 6:1, 7:3, 8:3, 9:1 among eight equiprobable outcomes; do not approximate the weights with floating-point random thresholds.
- 2026-09-26: Inject the bit source into a deterministic `CastingService` in core. Keep `crypto.getRandomValues` strictly in `apps/web/src/lib/browser-coin-source.ts`, created at composition time and not during module evaluation. Generate each bit from the low bit of a cryptographic random byte; reject absent crypto rather than silently downgrading to `Math.random`.
- 2026-09-26: The public `CoinTossResult` carries exactly three coin bits and their mapped `LineValue`; a six-line casting result carries the six outcomes and normalized `HexagramReadingInput`. Sequential entries append first line first; direct entries accept a six-value bottom-to-top array. Validate via existing `validateSixLines` and do not reverse either entry method.

- 2026-09-26 plan review: Keep `normalizeCastingInput` public as the shared normalizer behind sequential and direct APIs. Assert it directly on copied bottom-to-top valid input and invalid/incomplete arrays in `packages/liuyao-core/tests/casting.test.ts`, in addition to testing both entry APIs.

## Work stages

### Task 1: Deterministic outcome and normalization (F04-T01, T03, T04, T06, T07)

**Files:** Create `packages/liuyao-core/src/casting.ts`, `packages/liuyao-core/tests/casting.test.ts`; modify `packages/liuyao-core/src/index.ts`.

**Interfaces:** `type CoinBit = 0 | 1`; `type CoinTossResult = { readonly coins: readonly [CoinBit, CoinBit, CoinBit]; readonly line: LineValue }`; `mapCoinsToLine(coins: readonly [CoinBit, CoinBit, CoinBit]): LineValue`; `normalizeCastingInput(lines: unknown): HexagramReadingInput`; `normalizeSequentialInput(lines: unknown): HexagramReadingInput`; `normalizeDirectInput(lines: unknown): HexagramReadingInput`.

- [x] Write eight table cases for the ordered bit triples with expected mapped values and counts 1/3/3/1; verify the failing test with `pnpm --filter @liuyao/core test`.
- [x] Implement the sum mapping with runtime bit validation; assert invalid bit, shape, and non-integer cases reject.
- [x] Write table cases for all six distinct values/order positions, equivalent sequential/direct input, incomplete input, invalid line, and compatibility with `calculateHexagram` and `calculateReading`.
- [x] Test `normalizeCastingInput` directly with valid copied bottom-to-top order and invalid/incomplete arrays.
- [x] Implement both normalizers using `validateSixLines`, returning a copied `HexagramReadingInput` without reversing values; run the focused core tests and typecheck.

**Evidence:** `packages/liuyao-core/tests/casting.test.ts` directly covers the shared normalizer and both entry APIs, all eight ordered triples, exact 1/3/3/1 counts, invalid bits and shapes, input ordering/copying, rejection cases, and calculation integration. `pnpm --filter @liuyao/core test` passed 152 tests across 13 files after the direct assertion; `pnpm --filter @liuyao/core typecheck` passed before that test-only addition.

### Task 2: Casting service and browser source (F04-T02, T05, T07)

**Files:** Modify `packages/liuyao-core/src/casting.ts`, `packages/liuyao-core/tests/casting.test.ts`; create `apps/web/src/lib/browser-coin-source.ts`.

**Interfaces:** `type CoinBitSource = () => CoinBit`; `class CastingService` receives `CoinBitSource` in its constructor, exposes `toss(): CoinTossResult` and `cast(): CastingResult`, whose `tosses` has six ordered results and `input` is `HexagramReadingInput`. Web exports `createBrowserCastingService(): CastingService` and `createBrowserCoinSource(): CoinBitSource`.

- [x] Test controlled bit-stream cases, exactly three calls per toss and eighteen per cast, six-line output ordering, source bounds rejection, and no silent fallback.
- [x] Implement deterministic service; test `cast().input` in core calculation and run core tests/typecheck.
- [x] Implement web adapter with `globalThis.crypto.getRandomValues` on a `Uint8Array(1)` per bit; absence must throw. Inspect import direction and run web typecheck/build. No web unit tests or UI are added.

**Evidence:** Core tests verify the three/eighteen source call counts, runtime source-bit rejection, ordered six-line output, and calculation compatibility. Inspection of `apps/web/src/lib/browser-coin-source.ts` confirms one-byte `globalThis.crypto.getRandomValues`, low-bit extraction, explicit failure when crypto is unavailable, and composition-time service creation. Parent-run `./init.sh` passed typecheck, build, and package tests, including 152 core tests and 2 knowledge tests; no UI or app tests were added.

### Task 3: Evidence, handoff, and review

**Files:** Modify `features/feat-005.md`, `feature_index.json`, `progress.md`, `ARCHITECTURE.md`, `docs/product-specs/product-scope.md` only where behavior became observed; update this plan's checked steps and evidence.

- [x] Inspect working tree before fixers; run `./init.sh`, record exact pass counts and any non-failing warnings, then confirm each F04 acceptance item.
- [x] Mark feat-005 done only after all acceptance and harness checks pass; append one material progress block and record one concrete next action.
- [ ] Commit and push scoped implementation, open PR, send merge-ready with head and verification, and wait for fresh PR review approval before settlement.

**Evidence:** Parent-run `./init.sh` passed with 152 core tests in 13 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, build, and package tests. Lint reported one pre-existing non-failing `react-refresh` warning at `apps/web/src/components/ui/button.tsx:49`. Feature acceptance and all F04 implementation tasks are recorded complete; PR review/approval remains pending.

## Verification budget

- Core test suite owns exact distribution, mapping, source bounds, ordering, normalization and integration claims; deterministic bit injection makes all eight outcomes reproducible.
- Web typecheck/build and source inspection own the browser-boundary claim. Browser crypto cannot be cryptographically certified by package unit tests; no statistical sample substitutes for Web Crypto's security contract.
- `./init.sh` owns repository-wide compatibility, formatting, lint, typecheck, build and package tests. Record any pre-existing warning separately.
