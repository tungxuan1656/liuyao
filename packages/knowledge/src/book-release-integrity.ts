import type { BookCitation } from './book-schema.js';
import type {
  BookRecordVersioned,
  ReleasedBookManifest,
  ReleasedBookSource,
} from './book-schema-v2.js';

interface IntegrityClaim {
  readonly id: string;
  readonly citationIds: readonly string[];
  readonly dependsOnClaimIds?: readonly string[];
  readonly projectEvidence?: readonly { documentPath: string; section: string; revision: string }[];
  readonly kind: string;
}
interface IntegrityRecord {
  readonly id: string;
  readonly type: string;
  readonly claims: readonly IntegrityClaim[];
  readonly review: {
    readonly evidenceCitationIds?: readonly string[];
    readonly evidenceClaimIds?: readonly string[];
  };
  readonly discrepancies?: readonly { id: string; citationIds: readonly string[] }[];
  readonly structure?: { claimIds: readonly string[] };
  readonly lines?: readonly { claims: readonly IntegrityClaim[] }[];
  readonly specialPassages?: readonly { claims: readonly IntegrityClaim[] }[];
  readonly tables?: readonly IntegrityTable[];
  readonly blocks?: readonly {
    id: string;
    kind: string;
    supportingClaimIds: readonly string[];
    target?: { kind: string; recordId: string; id: string };
  }[];
  readonly prerequisiteLessonIds?: readonly string[];
  readonly figures?: readonly IntegrityFigure[];
}
interface IntegrityTable {
  readonly id?: string;
  readonly claimIds: readonly string[];
  readonly authorAlternatives?: readonly { claimIds: readonly string[] }[];
}
interface IntegrityFigure {
  readonly id: string;
  readonly kind: string;
  readonly sourceUnitIds: readonly string[];
  readonly labels: readonly { claimIds: readonly string[] }[];
  readonly claimIds: readonly string[];
  readonly inspectionStatus: string;
  readonly orientation?: { claimIds: readonly string[] };
  readonly authorAlternatives?: readonly { claimIds: readonly string[] }[];
}

