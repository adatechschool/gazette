import type { BoxProps } from '@chakra-ui/react'
import { InputGroup as ChakraInputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import * as React from 'react'

export interface InputGroupProps extends BoxProps {
  startElement?: React.ReactNode
  endElement?: React.ReactNode
  children: React.ReactElement
}

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (props, ref) => {
    const {
      startElement,
      endElement,
      children,
      ...rest
    } = props

    const child = React.Children.only<React.ReactElement>(children)

    return (
      <ChakraInputGroup ref={ref} {...rest}>
        {startElement && (
          <InputLeftElement pointerEvents="none">
            {startElement}
          </InputLeftElement>
        )}
        {React.cloneElement(child, {
          ...(startElement && { pl: '10' }),
          ...(endElement && { pr: '10' }),
          ...(child.props as Record<string, unknown>),
        })}
        {endElement && (
          <InputRightElement>
            {endElement}
          </InputRightElement>
        )}
      </ChakraInputGroup>
    )
  },
)
