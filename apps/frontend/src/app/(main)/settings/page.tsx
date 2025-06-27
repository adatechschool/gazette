'use client'

import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import SettingsMenu from '@/components/custom/SettingsMenu'
import Title from '@/components/layout/Title'

export default function SettingsPage() {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
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
      <Title text={t('account')} fontColor="color.chaletGreen" />
      <SettingsMenu />
    </Flex>

  )
}
