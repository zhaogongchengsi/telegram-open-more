import { windows } from '~/enums/windows'

const ipc = window.modules.ipc

export function minimize() {
  ipc.send(windows.minimize)
}

export function maximize() {
  ipc.send(windows.maximize)
}

export function unmaximize() {
  ipc.send(windows.unmaximize)
}

export function isMaximized() {
  return ipc.sendSync(windows.isMaximized)
}

export function isMinimized() {
  return ipc.sendSync(windows.isMinimized)
}

export function dark() {
  ipc.send(windows.dark)
}

export function light() {
  ipc.send(windows.light)
}
