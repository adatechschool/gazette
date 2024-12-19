import LayoutCC from '@/components/custom/LayoutCC';
import WelcomeDisplayDesktopCC from '@/components/custom/WelcomeDisplayDesktopCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<WelcomeDisplayDesktopCC />;
		</LayoutCC>
	);
}
