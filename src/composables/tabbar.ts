import logo from '~/assets/telegram.png'

export type TabbarId = string | number

export interface TabbarItem {
  id: TabbarId
  title: string
  icon?: string
  spin?: boolean
}

export const useTabbar = defineStore('tabbar', () => {
  const data = ref<TabbarItem[]>([])
  const active = ref<TabbarId>(null)

  const setActive = (id: TabbarId) => {
    active.value = id
  }

  const addTab = (item: TabbarItem) => {
    if (data.value.some(tab => tab.id === item.id))
      return
    const config = Object.assign({ icon: logo }, item)
    data.value.push(config)
  }

  const removeTab = (id: TabbarId) => {
    const index = data.value.findIndex(item => item.id === id)

    if (index === -1)
      return

    // 处理边界情况 删除最前面一个和最后面一个
    if (index === 0) {
      data.value.shift()
      if (data.value.length) {
        setActive(data.value[0].id)
      }
      return index
    }

    if (index === data.value.length - 1) {
      data.value.pop()
      if (data.value.length) {
        setActive(data.value[data.value.length - 1].id)
      }
      return index
    }

    // 删除中间并且谁激活的是这个tab
    if (active.value === id) {
      setActive(data.value[index - 1].id)
    }

    data.value = data.value.filter(item => item.id !== id)

    return index
  }

  const startSpin = (id: TabbarId) => {
    const value = data.value.find(item => item.id === id)
    if (value) {
      value.spin = true
    }
  }

  const stopSpin = (id: TabbarId) => {
    const value = data.value.find(item => item.id === id)
    if (value) {
      value.spin = false
    }
  }

  return {
    data,
    active,
    setActive,
    addTab,
    removeTab,
    startSpin,
    stopSpin,
  }
})
