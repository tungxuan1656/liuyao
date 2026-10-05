---
name: pi-feature-delivery
description: Deliver an explicitly selected batch of LiuYao features through sequential Pi workers, fresh independent reviewers, and repository harness gates. Use for /features or resuming its batch. Do not use for unselected backlog work.
---

# Pi Feature Delivery

The main Pi session owns coordination and final acceptance. Workers own scoped implementation. Reviewers provide independent, read-only findings.

## Authority and state

- Use the repository root as the shared checkout. Do not create worktrees.
- Keep one active feature and one writer at a time.
- Delegate implementation. Limit direct Leader edits to coordination records unless the user authorizes a code exception.
- Follow root `AGENTS.md` for feature state, planning, documentation, and completion.
- Treat `feature_index.json`, `features/<id>.md`, and `progress.md` as canonical feature records.
- Treat Git, verification output, and subagent artifacts as evidence, not replacements for those records.
- Do not depend on `pi-tasks` or maintain a second feature tracker.
- Do not commit, push, create PRs, merge, or switch branches without explicit authority.

All repository paths in this skill resolve from the repository root, not this skill directory.

## Prepare

1. Resolve the user's explicit feature IDs or inclusive range against `feature_index.json`.
2. Preserve requested order when dependencies permit. Explain any required ordering change.
3. If an incomplete dependency is unselected, stop for approval. Do not expand the batch.
4. If another feature is active outside the selection, stop for an ownership decision.
5. Read the selected feature records and latest relevant progress blocks.
6. Read only their relevant canonical documents and plans.
7. Capture `git status --short`, branch, `HEAD`, and remotes before edits.
8. Identify unrelated dirty paths. Preserve them throughout delivery.
9. Inspect `subagent({action:"list",capabilities:true})` before relying on any agent.
10. Read the installed `pi-subagents` skill and its required workflow references before dispatch.

Use runtime agent settings and profiles. Do not hardcode model IDs or assume unavailable roles exist.

Create one external batch checkpoint, outside product commits. Verify any in-repository scratch location is Git-ignored before use.
Record its absolute path in the session. Keep this recovery index compact:

```text
Selected features and dependency order:
Canonical record paths:
Checkout / branch / expected HEAD:
Pre-existing dirty paths and ownership:
Current feature / stage:
Run IDs / roles / terminal or active state:
Output references / artifact paths:
Review target / findings / dispositions:
Verification commands / outcomes / log paths:
Git publication authority and receipts, if applicable:
Blocker / one next action / updated timestamp:
```

Do not copy feature specs into the checkpoint. Update it at meaningful gates and before yielding.

## Dispatch

Use `worker` for implementation and `reviewer` for independent review.
Use `scout` only for unresolved code locations or scope.
Use `researcher` only for external documentation gaps.
Use `oracle` only for consequential architecture or difficult root-cause decisions.
Use `evidence-auditor` only for important research claims.
Use `delegate` only for a bounded task outside these roles.

Express delegated multi-step work through one top-level async workflow call for the current execution unit.
Launch children only inside that workflow. Follow the installed workflow API rather than OpenCode Job Board APIs.
Keep repository coordination gates in the Leader. Raw workflow scripts cannot call Leader filesystem or Pi tools.
When a Leader gate needs judgment, return the workflow result before launching the next execution unit.

Bind durable child reports through the workflow's `output` field.
Retain actual output references and artifact paths from results.
After dispatch, yield for native completion notification. Do not poll or use `bg_wait` merely to await ordinary async children.
Do not permit nested delegation.

Give each child this compact contract:

```text
Feature and canonical acceptance paths:
Checkout / branch / expected HEAD:
Existing dirty paths and owners:
Task / allowed read or write surfaces:
Constraints: preserve unrelated edits, no Git publication or branch changes, no nested agents
Assigned verification and expected evidence:
Report: outcome, exact changed paths, acceptance results, commands and outcomes, artifacts, blocker and next action
Stop: checkout mismatch, unexpected edits, ownership ambiguity, missing permission, or required scope expansion
```

## Per-feature gates

### Scope and implementation

- Reconcile checkout identity and dirty paths before every handoff.
- Follow repository rules before activating the selected feature.
- Use the lightest repository-native plan required by `AGENTS.md`.
- If acceptance or ownership remains ambiguous, stop before implementation.
- Start a fresh-context worker for the bounded implementation lane.
- For substantial correction rounds, start a fresh worker with a compact handoff.
- Resume an existing worker only for narrow continuation or reconciled recovery of its original task.
- Require exact verification commands, results, and limitations in the worker report.
- Wait for the writer to become terminal before transferring overlapping ownership.

### Integration and review

- Inspect the actual changed paths and diff after the worker finishes.
- Verify acceptance against implementation and captured evidence, not worker assurances.
- Capture a fixed review target: exact commit SHA or a saved patch with SHA-256 and base SHA.
- For uncommitted work, freeze writes during review and provide the complete changed-file list, including untracked files.
- Start a fresh-context, read-only reviewer with the original spec, acceptance, target, and verification evidence.
- Do not forward worker reasoning or self-approval. Provide factual constraints and known limitations.
- Request findings first: severity, file/line, evidence, correction, and explicit verdict.
- Reconcile each finding against the target and scope before assigning fixes.
- Block completion for valid P0/P1 findings or any unmet acceptance criterion, regardless of severity label.
- Defer optional polish explicitly. Do not expand scope through review.
- After fixes, run affected verification and obtain fresh review of the new target.
- Allow at most two review rounds per feature. If blockers remain, record them and stop the batch.

### Completion

- Follow `docs/development.md` for verification and test placement.
- Run `./init.sh` only when its fixers cannot rewrite unrelated changes.
- If unrelated edits prevent safe full verification, stop and record the blocker. Do not waive the required gate.
- Inspect the resulting diff after fixers. Invalidate review if the reviewed implementation changes materially.
- Resolve introduced errors in scope. Record unrelated diagnostics separately.
- Do not treat an empty diagnostics cache as proof. Probe changed code with available active diagnostics.
- Complete every `AGENTS.md` feature-done requirement before setting status to `done`.
- Record acceptance evidence, review target/verdict, limitations, and handoff in the feature record.
- Append material results to `progress.md` without changing older blocks.
- Report feature status, main paths, verification, review verdict, and corrected findings briefly.
- Reconcile the final checkout and checkpoint before advancing automatically to the next selected feature.

## Recovery and finish

After compaction or resume, read the checkpoint and canonical records first.
Reconcile live Git state and exact known run IDs before writes or redispatch.
Resume only eligible runs through documented `pi-subagents` controls.
Never start a replacement writer while the original can still write.

If checkout state changes unexpectedly, stop writes and establish ownership with the user.
If infrastructure fails, capture the exact error, run state, checkout identity, and partial diff.
Use a reconciled same-protocol retry or ask for an execution-mode fallback. Never switch silently to another CLI.
If verification repeatedly fails or scope must expand, record the blocker and stop the batch.

At batch end, report each selected feature's state and evidence.
Name unresolved runs, skipped checks, blockers, and remaining dirty paths.
Distinguish local completion from commit, PR, CI, or merge status.
For incomplete work, give one concrete next action.
