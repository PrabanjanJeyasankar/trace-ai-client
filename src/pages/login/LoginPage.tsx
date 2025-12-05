// src/pages/login/LoginPage.tsx

import { AuthLayout } from '@/layouts/AuthLayout'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <AuthLayout
      title='Welcome back'
      description={
        <>
          Don't have an account? <a href='/signup'>Create one</a>
        </>
      }>
      <LoginForm />
    </AuthLayout>
  )
}
