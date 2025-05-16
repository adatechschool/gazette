import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useBreakpointValue } from '@chakra-ui/react';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/Navbar';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/services/api';
import { UserProfileDto } from '@gazette/shared';
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
				<div>
					<HeaderDesktopCC text={t('explore')} />
				</div>
			)}
			{user && (
				<div>
					<h1>Bienvenue {user.email}</h1>
					<p>Rôle: {user.role}</p>
				</div>
			)}
		</LayoutCC>
	);
}
