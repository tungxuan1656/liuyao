import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';
import { expect, it } from 'vitest';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);

it('reproduces generated output and rejects stale or unlisted authoring files', () => {
  const temporary = mkdtempSync(path.join(tmpdir(), 'liuyao-corpus-test-'));
  try {
    for (const directory of ['scripts', 'schema', 'data'])
      cpSync(path.join(root, directory), path.join(temporary, directory), { recursive: true });
    mkdirSync(path.join(temporary, 'src'));
    mkdirSync(path.join(temporary, 'node_modules'));
    for (const name of ['ajv', 'ajv-formats', 'prettier'])
      symlinkSync(
        path.dirname(require.resolve(`${name}/package.json`)),
        path.join(temporary, 'node_modules', name),
      );
    const run = (...args) =>
      spawnSync(process.execPath, [path.join(temporary, 'scripts/validate-corpus.mjs'), ...args], {
        encoding: 'utf8',
      });
    const generated = path.join(temporary, 'src/book-data.generated.ts');
    const first = run();
    expect(first.status, first.stderr).toBe(0);
    const original = readFileSync(generated, 'utf8');
    expect(run('--check').status).toBe(0);
    expect(run().status).toBe(0);
    expect(readFileSync(generated, 'utf8')).toBe(original);
    writeFileSync(generated, '// stale\n');
    const stale = run('--check');
    expect(stale.status).not.toBe(0);
    expect(stale.stderr).toContain('Stale generated corpus output');
    expect(run().status).toBe(0);
    writeFileSync(path.join(temporary, 'data/terms/unlisted.json'), '{}');
    const unlisted = run();
    expect(unlisted.status).not.toBe(0);
    expect(unlisted.stderr).toContain('Unlisted authored JSON: terms/unlisted.json');
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
