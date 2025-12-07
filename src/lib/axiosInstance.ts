import { environment } from '@/api/environment'
import { authStore } from '@/store/auth.store'
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import axios from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = authStore.getState().authToken
    config.headers = config.headers ?? {}

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve()
    }
  })

  failedQueue = []
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            const token = authStore.getState().authToken
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return axiosInstance(originalRequest)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshAxios = axios.create({
          baseURL: environment.apiBaseUrl,
          timeout: 10000,
          withCredentials: true,
        })

        const response = await refreshAxios.post('/auth/refresh', {})
        const newAccessToken = response.data.data.accessToken

        authStore.getState().setAuthToken(newAccessToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        processQueue()
        isRefreshing = false

        return axiosInstance(originalRequest)
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        processQueue(refreshError)
        isRefreshing = false
        await authStore.getState().logoutUser(true)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { axiosInstance }
