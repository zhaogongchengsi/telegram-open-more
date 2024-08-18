<script setup lang='ts'>
import { Icon } from '@iconify/vue'

const screen = useScreen()
</script>

<template>
  <div class="no-drag h-full flex items-center px-3">
    <button class="rounded-full p-1">
      <Icon icon="hugeicons:setting-07" />
    </button>
    <button class="rounded-full p-1" @click="screen.minimize">
      <Icon icon="hugeicons:solid-line-01" />
    </button>
    <button v-if="!screen.isFullScreen" class="rounded-full p-1" @click="screen.maximize">
      <Icon icon="hugeicons:maximize-screen" />
    </button>
    <button v-else class="rounded-full p-1" @click="screen.unmaximize">
      <Icon icon="hugeicons:minimize-screen" />
    </button>
    <button class="rounded-full p-1">
      <Icon icon="hugeicons:cancel-01" />
    </button>
  </div>
</template>
