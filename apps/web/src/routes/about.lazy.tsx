import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
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
				<HeaderMobileCC text={t('about')} />
			) : (
				<HeaderDesktopCC text={t('about')} />
			)}
		</LayoutCC>
	);
}
