<script setup lang='ts'>
withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)
</script>

<template>
  <li :active class="topbar-wrapper-item cursor-pointer">
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </li>
</template>
