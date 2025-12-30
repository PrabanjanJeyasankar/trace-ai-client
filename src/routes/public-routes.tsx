// src/routes/public-routes.tsx

import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'

const LoginPage = lazy(() => import('@/pages/login/LoginPage'))

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
    ],
  },
]
