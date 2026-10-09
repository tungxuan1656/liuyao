# Historical knowledge reviews

Feat-068 retired source inventories, hash ledgers, page accounting, and generated audit reports.
Git preserves these files; they are not authoring or runtime inputs.
The branch feat/068-audit-hexagrams-01-04 at c80c38d preserves earlier quẻ 01–04 work.

## Retired report snapshots

The former `packages/knowledge/reports/audit-status.json` was removed from the active tree in
[issue #121](https://github.com/tungxuan1656/liuyao/issues/121). It remains recoverable from Git, for example:

```sh
git show f610f5957407a1f784277c4e609dc8540085df44:packages/knowledge/reports/audit-status.json
```

Its `complete: false`, closed source-review gate and closed certification gate described the **retired**
claim-ledger/certification system, **not** the current JSON corpus publication state. Other retained
files under `packages/knowledge/reports/` are likewise historical and must not be used as release gates.
Current validation and publishing use the simplified source-backed record model and the quality contract.

Recover an earlier file with git show <revision>:<path> when a specific source observation is useful.
Put the useful fact into its canonical record with a direct book/page reference.
Older progress blocks remain unchanged; retired paths describe their historical state.

Current rules: [quality](../../product-specs/knowledge-quality.md), [model](../../design-docs/knowledge-model.md), and [corrections](correction-workflow.md).
