<script setup lang='ts'>
import { Webview } from './util'

const props = defineProps<{
  partition: string
}>()

const webview = ref<HTMLElement | null>(null)
const webviewInstance = ref<Webview | null>(null)
const { width, height, x, y } = useElementBounding(webview)

const size = computed(() => {
  return {
    width: width.value,
    height: height.value,
    x: x.value,
    y: y.value,
  }
})

onMounted(() => {
  if (!webview.value)
    return
  const view = new Webview(props.partition)
  const id = props.partition
  webviewInstance.value = view
  webviewInstance.value = new Webview(props.partition)
  webviewInstance.value.createWindow(id, size.value)
  webviewInstance.value.resizeWindow(props.partition, size.value)
})

function resize() {
  if (!webview.value)
    return
  webviewInstance.value.resizeWindow(props.partition, size.value)
}

watch([width, height, x, y], () => {
  if (!webview.value)
    return
  resize()
})

defineExpose({
  partition: props.partition,
  webview: webviewInstance,
})
</script>

<template>
  <div ref="webview" :data-id="partition" class="webview" />
</template>

<style>
.webview {
  width: 100%;
  height: 100%;
}
</style>
