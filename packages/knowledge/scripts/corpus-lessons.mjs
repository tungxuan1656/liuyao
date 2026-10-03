import { figureEvidence } from './corpus-figures.mjs';

/** Validate lesson graphs, ordered blocks, typed targets, and review coverage. */
export function checkLessons({
  records,
  recordById,
  tableIdsByRecord,
  released,
  requireClaimReference,
  fail,
}) {
  const lessons = records.filter(record => record.type === 'lesson');
  const sequences = new Map();
  const lessonIds = new Set(lessons.map(lesson => lesson.id));
  const lessonGraph = new Map();

  for (const lesson of lessons) {
    if (!Number.isInteger(lesson.sequence) || lesson.sequence < 1)
      fail(`${lesson.id}: lesson sequence must be a positive integer`);
    if (sequences.has(lesson.sequence))
      fail(
        `${lesson.id}: duplicate lesson sequence ${lesson.sequence} (already used by ${sequences.get(lesson.sequence)})`,
      );
    sequences.set(lesson.sequence, lesson.id);

    const prerequisites = lesson.prerequisiteLessonIds ?? [];
    if (new Set(prerequisites).size !== prerequisites.length)
      fail(`${lesson.id}: duplicate prerequisite lesson ID`);
    lessonGraph.set(lesson.id, prerequisites);
    for (const prerequisite of prerequisites) {
      if (!lessonIds.has(prerequisite))
        fail(`${lesson.id}: missing prerequisite lesson ${prerequisite}`);
      if (released.has(lesson.id) && !released.has(prerequisite))
        fail(`${lesson.id}: prerequisite lesson ${prerequisite} is not selected for release`);
    }

    const blockIds = new Set();
    const supportIds = new Set();
    for (const [index, block] of (lesson.blocks ?? []).entries()) {
      if (block.position !== index + 1)
        fail(`${lesson.id}: block ${block.id} position must be ${index + 1}`);
      if (blockIds.has(block.id)) fail(`${lesson.id}: duplicate block ${block.id}`);
      blockIds.add(block.id);
      for (const id of block.supportingClaimIds ?? []) {
        requireClaimReference(id, `${lesson.id}.${block.id}`);
        supportIds.add(id);
      }
      if (block.kind === 'table' || block.kind === 'figure')
        checkLessonTarget(lesson, block, recordById, tableIdsByRecord, released, fail);
    }

    if (lesson.type === 'lesson' && lesson.review.status === 'reviewed') {
      const evidence = new Set(lesson.review.evidenceClaimIds ?? []);
      for (const id of evidence) requireClaimReference(id, `${lesson.id} review evidence`);
      for (const claim of lesson.claims ?? []) {
        if (claim.kind === 'project-convention' && !evidence.has(claim.id))
          fail(`${lesson.id}: review evidence omits project-convention claim ${claim.id}`);
      }
      const covered = new Set();
      const pending = [...supportIds];
      while (pending.length) {
        const claimId = pending.pop();
        if (!claimId || covered.has(claimId)) continue;
        covered.add(claimId);
        if (!evidence.has(claimId))
          fail(`${lesson.id}: review evidence omits block support claim ${claimId}`);
        const claim = findClaim(records, claimId);
        if (claim) pending.push(...(claim.dependsOnClaimIds ?? []));
      }
    }
  }

  const state = new Map();
  const visit = lessonId => {
    if (state.get(lessonId) === 'visiting') fail(`${lessonId}: prerequisite lesson cycle`);
    if (state.get(lessonId) === 'visited') return;
    state.set(lessonId, 'visiting');
    for (const prerequisite of lessonGraph.get(lessonId) ?? []) visit(prerequisite);
    state.set(lessonId, 'visited');
  };
  for (const lessonId of lessonIds) visit(lessonId);
}

function findClaim(records, claimId) {
  for (const record of records) {
    const claims = [
      ...(record.claims ?? []),
      ...(record.lines ?? []).flatMap(line => line.claims ?? []),
      ...(record.specialPassages ?? []).flatMap(passage => passage.claims ?? []),
    ];
    const found = claims.find(claim => claim.id === claimId);
    if (found) return found;
  }
  return undefined;
}

function checkLessonTarget(lesson, block, recordById, tableIdsByRecord, released, fail) {
  const target = block.target;
  const owner = recordById.get(target?.recordId);
  if (!owner) fail(`${lesson.id}.${block.id}: missing target owner ${target?.recordId}`);

  let evidence;
  if (block.kind === 'table' && target.kind === 'table') {
    if (!tableIdsByRecord.get(owner.id)?.has(target.id))
      fail(
        `${lesson.id}.${block.id}: table target ID ${target.id} is not record-scoped in ${owner.id}`,
      );
    const table = (owner.tables ?? []).find(item => item.id === target.id);
    if (!table) fail(`${lesson.id}.${block.id}: missing table target ${target.id} in ${owner.id}`);
    evidence = [
      ...(table.claimIds ?? []),
      ...(table.authorAlternatives ?? []).flatMap(alternative => alternative.claimIds ?? []),
    ];
  } else if (block.kind === 'figure' && target.kind === 'figure') {
    const figure = (owner.figures ?? []).find(item => item.id === target.id);
    if (!figure)
      fail(`${lesson.id}.${block.id}: missing figure target ${target.id} in ${owner.id}`);
    evidence = figureEvidence(figure);
  } else {
    fail(`${lesson.id}.${block.id}: target kind does not match block kind`);
  }

  if (released.has(lesson.id) && !released.has(owner.id))
    fail(`${lesson.id}: target owner ${owner.id} is not selected for release`);
  for (const id of block.supportingClaimIds ?? [])
    if (!evidence.includes(id))
      fail(`${lesson.id}.${block.id}: target ${target.id} does not include support claim ${id}`);
}
