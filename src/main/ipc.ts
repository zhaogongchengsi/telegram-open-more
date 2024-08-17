import { ipcRenderer } from 'electron'

export class Ipc {
  constructor() {}

  on(channel: string, listener: (...args: any[]) => void) {
    ipcRenderer.on(channel, listener)
  }

  once(channel: string, listener: (...args: any[]) => void) {
    ipcRenderer.once(channel, listener)
  }

  removeListener(channel: string, listener: (...args: any[]) => void) {
    ipcRenderer.removeListener(channel, listener)
  }

  removeAllListeners(channel: string) {
    ipcRenderer.removeAllListeners(channel)
  }

  send(channel: string, ...args: any[]) {
    ipcRenderer.send(channel, ...args)
  }
}
