export type ValidationResult = {
  valid: boolean
  error: string
}

export function validateEmail(value: string): ValidationResult {
  if (value.trim().length === 0) {
    return { valid: false, error: 'Enter your email' }
  }

  if (!value.includes('@')) {
    return { valid: false, error: "Email must contain '@'" }
  }

  const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(value)) {
    return { valid: false, error: 'Enter a valid email address' }
  }

  return { valid: true, error: '' }
}

export function validatePassword(value: string): ValidationResult {
  if (value.trim().length === 0) {
    return { valid: false, error: 'Enter your password' }
  }

  if (value.length < 6) {
    return { valid: false, error: 'Password must be at least 6 characters' }
  }

  return { valid: true, error: '' }
}

export function validateName(value: string): ValidationResult {
  if (value.trim().length === 0) {
    return { valid: false, error: 'Enter your name' }
  }

  if (value.trim().length < 3) {
    return { valid: false, error: 'Name should be at least 3 characters' }
  }

  return { valid: true, error: '' }
}
