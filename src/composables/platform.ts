export const platform = ref(window.platform)
export const isMac = computed(() => platform.value.isMacOS)
export const isWindows = computed(() => platform.value.isWindows)
export const isLinux = computed(() => platform.value.isLinux)
