import { Heading } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function TitleMenuDesktopCC() {
  const { t } = useTranslation()
  return (
    <Heading
      fontFamily="Staatliches"
      color="color.chaletGreen"
      fontSize="3.75rem"
    >
      {t('navigateApp.menu')}
    </Heading>
  )
}

export default TitleMenuDesktopCC
