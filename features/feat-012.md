# feat-012 — Quality hardening

## Goal

Golden tests, accessibility, responsive behavior, browsers, and failure states pass.

## Scope

- Implement the V1 work defined for F11 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F11 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Golden tests, accessibility, responsive behavior, browsers, and failure states pass.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F11-T01 — Add complete golden fixtures for supported deterministic rules (8 independently composed pure-board full fixtures, 14 moving-line cases, 8 changing-trigram cases, and direct/sequential casting equivalence; 176 core tests and `./init.sh` passed. Fixture provenance is independent; this does not claim coverage of all possible input combinations.)
- [x] F11-T02 — Add regression fixtures for every corrected domain bug (coordinator audit reviewed matching regression tests; scope caveat: evidence covers reviewed corrected-bug records, not unreviewed records)
- [x] F11-T03 — Audit keyboard navigation, focus visibility, and focus trap in Drawer / Dialogs (Chromium production-preview: drawer receives initial focus, Tab remains within it, Escape closes and restores focus to trigger; native discard dialog opens focused on “Keep editing,” Tab reaches the second action, Escape returns to active casting flow)
- [x] F11-T04 — Audit visible labels and accessible names (Chromium accessibility tree: question, casting method radios, line selects, navigation, library search/category actions and result fact buttons exposed with meaningful names; drawer has dialog role and a unique “Palace element fact details” name)
- [x] F11-T05 — Audit focus order and focus visibility (Chromium keyboard checks: first Tab reaches current Reading navigation link with visible 2px outline; drawer and dialog keyboard order checks pass; drawer return focus verified)
- [ ] F11-T06 — Audit text contrast (≥4.5:1 / ≥3:1) and non-text UI boundary contrast (≥3:1) (Fresh production Chromium at 390×844 reached direct entry and result. Computed result colors: paper `rgb(246,243,235)`, deep paper `rgb(236,231,219)`, fact boundary `rgb(79,76,68)` (#4f4c44), editorial rule `rgb(200,194,180)` (#c8c2b4), muted text `rgb(103,103,94)`. WCAG sRGB channel linearization method described below yields fact boundary 7.73:1 on paper and 6.95:1 on deep paper; muted text 5.15:1 on paper. Editorial rules are 1.60:1 / 1.44:1 and remain below 3:1; they are intentionally decorative separators, not controls. Focus ring `#334b32` remains. Drawer scrim is `rgba(24,25,22,.58)` over paper; composited dimmed page is approximately `rgb(117,117,111)` versus drawer `rgb(251,250,246)`, 4.44:1. Library computed `oklch(0.44 0 0)` neutral text/boundary is about 7.77:1 on white (neutral OKLCH L³ linear channel); previous 4.94:1 claim was based on incorrectly treating OKLCH lightness as an sRGB channel. Contrast method for computed sRGB: convert channel c (0–1) to c/12.92 if c≤0.04045, otherwise ((c+0.055)/1.055)^2.4; luminance=.2126R+.7152G+.0722B; ratio=(Lmax+.05)/(Lmin+.05). Full text-pair inventory and all non-text boundaries remain incomplete; keep open.)
- [ ] F11-T07 — Verify layout at compact mobile with safe-area insets, tablet, and wide desktop (previous Chromium layout checks at 390×844, 768×900, 1024×900 and 1440×1000 showed no horizontal overflow. `agent-browser set device "iPhone 14"` changed user agent to iPhone Safari 16 emulation; computed bottom inset remained 0px. Actual iPhone 17 Pro simulator on iOS 26.5 (runtime 23F77; system 26.5.1) Safari accessibility tree/screenshots confirmed home, Library, direct Qian detail, and Settings from temporary server port 4332. No casting/result flow, offline state, or nonzero safe-area measurement was obtained. CSS env() support is true; uses are in navigation, shell, drawer and update banner. Safe-area and broader responsive criterion remain open. QA screenshots are outside the repository under `.../opencode/liuyao-ios-qa`.)
- [x] F11-T08 — Verify long labels in the approved primary language and long source names do not break layout (production preview rendered Chinese/romanized hexagram labels, six line-fact controls and long source-title drawer content at 390px without horizontal document overflow; direct-entry breakpoint already extended to 480px)
- [ ] F11-T09 — Verify empty, invalid, offline, update, and calculation-error states (Invalid values are blocked by native select options and disabled Calculate; prior browser-only invalid-option injection reset the select to empty and left Calculate disabled. Valid UI values are exactly integers 6–9, so calculation errors cannot be induced by valid entry; no dev-only product seam was added. Source audit of `CastingFlow.finish` shows catch preserves entered draft values and renders `role=alert`; core validation tests cover malformed line arrays at the domain boundary. This establishes design protection/recovery source behavior, not an end-to-end runtime calculation-error state. Offline `/result` reload in Chromium showed “No active result”; offline/update runtime evidence is also referenced from feat-011. Keep task open because canonical acceptance asks for calculation-error state verification.)
- [ ] F11-T10 — Verify no blocking console errors in release flows (Fresh production Chromium at `localhost:4326`, 390×844: sampled console and uncaught-error buffers were empty on reading/result/drawer; offline `/result` reload displayed “No active result.” Native Safari 26.5 on macOS 26.5.1 at production `localhost:4187` completed home, manual casting with lines `7, 8, 9, 6, 7, 8`, result Ji Ji (63)/Sui (17), direct Library Qian, and Settings. Page-error and `unhandledrejection` samples were empty on those routes; Safari console endpoint is unsupported. Question persistence was not verified. Dialog flow in Chromium was interrupted by a stale element; update banner dimensions/waiting-worker state were not tested in this pass. Coverage remains sampled, so task stays open.)
- [ ] F11-T11 — Run supported-browser release matrix (Native Safari WebDriver on macOS 26.5.1/Safari 26.5 at production `localhost:4187` completed home, manual 7,8,9,6,7,8 casting to Ji Ji (63)/Sui (17), direct Library Qian, and Settings; sampled page-error and `unhandledrejection` buffers were empty. Safari console endpoint is unsupported; offline behavior and question persistence were not verified. Actual iPhone 17 Pro simulator iOS 26.5 (runtime 23F77; system 26.5.1) Safari accessibility tree/screenshots confirmed home, Library, Qian direct detail and Settings from temporary server port 4332, but no casting/result or offline test. Android Pixel_2 Android 14 API 34 emulator Chrome 142.0.7444.171 remained at FirstRunActivity with no app-page evidence despite stable temporary server port 4331. Prior Edge check found no Edge app. Chromium QA is recorded in T10/T13. Required matrix in `docs/release.md` remains incomplete.)
- [x] F11-T12 — Run `./init.sh` and read-only merge checks (coordinator reports `./init.sh` passed after merged changes; this continuation reran it after the contrast change; `git diff --check` clean; working tree remains uncommitted)
- [ ] F11-T13 — Audit interactive touch target sizing (≥44×44px) across compact and mobile views (Existing compact Chromium measurements remain: navigation 117×44; Library tabs ≥69×48; search 229.8×44; Settings links 44–53×44; direct-entry controls ≥44px high. Fresh 390×844 Chromium at `localhost:4326`: visible primary fact links measured 343×44; trigram/palace fact links were at least 323×44; line fact links at least 87.5×44. Inspector close was 44×44; confirmation dialog actions were at least 129×44, though dialog flow was interrupted by a stale element. Update-banner controls were not measured, and no waiting worker was present. Keep open pending remaining mobile controls and banner measurements.)

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`
- `feat-003`
- `feat-004`
- `feat-005`
- `feat-006`
- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`
- `feat-011`

## Handoff

- State: active; implementation and evidence updated; coordinator validation pending.
- Evidence: Dependencies verified done at activation. `./init.sh` passed after latest UI changes (176 core tests, 41 knowledge tests; existing Fast Refresh warning, no lint errors); `git diff --check` was clean before this documentation update. F11-T01 includes 8 independently composed full pure-board fixtures, 14 moving cases, 8 changing-trigram cases, and direct/sequential equivalence; no all-combinations coverage is claimed. Safari macOS, iPhone simulator, Android emulator, and Chromium observations are recorded in T07/T10/T11/T13. Safe-area measurement, Android app-page access, Safari console/offline/question-persistence, interrupted dialog flow, unmeasured update banner, and complete browser matrix remain explicit limits.
- Dependency check: complete for feat-002 through feat-011 at activation.
- Next: Continue remaining unchecked F11 task evidence, including full contrast, safe-area, failure-state, complete console coverage, update-banner sizing and supported-browser matrix; coordinator validates the current evidence.
