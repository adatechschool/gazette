import { useEffect, useState } from 'react'

// Définition du type d'un article
interface Article {
  title: string
  link: string
  description: string
  pubDate: string
}

function RSSFeed() {
  const [articles, setArticles] = useState<Article[]>([]) // Initialisation avec un tableau d'articles
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:3000/rss')
        if (!response.ok) {
          throw new Error('Erreur réseau')
        }
        const data = await response.json()
        setArticles(data) // Mettre à jour l'état avec les articles récupérés
      }
      catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      }
      finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading)
    return <div>Chargement...</div>
  if (error) {
    return (
      <div>
        Erreur :
        {error}
      </div>
    )
  }

  return (
    <div>
      <h1>Articles du Flux RSS</h1>
      {articles.length === 0
        ? (
            <p>Aucun article trouvé.</p>
          )
        : (
            <ul>
              {articles.map((article, index) => (
                <li key={index}>
                  <h2>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.title}
                    </a>
                  </h2>
                  <p>{article.description}</p>
                  <small>{new Date(article.pubDate).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          )}
    </div>
  )
}

export default RSSFeed
