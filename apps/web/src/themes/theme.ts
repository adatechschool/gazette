import { createSystem, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: `'Staatliches', sans-serif` },
				body: { value: `'Poppins', sans-serif` },
			},
			colors: {
				green: {
					chaletGreen: { value: '#606c38' },
				},
			},
		},
	},
});

export const system = createSystem(config);
