import { authStore } from '@/store/auth.store'
import { Navigate, Outlet } from 'react-router-dom'

export function PublicRoute() {
  const isAuthenticated = authStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to='/chat' replace />
  }

  return <Outlet />
}
