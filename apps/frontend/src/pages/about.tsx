import { useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import HeaderMobile from '@/components/custom/HeaderMobile'
import Layout from '@/components/custom/Layout'
import Navbar from '@/components/custom/Navbar'

function About() {
  const { t } = useTranslation('common', {
    keyPrefix: 'accountManagement',
  })

  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Layout>
      {isMobile
        ? (
            <div>
              <HeaderMobile text={t('about')} />
              <Navbar />
            </div>
          )
        : (
            <p>About</p>
          )}
    </Layout>
  )
}

export default About
