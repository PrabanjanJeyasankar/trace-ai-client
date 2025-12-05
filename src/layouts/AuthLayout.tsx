// src/layouts/AuthLayout.tsx

import { Logo } from '@/components/Logo'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

export type AuthLayoutProps = {
  title: string
  description: ReactNode
  children: ReactNode
  className?: string
}

export function AuthLayout({
  title,
  description,
  children,
  className,
}: AuthLayoutProps) {
  return (
    <div
      className={cn(
        'bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10',
        className
      )}>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col items-center gap-2 text-center mb-6'>
          <a href='#' className='flex flex-col items-center gap-2 font-medium'>
            <div className='flex size-8 items-center justify-center rounded-md'>
              <Logo />
            </div>
            <span className='sr-only'>AI Chat.</span>
          </a>

          <h1 className='text-xl font-bold'>{title}</h1>

          <div className='text-sm text-muted-foreground'>{description}</div>
        </div>

        {children}
      </div>
    </div>
  )
}
