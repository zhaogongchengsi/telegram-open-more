<script setup lang='ts'>

</script>

<template>
  <main class="size-full">
    <section v-if="$slots.header" class="tom-app-header">
      <slot name="header" />
    </section>
    <section class="tom-app-box">
      <slot />
    </section>
  </main>
</template>

<style>
.tom-app-header {
  height: var(--app-header-height, 45px);
}

.tom-app-box {
  height: var(--app-box-height);
}
</style>
