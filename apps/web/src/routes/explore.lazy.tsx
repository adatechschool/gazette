import AppTitleHeaderCC from '@/components/custom/AppTitleHeaderCC';
import LayoutCC from '@/components/custom/LayoutCC';
import LogoHeaderMobileCC from '@/components/custom/LogoHeaderMobileCC';
import MenuDisplayCC from '@/components/custom/MenuDisplayCC';
import Navbar from '@/components/custom/NavbarCC';
import WelcomeDialogDesktopCC from '@/components/custom/WelcomeDialogDesktopCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/explore')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<div>
				<AppTitleHeaderCC />
			</div>
			<div>
				<MenuDisplayCC />
			</div>

			{/* <LogoHeaderMobileCC /> */}
			{/* <WelcomeDialogDesktopCC /> */}
			<Navbar />
		</LayoutCC>
	);
}
