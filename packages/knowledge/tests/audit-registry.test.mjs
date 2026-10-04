import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { createAuditSchemaValidator } from '../scripts/audit-schema.mjs';
import { expandRequiredCellTargets, validateAuditRegistry } from '../scripts/audit-registry.mjs';

const readJson = relative => JSON.parse(readFileSync(new URL(relative, import.meta.url), 'utf8'));
const expectedSchema = readJson('../schema/expected-units-v1.schema.json');
const ledgerSchema = readJson('../schema/audit-ledger-v1.schema.json');
const certificationSchema = readJson('../schema/audit-certification-v1.schema.json');
const validateExpected = createAuditSchemaValidator(expectedSchema, 'expected registry schema');
const validateLedger = createAuditSchemaValidator(ledgerSchema, 'ledger schema');
const validateCertification = createAuditSchemaValidator(
  certificationSchema,
  'certification schema',
);

function syntheticRegistry() {
  const registry = {
    schemaVersion: 1,
    registryId: 'knowledge-expected-units-v1',
    registryRevision: 1,
    inventory: { path: 'docs/reviews/knowledge/source-inventory.md', sha256: 'a'.repeat(64) },
    counts: {
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 0,
      exclusions: 0,
    },
    layers: ['pbc', 'ntt', 'nhl'].map(prefix => ({
      id: `layer-${prefix}-text`,
      editionId: `edition-${prefix}-supplied`,
      class: 'original-text',
      label: `${prefix} source text`,
      sourceAnchor: { inventoryAnchor: `${prefix}-anchor`, citationIds: [] },
      rosterStatus: 'unresolved',
    })),
    hexagrams: [],
    specialPassages: [],
    groups: [],
    exclusions: [],
  };
  for (let number = 1; number <= 64; number += 1) {
    const key = String(number).padStart(2, '0');
    registry.hexagrams.push({
      id: `hexagram-${key}`,
      number,
      auditFeatureId:
        number <= 40
          ? `feat-${String(68 + Math.floor((number - 1) / 4)).padStart(3, '0')}`
          : `feat-${String(78 + Math.floor((number - 41) / 4)).padStart(3, '0')}`,
      requiredCells: [
        'overview',
        'position-1',
        'position-2',
        'position-3',
        'position-4',
        'position-5',
        'position-6',
      ],
      books: ['pbc', 'ntt', 'nhl'].map(prefix => ({
        editionId: `edition-${prefix}-supplied`,
        sourceUnitId: `${prefix}-hexagram-${key}`,
        pdfPageStart: 1,
        pdfPageEnd: 10,
        layerScopeIds: [`layer-${prefix}-text`],
      })),
      specialPassageIds: [],
    });
  }
  for (const number of [1, 2]) {
    const hexagramId = `hexagram-${String(number).padStart(2, '0')}`;
    for (const prefix of ['pbc', 'ntt', 'nhl']) {
      const id = `special-${prefix}-${hexagramId}`;
      const pageEnd = prefix === 'pbc' ? 4 : prefix === 'ntt' ? 6 : 7;
      registry.specialPassages.push({
        id,
        hexagramId,
        editionId: `edition-${prefix}-supplied`,
        sourceUnitId: `${prefix}-hexagram-${String(number).padStart(2, '0')}`,
        auditFeatureId: 'feat-068',
        pdfPageStart: 1,
        pdfPageEnd: pageEnd,
        layerScopeIds: [`layer-${prefix}-text`],
      });
      registry.hexagrams[number - 1].specialPassageIds.push(id);
    }
  }
  return registry;
}

function validDecision() {
  return {
    id: 'decision-fixture',
    target: {
      kind: 'cell',
      hexagramId: 'hexagram-01',
      editionId: 'edition-pbc-supplied',
      cell: 'overview',
    },
    revision: 1,
    supersedes: null,
    disposition: 'unresolved',
    findings: '',
    locator: {
      citationIds: ['citation-fixture'],
      editionId: 'edition-pbc-supplied',
      pdfPages: [1, 1],
    },
    coveredClaimIds: [],
    layerResolution: { status: 'unresolved', layers: [] },
    exclusionReview: null,
    sourceComparison: {
      identity: 'reviewer-fixture',
      reviewer: 'Reviewer Fixture',
      date: '2026-10-03',
      scope: 'synthetic fixture',
      evidenceCitationIds: ['citation-fixture'],
    },
    specialistReview: {
      status: 'pending',
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      scope: 'not approved',
      note: 'Synthetic validator fixture only.',
    },
    authoredScope: 'none',
    inputs: { records: [], citations: [], editions: [], projectContracts: [], fixtures: [] },
    recordedAt: '2026-10-03T00:00:00Z',
    recordedBy: 'Synthetic test',
  };
}

