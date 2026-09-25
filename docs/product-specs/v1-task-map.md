# V1 task map

This document owns the end-to-end V1 task decomposition. Task IDs are stable planning references, not execution status.

A feature is not done when code exists. It is done when its implementation, content, error states, integration, and verification evidence are complete.

## F00 — Web UI foundation

| Task    | Change                                                                             | Evidence            |
| ------- | ---------------------------------------------------------------------------------- | ------------------- |
| F00-T01 | Configure Tailwind CSS, PostCSS, and path aliases (`@/*`) in `apps/web`            | Build check         |
| F00-T02 | Initialize shadcn/ui with `new-york` style, CSS variables, and base design tokens  | Component audit     |
| F00-T03 | Define SPA route infrastructure, router provider, and route constants              | Routing smoke check |
| F00-T04 | Install, bundle, and self-host local typography assets without remote CDN          | Offline asset audit |
| F00-T05 | Establish AppShell primitives, responsive breakpoints, and iOS safe-area utilities | Responsive check    |

## F01 — Domain contracts

| Task    | Change                                                           | Evidence            |
| ------- | ---------------------------------------------------------------- | ------------------- |
| F01-T01 | Define bottom-to-top six-line tuple and `LineValue` semantics    | Type tests          |
| F01-T02 | Define stable IDs for trigrams, hexagrams, palaces, and rulesets | Uniqueness tests    |
| F01-T03 | Define `liuyao-standard-v1`                                      | Public API test     |
| F01-T04 | Define input and structured result types                         | Type tests          |
| F01-T05 | Define domain error types for invalid or unsupported input       | Error tests         |
| F01-T06 | Add runtime validation for exactly six values in `6..9`          | Invalid-input tests |
| F01-T07 | Define line position helpers without reversing domain order      | Position tests      |
| F01-T08 | Create reusable fixture helpers for later golden tests           | Test review         |

## F02 — Hexagram calculation

| Task    | Change                                                     | Evidence             |
| ------- | ---------------------------------------------------------- | -------------------- |
| F02-T01 | Implement polarity conversion for `6,7,8,9`                | Unit tests           |
| F02-T02 | Encode all 8 trigram polarity patterns                     | 8 trigram fixtures   |
| F02-T03 | Identify lower and upper trigrams from six lines           | Trigram tests        |
| F02-T04 | Add the canonical 64-hexagram mapping                      | 64 hexagram fixtures |
| F02-T05 | Identify the primary hexagram                              | 64 fixture pass      |
| F02-T06 | Transform only changing lines                              | Moving-line tests    |
| F02-T07 | Identify the changed hexagram when changes exist           | Changed fixtures     |
| F02-T08 | Return no changed hexagram when no line changes            | Static-line tests    |
| F02-T09 | Return one structured calculation result                   | Public API tests     |
| F02-T10 | Add regression fixtures for mixed moving-line combinations | Golden tests         |

## F03 — Liu Yao board

| Task    | Change                                               | Evidence                |
| ------- | ---------------------------------------------------- | ----------------------- |
| F03-T01 | Add Eight Palace classification                      | 64 palace fixtures      |
| F03-T02 | Add palace element mapping                           | Palace-element tests    |
| F03-T03 | Add Shi and Ying line positions                      | 64 Shi/Ying fixtures    |
| F03-T04 | Add Na Jia Heavenly Stem assignments                 | Na Jia fixtures         |
| F03-T05 | Add Na Jia Earthly Branch assignments                | Na Jia fixtures         |
| F03-T06 | Cover inner and outer trigram assignments separately | Coverage audit          |
| F03-T07 | Map Earthly Branches to Five Elements                | Branch-element fixtures |
| F03-T08 | Derive Six Relatives from palace and line elements   | Five-relation fixtures  |
| F03-T09 | Build six structured line results                    | Snapshot tests          |
| F03-T10 | Expose board facts without explanatory prose         | API review              |

## F04 — Casting core

