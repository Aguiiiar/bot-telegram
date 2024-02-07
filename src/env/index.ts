import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  TELEGRAM_BOT_TOKEN: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variabeles', _env.error.format())

  throw new Error('Invalid environment variabeles')
}

export const env = _env.data
