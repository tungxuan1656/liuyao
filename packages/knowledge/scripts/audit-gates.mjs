import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';
import { createAuditSchemaValidator } from './audit-schema.mjs';
import {
  expectedLayersForTarget,
  listExpectedAuditTargets,
  recordClaimIds,
} from './audit-targets.mjs';

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
    const expectedLayers = expectedLayersForTarget(
      target,
      registry,
      context,
      decision.coveredClaimIds,
    );
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
  const requiredTargetKeys = new Set(targets.map(targetKey));
  const unexpectedCurrent = ledgerState.current.filter(
    item => !requiredTargetKeys.has(targetKey(item.target)),
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
  return listExpectedAuditTargets(registry, context);
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
    claimIds.push(...recordClaimIds(record));
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
