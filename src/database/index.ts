import DB_URL from '@/database/url'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './load-schema'

const client = new Pool({
  connectionString: DB_URL,
})
await client.connect()

const db = drizzle(client, { logger: true, schema })

export default db
