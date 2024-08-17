<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import TopbarContainer from '~/components/topbar/topbar-container.vue'
import TopbarItem from '~/components/topbar/topbar-item.vue'

const platform = ref(window.platform)
const headerStyle = computed(() => {
  return {
    paddingLeft: platform.value.isMacOS ? '100px' : '0',
    paddingRight: platform.value.isWindows ? '100px' : '20px',
  }
})
</script>

<template>
  <div class="drag h-full w-full flex items-center" :style="headerStyle">
    <TopbarContainer>
      <TopbarItem v-for="(_, i) of Array.from({ length: 3 })" :key="i">
        <template #prefix>
          {{ i }}
        </template>
        telegram
      </TopbarItem>
      <template #suffix>
        <button class="cursor-pointer rounded-full p-2">
          <Icon icon="hugeicons:plus-sign" />
        </button>
      </template>
    </TopbarContainer>
  </div>
</template>
