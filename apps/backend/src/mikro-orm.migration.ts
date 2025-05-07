import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

export default config;

if (require.main === module) {
  MikroORM.init(config).then(async (orm) => {
    await orm.close(true);
  });
}
