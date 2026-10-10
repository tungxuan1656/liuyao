import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { knowledgeAssets } from './knowledge-assets';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPackage = JSON.parse(readFileSync(path.resolve(__dirname, './package.json'), 'utf8')) as {
  version: string;
};
const corePackage = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../packages/liuyao-core/package.json'), 'utf8'),
) as { version: string };

export default defineConfig({
  define: {
    // biome-ignore lint/style/useNamingConvention: Vite replaces these globals by exact name (see vite-env.d.ts).
    __APP_VERSION__: JSON.stringify(appPackage.version),
    // biome-ignore lint/style/useNamingConvention: Vite replaces these globals by exact name (see vite-env.d.ts).
    __CORE_VERSION__: JSON.stringify(corePackage.version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    knowledgeAssets(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        lang: 'vi',
        name: 'Lục Hào',
        // biome-ignore lint/style/useNamingConvention: Web App Manifest keys are fixed by the spec.
        short_name: 'Lục Hào',
        description: 'Lập quẻ, tra cứu và lưu kết quả Lục Hào ngay trên thiết bị của bạn.',
        // biome-ignore lint/style/useNamingConvention: Web App Manifest keys are fixed by the spec.
        theme_color: '#ffffff',
        // biome-ignore lint/style/useNamingConvention: Web App Manifest keys are fixed by the spec.
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 2 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2,json}'],
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
      },
    }),
  ],
});
