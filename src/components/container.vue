<script setup lang='ts'>

</script>

<template>
  <main class="size-full">
    <section v-if="$slots.header">
      <slot name="header" />
    </section>
    <section>
      <slot />
    </section>
  </main>
</template>
