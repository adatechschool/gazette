import { ContentWithMediaDto } from '@gazette/shared'
import { useQuery } from '@tanstack/react-query'
import { getUserContent } from '@/services/api/content'
import { useAuth } from './useAuth'

export function useContents() {
  const { user } = useAuth()
  const { data: contents = [], isLoading, isError } = useQuery<ContentWithMediaDto[]>({
    queryKey: ['contents'],
    queryFn: () => getUserContent(),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return { contents, isLoading, isError }
}
