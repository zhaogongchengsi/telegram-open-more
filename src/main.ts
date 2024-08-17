import { BrowserWindow, app } from 'electron'
import { isMacOS } from 'std-env'
import electronSquirrel from 'electron-squirrel-startup'
import { getMainWindow } from './main/window'
// Handle creating/removing shortcuts on Windows when installing/uninstalling.

if (electronSquirrel) {
  app.quit()
}

let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = getMainWindow({ width: 800, height: 600 })

  // Open the DevTools.
  mainWindow.openDevTools()
}

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
