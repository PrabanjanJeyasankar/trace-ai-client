import { motion } from 'framer-motion'

type ShakeContainerProps = {
  children: React.ReactNode
  active: boolean
}

export function ShakeContainer({ children, active }: ShakeContainerProps) {
  return (
    <motion.div
      animate={active ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}>
      {children}
    </motion.div>
  )
}
