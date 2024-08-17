import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow, ipcMain } from 'electron'
import type { TelegramWebviewOptions } from './telegram-webview'
import { TelegramWebview } from './telegram-webview'
import { telegram } from '~/enums/windows'

export interface MainWindowOptions {
  width: number
  height: number
}

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

export class MainWindow {
  browserWindow: BrowserWindow
  telegramWindow: TelegramWebview
  constructor(option: MainWindowOptions) {
    const mainWindow = new BrowserWindow({
      width: option.width,
      height: option.height,
      webPreferences: {
        preload: join(_dirname, 'preload.cjs'),
        partition: 'persist:main',
        nodeIntegration: true,
        // contextIsolation: false,
      },
    })
    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    }
    else {
      mainWindow.loadFile(join(_dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
    }

    this.browserWindow = mainWindow

    this.telegramWindow = new TelegramWebview(mainWindow)

    this.init()
  }

  private init() {
    const telegramWindow = this.telegramWindow
    ipcMain.on(telegram.create, (_, id: string, options: TelegramWebviewOptions) => {
      telegramWindow.createWindow(id, options)
    })
    ipcMain.on(telegram.close, (_, id: string) => {
      telegramWindow.closeWindow(id)
    })
  }

  openDevTools() {
    this.browserWindow.webContents.openDevTools()
  }
}

let mainWindow: MainWindow
export function getMainWindow(option: MainWindowOptions) {
  if (mainWindow)
    return mainWindow
  mainWindow = new MainWindow(option)
  return mainWindow
}