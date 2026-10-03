import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { expect, it } from 'vitest';
import { createReleaseProjection } from '../scripts/release-projection.mjs';
import { createSnapshotIdentity } from '../scripts/snapshot-identity.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);

it('reproduces generated output and rejects stale or unlisted authoring files', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'liuyao-corpus-test-'));
  try {
    for (const directory of ['scripts', 'schema', 'data'])
      cpSync(path.join(root, directory), path.join(temporary, directory), { recursive: true });
    mkdirSync(path.join(temporary, 'src'));
    mkdirSync(path.join(temporary, 'node_modules'));
    for (const name of ['ajv', 'ajv-formats', 'prettier'])
      symlinkSync(
        path.dirname(require.resolve(`${name}/package.json`)),
        path.join(temporary, 'node_modules', name),
      );
    const run = (...args) =>
      spawnSync(process.execPath, [path.join(temporary, 'scripts/validate-corpus.mjs'), ...args], {
        encoding: 'utf8',
      });
    const generated = path.join(temporary, 'src/book-data.generated.ts');
    const releaseJson = path.join(temporary, 'src/book-release.generated.json');
    const first = run();
    expect(first.status, first.stderr).toBe(0);
    const original = readFileSync(generated, 'utf8');
    expect(run('--check').status).toBe(0);
    expect(run().status).toBe(0);
    expect(readFileSync(generated, 'utf8')).toBe(original);
    const release = readFileSync(releaseJson, 'utf8');
    expect(release).not.toContain('draft-marker');
    expect(release).not.toContain('localInputPath');
    expect(release).not.toContain('data/manifest.json');
    expect(readFileSync(generated, 'utf8')).not.toMatch(/\.\.\/data\//);
    expect(readFileSync(generated, 'utf8')).toContain('"./book-release.generated.json"');
    const manifestPath = path.join(temporary, 'data/manifest.json');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const draftRecord = JSON.parse(
      readFileSync(path.join(temporary, 'data/terms/term-yang.json'), 'utf8'),
    );
    draftRecord.id = 'term-synthetic-c3-draft';
    draftRecord.claims = draftRecord.claims.map((claim, index) => ({
      ...claim,
      id: `claim-synthetic-c3-draft-${index + 1}`,
      text: 'UNIQUE_DRAFT_PROSE_MARKER',
    }));
    const draftPath = path.join(temporary, 'data/terms/term-synthetic-c3-draft.json');
    const beforeDraftIdentity = JSON.parse(readFileSync(releaseJson, 'utf8')).snapshotIdentity;
    draftRecord.review.status = 'draft';
    draftRecord.title = 'UNIQUE_DRAFT_TITLE_MARKER';
    writeFileSync(draftPath, JSON.stringify(draftRecord, null, 2) + '\n');
    manifest.recordFiles.push('terms/term-synthetic-c3-draft.json');
    writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    const updated = run();
    expect(updated.status, updated.stderr).toBe(0);
    const releaseAfterDraftEdit = readFileSync(releaseJson, 'utf8');
    expect(releaseAfterDraftEdit).not.toContain('UNIQUE_DRAFT_TITLE_MARKER');
    expect(releaseAfterDraftEdit).not.toContain('UNIQUE_DRAFT_PROSE_MARKER');
    expect(JSON.parse(releaseAfterDraftEdit).snapshotIdentity).toBe(beforeDraftIdentity);
    writeFileSync(generated, '// stale\n');
    const stale = run('--check');
    expect(stale.status).not.toBe(0);
    expect(stale.stderr).toContain('Stale generated corpus output');
    expect(run().status).toBe(0);
    writeFileSync(path.join(temporary, 'data/terms/unlisted.json'), '{}');
    const unlisted = run();
    expect(unlisted.status).not.toBe(0);
    expect(unlisted.stderr).toContain('Unlisted authored JSON: terms/unlisted.json');
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

it('projects only selected records and reachable citation editions without local paths', () => {
  const claim = (id, citationIds = []) => ({ id, kind: 'structural-fact', text: id, citationIds });
  const record = (id, claims, review = { status: 'reviewed' }) => ({
    schemaVersion: 1,
    id,
    type: 'article',
    title: id,
    aliases: [],
    topicIds: ['topic-one'],
    claims,
    relatedIds: [],
    review,
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  });
  const usedRecord = record('article-used', [claim('claim-used', ['citation-used'])], {
    status: 'reviewed',
    evidenceCitationIds: ['citation-review'],
  });
  const draft = record('article-draft', [claim('claim-draft', ['citation-draft'])], {
    status: 'draft',
  });
  const citation = id => ({
    id,
    sourceId: 'source-one',
    editionId: 'edition-used',
    location: { chapter: 'chapter', section: 'section', pdfPageStart: 1, pdfPageEnd: 1 },
    textLayer: 'original-text',
  });
  const sources = [
    {
      id: 'source-one',
      title: 'Source',
      author: 'Author',
      contributors: ['Contributor'],
      editions: [
        {
          id: 'edition-used',
          label: 'Edition',
          sha256: 'a'.repeat(64),
          pdfPageCount: 1,
          localInputPath: 'private/file.pdf',
          publication: { publisher: 'P', year: 2020, note: '' },
          rights: { status: 'unconfirmed', use: 'research-only', note: 'research' },
        },
        {
          id: 'edition-unused',
          label: 'Unused',
          sha256: 'b'.repeat(64),
          pdfPageCount: 1,
          localInputPath: 'private/unused.pdf',
          publication: { publisher: null, year: null, note: '' },
          rights: { status: 'unconfirmed', use: 'research-only', note: '' },
        },
      ],
    },
  ];
  const manifest = {
    schemaVersion: 1,
    corpusId: 'fixture',
    language: 'vi',
    releaseIds: ['article-used'],
    topics: [{ id: 'topic-one', title: 'Topic', track: 'shared', status: 'partial' }],
    projectContracts: [],
  };
  const projection = createReleaseProjection({
    manifest,
    records: [usedRecord, draft],
    citations: [citation('citation-used'), citation('citation-review'), citation('citation-draft')],
    sources,
  });
  expect(projection.records.map(item => item.id)).toEqual(['article-used']);
  expect(projection.citations.map(item => item.id)).toEqual(['citation-used', 'citation-review']);
  expect(projection.sources[0].editions.map(item => item.id)).toEqual(['edition-used']);
  expect(JSON.stringify(projection)).not.toContain('private/');
  expect(projection.snapshotIdentity).toBe(
    createSnapshotIdentity(projectionWithoutIdentity(projection)),
  );
});

it('canonicalizes declared reference sets but preserves semantic collection order', () => {
  const base = {
    releaseIds: ['r2', 'r1'],
    records: [
      {
        id: 'r2',
        claims: [
          { id: 'c2', citationIds: ['x', 'y'] },
          { id: 'c1', citationIds: ['z'] },
        ],
      },
      { id: 'r1', claims: [] },
    ],
    citations: [{ id: 'y' }, { id: 'x' }],
    blocks: [{ id: 'b1' }, { id: 'b2' }],
  };
  const permutedSets = structuredClone(base);
  permutedSets.releaseIds.reverse();
  permutedSets.records.reverse();
  permutedSets.citations.reverse();
  permutedSets.records[1].claims[0].citationIds.reverse();
  expect(createSnapshotIdentity(base)).toBe(createSnapshotIdentity(permutedSets));
  const reorderedClaims = structuredClone(base);
  reorderedClaims.records[0].claims.reverse();
  expect(createSnapshotIdentity(base)).not.toBe(createSnapshotIdentity(reorderedClaims));
  const reorderedBlocks = structuredClone(base);
  reorderedBlocks.blocks.reverse();
  expect(createSnapshotIdentity(base)).not.toBe(createSnapshotIdentity(reorderedBlocks));
  expect(createSnapshotIdentity({ a: 1, b: 2 })).toBe(createSnapshotIdentity({ b: 2, a: 1 }));
});

it('projects released collections in authoring order and hashes semantic release changes', () => {
  const makeClaim = (id, citationIds = ['citation-a']) => ({
    id,
    kind: 'structural-fact',
    text: `Text ${id}`,
    citationIds,
  });
  const makeRecord = (id, claims, title = id) => ({
    schemaVersion: 1,
    id,
    type: 'article',
    title,
    aliases: [],
    topicIds: ['topic-a'],
    claims,
    relatedIds: [],
    review: {
      status: 'reviewed',
      evidenceCitationIds: [...new Set(claims.flatMap(item => item.citationIds))],
    },
    rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  });
  const first = makeRecord('article-first', [makeClaim('claim-first')]);
  const second = makeRecord('article-second', [makeClaim('claim-second')]);
  const baseInput = {
    manifest: {
      schemaVersion: 1,
      corpusId: 'fixture',
      language: 'vi',
      releaseIds: ['article-first', 'article-second'],
      topics: [{ id: 'topic-a', title: 'Topic A', track: 'shared', status: 'partial' }],
      projectContracts: [],
    },
    records: [first, second],
    citations: [{ id: 'citation-a', sourceId: 'source-a', editionId: 'edition-a' }],
    sources: [
      {
        id: 'source-a',
        title: 'Source A',
        author: 'Author',
        contributors: ['A', 'B'],
        editions: [
          {
            id: 'edition-a',
            label: 'Edition',
            sha256: 'a'.repeat(64),
            pdfPageCount: 1,
            localInputPath: '/private/input.pdf',
            publication: { publisher: 'Publisher', year: 2020, note: '' },
            rights: { status: 'unconfirmed', use: 'research-only', note: 'Research' },
          },
        ],
      },
    ],
  };
  const identity = input => createReleaseProjection(input).snapshotIdentity;
  const baseline = identity(baseInput);
  expect(identity({ ...baseInput, records: [...baseInput.records].reverse() })).toBe(baseline);
  const claimOrder = structuredClone(baseInput);
  claimOrder.records[0].claims.push(makeClaim('claim-second-in-record', ['citation-a']));
  const changedClaimOrder = structuredClone(claimOrder);
  changedClaimOrder.records[0].claims.reverse();
  expect(identity(changedClaimOrder)).not.toBe(identity(claimOrder));
  const changedTopic = structuredClone(baseInput);
  changedTopic.manifest.topics[0].title = 'Changed topic';
  expect(identity(changedTopic)).not.toBe(baseline);
  const changedSource = structuredClone(baseInput);
  changedSource.sources[0].contributors.reverse();
  expect(identity(changedSource)).not.toBe(baseline);
  const changedCitation = structuredClone(baseInput);
  changedCitation.citations[0].location = {
    chapter: 'Changed',
    section: 'Section',
    pdfPageStart: 1,
    pdfPageEnd: 1,
  };
  expect(identity(changedCitation)).not.toBe(baseline);
  const changedReleaseMembership = structuredClone(baseInput);
  changedReleaseMembership.manifest.releaseIds.reverse();
  expect(identity(changedReleaseMembership)).toBe(baseline);
  const unused = structuredClone(baseInput);
  unused.sources[0].editions.push({
    id: 'edition-unused',
    label: 'Unused',
    sha256: 'b'.repeat(64),
    pdfPageCount: 1,
    localInputPath: '/other/path.pdf',
    publication: { publisher: null, year: null, note: '' },
    rights: { status: 'unconfirmed', use: 'research-only', note: '' },
  });
  expect(identity(unused)).toBe(baseline);
});

function projectionWithoutIdentity({ snapshotIdentity: _snapshotIdentity, ...projection }) {
  return projection;
}
