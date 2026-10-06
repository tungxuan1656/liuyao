import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import {
  evaluateAuditGates,
  listRequiredAuditTargets,
  requireCompleteAudit,
} from '../scripts/audit-gates.mjs';
import { validateAuditLedgers } from '../scripts/audit-decisions.mjs';
import { expectedLayersForTarget } from '../scripts/audit-targets.mjs';
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
const yieldToEventLoop = () => new Promise(resolve => setImmediate(resolve));

async function yieldBeforeGateEvaluation() {
  await yieldToEventLoop();
}

async function validateAuditLedgersYielding(ledgers, registry, context) {
  await yieldToEventLoop();
  const state = await validateAuditLedgers(ledgers, registry, context);
  await yieldToEventLoop();
  return state;
}

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

  it('indexes unexpected targets without rescanning the registry for each decision', () => {
    const { context } = auditContext();
    context.manifest.releaseIds = [];
    const registry = minimalRegistry({ resolved: true });
    registry.groups = Array.from({ length: 100 }, (_, index) => ({
      ...registry.groups[0],
      id: `source-unit-${index}`,
    }));
    registry.counts.groups = registry.groups.length;
    let idReads = 0;
    const unexpected = {
      target: {
        kind: 'sourceunit',
        get id() {
          idReads += 1;
          return 'unrelated';
        },
      },
    };
    const gates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [unexpected, unexpected] },
      context,
    });
    const reads = idReads;
    expect(gates.unexpectedCurrent).toEqual([unexpected, unexpected]);
    // Count key reads instead of asserting a machine-dependent runtime.
    expect(reads).toBeLessThan(20);
  });

  it('matches required target keys regardless of property order', () => {
    const { context } = auditContext();
    const registry = minimalRegistry({ resolved: true });
    const required = {
      target: { id: 'source-unit-test', kind: 'sourceunit' },
      decision: {
        id: 'decision-sourceunit',
        disposition: 'accepted',
        coveredClaimIds: [],
        layerResolution: { status: 'resolved', layers: [{ layerId: 'layer-test' }] },
        specialistReview: { status: 'pending' },
      },
      inputState: { current: true, stale: [] },
    };
    const gates = evaluateAuditGates({
      registry,
      ledgerState: { errors: [], current: [required] },
      context,
    });
    expect(gates.unexpectedCurrent).toEqual([]);
    expect(gates.accepted).toContainEqual({
      target: { kind: 'sourceunit', id: 'source-unit-test' },
      decisionId: 'decision-sourceunit',
    });
  });

  it('uses the same released lesson/prerequisite targets in gate and ledger validation', async () => {
    const { context, owner } = auditContext();
    owner.type = 'lesson';
    owner.blocks = [{ id: 'block-one', supportingClaimIds: ['claim-owner'] }];
    owner.prerequisiteLessonIds = ['lesson-prerequisite'];
    owner.claims[0].dependsOnClaimIds = [];
    owner.claims[0].citationIds = ['citation-support'];
    owner.review.evidenceClaimIds = [];
    const prerequisite = {
      schemaVersion: 2,
      id: 'lesson-prerequisite',
      type: 'lesson',
      title: 'Prerequisite',
      aliases: [],
      topicIds: ['topic-test'],
      claims: [
        {
          id: 'claim-prerequisite',
          kind: 'structural-fact',
          text: 'Prerequisite claim.',
          citationIds: ['citation-support'],
        },
      ],
      relatedIds: [],
      prerequisiteLessonIds: [],
      blocks: [{ id: 'prerequisite-block', supportingClaimIds: ['claim-prerequisite'] }],
      review: { status: 'reviewed', evidenceCitationIds: ['citation-support'] },
      rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
    };
    context.records.push(prerequisite);
    context.manifest.releaseIds.push(prerequisite.id);
    context.fixtureBindings = [];
    context.records[0].figures = [];
    const registry = minimalRegistry({ resolved: true });
    registry.groups[0].recordIds = ['article-owner', 'article-support', 'lesson-prerequisite'];
    const required = listRequiredAuditTargets(registry, context);
    expect(required.some(target => target.kind === 'record' && target.id === owner.id)).toBe(true);
    expect(required.some(target => target.kind === 'record' && target.id === prerequisite.id)).toBe(
      true,
    );
    expect(required).toContainEqual({
      kind: 'lesson',
      id: 'article-owner/block-one',
      ownerId: 'article-owner',
      childId: 'block-one',
    });
    expect(required).not.toContainEqual({
      kind: 'lesson',
      id: 'lesson-prerequisite',
      ownerId: 'lesson-prerequisite',
      childId: 'lesson-prerequisite',
    });
    const decisions = [];
    for (const target of required) {
      const isPrerequisite =
        (target.kind === 'record' && target.id === 'lesson-prerequisite') ||
        target.ownerId === 'lesson-prerequisite';
      const isSupportRecord = target.kind === 'record' && target.id === 'article-support';
      const coveredClaimIds =
        target.kind === 'sourceunit'
          ? ['claim-owner', 'claim-support', 'claim-prerequisite']
          : target.kind === 'record'
            ? isSupportRecord
              ? ['claim-support']
              : isPrerequisite
                ? ['claim-prerequisite']
                : ['claim-owner']
            : isPrerequisite
              ? ['claim-prerequisite']
              : ['claim-owner'];
      const inputResult = await computeAuditInputs(context, coveredClaimIds, {
        allowInMemoryFixtures: true,
        target,
        evidenceCitationIds: ['citation-owner', 'citation-support'],
        evidenceEditionIds: ['edition-test'],
      });
      const decision = makeRecordDecision(
        target.ownerId === 'lesson-prerequisite' ||
          (target.kind === 'record' && target.id === 'lesson-prerequisite')
          ? prerequisite
          : target.kind === 'record' && target.id === 'article-support'
            ? context.records.find(item => item.id === 'article-support')
            : owner,
        inputResult.inputs,
        target,
      );
      decision.id = `decision-required-target-${decisions.length}`;
      decision.coveredClaimIds = coveredClaimIds;
      const expectedLayers = expectedLayersForTarget(target, registry, context, coveredClaimIds);
      decision.layerResolution.layers = expectedLayers.map(layerId => ({
        layerId,
        presence: 'present',
        citationIds: ['citation-owner', 'citation-support'],
        basis: 'inspected-page',
      }));
      if (target.kind === 'record' && target.id === 'lesson-prerequisite') {
        decision.locator.citationIds = ['citation-support'];
        decision.locator.pdfPages = [2, 2];
      }
      if (target.kind === 'lesson' && target.ownerId === 'lesson-prerequisite') {
        decision.locator.citationIds = ['citation-support'];
        decision.locator.pdfPages = [2, 2];
      }
      decisions.push(decision);
    }
    const ledger = {
      schemaVersion: 1,
      ledgerId: 'ledger-lesson-block',
      scope: { kind: 'group', id: 'source-unit-test' },
      decisions,
    };
    expect(validateLedgerSchema(ledger).valid).toBe(true);
    const state = await validateAuditLedgers([ledger], registry, context);
    expect(state.errors).toEqual([]);
    expect(state.current).toHaveLength(required.length);
    expect(state.current.every(item => item.inputState.current)).toBe(true);

    const unsupportedLessonId = structuredClone(ledger);
    unsupportedLessonId.decisions.push({
      ...structuredClone(ledger.decisions[0]),
      id: 'decision-orphan-prerequisite-lesson',
      target: {
        kind: 'lesson',
        id: 'lesson-prerequisite',
        ownerId: 'lesson-prerequisite',
        childId: 'lesson-prerequisite',
      },
    });
    expect(
      (await validateAuditLedgers([unsupportedLessonId], registry, context)).errors.join('\n'),
    ).toMatch(/unknown or retired audit target/);
  });

  it('validates exact child layer closure for records, figures, tables, lesson blocks, and fixtures', async () => {
    const { context, owner } = auditContext();
    context.manifest.releaseIds = [owner.id];
    owner.type = 'lesson';
    owner.blocks = [{ id: 'block-one', supportingClaimIds: ['claim-owner'] }];
    owner.tables = [
      { id: 'table-owner', kind: 'coin-outcomes', claimIds: ['claim-owner'], rows: [] },
    ];
    owner.figures.push({
      id: 'figure-empty',
      kind: 'plate',
      title: 'Synthetic unsupported child',
      sourceUnitIds: [],
      labels: [],
      claimIds: [],
      inspectionStatus: 'uninspected',
    });
    const registry = minimalRegistry({ resolved: true });
    registry.layers.push({
      id: 'layer-owner-unrelated',
      editionId: 'edition-owner-only',
      class: 'author-commentary',
      label: 'Unrelated owner group layer',
      sourceAnchor: { inventoryAnchor: 'synthetic', citationIds: [] },
      rosterStatus: 'resolved',
    });
    registry.groups[0].layerScopeIds = ['layer-owner-unrelated'];
    owner.figures[0].sourceUnitIds = [];
    owner.tables[0].sourceUnitIds = [];
    context.fixtureBindings = [
      { claimId: 'claim-owner', ownerId: owner.id, path: 'tests/fixtures/figure-expected.json' },
    ];
    owner.expectedFixtures = [
      { path: 'tests/fixtures/figure-expected.json', claimId: 'claim-owner' },
    ];
    context.fixtureBytes = {
      'tests/fixtures/figure-expected.json': Buffer.from('synthetic fixture'),
    };
    const noUnitFigure = {
      kind: 'figure',
      id: 'figure-owner',
      ownerId: owner.id,
      childId: 'figure-owner',
    };
    const targets = [
      { kind: 'record', id: owner.id },
      noUnitFigure,
      { kind: 'table', id: 'table-owner', ownerId: owner.id, childId: 'table-owner' },
      { kind: 'lesson', id: `${owner.id}/block-one`, ownerId: owner.id, childId: 'block-one' },
      {
        kind: 'fixture',
        id: 'tests/fixtures/figure-expected.json',
        ownerId: owner.id,
        childId: 'claim-owner',
      },
    ];
    expect(expectedLayersForTarget(noUnitFigure, registry, context, ['claim-owner'])).toEqual([
      'layer-test',
    ]);
    owner.figures[0].sourceUnitIds = ['source-unit-test'];
    owner.tables[0].sourceUnitIds = ['source-unit-test'];
    const withUnitFigure = { ...noUnitFigure, childId: 'figure-owner' };
    targets.push(withUnitFigure);
    for (const target of targets) {
      const inputs = await computeAuditInputs(context, ['claim-owner'], {
        allowInMemoryFixtures: true,
        target,
        evidenceCitationIds: ['citation-owner'],
        evidenceEditionIds: ['edition-test'],
      });
      const decision = makeRecordDecision(owner, inputs.inputs, target);
      decision.id = `decision-child-scope-${targets.indexOf(target)}`;
      const expected = expectedLayersForTarget(target, registry, context, ['claim-owner']);
      decision.layerResolution.layers = expected.map(layerId => ({
        layerId,
        presence: 'present',
        citationIds: ['citation-owner'],
        basis: 'inspected-page',
      }));
      expect(expected.length, target.id).toBeGreaterThan(0);
      const state = await validateAuditLedgers(
        [
          {
            schemaVersion: 1,
            ledgerId: `ledger-child-scope-${targets.indexOf(target)}`,
            scope: { kind: 'group', id: 'source-unit-test' },
            decisions: [decision],
          },
        ],
        registry,
        context,
      );
      expect(state.errors, `${target.kind}: ${state.errors.join('; ')}`).toEqual([]);
      expect(state.current[0].inputState).toEqual({ current: true, stale: [] });
      const gates = evaluateAuditGates({ registry, ledgerState: state, context });
      expect(
        gates.unresolved.some(
          item =>
            JSON.stringify(canonicalize(item.target)) === JSON.stringify(canonicalize(target)) &&
            item.reason === 'unresolved-layers',
        ),
        `${target.kind} layer closure should not be unresolved`,
      ).toBe(false);
    }
    expect(
      expectedLayersForTarget(
        { kind: 'figure', id: 'figure-empty', ownerId: owner.id, childId: 'figure-empty' },
        registry,
        context,
        [],
      ),
    ).toEqual(['layer-owner-unrelated']);
    const emptyScopeContext = structuredClone(context);
    emptyScopeContext.records[0].claims[0].citationIds = [];
    emptyScopeContext.records[0].claims[0].dependsOnClaimIds = [];
    emptyScopeContext.records[0].figures[0].sourceUnitIds = [];
    registry.groups[0].recordIds = [];
    const unsupportedChild = { ...noUnitFigure };
    expect(
      expectedLayersForTarget(unsupportedChild, registry, emptyScopeContext, ['claim-owner']),
    ).toEqual([]);
    const unsupportedInputs = await computeAuditInputs(emptyScopeContext, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: unsupportedChild,
      evidenceCitationIds: ['citation-owner'],
      evidenceEditionIds: ['edition-test'],
    });
    const unsupportedDecision = makeRecordDecision(
      emptyScopeContext.records[0],
      unsupportedInputs.inputs,
      unsupportedChild,
    );
    unsupportedDecision.id = 'decision-empty-layer-closure';
    unsupportedDecision.coveredClaimIds = ['claim-owner'];
    unsupportedDecision.layerResolution = { status: 'resolved', layers: [] };
    const unsupportedState = await validateAuditLedgers(
      [
        {
          schemaVersion: 1,
          ledgerId: 'ledger-empty-layer-closure',
          scope: { kind: 'group', id: 'source-unit-test' },
          decisions: [unsupportedDecision],
        },
      ],
      registry,
      emptyScopeContext,
    );
    expect(unsupportedState.errors.join('\n')).toMatch(/empty layer scope is not proof/);
    expect(expectedLayersForTarget(withUnitFigure, registry, context, ['claim-owner'])).toEqual([
      'layer-owner-unrelated',
      'layer-test',
    ]);
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

  it('opens completion after separate AI review without human specialist approval', async () => {
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

    const approved = await approveSyntheticDecisions(ledgerState);
    for (const { decision } of approved) {
      decision.specialistReview.reviewerName = 'fixture-provider/fixture-model (review-run-2)';
      decision.specialistReview.reviewerRole = 'AI verification reviewer';
      decision.specialistReview.note = 'Synthetic separate AI review; no human approval.';
    }
    expect(
      validateLedgerSchema({
        schemaVersion: 1,
        ledgerId: 'ledger-ai-fixture',
        scope: { kind: 'hexagram', id: 'hexagram-01' },
        decisions: [approved[0].decision],
      }).valid,
    ).toBe(true);
    const approvedState = { ...ledgerState, current: approved };
    approvedState.decisionSetSha256 = createHash('sha256')
      .update(JSON.stringify(canonicalize(approved.map(item => item.decision))))
      .digest('hex');
    context.decisionSetSha256 = approvedState.decisionSetSha256;
    const certificationForApproved = await makeSyntheticCertification(
      context,
      registry,
      approvedState,
    );
    certificationForApproved.specialistReview.reviewerName =
      'fixture-provider/fixture-model (certification-run-3)';
    certificationForApproved.specialistReview.reviewerRole = 'AI verification coordinator';
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

  it('opens every validated gate for a covered released claim without real approval or certification', async () => {
    const { context } = auditContext();
    const { registry, ledgers, validation } = await completeValidatedSyntheticAudit(context);
    const record = readJson('../data/trigrams/trigram-heaven.json');
    const manifest = readJson('../data/manifest.json');
    const sources = readJson(`../data/${manifest.sourceFile}`).sources;
    const citations = manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations);
    const inventoryBytes = readFileSync(
      new URL('../../../docs/reviews/knowledge/source-inventory.md', import.meta.url),
    );
    const group = registry.groups.find(item => item.id === 'bpct-part1-ch01');
    group.recordIds = [record.id];
    context.records = [record];
    context.manifest = { ...manifest, releaseIds: [record.id], projectContracts: [] };
    expect(validateRegistrySchema(registry).valid).toBe(true);
    await yieldToEventLoop();
    const mappedRegistryValidation = validateAuditRegistry(registry, {
      inventoryBytes,
      editionCatalog: new Map(
        sources.flatMap(source => source.editions.map(edition => [edition.id, edition])),
      ),
      sourceIds: new Set(sources.map(source => source.id)),
      citationIds: new Map(citations.map(citation => [citation.id, citation])),
      featureIds: new Set(readJson('../../../feature_index.json').features.map(item => item.id)),
      authoredRecordIds: new Set(manifest.recordFiles.map(file => readJson(`../data/${file}`).id)),
    });
    expect(mappedRegistryValidation.valid, mappedRegistryValidation.errors.join('\n')).toBe(true);
    await yieldToEventLoop();
    const sourceTarget = { kind: 'sourceunit', id: group.id };
    const releasedClaimIds = record.claims.map(claim => claim.id);
    const sourceInputs = await computeAuditInputs(context, releasedClaimIds, {
      allowInMemoryFixtures: true,
      target: sourceTarget,
      evidenceCitationIds: ['citation-bpct-p10-11-technical'],
      evidenceEditionIds: ['edition-bpct-supplied'],
    });
    const sourceDecision = makeRecordDecision(record, sourceInputs.inputs, sourceTarget);
    sourceDecision.id = 'decision-covered-sourceunit';
    sourceDecision.target = sourceTarget;
    sourceDecision.coveredClaimIds = releasedClaimIds;
    sourceDecision.layerResolution.layers = group.layerScopeIds.map(layerId => ({
      layerId,
      presence: 'present',
      citationIds: ['citation-bpct-p10-11-technical'],
      basis: 'inspected-page',
    }));
    sourceDecision.locator = {
      citationIds: ['citation-bpct-p10-11-technical'],
      editionId: 'edition-bpct-supplied',
      pdfPages: [10, 11],
    };
    sourceDecision.sourceComparison.evidenceCitationIds = ['citation-bpct-p10-11-technical'];
    await yieldToEventLoop();
    const targetLedger = ledgers.find(
      ledger => ledger.scope.kind === 'group' && ledger.scope.id === group.id,
    );
    targetLedger.decisions = targetLedger.decisions.filter(
      decision =>
        JSON.stringify(canonicalize(decision.target)) !==
        JSON.stringify(canonicalize(sourceTarget)),
    );
    targetLedger.decisions.push(sourceDecision);

    const recordTarget = { kind: 'record', id: record.id };
    const recordInput = await computeAuditInputs(context, releasedClaimIds, {
      allowInMemoryFixtures: true,
      target: recordTarget,
      evidenceCitationIds: ['citation-bpct-p10-11-technical'],
      evidenceEditionIds: ['edition-bpct-supplied'],
    });
    await yieldToEventLoop();
    const recordDecision = makeRecordDecision(record, recordInput.inputs, recordTarget);
    recordDecision.id = 'decision-covered-record';
    recordDecision.coveredClaimIds = releasedClaimIds;
    recordDecision.locator = sourceDecision.locator;
    recordDecision.sourceComparison.evidenceCitationIds = ['citation-bpct-p10-11-technical'];
    recordDecision.layerResolution.layers = expectedLayersForTarget(
      recordTarget,
      registry,
      context,
      releasedClaimIds,
    ).map(layerId => ({
      layerId,
      presence: 'present',
      citationIds: ['citation-bpct-p10-11-technical'],
      basis: 'inspected-page',
    }));
    recordDecision.inputs = recordInput.inputs;
    let recordLedger = ledgers.find(
      ledger => ledger.scope.kind === 'group' && ledger.scope.id === group.id,
    );
    if (!recordLedger) {
      recordLedger = {
        schemaVersion: 1,
        ledgerId: `ledger-synthetic-${group.id}`,
        scope: { kind: 'group', id: group.id },
        decisions: [],
      };
      ledgers.push(recordLedger);
    }
    recordLedger.decisions.push(recordDecision);

    const allTargets = listRequiredAuditTargets(registry, context);
    const targetKeys = new Set(allTargets.map(target => JSON.stringify(canonicalize(target))));
    const deduplicated = ledgers
      .map(ledger => ({
        ...ledger,
        decisions: ledger.decisions.filter(decision =>
          targetKeys.has(JSON.stringify(canonicalize(decision.target))),
        ),
      }))
      .filter(ledger => ledger.decisions.length);
    const validated = await validateAuditLedgers(deduplicated, registry, context);
    await yieldToEventLoop();
    expect(validated.valid, validated.errors.slice(0, 10).join('\n')).toBe(true);
    expect(validateLedgerSchema(targetLedger).valid).toBe(true);
    expect(validation.valid).toBe(true);
    await yieldBeforeGateEvaluation();
    const gates = evaluateAuditGates({ registry, ledgerState: validated, context });
    const pendingGates = gates;
    expect(pendingGates.sourceReview).toBe(true);
    expect(pendingGates.independentUnitApprovals).toBe(false);
    expect(pendingGates.certification).toBe(false);
    expect(pendingGates.complete).toBe(false);
    expect(gates.sourceReview).toBe(true);
    expect(gates.totals.releasedClaimsRequired).toBe(2);
    expect(gates.totals.releasedClaimsCovered).toBe(2);
    expect(gates.independentUnitApprovals).toBe(false);
    expect(gates.certification).toBe(false);
    expect(gates.complete).toBe(false);
    await yieldToEventLoop();
    let approvalsUpdated = 0;
    for (const ledger of deduplicated)
      for (const decision of ledger.decisions) {
        decision.specialistReview = {
          status: 'approved',
          reviewerName: 'Synthetic independent reviewer',
          reviewerRole: 'Synthetic test role',
          reviewedAt: '2026-10-04T00:00:00Z',
          scope: 'Synthetic gate test only; not an actual approval.',
          note: 'In-memory test evidence only.',
        };
        approvalsUpdated += 1;
        if (approvalsUpdated % 64 === 0) await yieldToEventLoop();
      }
    const approvedState = await validateAuditLedgers(deduplicated, registry, context);
    await yieldToEventLoop();
    expect(approvedState.valid, approvedState.errors.slice(0, 10).join('\n')).toBe(true);
    context.decisionSetSha256 = approvedState.decisionSetSha256;
    const certification = await makeSyntheticCertification(context, registry, approvedState);
    expect(validateCertificationSchema(certification).valid).toBe(true);
    await yieldBeforeGateEvaluation();
    const completeGates = evaluateAuditGates({
      registry,
      ledgerState: approvedState,
      context,
      certification,
    });
    expect(completeGates.independentUnitApprovals).toBe(true);
    expect(completeGates.certification).toBe(true);
    expect(completeGates.sourceReview).toBe(true);
    expect(completeGates.complete).toBe(true);
    await yieldToEventLoop();

    const approvedRecordDecision = approvedState.current.find(
      item => item.target.kind === 'record',
    ).decision;
    const coveredRecordClaimIds = approvedRecordDecision.coveredClaimIds;
    approvedRecordDecision.coveredClaimIds = [];
    await yieldBeforeGateEvaluation();
    expect(
      evaluateAuditGates({ registry, ledgerState: approvedState, context, certification }).complete,
    ).toBe(false);
    approvedRecordDecision.coveredClaimIds = coveredRecordClaimIds;

    const recordLayerResolution = approvedRecordDecision.layerResolution;
    approvedRecordDecision.layerResolution = { status: 'resolved', layers: [] };
    await yieldBeforeGateEvaluation();
    expect(
      evaluateAuditGates({ registry, ledgerState: approvedState, context, certification }).complete,
    ).toBe(false);
    approvedRecordDecision.layerResolution = recordLayerResolution;
    const staleCertification = structuredClone(certification);
    staleCertification.decisionSetSha256 = 'f'.repeat(64);
    await yieldToEventLoop();
    await yieldBeforeGateEvaluation();
    expect(
      evaluateAuditGates({
        registry,
        ledgerState: approvedState,
        context,
        certification: staleCertification,
      }).complete,
    ).toBe(false);
  }, 45_000);

  it('keeps layer, discovery, and specialist rejection semantics separate', async () => {
    const { context } = auditContext();
    const { registry, ledgerState } = await completeValidatedSyntheticAudit(context);
    await yieldToEventLoop();
    const pendingGates = evaluateAuditGates({ registry, ledgerState, context });
    await yieldToEventLoop();
    expect(pendingGates.sourceReview).toBe(true);
    expect(pendingGates.independentUnitApprovals).toBe(false);

    const unresolvedLayer = structuredClone(ledgerState);
    const layerDecision = unresolvedLayer.current.find(item => item.target.kind === 'cell');
    layerDecision.decision.layerResolution.layers = [];
    const layerGates = evaluateAuditGates({
      registry,
      ledgerState: unresolvedLayer,
      context,
    });
    expect(layerGates.sourceReview).toBe(false);
    await yieldToEventLoop();

    const unresolvedDiscovery = structuredClone(registry);
    unresolvedDiscovery.groups[0].discoveryStatus = 'unresolved';
    const discoveryGates = evaluateAuditGates({
      registry: unresolvedDiscovery,
      ledgerState,
      context,
    });
    expect(discoveryGates.sourceReview).toBe(false);
    await yieldToEventLoop();

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
    const rejectedGates = evaluateAuditGates({
      registry,
      ledgerState: rejected,
      context,
    });
    expect(rejectedGates.sourceReview).toBe(true);
    expect(rejectedGates.independentUnitApprovals).toBe(false);
    expect(rejectedGates.rejected).toContainEqual(
      expect.objectContaining({ reason: 'specialist-rejected' }),
    );
    await yieldToEventLoop();
  }, 60_000);

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
    await yieldToEventLoop();
    await yieldToEventLoop();
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
    await yieldBeforeGateEvaluation();
    const staleRevisionGates = evaluateAuditGates({
      registry,
      ledgerState,
      context,
      certification: staleRevision,
    });
    await yieldToEventLoop();
    expect(staleRevisionGates.valid).toBe(true);
    expect(staleRevisionGates.certificationStatus).toBe('stale');
    expect(staleRevisionGates.complete).toBe(false);

    const staleSnapshot = structuredClone(certification);
    staleSnapshot.contentSnapshotIdentity = `liuyao-knowledge-snapshot-v1:sha256:${'f'.repeat(64)}`;
    await yieldBeforeGateEvaluation();
    const staleSnapshotGates = evaluateAuditGates({
      registry,
      ledgerState,
      context,
      certification: staleSnapshot,
    });
    await yieldToEventLoop();
    expect(staleSnapshotGates.valid).toBe(true);
    expect(staleSnapshotGates.certificationStatus).toBe('stale');
  }, 25_000);

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
      groups: 1630,
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

