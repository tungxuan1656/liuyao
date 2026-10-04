import { createHash } from 'node:crypto';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';
import { evaluateAuditGates, listRequiredAuditTargets } from './audit-gates.mjs';

const hash = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');
const targetKey = target => JSON.stringify(canonicalize(target));
const decisionSetHash = current => {
  const sorted = current
    .map(item => ({ target: item.target, decision: item.decision }))
    .sort((left, right) =>
      compareCanonicalStrings(targetKey(left.target), targetKey(right.target)),
    );
  return hash(sorted.map(item => item.decision));
};

/** Build a deterministic audit report outside the feat-101 content projection. */
export function createAuditStatus({ context, review }) {
  const { registry, ledgerState, certification } = review;
  context.registry = registry;
  context.decisionSetSha256 = decisionSetHash(ledgerState.current);
  ledgerState.contentSnapshotIdentity = context.contentSnapshotIdentity;

  const gates = evaluateAuditGates({ registry, ledgerState, context, certification });
  const required = listRequiredAuditTargets(registry, context).map(target => ({
    target,
    featureId: featureForTarget(target, registry),
  }));
  const currentByTarget = new Map(ledgerState.current.map(item => [targetKey(item.target), item]));
  const currentDecisionCount = ledgerState.current.filter(item => item.inputState.current).length;
  const featureCoverage = new Map();
  for (const { target, featureId } of required) {
    if (!featureId) continue;
    const counts = featureCoverage.get(featureId) ?? { required: 0, current: 0 };
    counts.required += 1;
    if (currentByTarget.get(targetKey(target))?.inputState.current) counts.current += 1;
    featureCoverage.set(featureId, counts);
  }

  const missing = gates.unresolved.filter(item => item.reason === 'missing-decision').length;
  const stale = gates.stale.length;
  const rejected = gates.totals.sourceRejectedDecisions;
  const specialistRejected = gates.totals.specialistRejectedDecisions;
  const unresolved = gates.unresolved.length - missing;
  const sourceReviewOpen = gates.sourceReview && gates.sourceEvidenceComplete;
  const certificationOpen = gates.certification;
  const sourceReasons = [];
  if (registry.layers.some(layer => layer.rosterStatus !== 'resolved'))
    sourceReasons.push({
      code: 'unresolved-layer-roster',
      count: registry.layers.filter(layer => layer.rosterStatus !== 'resolved').length,
    });
  if (registry.groups.some(group => group.discoveryStatus !== 'resolved'))
    sourceReasons.push({
      code: 'unresolved-source-discovery',
      count: registry.groups.filter(group => group.discoveryStatus !== 'resolved').length,
    });
  if (missing) sourceReasons.push({ code: 'missing-decision', count: missing });
  if (stale) sourceReasons.push({ code: 'stale-decision-inputs', count: stale });
  if (unresolved) sourceReasons.push({ code: 'unresolved-decision', count: unresolved });
  if (rejected) sourceReasons.push({ code: 'rejected-decision', count: rejected });
  if (gates.totals.releasedClaimsCovered !== gates.totals.releasedClaimsRequired)
    sourceReasons.push({
      code: 'released-claim-coverage-incomplete',
      count: gates.totals.releasedClaimsRequired - gates.totals.releasedClaimsCovered,
    });
  if (gates.contentSnapshotStale) sourceReasons.push({ code: 'content-snapshot-stale', count: 1 });

  const certificationReasons = [];
  if (gates.totals.sourceComparedDecisions)
    certificationReasons.push({
      code: 'source-compared-without-specialist-approval',
      count: gates.totals.sourceComparedDecisions - gates.totals.approvedDecisions,
    });
  if (gates.certificationStatus === 'missing')
    certificationReasons.push({ code: 'certification-absent', count: 1 });
  if (gates.certificationStatus === 'stale')
    certificationReasons.push({ code: 'certification-stale-or-unapproved', count: 1 });
  if (gates.totals.pendingSpecialistDecisions)
    certificationReasons.push({
      code: 'specialist-review-pending',
      count: gates.totals.pendingSpecialistDecisions,
    });
  if (specialistRejected)
    certificationReasons.push({ code: 'specialist-review-rejected', count: specialistRejected });
  if (!gates.independentUnitApprovals && !certificationReasons.length)
    certificationReasons.push({ code: 'independent-approval-incomplete', count: 1 });
  const status = {
    schemaVersion: 1,
    contentSnapshotIdentity: context.contentSnapshotIdentity,
    registry: {
      sha256: review.registrySha256,
      revision: registry.registryRevision,
      counts: {
        overviewCells: registry.counts.overviewCells,
        positionCells: registry.counts.positionCells,
        hexagramCells: registry.counts.hexagramCells,
        specialPassages: registry.counts.specialPassages,
        groups: registry.groups.length,
        exclusions: registry.exclusions.length,
      },
    },
    decisionSetSha256: context.decisionSetSha256,
    reviewEvidenceIdentity: review.reviewEvidenceIdentity,
    gates: {
      sourceReview: {
        status: sourceReviewOpen ? 'open' : 'closed',
        counts: {
          required: required.length,
          current: currentDecisionCount,
          missing,
          stale,
          rejected,
          specialistRejected,
          unresolved,
        },
        reasons: sourceReasons.slice(0, 20),
      },
      certification: {
        status: certificationOpen ? 'open' : 'closed',
        state: gates.certificationStatus,
        counts: {
          current: gates.totals.approvedDecisions,
          required: required.length,
          missing: gates.certificationStatus === 'missing' ? 1 : 0,
          stale: gates.certificationStatus === 'stale' ? 1 : 0,
          rejected,
          specialistRejected,
          unresolved: gates.totals.pendingSpecialistDecisions,
        },
        reasons: certificationReasons.slice(0, 20),
      },
    },
    complete: gates.complete,
    featureCoverage: Object.fromEntries(
      [...featureCoverage]
        .sort(([left], [right]) => compareCanonicalStrings(left, right))
        .map(([featureId, counts]) => [featureId, counts]),
    ),
    totals: {
      releasedClaimsCovered: gates.totals.releasedClaimsCovered,
      releasedClaimsRequired: gates.totals.releasedClaimsRequired,
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: registry.specialPassages.length,
      groups: registry.groups.length,
      exclusions: registry.exclusions.length,
      acceptedDecisions: gates.totals.acceptedDecisions,
      approvedDecisions: gates.totals.approvedDecisions,
      currentDecisions: currentDecisionCount,
      rejectedDecisions: gates.totals.rejectedDecisions,
      unresolvedDecisions: gates.totals.unresolvedDecisions,
    },
  };

  return status;
}

function featureForTarget(target, registry) {
  if (target.kind === 'cell')
    return registry.hexagrams.find(item => item.id === target.hexagramId)?.auditFeatureId;
  for (const collection of ['specialPassages', 'groups', 'exclusions']) {
    const item = registry[collection].find(candidate => candidate.id === target.id);
    if (item) return item.auditFeatureId;
  }
  return undefined;
}
