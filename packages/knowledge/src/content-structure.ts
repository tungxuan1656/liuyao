import type { ContentRecord, ContentReference } from './content-schema.js';
import type { ContentTable } from './content-tables.js';

/** Tables use their authored ID, or a stable kind-based fallback. */
export function getContentTableId(table: ContentTable): string {
  return table.id ?? `table-${table.kind}`;
}
export function entriesOf(record: ContentRecord) {
  return [
    ...record.entries,
    ...(record.notes ?? []),
    ...(record.type === 'hexagram' ? record.lines.flatMap(line => line.entries) : []),
    ...(record.type === 'hexagram' ? (record.specialPassages ?? []) : []).flatMap(p => p.entries),
  ];
}
export function referencesOf(record: ContentRecord): readonly ContentReference[] {
  return [
    ...entriesOf(record).flatMap(entry => entry.references),
    ...(record.tables ?? []).flatMap(table => table.references),
    ...(record.figures ?? []).flatMap(figure => [
      ...figure.references,
      ...figure.orientation.references,
      ...figure.labels.flatMap(label => label.references),
      ...(figure.authorAlternatives ?? []).flatMap(view => view.references),
    ]),
  ];
}
export function anchorIdsOf(record: ContentRecord): readonly string[] {
  return [
    ...entriesOf(record).flatMap(entry => (entry.id ? [entry.id] : [])),
    ...(record.type === 'hexagram' ? record.lines.map(line => `line-${line.position}`) : []),
    ...(record.tables ?? []).map(getContentTableId),
    ...(record.figures ?? []).map(figure => figure.id),
  ];
}
