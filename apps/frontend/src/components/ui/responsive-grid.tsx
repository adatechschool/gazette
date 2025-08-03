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

// Export par défaut pour le lazy loading
export default ResponsiveGrid

// Composant pour les grilles de navigation
export const NavigationGrid = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <ResponsiveGrid
      columns={{ base: 2, md: 3, lg: 4 }}
      spacing={4}
      minChildWidth="200px"
    >
      {children}
    </ResponsiveGrid>
  )
})

NavigationGrid.displayName = 'NavigationGrid'
