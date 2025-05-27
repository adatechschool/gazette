import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
	body: {
		description: 'The body text style - used in paragraphs',
		value: {
			fontFamily: 'Inter',
			fontWeight: '500',
			fontSize: '16px',
			lineHeight: '24',
			letterSpacing: '0',
			textDecoration: 'None',
			textTransform: 'None',
		},
	},
	heading: {
		description: 'The heading text style - used in titles',
		value: {
			fontFamily: 'Staatliches',
			fontWeight: '400',
			fontSize: '32px',
			lineHeight: '40',
			letterSpacing: '0',
			textDecoration: 'None',
			textTransform: 'None',
		},
	},
	button: {
		description: 'The button text style',
		value: {
			fontFamily: 'Poppins',
			fontWeight: '600',
			fontSize: '16px',
			lineHeight: '24',
			letterSpacing: '0',
			textDecoration: 'None',
			textTransform: 'uppercase',
		},
	},
});
