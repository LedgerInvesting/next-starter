import DB_URL from '@/database/url'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './load-schema'
import { isProduction, isRunningBuild } from '@/lib/env'

const client = new Pool({
  connectionString: DB_URL,
})
if (isProduction && !isRunningBuild) {
  await client.connect()
}

const db = drizzle(client, { logger: !isProduction, schema })

export default db