/** Check selected claims, citations, sources, project evidence, and figure closure. */
export function assertReleaseEvidenceIntegrity(
  records: readonly BookRecordVersioned[],
  citations: readonly BookCitation[],
  sources: readonly ReleasedBookSource[],
  manifest: ReleasedBookManifest,
): void {
  const fail = (message: string): never => {
    throw new Error(`Ineligible book release: ${message}`);
  };
  const typedRecords = records as readonly IntegrityRecord[];
  const citationById = new Map(citations.map(citation => [citation.id, citation]));
  const sourceById = new Map(sources.map(source => [source.id, source]));
  const claims = new Map<string, { claim: IntegrityClaim; owner: string }>();
  const globalIds = new Set<string>([
    ...records.map(record => record.id),
    ...citations.map(citation => citation.id),
    ...sources.map(source => source.id),
  ]);
  if (globalIds.size !== records.length + citations.length + sources.length)
    fail('duplicate projected IDs');
  for (const record of typedRecords)
    for (const claim of allClaims(record)) {
      if (claims.has(claim.id) || globalIds.has(claim.id)) fail(`duplicate claim ${claim.id}`);
      globalIds.add(claim.id);
      claims.set(claim.id, { claim, owner: record.id });
    }

  const selected = new Set(manifest.releaseIds);
  const states = new Map<string, 'visiting' | 'visited'>();
  const visitClaim = (id: string, owner: string): void => {
    if (states.get(id) === 'visiting') fail(`${owner} has a claim dependency cycle at ${id}`);
    if (states.get(id) === 'visited') return;
    const entry = claims.get(id);
    if (!entry) return fail(`${owner} references unknown claim ${id}`);
    if (!selected.has(entry.owner)) fail(`${owner} depends on unselected claim ${id}`);
    states.set(id, 'visiting');
    for (const dependency of entry.claim.dependsOnClaimIds ?? []) visitClaim(dependency, owner);
    states.set(id, 'visited');
  };
  const checkClaimRefs = (ids: readonly string[], owner: string): void => {
    for (const id of ids) visitClaim(id, owner);
  };
  const checkCitationRefs = (ids: readonly string[], owner: string): void => {
    for (const id of ids)
      if (!citationById.has(id)) fail(`${owner} references unknown citation ${id}`);
  };

  for (const record of typedRecords) {
    const recordClaims = allClaims(record);
    const expectedReviewIds = new Set([
      ...recordClaims.flatMap(claim => claim.citationIds),
      ...(record.discrepancies ?? []).flatMap(item => item.citationIds),
    ]);
    for (const id of expectedReviewIds)
      if (!record.review.evidenceCitationIds?.includes(id))
        fail(`${record.id} review omits citation ${id}`);
    for (const claim of recordClaims) {
      checkCitationRefs(claim.citationIds, claim.id);
      checkClaimRefs([claim.id], record.id);
      if (claim.kind === 'project-convention') {
        if (claim.citationIds.length || !claim.projectEvidence?.length)
          fail(`${claim.id} has invalid project-convention evidence`);
        if (!record.review.evidenceClaimIds?.includes(claim.id))
          fail(`${record.id} review omits project-convention claim ${claim.id}`);
      } else if (claim.projectEvidence?.length) {
        fail(`${claim.id} has project evidence on a citation claim`);
      }
    }
    checkCitationRefs(record.review.evidenceCitationIds ?? [], `${record.id} review`);
    checkClaimRefs(record.review.evidenceClaimIds ?? [], `${record.id} review`);
    if (record.type === 'lesson') assertLessonReviewCoverage(record, claims, fail);
    checkClaimRefs(record.structure?.claimIds ?? [], `${record.id} structure`);
    for (const table of record.tables ?? [])
      checkClaimRefs(
        [...table.claimIds, ...(table.authorAlternatives ?? []).flatMap(item => item.claimIds)],
        `${record.id} table`,
      );
    for (const discrepancy of record.discrepancies ?? [])
      checkCitationRefs(discrepancy.citationIds, discrepancy.id);
    for (const block of record.blocks ?? []) {
      checkClaimRefs(block.supportingClaimIds, `${record.id}.${block.id}`);
      if (block.kind !== 'table' && block.kind !== 'figure') continue;
      if (!block.target || block.target.kind !== block.kind)
        fail(`${record.id}.${block.id} target kind does not match`);
      const owner = typedRecords.find(item => item.id === block.target!.recordId);
      if (!owner || !selected.has(owner.id))
        return fail(`${record.id}.${block.id} target owner is unavailable`);
      const targetOwner = owner;
      const target =
        block.kind === 'table'
          ? targetOwner.tables?.find(item => item.id === block.target!.id)
          : targetOwner.figures?.find(item => item.id === block.target!.id);
      if (!target) return fail(`${record.id}.${block.id} target is unavailable`);
      const targetShape = target;
      const targetClaimIds =
        block.kind === 'table'
          ? [
              ...targetShape.claimIds,
              ...(targetShape.authorAlternatives ?? []).flatMap(item => item.claimIds),
            ]
          : [
              ...(targetShape as IntegrityFigure).claimIds,
              ...(targetShape as IntegrityFigure).labels.flatMap(item => item.claimIds),
              ...((targetShape as IntegrityFigure).orientation?.claimIds ?? []),
              ...((targetShape as IntegrityFigure).authorAlternatives ?? []).flatMap(
                item => item.claimIds,
              ),
            ];
      if (block.supportingClaimIds.some(id => !targetClaimIds.includes(id)))
        fail(`${record.id}.${block.id} support is absent from target evidence`);
    }
    for (const figure of record.figures ?? []) {
      const refs = [
        ...figure.claimIds,
        ...figure.labels.flatMap(label => label.claimIds),
        ...(figure.orientation?.claimIds ?? []),
        ...(figure.authorAlternatives ?? []).flatMap(item => item.claimIds),
      ];
      checkClaimRefs(refs, `${record.id} figure ${figure.id}`);
      if (figure.sourceUnitIds.some(id => !id.trim()))
        fail(`${record.id} figure ${figure.id} has empty source unit`);
      if (figure.kind === 'plate' && figure.inspectionStatus !== 'visually-inspected')
        fail(`${record.id} plate ${figure.id} is not visually inspected`);
      if (
        figure.kind !== 'plate' &&
        (!figure.sourceUnitIds.length || !figure.claimIds.length || !figure.labels.length)
      )
        fail(`${record.id} figure ${figure.id} has incomplete evidence`);
      if (figure.labels.some(label => !label.claimIds.length))
        fail(`${record.id} figure ${figure.id} has an unsupported label`);
    }
  }

  const lessons = typedRecords.filter(record => record.type === 'lesson');
  const lessonIds = new Set(lessons.map(lesson => lesson.id));
  for (const lesson of lessons) {
    for (const prerequisite of lesson.prerequisiteLessonIds ?? [])
      if (!lessonIds.has(prerequisite) || !selected.has(prerequisite))
        fail(`${lesson.id} has unavailable prerequisite ${prerequisite}`);
  }
  assertLessonAcyclic(lessons, fail);

  for (const citation of citations) {
    const source = sourceById.get(citation.sourceId);
    if (!source?.editions.some(edition => edition.id === citation.editionId))
      fail(`${citation.id} has a broken source or edition link`);
  }
  for (const source of sources)
    for (const edition of source.editions)
      if ('localInputPath' in edition) fail(`${source.id} exposes a local input path`);
  for (const source of sources) {
    const editionIds = source.editions.map(edition => edition.id);
    if (new Set(editionIds).size !== editionIds.length)
      fail(`${source.id} has duplicate edition IDs`);
  }

  for (const record of typedRecords)
    for (const claim of allClaims(record))
      for (const evidence of claim.projectEvidence ?? []) {
        const contract = manifest.projectContracts.find(
          item => item.documentPath === evidence.documentPath,
        );
        if (
          !contract ||
          contract.revision !== evidence.revision ||
          !contract.sections.includes(evidence.section)
        )
          fail(`${claim.id} has unvalidated project evidence`);
      }
}

