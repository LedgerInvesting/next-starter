// import { drizzle } from 'drizzle-orm/vercel-postgres'
// import { sql } from '@vercel/postgres'

import DB_URL from '@/database/url'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

const client = new Client({
  connectionString: DB_URL,
})
await client.connect()

// const client = postgres(DB_URL)

const db = drizzle(client)

// const db = drizzle(sql)

export default db
