import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useBreakpointValue } from '@chakra-ui/react';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/NavbarCC';

export const Route = createLazyFileRoute('/explore')({
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
					<HeaderMobileCC text={t('explore')} />
					<Navbar />
				</div>
			) : (
				<HeaderDesktopCC text={t('explore')} />
			)}
		</LayoutCC>
	);
}
