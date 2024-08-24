import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, app, globalShortcut, ipcMain, nativeImage, nativeTheme } from 'electron'
import { isMacOS } from 'std-env'
import logo from '../../resources/telegram@256x256.png?asset'
import { TelegramWebview } from './telegram-webview'
import { windows } from '~/enums/windows'

export interface MainWindowOptions {
  width: number
  height: number
}

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

export class MainWindow {
  browserWindow: BrowserWindow
  telegramWindow: TelegramWebview
  constructor(option: MainWindowOptions) {
    const icon = nativeImage.createFromPath(logo)

    const mainWindow = new BrowserWindow({
      width: option.width,
      height: option.height,
      titleBarStyle: isMacOS ? 'hiddenInset' : 'default',
      frame: isMacOS ? true : (!!import.meta.env.DEV),
      icon,
      webPreferences: {
        preload: join(_dirname, '../preload/preload.mjs'),
        partition: 'persist:main',
        nodeIntegration: true,
      },
    })

    // eslint-disable-next-line node/prefer-global/process
    const rendererUrl = process.env.ELECTRON_RENDERER_URL
    if (import.meta.env.DEV && rendererUrl) {
      mainWindow.loadURL(rendererUrl)
    }
    else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    this.browserWindow = mainWindow
    this.telegramWindow = new TelegramWebview(mainWindow)

    this.init()

    if (import.meta.env.DEV) {
      globalShortcut.register('CommandOrControl+F11', () => {
        this.telegramWindow.openShowDevTools()
      })
    }
  }

  private init() {
    const mainWindow = this.browserWindow
    ipcMain.on(windows.minimize, () => {
      this.minimize()
    })
    ipcMain.on(windows.maximize, () => {
      this.maximize()
    })
    ipcMain.on(windows.unmaximize, () => {
      this.unmaximize()
    })
    // 监听窗口放大缩小然后给渲染进程发送消息
    mainWindow.on('maximize', () => {
      mainWindow.webContents.send(windows.maximize)
    })
    mainWindow.on('unmaximize', () => {
      mainWindow.webContents.send(windows.unmaximize)
    })

    mainWindow.on('enter-full-screen', () => {
      mainWindow.webContents.send(windows.maximize)
    })

    ipcMain.on(windows.dark, () => {
      nativeTheme.themeSource = 'dark'
    })

    ipcMain.on(windows.light, () => {
      nativeTheme.themeSource = 'light'
    })

    mainWindow.on('leave-full-screen', () => {
      mainWindow.webContents.send(windows.unmaximize)
    })
    ipcMain.on(windows.isMaximized, (event) => {
      event.returnValue = mainWindow.isMaximized()
    })
    ipcMain.on(windows.isMinimized, (event) => {
      event.returnValue = mainWindow.isMinimized()
    })
    // 关闭窗口退出程序
    ipcMain.on(windows.close, () => {
      mainWindow.close()
      app.quit()
    })
    ipcMain.on('telegram', () => {
      console.log('telegram')
    })
  }

  setAlwaysOnTop(flag: boolean, level?: 'normal' | 'floating' | 'torn-off-menu' | 'modal-panel' | 'main-menu' | 'status' | 'pop-up-menu' | 'screen-saver', relativeLevel?: number) {
    this.browserWindow.setAlwaysOnTop(flag, level, relativeLevel)
  }

  openDevTools() {
    this.browserWindow.webContents.openDevTools()
  }

  closeDevTools() {
    this.browserWindow.webContents.closeDevTools()
  }

  show() {
    this.browserWindow.show()
  }

  hide() {
    this.browserWindow.hide()
  }

  close() {
    this.browserWindow.close()
  }

  minimize() {
    this.browserWindow.minimize()
  }

  maximize() {
    this.browserWindow.maximize()
  }

  unmaximize() {
    this.browserWindow.unmaximize()
  }

  isMaximized() {
    return this.browserWindow.isMaximized()
  }

  isMinimized() {
    return this.browserWindow.isMinimized()
  }

  isFocused() {
    return this.browserWindow.isFocused()
  }

  isDestroyed() {
    return this.browserWindow.isDestroyed()
  }

  setBounds(options: Electron.Rectangle) {
    this.browserWindow.setBounds(options)
  }

  restore() {
    this.browserWindow.restore()
  }

  focus() {
    this.browserWindow.focus()
  }
}

let mainWindow: MainWindow
export function getMainWindow(option: MainWindowOptions) {
  if (mainWindow)
    return mainWindow
  mainWindow = new MainWindow(option)
  return mainWindow
}
