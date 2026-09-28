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

- [ ] All visible UI copy, accessible names, user-facing statuses/errors, page metadata, and knowledge prose are Vietnamese.
- [ ] No user-facing knowledge record or rendered app content displays Han characters, English aliases, or Chinese romanizations.
- [ ] A reviewed glossary controls canonical terminology and all 8 trigram and 64 hexagram display names.
- [ ] Knowledge search uses Vietnamese names and reviewed aliases, remains local, and tolerates Vietnamese diacritic/case variations.
- [ ] Stable IDs and deterministic results are unchanged; the knowledge package validates the Vietnamese content contract.
- [ ] Offline delivery no longer precaches unused CJK-only fonts or depends on CJK-only coverage tooling.
- [ ] `./init.sh` passes and browser review covers the main flows on compact mobile and wide desktop.

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

- State: active; user approved branch-based implementation, staged commits, and PR creation on 2026-09-28.
- Evidence: Vietnamese-only language decision and terminology boundary recorded in `docs/product-specs/vietnamese-language.md` on 2026-09-28. Canonical 8-trigram and 64-hexagram names and a core terminology glossary were added before catalog translation. Plan commit precedes implementation commits.
- Dependency check: feat-012 is done.
- Next: Commit the glossary and source notes, then localize and validate the knowledge package.
