/** Build the public, release-only payload from a corpus that passed validation. */
import { compareCanonicalStrings, createSnapshotIdentity } from './snapshot-identity.mjs';

export function createReleaseProjection({ manifest, records, citations, sources }) {
  const releaseIds = [...manifest.releaseIds].sort(compareCanonicalStrings);
  const released = new Set(releaseIds);
  const selectedRecords = records.filter(record => released.has(record.id));
  const claimById = new Map();
  for (const record of selectedRecords)
    for (const claim of allClaims(record)) {
      if (!claimById.has(claim.id)) claimById.set(claim.id, claim);
    }

  const citationIds = new Set();
  const projectEvidence = new Map();
  for (const record of selectedRecords) {
    for (const claim of allClaims(record)) {
      for (const id of claim.citationIds ?? []) citationIds.add(id);
      for (const item of claim.projectEvidence ?? []) {
        const sections = projectEvidence.get(item.documentPath) ?? new Set();
        sections.add(item.section);
        projectEvidence.set(item.documentPath, sections);
      }
    }
    for (const id of record.review.evidenceCitationIds ?? []) citationIds.add(id);
    for (const discrepancy of record.discrepancies ?? [])
      for (const id of discrepancy.citationIds ?? []) citationIds.add(id);
    for (const id of record.review.evidenceClaimIds ?? [])
      if (!claimById.has(id))
        throw new Error(
          `Release projection review references unknown claim ${id} from ${record.id}`,
        );
      else if (!claimIsReleased(id, selectedRecords))
        throw new Error(
          `Release projection review depends on unselected claim ${id} from ${record.id}`,
        );
  }

  const citationById = new Map(citations.map(citation => [citation.id, citation]));
  const projectedCitations = citations.filter(citation => citationIds.has(citation.id));
  for (const id of citationIds)
    if (!citationById.has(id))
      throw new Error(`Release projection references unknown citation ${id}`);

  const editionsBySource = new Map();
  for (const citation of projectedCitations) {
    const editions = editionsBySource.get(citation.sourceId) ?? new Set();
    editions.add(citation.editionId);
    editionsBySource.set(citation.sourceId, editions);
  }
  const projectedSources = sources
    .filter(source => editionsBySource.has(source.id))
    .map(source => {
      const editionIds = editionsBySource.get(source.id);
      const editions = source.editions
        .filter(edition => editionIds.has(edition.id))
        .map(({ localInputPath: _localInputPath, ...edition }) => edition);
      if (editions.length !== editionIds.size)
        throw new Error(`Release projection references an unknown edition for ${source.id}`);
      return { ...source, editions };
    });

  const topicsById = new Map(manifest.topics.map(topic => [topic.id, topic]));
  const topicIds = new Set(selectedRecords.flatMap(record => record.topicIds));
  const topics = manifest.topics.filter(topic => topicIds.has(topic.id));
  for (const id of topicIds)
    if (!topicsById.has(id)) throw new Error(`Release projection references unknown topic ${id}`);

  const contractsByPath = new Map(
    (manifest.projectContracts ?? []).map(contract => [contract.documentPath, contract]),
  );
  const projectContracts = [...projectEvidence]
    .map(([documentPath, sections]) => {
      const contract = contractsByPath.get(documentPath);
      if (!contract)
        throw new Error(`Release projection lacks accepted project contract ${documentPath}`);
      return {
        documentPath,
        revision: contract.revision,
        sections: [...sections].sort(compareCanonicalStrings),
      };
    })
    .sort((left, right) => compareCanonicalStrings(left.documentPath, right.documentPath));

  for (const [claimId, claim] of claimById)
    for (const dependencyId of claim.dependsOnClaimIds ?? [])
      if (!claimById.has(dependencyId))
        throw new Error(
          `Release projection is missing released dependency ${dependencyId} of ${claimId}`,
        );

  const projection = {
    schemaVersion: manifest.schemaVersion,
    recordSchemaVersions: [...new Set(selectedRecords.map(record => record.schemaVersion))].sort(
      (left, right) => left - right,
    ),
    corpusId: manifest.corpusId,
    language: manifest.language,
    releaseIds,
    records: selectedRecords,
    citations: projectedCitations,
    sources: projectedSources,
    topics,
    projectContracts,
  };
  return { ...projection, snapshotIdentity: createSnapshotIdentity(projection) };
}

function allClaims(record) {
  return [
    ...(record.claims ?? []),
    ...(record.lines ?? []).flatMap(line => line.claims ?? []),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims ?? []),
  ];
}

function claimIsReleased(id, records) {
  return records.some(record => allClaims(record).some(claim => claim.id === id));
}
