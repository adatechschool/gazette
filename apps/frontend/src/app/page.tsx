'use client'

// Import critical components directly to avoid render blocking
import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { memo } from 'react'

import { useTranslation } from 'react-i18next'

// Load Title immediately to avoid render blocking
import Title from '@/components/layout/Title'

// Lazy load non-critical components
const FormLogin = dynamic(() => import('@/components/custom/FormLogin'), {
  ssr: true,
  loading: () => <div>Loading form...</div>,
})

const GazetteIllu = dynamic(() => import('@/components/custom/GazetteIllu'), {
  ssr: true,
  loading: () => <div>Loading...</div>,
})

const LoginPage = memo(() => {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  // Pre-calculate text to avoid re-renders
  const loginText = t('login')

  return (
    <Flex
      alignItems="center"
      width="100%"
      height="100vh"
      minHeight="100vh"
    >
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        minWidth="50%"
      >
        <GazetteIllu />
      </Flex>
      <Flex
        flex="1"
        direction="column"
        alignItems="center"
        justifyContent="center"
        minWidth="50%"
        gap={6}
      >
        <Title text={loginText} fontColor="chaletGreen" />
        <FormLogin />
      </Flex>
    </Flex>
  )
})

export default LoginPage
