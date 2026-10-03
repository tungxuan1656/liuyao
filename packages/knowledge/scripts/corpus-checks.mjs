/** Cross-file checks complement JSON Schema; source meaning needs passage review. */
import { checkEvidence } from './corpus-evidence.mjs';
import { checkFigures } from './corpus-figures.mjs';
import { checkLessons } from './corpus-lessons.mjs';
import { checkProjectEvidence } from './corpus-projects.mjs';

export function checkCorpus({ manifest, sources, citations, records, legacy, repositoryRoot }) {
  const fail = message => {
    throw new Error(`Invalid book corpus: ${message}`);
  };
  const uniqueMap = (items, label, idKey = 'id') => {
    const result = new Map();
    for (const item of items) {
      const id = item[idKey];
      if (result.has(id)) fail(`duplicate ${label} ID ${id}`);
      result.set(id, item);
    }
    return result;
  };
  const sourceById = uniqueMap(sources, 'source');
  const editionById = new Map();
  for (const source of sources) {
    for (const edition of source.editions) {
      if (editionById.has(edition.id)) fail(`duplicate edition ${edition.id}`);
      editionById.set(edition.id, { source, edition });
    }
  }
  const citationById = uniqueMap(citations, 'citation');
  const recordById = uniqueMap(records, 'record');
  const legacyRecords = Object.values(legacy.catalog).flat();
  const topics = uniqueMap(manifest.topics, 'topic');
  const released = new Set(manifest.releaseIds);
  const knownIds = new Set([
    ...recordById.keys(),
    ...Object.values(legacy.catalog)
      .flat()
      .map(r => r.id),
  ]);
  const claimById = new Map();
  const globalIds = new Map();
  for (const record of records) {
    if (legacyRecords.some(legacyRecord => legacyRecord.id === record.id))
      fail(`${record.id}: also authored in legacy catalog`);
  }
  for (const [items, label] of [
    [records, 'record'],
    [sources, 'source'],
    [citations, 'citation'],
    [legacyRecords, 'legacy record'],
  ]) {
    for (const item of items) {
      if (globalIds.has(item.id)) fail(`duplicate corpus ID ${item.id}`);
      globalIds.set(item.id, label);
    }
  }
  for (const record of records) {
    const tableIds = new Set();
    for (const table of record.tables ?? []) {
      if (table.id === undefined) continue;
      if (tableIds.has(table.id)) fail(`duplicate ${record.id} table ID ${table.id}`);
      tableIds.add(table.id);
    }
    for (const table of record.tables ?? [])
      checkSourceUnitIds(table.sourceUnitIds, `${record.id} table`, fail);
    uniqueMap(record.specialPassages ?? [], `${record.id} special passage`);
    uniqueMap(record.discrepancies ?? [], `${record.id} discrepancy`);
    for (const figure of record.figures ?? [])
      checkSourceUnitIds(figure.sourceUnitIds, `${record.id}.${figure.id} figure`, fail);
    for (const figure of record.figures ?? []) uniqueMap(figure.labels ?? [], `${figure.id} label`);
    for (const claim of allClaims(record)) {
      if (globalIds.has(claim.id)) {
        if (globalIds.get(claim.id) === 'claim') fail(`duplicate claim ${claim.id}`);
        fail(`duplicate corpus ID ${claim.id}`);
      }
      globalIds.set(claim.id, 'claim');
      claimById.set(claim.id, { record, claim });
    }
  }
  const tableIdsByRecord = new Map(
    records.map(record => [record.id, new Set((record.tables ?? []).map(table => table.id))]),
  );
  for (const record of records) {
    for (const figure of record.figures ?? []) {
      if (globalIds.has(figure.id)) fail(`duplicate corpus ID ${figure.id}`);
      globalIds.set(figure.id, `figure in ${record.id}`);
    }
  }
  for (const citation of citations) {
    const entry = editionById.get(citation.editionId);
    if (!sourceById.has(citation.sourceId) || entry?.source.id !== citation.sourceId)
      fail(`${citation.id}: source and edition do not match`);
    const { pdfPageStart: start, pdfPageEnd: end } = citation.location;
    if (start > end || end > entry.edition.pdfPageCount)
      fail(`${citation.id}: page range exceeds edition`);
  }
  const requireReference = (id, owner) => {
    if (!knownIds.has(id)) fail(`${owner}: unknown record ${id}`);
  };
  for (const record of records) {
    for (const topicId of record.topicIds)
      if (!topics.has(topicId)) fail(`${record.id}: unknown topic ${topicId}`);
    for (const id of [...record.relatedIds, ...(record.applicableRuleIds ?? [])])
      requireReference(id, record.id);
    if (
      record.type === 'lesson' &&
      (record.schemaVersion !== 2 ||
        record.sequence === undefined ||
        !Array.isArray(record.prerequisiteLessonIds) ||
        !Array.isArray(record.blocks))
    )
      fail(`${record.id}: version-2 lesson fields are required`);
    for (const id of record.applicableRuleIds ?? []) {
      if (recordById.get(id)?.type !== 'rule' && !legacy.catalog.rules.some(rule => rule.id === id))
        fail(`${record.id}: applicable rule ${id} is not a rule`);
    }
    for (const claim of allClaims(record)) {
      for (const id of claim.citationIds)
        if (!citationById.has(id)) fail(`${claim.id}: unknown citation ${id}`);
      if (['author-interpretation', 'classical-meaning'].includes(claim.kind) && !claim.attribution)
        fail(`${claim.id}: interpretation needs attribution`);
    }
    const evidenceIds = [
      ...allClaims(record).flatMap(c => c.citationIds),
      ...(record.discrepancies ?? []).flatMap(d => d.citationIds),
    ];
    for (const d of record.discrepancies ?? []) {
      for (const id of d.citationIds)
        if (!citationById.has(id)) fail(`${d.id}: unknown citation ${id}`);
      if (
        (released.has(record.id) || record.review.status === 'reviewed') &&
        d.status === 'unresolved'
      )
        fail(`${record.id}: reviewed/released with unresolved discrepancy ${d.id}`);
    }
    for (const id of record.review.evidenceCitationIds ?? [])
      if (!citationById.has(id)) fail(`${record.id}: unknown review citation ${id}`);
    if (record.review.status === 'reviewed') {
      for (const id of evidenceIds)
        if (!record.review.evidenceCitationIds?.includes(id))
          fail(`${record.id}: review evidence omits ${id}`);
    }
    for (const structure of [record.structure].filter(Boolean)) {
      for (const id of structure.claimIds) {
        if (
          record.schemaVersion === 1 &&
          !new Set(allClaims(record).map(claim => claim.id)).has(id)
        )
          fail(`${record.id}: structural evidence names unknown claim ${id}`);
        requireClaimReference(id, `${record.id} structure`);
      }
    }
    for (const table of record.tables ?? []) {
      for (const id of table.claimIds) {
        if (record.schemaVersion === 1 && !allClaims(record).some(claim => claim.id === id))
          fail(`${record.id}: structural evidence names unknown claim ${id}`);
        requireClaimReference(id, `${record.id} table`);
      }
      for (const alternative of table.authorAlternatives ?? [])
        for (const id of alternative.claimIds) {
          if (record.schemaVersion === 1 && !allClaims(record).some(claim => claim.id === id))
            fail(`${record.id}: structural evidence names unknown claim ${id}`);
          requireClaimReference(id, `${record.id} table alternative`);
        }
    }
    if (record.type === 'hexagram') {
      if (record.structure.kingWenNumber !== Number(record.id.slice(-2)))
        fail(`${record.id}: number does not match ID`);
      for (const id of [record.structure.lowerTrigramId, record.structure.upperTrigramId]) {
        if (recordById.get(id)?.type !== 'trigram')
          fail(`${record.id}: missing authored trigram ${id}`);
        if (released.has(record.id) && !released.has(id))
          fail(`${record.id}: depends on unreleased trigram ${id}`);
      }
      const pattern = [
        ...recordById.get(record.structure.lowerTrigramId).structure.lines,
        ...recordById.get(record.structure.upperTrigramId).structure.lines,
      ];
      if (pattern.join() !== record.structure.lines.join())
        fail(`${record.id}: composition differs from trigram patterns`);
      record.lines.forEach((line, index) => {
        if (line.position !== index + 1 || line.polarity !== pattern[index])
          fail(`${record.id}: invalid line order or polarity at ${index + 1}`);
      });
      if (!['hexagram-01', 'hexagram-02'].includes(record.id) && record.specialPassages.length)
        fail(`${record.id}: unexpected special passage`);
    }
    for (const table of record.tables ?? [])
      checkTable(table, record.id, recordById, requireReference, fail);
    checkFigures(record, {
      registerFigure(id) {
        if (globalIds.get(id) !== `figure in ${record.id}`)
          fail(`duplicate corpus ID ${id} (${globalIds.get(id) ?? 'unknown ID'} and figure)`);
      },
      requireClaimReference,
      released,
      fail,
    });
  }
  for (const id of manifest.releaseIds) {
    if (recordById.get(id)?.review.status !== 'reviewed')
      fail(`${id}: release requires a reviewed authored record`);
  }
  checkEvidence({ records, claimById, released, requireClaimReference, fail });
  checkLessons({ records, recordById, tableIdsByRecord, released, requireClaimReference, fail });
  checkProjectEvidence({ manifest, records, repositoryRoot, fail });
  uniqueMap([...records, ...sources, ...citations, ...legacyRecords], 'corpus');
  for (const id of manifest.nextBatch.topicIds)
    if (!topics.has(id)) fail(`next batch: unknown topic ${id}`);
  for (const id of manifest.nextBatch.hexagramIds) requireReference(id, 'next batch');
  return { recordById, citationById, allClaims, claimById };

  function requireClaimReference(id, owner) {
    if (!claimById.has(id)) fail(`${owner}: unknown claim ${id}`);
  }
}

