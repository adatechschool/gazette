import { useBreakpointValue } from '@chakra-ui/react'

// Design tokens responsives centralisés
export function useResponsiveTokens() {
  const iconSize = useBreakpointValue({
    base: '1.5rem',
    sm: '1.75rem',
    md: '2rem',
    lg: '2.25rem',
  })

  const fontSize = useBreakpointValue({
    base: '0.875rem',
    sm: '0.9375rem',
    md: '1rem',
    lg: '2.125rem',
  })

  const spacing = useBreakpointValue({
    base: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '0.25rem',
  })

  const navbarStyles = useBreakpointValue({
    base: {
      bottom: 0,
      top: 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      flexDirection: 'row' as const,
      justifyContent: 'space-around',
      borderRadius: '0',
      marginBottom: 5,
    },
    lg: {
      top: 0,
      bottom: 'auto',
      right: 0,
      left: 'auto',
      transform: 'none',
      width: '50%',
      flexDirection: 'row' as const,
      justifyContent: 'space-around',
      color: 'color.chaletGreen',
    },
  })

  const titleFontSize = useBreakpointValue({
    base: '2rem',
    sm: '3rem',
    md: '5rem',
    lg: '7rem',
  })

  return {
    iconSize,
    fontSize,
    spacing,
    navbarStyles,
    titleFontSize,
  }
}
