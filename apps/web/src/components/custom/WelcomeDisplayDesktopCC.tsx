import { Box, Text } from '@chakra-ui/react';

const WelcomeDisplayDesktop = () => {
	return (
		<Box
			width="100%"
			height="100%"
			bgColor="#606C38"
			display="flex"
			color="#ffffff"
			justifyContent="center"
			alignItems="center"
		>
			<Text fontSize="30rem" fontWeight="bold" fontFamily="Staatliches">
				GAZETTE
			</Text>
		</Box>
	);
};

export default WelcomeDisplayDesktop;
