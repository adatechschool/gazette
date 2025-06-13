import type { PropsWithChildren } from 'react'
import { Box } from '@chakra-ui/react'

type LayoutProps = PropsWithChildren
function Layout({ children }: LayoutProps) {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      position="relative"
    >
      {children}
    </Box>
  )
}

export default Layout
