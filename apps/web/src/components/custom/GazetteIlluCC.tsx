import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const GazetteIlluCC = () => {
	const { t } = useTranslation();
	return (
		<Box
			width="50%"
			height="100%"
			bgColor="#606C38"
			display="flex"
			color="#ffffff"
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
	);
};

export default GazetteIlluCC;