function allClaims(record) {
  return [
    ...record.claims,
    ...(record.lines ?? []).flatMap(line => line.claims),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims),
  ];
}

function checkSourceUnitIds(ids, owner, fail) {
  if (ids === undefined) return;
  if (!Array.isArray(ids)) fail(`${owner}: sourceUnitIds must be an array`);
  for (const id of ids)
    if (typeof id !== 'string' || id.trim().length === 0)
      fail(`${owner}: sourceUnitIds must contain non-empty IDs`);
}

function checkTable(table, owner, records, requireReference, fail) {
  const rows = table.rows;
  const unique = (values, label, expected) => {
    if (new Set(values).size !== values.length || (expected && values.length !== expected))
      fail(`${owner}: invalid ${label} inventory`);
  };
  if (table.kind === 'palaces') {
    unique(
      rows.map(r => r.trigramId),
      'palaces',
      8,
    );
    unique(
      rows.flatMap(r => r.hexagramIds),
      'palace hexagrams',
      64,
    );
  }
  if (table.kind === 'na-jia')
    unique(
      rows.map(r => r.trigramId),
      'Na Jia trigrams',
      8,
    );
  if (table.kind === 'markers') {
    unique(
      rows.map(r => r.palaceSequence),
      'marker sequence',
      8,
    );
    for (const r of rows)
      if (Math.abs(r.shiPosition - r.yingPosition) !== 3)
        fail(`${owner}: Shi/Ying separation must be three`);
  }
  if (table.kind === 'branch-elements')
    unique(
      rows.map(r => r.branchId),
      'branches',
      12,
    );
  if (table.kind === 'relative-relations')
    unique(
      rows.map(r => r.relativeId),
      'relative labels',
      5,
    );
  if (table.kind === 'element-cycles') {
    for (const relation of ['generates', 'controls']) {
      const cycle = rows.filter(r => r.relation === relation);
      unique(
        cycle.map(r => r.from),
        `${relation} origins`,
        5,
      );
      unique(
        cycle.map(r => r.to),
        `${relation} destinations`,
        5,
      );
      let current = cycle[0].from;
      const visited = new Set();
      for (let i = 0; i < 5; i++) {
        visited.add(current);
        current = cycle.find(r => r.from === current).to;
      }
      if (visited.size !== 5 || current !== cycle[0].from)
        fail(`${owner}: ${relation} must form a five-element cycle`);
    }
  }
  if (table.kind === 'coin-outcomes') {
    unique(
      rows.map(r => r.sapCount),
      'three-coin outcomes',
      4,
    );
    for (const r of rows)
      if (r.sapCount + r.nguaCount !== 3) fail(`${owner}: three-coin counts must sum to three`);
  }
  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      if (key.endsWith('Id')) requireReference(value, owner);
      if (key.endsWith('Ids')) for (const id of value) requireReference(id, owner);
    }
    for (const pair of [...(row.inner ?? []), ...(row.outer ?? [])]) {
      requireReference(pair.stemId, owner);
      requireReference(pair.branchId, owner);
    }
    if (table.kind === 'transformation') {
      const primary = records.get(row.primaryHexagramId)?.structure.lines;
      const changed = records.get(row.changedHexagramId)?.structure.lines;
      if (
        primary?.join() !== row.primaryLines.join() ||
        changed?.join() !== row.changedLines.join()
      )
        fail(`${owner}: example patterns differ from authored hexagrams`);
      row.primaryLines.forEach((polarity, i) => {
        const expected = row.movingPositions.includes(i + 1)
          ? polarity === 'yin'
            ? 'yang'
            : 'yin'
          : polarity;
        if (expected !== row.changedLines[i])
          fail(`${owner}: example changes a static line or fails to change a moving line`);
      });
    }
  }
}
