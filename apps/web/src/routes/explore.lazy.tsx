import AppTitleHeaderCC from '@/components/custom/AppTitleHeaderCC';
import LayoutCC from '@/components/custom/LayoutCC';
import MenuDisplayCC from '@/components/custom/MenuDisplayCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/explore')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<AppTitleHeaderCC />
			<MenuDisplayCC />
		</LayoutCC>
	);
}
