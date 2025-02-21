'use client'
import { Box, Card, HStack, Image, Text } from '@chakra-ui/react';
import { LockKeyhole } from 'lucide-react';

type CardHorizontalCCProps = {
	photo?: string;
	date: string;
	cardTitle: string;
	cardDescription: string;
	media?: string;
	medium?: string;
};

const CardHorizontalCC = ({
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

export default CardHorizontalCC;
