# Knowledge correction workflow

Use this route when reviewed source evidence, authored knowledge, or an accepted project contract changes. The audit data contract lives in the [knowledge model](../../design-docs/knowledge-model.md#approved-versioned-audit-contract); evidence rules live in [knowledge quality](../../product-specs/knowledge-quality.md#full-corpus-verification).

## Correction route

1. Record the correction and exact reason in the owning record, citation, source catalog, discrepancy, project specification, or source inventory. Preserve the source edition, locator, and attribution.
2. Validate the edited artifacts. Recompute affected audit inputs and coverage; do not edit old ledger decisions to hide changed or removed dependencies.
3. Identify every stale decision and dependent claim through the recorded support closure. Keep affected source-review and completion gates closed. Unaffected decisions remain current only when their own input closures are unchanged.
4. Re-review the changed evidence against the supplied source or accepted project contract. Resolve discrepancies with cited evidence. Keep unresolved, disputed, superseded, or unavailable support from authorizing publication.
5. Append a new decision revision for each affected target. Link it to the prior revision with `supersedes`, record refreshed inputs, findings, locator, and actual reviewer identity. Retain prior decisions as history.
6. Obtain separate verification reapproval for affected claims or audit conclusions under the [AI review policy](../../product-specs/knowledge-quality.md#group-units-and-independent-evidence). Record the new model and review-run identity. Missing review remains pending; source comparison or automated tests do not replace a review pass.
7. Regenerate audit status and coverage, then rerun the assigned corpus and book checks. Restore completion only when all required evidence gates are current. Reissue certification only through the separate certification process.

## Boundaries

- Keep expected results independent of the implementation under review.
- Treat validation fixtures and synthetic approvals as test data only; never copy them into real records, ledgers, or certification.
- Do not widen a correction's accepted scope without source evidence and review.
- Retain a clear route from a superseded claim or decision to its replacement.
