import { lazy } from 'react'
import { type RouteObject } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoutes'

const ChatPage = lazy(() => import('@/pages/chat/ChatPage'))

export const privateRoutes: RouteObject[] = [
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/chat', element: <ChatPage /> },
      { path: '/chat/:chatId', element: <ChatPage /> },
    ],
  },
]