| Task    | Change                                                               | Evidence           |
| ------- | -------------------------------------------------------------------- | ------------------ |
| F04-T01 | Define normalized casting result model consumed by core              | Integration test   |
| F04-T02 | Implement secure random generation adapter using browser crypto      | Bounds tests       |
| F04-T03 | Implement three-coin outcome distribution model (1/8, 3/8, 3/8, 1/8) | Distribution tests |
| F04-T04 | Map three-coin outcomes to `6,7,8,9` `LineValue`                     | Mapping tests      |
| F04-T05 | Implement `CastingService` producing typed `CoinTossResult`          | Service tests      |
| F04-T06 | Normalize sequential and direct inputs into core `LineValue` tuple   | Equivalence tests  |
| F04-T07 | Add table-driven tests verifying coin generation bounds and mapping  | Unit test suite    |

## F05 — Knowledge

| Task    | Change                                                                                 | Evidence            |
| ------- | -------------------------------------------------------------------------------------- | ------------------- |
| F05-T01 | Define knowledge entity, term, rule, source, and source-reference schemas              | Schema tests        |
| F05-T02 | Define stable IDs for knowledge entities, terms, rules, sources, and source references | ID tests            |
| F05-T03 | Add display metadata for all 8 trigrams                                                | Count check         |
| F05-T04 | Add display metadata for all 64 hexagrams                                              | Count check         |
| F05-T05 | Add V1 terminology required by result screens                                          | Required-term audit |
| F05-T06 | Add V1 rule explanations for displayed deterministic facts                             | Required-rule audit |
| F05-T07 | Add bibliographic source metadata                                                      | Source audit        |
| F05-T08 | Add source locations when chapter, section, or page is known                           | Content review      |
| F05-T09 | Remove or rewrite unlicensed modern text                                               | Licensing review    |
| F05-T10 | Validate duplicate IDs and broken references                                           | Package tests       |
| F05-T11 | Expose read-only lookup APIs                                                           | Package tests       |
| F05-T12 | Expose local normalized search APIs                                                    | Search tests        |

## F06 — Reading flow

| Task    | Change                                                                               | Evidence          |
| ------- | ------------------------------------------------------------------------------------ | ----------------- |
| F06-T01 | Replace scaffold screen with AppShell (BottomNav on compact, TopNav on wide)         | Manual check      |
| F06-T02 | Build the Home entry point at `/`                                                    | Manual check      |
| F06-T03 | Build New Reading entry state with question and method selectors                     | Manual check      |
| F06-T04 | Add optional question text with clear session-only behavior                          | Refresh check     |
| F06-T05 | Add method selection and in-memory draft state for sequential and direct entry       | Flow check        |
| F06-T06 | Preserve draft state when moving between steps                                       | Navigation check  |
| F06-T07 | Add Back, Reset, and Cancel navigation safety with AlertDialog confirmation          | Navigation check  |
| F06-T08 | Connect normalized input to `@liuyao/core`                                           | Integration check |
| F06-T09 | Show actionable invalid and incomplete input states                                  | Error-state check |
| F06-T10 | Keep entered values after recoverable errors                                         | Error-state check |
| F06-T11 | Confirm via AlertDialog before replacing an existing completed reading               | Flow check        |
| F06-T12 | Apply approved product name and interface language                                   | Identity audit    |
| F06-T13 | Implement mobile safe-area inset handling for fixed navigation and content container | Device check      |
| F06-T14 | Implement casting flow isolation (hide bottom navigation during active line input)   | UI check          |
| F06-T15 | Preserve active completed reading across root-tab navigation until explicit restart  | Navigation check  |

## F07 — Result view

