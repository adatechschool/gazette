import AppTitleHeaderCC from '@/components/custom/AppTitleHeaderCC';
import FormLoginCC from '@/components/custom/FormLoginCC';
import FormTitleCC from '@/components/custom/FormTitleCC';
import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/login')({
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
				<Flex
					flexDirection="column"
					marginLeft="1rem"
					marginTop="2rem"
					gap="6"
					alignContent="center"
					justifyContent="center"
					alignItems="center"
				>
					<AppTitleHeaderCC />
					<FormTitleCC text={t('login')} fontColor="color.black" />
					<FormLoginCC />
				</Flex>
			) : (
				<Flex>
					<GazetteIlluCC />
					<Flex flexDirection="column" alignItems="center" justifyContent="center" width="50vw">

						<FormTitleCC text={t('login')} fontColor="color.chaletGreen" />
						<FormLoginCC />
					</Flex>
				</Flex>
			)}
		</LayoutCC>
	);
}
