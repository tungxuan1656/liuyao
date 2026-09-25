# V1 MVP

This document owns the V1 feature set, dependency order, and release acceptance. It does not track execution status.

## Product outcome

A user can create a six-line Liu Yao reading, inspect deterministic board facts, read rule explanations, and use the app offline.

## Feature graph

`F01 Domain contracts`
  → `F02 Hexagram calculation`
  → `F03 Liu Yao board`
  → `F06 Reading flow`
  → `F07 Result view`
  → `F10 Offline hardening`
  → `F11 Release`

`F01` → `F04 Casting` → `F06`

`F01` → `F05 Knowledge` → `F07`
`F05` → `F08 Knowledge browser` → `F10`

`F02` + `F05` → `F09 Settings` → `F10`

## Feature catalog

| ID | Feature | Depends on | Done when |
| --- | --- | --- | --- |
| F01 | Domain contracts | — | Line order, values, stable IDs, and ruleset contracts are fixed and tested |
| F02 | Hexagram calculation | F01 | All 64 primary hexagrams and moving-line transformations match fixtures |
| F03 | Liu Yao board | F02 | Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures |
| F04 | Casting | F01 | Manual, automatic, and direct input produce valid six-line inputs |
| F05 | Knowledge | F01 | V1 entities, terms, rules, and sources are local and validated |
| F06 | Reading flow | F02, F03, F04 | A user can complete each entry method and reach a result |
| F07 | Result view | F03, F05, F06 | The board shows deterministic facts and linked explanations |
| F08 | Knowledge browser | F05 | A user can browse and search V1 reference content offline |
| F09 | Settings | F02, F05 | A user can inspect versions, ruleset, and PWA state |
| F10 | Offline hardening | F06, F07, F08, F09 | Core V1 flows work after network loss |
| F11 | Release hardening | F01-F10 | Required fixtures, quality checks, accessibility, and manual flows pass |

## Fixed V1 rules

- Use one ruleset ID: `liuyao-standard-v1`.
- Store and process lines from first line to sixth line, bottom to top.
- Treat `6` and `9` as changing lines.
- Keep calculation logic inside `@liuyao/core`.
- Keep explanations and source metadata inside `@liuyao/knowledge`.
- Keep reading state in memory only.
- Do not require network access for calculation or knowledge lookup.
- Do not generate automated divination conclusions.

## Release acceptance

V1 is releasable when all conditions are true:

- [ ] All 8 trigram fixtures pass.
- [ ] All 64 primary hexagram fixtures pass.
- [ ] All 64 palace and Shi/Ying fixtures pass.
- [ ] Na Jia fixtures cover all inner and outer trigram assignments.
- [ ] Six Relative tests cover all five relations.
- [ ] Moving-line tests cover `6 → Yang` and `9 → Yin`.
- [ ] All three reading-entry methods reach the same result for equivalent input.
- [ ] Every displayed rule explanation has a stable rule ID.
- [ ] Every curated knowledge entry follows `LICENSING.md`.
- [ ] The installed PWA completes core flows while offline.
- [ ] No account, backend, analytics, or AI dependency exists.
- [ ] `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.

## Task source

Use `docs/product-specs/v1-task-map.md` for the implementation task breakdown. Use repository feature records only when execution state needs persistence.
