import { createHash } from 'node:crypto';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';
import { compareAuditInputs, computeAuditInputs } from './audit-inputs.mjs';
import { createAuditSchemaValidator } from './audit-schema.mjs';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const ledgerSchema = JSON.parse(
  readFileSync(path.join(packageRoot, 'schema/audit-ledger-v1.schema.json'), 'utf8'),
);
const validateLedgerShape = createAuditSchemaValidator(ledgerSchema, 'audit-ledger-v1 schema');
const targetKey = target => JSON.stringify(canonicalize(target));
const hash = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');

export async function validateAuditLedgers(ledgers, registry, context) {
  const errors = [];
  const decisions = [];
  const seenLedgers = new Set();
  const seenDecisionIds = new Set();
  const byTarget = new Map();
  const expectedTargets = new Set(listAuditTargets(registry, context).map(targetKey));

  for (const ledger of ledgers) {
    const shape = validateLedgerShape(ledger);
    if (!shape.valid) {
      errors.push(
        ...shape.errors.map(
          error => `${ledger.ledgerId ?? 'ledger'}: ${error.instancePath} ${error.message}`,
        ),
      );
      continue;
    }
    if (seenLedgers.has(ledger.ledgerId)) errors.push(`duplicate ledger ID ${ledger.ledgerId}`);
    seenLedgers.add(ledger.ledgerId);
    if (
      ledger.scope.kind === 'hexagram' &&
      !registry.hexagrams.some(item => item.id === ledger.scope.id)
    )
      errors.push(`${ledger.ledgerId}: unknown hexagram scope ${ledger.scope.id}`);
    if (ledger.scope.kind === 'group' && !registry.groups.some(item => item.id === ledger.scope.id))
      errors.push(`${ledger.ledgerId}: unknown group scope ${ledger.scope.id}`);

    for (const decision of ledger.decisions) {
      if (seenDecisionIds.has(decision.id)) errors.push(`duplicate decision ID ${decision.id}`);
      seenDecisionIds.add(decision.id);
      const key = targetKey(decision.target);
      const knownTarget = expectedTargets.has(key);
      if (!knownTarget) errors.push(`${decision.id}: unknown or retired audit target ${key}`);
      if (!knownTarget) continue;
      if (!isInScope(decision.target, ledger.scope, registry))
        errors.push(`${decision.id}: target is outside ledger scope`);
      const expectedEdition = targetEdition(decision.target, registry);
      if (expectedEdition && decision.locator.editionId !== expectedEdition)
        errors.push(`${decision.id}: locator edition does not match target`);
      const expectedPages = targetPages(decision.target, registry);
      if (
        expectedPages &&
        (decision.locator.pdfPages[0] < expectedPages[0] ||
          decision.locator.pdfPages[1] > expectedPages[1])
      )
        errors.push(`${decision.id}: locator pages exceed registered target range`);
      for (const citationId of [
        ...decision.locator.citationIds,
        ...decision.sourceComparison.evidenceCitationIds,
        ...decision.layerResolution.layers.flatMap(layer => layer.citationIds),
        ...(decision.exclusionReview?.locator.citationIds ?? []),
      ])
        if (!context.citations.some(citation => citation.id === citationId))
          errors.push(`${decision.id}: unknown citation ${citationId}`);
      if (!context.syntheticInput && isSyntheticMetadata(decision))
        errors.push(
          `${decision.id}: synthetic reviewer metadata is not valid in real audit inputs`,
        );

      const mappedRecords = targetRecords(decision.target, registry, context);
      const mappedClaims = mappedRecords.flatMap(id => {
        const record = context.records.find(item => item.id === id);
        return record ? targetClaimIds(decision.target, record) : [];
      });
      if (decision.authoredScope === 'records' || decision.coveredClaimIds.length) {
        if (!decision.coveredClaimIds.length)
          errors.push(`${decision.id}: records scope has no claims`);
        for (const id of decision.coveredClaimIds)
          if (mappedRecords.length && !mappedClaims.includes(id))
            errors.push(`${decision.id}: claim ${id} is unrelated to target records`);
          else if (!mappedRecords.length && !claimIsOwnedByTarget(id, decision.target, context))
            errors.push(`${decision.id}: claim ${id} is unrelated to target`);
      }
      if (decision.authoredScope === 'none') {
        if (decision.coveredClaimIds.length || decision.inputs.records.length)
          errors.push(`${decision.id}: authoredScope none cannot include claim or record inputs`);
        if (mappedRecords.length)
          errors.push(`${decision.id}: authoredScope none cannot target mapped records`);
        if (
          !mappedRecords.length &&
          targetHasReleasedRecordMapping(decision.target, registry, context)
        )
          errors.push(`${decision.id}: authoredScope none cannot hide a released record mapping`);
      }
      if (
        decision.authoredScope === 'records' &&
        decision.inputs.records.some(input => !mappedRecords.includes(input.id))
      )
        errors.push(`${decision.id}: recorded inputs include records unrelated to its target`);
      const mappedAuthors = mappedRecords
        .flatMap(id => context.records.find(record => record.id === id)?.claims ?? [])
        .map(claim => claim.attribution?.author?.trim().toLocaleLowerCase('en-US'))
        .filter(Boolean);
      const reviewerIds = [
        decision.sourceComparison.reviewer,
        decision.specialistReview.reviewerName,
      ]
        .filter(Boolean)
        .map(value => value.trim().toLocaleLowerCase('en-US'));
      if (mappedAuthors.some(author => reviewerIds.includes(author)))
        errors.push(`${decision.id}: reviewer matches a mapped claim author`);
      const expectedLayerIds = targetLayers(decision.target, registry, context);
      validateLayerResolution(decision, expectedLayerIds, context, errors);
      if (decision.target.kind === 'exclusion' && !decision.exclusionReview)
        errors.push(`${decision.id}: exclusion requires exclusionReview evidence`);
      let inputState = { current: false, stale: ['inputs-not-checked'] };
      try {
        const current = await computeAuditInputs(context, decision.coveredClaimIds, {
          allowInMemoryFixtures: true,
          target: decision.target,
          evidenceCitationIds: [
            ...decision.locator.citationIds,
            ...decision.sourceComparison.evidenceCitationIds,
            ...decision.layerResolution.layers.flatMap(layer => layer.citationIds),
            ...(decision.exclusionReview?.locator.citationIds ?? []),
          ],
          evidenceEditionIds: [decision.locator.editionId],
        });
        inputState = compareAuditInputs(decision.inputs, current, context);
      } catch (error) {
        errors.push(`${decision.id}: ${error.message}`);
      }
      decisions.push({ decision, ledgerId: ledger.ledgerId, inputState });
      const versions = byTarget.get(key) ?? [];
      versions.push({ decision, inputState });
      byTarget.set(key, versions);
    }
  }

  const current = [];
  for (const [key, versions] of byTarget) {
    const history = new Map();
    for (const { decision } of versions) {
      const versionKey = `${decision.id}@${decision.revision}`;
      if (history.has(versionKey)) errors.push(`duplicate decision revision ${versionKey}`);
      history.set(versionKey, decision);
    }
    const referenced = new Set();
    for (const { decision } of versions) {
      if (decision.supersedes) {
        const oldKey = `${decision.supersedes.id}@${decision.supersedes.revision}`;
        const previous = history.get(oldKey);
        if (!previous) errors.push(`${decision.id}: broken supersedes link ${oldKey}`);
        else {
          if (previous.target && targetKey(previous.target) !== key)
            errors.push(`${decision.id}: supersedes different target`);
          if (decision.revision !== previous.revision + 1)
            errors.push(`${decision.id}: revision is not monotonic`);
          if (previous.recordedAt >= decision.recordedAt)
            errors.push(`${decision.id}: revision timestamp must follow its predecessor`);
          referenced.add(oldKey);
        }
      } else if (decision.revision !== 1) errors.push(`${decision.id}: first revision must be 1`);
    }
    const heads = versions.filter(
      ({ decision }) => !referenced.has(`${decision.id}@${decision.revision}`),
    );
    if (heads.length > 1) errors.push(`duplicate current heads for target ${key}`);
    if (!heads.length && versions.length)
      errors.push(`revision chain has no head for target ${key}`);
    if (heads.length === 1) {
      const walked = new Set();
      let cursor = heads[0].decision;
      while (cursor) {
        const cursorKey = `${cursor.id}@${cursor.revision}`;
        if (walked.has(cursorKey)) {
          errors.push(`revision cycle at ${cursorKey}`);
          break;
        }
        walked.add(cursorKey);
        cursor = cursor.supersedes
          ? history.get(`${cursor.supersedes.id}@${cursor.supersedes.revision}`)
          : null;
      }
      if (walked.size !== versions.length)
        errors.push(`disconnected revision chain for target ${key}`);
    }
    if (heads.length === 1)
      current.push({
        target: JSON.parse(key),
        decision: heads[0].decision,
        inputState: heads[0].inputState,
      });
  }
  return {
    valid: errors.length === 0,
    errors,
    decisions,
    current,
    decisionSetSha256: hash(
      current
        .map(item => ({ target: item.target, decision: item.decision }))
        .sort((left, right) =>
          compareCanonicalStrings(targetKey(left.target), targetKey(right.target)),
        )
        .map(item => item.decision),
    ),
  };
}

