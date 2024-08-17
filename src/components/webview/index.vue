<script setup lang='ts'>
import { Webview } from './webview'

const props = defineProps<{
  partition: string
}>()

const webview = ref<HTMLElement | null>(null)
const webviewInstance = ref<Webview | null>(null)
const { width, height, x, y } = useElementBounding(webview)

const location = computed(() => {
  return {
    width: width.value,
    height: height.value,
    x: x.value,
    y: y.value,
  }
})

function createWin(id: string = props.partition) {
  const view = new Webview(id)
  webviewInstance.value = view
  webviewInstance.value = new Webview(id)
  webviewInstance.value.createWindow(id, location.value)
  webviewInstance.value.showWindow(id, location.value)
}

watch(() => props.partition, (newId, oldId) => {
  if (!webview.value)
    return

  if (!webviewInstance.value)
    createWin(newId)
  else
    webviewInstance.value.hideWindow(oldId)
  createWin(newId)
})

onMounted(() => {
  if (!webview.value)
    return
  createWin()
})

onUnmounted(() => {
  if (!webviewInstance.value)
    return
  webviewInstance.value.hideWindow(props.partition)
})

function resize() {
  if (!webview.value)
    return
  webviewInstance.value.resizeWindow(props.partition, location.value)
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
