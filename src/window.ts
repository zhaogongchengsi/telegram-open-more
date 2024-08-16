import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { BrowserWindow } from 'electron'

export interface MainWindowOptions {
  width: number
  height: number
}

const _dirname = typeof __dirname !== 'undefined' ? __dirname : dirname(fileURLToPath(import.meta.url))

export class MainWindow {
  browserWindow: BrowserWindow
  constructor(option: MainWindowOptions) {
    const mainWindow = new BrowserWindow({
      width: option.width,
      height: option.height,
      webPreferences: {
        preload: join(_dirname, 'preload.js'),
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
