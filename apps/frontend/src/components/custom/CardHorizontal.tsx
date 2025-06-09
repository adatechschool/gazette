import { Box, Card, CardBody, CardFooter, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { LockKeyhole } from 'lucide-react'

interface CardHorizontalCCProps {
  photo: string
  date: string
  cardTitle: string
  cardDescription: string
  media: string
  medium: string
}

function CardHorizontal({
  photo,
  date,
  cardTitle,
  cardDescription,
  media,
  medium,
}: CardHorizontalCCProps) {
  return (
    <Card flexDirection="row" overflow="hidden" maxW="xl" position="relative">
      <Image
        shadow="sm"
        objectFit="cover"
        maxW="200px"
        src={photo}
        alt="image article"
      />
      <Box flex="1">
        <CardBody>
          <Heading size="md" mb="2">{cardTitle}</Heading>

          <Text position="absolute" top="2" right="2" fontSize="sm">
            {date}
          </Text>

          <Text color="gray.600">{cardDescription}</Text>
        </CardBody>
        <CardFooter>
          <HStack mt="12">
            <Text>
              {medium}
              {' '}
              -
              {' '}
              {media}
            </Text>
            <LockKeyhole />
          </HStack>
        </CardFooter>
      </Box>
    </Card>
  )
}

export default CardHorizontal

// {/* <CardHorizontal
// photo="https://pbs.twimg.com/profile_images/1441069207593095175/Yzn8Q2Sn_400x400.jpg"
// date="22/11/2024"
// cardTitle="The substance » : d’injonctions en injections,..."
// cardDescription="Le film de Coralie Fargeat, dans ses outrances parfaitement assumées, s’avère aussi stimulant qu’irritant. Irritant parce que long, répétitif et ..."
// media="Blast"
// medium="Article presse"

// /> */}
