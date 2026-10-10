# feat-104 — Migrate linting and formatting to Biome

## Goal

Replace ESLint with Biome 2.5.15. Use Biome for supported source formats and Prettier only for Markdown and YAML.

## Scope

- Retain the supplied lint rules, Tailwind parser support, and Prettier-compatible Biome formatting.
- Enable experimental HTML support after verifying `apps/web/index.html`.
- Lint shadcn components without formatting or import organization. Exempt only three generated accessibility patterns listed in `biome.json`.
- Fix duplicate trigram keys and restore the CSS viewport fallback identified in PR #126.
- Restore Markdown/YAML formatting in scripts and hooks, using the old Prettier settings and ignores.
- Follow the tooling contract in `docs/development.md`.

## Non-goals

- Domain changes, new application test suites, editor integrations, or unrelated warning cleanup.
- A new browser support guarantee; `100vh` only restores the removed fallback.

## Acceptance

- [x] Upper/lower trigram links have distinct keys, including all eight repeated-trigram hexagrams.
- [x] App-shell CSS retains `100vh` and conditionally overrides it with `100dvh`.
- [x] Shadcn lint passes with formatter/assist disabled and bounded accessibility exceptions.
- [x] HTML, Markdown, and YAML participate in formatting and staged-file hooks.
- [x] ESLint remains removed; Prettier runs only for Markdown/YAML.
- [x] Lint, format checks, full harness, and direct library smoke check pass.
- [ ] Follow-up is pushed to PR #126; committed tree remains clean after verification.

## Plan

1. Fix keys, viewport fallback, and `field.tsx` equality/error keys.
2. Configure HTML, generated UI lint, and Prettier-only document scripts/hooks.
3. Format, review the diff, update development docs, and verify.
4. Record evidence, commit, push, and check committed-tree stability.

## Evidence

- Original migration and shell-format commits: `3c05416`, `8109c67`.
- User approved the follow-up design after the read-only HTML/UI lint probe.
- Original supplied-config baseline: 542 files, 251 errors, 78 warnings, 71 infos; scratch safe fixes left 35 errors. Prettier-compatible formatting reduced 149 reformatted files to five union-layout differences plus required import organization.
- Baseline and follow-up `./init.sh` passed: format, lint, typecheck, build, package exports, placement check, 181 core and 103 knowledge tests.
- Follow-up `pnpm lint`: 541 files, zero errors, 70 warnings, 71 infos, exit 0. `pnpm format:check`: 524 Biome files plus Markdown/YAML, exit 0.
- A one-off Node assertion checked the actual key expression against all eight repeated-trigram hexagrams. Direct Chrome computer-use confirmed both Thuần Càn links render and independently navigate to Càn.
- Shadcn lint safely converted nine type-only imports; formatting and import order remain unchanged. HTML formatting also covers the tracked logo preview.
- Limits: HTML support is experimental; the 3.6 MiB authoring crosswalk exceeds Biome's default 1 MiB limit and remains skipped. Existing nonblocking diagnostics are not expanded into this task.

## Handoff

- State: active; implementation and local verification pass, with no blockers.
- Next: commit and push the follow-up, then confirm the committed tree remains clean after the harness.