function listAuditTargets(registry, context) {
  const targets = [];
  for (const hex of registry.hexagrams)
    for (const book of hex.books)
      for (const cell of hex.requiredCells)
        targets.push({ kind: 'cell', hexagramId: hex.id, editionId: book.editionId, cell });
  for (const item of registry.specialPassages) targets.push({ kind: 'special', id: item.id });
  for (const item of registry.groups) targets.push({ kind: 'sourceunit', id: item.id });
  for (const item of registry.exclusions) targets.push({ kind: 'exclusion', id: item.id });
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
    }
  }
  for (const binding of context.fixtureBindings ?? [])
    targets.push({
      kind: 'fixture',
      id: binding.path,
      ownerId: binding.ownerId,
      childId: binding.claimId,
    });
  return targets;
}

function isInScope(target, scope, registry) {
  if (scope.kind === 'hexagram') {
    if (target.hexagramId === scope.id || target.id === scope.id) return true;
    return registry.specialPassages.find(item => item.id === target.id)?.hexagramId === scope.id;
  }
  if (target.id === scope.id) return true;
  const scopedGroup = registry.groups.find(item => item.id === scope.id);
  if (target.kind === 'exclusion') {
    const exclusion = registry.exclusions.find(item => item.id === target.id);
    let sourceGroup = registry.groups.find(item => item.id === exclusion?.sourceUnitId);
    while (sourceGroup) {
      if (sourceGroup.id === scope.id) return true;
      sourceGroup = registry.groups.find(item => item.id === sourceGroup.parentId);
    }
  }
  let targetGroup = registry.groups.find(item => item.id === target.id);
  while (targetGroup?.parentId) {
    if (targetGroup.parentId === scope.id) return true;
    targetGroup = registry.groups.find(item => item.id === targetGroup.parentId);
  }
  if (scopedGroup?.recordIds?.includes(target.id)) return true;
  const descendant = id => {
    let item = registry.groups.find(group => group.id === id);
    while (item?.parentId) {
      if (item.parentId === scope.id) return true;
      item = registry.groups.find(group => group.id === item.parentId);
    }
    return false;
  };
  return (
    descendant(target.id) ||
    Boolean(registry.groups.find(item => item.id === scope.id)?.recordIds?.includes(target.ownerId))
  );
}

