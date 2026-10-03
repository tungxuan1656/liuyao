import legacy from '../data/legacy/catalog.json' with { type: 'json' };
import { listBookRecords, listBookCitations, listBookSources } from './book-catalog.js';
import type { BookRecordVersioned } from './book-schema-v2.js';
import type {
  KnowledgeCatalog,
  KnowledgeEntity,
  KnowledgeRule,
  KnowledgeTerm,
  SourceReference,
} from './schema.js';

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
const SOURCE_ORDER = [
  'source-zhouyi',
  'source-jingshi-yizhuan',
  'source-zengshan-buyi',
  'source-liuyao-v1-contract',
  'source-book-bpct',
  'source-book-pbc',
  'source-book-ntt',
  'source-book-nhl',
];

const snapshot = legacy.catalog as unknown as KnowledgeCatalog;
const records = listBookRecords();
const recordOrder = new Map(records.map((record, index) => [record.id, index]));
const explanation = (record: BookRecordVersioned): string =>
  record.claims.map(claim => claim.text).join('\n\n');
const claimsForCitation = (
  record: BookRecordVersioned,
): readonly { citationIds: readonly string[] }[] => [
  ...record.claims.map(claim => ({ citationIds: claim.citationIds as readonly string[] })),
  ...(record.type === 'hexagram'
    ? [
        ...record.lines.flatMap(line =>
          line.claims.map(claim => ({ citationIds: claim.citationIds as readonly string[] })),
        ),
        ...record.specialPassages.flatMap(passage =>
          passage.claims.map(claim => ({ citationIds: claim.citationIds as readonly string[] })),
        ),
      ]
    : []),
];

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
        record.type !== 'lesson' &&
        claimsForCitation(record).some(claim => claim.citationIds.includes(citation.id)),
    )
    .map(record => record.id)
    .filter((id): id is SourceReference['targetIds'][number] => !id.startsWith('article-'))
    .sort((left, right) => recordOrder.get(left)! - recordOrder.get(right)!);
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
        : a.kind === 'trigram' && b.kind === 'trigram'
          ? TRIGRAM_ORDER.indexOf(a.id) - TRIGRAM_ORDER.indexOf(b.id)
          : 0
      : a.kind === 'trigram'
        ? -1
        : 1,
  ),
  terms: [...snapshot.terms, ...terms],
  rules: [...snapshot.rules, ...rules],
  sources: [
    ...snapshot.sources,
    ...listBookSources()
      .map(source => ({
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
      }))
      .sort((left, right) => SOURCE_ORDER.indexOf(left.id) - SOURCE_ORDER.indexOf(right.id)),
  ],
  references: [...snapshot.references, ...references],
};
