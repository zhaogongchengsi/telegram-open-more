<script setup lang='ts'>
import { Icon } from '@iconify/vue'
import Setting from './setting.vue'
import TopbarContainer from '~/components/topbar/topbar-container.vue'
import TopbarItem from '~/components/topbar/topbar-item.vue'
import { useTabbar } from '~/composables/tabbar'
import { header_left_width, header_right_width } from '~/constant'

const tabbar = useTabbar()
const telegram = useTelegram()

const headerStyle = computed(() => {
  return {
    paddingLeft: isMac.value ? `${header_left_width}px` : '0',
    paddingRight: isWindows.value ? `${header_right_width}px` : '5px',
  }
})

async function onAddClick() {
  const session = await telegram.createSession()
  tabbar.addTab({
    id: session.id,
    title: session.nickname,
  })
  if (tabbar.active === null) {
    tabbar.setActive(session.id)
  }
}

function onCloseClick(id: number | string) {
  tabbar.removeTab(id)
  telegram.removeSession(id as number)
}

function onSelected(id: number | string) {
  tabbar.setActive(id)
}
</script>

<template>
  <div class="drag h-full w-full flex items-center" :style="headerStyle">
    <TopbarContainer>
      <TopbarItem v-for="(item) of tabbar.data" :key="item.id" :active="tabbar.active === item.id" @close="onCloseClick(item.id)" @select="onSelected(item.id)">
        <template #prefix>
          <img v-if="item.icon" :src="item.icon" alt="icon">
        </template>
        <span>{{ item.title }}</span>
      </TopbarItem>
      <template #suffix>
        <button class="cursor-pointer rounded-full p-2" @click="onAddClick">
          <Icon icon="hugeicons:plus-sign" />
        </button>
      </template>
    </TopbarContainer>
    <Setting />
  </div>
</template>
