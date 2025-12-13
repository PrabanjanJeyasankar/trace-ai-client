import { environment } from '@/api/environment'
import { authStore } from '@/store/auth.store'
import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

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

    const skipRefreshUrls = [
      '/auth/refresh',
      '/auth/me',
      '/auth/login',
      '/auth/signup',
    ]
    const shouldSkipRefresh = skipRefreshUrls.some((url) =>
      originalRequest.url?.includes(url)
    )

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRefresh
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => {
            return axiosInstance(originalRequest)
          })
          .catch((error) => {
            return Promise.reject(error)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await axiosInstance.post('/auth/refresh', {})

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
