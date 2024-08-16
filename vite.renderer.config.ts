import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { pluginExposeRenderer } from './vite.base.config'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ''

  return {
    root,
    mode,
    base: './',
    resolve: {
      alias: {
        '~/': `${resolve(_dirname, 'src')}/`,
      },
      preserveSymlinks: true,
    },
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      pluginExposeRenderer(name),
      AutoImport({
        imports: ['vue', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/utils'],
        vueTemplate: true,
      }),
      vue(),
      UnoCSS(),
    ],
    clearScreen: false,
  } as UserConfig
})
