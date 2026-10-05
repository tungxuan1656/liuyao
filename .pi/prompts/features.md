---
description: Deliver selected repository features sequentially with workers and independent reviewers
argument-hint: '<feat-id ... | feat-start..feat-end>'
---

Read `.pi/skills/pi-feature-delivery/SKILL.md` and follow its delivery contract.

Selected features: $ARGUMENTS

This request authorizes subagent delegation for these features only.
Accept explicit IDs or an inclusive range such as `feat-001..feat-010`.
If the selection is empty or invalid, ask for the feature IDs before starting.
Do not infer a batch from the backlog.

Start preparation, then deliver each selected feature in dependency order.
Continue automatically after each completion gate passes.
Stop the batch at an unresolved blocker.
This request does not authorize commits, pushes, PR creation, or merges.
