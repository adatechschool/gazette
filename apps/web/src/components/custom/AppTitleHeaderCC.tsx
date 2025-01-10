import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const AppTitleHeaderCC = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Heading color="color.chaletGreen" fontSize="5rem">
			{t('appTitle')}
		</Heading>
	);
};

export default AppTitleHeaderCC;
