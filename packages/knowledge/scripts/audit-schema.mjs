import Ajv from 'ajv';
import addFormats from 'ajv-formats';

/** Create a strict draft-07 validator for one already-loaded schema document. */
export function createAuditSchemaValidator(schema, name = 'audit schema') {
  const ajv = new Ajv({ allErrors: true, strict: true });
  addFormats(ajv);
  let validate;
  try {
    validate = ajv.compile(schema);
  } catch (error) {
    throw new Error(`Invalid ${name}: ${error.message}`, { cause: error });
  }
  return value => {
    if (validate(value)) return { valid: true, errors: [] };
    return { valid: false, errors: [...(validate.errors ?? [])] };
  };
}
