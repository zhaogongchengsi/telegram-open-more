<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import TopbarWrapper from './topbar-wrapper.vue'

withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const emit = defineEmits(['close', 'select'])

function onCloseClick() {
  emit('close')
}

function onSelected() {
  emit('select')
}
</script>

<template>
  <TopbarWrapper :active @select="onSelected">
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #default>
      <div class="w-max">
        <slot />
      </div>
    </template>
    <template #suffix>
      <button class="topbar-item-suffix_button" @click="onCloseClick">
        <Icon icon="hugeicons:cancel-01" />
      </button>
    </template>
  </TopbarWrapper>
</template>
