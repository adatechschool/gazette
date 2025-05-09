import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
import Navbar from '@/components/custom/Navbar';
import { useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/about')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation('common', {
		keyPrefix: 'accountManagement',
	});

	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<LayoutCC>
			{isMobile ? (
				<div>
					<HeaderMobileCC text={t('about')} />
					<Navbar />
				</div>
			) : (
				<HeaderDesktopCC text={t('about')} />
			)}
		</LayoutCC>
	);
}
