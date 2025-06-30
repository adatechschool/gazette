import { api } from '@/config'

export async function fetchRssFeed(url: string): Promise<any> {
  try {
    const response = await api.get('rss', {
      searchParams: { url },
    })
    return await response.json()
  }
  catch (error: any) {
    console.error('Erreur lors du fetch RSS :', error)
    throw error
  }
}
