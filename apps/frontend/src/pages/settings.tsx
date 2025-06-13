import { Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FormTitle from '@/components/custom/FormTitle'
import GazetteIllu from '@/components/custom/GazetteIllu'
import HeaderMobile from '@/components/custom/HeaderMobile'
import Layout from '@/components/custom/Layout'
import Navbar from '@/components/custom/Navbar'
import SettingsMenu from '@/components/custom/SettingsMenu'

function Settings() {
  const { t } = useTranslation('common', {
    keyPrefix: 'navigateApp',
  })

  const isMobile = useBreakpointValue({ base: true, lg: false })
  return (
    <Layout>
      {isMobile
        ? (
            <Flex flexDirection="column">
              <HeaderMobile text={t('account')} />
              <Navbar />
              <SettingsMenu />
            </Flex>
          )
        : (
            <Flex flexDirection="row">
              <GazetteIllu />
              <Flex
                flexDirection="column"
                width="50vw"
                height="100%"
                gap={10}
                alignItems="center"
              >
                <Navbar />
                <Flex
                  flexDirection="column"
                  gap={20}
                  justifyContent="center"
                  alignItems="center"
                  marginTop={10}
                  width="100%"
                  height="100%"
                >
                  <FormTitle text={t('account')} fontColor="color.chaletGreen" />
                  <SettingsMenu />
                </Flex>
              </Flex>
            </Flex>
          )}
    </Layout>
  )
}

export default Settings
