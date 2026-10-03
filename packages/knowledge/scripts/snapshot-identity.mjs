import { createHash } from 'node:crypto';

const SET_ARRAY_FIELDS = new Set([
  'releaseIds',
  'citationIds',
  'dependsOnClaimIds',
  'evidenceCitationIds',
  'evidenceClaimIds',
  'prerequisiteLessonIds',
  'supportingClaimIds',
]);
const RECORD_SCOPED_SETS = new Set(['structure']);
const SUPPORT_SCOPE_SETS = new Set([
  'tables',
  'figures',
  'labels',
  'orientation',
  'authorAlternatives',
  'alternatives',
  'structure',
  'blocks',
]);
const SET_COLLECTION_PATHS = new Set(['records', 'citations']);

/** Compare strings by UTF-16 code units without locale-dependent collation. */
export function compareCanonicalStrings(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

/** Return a stable identity for the exact sanitized release projection. */
export function createSnapshotIdentity(projection) {
  const canonical = canonicalize(projection);
  const hash = createHash('sha256').update(JSON.stringify(canonical)).digest('hex');
  return `liuyao-knowledge-snapshot-v1:sha256:${hash}`;
}

export function canonicalize(value, field = '', parent = '', path = '') {
  if (Array.isArray(value)) {
    const items = value.map(item => canonicalize(item, '', field, `${path}[]`));
    const declaredSet =
      SET_ARRAY_FIELDS.has(field) ||
      SET_COLLECTION_PATHS.has(path) ||
      (field === 'claimIds' && RECORD_SCOPED_SETS.has(parent)) ||
      (field === 'claimIds' && SUPPORT_SCOPE_SETS.has(parent));
    const sorted = declaredSet
      ? items.sort((left, right) =>
          compareCanonicalStrings(JSON.stringify(left), JSON.stringify(right)),
        )
      : items;
    return sorted;
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value)
      .sort(([left], [right]) => compareCanonicalStrings(left, right))
      .map(([key, item]) => [
        key,
        canonicalize(item, key, field || parent, path ? `${path}.${key}` : key),
      ]);
    return Object.fromEntries(entries);
  }
  return value;
}
