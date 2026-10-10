import { referencesOf } from '../src/content-structure.ts';

const TRIGRAM_ORDER = [
  'trigram-heaven',
  'trigram-lake',
  'trigram-fire',
  'trigram-thunder',
  'trigram-wind',
  'trigram-water',
  'trigram-mountain',
  'trigram-earth',
];
export function summary(record) {
  const text =
    record.entries.find(entry => entry.attribution)?.text ??
    record.entries[0]?.text ??
    record.title;
  const paragraph = text.split('\n\n')[0];
  return paragraph.length <= 260 ? paragraph : `${paragraph.slice(0, 257).replace(/\s+\S*$/, '')}…`;
}
export function projectCorpus(records, sources, bibliography) {
  const ready = records.filter(record => record.status === 'ready');
  const metadata = ready.map(record => ({
    id: record.id,
    type: record.type,
    title: record.title,
    aliases: record.aliases ?? [],
    summary: summary(record),
    topicIds: record.topicIds ?? [],
    sourceIds: [
      ...new Set(referencesOf(record).flatMap(ref => ('sourceId' in ref ? [ref.sourceId] : []))),
    ],
    asset: `knowledge/${record.id}.json`,
  }));
  const catalog = {
    entities: [],
    terms: [],
    rules: [],
    sources: [...bibliography.sources],
    references: [...bibliography.references],
  };
  for (const source of sources)
    catalog.sources.push({
      id: source.id,
      title: source.title,
      author: [source.author, ...source.contributors].join('; '),
      publication: source.editions
        .map(e =>
          [e.publication.publisher, e.publication.year, e.publication.note]
            .filter(v => v !== null)
            .join('; '),
        )
        .join('\n'),
      rights: source.editions.map(e => e.rights.note).join('\n'),
      limitations: source.limitations ?? [],
      provenance: source.editions.map(e => `${e.label}; ${e.pdfPageCount} trang PDF.`).join('\n'),
    });
  for (const record of ready) {
    const common = {
      id: record.id,
      name: record.title,
      aliases: record.aliases ?? [],
      explanation: summary(record),
      ...(record.applicableRuleIds ? { applicableRuleIds: record.applicableRuleIds } : {}),
    };
    if (record.type === 'trigram') catalog.entities.push({ ...common, kind: 'trigram' });
    if (record.type === 'hexagram')
      catalog.entities.push({
        ...common,
        kind: 'hexagram',
        kingWenNumber: record.kingWenNumber,
        upperTrigramId: record.upperTrigramId,
        lowerTrigramId: record.lowerTrigramId,
      });
    if (record.type === 'term')
      catalog.terms.push({
        id: record.id,
        name: record.title,
        aliases: record.aliases ?? [],
        definition: summary(record),
        ...(record.applicableRuleIds ? { applicableRuleIds: record.applicableRuleIds } : {}),
      });
    if (record.type === 'rule')
      catalog.rules.push({
        id: record.id,
        title: record.title,
        explanation: summary(record),
        category: record.category,
        ruleset: record.ruleset,
      });
    if (record.type === 'article') continue;
    const refs = referencesOf(record);
    for (const sourceId of new Set(refs.map(ref => ref.sourceId ?? 'source-liuyao-v1-contract'))) {
      const ref = refs.find(ref => (ref.sourceId ?? 'source-liuyao-v1-contract') === sourceId);
      catalog.references.push({
        id: `reference-${record.id}-${sourceId}`,
        sourceId,
        targetIds: [record.id],
        location: ref.pdfPages
          ? `PDF ${ref.pdfPages.join('–')}${ref.section ? `; ${ref.section}` : ''}`
          : `${ref.documentPath}; ${ref.section}`,
      });
    }
  }
  catalog.entities.sort((a, b) =>
    a.kind !== b.kind
      ? a.kind === 'trigram'
        ? -1
        : 1
      : a.kind === 'hexagram'
        ? a.kingWenNumber - b.kingWenNumber
        : TRIGRAM_ORDER.indexOf(a.id) - TRIGRAM_ORDER.indexOf(b.id),
  );
  return { metadata, catalog, ready };
}
