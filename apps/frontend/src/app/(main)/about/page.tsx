'use client'

import { Text, VStack } from '@chakra-ui/react'
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout'
import { useTranslation } from 'react-i18next'

function AboutPageContent() {
  const { t } = useTranslation('common', {
    keyPrefix: 'about',
  })

  return (
    <ResponsiveLayout>
      <VStack
        spacing={{ base: '24px', md: '32px', lg: '40px' }}
        alignItems="center"
        justifyContent="justify"
        width="100%"
        minHeight="60vh"
      >
        <Text fontSize="2xl" fontWeight="bold">
          {t('title')}
        </Text>
        <Text fontSize="xl" fontWeight="bold">
          {t('description')}
        </Text>
        <Text fontSize="large" fontWeight="bold">
          {t('mission')}
        </Text>
        <Text fontSize="large" fontWeight="bold">
          {t('dataPrivacy')}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {t('contact')}
        </Text>
      </VStack>
    </ResponsiveLayout>
  )
}

export default function AboutPage() {
  return <AboutPageContent />
}
