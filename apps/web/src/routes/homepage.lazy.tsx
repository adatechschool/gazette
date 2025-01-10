import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
import Navbar from '@/components/custom/NavbarCC';
import { useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/homepage')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});

	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<LayoutCC>
			{isMobile ? (
				<div>
					<HeaderMobileCC text={t('home')} />
					<Navbar />
				</div>
			) : (
				<HeaderDesktopCC text={t('home')} />
			)}
		</LayoutCC>
	);
}
