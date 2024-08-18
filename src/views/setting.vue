<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import { isWindows } from '~/composables/platform'
import { isDark, toggleDark } from '~/composables/dark'

const screen = useScreen()

watchEffect(() => {
  if (isDark.value) {
    dark()
  }
  else {
    light()
  }
})
</script>

<template>
  <div class="no-drag h-full flex items-center px-3">
    <button class="rounded-full p-1">
      <Icon icon="hugeicons:setting-07" />
    </button>
    <button class="rounded-full p-1" @click="toggleDark()">
      <Icon v-if="isDark" icon="hugeicons:moon-02" />
      <Icon v-else icon="hugeicons:sun-02" />
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
