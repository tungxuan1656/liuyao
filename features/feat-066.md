# feat-066 — Close the authoring inventory for all supplied sections

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- The source inventory, every released collection, remaining legacy entries, and exclusions.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Every supplied section and later workload split has a source-inventory unit, source anchor, author owner, and audit owner.
- [x] Map released record IDs only where the authored record supports that exact unit; do not inherit a parent mapping as proof of child coverage. Keep selected-only, unmapped, or incomplete units visible and assigned to existing follow-up owners.
- [x] Cross-reference every existing exclusion to its source-inventory unit and specific stated basis; add no exclusions to hide unfinished content. Keep any unreviewed rationale open and assigned to its audit owner.
- [x] No source unit is unclassified or unowned; all 64 quẻ have six positions in each of the three commentary books.
- [x] Reconcile topics, legacy routes, and nextBatch without claiming full passage coverage or independent certification.
- [x] Keep source-review, specialist, and certification gates open/incomplete; do not resolve audit discovery states as part of this crosswalk.
- [x] Required verification passes; evidence and handoff are recorded.

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

- State: done; merged in PR #95 at `46af5cd9069c061ecd2986df1f6e1d220138da9d` from exact reviewed head `54977cc614c22041f62fddd61f18ffb7a2fa2ca2`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37599352568`/job `112719642987`, Cloudflare Pages, and GitGuardian passed. Pre-push `./init.sh` passed 6,378 tests (6,197 knowledge, 181 core); corpus/source-fingerprint validation and package-export checks passed; focused crosswalk tests passed 18/18. Review report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/f69f15eb-cbfe-4543-ba4b-cecd3f1d3606/reports/feat066-final-independent-review.md`; worker report: `/Users/tungdoan/.pi/agent/sessions/--Users-tungdoan-Projects-Web-liuyao--/subagent-artifacts/outputs/d0af9d23-2abb-479b-8712-7279d95ccff0/reports/feat-066-worker-report.md`. The generated 3.6 MiB crosswalk stays under reports and has no runtime/PWA effect. The repository's automatic branch deletion was disabled for this merge, the feature branch was retained, and the original setting was restored afterward.
- Coverage: 4,638 source groups stay discovery-unresolved; 108 content groups lack direct released-record mappings, 127 released records lack direct unit mappings, and 17 exclusion rationales remain pending audit review. The pending classical-traditions topic stays unchanged and is routed to feat-094. No passage coverage, audit, specialist-review, or certification gate is claimed complete.
- Dependencies: feat-065 is done; see [feature index](../feature_index.json).
- Next: Continue with selected feat-068 from updated `main`.
