# Knowledge data

This directory owns authored knowledge for learning and reading reference.
Edit one canonical JSON record. Git stores its revisions.

## Read first

- Structure and links → [Knowledge model](../../../docs/design-docs/knowledge-model.md)
- Content scope → [Knowledge content](../../../docs/product-specs/knowledge-content.md)
- Source review → [Knowledge quality](../../../docs/product-specs/knowledge-quality.md)
- Hexagram batch briefs and review rounds → [Batch policy](../../../docs/product-specs/knowledge-quality.md#hexagram-review-batches)
- Supplied editions → [Book sources](../../../docs/references/book-sources.md)
- Source-use boundaries → [Licensing](../../../LICENSING.md)

## Files and runtime

The validator discovers JSON records directly in the content directories.
No author-maintained manifest or separate citation registry is required.
Sources.json identifies the four supplied books and their local PDF editions.
Bibliography.json retains lightweight bibliography used by existing lookups.
TypeScript files here contain compatibility configuration, not duplicate authored prose.

Validation produces ignored .generated/runtime metadata and dist/content assets.
Builds reproduce them. Do not commit a generated full-corpus release.
The browser loads selected records and precaches the ready library for offline use.
Node consumers use loadContent from @liuyao/knowledge/node after building the package.

## Authoring workflow

1. Inspect the relevant book passage and necessary context.
2. Write a coherent original Vietnamese explanation.
3. Attach direct book/page references and meaningful attribution.
4. Link related records by stable IDs, line positions, or necessary section IDs.
5. Review changed content and mark a usable record ready.
6. Run structural validation and relevant package checks.

Keep overview, six lines, and special passages in the same hexagram record.
Keep differing interpretations attributed and common limitations in source metadata.
Do not repeat audit procedures or general disclaimers in each paragraph.
Do not create ledgers, hash snapshots, claim inventories, or certification artifacts.
For hexagram review batches, follow the linked batch policy before writing or preparing review briefs.
Temporary writer source-locator reports support that review; they do not change the published record contract.

## Verification

- pnpm --filter @liuyao/knowledge validate:corpus validates and refreshes output.
- Add --check to check freshness without rewriting files.
- Add --check-books to identify the actual local supplied PDFs by selected fingerprints.
- ./init.sh runs repository verification.

Checks cover structure, references, links, page bounds, table invariants, and worked examples.
They do not certify book completeness or predictive accuracy.
