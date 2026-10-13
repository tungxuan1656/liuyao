# AGENTS.md

LiuYao is a pnpm monorepo for an offline-first Liu Yao PWA. Keep deterministic domain logic and structured knowledge reusable outside the web app.

## Start here

- Architecture and dependency boundaries: `ARCHITECTURE.md`
- Engineering principles: `docs/design-docs/core-beliefs.md`
- Product scope and non-goals: `docs/product-specs/product-scope.md`
- Quẻ and Liu Yao rules: `docs/design-docs/liuyao-ruleset-v1.md`
- Knowledge evidence and supplied books: `docs/product-specs/knowledge-quality.md`
- Knowledge delivery sequence: `tasks/knowledge-roadmap.md`
- Development and verification: `docs/development.md`
- Documentation map and historical material: `docs/index.md`
- Licensing boundaries: `LICENSING.md`
- Task navigation: `tasks/index.md`

Read only the documents relevant to the current task.

## Work and state

- Use no task record for read-only or clear, reversible work safe within one session.
- Use a task with an inline plan when scope, acceptance, evidence, or handoff must persist.
- Link a separate plan only for necessary sequencing, coordination, recovery, or high-impact controls; file count is not a threshold.
- Reuse an approved task or adequate external tracker; do not duplicate tracker state.
- Local tasks own status, owner, start dependencies, integration gates, acceptance, evidence, blockers, and next action.
- `tasks/index.md` is a generated navigation/readiness view, not editable tracker state. Never update its rows by hand.
- After changing tasks, run `pnpm tasks:index`; `pnpm tasks:check` checks freshness and readiness self-checks. See `docs/development.md` for the metadata contract.
- Use `todo`, `active`, `blocked`, or `done`. Start work only after user approval and required start dependencies are complete.
- Independent tasks can be active concurrently. Agree file ownership or integration order before overlapping edits; task records are not locks.
- Inspect the working tree, read the selected task and its canonical sources, then run relevant baseline checks before implementation.
- Keep bounded plans inline. Retain existing linked plan paths when useful; current task state and canonical policy override historical instructions.
- At handoff, update the selected task or tracker with actual evidence, blockers, and one concrete next action; regenerate the index when task inputs change.
- Mark done only when acceptance and relevant checks pass. Knowledge evidence includes the reviewer's inspected scope, sources/pages, remaining findings, and verified revision.
- `features/`, `feature_index.json`, and `progress.md` are frozen pre-v2 history, not live instructions or writable state.

## Repository rules

- Write repository documentation in English. Keep durable facts in their canonical documents, not task history.
- Follow dependency and change-placement boundaries in `ARCHITECTURE.md`.
- Follow test-placement and verification policy in `docs/development.md`, and licensing boundaries in `LICENSING.md`.
- Follow the [knowledge delivery contract](docs/design-docs/offline-pwa.md#knowledge-delivery). Measure payloads; split detailed knowledge by record instead of increasing a monolithic bundle cap. Preserve offline access and updates.
- Knowledge authoring follows the [publication gate](docs/product-specs/knowledge-quality.md#publication-gate). Do not add audit ledgers, hash revisions, or certification requirements.
- Treat future behavior as `Intended` or `Proposed`; never present it as implemented.
- Treat `.agents/skills/` as installed tooling unless asked to maintain skills. Reuse adequate global skills.
- Apply React performance guidance only where compatible with React + Vite. Next.js/server rules, untyped deep imports, and new dependencies are not authorized by a skill.
- Use the established browser workflow and project verification policy; skill installation does not authorize binaries or runtime setup.
- Update `init.sh` when verification commands or declared workspaces change.

## Verification and escalation

- Full source-check workflow: `./init.sh`; focused/read-only contract: `docs/development.md`.
- `init.sh` runs explicit sequential checks, never source fixes or dependency installation. Build/test outputs can change ignored files.
- Record baseline failures; fix them only inside approved scope. Never widen scope silently or claim unrun checks passed.
- Read the owning document before changing product behavior or architecture.
- Ask when requirements, ownership, dependency meaning, or scope remains materially ambiguous.
- Stop and report repeated verification failures.

<!-- harness 2.0.0 | migrated 2026-10-13 | managed harness lifecycle; preserve repository-specific routes and rules -->
