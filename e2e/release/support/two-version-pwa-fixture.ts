import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer, type Server } from 'node:http';
import { cp, mkdtemp, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const webRoot = path.join(repositoryRoot, 'apps/web');

function run(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', code =>
      code === 0 ? resolve() : reject(new Error(`${command} exited with code ${code}`)),
    );
  });
}

export type TwoVersionFixture = {
  origin: string;
  selectVersion: (version: 1 | 2) => void;
  assetName: (version: 1 | 2) => string;
  stop: () => Promise<void>;
  cleanup: () => Promise<void>;
};

export async function createTwoVersionPwaFixture(): Promise<TwoVersionFixture> {
  const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'liuyao-pwa-'));
  const fixtureApp = path.join(temporaryRoot, 'apps/web');
  const fixturePackages = path.join(temporaryRoot, 'packages');
  const nodeModules = path.join(repositoryRoot, 'node_modules');
  let server: Server | undefined;
  let selectedRoot = '';

  try {
    await cp(webRoot, fixtureApp, {
      recursive: true,
      filter: source => !source.includes('/node_modules') && !source.includes('/dist'),
    });
    await cp(
      path.join(repositoryRoot, 'tsconfig.base.json'),
      path.join(temporaryRoot, 'tsconfig.base.json'),
    );
    await rm(path.join(fixtureApp, 'node_modules'), { recursive: true, force: true });
    await symlink(path.join(webRoot, 'node_modules'), path.join(fixtureApp, 'node_modules'), 'dir');

    await cp(
      path.join(repositoryRoot, 'packages/liuyao-core'),
      path.join(fixturePackages, 'liuyao-core'),
      {
        recursive: true,
        filter: source => !source.includes('/node_modules') && !source.includes('/dist'),
      },
    );
    await cp(
      path.join(repositoryRoot, 'packages/knowledge'),
      path.join(fixturePackages, 'knowledge'),
      {
        recursive: true,
        filter: source => !source.includes('/node_modules') && !source.includes('/dist'),
      },
    );
    await symlink(nodeModules, path.join(temporaryRoot, 'node_modules'), 'dir');

    const packagePath = path.join(fixtureApp, 'package.json');
    const packageJson = JSON.parse(await readFile(packagePath, 'utf8')) as { version: string };
    const builds: string[] = [];
    const entryAssets: string[] = [];
    for (const [index, version] of (['0.1.0', '0.1.1'] as const).entries()) {
      packageJson.version = version;
      await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
      await run('pnpm', ['exec', 'vite', 'build'], fixtureApp);
      const buildPath = path.join(temporaryRoot, `dist-${index + 1}`);
      await cp(path.join(fixtureApp, 'dist'), buildPath, { recursive: true });
      builds.push(buildPath);
      const indexHtml = await readFile(path.join(buildPath, 'index.html'), 'utf8');
      const asset = indexHtml.match(/src="([^"]+\.js)"/)?.[1];
      if (!asset) throw new Error(`Build ${version} does not reference a JavaScript entry asset.`);
      entryAssets.push(asset);
    }

    selectedRoot = builds[0]!;
    server = createServer(async (request, response) => {
      const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
      const requestedPath = path.resolve(selectedRoot, `.${decodeURIComponent(pathname)}`);
      const safeRoot = `${path.resolve(selectedRoot)}${path.sep}`;
      let filePath = requestedPath.startsWith(safeRoot) ? requestedPath : '';
      try {
        if (!filePath || !(await stat(filePath)).isFile())
          filePath = path.join(selectedRoot, 'index.html');
      } catch {
        filePath = path.join(selectedRoot, 'index.html');
      }
      try {
        const body = await readFile(filePath);
        response.setHeader(
          'Content-Type',
          filePath.endsWith('.js')
            ? 'text/javascript'
            : filePath.endsWith('.json')
              ? 'application/json'
              : filePath.endsWith('.webmanifest')
                ? 'application/manifest+json'
                : filePath.endsWith('.svg')
                  ? 'image/svg+xml'
                  : filePath.endsWith('.css')
                    ? 'text/css'
                    : 'text/html',
        );
        if (path.basename(filePath) === 'sw.js' || path.basename(filePath) === 'index.html') {
          response.setHeader('Cache-Control', 'no-cache');
        }
        response.end(body);
      } catch {
        response.writeHead(404).end();
      }
    });
    server.listen(0, '127.0.0.1');
    await once(server, 'listening');
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Could not bind fixture server.');

    const stop = async () => {
      if (!server?.listening) return;
      server.close();
      await once(server, 'close');
    };
    return {
      origin: `http://127.0.0.1:${address.port}`,
      selectVersion: version => {
        selectedRoot = builds[version - 1]!;
      },
      assetName: version => entryAssets[version - 1]!,
      stop,
      cleanup: async () => {
        await stop();
        await rm(temporaryRoot, { recursive: true, force: true });
      },
    };
  } catch (error) {
    server?.close();
    await rm(temporaryRoot, { recursive: true, force: true });
    throw error;
  }
}
