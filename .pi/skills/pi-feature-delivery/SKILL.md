---
name: pi-feature-delivery
description: Deliver an explicitly selected LiuYao feature batch through one branch and one PR per feature, with worker implementation, independent review, merge, and repository gates.
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
- A new `/features` request authorizes branch creation, commits, pushes, one PR per selected feature, review fixes, and merge for that selection only.
- A current user instruction that withholds an action overrides this default. A resume request preserves the checkpoint's original authority and adds none.
- Never force-push, delete user branches, or expand the selected feature scope.

All repository paths in this skill resolve from the repository root, not this skill directory.

## Autonomous decisions

- Resolve ordinary questions that the selected feature or plan does not answer.
- Use canonical project documents, existing code, and established patterns as evidence.
- Choose the smallest in-scope, reversible option when evidence does not determine one choice.
- Record each material autonomous decision in `features/<id>.md` under `## Decision log`.
- Record the question, decision, alternatives, rationale, evidence, and effect on scope or acceptance.
- Add the section when it is absent. Keep this feature record as the canonical decision log.
- Do not ask the user about routine implementation details or decisions supported by project evidence.
- Stop and ask only when a decision needs user-only authority, changes selected scope, changes acceptance, or conflicts with canonical requirements.
- Never infer legal rights, security approval, consent, credentials, or permission to expose data.
- Keep a feature blocked when required external evidence or authorization is missing.

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
Constraints: preserve unrelated edits, no nested agents; parent owns branch and publication gates
Assigned verification and expected evidence:
Report: outcome, exact changed paths, acceptance results, commands and outcomes, artifacts, blocker and next action
Stop: checkout mismatch, unexpected edits, ownership ambiguity, missing permission, or required scope expansion
```

## Per-feature Git flow

1. Start from the current `main` after the prior selected feature merges.
2. Create one feature branch named `feat/<id>-<slug>`.
3. Implement only the selected feature and commit each coherent, reviewable change.
4. Run local feature verification before requesting independent review.
5. Freeze the target at an exact commit SHA. Give a fresh read-only reviewer the feature acceptance, complete diff, and verification evidence.
6. Fix valid findings in new commits, rerun affected checks, and request fresh review of the new SHA.
7. Repeat until local acceptance and review pass. Then push the branch and create exactly one PR for the feature.
8. Run exact-head CI and address PR findings through new commits and fresh review.
9. Merge only after all required checks and reviews pass. Record the merge SHA and verify the updated `main`.
10. Update feature and progress records, then start the next selected feature from `main`.

Do not start another selected feature before the current feature merges and passes its completion gate.

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
- Record autonomous implementation decisions in the feature's `## Decision log`.
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
- Repeat the review/fix/commit/re-review loop until no valid P0/P1 finding or unmet acceptance criterion remains.
- Defer optional P2 polish explicitly. Stop only for an unresolved blocker, repeated verification failure, or required scope expansion.

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
