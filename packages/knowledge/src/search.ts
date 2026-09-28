import { listKnowledgeEntities, listRules, listTerms } from './catalog.js';
import type { KnowledgeEntity, KnowledgeRule, KnowledgeTerm } from './schema.js';

export type KnowledgeSearchRecord = KnowledgeEntity | KnowledgeTerm | KnowledgeRule;

export interface KnowledgeSearchMatch {
  readonly kind: 'entity' | 'term' | 'rule';
  readonly record: KnowledgeSearchRecord;
}

function normalizeExact(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .trim()
    .replace(/\s+/gu, ' ');
}

function accentInsensitive(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{Mark}/gu, '')
    .toLowerCase()
    .replace(/đ/gu, 'd')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .trim()
    .replace(/\s+/gu, ' ');
}

/** Normalize Unicode composition, case, punctuation, symbols, and whitespace. */
export function normalizeKnowledgeQuery(value: string): string {
  return accentInsensitive(value);
}

function searchableText(record: KnowledgeSearchRecord): {
  readonly id: string;
  readonly prose: readonly string[];
} {
  if ('kind' in record) return { id: record.id, prose: [record.name, ...record.aliases] };
  if ('definition' in record)
    return { id: record.id, prose: [record.name, ...record.aliases, record.definition] };
  return { id: record.id, prose: [record.title, record.explanation] };
}

/** Search entities, terms, and rules in deterministic catalog order without network access. */
export function searchKnowledge(query: string): readonly KnowledgeSearchMatch[] {
  const exactQuery = normalizeExact(query);
  const foldedQuery = accentInsensitive(query);
  if (!foldedQuery) return Object.freeze([]);
  const preferDiacritics = exactQuery !== foldedQuery;

  const exactMatches: KnowledgeSearchMatch[] = [];
  const foldedMatches: KnowledgeSearchMatch[] = [];
  const collections: readonly [KnowledgeSearchMatch['kind'], readonly KnowledgeSearchRecord[]][] = [
    ['entity', listKnowledgeEntities()],
    ['term', listTerms()],
    ['rule', listRules()],
  ];
  for (const [kind, records] of collections) {
    for (const record of records) {
      const fields = searchableText(record);
      const idQuery = normalizeExact(fields.id) === exactQuery;
      const exactMatch =
        idQuery || fields.prose.some(text => normalizeExact(text).includes(exactQuery));
      const foldedMatch =
        idQuery || fields.prose.some(text => accentInsensitive(text).includes(foldedQuery));
      if (exactMatch) exactMatches.push(Object.freeze({ kind, record }));
      if (foldedMatch) foldedMatches.push(Object.freeze({ kind, record }));
    }
  }
  return Object.freeze(preferDiacritics && exactMatches.length > 0 ? exactMatches : foldedMatches);
}