describe('versioned audit registry contracts', () => {
  it('accepts the empty real ledger envelope shape without suggesting approval', () => {
    expect(
      validateLedger({
        schemaVersion: 1,
        ledgerId: 'ledger-fixture',
        scope: { kind: 'hexagram', id: 'hexagram-01' },
        decisions: [],
      }).valid,
    ).toBe(true);
    expect(validateCertification({})).toMatchObject({ valid: false });
  });

  it('requires fully explicit nonempty input arrays and permits a pending no-record decision', () => {
    const ledger = {
      schemaVersion: 1,
      ledgerId: 'ledger-fixture',
      scope: { kind: 'hexagram', id: 'hexagram-01' },
      decisions: [validDecision()],
    };
    expect(validateLedger(ledger).valid).toBe(true);
    delete ledger.decisions[0].inputs.records;
    expect(validateLedger(ledger).valid).toBe(false);
    ledger.decisions[0].inputs.records = [];
    ledger.decisions[0].specialistReview.reviewerName = 'Invented pending reviewer';
    expect(validateLedger(ledger).valid).toBe(false);
    ledger.decisions[0].specialistReview.reviewerName = null;
    ledger.decisions[0].sourceComparison.evidenceCitationIds = [];
    expect(validateLedger(ledger).valid).toBe(false);
  });

  it('strictly rejects unknown fields and schema versions across all three v1 artifacts', () => {
    const registry = syntheticRegistry();
    expect(validateExpected(registry).valid).toBe(true);
    expect(validateExpected({ ...registry, schemaVersion: 2 }).valid).toBe(false);
    expect(validateExpected({ ...registry, invented: true }).valid).toBe(false);
    const changedRoster = structuredClone(registry);
    changedRoster.layers[0].rosterStatus = 'resolved';
    expect(validateExpected(changedRoster).valid).toBe(true);
    const removedSpecial = structuredClone(registry);
    removedSpecial.specialPassages.pop();
    removedSpecial.hexagrams[1].specialPassageIds.pop();
    expect(validateAuditRegistry(removedSpecial, { inventoryBytes: 'synthetic' }).valid).toBe(
      false,
    );
    expect(
      validateLedger({
        schemaVersion: 2,
        ledgerId: 'ledger',
        scope: { kind: 'hexagram', id: 'hexagram-01' },
        decisions: [],
      }).valid,
    ).toBe(false);
    const certification = {
      schemaVersion: 1,
      contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'b'.repeat(64)}`,
      registry: { sha256: 'c'.repeat(64), revision: 1 },
      decisionSetSha256: 'd'.repeat(64),
      specialistReview: {
        reviewerName: 'Actual Reviewer',
        reviewerRole: 'Specialist',
        reviewedAt: '2026-10-03T00:00:00Z',
        scope: 'fixture',
        decision: 'approved',
      },
    };
    expect(validateCertification(certification).valid).toBe(true);
    expect(validateCertification({ ...certification, invented: true }).valid).toBe(false);
    expect(
      validateCertification({
        ...certification,
        specialistReview: { ...certification.specialistReview, reviewerName: '' },
      }).valid,
    ).toBe(false);
  });

  it('expands exactly 192 overviews, 1,152 positions and 1,344 book cells', () => {
    const targets = expandRequiredCellTargets(syntheticRegistry());
    expect(targets.filter(target => target.cell === 'overview')).toHaveLength(192);
    expect(targets.filter(target => target.cell.startsWith('position-'))).toHaveLength(1152);
    expect(
      new Set(targets.map(target => `${target.hexagramId}/${target.editionId}/${target.cell}`))
        .size,
    ).toBe(1344);
  });

  it('validates the actual inventory-bound registry, catalog editions and citations', () => {
    const registry = readJson('../../../docs/reviews/knowledge/expected-units.json');
    const inventory = readFileSync(
      new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
    );
    const manifest = readJson('../data/manifest.json');
    const sources = readJson(`../data/${manifest.sourceFile}`).sources;
    const editions = new Map(
      sources.flatMap(source => source.editions.map(edition => [edition.id, edition])),
    );
    const sourceIds = new Set(sources.map(source => source.id));
    const citations = manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations);
    const citationCatalog = new Map(citations.map(citation => [citation.id, citation]));
    const records = new Set(manifest.recordFiles.map(file => readJson(`../data/${file}`).id));
    const authoritativeFeatures = new Set(
      readJson('../../../feature_index.json').features.map(feature => feature.id),
    );
    expect(registry.counts.groups).toBe(registry.groups.length);
    expect(registry.counts.exclusions).toBe(registry.exclusions.length);
    expect(registry.specialPassages.map(item => item.id).sort()).toEqual(
      [
        'special-nhl-hexagram-01',
        'special-nhl-hexagram-02',
        'special-ntt-hexagram-01',
        'special-ntt-hexagram-02',
        'special-pbc-hexagram-01',
        'special-pbc-hexagram-02',
      ].sort(),
    );
    expect(registry.groups.some(item => item.id === 'bpct-casting-I')).toBe(true);
    expect(registry.groups.some(item => /bpct-casting-I-\d/.test(item.id))).toBe(false);
    expect(registry.groups.some(item => /bpct-casting-III/.test(item.id))).toBe(false);
    const result = validateAuditRegistry(registry, {
      inventoryBytes: inventory,
      editionCatalog: editions,
      sourceIds,
      citationIds: citationCatalog,
      featureIds: authoritativeFeatures,
      authoredRecordIds: records,
    });
    expect(result.valid, result.errors.join('\n')).toBe(true);
    expect(result.expansion).toMatchObject({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
    });
  });

  it('rejects stale inventory bytes, count shrinkage, broken parents, edition mismatch and invalid page bounds', () => {
    const registry = syntheticRegistry();
    registry.inventory.sha256 = createHash('sha256').update('synthetic').digest('hex');
    const options = {
      inventoryBytes: Buffer.from('synthetic'),
      editionCatalog: new Map(
        ['pbc', 'ntt', 'nhl'].map(prefix => [
          `edition-${prefix}-supplied`,
          { pdfPageCount: 10, sourceId: `source-book-${prefix}` },
        ]),
      ),
      sourceIds: new Set(['source-book-pbc', 'source-book-ntt', 'source-book-nhl']),
      citationIds: new Set(['citation-fixture']),
      featureIds: new Set(
        Array.from({ length: 101 }, (_, index) => `feat-${String(index + 1).padStart(3, '0')}`),
      ),
    };
    expect(validateAuditRegistry(registry, options).valid).toBe(false);
    registry.inventory.sha256 = createHash('sha256').update('synthetic').digest('hex');
    registry.counts.hexagramCells = 1343;
    expect(validateAuditRegistry(registry, options).errors.join('\n')).toMatch(/hexagramCells/);
    registry.counts.hexagramCells = 1344;
    registry.hexagrams[0].books[0].pdfPageEnd = 11;
    expect(validateAuditRegistry(registry, options).errors.join('\n')).toMatch(/page bound/);
  });

  it('accepts a real source-routing owner that does not follow generated hexagram formula', () => {
    const registry = readJson('../../../docs/reviews/knowledge/expected-units.json');
    const source = readFileSync(
      new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
    );
    const manifest = readJson('../data/manifest.json');
    const sources = readJson(`../data/${manifest.sourceFile}`).sources;
    const editions = new Map(
      sources.flatMap(item => item.editions.map(edition => [edition.id, edition])),
    );
    const result = validateAuditRegistry(registry, {
      inventoryBytes: source,
      editionCatalog: editions,
      sourceIds: new Set(sources.map(item => item.id)),
      citationIds: new Map(),
      featureIds: new Set(readJson('../../../feature_index.json').features.map(item => item.id)),
      authoredRecordIds: new Set(manifest.recordFiles.map(file => readJson(`../data/${file}`).id)),
    });
    expect(registry.hexagrams[4].auditFeatureId).toBe('feat-069');
    expect(result.errors.join('\n')).not.toMatch(
      /audit owner must follow current inventory routing/,
    );
  });

  it('preserves exact inspected historical feature routing for hexagrams 03–16', () => {
    const registry = readJson('../../../docs/reviews/knowledge/expected-units.json');
    const owners = new Map([
      [3, 'feat-068'],
      [4, 'feat-068'],
      [5, 'feat-069'],
      [6, 'feat-069'],
      [7, 'feat-069'],
      [8, 'feat-069'],
      [9, 'feat-070'],
      [10, 'feat-070'],
      [11, 'feat-070'],
      [12, 'feat-070'],
      [13, 'feat-071'],
      [14, 'feat-071'],
      [15, 'feat-071'],
      [16, 'feat-071'],
    ]);
    for (const [number, featureId] of owners) {
      expect(registry.hexagrams.find(item => item.number === number)?.auditFeatureId).toBe(
        featureId,
      );
    }
  });
});
