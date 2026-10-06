import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { expect, it } from 'vitest';
import { createReleaseProjection } from '../scripts/release-projection.mjs';
import { createSnapshotIdentity } from '../scripts/snapshot-identity.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);

it('reproduces generated output and rejects stale or unlisted authoring files', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'liuyao-corpus-test-'));
  try {
    const repositoryRoot = path.join(temporary, 'repo');
    const temporaryPackage = path.join(repositoryRoot, 'packages/knowledge');
    for (const directory of ['scripts', 'schema', 'data'])
      cpSync(path.join(root, directory), path.join(temporaryPackage, directory), {
        recursive: true,
      });
    cpSync(path.join(root, 'src'), path.join(temporaryPackage, 'src'), { recursive: true });
    cpSync(
      path.resolve(root, '../../docs/reviews/knowledge'),
      path.join(repositoryRoot, 'docs/reviews/knowledge'),
      { recursive: true },
    );
    cpSync(
      path.resolve(root, '../../feature_index.json'),
      path.join(repositoryRoot, 'feature_index.json'),
    );
    mkdirSync(path.join(temporaryPackage, 'node_modules'));
    for (const name of ['ajv', 'ajv-formats', 'prettier'])
      symlinkSync(
        path.dirname(require.resolve(`${name}/package.json`)),
        path.join(temporaryPackage, 'node_modules', name),
      );
    const run = (...args) =>
      spawnSync(
        process.execPath,
        [path.join(temporaryPackage, 'scripts/validate-corpus.mjs'), ...args],
        {
          encoding: 'utf8',
          timeout: 30_000,
        },
      );
    const generated = path.join(temporaryPackage, 'src/book-data.generated.ts');
    const releaseJson = path.join(temporaryPackage, 'src/book-release.generated.json');
    const auditStatus = path.join(temporaryPackage, 'reports/audit-status.json');
    const coverageReport = path.join(temporaryPackage, 'reports/coverage.json');
    const first = run();
    expect(first.status, first.stderr).toBe(0);
    const original = readFileSync(generated, 'utf8');
    const originalAudit = readFileSync(auditStatus, 'utf8');
    const originalCoverage = readFileSync(coverageReport, 'utf8');
    const originalRelease = readFileSync(releaseJson, 'utf8');
    const originalWrapper = readFileSync(generated, 'utf8');
    expect(run('--check').status).toBe(0);
    expect(run().status).toBe(0);
    expect(readFileSync(generated, 'utf8')).toBe(original);
    expect(readFileSync(auditStatus, 'utf8')).toBe(originalAudit);
    writeFileSync(auditStatus, originalAudit);
    expect(readFileSync(coverageReport, 'utf8')).toBe(originalCoverage);
    const audit = JSON.parse(originalAudit);
    expect(audit.registry.counts).toMatchObject({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 625,
      exclusions: 17,
    });
    expect(audit.totals).toMatchObject({
      releasedClaimsCovered: 197,
      releasedClaimsRequired: 3384,
      currentDecisions: 84,
    });
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(JSON.parse(originalCoverage).complete).toBe(false);
    const protectedFiles = [
      ...JSON.parse(
        readFileSync(path.join(temporaryPackage, 'data/manifest.json'), 'utf8'),
      ).recordFiles.map(file => path.join(temporaryPackage, 'data', file)),
      releaseJson,
      generated,
    ];
    const protectedBytes = protectedFiles.map(file => readFileSync(file));

    writeFileSync(auditStatus, `${originalAudit.trim()} `);
    const staleAudit = run('--check');
    expect(staleAudit.status).not.toBe(0);
    expect(staleAudit.stderr).toContain('Stale generated corpus output: reports/audit-status.json');
    writeFileSync(auditStatus, originalAudit);
    const requireComplete = run('--require-complete');
    expect(requireComplete.status).not.toBe(0);
    expect(requireComplete.stderr).toContain('Audit completion gates are closed');
    expect(readFileSync(auditStatus, 'utf8')).toBe(originalAudit);
    const unknownOption = run('--unknown-audit-mode');
    expect(unknownOption.status).not.toBe(0);
    expect(unknownOption.stderr).toContain('Unknown corpus validation option');

    const expectedRegistry = path.join(
      repositoryRoot,
      'docs/reviews/knowledge/expected-units.json',
    );
    const registryBefore = readFileSync(expectedRegistry, 'utf8');
    const manifestPath = path.join(temporaryPackage, 'data/manifest.json');
    const mutatedRegistry = JSON.parse(registryBefore);
    mutatedRegistry.counts.groups -= 1;
    writeFileSync(expectedRegistry, JSON.stringify(mutatedRegistry, null, 2) + '\n');
    const invalidRegistry = run();
    expect(invalidRegistry.status).not.toBe(0);
    expect(invalidRegistry.stderr).toMatch(/Expected-unit registry invalid/);
    writeFileSync(expectedRegistry, registryBefore);

    const standaloneCheckBooks = run('--check-books');
    expect(standaloneCheckBooks.status).not.toBe(0);
    expect(standaloneCheckBooks.stderr).toContain('ENOENT');

    const changedRegistry = JSON.parse(registryBefore);
    changedRegistry.registryRevision += 1;
    writeFileSync(expectedRegistry, JSON.stringify(changedRegistry, null, 2) + '\n');
    const changedRegistryResult = run();
    expect(changedRegistryResult.status, changedRegistryResult.stderr).toBe(0);
    const changedAudit = readFileSync(auditStatus, 'utf8');
    expect(changedAudit).not.toBe(originalAudit);
    expect(JSON.parse(changedAudit).gates.sourceReview.status).toBe('closed');
    expect(readFileSync(releaseJson, 'utf8')).toBe(originalRelease);
    expect(readFileSync(generated, 'utf8')).toBe(originalWrapper);
    writeFileSync(expectedRegistry, registryBefore);

    const ledgerRoot = path.join(repositoryRoot, 'docs/reviews/knowledge/ledgers');
    const ledgerHold = `${ledgerRoot}.hold`;
    renameSync(ledgerRoot, ledgerHold);
    const missingLedgerRoot = run();
    expect(missingLedgerRoot.status).not.toBe(0);
    expect(missingLedgerRoot.stderr).toContain('Ledger root is required');
    renameSync(ledgerHold, ledgerRoot);

    const release = readFileSync(releaseJson, 'utf8');
    expect(release).not.toContain('draft-marker');
    expect(release).not.toContain('localInputPath');
    expect(release).not.toContain('data/manifest.json');
    expect(readFileSync(generated, 'utf8')).not.toMatch(/\.\.\/data\//);
    expect(readFileSync(generated, 'utf8')).toContain('"./book-release.generated.json"');
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    const draftRecord = JSON.parse(
      readFileSync(path.join(temporaryPackage, 'data/terms/term-yang.json'), 'utf8'),
    );
    draftRecord.id = 'term-synthetic-c3-draft';
    draftRecord.claims = draftRecord.claims.map((claim, index) => ({
      ...claim,
      id: `claim-synthetic-c3-draft-${index + 1}`,
      text: 'UNIQUE_DRAFT_PROSE_MARKER',
    }));
    const draftPath = path.join(temporaryPackage, 'data/terms/term-synthetic-c3-draft.json');
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
    writeFileSync(path.join(temporaryPackage, 'data/terms/unlisted.json'), '{}');
    const unlisted = run();
    expect(unlisted.status).not.toBe(0);
    expect(unlisted.stderr).toContain('Unlisted authored JSON: terms/unlisted.json');
    protectedFiles.forEach((file, index) =>
      expect(readFileSync(file)).toEqual(protectedBytes[index]),
    );
    expect(readFileSync(releaseJson, 'utf8')).toBe(releaseAfterDraftEdit);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}, 60_000);

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

