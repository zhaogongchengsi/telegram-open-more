<script setup lang='ts'>
const props = withDefaults(defineProps<{
  height?: string
  width?: string
}>(), {
  height: '35px',
  width: '100%',
})

const activeLocation = ref<number>(0)
const activeWidth = ref<number>(0)

provide('activeLocation', {
  getValue() {
    return activeLocation.value
  },
  setValue(value: number) {
    activeLocation.value = value
  },
})

provide('activeWidth', {
  getValue() {
    return activeWidth.value
  },
  setValue(value: number) {
    activeWidth.value = value
  },
})

const topbarStyle = computed(() => {
  return {
    'height': props.height,
    'width': props.width,
    '--topbar-active-line-x': `${activeLocation.value}px`,
    '--topbar-active-line-width': `${activeWidth.value}px`,
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
      <div v-if="$slots.suffix" class="no-drag sticky right-0">
        <slot name="suffix" />
      </div>
    </div>
  </div>
</template>
