# AGENTS.md

LiuYao is a pnpm monorepo for an offline-first Liu Yao PWA. Keep deterministic domain logic and structured knowledge reusable outside the web app.

## Start here

- Documentation routes → `docs/index.md`
- Architecture and dependency boundaries → `ARCHITECTURE.md`
- Product scope and non-goals → `docs/product-specs/product-scope.md`
- V1 feature and acceptance map → `docs/product-specs/v1-mvp.md`
- Development and verification → `docs/development.md`
- Licensing boundaries → `LICENSING.md`
- Feature state → `feature_index.json`
- Session continuity → `progress.md`

Read only the documents relevant to the current task.

## Repository map

```text
apps/web                 React + Vite + PWA product surface
packages/liuyao-core     deterministic Liu Yao calculations
packages/knowledge       structured reference knowledge
docs/                    durable product and engineering truth
features/                tracked execution records when justified
feature_index.json       canonical feature state
progress.md              append-only feature session history
init.sh                  agent verification and fix workflow
.agents/skills/          installed agent skills
```

## Assess the task

Choose the lightest artifact level that keeps work safe and resumable.

| Mode           | Use when                                                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| No feature     | Read-only work or a clear, reversible change that can finish safely in one session.                                                                    |
| Inline feature | Scope, acceptance, evidence, or handoff must persist, but execution remains one bounded unit.                                                          |
| External plan  | Use only when at least two substantial signals apply: >=4 files, >=2 workspaces, breaking API or migration, phased rollback, or multi-agent ownership. |

Do not create a feature, plan, or progress record only because the harness supports them.

## Start feature work

1. Read `feature_index.json`.
2. Read the selected `features/feat-<id>.md`.
3. Read the latest relevant block in `progress.md`.
4. Read only the canonical documents linked by the feature.
5. Inspect the working tree before running fixers.
6. Run `./init.sh` when unrelated user changes will not be rewritten.

If baseline verification fails, record the failure. Fix it only when the current scope includes it.

## Repository rules

- Write repository documentation in English.
- Keep each durable fact in one canonical document.
- Link to canonical truth instead of copying it into feature or progress records.
- Follow dependency and change-placement boundaries in `ARCHITECTURE.md`.
- Follow test-placement and verification policy in `docs/development.md`.
- Follow licensing boundaries in `LICENSING.md`.
- Treat future behavior as `Intended` or `Proposed`; never present it as implemented.
- Treat `.agents/skills/` as installed tooling during product work unless the user asks to maintain skills.
- Update `init.sh` when repository verification commands or declared workspaces change.

## Feature state

- Use only `todo`, `active`, `blocked`, or `done`.
- Keep zero or one feature `active`.
- Activate `todo` work only after the user selects or approves it.
- Complete every dependency before activating its dependent feature.
- Keep feature work inside its recorded scope and acceptance criteria.
- Keep bounded plans inside the feature file.
- Link an external plan only when the task meets the substantial-work rule above.

## Feature done

A tracked feature is done only when:

- [ ] Every acceptance criterion passes.
- [ ] `./init.sh` passes.
- [ ] The feature records verification evidence.
- [ ] The feature handoff records status, blockers, and the next action.
- [ ] `progress.md` records the material result.

## End session

For tracked feature work:

1. Update feature status and handoff.
2. Append a new `progress.md` block only when result, blocker, handoff, or next action changed.
3. Keep older progress blocks unchanged.
4. Record one concrete next action when work remains.

For no-feature work, do not modify feature or progress state.

## Escalation

- Read the owning project document before changing architecture or product behavior.
- Ask the user when requirements, ownership, or scope remain materially ambiguous.
- Stop and report repeated verification failures instead of widening scope silently.

## Verification

- Agent full workflow: `./init.sh`
- Read-only verification contract: `docs/development.md`

<!-- harness-slim 1.4.0 · generated 2026-09-25 · managed harness lifecycle; preserve repository-specific routes and rules -->
