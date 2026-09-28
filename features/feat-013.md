# feat-013 — Product identity

## Goal

Final name, language, logo, icons, manifest, metadata, font bundle budget, and asset rights approved.

## Scope

- Implement the V1 work defined for F12 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F12 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Final name, language, logo, icons, manifest, metadata, font bundle budget, and asset rights approved.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F12-T01 — Review existing naming ideas and define naming criteria
- [x] F12-T02 — Approve the final public product name (Lục Hào; approved 2026-09-27, see `docs/product-specs/product-identity.md`)
- [ ] F12-T03 — Approve the PWA short name
- [x] F12-T04 — Confirm V1 primary interface language and terminology (Vietnamese-only approved 2026-09-28; see `docs/product-specs/vietnamese-language.md`)
- [ ] F12-T05 — Write the one-sentence public product description
- [ ] F12-T06 — Decide whether V1 uses a tagline
- [ ] F12-T07 — Check name conflicts, domain availability, and obvious trademark risk before launch
- [ ] F12-T08 — Design and approve the logo mark and wordmark
- [ ] F12-T09 — Keep an editable vector master for approved marks
- [ ] F12-T10 — Export favicon, 192, 512, maskable, and Apple touch icons
- [ ] F12-T11 — Create the social sharing image
- [ ] F12-T12 — Approve theme and background colors
- [ ] F12-T13 — Replace provisional page title, description, manifest name, and favicon
- [ ] F12-T14 — Set the correct HTML language
- [ ] F12-T15 — Document ownership and rights for every brand asset
- [ ] F12-T16 — Verify app header, browser tab, install UI, and README use one identity
- [x] F12-T17 — Approve Noto Serif, Noto Sans, and Latin Cinzel typography stack; do not require CJK fonts (approved for Vietnamese-only UI 2026-09-28)
- [x] F12-T18 — Bundle and self-host the approved Latin/Vietnamese fonts locally; no CJK subsetting plan is required

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- None.

## Handoff

- State: todo
- Evidence: Product Owner approved Lục Hào as the final public name on 2026-09-27, then superseded the English-language decision with Vietnamese-only user-facing language and no displayed Han characters on 2026-09-28. feat-018 finalized the Vietnamese glossary and localized knowledge and web surfaces; CJK-only fonts and coverage tooling were removed. See `docs/product-specs/product-identity.md`, `docs/product-specs/vietnamese-language.md`, and `docs/plans/feat-018.md`.
- Dependency check: pending for the remaining F12 identity, asset, metadata, and release decisions.
- Next: Complete the outstanding non-language F12 approvals and close feat-013 through its own acceptance criteria.
