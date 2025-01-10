import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

// penser à changer le placement selon le breakpoint

const AppTitleHeaderCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Heading color="color.chaletGreen" fontSize="5rem" margin="0.625rem">
			{t('appTitle')}
		</Heading>
	);
};

export default AppTitleHeaderCC;
