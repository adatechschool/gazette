import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useBreakpointValue } from '@chakra-ui/react';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/Navbar';
import { getAllUsers } from '@/services/api';
import { useEffect, useState } from 'react';
import { CreateUserDto } from '@gazette/shared';

export const Route = createLazyFileRoute('/explore')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});

	const isMobile = useBreakpointValue({ base: true, lg: false });
	const [users, setUsers] = useState<CreateUserDto[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersData = await getAllUsers();
				setUsers(usersData);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, []);

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
					<p>{users.length} users found</p>
				</div>
			)}
		</LayoutCC>
	);
}
