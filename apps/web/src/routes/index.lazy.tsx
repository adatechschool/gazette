import LayoutCC from '@/components/custom/LayoutCC';
import LogoHeaderMobileCC from '@/components/custom/LogoHeaderMobileCC';
import NavbarCC from '@/components/custom/NavbarCC';

import WelcomeDisplayDesktopCC from '@/components/custom/WelcomeDisplayCC';
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
