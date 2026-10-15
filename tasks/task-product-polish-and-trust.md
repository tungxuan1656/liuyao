# task-product-polish-and-trust - Product polish and trust

- Status: done
- Owner: Coding agent
- Required to start: [task-reading-flow](task-reading-flow.md), [task-result-view](task-result-view.md), [task-knowledge-browser](task-knowledge-browser.md), [task-settings](task-settings.md), [task-offline-hardening](task-offline-hardening.md), [task-product-identity](task-product-identity.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Copy, legal surfaces, SEO metadata, security posture, and visible edge states are release-ready.

## Scope

- Implement the V1 work defined for F14 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F14 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Copy, legal surfaces, SEO metadata, security posture, and visible edge states are release-ready.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F14-T01 — Freeze V1 navigation labels and common button copy
- [x] F14-T02 — Use consistent Liu Yao terminology across UI and knowledge content
- [x] F14-T03 — Remove scaffold, placeholder, debug, and developer-facing copy
- [x] F14-T04 — Add About product information
- [x] F14-T05 — Publish software and content licensing information
- [x] F14-T06 — Publish a concise privacy statement matching actual V1 data behavior
- [x] F14-T07 — Decide and publish an appropriate divination-use disclaimer
- [x] F14-T08 — Link the security reporting path
- [x] F14-T09 — Add canonical page title and description metadata
- [x] F14-T10 — Add Open Graph or equivalent social preview metadata
- [x] F14-T11 — Add robots and sitemap behavior appropriate to the chosen public pages
- [x] F14-T12 — Audit third-party packages and assets for license compatibility
- [x] F14-T13 — Check production bundle for accidental secrets or development endpoints
- [x] F14-T14 — Verify all public links and source references are valid

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Plan

1. Audit existing copy, links, licensing, privacy, metadata, and production assets against F14; run the baseline workflow.
2. Implement the approved trust information and result disclaimer, correct bounded copy defects, and publish honest pre-domain metadata/crawl behavior.
3. Verify wide/compact and offline trust surfaces, document audit evidence and remaining release gates, run `./init.sh`, commit coherent parts, and open a PR.

The Product Owner approved the learning/reference disclaimer and a short result-page reminder on 2026-10-15. Production hosting, domain registration, and canonical absolute URLs remain F13 decisions.

## Verification evidence

Inspected implementation revision: `599860d`. The Product Owner approved the disclaimer, the corrected description (which no longer promises saved readings), and keeping the existing commit before final documentation and PR delivery.

| Tasks   | Inspected scope and result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T01-T03 | Reviewed navigation, casting, results, Settings, Library, visible status/error copy, and knowledge terminology against the Vietnamese glossary. Froze common actions in `docs/product-specs/vietnamese-language.md`. Replaced the framework's unknown-route/error surface with Vietnamese recovery and added a visible, retryable PWA-update failure message. Technical IDs and required original license texts remain unchanged.                                                                                           |
| T04-T08 | Added the local product-information page and Settings links. Privacy distinguishes in-memory readings from persisted theme/cache data and host requests/logs. Software/content licensing matches `LICENSING.md`; security reporting links to `SECURITY.md`. The approved disclaimer has a short result reminder. Source reviewer `a0e194c0-d381-43a` re-read the final eight requested files plus app-shell and related session/theme/PWA contracts; no concrete defects remained in that bounded review.                   |
| T09-T11 | Built HTML has Vietnamese language, approved title/description, Open Graph, and summary-card metadata; the manifest uses the same corrected description. Checked intentional `noindex, nofollow` plus robots `Disallow: /`, with no invented canonical origin or sitemap. Production URLs, indexability, deployed-host behavior, and host-log disclosures remain explicit F13 gates in `docs/release.md`, not claims of completed deployment. The identity contract already waives a social image.                          |
| T12     | Inspected the installed dependency license inventory and the generated production report for 14 bundled JavaScript packages (MIT, Apache-2.0, and ISC), with retained license/copyright texts. Added the installed Tailwind, tw-animate-css, shadcn CSS, and shared Workbox notices; retained Noto/Cinzel OFL texts and font notice. All six user-linked notice files exist in the built distribution and precache. These software/font checks do not establish new redistribution rights for books or curated content.     |
| T13     | Scanned production HTML/JavaScript/CSS and enumerated embedded URLs and credential patterns: no credential-pattern matches or application development endpoints found. Inspected the remaining `http://localhost` occurrence as React Router's URL-construction fallback, not an application request target. Other URLs were standards namespaces, dependency diagnostics, project links, and source bibliography. No public source maps were emitted. This is a bounded artifact inspection, not a security certification. |
| T14     | HTTP checks returned 200 for all six project/convention URLs rendered by the app and all five external bibliography URLs. Checked local notice targets against build/precache output. Existing corpus/reference checks passed for 381 ready records and four source books, including canonical internal link targets. Reachability does not certify source meaning or future external availability.                                                                                                                         |

Direct computer-use checks used an isolated Chrome profile and a fresh production origin, at approximately 1200px and 500px window widths. Settings showed all five information links; privacy anchors were not hidden by the sticky header. Compact result navigation to the disclaimer by Tab/Return and browser Back preserved the question, primary Can, and changed Cau reading. Focus was visible and the inspected compact text did not clip horizontally.

After Settings reported offline readiness, stopped the preview origin and confirmed connection refusal. A new product-information navigation/reload and a previously unopened JavaScript-license notice still loaded offline. An unknown route also showed Vietnamese recovery instead of framework diagnostics offline.

A temporary diagnostic build injected an update rejection into the existing PWA adapter. Direct UI checks confirmed the unsaved-input warning, visible failure text, retained question, and available retry action. The adapter was restored byte-for-byte before the final build; no fixture or browser-test framework was added to the app. This checks the rejection UI, not every service-worker transport failure.

Baseline and final `./init.sh` passed: format, task-index freshness, lint, TypeScript length/typecheck, build, package exports, knowledge delivery, and 323 package tests (181 core and 142 knowledge). The first final run found only the new glossary table's formatting; formatting that file and rerunning the complete workflow passed. Active LSP probes reported no TypeScript errors; silent servers did not independently confirm all paths clean. Auxiliary bundler-import/fail-fast-config warnings were reviewed as false positives without source suppression comments.

Limits: no physical-device or screen-reader certification, live production/social-card crawler check, vulnerability penetration test, exhaustive browser matrix, or fresh editorial/book-source audit. Existing large JavaScript chunk warning remains. No dependencies were added.

## Handoff

- Evidence: Implementation `599860d`, bounded independent source review, direct wide/compact/offline checks, artifact/license/link audits, and passing repository workflow as recorded above.
- Next: Review and merge this PR; select F13 separately for production-domain, hosting, crawl, and operational-log verification before public launch.
- Blockers: none for this approved pre-domain implementation; F13 production decisions remain release gates.
