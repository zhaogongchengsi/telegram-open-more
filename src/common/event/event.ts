import type { Emitter, EventType } from 'mitt'
import mitt from 'mitt'
import isSymbol from 'lodash/isSymbol'
import isString from 'lodash/isString'

interface CommonEvents {
  ready: void
}

export interface Ipc {
  ipcRenderer?: Electron.IpcRenderer
  ipcMain?: Electron.IpcMain
}

export type Handler = (...data: any) => void

export interface HandlerOptions {
  once?: boolean
  global?: boolean
}

export class Event<T extends Record<EventType, unknown>> {
  env: string
  isMain: boolean
  isRenderer: boolean
  ipc: Ipc
  private mitt: Emitter<T & CommonEvents>
  private methods: Map<EventType, { handler: Handler, options: HandlerOptions }> = new Map()
  constructor(ipc: Ipc) {
    // eslint-disable-next-line node/prefer-global/process
    const type = typeof process !== 'undefined' ? process.type : 'renderer'
    const _mitt = mitt<T & CommonEvents>()
    this.env = type
    this.mitt = _mitt
    this.isMain = type === 'browser'
    this.isRenderer = type === 'renderer'

    if (this.isMain) {
      if (!ipc.ipcMain) {
        throw new Error('ipcMain is not defined')
      }
    }

    if (this.isRenderer) {
      if (!ipc.ipcRenderer) {
        throw new Error('ipcRenderer is not defined')
      }
    }

    this.ipc = ipc
  }

  private eventTypeToKey(event: EventType) {
    if (isSymbol(event)) {
      return event.description
    }
    if (isString(event)) {
      return event
    }
    throw new Error('event type is not valid')
  }

  private _mainHandle(event: EventType, handler: Handler, options: HandlerOptions = {}) {
    if (options.global) {
      this.methods.set(event, { handler, options })
    }
    if (options.once) {
      this.ipc.ipcMain?.handleOnce(this.eventTypeToKey(event), handler)
    }
    this.ipc.ipcMain?.handle(this.eventTypeToKey(event), handler)
  }

  private _rendererHandle(event: EventType, handler: Handler, options: HandlerOptions = {}) {
    this.methods.set(event, { handler, options })
  }

  handle(event: EventType, handler: Handler) {
    if (this.isMain) {
      return this._mainHandle(event, handler)
    }

    if (this.isRenderer) {
      return this._rendererHandle(event, handler)
    }
  }

  handlerOnce(event: EventType, handler: Handler) {
    if (this.isMain) {
      return this._mainHandle(event, handler, { once: true })
    }

    if (this.isRenderer) {
      return this._rendererHandle(event, handler, { once: true })
    }
  }

  handlerGlobal(event: EventType, handler: Handler) {
    if (this.isMain) {
      return this._mainHandle(event, handler, { global: true })
    }

    if (this.isRenderer) {
      return this._rendererHandle(event, handler, { global: true })
    }
  }

  handlerGlobalOnce(event: EventType, handler: Handler) {
    if (this.isMain) {
      return this._mainHandle(event, handler, { once: true, global: true })
    }

    if (this.isRenderer) {
      return this._rendererHandle(event, handler, { once: true, global: true })
    }
  }
}
