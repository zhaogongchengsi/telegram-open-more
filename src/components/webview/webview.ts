import { webview } from '~/enums/webview'
import { telegram } from '~/enums/windows'

const ipc = window.modules.ipc
export interface Location {
  x: number
  y: number
  width?: number
  height?: number
}

export class Webview {
  id: string
  constructor(id: string) {
    this.id = id
  }

  createWindow(id: string, { x, y, width, height }: Location) {
    ipc.send(telegram.create, id, { x, y, width, height })
  }

  resizeWindow(id: string, { x, y, width, height }: Location) {
    ipc.send(`${webview.resize}:${id}`, { x, y, width, height })
  }

  closeWindow(id: string) {
    ipc.send(`${webview.unmount}:${id}`, id)
  }

  showWindow(id: string, { x, y, width, height }: Location) {
    ipc.send(telegram.show, id, { x, y, width, height })
  }

  hideWindow(id: string) {
    ipc.send(telegram.hide, id)
  }
}
