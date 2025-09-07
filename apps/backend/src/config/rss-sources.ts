export const RSS_SOURCES = {
  bondyblog: {
    name: 'Bondy Blog',
    url: 'https://www.bondyblog.fr/feed/',
    description: 'Blog d\'actualités et d\'investigation',
    picture: 'https://www.bondyblog.fr/wp-content/uploads/2019/01/logo-bondy-blog.png',
  },
  arretsurimage: {
    name: 'Arrêt sur Images',
    url: 'https://api.arretsurimages.net/api/public/rss/all-content',
    description: 'Média d\'analyse des médias',
    picture: 'https://www.arretsurimages.net/images/logo-asi.png',
  },
  blast: {
    name: 'Blast',
    url: 'https://api.blast-info.fr/rss.xml',
    description: 'Média d\'investigation',
    picture: 'https://www.blast-info.fr/assets/images/logo-blast.png',
  },
  invisibleoranges: {
    name: 'Invisible Oranges',
    url: 'https://www.invisibleoranges.com/feed/',
    description: 'Blog de critique musicale spécialisé dans le metal',
    picture: 'https://media.invisibleoranges.com/qcerjudxrp/uploads/2023/06/21/io-logo-header.png',
  },
  metalorgie: {
    name: 'Metalorgie',
    url: 'https://www.metalorgie.com/feed/news',
    description: 'Webzine de critique musicale spécialisé dans le metal',
    picture: 'https://www.metalorgie.com/images/v5/logo-red-background.png',
  },
} as const

export type RssSourceKey = keyof typeof RSS_SOURCES
