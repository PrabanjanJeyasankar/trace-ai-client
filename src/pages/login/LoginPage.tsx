// src/pages/login/LoginPage.tsx

import { AuthLayout } from '@/layouts/AuthLayout'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title='Welcome back'
      description='Sign in to continue.'>
      <LoginForm />
    </AuthLayout>
  )
}
