import { Flex, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import AppTitleHeaderCC from '@/components/custom/AppTitle'
import FormLogin from '@/components/custom/FormLogin'
import FormTitle from '@/components/custom/FormTitle'
import GazetteIllu from '@/components/custom/GazetteIllu'
import Layout from '@/components/custom/Layout'

function Login() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Layout>
      {isMobile
        ? (
            <Flex
              flexDirection="column"
              marginLeft="1rem"
              marginTop="2rem"
              gap="6"
              alignContent="center"
              justifyContent="center"
              alignItems="center"
            >
              <AppTitleHeaderCC />
              <FormTitle text={t('login')} fontColor="color.black" />
              <FormLogin />
            </Flex>
          )
        : (
            <Flex>
              <GazetteIllu />
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width="50vw"
              >
                <FormTitle text={t('login')} fontColor="color.chaletGreen" />
                <FormLogin />
              </Flex>
            </Flex>
          )}
    </Layout>
  )
}

export default Login
