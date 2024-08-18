import type { TelegramData } from '~/database/telegram'
import { telegramDatabase } from '~/database/telegram'
import { telegram } from '~/enums/windows'

const ipc = window.modules.ipc

export const useTelegram = defineStore('telegram', () => {
  const data = ref<TelegramData[]>([])
  const createEvent = useEventBus<TelegramData>('create-telegram')
  const startLoadingEvent = useEventBus<TelegramData>('start-loading')
  const stopLoadingEvent = useEventBus<TelegramData>('stop-loading')

  const createSession = async () => {
    const session = await telegramDatabase.createSession()
    data.value.push(session)
    createEvent.emit(session)
    return session
  }

  const removeSession = async (id: number) => {
    await telegramDatabase.telegram.delete(id)
    data.value = data.value.filter(item => item.id !== id)
  }

  const getSessionById = (id: number) => {
    return data.value.find(item => item.id === id)
  }

  const getSessionByPartition = (partition: string) => {
    return data.value.find(item => item.partition === partition)
  }

  const getSessions = async () => {
    const sessions = await telegramDatabase.getSessions()
    data.value = sessions
    return sessions
  }

  ipc.on(telegram.startLoading, (_: any, id: string) => {
    startLoadingEvent.emit(getSessionByPartition(id))
  })

  ipc.on(telegram.stopLoading, (_: any, id: string) => {
    stopLoadingEvent.emit(getSessionByPartition(id))
  })

  return {
    data,
    createSession,
    getSessionById,
    getSessions,
    removeSession,
    createEvent,
    startLoadingEvent,
    stopLoadingEvent,
  }
})
