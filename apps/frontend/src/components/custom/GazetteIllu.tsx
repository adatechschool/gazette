'use client'

import { Box, Text } from '@chakra-ui/react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

const GazetteIllu = memo(() => {
  const { t } = useTranslation()

  // Optimisation : pré-calculer le tableau une seule fois et éviter les re-renders
  const textArray = useMemo(() => {
    const appTitle = t('navigateApp.appTitle')
    return Array.from({ length: 3 }, () => appTitle)
  }, [t])

  // Optimisation : pré-calculer les styles pour éviter les recalculs
  const textStyles = useMemo(() => ({
    fontSize: '10rem',
    lineHeight: '10rem',
    fontFamily: 'var(--font-bebas-neue), Bebas Neue',
  }), [])

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
          {...textStyles}
        >
          {text}
        </Text>
      ))}
    </Box>
  )
})

GazetteIllu.displayName = 'GazetteIllu'

export default GazetteIllu
