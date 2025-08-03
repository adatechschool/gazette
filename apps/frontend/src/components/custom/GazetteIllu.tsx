'use client'

import { Box, Text } from '@chakra-ui/react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const GazetteIllu = memo(() => {
  const { t } = useTranslation()

  // Optimisation : pré-calculer le tableau une seule fois
  const textArray = useMemo(() => {
    const appTitle = t('navigateApp.appTitle')
    return Array.from({ length: 3 }, () => appTitle)
  }, [t])

  return (
    <Box
      width="100%"
      height="100%"
      bgColor="chaletGreen"
      display="flex"
      flexDirection="column"
      color="white"
      justifyContent="space-between"
      alignItems="center"
      py="8rem"
    >
      {textArray.map((text, index) => (
        <Text
          key={`${text}-${index}`}
          fontSize="10rem"
          lineHeight="10rem"
          fontFamily="var(--font-bebas-neue), Bebas Neue"
        >
          {text}
        </Text>
      ))}
    </Box>
  )
})

export default GazetteIllu
