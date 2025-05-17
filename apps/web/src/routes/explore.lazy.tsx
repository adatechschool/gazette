import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Flex, Link, useBreakpointValue } from '@chakra-ui/react';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/Navbar';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/api';
import { UserProfileDto } from '@gazette/shared';
import FormTitle from '@/components/custom/FormTitle';
import AppTitleHeaderCC from '@/components/custom/AppTitle';
export const Route = createLazyFileRoute('/explore')({
	component: RouteComponent,
});

function RouteComponent() {
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
		return <div>Chargement...</div>;
	}

	if (error) {
		return <div>Erreur: {error}</div>;
	}

	return (
		<LayoutCC>
			{isMobile ? (
				<div>
					<HeaderMobileCC text={t('explore')} />
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
						<AppTitleHeaderCC />
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
					<Link
						href="/"
						fontFamily={{ base: 'Poppins', lg: 'Staatliches' }}
						fontSize={{ base: '1rem', lg: '2rem' }}
					>
						{t('logout')}
					</Link>
				</Flex>
			)}
			{user && (
				<div>
					<h1>Bienvenue {user.email}</h1>
				</div>
			)}
		</LayoutCC>
	);
}
