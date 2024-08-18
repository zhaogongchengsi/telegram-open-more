import { telegram } from '~/enums/windows'
import type { UpdateLocation } from '~/webview'

const ipc = window.modules.ipc

export function resizeTelegram(location: UpdateLocation): void {
  ipc.send(telegram.resize, location)
}

export function createTelegram(id: string, location: UpdateLocation): void {
  ipc.send(telegram.create, id, location)
}

export function hideTelegram(id: string): void {
  ipc.send(telegram.hide, id)
}

export function showTelegram(id: string, location: UpdateLocation): void {
  ipc.send(telegram.show, id, location)
}

export function setActiveTelegram(id: string, oldId: string): void {
  ipc.send(telegram.setActive, id, oldId)
}
