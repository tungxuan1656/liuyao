/** Validate figure identities, bounded evidence, and inspection release gates. */
export function checkFigures(record, { registerFigure, requireClaimReference, released, fail }) {
  const figures = record.figures ?? [];
  const figureIds = new Set();

  for (const figure of figures) {
    if (figureIds.has(figure.id)) fail(`${record.id}: duplicate figure ${figure.id}`);
    figureIds.add(figure.id);
    registerFigure(figure.id, record.id);

    const isPlate = figure.kind === 'plate';
    if (!isPlate) {
      if (!figure.sourceUnitIds?.length)
        fail(`${record.id}.${figure.id}: non-plate figure needs sourceUnitIds`);
      if (!figure.claimIds?.length)
        fail(`${record.id}.${figure.id}: non-plate figure needs claimIds`);
      if (!figure.labels?.length)
        fail(`${record.id}.${figure.id}: non-plate figure needs ordered labels`);
    }

    const labels = new Set();
    for (const label of figure.labels ?? []) {
      if (labels.has(label.id)) fail(`${figure.id}: duplicate label ${label.id}`);
      labels.add(label.id);
      if (!label.claimIds?.length) fail(`${figure.id}.${label.id}: label needs claimIds`);
      for (const id of label.claimIds ?? []) requireClaimReference(id, `${figure.id}.${label.id}`);
    }
    for (const id of figure.claimIds ?? []) requireClaimReference(id, figure.id);
    for (const id of figure.orientation?.claimIds ?? [])
      requireClaimReference(id, `${figure.id} orientation`);
    for (const alternative of figure.authorAlternatives ?? []) {
      if (!alternative.claimIds?.length) fail(`${figure.id}: author alternative needs claimIds`);
      for (const id of alternative.claimIds)
        requireClaimReference(id, `${figure.id} author alternative`);
    }
    if (released.has(record.id) && isPlate && figure.inspectionStatus !== 'visually-inspected')
      fail(`${record.id}: released plate ${figure.id} is not visually inspected`);
  }
}

export function figureEvidence(figure) {
  return [
    ...(figure.claimIds ?? []),
    ...(figure.labels ?? []).flatMap(label => label.claimIds ?? []),
    ...(figure.orientation?.claimIds ?? []),
    ...(figure.authorAlternatives ?? []).flatMap(alternative => alternative.claimIds ?? []),
  ];
}
