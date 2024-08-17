import EventEmitter from 'node:events'
import type { BrowserWindow } from 'electron'
import { WebContentsView, ipcMain } from 'electron'

export interface WebviewOptions {
  src: string
  x: number
  y: number
  width?: number
  height?: number
  preload?: string
  partition?: string
}

export type Location = Pick<WebviewOptions, 'x' | 'y' | 'width' | 'height'>

export class Webview extends EventEmitter {
  view: WebContentsView
  window: BrowserWindow
  src: string
  x: number
  y: number
  private _width: number
  private _height: number
  preload?: string
  partition?: string

  constructor(options: WebviewOptions) {
    super()
    this.src = options.src
    this.x = options.x
    this.y = options.y
    this._width = options.width ?? 800
    this._height = options.height ?? 600
    this.preload = options.preload
    this.partition = options.partition
    this.view = new WebContentsView({
      webPreferences: {
        preload: options.preload,
        partition: options.partition,
      },
    })
    ipcMain.on(`webview:resize:${options.partition}`, (_, location: Location) => {
      this.onWebviewResize(location)
    })
  }

  set width(width: number) {
    this._width = width
  }

  get width() {
    return this._width
  }

  set height(height: number) {
    this._height = height
  }

  get height() {
    return this._height
  }

  private load({ x, y, width, height }: Location) {
    if (!this.src) {
      throw new Error('src is required')
    }
    this.view.setBounds({ x, y, width, height })
    this.view.webContents.loadURL(this.src)
  }

  show(location: Location) {
    this.load(location)
  }

  openDevTools() {
    this.view.webContents.openDevTools()
  }

  onWebviewResize(location: Location) {
    this.view.setBounds({
      x: location.x,
      y: location.y,
      width: location.width,
      height: location.height,
    })
  }

  mount(window: BrowserWindow) {
    this.window = window
    this.window.contentView.addChildView(this.view)
    window.webContents.send('webview:mount', this.partition)
    this.emit('webview:mount', this.partition)
  }

  unmount() {
    this?.window?.contentView?.removeChildView(this.view)
  }
}
