<script setup lang='ts'>
import Container from '~/components/container.vue'

import TopbarContainer from '~/components/topbar/topbar-container.vue'
import TopbarItem from '~/components/topbar/topbar-item.vue'
</script>

<template>
  <Container>
    <template #header>
      <TopbarContainer>
        <TopbarItem v-for="(_, i) of Array.from({ length: 4 })" :key="i">
          {{ i }}index
        </TopbarItem>
      </TopbarContainer>
    </template>
    <div>
      <h1>hello world</h1>
      <Button>hello</Button>
    </div>
  </Container>
</template>
