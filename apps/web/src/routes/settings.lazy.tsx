import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
import Navbar from '@/components/custom/NavbarCC';
import SettingsMenuCC from '@/components/custom/SettingsMenuCC';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/settings')({
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
				<Flex flexDirection="column">
					<HeaderMobileCC text={t('account')} />
					<Navbar />
					<SettingsMenuCC />
				</Flex>
			) : (
				<Flex flexDirection="column">
					<HeaderDesktopCC text={t('account')} />
					<SettingsMenuCC />
				</Flex>
			)}
		</LayoutCC>
	);
}
