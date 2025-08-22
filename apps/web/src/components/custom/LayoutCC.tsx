import { Box } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type LayoutCCProps = PropsWithChildren;
const LayoutCC = ({ children }: LayoutCCProps) => {
	return (
		<Box width="100vw" height="100vh" display="flex" flexDirection="column" overflow="hidden"
		position="relative" >
			{children}
		</Box>
	);
};

export default LayoutCC;
