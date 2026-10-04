import { createHash } from 'node:crypto';
import { lstat, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateAuditLedgers } from './audit-decisions.mjs';
import { createAuditSchemaValidator } from './audit-schema.mjs';
import { canonicalize, compareCanonicalStrings } from './snapshot-identity.mjs';
import { validateAuditRegistry } from './audit-registry.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const REGISTRY_PATH = 'docs/reviews/knowledge/expected-units.json';
const LEDGER_ROOT = 'docs/reviews/knowledge/ledgers';
const CERTIFICATION_PATH = 'docs/reviews/knowledge/certification.json';
const INVENTORY_PATH = 'docs/reviews/knowledge/source-inventory.md';

const hash = value =>
  createHash('sha256')
    .update(JSON.stringify(canonicalize(value)))
    .digest('hex');

async function readJson(file) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`${path.relative(process.cwd(), file)}: ${error.message}`, { cause: error });
  }
}

async function requireRegularFile(file, label) {
  let metadata;
  try {
    metadata = await lstat(file);
  } catch (error) {
    throw new Error(`${label} is required: ${file}`, { cause: error });
  }
  if (!metadata.isFile() || metadata.isSymbolicLink())
    throw new Error(`${label} must be a regular, non-symlink file: ${file}`);
}

async function requireLedgerDirectory(directory) {
  let metadata;
  try {
    metadata = await lstat(directory);
  } catch (error) {
    throw new Error(`Ledger root is required: ${directory}`, { cause: error });
  }
  if (!metadata.isDirectory() || metadata.isSymbolicLink())
    throw new Error(`Ledger root must be a regular, non-symlink directory: ${directory}`);
}

/** Load and structurally validate the real, repository-scoped audit artifacts. */
export async function loadAuditReview({
  repositoryRoot,
  context,
  schemaRoot = path.join(packageRoot, 'schema'),
}) {
  const root = path.resolve(repositoryRoot);
  const registryPath = path.join(root, REGISTRY_PATH);
  const inventoryPath = path.join(root, INVENTORY_PATH);
  const ledgerRoot = path.join(root, LEDGER_ROOT);
  const ledgerMarker = path.join(ledgerRoot, 'README.md');
  await requireLedgerDirectory(ledgerRoot);
  await requireRegularFile(registryPath, 'Expected-unit registry');
  await requireRegularFile(inventoryPath, 'Canonical source inventory');
  await requireRegularFile(ledgerMarker, 'Ledger-root marker');

  const [registry, inventoryBytes, featureIndex] = await Promise.all([
    readJson(registryPath),
    readFile(inventoryPath),
    readJson(path.join(root, 'feature_index.json')),
  ]);
  const schema = await readJson(path.join(schemaRoot, 'expected-units-v1.schema.json'));
  const schemaValidator = createAuditSchemaValidator(schema, 'expected-units-v1 schema');
  const schemaResult = schemaValidator(registry);
  if (!schemaResult.valid)
    throw new Error(
      `Expected-unit registry schema invalid: ${schemaResult.errors
        .map(error => `${error.instancePath || '/'} ${error.message}`)
        .join('; ')}`,
    );
  const ledgerSchema = await readJson(path.join(schemaRoot, 'audit-ledger-v1.schema.json'));
  const validateLedger = createAuditSchemaValidator(ledgerSchema, 'audit-ledger-v1 schema');

  const editionCatalog = new Map(
    context.sources.flatMap(source =>
      source.editions.map(edition => [edition.id, { ...edition, sourceId: source.id }]),
    ),
  );
  const sourceIds = new Set(context.sources.map(source => source.id));
  const citationIds = new Map(context.citations.map(citation => [citation.id, citation]));
  const featureIds = new Set((featureIndex.features ?? []).map(feature => feature.id));
  const authoredRecordIds = new Set(context.records.map(record => record.id));
  const registryResult = validateAuditRegistry(registry, {
    inventoryBytes,
    editionCatalog,
    sourceIds,
    citationIds,
    featureIds,
    authoredRecordIds,
  });
  if (!registryResult.valid)
    throw new Error(`Expected-unit registry invalid: ${registryResult.errors.join('; ')}`);

  let ledgerNames;
  try {
    ledgerNames = await readdir(ledgerRoot, { withFileTypes: true });
  } catch (error) {
    throw new Error(`Ledger root cannot be read: ${ledgerRoot}`, { cause: error });
  }
  const ledgerFiles = ledgerNames
    .filter(entry => entry.name.endsWith('.json'))
    .sort((left, right) => compareCanonicalStrings(left.name, right.name));
  const ledgers = [];
  const ledgerFileIdentities = [];
  for (const entry of ledgerFiles) {
    if (!entry.isFile() || entry.isSymbolicLink())
      throw new Error(`Ledger JSON must be a regular, non-symlink file: ${entry.name}`);
    const file = path.join(ledgerRoot, entry.name);
    const bytes = await readFile(file);
    let ledger;
    try {
      ledger = JSON.parse(bytes.toString('utf8'));
    } catch (error) {
      throw new Error(`${path.relative(root, file)}: ${error.message}`, { cause: error });
    }
    const shape = validateLedger(ledger);
    if (!shape.valid)
      throw new Error(
        `Ledger ${entry.name} schema invalid: ${shape.errors
          .map(error => `${error.instancePath || '/'} ${error.message}`)
          .join('; ')}`,
      );
    ledgers.push(ledger);
    ledgerFileIdentities.push({
      path: path.posix.join(LEDGER_ROOT, entry.name),
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
  }
  ledgerFileIdentities.sort((left, right) => compareCanonicalStrings(left.path, right.path));

  const ledgerState = await validateAuditLedgers(ledgers, registry, {
    ...context,
    repositoryRoot: root,
  });
  if (!ledgerState.valid)
    throw new Error(`Audit ledgers invalid: ${ledgerState.errors.join('; ')}`);

  let certification = null;
  const certificationPath = path.join(root, CERTIFICATION_PATH);
  try {
    await requireRegularFile(certificationPath, 'Certification artifact');
    certification = await readJson(certificationPath);
  } catch (error) {
    if (error.cause?.code !== 'ENOENT' || error.message.includes('must be a regular')) throw error;
  }

  if (certification) {
    const certificationSchema = await readJson(
      path.join(schemaRoot, 'audit-certification-v1.schema.json'),
    );
    const certificationResult = createAuditSchemaValidator(
      certificationSchema,
      'audit-certification-v1 schema',
    )(certification);
    if (!certificationResult.valid)
      throw new Error(
        `Certification schema invalid: ${certificationResult.errors
          .map(error => `${error.instancePath || '/'} ${error.message}`)
          .join('; ')}`,
      );
  }

  return {
    registry,
    registrySha256: hash(registry),
    ledgers,
    ledgerState,
    certification,
    reviewEvidenceIdentity: hash(ledgerFileIdentities),
    ledgerFileIdentities,
  };
}
