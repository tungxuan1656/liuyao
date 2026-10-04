import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import addFormats from 'ajv-formats';
import { createAuditSchemaValidator } from '../../scripts/audit-schema.mjs';
import { computeAuditInputs } from '../../scripts/audit-inputs.mjs';
import { validateAuditLedgers } from '../../scripts/audit-decisions.mjs';
import { evaluateAuditGates, listRequiredAuditTargets } from '../../scripts/audit-gates.mjs';
import { expectedLayersForTarget, recordClaimIds } from '../../scripts/audit-targets.mjs';
import { validateAuditRegistry } from '../../scripts/audit-registry.mjs';
import { canonicalize } from '../../scripts/snapshot-identity.mjs';

const readSchema = name =>
  JSON.parse(readFileSync(new URL(`../../schema/${name}`, import.meta.url), 'utf8'));
const validateRegistry = createAuditSchemaValidator(
  readSchema('expected-units-v1.schema.json'),
  'synthetic audit registry schema',
);
const validateLedger = createAuditSchemaValidator(
  readSchema('audit-ledger-v1.schema.json'),
  'synthetic audit ledger schema',
);
const validateRecord = (() => {
  const Ajv = createRequire(import.meta.url)('ajv');
  const ajv = new Ajv({ allErrors: true, strictTypes: false, strictRequired: false });
  addFormats(ajv);
  const validate = ajv.compile(readSchema('record-v2.schema.json'));
  return value => ({ valid: validate(value), errors: validate.errors ?? [] });
})();
const hash = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');
const yieldToEventLoop = () => new Promise(resolve => setImmediate(resolve));

const editions = [
  { id: 'edition-pbc-supplied', prefix: 'pbc', pages: 655, sha: '1' },
  { id: 'edition-ntt-supplied', prefix: 'ntt', pages: 938, sha: '2' },
  { id: 'edition-nhl-supplied', prefix: 'nhl', pages: 393, sha: '3' },
  { id: 'edition-bpct-supplied', prefix: 'bpct', pages: 467, sha: '4' },
];
const syntheticInventoryNote = 'synthetic correction-test inventory; not a source inventory';
let inventoryBytes = Buffer.from(syntheticInventoryNote);
const layerId = editionId => `layer-${editionId.slice('edition-'.length, -'-supplied'.length)}`;
const citationId = editionId =>
  `citation-${editionId.slice('edition-'.length, -'-supplied'.length)}`;
const projectPath = 'docs/design-docs/synthetic-correction-contract.md';
const fixturePath = 'packages/knowledge/tests/fixtures/synthetic-expected-result.json';

