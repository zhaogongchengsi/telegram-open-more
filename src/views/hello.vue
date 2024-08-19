<script setup lang='ts'>
import Button from 'primevue/button'
import logo from '~/assets/telegram.png'

const emit = defineEmits(['create'])
</script>

<template>
  <div class="flex flex-col items-center gap-5">
    <img class="size-20" :src="logo" alt="telegram">
    <h1 class="text-2xl font-bold">
      Hello Tom
    </h1>
    <Button outlined @click="emit('create')">
      Create a new chat
    </Button>
  </div>
</template>
