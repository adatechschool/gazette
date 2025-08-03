'use client'

import { useEffect, useMemo, useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { initI18n } from '@/i18n/config'

interface I18nProviderProps {
  children: React.ReactNode
}

export default function I18nProvider({ children }: I18nProviderProps) {
  const [i18nInstance, setI18nInstance] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const instance = await initI18n()
        if (isMounted) {
          setI18nInstance(instance)
        }
      }
      catch (error) {
        console.error('Failed to initialize i18n:', error)
      }
      finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  const providerValue = useMemo(() => {
    if (isLoading || !i18nInstance) {
      return null
    }
    return i18nInstance
  }, [isLoading, i18nInstance])

  if (isLoading || !providerValue) {
    return <LoadingSpinner fullScreen size="lg" />
  }

  return <I18nextProvider i18n={providerValue}>{children}</I18nextProvider>
}
