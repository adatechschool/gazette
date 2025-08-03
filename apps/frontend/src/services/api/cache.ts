// Cache simple pour les requêtes API
class ApiCache {
  private cache = new Map<string, { data: any, timestamp: number, ttl: number }>()

  set(key: string, data: any, ttl: number = 5 * 60 * 1000) { // 5 minutes par défaut
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item)
      return null

    const isExpired = Date.now() - item.timestamp > item.ttl
    if (isExpired) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  delete(key: string): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  // Nettoyer automatiquement les entrées expirées
  cleanup(): void {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key)
      }
    }
  }
}

// Instance globale du cache
export const apiCache = new ApiCache()

// Nettoyer le cache toutes les 10 minutes
setInterval(() => {
  apiCache.cleanup()
}, 10 * 60 * 1000)

// Fonction utilitaire pour créer une clé de cache
export function createCacheKey(endpoint: string, params?: Record<string, any>): string {
  const paramsString = params ? JSON.stringify(params) : ''
  return `${endpoint}${paramsString}`
}
