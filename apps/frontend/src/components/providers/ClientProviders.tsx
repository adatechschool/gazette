'use client'
import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { LikeProvider } from '@/contexts/LikeContext'
import { SubscriptionProvider } from '@/contexts/SubscriptionContext'
import I18nProvider from './I18nProvider'

// Create QueryClient instance outside component to prevent recreation on re-renders
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
})

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <AuthProvider>
            <SubscriptionProvider>
              <LikeProvider>
                {children}
              </LikeProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </I18nProvider>
  )
}
