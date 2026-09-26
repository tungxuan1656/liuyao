import type { KnowledgeCatalog, KnowledgeEntity, KnowledgeRecordId, TrigramId } from './schema';

const TRIGRAM_IDS = new Set<TrigramId>([
  'trigram-heaven',
  'trigram-lake',
  'trigram-fire',
  'trigram-thunder',
  'trigram-wind',
  'trigram-water',
  'trigram-mountain',
  'trigram-earth',
]);
const RULESET_ID = 'liuyao-standard-v1';
const HEXAGRAM_ID = /^hexagram-(0[1-9]|[1-5][0-9]|6[0-4])$/;
const RECORD_ID: Record<string, RegExp> = {
  term: /^term-[a-z0-9]+(?:-[a-z0-9]+)*$/,
  rule: /^rule-[a-z0-9]+(?:-[a-z0-9]+)*$/,
  source: /^source-[a-z0-9]+(?:-[a-z0-9]+)*$/,
  reference: /^reference-[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

function fail(path: string, message: string): never {
  throw new Error(`Invalid knowledge catalog at ${path}: ${message}`);
}

function record(value: unknown, path: string, fields: readonly string[]): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail(path, 'expected an object');
  }
  const item = value as Record<string, unknown>;
  for (const field of fields) {
    if (!(field in item)) fail(`${path}.${field}`, 'required field is missing');
  }
  for (const field of Object.keys(item)) {
    if (!fields.includes(field)) fail(`${path}.${field}`, 'unexpected field');
  }
  return item;
}

function text(value: unknown, path: string): asserts value is string {
  if (typeof value !== 'string' || value.trim().length === 0)
    fail(path, 'expected a non-empty string');
}

function stringArray(value: unknown, path: string): asserts value is readonly string[] {
  if (!Array.isArray(value)) fail(path, 'expected an array');
  value.forEach((entry, index) => text(entry, `${path}[${index}]`));
}

function id(value: unknown, path: string, kind: string): asserts value is KnowledgeRecordId {
  if (typeof value !== 'string' || !RECORD_ID[kind]?.test(value)) {
    fail(path, `expected a valid ${kind} ID`);
  }
}

