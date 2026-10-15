import type {
  KnowledgeEntity,
  KnowledgeRule,
  KnowledgeSource,
  KnowledgeTerm,
} from '@liuyao/knowledge';
import {
  getContentMetadata,
  getKnowledgeEntity,
  getRule,
  getSource,
  getTerm,
  listContent,
  listKnowledgeEntities,
  listRules,
  listSourceReferences,
  listTerms,
  searchKnowledge,
} from '@liuyao/knowledge';
import { ROUTES } from './route-paths';

export type Category = 'hexagrams' | 'trigrams' | 'terms' | 'rules' | 'articles';
export const categories: readonly { id: Category; label: string }[] = [
  { id: 'hexagrams', label: 'Quẻ' },
  { id: 'trigrams', label: 'Quái' },
  { id: 'terms', label: 'Thuật ngữ' },
  { id: 'rules', label: 'Quy tắc' },
  { id: 'articles', label: 'Bài viết' },
];
export const ruleCategories = [
  'all',
  'metadata',
  'structure',
  'transformation',
  'classification',
] as const;
export type RuleFilter = (typeof ruleCategories)[number];
type LibraryArticle = { type: 'article'; id: string; title: string; explanation: string };
export type LibrarySource = KnowledgeSource & {
  type: 'source';
  explanation: string;
};
export type LibraryRecord =
  | KnowledgeEntity
  | KnowledgeTerm
  | KnowledgeRule
  | LibraryArticle
  | LibrarySource;

export function recordPath(record: LibraryRecord) {
  const type =
    'type' in record
      ? record.type
      : 'kind' in record
        ? record.kind
        : 'definition' in record
          ? 'term'
          : 'rule';
  return ROUTES.libraryDetail(type, record.id);
}

export function recordName(record: LibraryRecord) {
  return 'title' in record ? record.title : record.name;
}

export function recordDescription(record: LibraryRecord) {
  return 'explanation' in record ? record.explanation : record.definition;
}

export function getRecord(type: string, id: string) {
  if (type === 'article') {
    const item = getContentMetadata(id);
    return item?.type === 'article'
      ? { type: 'article' as const, id: item.id, title: item.title, explanation: item.summary }
      : undefined;
  }
  if (type === 'source') {
    const source = getSource(id as KnowledgeSource['id']);
    return source
      ? ({
          type: 'source' as const,
          ...source,
          explanation: source.publication,
        } satisfies LibrarySource)
      : undefined;
  }
  if (type === 'term') return getTerm(id as KnowledgeTerm['id']);
  if (type === 'rule') return getRule(id as KnowledgeRule['id']);
  if (type === 'trigram' || type === 'hexagram') {
    const entity = getKnowledgeEntity(id as KnowledgeEntity['id']);
    return entity?.kind === type ? entity : undefined;
  }
  if (type === 'entity') {
    return getKnowledgeEntity(id as KnowledgeEntity['id']);
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

export interface ResolvedTarget {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly path: string;
}

export function resolveTarget(id: string): ResolvedTarget | undefined {
  const content = getContentMetadata(id);
  if (content)
    return {
      id,
      title: content.title,
      type: content.type,
      path: ROUTES.libraryDetail(content.type, content.id),
    };
  const entity = getKnowledgeEntity(id as never);
  if (entity)
    return {
      id,
      title: entity.name,
      type: entity.kind,
      path: ROUTES.libraryDetail(entity.kind, entity.id),
    };
  const term = getTerm(id as never);
  if (term)
    return { id, title: term.name, type: 'term', path: ROUTES.libraryDetail('term', term.id) };
  const rule = getRule(id as never);
  if (rule)
    return { id, title: rule.title, type: 'rule', path: ROUTES.libraryDetail('rule', rule.id) };
  return undefined;
}

export function getSourceContents(sourceId: string) {
  return listContent({ sourceId });
}

export function getSourceReferences(sourceId: string) {
  return listSourceReferences()
    .filter(reference => reference.sourceId === sourceId)
    .map(reference => ({
      ...reference,
      targets: reference.targetIds
        .map(resolveTarget)
        .filter((target): target is ResolvedTarget => Boolean(target)),
    }))
    .filter(reference => reference.targets.length > 0);
}

export function getApplicableRules(record: LibraryRecord): KnowledgeRule[] {
  if (!('applicableRuleIds' in record) || !record.applicableRuleIds) return [];
  return record.applicableRuleIds
    .map(ruleId => getRule(ruleId))
    .filter((rule): rule is KnowledgeRule => Boolean(rule));
}

export function getLibraryRecords(
  category: Category,
  query: string,
  topicId?: string,
): readonly LibraryRecord[] {
  if (category === 'articles')
    return listContent({ type: 'article', query, topicId }).map(item => ({
      type: 'article' as const,
      id: item.id,
      title: item.title,
      explanation: item.summary,
    }));
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
