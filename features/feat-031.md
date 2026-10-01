# feat-031 — Book-backed domain documentation

## Goal

Document V1 hexagram and Liu Yao rules with traceable evidence from the supplied books.

## Scope

- Inventory the four PDFs and record source limitations.
- Specify current board rules and their book locations.
- Define knowledge quality requirements and assess file, JSON, and database storage.
- Repair documentation routes and distinguish observed behavior from intended content quality.

## Non-goals

- Runtime code, dataset migration, or automatic interpretation.
- A complete review of all commentary or 384 line explanations.
- Public redistribution of the supplied PDFs.

## Acceptance

- [x] Source inventory identifies each PDF, edition evidence, fingerprint, and reviewed locations.
- [x] Rules cover trigrams, 64 palace memberships, Shi/Ying, Na Jia, elements, and Six Relatives.
- [x] Book errors and unsourced product conventions remain explicit.
- [x] Quality and storage guidance describes current contracts and labels proposed changes.
- [x] Documentation routes and `./init.sh` pass.

## Relevant docs

- `docs/design-docs/knowledge-model.md`
- `docs/design-docs/liuyao-ruleset-v1.md`
- `docs/product-specs/knowledge-quality.md`
- `docs/references/book-sources.md`
- `docs/product-specs/product-scope.md`
- `docs/development.md`
- `LICENSING.md`

## Plan

1. Review book passages against current contracts and record discrepancies.
2. Write the source catalog, ruleset specification, and knowledge quality contract.
3. Update canonical guides and routes, then verify the documentation and repository.

## Verify

- `./init.sh`
- `git diff --check`
- Check local links, PDF fingerprints, and table agreement with current source.

## Handoff

- State: done. Documentation is complete within scope. Runtime content certification remains separate work.
- Evidence: fresh `./init.sh` passed with 225 package tests. Local links and four PDF fingerprints passed. Tables match all eight trigram patterns, 64 palace entries, and 48 Na Jia assignments in current code.
- Dependency check: feat-004, feat-005, and feat-006 are done.
- Blockers: none for documentation.
- Next: Select the supplied-book audit of runtime knowledge records and calculation fixtures.
