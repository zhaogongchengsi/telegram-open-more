import Dexie from 'dexie'

export interface TelegramData {
  id: number
  partition: string
  login: boolean
  userinfo?: {
    id: number
    nackname: string
    avatar: string
  }
}

class TelegramDatabase extends Dexie {
  readonly _version: number = 1

  constructor() {
    super('TelegramDatabase')
    this.version(this._version).stores({
      friends: '++id, partition, login, userinfo',
    })
  }
}

export const telegramDatabase = new TelegramDatabase()
