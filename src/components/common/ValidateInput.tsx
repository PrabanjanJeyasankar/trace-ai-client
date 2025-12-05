import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { ShakeContainer } from './ShakeContainer'

type ValidatedInputProps = {
  id: string
  label: string
  type?: string
  value: string
  error: string
  placeholder?: string
  onChange: (value: string) => void
}

export function ValidatedInput({
  id,
  label,
  type = 'text',
  value,
  error,
  placeholder,
  onChange,
}: ValidatedInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>

      <div className='relative'>
        <ShakeContainer active={!!error}>
          <Input
            id={id}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              error &&
                'border-destructive bg-destructive/10 focus:border-destructive/60 focus:ring-destructive/40'
            )}
          />
        </ShakeContainer>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className='absolute left-0 top-full mt-1 text-sm text-destructive'>
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Field>
  )
}
