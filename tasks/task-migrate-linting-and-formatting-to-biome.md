# task-migrate-linting-and-formatting-to-biome - Migrate linting and formatting to Biome

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: none
- Required to integrate/release: no additional gate recorded; see acceptance

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
- [x] Follow-up is pushed to PR #126; committed tree remains clean after verification.

## Plan

1. Fix keys, viewport fallback, and `field.tsx` equality/error keys.
2. Configure HTML, generated UI lint, and Prettier-only document scripts/hooks.
3. Format, review the diff, update development docs, and verify.
4. Record evidence, commit, push, and check committed-tree stability.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; implementation, verification, committed-tree stability, and push are complete.
- Blockers: none.
- Next: review and merge PR #126.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-10 — task-migrate-linting-and-formatting-to-biome PR follow-up completed

**State**: task-migrate-linting-and-formatting-to-biome `done`; this approved follow-up supersedes the original whole-folder lint exclusion and dropped document-format coverage.
**Done**: Fixed duplicate trigram keys and restored the `100vh` fallback with an `@supports` override. Enabled shadcn lint with three bounded accessibility exceptions, preserved formatter/assist exclusions, fixed `field.tsx`, and converted type-only imports. Enabled experimental HTML formatting and restored Prettier only for Markdown/YAML in scripts and staged-file hooks. Updated the development contract.
**Evidence**: Follow-up commit `3d41c8d` is pushed to PR #126. Lint checks 541 files with zero errors; format checks pass. The committed-tree `./init.sh` run passes all phases and 181 core + 103 knowledge tests, with an empty working tree afterward. A one-off assertion covers all eight repeated-trigram hexagrams; direct Chrome computer-use confirms both Thuần Càn links navigate independently to Càn.
**Blockers**: none. Experimental HTML and the skipped oversized crosswalk remain documented limits.
**Next**: Review and merge PR #126.

#### 2026-10-10 — task-migrate-linting-and-formatting-to-biome implemented

**State**: task-migrate-linting-and-formatting-to-biome `done`; the repository runs Biome 2.5.15 as its only formatter and linter.
**Done**: Added `biome.json` and `@biomejs/biome`; removed eight ESLint and Prettier packages and the three config files; repointed the `package.json` scripts, `.lintstagedrc.cjs`, and `init.sh`; reformatted the tree and fixed every remaining error, including the five `useNamingConvention` and nine `noArrayIndexKey` findings; updated `docs/development.md`, `README.md`, and `docs/design-docs/core-beliefs.md`. The activation block above planned an accessibility-only override for `apps/web/src/components/ui/**`; the implemented override disables the formatter, linter, and assist for that whole folder so generated shadcn components stay verbatim.
**Evidence**: `biome check .` reads 524 files with 0 errors, 70 warnings, and 71 infos (exit 0); `biome format .` exits 0 and only warns that the tracked 3.6 MiB `packages/knowledge/reports/authoring-crosswalk.json` exceeds the default 1 MiB `files.maxSize`. `./init.sh` passed all phases (181 core and 103 knowledge tests). `task-migrate-linting-and-formatting-to-biome` records the baseline, the five-file formatting difference from Prettier, and the limits.
**Blockers**: none.
**Next**: Review and merge the migration PR; leave every other feature untouched.
