'use client'

import type { BoxProps, IconButtonProps } from '@chakra-ui/react'
import type { ColorModeProviderProps } from './color-mode-utils'
import { Box, IconButton } from '@chakra-ui/react'
import { ThemeProvider } from 'next-themes'
import * as React from 'react'
import { LuMoon, LuSun } from 'react-icons/lu'
import { useColorMode } from './color-mode-utils'

export function ColorModeProvider(props: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
  )
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode()
  return colorMode === 'dark' ? <LuMoon /> : <LuSun />
}

interface ColorModeButtonProps extends Omit<IconButtonProps, 'aria-label'> {}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  ColorModeButtonProps
>((props, ref) => {
  const { toggleColorMode } = useColorMode()
  return (
    <Box display="inline-block">
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        icon={<ColorModeIcon />}
      />
    </Box>
  )
})

export const LightMode = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return (
      <Box
        color="gray.900"
        display="contents"
        className="chakra-theme light"
        ref={ref}
        {...props}
      />
    )
  },
)

export const DarkMode = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return (
      <Box
        color="gray.100"
        display="contents"
        className="chakra-theme dark"
        ref={ref}
        {...props}
      />
    )
  },
)
