import EventEmitter from 'node:events'
import type { BrowserWindow } from 'electron'
import { WebContentsView, ipcMain } from 'electron'
import { webview } from '~/enums/webview'

export interface WebviewOptions {
  src: string
  x: number
  y: number
  width?: number
  height?: number
  preload?: string
  partition?: string
}

export type ViewLocation = Pick<WebviewOptions, 'x' | 'y' | 'width' | 'height'>

export class Webview extends EventEmitter {
  view: WebContentsView
  window: BrowserWindow
  src: string
  x: number
  y: number
  private _width: number
  private _height: number
  private _isMounted = false
  _show: boolean = false
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
    ipcMain.on(`${webview.resize}:${options.partition}`, (_, location: ViewLocation) => {
      this.onWebviewResize(location)
    })
    ipcMain.on(`${webview.unmount}:${options.partition}`, (_, id: string) => {
      if (id === options.partition) {
        this.unmount()
      }
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

  private load({ x, y, width, height }: ViewLocation) {
    if (!this.src) {
      throw new Error('src is required')
    }
    this.view.setBounds({ x, y, width, height })
    this.view.webContents.loadURL(this.src)
  }

  isShow() {
    return this._show
  }

  show(location?: ViewLocation) {
    if (!this._isMounted) {
      return
    }
    this._show = true
    this.view.setVisible(true)
    const _location = Object.assign({ x: this.x, y: this.y, width: this.width, height: this.height }, location)
    this.load(_location)
  }

  // 消失但不销毁
  hide() {
    this._show = false
    // this.view.setBounds({ x: 0, y: 0, width: 0, height: 0 })
    this.view.setVisible(false)
  }

  openDevTools() {
    this.view.webContents.openDevTools()
  }

  onWebviewResize(location: ViewLocation) {
    this.view.setBounds({
      x: location.x,
      y: location.y,
      width: location.width,
      height: location.height,
    })
  }

  onMainWebviewResize() {
    const [width, height] = this.window.getContentSize()
    this.view.setBounds({ x: this.x, y: this.y, width, height })
  }

  mount(window: BrowserWindow) {
    this.window = window
    this.window.contentView.addChildView(this.view)
    window.webContents.send(webview.mount, this.partition)
    this.emit(webview.mount, this.partition)
    this._isMounted = true
    window.on('resize', this.onMainWebviewResize.bind(this))
  }

  onUnmount(handle: (id: string) => void) {
    this.on(webview.unmount, handle)
  }

  unmount() {
    if (!this._isMounted) {
      return
    }
    this?.window?.contentView?.removeChildView(this.view)
    this?.window?.webContents?.send(webview.unmount, this.partition)
    this.emit(webview.unmount, this.partition)
    this?.window?.removeListener('resize', this.onMainWebviewResize.bind(this))
  }
}
