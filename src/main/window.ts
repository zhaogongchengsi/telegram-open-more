import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow } from 'electron'
import { isMacOS } from 'std-env'
import { TelegramWebview } from './telegram-webview'

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
      titleBarStyle: isMacOS ? 'hiddenInset' : 'default',
      frame: isMacOS ? true : (!!import.meta.env.DEV),
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
