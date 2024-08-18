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
const activeLocation = inject<{ setValue: (value: number) => void, getValue: () => number }>('activeLocation')
const activeWidth = inject<{ setValue: (value: number) => void, getValue: () => number }>('activeWidth')

const el = ref<HTMLLIElement>(null)
const { width } = useElementBounding(el)

function onSelected() {
  activeLocation.setValue(Math.round(el.value.offsetLeft))
  activeWidth.setValue(width.value)
  emit('select')
}
</script>

<template>
  <li
    ref="el" :active class="topbar-wrapper-item cursor-pointer" :class="[{ 'topbar-wrapper-item-active': active }]"
    @click="onSelected"
  >
    <slot name="prefix" />
    <slot />
    <slot name="suffix" />
  </li>
</template>
