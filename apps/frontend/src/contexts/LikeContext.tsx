import { CreateLikeDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useContext, useMemo } from 'react'
import { createLike, deleteLike, getUserLikes } from '@/services/api/likes'
import { AuthContext } from './AuthContext'
import { LikeContext } from './LikeContext.types'

export function LikeProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const context = useContext(AuthContext)
  const userId = context?.user?.id || ''

  const { data: likes = [], isLoading, isError } = useQuery({
    queryKey: ['likes', userId],
    queryFn: () => getUserLikes(),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateLikeDto) => createLike(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
    },
    onError: (error) => {
      console.warn('Error creating like:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (likeId: string) => deleteLike(likeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', userId] })
    },
    onError: (error) => {
      console.warn('Error deleting like:', error)
    },
  })

  // Optimisation : créer un Set pour les recherches O(1) au lieu de O(n)
  const likesSet = useMemo(() => {
    return new Set(likes.map(like => like.contentId))
  }, [likes])

  const like = useCallback((contentId: string) => {
    if (!userId) {
      return
    }
    createMutation.mutate({ contentId })
  }, [userId, createMutation])

  const dislike = useCallback((contentId: string) => {
    if (!userId) {
      return
    }
    const likeToDelete = likes.find(like => like.contentId === contentId)
    if (likeToDelete) {
      deleteMutation.mutate(likeToDelete.id)
    }
  }, [userId, likes, deleteMutation])

  const isLiked = useCallback((contentId: string) => {
    return likesSet.has(contentId)
  }, [likesSet])

  // Optimisation : mémoriser le contexte pour éviter les re-renders
  const contextValue = useMemo(() => ({
    likes,
    isLoading,
    isError,
    like,
    dislike,
    isLiked,
  }), [likes, isLoading, isError, like, dislike, isLiked])

  return (
    <LikeContext.Provider value={contextValue}>
      {children}
    </LikeContext.Provider>
  )
}
