import { Box, Text, useBreakpointValue } from '@chakra-ui/react'
import { Compass, Home, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

function Navbar() {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

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

  return (
    <Box
      display="flex"
      position="fixed"
      bg="white"
      py={3}
      px={2}
      {...navbarStyles}
    >
      <Link href="/">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-2px)' }}
          gap={spacing}
          mx={2}
        >
          <Home size={iconSize} />
          <Text
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontWeight="semibold"
            fontSize={fontSize}
            display={{ base: 'none', sm: 'block' }}
          >
            {t('home')}
          </Text>
        </Box>
      </Link>

      <Link href="/explore">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-2px)' }}
          gap={spacing}
          mx={2}
        >
          <Compass size={iconSize} />
          <Text
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontWeight="semibold"
            fontSize={fontSize}
            display={{ base: 'none', sm: 'block' }}
          >
            {t('explore')}
          </Text>
        </Box>
      </Link>

      <Link href="/settings">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          transition="transform 0.2s"
          _hover={{ transform: 'translateY(-2px)' }}
          gap={spacing}
          mx={2}
        >
          <User size={iconSize} />
          <Text
            fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
            fontWeight="semibold"
            fontSize={fontSize}
            display={{ base: 'none', sm: 'block' }}
          >
            {t('account')}
          </Text>
        </Box>
      </Link>
    </Box>
  )
}

export default Navbar
