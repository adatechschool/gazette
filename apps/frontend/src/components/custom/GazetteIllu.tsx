import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function GazetteIllu() {
  const { t } = useTranslation()
  return (
    <Box
      width="50vw"
      height="100vh"
      bgColor="color.chaletGreen"
      display="flex"
      color="color.white"
      justifyContent="center"
      alignItems="center"
    >
      <Flex flexDirection="column">
        <Text
          fontSize="10rem"
          fontWeight="bold"
          fontFamily="Staatliches"
          lineHeight="18rem"
        >
          {t('navigateApp.appTitle')}
        </Text>
        <Text
          fontSize="10rem"
          fontWeight="bold"
          fontFamily="Staatliches"
          lineHeight="18rem"
        >
          {t('navigateApp.appTitle')}
        </Text>
        <Text
          fontSize="10rem"
          fontWeight="bold"
          fontFamily="Staatliches"
          lineHeight="18rem"
        >
          {t('navigateApp.appTitle')}
        </Text>
      </Flex>
    </Box>
  )
}

export default GazetteIllu
