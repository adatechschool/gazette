import type { UserProfileDto } from '@gazette/shared'
import { Text as ChakraText, Flex, Link, useBreakpointValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppTitle from '@/components/custom/AppTitle'
import FormTitle from '@/components/custom/FormTitle'
import HeaderMobile from '@/components/custom/HeaderMobile'
import Layout from '@/components/custom/Layout'
import Navbar from '@/components/custom/Navbar'
import CardHorizontal from '@/components/custom/CardHorizontal'
import { getUserProfile } from '@/services/api'
import { getMockRSSData } from '@/data/mockRSSData'
import type { RSSItem } from '@gazette/shared'

function Explore() {
  const { t: tAccount } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const { t: tNav } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const [user, setUser] = useState<UserProfileDto['user'] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [rssItems, setRssItems] = useState<RSSItem[]>([])
  const [isLoadingRSS, setIsLoadingRSS] = useState(true)
  const [rssError, setRssError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true)
        const response = await getUserProfile()
        setUser(response.user)
        setError(null)
      }
      catch (error) {
        console.error('Erreur lors de la récupération du profil:', error)
        setError('Impossible de récupérer les informations du profil')
      }
      finally {
        setIsLoading(false)
      }
    }

    const fetchRSSData = async () => {
      try {
        setIsLoadingRSS(true)
        const data = await getMockRSSData()
        setRssItems(data)
        setRssError(null)
      } catch (error) {
        console.error('Erreur lors de la récupération des données RSS:', error)
        setRssError('Impossible de récupérer les articles')
      } finally {
        setIsLoadingRSS(false)
      }
    }

    fetchUserProfile()
    fetchRSSData()
  }, [])

  const isMobile = useBreakpointValue({ base: true, lg: false })

  if (isLoading) {
    <Layout>
      <Flex justify="center" align="center" height="100vh">
        <ChakraText>Chargement...</ChakraText>
      </Flex>
    </Layout>
  }

  if (error) {
    <Layout>
      <Flex justify="center" align="center" height="100vh">
        <ChakraText color="red.500">
          Erreur:
          {error}
        </ChakraText>
      </Flex>
    </Layout>
  }

  return (
<Layout>
      {isMobile ? (
        <div>
          <HeaderMobile text={tNav('explore')} />
          <Navbar />
          
          {/* Section d'accueil utilisateur */}
          {user && (
            <Flex padding={4} justify="center">
              <ChakraText fontSize="lg" fontWeight="medium">
                Bienvenue {user.pseudo || user.email || 'Utilisateur'} !
              </ChakraText>
            </Flex>
          )}

          {/* Articles RSS */}
          <Flex padding={4} flexDirection="column" gap={4}>
            <ChakraText fontSize="xl" fontWeight="bold" color="color.chaletGreen">
              Articles du jour
            </ChakraText>
            
            {isLoadingRSS ? (
              <ChakraText>Chargement des articles...</ChakraText>
            ) : rssError ? (
              <ChakraText color="red.500">Erreur: {rssError}</ChakraText>
            ) : rssItems.length > 0 ? (
              <Flex flexDirection="column" gap={4}>
                {rssItems.map((item) => (
                  <CardHorizontal 
                    key={item.id}
                    photo={item.imageUrl || ''}
                    date={item.date}
                    cardTitle={item.title}
                    cardDescription={item.description}
                    media={item.media}
                    medium={item.medium}
                    sourceUrl={item.sourceUrl}
                  />
                ))}
              </Flex>
            ) : (
              <ChakraText>Aucun article disponible</ChakraText>
            )}
          </Flex>

          {/* Lien de déconnexion */}
          <Flex padding={4} justify="center">
            <Link
              href="/"
              fontFamily="Poppins"
              fontSize="1rem"
              color="red.500"
            >
              {tAccount('logout')}
            </Link>
          </Flex>
        </div>
      ) : (
        <Flex
          width="100%"
          height="100%"
          gap={10}
          padding={10}
          flexDirection="column"
        >
          <Flex width="100%" height="10%" gap={10} flexDirection="row">
            <AppTitle />
            <Navbar />
          </Flex>
          
          <Flex
            width="100%"
            height="90%"
            gap={10}
            justifyContent="flex-start"
            padding={10}
            flexDirection="column"
          >
            <FormTitle text={tNav('explore')} fontColor="color.chaletGreen" />
            
            {user && (
              <ChakraText fontSize="xl" fontWeight="medium">
                Bienvenue {user.pseudo || user.email || 'Utilisateur'} !
              </ChakraText>
            )}

            {/* Articles RSS en grille */}
            {isLoadingRSS ? (
              <ChakraText>Chargement des articles...</ChakraText>
            ) : rssError ? (
              <ChakraText color="red.500">Erreur: {rssError}</ChakraText>
            ) : rssItems.length > 0 ? (
              <Flex flexDirection="column" gap={6} maxW="4xl">
                {rssItems.map((item) => (
                  <CardHorizontal 
                    key={item.id}
                    photo={item.imageUrl || ''}
                    date={item.date}
                    cardTitle={item.title}
                    cardDescription={item.description}
                    media={item.media}
                    medium={item.medium}
                    sourceUrl={item.sourceUrl}
                  />
                ))}
              </Flex>
            ) : (
              <ChakraText>Aucun article disponible</ChakraText>
            )}

            <Link
              href="/"
              fontFamily="Staatliches"
              fontSize="2rem"
              color="red.500"
              alignSelf="center"
              mt="auto"
            >
              {tAccount('logout')}
            </Link>
          </Flex>
        </Flex>
      )}
    </Layout>
  )
}

export default Explore
