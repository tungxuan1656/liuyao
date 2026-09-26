import { listKnowledgeEntities, listRules, listTerms } from './catalog';
import type { KnowledgeEntity, KnowledgeRule, KnowledgeTerm } from './schema';

export type KnowledgeSearchRecord = KnowledgeEntity | KnowledgeTerm | KnowledgeRule;

export interface KnowledgeSearchMatch {
  readonly kind: 'entity' | 'term' | 'rule';
  readonly record: KnowledgeSearchRecord;
}

/** Normalize accents, case, punctuation, symbols, and whitespace for local matching. */
export function normalizeKnowledgeQuery(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/\p{Mark}/gu, '')
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .trim()
    .replace(/\s+/gu, ' ');
}

function searchableText(record: KnowledgeSearchRecord): readonly string[] {
  if ('kind' in record) return [record.name, record.han, ...record.aliases];
  if ('definition' in record) return [record.name, ...record.aliases, record.definition];
  return [record.title, record.explanation];
}

/** Search entities, terms, and rules in deterministic catalog order without network access. */
export function searchKnowledge(query: string): readonly KnowledgeSearchMatch[] {
  const normalizedQuery = normalizeKnowledgeQuery(query);
  if (!normalizedQuery) return Object.freeze([]);

  const matches: KnowledgeSearchMatch[] = [];
  const collections: readonly [KnowledgeSearchMatch['kind'], readonly KnowledgeSearchRecord[]][] = [
    ['entity', listKnowledgeEntities()],
    ['term', listTerms()],
    ['rule', listRules()],
  ];
  for (const [kind, records] of collections) {
    for (const record of records) {
      if (
        searchableText(record).some(text => normalizeKnowledgeQuery(text).includes(normalizedQuery))
      ) {
        matches.push(Object.freeze({ kind, record }));
      }
    }
  }
  return Object.freeze(matches);
}
