<script setup lang='ts'>
import webview from './components/webview/index.vue'
import { createSessionId } from './utils/random'
import Container from './views/container.vue'

// const id = createSessionId()
// console.log(id)
</script>

<template>
  <Container>
    <webview partition="asodhasdhiaucfiac" />
  </Container>
</template>
