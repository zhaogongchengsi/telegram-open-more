import type { Ipc } from './main/ipc'

declare global {
  interface Window {
    modules: {
      ipc: Ipc
    }
  }
}
