import { describe, expect, it } from 'vitest';
import type { KnowledgeCatalog } from '../src/schema';
import { validateKnowledgeCatalog } from '../src/validation';

function validCatalog(): KnowledgeCatalog {
  return {
    entities: [
      {
        kind: 'trigram',
        id: 'trigram-heaven',
        name: 'Qian',
        han: '乾',
        aliases: ['Heaven'],
        explanation: 'Three yang lines represent Heaven.',
      },
      {
        kind: 'hexagram',
        id: 'hexagram-01',
        name: 'Qian',
        han: '乾',
        aliases: [],
        explanation: 'Upper Heaven over lower Heaven.',
        kingWenNumber: 1,
        upperTrigramId: 'trigram-heaven',
        lowerTrigramId: 'trigram-heaven',
      },
    ],
    terms: [
      {
        id: 'term-yin-yang',
        name: 'Yin and yang',
        aliases: ['yin-yang'],
        definition: 'Two complementary qualities.',
      },
    ],
    rules: [
      {
        id: 'rule-lines-bottom-to-top',
        ruleset: 'liuyao-standard-v1',
        title: 'Line order',
        explanation: 'Lines are read from bottom to top.',
        category: 'structure',
      },
    ],
    sources: [
      {
        id: 'source-classic',
        title: 'Classic',
        author: 'Author',
        publication: 'Edition',
        rights: 'Public domain',
        provenance: 'Cataloged from the edition.',
      },
    ],
    references: [
      {
        id: 'reference-classic-lines',
        sourceId: 'source-classic',
        targetIds: ['term-yin-yang', 'rule-lines-bottom-to-top'],
      },
    ],
  } as unknown as KnowledgeCatalog;
}

const validate = (catalog: unknown): void => validateKnowledgeCatalog(catalog as KnowledgeCatalog);

describe('knowledge schema and validation', () => {
  it('accepts valid readonly catalog records and linked references', () => {
    expect(() => validateKnowledgeCatalog(validCatalog())).not.toThrow();
  });

  it.each([
    ['missing catalog collection', { ...validCatalog(), rules: undefined }],
    [
      'missing entity field',
      { ...validCatalog(), entities: [{ kind: 'trigram', id: 'trigram-heaven', aliases: [] }] },
    ],
    [
      'missing Han character field',
      {
        ...validCatalog(),
        entities: [{ kind: 'trigram', id: 'trigram-heaven', name: 'Qian', aliases: [] }],
      },
    ],
    [
      'missing entity explanation',
      {
        ...validCatalog(),
        entities: [
          {
            kind: 'trigram',
            id: 'trigram-heaven',
            name: 'Qian',
            han: '乾',
            aliases: ['Heaven'],
          },
        ],
      },
    ],
    [
      'empty entity explanation',
      {
        ...validCatalog(),
        entities: [{ ...validCatalog().entities[0], explanation: '  ' }],
      },
    ],
    [
      'empty required description',
      { ...validCatalog(), terms: [{ ...validCatalog().terms[0], definition: ' ' }] },
    ],
    [
      'extra field in strict shape',
      { ...validCatalog(), sources: [{ ...validCatalog().sources[0], extra: true }] },
    ],
  ])('rejects %s', (_label, catalog) => {
    expect(() => validate(catalog)).toThrow();
  });

  it.each([
    [
      'duplicate entities',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        entities: [...catalog.entities, catalog.entities[0]],
      }),
    ],
    [
      'duplicate IDs across collections',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        terms: [{ ...catalog.terms[0], id: 'trigram-heaven' }],
      }),
    ],
    [
      'duplicate source-reference IDs',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        references: [...catalog.references, catalog.references[0]],
      }),
    ],
    [
      'non-core entity ID',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        entities: [{ ...catalog.entities[0], id: 'trigram-invalid' }],
      }),
    ],
    [
      'malformed namespaced ID',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        terms: [{ ...catalog.terms[0], id: 'term-Not Valid' }],
      }),
    ],
  ])('rejects %s', (_label, mutate) => {
    expect(() => validate(mutate(validCatalog()))).toThrow();
  });

  it.each([
    [
      'missing rule category',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        rules: [
          {
            id: catalog.rules[0]!.id,
            ruleset: catalog.rules[0]!.ruleset,
            title: catalog.rules[0]!.title,
            explanation: catalog.rules[0]!.explanation,
          },
        ],
      }),
    ],
    [
      'unknown rule category',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        rules: [{ ...catalog.rules[0], category: 'unclassified' }],
      }),
    ],
    [
      'unsupported ruleset',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        rules: [{ ...catalog.rules[0], ruleset: 'other-rules' }],
      }),
    ],
    [
      'missing source link',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        references: [{ ...catalog.references[0], sourceId: 'source-missing' }],
      }),
    ],
    [
      'missing target link',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        references: [{ ...catalog.references[0], targetIds: ['rule-missing'] }],
      }),
    ],
    [
      'broken term reference',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        references: [{ ...catalog.references[0], targetIds: ['term-missing'] }],
      }),
    ],
    [
      'missing hexagram trigram',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        entities: catalog.entities.filter(entity => entity.kind !== 'trigram'),
      }),
    ],
    [
      'wrong King Wen number',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        entities: catalog.entities.map(entity =>
          entity.kind === 'hexagram' ? { ...entity, kingWenNumber: 2 } : entity,
        ),
      }),
    ],
    [
      'reference without target',
      (catalog: KnowledgeCatalog) => ({
        ...catalog,
        references: [{ ...catalog.references[0], targetIds: [] }],
      }),
    ],
  ])('rejects %s', (_label, mutate) => {
    expect(() => validate(mutate(validCatalog()))).toThrow();
  });
});
