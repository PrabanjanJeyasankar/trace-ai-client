import { environment } from './environment'

const baseUrl = environment.apiBaseUrl

export const apiEndpoints = {
  auth: {
    signup: `${baseUrl}/auth/signup`,
    login: `${baseUrl}/auth/login`,
    me: `${baseUrl}/auth/me`,
  },
} as const

export type ApiEndpoints = typeof apiEndpoints
