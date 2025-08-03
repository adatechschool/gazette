'use client'

import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { memo } from 'react'

interface FieldProps {
  label: string
  children: React.ReactNode
  isInvalid?: boolean
  errorText?: string
}

export const Field = memo(({ label, children, isInvalid, errorText }: FieldProps) => {
  const fieldId = label?.toLowerCase().replace(/\s+/g, '-') || 'field'
  const errorId = `${fieldId}-error`

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel htmlFor={fieldId}>{label}</FormLabel>
      {children}
      {errorText && (
        <FormErrorMessage id={errorId} role="alert">
          {errorText}
        </FormErrorMessage>
      )}
    </FormControl>
  )
})

Field.displayName = 'Field'
