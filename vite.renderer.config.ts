/* eslint-disable import/no-unresolved */
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
// eslint-disable-next-line import/no-unresolved
import AutoImport from "unplugin-auto-import/vite";
import vue from "@vitejs/plugin-vue";
// import Components from 'unplugin-vue-components/vite';
// import { PrimeVueResolver } from '@primevue/auto-import-resolver';
// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<'renderer'>;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  const name = forgeConfigSelf.name ?? '';

  return {
    root,
    mode,
    base: './',
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [
      pluginExposeRenderer(name),
      AutoImport({
        imports: ["vue", "@vueuse/core"],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/composables", "src/utils"],
        vueTemplate: true,
      }),
      vue(),
      // Components({
      //   resolvers: [
      //     PrimeVueResolver()
      //   ]
      // })
    ],
    resolve: {
      preserveSymlinks: true,
    },
    clearScreen: false,
  } as UserConfig;
});
