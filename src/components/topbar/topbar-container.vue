<script setup lang='ts'>
const props = withDefaults(defineProps<{
  height?: string
}>(), {
  height: '35px',
})

const topbarStyle = computed(() => {
  return {
    height: props.height,
  }
})
</script>

<template>
  <div class="topbar-contianer">
    <div v-if="$slots.prefix">
      <slot name="prefix" />
    </div>
    <ul class="topbar-contianer_inner_box" :style="topbarStyle">
      <slot />
    </ul>
    <div v-if="$slots.suffix">
      <slot name="suffix" />
    </div>
  </div>
</template>
