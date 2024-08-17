<script setup lang='ts'>
import Container from '~/components/container.vue'

import TopbarContainer from '~/components/topbar/topbar-container.vue'
import TopbarItem from '~/components/topbar/topbar-item.vue'
</script>

<template>
  <Container>
    <template #header>
      <div class="w-full">
        <TopbarContainer>
          <TopbarItem v-for="(_, i) of Array.from({ length: 4 })" :key="i">
            {{ i }}index
          </TopbarItem>
        </TopbarContainer>
      </div>
    </template>
    <section class="size-full bg-red">
      <slot />
    </section>
  </Container>
</template>
