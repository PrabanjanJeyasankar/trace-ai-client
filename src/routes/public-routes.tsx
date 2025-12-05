// src/routes/public-routes.tsx

import { type RouteObject } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'

import LoginPage from '@/pages/login/LoginPage'
import SignupPage from '@/pages/signup/SignupPage'

export const publicRoutes: RouteObject[] = [
  {
    element: <PublicRoute />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
    ],
  },
]
