import FormTitle from '@/components/custom/FormTitle';
import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import LayoutCC from '@/components/custom/LayoutCC';
import Navbar from '@/components/custom/Navbar';
import SettingsMenu from '@/components/custom/SettingsMenu';
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
					<SettingsMenu />
				</Flex>
			) : (
				<Flex flexDirection="row">
					<GazetteIlluCC />
					<Flex
						flexDirection="column"
						width="50vw"
						height="100%"
						gap={10}
						alignItems="center"
					>
						<Navbar />
						<Flex
							flexDirection="column"
							gap={20}
							justifyContent="center"
							alignItems="center"
							marginTop={10}
							width="100%"
							height="100%"
						>
							<FormTitle text={t('account')} fontColor="color.chaletGreen" />
							<SettingsMenu />
						</Flex>
					</Flex>
				</Flex>
			)}
		</LayoutCC>
	);
}
