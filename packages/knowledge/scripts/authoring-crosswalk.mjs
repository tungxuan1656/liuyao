const BASIS_START = '<!-- authoring-exclusion-bases:start -->';
const BASIS_END = '<!-- authoring-exclusion-bases:end -->';

/** Join stated bases to existing exclusions only; this never discovers expected units. */
export function readExclusionBases(inventoryText) {
  const start = inventoryText.indexOf(BASIS_START);
  const end = inventoryText.indexOf(BASIS_END);
  if (start < 0 || end <= start) throw new Error('Missing authoring exclusion basis table');
  const bases = new Map();
  for (const line of inventoryText.slice(start + BASIS_START.length, end).split('\n')) {
    if (!line.startsWith('| `')) continue;
    const match = /^\|\s+`([^`]+)`\s+\|\s+`([^`]+)`\s+\|\s+([^|]+)\|$/.exec(line.trim());
    if (!match) throw new Error(`Malformed authoring exclusion basis: ${line}`);
    const [, id, basisUnitId, statedBasis] = match;
    if (!statedBasis.trim()) throw new Error(`Empty authoring exclusion basis: ${id}`);
    if (bases.has(id)) throw new Error(`Duplicate authoring exclusion basis: ${id}`);
    bases.set(id, { basisUnitId, statedBasis: statedBasis.trim() });
  }
  return bases;
}

/** Read existing hexagram owner routes, without creating source IDs or audit obligations. */
export function readHexagramOwners(inventoryText) {
  const owners = new Map();
  for (const line of inventoryText.split('\n')) {
    const unit = /`pbc\/ntt\/nhl-hexagram-(\d{2})`/.exec(line);
    if (!unit) continue;
    const route = /\|\s*(\d{3})\s*\u2192\s*(\d{3})/.exec(line);
    if (!route || owners.has(unit[1])) throw new Error(`Invalid hexagram owner route: ${unit[1]}`);
    owners.set(unit[1], {
      authorFeatureId: `feat-${route[1]}`,
      auditFeatureId: `feat-${route[2]}`,
    });
  }
  return owners;
}

