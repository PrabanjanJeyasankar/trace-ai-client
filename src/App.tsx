import { authStore } from '@/store/auth.store'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import './App.css'
import { ThemeProvider } from './components/ui/theme-provider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  const syncUser = authStore((state) => state.syncUser)

  useEffect(() => {
    syncUser()
  }, [syncUser])

  return (
    <ThemeProvider>
      <AppRoutes />
      <Toaster richColors closeButton expand={false} position='top-right' />
    </ThemeProvider>
  )
}

export default App
