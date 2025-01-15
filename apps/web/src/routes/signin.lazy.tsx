import FormSignUpCCTEST from '@/components/custom/FormSignUpCC';
import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { useBreakpointValue } from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	const isMobile = useBreakpointValue({ base: true, lg: false });

	return (
		<LayoutCC>
			{isMobile ? (
				<div>
					<FormSignUpCCTEST />
				</div>
			) : (
				<div>
					<GazetteIlluCC />
					<FormSignUpCCTEST />
				</div>
			)}
		</LayoutCC>
	);
}
