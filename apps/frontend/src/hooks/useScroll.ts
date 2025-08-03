'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface UseScrollOptions {
  threshold?: number
  throttleMs?: number
}

export function useScroll({ threshold = 100, throttleMs = 16 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTop = useRef(0)

  // Optimisation : mémoriser les options pour éviter les recalculs
  const options = useMemo(() => ({ threshold, throttleMs }), [threshold, throttleMs])

  const handleScroll = useCallback(() => {
    if (timeoutRef.current)
      return

    timeoutRef.current = setTimeout(() => {
      const scrollTop = window.scrollY

      // Éviter les calculs inutiles si la position n'a pas changé significativement
      if (Math.abs(scrollTop - lastScrollTop.current) < 5) {
        timeoutRef.current = null
        return
      }

      lastScrollTop.current = scrollTop
      setIsScrolled(scrollTop > options.threshold)
      timeoutRef.current = null
    }, options.throttleMs)
  }, [options])

  // Optimisation : mémoriser la fonction de nettoyage
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => {
    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cleanup()
    }
  }, [handleScroll, cleanup])

  // Optimisation : mémoriser le résultat pour éviter les re-renders inutiles
  return useMemo(() => ({ isScrolled }), [isScrolled])
}
