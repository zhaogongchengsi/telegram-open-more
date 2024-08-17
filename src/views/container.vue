<script setup lang='ts'>
import Container from '~/components/container.vue'
import Header from '~/views/header.vue'
</script>

<template>
  <Container>
    <template #header>
      <Header />
    </template>
    <section class="size-full">
      <slot />
    </section>
  </Container>
</template>
