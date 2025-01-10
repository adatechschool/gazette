import { Flex } from '@chakra-ui/react';
import LogoHeaderMobileCC from './LogoHeaderMobileCC';
import PageTitleCC from './PageTitleCC';

export type HeaderMobileCCProps = {
	fontColor: string;
	text: string;
};

const HeaderMobileCC = ({ fontColor, text }: HeaderMobileCCProps) => {
	return (
		<Flex flexDirection="column">
			<LogoHeaderMobileCC />
			<PageTitleCC fontColor={fontColor} text={text} />
		</Flex>
	);
};
export default HeaderMobileCC;
