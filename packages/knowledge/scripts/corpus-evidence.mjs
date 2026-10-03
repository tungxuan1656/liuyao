/** Validate declared claim references and released support closure. */
export function checkEvidence({ records, claimById, released, requireClaimReference, fail }) {
  const dependencyGraph = new Map();
  const references = [];

  for (const record of records) {
    const claims = allClaims(record);
    const add = (id, context, kind = 'support') => {
      requireClaimReference(id, context);
      references.push({ id, record, context, kind });
    };

    for (const claim of claims) {
      const dependencies = claim.dependsOnClaimIds ?? [];
      dependencyGraph.set(claim.id, dependencies);
      for (const id of dependencies) add(id, `${claim.id} dependency`, 'dependency');
    }
    for (const id of record.structure?.claimIds ?? []) add(id, `${record.id} structure`);
    for (const table of record.tables ?? []) {
      for (const id of table.claimIds ?? []) add(id, `${record.id} table`);
      for (const alternative of table.authorAlternatives ?? [])
        for (const id of alternative.claimIds ?? []) add(id, `${record.id} table alternative`);
    }
    for (const figure of record.figures ?? []) {
      for (const id of figure.claimIds ?? []) add(id, `${record.id}.${figure.id} figure`);
      for (const label of figure.labels ?? [])
        for (const id of label.claimIds ?? []) add(id, `${figure.id}.${label.id} label`);
      for (const id of figure.orientation?.claimIds ?? []) add(id, `${figure.id} orientation`);
      for (const alternative of figure.authorAlternatives ?? [])
        for (const id of alternative.claimIds ?? []) add(id, `${figure.id} author alternative`);
    }
    for (const block of record.blocks ?? [])
      for (const id of block.supportingClaimIds ?? [])
        add(id, `${record.id}.${block.id} lesson block`);
    for (const id of record.review.evidenceClaimIds ?? []) add(id, `${record.id} review evidence`);
  }

  checkDependencyCycles(dependencyGraph, fail);
  for (const { id, record, context } of references) {
    if (!released.has(record.id)) continue;
    const pending = [id];
    const visited = new Set();
    while (pending.length) {
      const supportId = pending.pop();
      if (!supportId || visited.has(supportId)) continue;
      visited.add(supportId);
      const support = claimById.get(supportId);
      if (!support) continue;
      if (support.record.review.status !== 'reviewed')
        fail(
          `${record.id}: ${context} depends on claim ${supportId} in non-reviewed record ${support.record.id}`,
        );
      if (!released.has(support.record.id))
        fail(
          `${record.id}: ${context} depends on unselected claim ${supportId} in ${support.record.id}`,
        );
      pending.push(...(support.claim.dependsOnClaimIds ?? []));
    }
  }

  const state = new Map();
  const visit = claimId => {
    if (state.get(claimId) === 'visiting') fail(`${claimId}: claim dependency cycle`);
    if (state.get(claimId) === 'visited') return;
    state.set(claimId, 'visiting');
    for (const dependencyId of dependencyGraph.get(claimId) ?? []) {
      const dependency = claimById.get(dependencyId);
      const ownerClaim = claimById.get(claimId);
      if (released.has(ownerClaim.record.id) && dependency.record.id !== ownerClaim.record.id) {
        if (dependency.record.review.status !== 'reviewed')
          fail(
            `${claimId}: dependency ${dependencyId} belongs to non-reviewed record ${dependency.record.id}`,
          );
        if (!released.has(dependency.record.id))
          fail(
            `${claimId}: dependency ${dependencyId} belongs to unselected record ${dependency.record.id}`,
          );
      }
      visit(dependencyId);
    }
    state.set(claimId, 'visited');
  };
  for (const claimId of dependencyGraph.keys()) visit(claimId);
}

function allClaims(record) {
  return [
    ...(record.claims ?? []),
    ...(record.lines ?? []).flatMap(line => line.claims ?? []),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims ?? []),
  ];
}

function checkDependencyCycles(graph, fail) {
  const state = new Map();
  const visit = claimId => {
    if (state.get(claimId) === 'visiting') fail(`${claimId}: claim dependency cycle`);
    if (state.get(claimId) === 'visited') return;
    state.set(claimId, 'visiting');
    for (const dependencyId of graph.get(claimId) ?? []) visit(dependencyId);
    state.set(claimId, 'visited');
  };
  for (const claimId of graph.keys()) visit(claimId);
}
