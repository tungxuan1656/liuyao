import {
  getKnowledgeEntity,
  getRule,
  getSource,
  getTerm,
  listKnowledgeEntities,
  listRules,
  listSourceReferences,
  listTerms,
  searchKnowledge,
} from '@liuyao/knowledge';
import type { KnowledgeEntity, KnowledgeRule, KnowledgeTerm } from '@liuyao/knowledge';
import { ROUTES } from './route-paths';

export type Category = 'hexagrams' | 'trigrams' | 'terms' | 'rules';
export const categories: readonly { id: Category; label: string }[] = [
  { id: 'hexagrams', label: 'Quẻ' },
  { id: 'trigrams', label: 'Quái' },
  { id: 'terms', label: 'Thuật ngữ' },
  { id: 'rules', label: 'Quy tắc' },
];
export const ruleCategories = [
  'all',
  'metadata',
  'structure',
  'transformation',
  'classification',
] as const;
export type RuleFilter = (typeof ruleCategories)[number];
export type LibraryRecord = KnowledgeEntity | KnowledgeTerm | KnowledgeRule;

export function recordPath(record: LibraryRecord) {
  const type = 'kind' in record ? record.kind : 'definition' in record ? 'term' : 'rule';
  return ROUTES.libraryDetail(type, record.id);
}

export function recordName(record: LibraryRecord) {
  return 'title' in record ? record.title : record.name;
}

export function recordDescription(record: LibraryRecord) {
  return 'explanation' in record ? record.explanation : record.definition;
}

export function recordKind(record: LibraryRecord) {
  return 'kind' in record ? record.kind : 'definition' in record ? 'term' : 'rule';
}

export function getRecord(type: string, id: string) {
  if (type === 'term') return getTerm(id as KnowledgeTerm['id']);
  if (type === 'rule') return getRule(id as KnowledgeRule['id']);
  if (type === 'trigram' || type === 'hexagram') {
    const entity = getKnowledgeEntity(id as KnowledgeEntity['id']);
    return entity?.kind === type ? entity : undefined;
  }
  return undefined;
}

export function getReferences(id: string) {
  return listSourceReferences()
    .filter(reference => reference.targetIds.includes(id as never))
    .map(reference => ({ ...reference, source: getSource(reference.sourceId) }))
    .filter(
      (
        reference,
      ): reference is typeof reference & { source: NonNullable<typeof reference.source> } =>
        Boolean(reference.source),
    );
}

export function getApplicableRules(record: LibraryRecord): KnowledgeRule[] {
  if (!('applicableRuleIds' in record) || !record.applicableRuleIds) return [];
  return record.applicableRuleIds
    .map(ruleId => getRule(ruleId))
    .filter((rule): rule is KnowledgeRule => Boolean(rule));
}

export function getLibraryRecords(category: Category, query: string): readonly LibraryRecord[] {
  const matches = query.trim() ? searchKnowledge(query) : null;
  return matches
    ? matches
        .filter(match =>
          category === 'hexagrams'
            ? match.kind === 'entity' && 'kingWenNumber' in match.record
            : category === 'trigrams'
              ? match.kind === 'entity' && 'kind' in match.record && match.record.kind === 'trigram'
              : category === 'terms'
                ? match.kind === 'term'
                : match.kind === 'rule',
        )
        .map(match => match.record)
    : category === 'hexagrams'
      ? listKnowledgeEntities().filter(
          (entity): entity is Extract<KnowledgeEntity, { kind: 'hexagram' }> =>
            entity.kind === 'hexagram',
        )
      : category === 'trigrams'
        ? listKnowledgeEntities().filter(
            (entity): entity is Extract<KnowledgeEntity, { kind: 'trigram' }> =>
              entity.kind === 'trigram',
          )
        : category === 'terms'
          ? listTerms()
          : listRules();
}

export function filterRules(records: readonly LibraryRecord[], ruleFilter: RuleFilter) {
  return ruleFilter === 'all'
    ? records
    : records.filter(
        (record): record is KnowledgeRule => 'category' in record && record.category === ruleFilter,
      );
}

export function getRelatedFigures(record: LibraryRecord): KnowledgeEntity[] {
  return 'upperTrigramId' in record
    ? [getKnowledgeEntity(record.upperTrigramId), getKnowledgeEntity(record.lowerTrigramId)].filter(
        (item): item is KnowledgeEntity => Boolean(item),
      )
    : 'kind' in record && record.kind === 'trigram'
      ? listKnowledgeEntities().filter(
          (item): item is Extract<KnowledgeEntity, { kind: 'hexagram' }> =>
            item.kind === 'hexagram' &&
            (item.upperTrigramId === record.id || item.lowerTrigramId === record.id),
        )
      : [];
}
