import { autoUpdater } from 'electron-updater'
import { isMacOS } from 'std-env'
import type { MainWindow } from './window'

export async function autoUpdate(main: MainWindow) {
  if (isMacOS)
    return

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'zhaogongchengsi',
    repo: 'telegram-open-more',
  })

  if (import.meta.env.DEV) {
    autoUpdater.forceDevUpdateConfig = true
  }

  autoUpdater.on('update-available', () => {
    console.log('update-available')
  })
  autoUpdater.on('update-not-available', () => {
    console.log('update-not-available')
  })
  autoUpdater.on('update-downloaded', () => {
    console.log('update-downloaded')
  })

  await autoUpdater.checkForUpdates().catch((err) => {
    console.error(err)
  })
}
