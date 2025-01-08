import { Heading } from '@chakra-ui/react';

type PageTitleCCProps = {
	fontColor: string;
	text: string;
};

const PageTitleCC = ({ fontColor }: PageTitleCCProps) => {
	return (
		<Heading
			fontFamily={{
				sm: 'Poppins',
				lg: 'Staatliches',
			}}
			color={fontColor}
			fontSize={{
				sm: '1.125rem',
				lg: '6.25rem',
			}}
			margin={10}
		>
			hello
		</Heading>
	);
};

export default PageTitleCC;
