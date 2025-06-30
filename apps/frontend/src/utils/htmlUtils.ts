/**
 * Décode les entités HTML (&#232;, &#8217;, etc.)
 */
export function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

/**
 * Supprime toutes les balises HTML d'un texte
 */
export function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

/**
 * Nettoie complètement un texte RSS (décode + supprime HTML)
 */
export function cleanRssText(text: string): string {
  if (!text)
    return ''
  const decoded = decodeHtmlEntities(text)
  const cleaned = stripHtmlTags(decoded)
  return cleaned.trim()
}

/**
 * Formate une date RSS en format lisible
 */
export function formatRssDate(dateString: string): string {
  if (!dateString)
    return ''

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  catch {
    return dateString
  }
}