let syntheticAuditFixture;

async function completeValidatedSyntheticAudit(context) {
  if (!syntheticAuditFixture) {
    const { context: fixtureContext } = auditContext();
    syntheticAuditFixture = {
      ...(await buildValidatedSyntheticAudit(fixtureContext)),
      context: fixtureContext,
    };
  }
  // Keep the validated corpus baseline private; every scenario mutates its own clone.
  const fixture = structuredClone(syntheticAuditFixture);
  Object.assign(context, fixture.context);
  return fixture;
}

async function buildValidatedSyntheticAudit(context) {
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
  await yieldToEventLoop();

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
    if (decisionNumber % 64 === 0) await yieldToEventLoop();
  }

  const ledgers = [...ledgerByScope.values()];
  for (let index = 0; index < ledgers.length; index += 1) {
    const ledger = ledgers[index];
    expect(
      validateLedgerSchema(ledger).valid,
      `${ledger.ledgerId}: ${JSON.stringify(validateLedgerSchema(ledger).errors)}`,
    ).toBe(true);
    if ((index + 1) % 64 === 0) await yieldToEventLoop();
  }
  const ledgerState = await validateAuditLedgersYielding(ledgers, registry, context);
  expect(ledgerState.valid, ledgerState.errors.slice(0, 10).join('\n')).toBe(true);
  expect(ledgerState.current).toHaveLength(targets.length);
  ledgerState.contentSnapshotIdentity = context.contentSnapshotIdentity;
  context.decisionSetSha256 = ledgerState.decisionSetSha256;
  return {
    registry,
    ledgers,
    ledgerState,
    validation,
    certification: await makeSyntheticCertification(context, registry, ledgerState),
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

async function approveSyntheticDecisions(ledgerState) {
  for (let index = 0; index < ledgerState.current.length; index += 1) {
    const { decision } = ledgerState.current[index];
    decision.specialistReview = {
      status: 'approved',
      reviewerName: 'Synthetic approved reviewer',
      reviewerRole: 'Synthetic test role',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'Synthetic gate behavior only.',
      note: 'Never represents actual approval.',
    };
    if ((index + 1) % 64 === 0) await yieldToEventLoop();
  }
  return ledgerState.current;
}

async function makeSyntheticCertification(context, registry, ledgerState) {
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
