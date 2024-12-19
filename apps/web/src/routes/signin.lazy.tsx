import FormSignUpCC from '@/components/custom/FormSignUpCC';
import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			{/* <GazetteIlluCC /> */}
			<FormSignUpCC />
		</LayoutCC>
	);
}
