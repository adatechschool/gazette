import { Flex } from '@chakra-ui/react';
import AppTitleHeaderCC from './AppTitle';
import MenuCC from './MenuDisplayCC';
import PageTitleCC from './PageTitleCC';

export type HeaderDesktopCCProps = {
	text: string;
};

const HeaderDesktopCC = ({ text }: HeaderDesktopCCProps) => {
	return (
		<Flex
			flexDirection="column"
			gap="6"
			marginTop="3rem"
			marginLeft="1rem"
			marginRight="1rem"
		>
			<Flex justifyContent="space-between">
				<AppTitleHeaderCC />
				<MenuCC />
			</Flex>
			<Flex justifyContent="center">
				<PageTitleCC fontColor="color.chaletGreen" text={text} />
			</Flex>
		</Flex>
	);
};

export default HeaderDesktopCC;
