import LayoutCC from '@/components/custom/LayoutCC';
import WelcomeDisplayCC from '@/components/custom/WelcomeDisplayCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<WelcomeDisplayCC />;
		</LayoutCC>
	);
}
