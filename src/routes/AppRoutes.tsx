import { Suspense } from 'react'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import { CircularLoader } from '@/components/ui/loader'
import { privateRoutes } from './private-routes'
import { publicRoutes } from './public-routes'

function AppRoutesInner() {
  return useRoutes([
    ...publicRoutes,
    ...privateRoutes,
    { path: '/', element: <Navigate to='/login' replace /> },
    { path: '*', element: <Navigate to='/login' replace /> },
  ])
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className='flex min-h-screen items-center justify-center'>
            <CircularLoader size='lg' />
          </div>
        }>
        <AppRoutesInner />
      </Suspense>
    </BrowserRouter>
  )
}