| Task    | Change                                                                            | Evidence                |
| ------- | --------------------------------------------------------------------------------- | ----------------------- |
| F07-T01 | Show primary hexagram identity                                                    | UI check                |
| F07-T02 | Show changed hexagram only when changes exist                                     | UI check                |
| F07-T03 | Show upper and lower trigram identities for primary and changed hexagrams         | UI check                |
| F07-T04 | Show palace and palace element                                                    | Fixture-backed UI check |
| F07-T05 | Render sixth line at top and first line at bottom                                 | Position audit          |
| F07-T06 | Show Yin/Yang and moving indicators (6 as ✕, 9 as ○) via SVG/CSS YaoSymbol        | UI check                |
| F07-T07 | Show Na Jia stem and branch                                                       | Fixture-backed UI check |
| F07-T08 | Show Five Element and Six Relative                                                | Fixture-backed UI check |
| F07-T09 | Show Shi and Ying markers                                                         | Fixture-backed UI check |
| F07-T10 | Show changed polarity for moving lines                                            | UI check                |
| F07-T11 | Link explainable facts to ruleset-backed rule IDs and canonical source references | Link audit              |
| F07-T12 | Render fact, rule, and source as separate concepts                                | Content review          |
| F07-T13 | Add no-change state without an empty changed-hexagram card                        | UI check                |
| F07-T14 | Keep full input available when calculation fails                                  | Recovery check          |
| F07-T15 | Avoid generated interpretation or predictive verdicts                             | Scope review            |
| F07-T16 | Implement Wide Master-Detail layout and Compact Drawer-backed Fact Inspector      | Responsive UI check     |
| F07-T17 | Support keyboard navigation, focus management, and non-drag dismissal for Drawer  | Accessibility check     |

## F08 — Knowledge browser

| Task    | Change                                                                          | Evidence      |
| ------- | ------------------------------------------------------------------------------- | ------------- |
| F08-T01 | Build Library navigation with category tabs (Hexagrams, Trigrams, Terms, Rules) | Manual check  |
| F08-T02 | Add trigram list                                                                | Count check   |
| F08-T03 | Add hexagram list                                                               | Count check   |
| F08-T04 | Add term list                                                                   | Content check |
| F08-T05 | Add rule list with category filters                                             | Content check |
| F08-T06 | Add local search input                                                          | Search check  |
| F08-T07 | Normalize supported names and aliases for search                                | Search tests  |
| F08-T08 | Add clear no-results state                                                      | UI check      |
| F08-T09 | Add canonical detail page for each entity type                                  | Manual check  |
| F08-T10 | Show related entities and rule references                                       | Link audit    |
| F08-T11 | Show source metadata and locations                                              | Content audit |
| F08-T12 | Support direct links to canonical detail content                                | Reload check  |
| F08-T13 | Verify all V1 knowledge while offline                                           | Offline check |

## F09 — Settings and diagnostics

| Task    | Change                                                          | Evidence       |
| ------- | --------------------------------------------------------------- | -------------- |
| F09-T01 | Show web app version                                            | UI check       |
| F09-T02 | Show `@liuyao/core` version                                     | UI check       |
| F09-T03 | Show `@liuyao/knowledge` version                                | UI check       |
| F09-T04 | Show ruleset ID                                                 | UI check       |
| F09-T05 | Show online or offline state                                    | Browser check  |
| F09-T06 | Show install state when the browser exposes it                  | Browser check  |
| F09-T07 | Show update availability                                        | Update check   |
| F09-T08 | Show fixed line and ruleset conventions                         | Content review |
| F09-T09 | Link About, licensing, privacy, and security information        | Link audit     |
| F09-T10 | Do not add account, sync, history, analytics, or cloud controls | Scope review   |

## F10 — Offline hardening

| Task    | Change                                                                   | Evidence             |
| ------- | ------------------------------------------------------------------------ | -------------------- |
| F10-T01 | Precache application shell                                               | Service-worker audit |
| F10-T02 | Precache required knowledge assets                                       | Offline check        |
| F10-T03 | Remove remote runtime dependencies from core flows                       | Network audit        |
| F10-T04 | Add a visible non-blocking offline state                                 | Browser check        |
| F10-T05 | Keep cached navigation usable without network                            | Offline check        |
| F10-T06 | Replace unsafe forced auto-update behavior with a draft-safe update flow | Update check         |
| F10-T07 | Preserve active draft until the user accepts an update                   | Update check         |
| F10-T08 | Keep normal browser use when installation is unavailable                 | Browser check        |
| F10-T09 | Verify direct-route reload under service-worker control                  | Reload check         |
| F10-T10 | Verify online → offline → reload → online recovery                       | Manual matrix        |

