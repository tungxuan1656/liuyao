import { canonicalize } from './snapshot-identity.mjs';

const targetKey = target => JSON.stringify(canonicalize(target));
const allRecordClaims = record => [
  ...(record.claims ?? []),
  ...(record.lines ?? []).flatMap(line => line.claims ?? []),
  ...(record.specialPassages ?? []).flatMap(item => item.claims ?? []),
];

export function recordClaimIds(record) {
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
    ...(record.type === 'lesson'
      ? (record.blocks ?? []).flatMap(block => block.supportingClaimIds ?? [])
      : []),
  ];
}

/** Return inventory targets and evidence obligations owned by released records. */
export function listExpectedAuditTargets(registry, context) {
  const targets = [];
  for (const hex of registry.hexagrams)
    for (const book of hex.books)
      for (const cell of hex.requiredCells)
        targets.push({ kind: 'cell', hexagramId: hex.id, editionId: book.editionId, cell });
  for (const item of registry.specialPassages) targets.push({ kind: 'special', id: item.id });
  for (const item of registry.groups) targets.push({ kind: 'sourceunit', id: item.id });
  for (const item of registry.exclusions) targets.push({ kind: 'exclusion', id: item.id });

  const released = new Set(context.manifest.releaseIds);
  for (const record of context.records) {
    if (!released.has(record.id)) continue;
    targets.push({ kind: 'record', id: record.id });
    for (const table of record.tables ?? [])
      if (table.id)
        targets.push({ kind: 'table', id: table.id, ownerId: record.id, childId: table.id });
    for (const figure of record.figures ?? [])
      if (figure.id)
        targets.push({ kind: 'figure', id: figure.id, ownerId: record.id, childId: figure.id });
    if (record.type === 'lesson')
      for (const block of record.blocks ?? [])
        targets.push({
          kind: 'lesson',
          id: `${record.id}/${block.id}`,
          ownerId: record.id,
          childId: block.id,
        });
  }
  for (const binding of context.fixtureBindings ?? [])
    if (released.has(binding.ownerId))
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

/** Derive the shared layer scope used by ledger validation and completion gates. */
export function expectedLayersForTarget(target, registry, context, coveredClaimIds = []) {
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
  const record = context.records.find(item => item.id === ownerId);
  if (!record) return [];

  const childUnits =
    target.kind === 'figure'
      ? (record.figures?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
      : target.kind === 'table'
        ? (record.tables?.find(item => item.id === target.childId)?.sourceUnitIds ?? [])
        : [];
  const childClaimIds = targetClaimIds(target, record);
  const childScope = ['figure', 'table', 'lesson', 'fixture'].includes(target.kind);
  const childExpected =
    target.kind === 'figure' || target.kind === 'table'
      ? childClaimIds.length > 0 || childUnits.length > 0
      : ['lesson', 'fixture'].includes(target.kind) && childClaimIds.length > 0;
  const groupLayers = registry.groups
    .filter(group => {
      if (childScope && childExpected) return childUnits.includes(group.id);
      return group.recordIds?.includes(ownerId);
    })
    .flatMap(group => group.layerScopeIds);

  const claimIds = collectTargetClaimClosure(
    target,
    record,
    context.records,
    childScope
      ? coveredClaimIds.length
        ? coveredClaimIds
        : childClaimIds
      : target.kind === 'record' && coveredClaimIds.length
        ? coveredClaimIds
        : target.kind === 'record'
          ? recordClaimIds(record)
          : coveredClaimIds,
  );
  const claimsById = new Map(
    context.records.flatMap(item => allRecordClaims(item).map(claim => [claim.id, claim])),
  );
  const citations = claimIds.flatMap(id => claimsById.get(id)?.citationIds ?? []);
  const editions = new Set(
    context.citations
      .filter(citation => citations.includes(citation.id))
      .map(citation => citation.editionId),
  );
  const citationLayers = registry.layers
    .filter(layer => editions.has(layer.editionId))
    .map(layer => layer.id);
  return [...new Set([...groupLayers, ...citationLayers])];
}

function collectTargetClaimClosure(target, record, records, coveredClaimIds) {
  const claimsById = new Map(
    records.flatMap(item => allRecordClaims(item).map(claim => [claim.id, claim])),
  );
  const initial = coveredClaimIds.length ? coveredClaimIds : targetClaimIds(target, record);
  const result = new Set();
  const pending = [...initial];
  while (pending.length) {
    const id = pending.pop();
    if (result.has(id)) continue;
    const claim = claimsById.get(id);
    if (!claim) continue;
    result.add(id);
    pending.push(...(claim.dependsOnClaimIds ?? []));
  }
  return [...result];
}

function targetClaimIds(target, record) {
  if (target.kind === 'fixture') return [target.childId];
  if (target.kind === 'record') return recordClaimIds(record);
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
  if (target.kind === 'lesson')
    return record.blocks?.find(item => item.id === target.childId)?.supportingClaimIds ?? [];
  return [];
}
