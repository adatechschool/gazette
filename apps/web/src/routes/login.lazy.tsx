import GazetteIlluCC from '@/components/custom/GazetteIlluCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/login')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<GazetteIlluCC />
		</LayoutCC>
	);
}
