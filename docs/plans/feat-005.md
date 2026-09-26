# Casting Core Implementation Plan

> **Execution:** Follow repository implementation and verification rules. Steps use checkbox syntax for tracking.

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

## Work stages

### Task 1: Deterministic outcome and normalization (F04-T01, T03, T04, T06, T07)

**Files:** Create `packages/liuyao-core/src/casting.ts`, `packages/liuyao-core/tests/casting.test.ts`; modify `packages/liuyao-core/src/index.ts`.

**Interfaces:** `type CoinBit = 0 | 1`; `type CoinTossResult = { readonly coins: readonly [CoinBit, CoinBit, CoinBit]; readonly line: LineValue }`; `mapCoinsToLine(coins: readonly [CoinBit, CoinBit, CoinBit]): LineValue`; `normalizeCastingInput(lines: unknown): HexagramReadingInput`; `normalizeSequentialInput(lines: unknown): HexagramReadingInput`; `normalizeDirectInput(lines: unknown): HexagramReadingInput`.

- [ ] Write eight table cases for the ordered bit triples with expected mapped values and counts 1/3/3/1; verify the failing test with `pnpm --filter @liuyao/core test`.
- [ ] Implement the sum mapping with runtime bit validation; assert invalid bit, shape, and non-integer cases reject.
- [ ] Write table cases for all six distinct values/order positions, equivalent sequential/direct input, incomplete input, invalid line, and compatibility with `calculateHexagram` and `calculateReading`.
- [ ] Implement both normalizers using `validateSixLines`, returning a copied `HexagramReadingInput` without reversing values; run the focused core tests and typecheck.

### Task 2: Casting service and browser source (F04-T02, T05, T07)

**Files:** Modify `packages/liuyao-core/src/casting.ts`, `packages/liuyao-core/tests/casting.test.ts`; create `apps/web/src/lib/browser-coin-source.ts`.

**Interfaces:** `type CoinBitSource = () => CoinBit`; `class CastingService` receives `CoinBitSource` in its constructor, exposes `toss(): CoinTossResult` and `cast(): CastingResult`, whose `tosses` has six ordered results and `input` is `HexagramReadingInput`. Web exports `createBrowserCastingService(): CastingService` and `createBrowserCoinSource(): CoinBitSource`.

- [ ] Test controlled bit-stream cases, exactly three calls per toss and eighteen per cast, six-line output ordering, source bounds rejection, and no silent fallback.
- [ ] Implement deterministic service; test `cast().input` in core calculation and run core tests/typecheck.
- [ ] Implement web adapter with `globalThis.crypto.getRandomValues` on a `Uint8Array(1)` per bit; absence must throw. Inspect import direction and run web typecheck/build. No web unit tests or UI are added.

### Task 3: Evidence, handoff, and review

**Files:** Modify `features/feat-005.md`, `feature_index.json`, `progress.md`, `ARCHITECTURE.md`, `docs/product-specs/product-scope.md` only where behavior became observed; update this plan's checked steps and evidence.

- [ ] Inspect working tree before fixers; run `./init.sh`, record exact pass counts and any non-failing warnings, then confirm each F04 acceptance item.
- [ ] Mark feat-005 done only after all acceptance and harness checks pass; append one material progress block and record one concrete next action.
- [ ] Commit and push scoped implementation, open PR, send merge-ready with head and verification, and wait for fresh PR review approval before settlement.

## Verification budget

- Core test suite owns exact distribution, mapping, source bounds, ordering, normalization and integration claims; deterministic bit injection makes all eight outcomes reproducible.
- Web typecheck/build and source inspection own the browser-boundary claim. Browser crypto cannot be cryptographically certified by package unit tests; no statistical sample substitutes for Web Crypto's security contract.
- `./init.sh` owns repository-wide compatibility, formatting, lint, typecheck, build and package tests. Record any pre-existing warning separately.
