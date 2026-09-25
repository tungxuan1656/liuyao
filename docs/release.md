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
→ production deploy
→ production smoke test
→ release record

Do not deploy a revision that fails the V1 release acceptance in `docs/product-specs/v1-mvp.md`.

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

Before launch, verify one rollback path:

1. identify the previous known-good revision;
2. redeploy or restore that artifact;
3. confirm the previous service worker becomes active safely;
4. run the production smoke test again.

## Production smoke test

After every production release, verify:

- home loads over HTTPS;
- direct navigation works;
- all three reading-entry methods can reach a result;
- knowledge lookup works;
- PWA installation is valid on a supported browser;
- offline reload works after one online load;
- favicon and product metadata are correct;
- no blocking console or network errors appear.

## Incident boundary

V1 has no analytics requirement.

If the hosting provider keeps operational request logs by default, do not log reading questions or derived reading content from application code.

Use the repository security reporting process for security defects.
