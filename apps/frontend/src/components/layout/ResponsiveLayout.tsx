'use client'

import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from './Navbar'
import FormTitle from './Title'

interface ResponsiveLayoutProps {
  children: React.ReactNode
  title?: string
  showFormTitle?: boolean
  formTitleColor?: string
  layout?: 'default' | 'fullscreen' | 'split' | 'centered'
  showMobileNav?: boolean
}

export function ResponsiveLayout({
  children,
  title,
  showFormTitle = false,
  formTitleColor = 'color.chaletGreen',
  layout = 'default',
  showMobileNav = true,
}: ResponsiveLayoutProps) {
  const getLayoutStyles = () => {
    switch (layout) {
      case 'fullscreen':
        return {
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
        }
      case 'split':
        return {
          width: '100vw',
          height: '100vh',
          flexDirection: 'row' as const,
        }
      case 'centered':
        return {
          width: '100vw',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }
      default:
        return {
          width: '100vw',
          height: '100vh',
          flexDirection: 'column' as const,
          overflow: 'hidden',
        }
    }
  }

  return (
    <Flex {...getLayoutStyles()}>
      {/* Contenu principal */}
      <Flex
        flex={1}
        width="100%"
        overflow="auto"
        flexDirection="column"
      >
        {/* Titre de page (desktop seulement) */}
        {showFormTitle && title && (
          <Box
            display={{ base: 'none', lg: 'block' }}
            py={6}
            px={8}
          >
            <FormTitle text={title} fontColor={formTitleColor} />
          </Box>
        )}

        {/* Contenu de la page */}
        <Box
          flex={1}
          px={{ base: 4, lg: 8 }}
          py={{ base: 4, lg: 6 }}
        >
          {children}
        </Box>
      </Flex>

      {/* Navigation mobile (bottom) */}
      {showMobileNav && (
        <Box
          display={{ base: 'block', lg: 'none' }}
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          zIndex={10}
        >
          <Navbar />
        </Box>
      )}
    </Flex>
  )
}
