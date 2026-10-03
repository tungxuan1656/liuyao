/** Versioned immutable digest for the generated public knowledge projection. */
export type BookSnapshotIdentity = string & { readonly __bookSnapshotIdentity: unique symbol };

export function parseBookSnapshotIdentity(value: string): BookSnapshotIdentity {
  if (!/^liuyao-knowledge-snapshot-v1:sha256:[a-f0-9]{64}$/.test(value))
    throw new Error('Invalid generated book snapshot identity');
  return value as BookSnapshotIdentity;
}
