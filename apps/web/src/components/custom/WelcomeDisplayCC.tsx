import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const WelcomeDisplay = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Box
			width="full"
			height="full"
			bgColor="color.chaletGreen"
			display="flex"
			flexDirection="column"
			color="color.white"
			justifyContent="center"
			alignItems="center"
		>
			<Box>
				<Heading
					fontSize={{
						sm: '8.75rem',
						'2xl': '30rem',
					}}
					fontWeight="bold"
				>
					{t('appTitle')}
				</Heading>
				<Flex
					marginTop={{
						sm: '2rem',
						'2xl': '15rem',
					}}
					justifyContent="space-between"
					alignItems="center"
				>
					<Text
						fontSize={{
							sm: '1rem',
							'2xl': '3rem',
						}}
						fontWeight="bold"
						marginLeft="1rem"
						lineHeight="2.25rem"
					>
						{t('create')}
					</Text>
					<Text
						fontSize={{
							sm: '1rem',
							'2xl': '3rem',
						}}
						fontWeight="bold"
						marginRight="1rem"
						lineHeight="2.25rem"
					>
						{t('login')}
					</Text>
				</Flex>
			</Box>
		</Box>
	);
};

export default WelcomeDisplay;
