import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren;
const Layout = ({ children }: LayoutProps) => {
	return (
		<Box width="100vw" height="100vh" display="flex" flexDirection="column" overflow="hidden"
		position="relative" >
			{children}
		</Box>
	);
};

export default Layout;