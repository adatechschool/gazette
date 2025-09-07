import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().transform(Number).default(5432),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),
  BACKEND_PORT: z.string().transform(Number).default(3000),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRATION: z.string().min(1),
  ALLOWED_ORIGINS: z.string().min(1),
})

export type EnvConfig = z.infer<typeof envSchema>

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config)
  if (!result.success) {
    console.error('❌ Invalid environment variables:', result.error.format())
    throw new Error('Invalid environment configuration')
  }
  return result.data
}
