"use client"

import { ChakraProvider } from "@chakra-ui/next-js"
import theme from '@/theme/theme';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}
