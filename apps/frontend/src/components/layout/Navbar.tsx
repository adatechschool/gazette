'use client'

import { Box, Text } from '@chakra-ui/react'
import { Compass, Home, User } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useResponsiveTokens } from '../../theme/responsive'

function Navbar() {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const { iconSize, fontSize, spacing, navbarStyles } = useResponsiveTokens()

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
