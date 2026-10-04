import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';
import { createAuditSchemaValidator } from './audit-schema.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const certificationSchema = JSON.parse(
  readFileSync(path.join(packageRoot, 'schema/audit-certification-v1.schema.json'), 'utf8'),
);
const validateCertificationShape = createAuditSchemaValidator(
  certificationSchema,
  'audit-certification-v1 schema',
);
const hash = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');
const targetKey = target => JSON.stringify(canonicalize(target));

/** Resolve inventory obligations, current decisions, claim coverage, and optional certification. */
export function evaluateAuditGates({ registry, ledgerState, context, certification = null }) {
  const errors = [...ledgerState.errors];
  const currentByTarget = new Map(ledgerState.current.map(item => [targetKey(item.target), item]));
  const targets = listRequiredAuditTargets(registry, context);
  const unresolved = [];
  const stale = [];
  const rejected = [];
  const sourceRejected = [];
  const specialistRejected = [];
  const accepted = [];
  const sourceCompared = [];
  const coveredClaims = new Set();
  let independentUnitApprovals = true;
  let approvedUnitCount = 0;
  let sourceComparedUnitCount = 0;
  let pendingSpecialistCount = 0;
  let sourceReview = true;

  const census =
    registry.hexagrams.length === 64 &&
    registry.hexagrams.reduce(
      (sum, hex) => sum + hex.books.length * hex.requiredCells.length,
      0,
    ) === 1344 &&
    registry.specialPassages.length === 6;
  if (!census) sourceReview = false;
  if (
    registry.counts?.overviewCells !== 192 ||
    registry.counts?.positionCells !== 1152 ||
    registry.counts?.hexagramCells !== 1344 ||
    registry.counts?.specialPassages !== 6
  )
    sourceReview = false;
  if (
    registry.counts?.groups !== registry.groups.length ||
    registry.counts?.exclusions !== registry.exclusions.length
  )
    sourceReview = false;
  for (const layer of registry.layers) if (layer.rosterStatus !== 'resolved') sourceReview = false;
  for (const group of registry.groups)
    if (group.discoveryStatus !== 'resolved') sourceReview = false;
  const registryClosed =
    registry.layers.every(layer => layer.rosterStatus === 'resolved') &&
    registry.groups.every(group => group.discoveryStatus === 'resolved');

  for (const target of targets) {
    const item = currentByTarget.get(targetKey(target));
    if (!item) {
      unresolved.push({ target, reason: 'missing-decision' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    const decision = item.decision;
    if (!item.inputState.current) {
      stale.push({ target, reasons: item.inputState.stale });
      sourceReview = false;
      independentUnitApprovals = false;
    }
    if (
      registryClosed &&
      decision.authoredScope === 'records' &&
      !decision.coveredClaimIds.length
    ) {
      unresolved.push({ target, reason: 'no-claim-coverage' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    if (decision.disposition !== 'accepted' && decision.disposition !== 'excluded') {
      if (decision.disposition === 'rejected') {
        const item = { target, decisionId: decision.id, reason: 'source-rejected' };
        rejected.push(item);
        sourceRejected.push(item);
      } else unresolved.push({ target, reason: `disposition-${decision.disposition}` });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    if (decision.disposition === 'excluded' && target.kind !== 'exclusion') {
      unresolved.push({ target, reason: 'invalid-exclusion-disposition' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    if (target.kind === 'exclusion' && decision.disposition !== 'excluded') {
      unresolved.push({ target, reason: 'exclusion-not-accounted' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    const expectedLayers = layersFor(target, registry, context);
    const layersResolved =
      expectedLayers.length > 0 &&
      decision.layerResolution.status === 'resolved' &&
      layerClosure(decision, expectedLayers);
    if (!layersResolved) {
      unresolved.push({ target, reason: 'unresolved-layers' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    if (target.kind === 'exclusion' && !hasCompleteExclusionReview(decision)) {
      unresolved.push({ target, reason: 'incomplete-exclusion-review' });
      sourceReview = false;
      independentUnitApprovals = false;
      continue;
    }
    sourceComparedUnitCount += 1;
    sourceCompared.push({
      target,
      decisionId: decision.id,
      disposition: decision.disposition,
      specialistStatus: decision.specialistReview.status,
    });
    for (const claimId of decision.coveredClaimIds) coveredClaims.add(claimId);
    if (decision.specialistReview.status === 'rejected') {
      const item = { target, decisionId: decision.id, reason: 'specialist-rejected' };
      rejected.push(item);
      specialistRejected.push(item);
      independentUnitApprovals = false;
      continue;
    }
    if (decision.specialistReview.status !== 'approved') {
      independentUnitApprovals = false;
      pendingSpecialistCount += 1;
    } else {
      approvedUnitCount += 1;
    }
    if (decision.disposition === 'accepted') accepted.push({ target, decisionId: decision.id });
  }

  const sourceEvidenceComplete = sourceComparedUnitCount === targets.length;
  const releasedClaimIds = new Set(allReleasedClaims(context));
  const releasedClaimsCovered = [...releasedClaimIds].filter(id => coveredClaims.has(id)).length;
  const releasedClaimsRequired = releasedClaimIds.size;
  if (releasedClaimsCovered !== releasedClaimsRequired) sourceReview = false;
  independentUnitApprovals = independentUnitApprovals && approvedUnitCount === targets.length;
  const contentSnapshotStale = Boolean(
    context.contentSnapshotIdentity &&
    ledgerState.contentSnapshotIdentity &&
    context.contentSnapshotIdentity !== ledgerState.contentSnapshotIdentity,
  );
  const certificationStatus = certificationState(
    certification,
    context,
    independentUnitApprovals && !contentSnapshotStale,
  );
  if (certificationStatus.invalid) errors.push(certificationStatus.error);
  const complete =
    errors.length === 0 &&
    sourceReview &&
    sourceEvidenceComplete &&
    !contentSnapshotStale &&
    certificationStatus.current;
  const unexpectedCurrent = ledgerState.current.filter(
    item => !targets.some(target => targetKey(target) === targetKey(item.target)),
  );
  return {
    valid: errors.length === 0,
    errors,
    complete,
    sourceReview,
    contentSnapshotStale,
    sourceEvidenceComplete,
    unexpectedCurrent,
    certification: certificationStatus.current,
    independentUnitApprovals,
    certificationStatus: certificationStatus.status,
    totals: {
      releasedClaimsCovered,
      releasedClaimsRequired,
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      acceptedDecisions: accepted.length,
      sourceComparedDecisions: sourceComparedUnitCount,
      approvedDecisions: approvedUnitCount,
      pendingSpecialistDecisions: pendingSpecialistCount,
      rejectedDecisions: rejected.length,
      sourceRejectedDecisions: sourceRejected.length,
      specialistRejectedDecisions: specialistRejected.length,
      unresolvedDecisions: unresolved.length + stale.length,
    },
    accepted,
    rejected,
    unresolved,
    stale,
  };
}

export function requireCompleteAudit(gates) {
  if (!gates.complete) throw new Error('Audit completion gate is closed');
  return gates;
}

export function listRequiredAuditTargets(registry, context) {
  const targets = [];
  for (const hex of registry.hexagrams)
    for (const book of hex.books)
      for (const cell of hex.requiredCells)
        targets.push({ kind: 'cell', hexagramId: hex.id, editionId: book.editionId, cell });
  for (const special of registry.specialPassages) targets.push({ kind: 'special', id: special.id });
  for (const group of registry.groups) targets.push({ kind: 'sourceunit', id: group.id });
  for (const exclusion of registry.exclusions)
    targets.push({ kind: 'exclusion', id: exclusion.id });

  // Derive record-level semantic support obligations from the current authored release.
  for (const record of context.records) {
    if (!context.manifest.releaseIds.includes(record.id)) continue;
    targets.push({ kind: 'record', id: record.id });
    for (const table of record.tables ?? [])
      if (table.id)
        targets.push({ kind: 'table', id: table.id, ownerId: record.id, childId: table.id });
    for (const figure of record.figures ?? [])
      targets.push({ kind: 'figure', id: figure.id, ownerId: record.id, childId: figure.id });
    if (record.type === 'lesson') {
      for (const block of record.blocks ?? [])
        targets.push({
          kind: 'lesson',
          id: `${record.id}/${block.id}`,
          ownerId: record.id,
          childId: block.id,
        });
      for (const prerequisiteLessonId of record.prerequisiteLessonIds ?? []) {
        const prerequisite = context.records.find(item => item.id === prerequisiteLessonId);
        if (!prerequisite) continue;
        targets.push({
          kind: 'lesson',
          id: prerequisite.id,
          ownerId: prerequisite.id,
          childId: prerequisite.id,
        });
      }
    }
  }
  for (const binding of context.fixtureBindings ?? [])
    targets.push({
      kind: 'fixture',
      id: binding.path,
      ownerId: binding.ownerId,
      childId: binding.claimId,
    });
  const seen = new Set();
  return targets.filter(target => {
    const key = targetKey(target);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function layersFor(target, registry, context) {
  if (target.kind === 'cell')
    return (
      registry.hexagrams
        .find(item => item.id === target.hexagramId)
        ?.books.find(book => book.editionId === target.editionId)?.layerScopeIds ?? []
    );
  for (const collection of ['specialPassages', 'groups', 'exclusions']) {
    const found = registry[collection].find(item => item.id === target.id);
    if (found) return found.layerScopeIds;
  }
  const ownerId = target.ownerId ?? (target.kind === 'record' ? target.id : undefined);
  if (ownerId) {
    const record = context.records.find(item => item.id === ownerId);
    const recordLayers = registry.groups
      .filter(group => group.recordIds?.includes(ownerId))
      .flatMap(group => group.layerScopeIds);
    const childUnits =
      target.kind === 'figure'
        ? (record?.figures?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
        : target.kind === 'table'
          ? (record?.tables?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
          : [];
    const childLayers = registry.groups
      .filter(group => childUnits.includes(group.id))
      .flatMap(group => group.layerScopeIds);
    const claims =
      target.kind === 'figure' || target.kind === 'table'
        ? targetClaimIds(target, record ?? {})
        : target.kind === 'lesson'
          ? targetClaimIds(target, record ?? {})
          : targetClaimIds({ kind: 'record', id: ownerId }, record ?? {});
    const claimsWithCitations = [
      ...allRecordClaims(record ?? {}),
      ...(record?.tables ?? []).flatMap(table =>
        (table.claimIds ?? []).map(id => ({ id, citationIds: table.citationIds ?? [] })),
      ),
      ...(record?.figures ?? []).flatMap(figure =>
        (figure.claimIds ?? []).map(id => ({ id, citationIds: figure.citationIds ?? [] })),
      ),
      ...(record?.blocks ?? []).flatMap(block =>
        (block.supportingClaimIds ?? []).map(id => ({ id, citationIds: block.citationIds ?? [] })),
      ),
    ];
    const citations = claims.flatMap(id => {
      const claim = claimsWithCitations.find(item => item.id === id);
      if (claim) return claim.citationIds ?? [];
      const table = (record?.tables ?? []).find(item =>
        [
          ...(item.claimIds ?? []),
          ...(item.authorAlternatives ?? []).flatMap(row => row.claimIds ?? []),
        ].includes(id),
      );
      if (table)
        return [
          ...(table.citationIds ?? []),
          ...(table.authorAlternatives ?? [])
            .filter(item => item.claimIds?.includes(id))
            .flatMap(item => item.citationIds ?? []),
        ];
      const figure = (record?.figures ?? []).find(item =>
        [
          ...(item.claimIds ?? []),
          ...(item.labels ?? []).flatMap(label => label.claimIds ?? []),
          ...(item.orientation?.claimIds ?? []),
          ...(item.authorAlternatives ?? []).flatMap(row => row.claimIds ?? []),
        ].includes(id),
      );
      if (figure)
        return [
          ...(figure.citationIds ?? []),
          ...(figure.labels ?? [])
            .filter(item => item.claimIds?.includes(id))
            .flatMap(item => item.citationIds ?? []),
          ...(figure.orientation?.claimIds?.includes(id)
            ? (figure.orientation.citationIds ?? [])
            : []),
          ...(figure.authorAlternatives ?? [])
            .filter(item => item.claimIds?.includes(id))
            .flatMap(item => item.citationIds ?? []),
        ];
      const block = (record?.blocks ?? []).find(item => item.supportingClaimIds?.includes(id));
      return block?.citationIds ?? [];
    });
    const editions = new Set(
      context.citations
        .filter(citation => citations.includes(citation.id))
        .map(citation => citation.editionId),
    );
    const citationLayers = registry.layers
      .filter(layer => editions.has(layer.editionId))
      .map(layer => layer.id);
    const mapped = [...recordLayers, ...childLayers, ...citationLayers];
    const childExpected =
      target.kind === 'figure' || target.kind === 'table'
        ? targetClaimIds(target, record ?? {}).length > 0 || childLayers.length > 0
        : target.kind === 'lesson'
          ? targetClaimIds(target, record ?? {}).length > 0
          : false;
    if (childExpected) return [...new Set([...childLayers, ...citationLayers])];
    if (mapped.length) return [...new Set(mapped)];
  }
  return [];
}

function allRecordClaims(record) {
  return [
    ...(record.claims ?? []),
    ...(record.lines ?? []).flatMap(line => line.claims ?? []),
    ...(record.specialPassages ?? []).flatMap(item => item.claims ?? []),
  ];
}

function targetClaimIds(target, record) {
  if (target.kind === 'record')
    return [
      ...allRecordClaims(record).map(claim => claim.id),
      ...(record.tables ?? []).flatMap(table => [
        ...(table.claimIds ?? []),
        ...(table.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
      ]),
      ...(record.figures ?? []).flatMap(figure => [
        ...(figure.claimIds ?? []),
        ...(figure.labels ?? []).flatMap(item => item.claimIds ?? []),
        ...(figure.orientation?.claimIds ?? []),
        ...(figure.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
      ]),
      ...(record.blocks ?? []).flatMap(block => block.supportingClaimIds ?? []),
    ];
  if (target.kind === 'figure') {
    const figure = record.figures?.find(item => item.id === target.childId);
    return [
      ...(figure?.claimIds ?? []),
      ...(figure?.labels ?? []).flatMap(item => item.claimIds ?? []),
      ...(figure?.orientation?.claimIds ?? []),
      ...(figure?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
    ];
  }
  if (target.kind === 'table') {
    const table = record.tables?.find(item => item.id === target.childId);
    return [
      ...(table?.claimIds ?? []),
      ...(table?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
    ];
  }
  if (target.kind === 'lesson') {
    if (target.childId && target.childId !== record.id)
      return record.blocks?.find(item => item.id === target.childId)?.supportingClaimIds ?? [];
    return (record.blocks ?? []).flatMap(block => block.supportingClaimIds ?? []);
  }
  if (target.kind === 'fixture') return [target.childId];
  return [];
}

function layerClosure(decision, expected) {
  const ids = decision.layerResolution.layers.map(layer => layer.layerId);
  return (
    expected.length > 0 && ids.length === expected.length && expected.every(id => ids.includes(id))
  );
}

function hasCompleteExclusionReview(decision) {
  const review = decision.exclusionReview;
  return Boolean(
    review?.reason.trim() &&
    review.scope.trim() &&
    review.reviewer.trim() &&
    review.locator.citationIds.length,
  );
}

function allReleasedClaims(context) {
  const release = new Set(context.manifest.releaseIds);
  const claimIds = [];
  for (const record of context.records) {
    if (!release.has(record.id)) continue;
    claimIds.push(...targetClaimIds({ kind: 'record', id: record.id }, record));
  }
  return [...new Set(claimIds)].sort(compareCanonicalStrings);
}

function certificationState(certification, context, independentUnitApprovals) {
  if (!certification) return { status: 'missing', current: false, invalid: false };
  const shape = validateCertificationShape(certification);
  if (!shape.valid)
    return {
      status: 'invalid',
      current: false,
      invalid: true,
      error: `Malformed audit certification: ${shape.errors
        .map(error => `${error.instancePath || '/'} ${error.message}`)
        .join('; ')}`,
    };
  if (
    !context.contentSnapshotIdentity ||
    !context.decisionSetSha256 ||
    !context.registry?.registryRevision
  )
    return {
      status: 'stale',
      current: false,
      invalid: false,
    };
  const expected = {
    contentSnapshotIdentity: context.contentSnapshotIdentity,
    registry: { sha256: hash(context.registry), revision: context.registry.registryRevision },
    decisionSetSha256: context.decisionSetSha256,
  };
  const current =
    independentUnitApprovals &&
    certification.contentSnapshotIdentity === expected.contentSnapshotIdentity &&
    certification.registry.sha256 === expected.registry.sha256 &&
    certification.registry.revision === expected.registry.revision &&
    certification.decisionSetSha256 === expected.decisionSetSha256 &&
    certification.specialistReview.decision === 'approved';
  return { status: current ? 'current' : 'stale', current, invalid: false };
}