/** Validate catalog shape, stable identities, and all cross-record links. */
export function validateKnowledgeCatalog(catalog: KnowledgeCatalog): void {
  const root = record(catalog, 'catalog', ['entities', 'terms', 'rules', 'sources', 'references']);
  for (const collection of ['entities', 'terms', 'rules', 'sources', 'references'] as const) {
    if (!Array.isArray(root[collection])) fail(`catalog.${collection}`, 'expected an array');
  }

  const ids = new Map<string, string>();
  const register = (value: unknown, path: string): string => {
    if (typeof value !== 'string') fail(`${path}.id`, 'expected a string ID');
    if (ids.has(value))
      fail(`${path}.id`, `duplicate ID "${value}" (already used at ${ids.get(value)})`);
    ids.set(value, path);
    return value;
  };
  const entityIds = new Set<string>();
  const termIds = new Set<string>();
  const ruleIds = new Set<string>();
  const sourceIds = new Set<string>();
  const references: { sourceId: string; targetIds: readonly string[]; path: string }[] = [];
  const trigramIds = new Set<string>();

  (root.entities as unknown[]).forEach((raw, index) => {
    const path = `catalog.entities[${index}]`;
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw))
      fail(path, 'expected an object');
    const kind = (raw as Record<string, unknown>).kind;
    if (kind === 'trigram') {
      const item = record(raw, path, ['kind', 'id', 'name', 'han', 'aliases']);
      if (typeof item.id !== 'string' || !TRIGRAM_IDS.has(item.id as TrigramId))
        fail(`${path}.id`, 'expected a core trigram ID');
      const entityId = register(item.id, path);
      text(item.name, `${path}.name`);
      text(item.han, `${path}.han`);
      stringArray(item.aliases, `${path}.aliases`);
      entityIds.add(entityId);
      trigramIds.add(entityId);
    } else if (kind === 'hexagram') {
      const item = record(raw, path, [
        'kind',
        'id',
        'name',
        'han',
        'aliases',
        'kingWenNumber',
        'upperTrigramId',
        'lowerTrigramId',
      ]);
      if (typeof item.id !== 'string' || !HEXAGRAM_ID.test(item.id))
        fail(`${path}.id`, 'expected a core hexagram ID from hexagram-01 through hexagram-64');
      const entityId = register(item.id, path);
      text(item.name, `${path}.name`);
      text(item.han, `${path}.han`);
      stringArray(item.aliases, `${path}.aliases`);
      const kingWenNumber = Number(item.id.slice('hexagram-'.length));
      if (item.kingWenNumber !== kingWenNumber)
        fail(`${path}.kingWenNumber`, 'must match the number in the hexagram ID');
      if (!Number.isInteger(item.kingWenNumber))
        fail(`${path}.kingWenNumber`, 'expected an integer');
      for (const field of ['upperTrigramId', 'lowerTrigramId'] as const) {
        if (typeof item[field] !== 'string' || !TRIGRAM_IDS.has(item[field] as TrigramId))
          fail(`${path}.${field}`, 'expected a core trigram ID');
      }
      entityIds.add(entityId);
    } else {
      fail(`${path}.kind`, 'expected "trigram" or "hexagram"');
    }
  });

  (root.terms as unknown[]).forEach((raw, index) => {
    const path = `catalog.terms[${index}]`;
    const item = record(raw, path, ['id', 'name', 'aliases', 'definition']);
    id(item.id, `${path}.id`, 'term');
    termIds.add(register(item.id, path));
    text(item.name, `${path}.name`);
    stringArray(item.aliases, `${path}.aliases`);
    text(item.definition, `${path}.definition`);
  });
  (root.rules as unknown[]).forEach((raw, index) => {
    const path = `catalog.rules[${index}]`;
    const item = record(raw, path, ['id', 'ruleset', 'title', 'explanation']);
    id(item.id, `${path}.id`, 'rule');
    ruleIds.add(register(item.id, path));
    if (item.ruleset !== RULESET_ID)
      fail(`${path}.ruleset`, `unsupported ruleset "${String(item.ruleset)}"`);
    text(item.title, `${path}.title`);
    text(item.explanation, `${path}.explanation`);
  });
  (root.sources as unknown[]).forEach((raw, index) => {
    const path = `catalog.sources[${index}]`;
    const item = record(raw, path, [
      'id',
      'title',
      'author',
      'publication',
      'rights',
      'provenance',
    ]);
    id(item.id, `${path}.id`, 'source');
    sourceIds.add(register(item.id, path));
    for (const field of ['title', 'author', 'publication', 'rights', 'provenance'])
      text(item[field], `${path}.${field}`);
  });
  (root.references as unknown[]).forEach((raw, index) => {
    const path = `catalog.references[${index}]`;
    const item = record(
      raw,
      path,
      itemHasLocation(raw)
        ? ['id', 'sourceId', 'targetIds', 'location']
        : ['id', 'sourceId', 'targetIds'],
    );
    id(item.id, `${path}.id`, 'reference');
    register(item.id, path);
    if (typeof item.sourceId !== 'string') fail(`${path}.sourceId`, 'expected a source ID');
    if (item.location !== undefined) text(item.location, `${path}.location`);
    if (!Array.isArray(item.targetIds) || item.targetIds.length === 0)
      fail(`${path}.targetIds`, 'expected at least one target ID');
    stringArray(item.targetIds, `${path}.targetIds`);
    references.push({ sourceId: item.sourceId, targetIds: item.targetIds, path });
  });

  for (const raw of root.entities as readonly KnowledgeEntity[]) {
    if (raw.kind === 'hexagram') {
      for (const field of ['upperTrigramId', 'lowerTrigramId'] as const) {
        if (!trigramIds.has(raw[field]))
          fail(`catalog.entities.${raw.id}.${field}`, `missing trigram "${raw[field]}"`);
      }
    }
  }
  for (const reference of references) {
    if (!sourceIds.has(reference.sourceId))
      fail(`${reference.path}.sourceId`, `missing source "${reference.sourceId}"`);
    for (const targetId of reference.targetIds) {
      if (!entityIds.has(targetId) && !termIds.has(targetId) && !ruleIds.has(targetId)) {
        fail(`${reference.path}.targetIds`, `missing entity, term, or rule "${targetId}"`);
      }
    }
  }
}

function itemHasLocation(value: unknown): boolean {
  return (
    value !== null && typeof value === 'object' && !Array.isArray(value) && 'location' in value
  );
}
