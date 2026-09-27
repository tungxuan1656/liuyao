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
- [ ] F11-T07 — Verify layout at compact mobile with safe-area insets, tablet, and wide desktop (previous Chromium layout checks at 390×844, 768×900, 1024×900 and 1440×1000 showed no horizontal overflow. `agent-browser set device "iPhone 14"` changed user agent to iPhone Safari 16 emulation; computed bottom inset remained 0px. CSS env() support is true; uses are in navigation, shell, drawer and update banner. No non-zero safe-area emulation achieved; keep inset-specific criterion open.)
- [x] F11-T08 — Verify long labels in the approved primary language and long source names do not break layout (production preview rendered Chinese/romanized hexagram labels, six line-fact controls and long source-title drawer content at 390px without horizontal document overflow; direct-entry breakpoint already extended to 480px)
- [ ] F11-T09 — Verify empty, invalid, offline, update, and calculation-error states (Invalid values are blocked by native select options and disabled Calculate; prior browser-only invalid-option injection reset the select to empty and left Calculate disabled. Valid UI values are exactly integers 6–9, so calculation errors cannot be induced by valid entry; no dev-only product seam was added. Source audit of `CastingFlow.finish` shows catch preserves entered draft values and renders `role=alert`; core validation tests cover malformed line arrays at the domain boundary. This establishes design protection/recovery source behavior, not an end-to-end runtime calculation-error state. Keep task open because canonical acceptance asks for calculation-error state verification. Offline/update runtime evidence is referenced from feat-011.)
- [ ] F11-T10 — Verify no blocking console errors in release flows (fresh production Chromium session: initial home, library load and empty-search state checked; console and uncaught-error buffers empty. Reading/result/drawer/dialog and offline/update release states are not all covered by this session, so task remains open.)
- [ ] F11-T11 — Run supported-browser release matrix (Native Safari 26.5 on macOS 26.5.1 confirmed only that the home page loaded; Safari UI automation failed. iPhone iOS 26.5 launched without page confirmation. Android emulator OS/Chrome was queried, but the emulator went offline and its preview exited without page evidence. Edge was absent. Required platforms in `docs/release.md` include Chrome desktop/Android, Safari macOS/iOS/iPadOS, and Edge desktop; this matrix remains incomplete.)
- [x] F11-T12 — Run `./init.sh` and read-only merge checks (coordinator reports `./init.sh` passed after merged changes; this continuation reran it after the contrast change; `git diff --check` clean; working tree remains uncommitted)
- [ ] F11-T13 — Audit interactive touch target sizing (≥44×44px) across compact and mobile views (Existing compact Chromium measurements remain: navigation 117×44; Library tabs ≥69×48; search 229.8×44; Settings links 44–53×44; direct-entry controls ≥44px high. Fresh result route at 390×844 had document width 375px with no overflow; 26 fact buttons rendered, but the aggregate selector included hidden/zero-size line buttons, so that minimum is not valid visible-control evidence. Opened inspector close button measured 44×44. Confirmation dialog actions and update-banner controls still need rendered size measurements; leave open.)

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
- Evidence: Dependencies verified done at activation. `./init.sh` passed after latest UI changes (176 core tests, 41 knowledge tests; existing Fast Refresh warning, no lint errors); `git diff --check` was clean before this documentation update. F11-T01 now has 8 independently composed full pure-board fixtures, 14 moving cases, 8 changing-trigram cases, and direct/sequential equivalence; no all-combinations coverage is claimed. Browser matrix evidence is corrected in T11: Safari macOS home-load only; iOS launched without page confirmation; Android emulator had no page evidence; Edge absent. Other task evidence and remaining open items are documented in their task entries.
- Dependency check: complete for feat-002 through feat-011 at activation.
- Next: Continue remaining unchecked F11 task evidence, including full contrast, safe-area, failure-state, console, and touch-target coverage; coordinator validates the pure-board fixture evidence and browser matrix status.
