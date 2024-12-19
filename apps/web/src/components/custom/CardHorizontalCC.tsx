import { Box, Card, HStack, Stack, Image, Text, Icon } from "@chakra-ui/react";
import { LockKeyhole } from "lucide-react";

type CardHorizontalCCProps = {
  photo: string;
  date: string;
  cardTitle: string;
  cardDescription: string;
  media: string;
  medium: string;
};

const CardHorizontal = ({
  photo,
  date,
  cardTitle,
  cardDescription,
  media,
  medium,
}: CardHorizontalCCProps) => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image
      shadow="sm"
      objectFit="cover"
      maxW="200px"
      src={photo}
      alt="image article"
    />
    <Box>
      <Card.Body>
        <Card.Title mb="2"> {cardTitle}</Card.Title>

        <Text position="absolute" top="2" right="2" fontSize="sm">
          {date}
        </Text>

        <Card.Description>{cardDescription}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <HStack mt="12">
          {medium} - {media}
          <LockKeyhole />
        </HStack>
      </Card.Footer>
    </Box>
  </Card.Root>
);

export default CardHorizontal;

// {/* <CardHorizontal
// photo="https://pbs.twimg.com/profile_images/1441069207593095175/Yzn8Q2Sn_400x400.jpg"
// date="22/11/2024"
// cardTitle="The substance » : d’injonctions en injections,..."
// cardDescription="Le film de Coralie Fargeat, dans ses outrances parfaitement assumées, s’avère aussi stimulant qu’irritant. Irritant parce que long, répétitif et ..."
// media="Blast"
// medium="Article presse"

// /> */}
