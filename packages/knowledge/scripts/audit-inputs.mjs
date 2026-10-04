import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';

const digest = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');
const allClaims = record => [
  ...(record.claims ?? []),
  ...(record.lines ?? []).flatMap(line => line.claims ?? []),
  ...(record.specialPassages ?? []).flatMap(item => item.claims ?? []),
];
const sorted = values => [...values].sort(compareCanonicalStrings);
const idPattern = /^[A-Za-z0-9][A-Za-z0-9._:/-]*$/;

function addClaim(claimId, claimById, closure, pending, inputClaims) {
  if (!idPattern.test(claimId)) throw new Error(`Malformed claim ID ${claimId}`);
  const claim = claimById.get(claimId);
  if (!claim) throw new Error(`Missing structural claim dependency ${claimId}`);
  if (closure.has(claimId)) return;
  closure.add(claimId);
  inputClaims.add(claimId);
  pending.push(claimId);
}

function insideRoot(root, relative) {
  if (typeof relative !== 'string' || path.isAbsolute(relative))
    throw new Error(`Fixture path must be repository-relative: ${relative}`);
  const resolvedRoot = path.resolve(root ?? '.');
  const resolved = path.resolve(resolvedRoot, relative);
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`))
    throw new Error(`Fixture path escapes repository root: ${relative}`);
  return resolved;
}

/** Derive feat-101 evidence closure for a decision's exact claimed support. */
export async function computeAuditInputs(
  context,
  coveredClaimIds,
  { allowInMemoryFixtures = false, evidenceCitationIds = [], evidenceEditionIds = [], target } = {},
) {
  const { manifest, records, citations, sources, repositoryRoot, fixtureBindings = [] } = context;
  for (const [name, value] of Object.entries({ manifest, records, citations, sources }))
    if (!value) throw new TypeError(`computeAuditInputs requires ${name}`);

  const releaseIds = new Set(manifest.releaseIds);
  const recordById = new Map(records.map(record => [record.id, record]));
  const claimById = new Map();
  const claimRecord = new Map();
  for (const record of records) {
    for (const claim of allClaims(record)) {
      if (claimById.has(claim.id)) throw new Error(`Duplicate claim ID ${claim.id}`);
      claimById.set(claim.id, claim);
      claimRecord.set(claim.id, record.id);
    }
  }
  const citationById = new Map(citations.map(citation => [citation.id, citation]));
  const sourceById = new Map(sources.map(source => [source.id, source]));
  const closure = new Set();
  const inputClaims = new Set();
  const pending = [];
  for (const id of coveredClaimIds) addClaim(id, claimById, closure, pending, inputClaims);

  const recordIds = new Set();
  const citationIds = new Set();
  const projectPaths = new Set();
  const fixturePaths = new Set();
  const visitedRecords = new Set();
  const processedClaims = new Set();
  const projectContracts = new Map(
    (manifest.projectContracts ?? []).map(contract => [contract.documentPath, contract]),
  );
  const fixturesForClaim = new Map();
  for (const binding of fixtureBindings) {
    if (!binding || !idPattern.test(binding.claimId) || !binding.path)
      throw new Error('Malformed expected fixture binding');
    const entries = fixturesForClaim.get(binding.claimId) ?? [];
    entries.push(binding.path);
    fixturesForClaim.set(binding.claimId, entries);
    if (!claimById.has(binding.claimId))
      throw new Error(`Unknown fixture owner claim ${binding.claimId}`);
    if (binding.ownerId !== claimRecord.get(binding.claimId))
      throw new Error(`Fixture ${binding.path} owner does not match claim ${binding.claimId}`);
    const referenced = [...context.records, ...records].some(record =>
      containsFixtureBinding(record, binding),
    );
    if (!referenced)
      throw new Error(`Fixture ${binding.path} has no explicit typed owner-claim binding`);
    if (binding.ownerId !== claimRecord.get(binding.claimId))
      throw new Error(`Fixture ${binding.path} owner does not match claim ${binding.claimId}`);
  }
  for (const id of evidenceCitationIds) citationIds.add(id);

  while (pending.length) {
    const claimId = pending.shift();
    if (processedClaims.has(claimId)) continue;
    const claim = claimById.get(claimId);
    const ownerId = claimRecord.get(claimId);
    const record = recordById.get(ownerId);
    if (!record) throw new Error(`Missing structural record ${ownerId} for ${claimId}`);
    recordIds.add(ownerId);
    for (const dependency of claim.dependsOnClaimIds ?? [])
      addClaim(dependency, claimById, closure, pending, inputClaims);
    for (const citationId of claim.citationIds ?? []) citationIds.add(citationId);
    for (const evidence of claim.projectEvidence ?? []) projectPaths.add(evidence.documentPath);

    if (!visitedRecords.has(ownerId)) {
      visitedRecords.add(ownerId);
      for (const citationId of record.review?.evidenceCitationIds ?? [])
        citationIds.add(citationId);
      for (const dependency of record.review?.evidenceClaimIds ?? [])
        addClaim(dependency, claimById, closure, pending, inputClaims);
      for (const discrepancy of record.discrepancies ?? [])
        for (const citationId of discrepancy.citationIds ?? []) citationIds.add(citationId);
      const targetClaims = targetClaimIds(target, record);
      for (const dependency of targetClaims)
        addClaim(dependency, claimById, closure, pending, inputClaims);
      if (['cell', 'record', 'sourceunit', 'special'].includes(target?.kind))
        for (const dependency of record.structure?.claimIds ?? [])
          addClaim(dependency, claimById, closure, pending, inputClaims);
      for (const prerequisiteId of record.prerequisiteLessonIds ?? []) {
        const prerequisite = recordById.get(prerequisiteId);
        if (!prerequisite)
          throw new Error(`Missing structural lesson prerequisite ${prerequisiteId}`);
        recordIds.add(prerequisite.id);
        for (const claim of allClaims(prerequisite))
          addClaim(claim.id, claimById, closure, pending, inputClaims);
      }
    }
    for (const fixturePath of fixturesForClaim.get(claimId) ?? []) fixturePaths.add(fixturePath);
    processedClaims.add(claimId);
  }

  const visiting = new Set();
  const visited = new Set();
  const visit = id => {
    if (visiting.has(id)) throw new Error(`Cyclic claim dependency at ${id}`);
    if (visited.has(id)) return;
    visiting.add(id);
    for (const dependency of claimById.get(id).dependsOnClaimIds ?? [])
      if (closure.has(dependency)) visit(dependency);
    visiting.delete(id);
    visited.add(id);
  };
  for (const id of closure) visit(id);

  const lessonVisiting = new Set();
  const lessonVisited = new Set();
  const visitLesson = record => {
    if (lessonVisiting.has(record.id))
      throw new Error(`Cyclic lesson prerequisite at ${record.id}`);
    if (lessonVisited.has(record.id)) return;
    lessonVisiting.add(record.id);
    for (const prerequisiteId of record.prerequisiteLessonIds ?? []) {
      const prerequisite = recordById.get(prerequisiteId);
      if (!prerequisite)
        throw new Error(`Missing structural lesson prerequisite ${prerequisiteId}`);
      visitLesson(prerequisite);
    }
    lessonVisiting.delete(record.id);
    lessonVisited.add(record.id);
  };
  for (const id of visitedRecords) visitLesson(recordById.get(id));

  const editionById = new Map();
  for (const source of sources)
    for (const edition of source.editions) editionById.set(edition.id, edition);
  const citationInputs = [];
  const editionIds = new Set();
  for (const id of evidenceEditionIds) {
    if (!editionById.has(id)) throw new Error(`Unknown structural edition ${id}`);
    editionIds.add(id);
  }
  for (const id of sorted(citationIds)) {
    const citation = citationById.get(id);
    if (!citation) throw new Error(`Unknown structural citation ${id}`);
    citationInputs.push({ id, sha256: digest(citation) });
    if (!sourceById.has(citation.sourceId)) throw new Error(`Unknown source ${citation.sourceId}`);
    editionIds.add(citation.editionId);
  }
  const editionInputs = sorted(editionIds).map(id => {
    const edition = editionById.get(id);
    if (!edition) throw new Error(`Unknown structural edition ${id}`);
    if (!/^[a-f0-9]{64}$/.test(edition.sha256 ?? ''))
      throw new Error(`Malformed edition SHA ${id}`);
    return { id, sha256: edition.sha256 };
  });
  const contractInputs = sorted(projectPaths).map(documentPath => {
    const contract = projectContracts.get(documentPath);
    if (!contract) throw new Error(`Missing structural project contract ${documentPath}`);
    return { documentPath, revision: contract.revision };
  });
  const fixtureInputs = [];
  for (const relative of sorted(fixturePaths)) {
    insideRoot(repositoryRoot, relative);
    const bytes = context.fixtureBytes?.[relative];
    let fixtureBytes;
    if (bytes !== undefined) {
      if (!allowInMemoryFixtures || !context.syntheticInput)
        throw new Error(
          'In-memory fixture bytes are allowed only for explicit synthetic test inputs',
        );
      fixtureBytes = Buffer.from(bytes);
    } else {
      if (!repositoryRoot) throw new Error('Expected fixture hashing requires repositoryRoot');
      const fixturePath = insideRoot(repositoryRoot, relative);
      const [canonicalRoot, canonicalFixture] = await Promise.all([
        realpath(repositoryRoot),
        realpath(fixturePath),
      ]);
      if (!canonicalFixture.startsWith(`${canonicalRoot}${path.sep}`))
        throw new Error(`Fixture path resolves outside repository root: ${relative}`);
      fixtureBytes = await readFile(canonicalFixture);
    }
    fixtureInputs.push({
      path: relative,
      sha256: createHash('sha256').update(fixtureBytes).digest('hex'),
    });
  }
  const recordInputs = sorted(recordIds).map(id => {
    const record = recordById.get(id);
    const claims = allClaims(record).filter(claim => inputClaims.has(claim.id));
    return { id, sha256: digest({ ...record, claims }), released: releaseIds.has(id) };
  });
  const claimIds = sorted(closure);
  return {
    claimIds,
    inputs: {
      records: recordInputs,
      citations: citationInputs,
      editions: editionInputs,
      projectContracts: contractInputs,
      fixtures: fixtureInputs,
    },
    releasedClaimIds: claimIds.filter(id => releaseIds.has(claimRecord.get(id))),
  };
}

function targetClaimIds(target, record) {
  if (!target) return [];
  if (target.kind === 'record') {
    return [
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
  if (target.kind === 'table') {
    const table = record.tables?.find(item => item.id === (target.childId ?? target.id));
    return [
      ...(table?.claimIds ?? []),
      ...(table?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
    ];
  }
  if (target.kind === 'figure') {
    const figure = record.figures?.find(item => item.id === (target.childId ?? target.id));
    return [
      ...(figure?.claimIds ?? []),
      ...(figure?.labels ?? []).flatMap(item => item.claimIds ?? []),
      ...(figure?.orientation?.claimIds ?? []),
      ...(figure?.authorAlternatives ?? []).flatMap(item => item.claimIds ?? []),
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

function containsFixtureBinding(record, binding) {
  const fixtureBindings = record.expectedFixtures ?? record.fixtures ?? [];
  return fixtureBindings.some(
    item =>
      item.path === binding.path &&
      item.claimId === binding.claimId &&
      (item.ownerId === undefined || item.ownerId === record.id),
  );
}

/** Compare a stored, schema-valid input snapshot with the current exact closure. */
export function compareAuditInputs(recorded, current, context) {
  const stale = [];
  const fields = ['records', 'citations', 'editions', 'projectContracts', 'fixtures'];
  for (const field of fields) {
    const currentIds = new Set(current.inputs[field].map(inputIdentity(field)));
    const knownIds = knownInputIds(field, context);
    for (const previous of recorded[field]) {
      const id = inputIdentity(field)(previous);
      if (!knownIds.has(id)) throw new Error(`Unknown or retired recorded ${field} input ${id}`);
      if (!currentIds.has(id)) stale.push(`${field}:${id}:removed`);
    }
    const previous = new Map(recorded[field].map(item => [inputIdentity(field)(item), item]));
    for (const now of current.inputs[field]) {
      const id = inputIdentity(field)(now);
      const before = previous.get(id);
      if (!before) stale.push(`${field}:${id}:added`);
      else if (digest(before) !== digest(now)) stale.push(`${field}:${id}:changed`);
    }
  }
  return { current: stale.length === 0, stale };
}

function inputIdentity(field) {
  return field === 'projectContracts'
    ? item => item.documentPath
    : item => (field === 'fixtures' ? item.path : item.id);
}

function knownInputIds(field, context) {
  if (field === 'records') return new Set(context.records.map(item => item.id));
  if (field === 'citations') return new Set(context.citations.map(item => item.id));
  if (field === 'editions')
    return new Set(context.sources.flatMap(source => source.editions.map(edition => edition.id)));
  if (field === 'projectContracts')
    return new Set((context.manifest.projectContracts ?? []).map(item => item.documentPath));
  return new Set((context.fixtureBindings ?? []).map(item => item.path));
}
