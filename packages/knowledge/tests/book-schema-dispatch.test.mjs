import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'node:fs';
import { bookV2Fixtures } from './fixtures/book-v2-fixtures.ts';
import { recordSchemaName } from '../scripts/record-schema-dispatch.mjs';

const readJson = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const ajv = new Ajv({ allErrors: true, strictTypes: false, strictRequired: false });
addFormats(ajv);
const schemaValidators = {
  record: ajv.compile(readJson('../schema/record.schema.json')),
  'record-v2': ajv.compile(readJson('../schema/record-v2.schema.json')),
};

describe('authored record schema dispatch', () => {
  it.each([
    [{ schemaVersion: 1 }, 'record'],
    [{ schemaVersion: 2 }, 'record-v2'],
  ])('routes schemaVersion %s to its versioned schema', (record, schemaName) => {
    expect(recordSchemaName(record, 'records/synthetic.json')).toBe(schemaName);
  });

  it.each([
    null,
    [],
    'record',
    {},
    { schemaVersion: 0 },
    { schemaVersion: 3 },
    { schemaVersion: 1.5 },
    { schemaVersion: '2' },
  ])('rejects malformed or unsupported record dispatch: %s', record => {
    expect(() => recordSchemaName(record, 'records/synthetic.json')).toThrow(
      'records/synthetic.json: unsupported or missing integer schemaVersion (expected 1 or 2)',
    );
  });

  it('dispatches each versioned fixture to a validating, distinct schema', () => {
    const v1 = readJson('../data/manifest.json').recordFiles.map(file =>
      readJson(`../data/${file}`),
    );
    for (const record of v1)
      expect(schemaValidators[recordSchemaName(record, record.id)](record)).toBe(true);
    for (const record of bookV2Fixtures) {
      const validator = schemaValidators[recordSchemaName(record, record.id)];
      expect(validator(record), `${record.id}: ${ajv.errorsText(validator.errors)}`).toBe(true);
    }
  });
});
