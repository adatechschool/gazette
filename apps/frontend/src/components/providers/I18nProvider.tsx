'use client'

import { useEffect, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n/config'

interface I18nProviderProps {
  children: React.ReactNode
  enable?: boolean
}

function useHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated
}

export default function I18nProvider({children}: I18nProviderProps) {
  const isHydrated = useHydration()

  if (typeof window === 'undefined') {
    return children
  }

  if (!isHydrated) {
    return children
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  )
}
