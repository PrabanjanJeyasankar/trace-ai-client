import { authStore } from '@/store/auth.store'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { Toaster } from 'sonner'
import './App.css'
import { ThemeProvider } from './components/ui/theme-provider'
import { AppRoutes } from './routes/AppRoutes'

function App() {
  const syncUser = authStore((state) => state.syncUser)
  const isLoading = authStore((state) => state.isLoading)

  useEffect(() => {
    syncUser()
  }, [syncUser])

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className='flex h-screen w-full items-center justify-center'>
          <Loader className='h-8 w-8 animate-spin text-primary' />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <AppRoutes />
      <Toaster richColors closeButton expand={false} position='top-right' />
    </ThemeProvider>
  )
}

export default App
