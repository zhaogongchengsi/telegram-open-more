import type { Emitter, EventType } from 'mitt'
import mitt from 'mitt'

interface CommonEvents {
  ready: void
}

export class Event<T extends Record<EventType, unknown>> {
  env: string
  isMain: boolean
  isRenderer: boolean
  private mitt: Emitter<T & CommonEvents>
  constructor() {
    // eslint-disable-next-line node/prefer-global/process
    const type = typeof process !== 'undefined' ? process.type : 'renderer'
    const _mitt = mitt<T & CommonEvents>()
    this.env = type
    this.mitt = _mitt
    this.isMain = type === 'browser'
    this.isRenderer = type === 'renderer'
  }
}
