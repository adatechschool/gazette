import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const WelcomeDisplayDesktop = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});
	return (
		<Box
			width="100%"
			height="100%"
			bgColor="color.chaletGreen"
			display="flex"
			flexDirection="column"
			color="color.white"
			justifyContent="center"
			alignItems="center"
		>
			<Box>
				<Heading fontSize="30rem" fontWeight="bold">
					{t('appTitle')}
				</Heading>
				<Flex
					marginTop="15rem"
					justifyContent="space-between"
					alignItems="center"
				>
					<Text
						fontSize="3rem"
						fontWeight="bold"
						marginLeft="1rem"
						lineHeight="2.25rem"
					>
						{t('create')}
					</Text>
					<Text
						fontSize="3rem"
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

export default WelcomeDisplayDesktop;
