import { Flex } from '@chakra-ui/react';
import LogoHeaderMobileCC from './LogoHeaderMobile';
import PageTitle from './PageTitle';

export type HeaderMobileCCProps = {
	text: string;
};

const HeaderMobileCC = ({ text }: HeaderMobileCCProps) => {
	return (
		<Flex flexDirection="column" gap="6" marginLeft="1rem" marginTop="2rem">
			<LogoHeaderMobile />
			<PageTitle fontColor="color.black" text={text} />
		</Flex>
	);
};
export default HeaderMobileCC;