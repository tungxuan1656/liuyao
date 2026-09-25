# Release and deployment

This document owns the V1 production delivery, deployment, rollback, and post-deploy verification contract.

## Observed now

- The web application builds with Vite.
- The product is a static offline-first PWA.
- CI verifies repository quality.
- The repository has no production deploy workflow.
- No production host or domain is yet canonical.

## Environments

Use three delivery contexts:

| Context    | Purpose                                                 |
| ---------- | ------------------------------------------------------- |
| Local      | Development through `pnpm dev`                          |
| Preview    | Review a production build before merge or release       |
| Production | Public V1 deployment from the approved release revision |

The hosting provider and production domain remain release decisions until the Product Owner selects them.

## Delivery flow

`main` candidate
→ full CI
→ production build
→ preview verification
→ pre-deploy release-candidate gate
→ production deploy
→ production smoke test
→ post-deploy launch gate
→ release record

Do not deploy a revision that fails the applicable pre-deploy release-candidate checks in `docs/product-specs/v1-mvp.md`.

Evaluate the post-deploy launch gate only after the production deployment exists.

## Hosting contract

The selected static host must support:

- HTTPS;
- custom domains;
- SPA route fallback;
- deterministic static asset delivery;
- PWA service-worker files;
- cache-header control or equivalent safe defaults;
- deployment history or another practical rollback path.

Use long-lived caching for fingerprinted assets.

Do not give `index.html` or service-worker entry files an immutable cache policy.

## Production configuration

Production must not require runtime secrets for V1 core flows.

Keep:

- product version visible in Settings;
- build revision available for diagnostics;
- production base paths correct for the selected domain;
- manifest and canonical metadata pointed at production URLs.

## Rollback

Before the first production launch, exercise the host rollback mechanism in Preview.

Use two known-good preview deployments or another provider-supported rollback drill. Confirm that the restored revision activates its service worker safely and passes the smoke flow.

After each production deployment:

1. record the deployed commit or immutable artifact;
2. record the provider action or command that restores a known-good revision;
3. for later releases, identify the previous production revision before deploying the candidate;
4. after an actual rollback, run the production smoke test again.

The first production launch does not require a nonexistent previous production revision.

## Supported browsers

Use this V1 release matrix:

| Browser | Platforms | Required V1 behavior |
| --- | --- | --- |
| Chrome, latest stable | Windows or macOS desktop; Android | Web use and offline flows. Installation when the browser exposes install support. |
| Safari, latest stable | macOS; iOS or iPadOS | Web use and offline flows. Home-screen installation when the platform exposes it. |
| Edge, latest stable | Windows or macOS desktop | Web use and offline flows. Installation when the browser exposes install support. |

"Latest stable" means the public stable release available when the release candidate is frozen.

Record the exact browser and OS versions used in release evidence.

Other modern browsers are best-effort in V1 and are not launch-blocking.

PWA installation is required only on a supported browser and platform that exposes an installation path. Normal web use must remain functional when installation is unavailable.

## Production smoke test

After every production deployment, verify:

- home loads over HTTPS;
- direct navigation works;
- all three reading-entry methods can reach a result;
- knowledge lookup works;
- PWA installation works where the supported-browser contract requires it;
- offline reload works after one online load;
- favicon and product metadata are correct;
- no blocking console or network errors appear.

## Incident boundary

V1 has no analytics requirement.

If the hosting provider keeps operational request logs by default, do not log reading questions or derived reading content from application code.

Use the repository security reporting process for security defects.
