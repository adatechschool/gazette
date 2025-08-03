'use client'

import { Box, SimpleGrid } from '@chakra-ui/react'
import { memo } from 'react'

interface ResponsiveGridProps {
  children: React.ReactNode
  columns?: { base: number, md: number, lg: number }
  spacing?: number
  minChildWidth?: string
}

export const ResponsiveGrid = memo(({
  children,
  columns = { base: 1, md: 2, lg: 3 },
  spacing = 6,
  minChildWidth = '300px',
}: ResponsiveGridProps) => {
  return (
    <Box>
      <SimpleGrid
        columns={columns}
        spacing={spacing}
        minChildWidth={minChildWidth}
        width="100%"
      >
        {children}
      </SimpleGrid>
    </Box>
  )
})

ResponsiveGrid.displayName = 'ResponsiveGrid'

// Composant CardGrid optimisé
export const CardGrid = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      minChildWidth="300px"
    >
      {children}
    </ResponsiveGrid>
  )
})

CardGrid.displayName = 'CardGrid'

// Composant pour les grilles de navigation
export function NavigationGrid({
  children,
  ...props
}: ResponsiveGridProps) {
  return (
    <ResponsiveGrid
      gap={{ base: '8px', md: '12px', lg: '16px' }}
      justify={{ base: 'space-around', md: 'space-around', lg: 'space-around' }}
      {...props}
    >
      {children}
    </ResponsiveGrid>
  )
}
