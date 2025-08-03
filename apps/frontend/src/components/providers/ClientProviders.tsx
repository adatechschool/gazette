'use client'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { memo } from 'react'

import { AuthProvider } from '@/contexts/AuthContext'
import { LikeProvider } from '@/contexts/LikeContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import { theme } from '../../theme/theme'
import I18nProvider from './I18nProvider'

// Optimisation : créer le QueryClient une seule fois
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1, // Réduire les retries
    },
    mutations: {
      retry: 1,
    },
  },
})

const ClientProviders = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme} resetCSS={false}>
          <AuthProvider>
            <SubscriptionProvider>
              <LikeProvider>
                <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                  {children}
                </div>
              </LikeProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </I18nProvider>
  )
})

ClientProviders.displayName = 'ClientProviders'

export default ClientProviders
