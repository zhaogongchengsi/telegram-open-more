import type { BrowserWindow } from 'electron'
import type { ViewLocation } from '~/webview'
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

  createWindow(id: string, options: TelegramWebviewOptions) {
    if (this.webviewCatch.has(id)) {
      return
    }
    const webview = new Webview({
      src: this.src,
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
      //   preload: undefined,
      partition: id,
    })
    this.webviewCatch.set(id, webview)
    webview.mount(this.window)
    webview.show({
      x: options.x,
      y: options.y,
      width: options.width,
      height: options.height,
    })
    webview.onUnmount(() => {
      this.webviewCatch.delete(id)
    })
  }

  closeWindow(id: string) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      webview.unmount()
      this.webviewCatch.delete(id)
    }
  }

  showWindow(id: string, location?: ViewLocation) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      webview.show(location)
    }
  }

  hideWindow(id: string) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      webview.hide()
    }
  }

  toggleWindow(id: string) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      if (webview.isShow()) {
        webview.hide()
      }
      else {
        webview.show()
      }
    }
  }
}
