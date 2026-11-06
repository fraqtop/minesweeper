import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { APP_TITLE } from './src/config.js'

// Keep the <title> in index.html in sync with APP_TITLE (single source of truth
// in src/config.js) so the browser tab title is correct in both dev and build.
function injectAppTitle() {
  return {
    name: 'inject-app-title',
    transformIndexHtml(html) {
      return html.replace(/<title>.*<\/title>/, `<title>${APP_TITLE}</title>`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/minesweeper/',
  plugins: [vue(), vueDevTools(), injectAppTitle()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})