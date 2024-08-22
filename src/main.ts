import { BrowserWindow, app } from 'electron'
import { isMacOS } from 'std-env'
import electronSquirrel from 'electron-squirrel-startup'
import type { MainWindow } from './main/window'
import { getMainWindow } from './main/window'
// Handle creating/removing shortcuts on Windows when installing/uninstalling.

const gotTheLock = app.requestSingleInstanceLock()

if (electronSquirrel || !gotTheLock) {
  app.quit()
}

let mainWindow: MainWindow | null = null

function createWindow() {
  console.log(process.type)
  // Create the browser window.
  mainWindow = getMainWindow({ width: 800, height: 600 })
  if (import.meta.env.DEV) {
    mainWindow.openDevTools()
  }
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized())
      mainWindow.restore()
    mainWindow.focus()
  }
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (isMacOS) {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
