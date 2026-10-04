import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { evaluateAuditGates, requireCompleteAudit } from '../scripts/audit-gates.mjs';
import { validateAuditLedgers } from '../scripts/audit-decisions.mjs';
import { computeAuditInputs } from '../scripts/audit-inputs.mjs';
import { createAuditSchemaValidator } from '../scripts/audit-schema.mjs';
import { validateAuditRegistry } from '../scripts/audit-registry.mjs';
import { canonicalize } from '../scripts/snapshot-identity.mjs';
import { auditContext, minimalRegistry } from './fixtures/audit-fixtures.mjs';

const readJson = relative => JSON.parse(readFileSync(new URL(relative, import.meta.url), 'utf8'));
const validateRegistrySchema = createAuditSchemaValidator(
  readJson('../schema/expected-units-v1.schema.json'),
  'expected registry schema',
);
const validateLedgerSchema = createAuditSchemaValidator(
  readJson('../schema/audit-ledger-v1.schema.json'),
  'audit ledger schema',
);
const validateCertificationSchema = createAuditSchemaValidator(
  readJson('../schema/audit-certification-v1.schema.json'),
  'audit certification schema',
);

describe('evidence-derived audit gates', () => {
  it('keeps empty actual-like registry and ledger inputs closed', () => {
    const { context } = auditContext();
    const registry = minimalRegistry();
    const gates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [] },
      context,
    });
    expect(gates.complete).toBe(false);
    expect(gates.sourceReview).toBe(false);
    expect(gates.certification).toBe(false);
    expect(() => requireCompleteAudit(gates)).toThrow(/closed/);
  });

  it('requires roster/discovery closure independently of mapped unit rows', () => {
    const { context } = auditContext();
    const registry = minimalRegistry({ resolved: true });
    const gates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [] },
      context,
    });
    expect(gates.sourceReview).toBe(false);
    expect(gates.totals).toMatchObject({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
    });
  });

  it('does not count unrelated accepted targets toward released claim coverage', () => {
    const { context } = auditContext();
    const registry = minimalRegistry({ resolved: true });
    const gates = evaluateAuditGates({
      registry,
      ledgerState: {
        errors: [],
        current: [
          {
            target: { kind: 'sourceunit', id: 'unrelated' },
            decision: {
              id: 'synthetic-decision',
              disposition: 'accepted',
              coveredClaimIds: [],
              layerResolution: { status: 'resolved', layers: [{ layerId: 'layer-test' }] },
              specialistReview: { status: 'approved' },
            },
            inputState: { current: true, stale: [] },
          },
        ],
      },
      context,
    });
    expect(gates.sourceReview).toBe(false);
    expect(gates.totals.releasedClaimsCovered).toBe(0);
    expect(gates.totals.releasedClaimsRequired).toBe(2);
  });

  it('rejects stale certification binding and malformed certification metadata', () => {
    const { context } = auditContext();
    const registry = minimalRegistry({ resolved: true });
    context.registry = registry;
    context.contentSnapshotIdentity = `liuyao-knowledge-snapshot-v1:sha256:${'a'.repeat(64)}`;
    context.decisionSetSha256 = 'c'.repeat(64);
    const base = {
      contentSnapshotIdentity: context.contentSnapshotIdentity,
      registry: { sha256: 'b'.repeat(64), revision: registry.registryRevision },
      decisionSetSha256: context.decisionSetSha256,
      specialistReview: {
        reviewerName: 'Synthetic',
        reviewerRole: 'Synthetic',
        reviewedAt: '2026-10-04T00:00:00Z',
        scope: 'fixture',
        decision: 'approved',
      },
    };
    const stale = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [] },
      context,
      certification: { ...base, decisionSetSha256: 'd'.repeat(64) },
    });
    expect(stale.certification).toBe(false);
    const malformed = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [] },
      context,
      certification: { ...base, decisionSetSha256: 'bad' },
    });
    expect(malformed.errors.join('\n')).toMatch(/Malformed audit certification/);
  });

  it('opens source review with complete source evidence before specialist approval', async () => {
    const { context } = auditContext();
    const { registry, ledgerState, certification } = await completeValidatedSyntheticAudit(context);
    const gates = evaluateAuditGates({ registry, ledgerState, context, certification });
    expect(gates.sourceReview).toBe(true);
    expect(gates.independentUnitApprovals).toBe(false);
    expect(gates.certification).toBe(false);
    expect(gates.complete).toBe(false);
    expect(gates.totals.sourceComparedDecisions).toBeGreaterThan(gates.totals.acceptedDecisions);
    expect(gates.totals.approvedDecisions).toBe(0);
    expect(gates.totals.releasedClaimsCovered).toBe(0);

    const approved = approveSyntheticDecisions(ledgerState);
    const approvedState = { ...ledgerState, current: approved };
    approvedState.decisionSetSha256 = createHash('sha256')
      .update(JSON.stringify(canonicalize(approved.map(item => item.decision))))
      .digest('hex');
    context.decisionSetSha256 = approvedState.decisionSetSha256;
    const certificationForApproved = makeSyntheticCertification(context, registry, approvedState);
    expect(validateCertificationSchema(certificationForApproved).valid).toBe(true);
    const approvedGates = evaluateAuditGates({
      registry,
      ledgerState: approvedState,
      context,
      certification: certificationForApproved,
    });
    expect(approvedGates.sourceReview).toBe(true);
    expect(approvedGates.independentUnitApprovals).toBe(true);
    expect(approvedGates.certification).toBe(true);
    expect(approvedGates.complete).toBe(true);
  }, 20_000);

  it('keeps layer, discovery, and specialist rejection semantics separate', async () => {
    const { context } = auditContext();
    const { registry, ledgerState } = await completeValidatedSyntheticAudit(context);
    const pendingGates = evaluateAuditGates({ registry, ledgerState, context });
    expect(pendingGates.sourceReview).toBe(true);
    expect(pendingGates.independentUnitApprovals).toBe(false);

    const unresolvedLayer = structuredClone(ledgerState);
    const layerDecision = unresolvedLayer.current.find(item => item.target.kind === 'cell');
    layerDecision.decision.layerResolution.layers = [];
    const layerGates = evaluateAuditGates({ registry, ledgerState: unresolvedLayer, context });
    expect(layerGates.sourceReview).toBe(false);

    const unresolvedDiscovery = structuredClone(registry);
    unresolvedDiscovery.groups[0].discoveryStatus = 'unresolved';
    const discoveryGates = evaluateAuditGates({
      registry: unresolvedDiscovery,
      ledgerState,
      context,
    });
    expect(discoveryGates.sourceReview).toBe(false);

    const rejected = structuredClone(ledgerState);
    const rejectedDecision = rejected.current.find(item => item.target.kind === 'cell').decision;
    rejectedDecision.specialistReview = {
      status: 'rejected',
      reviewerName: 'Synthetic specialist',
      reviewerRole: 'Synthetic',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'synthetic test',
      note: 'Synthetic rejection for gate behavior',
    };
    const rejectedGates = evaluateAuditGates({ registry, ledgerState: rejected, context });
    expect(rejectedGates.sourceReview).toBe(true);
    expect(rejectedGates.independentUnitApprovals).toBe(false);
    expect(rejectedGates.rejected).toContainEqual(
      expect.objectContaining({ reason: 'specialist-rejected' }),
    );
  }, 20000);

  it('counts a source-compared released claim separately from specialist approval', async () => {
    const { context, owner } = auditContext();
    const record = structuredClone(owner);
    record.claims[0].dependsOnClaimIds = [];
    context.manifest.releaseIds = [record.id];
    context.records = [record];
    const registry = completeSyntheticRegistryForAuthoredRecord(record);
    registry.groups = [];
    registry.counts.groups = 0;
    const target = { kind: 'record', id: record.id };
    const targets = [];
    for (const hexagram of registry.hexagrams)
      for (const book of hexagram.books)
        for (const cell of hexagram.requiredCells)
          targets.push({
            kind: 'cell',
            hexagramId: hexagram.id,
            editionId: book.editionId,
            cell,
          });
    for (const special of registry.specialPassages)
      targets.push({ kind: 'special', id: special.id });
    targets.push(target);
    for (const figure of record.figures ?? [])
      targets.push({ kind: 'figure', id: figure.id, ownerId: record.id, childId: figure.id });
    const current = await Promise.all(
      targets.map(async (currentTarget, index) => ({
        target: currentTarget,
        decision:
          currentTarget.kind === 'record' || currentTarget.kind === 'figure'
            ? makeRecordDecision(
                record,
                (await computeAuditInputs(context, ['claim-owner'], { target: currentTarget }))
                  .inputs,
                currentTarget,
              )
            : {
                id: `decision-cell-${index}`,
                disposition: 'accepted',
                coveredClaimIds: [],
                layerResolution: {
                  status: 'resolved',
                  layers: [{ layerId: 'layer-test' }],
                },
                specialistReview: {
                  status: 'pending',
                  reviewerName: null,
                  reviewerRole: null,
                  reviewedAt: null,
                  scope: 'synthetic',
                  note: '',
                },
              },
        inputState: { current: true, stale: [] },
      })),
    );
    const gates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current },
      context,
    });
    expect(gates.sourceReview).toBe(true);
    expect(gates.totals.releasedClaimsRequired).toBe(1);
    expect(gates.totals.releasedClaimsCovered).toBe(gates.totals.releasedClaimsRequired);
    expect(gates.independentUnitApprovals).toBe(false);
    expect(gates.totals.approvedDecisions).toBe(0);

    const claimTarget = current.find(item => item.target.kind === 'record');
    claimTarget.decision.coveredClaimIds = [];
    const uncovered = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current },
      context,
    });
    expect(uncovered.sourceReview).toBe(false);
    expect(claimTarget.decision.coveredClaimIds).toEqual([]);
  }, 20000);

  it('rejects a source target with declared current authored record mappings under none scope', async () => {
    const { context } = auditContext();
    const registry = minimalRegistry({ resolved: true });
    const decision = {
      id: 'decision-none-mapped',
      target: { kind: 'sourceunit', id: 'source-unit-test' },
      revision: 1,
      supersedes: null,
      disposition: 'unresolved',
      findings: '',
      locator: {
        citationIds: ['citation-owner'],
        editionId: 'edition-test',
        pdfPages: [1, 2],
      },
      coveredClaimIds: [],
      layerResolution: { status: 'unresolved', layers: [] },
      exclusionReview: null,
      sourceComparison: {
        identity: 'Comparison',
        reviewer: 'Reviewer',
        date: '2026-10-04',
        scope: 'Test',
        evidenceCitationIds: ['citation-owner'],
      },
      specialistReview: {
        status: 'pending',
        reviewerName: null,
        reviewerRole: null,
        reviewedAt: null,
        scope: 'Pending',
        note: '',
      },
      authoredScope: 'none',
      inputs: { records: [], citations: [], editions: [], projectContracts: [], fixtures: [] },
      recordedAt: '2026-10-04T00:00:00Z',
      recordedBy: 'Test runner',
    };
    const state = await validateAuditLedgers(
      [
        {
          schemaVersion: 1,
          ledgerId: 'ledger-none-mapped',
          scope: { kind: 'group', id: 'source-unit-test' },
          decisions: [decision],
        },
      ],
      registry,
      context,
    );
    expect(state.errors.join('\n')).toMatch(/authoredScope none cannot target mapped records/);
  });

  it('validates a schema-complete synthetic registry and closes stale certification bindings', async () => {
    const { context } = auditContext();
    const { registry, ledgerState, certification, validation } =
      await completeValidatedSyntheticAudit(context);
    expect(validation.valid).toBe(true);
    expect(validateRegistrySchema(registry).valid).toBe(true);
    expect(
      validateLedgerSchema({
        schemaVersion: 1,
        ledgerId: 'ledger-synthetic-complete',
        scope: { kind: 'hexagram', id: 'hexagram-01' },
        decisions: ledgerState.decisions.map(({ decision }) => decision),
      }).valid,
    ).toBe(true);

    const staleRevision = structuredClone(certification);
    staleRevision.registry.revision += 1;
    expect(validateCertificationSchema(staleRevision).valid).toBe(true);
    const staleRevisionGates = evaluateAuditGates({
      registry,
      ledgerState,
      context,
      certification: staleRevision,
    });
    expect(staleRevisionGates.valid).toBe(true);
    expect(staleRevisionGates.certificationStatus).toBe('stale');
    expect(staleRevisionGates.complete).toBe(false);

    const staleSnapshot = structuredClone(certification);
    staleSnapshot.contentSnapshotIdentity = `liuyao-knowledge-snapshot-v1:sha256:${'f'.repeat(64)}`;
    const staleSnapshotGates = evaluateAuditGates({
      registry,
      ledgerState,
      context,
      certification: staleSnapshot,
    });
    expect(staleSnapshotGates.valid).toBe(true);
    expect(staleSnapshotGates.certificationStatus).toBe('stale');
  });

  it('reports unchanged actual-registry inventory floors and zero current decisions', () => {
    const registry = readJson('../../../docs/reviews/knowledge/expected-units.json');
    const inventoryBytes = readFileSync(
      new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
    );
    const manifest = readJson('../data/manifest.json');
    const sources = readJson(`../data/${manifest.sourceFile}`).sources;
    const citations = manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations);
    const records = manifest.recordFiles.map(file => readJson(`../data/${file}`));
    const validation = validateAuditRegistry(registry, {
      inventoryBytes,
      editionCatalog: new Map(
        sources.flatMap(source => source.editions.map(edition => [edition.id, edition])),
      ),
      sourceIds: new Set(sources.map(source => source.id)),
      citationIds: new Map(citations.map(citation => [citation.id, citation])),
      featureIds: new Set(readJson('../../../feature_index.json').features.map(item => item.id)),
      authoredRecordIds: new Set(manifest.recordFiles.map(file => readJson(`../data/${file}`).id)),
    });
    expect(validation.valid, validation.errors.join('\n')).toBe(true);
    expect(registry.counts).toMatchObject({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 518,
      exclusions: 17,
    });
    expect(registry.layers.every(layer => layer.rosterStatus === 'unresolved')).toBe(true);
    expect(registry.groups.every(group => group.discoveryStatus === 'unresolved')).toBe(true);
    const { context } = auditContext();
    const actualGates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [] },
      context: { ...context, records, manifest: { ...manifest, releaseIds: [] } },
    });
    expect(actualGates.sourceReview).toBe(false);
    expect(actualGates.totals.sourceComparedDecisions).toBe(0);
    expect(actualGates.totals.acceptedDecisions).toBe(0);
  });
});

