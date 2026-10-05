---
description: Deliver selected repository features sequentially with workers and independent reviewers
argument-hint: '<feat-id ... | feat-start..feat-end>'
---

Read `.pi/skills/pi-feature-delivery/SKILL.md` and follow its delivery contract.

Selected features: $ARGUMENTS

This request authorizes work and delegation for these features only.
Accept explicit IDs or an inclusive range such as `feat-001..feat-010`.
If the selection is empty or invalid, ask for the feature IDs before starting.
Do not infer a batch from the backlog.

For this selection, create a feature branch, implement and commit the feature, run local gates, and obtain fresh independent review. Fix findings in new commits and repeat review until the feature passes. Then create one PR, complete exact-head CI and review, merge it, update canonical records, return to `main`, and start the next selected feature in dependency order.

This request authorizes branch creation, commits, pushes, one PR per selected feature, review fixes, and merges for this batch only. Do not force-push, delete user branches, or expand the selection. If the user narrows this authority, obey the narrower request.

Resolve ordinary unanswered implementation questions from feature acceptance, plans, canonical project documents, and existing code. Choose the smallest safe, reversible option when evidence does not decide the question. Do not interrupt the user for routine decisions. Record each material autonomous decision in `features/<id>.md` under `## Decision log`, with the question, decision, alternatives, rationale, evidence, and effect.

Stop only when required authority or external evidence is missing, canonical requirements conflict, acceptance is materially ambiguous, scope must expand, or a safety, legal, privacy, or security boundary prevents progress. Never infer rights clearance or change licensing facts to unblock work.
