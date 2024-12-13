import { Flex } from '@chakra-ui/react';
import TitleMenuDesktopCC from './TitleMenuDesktopCC';
import MenuDesktopCC from './MenuDesktopCC';

const MenuDisplayCC = () => {
	return (
		<Flex flexDirection="column" alignItems="center" padding={1}>
			<TitleMenuDesktopCC />
			<MenuDesktopCC />
		</Flex>
	);
};

export default MenuDisplayCC;