function makeRecords() {
  const support = {
    schemaVersion: 2,
    id: 'article-correction-support',
    type: 'article',
    title: 'Synthetic correction support',
    aliases: [],
    topicIds: ['topic-correction-test'],
    claims: [
      {
        id: 'claim-correction-support',
        kind: 'structural-fact',
        text: 'Synthetic support claim; no book meaning is asserted.',
        citationIds: ['citation-bpct'],
        attribution: { author: 'Synthetic source author' },
      },
      {
        id: 'claim-correction-unrelated',
        kind: 'structural-fact',
        text: 'Synthetic independent support claim.',
        citationIds: ['citation-pbc'],
      },
    ],
    relatedIds: [],
    review: {
      status: 'reviewed',
      reviewer: 'Synthetic fixture only',
      reviewedAt: '2026-10-04',
      method: 'source-comparison',
      evidenceCitationIds: ['citation-bpct', 'citation-pbc'],
      note: 'Synthetic shape test; not source review.',
    },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  };
  const lesson = {
    schemaVersion: 2,
    id: 'lesson-correction-dependent',
    type: 'lesson',
    title: 'Synthetic dependent lesson',
    aliases: [],
    topicIds: ['topic-correction-test'],
    claims: [
      {
        id: 'claim-correction-dependent',
        kind: 'structural-fact',
        text: 'Synthetic derived claim.',
        citationIds: ['citation-bpct'],
        dependsOnClaimIds: ['claim-correction-support'],
      },
      {
        id: 'claim-correction-worked-example',
        kind: 'structural-fact',
        text: 'Synthetic expected-result claim.',
        citationIds: ['citation-bpct'],
        dependsOnClaimIds: ['claim-correction-dependent'],
      },
      {
        id: 'claim-correction-project-contract',
        kind: 'project-convention',
        text: 'Synthetic project-contract claim.',
        citationIds: [],
        projectEvidence: [
          { documentPath: projectPath, section: 'Synthetic contract', revision: 'probe-r1' },
        ],
        dependsOnClaimIds: ['claim-correction-support'],
      },
    ],
    relatedIds: [],
    prerequisiteLessonIds: ['lesson-correction-prerequisite'],
    sequence: 1,
    blocks: [
      {
        id: 'block-correction-prose',
        position: 1,
        kind: 'prose',
        text: 'Synthetic dependent explanation.',
        supportingClaimIds: ['claim-correction-dependent'],
      },
      {
        id: 'block-correction-worked-example',
        position: 2,
        kind: 'worked-example',
        text: 'Synthetic expected result, not a Liu Yao calculation.',
        supportingClaimIds: ['claim-correction-worked-example'],
      },
    ],
    tables: [
      {
        id: 'table-correction-dependent',
        kind: 'coin-outcomes',
        claimIds: ['claim-correction-dependent'],
        rows: [
          { sapCount: 3, nguaCount: 0, lineClass: 'young-yang', polarity: 'yang', changing: false },
        ],
        sourceUnitIds: ['synthetic-source-unit'],
        authorAlternatives: [
          {
            author: 'Synthetic alternative attribution',
            description: 'Synthetic alternative evidence link.',
            claimIds: ['claim-correction-dependent'],
          },
        ],
      },
    ],
    figures: [
      {
        id: 'figure-correction-dependent',
        kind: 'board',
        title: 'Synthetic figure evidence bindings',
        sourceUnitIds: ['synthetic-source-unit'],
        labels: [
          {
            id: 'label-correction-dependent',
            text: 'Synthetic label',
            claimIds: ['claim-correction-dependent'],
          },
        ],
        claimIds: ['claim-correction-dependent'],
        orientation: {
          description: 'Synthetic orientation evidence.',
          claimIds: ['claim-correction-dependent'],
        },
        authorAlternatives: [
          {
            author: 'Synthetic figure alternative',
            description: 'Synthetic figure alternative evidence.',
            claimIds: ['claim-correction-dependent'],
          },
        ],
        inspectionStatus: 'visually-inspected',
      },
    ],
    expectedFixtures: [{ path: fixturePath, claimId: 'claim-correction-worked-example' }],
    review: {
      status: 'reviewed',
      reviewer: 'Synthetic fixture only',
      reviewedAt: '2026-10-04',
      method: 'source-comparison',
      evidenceCitationIds: ['citation-bpct'],
      evidenceClaimIds: [
        'claim-correction-dependent',
        'claim-correction-worked-example',
        'claim-correction-project-contract',
      ],
      note: 'Synthetic shape test; not source review.',
    },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  };
  const prerequisite = {
    schemaVersion: 2,
    id: 'lesson-correction-prerequisite',
    type: 'lesson',
    title: 'Synthetic prerequisite',
    aliases: [],
    topicIds: ['topic-correction-test'],
    claims: [
      {
        id: 'claim-correction-prerequisite',
        kind: 'structural-fact',
        text: 'Synthetic prerequisite support.',
        citationIds: ['citation-bpct'],
        dependsOnClaimIds: ['claim-correction-support'],
      },
    ],
    relatedIds: [],
    prerequisiteLessonIds: [],
    sequence: 2,
    blocks: [
      {
        id: 'block-prerequisite',
        position: 1,
        kind: 'prose',
        text: 'Synthetic prerequisite prose.',
        supportingClaimIds: ['claim-correction-prerequisite'],
      },
    ],
    review: {
      status: 'reviewed',
      reviewer: 'Synthetic fixture only',
      reviewedAt: '2026-10-04',
      method: 'source-comparison',
      evidenceCitationIds: ['citation-bpct'],
      evidenceClaimIds: ['claim-correction-prerequisite'],
      note: 'Synthetic shape test; not source review.',
    },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  };
  const independent = {
    schemaVersion: 2,
    id: 'lesson-correction-independent',
    type: 'lesson',
    title: 'Synthetic unaffected branch',
    aliases: [],
    topicIds: ['topic-correction-test'],
    claims: [
      {
        id: 'claim-correction-independent',
        kind: 'structural-fact',
        text: 'Independent synthetic branch.',
        citationIds: ['citation-pbc'],
      },
    ],
    relatedIds: [],
    prerequisiteLessonIds: [],
    sequence: 3,
    blocks: [
      {
        id: 'block-independent',
        position: 1,
        kind: 'prose',
        text: 'Independent synthetic prose.',
        supportingClaimIds: ['claim-correction-independent'],
      },
    ],
    review: {
      status: 'reviewed',
      reviewer: 'Synthetic fixture only',
      reviewedAt: '2026-10-04',
      method: 'source-comparison',
      evidenceCitationIds: ['citation-pbc'],
      evidenceClaimIds: ['claim-correction-independent'],
      note: 'Synthetic shape test; not source review.',
    },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  };
  support.discrepancies = [
    {
      id: 'discrepancy-synthetic-resolved',
      status: 'resolved',
      description: 'Synthetic resolved discrepancy for invalidation probing.',
      citationIds: ['citation-bpct'],
      resolution: 'Synthetic resolution; not a book finding.',
    },
  ];
  support.review.evidenceCitationIds = ['citation-bpct', 'citation-pbc'];
  return {
    records: [lesson, support, prerequisite, independent],
    lesson,
    support,
    prerequisite,
    independent,
  };
}

