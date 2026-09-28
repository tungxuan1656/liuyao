import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appPackage = JSON.parse(readFileSync(path.resolve(__dirname, './package.json'), 'utf8')) as {
  version: string;
};
const corePackage = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../packages/liuyao-core/package.json'), 'utf8'),
) as { version: string };

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appPackage.version),
    __CORE_VERSION__: JSON.stringify(corePackage.version),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: null,
      includeAssets: ['favicon.svg'],
      manifest: {
        lang: 'vi',
        name: 'Lục Hào',
        short_name: 'Lục Hào',
        description: 'Ứng dụng Lục Hào lập quẻ và tra cứu quy tắc tính toán.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
      },
    }),
  ],
});
