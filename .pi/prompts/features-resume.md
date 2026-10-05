---
description: Resume a selected feature batch from its external checkpoint and repository harness
argument-hint: '<absolute-checkpoint-path>'
---

Read `.pi/skills/pi-feature-delivery/SKILL.md` and follow its recovery contract.

Batch checkpoint: $ARGUMENTS

If the checkpoint path is missing or unreadable, ask for it before starting.
Read the checkpoint, then reconcile canonical feature records, live Git state, and subagent run identities.
This request authorizes continued delegation only for the checkpoint's user-selected features.
Preserve the original scope and recorded permissions.
Do not infer commit, push, PR, or merge authority from this resume request.
Do not launch a replacement while an existing writer can still edit the checkout.
Continue from the checkpoint's next action, then advance only after each completion gate passes.
