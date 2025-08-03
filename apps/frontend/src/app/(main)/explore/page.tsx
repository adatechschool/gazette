'use client'

import { Box, Center, Spinner } from '@chakra-ui/react'
import { lazy, Suspense } from 'react'
import { CardGrid } from '@/components/ui/responsive-grid'

// Lazy load des composants non critiques
const ExploreContent = lazy(() => import('@/components/custom/ExploreContent'))

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
        <ExploreContent />
      </Suspense>
    </Box>
  )
}
