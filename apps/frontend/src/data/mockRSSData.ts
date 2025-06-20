// src/data/mockRSSData.ts
import type { RSSItem } from '@gazette/shared'

export const mockRSSData: RSSItem[] = [
  {
    id: '1',
    title: 'Les nouvelles tendances en développement web 2024',
    description: 'Découvrez les dernières innovations qui transforment l\'industrie du développement web cette année.',
    type: 'Tech',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-15T10:30:00Z',
    sourceUrl: 'https://example.com/article1',
    media: 'TechCrunch',
    medium: 'Article presse'
  },
  {
    id: '2',
    title: 'L\'art contemporain et ses influences numériques',
    description: 'Comment le numérique révolutionne les pratiques artistiques contemporaines et redéfinit les codes de création.',
    type: 'Culture',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-14T14:20:00Z',
    sourceUrl: 'https://example.com/article2',
    media: 'Beaux Arts',
    medium: 'Magazine'
  },
  {
    id: '3',
    title: 'Les championnats d\'Europe : analyses et perspectives',
    description: 'Retour sur les moments forts des championnats et analyse des performances exceptionnelles de cette édition.',
    type: 'Sport',
    imageUrl: 'https://images.unsplash.com/photo-1544003412-6503e556c92e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-13T18:45:00Z',
    sourceUrl: 'https://example.com/article3',
    media: 'L\'Équipe',
    medium: 'Article presse'
  },
  {
    id: '4',
    title: 'Économie circulaire : les entreprises s\'engagent',
    description: 'De plus en plus d\'entreprises adoptent des modèles économiques durables pour répondre aux enjeux climatiques.',
    type: 'Économie',
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-12T09:15:00Z',
    sourceUrl: 'https://example.com/article4',
    media: 'Les Échos',
    medium: 'Article presse'
  },
  {
    id: '5',
    title: 'Intelligence artificielle : éthique et société',
    description: 'Les enjeux éthiques de l\'IA dans notre société moderne soulèvent de nombreuses questions fondamentales.',
    type: 'Tech',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-11T16:30:00Z',
    sourceUrl: 'https://example.com/article5',
    media: 'France Inter',
    medium: 'Podcast'
  },
  {
    id: '6',
    title: 'The Substance : d\'injonctions en injections...',
    description: 'Le film de Coralie Fargeat, dans ses outrances parfaitement assumées, s\'avère aussi stimulant qu\'irritant. Irritant parce que long, répétitif et...',
    type: 'Cinéma',
    imageUrl: 'https://pbs.twimg.com/profile_images/1441069207593095175/Yzn8Q2Sn_400x400.jpg',
    date: '2024-06-10T12:00:00Z',
    sourceUrl: 'https://example.com/article6',
    media: 'Blast',
    medium: 'Article presse'
  }
]

// Fonction pour simuler un appel API avec délai
export const getMockRSSData = (): Promise<RSSItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRSSData)
    }, 1000) // Simule un délai de 1 seconde
  })
}