'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseScrollOptions {
  threshold?: number
  throttleMs?: number
}

export function useScroll({ threshold = 100, throttleMs = 16 }: UseScrollOptions = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastScrollTop = useRef(0)

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
      setIsScrolled(scrollTop > threshold)
      timeoutRef.current = null
    }, throttleMs)
  }, [threshold, throttleMs])

  useEffect(() => {
    // Set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [handleScroll])

  return { isScrolled }
}
