'use client'

import type { BoxProps, ButtonProps, InputProps } from '@chakra-ui/react'
import {
  Box,
  HStack,
  IconButton,
  Input,
  Stack,
  useControllableState,
} from '@chakra-ui/react'
import * as React from 'react'
import { LuEye, LuEyeOff } from 'react-icons/lu'
import { InputGroup } from '@/components/ui/input-group'

export interface PasswordVisibilityProps {
  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  visibilityIcon?: { on: React.ReactNode, off: React.ReactNode }
}

export interface PasswordInputProps extends InputProps, PasswordVisibilityProps {
  rootProps?: BoxProps
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const {
      rootProps,
      defaultVisible,
      visible: visibleProp,
      onVisibleChange,
      visibilityIcon = { on: <LuEye />, off: <LuEyeOff /> },
      ...rest
    } = props

    const [visible, setVisible] = useControllableState({
      value: visibleProp,
      defaultValue: defaultVisible || false,
      onChange: onVisibleChange,
    })

    return (
      <InputGroup
        endElement={(
          <VisibilityTrigger
            isDisabled={rest.isDisabled}
            onClick={() => {
              if (rest.isDisabled)
                return
              setVisible(!visible)
            }}
          >
            {visible ? visibilityIcon.off : visibilityIcon.on}
          </VisibilityTrigger>
        )}
        {...rootProps}
      >
        <Input
          {...rest}
          ref={ref}
          type={visible ? 'text' : 'password'}
        />
      </InputGroup>
    )
  },
)

const VisibilityTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <IconButton
        tabIndex={-1}
        ref={ref}
        mr="-2"
        size="sm"
        variant="ghost"
        height="calc(100% - 8px)"
        aria-label="Toggle password visibility"
        {...props}
      />
    )
  },
)

interface PasswordStrengthMeterProps extends BoxProps {
  max?: number
  value: number
}

export const PasswordStrengthMeter = React.forwardRef<HTMLDivElement, PasswordStrengthMeterProps>(
  (props, ref) => {
    const { max = 4, value, ...rest } = props

    const percent = (value / max) * 100
    const { label, color } = getColor(percent)

    return (
      <Stack align="flex-end" spacing="1" ref={ref} {...rest}>
        <HStack width="full">
          {Array.from({ length: max }).map((_, index) => (
            <Box
              key={index}
              height="1"
              flex="1"
              rounded="sm"
              bg={index < value ? color : 'gray.200'}
            />
          ))}
        </HStack>
        {label && <HStack fontSize="xs">{label}</HStack>}
      </Stack>
    )
  },
)

function getColor(percent: number) {
  switch (true) {
    case percent < 33:
      return { label: 'Low', color: 'red.500' }
    case percent < 66:
      return { label: 'Medium', color: 'orange.500' }
    default:
      return { label: 'High', color: 'green.500' }
  }
}
