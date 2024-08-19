<script setup lang='ts'>
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

telegram.startLoadingEvent.on((session) => {
  if (!session)
    return
  tabbar.startSpin(session.id)
})

telegram.stopLoadingEvent.on((session) => {
  if (!session)
    return
  tabbar.stopSpin(session.id)
})

tabbar.deleteEvent.on((id) => {
  const data = telegram.getSessionById(id as number)
  if (data) {
    closeTelegram(data.partition)
  }
  telegram.removeSession(id as number)
})

onMounted(async () => {
  const sessions = await telegram.getSessions()
  for (const session of sessions) {
    tabbar.addTab({
      id: session.id,
      title: session.nickname,
    })

    createTelegram(session.partition, location.value)
  }
  if (tabbar.active === null && sessions.length > 0) {
    tabbar.setActive(sessions[0].id)
  }
})
</script>

<template>
  <div v-if="telegram.data.length === 0" class="size-full flex items-center justify-center">
    k
  </div>
  <div v-else ref="webview" class="size-full" :data-active="active" />
</template>
