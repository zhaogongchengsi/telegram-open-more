<script setup lang='ts'>
import webview from './components/webview/index.vue'
import Container from './views/container.vue'

const tabbar = useTabbar()
const telegram = useTelegram()

const partition = computed(() => {
  const active = tabbar.active as number | null
  if (active === null)
    return null
  const session = telegram.getSessionById(active)
  return session ? session.partition : null
})
</script>

<template>
  <Container>
    <webview v-if="partition" :partition="partition" />
  </Container>
</template>
