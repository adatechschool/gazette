'use client'

import { Provider } from '@/components/ui/provider'
import { AuthProvider } from '@/contexts/AuthContext'
import I18nProvider from './I18nProvider'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <Provider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </Provider>
    </I18nProvider>
  )
}
