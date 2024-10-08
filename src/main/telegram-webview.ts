import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { type BrowserWindow, ipcMain } from 'electron'
import { telegram } from '~/enums/windows'
import type { UpdateLocation } from '~/webview'
import { Webview } from '~/webview'

export interface TelegramWebviewOptions {
  width: number
  height: number
  x: number
  y: number
}

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

export class TelegramWebview {
  private readonly src = 'https://web.telegram.org/a'
  private webviewCatch = new Map<string, Webview>()
  private showWebview: Webview | null = null
  private window: BrowserWindow
  constructor(window: BrowserWindow) {
    this.window = window
    this.init()
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
      preload: join(_dirname, '../preload/telegram.mjs'),
      partition: id,
      contextIsolation: false,
      nodeIntegration: true,
    })
    this.webviewCatch.set(id, webview)
    webview.on('did-start-loading', (id) => {
      this.window.webContents.send(telegram.startLoading, id)
    })
    webview.on('did-stop-loading', (id) => {
      this.window.webContents.send(telegram.stopLoading, id)
    })
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

  private init() {
    ipcMain.on(telegram.create, (_, id: string, options: TelegramWebviewOptions) => {
      this.createWindow(id, options)
    })
    ipcMain.on(telegram.close, (_, id: string) => {
      this.closeWindow(id)
    })
    ipcMain.on(telegram.show, (_, id: string, location: UpdateLocation) => {
      this.showWindow(id, location)
    })
    ipcMain.on(telegram.hide, (_, id: string) => {
      this.hideWindow(id)
    })
    ipcMain.on(telegram.resize, (_, location: UpdateLocation) => {
      this.showWebview?.setBounds(location)
      this.webviewCatch.forEach((webview) => {
        webview.setBounds(location)
      })
    })
    ipcMain.on(telegram.setActive, (_, id: string, fastShowId: string) => {
      this.setActiveWindow(id, fastShowId)
    })
  }

  closeWindow(id: string) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      webview.unmount()
      this.webviewCatch.delete(id)
    }
  }

  dark() {
    this.webviewCatch.forEach((webview) => {
      webview.dark()
    })
  }

  light() {
    this.webviewCatch.forEach((webview) => {
      webview.light()
    })
  }

  setActiveWindow(id: string, fastId: string) {
    const showView = this.webviewCatch.get(id)

    if (showView) {
      showView.show()
      this.showWebview = showView
    }

    if (fastId) {
      const fastView = this.webviewCatch.get(fastId)
      if (fastView) {
        fastView.hide()
      }
    }

    this.webviewCatch.forEach((webview, _id) => {
      if ([id, fastId].includes(_id)) {
        return
      }

      webview.hide()
    })
  }

  showWindow(id: string, location?: UpdateLocation) {
    const webview = this.webviewCatch.get(id)
    if (webview) {
      this.showWebview = webview
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

  openShowDevTools() {
    this.showWebview?.openDevTools()
  }
}
