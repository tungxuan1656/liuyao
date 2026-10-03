/** Choose the unchanged V1 or strict V2 schema for an authored record. */
export function recordSchemaName(value, relativeFile) {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    !Number.isInteger(value.schemaVersion) ||
    ![1, 2].includes(value.schemaVersion)
  ) {
    throw new Error(
      `${relativeFile}: unsupported or missing integer schemaVersion (expected 1 or 2)`,
    );
  }
  return value.schemaVersion === 1 ? 'record' : 'record-v2';
}
