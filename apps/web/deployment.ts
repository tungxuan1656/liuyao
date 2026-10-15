import type { Plugin } from 'vite';

const origin = 'https://kinhdichluchao.pages.dev';

export function deployment(): Plugin {
  const production = process.env.DEPLOY_ENV === 'production';
  return {
    name: 'pages-delivery',
    apply: 'build',
    transformIndexHtml(html) {
      if (!production) return html;
      return {
        html,
        tags: [
          { tag: 'link', attrs: { rel: 'canonical', href: `${origin}/` }, injectTo: 'head' },
          { tag: 'meta', attrs: { property: 'og:url', content: `${origin}/` }, injectTo: 'head' },
        ],
      };
    },
    generateBundle() {
      // Crawl remains blocked until deployed launch checks and public-page policy are approved.
      this.emitFile({
        type: 'asset',
        fileName: '_headers',
        source: `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: base-uri 'self'; object-src 'none'; frame-ancestors 'none'
  X-Robots-Tag: noindex, nofollow

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/
  Cache-Control: no-cache

/index.html
  Cache-Control: no-cache

/sw.js
  Cache-Control: no-cache

/manifest.webmanifest
  Cache-Control: no-cache

/robots.txt
  Cache-Control: no-cache
`,
      });
    },
  };
}
