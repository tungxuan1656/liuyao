# Vietnamese Product Language Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use `subagent-driven-development` or `executing-plans` only when installed and appropriate. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Vietnamese the only user-facing language across the web application and its local knowledge catalog, without displaying Han characters.

**Architecture:** Keep reviewed domain terminology and authored Vietnamese explanations in `packages/knowledge/data`; keep UI copy beside its owning web component. Remove the `han` display field and CJK-only runtime font path while preserving technical IDs, package boundaries, offline behavior, and calculations.

**Tech Stack:** React, TypeScript, Vite/PWA, `@liuyao/knowledge`, Vitest, pnpm, existing browser QA workflow.

## Global Constraints

- `docs/product-specs/vietnamese-language.md` owns the approved language and terminology rules.
- Use Vietnamese for all user-facing prose, accessible names, metadata, and knowledge content; do not display Han characters, English aliases, or Chinese romanizations.
- Keep all existing core/domain IDs, ruleset IDs, route paths, and deterministic calculation outputs unchanged.
- Do not add an i18n framework, locale selector, remote translation service, or another runtime dependency.
- Keep reusable tests in `packages/*/tests`; verify `apps/web` through typecheck, build, and browser review.
- Preserve offline operation and all source-rights/provenance limits in `LICENSING.md`.

---

## Files and responsibilities

| Area                           | Files                                                                                                                                                                                                                      | Responsibility                                                                                                                                                         |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Language policy                | `docs/product-specs/vietnamese-language.md`, `product-identity.md`, `ui-layout.md`, `knowledge-browser.md`, `reading-flow.md`, `reading-result.md`, `settings.md`, `v1-task-map.md`, `features/feat-013.md`                | Keep the approved language decision and its boundaries canonical; treat English copy examples in product specs as semantic placeholders, not approved literal UI text. |
| Knowledge contract and content | `packages/knowledge/src/schema.ts`, `validation.ts`, `search.ts`; `packages/knowledge/data/{trigrams,hexagrams,terms,rules,sources,references}.ts`; `packages/knowledge/tests/{schema,entities,search,content}.test.ts`    | Store reviewed Vietnamese display content, remove the Han display field, and guard the catalog contract.                                                               |
| Reading and navigation UI      | `apps/web/src/App.tsx`, `casting-flow.tsx`, `components/{navigation,confirmation-dialog}.tsx`                                                                                                                              | Localize reading setup, casting, navigation, labels, confirmations, and recoverable user errors.                                                                       |
| Result and library UI          | `apps/web/src/{result-labels,result-view,result-board,result-facts,library-data,library-browser,library-detail}.ts*`                                                                                                       | Render Vietnamese names, labels, facts, filters, and knowledge details without Han glyphs.                                                                             |
| Settings and PWA metadata      | `apps/web/src/settings.tsx`, `components/pwa-update-banner.tsx`, `index.html`, `vite.config.ts`                                                                                                                            | Localize diagnostics, offline/update/install copy, accessible names, and browser/PWA language metadata.                                                                |
| CJK delivery removal           | `apps/web/src/index.css`, `apps/web/package.json`, `apps/web/public/fonts/*`, `apps/web/scripts/{update-cjk-coverage.mjs,check-cjk-font-cmap.py}`, `packages/knowledge/tests/entities.test.ts`, `.github/workflows/ci.yml` | Stop generating, checking, bundling, and precaching fonts used only for Han/CJK text. Keep Vietnamese font assets and their notices.                                   |

## Work stages

### Task 1: Approve the controlled glossary before bulk copy changes

**Files:** Modify `docs/product-specs/vietnamese-language.md`; review `docs/product-specs/knowledge-browser.md` and `docs/product-specs/product-identity.md`.

**Produces:** A reviewed glossary for the eight trigrams, 64 hexagrams, line/polarity terms, stems/branches, Five Elements, Six Relatives, palace, and Shi/Ying. The glossary is the editorial source for Tasks 2–4.

- [ ] Inventory each knowledge field and every UI surface in the Files table. Classify text as Vietnamese content, a technical identifier, a source URL, or developer-only diagnostic.
- [x] Record one canonical Vietnamese name for each trigram and hexagram, plus reviewed core terms, in `docs/product-specs/vietnamese-language.md`. Use full Vietnamese diacritics.
- [x] Cross-check the 64 names and ordering against a Vietnamese-language reference and cross-check core Liu Yao terms against Vietnamese usage; record sources and avoid asserting a disputed school convention as universal.
- [ ] Confirm bibliographic titles and names use Vietnamese or Latin transliteration, with URLs retained for traceability and no Han-script text in local records.
- [x] Update the language spec with the glossary table before translating the dataset. Keep the table as the single canonical owner of approved Vietnamese domain labels.
- [x] Commit the approved glossary and language decision as `docs(feat-018): define Vietnamese Liu Yao terminology`.

