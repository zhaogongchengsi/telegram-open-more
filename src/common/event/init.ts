import { app, protocol } from 'electron'
import { protocol_name } from './constant'

export function initialEvent() {
  if (app.isReady()) {
    throw new Error('Initialization needs to be done before the electron is ready')
  }

  protocol.registerSchemesAsPrivileged([
    {
      scheme: protocol_name,
      privileges: {
        standard: true,
        secure: true,
        supportFetchAPI: true,
      },
    },
  ])
}