## F11 — Quality hardening

| Task    | Change                                                                                        | Evidence            |
| ------- | --------------------------------------------------------------------------------------------- | ------------------- |
| F11-T01 | Add complete golden fixtures for supported deterministic rules                                | `pnpm test`         |
| F11-T02 | Add regression fixtures for every corrected domain bug                                        | Test review         |
| F11-T03 | Audit keyboard navigation, focus visibility, and focus trap in Drawer / Dialogs               | Accessibility check |
| F11-T04 | Audit visible labels and accessible names                                                     | Accessibility check |
| F11-T05 | Audit focus order and focus visibility                                                        | Accessibility check |
| F11-T06 | Audit text contrast (≥4.5:1 / ≥3:1) and non-text UI boundary contrast (≥3:1)                  | Accessibility check |
| F11-T07 | Verify layout at compact mobile with safe-area insets, tablet, and wide desktop               | Responsive matrix   |
| F11-T08 | Verify long labels in the approved primary language and long source names do not break layout | Content matrix      |
| F11-T09 | Verify empty, invalid, offline, update, and calculation-error states                          | State matrix        |
| F11-T10 | Verify no blocking console errors in release flows                                            | Browser check       |
| F11-T11 | Run supported-browser release matrix                                                          | Manual matrix       |
| F11-T12 | Run `./init.sh` and read-only merge checks                                                    | Verification log    |
| F11-T13 | Audit interactive touch target sizing (≥44×44px) across compact and mobile views              | Accessibility check |

## F12 — Product identity

| Task    | Change                                                                                  | Evidence               |
| ------- | --------------------------------------------------------------------------------------- | ---------------------- |
| F12-T01 | Review existing naming ideas and define naming criteria                                 | Decision note          |
| F12-T02 | Approve the final public product name                                                   | Product Owner approval |
| F12-T03 | Approve the PWA short name                                                              | Manifest review        |
| F12-T04 | Confirm V1 primary interface language and terminology                                   | Copy review            |
| F12-T05 | Write the one-sentence public product description                                       | Copy review            |
| F12-T06 | Decide whether V1 uses a tagline                                                        | Product Owner approval |
| F12-T07 | Check name conflicts, domain availability, and obvious trademark risk before launch     | Research record        |
| F12-T08 | Design and approve the logo mark and wordmark                                           | Asset review           |
| F12-T09 | Keep an editable vector master for approved marks                                       | Asset audit            |
| F12-T10 | Export favicon, 192, 512, maskable, and Apple touch icons                               | PWA audit              |
| F12-T11 | Create the social sharing image                                                         | Metadata preview       |
| F12-T12 | Approve theme and background colors                                                     | Visual review          |
| F12-T13 | Replace provisional page title, description, manifest name, and favicon                 | Metadata audit         |
| F12-T14 | Set the correct HTML language                                                           | HTML audit             |
| F12-T15 | Document ownership and rights for every brand asset                                     | Rights audit           |
| F12-T16 | Verify app header, browser tab, install UI, and README use one identity                 | Cross-surface audit    |
| F12-T17 | Approve Noto Serif, Noto Sans, Noto CJK, and Latin Cinzel typography stack              | Product Owner approval |
| F12-T18 | Bundle and self-host approved fonts locally with payload budget and CJK subsetting plan | Font payload audit     |

## F13 — Production delivery

