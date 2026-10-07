import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  authoringCrosswalk,
  readExclusionBases,
  readHexagramOwners,
} from '../scripts/authoring-crosswalk.mjs';

const json = relative => JSON.parse(readFileSync(new URL(relative, import.meta.url), 'utf8'));
const inventory = readFileSync(
  new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
  'utf8',
);
const basisTable = rows =>
  `<!-- authoring-exclusion-bases:start -->\n${rows}\n<!-- authoring-exclusion-bases:end -->`;

function fixture() {
  const group = (id, kind = 'content') => ({
    id,
    kind,
    editionId: 'edition-fixture',
    pdfPageStart: 1,
    pdfPageEnd: 1,
    authorFeatureId: 'feat-author',
    auditFeatureId: 'feat-audit',
    discoveryStatus: 'unresolved',
  });
  return {
    registry: {
      inventory: { path: 'synthetic/inventory.md', sha256: 'a'.repeat(64) },
      registryRevision: 1,
      groups: [
        { ...group('parent'), recordIds: ['record-parent'] },
        { ...group('child'), parentId: 'parent' },
        group('blank', 'non-content'),
      ],
      exclusions: [],
      hexagrams: [],
      specialPassages: [],
    },
    inventoryText: basisTable(''),
    manifest: {
      releaseIds: ['record-parent', 'record-project'],
      nextBatch: { hexagramIds: [], topicIds: [], note: 'Synthetic.' },
    },
    records: [
      { id: 'record-parent', type: 'article', claims: [{ citationIds: ['citation-selected'] }] },
      { id: 'record-project', type: 'term', claims: [{ citationIds: [] }] },
    ],
    legacy: { catalog: { sources: [{ id: 'source-legacy-fixture' }], references: [] } },
    checked: { allClaims: record => record.claims },
    coverage: {
      lines: { byAuthor: [] },
      topics: [{ id: 'topic-fixture', status: 'pending', releasedRecordIds: ['record-parent'] }],
      legacyUnaudited: { entities: [], terms: [], rules: [] },
    },
  };
}

describe('authoring crosswalk classification', () => {
  it('keeps children unmapped, non-content visible and discovery states unchanged', () => {
    const input = fixture();
    const before = structuredClone(input.registry);
    const report = authoringCrosswalk(input);
    expect(report.counts).toEqual({
      groups: 3,
      selectedOnly: 1,
      unmapped: 1,
      nonContent: 1,
      discoveryUnresolved: 3,
      exclusions: 0,
    });
    expect(report.groups[0]).toMatchObject({
      mappingStatus: 'selected-only',
      recordIds: ['record-parent'],
    });
    expect(report.groups[1]).toMatchObject({
      mappingStatus: 'unmapped',
      recordIds: [],
      authorFeatureId: 'feat-author',
      auditFeatureId: 'feat-audit',
    });
    expect(report.groups[2].mappingStatus).toBe('non-content-accounting');
    expect(report.records[1]).toMatchObject({
      sourceUnitIds: [],
      evidenceCitationIds: [],
      mappingStatus: 'no-direct-unit-mapping',
    });
    expect(report.topics[0]).toMatchObject({
      status: 'pending',
      pendingWithReleasedRecords: true,
      reconciliationFeatureId: 'feat-094',
    });
    expect(report.nextBatch).toEqual(input.manifest.nextBatch);
    expect(input.registry).toEqual(before);
  });

  it.each(['kind', 'authorFeatureId', 'auditFeatureId'])(
    'rejects unclassified/unowned groups: %s',
    key => {
      const input = fixture();
      delete input.registry.groups[1][key];
      expect(() => authoringCrosswalk(input)).toThrow(/unclassified|unowned/);
    },
  );

  it('rejects unknown records instead of manufacturing a mapping', () => {
    const input = fixture();
    input.registry.groups[1].recordIds = ['record-unknown'];
    expect(() => authoringCrosswalk(input)).toThrow('unknown mapped record');
  });
});

describe('existing exclusion basis joins', () => {
  function withExclusion() {
    const input = fixture();
    input.registry.exclusions = [
      {
        id: 'exclusion-fixture',
        sourceUnitId: 'parent',
        editionId: 'edition-fixture',
        auditFeatureId: 'feat-audit',
      },
    ];
    input.inventoryText = basisTable(
      '| `exclusion-fixture` | `child` | The extant notice says text is omitted. |',
    );
    return input;
  }

  it('retains specific basis, exact locator and pending rationale review', () => {
    expect(authoringCrosswalk(withExclusion()).exclusions[0]).toMatchObject({
      sourceUnitId: 'parent',
      basisUnitId: 'child',
      statedBasis: 'The extant notice says text is omitted.',
      sourceAnchor: { editionId: 'edition-fixture', pdfPages: [1, 1] },
      rationaleReview: 'pending-audit-owner',
    });
  });

  it.each(['editionId', 'auditFeatureId', 'pdfPageEnd', 'parentId'])(
    'rejects mismatched basis %s',
    key => {
      const input = withExclusion();
      input.registry.groups[1][key] = key === 'pdfPageEnd' ? 2 : 'wrong';
      expect(() => authoringCrosswalk(input)).toThrow('mismatched stated basis');
    },
  );

  it('rejects missing and newly invented exclusions', () => {
    const input = withExclusion();
    input.inventoryText = basisTable('');
    expect(() => authoringCrosswalk(input)).toThrow('missing or mismatched stated basis');
    input.inventoryText = basisTable('| `exclusion-new` | `child` | No new exclusions allowed. |');
    expect(() => authoringCrosswalk(input)).toThrow('Unregistered authoring exclusion');
  });

  it('rejects absent, malformed and duplicate table rows', () => {
    expect(() => readExclusionBases('')).toThrow('Missing authoring exclusion');
    expect(() => readExclusionBases(basisTable('| `x` | broken |'))).toThrow('Malformed');
    const row = '| `x` | `unit` | Stated basis. |';
    expect(() => readExclusionBases(basisTable(`${row}\n${row}`))).toThrow('Duplicate');
  });
});

