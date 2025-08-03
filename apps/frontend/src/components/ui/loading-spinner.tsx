'use client'

import { Box, Spinner } from '@chakra-ui/react'
import { memo } from 'react'

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  color?: string
  fullScreen?: boolean
}

const LoadingSpinner = memo(({
  size = 'md',
  color = 'chaletGreen',
  fullScreen = false,
}: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        position="absolute"
        top={0}
        left={0}
        zIndex={9999}
        backgroundColor="rgba(255, 255, 255, 0.9)"
        backdropFilter="blur(2px)"
        transform="translateZ(0)"
        willChange="transform"
        role="status"
        aria-label="Chargement en cours"
      >
        <Spinner
          size={size}
          color={color}
          thickness="3px"
          speed="0.8s"
          aria-label="Indicateur de chargement"
        />
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      minHeight="100px"
    >
      <Spinner
        size={size}
        color={color}
        thickness="3px"
        speed="0.8s"
      />
    </Box>
  )
})

LoadingSpinner.displayName = 'LoadingSpinner'

export default LoadingSpinner
