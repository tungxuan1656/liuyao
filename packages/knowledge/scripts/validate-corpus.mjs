import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { validateCorpus, runtimeValidatorSource } from './content-validation.mjs';
import { projectCorpus } from './release-projection.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const repositoryRoot = path.resolve(root, '../..');
const data = path.join(root, 'data');
const flags = new Set(process.argv.slice(2));
for (const flag of flags)
  if (!['--check', '--check-books'].includes(flag)) throw new Error('Unknown flag: ' + flag);
function json(file) {
  return JSON.parse(readFileSync(file, 'utf8'));
}
function recordFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(item =>
    item.isDirectory()
      ? recordFiles(path.join(dir, item.name))
      : item.name.endsWith('.json')
        ? [path.join(dir, item.name)]
        : [],
  );
}
const directories = [
  'trigrams',
  'hexagrams',
  'terms',
  'casting',
  'liuyao',
  'foundations',
  'lessons',
];
const files = directories.flatMap(dir => recordFiles(path.join(data, dir))).sort();
const records = files.map(json);
const sources = json(path.join(data, 'sources.json')).sources;
const result = validateCorpus(records, sources, { repositoryRoot });
if (flags.has('--check-books'))
  for (const source of sources)
    for (const edition of source.editions) {
      if (!edition.sha256 || !edition.localInputPath) continue;
      const digest = createHash('sha256')
        .update(readFileSync(path.join(repositoryRoot, edition.localInputPath)))
        .digest('hex');
      if (digest !== edition.sha256)
        throw new Error(source.id + ': local PDF differs from selected edition');
    }
const { metadata, catalog, ready } = projectCorpus(
  records,
  sources,
  json(path.join(data, 'bibliography.json')),
);
const outputs = new Map([
  [path.join(root, '.generated/runtime/validate-record.ts'), runtimeValidatorSource()],
  [path.join(root, '.generated/runtime/index.json'), JSON.stringify(metadata) + '\n'],
  [path.join(root, '.generated/runtime/catalog.json'), JSON.stringify(catalog) + '\n'],
  ...ready.map(record => [
    path.join(root, 'dist/content', record.id + '.json'),
    JSON.stringify(record) + '\n',
  ]),
]);
for (const [file, text] of outputs) {
  if (flags.has('--check')) {
    if (!existsSync(file) || readFileSync(file, 'utf8') !== text)
      throw new Error('Stale or missing build output: ' + path.relative(root, file));
  } else {
    mkdirSync(path.dirname(file), { recursive: true });
    if (!existsSync(file) || readFileSync(file, 'utf8') !== text) writeFileSync(file, text);
  }
}
const contentDir = path.join(root, 'dist/content');
if (existsSync(contentDir))
  for (const name of readdirSync(contentDir)) {
    const file = path.join(contentDir, name);
    if (!outputs.has(file)) {
      if (flags.has('--check')) throw new Error('Unlisted content asset: ' + name);
      else rmSync(file);
    }
  }
console.log(
  'Knowledge: ' +
    result.records +
    ' records; ' +
    result.ready +
    ' ready; ' +
    sources.length +
    ' supplied books. Structural links and source pages valid.',
);
