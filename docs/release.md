# Release and deployment

This document owns the V1 production delivery, deployment, rollback, and post-deploy verification contract.

## Observed now

- The web application builds with Vite.
- The product is a static offline-first PWA.
- CI verifies repository quality.
- Cloudflare Pages project `kinhdichluchao` and `https://kinhdichluchao.pages.dev` are the approved host and origin.
- The existing Cloudflare Git integration automatically builds PR previews and publishes `main` to production. No second deploy workflow is needed.
- GitHub Cloudflare checks confirm successful PR and main deployments. Hardened host build-command activation and deployed launch verification remain pending.

## Environments

Use three delivery contexts:

| Context    | Purpose                                                 |
| ---------- | ------------------------------------------------------- |
| Local      | Development through `pnpm dev`                          |
| Preview    | Review a production build before merge or release       |
| Production | Public V1 deployment from the approved release revision |

Keep the existing Git integration and `main` production branch. No deploy token or duplicate GitHub Actions publisher is required.

### Activate the checked build command

Owner-operated settings, not actions performed by repository checks:

| Pages setting    | Required value                                                  |
| ---------------- | --------------------------------------------------------------- |
| Root directory   | Repository root                                                 |
| Build command    | `pnpm install --frozen-lockfile && bash scripts/build-pages.sh` |
| Output directory | `apps/web/dist`                                                 |
| `NODE_VERSION`   | `24`                                                            |
| `PNPM_VERSION`   | `12.5.1`                                                        |

Apply the command to both production and preview contexts. Do not set `DEPLOY_ENV` manually. `scripts/build-pages.sh` selects production only when `CF_PAGES_BRANCH=main`; all other branches select preview. Pages supplies `CF_PAGES_COMMIT_SHA` for diagnostics.

The script runs the same full `./init.sh` checks as GitHub CI and requires a clean source tree. Any failed check exits before Pages publishes output. A main build also refuses a commit that no longer matches the remote main head. This is a host-side verification gate, not a dependency on the GitHub check-run status. Verify it with an intentionally failing disposable preview before claiming activation.

Configure GitHub rules to require PR approval and `verify` before merging into `main`. Existing direct auto-deploy alone does not prove approved revisions or blocked failing checks. Dashboard settings and branch protection require owner verification; do not claim them from source configuration.

Before release, review the preview, perform the recovery drill, and complete the pre-deploy gate. Record the main SHA, provider deployment ID, URL and smoke result.

## Delivery flow

Pull Request
→ CI (`verify`) + Cloudflare preview deployment
→ PR review + pre-deploy release-candidate acceptance
→ Merge into `main`
→ Cloudflare Pages checked build (`bash scripts/build-pages.sh`) → auto-deploy
→ Production smoke test + post-deploy launch acceptance
→ Release record

Do not merge a PR that fails the applicable pre-deploy release-candidate checks in `docs/product-specs/v1-mvp.md`.

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

`apps/web/deployment.ts` emits Pages `_headers`: hashed `/assets/*` receive one-year immutable caching; `/`, HTML, `sw.js`, manifest and robots revalidate. Other files retain Pages default revalidation. Keep top-level `404.html` absent so Pages supplies its SPA fallback.

Headers add `nosniff`, frame denial, no-referrer, disabled camera/microphone/geolocation, and a limited CSP for base URI, objects and frame ancestors. This is not a strict script CSP. Confirm effective headers on the host; Vite preview does not interpret `_headers`.

## Production configuration

Production must not require runtime secrets for V1 core flows.

Keep:

- product version visible in Settings;
- full build revision available in Settings → Chi tiết kỹ thuật → Mã bản dựng (`GITHUB_SHA`, otherwise `CF_PAGES_COMMIT_SHA`, otherwise `local`);
- production base paths correct for the selected domain;
- manifest and canonical metadata pointed at production URLs.

## Metadata and crawl gate

All builds retain `noindex, nofollow`, `robots.txt` with `Disallow: /`, and an `X-Robots-Tag` block until deployed launch checks and public-page indexing policy are approved. Domain selection alone does not open crawling. No sitemap is published yet.

