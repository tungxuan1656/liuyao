import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { validateAuditLedgers } from '../scripts/audit-decisions.mjs';
import {
  createApprovedCorrectionScenario,
  evaluateWithProbeState,
  getTarget,
  recomputeInputs,
  targetDecision,
  validateProbe,
  yieldToEventLoop,
} from './fixtures/audit-correction-fixtures.mjs';

const currentForInput = (scenario, field, id) =>
  scenario.ledgerState.current.filter(item =>
    item.decision.inputs[field].some(
      input =>
        (field === 'projectContracts' ? input.documentPath : (input.id ?? input.path)) === id,
    ),
  );

async function probeTargets(scenario, targets, { expectedStale = true } = {}) {
  await yieldToEventLoop();
  const state = await validateProbe(scenario, targets);
  expect(state.valid, state.errors.join('\n')).toBe(true);
  expect(state.current).toHaveLength(targets.length);
  if (expectedStale) expect(state.current.some(item => !item.inputState.current)).toBe(true);
  const gates = evaluateWithProbeState(scenario, state);
  expect(gates.complete).toBe(false);
  if (expectedStale) expect(gates.stale.length).toBeGreaterThan(0);
  return { state, gates };
}

const itemForTarget = (items, target) =>
  items.find(item => Object.entries(target).every(([key, value]) => item.target[key] === value));

async function withRestoredMutation(scenario, getValue, setValue, mutate, run) {
  const previous = structuredClone(getValue());
  try {
    setValue(mutate(structuredClone(previous)));
    await run();
  } finally {
    setValue(previous);
    await yieldToEventLoop();
    expect(getValue()).toEqual(previous);
  }
}