/** Navigation/classification evidence, deliberately separate from audit acceptance. */
export function authoringCrosswalk({
  registry,
  inventoryText,
  manifest,
  records,
  legacy,
  checked,
  coverage,
}) {
  const recordById = new Map(records.map(record => [record.id, record]));
  const released = new Set(manifest.releaseIds);
  const groupById = new Map(registry.groups.map(group => [group.id, group]));
  const directUnits = new Map();
  const groups = registry.groups.map(group => {
    if (!['content', 'non-content'].includes(group.kind))
      throw new Error(`${group.id}: unclassified authoring unit`);
    if (!group.authorFeatureId || !group.auditFeatureId)
      throw new Error(`${group.id}: unowned authoring unit`);
    const recordIds = group.recordIds ?? [];
    for (const id of recordIds) {
      if (!recordById.has(id)) throw new Error(`${group.id}: unknown mapped record ${id}`);
      if (!directUnits.has(id)) directUnits.set(id, []);
      directUnits.get(id).push(group.id);
    }
    return {
      id: group.id,
      ...(group.parentId ? { parentId: group.parentId } : {}),
      kind: group.kind,
      sourceAnchor: {
        inventoryPath: registry.inventory.path,
        unitId: group.id,
        editionId: group.editionId,
        pdfPages: [group.pdfPageStart, group.pdfPageEnd],
      },
      authorFeatureId: group.authorFeatureId,
      auditFeatureId: group.auditFeatureId,
      discoveryStatus: group.discoveryStatus,
      mappingStatus:
        group.kind === 'non-content'
          ? 'non-content-accounting'
          : recordIds.length
            ? 'selected-only'
            : 'unmapped',
      recordIds,
      releasedRecordIds: recordIds.filter(id => released.has(id)),
    };
  });
  const hexagramOwners = readHexagramOwners(inventoryText);
  const books = registry.hexagrams.flatMap(hexagram => {
    const owner = hexagramOwners.get(String(hexagram.number).padStart(2, '0'));
    if (!owner || owner.auditFeatureId !== hexagram.auditFeatureId)
      throw new Error(`${hexagram.id}: missing or mismatched inventory owner route`);
    for (const book of hexagram.books) {
      if (recordById.has(hexagram.id)) {
        if (!directUnits.has(hexagram.id)) directUnits.set(hexagram.id, []);
        directUnits.get(hexagram.id).push(book.sourceUnitId);
      }
    }
    return hexagram.books.map(book => ({
      hexagramId: hexagram.id,
      requiredCells: hexagram.requiredCells,
      ...book,
      ...owner,
    }));
  });
  const bases = readExclusionBases(inventoryText);
  const exclusionIds = new Set(registry.exclusions.map(exclusion => exclusion.id));
  for (const id of bases.keys())
    if (!exclusionIds.has(id)) throw new Error(`Unregistered authoring exclusion basis: ${id}`);
  const exclusions = registry.exclusions.map(exclusion => {
    const basis = bases.get(exclusion.id);
    const source = groupById.get(exclusion.sourceUnitId);
    const unit = groupById.get(basis?.basisUnitId);
    if (
      !source ||
      !unit ||
      unit.editionId !== exclusion.editionId ||
      unit.auditFeatureId !== exclusion.auditFeatureId ||
      (unit.id !== source.id && unit.parentId !== source.id) ||
      unit.pdfPageStart < source.pdfPageStart ||
      unit.pdfPageEnd > source.pdfPageEnd
    )
      throw new Error(`${exclusion.id}: missing or mismatched stated basis unit`);
    return {
      ...exclusion,
      ...basis,
      sourceAnchor: { editionId: unit.editionId, pdfPages: [unit.pdfPageStart, unit.pdfPageEnd] },
      authorFeatureId: source.authorFeatureId,
      rationaleReview: 'pending-audit-owner',
    };
  });
  const releasedRecords = records.filter(record => released.has(record.id));
  return {
    schemaVersion: 1,
    evidenceNote:
      'Direct registry mappings support selected records only. Parent mappings never prove child coverage. Classification and ownership are not full passage coverage, source-layer closure, audit acceptance or certification.',
    inventory: registry.inventory,
    registryRevision: registry.registryRevision,
    counts: {
      groups: groups.length,
      selectedOnly: groups.filter(group => group.mappingStatus === 'selected-only').length,
      unmapped: groups.filter(group => group.mappingStatus === 'unmapped').length,
      nonContent: groups.filter(group => group.kind === 'non-content').length,
      discoveryUnresolved: groups.filter(group => group.discoveryStatus === 'unresolved').length,
      exclusions: exclusions.length,
    },
    groups,
    exclusions,
    commentary: {
      evidenceNote:
        'Authored overview/position counts only; actual source layers and audit cells remain separate obligations.',
      byAuthor: coverage.lines.byAuthor,
      books,
      specialPassages: registry.specialPassages.map(special => ({
        ...special,
        authorFeatureId: 'feat-063',
        evidenceNote:
          'Separate special audit obligation; sourceUnitId is a parent anchor, not proof of a mapped special passage.',
      })),
    },
    records: releasedRecords.map(record => ({
      id: record.id,
      type: record.type,
      sourceUnitIds: [...new Set(directUnits.get(record.id) ?? [])],
      evidenceCitationIds: [
        ...new Set(checked.allClaims(record).flatMap(claim => claim.citationIds)),
      ],
      mappingStatus: directUnits.has(record.id)
        ? 'direct-selected-mapping'
        : 'no-direct-unit-mapping',
      reconciliationFeatureId: 'feat-094',
    })),
    topics: coverage.topics.map(topic => ({
      ...topic,
      reconciliationFeatureId: 'feat-094',
      pendingWithReleasedRecords: topic.status === 'pending' && topic.releasedRecordIds.length > 0,
      evidenceNote:
        'Declared topic status and released navigation membership do not establish complete source coverage.',
    })),
    legacyRoutes: {
      unaudited: coverage.legacyUnaudited,
      releasedCompatibilityIds: Object.fromEntries([
        [
          'entities',
          releasedRecords
            .filter(record => ['trigram', 'hexagram'].includes(record.type))
            .map(record => record.id),
        ],
        ...['terms', 'rules'].map(key => [
          key,
          releasedRecords
            .filter(record => record.type === key.slice(0, -1))
            .map(record => record.id),
        ]),
      ]),
      bibliographicSourceIds: legacy.catalog.sources.map(source => source.id),
      references: legacy.catalog.references.map(reference => ({
        ...reference,
        releasedTargetIds: reference.targetIds.filter(id => released.has(id)),
        reviewStatus: 'unaudited',
        reconciliationFeatureId: 'feat-094',
      })),
      evidenceNote:
        'Legacy source IDs are unaudited bibliography, not authored supplied-book units.',
    },
    nextBatch: manifest.nextBatch,
    followUp: {
      reconciliationFeatureId: 'feat-094',
      verificationFeatureId: 'feat-095',
      certificationFeatureId: 'feat-096',
      evidenceNote:
        'nextBatch retains the active inventory route; no missing hexagram record batch, new authoring, independent verification or certification is implied.',
    },
  };
}
