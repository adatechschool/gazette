// jest.config.ts (à la racine du monorepo)
import type { Config } from 'jest'

const config: Config = {
  projects: [
    'gazette/apps/backend',
    'gazette/apps/frontend',
  ],
}

export default config
