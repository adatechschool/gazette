import { Button } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function Medias() {
  const { t } = useTranslation()
  return (
    <div>
      <button>Podcast</button>
      <Button colorScheme="teal" size="xs">
        Button
      </Button>
      <button>Video</button>
      <button>Presse</button>
    </div>
  )
}

export default Medias
