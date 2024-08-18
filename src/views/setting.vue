<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { isMac, isWindows } from '~/composables/platform'

const screen = useScreen()
</script>

<template>
  <div class="no-drag h-full flex items-center px-3">
    <button class="rounded-full p-1">
      <Icon icon="hugeicons:setting-07" />
    </button>
    <button v-if="isWindows" class="rounded-full p-1" @click="screen.minimize">
      <Icon icon="hugeicons:solid-line-01" />
    </button>
    <button v-if="!screen.isFullScreen && isWindows" class="rounded-full p-1" @click="screen.maximize">
      <Icon icon="hugeicons:maximize-screen" />
    </button>
    <button v-else-if="isWindows" class="rounded-full p-1" @click="screen.unmaximize">
      <Icon icon="hugeicons:minimize-screen" />
    </button>
    <button v-if="isWindows" class="rounded-full p-1">
      <Icon icon="hugeicons:cancel-01" />
    </button>
  </div>
</template>
