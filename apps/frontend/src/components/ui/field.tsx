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
  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{label}</FormLabel>
      {children}
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  )
})

Field.displayName = 'Field'
