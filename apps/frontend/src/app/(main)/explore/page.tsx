'use client'

import { Text as ChakraText, Flex, Link } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useAuth } from '@/hooks/useAuth'

export default function ExplorePage() {
  const { t: tAccount } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { t: tNav } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const { user, loading, logout } = useAuth()

  if (loading) {
    return (
      <ResponsiveLayout>
        <Flex justify="center" align="center" height="100vh">
          <ChakraText>Chargement...</ChakraText>
        </Flex>
      </ResponsiveLayout>
    )
  }

  if (!user) {
    return (
      <ResponsiveLayout>
        <Flex justify="center" align="center" height="100vh">
          <ChakraText color="red.500">
            Utilisateur non connecté
          </ChakraText>
        </Flex>
      </ResponsiveLayout>
    )
  }

  return (
    <ResponsiveLayout
      title={tNav('explore')}
      showFormTitle={true}
    >
      {/* Contenu spécifique à la page */}
      <Flex direction="column" align="center" gap={4}>
        <ChakraText
          fontSize={{ base: 'xl', lg: '2xl' }}
          fontWeight="bold"
        >
          {`Bienvenue ${user.pseudo || user.email || 'Utilisateur'}`}
        </ChakraText>

        <Link
          href="/"
          fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
          fontSize={{ base: '1rem', lg: '2rem' }}
          onClick={logout}
          _hover={{ textDecoration: 'underline' }}
        >
          {tAccount('logout')}
        </Link>
      </Flex>
    </ResponsiveLayout>
  )
}
