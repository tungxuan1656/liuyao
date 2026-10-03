import legacy from '../data/legacy/catalog.json' with { type: 'json' };
import { listBookRecords, listBookCitations, listBookSources } from './book-catalog.js';
import type { BookRecord } from './book-schema.js';
import type {
  KnowledgeCatalog,
  KnowledgeEntity,
  KnowledgeRule,
  KnowledgeTerm,
  SourceReference,
} from './schema.js';

const snapshot = legacy.catalog as unknown as KnowledgeCatalog;
const records = listBookRecords();
const explanation = (record: BookRecord): string =>
  record.claims.map(claim => claim.text).join('\n\n');

const entities: KnowledgeEntity[] = records.flatMap<KnowledgeEntity>(record => {
  if (record.type !== 'trigram' && record.type !== 'hexagram') return [];
  const common = {
    id: record.id,
    name: record.title,
    aliases: record.aliases,
    explanation: explanation(record),
    applicableRuleIds: record.applicableRuleIds,
  };
  if (record.type === 'trigram') return [{ ...common, kind: 'trigram', id: record.id }];
  return [
    {
      ...common,
      kind: 'hexagram',
      id: record.id,
      kingWenNumber: record.structure.kingWenNumber,
      upperTrigramId: record.structure.upperTrigramId,
      lowerTrigramId: record.structure.lowerTrigramId,
    },
  ];
});
const terms: KnowledgeTerm[] = records.flatMap(record =>
  record.type === 'term'
    ? [
        {
          id: record.id,
          name: record.title,
          aliases: record.aliases,
          definition: explanation(record),
          applicableRuleIds: record.applicableRuleIds,
        },
      ]
    : [],
);
const rules: KnowledgeRule[] = records.flatMap(record =>
  record.type === 'rule'
    ? [
        {
          id: record.id,
          ruleset: record.ruleset,
          title: record.title,
          explanation: explanation(record),
          category: record.category,
        },
      ]
    : [],
);

const references: SourceReference[] = listBookCitations().flatMap(citation => {
  const targetIds = records
    .filter(
      record =>
        record.type !== 'article' &&
        [
          ...record.claims,
          ...(record.type === 'hexagram'
            ? [
                ...record.lines.flatMap(line => line.claims),
                ...record.specialPassages.flatMap(passage => passage.claims),
              ]
            : []),
        ].some(claim => claim.citationIds.includes(citation.id)),
    )
    .map(record => record.id)
    .filter((id): id is SourceReference['targetIds'][number] => !id.startsWith('article-'));
  if (!targetIds.length) return [];
  const location = citation.location;
  const edition = listBookSources()
    .find(source => source.id === citation.sourceId)
    ?.editions.find(edition => edition.id === citation.editionId);
  if (!edition) throw new Error(`Missing citation edition: ${citation.id}`);
  const pdfPages =
    location.pdfPageStart === location.pdfPageEnd
      ? `${location.pdfPageStart}`
      : `${location.pdfPageStart}–${location.pdfPageEnd}`;
  const printedPages =
    location.printedPageEnd && location.printedPageEnd !== location.printedPageStart
      ? `${location.printedPageStart}–${location.printedPageEnd}`
      : location.printedPageStart;
  return [
    {
      id: `reference-${citation.id}`,
      sourceId: citation.sourceId,
      targetIds,
      location: `${edition.label}; ${location.chapter}; ${location.section}; PDF ${pdfPages}${printedPages ? `; trang in ${printedPages}` : ''}.`,
    },
  ];
});

/** The snapshot retains unaudited compatibility content; migrated IDs exist only in authored JSON. */
export const adaptedCatalog: KnowledgeCatalog = {
  entities: [...entities, ...snapshot.entities].sort((a, b) =>
    a.kind === b.kind
      ? a.kind === 'hexagram' && b.kind === 'hexagram'
        ? a.kingWenNumber - b.kingWenNumber
        : 0
      : a.kind === 'trigram'
        ? -1
        : 1,
  ),
  terms: [...snapshot.terms, ...terms],
  rules: [...snapshot.rules, ...rules],
  sources: [
    ...snapshot.sources,
    ...listBookSources().map(source => ({
      id: source.id,
      title: source.title,
      author: [source.author, ...source.contributors].join('; '),
      publication: source.editions
        .map(edition =>
          [edition.publication.publisher, edition.publication.year, edition.publication.note]
            .filter(value => value !== null)
            .join('; '),
        )
        .join('\n'),
      rights: source.editions.map(edition => edition.rights.note).join('\n'),
      provenance: source.editions
        .map(
          edition =>
            `${edition.label}; SHA-256 ${edition.sha256}; ${edition.pdfPageCount} trang PDF.`,
        )
        .join('\n'),
    })),
  ],
  references: [...snapshot.references, ...references],
};
