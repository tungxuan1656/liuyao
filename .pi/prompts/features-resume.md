---
description: Resume a selected feature batch from its external checkpoint and repository harness
argument-hint: '<absolute-checkpoint-path>'
---

Read `.pi/skills/pi-feature-delivery/SKILL.md` and follow its recovery contract.

Batch checkpoint: $ARGUMENTS

If the checkpoint path is missing or unreadable, ask for it before starting.
Read the checkpoint, then reconcile canonical feature records, live Git state, and exact subagent run identities.
Continue only the checkpoint's user-selected features. Preserve the original scope and recorded permissions.
Do not infer branch, commit, push, PR, review, or merge authority from this resume request. Use only authority recorded in the checkpoint or granted by the current user.
Do not launch a replacement while an existing writer can still edit the checkout.

Resolve ordinary unanswered implementation questions from canonical project evidence and existing patterns. Record each material autonomous decision in the current feature's `## Decision log`, with its rationale, evidence, alternatives, and effect. Do not ask the user about routine in-scope choices.

Continue the feature's branch, commit, review/fix/re-review, single-PR, exact-head CI, and merge loop only when the checkpoint grants those actions. Update the checkpoint at each gate. Advance to the next selected feature only after the current feature's completion gate passes and its merge is confirmed.
