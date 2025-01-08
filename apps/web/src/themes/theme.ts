import { defaultConfig, createSystem, defineConfig } from '@chakra-ui/react';
import { textStyles } from './textStyles';

const customConfig = defineConfig({
	theme: {
		textStyles,
		breakpoints: {
			sm: '30em', //'480px'
			md: '48em', //'768px'
			lg: '62em', //'992px'
			xl: '80em', //'1280px'
			'2xl': '96em', //'1536px
		},

		tokens: {
			fonts: {
				heading: { value: `'Staatliches', sans-serif` },
				body: { value: `'Poppins', sans-serif` },
			},

			colors: {
				color: {
					chaletGreen: { value: '#606c38' },
					white: { value: '#ffffff' },
					mineShaft: { value: '1F1F1F' },
					black: { value: '000000' },
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, customConfig);
