import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { computeAuditInputs, compareAuditInputs } from '../scripts/audit-inputs.mjs';
import { validateAuditLedgers } from '../scripts/audit-decisions.mjs';
import { createAuditSchemaValidator } from '../scripts/audit-schema.mjs';
import { auditContext, minimalRegistry, sha } from './fixtures/audit-fixtures.mjs';

const validateLedgerSchema = createAuditSchemaValidator(
  JSON.parse(
    readFileSync(new URL('../schema/audit-ledger-v1.schema.json', import.meta.url), 'utf8'),
  ),
  'audit ledger schema',
);
describe('versioned audit input and decision contracts', () => {
  it('derives canonical direct and transitive claim closure including record review inputs', async () => {
    const { context } = auditContext();
    const result = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(result.claimIds).toEqual(['claim-owner', 'claim-support']);
    expect(result.inputs.records.map(item => item.id)).toEqual([
      'article-owner',
      'article-support',
    ]);
    expect(result.inputs.citations.map(item => item.id)).toEqual([
      'citation-owner',
      'citation-support',
    ]);
    expect(result.releasedClaimIds).toEqual(result.claimIds);
  });

  it('includes transitive figure evidence and reports added/removed/hash-changed inputs stale', async () => {
    const { context, owner } = auditContext();
    const current = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    const old = structuredClone(current.inputs);
    old.records = old.records.filter(item => item.id !== 'article-support');
    old.citations = old.citations.map(item => ({ ...item, sha256: sha('outdated') }));
    expect(compareAuditInputs(old, current, context)).toMatchObject({ current: false });
    expect(() =>
      compareAuditInputs(
        {
          ...current.inputs,
          records: [{ id: 'deleted-record', sha256: '0'.repeat(64), released: false }],
        },
        current,
        context,
      ),
    ).toThrow(/Unknown or retired/);
    owner.figures[0].labels[0].claimIds.push('claim-support');
    expect(
      (
        await computeAuditInputs(context, ['claim-owner'], {
          allowInMemoryFixtures: true,
          target: { kind: 'record', id: 'article-owner' },
        })
      ).claimIds,
    ).toContain('claim-support');
  });

  it('closes typed table, lesson prerequisite, and fixture supports transitively', async () => {
    const { context, owner, support } = auditContext();
    support.claims.push({
      id: 'claim-table',
      kind: 'structural-fact',
      text: 'Synthetic table support',
      citationIds: ['citation-support'],
    });
    owner.tables = [
      { id: 'table-owner', kind: 'coin-outcomes', claimIds: ['claim-table'], rows: [] },
    ];
    owner.blocks = [{ supportingClaimIds: ['claim-table'] }];
    context.records.push({
      schemaVersion: 2,
      id: 'lesson-prerequisite',
      type: 'lesson',
      prerequisiteLessonIds: [],
      claims: [
        {
          id: 'claim-prerequisite',
          kind: 'structural-fact',
          text: 'Synthetic prerequisite',
          citationIds: ['citation-support'],
        },
      ],
      review: { status: 'reviewed' },
    });
    owner.prerequisiteLessonIds = ['lesson-prerequisite'];
    context.fixtureBindings = [
      { claimId: 'claim-table', ownerId: 'article-support', path: 'tests/fixtures/expected.json' },
    ];
    support.expectedFixtures = [{ path: 'tests/fixtures/expected.json', claimId: 'claim-table' }];
    context.fixtureBytes = { 'tests/fixtures/expected.json': Buffer.from('synthetic fixture') };
    const result = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(result.claimIds).toEqual(
      ['claim-owner', 'claim-prerequisite', 'claim-support', 'claim-table'].sort(),
    );
    expect(result.inputs.fixtures).toHaveLength(1);
    const changed = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    context.fixtureBytes['tests/fixtures/expected.json'] = Buffer.from('changed fixture');
    const changedFixture = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(compareAuditInputs(changed.inputs, changedFixture, context).stale).toContain(
      'fixtures:tests/fixtures/expected.json:changed',
    );
  });

  it('hashes prerequisite records and requires the source-only locator edition', async () => {
    const { context } = auditContext();
    const record = context.records[0];
    record.prerequisiteLessonIds = ['lesson-prerequisite'];
    context.records.push({
      schemaVersion: 2,
      id: 'lesson-prerequisite',
      type: 'lesson',
      claims: [
        {
          id: 'claim-prerequisite',
          kind: 'structural-fact',
          text: 'Prerequisite support',
          citationIds: ['citation-support'],
        },
      ],
      review: { status: 'reviewed' },
    });
    const result = await computeAuditInputs(context, ['claim-owner'], {
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(result.inputs.records.map(item => item.id)).toContain('lesson-prerequisite');

    await expect(
      computeAuditInputs(context, [], {
        target: { kind: 'sourceunit', id: 'source-unit-test' },
        evidenceEditionIds: ['missing-edition'],
      }),
    ).rejects.toThrow(/Unknown structural edition/);
  });

  it('rejects malformed closure references and claim dependency cycles structurally', async () => {
    const { context, owner, support } = auditContext();
    owner.claims[0].dependsOnClaimIds = ['claim-missing'];
    await expect(computeAuditInputs(context, ['claim-owner'])).rejects.toThrow(
      /Missing structural claim/,
    );
    owner.claims[0].dependsOnClaimIds = ['claim-support'];
    support.claims[0].dependsOnClaimIds = ['claim-owner'];
    await expect(computeAuditInputs(context, ['claim-owner'])).rejects.toThrow(
      /Cyclic claim dependency/,
    );
  });

  it('does not pull unrelated owner-record claims into exact claim coverage', async () => {
    const { context, owner } = auditContext();
    const before = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    owner.claims.push({
      id: 'claim-unrelated',
      kind: 'structural-fact',
      text: 'Unrelated',
      citationIds: ['citation-support'],
    });
    const result = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(result.claimIds).not.toContain('claim-unrelated');
    expect(result.inputs.records.find(item => item.id === 'article-owner').sha256).toBe(
      before.inputs.records.find(item => item.id === 'article-owner').sha256,
    );
  });

  it('binds fixture paths to explicit owning claims and refuses path traversal', async () => {
    const { context } = auditContext();
    context.fixtureBindings = [
      { claimId: 'claim-owner', ownerId: 'article-owner', path: 'synthetic/fixture.json' },
    ];
    context.records[0].expectedFixtures = [
      { path: 'synthetic/fixture.json', claimId: 'claim-owner' },
    ];
    context.fixtureBytes = { 'synthetic/fixture.json': Buffer.from('{"synthetic":true}') };
    const inputs = await computeAuditInputs(context, ['claim-owner'], {
      allowInMemoryFixtures: true,
      target: { kind: 'record', id: 'article-owner' },
    });
    expect(inputs.inputs.fixtures[0].sha256).toBe(sha('{"synthetic":true}'));
    context.fixtureBindings[0].path = '../outside.json';
    context.records[0].expectedFixtures[0].path = '../outside.json';
    await expect(
      computeAuditInputs(context, ['claim-owner'], {
        allowInMemoryFixtures: true,
        target: { kind: 'record', id: 'article-owner' },
      }),
    ).rejects.toThrow(/escapes/);
  });

  it('rejects none scope on current source-unit record mappings and unknown targets', async () => {
    const { context } = auditContext();
    const decision = {
      id: 'decision-synthetic',
      target: { kind: 'sourceunit', id: 'source-unit-test' },
      revision: 1,
      supersedes: null,
      disposition: 'unresolved',
      findings: '',
      locator: { citationIds: ['citation-owner'], editionId: 'edition-test', pdfPages: [1, 1] },
      coveredClaimIds: [],
      layerResolution: { status: 'unresolved', layers: [] },
      exclusionReview: null,
      sourceComparison: {
        identity: 'Synthetic test',
        reviewer: 'Synthetic test',
        date: '2026-10-04',
        scope: 'synthetic',
        evidenceCitationIds: ['citation-owner'],
      },
      specialistReview: {
        status: 'pending',
        reviewerName: null,
        reviewerRole: null,
        reviewedAt: null,
        scope: 'synthetic',
        note: '',
      },
      authoredScope: 'none',
      inputs: {
        records: [],
        citations: [],
        editions: [{ id: 'edition-test', sha256: 'a'.repeat(64) }],
        projectContracts: [],
        fixtures: [],
      },
      recordedAt: '2026-10-04T00:00:00Z',
      recordedBy: 'Synthetic test',
    };
    const registry = minimalRegistry();
    const state = await validateAuditLedgers(
      [
        {
          schemaVersion: 1,
          ledgerId: 'ledger-test',
          scope: { kind: 'group', id: 'source-unit-test' },
          decisions: [decision],
        },
      ],
      registry,
      context,
    );
    expect(state.errors.join('\n')).toMatch(/authoredScope none/);
  });

  it('marks each valid input-closure field addition, removal, and changed value stale', () => {
    const { context } = auditContext();
    context.manifest.projectContracts = [];
    context.fixtureBindings = [
      { claimId: 'claim-owner', ownerId: 'article-owner', path: 'tests/fixtures/used.json' },
    ];
    context.records[0].expectedFixtures = [
      { path: 'tests/fixtures/used.json', claimId: 'claim-owner' },
    ];
    const recorded = {
      records: [{ id: 'article-owner', sha256: 'a'.repeat(64), released: true }],
      citations: [{ id: 'citation-owner', sha256: 'b'.repeat(64) }],
      editions: [{ id: 'edition-test', sha256: 'c'.repeat(64) }],
      projectContracts: [],
      fixtures: [{ path: 'tests/fixtures/used.json', sha256: 'd'.repeat(64) }],
    };
    const current = {
      inputs: {
        records: [{ id: 'article-owner', sha256: 'e'.repeat(64), released: true }],
        citations: [{ id: 'citation-owner', sha256: 'a'.repeat(64) }],
        editions: [{ id: 'edition-test', sha256: 'f'.repeat(64) }],
        projectContracts: [],
        fixtures: [{ path: 'tests/fixtures/used.json', sha256: '1'.repeat(64) }],
      },
    };
    expect(compareAuditInputs(recorded, current, context).stale).toEqual(
      expect.arrayContaining([
        'records:article-owner:changed',
        'citations:citation-owner:changed',
        'editions:edition-test:changed',
        'fixtures:tests/fixtures/used.json:changed',
      ]),
    );

    const removed = structuredClone(recorded);
    const currentWithoutRecord = structuredClone(current);
    currentWithoutRecord.inputs.records = [];
    currentWithoutRecord.inputs.fixtures = [];
    expect(compareAuditInputs(removed, currentWithoutRecord, context).stale).toContain(
      'records:article-owner:removed',
    );

    const obsolete = structuredClone(recorded);
    obsolete.citations.push({ id: 'citation-support', sha256: '2'.repeat(64) });
    const currentWithoutObsolete = structuredClone(current);
    expect(compareAuditInputs(obsolete, currentWithoutObsolete, context).stale).toContain(
      'citations:citation-support:removed',
    );

    const missingNew = structuredClone(recorded);
    missingNew.citations = [];
    const newlyRequired = structuredClone(current);
    newlyRequired.inputs.citations.push({ id: 'citation-support', sha256: '3'.repeat(64) });
    expect(compareAuditInputs(missingNew, newlyRequired, context).stale).toContain(
      'citations:citation-support:added',
    );
  });

  it('marks unresolved source-only input omissions stale instead of structurally fatal', async () => {
    const { context } = auditContext();
    const registry = minimalRegistry();
    registry.groups[0].recordIds = [];
    context.records[0].figures = [];
    const decision = {
      id: 'decision-source-only',
      target: { kind: 'sourceunit', id: 'source-unit-test' },
      revision: 1,
      supersedes: null,
      disposition: 'unresolved',
      findings: '',
      locator: { citationIds: ['citation-owner'], editionId: 'edition-test', pdfPages: [1, 1] },
      coveredClaimIds: [],
      layerResolution: { status: 'unresolved', layers: [] },
      exclusionReview: null,
      sourceComparison: {
        identity: 'Actual-looking identity',
        reviewer: 'Independent reviewer',
        date: '2026-10-04',
        scope: 'Source-unit synthetic test only',
        evidenceCitationIds: ['citation-owner'],
      },
      specialistReview: {
        status: 'pending',
        reviewerName: null,
        reviewerRole: null,
        reviewedAt: null,
        scope: 'pending',
        note: '',
      },
      authoredScope: 'none',
      inputs: {
        records: [],
        citations: [],
        editions: [{ id: 'edition-test', sha256: 'a'.repeat(64) }],
        projectContracts: [],
        fixtures: [],
      },
      recordedAt: '2026-10-04T00:00:00Z',
      recordedBy: 'Synthetic test runner',
    };
    context.syntheticInput = true;
    const state = await validateAuditLedgers(
      [
        {
          schemaVersion: 1,
          ledgerId: 'ledger-source-only',
          scope: { kind: 'group', id: 'source-unit-test' },
          decisions: [decision],
        },
      ],
      registry,
      context,
    );
    expect(state.valid).toBe(true);
    expect(state.current[0].inputState.current).toBe(false);
    expect(state.current[0].inputState.stale).toContain('citations:citation-owner:added');
  });

  it('keeps current-schema decision chains append-only and rejects broken/out-of-scope chains', async () => {
    const { context } = auditContext();
    const registry = minimalRegistry();
    registry.groups[0].recordIds = [];
    context.records[0].figures = [];
    const makeDecision = (
      id,
      revision,
      supersedes,
      target = { kind: 'sourceunit', id: 'source-unit-test' },
    ) => ({
      id,
      target,
      revision,
      supersedes,
      disposition: 'unresolved',
      findings: '',
      locator: { citationIds: ['citation-owner'], editionId: 'edition-test', pdfPages: [1, 1] },
      coveredClaimIds: [],
      layerResolution: { status: 'unresolved', layers: [] },
      exclusionReview: null,
      sourceComparison: {
        identity: 'Test comparison',
        reviewer: 'Independent reviewer',
        date: '2026-10-04',
        scope: 'synthetic test',
        evidenceCitationIds: ['citation-owner'],
      },
      specialistReview: {
        status: 'pending',
        reviewerName: null,
        reviewerRole: null,
        reviewedAt: null,
        scope: 'pending',
        note: '',
      },
      authoredScope: 'none',
      inputs: { records: [], citations: [], editions: [], projectContracts: [], fixtures: [] },
      recordedAt: `2026-10-04T00:00:0${revision}Z`,
      recordedBy: 'Test runner',
    });
    const first = makeDecision('decision-chain-v1', 1, null);
    const second = makeDecision('decision-chain-v2', 2, {
      id: first.id,
      revision: 1,
    });
    const ledger = {
      schemaVersion: 1,
      ledgerId: 'ledger-chain',
      scope: { kind: 'group', id: 'source-unit-test' },
      decisions: [first, second],
    };
    expect(validateLedgerSchema(ledger).valid).toBe(true);
    const valid = await validateAuditLedgers([ledger], registry, context);
    expect(valid.errors).toEqual([]);
    expect(valid.current).toHaveLength(1);
    expect(valid.current[0].decision).toBe(second);
    expect(first.supersedes).toBeNull();
    const changedFirst = makeDecision('decision-chain-v1', 1, null);
    changedFirst.findings = 'historical source notes remain as originally recorded';
    const appended = structuredClone(second);
    appended.revision = 3;
    appended.supersedes = { id: second.id, revision: second.revision };
    appended.id = 'decision-chain-v3';
    appended.recordedAt = '2026-10-04T00:00:03Z';
    const appendOnlyState = await validateAuditLedgers(
      [{ ...ledger, decisions: [changedFirst, second, appended] }],
      registry,
      context,
    );
    expect(appendOnlyState.current[0].decision).toBe(appended);
    expect(changedFirst.findings).toBe('historical source notes remain as originally recorded');

    const broken = structuredClone(ledger);
    broken.decisions[1].supersedes = { id: 'missing-decision', revision: 1 };
    expect((await validateAuditLedgers([broken], registry, context)).errors.join('\n')).toMatch(
      /broken supersedes link/,
    );
    const outOfScope = structuredClone(ledger);
    outOfScope.decisions[1].target = { kind: 'sourceunit', id: 'elsewhere' };
    expect((await validateAuditLedgers([outOfScope], registry, context)).errors.join('\n')).toMatch(
      /unknown or retired audit target/,
    );
  });
});
