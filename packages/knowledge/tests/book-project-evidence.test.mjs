import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { checkProjectEvidence } from '../scripts/corpus-projects.mjs';

const roots = [];
function createFixture() {
  const root = mkdtempSync(path.join(tmpdir(), 'knowledge-project-contract-'));
  roots.push(root);
  mkdirSync(path.join(root, 'docs'));
  writeFileSync(
    path.join(root, 'docs', 'contract.md'),
    '# Contract\n\n## Accepted synthetic rule\n',
  );
  const revision = 'synthetic-revision-001';
  const record = {
    id: 'article-project-fixture',
    review: {
      status: 'reviewed',
      evidenceClaimIds: ['claim-project'],
      note: 'Synthetic fixture only.',
    },
    claims: [
      {
        id: 'claim-project',
        kind: 'project-convention',
        text: 'Synthetic convention.',
        citationIds: [],
        projectEvidence: [
          { documentPath: 'docs/contract.md', section: '## Accepted synthetic rule', revision },
        ],
      },
    ],
  };
  const manifest = {
    projectContracts: [
      { documentPath: 'docs/contract.md', revision, sections: ['## Accepted synthetic rule'] },
    ],
  };
  const run = (records = [record], editedManifest = manifest) =>
    checkProjectEvidence({
      manifest: editedManifest,
      records,
      repositoryRoot: root,
      fail: message => {
        throw new Error(`Invalid book corpus: ${message}`);
      },
    });
  return { root, record, manifest, run };
}

afterEach(() => {
  for (const root of roots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe('accepted project-convention evidence', () => {
  it('accepts explicit synthetic document, heading, revision, registry, and review coverage', () => {
    const fixture = createFixture();
    expect(() => fixture.run()).not.toThrow();
  });

  it.each([
    [
      'unaccepted project section',
      record => {
        record.claims[0].projectEvidence[0].documentPath = 'docs/contract.md';
        record.claims[0].projectEvidence[0].section = '## Not registered';
      },
      null,
      /not accepted/,
    ],
    [
      'revision mismatch',
      record => {
        record.claims[0].projectEvidence[0].revision = 'different-revision';
      },
      null,
      /revision does not match/,
    ],
    [
      'path escape',
      record => {
        record.claims[0].projectEvidence[0].documentPath = '../outside.md';
      },
      (contract, record) => {
        contract.documentPath = '../outside.md';
        record.claims[0].projectEvidence[0].documentPath = '../outside.md';
      },
      /unsafe project contract path/,
    ],
    [
      'unaccepted section',
      record => {
        record.claims[0].projectEvidence[0].section = '## Not accepted';
      },
      null,
      /not accepted/,
    ],
    [
      'missing heading',
      record => {
        record.claims[0].projectEvidence[0].section = '## Missing heading';
      },
      (contract, record) => {
        contract.sections.push('## Missing heading');
        record.claims[0].projectEvidence[0].section = '## Missing heading';
      },
      /accepted project contract docs\/contract\.md has missing heading/,
    ],
    [
      'empty revision',
      record => {
        record.claims[0].projectEvidence[0].revision = '';
      },
      contract => {
        contract.revision = '';
      },
      /non-empty revision/,
    ],
    [
      'book citation substituted',
      record => {
        record.claims[0].citationIds = ['citation-book'];
      },
      null,
      /must not use book citations/,
    ],
    [
      'missing project evidence',
      record => {
        delete record.claims[0].projectEvidence;
      },
      null,
      /needs projectEvidence/,
    ],
    [
      'review omits convention claim',
      record => {
        record.review.evidenceClaimIds = [];
      },
      null,
      /review evidence omits/,
    ],
  ])('rejects %s', (_label, mutate, manifestMutate, error) => {
    const fixture = createFixture();
    const record = structuredClone(fixture.record);
    mutate(record);
    const manifest = structuredClone(fixture.manifest);
    manifestMutate?.(manifest.projectContracts[0], record);
    expect(() => fixture.run([record], manifest)).toThrow(error);
  });
});
