import { defaultConfig, createSystem, defineConfig } from '@chakra-ui/react';

const customConfig = defineConfig({
	theme: {
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
