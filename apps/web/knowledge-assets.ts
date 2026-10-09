import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
const directory = fileURLToPath(new URL('../../packages/knowledge/dist/content/', import.meta.url));
/** Serve the same per-record JSON in development and production. */
export function knowledgeAssets(): Plugin {
  return {
    name: 'knowledge-assets',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = new URL(request.url ?? '/', 'http://localhost').pathname;
        const match = pathname.match(/^\/knowledge\/([a-z0-9-]+\.json)$/);
        if (!match) return next();
        try {
          const content = readFileSync(directory + '/' + match[1]);
          response.setHeader('Content-Type', 'application/json; charset=utf-8');
          response.end(content);
        } catch {
          response.statusCode = 404;
          response.end('Knowledge not found');
        }
      });
    },
    generateBundle() {
      for (const name of readdirSync(directory)) {
        if (name.endsWith('.json'))
          this.emitFile({
            type: 'asset',
            fileName: 'knowledge/' + name,
            source: readFileSync(directory + '/' + name),
          });
      }
    },
  };
}
