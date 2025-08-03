'use client'

import { Box, Center, Spinner } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'

// Lazy load des composants non critiques
const ExploreContent = lazy(() => import('@/components/custom/ExploreContent'))
const ResponsiveGrid = lazy(() => import('@/components/ui/responsive-grid'))

// Composant de chargement optimisé
function LoadingFallback() {
  return (
    <Center py={10}>
      <Spinner size="lg" color="chaletGreen" thickness="3px" />
    </Center>
  )
}

export default function ExplorePage() {
  return (
    <Box p={4}>
      <Suspense fallback={<LoadingFallback />}>
        <ResponsiveGrid>
          <ExploreContent />
        </ResponsiveGrid>
      </Suspense>
    </Box>
  )
}
