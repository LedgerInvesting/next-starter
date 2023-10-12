// import { drizzle } from 'drizzle-orm/vercel-postgres'
// import { sql } from '@vercel/postgres'

import DB_URL from '@/database/url'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
// import { Logger } from 'drizzle-orm/logger'

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

const client = new Client({
  connectionString: DB_URL,
})
if (process.env.NODE_ENV !== 'production' && process.env.npm_lifecycle_event !== 'build') {
  await client.connect()
}

// const client = postgres(DB_URL)
// class MyLogger implements Logger {
//   logQuery(query: string, params: unknown[]): void {
//     console.log({ query, params })
//   }
// }

const db = drizzle(client, { logger: true, schema: { public: true, auth: true } })

// const db = drizzle(sql)

export default db
