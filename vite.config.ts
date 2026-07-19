import { fileURLToPath, URL } from 'node:url'

import { defineConfig, lazyPlugins, loadEnv } from 'vite-plus'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
const env = loadEnv('development', process.cwd(), '')

export default defineConfig({
  server: {
    port: Number(env.VITE_PORT) || 5173,
  },
  staged: {
    '*': 'vp check --fix',
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  fmt: {
    ignorePatterns: ['auto-imports.d.ts', 'components.d.ts'],
    semi: false,
    singleQuote: true,
  },
  test: {
    server: {
      deps: {
        inline: ['antdv-next', /\/node_modules\/@v-c\/picker\//],
      },
    },
  },
  plugins: lazyPlugins(() => [
    vue(),
    tailwindcss(),
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        {
          'vue-i18n': ['useI18n'],
        },
      ],
      dts: 'auto-imports.d.ts',
    }),
    Components({
      resolvers: [AntdvNextResolver()],
    }),
    createSvgIconsPlugin({
      iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
      symbolId: 'icon-[dir]-[name]',
    }),
    vueDevTools(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      sourcemap: false,
    }),
  ]),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