### Task 2: Localize and validate the knowledge package

**Files:** Modify `packages/knowledge/src/schema.ts`, `validation.ts`, `search.ts`; all six data files in `packages/knowledge/data/`; `packages/knowledge/tests/schema.test.ts`, `entities.test.ts`, `search.test.ts`, and `content.test.ts`.

**Consumes:** Reviewed glossary from Task 1.

**Produces:** A knowledge catalog whose natural-language display fields are Vietnamese and whose entity schema has no `han` field. Existing IDs and record links remain unchanged.

- [ ] Add a knowledge test that traverses entity names, aliases, explanations, term names/definitions, rule titles/explanations, source metadata, and reference locations; assert none contain Han characters or CJK punctuation/full-width characters.
- [ ] Add independent assertions for all eight canonical Vietnamese trigram names and all 64 canonical Vietnamese hexagram names from the reviewed glossary.
- [ ] Update schema fixtures and validator expectations to remove `han`; require non-empty Vietnamese display fields without changing record IDs or cross-reference validation.
- [ ] Translate trigram and hexagram names/explanations, term names/aliases/definitions, and rule titles/explanations using the reviewed glossary. Replace English and Mandarin romanized aliases with only reviewed Vietnamese aliases.
- [ ] Translate source titles, authors, publication/rights/provenance descriptions, and reference locations into Vietnamese or Latin-script Vietnamese transliteration. Keep source URLs and rights statements accurate; do not invent editions, quotations, or page locations.
- [ ] Update search tests to cover Vietnamese canonical names, reviewed aliases, diacritic/case normalization, no-match behavior, and the absence of Han/English alias matching. Preserve stable result ordering.
- [ ] Run `pnpm --filter @liuyao/knowledge test` and `pnpm --filter @liuyao/knowledge typecheck`.
- [ ] Commit the knowledge schema, catalog, and tests as `feat(knowledge): localize Vietnamese reference catalog`.

### Task 3: Localize reading setup, casting, and shared dialogs

**Files:** Modify `apps/web/src/App.tsx`, `casting-flow.tsx`, `components/navigation.tsx`, `components/confirmation-dialog.tsx`, and decorative glyphs in `library-browser.tsx`, `settings.tsx`, and `components/pwa-update-banner.tsx`.

**Consumes:** Language rules and glossary from Tasks 1–2.

- [ ] Translate every visible label, heading, placeholder, method name, line instruction, empty/incomplete state, confirmation, and navigation/accessibility name in these files.
- [ ] Keep input values (`automatic`, `manual`, `direct`), route paths, and calculation contracts unchanged; translate only their presentation labels.
- [ ] Replace every decorative Han glyph in navigation, Library, Settings, and PWA banners with a non-text icon or existing non-Han treatment. Mark decorative replacements `aria-hidden` and provide Vietnamese accessible names where needed.
- [ ] Map caught user-facing errors to Vietnamese copy in the web layer. Keep internal developer diagnostics and stable error mechanics unchanged; show a Vietnamese fallback for unknown failures.
- [ ] Build the app and directly verify home, question entry, all three casting methods, validation/recovery messages, cancel/reset confirmations, and navigation labels.
- [ ] Commit reading and navigation copy as `feat(web): localize reading and navigation in Vietnamese`.

### Task 4: Localize result and knowledge browsing surfaces

**Files:** Modify `apps/web/src/result-labels.ts`, `result-view.tsx`, `result-board.tsx`, `result-facts.tsx`, `library-data.ts`, `library-browser.tsx`, and `library-detail.tsx`.

**Consumes:** Vietnamese knowledge contract and names from Task 2.

- [ ] Translate all result headings, field labels, line values/statuses, fact controls, drawers, no-result states, category names, rule filters, source labels, and accessible names.
- [ ] Remove all rendering and search dependencies on `record.han`; render the Vietnamese canonical entity name from the knowledge package.
- [ ] Display technical IDs only as unchanged machine-readable values with Vietnamese labels. Do not expose English property names as natural-language copy.
- [ ] Keep result facts and calculation data unchanged; do not add interpretive or predictive prose.
- [ ] Build and directly verify primary/changed result content, fact drawers, related-entity links, Library search/categories/no-results, all detail types, and source-reference states.
- [ ] Commit result and knowledge-browser copy as `feat(web): localize results and knowledge browser`.

