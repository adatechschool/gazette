import { Heading } from '@chakra-ui/react';

export type FormTitleCCProps = {
	fontColor: string;
	text: string;
};

const FormTitleCC = ({ fontColor, text }: FormTitleCCProps) => {
	return (
		<Heading
			fontFamily={{
				base: 'Poppins',
				lg: 'Staatliches',
			}}
			color={fontColor}
			fontSize={{
				base: '1.125rem',
				lg: '5rem',
			}}
		>
			{text}
		</Heading>
	);
};

export default FormTitleCC;
