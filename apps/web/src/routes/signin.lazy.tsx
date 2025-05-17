import AppTitleHeaderCC from '@/components/custom/AppTitle';
import FormSignUpCC from '@/components/custom/FormSignUpCC';
import FormTitle from '@/components/custom/FormTitle';
import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/signin')({
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
					<FormTitle text={t('signIn')} fontColor="color.black" />
					<FormSignUpCC />
				</Flex>
			) : (
				<Flex>
					<GazetteIlluCC />
					<Flex
						flexDirection="column"
						alignItems="center"
						justifyContent="center"
						width="50vw"
					>
						<FormTitle text={t('signIn')} fontColor="color.chaletGreen" />
						<FormSignUpCC />
					</Flex>
				</Flex>
			)}
		</LayoutCC>
	);
}