`DEPLOY_ENV=production` adds the approved root canonical and absolute `og:url` to the shared SPA shell. Other builds omit them. This is not per-record SEO. Vietnamese identity and summary-card metadata remain unchanged.

Before opening crawling, approve public routes and route-specific metadata, then update HTML, robots, headers and sitemap together. Preview deployments must remain non-indexable.

Recheck the privacy statement against the selected host's operational logging and retention policy before launch. The application does not send reading questions or results, but that is not a claim about host request logs.

## Rollback

Before the first production launch, exercise the host rollback mechanism in Preview.

Pages only permits **Rollback to this deployment** for successful production deployments, not previews. In Preview, exercise equivalent recovery by re-uploading a known-good artifact to the same preview branch. Do not claim this tests the production rollback action.

Record artifacts A and B, SHAs and URLs. Deploy A, then B, then A to a dedicated preview branch. Check Settings revision and the update prompt with an existing draft at each transition. Cancel must retain the draft; confirmed update must load the restored revision. Repeat offline reload.

For production recovery: pause automatic production branch deployments, cancel queued builds, open Pages **Deployments**, select a successful known-good production deployment, and choose **Rollback to this deployment**. Confirm and run the smoke flow. Record deployment IDs and Settings SHA. Installed service-worker clients still require normal update confirmation; server rollback does not immediately replace them.

After each production deployment:

1. record the deployed commit or immutable artifact;
2. record the provider action or command that restores a known-good revision;
3. for later releases, identify the previous production revision before deploying the candidate;
4. after an actual rollback, run the production smoke test again.

The first production launch does not require a nonexistent previous production revision.

## Supported browsers

Use this V1 release matrix:

| Browser               | Platforms                         | Required V1 behavior                                                              |
| --------------------- | --------------------------------- | --------------------------------------------------------------------------------- |
| Chrome, latest stable | Windows or macOS desktop; Android | Web use and offline flows. Installation when the browser exposes install support. |
| Safari, latest stable | macOS; iOS or iPadOS              | Web use and offline flows. Home-screen installation when the platform exposes it. |
| Edge, latest stable   | Windows or macOS desktop          | Web use and offline flows. Installation when the browser exposes install support. |

"Latest stable" means the public stable release available when the release candidate is frozen.

Record the exact browser and OS versions used in release evidence.

Other modern browsers are best-effort in V1 and are not launch-blocking.

PWA installation is required only on a supported browser and platform that exposes an installation path. Normal web use must remain functional when installation is unavailable.

## Production smoke test

After every production deployment, verify:

- home loads over HTTPS;
- direct navigation and refresh work at `/casting`, `/result`, `/library/topic/topic-learning`, `/library/hexagram/hexagram-01#line-1`, and `/settings/about#privacy`;
- headers for `/`, `/index.html`, `/sw.js`, manifest, hashed JS/CSS and knowledge assets match the cache/security contract;
- Settings version and full SHA match the release record;
- manifest URLs, canonical, `og:url`, robots and crawl headers match the environment;
- all three reading-entry methods can reach a result;
- knowledge lookup works;
- PWA installation works where the supported-browser contract requires it;
- offline reload works after one online load;
- favicon and product metadata are correct;
- no blocking console or network errors appear.

## Intended expanded knowledge release

If a release includes expanded knowledge views, bind its fidelity, budget, and offline evidence to the frozen build and corpus snapshot.
Use the [knowledge quality contract](product-specs/knowledge-quality.md#runtime-fidelity) and
[PWA scale contract](design-docs/offline-pwa.md#knowledge-delivery) for those planned checks.
Repeat them against the actual complete authored corpus before claiming full-volume delivery.
Partial reviewed content can ship with its actual coverage and review scope stated.
Full-corpus certification remains a separate evidence claim.

## Incident boundary

V1 has no analytics requirement.

If the hosting provider keeps operational request logs by default, do not log reading questions or derived reading content from application code.

Use the repository security reporting process for security defects.
