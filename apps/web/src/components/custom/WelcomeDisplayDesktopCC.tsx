import { Box, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const WelcomeDisplayDesktop = () => {
	const { t } = useTranslation('translation', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Box
			width="100%"
			height="100%"
			bgColor="green.chaletGreen"
			backgroundColor="green.chaletGreen"
			display="flex"
			color="#ffffff"
			justifyContent="center"
			alignItems="center"
		>
			<Text fontSize="30rem" fontWeight="bold" fontFamily="Staatliches">
				{t('appTitle')}
			</Text>
			<Text>{t('create')}</Text>
			<Text>{t('login')}</Text>
		</Box>
	);
};

export default WelcomeDisplayDesktop;
