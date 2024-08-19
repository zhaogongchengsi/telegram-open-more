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

export type UpdateLocation = Partial<ViewLocation>

export interface WebviewEvents {
  'did-finish-load': string[]
  'did-fail-load': string[]
  'did-start-loading': string[]
  'did-stop-loading': string[]
  'mount': string[]
  'unmount': string[]
}

export class Webview extends EventEmitter<WebviewEvents> {
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
        partition: `persist:${options.partition}`,
      },
    })
    this.view.webContents.loadURL(options.src)
    ipcMain.on(`${webview.unmount}:${options.partition}`, (_, id: string) => {
      if (id === options.partition) {
        this.unmount()
      }
    })

    this.view.webContents.on('did-finish-load', this.onDidFinishLoad.bind(this))
    this.view.webContents.on('did-fail-load', this.onDidFailLoad.bind(this))
    this.view.webContents.on('did-start-loading', this.didStartLoading.bind(this))
    this.view.webContents.on('did-stop-loading', this.didStopLoading.bind(this))
  }

  // 加载完成
  onDidFinishLoad() {
    this.emit('did-start-loading', this.partition)
    this.emit('did-finish-load', this.partition)
  }

  // 加载失败
  onDidFailLoad() {
    this.emit('did-stop-loading', this.partition)
    this.emit('did-fail-load', this.partition)
  }

  // 开始旋转
  didStartLoading() {
    this.emit('did-start-loading', this.partition)
  }

  // 停止旋转
  didStopLoading() {
    this.emit('did-stop-loading', this.partition)
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

  isShow() {
    return this._show
  }

  show(location?: UpdateLocation) {
    if (!this._isMounted) {
      return
    }
    this._show = true
    this.view.setVisible(true)
    this.setBounds(location)
  }

  dark() {

  }

  light() {

  }

  // 消失但不销毁
  hide() {
    this._show = false
    this.view.setVisible(false)
  }

  openDevTools() {
    this.view.webContents.openDevTools()
  }

  setBounds(location: UpdateLocation) {
    const _location = Object.assign({ x: this.x, y: this.y, width: this.width, height: this.height }, location)
    this.x = _location.x
    this.y = _location.y
    this.width = _location.width
    this.height = _location.height
    this.view.setBounds(_location)
  }

  mount(window: BrowserWindow) {
    this.window = window
    this.window.contentView.addChildView(this.view)
    this.emit('did-start-loading', this.partition)
    window.webContents.send(webview.mount, this.partition)
    this.emit('mount', this.partition)
    this._isMounted = true
  }

  onUnmount(handle: (id: string) => void) {
    this.on('unmount', handle)
  }

  unmount() {
    if (!this._isMounted) {
      return
    }
    this?.window?.contentView?.removeChildView(this.view)
    this?.window?.webContents?.send(webview.unmount, this.partition)
    this.emit('unmount', this.partition)
  }
}
