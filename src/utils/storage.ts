import { environment } from '@/api/environment'

export const storage = {
  get<T>(key: string): T | null {
    if (!environment.isDev && key === 'chats') {
      return null
    }
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  set<T>(key: string, value: T): void {
    if (!environment.isDev && key === 'chats') {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string): void {
    localStorage.removeItem(key)
  },
}