function makeRegistry() {
  const registry = {
    schemaVersion: 1,
    registryId: 'knowledge-expected-units-v1',
    registryRevision: 1,
    inventory: {
      path: 'docs/reviews/knowledge/source-inventory.md',
      sha256: createHash('sha256').update(inventoryBytes).digest('hex'),
    },
    counts: {
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 518,
      exclusions: 17,
    },
    layers: editions.map(edition => ({
      id: layerId(edition.id),
      editionId: edition.id,
      class: 'original-text',
      label: `Synthetic ${edition.prefix} layer`,
      sourceAnchor: { inventoryAnchor: 'synthetic', citationIds: [] },
      rosterStatus: 'resolved',
    })),
    hexagrams: [],
    specialPassages: [],
    groups: [],
    exclusions: [],
  };
  const requiredCells = [
    'overview',
    'position-1',
    'position-2',
    'position-3',
    'position-4',
    'position-5',
    'position-6',
  ];
  for (let number = 1; number <= 64; number += 1) {
    const id = `hexagram-${String(number).padStart(2, '0')}`;
    registry.hexagrams.push({
      id,
      number,
      auditFeatureId: 'feat-097',
      requiredCells,
      books: editions.slice(0, 3).map(edition => ({
        editionId: edition.id,
        sourceUnitId: `synthetic-${edition.prefix}-${id}`,
        pdfPageStart: 1,
        pdfPageEnd: Math.min(100, edition.pages),
        layerScopeIds: [layerId(edition.id)],
      })),
      specialPassageIds: [],
    });
  }
  for (const number of [1, 2]) {
    const hexagramId = `hexagram-${String(number).padStart(2, '0')}`;
    for (const edition of editions.slice(0, 3)) {
      const id = `special-${edition.prefix}-${hexagramId}`;
      registry.specialPassages.push({
        id,
        hexagramId,
        editionId: edition.id,
        sourceUnitId: `synthetic-${edition.prefix}-${hexagramId}`,
        auditFeatureId: 'feat-097',
        pdfPageStart: 1,
        pdfPageEnd: 100,
        layerScopeIds: [layerId(edition.id)],
      });
      registry.hexagrams[number - 1].specialPassageIds.push(id);
    }
  }
  const census = [
    { parentId: 'bpct-part1-ch04', group: 'BPCT chapter 4 boards', count: 64 },
    { parentId: 'bpct-part1-ch05', group: 'BPCT chapter 5 items', count: 18, postscript: true },
    { parentId: 'bpct-part1-ch06', group: 'BPCT chapter 6 labels', count: 69 },
    { parentId: 'bpct-part2-ch01-questions', group: 'BPCT questions', count: 18 },
    { parentId: 'bpct-part2-ch02-ha-tri', group: 'BPCT Hà Tri entries', count: 60 },
    { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting II entries', count: 64 },
    { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting IV entries', count: 8 },
    { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting V entries', count: 18 },
    { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting VI entries', count: 11 },
    { parentId: 'bpct-part3-criticism', group: 'BPCT criticism items', count: 15 },
  ];
  const parents = new Set();
  for (const entry of census) {
    if (!parents.has(entry.parentId)) {
      parents.add(entry.parentId);
      registry.groups.push(
        makeGroup(entry.parentId, 'Synthetic census parent', 1, undefined, false, true),
      );
    }
    for (let number = 1; number <= entry.count; number += 1) {
      registry.groups.push(
        makeGroup(
          `${entry.parentId}-synthetic-${entry.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${String(number).padStart(2, '0')}`,
          entry.group,
          number,
          entry.parentId,
        ),
      );
    }
    if (entry.postscript)
      registry.groups.push(
        makeGroup('bpct-ch05-postscript', entry.group, undefined, entry.parentId, false, true),
      );
  }
  registry.groups.push(
    makeGroup('synthetic-source-unit', 'Synthetic correction fixture', 1, undefined, true, true),
  );
  while (registry.groups.length < 518)
    registry.groups.push(
      makeGroup(
        `synthetic-extra-unit-${String(registry.groups.length).padStart(3, '0')}`,
        'Synthetic additional source units',
        1,
        undefined,
      ),
    );
  registry.exclusions = Array.from({ length: 17 }, (_, index) => ({
    id: `synthetic-exclusion-${String(index + 1).padStart(2, '0')}`,
    sourceUnitId: 'synthetic-source-unit',
    kind: 'synthetic non-content disposition',
    inventoryAnchor: 'synthetic correction-test inventory',
    editionId: 'edition-bpct-supplied',
    auditFeatureId: 'feat-097',
    layerScopeIds: ['layer-bpct'],
  }));
  inventoryBytes = Buffer.from(
    [
      syntheticInventoryNote,
      ...registry.hexagrams.flatMap(hexagram => hexagram.books.map(book => book.sourceUnitId)),
      ...registry.groups.map(group => group.id),
      ...registry.exclusions.map(exclusion => exclusion.inventoryAnchor),
    ].join('\n'),
  );
  registry.inventory.sha256 = createHash('sha256').update(inventoryBytes).digest('hex');
  return registry;
}

function makeGroup(id, group, number, parentId, mapRecords = false, censusParent = false) {
  return {
    id,
    ...(parentId ? { parentId } : {}),
    ...(number === undefined ? {} : { number }),
    kind: 'content',
    group,
    editionId: 'edition-bpct-supplied',
    pdfPageStart: 1,
    pdfPageEnd: 100,
    authorFeatureId: 'feat-001',
    auditFeatureId: 'feat-097',
    layerScopeIds: ['layer-bpct'],
    discoveryStatus: 'resolved',
    ...(censusParent
      ? {
          recordIds: [
            'lesson-correction-dependent',
            'article-correction-support',
            'lesson-correction-prerequisite',
            'lesson-correction-independent',
            ...Array.from(
              { length: 168 },
              (_, index) => `article-correction-extra-${String(index + 1).padStart(3, '0')}`,
            ),
          ],
        }
      : {}),
    ...(mapRecords
      ? {
          recordIds: ['lesson-correction-dependent'],
        }
      : {}),
  };
}

function makeContext(records) {
  return {
    manifest: {
      releaseIds: records.map(record => record.id),
      projectContracts: [
        { documentPath: projectPath, revision: 'probe-r1', sections: ['Synthetic contract'] },
        {
          documentPath: 'docs/design-docs/unused-contract.md',
          revision: 'unused-r1',
          sections: ['Unused'],
        },
      ],
    },
    records,
    citations: editions.map(edition => ({
      id: citationId(edition.id),
      sourceId: `source-book-${edition.prefix}`,
      editionId: edition.id,
      location: {
        chapter: 'Synthetic test only',
        section: 'Synthetic passage',
        pdfPageStart: 1,
        pdfPageEnd: 1,
      },
      textLayer: 'original-text',
    })),
    sources: editions.map(edition => ({
      id: `source-book-${edition.prefix}`,
      editions: [{ id: edition.id, sha256: edition.sha.repeat(64), pdfPageCount: edition.pages }],
    })),
    repositoryRoot: '/synthetic/audit-correction-fixture',
    fixtureBindings: [
      {
        claimId: 'claim-correction-worked-example',
        ownerId: 'lesson-correction-dependent',
        path: fixturePath,
      },
    ],
    fixtureBytes: { [fixturePath]: Buffer.from('{"expected":"synthetic-only"}') },
    syntheticInput: true,
    contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'a'.repeat(64)}`,
  };
}

function targetEdition(target, registry) {
  if (target.kind === 'cell') return target.editionId;
  if (target.kind === 'special')
    return registry.specialPassages.find(item => item.id === target.id).editionId;
  if (target.kind === 'sourceunit')
    return registry.groups.find(item => item.id === target.id).editionId;
  return 'edition-bpct-supplied';
}

function locatorPages(target, registry) {
  if (target.kind === 'cell') {
    const book = registry.hexagrams
      .find(item => item.id === target.hexagramId)
      .books.find(item => item.editionId === target.editionId);
    return [book.pdfPageStart, book.pdfPageEnd];
  }
  if (target.kind === 'special') {
    const { pdfPageStart, pdfPageEnd } = registry.specialPassages.find(
      item => item.id === target.id,
    );
    return [pdfPageStart, pdfPageEnd];
  }
  if (target.kind === 'sourceunit') {
    const { pdfPageStart, pdfPageEnd } = registry.groups.find(item => item.id === target.id);
    return [pdfPageStart, pdfPageEnd];
  }
  return [1, 1];
}

function targetClaims(target, records, registry) {
  if (target.kind === 'cell' || target.kind === 'special') return [];
  if (target.kind === 'exclusion') return [];
  if (target.kind === 'sourceunit') {
    const recordIds = registry.groups.find(group => group.id === target.id)?.recordIds ?? [];
    return records
      .filter(record => recordIds.includes(record.id))
      .flatMap(record => recordClaimIds(record));
  }
  const record = records.find(item => item.id === target.ownerId || item.id === target.id);
  if (!record) throw new Error(`No synthetic fixture owner for ${target.kind} ${target.id}`);
  if (target.kind === 'record') return recordClaimIds(record);
  if (target.kind === 'table') {
    const table = record.tables.find(item => item.id === target.childId);
    return [...table.claimIds, ...table.authorAlternatives.flatMap(item => item.claimIds)];
  }
  if (target.kind === 'figure') {
    const figure = record.figures.find(item => item.id === target.childId);
    return [
      ...figure.claimIds,
      ...figure.labels.flatMap(item => item.claimIds),
      ...figure.orientation.claimIds,
      ...figure.authorAlternatives.flatMap(item => item.claimIds),
    ];
  }
  if (target.kind === 'lesson')
    return record.blocks.find(item => item.id === target.childId).supportingClaimIds;
  if (target.kind === 'fixture') return [target.childId];
  throw new Error(`Unexpected synthetic target kind: ${target.kind}`);
}

function scopeForTarget(target, registry) {
  if (target.kind === 'cell') return { kind: 'hexagram', id: target.hexagramId };
  if (target.kind === 'special')
    return {
      kind: 'hexagram',
      id: target.id.endsWith('hexagram-01') ? 'hexagram-01' : 'hexagram-02',
    };
  if (target.kind === 'sourceunit') return { kind: 'group', id: target.id };
  if (target.kind === 'exclusion')
    return {
      kind: 'group',
      id: registry.exclusions.find(item => item.id === target.id).sourceUnitId,
    };
  const ownerId = target.ownerId ?? target.id;
  const group = registry.groups.find(item => item.recordIds?.includes(ownerId));
  if (!group) throw new Error(`No synthetic registry mapping for target owner ${ownerId}`);
  return { kind: 'group', id: group.id };
}

async function makeDecision(target, index, context, registry, records) {
  const editionId = targetEdition(target, registry);
  const citation = context.citations.find(item => item.editionId === editionId);
  const coveredClaimIds = [...new Set(targetClaims(target, records, registry))];
  const inputs = await computeAuditInputs(context, coveredClaimIds, {
    allowInMemoryFixtures: true,
    target,
    evidenceCitationIds: [citation.id],
    evidenceEditionIds: [editionId],
  });
  const layers = expectedLayersForTarget(target, registry, context, coveredClaimIds);
  const pages = locatorPages(target, registry);
  const decision = {
    id: `synthetic-decision-${String(index).padStart(5, '0')}`,
    target,
    revision: 1,
    supersedes: null,
    disposition: target.kind === 'exclusion' ? 'excluded' : 'accepted',
    findings: 'Synthetic comparison shape only; no source passage is asserted.',
    locator: { citationIds: [citation.id], editionId, pdfPages: pages },
    coveredClaimIds,
    layerResolution: {
      status: 'resolved',
      layers: layers.map(id => ({
        layerId: id,
        presence: 'present',
        citationIds: [citation.id],
        basis: 'inspected-page',
      })),
    },
    exclusionReview:
      target.kind === 'exclusion'
        ? {
            reason: 'Synthetic exclusion-gate fixture; no source unit is excluded.',
            locator: { citationIds: [citation.id], editionId, pdfPages: pages },
            scope: 'Synthetic gate behavior only.',
            reviewer: 'Synthetic fixture reviewer',
          }
        : null,
    sourceComparison: {
      identity: 'Synthetic comparison identity',
      reviewer: 'Synthetic source reviewer',
      date: '2026-10-04',
      scope: 'Synthetic validator fixture only.',
      evidenceCitationIds: [citation.id],
    },
    specialistReview: {
      status: 'approved',
      reviewerName: 'Synthetic named specialist',
      reviewerRole: 'Synthetic test role',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'Synthetic gate-shape test only; not actual approval.',
      note: 'Synthetic in-memory metadata; never corpus authority.',
    },
    authoredScope: coveredClaimIds.length ? 'records' : 'none',
    inputs: inputs.inputs,
    recordedAt: '2026-10-04T00:00:00Z',
    recordedBy: 'Synthetic test runner only',
  };
  return decision;
}

let approvedCorrectionBaselinePromise;

export async function createApprovedCorrectionScenario() {
  approvedCorrectionBaselinePromise ??= buildApprovedCorrectionScenario();
  const baseline = await approvedCorrectionBaselinePromise;
  const { validateRegistry, validateLedger, validateRecord, ...scenarioData } = baseline;
  return {
    ...structuredClone(scenarioData),
    validateRegistry,
    validateLedger,
    validateRecord,
  };
}

async function buildApprovedCorrectionScenario() {
  const { records, lesson, support, prerequisite, independent } = makeRecords();
  const registry = makeRegistry();
  for (let index = 1; index <= 168; index += 1) {
    const id = `article-correction-extra-${String(index).padStart(3, '0')}`;
    records.push({
      schemaVersion: 2,
      id,
      type: 'article',
      title: `Synthetic additional record ${index}`,
      aliases: [],
      topicIds: ['topic-correction-test'],
      claims: [
        {
          id: `claim-correction-extra-${String(index).padStart(3, '0')}`,
          kind: 'structural-fact',
          text: `Synthetic additional claim ${index}.`,
          citationIds: ['citation-pbc'],
        },
      ],
      relatedIds: [],
      review: {
        status: 'reviewed',
        reviewer: 'Synthetic fixture only',
        reviewedAt: '2026-10-04',
        method: 'source-comparison',
        evidenceCitationIds: ['citation-pbc'],
        note: 'Synthetic schema and audit test only.',
      },
      rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
    });
  }
  const context = makeContext(records);
  // Expected-fixture bindings are test-only validator context. The version-2
  // record schema intentionally has no deployed `expectedFixtures` field.
  for (const record of records) {
    const schemaRecord = structuredClone(record);
    delete schemaRecord.expectedFixtures;
    const recordSchemaResult = validateRecord(schemaRecord);
    if (!recordSchemaResult.valid)
      throw new Error(
        `Correction fixture record ${record.id} invalid: ${JSON.stringify(recordSchemaResult.errors)}`,
      );
  }
  const registrySchemaResult = validateRegistry(registry);
  if (!registrySchemaResult.valid)
    throw new Error(
      `Correction fixture registry invalid: ${JSON.stringify(registrySchemaResult.errors)}`,
    );
  const registryValidation = validateAuditRegistry(registry, {
    inventoryBytes,
    editionCatalog: new Map(
      context.sources.flatMap(source =>
        source.editions.map(edition => [edition.id, { ...edition, sourceId: source.id }]),
      ),
    ),
    sourceIds: new Set(context.sources.map(source => source.id)),
    citationIds: new Map(context.citations.map(citation => [citation.id, citation])),
    featureIds: new Set(['feat-001', 'feat-097']),
    authoredRecordIds: new Set(records.map(record => record.id)),
  });
  if (!registryValidation.valid)
    throw new Error(
      `Correction fixture registry relations invalid: ${registryValidation.errors.slice(0, 20).join('; ')}`,
    );

  const targets = listRequiredAuditTargets(registry, context);
  const ledgersByScope = new Map();
  for (let index = 0; index < targets.length; index += 1) {
    const target = targets[index];
    const decision = await makeDecision(target, index + 1, context, registry, records);
    const scope = scopeForTarget(target, registry);
    const key = `${scope.kind}:${scope.id}`;
    const ledger = ledgersByScope.get(key) ?? {
      schemaVersion: 1,
      ledgerId: `synthetic-ledger-${scope.id}`,
      scope,
      decisions: [],
    };
    ledger.decisions.push(decision);
    ledgersByScope.set(key, ledger);
    if ((index + 1) % 64 === 0) await yieldToEventLoop();
  }
  const ledgers = [...ledgersByScope.values()];
  for (let index = 0; index < ledgers.length; index += 1) {
    const result = validateLedger(ledgers[index]);
    if (!result.valid)
      throw new Error(`Correction fixture ledger invalid: ${JSON.stringify(result.errors)}`);
    if ((index + 1) % 64 === 0) await yieldToEventLoop();
  }
  const ledgerState = await validateAuditLedgers(ledgers, registry, context);
  if (!ledgerState.valid)
    throw new Error(
      `Correction fixture decisions invalid: ${ledgerState.errors.slice(0, 10).join('; ')}`,
    );
  if (ledgerState.current.length !== targets.length)
    throw new Error('Synthetic correction fixture omitted required inventory targets');
  if (!ledgerState.current.every(item => item.inputState.current))
    throw new Error('Synthetic correction fixture baseline contains stale decisions');
  ledgerState.contentSnapshotIdentity = context.contentSnapshotIdentity;
  context.registry = registry;
  context.decisionSetSha256 = ledgerState.decisionSetSha256;
  const certification = {
    schemaVersion: 1,
    contentSnapshotIdentity: context.contentSnapshotIdentity,
    registry: { sha256: hash(registry), revision: registry.registryRevision },
    decisionSetSha256: ledgerState.decisionSetSha256,
    specialistReview: {
      reviewerName: 'Synthetic named certifier',
      reviewerRole: 'Synthetic test role',
      reviewedAt: '2026-10-04T00:00:00Z',
      scope: 'Synthetic full-floor gate test only; not actual certification.',
      decision: 'approved',
    },
  };
  const gates = evaluateAuditGates({ registry, ledgerState, context, certification });
  if (!gates.complete)
    throw new Error(`Synthetic full-floor baseline did not open: ${JSON.stringify(gates)}`);
  await yieldToEventLoop();

  return {
    context,
    registry,
    registryValidation,
    records,
    lesson,
    support,
    prerequisite,
    independent,
    targets,
    ledgers,
    ledgerState,
    certification,
    gates,
    validateRegistry,
    validateLedger,
    validateRecord,
  };
}

export function makeProbeLedgers(scenario, targets) {
  const keys = new Set(targets.map(target => JSON.stringify(canonicalize(target))));
  return scenario.ledgers
    .map(ledger => ({
      ...structuredClone(ledger),
      decisions: ledger.decisions.filter(decision =>
        keys.has(JSON.stringify(canonicalize(decision.target))),
      ),
    }))
    .filter(ledger => ledger.decisions.length);
}

export async function validateProbe(scenario, targets) {
  await yieldToEventLoop();
  const state = await validateAuditLedgers(
    makeProbeLedgers(scenario, targets),
    scenario.registry,
    scenario.context,
  );
  await yieldToEventLoop();
  return state;
}

export function evaluateWithProbeState(scenario, probeState) {
  const current = structuredClone(scenario.ledgerState.current);
  for (const probe of probeState.current) {
    const index = current.findIndex(
      item =>
        JSON.stringify(canonicalize(item.target)) === JSON.stringify(canonicalize(probe.target)),
    );
    if (index === -1) throw new Error(`Probe target disappeared from baseline: ${probe.target.id}`);
    current[index] = probe;
  }
  return evaluateAuditGates({
    registry: scenario.registry,
    ledgerState: {
      ...scenario.ledgerState,
      errors: [...new Set([...scenario.ledgerState.errors, ...probeState.errors])],
      current,
    },
    context: scenario.context,
    certification: scenario.certification,
  });
}

export function getTarget(scenario, predicate) {
  const target = scenario.targets.find(predicate);
  if (!target) throw new Error('Synthetic correction scenario is missing a requested target');
  return target;
}

export function scopeForProbeTarget(target) {
  return target.kind === 'cell'
    ? { kind: 'hexagram', id: target.hexagramId }
    : target.kind === 'special'
      ? {
          kind: 'hexagram',
          id: target.id.endsWith('hexagram-01') ? 'hexagram-01' : 'hexagram-02',
        }
      : { kind: 'group', id: target.kind === 'exclusion' ? 'synthetic-source-unit' : target.id };
}

export function baselineCurrentItem(scenario, target) {
  const key = JSON.stringify(canonicalize(target));
  const found = scenario.ledgerState.current.find(
    item => JSON.stringify(canonicalize(item.target)) === key,
  );
  if (!found) throw new Error(`Synthetic correction target missing: ${key}`);
  return found;
}

export function targetDecision(scenario, target) {
  const key = JSON.stringify(canonicalize(target));
  const found = scenario.ledgerState.current.find(
    item => JSON.stringify(canonicalize(item.target)) === key,
  );
  if (!found) throw new Error(`Synthetic correction decision missing for ${key}`);
  return found.decision;
}

export function baselineInputCount(scenario) {
  return scenario.ledgerState.current.length;
}

export async function recomputeInputs(scenario, decision) {
  return computeAuditInputs(scenario.context, decision.coveredClaimIds, {
    allowInMemoryFixtures: true,
    target: decision.target,
    evidenceCitationIds: [
      ...decision.locator.citationIds,
      ...decision.sourceComparison.evidenceCitationIds,
      ...decision.layerResolution.layers.flatMap(layer => layer.citationIds),
    ],
    evidenceEditionIds: [decision.locator.editionId],
  });
}

export { hash, inventoryBytes, validateLedger, validateRegistry, validateRecord, yieldToEventLoop };
