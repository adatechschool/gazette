import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
import Navbar from '@/components/custom/NavbarCC';
import ParametersMenuCC from '@/components/custom/ParametersMenuCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/parameters')({
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
				<Flex flexDirection='column'>
					<HeaderMobileCC text={t('account')} />
					<Navbar />
					<ParametersMenuCC />
				</Flex>
			) : (
				<Flex flexDirection='column'>
					<HeaderDesktopCC text={t('account')} />
					<ParametersMenuCC />
				</Flex>
			)}

		</LayoutCC>
	)
}
