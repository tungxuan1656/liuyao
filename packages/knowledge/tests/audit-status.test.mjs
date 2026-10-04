import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createAuditStatus } from '../scripts/audit-status.mjs';
import { canonicalize } from '../scripts/snapshot-identity.mjs';
import { validateAuditLedgers } from '../scripts/audit-decisions.mjs';
import { loadAuditReview } from '../scripts/audit-loader.mjs';
import { auditContext, minimalRegistry } from './fixtures/audit-fixtures.mjs';

const repositoryRoot = fileURLToPath(new URL('../../..', import.meta.url));

describe('generated audit status', () => {
  it('reports deterministic empty-ledger denominators with both gates closed', () => {
    const { context } = auditContext();
    context.manifest.releaseIds = [];
    context.records = [];
    const registry = minimalRegistry();
    const ledgerState = {
      errors: [],
      current: [],
      decisionSetSha256: createHash('sha256').update('[]').digest('hex'),
    };
    const review = {
      registry,
      ledgerState,
      certification: null,
      registrySha256: createHash('sha256')
        .update(JSON.stringify(canonicalize(registry)))
        .digest('hex'),
      reviewEvidenceIdentity: createHash('sha256')
        .update(JSON.stringify(canonicalize([])))
        .digest('hex'),
    };
    const statusContext = {
      ...context,
      contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'a'.repeat(64)}`,
    };
    const first = createAuditStatus({ context: statusContext, review });
    const second = createAuditStatus({ context: statusContext, review });

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      schemaVersion: 1,
      gates: {
        sourceReview: { status: 'closed' },
        certification: { status: 'closed', state: 'missing' },
      },
      complete: false,
      totals: {
        releasedClaimsCovered: 0,
        releasedClaimsRequired: 0,
        overviewCells: 192,
        positionCells: 1152,
        hexagramCells: 1344,
        specialPassages: 0,
        groups: 1,
        exclusions: 0,
        currentDecisions: 0,
        approvedDecisions: 0,
      },
    });
    expect(first.gates.sourceReview.counts.missing).toBeGreaterThan(0);
    expect(first.gates.certification.reasons).toContainEqual({
      code: 'certification-absent',
      count: 1,
    });
  });

  it('keeps stale well-formed certification closed without making the artifact invalid', () => {
    const { context } = auditContext();
    const registry = minimalRegistry();
    const certification = {
      schemaVersion: 1,
      contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'f'.repeat(64)}`,
      registry: { sha256: 'a'.repeat(64), revision: registry.registryRevision },
      decisionSetSha256: 'b'.repeat(64),
      specialistReview: {
        reviewerName: 'Actual reviewer',
        reviewerRole: 'Specialist',
        reviewedAt: '2026-10-04T00:00:00Z',
        scope: 'Synthetic test binding only',
        decision: 'approved',
      },
    };
    const ledgerState = { errors: [], current: [], decisionSetSha256: 'c'.repeat(64) };
    const review = {
      registry,
      ledgerState,
      certification,
      registrySha256: createHash('sha256')
        .update(JSON.stringify(canonicalize(registry)))
        .digest('hex'),
      reviewEvidenceIdentity: createHash('sha256')
        .update(JSON.stringify(canonicalize([])))
        .digest('hex'),
    };
    const status = createAuditStatus({
      context: {
        ...context,
        contentSnapshotIdentity: `liuyao-knowledge-snapshot-v1:sha256:${'a'.repeat(64)}`,
      },
      review,
    });
    expect(status.complete).toBe(false);
    expect(status.gates.certification).toMatchObject({ status: 'closed', state: 'stale' });
    expect(status.gates.certification.reasons).toContainEqual({
      code: 'certification-stale-or-unapproved',
      count: 1,
    });
  });

  it('hashes the current decision set independently of ledger file formatting', async () => {
    const { context } = auditContext();
    const registry = minimalRegistry();
    const empty = await validateAuditLedgers([], registry, context);
    const emptyLedger = await validateAuditLedgers(
      [
        {
          schemaVersion: 1,
          ledgerId: 'ledger-empty',
          scope: { kind: 'group', id: 'source-unit-test' },
          decisions: [],
        },
      ],
      registry,
      context,
    );
    expect(emptyLedger.decisionSetSha256).toBe(empty.decisionSetSha256);
  });

  it('loads only sorted ledger JSON and hashes resolved edition fingerprints without PDFs', async () => {
    const temporary = await mkdtemp(path.join(tmpdir(), 'liuyao-audit-loader-'));
    const scratchRoot = path.join(temporary, 'repo');
    const scratchLedgerRoot = path.join(scratchRoot, 'docs/reviews/knowledge/ledgers');
    try {
      await mkdir(scratchLedgerRoot, { recursive: true });
      await mkdir(path.join(scratchRoot, 'docs/reviews/knowledge'), { recursive: true });
      await writeFile(
        path.join(scratchRoot, 'docs/reviews/knowledge/expected-units.json'),
        await readFile(path.join(repositoryRoot, 'docs/reviews/knowledge/expected-units.json')),
      );
      await writeFile(
        path.join(scratchRoot, 'docs/reviews/knowledge/source-inventory.md'),
        await readFile(path.join(repositoryRoot, 'docs/reviews/knowledge/source-inventory.md')),
      );
      await writeFile(
        path.join(scratchLedgerRoot, 'README.md'),
        'Synthetic isolated loader fixture.\n',
      );
      await writeFile(
        path.join(scratchRoot, 'feature_index.json'),
        await readFile(path.join(repositoryRoot, 'feature_index.json')),
      );
      await writeFile(path.join(scratchLedgerRoot, 'ignored.txt'), 'not parsed');
      await writeFile(
        path.join(scratchLedgerRoot, 'z-empty.json'),
        JSON.stringify({
          schemaVersion: 1,
          ledgerId: 'ledger-z-empty',
          scope: { kind: 'group', id: 'bpct-front' },
          decisions: [],
        }),
      );
      await writeFile(
        path.join(scratchLedgerRoot, 'a-empty.json'),
        JSON.stringify({
          schemaVersion: 1,
          ledgerId: 'ledger-a-empty',
          scope: { kind: 'group', id: 'bpct-front' },
          decisions: [],
        }),
      );
      const corpus = JSON.parse(
        await readFile(path.join(repositoryRoot, 'packages/knowledge/data/manifest.json')),
      );
      const sources = JSON.parse(
        readFileSync(
          path.join(repositoryRoot, 'packages/knowledge/data', corpus.sourceFile),
          'utf8',
        ),
      ).sources;
      const citations = corpus.citationFiles.flatMap(
        file =>
          JSON.parse(
            readFileSync(path.join(repositoryRoot, 'packages/knowledge/data', file), 'utf8'),
          ).citations,
      );
      const records = corpus.recordFiles.map(file =>
        JSON.parse(
          readFileSync(path.join(repositoryRoot, 'packages/knowledge/data', file), 'utf8'),
        ),
      );
      const review = await loadAuditReview({
        repositoryRoot: scratchRoot,
        context: {
          manifest: corpus,
          records,
          citations,
          sources,
          repositoryRoot: scratchRoot,
          fixtureBindings: [],
        },
      });
      expect(review.ledgers.map(ledger => ledger.ledgerId)).toEqual([
        'ledger-a-empty',
        'ledger-z-empty',
      ]);
      expect(review.ledgerFileIdentities.map(item => path.basename(item.path))).toEqual([
        'a-empty.json',
        'z-empty.json',
      ]);
      expect(review.ledgerState.current).toEqual([]);
      expect(review.ledgerState.valid).toBe(true);
      expect(review.reviewEvidenceIdentity).not.toBe(review.ledgerState.decisionSetSha256);
      expect(review.certification).toBeNull();
    } finally {
      await rm(temporary, { recursive: true, force: true });
    }
  });
});
