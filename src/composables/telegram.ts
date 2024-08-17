import type { TelegramData } from '~/database/telegram'
import { telegramDatabase } from '~/database/telegram'

export const useTelegram = defineStore('telegram', () => {
  const data = ref<TelegramData[]>([])

  const createSession = async () => {
    const session = await telegramDatabase.createSession()
    data.value.push(session)
    return session
  }

  const getSessionById = (id: number) => {
    return data.value.find(item => item.id === id)
  }

  const getSessions = async () => {
    const sessions = await telegramDatabase.getSessions()
    data.value = sessions
    return sessions
  }

  return {
    data,
    createSession,
    getSessionById,
    getSessions,
  }
})