function allClaims(record: IntegrityRecord): IntegrityClaim[] {
  return [
    ...record.claims,
    ...(record.lines ?? []).flatMap(line => line.claims),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims),
  ];
}

function assertLessonReviewCoverage(
  lesson: IntegrityRecord,
  claims: ReadonlyMap<string, { claim: IntegrityClaim; owner: string }>,
  fail: (message: string) => never,
): void {
  const evidence = new Set(lesson.review.evidenceClaimIds ?? []);
  if (!evidence.size) fail(`${lesson.id} lesson review has no evidence claims`);

  const covered = new Set<string>();
  const pending = (lesson.blocks ?? []).flatMap(block => block.supportingClaimIds);
  while (pending.length) {
    const id = pending.pop()!;
    if (covered.has(id)) continue;
    covered.add(id);
    if (!evidence.has(id)) fail(`${lesson.id} review omits block support claim ${id}`);
    const claim = claims.get(id)?.claim;
    if (!claim) fail(`${lesson.id} references unknown claim ${id}`);
    pending.push(...(claim.dependsOnClaimIds ?? []));
  }
}

function assertLessonAcyclic(
  lessons: readonly IntegrityRecord[],
  fail: (message: string) => never,
): void {
  const byId = new Map(lessons.map(lesson => [lesson.id, lesson]));
  const states = new Map<string, 'visiting' | 'visited'>();
  const visit = (id: string): void => {
    if (states.get(id) === 'visiting') fail(`lesson prerequisite cycle at ${id}`);
    if (states.get(id) === 'visited') return;
    states.set(id, 'visiting');
    for (const prerequisite of byId.get(id)?.prerequisiteLessonIds ?? []) visit(prerequisite);
    states.set(id, 'visited');
  };
  for (const lesson of lessons) visit(lesson.id);
}
