import { Tooltip as ChakraTooltip } from '@chakra-ui/react'
import * as React from 'react'

export interface TooltipProps {
  label: React.ReactNode
  children: React.ReactNode
  isDisabled?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  hasArrow?: boolean
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (props, ref) => {
    const {
      label,
      children,
      isDisabled,
      placement = 'top',
      hasArrow = true,
      ...rest
    } = props

    if (isDisabled)
      return children

    return (
      <ChakraTooltip
        label={label}
        placement={placement}
        hasArrow={hasArrow}
        isDisabled={isDisabled}
        {...rest}
      >
        {children}
      </ChakraTooltip>
    )
  },
)
