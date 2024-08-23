import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  defineConfig,
} from 'electron-vite'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

export default defineConfig(() => {
  const src = resolve(_dirname, 'src')

  const alias = {
    '~/': `${resolve(_dirname, 'src')}/`,
  }

  return {
    main: {
      build: {
        rollupOptions: {
          input: {
            index: join(src, 'main.ts'),
          },
        },
      },

      resolve: {
        alias,
      },
    },
    preload: {
      build: {
        rollupOptions: {
          input: [
            join(src, 'preload.ts'),
            join(src, 'telegram.ts'),
          ],
        },
      },
      resolve: {
        alias,
      },
    },
    renderer: {
      root: '.',
      plugins: [
        AutoImport({
          imports: ['vue', '@vueuse/core', 'pinia'],
          dts: 'src/auto-imports.d.ts',
          dirs: ['src/composables', 'src/utils'],
          vueTemplate: true,
        }),
        vue(),
        UnoCSS(),
      ],
      resolve: {
        alias,
      },
      build: {
        rollupOptions: {
          input: {
            index: resolve(_dirname, 'index.html'),
          },
        },
      },
    },
  }
})
