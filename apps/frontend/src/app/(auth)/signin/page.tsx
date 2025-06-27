'use client'

import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import FormSignUp from '@/components/custom/FormSignUp'
import Title from '@/components/layout/Title'

export default function SigninPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="100%"
      padding="2rem"
    >
      <Title text={t('signIn')} fontColor="color.chaletGreen" />
      <FormSignUp />
    </Flex>
  )
}
