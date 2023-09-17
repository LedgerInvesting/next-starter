// import { drizzle } from 'drizzle-orm/vercel-postgres'
// import { sql } from '@vercel/postgres'

import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'

// check process.env.DATABASE_URL ends with ssmode=require, if not add it
let DB_URL = process.env.DATABASE_URL
const isProduction = process.env.NODE_ENV === 'production'
if (DB_URL && !DB_URL.includes('sslmode=require') && isProduction) {
  DB_URL = `${DB_URL}?sslmode=require`
}

const client = new Client({
  connectionString: DB_URL,
})
await client.connect()

// const client = postgres(DB_URL)

const db = drizzle(client)

// const db = drizzle(sql)

export { DB_URL }
export default db
