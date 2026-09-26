import { HEXAGRAMS } from '../data/hexagrams';
import { FACTS } from '../data/facts';
import { REFERENCES } from '../data/references';
import { RULES } from '../data/rules';
import { SOURCES } from '../data/sources';
import { TERMS } from '../data/terms';
import { TRIGRAMS } from '../data/trigrams';
import type {
  HexagramEntity,
  HexagramId,
  KnowledgeFactId,
  KnowledgeCatalog,
  KnowledgeEntity,
  KnowledgeRule,
  KnowledgeSource,
  KnowledgeTerm,
  SourceReference,
  TrigramEntity,
  TrigramId,
} from './schema';
import { validateKnowledgeCatalog } from './validation';

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value)) deepFreeze(child);
  }
  return value;
}

// The content records are authored separately; the schema validator is the runtime boundary.
export const knowledgeCatalog: KnowledgeCatalog = {
  entities: [...TRIGRAMS, ...HEXAGRAMS],
  terms: TERMS,
  rules: RULES,
  sources: SOURCES,
  references: REFERENCES,
} satisfies KnowledgeCatalog;

validateKnowledgeCatalog(knowledgeCatalog);
deepFreeze(knowledgeCatalog);

function cloneRecord<T>(value: T): T {
  if (Array.isArray(value)) return value.map(cloneRecord) as T;
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, cloneRecord(child)]),
    ) as T;
  }
  return value;
}

const immutable = <T>(records: readonly T[]): readonly T[] => deepFreeze(records.map(cloneRecord));

const entities = immutable<KnowledgeEntity>(knowledgeCatalog.entities);
const trigrams = deepFreeze(
  entities.filter((entity): entity is TrigramEntity => entity.kind === 'trigram'),
);
const hexagrams = deepFreeze(
  entities.filter((entity): entity is HexagramEntity => entity.kind === 'hexagram'),
);
const terms = immutable<KnowledgeTerm>(knowledgeCatalog.terms);
const rules = immutable<KnowledgeRule>(knowledgeCatalog.rules);
const sources = immutable<KnowledgeSource>(knowledgeCatalog.sources);
const references = immutable<SourceReference>(knowledgeCatalog.references);

const entityById = new Map<KnowledgeEntity['id'], KnowledgeEntity>(
  entities.map(entity => [entity.id, entity]),
);
const termById = new Map<KnowledgeTerm['id'], KnowledgeTerm>(terms.map(term => [term.id, term]));
const ruleById = new Map<KnowledgeRule['id'], KnowledgeRule>(rules.map(rule => [rule.id, rule]));
const sourceById = new Map<KnowledgeSource['id'], KnowledgeSource>(
  sources.map(source => [source.id, source]),
);
const referenceById = new Map<SourceReference['id'], SourceReference>(
  references.map(reference => [reference.id, reference]),
);
const emptyRules: readonly KnowledgeRule[] = Object.freeze([]);
const rulesByFactId = new Map<KnowledgeFactId, readonly KnowledgeRule[]>(
  FACTS.map(({ id, ruleIds }) => [
    id,
    deepFreeze(
      ruleIds.map(ruleId => {
        const rule = ruleById.get(ruleId);
        if (!rule) throw new Error(`Unknown rule ${ruleId} mapped to fact ${id}`);
        return rule;
      }),
    ),
  ]),
);

export function listKnowledgeEntities(): readonly KnowledgeEntity[] {
  return entities;
}
export function getKnowledgeEntity(id: KnowledgeEntity['id']): KnowledgeEntity | undefined {
  return entityById.get(id);
}
export function listTrigrams(): readonly TrigramEntity[] {
  return trigrams;
}
export function getTrigram(id: TrigramId): TrigramEntity | undefined {
  const entity = entityById.get(id);
  return entity?.kind === 'trigram' ? entity : undefined;
}
export function listHexagrams(): readonly HexagramEntity[] {
  return hexagrams;
}
export function getHexagram(id: HexagramId): HexagramEntity | undefined {
  const entity = entityById.get(id);
  return entity?.kind === 'hexagram' ? entity : undefined;
}
export function listTerms(): readonly KnowledgeTerm[] {
  return terms;
}
export function getTerm(id: KnowledgeTerm['id']): KnowledgeTerm | undefined {
  return termById.get(id);
}
export function listRules(): readonly KnowledgeRule[] {
  return rules;
}
export function getRule(id: KnowledgeRule['id']): KnowledgeRule | undefined {
  return ruleById.get(id);
}
export function getRulesForFact(factId: KnowledgeFactId): readonly KnowledgeRule[] {
  return rulesByFactId.get(factId) ?? emptyRules;
}
export function listSources(): readonly KnowledgeSource[] {
  return sources;
}
export function getSource(id: KnowledgeSource['id']): KnowledgeSource | undefined {
  return sourceById.get(id);
}
export function listSourceReferences(): readonly SourceReference[] {
  return references;
}
export function getSourceReference(id: SourceReference['id']): SourceReference | undefined {
  return referenceById.get(id);
}
