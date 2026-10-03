import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { bookV2Fixtures, projectConventionFixture } from './fixtures/book-v2-fixtures.ts';

const readJson = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const ajv = new Ajv({ allErrors: true, strictTypes: false, strictRequired: false });
addFormats(ajv);
const validateV1 = ajv.compile(readJson('../schema/record.schema.json'));
const validateV2 = ajv.compile(readJson('../schema/record-v2.schema.json'));
const validateManifest = ajv.compile(readJson('../schema/manifest.schema.json'));

describe('version-2 book schema and typed fixtures', () => {
  it('accepts typed fixtures for each record and figure kind', () => {
    for (const record of [...bookV2Fixtures, projectConventionFixture]) {
      expect(validateV2(record), `${record.id}: ${ajv.errorsText(validateV2.errors)}`).toBe(true);
    }
    expect(bookV2Fixtures[0].figures.map(figure => figure.kind)).toEqual([
      'sequence',
      'placement',
      'transformation',
      'board',
      'plate',
    ]);
    expect(bookV2Fixtures.at(-1).blocks.map(block => block.kind)).toEqual([
      'prose',
      'table',
      'figure',
    ]);
  });

  it('keeps V1 schema dispatch separate and rejects unsupported V1 mutations', () => {
    const v1 = readJson('../data/manifest.json');
    expect(v1.schemaVersion).toBe(1);
    const records = v1.recordFiles.map(file => readJson(`../data/${file}`));
    for (const record of records) expect(validateV1(record)).toBe(true);
    const mutated = structuredClone(records[0]);
    mutated.schemaVersion = 2;
    expect(validateV1(mutated)).toBe(false);
  });

  it.each([
    {
      name: 'wrong version',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.schemaVersion = 1;
      },
    },
    {
      name: 'unknown properties',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.unsupported = true;
      },
    },
    {
      name: 'missing book citations',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.claims[0].citationIds = [];
      },
    },
    {
      name: 'project convention with book citations',
      base: projectConventionFixture,
      mutate: record => {
        record.claims[0].citationIds = ['citation-fixture'];
      },
    },
    {
      name: 'project convention missing evidence',
      base: projectConventionFixture,
      mutate: record => {
        delete record.claims[0].projectEvidence;
      },
    },
    {
      name: 'lesson target kind mismatch',
      base: bookV2Fixtures.at(-1),
      mutate: record => {
        record.blocks[1].target.kind = 'figure';
      },
    },
    {
      name: 'lesson table target ID uses figure namespace',
      base: bookV2Fixtures.at(-1),
      mutate: record => {
        record.blocks[1].target.id = 'figure-wrong-target';
      },
    },
    {
      name: 'repeated claim dependency ID',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.claims[0].dependsOnClaimIds = ['claim-fixture', 'claim-fixture'];
      },
    },
    {
      name: 'empty project contract revision',
      base: readJson('../data/manifest.json'),
      mutate: manifest => {
        manifest.projectContracts = [
          { documentPath: 'docs/example.md', revision: '', sections: ['## Example'] },
        ];
      },
      validate: validateManifest,
    },
    {
      name: 'figure kind without bounded evidence fields',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.figures = [{ kind: 'board' }];
      },
    },
    {
      name: 'empty non-plate figure',
      base: bookV2Fixtures[0],
      mutate: record => {
        record.figures = [
          {
            id: 'figure-empty',
            kind: 'board',
            title: 'Synthetic empty figure',
            sourceUnitIds: [],
            labels: [],
            claimIds: [],
            inspectionStatus: 'uninspected',
          },
        ];
      },
    },
    {
      name: 'empty table source inventory',
      base: bookV2Fixtures.find(record => record.id === 'article-fixture'),
      mutate: record => {
        record.tables[0].sourceUnitIds = [];
      },
    },
  ])('rejects schema violations: $name', ({ base, mutate, validate = validateV2 }) => {
    const record = structuredClone(base);
    mutate(record);
    expect(validate(record)).toBe(false);
  });

  it('accepts empty-evidence plate placeholders and strict optional project registries', () => {
    const record = structuredClone(bookV2Fixtures[2]);
    record.figures = [
      {
        id: 'figure-plate-placeholder',
        kind: 'plate',
        title: 'Synthetic plate placeholder',
        sourceUnitIds: [],
        labels: [],
        claimIds: [],
        inspectionStatus: 'uninspected',
      },
    ];
    expect(validateV2(record)).toBe(true);

    const manifest = readJson('../data/manifest.json');
    expect(validateManifest(manifest)).toBe(true);
    manifest.projectContracts = [
      { documentPath: 'docs/example.md', revision: 'test-revision', sections: ['## Example'] },
    ];
    expect(validateManifest(manifest)).toBe(true);
    manifest.projectContracts[0].unknown = true;
    expect(validateManifest(manifest)).toBe(false);
  });
});
