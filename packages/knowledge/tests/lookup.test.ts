import { describe, expect, it } from 'vitest';
import {
  knowledgeCatalog,
  getHexagram,
  getKnowledgeEntity,
  getRule,
  getSource,
  getSourceReference,
  getTerm,
  getTrigram,
  listHexagrams,
  listKnowledgeEntities,
  listRules,
  listSources,
  listSourceReferences,
  listTerms,
  listTrigrams,
} from '../src/catalog';
import { getKnowledgeMetadata } from '../src/index';

describe('knowledge catalog lookup', () => {
  it('provides deterministic readonly lists and canonical ID lookups', () => {
    expect(listTrigrams()).toHaveLength(8);
    expect(listHexagrams()).toHaveLength(64);
    expect(listKnowledgeEntities()).toHaveLength(72);
    expect(getTrigram('trigram-heaven')).toBe(listTrigrams()[0]);
    expect(getHexagram('hexagram-01')).toBe(listHexagrams()[0]);
    expect(getKnowledgeEntity('hexagram-01')).toBe(getHexagram('hexagram-01'));
    expect(getTerm('term-yin')).toBe(listTerms().find(term => term.id === 'term-yin'));
    expect(getRule('rule-line-position-order')).toBe(
      listRules().find(rule => rule.id === 'rule-line-position-order'),
    );
    expect(getSource('source-zhouyi')).toBe(listSources()[0]);
    expect(getSourceReference('reference-zhouyi-trigram-associations')).toBe(
      listSourceReferences()[0],
    );
    expect(getTrigram('trigram-missing' as 'trigram-heaven')).toBeUndefined();
    expect(getHexagram('hexagram-99' as 'hexagram-01')).toBeUndefined();
    expect(getTrigram('hexagram-01' as unknown as 'trigram-heaven')).toBeUndefined();
    expect(getHexagram('trigram-heaven' as unknown as 'hexagram-01')).toBeUndefined();
    expect(getKnowledgeMetadata().sourceCount).toBe(listSources().length);
  });

  it('freezes list results, records, and nested arrays', () => {
    const list = listKnowledgeEntities();
    const trigram = getTrigram('trigram-heaven')!;
    const rule = getRule('rule-line-position-order')!;

    expect(Object.isFrozen(list)).toBe(true);
    expect(Object.isFrozen(trigram)).toBe(true);
    expect(Object.isFrozen(trigram.aliases)).toBe(true);
    expect(Object.isFrozen(rule)).toBe(true);

    expect(() => (list as unknown as unknown[]).push(trigram)).toThrow();
    expect(() => (trigram.aliases as unknown as string[]).push('mutable')).toThrow();
    expect(() => Object.assign(trigram, { name: 'changed' })).toThrow();
    expect(getTrigram('trigram-heaven')?.name).toBe('Qian');
  });

  it('deep-freezes the exported catalog and its nested records', () => {
    expect(Object.isFrozen(knowledgeCatalog)).toBe(true);
    expect(Object.isFrozen(knowledgeCatalog.entities)).toBe(true);
    expect(Object.isFrozen(knowledgeCatalog.entities[0])).toBe(true);
    expect(Object.isFrozen(knowledgeCatalog.entities[0]?.aliases)).toBe(true);
    expect(Object.isFrozen(knowledgeCatalog.references[0]?.targetIds)).toBe(true);

    expect(() => (knowledgeCatalog.entities as unknown as unknown[]).pop()).toThrow();
    expect(() =>
      (knowledgeCatalog.entities[0]?.aliases as unknown as string[]).push('mutable'),
    ).toThrow();
    expect(() => Object.assign(knowledgeCatalog.entities[0]!, { name: 'changed' })).toThrow();
    expect(getTrigram('trigram-heaven')?.name).toBe('Qian');
  });
});
