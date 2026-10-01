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
- [x] F12-T03 — Approve the PWA short name (Lục Hào; approved 2026-10-01, see `docs/product-specs/product-identity.md`)
- [x] F12-T04 — Confirm V1 primary interface language and terminology (Vietnamese-only approved 2026-09-28; see `docs/product-specs/vietnamese-language.md`)
- [x] F12-T05 — Write the one-sentence public product description (approved 2026-10-01: “Lập quẻ, tra cứu và lưu kết quả Lục Hào ngay trên thiết bị của bạn.”)
- [ ] F12-T06 — Decide whether V1 uses a tagline
- [ ] F12-T07 — Check name conflicts, domain availability, and obvious trademark risk before launch
- [ ] F12-T08 — Design and approve the logo mark and wordmark (Product Owner selected the supplied bagua bitmap on 2026-10-01; final mark and wordmark preview review pending at `docs/product-specs/previews/feat-013-logo-preview.html`)
- [ ] F12-T09 — Keep an editable vector master for approved marks
- [x] F12-T10 — Export favicon, 192, 512, maskable, and Apple touch icons (generated from Product Owner-selected `docs/design-docs/batquai.avif` with 5% standard padding, 45% maskable safe-area padding, and 30% Apple padding; manifest and HTML links wired)
- [ ] F12-T11 — Create the social sharing image
- [ ] F12-T12 — Approve theme and background colors (existing app themes are unchanged; generated maskable icon uses white background and 45% padding to preserve the full composition inside its 80% safe circle)
- [x] F12-T13 — Replace provisional page title, description, manifest name, and favicon (title, approved description, public/short name, icons, and manifest applied; theme/background-color approval and install verification remain pending)
- [x] F12-T14 — Set the correct HTML language (`vi`)
- [x] F12-T15 — Document ownership and rights for every brand asset (Product Owner confirmed usage rights for `batquai.avif` on 2026-10-01; creator unidentified, not an independent legal audit)
- [ ] F12-T16 — Verify app header, browser tab, install UI, and README use one identity (README, header, browser tab, and manifest identity aligned in production preview; install flow not exposed in this headless browser)
- [x] F12-T17 — Approve Noto Serif, Noto Sans, and Latin Cinzel typography stack; do not require CJK fonts (approved for Vietnamese-only UI 2026-09-28)
- [x] F12-T18 — Bundle and self-host the approved Latin/Vietnamese fonts locally; no CJK subsetting plan is required

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- None.

## Handoff

- State: active implementation; all approved-slice code changes are complete; acceptance remains incomplete.
- Evidence: Product Owner approved Lục Hào as the final public name on 2026-09-27, Vietnamese-only user-facing language and no displayed Han characters on 2026-09-28, and the PWA short name, exact public description, selected supplied bagua bitmap, and its usage rights on 2026-10-01. Generated favicon, 192, 512, maskable and Apple icons from the source without drawing or cropping; aligned metadata, README, and header. The standard icon uses 5% padding, maskable icon uses 45% padding to keep the full square bagua inside an 80% circular safe zone, and Apple icon uses 30% padding. Production preview confirmed a 40px wide and 36px compact header logo, document title and manifest; direct mobile screenshots at 390×844 showed the art in unchanged light and dark layouts. The preview page displays the selected icon at wordmark, favicon, standard PWA, maskable and Apple sizes. The full art's substantial white margin makes the motif visually smaller in the app header; it remains uncropped as requested. `pnpm build`, web typecheck, and formatter passed. Creator remains unidentified; usage-rights note records Product Owner confirmation, not legal audit. Naming research, tagline, final mark/wordmark preview approval, editable vector master, theme colors, social image, and native install-surface review remain open. See `docs/product-specs/product-identity.md`, `docs/product-specs/vietnamese-language.md`, and `docs/product-specs/previews/feat-013-logo-preview.html`. feat-018 finalized the Vietnamese glossary and localized knowledge and web surfaces; CJK-only fonts and coverage tooling were removed.
- Dependency check: pending for the remaining F12 identity, asset, metadata, and release decisions.
- Next: Product Owner reviews the generated icon and wordmark preview, then approves or requests specific changes before any final identity-task closure.
