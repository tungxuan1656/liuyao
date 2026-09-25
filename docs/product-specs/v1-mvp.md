# V1 MVP

This document owns the V1 feature set, dependency order, and release acceptance. It does not track execution status.

## Product outcome

A user can open the production website, create a six-line Liu Yao reading, inspect deterministic board facts, read rule explanations, install the PWA, and continue core use offline.

V1 is not complete when the calculation engine works. V1 is complete only when the public product is named, branded, deployed, verified, and recoverable.

## Feature graph

`F12 Product identity` → `F06 Reading flow`
`F12 Product identity` → `F09 Settings`
`F12 Product identity` → `F13 Production delivery`

`F01 Domain contracts`
→ `F02 Hexagram calculation`
→ `F03 Liu Yao board`
→ `F06 Reading flow`
→ `F07 Result view`
→ `F10 Offline hardening`

`F01` → `F04 Casting` → `F06`

`F01` → `F05 Knowledge` → `F07`
`F05` → `F08 Knowledge browser` → `F10`

`F02` + `F05` → `F09 Settings` → `F10`

`F01-F10` → `F11 Quality hardening`
`F10` + `F12` → `F13 Production delivery`
`F06-F10` + `F12` → `F14 Product polish and trust`
`F11` + `F13` + `F14` → `F15 Launch`

## Feature catalog

| ID  | Feature                  | Depends on          | Done when |
| --- | ------------------------ | ------------------- | --------- |
| F01 | Domain contracts         | —                   | Line order, values, stable IDs, errors, and ruleset contracts are fixed and tested |
| F02 | Hexagram calculation     | F01                 | All 64 primary hexagrams and moving-line transformations match fixtures |
| F03 | Liu Yao board            | F02                 | Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures |
| F04 | Casting                  | F01                 | Manual, automatic, and direct input produce equivalent valid core inputs |
| F05 | Knowledge                | F01                 | V1 entities, terms, rules, and sources are local, licensed, and validated |
| F06 | Reading flow             | F02, F03, F04, F12 | A user can start, complete, recover, and restart a reading without hidden state |
| F07 | Result view              | F03, F05, F06      | The board shows deterministic facts with linked explanations and clear states |
| F08 | Knowledge browser        | F05                 | A user can browse, search, and deep-link V1 reference content offline |
| F09 | Settings                 | F02, F05, F12      | A user can inspect versions, conventions, product identity, and PWA state |
| F10 | Offline hardening        | F06-F09            | Core V1 flows survive network loss, reload, install, and safe app updates |
| F11 | Quality hardening        | F01-F10            | Golden tests, accessibility, responsive behavior, browsers, and failure states pass |
| F12 | Product identity         | —                   | Final name, language, logo, icons, manifest, metadata, and asset rights are approved |
| F13 | Production delivery      | F10, F12           | A production domain deploys through a repeatable flow with HTTPS and rollback |
| F14 | Product polish and trust | F06-F10, F12       | Copy, legal surfaces, SEO metadata, security posture, and visible edge states are release-ready |
| F15 | Launch                   | F11, F13, F14      | Release candidate is versioned, deployed, smoke-tested, documented, and usable immediately |

## Fixed V1 rules

- Use one ruleset ID: `liuyao-standard-v1`.
- Store and process lines from first line to sixth line, bottom to top.
- Treat `6` and `9` as changing lines.
- Keep calculation logic inside `@liuyao/core`.
- Keep explanations and source metadata inside `@liuyao/knowledge`.
- Keep reading state in memory only.
- Do not require network access for calculation or knowledge lookup.
- Do not generate automated divination conclusions.
- Do not require an account, backend, analytics SDK, or AI service.
- Treat product name, logo, domain, and deployment as release work, not optional polish.

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
- [ ] Final product name, primary language, logo, icon set, and metadata are approved.
- [ ] Browser title, manifest, install UI, app header, and social preview use the approved identity.
- [ ] The production domain serves HTTPS with correct direct-route behavior.
- [ ] The installed PWA completes core flows while offline.
- [ ] App updates do not silently destroy an active reading draft.
- [ ] Privacy, licensing, security, and product disclaimer surfaces are reviewed.
- [ ] Desktop and mobile release matrices pass on supported browsers.
- [ ] The production smoke test passes after deploy.
- [ ] A rollback path has been exercised before launch.
- [ ] No account, backend, analytics SDK, or AI dependency exists.
- [ ] `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` pass.

## Canonical detail

- Product identity → `docs/product-specs/product-identity.md`
- Production delivery → `docs/release.md`
- Implementation tasks → `docs/product-specs/v1-task-map.md`

Use repository feature records only when execution state needs persistence.
