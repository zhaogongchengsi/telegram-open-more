export const useScreen = defineStore('screen', () => {
  const isFullScreen = ref(false)

  return {
    isFullScreen,
  }
})
