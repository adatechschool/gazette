'use client'

// Import critical components directly to avoid render blocking
import { Flex } from '@chakra-ui/react'
import { memo } from 'react'

import { useTranslation } from 'react-i18next'

// Import critical components directly
import FormLogin from '@/components/custom/FormLogin'

import GazetteIllu from '@/components/custom/GazetteIllu'
// Load Title immediately to avoid render blocking

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
        <h1
          style={{
            fontFamily: 'var(--font-bebas-neue), Bebas Neue, sans-serif',
            fontSize: '6rem',
            color: '#606c38',
            margin: 0,
            padding: 0,
            textAlign: 'center',
          }}
        >
          {loginText}
        </h1>
        <FormLogin />
      </Flex>
    </Flex>
  )
})

export default LoginPage
