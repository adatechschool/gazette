'use client'

import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'
import GazetteIllu from '@/components/custom/GazetteIllu'
import Title from '@/components/layout/Title'

export default function SigninPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

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
        <Title text={t('signIn')} fontColor="chaletGreen" />
        <FormSignUp />
      </Flex>
    </Flex>
  )
}
