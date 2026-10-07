# feat-066 — Close the authoring inventory for all supplied sections

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- The source inventory, every released collection, remaining legacy entries, and exclusions.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Every supplied section and later workload split has a source-inventory unit, source anchor, author owner, and audit owner.
- [ ] Map released record IDs only where the authored record supports that exact unit; do not inherit a parent mapping as proof of child coverage. Keep selected-only, unmapped, or incomplete units visible and assigned to existing follow-up owners.
- [ ] Cross-reference every existing exclusion to its source-inventory unit and specific stated basis; add no exclusions to hide unfinished content. Keep any unreviewed rationale open and assigned to its audit owner.
- [ ] No source unit is unclassified or unowned; all 64 quẻ have six positions in each of the three commentary books.
- [ ] Reconcile topics, legacy routes, and nextBatch without claiming full passage coverage or independent certification.
- [ ] Keep source-review, specialist, and certification gates open/incomplete; do not resolve audit discovery states as part of this crosswalk.
- [ ] Required verification passes; evidence and handoff are recorded.

## Decision log

- 2026-10-07 — User selected a crosswalk-only closeout. Add no source records, claims, or citations; do not change audit discovery states or certification gates. Reconcile ownership, source-unit classifications, topics, legacy routes, and nextBatch. Map existing record IDs only where source evidence supports the exact unit; retain incomplete coverage as explicit, owned follow-up work. This separates authoring crosswalk closure from the later audit and specialist review.
- Baseline evidence: 381/381 records released; 9,503 claims without missing citation IDs; 9,744 citations; all 64 hexagrams and 384 positions for each of the three commentary authors. The expected-unit registry has 4,638 discovery-unresolved groups. In BPCT Part I chapter 6 (PDF 77–100), labels 1–16 and 25–56 have no direct record mapping; existing mappings for labels 17–24 and 57–69 do not prove coverage of the other labels. Preserve those units as owned follow-up, not as complete or excluded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Compare source-inventory units, the expected-unit registry, released records, exclusions, topics, legacy routes, and nextBatch.
2. Map only evidence-supported existing records; retain selected-only or unmapped units as explicit owned follow-up work.
3. Update the evidence-derived coverage report and focused tests without closing audit gates.
4. Run required verification and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active on `feat/066-authoring-inventory-crosswalk`.
- Evidence: User approved crosswalk-only scope; baseline counts and known BPCT chapter-6 mapping gaps are recorded above. No implementation or verification yet.
- Dependencies: feat-065 is done; see [feature index](../feature_index.json).
- Next: Reconcile the inventory and release mappings while preserving explicit follow-up ownership and open audit gates.
