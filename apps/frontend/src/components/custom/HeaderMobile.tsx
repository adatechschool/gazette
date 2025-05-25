import { Flex } from '@chakra-ui/react';
import LogoHeaderMobileCC from './LogoHeaderMobile';
import PageTitleCC from './PageTitle';

export type HeaderMobileCCProps = {
	text: string;
};

const HeaderMobileCC = ({ text }: HeaderMobileCCProps) => {
	return (
		<Flex flexDirection="column" gap="6" marginLeft="1rem" marginTop="2rem">
			<LogoHeaderMobileCC />
			<PageTitleCC fontColor="color.black" text={text} />
		</Flex>
	);
};
export default HeaderMobileCC;