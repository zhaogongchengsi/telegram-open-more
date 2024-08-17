import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { alias, pluginExposeRenderer } from './vite.base.config'

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
      preserveSymlinks: true,
      alias,
    },
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      pluginExposeRenderer(name),
      AutoImport({
        imports: ['vue', '@vueuse/core', 'pinia'],
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
