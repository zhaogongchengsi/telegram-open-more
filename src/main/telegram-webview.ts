import type { BrowserWindow } from 'electron'
import { Webview } from '~/webview'

export interface TelegramWebviewOptions {
  width: number
  height: number
  x: number
  y: number
}

export class TelegramWebview {
  private readonly src = 'https://web.telegram.org/a'
  private webviewCatch = new Map<string, Webview>()
  private window: BrowserWindow
  constructor(window: BrowserWindow) {
    this.window = window
  }

  private createId(id: string) {
    return `${id}`
  }

  createWindow(id: string, options: TelegramWebviewOptions) {
    const _id = this.createId(id)
    const webview = new Webview({
      src: this.src,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      //   preload: undefined,
      partition: _id,
    })
    this.webviewCatch.set(_id, webview)
    webview.mount(this.window)
    webview.show({
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
    })
  }

  closeWindow(id: string) {
    const _id = this.createId(id)
    const webview = this.webviewCatch.get(_id)
    if (webview) {
      webview.unmount()
      this.webviewCatch.delete(_id)
    }
  }

  listen() {

  }
}
