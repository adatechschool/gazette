import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { getContents } from '@/services/api/content'

export function useContents() {
  const { data: contents = [], isLoading, isError, error } = useQuery({
    queryKey: ['contents'],
    queryFn: getContents,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // Optimisation : mémoriser les contenus triés
  const sortedContents = useMemo(() => {
    return [...contents].sort((a, b) => {
      // Trier par date de publication (plus récent en premier)
      const dateA = new Date(a.publishedAt || a.createdAt).getTime()
      const dateB = new Date(b.publishedAt || b.createdAt).getTime()
      return dateB - dateA
    })
  }, [contents])

  // Optimisation : mémoriser les statistiques
  const stats = useMemo(() => {
    return {
      total: contents.length,
      withImages: contents.filter((c: any) => c.imageUrl).length,
      withDescription: contents.filter((c: any) => c.description).length,
    }
  }, [contents])

  return {
    contents: sortedContents,
    originalContents: contents,
    isLoading,
    isError,
    error,
    stats,
  }
}
