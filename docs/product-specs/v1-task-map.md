# V1 task map

This document owns the end-to-end V1 task decomposition. Task IDs are stable planning references, not execution status.

## F01 — Domain contracts

| Task    | Change                                                                            | Evidence                  |
| ------- | --------------------------------------------------------------------------------- | ------------------------- |
| F01-T01 | Define bottom-to-top six-line tuple and `LineValue` semantics                     | Type tests                |
| F01-T02 | Define stable IDs for trigrams, hexagrams, palaces, rules, and knowledge entities | Type and uniqueness tests |
| F01-T03 | Define `liuyao-standard-v1` and result contracts                                  | Public API tests          |
| F01-T04 | Add runtime input validation for six values in `6..9`                             | Invalid-input tests       |

## F02 — Hexagram calculation

| Task    | Change                                                     | Evidence             |
| ------- | ---------------------------------------------------------- | -------------------- |
| F02-T01 | Implement polarity conversion for `6,7,8,9`                | Unit tests           |
| F02-T02 | Identify lower and upper trigrams from six lines           | 8 trigram fixtures   |
| F02-T03 | Identify the primary hexagram                              | 64 hexagram fixtures |
| F02-T04 | Transform changing lines and identify the changed hexagram | Moving-line fixtures |
| F02-T05 | Return one structured calculation result                   | Public API tests     |

## F03 — Liu Yao board

| Task    | Change                                                    | Evidence                         |
| ------- | --------------------------------------------------------- | -------------------------------- |
| F03-T01 | Add Eight Palace classification                           | 64 palace fixtures               |
| F03-T02 | Add Shi and Ying line positions                           | 64 Shi/Ying fixtures             |
| F03-T03 | Add Na Jia stem and branch assignments                    | Inner and outer trigram fixtures |
| F03-T04 | Map Earthly Branches to Five Elements                     | Branch-element fixtures          |
| F03-T05 | Derive Six Relatives from palace element and line element | Five-relation fixtures           |
| F03-T06 | Expose board facts without prose                          | Snapshot tests                   |

## F04 — Casting

| Task    | Change                                                                   | Evidence                      |
| ------- | ------------------------------------------------------------------------ | ----------------------------- |
| F04-T01 | Build sequential manual entry for six physical toss results              | Manual flow check             |
| F04-T02 | Build automatic three-coin casting with browser cryptographic randomness | Distribution and bounds tests |
| F04-T03 | Build direct six-line input                                              | Validation checks             |
| F04-T04 | Normalize all methods into the same core input                           | Equivalence tests             |
| F04-T05 | Prevent calculation before six valid lines exist                         | UI flow check                 |

## F05 — Knowledge

| Task    | Change                                                     | Evidence                   |
| ------- | ---------------------------------------------------------- | -------------------------- |
| F05-T01 | Define knowledge entity, term, rule, and source schemas    | Schema tests               |
| F05-T02 | Add display metadata for 8 trigrams and 64 hexagrams       | Count and uniqueness tests |
| F05-T03 | Add V1 terminology and rule explanations                   | Required-ID tests          |
| F05-T04 | Add source metadata without copying unlicensed modern text | Licensing review           |
| F05-T05 | Expose read-only lookup and search APIs                    | Package tests              |

## F06 — Reading flow

| Task    | Change                                             | Evidence               |
| ------- | -------------------------------------------------- | ---------------------- |
| F06-T01 | Replace the scaffold screen with app navigation    | Manual flow check      |
| F06-T02 | Build Home and New Reading entry points            | Manual flow check      |
| F06-T03 | Add method selection and draft state               | Manual flow check      |
| F06-T04 | Connect normalized input to `@liuyao/core`         | Build and flow check   |
| F06-T05 | Keep optional question text session-only           | Refresh behavior check |
| F06-T06 | Add clear recovery for invalid or incomplete input | Error-state check      |

## F07 — Result view

| Task    | Change                                                                            | Evidence                |
| ------- | --------------------------------------------------------------------------------- | ----------------------- |
| F07-T01 | Show primary and changed hexagram identities                                      | UI check                |
| F07-T02 | Render six lines in visible top-to-bottom order while preserving domain positions | UI check                |
| F07-T03 | Show Na Jia, element, Six Relative, and Shi/Ying facts                            | Fixture-backed UI check |
| F07-T04 | Mark changing lines and changed polarity                                          | UI check                |
| F07-T05 | Link each explainable fact to a rule or knowledge entry                           | Link audit              |
| F07-T06 | Keep user interpretation separate from deterministic facts                        | Content review          |

## F08 — Knowledge browser

| Task    | Change                                         | Evidence          |
| ------- | ---------------------------------------------- | ----------------- |
| F08-T01 | Build Library navigation                       | Manual flow check |
| F08-T02 | Add trigram and hexagram lists                 | Count check       |
| F08-T03 | Add local search by supported names and terms  | Search checks     |
| F08-T04 | Add detail pages with explanations and sources | Link audit        |
| F08-T05 | Make all V1 knowledge available offline        | Offline check     |

## F09 — Settings and diagnostics

| Task    | Change                                          | Evidence       |
| ------- | ----------------------------------------------- | -------------- |
| F09-T01 | Show app, core, knowledge, and ruleset versions | UI check       |
| F09-T02 | Show current PWA and offline state              | Browser check  |
| F09-T03 | Show fixed V1 conventions and non-goals         | Content review |
| F09-T04 | Do not add account or cloud controls            | Scope review   |

## F10 — Offline hardening

| Task    | Change                                                                   | Evidence             |
| ------- | ------------------------------------------------------------------------ | -------------------- |
| F10-T01 | Precache application shell and required knowledge assets                 | Service-worker audit |
| F10-T02 | Remove runtime network requirements from core flows                      | Offline check        |
| F10-T03 | Add a non-disruptive update-available flow                               | Update check         |
| F10-T04 | Keep the app usable in a normal browser when installation is unavailable | Browser check        |
| F10-T05 | Verify direct navigation routes after service-worker control             | Reload checks        |

## F11 — Release hardening

| Task    | Change                                                         | Evidence                               |
| ------- | -------------------------------------------------------------- | -------------------------------------- |
| F11-T01 | Add complete golden fixtures for supported deterministic rules | `pnpm test`                            |
| F11-T02 | Audit keyboard access, labels, contrast, and responsive layout | Manual accessibility check             |
| F11-T03 | Run all three reading methods on desktop and mobile widths     | Manual matrix                          |
| F11-T04 | Run online → offline → reload scenarios                        | Manual PWA matrix                      |
| F11-T05 | Run repository full verification                               | `./init.sh` and read-only merge checks |
| F11-T06 | Compare final behavior with `docs/product-specs/v1-mvp.md`     | Scope audit                            |
