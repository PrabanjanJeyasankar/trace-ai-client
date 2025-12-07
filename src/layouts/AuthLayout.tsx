import { Logo } from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { useThemeStore } from '@/components/ui/theme-provider'
import { cn } from '@/lib/utils'
import { Moon, Sun } from 'lucide-react'
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
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div
      className={cn(
        'bg-background min-h-svh flex items-center justify-center p-6 relative',
        className
      )}>
      <Button
        variant='ghost'
        size='icon'
        onClick={toggleTheme}
        className='absolute top-4 right-4'>
        {theme === 'dark' ? (
          <Sun className='h-5 w-5' />
        ) : (
          <Moon className='h-5 w-5' />
        )}
      </Button>

      <div className='w-full max-w-sm flex flex-col'>
        <div className='flex flex-col items-center text-center mb-6 gap-2'>
          <a href='#' className='flex flex-col items-center gap-2 font-medium'>
            <div className='flex size-8 items-center justify-center rounded-md'>
              <Logo />
            </div>
            <span className='sr-only'>AI Chat.</span>
          </a>

          <h1 className='text-xl font-bold'>{title}</h1>
          <div className='text-sm text-muted-foreground'>{description}</div>
        </div>

        <div className='flex-1 overflow-visible'>{children}</div>
      </div>
    </div>
  )
}
