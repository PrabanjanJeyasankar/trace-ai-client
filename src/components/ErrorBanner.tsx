import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

type ErrorBannerProps = {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className='w-full flex justify-center items-center gap-2 text-center rounded-md bg-destructive/15 border border-destructive text-destructive px-3 py-2 text-sm mb-2'>
          <AlertTriangle size={16} className='mt-0.5' />

          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
