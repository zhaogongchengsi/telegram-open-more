<script setup lang='ts'>
const props = withDefaults(defineProps<{
  height?: string
  width?: string
}>(), {
  height: '35px',
  width: '100%',
})
const topbarStyle = computed(() => {
  return {
    height: props.height,
    width: props.width,
  }
})
</script>

<template>
  <div class="size-full overflow-x-auto">
    <div class="topbar-contianer h-full select-none">
      <div v-if="$slots.prefix" class="sticky left-0">
        <slot name="prefix" />
      </div>
      <ul class="topbar-contianer_inner_box no-drag" :style="topbarStyle">
        <slot />
      </ul>
      <div v-if="$slots.suffix" class="sticky right-0 no-drag">
        <slot name="suffix" />
      </div>
    </div>
  </div>
</template>