function targetEdition(target, registry) {
  if (target.kind === 'cell') return target.editionId;
  for (const collection of ['specialPassages', 'groups', 'exclusions']) {
    const found = registry[collection].find(item => item.id === target.id);
    if (found) return found.editionId;
  }
  if (['record', 'table', 'figure', 'lesson', 'fixture'].includes(target.kind)) return null;
  return undefined;
}

function targetPages(target, registry) {
  if (target.kind === 'cell') {
    const book = registry.hexagrams
      .find(item => item.id === target.hexagramId)
      ?.books.find(item => item.editionId === target.editionId);
    return book ? [book.pdfPageStart, book.pdfPageEnd] : undefined;
  }
  for (const collection of ['specialPassages', 'groups', 'exclusions']) {
    const item = registry[collection].find(candidate => candidate.id === target.id);
    if (item) return [item.pdfPageStart, item.pdfPageEnd];
  }
  return undefined;
}

function targetLayers(target, registry, context) {
  if (target.kind === 'cell') {
    const hex = registry.hexagrams.find(item => item.id === target.hexagramId);
    return hex?.books.find(book => book.editionId === target.editionId)?.layerScopeIds ?? [];
  }
  for (const collection of ['specialPassages', 'groups', 'exclusions']) {
    const found = registry[collection].find(item => item.id === target.id);
    if (found) return found.layerScopeIds;
  }
  const ownerId = target.ownerId ?? (target.kind === 'record' ? target.id : undefined);
  if (ownerId) {
    const groupLayers = registry.groups
      .filter(group => group.recordIds?.includes(ownerId))
      .flatMap(group => group.layerScopeIds);
    const record = context.records.find(item => item.id === ownerId);
    const childUnits =
      target.kind === 'table'
        ? (record?.tables?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
        : target.kind === 'figure'
          ? (record?.figures?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
          : [];
    const childLayers = registry.groups
      .filter(group => childUnits.includes(group.id))
      .flatMap(group => group.layerScopeIds);
    const evidenceClaims = targetClaimIds(target, record ?? {});
    const evidenceCitations = evidenceClaims.flatMap(
      id => allClaims(record ?? {}).find(claim => claim.id === id)?.citationIds ?? [],
    );
    const editions = new Set(
      context.citations
        .filter(item => evidenceCitations.includes(item.id))
        .map(item => item.editionId),
    );
    const citationLayers = registry.layers
      .filter(layer => editions.has(layer.editionId))
      .map(layer => layer.id);
    const layers = [...groupLayers, ...childLayers, ...citationLayers];
    if (layers.length) return [...new Set(layers)];
  }
  if (['table', 'figure', 'lesson', 'fixture', 'record'].includes(target.kind)) return [];
  return [];
}

function targetRecords(target, registry, context) {
  let mapped = [];
  if (target.kind === 'cell' && context.records.some(record => record.id === target.hexagramId))
    mapped = [target.hexagramId];
  if (target.kind === 'sourceunit')
    mapped = registry.groups.find(item => item.id === target.id)?.recordIds ?? [];
  if (target.kind === 'exclusion')
    mapped = registry.exclusions.find(item => item.id === target.id)?.recordIds ?? [];
  if (target.kind === 'special') {
    const special = registry.specialPassages.find(item => item.id === target.id);
    const parent = registry.hexagrams.find(item => item.id === special?.hexagramId);
    mapped = parent?.recordIds?.filter(id => context.manifest.releaseIds.includes(id)) ?? [];
  }
  const actual = new Set(context.records.map(item => item.id));
  if (target.kind === 'record')
    mapped = context.manifest.releaseIds.includes(target.id) ? [target.id] : [];
  if (target.kind === 'cell' && context.manifest.releaseIds.includes(target.hexagramId))
    mapped = [target.hexagramId];
  if (
    target.kind === 'table' ||
    target.kind === 'figure' ||
    target.kind === 'lesson' ||
    target.kind === 'fixture'
  )
    mapped = context.manifest.releaseIds.includes(target.ownerId) ? [target.ownerId] : [];
  for (const id of mapped)
    if (!actual.has(id)) throw new Error(`Deleted or retired mapped record ${id}`);
  return mapped;
}

function targetHasReleasedRecordMapping(target, registry, context) {
  const releaseIds = new Set(context.manifest.releaseIds);
  if (target.kind === 'sourceunit')
    return Boolean(
      registry.groups
        .find(item => item.id === target.id)
        ?.recordIds?.some(id => releaseIds.has(id)),
    );
  if (target.kind === 'special') {
    const special = registry.specialPassages.find(item => item.id === target.id);
    return Boolean(
      registry.hexagrams
        .find(item => item.id === special?.hexagramId)
        ?.recordIds?.some(id => releaseIds.has(id)),
    );
  }
  if (target.kind === 'exclusion')
    return Boolean(
      registry.exclusions
        .find(item => item.id === target.id)
        ?.recordIds?.some(id => releaseIds.has(id)),
    );
  return false;
}

function claimIsOwnedByTarget(claimId, target, context) {
  const record = context.records.find(
    item => item.id === (target.ownerId ?? target.id ?? target.hexagramId),
  );
  if (!record) return false;
  const claimIds = targetClaimIds(target, record);
  return claimIds.includes(claimId);
}

function targetClaimIds(target, record) {
  if (target.kind === 'fixture') return [target.childId];
  if (target.kind === 'record') {
    return [
      ...allClaims(record).map(claim => claim.id),
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
  }
  if (target.kind === 'table') {
    const table = record.tables?.find(item => item.id === target.childId);
    return [
      ...(table?.claimIds ?? []),
      ...(table?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
    ];
  }
  if (target.kind === 'figure') {
    const figure = record.figures?.find(item => item.id === target.childId);
    return [
      ...(figure?.claimIds ?? []),
      ...(figure?.labels ?? []).flatMap(item => item.claimIds ?? []),
      ...(figure?.orientation?.claimIds ?? []),
      ...(figure?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
    ];
  }
  if (target.kind === 'lesson' && target.id.includes('/'))
    return record.blocks?.find(item => item.id === target.childId)?.supportingClaimIds ?? [];
  if (target.kind === 'lesson')
    return (record.blocks ?? []).flatMap(block => block.supportingClaimIds ?? []);
  return allClaims(record).map(claim => claim.id);
}

function validateLayerResolution(decision, expectedIds, context, errors) {
  const layers = decision.layerResolution.layers;
  const ids = layers.map(layer => layer.layerId);
  if (new Set(ids).size !== ids.length) errors.push(`${decision.id}: duplicate layer resolution`);
  if (ids.some(id => !expectedIds.includes(id)))
    errors.push(`${decision.id}: layer outside registered target scope`);
  if (
    layers.some(layer =>
      layer.citationIds.some(id => !context.citations.some(citation => citation.id === id)),
    )
  )
    errors.push(`${decision.id}: layer evidence citation is unknown`);
  const closed =
    expectedIds.length > 0 &&
    ids.length === expectedIds.length &&
    expectedIds.every(id => ids.includes(id));
  if (decision.layerResolution.status === 'resolved' && !closed)
    errors.push(`${decision.id}: resolved layer closure does not match registered scope`);
  if (
    decision.layerResolution.status === 'resolved' &&
    expectedIds.length === 0 &&
    layers.length === 0 &&
    decision.target.kind !== 'exclusion'
  )
    errors.push(`${decision.id}: empty layer scope is not proof of a resolved roster`);
  if (
    decision.layerResolution.status === 'resolved' &&
    expectedIds.length > 0 &&
    layers.some(
      layer =>
        layer.presence === 'absent' && ['non-content', 'source-omission'].includes(layer.basis),
    ) &&
    decision.target.kind !== 'exclusion'
  ) {
    errors.push(
      `${decision.id}: empty/non-content source evidence must be represented by explicit registered layers`,
    );
  }
}

function isSyntheticMetadata(decision) {
  const values = [
    decision.recordedBy,
    decision.sourceComparison.identity,
    decision.sourceComparison.reviewer,
    decision.specialistReview.reviewerName,
    decision.specialistReview.reviewerRole,
    decision.exclusionReview?.reviewer,
  ].filter(Boolean);
  return values.some(value =>
    /(?:synthetic|fixture|placeholder|invented|test reviewer)/i.test(value),
  );
}

function allClaims(record) {
  return [
    ...(record.claims ?? []),
    ...(record.lines ?? []).flatMap(line => line.claims ?? []),
    ...(record.specialPassages ?? []).flatMap(item => item.claims ?? []),
  ];
}
