export type EnvironmentConfig = {
  apiBaseUrl: string
  isDev: boolean
}

function getRequiredEnvValue(
  envValue: string | undefined,
  name: string
): string {
  if (!envValue) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return envValue
}

export const environment: EnvironmentConfig = {
  apiBaseUrl: getRequiredEnvValue(
    import.meta.env.VITE_API_BASE_URL,
    'VITE_API_BASE_URL'
  ),
  isDev: import.meta.env.VITE_ENVIRONMENT === 'development',
}
