import { webview } from '~/enums/webview'
import { telegram } from '~/enums/windows'

const ipc = window.modules.ipc

export class Webview {
  id: string
  constructor(id: string) {
    this.id = id
  }

  createWindow(id: string, { x, y, width, height }: { x: number, y: number, width: number, height: number }) {
    ipc.send(telegram.create, id, { x, y, width, height })
  }

  resizeWindow(id: string, { x, y, width, height }: { x: number, y: number, width: number, height: number }) {
    ipc.send(`${webview.resize}:${id}`, { x, y, width, height })
  }

  closeWindow(id: string) {
    ipc.send(`${webview.unmount}:${id}`, id)
  }
}
