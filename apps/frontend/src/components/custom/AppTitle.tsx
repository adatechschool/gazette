import { Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const AppTitle = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Heading color="color.chaletGreen" fontSize="7rem">
			{t('appTitle')}
		</Heading>
	);
};

export default AppTitle;