<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import TopbarWrapper from './topbar-wrapper.vue'
</script>

<template>
  <TopbarWrapper>
    <template #default>
      <div>
        <slot />
      </div>
    </template>
    <template #suffix>
      <button class="topbar-item-suffix_button">
        <Icon icon="hugeicons:cancel-01" />
      </button>
    </template>
  </TopbarWrapper>
</template>
