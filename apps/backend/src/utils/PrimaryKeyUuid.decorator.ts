import { PrimaryKey } from '@mikro-orm/core';

export const PrimaryKeyUuid = () =>
  PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' });