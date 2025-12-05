import { Navigate, Outlet } from 'react-router-dom'
import { authStore } from '../store/auth.store'

export function ProtectedRoute() {
  const isAuthenticated = authStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}