async function completeValidatedSyntheticAudit(context) {
  const registry = readJson('../../../docs/reviews/knowledge/expected-units.json');
  registry.layers.forEach(layer => (layer.rosterStatus = 'resolved'));
  registry.groups.forEach(group => (group.discoveryStatus = 'resolved'));
  registry.groups.forEach(group => delete group.recordIds);
  const inventoryBytes = readFileSync(
    new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
  );
  const manifest = readJson('../data/manifest.json');
  const sources = readJson(`../data/${manifest.sourceFile}`).sources;
  const citations = manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations);
  const records = manifest.recordFiles.map(file => readJson(`../data/${file}`));
  const validation = validateAuditRegistry(registry, {
    inventoryBytes,
    editionCatalog: new Map(
      sources.flatMap(source => source.editions.map(edition => [edition.id, edition])),
    ),
    sourceIds: new Set(sources.map(source => source.id)),
    citationIds: new Map(citations.map(citation => [citation.id, citation])),
    featureIds: new Set(readJson('../../../feature_index.json').features.map(item => item.id)),
    authoredRecordIds: new Set(records.map(record => record.id)),
  });
  expect(validation.valid, validation.errors.join('\n')).toBe(true);
  expect(validateRegistrySchema(registry).valid).toBe(true);

  Object.assign(context, {
    manifest: { ...manifest, releaseIds: [], projectContracts: [] },
    records: [],
    citations,
    sources,
    fixtureBindings: [],
    fixtureBytes: {},
    syntheticInput: true,
    registry,
    contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'a'.repeat(64)}`,
  });

  const targets = [];
  for (const hexagram of registry.hexagrams)
    for (const book of hexagram.books)
      for (const cell of hexagram.requiredCells)
        targets.push({
          target: { kind: 'cell', hexagramId: hexagram.id, editionId: book.editionId, cell },
          scope: { kind: 'hexagram', id: hexagram.id },
          editionId: book.editionId,
          pdfPages: [book.pdfPageStart, book.pdfPageEnd],
          layerIds: book.layerScopeIds,
        });
  for (const special of registry.specialPassages) {
    const book = registry.hexagrams
      .find(item => item.id === special.hexagramId)
      .books.find(item => item.editionId === special.editionId);
    targets.push({
      target: { kind: 'special', id: special.id },
      scope: { kind: 'hexagram', id: special.hexagramId },
      editionId: special.editionId,
      pdfPages: [special.pdfPageStart, special.pdfPageEnd],
      layerIds: special.layerScopeIds,
      parentBook: book,
    });
  }
  for (const group of registry.groups)
    targets.push({
      target: { kind: 'sourceunit', id: group.id },
      scope: { kind: 'group', id: group.id },
      editionId: group.editionId,
      pdfPages: [group.pdfPageStart, group.pdfPageEnd],
      layerIds: group.layerScopeIds,
    });
  for (const exclusion of registry.exclusions)
    targets.push({
      target: { kind: 'exclusion', id: exclusion.id },
      scope: { kind: 'group', id: exclusion.sourceUnitId },
      editionId: exclusion.editionId,
      pdfPages: null,
      layerIds: exclusion.layerScopeIds,
    });
  const ledgerByScope = new Map();
  let decisionNumber = 0;
  for (const item of targets) {
    const citation = citations.find(entry => entry.editionId === item.editionId);
    expect(citation, `citation for ${item.editionId}`).toBeDefined();
    const pdfPages = item.pdfPages ?? [
      citation.location.pdfPageStart,
      citation.location.pdfPageEnd,
    ];
    const locator = {
      citationIds: [citation.id],
      editionId: item.editionId,
      pdfPages,
    };
    const decision = {
      id: `decision-synthetic-${String(++decisionNumber).padStart(4, '0')}`,
      target: item.target,
      revision: 1,
      supersedes: null,
      disposition: item.target.kind === 'exclusion' ? 'excluded' : 'accepted',
      findings: 'Synthetic source-comparison fixture only.',
      locator,
      coveredClaimIds: [],
      layerResolution: {
        status: 'resolved',
        layers: item.layerIds.map(layerId => ({
          layerId,
          presence: 'present',
          citationIds: [citation.id],
          basis: 'inspected-page',
        })),
      },
      exclusionReview:
        item.target.kind === 'exclusion'
          ? {
              reason: 'Synthetic exclusion review fixture.',
              locator,
              scope: 'Synthetic schema and gate test only.',
              reviewer: 'Synthetic test reviewer',
            }
          : null,
      sourceComparison: {
        identity: 'Synthetic source-comparison fixture',
        reviewer: 'Synthetic source reviewer',
        date: '2026-10-04',
        scope: 'Synthetic schema and gate test only.',
        evidenceCitationIds: [citation.id],
      },
      specialistReview: {
        status: 'pending',
        reviewerName: null,
        reviewerRole: null,
        reviewedAt: null,
        scope: 'No real approval; synthetic gate test.',
        note: 'Pending by design.',
      },
      authoredScope: 'none',
      inputs: null,
      recordedAt: '2026-10-04T00:00:00Z',
      recordedBy: 'Synthetic test runner',
    };
    const currentInputs = await computeAuditInputs(context, [], {
      target: item.target,
      evidenceCitationIds: [citation.id],
      evidenceEditionIds: [item.editionId],
    });
    decision.inputs = currentInputs.inputs;
    const key = JSON.stringify(item.scope);
    const ledger = ledgerByScope.get(key) ?? {
      schemaVersion: 1,
      ledgerId: `ledger-synthetic-${item.scope.id}`,
      scope: item.scope,
      decisions: [],
    };
    ledger.decisions.push(decision);
    ledgerByScope.set(key, ledger);
  }

  const ledgers = [...ledgerByScope.values()];
  for (const ledger of ledgers)
    expect(
      validateLedgerSchema(ledger).valid,
      `${ledger.ledgerId}: ${JSON.stringify(validateLedgerSchema(ledger).errors)}`,
    ).toBe(true);
  const ledgerState = await validateAuditLedgers(ledgers, registry, context);
  expect(ledgerState.valid, ledgerState.errors.slice(0, 10).join('\n')).toBe(true);
  expect(ledgerState.current).toHaveLength(targets.length);
  ledgerState.contentSnapshotIdentity = context.contentSnapshotIdentity;
  context.decisionSetSha256 = ledgerState.decisionSetSha256;
  return {
    registry,
    ledgers,
    ledgerState,
    validation,
    certification: makeSyntheticCertification(context, registry, ledgerState),
  };
}

function completeSyntheticRegistryForAuthoredRecord(record) {
  const registry = minimalRegistry({ resolved: true });
  registry.groups = [];
  registry.counts.groups = 0;
  registry.hexagrams = [];
  registry.specialPassages = [];
  registry.counts.specialPassages = 6;
  const editions = ['edition-pbc-supplied', 'edition-ntt-supplied', 'edition-nhl-supplied'];
  for (let number = 1; number <= 64; number += 1) {
    const id = `hexagram-${String(number).padStart(2, '0')}`;
    registry.hexagrams.push({
      id,
      requiredCells: [
        'overview',
        'position-1',
        'position-2',
        'position-3',
        'position-4',
        'position-5',
        'position-6',
      ],
      books: editions.map(editionId => ({ editionId, layerScopeIds: ['layer-test'] })),
      recordIds: [],
    });
  }
  registry.groups.push({
    id: 'source-unit-test',
    kind: 'content',
    group: 'synthetic',
    editionId: 'edition-test',
    pdfPageStart: 1,
    pdfPageEnd: 1,
    authorFeatureId: 'feat-001',
    auditFeatureId: 'feat-002',
    layerScopeIds: ['layer-test'],
    discoveryStatus: 'resolved',
    recordIds: [record.id],
  });
  registry.counts.groups = 1;
  for (const number of [1, 2]) {
    const hexagramId = `hexagram-${String(number).padStart(2, '0')}`;
    for (const editionId of editions) {
      const prefix = editionId.split('-')[1];
      registry.specialPassages.push({
        id: `special-${prefix}-${hexagramId}`,
        editionId,
        layerScopeIds: ['layer-test'],
      });
    }
  }
  return registry;
}

function makeRecordDecision(record, inputs, target = { kind: 'record', id: record.id }) {
  const targetClaims = ['claim-owner'];
  return {
    id: `decision-${target.kind}-${target.childId ?? target.id}`,
    target,
    revision: 1,
    supersedes: null,
    disposition: 'accepted',
    findings: 'Synthetic record source comparison.',
    locator: {
      citationIds: ['citation-owner'],
      editionId: 'edition-test',
      pdfPages: [1, 1],
    },
    coveredClaimIds: targetClaims,
    layerResolution: {
      status: 'resolved',
      layers: [
        {
          layerId: 'layer-test',
          presence: 'present',
          citationIds: ['citation-owner'],
          basis: 'inspected-page',
        },
      ],
    },
    exclusionReview: null,
    sourceComparison: {
      identity: 'Synthetic source comparison',
      reviewer: 'Synthetic reviewer',
      date: '2026-10-04',
      scope: 'Synthetic test',
      evidenceCitationIds: ['citation-owner'],
    },
    specialistReview: {
      status: 'pending',
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      scope: 'Pending',
      note: '',
    },
    authoredScope: 'records',
    inputs,
    recordedAt: '2026-10-04T00:00:00Z',
    recordedBy: 'Synthetic test runner',
  };
}

function approveSyntheticDecisions(ledgerState) {
  for (const { decision } of ledgerState.current) {
    decision.specialistReview = {
      status: 'approved',
      reviewerName: 'Synthetic approved reviewer',
      reviewerRole: 'Synthetic test role',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'Synthetic gate behavior only.',
      note: 'Never represents actual approval.',
    };
  }
  return ledgerState.current;
}

function makeSyntheticCertification(context, registry, ledgerState) {
  return {
    schemaVersion: 1,
    contentSnapshotIdentity: context.contentSnapshotIdentity,
    registry: {
      sha256: createHash('sha256')
        .update(JSON.stringify(canonicalize(registry)))
        .digest('hex'),
      revision: registry.registryRevision,
    },
    decisionSetSha256: ledgerState.decisionSetSha256,
    specialistReview: {
      reviewerName: 'Synthetic certification reviewer',
      reviewerRole: 'Synthetic test role',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'Synthetic gate behavior only.',
      decision: 'approved',
    },
  };
}
