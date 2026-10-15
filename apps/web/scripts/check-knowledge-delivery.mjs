import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const dist = new URL('../dist/', import.meta.url);
const metadataFile = new URL('../../../packages/knowledge/.generated/runtime/index.json', dist);
const read = url => readFileSync(url, 'utf8');
const measure = url => {
  const bytes = readFileSync(url);
  return { raw: bytes.length, gzip: gzipSync(bytes).length };
};
const html = read(new URL('index.html', dist));
const script = html.match(/<script\b[^>]*src="([^"]+)"/)[1];
const stylesheet = html.match(/<link\b[^>]*href="([^"]+\.css)"/)[1];
const local = asset => new URL(asset.replace(/^\//, ''), dist);
const startup = read(local(script));
const metadata = JSON.parse(read(metadataFile));
const precached = new Set(
  [...read(new URL('sw.js', dist)).matchAll(/\{url:"([^"]+)",revision:(?:null|"[^"]*")\}/g)].map(
    match => match[1],
  ),
);
assert(precached.size > metadata.length, 'Missing production precache manifest');
const applicationAssets = new Set([
  'index.html',
  script.replace(/^\//, ''),
  stylesheet.replace(/^\//, ''),
  ...readdirSync(new URL('assets/', dist), { recursive: true })
    .filter(asset => /\.(js|css)$/.test(asset))
    .map(asset => `assets/${asset}`),
]);
for (const asset of applicationAssets)
  assert(precached.has(asset), `Application asset not precached: ${asset}`);
let paragraphs = 0;
function inspect(value, id) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    // Summaries are capped at 260 characters; longer authored prose belongs in record assets.
    if (key === 'text' && typeof child === 'string' && child.length > 300) {
      assert(
        !startup.includes(child) && !startup.includes(JSON.stringify(child).slice(1, -1)),
        `Detailed prose in startup: ${id}`,
      );
      paragraphs++;
    } else if (typeof child === 'object') inspect(child, id);
  }
}
const records = metadata.map(item => {
  assert(precached.has(item.asset), `Not precached: ${item.id}`);
  const record = JSON.parse(read(local(item.asset)));
  assert.equal(record.id, item.id);
  assert.equal(record.status, 'ready');
  inspect(record, item.id);
  return { asset: item.asset, ...measure(local(item.asset)) };
});
assert(paragraphs > 0, 'No detailed prose inspected');
const cssUrl = local(stylesheet);
const fontUrls = [...read(cssUrl).matchAll(/url\(([^)]+\.woff2)\)/g)];
assert(fontUrls.length > 0, 'No local fonts found');
for (const [, reference] of fontUrls) {
  const value = reference.replaceAll(/["']/g, '');
  const font = value.startsWith('/') ? local(value) : new URL(value, cssUrl);
  assert(font.href.startsWith(dist.href), `External font: ${reference}`);
  const asset = font.href.slice(dist.href.length);
  assert(precached.has(asset), `Font not precached: ${asset}`);
  readFileSync(font);
}
const totals = assets =>
  assets.reduce((sum, asset) => ({ raw: sum.raw + asset.raw, gzip: sum.gzip + asset.gzip }), {
    raw: 0,
    gzip: 0,
  });
process.stdout.write(
  JSON.stringify(
    {
      startup: { asset: script, ...measure(local(script)) },
      stylesheet: { asset: stylesheet, ...measure(cssUrl) },
      metadata: measure(metadataFile),
      readyRecords: records.length,
      detailedParagraphsAbsentFromStartup: paragraphs,
      largestRecord: records.toSorted((a, b) => b.raw - a.raw)[0],
      knowledge: totals(records),
      precache: {
        uniqueAssets: precached.size,
        ...totals([...precached].map(a => measure(local(a)))),
      },
    },
    null,
    2,
  ).concat('\n'),
);
