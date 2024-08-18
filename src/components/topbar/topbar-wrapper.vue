<script setup lang='ts'>
const props = withDefaults(
  defineProps<{
    active?: boolean
  }>(),
  {
    active: false,
  },
)

const emit = defineEmits(['select'])
const activeLocation = inject<{ setValue: (value: number) => void, getValue: () => number }>('activeLocation')
const activeWidth = inject<{ setValue: (value: number) => void, getValue: () => number }>('activeWidth')

const el = ref<HTMLLIElement>(null)
const { width } = useElementBounding(el)

function updateLineStyle() {
  if (!el.value)
    return
  activeLocation.setValue(Math.round(el.value.offsetLeft))
  activeWidth.setValue(width.value)
}

watch(() => props.active, (isActive) => {
  if (isActive) {
    updateLineStyle()
  }
})

function onSelected() {
  updateLineStyle()
  emit('select')
}
</script>

<template>
  <li
    ref="el" :active class="topbar-wrapper-item shrink-0 cursor-pointer"
    :class="[{ 'topbar-wrapper-item-active': active }]" @click="onSelected"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </li>
</template>
