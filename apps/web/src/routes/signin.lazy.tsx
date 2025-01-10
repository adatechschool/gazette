import FormSignUpCC from '@/components/custom/FormSignUpCC';
import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/signin')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<LayoutCC>
			<FormSignUpCC />
		</LayoutCC>
	);
}
