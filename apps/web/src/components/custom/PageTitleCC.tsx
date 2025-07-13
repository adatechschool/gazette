import { Heading } from '@chakra-ui/react';

export type PageTitleCCProps = {
	fontColor: string;
	text: string;
};

const PageTitleCC = ({ fontColor, text }: PageTitleCCProps) => {
	return (
		<Heading
			fontFamily={{
				base: 'Poppins',
				lg: 'Staatliches',
			}}
			color={fontColor}
			fontSize={{
				base: '1.125rem',
				lg: '6.25rem',
			}}
		>
			{text}
		</Heading>
	);
};

export default PageTitleCC;