it('joins canonical hexagram owners only and rejects missing/mismatched routes', () => {
  const owners = readHexagramOwners(inventory);
  expect(owners.size).toBe(64);
  expect(owners.get('01')).toEqual({ authorFeatureId: 'feat-032', auditFeatureId: 'feat-068' });
  const input = fixture();
  input.registry.hexagrams = [
    { id: 'hexagram-01', number: 1, auditFeatureId: 'feat-068', books: [] },
  ];
  expect(() => authoringCrosswalk(input)).toThrow('missing or mismatched inventory owner route');
  input.inventoryText += '\n| `pbc/ntt/nhl-hexagram-01` | 032 \u2192 069 |';
  expect(() => authoringCrosswalk(input)).toThrow('missing or mismatched inventory owner route');
});

describe('released corpus authoring reconciliation', () => {
  const registry = json('../../../docs/reviews/knowledge/expected-units.json');
  const report = json('../reports/authoring-crosswalk.json');
  const coverage = json('../reports/coverage.json');
  const audit = json('../reports/audit-status.json');

  it('preserves counts, mapping gaps and exact inventory binding', () => {
    expect(registry.inventory.sha256).toBe(createHash('sha256').update(inventory).digest('hex'));
    expect(report.counts.groups).toBe(4638);
    expect(report.counts.discoveryUnresolved).toBe(4638);
    expect(report.groups.map(group => group.id)).toEqual(registry.groups.map(group => group.id));
    expect(
      report.groups.every(
        group => group.authorFeatureId && group.auditFeatureId && group.mappingStatus,
      ),
    ).toBe(true);
    expect(coverage.records).toMatchObject({ authored: 381, released: 381 });
    expect(coverage.claims).toEqual({ total: 9503, missingCitationIds: [] });
    expect(coverage.citations.total).toBe(9744);
    expect(coverage.complete).toBe(false);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
  });

  it('does not resolve any BPCT chapter6 label by parent or cohort', () => {
    const labels = report.groups.filter(group => /^bpct-ch06-\d{2}$/.test(group.id));
    expect(labels).toHaveLength(69);
    for (const unit of labels) {
      const n = Number(unit.id.slice(-2));
      const selected = (n >= 17 && n <= 24) || n >= 57;
      expect(unit.mappingStatus).toBe(selected ? 'selected-only' : 'unmapped');
      expect(unit.recordIds.length > 0).toBe(selected);
      expect(unit.auditFeatureId).toBe('feat-085');
      expect(unit.discoveryStatus).toBe('unresolved');
    }
    expect(labels.filter(unit => unit.mappingStatus === 'unmapped')).toHaveLength(48);
  });

  it('joins all17 existing exclusions without accepting their rationale', () => {
    expect(report.exclusions.map(unit => unit.id)).toEqual(
      registry.exclusions.map(unit => unit.id),
    );
    expect(report.exclusions).toHaveLength(17);
    expect(
      report.exclusions.every(
        unit =>
          unit.statedBasis &&
          unit.basisUnitId &&
          unit.rationaleReview === 'pending-audit-owner' &&
          unit.auditFeatureId === 'feat-092',
      ),
    ).toBe(true);
  });

  it('keeps source-layer/audit obligations separate from 64/384 author counts', () => {
    expect(report.commentary.byAuthor).toHaveLength(3);
    for (const author of report.commentary.byAuthor) {
      expect(author.overviewHexagrams).toBe(64);
      expect(author.reviewedLinePositions).toBe(384);
      expect(author.missingPilotPositions).toEqual([]);
    }
    expect(report.commentary.books).toHaveLength(192);
    expect(report.commentary.books.every(book => book.authorFeatureId && book.auditFeatureId)).toBe(
      true,
    );
    expect(report.commentary.specialPassages).toHaveLength(6);
    expect(audit.totals).toMatchObject({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      groups: 4638,
    });
  });

  it('reconciles every release, pending topic and compatibility route without manifest edits', () => {
    const manifest = json('../data/manifest.json');
    expect(report.records.map(record => record.id).sort()).toEqual([...manifest.releaseIds].sort());
    expect(report.topics.find(topic => topic.id === 'topic-classical-traditions')).toMatchObject({
      status: 'pending',
      pendingWithReleasedRecords: true,
    });
    expect(report.nextBatch).toEqual(manifest.nextBatch);
    expect(report.legacyRoutes.unaudited).toEqual({ entities: [], terms: [], rules: [] });
    expect(report.legacyRoutes.bibliographicSourceIds).toHaveLength(4);
    expect(report.legacyRoutes.references).toHaveLength(8);
    for (const reference of report.legacyRoutes.references) {
      expect(reference.reviewStatus).toBe('unaudited');
      expect(reference.releasedTargetIds).toEqual(reference.targetIds);
    }
    expect(report.legacyRoutes.releasedCompatibilityIds.entities).toHaveLength(72);
  });
});
