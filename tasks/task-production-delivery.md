# task-production-delivery - Production delivery

- Status: done
- Owner: Coding agent (repository configuration); Product Owner (hosting activation)
- Required to start: [task-offline-hardening](task-offline-hardening.md), [task-product-identity](task-product-identity.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Hosting, domain, deployment, cache, diagnostics, rollback, and smoke-test paths are launch-ready.

## Scope

- Implement the V1 work defined for F13 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Close F13 by Product Owner override on 2026-10-16; outstanding evidence requirements are waived, not verified.
- [x] Accept delivery for progression to F15 with the unverified gates recorded below; this is not launch certification.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Execution plan

Approved scope: Cloudflare Pages project `kinhdichluchao`, origin `https://kinhdichluchao.pages.dev`, repository configuration and PR only. No hosting, DNS, credentials, or production changes are authorized.

1. Inspect delivery contracts and run the baseline workflow.
2. Reuse the confirmed Cloudflare Git integration; add a checked host build command, headers, metadata and revision diagnostics. Do not add a second publisher.
3. Verify build modes and document activation, rollback and smoke checks; commit in parts and open a PR.

Closure override: on 2026-10-16, the Product Owner explicitly requested force-closing F13 after the remaining gates were disclosed. This overrides task closure requirements only; F15 launch acceptance remains unchanged.

## Tasks

- [x] F13-T01 — Define production hosting requirements from `docs/release.md`
- [x] F13-T02 — Select a static hosting provider
- [x] F13-T03 — Select and register the production domain
- [x] F13-T04 — Configure DNS and HTTPS
- [x] F13-T05 — Configure SPA route fallback
- [x] F13-T06 — Configure safe cache behavior for HTML, service worker, and fingerprinted assets
- [x] F13-T07 — Define build command, output directory, and Node/pnpm versions
- [x] F13-T08 — Add preview deployment for release review
- [x] F13-T09 — Add production deployment from the approved main revision
- [x] F13-T10 — Closed by owner waiver: deployed failing-build rejection remains unverified
- [x] F13-T11 — Stamp app version and build revision into production diagnostics
- [x] F13-T12 — Verify manifest URLs and base paths on the production domain
- [x] F13-T13 — Add production security headers supported by the host
- [x] F13-T14 — Document the rollback command or provider action
- [x] F13-T15 — Closed by owner waiver: preview recovery drill was not performed
- [x] F13-T16 — Define the production smoke-test procedure used by launch
- [x] F13-T17 — Add canonical production URL metadata after domain selection
- [x] F13-T18 — Closed by owner waiver: hosting logging review remains unverified

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Handoff

- Blockers: none for task progression by explicit owner override; unverified release risks remain.
- Evidence: repository implementation `9cafde3`; baseline and final `./init.sh` passed (181 core + 142 knowledge tests). Seven isolated Pages-gate fixtures passed; six broken artifact mutations rejected (canonical, SW cache, manifest, mode, revision, unexpected 404). Production and preview artifact checks passed. Compact 500px direct Chrome inspection confirmed the full build SHA in Settings without overflow. Reviewer `8e64e7e9-0150-4c6` found no remaining source blocker; did not inspect hosting settings or run commands.
- PR preview: PR #152 automatically deployed `7b1cf5e` at `https://cc223123.kinhdichluchao.pages.dev`. Read-only assertions passed for route fallback, no-cache root/SW/manifest, revalidated deep-route HTML, immutable fingerprinted JS, security and crawl headers, preview canonical absence, manifest scope and icons. The actual host command also passed locally on a clean tree with Pages preview variables. Active LSP checks found no errors in six changed source files. This proves the preview artifact, not production-mode activation or the deployed failure gate.
- Existing delivery: GitHub Cloudflare checks show successful automatic deployments for PR #151 and main `462f3680aa1fe37d7d409ac74550c017afa2ef05`. Read-only HTTPS requests returned 200 for home, Settings, a quẻ route and a lesson route; current production manifest start/scope and all icons resolved. The selected origin is the already provisioned Pages domain, not a new custom-domain registration. No DNS or hosting mutation was made.
- Updated production evidence (2026-10-16): owner reported checked-command activation and redeployment. Public HTTPS checks confirmed main `0c7ebe4bb884ffef750649d4ae468ec91d53f9e0`, canonical/og:url, route fallback, cache/security headers and manifest root scope. GitHub reports `main-protection` active; its detailed rule behavior was not re-audited.
- Limits accepted by owner: no deployed failing-build test, preview recovery drill or host logging review. No new production offline/update matrix or physical-device verification. These checks are waived for F13 closure, not reported as passed.
- Next: select F15 under its unchanged release acceptance; carry these risks into release-candidate review. Do not infer a V1 launch, release tag or completed production recovery from this closure.
