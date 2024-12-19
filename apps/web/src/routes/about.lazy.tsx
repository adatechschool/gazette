import AppTitleHeaderCC from '@/components/custom/AppTitleHeaderCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/about')({
	component: RouteComponent,
});

function RouteComponent() {
	return <LayoutCC></LayoutCC>;
}
