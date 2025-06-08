import React from 'react';
import Layout from '@/components/custom/Layout';
import { Flex, Link, useBreakpointValue, Text as ChakraText } from '@chakra-ui/react';
import HeaderMobile from '@/components/custom/HeaderMobile';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/Navbar';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/api';
import { UserProfileDto } from '@gazette/shared';
import FormTitle from '@/components/custom/FormTitle';
import AppTitle from '@/components/custom/AppTitle';

const Explore = () => {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});

	const [user, setUser] = useState<UserProfileDto['user'] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				setIsLoading(true);
				const response = await getUserProfile();
				setUser(response.user);
				setError(null);
			} catch (error) {
				console.error('Erreur lors de la récupération du profil:', error);
				setError('Impossible de récupérer les informations du profil');
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserProfile();
	}, []);

	const isMobile = useBreakpointValue({ base: true, lg: false });

	if (isLoading) {
		<Layout>
			<Flex justify="center" align="center" height="100vh">
				<ChakraText>Chargement...</ChakraText>
			</Flex>
		</Layout>
	}

	if (error) {
		<Layout>
			<Flex justify="center" align="center" height="100vh">
				<ChakraText color="red.500">Erreur: {error}</ChakraText>
			</Flex>
		</Layout>
	}

	return (
		<Layout>
			{isMobile ? (
				<div>
					<HeaderMobile text={t('explore')} />
					<Navbar />
				</div>
			) : (
				<Flex
					width="100%"
					height="100%"
					gap={10}
					padding={10}
					flexDirection="column"
				>
					<Flex width="100%" height="10%" gap={10} flexDirection="row">
						<AppTitle />
						<Navbar />
					</Flex>
					<Flex
						width="100%"
						height="90%"
						gap={10}
						justifyContent="center"
						padding={10}
					>
						<FormTitle text={t('explore')} fontColor="color.chaletGreen" />
					</Flex>
					{user && (
						<div>
							<h1>Bienvenue {user.pseudo || user.email || 'Utilisateur'}</h1>
						</div>
					)}
					<Link
						href="/"
						fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
						fontSize={{ base: '1rem', lg: '2rem' }}
					>
						{t('logout')}
					</Link>
				</Flex>
			)}

		</Layout>
	);
};

export default Explore; 