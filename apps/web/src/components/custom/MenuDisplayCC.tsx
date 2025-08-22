import { Flex } from '@chakra-ui/react';
import TitleMenuDesktopCC from './TitleMenuDesktopCC';
import MenuDesktopCC from './MenuDesktopCC';

const MenuDisplayCC = () => {
	return (
		<Flex flexDirection="column" alignItems="center" gap="2">
			<TitleMenuDesktopCC />
			<MenuDesktopCC />
		</Flex>
	);
};

export default MenuDisplayCC;
