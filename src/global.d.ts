import type { Ipc } from './main/ipc'

declare global {
  interface Window {
    modules: {
      ipc: Ipc
    }
    platform: {
      isMacOS: boolean
      isWindows: boolean
      isLinux: boolean
    }
  }
}