| Task    | Change                                                                            | Evidence               |
| ------- | --------------------------------------------------------------------------------- | ---------------------- |
| F13-T01 | Define production hosting requirements from `docs/release.md`                     | Decision record        |
| F13-T02 | Select a static hosting provider                                                  | Product Owner approval |
| F13-T03 | Select and register the production domain                                         | Domain record          |
| F13-T04 | Configure DNS and HTTPS                                                           | Production check       |
| F13-T05 | Configure SPA route fallback                                                      | Direct-route check     |
| F13-T06 | Configure safe cache behavior for HTML, service worker, and fingerprinted assets  | Header audit           |
| F13-T07 | Define build command, output directory, and Node/pnpm versions                    | Deploy config review   |
| F13-T08 | Add preview deployment for release review                                         | Preview URL check      |
| F13-T09 | Add production deployment from the approved main revision                         | Workflow check         |
| F13-T10 | Prevent production deployment when required CI fails                              | Workflow check         |
| F13-T11 | Stamp app version and build revision into production diagnostics                  | Settings check         |
| F13-T12 | Verify manifest URLs and base paths on the production domain                      | PWA check              |
| F13-T13 | Add production security headers supported by the host                             | Header audit           |
| F13-T14 | Document the rollback command or provider action                                  | Runbook review         |
| F13-T15 | Exercise the hosting rollback mechanism in Preview before first production launch | Rollback log           |
| F13-T16 | Define the production smoke-test procedure used by launch                         | Runbook review         |
| F13-T17 | Add canonical production URL metadata after domain selection                      | Production audit       |
| F13-T18 | Review host logging and confirm app code does not log question text               | Privacy audit          |

## F14 — Product polish and trust

| Task    | Change                                                                  | Evidence               |
| ------- | ----------------------------------------------------------------------- | ---------------------- |
| F14-T01 | Freeze V1 navigation labels and common button copy                      | Copy review            |
| F14-T02 | Use consistent Liu Yao terminology across UI and knowledge content      | Terminology audit      |
| F14-T03 | Remove scaffold, placeholder, debug, and developer-facing copy          | UI audit               |
| F14-T04 | Add About product information                                           | Content review         |
| F14-T05 | Publish software and content licensing information                      | Link audit             |
| F14-T06 | Publish a concise privacy statement matching actual V1 data behavior    | Privacy review         |
| F14-T07 | Decide and publish an appropriate divination-use disclaimer             | Product Owner approval |
| F14-T08 | Link the security reporting path                                        | Link audit             |
| F14-T09 | Add canonical page title and description metadata                       | Metadata audit         |
| F14-T10 | Add Open Graph or equivalent social preview metadata                    | Social preview         |
| F14-T11 | Add robots and sitemap behavior appropriate to the chosen public pages  | Crawl check            |
| F14-T12 | Audit third-party packages and assets for license compatibility         | Dependency audit       |
| F14-T13 | Check production bundle for accidental secrets or development endpoints | Build audit            |
| F14-T14 | Verify all public links and source references are valid                 | Link audit             |

## F15 — Launch

| Task    | Change                                                                     | Evidence              |
| ------- | -------------------------------------------------------------------------- | --------------------- |
| F15-T01 | Freeze the release candidate revision                                      | Commit reference      |
| F15-T02 | Set the V1 semantic version                                                | Version audit         |
| F15-T03 | Write concise release notes                                                | Release record        |
| F15-T04 | Run all repository verification commands                                   | Verification log      |
| F15-T05 | Run the full desktop and mobile user-flow matrix                           | QA record             |
| F15-T06 | Run install, offline, update, and recovery scenarios                       | PWA QA record         |
| F15-T07 | Verify production name, logo, icons, metadata, and social preview          | Identity audit        |
| F15-T08 | Verify privacy, licensing, disclaimer, and security links                  | Trust audit           |
| F15-T09 | Deploy the release candidate to production                                 | Deploy record         |
| F15-T10 | Run the production smoke test                                              | Smoke-test log        |
| F15-T11 | Confirm rollback procedure and any previous production target are recorded | Runbook check         |
| F15-T12 | Create the Git tag or GitHub release for V1                                | Release URL           |
| F15-T13 | Update README status from early development to released V1                 | README review         |
| F15-T14 | Record known limitations without hiding them                               | Release notes         |
| F15-T15 | Verify the public product from a clean browser profile                     | Fresh-user check      |
| F15-T16 | Verify the installed PWA from a clean supported device or browser          | Install check         |
| F15-T17 | Check production again after service-worker activation                     | Post-activation smoke |
| F15-T18 | Open follow-up issues for non-blocking post-V1 defects                     | Issue links           |
