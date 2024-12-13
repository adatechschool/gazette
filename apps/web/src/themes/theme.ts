import { createSystem, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: `'Staatliches', sans-serif` },
				body: { value: `'Poppins', sans-serif` },
			},
            
            colors: {
                kakadoie: { value: "#606c38"}
            },
        },
            semanticTokens: {
                colors: {
                  danger: { value: "{colors.kakadoie}" },
                },
		},
	},
});




export const system = createSystem(config)