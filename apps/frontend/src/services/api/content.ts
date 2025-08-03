import { apiCache, createCacheKey } from './cache'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getContents() {
  const cacheKey = createCacheKey('contents')

  // Vérifier le cache d'abord
  const cachedData = apiCache.get(cacheKey)
  if (cachedData) {
    return cachedData
  }

  try {
    const response = await fetch(`${API_BASE_URL}/contents`, {
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Mettre en cache pour 2 minutes
    apiCache.set(cacheKey, data, 2 * 60 * 1000)

    return data
  }
  catch (error) {
    console.error('Error fetching contents:', error)
    throw error
  }
}
