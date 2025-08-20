import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { Media } from '@/entities/media.entity'

export class MediaSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Media, {
      name: 'Blast',
      description: 'Blast, le média d’investigation indépendant',
      picture: 'https://api.blast-info.fr/images/blast-logo.png',
      urlRss: 'https://api.blast-info.fr/rss.xml',
    })
  }
}
