import { defineConfig, devices } from '@playwright/test';
import { randomUUID } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const port = 4179;
const outputDir = join(tmpdir(), 'liuyao-release-playwright-results', randomUUID());

export default defineConfig({
  testDir: './e2e/release',
  outputDir,
  fullyParallel: true,
  reporter: 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: `http://127.0.0.1:${port}`,
    serviceWorkers: 'allow',
  },
  webServer: {
    command: `pnpm --dir apps/web build && pnpm --dir apps/web preview --host 127.0.0.1 --port ${port} --strictPort`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