describe('isolated audit correction and approval invalidation probes', () => {
  it('opens only a fully populated synthetic full-floor baseline and validates its schemas', async () => {
    const scenario = await createApprovedCorrectionScenario();
    expect(scenario.validateRegistry(scenario.registry).valid).toBe(true);
    expect(scenario.targets).toHaveLength(2064);
    expect(scenario.ledgerState.current).toHaveLength(2064);
    expect(scenario.ledgerState.current.every(item => item.inputState.current)).toBe(true);
    expect(scenario.gates).toMatchObject({
      sourceReview: true,
      independentUnitApprovals: true,
      certification: true,
      complete: true,
      totals: { releasedClaimsRequired: 175, releasedClaimsCovered: 175 },
    });
    expect(scenario.context.syntheticInput).toBe(true);
    expect(scenario.context.fixtureBindings).toEqual([
      expect.objectContaining({
        ownerId: scenario.lesson.id,
        claimId: 'claim-correction-worked-example',
      }),
    ]);
    const fixtureTarget = getTarget(scenario, target => target.kind === 'fixture');
    expect(fixtureTarget).toEqual({
      kind: 'fixture',
      id: 'packages/knowledge/tests/fixtures/synthetic-expected-result.json',
      ownerId: scenario.lesson.id,
      childId: 'claim-correction-worked-example',
    });
    const inputs = await recomputeInputs(scenario, targetDecision(scenario, fixtureTarget));
    expect(inputs.inputs.fixtures).toHaveLength(1);
    expect(inputs.inputs.fixtures[0].sha256).toBe(
      createHash('sha256').update(Buffer.from('{"expected":"synthetic-only"}')).digest('hex'),
    );
    await yieldToEventLoop();
  }, 30_000);

  it('stales record text, title, and metadata while an unrelated unit retains its approval', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const recordTarget = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.support.id,
    );
    const independentTarget = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.independent.id,
    );
    for (const field of ['title', 'claims']) {
      await withRestoredMutation(
        scenario,
        () => scenario.support[field],
        value => (scenario.support[field] = value),
        value =>
          field === 'title'
            ? `${value} corrected`
            : value.map(claim =>
                claim.id === 'claim-correction-support'
                  ? { ...claim, text: `${claim.text} amended` }
                  : claim,
              ),
        async () => {
          const { state } = await probeTargets(scenario, [recordTarget, independentTarget]);
          expect(itemForTarget(state.current, recordTarget).inputState.stale).toContain(
            `records:${scenario.support.id}:changed`,
          );
          expect(itemForTarget(state.current, independentTarget).inputState).toEqual({
            current: true,
            stale: [],
          });
        },
      );
      expect(scenario.support[field]).toEqual(
        field === 'title' ? 'Synthetic correction support' : expect.any(Array),
      );
    }
  }, 30_000);

  it('invalidates only decisions bound to a changed source edition fingerprint', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const affected = currentForInput(scenario, 'editions', 'edition-bpct-supplied')[0].target;
    const unaffected = currentForInput(scenario, 'editions', 'edition-pbc-supplied')[0].target;
    const bpct = scenario.context.sources.find(source => source.id === 'source-book-bpct');
    const edition = bpct.editions[0];
    await withRestoredMutation(
      scenario,
      () => edition.sha256,
      value => (edition.sha256 = value),
      () => 'f'.repeat(64),
      async () => {
        const { state } = await probeTargets(scenario, [affected, unaffected]);
        expect(itemForTarget(state.current, affected).inputState.stale).toContain(
          'editions:edition-bpct-supplied:changed',
        );
        expect(itemForTarget(state.current, unaffected).inputState).toEqual({
          current: true,
          stale: [],
        });
      },
    );
  }, 30_000);

  it('invalidates dependent record, table, figure, lesson, and worked-fixture decisions transitively', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const targets = [
      getTarget(scenario, target => target.kind === 'record' && target.id === scenario.lesson.id),
      getTarget(scenario, target => target.kind === 'table'),
      getTarget(scenario, target => target.kind === 'figure'),
      getTarget(
        scenario,
        target => target.kind === 'lesson' && target.childId === 'block-correction-prose',
      ),
      getTarget(
        scenario,
        target => target.kind === 'lesson' && target.childId === 'block-correction-worked-example',
      ),
      getTarget(scenario, target => target.kind === 'fixture'),
    ];
    const unaffected = getTarget(
      scenario,
      target => target.kind === 'lesson' && target.childId === 'block-independent',
    );
    const supportClaim = scenario.support.claims[0];
    await withRestoredMutation(
      scenario,
      () => supportClaim.text,
      value => (supportClaim.text = value),
      value => `${value} corrected`,
      async () => {
        const { state } = await probeTargets(scenario, [...targets, unaffected]);
        for (const target of targets) {
          const item = itemForTarget(state.current, target);
          expect(item.inputState.current, target.kind).toBe(false);
          expect(item.inputState.stale).toContain(`records:${scenario.support.id}:changed`);
        }
        expect(itemForTarget(state.current, unaffected).inputState).toEqual({
          current: true,
          stale: [],
        });
      },
    );
    expect(scenario.support.claims[0].text).toContain('Synthetic support claim;');
  }, 30_000);

  it('invalidates claim attribution and citation attribution evidence separately', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const recordTarget = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.support.id,
    );
    await withRestoredMutation(
      scenario,
      () => scenario.support.claims[0].attribution,
      value => (scenario.support.claims[0].attribution = value),
      value => ({ ...value, author: 'Synthetic corrected attribution' }),
      async () => {
        const { state } = await probeTargets(scenario, [recordTarget]);
        expect(state.current[0].inputState.stale).toContain(
          `records:${scenario.support.id}:changed`,
        );
      },
    );

    const citationTarget = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.support.id,
    );
    const citation = scenario.context.citations.find(item => item.id === 'citation-bpct');
    await withRestoredMutation(
      scenario,
      () => citation.attributedTo,
      value => {
        if (value === undefined) delete citation.attributedTo;
        else citation.attributedTo = value;
      },
      () => 'Synthetic corrected citation attribution',
      async () => {
        const { state } = await probeTargets(scenario, [citationTarget]);
        expect(state.current[0].inputState.stale).toContain('citations:citation-bpct:changed');
      },
    );
  }, 30_000);

  it('stales new and reopened discrepancy evidence, then restores the valid baseline', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const target = getTarget(
      scenario,
      item => item.kind === 'record' && item.id === scenario.support.id,
    );
    const discrepancy = scenario.support.discrepancies[0];
    for (const change of [
      value => [
        ...value,
        {
          id: 'discrepancy-synthetic-new',
          status: 'resolved',
          description: 'New synthetic discrepancy probe.',
          citationIds: ['citation-bpct'],
          resolution: 'Synthetic only.',
        },
      ],
      value => value.map(item => ({ ...item, status: 'unresolved' })),
    ]) {
      await withRestoredMutation(
        scenario,
        () => scenario.support.discrepancies,
        value => (scenario.support.discrepancies = value),
        change,
        async () => {
          const { state } = await probeTargets(scenario, [target]);
          expect(state.current[0].inputState.stale).toContain(
            `records:${scenario.support.id}:changed`,
          );
        },
      );
    }
    expect(discrepancy.status).toBe('resolved');
    const restored = await validateProbe(scenario, [target]);
    expect(restored.valid).toBe(true);
    expect(restored.current[0].inputState).toEqual({ current: true, stale: [] });
    expect(evaluateWithProbeState(scenario, restored).complete).toBe(true);
  }, 30_000);

  it('closes support-dependent approvals while disputed or superseded evidence cannot preserve authority', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const dependent = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    for (const status of ['disputed', 'superseded']) {
      await withRestoredMutation(
        scenario,
        () => scenario.support.review.status,
        value => (scenario.support.review.status = value),
        () => status,
        async () => {
          const { state, gates } = await probeTargets(scenario, [dependent]);
          expect(state.current[0].inputState.stale).toContain(
            `records:${scenario.support.id}:changed`,
          );
          expect(gates.complete).toBe(false);
        },
      );
    }
  }, 30_000);

  it('stales a changed registered expected-result fixture by its actual synthetic bytes', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const fixture = getTarget(scenario, target => target.kind === 'fixture');
    const record = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    await withRestoredMutation(
      scenario,
      () => scenario.context.fixtureBytes[fixture.id],
      value => (scenario.context.fixtureBytes[fixture.id] = value),
      () => Buffer.from('{"expected":"corrected synthetic-only"}'),
      async () => {
        const { state } = await probeTargets(scenario, [fixture, record]);
        expect(itemForTarget(state.current, fixture).inputState.stale).toContain(
          `fixtures:${fixture.id}:changed`,
        );
        expect(itemForTarget(state.current, record).inputState.stale).toContain(
          `fixtures:${fixture.id}:changed`,
        );
      },
    );
  }, 30_000);

  it('stales used accepted project revisions but ignores unused project registry revisions', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const dependent = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    const unchanged = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.independent.id,
    );
    const contracts = scenario.context.manifest.projectContracts;
    await withRestoredMutation(
      scenario,
      () => contracts[0].revision,
      value => (contracts[0].revision = value),
      () => 'probe-r2',
      async () => {
        const { state } = await probeTargets(scenario, [dependent, unchanged]);
        expect(itemForTarget(state.current, dependent).inputState.stale).toContain(
          `projectContracts:${contracts[0].documentPath}:changed`,
        );
        expect(itemForTarget(state.current, unchanged).inputState).toEqual({
          current: true,
          stale: [],
        });
      },
    );

    await withRestoredMutation(
      scenario,
      () => contracts[1].revision,
      value => (contracts[1].revision = value),
      () => 'unused-r2',
      async () => {
        const state = await validateProbe(scenario, [dependent, unchanged]);
        expect(state.current.every(item => item.inputState.current)).toBe(true);
      },
    );
  }, 30_000);

  it('stales release membership off and back on without widening the audited claim closure', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const dependent = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    const supportId = scenario.support.id;
    const original = [...scenario.context.manifest.releaseIds];
    try {
      scenario.context.manifest.releaseIds = original.filter(id => id !== supportId);
      const removed = await probeTargets(scenario, [dependent]);
      expect(removed.state.current[0].inputState.stale).toContain(`records:${supportId}:changed`);
      scenario.context.manifest.releaseIds = original;
      const restored = await validateProbe(scenario, [dependent]);
      expect(restored.current[0].inputState).toEqual({ current: true, stale: [] });
      expect(evaluateWithProbeState(scenario, restored).complete).toBe(true);
      expect(scenario.context.manifest.releaseIds).toEqual(original);
    } finally {
      scenario.context.manifest.releaseIds = original;
    }
  }, 30_000);

  it('keeps a removed-but-still-resolved old fixture input stale rather than authoritative', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const dependent = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    const binding = scenario.context.fixtureBindings[0];
    const ownerFixtures = scenario.lesson.expectedFixtures;
    const oldDecision = targetDecision(scenario, dependent);
    const currentBinding = structuredClone(binding);
    try {
      scenario.context.fixtureBindings.push({
        ...binding,
        path: 'packages/knowledge/tests/fixtures/synthetic-old-expected-result.json',
      });
      scenario.lesson.expectedFixtures.push({
        path: 'packages/knowledge/tests/fixtures/synthetic-old-expected-result.json',
        claimId: binding.claimId,
      });
      scenario.context.fixtureBytes[
        'packages/knowledge/tests/fixtures/synthetic-old-expected-result.json'
      ] = Buffer.from('{"expected":"old synthetic binding"}');
      const withOldBinding = await validateProbe(scenario, [dependent]);
      expect(withOldBinding.current[0].inputState.stale).toContain(
        'fixtures:packages/knowledge/tests/fixtures/synthetic-old-expected-result.json:added',
      );

      scenario.context.fixtureBindings.pop();
      scenario.lesson.expectedFixtures = ownerFixtures;
      delete scenario.context.fixtureBytes[
        'packages/knowledge/tests/fixtures/synthetic-old-expected-result.json'
      ];
      await expect(validateProbe(scenario, [dependent])).resolves.toMatchObject({ valid: true });
      void oldDecision;
    } finally {
      scenario.context.fixtureBindings = [currentBinding];
      scenario.lesson.expectedFixtures = ownerFixtures;
      delete scenario.context.fixtureBytes[
        'packages/knowledge/tests/fixtures/synthetic-old-expected-result.json'
      ];
    }
  }, 30_000);

  it('rejects structural dependency cycles and missing support instead of treating them as stale review', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const lessonTarget = getTarget(
      scenario,
      target => target.kind === 'record' && target.id === scenario.lesson.id,
    );
    const originalDependencies = scenario.lesson.claims[0].dependsOnClaimIds;
    try {
      scenario.lesson.claims[0].dependsOnClaimIds = ['claim-correction-missing'];
      const missing = await validateProbe(scenario, [lessonTarget]);
      expect(missing.valid).toBe(false);
      expect(missing.errors.join('\n')).toMatch(/Missing structural claim dependency/);
      scenario.lesson.claims[0].dependsOnClaimIds = ['claim-correction-dependent'];
      const cyclic = await validateProbe(scenario, [lessonTarget]);
      expect(cyclic.valid).toBe(false);
      expect(cyclic.errors.join('\n')).toMatch(/Cyclic claim dependency/);
    } finally {
      scenario.lesson.claims[0].dependsOnClaimIds = originalDependencies;
    }
    const restored = await validateProbe(scenario, [lessonTarget]);
    expect(restored.valid).toBe(true);
    expect(restored.current[0].inputState).toEqual({ current: true, stale: [] });
  }, 30_000);

  it('invalidates certification on accepted registry revision while unchanged unit evidence stays current', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const target = getTarget(
      scenario,
      item => item.kind === 'lesson' && item.childId === 'block-independent',
    );
    const registryRevision = scenario.registry.registryRevision;
    try {
      scenario.registry.registryRevision += 1;
      const state = await validateProbe(scenario, [target]);
      expect(state.current[0].inputState).toEqual({ current: true, stale: [] });
      const gates = evaluateWithProbeState(scenario, state);
      expect(gates.certificationStatus).toBe('stale');
      expect(gates.complete).toBe(false);
    } finally {
      scenario.registry.registryRevision = registryRevision;
    }
    const restored = await validateProbe(scenario, [target]);
    expect(restored.current[0].inputState).toEqual({ current: true, stale: [] });
    expect(evaluateWithProbeState(scenario, restored).complete).toBe(true);
  }, 30_000);

  it('preserves append-only decision history when a corrected review is appended', async () => {
    const scenario = await createApprovedCorrectionScenario();
    const target = getTarget(
      scenario,
      item => item.kind === 'record' && item.id === scenario.support.id,
    );
    const old = structuredClone(targetDecision(scenario, target));
    scenario.support.title += ' corrected';
    const refreshed = await recomputeInputs(scenario, old);
    const next = {
      ...structuredClone(old),
      id: `${old.id}-revision-2`,
      revision: 2,
      supersedes: { id: old.id, revision: old.revision },
      findings: 'Synthetic corrected record re-review only.',
      inputs: refreshed.inputs,
      recordedAt: '2026-10-04T00:00:01Z',
    };
    const originalLedger = scenario.ledgers.find(item =>
      item.decisions.some(decision => decision.id === old.id),
    );
    expect(originalLedger).toBeDefined();
    const historyLedger = {
      ...structuredClone(originalLedger),
      decisions: [...structuredClone(originalLedger.decisions), next],
    };
    const validation = await validateAuditLedgers(
      [historyLedger],
      scenario.registry,
      scenario.context,
    );
    expect(validation.valid, JSON.stringify(validation.errors)).toBe(true);
    const current = itemForTarget(validation.current, target);
    expect(current.decision).toMatchObject({ id: next.id, revision: 2 });
    expect(validation.decisions).toHaveLength(originalLedger.decisions.length + 1);
    await yieldToEventLoop();
  }, 30_000);
});
