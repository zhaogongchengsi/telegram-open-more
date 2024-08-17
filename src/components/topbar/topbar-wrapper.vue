<script setup lang='ts'>
withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const emit = defineEmits(['select'])
</script>

<template>
  <li :active class="topbar-wrapper-item cursor-pointer" :class="[{ 'topbar-wrapper-item-active': active }]" @click="emit('select')">
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </li>
</template>