### Task 5: Localize Settings, PWA messages, and document metadata

**Files:** Modify `apps/web/src/settings.tsx`, `components/pwa-update-banner.tsx`, `apps/web/index.html`, and `apps/web/vite.config.ts`. Clarify copy ownership in `docs/product-specs/reading-flow.md`, `reading-result.md`, `settings.md`, and `ui-layout.md` where examples could be read as literal English UI copy.

- [ ] Translate system, install, update, offline, version, ruleset, convention, legal-link, and feedback labels. Preserve exact package names and ruleset IDs as technical identifiers.
- [ ] Translate all offline/update banners and confirmation-dialog messages, including the distinctions between question, draft, and completed-reading loss.
- [ ] Set the root HTML language to `vi`; write the page description and PWA manifest description in Vietnamese. Retain the approved product name and existing manifest/icon behavior.
- [ ] Link affected product specs to `vietnamese-language.md`; keep implementation-facing docs in English, but mark any English interface examples as semantic placeholders until the glossary supplies approved Vietnamese copy.
- [ ] Verify online/offline/update-ready copy and Settings status in the browser; do not claim an update state that was not exercised.
- [ ] Commit Settings and PWA metadata copy as `feat(web): localize settings and PWA metadata`.

### Task 6: Remove CJK-only fonts and coverage machinery

**Files:** Modify `apps/web/src/index.css`, `apps/web/package.json`, `apps/web/public/fonts/README.md`, `apps/web/public/fonts/NOTICE.md`, `packages/knowledge/tests/entities.test.ts`, and `.github/workflows/ci.yml`; remove `apps/web/public/fonts/{noto-serif-cjk-app.woff2,noto-sans-cjk-app.woff2,cjk-coverage.txt,Noto-Serif-CJK-OFL.txt,Noto-Sans-CJK-OFL.txt}` and the two CJK-only scripts.

- [ ] Remove CJK `@font-face` entries and any CJK-only required glyph list. Keep Vietnamese Noto faces, Latin brand font, their upstream notices, and current offline font behavior.
- [ ] Remove the `update:cjk-coverage` package script, CJK font-map test, and CI setup/step used only by that test. Preserve unrelated CI checks and font licensing records.
- [ ] Update font documentation to list only shipped assets and Vietnamese coverage; remove CJK generation instructions and stale character counts.
- [ ] Run the production build and inspect the PWA asset manifest to confirm the removed CJK fonts are not emitted or precached.
- [ ] Commit CJK-only delivery removal as `build(web): remove unused CJK font assets`.

### Task 7: Cross-surface language and regression verification

**Files:** Update `features/feat-018.md`, `feature_index.json`, and `progress.md` only after implementation evidence exists; update canonical language/product docs only for accepted terminology or observed behavior.

- [ ] Run `pnpm --filter @liuyao/knowledge test`, `pnpm --filter @liuyao/knowledge typecheck`, and `./init.sh`.
- [ ] In a production preview, inspect the web app at 390×844 and 1440×900. Exercise home, direct/manual/automatic casting, result facts and dialogs, Library search/details, Settings, and available offline/PWA states.
- [ ] Verify `document.documentElement.lang === 'vi'`, all sampled visible and accessibility-tree copy is Vietnamese, and no Han characters appear in rendered text.
- [ ] Compare representative calculation inputs/results and all stable knowledge IDs with the pre-change contracts; record exact evidence and untested browser states.
- [ ] Check formatting, TypeScript, tests, build, package exports, offline asset output, and working-tree diff; update feature acceptance and handoff only when evidence supports each claim.
- [ ] Commit evidence and feature handoff as `docs(feat-018): record Vietnamese language verification`.

## Verification budget

- Knowledge tests establish stable IDs, cross-reference integrity, required Vietnamese display content, no Han/CJK text in natural-language records, and Vietnamese search behavior.
- App behavior is verified by type-checking, build, and direct browser QA because repository policy prohibits tests under `apps/web`.
- `./init.sh` is the final repository workflow. Browser evidence is a tested subset, not a claim of a complete browser matrix.
- Source-rights and translation accuracy require editorial review; automated tests cannot establish either.
