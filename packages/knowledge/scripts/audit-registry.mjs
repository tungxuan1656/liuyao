import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAuditSchemaValidator } from './audit-schema.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const schema = JSON.parse(
  readFileSync(path.join(packageRoot, 'schema/expected-units-v1.schema.json'), 'utf8'),
);
const validateShape = createAuditSchemaValidator(schema, 'expected-units-v1 schema');
export const REQUIRED_CELLS = [
  'overview',
  'position-1',
  'position-2',
  'position-3',
  'position-4',
  'position-5',
  'position-6',
];
export const EDITION_IDS = ['edition-pbc-supplied', 'edition-ntt-supplied', 'edition-nhl-supplied'];
const EDITION_PREFIX = new Map([
  ['edition-bpct-supplied', 'bpct'],
  ['edition-pbc-supplied', 'pbc'],
  ['edition-ntt-supplied', 'ntt'],
  ['edition-nhl-supplied', 'nhl'],
]);
export const CENSUSES = [
  { parentId: 'bpct-part1-ch04', group: 'BPCT chapter 4 boards', count: 64 },
  { parentId: 'bpct-part1-ch05', group: 'BPCT chapter 5 items', count: 18 },
  { parentId: 'bpct-part1-ch06', group: 'BPCT chapter 6 labels', count: 69 },
  { parentId: 'bpct-part2-ch01-questions', group: 'BPCT questions', count: 18 },
  { parentId: 'bpct-part2-ch02-ha-tri', group: 'BPCT Hà Tri entries', count: 60 },
  { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting II entries', count: 64 },
  { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting IV entries', count: 8 },
  { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting V entries', count: 18 },
  { parentId: 'bpct-part2-ch03-casting-parent', group: 'BPCT casting VI entries', count: 11 },
  { parentId: 'bpct-part3-criticism', group: 'BPCT criticism items', count: 15 },
];

function hasInventorySourceUnit(inventoryText, sourceUnitId) {
  if (!inventoryText) return true;
  if (inventoryText.includes(sourceUnitId)) return true;
  const match = /^(pbc|ntt|nhl)-hexagram-(\d{2})$/.exec(sourceUnitId);
  if (match && inventoryText.includes(`pbc/ntt/nhl-hexagram-${match[2]}`)) return true;
  const wing = /^(pbc-he-tu-(?:shang|ha))-(\d{2})$/.exec(sourceUnitId);
  return Boolean(wing && inventoryText.includes(`${wing[1]}-01..12`));
}

function sourceForEdition(editionCatalog, editionId) {
  const entry =
    editionCatalog instanceof Map ? editionCatalog.get(editionId) : editionCatalog?.[editionId];
  if (!entry) return undefined;
  return entry.sourceId ?? entry.source?.id;
}

function expectedInventoryAnchor(anchor, inventoryText) {
  return inventoryText.replace(/\s/g, '').includes(anchor.replace(/\s/g, ''));
}

export function expandRequiredCellTargets(registry) {
  const targets = [];
  for (const hexagram of registry.hexagrams) {
    for (const book of hexagram.books) {
      for (const cell of hexagram.requiredCells) {
        targets.push({ kind: 'cell', hexagramId: hexagram.id, editionId: book.editionId, cell });
      }
    }
  }
  return targets;
}

export function createInventoryBoundValidator(inventories) {
  const { inventoryBytes, editionCatalog, sourceIds, citationIds, featureIds, authoredRecordIds } =
    inventories;
  const availableIds = {
    citationIds,
    featureIds,
    sourceIds,
  };
  for (const [name, ids] of Object.entries(availableIds)) {
    if (!(ids instanceof Set)) throw new TypeError(`${name} must be a Set`);
  }
  return registry =>
    validateAuditRegistry(registry, {
      inventoryBytes,
      editionCatalog,
      sourceIds,
      citationIds,
      featureIds,
      authoredRecordIds,
    });
}

/** Validate registry structure and its bounded relationships to canonical inventories. */
export function validateAuditRegistry(
  registry,
  {
    inventoryBytes,
    editionCatalog,
    sourceIds,
    citationIds = new Set(),
    featureIds,
    authoredRecordIds,
  } = {},
) {
  const shape = validateShape(registry);
  const errors = shape.errors.map(error => `${error.instancePath || '/'} ${error.message}`);
  if (!shape.valid) return { valid: false, errors };
  const inventoryText = Buffer.isBuffer(inventoryBytes)
    ? inventoryBytes.toString('utf8')
    : inventoryBytes;
  if (typeof inventoryText !== 'string')
    errors.push('inventoryBytes must be the exact inventory bytes');
  else {
    const digest = createHash('sha256').update(Buffer.from(inventoryText, 'utf8')).digest('hex');
    if (digest !== registry.inventory.sha256)
      errors.push('inventory.sha256 does not match exact inventory bytes');
  }
  if (registry.inventory.path !== 'docs/reviews/knowledge/source-inventory.md')
    errors.push('unsupported inventory path');
  if (registry.counts.overviewCells !== 192) errors.push('counts.overviewCells must be 192');
  if (registry.counts.positionCells !== 1152) errors.push('counts.positionCells must be 1152');
  if (registry.counts.hexagramCells !== 1344) errors.push('counts.hexagramCells must be 1344');
  if (registry.counts.specialPassages !== 6) errors.push('counts.specialPassages must be 6');
  if (registry.counts.groups !== registry.groups.length)
    errors.push('counts.groups must equal groups.length');
  if (registry.counts.exclusions !== registry.exclusions.length)
    errors.push('counts.exclusions must equal exclusions.length');
  if (registry.hexagrams.length !== 64) errors.push('registry must contain 64 hexagram parents');
  const validRosterStatuses = new Set(['unresolved', 'resolved']);
  const validDiscoveryStatuses = new Set(['unresolved', 'resolved']);
  if (
    typeof featureIds?.has !== 'function' ||
    typeof sourceIds?.has !== 'function' ||
    typeof citationIds?.has !== 'function' ||
    typeof inventoryBytes === 'undefined' ||
    typeof editionCatalog === 'undefined'
  )
    errors.push('inventory bytes, edition catalog, and catalog ID sets are required');

  const layerById = new Map();
  const targetIds = new Set();
  const groupById = new Map();
  const featureExists = value => featureIds?.has(value) ?? /^feat-[0-9]{3}$/.test(value);
  const edition = id =>
    editionCatalog instanceof Map ? editionCatalog.get(id) : editionCatalog?.[id];
  const sourceExists = id => sourceIds.has(id);
  const citationExists = id => citationIds.has(id);
  const citationEdition = id => citationIds.get?.(id)?.editionId;
  const recordExists = id => authoredRecordIds?.has(id) ?? true;
  for (const layer of registry.layers) {
    if (!validRosterStatuses.has(layer.rosterStatus))
      errors.push(`${layer.id}: invalid roster status ${layer.rosterStatus}`);
    if (layerById.has(layer.id)) errors.push(`duplicate layer id ${layer.id}`);
    layerById.set(layer.id, layer);
    if (!EDITION_PREFIX.has(layer.editionId))
      errors.push(`${layer.id}: unknown edition ${layer.editionId}`);
    if (
      inventoryText &&
      layer.sourceAnchor.inventoryAnchor &&
      !expectedInventoryAnchor(layer.sourceAnchor.inventoryAnchor, inventoryText)
    )
      errors.push(`${layer.id}: inventory anchor not found`);
    if (layer.sourceAnchor.citationIds.some(id => !citationExists(id)))
      errors.push(`${layer.id}: unknown source-class evidence citation`);
    for (const citationId of layer.sourceAnchor.citationIds)
      if (!citationExists(citationId)) errors.push(`${layer.id}: unknown citation ${citationId}`);
      else if (citationEdition(citationId) && citationEdition(citationId) !== layer.editionId)
        errors.push(`${layer.id}: source-class evidence belongs to the wrong edition`);
  }
  const checkScopes = (owner, editionId, ids) => {
    if (!ids.length) errors.push(`${owner}: empty layer scope`);
    for (const id of ids) {
      const layer = layerById.get(id);
      if (!layer) errors.push(`${owner}: unknown layer ${id}`);
      else if (layer.editionId !== editionId)
        errors.push(`${owner}: layer ${id} belongs to ${layer.editionId}, not ${editionId}`);
    }
  };
  for (const item of registry.groups) {
    if (!validDiscoveryStatuses.has(item.discoveryStatus))
      errors.push(`${item.id}: invalid discovery status ${item.discoveryStatus}`);
    if (groupById.has(item.id)) errors.push(`duplicate group id ${item.id}`);
    groupById.set(item.id, item);
    targetIds.add(item.id);
    const pdf = edition(item.editionId);
    if (!EDITION_PREFIX.has(item.editionId) || !pdf)
      errors.push(`${item.id}: unknown edition ${item.editionId}`);
    else if (item.pdfPageEnd > pdf.pdfPageCount)
      errors.push(`${item.id}: page bound exceeds ${item.editionId} page count`);
    if (item.pdfPageEnd < item.pdfPageStart) errors.push(`${item.id}: reversed page bounds`);
    if (!featureExists(item.authorFeatureId))
      errors.push(`${item.id}: unknown author feature ${item.authorFeatureId}`);
    if (!featureExists(item.auditFeatureId))
      errors.push(`${item.id}: unknown audit feature ${item.auditFeatureId}`);
    checkScopes(item.id, item.editionId, item.layerScopeIds);
    if (
      inventoryText &&
      !item.parentId &&
      !inventoryText.includes(item.id) &&
      item.id !== 'ntt-retrospective'
    )
      errors.push(`${item.id}: top-level source-unit ID not found in inventory`);
    if (item.parentId && !registry.groups.some(parent => parent.id === item.parentId))
      errors.push(`${item.id}: missing parent ${item.parentId}`);
    const parent = registry.groups.find(group => group.id === item.parentId);
    if (parent && parent.editionId !== item.editionId)
      errors.push(`${item.id}: child edition differs from parent ${parent.id}`);
    if (parent && (item.pdfPageStart < parent.pdfPageStart || item.pdfPageEnd > parent.pdfPageEnd))
      errors.push(`${item.id}: page bounds exceed parent ${parent.id}`);
    if (item.id === 'bpct-ch05-postscript' && item.number !== undefined)
      errors.push('BPCT chapter 5 postscript must remain an unnumbered separate child');
    if (item.id.startsWith('bpct-casting-III'))
      errors.push('casting III is not a source inventory unit');
    for (const recordId of item.recordIds ?? [])
      if (!recordExists(recordId)) errors.push(`${item.id}: unknown authored record ${recordId}`);
  }
  for (const item of registry.groups) {
    const seen = new Set([item.id]);
    let parentId = item.parentId;
    while (parentId) {
      if (seen.has(parentId)) {
        errors.push(`${item.id}: parent cycle at ${parentId}`);
        break;
      }
      seen.add(parentId);
      parentId = groupById.get(parentId)?.parentId;
    }
  }
  for (const census of CENSUSES) {
    const rows = registry.groups.filter(
      item => item.parentId === census.parentId && item.group === census.group,
    );
    const expectedCount = census.group === 'BPCT chapter 5 items' ? 18 : census.count;
    const numbered =
      census.group === 'BPCT chapter 5 items'
        ? rows.filter(item => item.number !== undefined)
        : rows;
    const numbers = numbered.map(item => item.number).sort((a, b) => a - b);
    if (numbers.length !== expectedCount || numbers.some((number, index) => number !== index + 1)) {
      errors.push(
        `${census.group}: expected contiguous 1-${expectedCount}, found ${numbers.length}`,
      );
    }
  }
  for (const item of registry.exclusions) {
    if (targetIds.has(item.id)) errors.push(`duplicate audit target id ${item.id}`);
    targetIds.add(item.id);
    if (inventoryText && !inventoryText.includes(item.inventoryAnchor))
      errors.push(`${item.id}: exclusion anchor not found in inventory`);
    if (
      !hasInventorySourceUnit(inventoryText, item.sourceUnitId) &&
      !registry.groups.some(group => group.id === item.sourceUnitId)
    )
      errors.push(`${item.id}: unknown source unit ${item.sourceUnitId}`);
    if (!edition(item.editionId) || !EDITION_PREFIX.has(item.editionId))
      errors.push(`${item.id}: unknown edition ${item.editionId}`);
    if (!featureExists(item.auditFeatureId))
      errors.push(`${item.id}: unknown audit feature ${item.auditFeatureId}`);
    checkScopes(item.id, item.editionId, item.layerScopeIds);
  }

  const hexagrams = new Map(registry.hexagrams.map(item => [item.id, item]));
  for (let number = 1; number <= 64; number += 1) {
    const id = `hexagram-${String(number).padStart(2, '0')}`;
    const item = hexagrams.get(id);
    if (!item || item.number !== number) {
      errors.push(`missing or misnumbered ${id}`);
      continue;
    }
    if (
      item.requiredCells.length !== 7 ||
      REQUIRED_CELLS.some(cell => !item.requiredCells.includes(cell))
    )
      errors.push(`${id}: requiredCells must be overview and positions 1-6`);
    if (!featureExists(item.auditFeatureId))
      errors.push(`${id}: unknown audit feature ${item.auditFeatureId}`);
    const seenEditions = new Set();
    for (const book of item.books) {
      if (seenEditions.has(book.editionId))
        errors.push(`${id}: duplicate edition ${book.editionId}`);
      seenEditions.add(book.editionId);
      const pdf = edition(book.editionId);
      const prefix = EDITION_PREFIX.get(book.editionId);
      if (!pdf || !prefix) errors.push(`${id}: unknown edition ${book.editionId}`);
      else {
        if (book.pdfPageEnd > pdf.pdfPageCount)
          errors.push(`${id}/${book.editionId}: page bound exceeds edition`);
        const expectedSourceId = `source-book-${prefix}`;
        const actualSourceId = sourceForEdition(editionCatalog, book.editionId);
        if (sourceIds && !sourceExists(expectedSourceId))
          errors.push(`${id}: source catalog missing ${expectedSourceId}`);
        if (actualSourceId && actualSourceId !== expectedSourceId)
          errors.push(`${id}/${book.editionId}: edition references wrong source ${actualSourceId}`);
        if (!hasInventorySourceUnit(inventoryText, book.sourceUnitId))
          errors.push(`${id}/${book.editionId}: source-unit anchor not found in inventory`);
      }
      if (book.pdfPageEnd < book.pdfPageStart)
        errors.push(`${id}/${book.editionId}: reversed page bounds`);
      checkScopes(id, book.editionId, book.layerScopeIds);
    }
    if (seenEditions.size !== 3 || EDITION_IDS.some(editionId => !seenEditions.has(editionId)))
      errors.push(`${id}: expected PBC, NTT and NHL book editions`);
  }
  const specials = new Map();
  const expectedSpecialIds = new Set(
    [1, 2].flatMap(number =>
      EDITION_IDS.map(editionId => {
        const prefix = EDITION_PREFIX.get(editionId);
        return `special-${prefix}-hexagram-${String(number).padStart(2, '0')}`;
      }),
    ),
  );
  for (const special of registry.specialPassages) {
    if (specials.has(special.id)) errors.push(`duplicate special id ${special.id}`);
    specials.set(special.id, special);
    if (targetIds.has(special.id)) errors.push(`duplicate audit target id ${special.id}`);
    targetIds.add(special.id);
    const hex = hexagrams.get(special.hexagramId);
    const prefix = EDITION_PREFIX.get(special.editionId);
    if (!prefix || special.id !== `special-${prefix}-${special.hexagramId}`)
      errors.push(`${special.id}: special obligation ID must match edition and parent`);
    if (!hex) errors.push(`${special.id}: unknown parent ${special.hexagramId}`);
    if (
      !hex?.books.some(
        book => book.editionId === special.editionId && book.sourceUnitId === special.sourceUnitId,
      )
    )
      errors.push(`${special.id}: source unit must remain its same-edition hexagram parent`);
    if (!prefix || !special.id.startsWith(`special-${prefix}-`))
      errors.push(`${special.id}: obligation ID does not match edition`);
    if (!featureExists(special.auditFeatureId))
      errors.push(`${special.id}: unknown audit feature ${special.auditFeatureId}`);
    const parentBook = hex?.books.find(book => book.editionId === special.editionId);
    const pdf = edition(special.editionId);
    if (
      special.pdfPageStart < (parentBook?.pdfPageStart ?? 1) ||
      special.pdfPageEnd > (parentBook?.pdfPageEnd ?? 0)
    )
      errors.push(`${special.id}: special locator must be inside its inventory parent range`);
    if (special.pdfPageEnd < special.pdfPageStart || (pdf && special.pdfPageEnd > pdf.pdfPageCount))
      errors.push(`${special.id}: invalid special page bounds`);
    checkScopes(special.id, special.editionId, special.layerScopeIds);
  }
  if (
    specials.size !== expectedSpecialIds.size ||
    [...expectedSpecialIds].some(id => !specials.has(id))
  )
    errors.push('special obligations must be the six Càn/Khôn edition-specific units');
  for (const hex of registry.hexagrams) {
    if (!Array.isArray(hex.specialPassageIds)) continue;
    for (const specialId of hex.specialPassageIds) {
      const special = specials.get(specialId);
      if (!special || special.hexagramId !== hex.id)
        errors.push(`${hex.id}: invalid special passage reference ${specialId}`);
    }
  }
  const targets = expandRequiredCellTargets(registry);
  const cellIds = new Set(
    targets.map(target => `${target.hexagramId}/${target.editionId}/${target.cell}`),
  );
  if (cellIds.size !== 1344)
    errors.push(`cell expansion expected 1,344 unique targets, found ${cellIds.size}`);
  if (targets.filter(target => target.cell === 'overview').length !== 192)
    errors.push('overview cell expansion must equal 192');
  if (targets.filter(target => target.cell.startsWith('position-')).length !== 1152)
    errors.push('position cell expansion must equal 1,152');
  if (registry.specialPassages.length !== 6 || specials.size !== 6)
    errors.push('special passage expansion must equal six unique obligations');
  if (errors.length) return { valid: false, errors };
  return {
    valid: true,
    errors: [],
    expansion: {
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: registry.groups.length,
      exclusions: registry.exclusions.length,
    },
  };
}
