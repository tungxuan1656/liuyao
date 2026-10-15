/* biome-ignore-all lint/style/useNamingConvention: Environment keys follow the shell interface. */
/* biome-ignore-all lint/suspicious/noTemplateCurlyInString: Fixtures use POSIX shell parameter expansion. */
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { delimiter, join } from 'node:path';

const root = mkdtempSync(join(tmpdir(), 'liuyao-pages-gate-'));
const sha = 'a'.repeat(40);
try {
  mkdirSync(join(root, 'scripts'));
  mkdirSync(join(root, 'bin'));
  copyFileSync(new URL('./build-pages.sh', import.meta.url), join(root, 'scripts/build-pages.sh'));
  writeFileSync(
    join(root, 'init.sh'),
    '#!/bin/sh\nprintf "%s" "$DEPLOY_ENV"\nexit "${CHECK_EXIT:-0}"\n',
    { mode: 0o755 },
  );
  writeFileSync(
    join(root, 'bin/git'),
    '#!/bin/sh\ncase "$1" in\nrev-parse) printf "%s\\n" "${HEAD_SHA:-$CF_PAGES_COMMIT_SHA}";;\nstatus) printf "%s" "${DIRTY:-}";;\nls-remote) printf "%s\\trefs/heads/main\\n" "$REMOTE_SHA";;\n*) exit 90;;\nesac\n',
    { mode: 0o755 },
  );
  const cases = [
    { name: 'preview', branch: 'feature', mode: 'preview', ok: true },
    { name: 'current main', branch: 'main', mode: 'production', ok: true },
    { name: 'mismatched HEAD SHA', branch: 'main', mode: '', env: { HEAD_SHA: 'c'.repeat(40) } },
    { name: 'failed verification', branch: 'main', mode: 'production', env: { CHECK_EXIT: '7' } },
    { name: 'dirty source', branch: 'main', mode: 'production', env: { DIRTY: ' M source.ts' } },
    { name: 'stale main', branch: 'main', mode: 'production', env: { REMOTE_SHA: 'b'.repeat(40) } },
    { name: 'missing Pages branch', branch: '', mode: '' },
    { name: 'missing Pages SHA', branch: 'main', mode: '', env: { CF_PAGES_COMMIT_SHA: '' } },
  ];
  for (const scenario of cases) {
    const result = spawnSync('bash', [join(root, 'scripts/build-pages.sh')], {
      encoding: 'utf8',
      env: {
        PATH: `${join(root, 'bin')}${delimiter}${process.env.PATH}`,
        CF_PAGES_BRANCH: scenario.branch,
        CF_PAGES_COMMIT_SHA: sha,
        REMOTE_SHA: sha,
        ...scenario.env,
      },
    });
    assert.equal(result.status === 0, scenario.ok === true, scenario.name);
    assert.equal(result.stdout, scenario.mode, scenario.name);
  }
  process.stdout.write(`Pages build gate: ${cases.length} scenarios passed\n`);
} finally {
  rmSync(root, { recursive: true, force: true });
}
