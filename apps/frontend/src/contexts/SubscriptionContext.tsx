import { CreateSubscriptionDto } from '@gazette/shared'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useContext, useMemo } from 'react'
import { createSubscription, deleteSubscription, getUserSubscriptions } from '@/services/api/subscriptions'
import { AuthContext } from './AuthContext'
import { SubscriptionContext } from './SubscriptionContext.types'

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient()
  const context = useContext(AuthContext)
  const userId = context?.user?.id || ''

  const { data: subscriptions = [], isLoading, isError } = useQuery({
    queryKey: ['subscriptions', userId],
    queryFn: () => getUserSubscriptions(),
    enabled: !!userId,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5, // 5 minutes
  })

  const createMutation = useMutation({
    mutationFn: (dto: CreateSubscriptionDto) => createSubscription(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
    onError: (error) => {
      console.warn('Error creating subscription:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (subscriptionId: string) => deleteSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions', userId] })
    },
    onError: (error) => {
      console.warn('Error deleting subscription:', error)
    },
  })

  // Optimisation : créer un Map pour les recherches O(1) au lieu de O(n)
  const subscriptionsMap = useMemo(() => {
    return new Map(subscriptions.map(sub => [sub.mediaId, sub]))
  }, [subscriptions])

  const subscribe = useCallback((mediaId: string) => {
    if (!userId) {
      return
    }
    createMutation.mutate({ mediaId })
  }, [userId, createMutation])

  const unsubscribe = useCallback((mediaId: string) => {
    if (!userId)
      return

    const sub = subscriptionsMap.get(mediaId)
    if (sub) {
      deleteMutation.mutate(sub.id)
    }
  }, [userId, subscriptionsMap, deleteMutation])

  const isSubscribed = useCallback((mediaId: string): boolean => {
    return subscriptionsMap.has(mediaId)
  }, [subscriptionsMap])

  const value = useMemo(() => ({
    subscriptions,
    isLoading,
    isError,
    subscribe,
    unsubscribe,
    isSubscribed,
  }), [subscriptions, isLoading, isError, subscribe, unsubscribe, isSubscribed])

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}
