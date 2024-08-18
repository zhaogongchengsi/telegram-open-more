import { windows } from '~/enums/windows'

const ipc = window.modules.ipc

export const useScreen = defineStore('screen', () => {
  const isFullScreen = ref(false)

  ipc.on(windows.maximize, () => {
    isFullScreen.value = true
  })

  ipc.on(windows.unmaximize, () => {
    isFullScreen.value = false
  })

  function minimize() {
    ipc.send(windows.minimize)
  }

  function maximize() {
    isFullScreen.value = true
    ipc.send(windows.maximize)
  }

  function unmaximize() {
    isFullScreen.value = false
    ipc.send(windows.unmaximize)
  }

  return {
    isFullScreen,
    minimize,
    maximize,
    unmaximize,
  }
})
