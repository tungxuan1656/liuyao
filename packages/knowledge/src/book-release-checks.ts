import type { BookCitation } from './book-schema.js';
import type {
  BookRecordVersioned,
  ReleasedBookManifest,
  ReleasedBookSource,
} from './book-schema-v2.js';
import { assertReleaseEvidenceIntegrity } from './book-release-integrity.js';

type RuntimeClaim = {
  readonly id: string;
  readonly dependsOnClaimIds?: readonly string[];
};
type RuntimeTable = {
  readonly id?: string;
  readonly claimIds: readonly string[];
  readonly authorAlternatives?: readonly { readonly claimIds: readonly string[] }[];
};
type RuntimeFigure = {
  readonly id: string;
  readonly kind: string;
  readonly sourceUnitIds: readonly string[];
  readonly labels: readonly { readonly id: string }[];
  readonly claimIds: readonly string[];
  readonly inspectionStatus: string;
  readonly orientation?: { readonly claimIds: readonly string[] };
  readonly authorAlternatives?: readonly { readonly claimIds: readonly string[] }[];
};
type RuntimeBlock = {
  readonly id: string;
  readonly position: number;
  readonly kind: string;
  readonly supportingClaimIds: readonly string[];
  readonly target?: { readonly kind: string; readonly recordId: string; readonly id: string };
};
type RuntimeRecord = {
  readonly id: string;
  readonly schemaVersion: number;
  readonly type: string;
  readonly topicIds: readonly string[];
  readonly claims: readonly RuntimeClaim[];
  readonly review: { readonly status: string; readonly evidenceClaimIds?: readonly string[] };
  readonly discrepancies?: readonly { readonly status: string }[];
  readonly structure?: { readonly claimIds: readonly string[] };
  readonly lines?: readonly { readonly claims: readonly RuntimeClaim[] }[];
  readonly specialPassages?: readonly { readonly claims: readonly RuntimeClaim[] }[];
  readonly tables?: readonly RuntimeTable[];
  readonly figures?: readonly RuntimeFigure[];
  readonly blocks?: readonly RuntimeBlock[];
  readonly prerequisiteLessonIds?: readonly string[];
  readonly sequence?: number;
};

/** Fail closed if generated release data is edited or partially regenerated. */
export function assertEligibleRelease(
  records: readonly BookRecordVersioned[],
  citations: readonly BookCitation[],
  sources: readonly ReleasedBookSource[],
  manifest: ReleasedBookManifest,
): void {
  const fail = (message: string): never => {
    throw new Error(`Ineligible book release: ${message}`);
  };
  const runtimeRecords = records as unknown as readonly RuntimeRecord[];
  const recordById = new Map(runtimeRecords.map(record => [record.id, record]));
  const releaseIds = new Set(manifest.releaseIds);
  if (releaseIds.size !== manifest.releaseIds.length || releaseIds.size !== records.length)
    fail('release membership does not match projected records');
  if (recordById.size !== records.length) fail('duplicate record ID');
  for (const record of runtimeRecords) {
    if (!releaseIds.has(record.id)) fail(`${record.id} is not in release membership`);
    if (record.review.status !== 'reviewed') fail(`${record.id} is not reviewed`);
    if (record.discrepancies?.some(item => item.status === 'unresolved'))
      fail(`${record.id} has unresolved discrepancies`);
    if (record.schemaVersion !== 1 && record.schemaVersion !== 2)
      fail(`${record.id} has unsupported schema version`);
    const localClaims = new Set(allClaims(record).map(claim => claim.id));
    if (record.schemaVersion === 1) {
      for (const id of record.structure?.claimIds ?? [])
        if (!localClaims.has(id)) fail(`${record.id} has invalid local structural claim ${id}`);
      for (const table of record.tables ?? [])
        for (const id of [
          ...table.claimIds,
          ...(table.authorAlternatives ?? []).flatMap(item => item.claimIds),
        ])
          if (!localClaims.has(id)) fail(`${record.id} has invalid local table claim ${id}`);
    }
    if (record.schemaVersion === 2) checkExtendedRecord(record, fail);
  }
  for (const record of runtimeRecords)
    if (record.type === 'lesson')
      for (const prerequisite of record.prerequisiteLessonIds ?? [])
        if (!recordById.has(prerequisite))
          fail(`${record.id} has unavailable prerequisite ${prerequisite}`);

  const recordVersions = [...new Set(runtimeRecords.map(record => record.schemaVersion))].sort();
  const declaredVersions = [...manifest.recordSchemaVersions].sort();
  if (
    manifest.schemaVersion !== 1 ||
    (runtimeRecords.length &&
      JSON.stringify(recordVersions) !== JSON.stringify(declaredVersions)) ||
    (!runtimeRecords.length && declaredVersions.some(version => version !== 1 && version !== 2))
  )
    fail('schema version metadata does not match projected records');
  const topics = new Set(manifest.topics.map(topic => topic.id));
  if (new Set(manifest.topics.map(topic => topic.id)).size !== manifest.topics.length)
    fail('duplicate projected topic ID');
  for (const record of runtimeRecords)
    for (const topicId of record.topicIds)
      if (!topics.has(topicId)) fail(`${record.id} references unavailable topic ${topicId}`);

  assertReleaseEvidenceIntegrity(records, citations, sources, manifest);
}

function checkExtendedRecord(record: RuntimeRecord, fail: (message: string) => never): void {
  for (const figure of record.figures ?? []) {
    if (figure.kind === 'plate' && figure.inspectionStatus !== 'visually-inspected')
      fail(`${record.id} plate ${figure.id} is not visually inspected`);
    if (
      figure.kind !== 'plate' &&
      (!figure.sourceUnitIds.length || !figure.claimIds.length || !figure.labels.length)
    )
      fail(`${record.id} figure ${figure.id} has incomplete evidence`);
  }
  const tables = (record.tables ?? []).flatMap(table => (table.id ? [table.id] : []));
  if (new Set(tables).size !== tables.length) fail(`${record.id} has duplicate table IDs`);
  if (record.type !== 'lesson') return;
  if (!Number.isInteger(record.sequence) || record.sequence! <= 0)
    fail(`${record.id} has invalid lesson sequence`);
  const blocks = record.blocks ?? [];
  for (const [index, block] of blocks.entries())
    if (block.position !== index + 1) fail(`${record.id}.${block.id} has invalid position`);
  const prerequisites = record.prerequisiteLessonIds ?? [];
  if (new Set(prerequisites).size !== prerequisites.length)
    fail(`${record.id} has duplicate prerequisite IDs`);
}

function allClaims(record: RuntimeRecord): RuntimeClaim[] {
  return [
    ...record.claims,
    ...(record.lines ?? []).flatMap(line => line.claims),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims),
  ];
}
