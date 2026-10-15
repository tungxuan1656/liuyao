import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
const read = path => readFileSync(new URL(path, dist), 'utf8');
const html = read('index.html');
const production = process.env.DEPLOY_ENV === 'production';
const origin = 'https://kinhdichluchao.pages.dev/';
assert.equal(html.includes(`<link rel="canonical" href="${origin}">`), production);
assert.equal(html.includes(`<meta property="og:url" content="${origin}">`), production);
assert(
  html.includes('content="noindex, nofollow"'),
  'Crawl must stay blocked before launch approval',
);
assert.equal(read('robots.txt'), 'User-agent: *\nDisallow: /\n');
assert(!existsSync(new URL('404.html', dist)), 'Pages SPA fallback requires no top-level 404.html');
const manifest = JSON.parse(read('manifest.webmanifest'));
assert.equal(manifest.start_url, '/');
for (const icon of manifest.icons) assert(!/^(https?:)?\/\//.test(icon.src));
const headers = read('_headers');
for (const value of [
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  'Referrer-Policy: no-referrer',
  "Content-Security-Policy: base-uri 'self'; object-src 'none'; frame-ancestors 'none'",
  'X-Robots-Tag: noindex, nofollow',
  '/assets/*\n  Cache-Control: public, max-age=31536000, immutable',
  '/\n  Cache-Control: no-cache',
  '/index.html\n  Cache-Control: no-cache',
  '/sw.js\n  Cache-Control: no-cache',
  '/manifest.webmanifest\n  Cache-Control: no-cache',
])
  assert(headers.includes(value), `Missing deployment directive: ${value}`);
const script = html.match(/<script\b[^>]*src="([^"]+)"/)[1];
const revision = process.env.GITHUB_SHA ?? process.env.CF_PAGES_COMMIT_SHA ?? 'local';
assert(
  read(script.replace(/^\//, '')).includes(revision),
  'Build revision missing from application',
);
process.stdout.write(
  `Deployment artifact verified (${production ? 'production' : 'preview'}, ${revision})\n`,
);
