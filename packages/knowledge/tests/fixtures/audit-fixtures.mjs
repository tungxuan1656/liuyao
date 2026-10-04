import { createHash } from 'node:crypto';

export const sha = value => createHash('sha256').update(value).digest('hex');

export function auditContext() {
  const support = {
    schemaVersion: 2,
    id: 'article-support',
    type: 'article',
    title: 'Support',
    aliases: [],
    topicIds: ['topic-test'],
    claims: [
      {
        id: 'claim-support',
        kind: 'structural-fact',
        text: 'Synthetic support',
        citationIds: ['citation-support'],
        attribution: { author: 'Test author' },
      },
    ],
    relatedIds: [],
    review: { status: 'reviewed', evidenceCitationIds: ['citation-support'] },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  };
  const owner = {
    schemaVersion: 2,
    id: 'article-owner',
    type: 'article',
    title: 'Owner',
    aliases: [],
    topicIds: ['topic-test'],
    claims: [
      {
        id: 'claim-owner',
        kind: 'structural-fact',
        text: 'Synthetic owner',
        citationIds: ['citation-owner'],
        dependsOnClaimIds: ['claim-support'],
      },
    ],
    relatedIds: [],
    review: { status: 'reviewed', evidenceCitationIds: ['citation-owner'] },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
    figures: [
      {
        id: 'figure-owner',
        kind: 'board',
        title: 'Synthetic figure',
        sourceUnitIds: ['source-unit-test'],
        labels: [{ id: 'label-owner', text: 'Synthetic', claimIds: ['claim-owner'] }],
        claimIds: ['claim-owner'],
        inspectionStatus: 'uninspected',
      },
    ],
  };
  const citations = ['citation-owner', 'citation-support'].map((id, index) => ({
    id,
    sourceId: 'source-test',
    editionId: 'edition-test',
    location: {
      chapter: 'Test',
      section: `Section ${index}`,
      pdfPageStart: index + 1,
      pdfPageEnd: index + 1,
    },
    textLayer: 'original-text',
  }));
  const sources = [
    {
      id: 'source-test',
      editions: [{ id: 'edition-test', sha256: 'a'.repeat(64), pdfPageCount: 10 }],
    },
  ];
  const context = {
    manifest: { releaseIds: ['article-owner', 'article-support'], projectContracts: [] },
    records: [owner, support],
    citations,
    sources,
    fixtureBindings: [],
    syntheticInput: true,
  };
  return { context, owner, support, citations, sources };
}

export function minimalRegistry({ resolved = false } = {}) {
  const status = resolved ? 'resolved' : 'unresolved';
  return {
    schemaVersion: 1,
    registryId: 'knowledge-expected-units-v1',
    registryRevision: 1,
    inventory: { path: 'docs/reviews/knowledge/source-inventory.md', sha256: 'b'.repeat(64) },
    counts: {
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 1,
      exclusions: 0,
    },
    layers: [
      {
        id: 'layer-test',
        editionId: 'edition-test',
        class: 'original-text',
        label: 'Synthetic layer',
        sourceAnchor: { inventoryAnchor: 'synthetic', citationIds: [] },
        rosterStatus: status,
      },
    ],
    hexagrams: [],
    specialPassages: [],
    groups: [
      {
        id: 'source-unit-test',
        kind: 'content',
        group: 'synthetic',
        editionId: 'edition-test',
        pdfPageStart: 1,
        pdfPageEnd: 2,
        authorFeatureId: 'feat-001',
        auditFeatureId: 'feat-002',
        layerScopeIds: ['layer-test'],
        discoveryStatus: status,
        recordIds: ['article-owner'],
      },
    ],
    exclusions: [],
  };
}
