export function coverageReport({ manifest, records, citations, legacy, checked, auditStatus }) {
  const released = new Set(manifest.releaseIds);
  const reviewed = records.filter(r => released.has(r.id) && r.review.status === 'reviewed');
  const hexagrams = reviewed.filter(r => r.type === 'hexagram');
  const claims = records.flatMap(checked.allClaims);
  const hasAuthor = (claim, author) =>
    claim.attribution?.author.includes(author) || claim.attribution?.via?.includes(author);
  const allHexagramIds = Array.from(
    { length: 64 },
    (_, i) => `hexagram-${String(i + 1).padStart(2, '0')}`,
  );
  return {
    schemaVersion: 1,
    corpusId: manifest.corpusId,
    complete: auditStatus?.complete ?? false,
    evidenceNote:
      'Counts describe authored, source-compared content. Codex review is recorded; independent specialist approval is not claimed.',
    records: {
      authored: records.length,
      released: reviewed.length,
      draftIds: records.filter(r => r.review.status === 'draft').map(r => r.id),
      disputedIds: records.filter(r => r.review.status === 'disputed').map(r => r.id),
    },
    claims: {
      total: claims.length,
      missingCitationIds: claims.filter(c => !c.citationIds.length).map(c => c.id),
    },
    citations: { total: citations.length },
    trigrams: { reviewed: reviewed.filter(r => r.type === 'trigram').length, expected: 8 },
    hexagrams: {
      reviewed: hexagrams.length,
      expected: 64,
      reviewedIds: hexagrams.map(r => r.id),
      missingIds: allHexagramIds.filter(id => !hexagrams.some(r => r.id === id)),
    },
    lines: {
      reviewedPositions: hexagrams.reduce((n, r) => n + r.lines.length, 0),
      expected: 384,
      byAuthor: manifest.coverageAuthors.map(author => ({
        author,
        overviewHexagrams: hexagrams.filter(r => r.claims.some(c => hasAuthor(c, author))).length,
        reviewedLinePositions: hexagrams.reduce(
          (n, r) => n + r.lines.filter(l => l.claims.some(c => hasAuthor(c, author))).length,
          0,
        ),
        missingPilotPositions: hexagrams.flatMap(r =>
          r.lines
            .filter(l => !l.claims.some(c => hasAuthor(c, author)))
            .map(l => ({ hexagramId: r.id, position: l.position })),
        ),
      })),
    },
    topics: manifest.topics.map(topic => ({
      ...topic,
      releasedRecordIds: reviewed.filter(r => r.topicIds.includes(topic.id)).map(r => r.id),
    })),
    resolvedDiscrepancies: records.flatMap(r =>
      (r.discrepancies ?? [])
        .filter(d => d.status === 'resolved')
        .map(d => ({ recordId: r.id, ...d })),
    ),
    unresolvedDiscrepancies: records.flatMap(r =>
      (r.discrepancies ?? [])
        .filter(d => d.status === 'unresolved')
        .map(d => ({ recordId: r.id, ...d })),
    ),
    legacyUnaudited: Object.fromEntries(
      ['entities', 'terms', 'rules'].map(key => [key, legacy.catalog[key].map(r => r.id)]),
    ),
    nextBatch: manifest.nextBatch,
    ...(auditStatus ? { audit: auditStatus.gates } : {}),
  };
}
