import DB_URL from '@/database/url'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/database/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: DB_URL,
  },
} satisfies Config