it('produces the same canonical identity under different process locales', () => {
  const script = `
    String.prototype.localeCompare = () => { throw new Error('localeCompare must not affect canonical identity'); };
    import { createReleaseProjection } from ${JSON.stringify(new URL('../scripts/release-projection.mjs', import.meta.url).href)};
    const recordIds = ['éclair', 'Zebra', 'apple', 'Ångström'];
    const paths = ['docs/éclair.md', 'docs/Zebra.md', 'docs/apple.md', 'docs/Ångström.md'];
    const records = recordIds.map((id, index) => ({
      schemaVersion: 2,
      id,
      type: 'article',
      title: id,
      aliases: [],
      topicIds: ['topic-fixture'],
      claims:
        index === 0
          ? paths.map((documentPath, pathIndex) => ({
              id: 'claim-' + pathIndex,
              kind: 'project-convention',
              text: 'Synthetic project evidence.',
              citationIds: [],
              projectEvidence: [{ documentPath, section: '## ' + id, revision: 'synthetic' }],
            }))
          : [],
      relatedIds: [],
      review: {
        status: 'reviewed',
        evidenceClaimIds: index === 0 ? paths.map((_, i) => 'claim-' + i) : [],
      },
    }));
    const projection = createReleaseProjection({
      manifest: {
        schemaVersion: 1,
        corpusId: 'locale-fixture',
        language: 'vi',
        releaseIds: [...recordIds].reverse(),
        topics: [{ id: 'topic-fixture', title: 'Fixture', track: 'shared', status: 'partial' }],
        projectContracts: paths.map(documentPath => ({
          documentPath,
          revision: 'synthetic',
          sections: ['## éclair', '## Zebra', '## apple', '## Ångström'],
        })).reverse(),
      },
      records,
      citations: [],
      sources: [],
    });
    console.log(JSON.stringify({
      identity: projection.snapshotIdentity,
      releaseIds: projection.releaseIds,
      projectContractPaths: projection.projectContracts.map(contract => contract.documentPath),
    }));
  `;
  const identities = ['en_US.UTF-8', 'vi_VN.UTF-8', 'tr_TR.UTF-8', 'C'].map(locale => {
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
      encoding: 'utf8',
      env: { ...process.env, LANG: locale, LC_ALL: locale },
    });
    expect(result.status, result.stderr).toBe(0);
    return JSON.parse(result.stdout.trim());
  });
  expect(identities).toEqual([identities[0], identities[0], identities[0], identities[0]]);
  expect(identities[0].releaseIds).toEqual(['Zebra', 'apple', 'Ångström', 'éclair']);
  expect(identities[0].projectContractPaths).toEqual([
    'docs/Zebra.md',
    'docs/apple.md',
    'docs/Ångström.md',
    'docs/éclair.md',
  ]);
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
