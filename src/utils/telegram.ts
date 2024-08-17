import { telegram } from '~/enums/windows'
import type { UpdateLocation } from '~/webview'

const ipc = window.modules.ipc

export function resizeTelegram(location: UpdateLocation): void {
  ipc.send(telegram.resize, location)
}

export function createTelegram(id: string, location: UpdateLocation): void {
  ipc.send(telegram.create, id, location)
}
