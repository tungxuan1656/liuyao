# feat-013 — Product identity

## Goal

Deliver the approved V1 identity and close its remaining required research and device checks. Product identity decisions and explicit V1 waivers are canonical in `docs/product-specs/product-identity.md`.

## Scope

- Implement the V1 work defined for F12 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete required F12 tasks and evidence in `docs/product-specs/v1-task-map.md`; F12-T09 and F12-T11 are expressly waived for V1, not completed deliverables.
- [x] Complete name-conflict, domain-availability, and obvious trademark-risk research before launch.
- [x] Retest the installed-PWA title, controls, and bottom spacing on physical iOS after the safe-area implementation change.
- [x] Meet the V1 identity condition: approved name, language, no-tagline decision, bagua mark and wordmark, current colors, required icons/metadata/fonts, and recorded asset usage-rights confirmation.
- [x] Pass the repository verification workflow in `./init.sh`.

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
- [x] F12-T06 — Decide whether V1 uses a tagline (no tagline for V1; Product Owner approved 2026-10-01)
- [ ] F12-T07 — Check name conflicts, domain availability, and obvious trademark risk before launch
- [x] F12-T08 — Approve the supplied bagua mark and current wordmark treatment (`docs/design-docs/batquai.avif`; Product Owner approval 2026-10-01; see `docs/product-specs/previews/feat-013-logo-preview.html`)
- [waived by Product Owner for V1] F12-T09 — Keep an editable vector master for approved marks (waived 2026-10-01; no vector master is claimed or generated)
- [x] F12-T10 — Export favicon, 192, 512, maskable, and Apple touch icons (generated from Product Owner-selected `docs/design-docs/batquai.avif` with 5% standard padding, 45% maskable safe-area padding, and 30% Apple padding; manifest and HTML links wired)
- [waived by Product Owner for V1] F12-T11 — Create the social sharing image (waived 2026-10-01; no social image is claimed or generated)
- [x] F12-T12 — Approve theme and background colors (Product Owner approved current colors on 2026-10-01; generated maskable icon uses white background and 45% padding to preserve the full composition inside its 80% safe circle)
- [x] F12-T13 — Replace provisional page title, description, manifest name, and favicon (title, approved description, public/short name, icons, manifest, and approved current colors applied)
- [x] F12-T14 — Set the correct HTML language (`vi`)
- [x] F12-T15 — Document ownership and rights for every brand asset (Product Owner confirmed usage rights for `batquai.avif` on 2026-10-01; creator unidentified, not an independent legal audit)
- [ ] F12-T16 — Verify app header, browser tab, install UI, and README use one identity (user reports installing the PWA on iOS; observed top blur obscures the title and buttons and bottom safe spacing is insufficient; this is a failed/pending device check, not a pass)
- [x] F12-T17 — Approve Noto Serif, Noto Sans, and Latin Cinzel typography stack; do not require CJK fonts (approved for Vietnamese-only UI 2026-09-28)
- [x] F12-T18 — Bundle and self-host the approved Latin/Vietnamese fonts locally; no CJK subsetting plan is required

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`. Product identity decisions and the V1 asset waivers remain canonical in `docs/product-specs/product-identity.md`.

## Dependencies

- None.

## Handoff

- State: done. The Product Owner confirmed on 2026-10-03 that the physical-iOS install retest passed and that the name-conflict, domain-availability, and trademark-risk research is complete. That confirmation is the acceptance evidence for those two items; this repository adds no device or research artifact of its own.
- Evidence: Product Owner approved Lục Hào as the final public name (2026-09-27), Vietnamese-only user-facing language and no displayed Han characters (2026-09-28), and the PWA short name, exact description, supplied bagua mark/current wordmark, current theme colors, and project usage-rights confirmation (2026-10-01). The Product Owner also approved no tagline and waived the editable vector master and social-sharing image for V1. Existing generated favicon, 192, 512, maskable, and Apple icons were made from the supplied bitmap without drawing or cropping; metadata, README, and header were aligned. The safe-area follow-up adds `viewport-fit=cover`, applies the top environment inset to the app header, and applies bottom inset spacing to the app shell and bottom sheet. A targeted mitigation now makes the opaque app header sticky at `top: 0` with its own stacking context, and adds Apple's `apple-mobile-web-app-capable=yes` plus the default status-bar style. The status-bar metadata is a legacy compatibility choice, not evidence of a modern iOS fix; the existing dynamic HTML theme color remains in place, and the manifest's static theme/background color remains white to match the initial light header. Librarian research found no authoritative guaranteed blur mechanism; opaque sticky/header coverage is the best user-corroborated experiment, not a confirmed cause or cure. On 2026-10-02 the browser check established header `position: sticky`, `top: 0` after scrolling, an opaque theme-matched background, expected metadata values, and usable home/casting/library/confirmation-dialog surfaces. Full repository workflow results are recorded in the 2026-10-02 progress entry; physical-device retest remains pending. Earlier designer-reported browser simulation at 390×844 showed 59px top and 34px bottom insets; this is not physical-device evidence. The user-reported iOS PWA still needs retesting because top blur obscured the title/buttons and bottom safe spacing was insufficient. Retest must explicitly include normal scrolling and top overscroll to check for blur recurrence, both themes, header controls, and bottom spacing. The operating-system root cause remains unconfirmed. The creator remains unidentified; the usage-rights note records Product Owner confirmation, not an independent legal audit. Naming/conflict research and final terminology/copy review remain open. See `docs/product-specs/product-identity.md`, `docs/product-specs/vietnamese-language.md`, `docs/product-specs/v1-task-map.md`, and `docs/product-specs/previews/feat-013-logo-preview.html`.
- Review follow-up (2026-10-02): F1 is resolved in `docs/product-specs/product-identity.md`: V1 uses one Product Owner-approved light-background icon set despite light/dark UI, static `#ffffff` manifest theme/background colors, and runtime theme-following HTML `theme-color`; no Android tint behavior or native fix is asserted. F2 adds left/right safe-area spacing for header, route content, and bottom sheet. Designer browser simulation passed synthetic landscape left/right 59px at 844×390 and portrait zero horizontal inset; this is not physical-device evidence. F3 documents and exercises `pnpm --filter @liuyao/web generate:assets`; repeated generation was hash-deterministic, generator exit 23 was preserved, SIGTERM returned 143, and the temporary source was removed in both failure cases. The harmless F4 duplicate `includeAssets` declaration is intentionally retained. Native initial/scroll/overscroll and landscape device checks remain pending.
- Dependency check: passed; no feature dependencies. F12-T07 research and the F12-T16 physical-device retest are closed on the Product Owner's 2026-10-03 confirmation. F12-T09 and T11 remain waived for V1, not completed.
- Next: None. Reopen the feature only if installed-PWA rendering or identity metadata regresses.
