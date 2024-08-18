<script setup lang='ts'>
import logo from '~/assets/telegram@16x16.png'

const tabbar = useTabbar()
const telegram = useTelegram()

const webview = ref<HTMLElement | null>(null)
const { width, height, x, y } = useElementBounding(webview)

const location = computed(() => {
  return {
    width: width.value,
    height: height.value,
    x: x.value,
    y: y.value,
  }
})

watchEffect(() => {
  if (!webview.value)
    return
  resizeTelegram(location.value)
})

const active = computed(() => {
  const active = tabbar.active as number | null
  if (active === null)
    return null
  const session = telegram.getSessionById(active)
  return session ? session.partition : null
})

watch(active, async (newId, oldId) => {
  setActiveTelegram(newId, oldId)
})

telegram.createEvent.on((session) => {
  createTelegram(session.partition, location.value)
})

onMounted(async () => {
  const sessions = await telegram.getSessions()
  for (const session of sessions) {
    tabbar.addTab({
      id: session.id,
      title: session.nickname,
      icon: logo,
    })
    createTelegram(session.partition, location.value)
  }
  if (tabbar.active === null && sessions.length > 0) {
    tabbar.setActive(sessions[0].id)
  }
})
</script>

<template>
  <div ref="webview" class="size-full" :data-active="active" />
</template>
