import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import manifest from '../data/manifest.json';
import { upcastBookRecordV1 } from '../src/index.js';
import type { BookRecordV1 } from '../src/book-schema.js';
import type { BookRecordV2 } from '../src/book-schema-v2.js';

const ajv = new Ajv({ allErrors: true, strictTypes: false, strictRequired: false });
addFormats(ajv);
const validateV2 = ajv.compile(
  JSON.parse(readFileSync(new URL('../schema/record-v2.schema.json', import.meta.url), 'utf8')),
);

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === 'object' && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const nested of Object.values(value)) deepFreeze(nested);
  }
  return value;
}

describe('V1 book record upcast', () => {
  it('deep-copies a prevalidated record, preserves its data, and isolates nested mutations', () => {
    const input = deepFreeze({
      schemaVersion: 1,
      id: 'article-migration-fixture',
      type: 'article',
      title: 'Synthetic migration fixture',
      aliases: ['alias-fixture'],
      topicIds: ['topic-fixture'],
      claims: [
        {
          id: 'claim-migration-fixture',
          kind: 'structural-fact',
          text: 'Synthetic evidence.',
          citationIds: ['citation-fixture'],
        },
      ],
      relatedIds: [],
      review: { status: 'draft' },
      rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
      discrepancies: [
        {
          id: 'discrepancy-fixture',
          status: 'unresolved',
          description: 'Synthetic discrepancy.',
          citationIds: ['citation-fixture'],
        },
      ],
    } as const);
    const before = structuredClone(input);
    const result = upcastBookRecordV1(input as unknown as BookRecordV1);

    expect(result).toEqual({ ...before, schemaVersion: 2 });
    expect(input).toEqual(before);
    expect(
      Reflect.set(
        (result as BookRecordV2 & { claims: { text: string }[] }).claims[0]!,
        'text',
        'Changed clone',
      ),
    ).toBe(true);
    expect(input.claims[0].text).toBe('Synthetic evidence.');
    expect(validateV2(result)).toBe(true);
  });

  it('upcasts and schema-validates every authored V1 record', () => {
    const records = manifest.recordFiles.map(
      file =>
        JSON.parse(
          readFileSync(new URL(`../data/${file}`, import.meta.url), 'utf8'),
        ) as BookRecordV1,
    );
    expect(records).toHaveLength(197);
    for (const record of records) {
      const converted = upcastBookRecordV1(record);
      expect(converted.schemaVersion).toBe(2);
      expect(validateV2(converted), `${record.id}: ${JSON.stringify(validateV2.errors)}`).toBe(
        true,
      );
    }
  });

  it.each([
    ['null', null],
    ['array', []],
    ['non-object', 'record'],
    ['missing version', { id: 'article-invalid' }],
    ['wrong version', { schemaVersion: 2, id: 'article-invalid' }],
  ])('rejects an invalid migration input: %s', (_label, record) => {
    expect(() => upcastBookRecordV1(record as BookRecordV1)).toThrow(TypeError);
  });
});
