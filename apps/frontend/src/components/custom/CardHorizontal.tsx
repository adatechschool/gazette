import { Box, Card, CardBody, CardFooter, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { LockKeyhole } from 'lucide-react'
import type { CardHorizontalProps } from '@gazette/shared'

function CardHorizontal({
  photo,
  date,
  cardTitle,
  cardDescription,
  media,
  medium,
  sourceUrl
}: CardHorizontalProps) {
  const handleCardClick = () => {
    if (sourceUrl) {
      window.open(sourceUrl, '_blank')
    }
  }
  
  return (
    <Card 
      flexDirection="row" 
      overflow="hidden" 
      maxW="xl" 
      position="relative"
      cursor={sourceUrl ? "pointer" : "default"}
      onClick={handleCardClick}
      _hover={sourceUrl ? { shadow: "lg", transform: "translateY(-1px)"  } : {}}
      transition="all 0.2s"
      >
      <Image
        shadow="sm"
        objectFit="cover"
        maxW="200px"
        src={photo}
        alt="image article"
        fallbackSrc="https://via.placeholder.com/200x150?text=Image+non+disponible"
      />
      <Box flex="1">
        <CardBody>
          <Heading size="md" mb="2" noOfLines={2}>{cardTitle}</Heading>

          <Text position="absolute" top="2" right="2" fontSize="sm">
            {date}
          </Text>

          <Text color="gray.600" noOfLines={3}>{cardDescription}</Text>
        </CardBody>
        <CardFooter>
          <HStack mt="12">
            <Text>
              {medium} - {media}
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
