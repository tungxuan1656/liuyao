# feat-018 — Vietnamese product language

## Goal

All user-facing web copy and local knowledge content use reviewed Vietnamese terminology without displayed Han characters.

## Scope

- Apply the approved language rules in `docs/product-specs/vietnamese-language.md` across the web UI, accessibility text, metadata, and `@liuyao/knowledge`.
- Preserve stable IDs, ruleset identifiers, routes, licenses, and deterministic calculation behavior.
- Remove CJK-only runtime font and coverage machinery when no longer required by user-facing content.

## Non-goals

- Multiple locales, language selection, runtime translation, or remote services.
- Changes to calculation rules, result values, or stable IDs.
- Final product branding decisions outside Vietnamese copy and language metadata.

## Acceptance

- [x] All visible UI copy, accessible names, user-facing statuses/errors, page metadata, and knowledge prose are Vietnamese.
- [x] No user-facing knowledge record or rendered app content displays Han characters, English aliases, or Chinese romanizations.
- [x] A reviewed glossary controls canonical terminology and all 8 trigram and 64 hexagram display names.
- [x] Knowledge search uses Vietnamese names and reviewed aliases, remains local, and tolerates Vietnamese diacritic/case variations.
- [x] Stable IDs and deterministic results are unchanged; the knowledge package validates the Vietnamese content contract.
- [x] Offline delivery no longer precaches unused CJK-only fonts or depends on CJK-only coverage tooling.
- [x] `./init.sh` passes and browser review covers the main flows on compact mobile and wide desktop.

## Relevant docs

- `docs/product-specs/vietnamese-language.md`
- `docs/product-specs/product-identity.md`
- `docs/product-specs/ui-layout.md`
- `docs/product-specs/knowledge-browser.md`
- `docs/product-specs/reading-flow.md`
- `docs/product-specs/reading-result.md`
- `docs/product-specs/settings.md`
- `docs/design-docs/knowledge-model.md`
- `ARCHITECTURE.md`
- `docs/development.md`

## Plan

Implementation stages and file ownership are in `docs/plans/feat-018.md`.

## Dependencies

- `feat-012`

## Handoff

- State: done; PR #24 is open for review.
- Evidence: `./init.sh` passed format, lint (one existing non-failing `react-refresh/only-export-components` warning), typecheck, build, package exports, test placement, and 217 package tests (41 knowledge + 176 core). Production-preview checks at 390×844 and 1440×900 covered home, all casting methods, cancellation/reset, changed and unchanged results, fact explanations, Library categories/search/no-results/hexagram and rule details, Settings, and real service-worker offline loading; sampled rendered text and accessibility names were Vietnamese with no Han characters. HTML and PWA manifest language are `vi`; the service worker precaches Vietnamese/Latin fonts and no CJK fonts. A deterministic direct input of six `7` values produced the unchanged `hexagram-01` / Thuần Càn result. The update-ready banner and install/update prompt states were not forced. See `docs/plans/feat-018.md` for the verification checklist.
- Dependency check: feat-012 is done.
- Next: Address review feedback, then merge PR #24.
