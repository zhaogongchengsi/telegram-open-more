import type { PromiseExtended } from 'dexie'
import Dexie from 'dexie'

export interface TelegramData {
  id: number
  partition: string
  login: boolean
  userId?: number
  nickname?: string
  avatar?: string
}

class TelegramDatabase extends Dexie {
  readonly _version: number = 1
  telegram: Dexie.Table<Omit<TelegramData, 'id'>>

  constructor() {
    super('telegram')
    this.version(this._version).stores({
      telegram: '++id, partition, login, userId, nickname, avatar, [id], [userId], [nickname], [id+partition], [login+partition], [userId+partition], [nickname+partition]',
    })
  }

  createSessionId() {
    return generateUniqueString(25)
  }

  async getSession(id: PromiseExtended<any>): Promise<TelegramData> {
    return await this.telegram.get(id) as TelegramData
  }

  async createSession() {
    const partition = this.createSessionId()
    const id = await this.telegram.add({
      partition,
      login: false,
      nickname: 'telegram',
    })
    return { id, partition, login: false, nickname: 'telegram' }
  }

  async removeSession(id: number) {
    return await this.telegram.delete(id)
  }

  async getSessions() {
    return await this.telegram.toArray() as TelegramData[]
  }
}

export const telegramDatabase = new TelegramDatabase()
