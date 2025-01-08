import { Box, Text } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';
import { House, Telescope, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});

	return (
		<Box
			display="flex"
			position="fixed"
			bottom={0}
			width="100%"
			justifyContent="space-around"
			marginBottom={5}
		>
			<Link to="/">
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
				>
					<House />
					<Text fontFamily="Poppins" fontWeight="semibold" fontSize="1rem">
						{t('home')}
					</Text>
				</Box>
			</Link>

			<Link to="/explore">
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Telescope />
					<Text fontFamily="Poppins" fontWeight="semibold" fontSize="1rem">
						{t('explore')}
					</Text>
				</Box>
			</Link>

			<Link to="/parameters">
				<Box
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<User />
					<Text fontFamily="Poppins" fontWeight="semibold" fontSize="1rem">
						{t('account')}
					</Text>
				</Box>
			</Link>
		</Box>
	);
};

export default Navbar;
