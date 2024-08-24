import type { Emitter, EventType } from 'mitt'
import mitt from 'mitt'

interface CommonEvents {
  ready: void
}

export interface Ipc {
  ipcRenderer?: Electron.IpcRenderer
  ipcMain?: Electron.IpcMain
}

export class Event<T extends Record<EventType, unknown>> {
  env: string
  isMain: boolean
  isRenderer: boolean
  ipc: Ipc
  private mitt: Emitter<T & CommonEvents>
  constructor(ipc: Ipc) {
    // eslint-disable-next-line node/prefer-global/process
    const type = typeof process !== 'undefined' ? process.type : 'renderer'
    const _mitt = mitt<T & CommonEvents>()
    this.ipc = ipc
    this.env = type
    this.mitt = _mitt
    this.isMain = type === 'browser'
    this.isRenderer = type === 'renderer'
  }
}
